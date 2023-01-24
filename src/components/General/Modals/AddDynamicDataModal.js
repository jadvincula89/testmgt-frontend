import { Modal, ModalBody, ModalFooter, MDBModalHeader } from "mdbreact";
import {
  CloseCircleTwoTone,
  SearchOutlined,
  MinusCircleFilled,
} from "@ant-design/icons";
import SubmitBtn from "../Buttons/SubmitBtn";
import CancelBtn from "../Buttons/CancelBtn";
import React, { useRef, useEffect } from "react";
import TStepStatusLabel from "../StatusLabel/TStepStatusLabel";
import Tooltip from "../../General/Tooltip";
import BasicBtn from "../Buttons/BasicBtn";
import { Form, Card, Col, Row, Container } from "react-bootstrap";
function AddDynamicDataModal(props) {
  const uniqid = require("uniqid");
  const inputRef = useRef([]); // Javascript
  const itemsRef = useRef([]);
  const status =
    props.selectedTSstatus !== ""
      ? props.selectedTSstatus
      : props.stepData.tse_status;
  const dynamicOptions = () => {
    var content = [];
    var DynamicDataOptions = props.dynamic_data_attr;

    DynamicDataOptions.map((val, index) =>
      content.push(<option value={val.value}>{val.value}</option>)
    );
    return content;
  };
   const dynamicOptions2 = () => {
     var content = [];
     var DynamicDataOptions = props.stepdata;
if (props.stepdata){
  DynamicDataOptions.map((val, index) =>
    content.push(
      <option value={val.ts_id}>
        {val.ts_stepNum} - {val.ts_expectedResult}
      </option>
    )
  );
    }
     return content;
   };
  useEffect(() => {
    let countData = props.count;
    itemsRef.current = itemsRef.current.slice(0, countData);
    inputRef.current = inputRef.current.slice(0, countData);
  }, [props.dynamic_data]);
  const row = () => {
    var content = [];
    let countData = props.count;

    for (let x = 1; x <= countData; x++) {
      let arrkey = x - 1;
      content.push(
        <tr key={uniqid()}>
          <td>{x}</td>
          <td>
            <select
              id={x}
              key={uniqid()}
              className="form-control"
              data-id={arrkey}
              value={props.dynamic_data[arrkey]["attr"]}
              onChange={props.changeDynamicDataAttr}
            >
              <option value="">Select Option</option>
              {dynamicOptions(props.dynamic_data[arrkey])}
            </select>
          </td>
          <td>
            <input
              type="text"
              key={uniqid()}
              ref={(el) => (itemsRef.current[arrkey] = el)}
              autoFocus={itemsRef.current[arrkey] === document.activeElement}
              onFocus={function (e) {
                var val = e.target.value;
                e.target.value = "";
                e.target.value = val;
              }}
              className="form-control"
              placeholder="value"
              onChange={props.changeDynamicDataValue}
              value={props.dynamic_data[arrkey]["value"]}
              name="value"
              id={arrkey}
            />
          </td>
          <td>
            <textarea
              key={uniqid()}
              ref={(el) => (inputRef.current[arrkey] = el)}
              autoFocus={inputRef.current[arrkey] === document.activeElement}
              onFocus={function (e) {
                var val = e.target.value;
                e.target.value = "";
                e.target.value = val;
              }}
              className="form-control"
              placeholder="remarks"
              onChange={props.changeDynamicDataValue}
              value={props.dynamic_data[arrkey]["remarks"]}
              name="remarks"
              id={arrkey}
            />
          </td>
          <td>
            <MinusCircleFilled
              className="remove"
              onClick={() => props.remove(arrkey)}
            />
          </td>
        </tr>
      );
    }
    return content;
  };
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
      <MDBModalHeader className="modal-head-succ">
        Dynamic Data Entry
        <CloseCircleTwoTone
          twoToneColor="#cca453"
          className="modal-close"
          onClick={props.close}
        />
      </MDBModalHeader>
      <ModalBody className="grey-text">
        <Card.Body>
          <Form.Group className="mb-1 relative" controlId="formGroupName">
            <Form.Label>
              <i> Test Case ID:</i>
            </Form.Label>
            <Form.Control
              type="text"
              name="testcaseID"
              onChange={props.changeTestCaseID}
              onKeyDown={props.searchkeypressTestCaseID}
              defaultValue={props.testcaseid}
            />
            <span className="search-icon" onClick={props.search}>
              <SearchOutlined />
            </span>
            <span className="span-label">
              <b> Test Case Title : </b>{" "}
              {props.testcasedata && props.testcasedata.tc_title}
            </span>
          </Form.Group>
          <div className="top">
            <Form.Group className="mb-1 relative">
              <Form.Label>
                {" "}
                <i>Step No.:</i>
              </Form.Label>

              <Form.Select name="class" onChange={props.changeTestCaseStep}>
                <option value="">Select Step Num</option>
                {dynamicOptions2()}
              </Form.Select>
              <Form.Label>
                <b>Step Description:</b>{" "}
                <div className="form-control">{props.selectedstep}</div>
              </Form.Label>
            </Form.Group>
          </div>

          <div className="clear"></div>
          <div className="tip-holder">
            <Tooltip text={`Please add Actual Result.`} />
          </div>

          <div className="top-30">
            <b>Dynamic Data:</b>
          </div>
          <div>
            {props.testcasedata && (
              <div>
                <table border="0" className="tbl-no-style">
                  <tbody> {props.count >= 1 ? row() : ""}</tbody>
                </table>
                <div className="right">
                  <BasicBtn title="Add more Dynamic Data" onClick={props.add} />
                </div>{" "}
              </div>
            )}
          </div>
          <div className="clear"></div>
        </Card.Body>
      </ModalBody>
      <ModalFooter>
        <SubmitBtn title="Save" onClick={props.save} />
        <CancelBtn title="Cancel" onClick={props.close} />
      </ModalFooter>
    </Modal>
  );
}
export default AddDynamicDataModal;
