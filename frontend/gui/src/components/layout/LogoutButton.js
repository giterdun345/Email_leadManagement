import { Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';


const LogoutButton= ()=>{
  return(
    <div className='logoutButton'>
      <Button type="primary" icon={<LogoutOutlined />}>
        Logout
      </Button>
    </div>
  )
}

export default LogoutButton