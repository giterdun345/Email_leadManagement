// variables and functions to utilize in AddTarget Component 

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

const onFinish = (values) => {
  console.log(values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
  alert('Failed: ', errorInfo)
};

const onReset = (form) => {
  form.resetFields();
};

export{ layout, tailLayout, onFinish, onFinishFailed, onReset }