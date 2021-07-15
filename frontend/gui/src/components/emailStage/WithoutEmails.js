import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { Table, Input, Button, Space  } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

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

const WithoutEmails=()=>{
  // handles search functions of table 
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState()
  const searchInput= useRef()

  // handling fetched data 
  const [dataWithout, setDataWithout] = useState(data)

  
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('')
  };

  const getColumnSearchProps = dataIndex => ({
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
      ...getColumnSearchProps('name')
    },
    {
      title: 'Company',
      width: 100,
      dataIndex: 'company',
      key: 'company',
      fixed: 'left',
      ...getColumnSearchProps('company')
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      width: 100,
      ...getColumnSearchProps('category')
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 150,
      ...getColumnSearchProps('email')
    },
    {
      title: 'Twitter',
      dataIndex: 'twitter',
      key: 'twitter',
      width: 150,
      ...getColumnSearchProps('twitter')
    },
    {
      title: 'LinkedIn',
      dataIndex: 'linkedin',
      key: 'linkedin',
      width: 150,
      ...getColumnSearchProps('linkedin')
    },
    {
      title: 'Angel.co',
      dataIndex: 'angel',
      key: 'angel',
      width: 150,
      ...getColumnSearchProps('angel')
    },
    {
      title: 'Crunchbase',
      dataIndex: 'crunchbase',
      key: 'crunchbase',
      width: 150,
      ...getColumnSearchProps('crunchbase')
    },
    { 
      title: 'Date Created',
      dataIndex: 'date_created',
      key: 'date_created',
      ...getColumnSearchProps('date_created') 
    },
    {
      title: 'Edit',
      key: 'operationEdit',
      fixed: 'right',
      width: 75,
      render: () => <button>Edit</button>,
    },
    {
      title: 'Delete',
      key: 'operationDelete',
      fixed: 'right',
      width: 100,
      render: () => <button>Delete</button>,
    },
    {
      title: 'Validate',
      key: 'operationValidate',
      fixed: 'right',
      width: 100,
      render: () => <button>Validate</button>,
    }
  ];
  
  const fetchList = async ()=>{
    await axios.get('http://localhost:8000/api/withoutEmail')
    .then(res => setDataWithout(res.data))
  }
  useEffect(()=>{
    fetchList()
  }, [])

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


// takes in the data stored in state, filters the data by email validation uses filteredTable state, export filteredTablestate to csv to google sheets,
