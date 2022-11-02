import {Modal, ModalBody, ModalFooter,MDBModalHeader } from 'mdbreact';
import { CloseCircleTwoTone } from '@ant-design/icons';
import SubmitBtn from '../Buttons/SubmitBtn';
import CancelBtn from '../Buttons/CancelBtn';
import DynamicData from '../DynamicData';
import TStepStatusLabel from '../StatusLabel/TStepStatusLabel';
import Tooltip from '../../General/Tooltip';

function EditActualResultModal(props) {
    const status = (props.selectedTSstatus !== "") ? props.selectedTSstatus  : props.stepData.tse_status;
    
    return(
        <Modal isOpen={props.isOpen} className="cascading-modal" size="xl">
            <MDBModalHeader className='modal-head-succ'>
                Update Actual Result
                <CloseCircleTwoTone twoToneColor="#8bbb11" className="modal-close" onClick={ props.close }/>
            </MDBModalHeader>
            <ModalBody className="grey-text" >
                <div><b>Test Case Title: </b>{props.tcTitle}</div>

                <div className='top-15'><b>Step #:</b> { props.stepData.ts_stepNum }</div>
                <div className='top-15'><b>Description:</b></div>
                <div><p className='small-text m-left-15'>{ props.stepData.ts_desc }</p></div>


                <div className='top-15'><b>Expected result:</b></div>
                <div><p className='small-text m-left-15'>{ props.stepData.ts_expectedResult }</p></div>

                <div className='top-15'><b>Change Status:</b></div>
                <TStepStatusLabel status={ status } tse_id={ props.stepData.tse_id } onChange={ props.changeTSstatus } tse_status={ status }/> 

                <div className='top-15'><b>Actual result:<span className='text-color-red'>*</span></b></div>
                <div className='small-text text-color-red'>{ props.errorMessage }</div>
                <div className='clear'></div>
                <div className='tip-holder'>
                
                    <Tooltip text={`Please add Actual Result.`}/>
                    
                    <textarea className='form-control' cols="20" rows="5" onChange={ props.changeActlRsltValue }>{ props.stepData.actualResult }</textarea>
                </div>
                
                <div className='top-30'><b>Dynamic Data:</b></div>

                <DynamicData 
                    count = { props.dynamicData_count }
                    add = { props.addDynamicData }
                    remove = { props.removeDynamicData }
                    dynamic_data = { props.dynamic_data }
                    dynamic_data_attr = { props.dynamic_data_attr }
                    changeDynamicDataAttr ={ props.changeDynamicDataAttr }
                    changeDynamicDataValue = { props.changeDynamicDataValue }
                />
                <div className='clear'></div>
                <div className='top-15'><b>Proof of Test:</b></div>
                <div className='small-text text-color-red'>{ props.errorSavingPOT }</div>
                
                <input type="text" className='form-control' name="pot" onChange={ props.changeActlRsltValue } value={ props.stepData.tse_pot } placeholder="URL Link only"/>
                
                <div className='top-15'><b>Issue Tracker #:</b></div>
                <input type="text" className='form-control' name="issue_tracker" onChange={ props.changeActlRsltValue } value={ props.stepData.issue_tracker } />
                
            </ModalBody>
            <ModalFooter>
                <SubmitBtn title="Save" onClick={ props.save }/>
                <CancelBtn title="Cancel" onClick={ props.close }/>
            </ModalFooter>

        </Modal>
    )
}
export default EditActualResultModal;
