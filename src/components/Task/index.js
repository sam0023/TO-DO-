
 
import React,{useState} from 'react' 
import {Modal, Table, } from 'antd'

import { EditOutlined, DeleteOutlined} from '@ant-design/icons';
import './index.css'    


const Task=()=>{
    const Data= [
        {   id:1,
            currentTime:"10-2-23",
            title:"trail1",
            description:"this is trail1",
            dueDate:"12-2-23",
            tags:["IMPORTANT","LESS IMPORTANCE"] ,
            status:"WORKING"
        },
        {   
            id:2,
            currentTime:"11-2-23",
            title:"trail2",
            description:"this is trail2",
            dueDate:"13-2-23",
            tags:["MOST IMPORTANT","fail"] ,
            status:"DONE"
        }
    ] 

    const [data, setData] = useState(Data) 

    const [ visible, setVisible]= useState(false)
   
    // const Edit=()=>{
    //     console.log("edit")
    //     setVisible(true) 
    //     return x
    // } 
   
    // const x=( 
    // <Modal>
    //     title="Edit"
    // </Modal>
    // )

     
const Edit = () => { 
 setVisible(true); 
}; 






    const Delete=(record)=>{
         
        Modal.confirm({
            title:"Are you sure you want to delete this",
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
                  <label style={{marginRight: '5px'}} >{tag}</label>
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
                    <DeleteOutlined style ={{color:"red"}} onClick={()=> Delete(record)} />
                    </div> 
                )
            }
        }
    ] 
    
    const renderEditModal=()=>{
        return( 
        <Modal 
            title="Edit Details" 
            visible={visible} 
            onCancel={() => setVisible(false)} 
            onOk={() => setVisible(false)} 
            okText="Save" 
        ></Modal>
        );
    }

    return(
        <div> 
            {renderEditModal()}
             
           <Table  dataSource={data} columns={column} pagination={{pagination:8, total:50, showSizeChanger:true}} />
        </div>
    )  
    
    


}
export default Task