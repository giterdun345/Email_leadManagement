import React, { useState, useEffect } from "react";
import axios from "axios";
// antd components
import { Button, Space, Popconfirm, Form } from "antd";
import { Table } from "ant-table-extensions";
import { SearchOutlined } from "@ant-design/icons";
import EditableCell from "./EditableCell";

import originData from "./DummyData";

const WithEmails = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  // editingKey is the id of the target used in dev
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    // key from data base is used to not duplicate setFieldsValue
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    const row = await form.validateFields();
    await axios
      .put(`http://localhost:8000/api/target/${key}/`, row)
      .then((res) => {
        alert(`${res.status}, ${res.statusText}: ${res.data.name}`);
        setEditingKey("");
      })
      .catch((error) => {
        console.log(error.request.response);
        alert(`Put Fail: ${error.request.response}`);
      });
    fetchList();
  };

  const handleDelete = async (record) => {
    await axios
      .delete(`http://localhost:8000/api/target/${record.key}/`)
      .then((res) => {
        let dataCopy = [...data];
        let recordIndex = dataCopy.indexOf(record);
        if (recordIndex > -1) {
          dataCopy.splice(recordIndex, 1);
          setData(dataCopy);
        }
      })
      .catch((error) => {
        console.error("Delete Error:", error);
      });
  };

  const withColumns = [
    {
      title: "Full Name",
      width: 100,
      dataIndex: "name",
      key: "name",
      fixed: "left",
      editable: true,
    },
    {
      title: "Company",
      width: 100,
      dataIndex: "company",
      key: "company",
      fixed: "left",
      editable: true,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 100,
      editable: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 150,
      editable: true,
    },
    {
      title: "Email Confirmed",
      dataIndex: "email_confirmed",
      key: "email_confirmed",
      width: 150,
      editable: true,
      render: (bool) => (bool ? "Confirmed" : "Not Confirmed"),
    },
    {
      title: "ID",
      width: 75,
      dataIndex: "key",
      key: "id",
    },
    {
      title: "Update",
      key: "operationEdit",
      fixed: "right",
      width: 100,
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button
              type="link"
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Button>
            <br />
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <Button type="link">Cancel</Button>
            </Popconfirm>
          </span>
        ) : (
          <Button
            type="dashed"
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Button>
        );
      },
    },
    {
      title: "Delete",
      key: "operationDelete",
      fixed: "right",
      width: 100,
      render: (text, record) => (
        <Space size="middle">
          <Button danger type="dashed" onClick={(e) => handleDelete(record)}>
            Delete
          </Button>
        </Space>
      ),
    },
    // {
    //   title: 'Validate',
    //   key: 'operationValidate',
    //   fixed: 'right',
    //   width: 100,
    //   render: () =>
    //     <Button type="dashed" onClick={handleValidate}>
    //       Validate
    //     </Button>,
    // }
  ];

  const mergedColumns = withColumns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const fetchList = async () => {
    await axios
      .get("http://localhost:8000/api/withEmail")
      .then((res) => setData(res.data))
      .catch((error) => console.log("GET ERROR", error));
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div>
      <h1 styles={{ textAlign: "center" }}>Targets With Emails</h1>
      <Form form={form} component={false} name="withEmails">
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          rowKey={(record) => record.key}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
          scroll={{ x: 1500 }}
          sticky
          // extensions
          exportable
          searchable
          searchableProps={{
            fuzzySearch: true,
            inputProps: {
              placeholder: "Search",
              prefix: <SearchOutlined />,
            },
            fuzzyProps: {
              treshold: 0.0,
              distance: 0,
              isCaseSensitive: false,
            },
          }}
        />
      </Form>
    </div>
  );
};

export default WithEmails;
