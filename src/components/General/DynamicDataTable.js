import React from 'react';
const uniqid = require('uniqid');
function DynamicDataTable(props) {
    const rowBg = (key) => {
        return (key % 2 == 0) ? 'dark' : 'light';
    }
    const rowData = (key, item) => {
        return(
            <>
                <tr key={ uniqid() } className='d-flex'>
                    <td className={ rowBg(key)+' col-1' } key={ uniqid() }>{ key + 1 }</td>
                    <td className={ rowBg(key)+' col-2' } key={ uniqid() }>{ item.tc_instanceid }</td>
                    <td className={ rowBg(key)+' col-2' } key={ uniqid() }>{ item.tc_title }</td>
                    <td className={ rowBg(key)+' col-2' } key={ uniqid() }>{ item.attr }</td>
                    <td className={ rowBg(key)+' col-2' } key={ uniqid() }>{ item.value }</td>
                    <td className={ rowBg(key)+' col-3' } key={ uniqid() }>{ item.remarks }</td>
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
    return(
        <table border="1" className='sub-tbl'  key={ uniqid() }>
            
            <thead  key={ uniqid() }>
                <tr key={ uniqid() } className='d-flex'>
                    <th key={ uniqid() } className='col-1'>#</th>
                    <th key={ uniqid() } className='col-2'>Test Case ID</th>
                    <th key={ uniqid() } className='col-2'>Test Case Title</th>
                    <th key={ uniqid() } className='col-2'>Attribute</th>
                    <th key={ uniqid() } className='col-2'>Value</th>
                    <th key={ uniqid() } className='col-3'>Remarks</th>
                </tr>
            </thead>
            <tbody  key={ uniqid() }>
                { (props.data !== undefined) ? rows(props.data) : <tr></tr> }
            </tbody>
        </table>
    )

}
export default DynamicDataTable;