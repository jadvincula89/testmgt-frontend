import { TS_STATUS_FAILED, TS_STATUS_PASSED,TS_STATUS_BLOCKED,TS_STATUS_NOT_APPLICABLE } from '../../../shared/constants';
import './status.scss';

function TCStatusLabel(props) {
    const colorCode = () => {
        let code = props.status;
        if(props.forTestStep === true){
            if(code === TS_STATUS_FAILED){
                return 'Failed';
            }else if(code === TS_STATUS_NOT_APPLICABLE){
                return 'Not-Applicable';
            }else if(code === TS_STATUS_BLOCKED){
                return 'Blocked';
            }else if(code === TS_STATUS_PASSED){
                return 'Passed';
            }
        }else{
            if(code < 2){
                return 'unassigned';
            }else if(code >= 2 && code <= 4){
                return 'inProgress';
            }else if(code === 5){
                return 'completed';
            }else if(code > 5){
                return 'reject';
            }
        }
        
    }
    return(
        <span className={colorCode()+" tst right"}>{ props.label }</span>
    )
}
export default TCStatusLabel;
