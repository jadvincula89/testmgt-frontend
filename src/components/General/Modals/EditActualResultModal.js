import {Modal, ModalBody, ModalFooter,MDBModalHeader } from 'mdbreact';
import { CloseCircleTwoTone } from '@ant-design/icons';
import SubmitBtn from '../Buttons/SubmitBtn';
import CancelBtn from '../Buttons/CancelBtn';
import DynamicData from '../DynamicData';
import TStepStatusLabel from '../StatusLabel/TStepStatusLabel';
import Tooltip from '../../General/Tooltip';


function EditActualResultModal(props) {
    const status = (props.selectedTSstatus !== "") ? props.selectedTSstatus  : props.stepData.tse_status;
    
    function saveChecker() {
      const status =
        props.selectedTSstatus !== ""
          ? props.selectedTSstatus
          : props.stepData.tse_status;
      let tempstatus = true;
      
      let count = props.dynamic_data.length - 1;

      for (let i = 0; i <= count; i++) {
        if (props.dynamic_data[i].attr === "Issue Number") {
          tempstatus = false;
          let values = props.dynamic_data[i].value;
          let checker = /\s/.test(values);
          if (checker === false) {
            if (values.length == 7) {
              let newdata = /^\d+$/.test(values.slice(2, 7));
              if (
                values[0].toUpperCase() === "I" &&
                values[1].toUpperCase() === "S" &&
                newdata === true
              ) {
                tempstatus = true;
              }
            }
          }

          break;
        }
      }
      if (tempstatus === true) {
        props.save();
      } else {
        alert("Error! Please provide valid Issue Number");
      }
    }
    return (
      <Modal isOpen={props.isOpen} className="cascading-modal" size="xl">
        <MDBModalHeader className="modal-head-success">
          Update Actual Result
          <CloseCircleTwoTone
            twoToneColor="#8bbb11"
            className="modal-close"
            onClick={props.close}
          />
        </MDBModalHeader>
        <ModalBody className="grey-text">
          <div>
            <b>Test Case Title: </b>
            {props.tcTitle}
          </div>

          <div className="top-15">
            <b>Step #:</b> {props.stepData.ts_stepNum}
          </div>
          <div className="top-15">
            <b>Description:</b>
          </div>
          <div>
            <p className="small-text m-left-15">{props.stepData.ts_desc}</p>
          </div>

          <div className="top-15">
            <b>Expected result:</b>
          </div>
          <div>
            <p className="small-text m-left-15">
              {props.stepData.ts_expectedResult}
            </p>
          </div>

          <div className="top-15">
            <b>Change Status:</b>
          </div>
          <TStepStatusLabel
            status={status}
            tse_id={props.stepData.tse_id}
            onChange={props.changeTSstatus}
            tse_status={status}
          />

          <div className="top-15">
            <b>
              Actual result:<span className="text-color-red">*</span>
            </b>
          </div>
          <div className="small-text text-color-red">{props.errorMessage}</div>
          <div className="clear"></div>
          <div className="tip-holder">
            <Tooltip text={`Please add Actual Result.`} />

            <textarea
              className="form-control"
              cols="20"
              rows="5"
              onChange={props.changeActlRsltValue}
            >
              {props.stepData.actualResult}
            </textarea>
          </div>

          <div className="top-30">
            <b>Dynamic Data:</b>
          </div>

          <DynamicData
            count={props.dynamicData_count}
            add={props.addDynamicData}
            remove={props.removeDynamicData}
            dynamic_data={props.dynamic_data}
            dynamic_data_attr={props.dynamic_data_attr}
            changeDynamicDataAttr={props.changeDynamicDataAttr}
            changeDynamicDataValue={props.changeDynamicDataValue}
          />
          <div className="clear"></div>
          <div className="top-15">
            <b>Proof of Test:</b>
          </div>
          <div className="small-text text-color-red">
            {props.errorSavingPOT}
          </div>

          <input
            type="text"
            className="form-control"
            name="pot"
            onChange={props.changeActlRsltValue}
            value={props.stepData.tse_pot}
            placeholder="URL Link only"
          />

          <div className="top-15">
            <b>Issue Tracker #:</b>
          </div>
          <input
            type="text"
            className="form-control"
            name="issue_tracker"
            onChange={props.changeActlRsltValue}
            value={props.stepData.issue_tracker}
          />
        </ModalBody>
        <ModalFooter>
          <SubmitBtn title="Save" onClick={saveChecker} />
          <CancelBtn title="Cancel" onClick={props.close} />
        </ModalFooter>
      </Modal>
    );
}
export default EditActualResultModal;
