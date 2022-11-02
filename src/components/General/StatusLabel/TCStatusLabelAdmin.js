import { TS_STATUS_FAILED, TS_STATUS_PASSED,TS_STATUS_BLOCKED,TS_STATUS_NOT_APPLICABLE } from '../../../shared/constants';
import './status.scss';

function TCStatusLabelAdmin(props) {
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
              if(code==='Assigned' || code==='Review'){
                return 'assigned';
            }
            if(code==='Unassigned'){
                return 'unassigned';
            }else if(code === 'Passed' || code === 'Failed' || code === 'Abandon' || code === 'Blocked' || code==='For Update' || code==='For Rejection'){
                return 'reject';
            }else if(code === 'Completed'){
                return 'completed';
            }else if(code==='Rejected'){
                return 'reject';
            }
             else if(code === 'In-Progress' || code==='For Execution'){
                return 'inProgress';
            }
        }
        
    }
    return(
        <span className={colorCode()+" tst right"}>{ props.label }</span>
    )
}
export default TCStatusLabelAdmin;
