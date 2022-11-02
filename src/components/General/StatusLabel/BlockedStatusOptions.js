import React from 'react';
import './status.scss';
import { PASSED_STATUS, BLOCKED_STATUS,FAILED_STATUS, TS_STATUS_UNKNOWN } from '../../../shared/constants';
function BlockedStatusOptions(props) {
    // const [ isOpen, setIsOpen ] = useState(false);

    // const openTSChangeStatus = () => {
        
    //     setIsOpen( !isOpen );
    // }


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
        <select className={label+" tst tstepStatus"} onChange={ props.onChange } id={ props.tc_id } name={ props.index } >
                    <option value={ props.combolabels }>{props.combolabels==BLOCKED_STATUS && props.selectedid==props.tc_id  ? 'Blocked':'' }</option>
                  
            
            <option value={ BLOCKED_STATUS }>Blocked</option>
         
        </select>
    );
    
}
export default BlockedStatusOptions;
