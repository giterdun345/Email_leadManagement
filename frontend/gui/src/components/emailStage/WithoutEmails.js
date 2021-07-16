import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Table, Button, Space, Popconfirm, Form } from 'antd';
import EditableCell from './EditableCell'

import originData from './DummyData'

const WithoutEmails = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  // editingKey is the id of the target 
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    // key from data base is used to not duplicate setFieldsValue 
    form.setFieldsValue({
      name:'',
      company:'',
      category:'',
      email:'',
      twitter:'',
      linkedin:'',
      angel:'',
      crunchbase:'',
      date_created:'',
      id:'',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      await axios.put(`http://localhost:8000/api/target/${key}/`, row)
      .then(res=> console.log(res))
      setEditingKey('')
    } catch (errInfo) {
      alert('Edit Failed:', errInfo);
    }
  };

  const handleDelete= async (key)=>{
      await axios.delete(`http://localhost:8000/api/target/${key}/`)
      .catch(error => {
          console.error('Delete Error:', error);
      });
    } 
  
  const withoutColumns = [
    {
      title: 'Full Name',
      width: 200,
      dataIndex: 'name',
      fixed: 'left',
      editable: true,
      // ...getColumnSearchProps('name')
    },
    {
      title: 'Company',
      width: 100,
      dataIndex: 'company',
      fixed: 'left',
      editable: true,
      // ...getColumnSearchProps('company')
    },
    {
      title: 'Category',
      dataIndex: 'category',
      width: 100,
      editable: true,
      // ...getColumnSearchProps('category')
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: 150,
      editable: true,
      // ...getColumnSearchProps('email')
    },
    {
      title: 'Twitter',
      dataIndex: 'twitter',
      width: 150,
      editable: true,
      // ...getColumnSearchProps('twitter')
    },
    {
      title: 'LinkedIn',
      dataIndex: 'linkedin',
      width: 150,
      editable: true,
      // ...getColumnSearchProps('linkedin')
    },
    {
      title: 'Angel.co',
      dataIndex: 'angel',
      width: 150,
      editable: true,
      // ...getColumnSearchProps('angel')
    },
    {
      title: 'Crunchbase',
      dataIndex: 'crunchbase',
      width: 150,
      editable: true,
      // ...getColumnSearchProps('crunchbase')
    },
    // { 
    //   title: 'Date Created',
    //   dataIndex: 'date_created',
    //   editable: true,
    //   // ...getColumnSearchProps('date_created') 
    // },
    {
      title: 'ID',
      width: 75,
      dataIndex: 'key',
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
              onClick={() => save(record.key)}
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
          <Button type='dashed' disabled={editingKey !== ''} onClick={() => edit(record)}>
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
          <Button danger type='dashed' onClick={e => handleDelete(record.key)}>
            Delete
          </Button>
        </Space>
      )
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

  const mergedColumns = withoutColumns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        // inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const fetchList = async ()=>{
    await axios.get('http://localhost:8000/api/withoutEmail')
    .then(res => setData(res.data))
    .catch(error => console.log("GET ERROR", error))
  }

  useEffect(()=>{
    fetchList()
  }, [data])

  return (
    <Form form={form} component={false} name='withoutEmails'>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        rowKey={record => record.id}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
        scroll={{ x: 1500 }}
        sticky
      />
    </Form>
  );
};


export default WithoutEmails