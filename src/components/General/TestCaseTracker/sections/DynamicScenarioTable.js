import React, { useState, useEffect } from 'react';
import DynamicTableRowValue from './DynamicTableRowValue';
import RejectStatusOptions from '../../StatusLabel/RejectStatusOptions';
import { FormOutlined  } from '@ant-design/icons';
import {
    Alert,
    Form,
    Button,
    Card,
    Col,
    Row,
    Container,
    InputGroup
  } from "react-bootstrap";
const uniqid = require('uniqid');

function DynamicScenarioTable(props) { 

    const rowBg = (key) => {
        return (key % 2 == 0) ? 'dark' : 'light';
    }
    
    const rowData = (key, item) => {
        
        return(
            < >
                <tr key={ uniqid() } >
                    <td className={ rowBg(key)+ ' hoverable' } data-id={ key } key={ uniqid() } onClick={ props.selectRow }>{ item.sc_code }</td>
                    <td className={ rowBg(key)+ ' hoverable'  } data-id={ key } key={ uniqid() } onClick={ props.selectRow }>{ item.sc_title }</td>
                    <td className={ rowBg(key)+ ' hoverable'  } data-id={ key } key={ uniqid() } onClick={ props.selectRow }>{ item.tester }</td>
                    <td className={ rowBg(key)+ ' hoverable'  } data-id={ key } key={ uniqid() } onClick={ props.selectRow }>{ item.te_lastUpdateDate }</td>
                    <td className={ rowBg(key) + " relative hoverable"} data-id={ key } key={ uniqid() } >
                    
                      

                        <Button variant="success" key={ uniqid() } id={item.sc_id} name={item.sc_id}  onClick={ props.selectStatus }> 
                        Clone
                    </Button>
                    </td>
                    
                </tr>
                <tr  className={ (props.activeKey != "" && props.activeKey == key) ? '' : 'hide' } >
                    <td colSpan="7"  className={ rowBg(key)+ ' hoverable' } data-id={ key } key={ uniqid() }><DynamicTableRowValue data={ item.dynamic_data }  key={ uniqid() } index={ key }/></td>
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
        <table border="1" key={ uniqid() }>
            <thead key={ uniqid() }>
                <tr key={ uniqid() }>
                    <th  key={ uniqid() }>Scenario Code</th>
                    <th  key={ uniqid() }>Scenario Title</th>
                    
                    <th  key={ uniqid() }>Last updated by</th>
                    <th  key={ uniqid() }>Last updated on</th>
                    <th  key={ uniqid() }>Actions</th>
                </tr>
            </thead>
            <tbody  key={ uniqid() }>
                { (props.data !== undefined && props.data.length >= 1) ? rows(props.data) : <tr  key={ uniqid() }><td  colSpan="7" className='light'>No data found</td></tr> }
            </tbody>
        </table>
    )
}
export default DynamicScenarioTable;
