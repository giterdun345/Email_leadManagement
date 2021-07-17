import { useState } from 'react'
import papa from 'papaparse'
import axios from 'axios'
import { Form, Button, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const UploadCSV = () => {
  const [convertedData, setConvertedData] = useState([])
  // Add the file to a formData object, and set the Content-Type header to multipart/form-data.

  const convertFile= ({file, onSuccess})=>{
  // custom override of Upload to convert from csv to json before bulk post 
    papa.parse(file,  {
      header: true,
      // xlxs = "ISO-8859-1"
      // encoding:'UTF-8', 
      skipEmptyLines: true,
      complete: function(results) {
        setConvertedData(results.data)
        console.log('In convert', convertedData)
        onSuccess("ok");;
      }
    })
  }

  const submitConvertedData= ()=>{
    console.log('In Submit', convertedData)
    axios.post('http://localhost:8000/api/target/', convertedData)
    .then(res => {
      // console.log(res)
      alert(`${res.status}, ${res.statusText}: ${res.data.name}`)
      setConvertedData([])
    })
    .catch(error => {
      console.log(error.request.response)
      alert(`Post CSV Fail: ${error.request.response}`)
    })
  }

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const normFile = (e) => {
  // console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }else{
    return e && e.fileList;
  }
  
};

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return ( 
    <Form name="csv_upload" {...formItemLayout} onFinish={onFinish} >
      <Form.Item>
        <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
          <Upload.Dragger name="files" customRequest={convertFile}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">Support for a single or bulk upload.</p>
          </Upload.Dragger>
        </Form.Item>
      </Form.Item>
{/* BUTTON FOR SUBMISSION TO BACKEND TARGET MODEL  */}
      {/* <Form.Item wrapperCol={{ span: 12, offset: 6 }}> */}
        <Button type="primary" htmlType="submit"  onClick={submitConvertedData}>
          Submit
        </Button>
      {/* </Form.Item> */}
      {/* <Form.Item wrapperCol={{ span: 12, offset: 6 }}> */}
        <Button type="primary" htmlType="button">
          Pull From Google Sheets
        </Button>
      {/* </Form.Item> */}
    </Form>
   );
}
 
export default UploadCSV;