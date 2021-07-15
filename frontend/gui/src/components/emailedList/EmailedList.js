import { Table } from 'antd';

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
    title: 'Reply',
    dataIndex: 'reply',
    key: 'reply', 
    width: 75
  },
  { 
    title: 'Date Sent',
    dataIndex: 'date_sent',
    key: 'date_sent',
    width: 100
  },
  { 
    title: 'Follow Up Sent',
    dataIndex: 'followup_sent',
    key: 'followup_sent',
    width: 75 
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
    reply: '0',
    date_sent: '08/09/2021',
    followup_sent:'1'
  });
}

const EmailList= ()=>{
  return(
    <div>
    <h1 style={{textAlign:'center'}}> Emails Sent </h1>
    <Table
    columns={columns}
    dataSource={data}
    scroll={{ x: 1500 }}
    // Can have summary at the bottom of the table 
    sticky
  />
</div>
  )
}

export default EmailList