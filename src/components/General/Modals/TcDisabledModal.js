import React from 'react';
import { Modal, ModalBody, MDBModalHeader } from 'mdbreact';
import { CloseCircleTwoTone } from '@ant-design/icons';
const TcDisabledModal = (props) => {
  return (
      <Modal isOpen={props.isOpen} className="cascading-modal" size = "lg">
          <MDBModalHeader className='modal-head-confirm'>
                Information message
                <CloseCircleTwoTone twoToneColor="#cca453" className="modal-close" onClick={ props.close }/>
          </MDBModalHeader>
          <ModalBody>
           Test Case execution is DISABLED at this time.
            
          </ModalBody>
          
      </Modal>
  )
};
 
export default TcDisabledModal;