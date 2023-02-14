
 
import React,{useState} from 'react' 
import {Modal, Table,Form,Input,Button,Select,DatePicker } from 'antd'
import {v4 as uuid} from 'uuid'
import { EditOutlined, DeleteOutlined} from '@ant-design/icons';
import './index.css'    


const Task=()=>{
    const Data= [
        {    
            id:uuid(),
            currentTime:"10-2-23",
            title:"trail1",
            description:"this is trail1",
            dueDate: '10-02-23' ,
            tags:["IMPORTANT","LESS IMPORTANCE"] ,
            status:"WORKING"
        }, 
        {   
             id:uuid(),
            currentTime:"11-02-23",
            title:"trail2",
            description:"this is trail2",
            dueDate:"13-2-23",
            tags:["MOST IMPORTANT","fail"] ,
            status:"DONE"
        }
    ] 

    const [data, setData] = useState(Data) 

     

const [edit, setEdit]= useState({})  
const Edit = (record) => { 
    //  setVisible(true) 

    Modal.confirm(
        {
            title:'Are you sure you want to Edit this!', 
            onOk:()=>{ 
                console.log('record:')
                console.log(record)
                // const row = data.filter((eachItem)=>(eachItem.id === record.id)) 
                // console.log("")
                // console.log(row)
                setEdit(record) 
                // renderEditSection(row) 
                setTitle(record.title) 
                setDescription(record.description) 
                setDueDate(record.dueDate) 
                setTags(record.tags) 
                setStatus(record.status) 
                setShowUpdateForm(true) 
                setShowForm(true) 
            }
        }
    )
};  

 

const [showUpdateForm, setShowUpdateForm]= useState(false)

 






    const Delete=(record)=>{
         
        Modal.confirm({
            title:"Are you sure you want to delete this ?",
            onOk:()=>{
                const updatedData= data.filter((eachItem)=>(eachItem.id !== record.id)) 
                setData(updatedData)
            }
        })
    }

     

    const column=[
        {
            // key:"S.No",
            // title:"S.No",
            // dataIndex:"id",
            title: 'Row Number',
            dataIndex: 'index',
            key: 'index',
            render: (text,record, index) => index + 1,
        },
        {
            key:"Time",
            title:"Date",
            dataIndex:"currentTime",
            sorter:(a,b)=>a.currentTime >b.currentTime, 
            sortDirections: [ "ascend" ,"descend"]
        },
        {
            key:"title",
            title:"Title",
            dataIndex:"title",
            sorter:(a,b)=>a.title>b.title, 
            sortDirections: [ "ascend" ,"descend"]
        },
        {
            key:"description",
            title:"Description",
            dataIndex:"description",
            sorter:(a,b)=>a.description >b.description, 
            sortDirections: [ "ascend" ,"descend"]
        },
        {
            key:"dueDate",
            title:"Due Date" ,
            dataIndex:"dueDate",
            render: (text,record,index)=>{ 
                // console.log("now we are in date colum") 
                // console.log(index)
                if(index>1){ 
                    console.log("in date column")
                    const updatedDate=  record.dueDate.format('DD-MM-YY') 
                    console.log(updatedDate)
                    return updatedDate
                }
                return text 
                
            },
            sorter:(a,b)=>a.dueDate >b.dueDate, 
            sortDirections: [ "ascend" ,"descend"]
        },
        {
            title: 'Tags',
            dataIndex: 'tags',
            key: 'tags',
            render: tags => (
              <>
                {tags.map(tag => (
                  <label key={tag} className="tag" style={{marginRight: '5px'}} >{tag}</label>
                ))}
              </>
            ),
            filters:[
                { text:"IMPORTANT", value:"IMPORTANT" },
                { text:"MOST IMPORTANT", value:"MOST IMPORTANT" },
                { text: "LESS IMPORTANT", value:"LESS IMPORTANT"}
                
            ],
            onFilter:(value, record)=>  
                {console.log(record.tags) 
                    console.log("here") 
                
                 return record.tags.indexOf(value)===0},
            
          },
         {
            key:"status",
            title:"Status",
            dataIndex:"status",
            filters: [
                {
                    text:"OPEN",
                    value:"OPEN", 
                },
                {
                    text:"WORKING",
                    value:"WORKING", 
                },
                {
                    text:"DONE",
                    value:"DONE", 
                },
                {
                    text:"OVERDUE",
                    value:"OVERDUE", 
                },
            ],
            onFilter:(value, record)=>  
                // console.log("filter")
                record.status.indexOf(value)===0,
                
         }, 

        {
            key:"action",
            title:"Actions",
            render:(record)=>{
                return(
                    <div>
                    <EditOutlined style={{color:"black"}} onClick={()=> Edit(record)} />
                    <DeleteOutlined className="delete_icon" style ={{color:"red"}} onClick={()=> Delete(record)} />
                    </div> 
                )
            }
        }
    ] 
    
     

    const [title,setTitle]=useState("") 
    const [description, setDescription]= useState("") 
    const [dueDate, setDueDate] = useState("") 
    const [tags, setTags]= useState([]) 
    const [status, setStatus] = useState('OPEN') 
    const [showForm, setShowForm] = useState(false)
    const [loading, setLoading] = useState(false)

    const onChangeTitle=(event)=>{
          const title= event.target.value 
          setTitle(title)
    }

    const onChangeDescription=(event)=>{
        const description= event.target.value 
        setDescription(description)
    }

    const onChangeDueDate=(event)=>{ 
        console.log("this is how date looks") 
        console.log(event)
        const date=  event.format('DD-MM-YY') 
        console.log("this is how formatted date looks")
        console.log(date)
        setDueDate(event)
    }
    
    const onChangeTags =(event)=>{
        // const tags= event.tagret.value 
        console.log(event)
        setTags(event)
    }
    
    const onChangeStatus=(event)=>{
        // const status = event.target.value
        console.log(event) 
        setStatus(event) 
    }
    
    const defaultState=()=>{
        setTitle("")  
        setDescription('')
        setDueDate('')
        setTags([])
         setStatus("")
        setShowForm(false)
    }

    const onSubmitForm =()=>{ 
        // console.log("form submitted")
        setLoading(true) 
        setTimeout(()=>{setLoading(false)}, 500)
        const currentDate = new Date();
        const day = currentDate.getDate().toString().padStart(2, '0');
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const year = currentDate.getFullYear().toString().slice(-2);
        const timestamp =  `${day}-${month}-${year}`
        // console.log(title)
        const toDo={
            id:uuid(),
            currentTime:timestamp, 
                title:title,
                description:description,
                dueDate:dueDate,
                tags:tags,
                status:status 
        }
        console.log(toDo) 
        
        // data.push(toDo) 

         const newData= [...data, toDo]
         console.log(newData)
        setData( newData)
        defaultState()
    } 

    const statusList=['OPEN', 'WORKING', 'DONE','OVERVIEW']
    const tagsOptions= ['BUG','IMPORTANT','NOT IMPORTANT']   

    const onUpdate=()=>{
       setLoading(true) 
       setTimeout(()=>{setLoading(false)}, 200)
        const toDo={
            id: edit.id, 
            currentTime:edit.currentTime,
                title:title,
                
                description:description,
                dueDate:dueDate,
                tags:tags,
                status:status 
        } 

        const newData= data.map(eachItem=>{
            if(eachItem.id===toDo.id){
                return {
                    ...toDo
                }
            }else{
                return eachItem
            }
        }) 

        setData(newData) 
        setShowUpdateForm(false) 
        setShowForm(false)
        defaultState()
    }

    const renderShowForm=()=>{
            setShowForm(true)
    } 

    const onCancelUpdate=()=>{
        setShowForm(false)
        defaultState() 
    }
    
    const renderFormButton=()=>{
        if(showUpdateForm){
            return ( 
                 
                   <Form.Item >
                <Button type='primary' onClick={onUpdate}  loading={loading}  >UPDATE</Button> 
                <Button className="cancel_btn" type='primary' onClick={onCancelUpdate}     >CANCEL</Button> 
               </Form.Item>  

               
                 
            )
        } 

        return(
            <Form.Item >
                        <Button  type='primary' htmlType='submit' loading={loading}  >ADD</Button>
                        <Button className="cancel_btn" type='primary' onClick={onCancelUpdate}     >CANCEL</Button> 
            </Form.Item>   
        )
    }

    const renderToDoForm=()=>{
        // console.log("this is showform")
        // console.log(showForm) 
        // console.log("in form")
        // console.log(title)
        if(showForm){
            return( 
            <div>
               <Form onFinish={onSubmitForm} className="form">
                   <Form.Item label="TITLE" name="title">
                       
                       <Input
                        placeholder="Title" maxLenght={100} 
                        allowClear
                        required 
                        defaultValue={title}
                        onChange={onChangeTitle}
                       ></Input>
                   </Form.Item>

                   <Form.Item label="DESCRIPTION" name="description">
                       <Input.TextArea onChange={onChangeDescription} rows={4} defaultValue={description} placeholder="DESCRIPTION"  required ></Input.TextArea>
                   </Form.Item> 

                   <Form.Item label="SELECT DUE DATE" name="date">
                        <DatePicker defaultValue={dueDate}  onChange={onChangeDueDate}/>
                   </Form.Item> 
                   
                   <Form.Item label="TAGS">
                        <Select mode='tags' placeholder="Select Status" defaultValue={tags} allowClear style={{width:"40%"}} onChange={onChangeTags}>
                                {
                                    tagsOptions.map((tag,index)=>{
                                        return <Select.Option key={index} value={tag} >{tag}</Select.Option>
                                    })
                                }
                        </Select>
                   </Form.Item>

                   <Form.Item label="STATUS">
                        <Select 
                        onChange={onChangeStatus}
                        rules={[{ required: true, message: 'Please select an option' }]}  
                        placeholder="Select Status" style={{width:"40%"}}
                        value= {status}
                        >
                                {
                                    statusList.map((status,index)=>{
                                        return <Select.Option   key={index} value={status} >{status}</Select.Option>
                                    })
                                }
                        </Select>
                   </Form.Item> 

                   {renderFormButton()}
                   
                    
               </Form>
            </div>)
        } 

        return(
            <div>
                <Button className='add_new_btn' type="primary" onClick={renderShowForm}>Add</Button>
            </div>
        )
            
    }

    
     
    const renderTable=(data)=>{
        //  console.log('this is rendered')
        // console.log(data)
        return(
        <Table className="table" loading={false}  dataSource={data} columns={column} pagination={{pagination:8, total:50, showSizeChanger:true}} />
        )
    }

    return( 
        <div className="main-bg"> 
             
            {/* {renderEditModal()} */}
             {renderToDoForm()}
             {renderTable(data)}
           {/* <Table loading={false}  dataSource={data} columns={column} pagination={{pagination:8, total:50, showSizeChanger:true}} /> */}
             
        </div>
    )  
    
    


}
export default Task