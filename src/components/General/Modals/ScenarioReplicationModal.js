import React, { useEffect ,useRef } from 'react';
import {Modal, ModalBody, ModalFooter,MDBModalHeader } from 'mdbreact';
import { CloseCircleTwoTone } from '@ant-design/icons';
import SubmitBtn from '../Buttons/SubmitBtn';
import CancelBtn from '../Buttons/CancelBtn';
import DateRangePicker from '../DateRangePicker';
const uniqid = require('uniqid');

function ScenarioReplicationModal(props) {
    const inputRef = useRef([]); // Javascript
    useEffect(() => {
        let countData = props.count;
        inputRef.current = inputRef.current.slice(0, countData);
    }, []);
    const renderRemarks = () => {
        if(props.isReexecution !== undefined && props.isReexecution === true){
            return(
                <div>
                    <div className='top-15'><b>Remarks : </b></div>

                    <textarea 
                        key={ uniqid() } 
                        className='form-control' 
                        onChange={props.insertRemarks}
                        ref={el => inputRef.current = el} 
                        autoFocus={inputRef.current === document.activeElement} 
                        onFocus={function(e) {
                            var val = e.target.value;
                            e.target.value = '';
                            e.target.value = val;
                        }}
                    >{ props.remarks }</textarea>
                </div>
            )
        }
    }

    const renderPreq = () => {
        if(props.isReassigned !== undefined && props.isReassigned === true){
            return(
                <div>
                    <div className='top-15'><b>Prerequisite : </b></div>

                    <input type="text" className='form-control' onChange={props.changeValue} value={ props.preq }/>
                </div>
            )
        }
    }

    return(
        <Modal isOpen={props.isOpen} className="cascading-modal" size="md">
            <MDBModalHeader className='modal-head-gold'>
            {props.text}
                <CloseCircleTwoTone twoToneColor="#cca453" className="modal-close" onClick={ props.close }/>
            </MDBModalHeader>
            <ModalBody className="grey-text" >
                <div className='error-msg'>{ props.modalErrorMsg }</div>
                <div className='top-15'><b><span className='red-txt'>*</span>Plan Physical Day : </b></div>
                <DateRangePicker
                    name="phyDay"
                    selectedDay={props.phyDay}
                    handleDayChange={ props.handleDateChangePhyDay }
                />     

                <div className='top-15'><b><span className='red-txt'>*</span>Plan Virtual Day : </b></div>
                <DateRangePicker
                    name="virDay"
                    selectedDay={props.virDay}
                    handleDayChange={ props.handleDateChangeVirDay }
                />     

                {/* <div className='top-15'><b>Prerequisite: </b></div>
                <input type="text" name="preq" className='form-control' onChange={ props.changeValue } value={ props.preq }/> */}



                <div className='top-15'><b><span className='red-txt'>*</span>Assign Tester : </b></div>
                <select name="assignedTester" className='form-control' onChange={props.selectTester} value={props.selectedTester}>
                    <option></option>
                    {props.testers.map((tester) => (
                        <option value={tester.u_name} key={uniqid()}>
                          {tester.u_name}
                        </option>
                    ))}
                </select>

                {
                    renderRemarks()
                }
                {
                    renderPreq()
                }
            </ModalBody>
            <ModalFooter>
                <SubmitBtn title="Save" onClick={props.save} />
                <CancelBtn title="Cancel" onClick={ props.close }/>
            </ModalFooter>

        </Modal>
    )
}
export default ScenarioReplicationModal;
