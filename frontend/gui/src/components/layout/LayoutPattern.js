import { useState } from 'react'
import { Link } from 'react-router-dom'
import HeaderComponents from './HeaderComponents'

import { Layout, Menu } from 'antd';
import {
  MailOutlined,
  PieChartOutlined,
  ApiOutlined,
  AimOutlined,
  FileAddOutlined,
} from '@ant-design/icons';
const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

const LayoutPattern = (props)=>{
  const [collapse, setCollapse] = useState(false)

  const onCollapse = () => {
    setCollapse(!collapse)
  };
  
  return(
    <Layout style={{ minHeight: '100vh' }}>  
      <Sider collapsible collapsed={collapse} onCollapse={onCollapse} >
        <div className="logo">
          Wim.ooo
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            <Link to='/dashboard' >
              Dashboard
            </Link>
          </Menu.Item>
          <SubMenu key="sub2" icon={<AimOutlined />} title="Target List">
            <Menu.Item key="3">
              <Link to='/withEmails'>
                With Emails
              </Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to='/withoutEmails'>
                Without Emails
              </Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="5" icon={<MailOutlined />}>
            <Link to='/emailed_list'>
              Emailed
            </Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<ApiOutlined />}>
            <Link to='/connections'>
              Connections
            </Link>
          </Menu.Item>
          <Menu.Item key="7" icon={<FileAddOutlined />}>
            <Link to='/file_upload'>
              Upload CSV
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <HeaderComponents />
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            {props.children}
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default LayoutPattern