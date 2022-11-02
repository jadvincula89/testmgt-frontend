import React from 'react';
import { Modal, ModalBody, ModalFooter, MDBModalHeader } from 'mdbreact';
import { CloseCircleTwoTone } from '@ant-design/icons';
import SubmitBtn from '../Buttons/SubmitBtn';
import CancelBtn from '../Buttons/CancelBtn';

const ConfirmModal = (props) => {
  return (
      <Modal isOpen={props.isOpen} className="cascading-modal">
          <MDBModalHeader className='modal-head-confirm'>
                <CloseCircleTwoTone twoToneColor="#bd8412" className="modal-close" onClick={ props.close }/>
                { props.title }
          </MDBModalHeader>
          <ModalBody>
            { props.text }
            
          </ModalBody>
          <ModalFooter>
              <SubmitBtn title="Yes" onClick={ props.save }/>
              <CancelBtn title="No" onClick={ props.close }/>
          </ModalFooter>
      </Modal>
  )
};
 
export default ConfirmModal;