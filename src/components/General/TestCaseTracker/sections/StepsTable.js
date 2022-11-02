import React, { useState, useEffect } from 'react';
import TStepStatusLabel from '../../../General/StatusLabel/TStepStatusLabel';
import { FormOutlined  } from '@ant-design/icons';
import { IN_PROGRESS_STATUS,TS_STATUS_FAILED, TS_STATUS_PASSED,TS_STATUS_BLOCKED,TS_STATUS_NOT_APPLICABLE  } from '../../../../shared/constants';
import TCStatusLabel from '../../../General/StatusLabel/TCStatusLabel';
const uniqid = require('uniqid');

function StepsTable(props) {
    const label = (tse_status) =>{
        if( tse_status === TS_STATUS_FAILED ) {
            return 'Failed';
        } else if(tse_status === TS_STATUS_BLOCKED){
            return 'Blocked';
        } else if(tse_status === TS_STATUS_NOT_APPLICABLE){
            return 'Not Applicable';
        } else if(tse_status === TS_STATUS_PASSED){
            return 'Passed';
        }else{
            return ''
        }
    }
    const rowBg = (key) => {
        return (key % 2 == 0) ? 'dark' : 'light';
    }
    
    const tcEnabled = localStorage.getItem('isEnabledTCexec');
    // const labelStatus = (code) => {
    //     if(code === TS_STATUS_FAILED){
    //         return <span className={colorCode()+" tst right"}>Failed</span>
    //     }else if(code === TS_STATUS_NOT_APPLICABLE){
    //         return <span className={colorCode()+" tst right"}>Not Applicable</span>
    //     }else if(code === TS_STATUS_BLOCKED){
    //         return <span className={colorCode()+" tst right"}>Blocked</span>
    //     }else if(code === TS_STATUS_PASSED){
    //         return <span className={colorCode()+" tst right"}>Passed</span>
    //     }
    // }
    const rows = (items) => {
       
        let content = [];
        if(items.length >= 1){
           
            items.map(( item, key ) =>
                content.push(
                    <tr key={ uniqid() }>
                       <td className={ rowBg(key) }>{ item.ts_stepNum }</td>
                       
                       <td className={ rowBg(key) }>{ item.ts_desc }</td>
                       <td className={ rowBg(key) }>{ item.ts_expectedResult }</td>
                       <td className={ rowBg(key) + " relative"}>
                           { item.actualResult }
                           { (item.actualResult !== '' || props.tcStatus === IN_PROGRESS_STATUS && key <= props.preq || props.tcStatus === IN_PROGRESS_STATUS && key === 0) ?
                            <span className='edit-actRslt' onClick={() => props.editAclRslt(key)}><FormOutlined /></span>
                            : '' }
                        </td>
                       <td className={ rowBg(key) }>
                           {  (props.tcStatus === IN_PROGRESS_STATUS && item.actualResult !== "") ? 
                            <TCStatusLabel forTestStep={true} label={ label(item.tse_status) } status={ item.tse_status } />
                            // labelStatus(item.tse_status)
                            : '' }
                        </td>
                    </tr>
                    
                )
            )
        }

        return content;
    }
   
    return (
        <table border="1">
            <thead>
                <tr key={ uniqid() }>
                    <th>Step</th>
                    
                    <th>Description</th>
                    <th>Expected Result</th>
                    <th>Actual Result</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                { (props.rows !== undefined) ? rows(props.rows) :<tr></tr> }
            </tbody>
        </table>
    )
}
export default StepsTable;
