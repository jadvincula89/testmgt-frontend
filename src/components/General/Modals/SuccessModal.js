import React from 'react';
import { Modal, ModalBody, MDBModalHeader, ModalFooter } from 'mdbreact';
import { CloseCircleTwoTone } from '@ant-design/icons';
import SubmitBtn from '../Buttons/SubmitBtn';
const SuccessModal = (props) => {

  return (
      <Modal isOpen={props.isOpen} className="cascading-modal" size = "xl">
          <MDBModalHeader className='modal-head-confirm'>
                { props.title }
                <CloseCircleTwoTone twoToneColor="#cca453" className="modal-close" onClick={ props.close }/>
          </MDBModalHeader>
          <ModalBody>
            <div>
              { props.text }
            </div>
          </ModalBody>
          <ModalFooter>
                <SubmitBtn title="OK" onClick={ props.close } />
            </ModalFooter>
      </Modal>
  )
};
 
export default SuccessModal;