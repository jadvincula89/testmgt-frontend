import React from 'react';
import { Modal, ModalBody, ModalFooter, MDBModalHeader } from 'mdbreact';
import { CloseCircleTwoTone } from '@ant-design/icons';
import SubmitBtn from '../Buttons/SubmitBtn';
import CancelBtn from '../Buttons/CancelBtn';

const SelectDataSetModal = (props) => {
    const renderOptions = ()=>{
        
        let content = []
        if(props.hasSameOptions===true){
              content.push(<option value="">Same Dataset</option>);
        }
         if (props.hasSameOptions === false) {
           content.push(<option value="">-- Select Data Set --</option>);
         }
        if(props.options.length >= 1){
            props.options.map((opt) => {
                content.push(
                    <option value={opt['td_id']}>{ opt['Dataset ID'] }</option>
                )
            })
        }
        
        return content
    }
  return (
    <Modal isOpen={props.isOpen} className="cascading-modal">
      <MDBModalHeader className="modal-head-confirm">
        <CloseCircleTwoTone
          twoToneColor="#bd8412"
          className="modal-close"
          onClick={props.close}
        />
        {props.title}
      </MDBModalHeader>
      <ModalBody>
        {props.text}
        <div>
          <select className="form-control" onChange={props.changeValue}>
         
            {props.hasSameOptions === true
              ? '<option value="">Same Dataset</option>'
              : '<option value="">-- Select Data Set --</option>'}
            {renderOptions()}
          </select>
        </div>
      </ModalBody>
      <ModalFooter>
        <SubmitBtn title="Save" onClick={props.save} />
        <CancelBtn title="Cancel" onClick={props.close} />
      </ModalFooter>
    </Modal>
  );
};
 
export default SelectDataSetModal;