import { useState, useEffect } from 'react';
import axios from 'axios'

import { Table, Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';

const columns = [
  {
    title: 'Full Name',
    width: 100,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  {
    title: 'Company',
    width: 100,
    dataIndex: 'company',
    key: 'company',
    fixed: 'left',
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
    width: 100,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    width: 150,
  },
  {
    title: 'Email Confirmed',
    dataIndex: 'email_confirmed',
    key: 'email_confirmed',
    width: 150,
  },
  { 
    title: 'Date Created',
    dataIndex: 'date_created',
    key: 'date_created' 
  },
  { 
    title: 'Reply',
    dataIndex: 'reply',
    key: 'reply' 
  },
  { 
    title: 'Email_sent',
    dataIndex: 'email_sent',
    key: 'email_sent' 
  },
  { 
    title: 'Follow Up Sent',
    dataIndex: 'followup_sent',
    key: 'followup_sent' 
  },
  {
    title: 'ID',
    width: 75,
    dataIndex: 'key',
    key: 'id',
  },
  {
    title: 'Edit',
    key: 'operationEdit',
    fixed: 'right',
    width: 75,
    render: () => 
      <Button type="dashed">
        Edit
      </Button>,
  },
  {
    title: 'Delete',
    key: 'operationDelete',
    fixed: 'right',
    width: 100,
    render: () => 
      <Button type="dashed">
        Delete
      </Button>,
  }
];

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edward Coliglio ${i}`,
    company: 'Robert Half',
    category: 'Angel',
    email: `angelInvestor@angelInvestor.com`,
    email_confirmed: 1,
    date_created: "08/07/2021",
    reply: '',
    date_sent: '',
    email_sent:'',
    followup_sent:''
  });
}


const WithEmails=()=>{
  const [dataWith, setDataWith] = useState(data)

  useEffect(()=>{
    axios.get('http://localhost:8000/api/withEmail')
    .then(res => setDataWith(res.data))
  }, [])


  return(
    <div>
      <Button type="primary" icon={<SendOutlined />}>
        Send to CSV
      </Button>
     
      <h1 style={{textAlign:'center'}}> Targets With Emails </h1>
      <Table
      columns={columns}
      dataSource={dataWith}
      scroll={{ x: 1500 }}
      // Can have summary at the bottom of the table 
      sticky
    />
  </div>
  )
}

export default WithEmails


// takes in the data stored in state, filters the data by email validation uses filteredTable state, export filteredTablestate to csv to google sheets,
