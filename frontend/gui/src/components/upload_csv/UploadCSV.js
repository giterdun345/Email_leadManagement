import { useState } from 'react'
import papa from 'papaparse'
import axios from 'axios'
import { Form, Button, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import UploadValidated from './UploadValidated'
// upload the UploadCSV, 
// sends to the backend view for validation 

const UploadCSV = () => {
  const [convertedData, setConvertedData] = useState([])
  const [error, setError] = useState([])
  const [processedData, setProcessedData] = useState([
    {'name': 'STEVE MUNTEAN',
     'company': 'Over Watch Capital',
      'category': 'VC',
       'email': ''
    }, 
    {'name': 'STEVE MUNTEAN',
     'company': 'Over Watch Capital',
     'category': 'VC',
     'email': 'steve@overwatchcapital.com', 
     'email_confirmed': true}])

  const[loading, setLoading] = useState(false)
  // Add the file to a formData object, and set the Content-Type header to multipart/form-data.

  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => processedData.indexOf(record) === editingKey;
  

  const updateData= (results)=>{
      setConvertedData(results.data)
      // console.log("Data here is: ", convertedData )
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
      // console.log(res.data)
      setLoading(false)
    }).catch(err => {
      // alert(err)
      setError(err.request.response)
    })
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

  const edit = (record, form) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(processedData.indexOf(record));
  };


  const cancel = () => {
    setEditingKey('');
  };

  const save = async (record, form) => {
    let copy_data= [...processedData]
    const row = await form.validateFields()
    copy_data.push(row)
    copy_data.splice(editingKey, 1)
    console.log(copy_data)
    setProcessedData(copy_data)
    setEditingKey('')
  };

  const handleDelete= (record)=>{
        let copy_data= [...processedData]
        copy_data.splice(copy_data.indexOf(record), 1)
        setProcessedData(copy_data)
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
            <p className="ant-upload-hint">Click Find Email for checking full name with domain</p>
            <p className="ant-upload-hint">Click Submit to upload to database</p>
            <p className="ant-upload-hint">Gmail, Hotmail, Yahoo mail domains not accurate; avoid use</p>
          </Upload.Dragger>

        </Form.Item>
      </Form.Item>
{/* BUTTON FOR VALIDATION OF DATA  */}
      <Form.Item wrapperCol={{ span: 12 }}>
        <Button type="primary" htmlType="submit"  onClick={submitValidateData}>
          Find Email
        </Button>
      </Form.Item>
{/* BUTTON FOR SUBMISSION TO BACKEND TARGET MODEL  */}
      <Form.Item wrapperCol={{ span: 12 }}>
        <Button type="primary" htmlType="submit"  onClick={submitConvertedData}>
          Submit to Email Stage
        </Button>
      </Form.Item>
    </Form>
      <div>{
        loading ? <h1>Loading...</h1> 
            : <UploadValidated 
                  valid_data={processedData}
                  editingKey= {editingKey}
                  isEditing = {isEditing}
                  edit= {edit}
                  cancel = {cancel}
                  save={save}
                  handleDelete={handleDelete}
                  /> 
            }
      </div>
    <div>{error ? <div dangerouslySetInnerHTML={{__html: error}} /> : ""}</div>
    </>
   );
}
 
export default UploadCSV;