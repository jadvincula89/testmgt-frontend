import React, { useState } from 'react';
import { TS_STATUS_FAILED, TS_STATUS_PASSED } from '../../../../shared/constants';
import DynamicDataService from '../../../../services/DynamicDataService';
import { Button } from "react-bootstrap";
const uniqid = require('uniqid');

function DynamicTableRowValue(props) { 
    
    // const [ uniqueValue ] = useState( DynamicDataService.getUniqueValue(props.data) );
    // const [ uniqueAttr ] = useState( DynamicDataService.getUniqueAttr(props.data) );

    // const [ filterValue, setFilterValue ] = useState('');
    // const [ filterAttr, setFilterAttr ] = useState('');

    // const [ initialData ] = useState(props.data)
    const [ data , setData ] = useState(props.data)
    
    const rowBg = (key) => {
        return (key % 2 == 0) ? 'dark' : 'light';
    }
    
    const statusCode = (status) => {
        let code = status;
        if(code === TS_STATUS_PASSED){
            return <span className='text-color-green bold'>Passed</span>;
        }else if(code === TS_STATUS_FAILED){
            return <span className='text-color-red bold'>Failed</span>;
        }else{
            return ''
        }
    }
    const rowData = (key, item) => {
       
        return(
            <>
                <tr key={ uniqid()+2 }>
                    <td className={ rowBg(key) } key={ uniqid() }>{item.tc_instanceid}</td>
                    <td className={ rowBg(key) } key={ uniqid() }>{ item.attr }</td>
                    <td className={ rowBg(key) } key={ uniqid() }>{ item.value }</td>
                    <td className={ rowBg(key) } key={ uniqid() }>{ item.remarks }</td>
                   
                </tr>
            </>
        )
    }

    const rows = (items) => {
        
        let content = [];
        if(items.length >= 1){
            
            items.map(( item, key ) =>
                content.push(
                    rowData(key, item)
                )
            )
           
        }

        return content;
    }
    
    


    return (
        <div className='m-l-f-30'  key={ uniqid() }>

            <table border="1" className='sub-tbl'  key={ uniqid() }>
                <thead  key={ uniqid() }>
                    <tr key={ uniqid() }>
                        <th key={ uniqid() }>Test Case ID</th>                  
                        <th key={ uniqid() }>Data Name</th>
                        <th key={ uniqid() }>Data Value</th>
                        <th key={ uniqid() }>Remarks</th>
                    </tr>
                </thead>
                <tbody  key={ uniqid() }>
                    { rows(data) }
                </tbody>
            </table>
        </div>
    )
}
export default DynamicTableRowValue;
