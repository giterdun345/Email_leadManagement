import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Button, Space, Popconfirm, Form } from 'antd';
import { Table } from "ant-table-extensions";
import { SearchOutlined }from '@ant-design/icons';
import EditableCell from '../emailStage/EditableCell'



const UploadedValidated = ({valid_data, isEditing, edit, cancel, save, handleDelete, editingKey }) => {
  const [form] = Form.useForm();
  // editingKey is the id of the target used in dev
  // const [data, setData] = useState([...props.valid_data]);
  // const [editingKey, setEditingKey] = useState('');

  // const isEditing = (record) => valid_data.indexOf(record) === editingKey;

  // const edit = (record) => {
  //   form.setFieldsValue({
  //     ...record,
  //   });
  //   setEditingKey(data.indexOf(record));
  // };

  // const cancel = () => {
  //   setEditingKey('');
  // };

  // const save = async (record) => {
  //   let copy_data= [...data]
  //   const row = await form.validateFields()
  //   copy_data.push(row)
  //   copy_data.splice(editingKey, 1)
  //   console.log(copy_data)
  //   setData(copy_data)
  //   setEditingKey('')
  // };

  // const handleDelete= (record)=>{
  //       let copy_data= [...data]
  //       copy_data.splice(copy_data.indexOf(record), 1)
  //       setData(copy_data)
  //   } 
  
  const withColumns = [
    {
      title: 'Full Name',
      width: 100,
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      editable: true,
    },
    {
      title: 'Company',
      width: 100,
      dataIndex: 'company',
      key: 'company',
      fixed: 'left',
      editable: true,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      width: 100,
      editable: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 150,
      editable: true,
    },
    {
      title: 'Email Confirmed',
      dataIndex: 'email_confirmed',
      key: 'email_confirmed',
      width: 150,
      editable:true,
      render: bool=> bool ? 'Confirmed': 'Not Confirmed',
    },
    {
      title: 'ID',
      width: 75,
      dataIndex: 'key',
      key: 'id',
    },
    {
      title: 'Update',
      key: 'operationEdit',
      fixed: 'right',
      width: 100,
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button
              type='link'
              onClick={() => save(record, form)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Button>
              <br/>
           <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <Button type='link'>Cancel</Button>
           </Popconfirm>
           </span>
        ) : (
          <Button type='dashed' disabled={editingKey !== ''} onClick={() => edit(record, form)}>
            Edit
          </Button>
        );
      },
    },
    {
      title: 'Delete',
      key: 'operationDelete',
      fixed: 'right',
      width: 100,
      render: (text, record) => (
        <Space size="middle">
          <Button danger type='dashed' onClick={e => handleDelete(record)}>
            Delete
          </Button>
        </Space>
      )
    }
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

  return (
    <div>
      <h1 styles={{textAlign:'center'}}>Editable Target Data from CSV</h1>
    <Form form={form} component={false} name='withEmails'>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={valid_data}
        rowKey={record => record.key}
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
            isCaseSensitive: false
          }
        }}
      />
    </Form>
    </div>
  );
};


export default UploadedValidated