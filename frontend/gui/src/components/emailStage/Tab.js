import { Link } from 'react-router-dom'
import WithEmails from './WithEmails'
import WithoutEmails from './WithoutEmails'
import { Tabs, Space } from 'antd';
const { TabPane } = Tabs;

const Tab = () => (
  <Space size={100} >
    <Tabs defaultActiveKey="1" >
        <TabPane tab="With Emails" key="1">
          <WithEmails/>
        </TabPane>
        <TabPane tab="Without Emails" key="2">
          <WithoutEmails/>
        </TabPane>
    </Tabs>
  </Space>

);

export default Tab