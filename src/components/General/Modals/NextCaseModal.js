import {Modal, ModalBody, ModalFooter,MDBModalHeader } from 'mdbreact';
import { CloseCircleTwoTone } from '@ant-design/icons';
import SubmitBtn from '../Buttons/SubmitBtn';
import CancelBtn from '../Buttons/CancelBtn';

function NextCaseModal(props) {
    
    return(
        <Modal isOpen={props.isOpen} className="cascading-modal" size="lg">
            <MDBModalHeader className='modal-head-blue'>
                Save & Next Case
                <CloseCircleTwoTone twoToneColor="#4863cf" className="modal-close" onClick={ props.close }/>
            </MDBModalHeader>
            <ModalBody className="grey-text" >
                {/* <div><b>Status: </b></div>
                <div className='col-md-4'>
                    <select className='form-control ' onChange={ props.changeSaveType } name="save">
                        <option value="">-- Select --</option>
                        <option value={ COMPLETED_STATUS }>Completed</option>
                        <option value={ FAILED_STATUS }>Failed</option>
                        <option value={ REJECT_STATUS }>Reject</option>
                        <option value={ BLOCKED_STATUS }>Blocked</option>
                        <option value={ DEFECT_STATUS }>Defect</option>
                    </select>
                </div> */}
                
                <div className='top-15'><b>Result: </b></div>
                <textarea className='form-control' cols="20"  onChange={ props.changeSaveReasonValue } name='save'></textarea>

                <div className='top-15'><b>Proof of Test:</b><span className='text-color-red'>*</span></div>
                <div className='small-text text-color-red'>{ props.errorSavingPOT }</div>
                <input type="text" className='form-control' name="pot" onChange={ props.changeSaveReasonValue } value={ props.tc_pot } placeholder="URL Link only"/>
                

            </ModalBody>
            <ModalFooter>
                <SubmitBtn title="Save" onClick={ props.save } name="save"/>
                <CancelBtn title="Cancel" onClick={ props.close }/>
            </ModalFooter>

        </Modal>
    )
}
export default NextCaseModal;
