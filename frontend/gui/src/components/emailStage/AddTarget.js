import { useState } from 'react';
import axios from 'axios'
import { Form, Input, Button } from 'antd';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const AddTarget = () => {
  const [inputs, setInputs] = useState({
    name: '',
    company:'',
    category:'',
    email:'',
    twitter:'',
    linkedin:'',
    angel:'',
    crunchbase:'',
    reply:false,
    email_confirmed:false,
    email_sent: false,
    followup_sent: false,
    // date_sent:''
  })

  const [form] = Form.useForm();
   
  const onFinish = (values) => {
    console.log(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    alert('Failed: ', errorInfo)
  };

  const onReset = () => {
    form.resetFields();
  };

  const handleChange= (e, inputName)=>{
    // e.target.defaultValue is a workaround used with antd forms also target.value.value
    setInputs({
      ...inputs,
      [inputName] : e.target.defaultValue,
    });
    console.log(inputs)
  } 

  const handleFormSubmit = (event)=>{
    event.preventDefault()
    console.log(inputs)
    axios.post('http://localhost:8000/api/target/', inputs)
    .then(res => {
      console.log(res)
      alert(`${res.status}, ${res.statusText}: ${res.data.name}`)
      onReset()
    }
      
    )
    .catch(error => {
      console.log(error.request.response)
      alert(`Post Fail: ${error.request.response}`)}
      )
  }

  return ( 
    <Form 
      {...layout} 
      form={form} 
      name="control-hooks"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={{
        reply: 0,
        date_sent: 0,
        email_sent: 0,
        followup_sent: 0,
        email_confirmed: 0,
      }}
    >
      {/* NAME  */}
      <Form.Item
        name="Name"
        label="name"
        rules={[
          {
            required: true,
            message: 'Please input a name.',

          },
        ]}
      >
        <Input onChange={e => handleChange(e, 'name')} />
      </Form.Item>
      {/* COMPANY  */}
      <Form.Item
        name="Company"
        label="company"
      >
        <Input onChange={e => handleChange(e, 'company')} />
      </Form.Item>
      {/* CATEGORY  */}
      <Form.Item
        name="Category"
        label="category"
      >
        <Input onChange={e => handleChange(e, 'category')} />
      </Form.Item>
      {/* EMAIL  */}
      <Form.Item
        name="Email"
        label="email"
        rules=  {[
          {
            type: "email",
            message: "The input is not valid E-mail!"
          }
        ]}
      >
        <Input type='email' onChange={e => handleChange(e, 'email')}/>
      </Form.Item>
      {/* TWITTER  */}
      <Form.Item
        name="Twitter"
        label="twitter"
        rules=  {[
          {
            type: "url",
            message: "i.e https://twitter.com/twit"
          }
        ]}
      >
        <Input onChange={e => handleChange(e, 'twitter')}/>
      </Form.Item>
      {/* LINKEDIN  */}
      <Form.Item
        name="LinkedIn"
        label="linkedin"
        rules=  {[
          {
            type: "url",
            message: "i.e https://linkedin.com/in/handle"
          }
        ]}
      >
        <Input type= 'url' onChange={e => handleChange(e, 'linkedin')}/>
      </Form.Item>
      {/* ANGEL.CO  */}
      <Form.Item
        name="Angel.co"
        label="angel"
        rules=  {[
          {
            type: "url",
            message: "i.e https://angel.com/angel"
          }
        ]}
      >
        <Input onChange={e => handleChange(e, 'angel')}/>
      </Form.Item>
      <Form.Item
        name="Crunchbase"
        label="crunchbase"
        rules=  {[
          {
            type: "url",
            message: "i.e https://crunchbasecom/handle"
          }
        ]}
      >
        <Input onChange={e => handleChange(e, 'crunchbase')}/>
      </Form.Item>
      {/* REPLY  */}
      <Form.Item
        name="Reply"
        label="reply"
        rules=  {[
          {
            type: "number",
            message: "0 or 1"
          }
        ]}
      >
        <Input onChange={e => handleChange(e, 'reply')}  />
      </Form.Item>
      {/* EMAIL CONFIRMED  */}
      <Form.Item
        name="Email Confirmed"
        label="email_confirmed"
        rules=  {[
          {
            type: "number",
            message: "0 or 1"
          }
        ]}
      >
        <Input onChange={e => handleChange(e, 'email_confirmed')}   />
      </Form.Item>
      {/* EMAIL SENT  */}
      <Form.Item
        name="Email Sent"
        label="email_sent"
        rules=  {[
          {
            type: "number",
            message: "0 or 1"
          }
        ]}
      >
        <Input onChange={e => handleChange(e, 'email_sent')}  />
      </Form.Item>
      {/* FOLLOW UP SENT  */}
      <Form.Item
        name="Follow up Sent"
        label="followup_sent"
        rules=  {[
          {
            type: "number",
            message: "0 or 1"
          }
        ]}
      >
        <Input onChange={e => handleChange(e, 'followup_sent')} />
      </Form.Item>
      {/* BUTTONS  */}
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" onClick={e => handleFormSubmit(e)}>
          Submit
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
}
 
export default AddTarget;