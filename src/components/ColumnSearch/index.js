import {Input,Button} from 'antd'
import {SearchOutlined } from '@ant-design/icons'
import './index.css' 

const ColumnSearch=(props)=>{
    // const args = props 
    const {setSelectedKeys, selectedKeys,confirm, clearFilters,}= props 
    
    
    const handleOnChange=(event)=>{
        const search = event.target.value 
        setSelectedKeys(search?[search]:[])
        
        console.log("slectedKeys")
        console.log(selectedKeys)
        confirm({closeDropDown:false}) 
    }
    
    const handleConfrim=()=>{
        confirm()
    }
    
    const handelCancel=()=>{
         
        clearFilters()
        confirm()
    }

    return(
        <div className='column_search_container'>
          <Input
             placeholder='Enter text'
             prefix={<SearchOutlined />} 
             onChange= {handleOnChange} 
             onPressEnter={handleConfrim} 
             value={selectedKeys[0]}  
             className="column_search"
          >
          </Input> 
          <br/>

          <Button type="primary" onClick={handleConfrim}>
               Search 
          </Button>
          <Button type="primary" className='column_cancel_btn' onClick={handelCancel} >
               Cancel 
          </Button>

        </div>
    )
}
export default ColumnSearch