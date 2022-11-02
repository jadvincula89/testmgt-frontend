import {Modal, ModalBody, ModalFooter,MDBModalHeader } from 'mdbreact';
import { CloseCircleTwoTone } from '@ant-design/icons';
import SubmitBtn from '../Buttons/SubmitBtn';
import CancelBtn from '../Buttons/CancelBtn';
import { FAILED_STATUS, BLOCKED_STATUS,FAILED_TO_REVIEW_STATUS } from '../../../shared/constants';
const uniqid = require('uniqid');
function ExitToNextCaseModal(props) {
    const reasonOptions = () => {
        let reasons = props.reasons.reasons;
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
            if(k !== 6 && k !== '6') {
                content.push(
                    <option key={ uniqid()} value={ k }>{ status[k]['status'] }</option>
                )
            }
        })
        return content;
    }
    return(
        <Modal isOpen={props.isOpen} className="cascading-modal" size="lg">
            <MDBModalHeader className='modal-head-gold'>
                Exit to Next Case
                <CloseCircleTwoTone twoToneColor="#cca453" className="modal-close" onClick={ props.close }/>
            </MDBModalHeader>
            <ModalBody className="grey-text" >
                <div><b>Change Status: </b></div>
                <div className='small-text text-color-red'>{ props.errReasonType }</div> 
                <div className='col-md-4'>
                    <select className='form-control ' onChange={ props.changeExitType } value={ props.exitReasonType }>
                        <option key={ uniqid()} value="" >-- Select --</option>
                        { statusReasons() }
                        {/* <option key={ uniqid()} value={ FAILED_STATUS }>Failed</option>
                        <option key={ uniqid()} value={ BLOCKED_STATUS }>Blocked</option>
                        <option key={ uniqid()} value={ FAILED_TO_REVIEW_STATUS }>Failed to Review</option> */}
                    </select>
                </div>
                {
                     ( props.reasons.reasons !== undefined && props.reasons.reasons.length >= 1 ) ? 
                       <div className='top-15'>
                           <div><b>Reason Type: </b></div>
                            <div className='col-md-4'>
                                <select className='form-control ' name="exitReason" onChange={ props.changeExitType } value={ props.exitReason }>
                                    <option value="" key={ uniqid()}></option>
                                    { reasonOptions() }
                                </select>
                            </div>
                        </div>
                    : ""
                }
                <div className='top-15'><b>Reason: </b></div>
                <div className='small-text text-color-red'>{ props.errReason }</div>
                <textarea className='form-control' cols="20" onChange={ props.changeExitReasonValue }></textarea>


            </ModalBody>
            <ModalFooter>
                <SubmitBtn title="Save" onClick={ props.save } />
                <CancelBtn title="Cancel" onClick={ props.close }/>
            </ModalFooter>

        </Modal>
    )
}
export default ExitToNextCaseModal;
