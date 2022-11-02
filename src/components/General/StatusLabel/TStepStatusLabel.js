import React from 'react';
import './status.scss';
import { TS_STATUS_FAILED, TS_STATUS_PASSED, TS_STATUS_UNKNOWN,TS_STATUS_NOT_APPLICABLE ,TS_STATUS_BLOCKED} from '../../../shared/constants';
const uniqid = require('uniqid');
function TStepStatusLabel(props) {
    // const [ isOpen, setIsOpen ] = useState(false);

    // const openTSChangeStatus = () => {
        
    //     setIsOpen( !isOpen );
    // }

  
    const colorCode = () => {
        let code = props.status;
       
        if(code == TS_STATUS_PASSED){
            return 'Passed';
        }else if(code == TS_STATUS_FAILED){
            return 'Failed'
        }else{
            return ''
        }
    }
    const label = colorCode();
    
    return (
        
        <select className={label+" tst tstepStatus"} onChange={ props.onChange } id={ props.tse_id } value={ props.tse_status }>
            <option key={ uniqid() } value={ TS_STATUS_UNKNOWN }></option>
            <option key={ uniqid() } value={ TS_STATUS_FAILED }>Failed</option>
            <option key={ uniqid() } value={ TS_STATUS_PASSED }>Passed</option>
            <option key={ uniqid() } value={ TS_STATUS_NOT_APPLICABLE }>Not Applicable</option>
            <option key={ uniqid() } value={ TS_STATUS_BLOCKED }>Blocked</option>
        </select>
    );
    
}
export default TStepStatusLabel;
