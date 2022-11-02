import {Modal, ModalBody, ModalFooter,MDBModalHeader } from 'mdbreact';
import { CloseCircleTwoTone } from '@ant-design/icons';
import SubmitBtn from '../Buttons/SubmitBtn';
const uniqid = require('uniqid');
function TestDataModal(props) {
    
   
    return(
        <Modal isOpen={props.isOpen} className="cascading-modal" size="md">
            <MDBModalHeader className='modal-head-confirm'>
                Test Data
                
            </MDBModalHeader>
            <ModalBody className="grey-text" >
               { props.title }
            </ModalBody>
            <ModalFooter>
                <SubmitBtn title="Add Test Data" onClick={ props.save } name="save"/>
            </ModalFooter>

        </Modal>
    )
}
export default TestDataModal;
