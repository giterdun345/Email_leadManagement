import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { Table, Input, InputNumber, Popconfirm, Form, Typography,Button, Space } from 'antd';

import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

// DUMMY DATA PROPAGATION 
const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edward Coliglio ${i}`,
    company: 'Robert Half',
    category: 'Angel',
    email: `angelInvestor@angelInvestor.com`,
    
  });
}

data.push({
  key: 4,
  name: `Steven Zimba`,
  company: 'George and Associates',
  category: 'VC',
  email: `vcCompany@vcCompany.com`,
})

// COMPONENT  
const WithoutEmails=()=>{
  // handles search functions of table 
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState()
  const searchInput= useRef()

  // handling fetched data 
  const [dataWithout, setDataWithout] = useState(data)
  
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    // Search parameters for table 
    confirm();
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  };

  const handleReset = clearFilters => {
    // clears search query from table 
    clearFilters();
    setSearchText('')
  };

  const handleEdit = () =>{
    console.log('Edited')
  }

  const handleDelete = ()=>{
    console.log('deleted')
  }

  const handleValidate = () =>{
    console.log('validate')
  }
  const getColumnSearchProps = dataIndex => ({
    // function handles all aspects of the search function for the table 
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0])
              setSearchedColumn(dataIndex)
            }}
          >
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.current.select(), 100);
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        // highlights matches within the column 
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: 'Full Name',
      width: 100,
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      editable: true,
      ...getColumnSearchProps('name')
    },
    {
      title: 'Company',
      width: 100,
      dataIndex: 'company',
      key: 'company',
      fixed: 'left',
      editable: true,
      ...getColumnSearchProps('company')
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      width: 100,
      editable: true,
      ...getColumnSearchProps('category')
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 150,
      editable: true,
      ...getColumnSearchProps('email')
    },
    {
      title: 'Twitter',
      dataIndex: 'twitter',
      key: 'twitter',
      width: 150,
      editable: true,
      ...getColumnSearchProps('twitter')
    },
    {
      title: 'LinkedIn',
      dataIndex: 'linkedin',
      key: 'linkedin',
      width: 150,
      editable: true,
      ...getColumnSearchProps('linkedin')
    },
    {
      title: 'Angel.co',
      dataIndex: 'angel',
      key: 'angel',
      width: 150,
      editable: true,
      ...getColumnSearchProps('angel')
    },
    {
      title: 'Crunchbase',
      dataIndex: 'crunchbase',
      key: 'crunchbase',
      width: 150,
      editable: true,
      ...getColumnSearchProps('crunchbase')
    },
    { 
      title: 'Date Created',
      dataIndex: 'date_created',
      key: 'date_created',
      editable: true,
      ...getColumnSearchProps('date_created') 
    },
    {
      title: 'ID',
      width: 75,
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Edit',
      key: 'operationEdit',
      fixed: 'right',
      width: 75,
      render: () =>   
        <Button type="dashed" htmlType='submit' onClick={handleEdit}>
          Edit
        </Button>,
    },
    {
      title: 'Delete',
      key: 'operationDelete',
      fixed: 'right',
      width: 100,
      render: () =>   
        <Button type="dashed" htmlType='submit' onClick={handleDelete}>
          Delete
        </Button>,
    },
    {
      title: 'Validate',
      key: 'operationValidate',
      fixed: 'right',
      width: 100,
      render: () =>
        <Button type="dashed" onClick={handleValidate}>
          Validate
        </Button>,
    }
  ];
  
  const fetchList = async ()=>{
    await axios.get('http://localhost:8000/api/withoutEmail')
    .then(res => setDataWithout(res.data))
  }

  useEffect(()=>{
    fetchList()
  }, [])

  // useEffect(()=>{
  //   handleEdit()

  // }, [])

  // useEffect(()=>{
  //   handleDelete()
  // }, [])

  return(
    <div>
      <h1 style={{textAlign:'center'}}>Targets With No Emails</h1>
      <Table
        columns={columns}
        dataSource={dataWithout}
        scroll={{ x: 1500 }}
      //  Can add a summary to the bottom of the table 
        sticky
      />
    </div>
   
  )
}

export default WithoutEmails