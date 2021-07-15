import { 
  Form, 
  Button, 
  Checkbox, 
  Input, 
  AutoComplete, 
  Card
} from 'antd';

const LoginPage = ()=>{

  const onFinish = (values) => {
    // console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    // console.log('Failed:', errorInfo);
  };

  return(
  <div className='loginPage site-card-border-less-wrapper'>
    <h1 className='loginTitle'>Login</h1>
    <Card bordered={true} style={{ width:750, margin: "0 auto" }}> 
      <a href='dashboard'>Dashboard Link</a>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Username Required' }]}
        >
          <AutoComplete
          style={{ width: '50%' }}
          // placeholder="Username"
          options={[{ value: 'admin' }, { value: 'user1' }]}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Password Required' }]}
        >
          <Input.Password  style={{width:'50%'}}/>
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  </div>
  )
}

export default LoginPage