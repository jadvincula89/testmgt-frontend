import React from 'react';
import './status.scss';
import { PASSED_STATUS, BLOCKED_STATUS,FAILED_STATUS, TS_STATUS_UNKNOWN,ABANDON_STATUS,IN_PROGRESS_STATUS,FOR_REJECTION_STATUS,REJECTED_STATUS,ASSIGNED_STATUS,FOR_EXECUTION_STATUS } from '../../../shared/constants';
const uniqid = require("uniqid");
function ReviewStatusOptions(props) {
 

    const colorCode = () => {
        let code = props.status;
        // if(code === TS_STATUS_PASSED){
        //     return 'Passed';
        // }else if(code === TS_STATUS_FAILED){
        //     return 'Failed'
        // }else{
        //     return ''
        // }
        return ''
    }
  
   
     const label = colorCode();
    
    return (
        <select key={uniqid()} className={label+" tst tstepStatus"} onChange={ props.onChange } id={ props.tc_id } name={ props.index } >
            <option value={ props.combolabels }>
                 {props.combolabels==FOR_EXECUTION_STATUS  && props.selectedid==props.tc_id  ? 'Ready for Execution':'' }
                {props.combolabels==ABANDON_STATUS  && props.selectedid==props.tc_id  ? 'Abandon':'' }
                {props.combolabels==BLOCKED_STATUS  && props.selectedid==props.tc_id  ? 'Blocked':'' }
                {props.combolabels==FAILED_STATUS  && props.selectedid==props.tc_id  ? 'Failed':'' }
                {props.combolabels==IN_PROGRESS_STATUS  && props.selectedid==props.tc_id  ? 'In-Progress':'' }
                 {props.combolabels==REJECTED_STATUS  && props.selectedid==props.tc_id  ? 'Rejected':'' }
               

            </option>
            {   props.option=='rejected' && <option value={ ABANDON_STATUS }>Abandon</option>}
            {  props.option=='review' && <option value={ ABANDON_STATUS }>Abandon</option>}
            {   props.option=='rejected' && <option value={ REJECTED_STATUS }>Rejected</option>}
            {  props.option=='review' && <option value={ FOR_EXECUTION_STATUS }>Ready for Execution</option>}
            {  props.option=='review' && <option value={ BLOCKED_STATUS }>Blocked</option>}
             {  props.option=='rejected' && <option value={ FOR_EXECUTION_STATUS }>Ready for Execution</option>}
            {  props.option=='rejected' && <option value={ BLOCKED_STATUS }>Blocked</option>}
            {    props.option=='review' && <option value={ FAILED_STATUS }>Failed</option>}
            {   props.option=='reviewokay' && <option value={ IN_PROGRESS_STATUS }>In-Progress</option>}
         
        </select>
    );
    
}
export default ReviewStatusOptions;
