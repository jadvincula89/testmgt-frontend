import {Modal, ModalBody, ModalFooter,MDBModalHeader } from 'mdbreact';
import { CloseCircleTwoTone } from '@ant-design/icons';
import SubmitBtn from '../Buttons/SubmitBtn';
import CancelBtn from '../Buttons/CancelBtn';
const uniqid = require('uniqid');
function RejectTestCase(props) {
    const reasonOptions = () => {
        let reasons = (props.status_reasons[6] !== undefined) ? props.status_reasons[6].reasons : [];
        var content = [];

        reasons.map((r) =>{
            content.push(
                <option key={ uniqid()} value={ r.r_id }>{ r.r_reason }</option>
            )
        })

        return content;
        
    }
    const statusReasons = () => {
        let status = props.status_reasons;
        var content = [];
        Object.keys(status).forEach(function(k) {
            content.push(
                <option key={ uniqid()} value={ k }>{ status[k]['status'] }</option>
            )
        })
        return content;
    }
    return(
        <Modal isOpen={props.isOpen} className="cascading-modal" size="lg">
            <MDBModalHeader className='modal-head-err'>
                Reject Assignment
                <CloseCircleTwoTone twoToneColor="#cca453" className="modal-close" onClick={ props.close }/>
            </MDBModalHeader>
            <ModalBody className="grey-text" >
               
                <div className='top-15'>
                    <div><b>Reason Type: </b></div>
                    <div className='small-text text-color-red'>{ props.errReasonType }</div>
                    <div className='col-md-4'>
                        <select className='form-control ' name="rejectReason" onChange={ props.changeExitType } value={ props.rejectReason }>
                            <option value="" key={ uniqid()}></option>
                            { reasonOptions() }
                        </select>
                    </div>
                </div>
                    
                <div className='top-15'><b>Reason: </b></div>
                <div className='small-text text-color-red'>{ props.errReason }</div>
                <textarea className='form-control' cols="20" onChange={ props.changeRejectReasonValue }></textarea>

            </ModalBody>
            <ModalFooter>
                <SubmitBtn title="Save" onClick={ props.save }/>
                <CancelBtn title="Cancel" onClick={ props.close }/>
            </ModalFooter>

        </Modal>
    )
}
export default RejectTestCase;
