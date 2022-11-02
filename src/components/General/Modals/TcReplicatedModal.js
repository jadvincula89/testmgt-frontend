import React, { useState,useRef,useEffect } from "react";
import { Modal, ModalBody, MDBModalHeader,ModalFooter } from 'mdbreact';
import SubmitBtn from '../Buttons/SubmitBtn';
import { CloseCircleTwoTone } from '@ant-design/icons';
const uniqid = require("uniqid");
const TcReplicatedModal = (props) => {
  
  const itemsRef = useRef([]); // Javascript
  const remarksRef = useRef([]); // Javascript
  const datas = props.tcDuplicated;
  const rowBg = (key) => {
    return (key % 2 == 0) ? 'dark' : 'light';
  }
  useEffect(() => {
    let countData = props.tcDuplicated.length;
    itemsRef.current = itemsRef.current.slice(0, countData);
    remarksRef.current = remarksRef.current.slice(0, countData);
}, [props.tcDuplicated]);

  const tc = () => {
    let content = []
    datas.map((tc,i)=>{
      // content.push( <div key={uniqid()}>{ tc.tc_instanceid }</div> )
      content.push(
        <tr key={ uniqid() }>
            <td key={ uniqid() } class={ rowBg(i) }>{ tc.tc_instanceid }</td>
            <td key={ uniqid() } class={ rowBg(i) }><input key={ uniqid() } type='text' className='form-control' id={i}
            value={tc.preq}
            onChange={(e) => {
              tc.preq = e.target.value;
              props.setDatas([...datas]);
            }}  
            ref={el => itemsRef.current[i] = el} 
            autoFocus={itemsRef.current[i] === document.activeElement} 
            onFocus={function(e) {
                var val = e.target.value;
                e.target.value = '';
                e.target.value = val;
            }}
          /></td>
          <td key={ uniqid() } class={ rowBg(i) }><input key={ uniqid() } type='text' className='form-control' id={i}
              value={tc.remarks}
              onChange={(e) => {
                tc.remarks = e.target.value;
                props.setDatas([...datas]);
              }}  
              ref={el => remarksRef.current[i] = el} 
              autoFocus={remarksRef.current[i] === document.activeElement} 
              onFocus={function(e) {
                  var val = e.target.value;
                  e.target.value = '';
                  e.target.value = val;
              }}
            /></td>
        </tr>
      )
    })
    return content
  }
  return (
      <Modal isOpen={props.isOpen} className="cascading-modal" size = "lg">
          <MDBModalHeader className='modal-head-confirm'>
                Replication Successful
                <CloseCircleTwoTone twoToneColor="#cca453" className="modal-close" onClick={ props.close }/>
          </MDBModalHeader>
          <ModalBody>
            { props.text }
            <div className="error-msg">{ props.remarksErr }</div>
            <table boder='1'>
              <thead><tr key={ uniqid() }><th key={ uniqid() }>New TC ID</th><th key={ uniqid() }>Pre-requisite</th><th key={ uniqid() }>Remarks</th></tr></thead>
              <tbody>{ tc() }</tbody>
            </table>
            
          </ModalBody>
          <ModalFooter>
                <SubmitBtn title="OK" onClick={ props.save }/>
          </ModalFooter>
      </Modal>
  )
};
 
export default TcReplicatedModal;