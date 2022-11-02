import React from 'react';
import { Modal, ModalBody, MDBModalHeader } from 'mdbreact';
import { CloseCircleTwoTone } from '@ant-design/icons';
const InformationalModal = (props) => {
  

  const renderList = () =>{
    let content = []
    let data = props.data;

    if(data !== undefined && data.length >= 1){
            
      data.map(( item ) =>
            content.push(
              <div style={{ wordWrap: 'break-word' }}><pre>{ item.testPreq }</pre></div>
            )
        )
    }


        
    return content

  }
  return (
      <Modal isOpen={props.isOpen} className="cascading-modal" size = "xl">
          <MDBModalHeader className='modal-head-confirm'>
                { props.title }
                <CloseCircleTwoTone twoToneColor="#cca453" className="modal-close" onClick={ props.close }/>
          </MDBModalHeader>
          <ModalBody>
            <div>
              Sorry the pre-requisite of the next Test Case is not yet completed. <br/>
              Please see current status of the pre-requisite Test Case. <br/>
            </div>
            { renderList() }
          </ModalBody>
          
      </Modal>
  )
};
 
export default InformationalModal;