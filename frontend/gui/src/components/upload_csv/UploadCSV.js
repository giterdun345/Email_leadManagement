import { useState } from 'react'
import papa from 'papaparse'
import axios from 'axios'
import { Form, Button, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

// upload the UploadCSV, 
// sends to the backend view for validation 

const UploadCSV = () => {
  const [convertedData, setConvertedData] = useState([])
  // const [validatedData, setValidatedData] = useState([])
  const [ processedData, setProcessedData] = useState([])
  const[loading, setLoading] = useState(false)
  // Add the file to a formData object, and set the Content-Type header to multipart/form-data.

  const updateData= (results)=>{
      setConvertedData(results.data)
      console.log("Data here is: ", convertedData )
  }


  const convertFile= ({file, onSuccess})=>{
  // custom override of Upload to convert from csv to json before bulk post 
  // state could not be updated in parse function  
    papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      error: (err) => console.log(err.message),
      complete: (results, file) =>{
        onSuccess('ok')
        updateData(results)
      }
    })
  }

  const submitValidateData = ()=>{
    setLoading(true)
    axios.post('http://localhost:8000/validation/', convertedData)
    .then(res => {
      setProcessedData(res.data)
      console.log(res.data)
      setLoading(false)
    }).catch(err => alert(err))
      
    
  }

  const submitConvertedData = ()=>{
    axios.post('http://localhost:8000/api/target/', processedData)
    .then(res => {
      alert(`${res.status}, ${res.statusText}: ${res.data.name}`)
      // setConvertedData([])
      setProcessedData([])
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
    <>
    <Form name="csv_upload" {...formItemLayout} onFinish={onFinish} >
      <Form.Item>
        <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>

          <Upload.Dragger name="files" customRequest={convertFile}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">Support for a single file or bulk upload.</p>
          </Upload.Dragger>

        </Form.Item>
      </Form.Item>
{/* BUTTON FOR VALIDATION OF DATA  */}
      <Form.Item wrapperCol={{ span: 12 }}>
        <Button type="primary" htmlType="submit"  onClick={submitValidateData}>
          Validate
        </Button>
      </Form.Item>
{/* BUTTON FOR SUBMISSION TO BACKEND TARGET MODEL  */}
      <Form.Item wrapperCol={{ span: 12 }}>
        <Button type="primary" htmlType="submit"  onClick={submitConvertedData}>
          Submit
        </Button>
      </Form.Item>
    </Form>
    <div>{loading ? <h1>Loading...</h1> : <h1>Completed</h1> }</div>
    {/* <div>{validatedData}</div> */}
    </>
   );
}
 
export default UploadCSV;