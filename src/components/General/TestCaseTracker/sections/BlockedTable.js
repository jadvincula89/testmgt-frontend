import React, { useState, useEffect } from 'react';
import ReviewTableRowValue from './ReviewTableRowValue';
import BlockedStatusOptions from '../../StatusLabel/BlockedStatusOptions';
import { FormOutlined  } from '@ant-design/icons';

const uniqid = require('uniqid');

function BlockedTable(props) { 

    const rowBg = (key) => {
        return (key % 2 == 0) ? 'dark' : 'light';
    }
    
    const rowData = (key, item) => {
        return(
            < >
                <tr key={ uniqid() } >
                    <td className={ rowBg(key)+ ' hoverable' } data-id={ key } key={ uniqid() } onClick={ props.selectRow }>{ item.sc_code }</td>
                    <td className={ rowBg(key)+ ' hoverable'  } data-id={ key } key={ uniqid() } onClick={ props.selectRow }>{ item.sc_title }</td>
                    <td className={ rowBg(key)+ ' hoverable'  } data-id={ key } key={ uniqid() } onClick={ props.selectRow }>{ item.tc_instanceid }</td>
                    <td className={ rowBg(key)+ ' hoverable'  } data-id={ key } key={ uniqid() } onClick={ props.selectRow }>{ item.tc_title }</td>
                    <td className={ rowBg(key)+ ' hoverable'  } data-id={ key } key={ uniqid() } onClick={ props.selectRow }>{ item.tester }</td>
                    <td className={ rowBg(key)+ ' hoverable'  } data-id={ key } key={ uniqid() } onClick={ props.selectRow }>{ item.te_lastUpdateDate }</td>
                    <td className={ rowBg(key) + " relative hoverable"} data-id={ key } key={ uniqid() } >
                        <BlockedStatusOptions  onChange={ props.selectStatus } setActiveRow = { props.selectRow } combolabels={props.dropdownselected} selectedid={props.selectedID} tc_id={ item.tc_id } index={ key }/>
                    </td>
                    
                </tr>
                <tr className={ (props.activeKey != "" && props.activeKey == key) ? '' : 'hide' }>
                    <td colSpan="7"  className={ rowBg(key)+ ' hoverable' } data-id={ key }><ReviewTableRowValue data={ item.steps }  key={ uniqid() }/></td>
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
        <table border="1">
            <thead>
                <tr key={ uniqid() }>
                    <th  key={ uniqid() }>Scenario Code</th>
                    <th  key={ uniqid() }>Scenario Title</th>
                    <th  key={ uniqid() }>Test Case ID</th>
                    <th  key={ uniqid() }>Test Case</th>
                    <th  key={ uniqid() }>Last updated by</th>
                    <th  key={ uniqid() }>Last updated on</th>
                    <th  key={ uniqid() }>Actions</th>
                </tr>
            </thead>
            <tbody  key={ uniqid() }>
                { (props.data !== undefined && props.data.length >= 1) ? rows(props.data) : <tr  key={ uniqid() }><td  colSpan="6" className='light'>No data found</td></tr> }
            </tbody>
        </table>
    )
}
export default BlockedTable;
