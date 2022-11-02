import React, { useState} from 'react';
import {Modal, ModalBody, ModalFooter,MDBModalHeader } from 'mdbreact';
import { CloseCircleTwoTone } from '@ant-design/icons';
import SubmitBtn from '../Buttons/SubmitBtn';
import CancelBtn from '../Buttons/CancelBtn';

function ReviewRemarksModal(props) {
      const [remark , setRemarks] =  useState("");
      
     const  changeRemarks = (e) => {
        setRemarks(e.target.value);
    };
    const SaveChanges=()=>{
  
        props.save(remark);
    };
    return(
        <Modal isOpen={props.isOpen} className="cascading-modal" size="lg">
            <MDBModalHeader className='modal-head-gold'>
            {props.text}
                <CloseCircleTwoTone twoToneColor="#cca453" className="modal-close" onClick={ props.close }/>
            </MDBModalHeader>
            <ModalBody className="grey-text" >
               
                <div className='top-15'><b>Remarks: </b></div>
                <div className='small-text text-color-red'>{ props.errReason }</div>
                <textarea className='form-control' cols="20" onChange={changeRemarks }></textarea>


            </ModalBody>
            <ModalFooter>
                <SubmitBtn title="Save" onClick={SaveChanges} />
                <CancelBtn title="Cancel" onClick={ props.close }/>
            </ModalFooter>

        </Modal>
    )
}
export default ReviewRemarksModal;
