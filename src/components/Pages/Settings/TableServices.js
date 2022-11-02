import React, { useState, useEffect } from "react";
import TStepStatusLabel from "../../General/StatusLabel/TStepStatusLabel";
import { FormOutlined } from "@ant-design/icons";
import Link from "@material-ui/core/Link";
import * as Icon from "react-bootstrap-icons";
import { IN_PROGRESS_STATUS } from "../../../shared/constants";


import {
  Badge,

  Button,
 
} from "react-bootstrap";
const uniqid = require("uniqid");

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

function fileType(params) {
  let strs = "";
  if (params === "1") {
    strs = "scenario";
  }

  if (params === "2") {
    strs = "execution";
  }

  if (params === "3") {
    strs = "step";
  }

  if (params === "4") {
    strs = "testdata";
  }

  return strs;
}
function TableServices(props) {
  const rowBg = (key) => {
    return key % 2 == 0 ? "dark" : "light";
  };

  const rows = (items) => {
    let content = [];
    if (props.tablename === "executionlogview"){
if (items.length >= 1) {
  items.map((item, key) =>
    content.push(
      <tr key={uniqid()}>
        <td className={rowBg(key)}>{item.el_id}</td>
        <td className={rowBg(key)}>{item.tce_id}</td>
        <td className={rowBg(key)}>{item.Username}</td>
        <td className={rowBg(key)}>{item.LogDate}</td>
        <td className={rowBg(key)}>{item.tc_instanceid}</td>
        <td className={rowBg(key)}>{item["Previous Status"]}</td>
        <td className={rowBg(key)}>{item["New Status"]}</td>
        <td className={rowBg(key)}>{item["Testers Remarks"]}</td>
        <td className={rowBg(key)}>{item["Arbiters Remarks"]}</td>
        <td className={rowBg(key)}>{item["updated_at"]}</td>
        <td className={rowBg(key)}>{item["Old value"]}</td>
        <td className={rowBg(key)}>{item["New value"]}</td>
      </tr>
    )
  );
}
    }
      if (props.tablename === "chaser_report") {
        if (items.length >= 1) {
          items.map((item, key) =>
            content.push(
              <tr key={uniqid()}>
                <td className={rowBg(key)}>{item.u_name}</td>
                <td className={rowBg(key)}>{item.Test_Case_ID}</td>
                <td className={rowBg(key)}>{item.Age_Type}</td>
                <td className={rowBg(key)}>{item.Subsequent_Assigned_TC}</td>
                <td className={rowBg(key)}>{item.Subsequent_Unassigned_TC}</td>
                <td className={rowBg(key)}>{item.Start_Date_Time}</td>
                <td className={rowBg(key)}>{item.Age}</td>
              </tr>
            )
          );
        }
      }
    if (props.tablename === "in_progress") {
      if (items.length >= 1) {
        items.map((item, key) =>
          content.push(
            
              <tr key={uniqid()}>
                <td className={rowBg(key)}>{item.u_name}</td>
                <td className={rowBg(key)}>{item.Test_Case_ID}</td>
                <td className={rowBg(key)}>{item.Age_Type}</td>
                <td className={rowBg(key)}>{item.cntAss}</td>
                <td className={rowBg(key)}>{item.cntUnAss}</td>
                <td className={rowBg(key)}>{item.Start_Date_Time}</td>
                <td className={rowBg(key)}>{item.Age}</td>

                
              </tr>
          )
        );
      }
    }

    if (props.tablename === "execution_mode") {
      if (items.length >= 1) {
        items.map((item, key) =>
          content.push(
            (item.Status !== 'Assigned' && item.Status !== 'Unassigned') ? 
              <tr key={uniqid()}>
                <td className={rowBg(key)}>{item.Status}</td>
                <td className={rowBg(key)}>{item.Manual}</td>
                <td className={rowBg(key)}>{item.Auto}</td>
                <td className={rowBg(key)}>{item.Total}</td>
              </tr>
            : <tr key={uniqid()}></tr>
          )
        );
      }
    }
    if (props.tablename === "filereport") {
      if (items.length >= 1) {
        items.map((item, key) =>
          content.push(
            <tr key={uniqid()}>
              <td className={rowBg(key)}>{item.fu_id}</td>
              <td className={rowBg(key)}>{item.fu_filename}</td>
              <td className={rowBg(key)}>{fileType(item.fu_filetypr)}</td>
              <td className={rowBg(key)}>{item.fu_datetime}</td>
              <td className={rowBg(key)}>{item.u_name}</td>
              <td className={rowBg(key)}>{item.fu_date_processed}</td>
              <td className={rowBg(key)}>{item.fu_rowcount}</td>
              <td className={rowBg(key)}>{item.fu_status}</td>

              <td className={rowBg(key)}>
                {item.fu_status == "Pending" ? (
                  <a
                    href="javascript:;"
                    onClick={(e) =>
                      props.downloadCSV(
                        item.fu_id,
                        "Raw",
                        item.fu_filename,
                        fileType(item.fu_filetypr),
                        "1"
                      )
                    }
                  >
                    Download{" "}
                  </a>
                ) : (
                  <a
                    href="javascript:;"
                    onClick={(e) =>
                      props.downloadCSV(
                        item.fu_id,
                        "Raw",
                        item.fu_filename,
                        fileType(item.fu_filetypr),
                        "2"
                      )
                    }
                  >
                    Download{" "}
                  </a>
                )}
              </td>
              <td className={rowBg(key)}>
                <a
                  href="javascript:;"
                  onClick={(e) =>
                    props.downloadCSV(
                      item.fu_id,
                      "Processed",
                      item.fu_filename,
                      fileType(item.fu_filetypr),
                      0
                    )
                  }
                >
                  Download{" "}
                </a>
              </td>
            </tr>
          )
        );
      }
    }
    if (props.tablename === "user") {
      if (items.length >= 1) {
        items.map((item, key) =>
          content.push(
            <tr key={uniqid()}>
              <td className={rowBg(key)}>{item.u_name}</td>
              <td className={rowBg(key)}>{item.name}</td>
              <td className={rowBg(key)}>{item.email}</td>
              <td className={rowBg(key)}>{item.grp_name}</td>
              <td className={rowBg(key)}>{(item.user_id) ? 'YES' :'NO'}</td>
              <td className={rowBg(key)}>
                {item.status === 1 ? (
                  <Badge bg="success">Active</Badge>
                ) : (
                  <Badge bg="danger">Inactive</Badge>
                )}
              </td>
              <td className={rowBg(key)}>
                <Button
                  variant="info"
                  onClick={(e) =>
                    props.getUser(
                      item
                    )
                  }
                >
                  {" "}
                  <Icon.PencilSquare className="ml-2" />
                </Button>
              </td>
              <td className={rowBg(key)}>
                <Button variant="danger">
                  {" "}
                  <Icon.Power className="ml-2" />
                </Button>
              </td>
              <td className={rowBg(key)}>
                <Button variant="danger">
                  {" "}
                  <Icon.Trash className="ml-2" />
                </Button>
              </td>
            </tr>
          )
        );
      }
    }
    if (props.tablename === "dashboard") {
      if (items.length >= 1) {
        items.map((item, key) =>
          content.push(
            <tr key={uniqid()}>
              <td className={rowBg(key)}>{item.Tester}</td>
              <td className={rowBg(key)}>{item.Status}</td>
             <td className={rowBg(key)}>{item.Current_Assigned_Test_Case}</td>
              <td className={rowBg(key)}>{item.Pre_req_Assigned_Test_Case}</td>
               <td className={rowBg(key)}>{item.Assigned_Date}</td>
               <td className={rowBg(key)}>{item.Physical_Day}</td>
              <td className={rowBg(key)}>{item.Virtual_Day}</td>
               <td className={rowBg(key)}>{item.Execution_Date}</td>
            <td className={rowBg(key)}>{item.Aging_Upon_Assigned}</td>
            <td className={rowBg(key)}>{item.Aging_Upon_Execution}</td>
           
            </tr>
          )
        );
      }
    }
    if (props.tablename === "executionplan") {
      if (items.length >= 1) {
        items.map((item, key) =>
          content.push(
            <tr key={uniqid()}>
              <td className={rowBg(key)}>{item.te_execDate}</td>
              <td className={rowBg(key)}>{item.tce_id}</td>
              <td className={rowBg(key)}>{item.te_planPhyDay}</td>
              <td className={rowBg(key)}>{item.te_planVirDay}</td>
              <td className={rowBg(key)}>{item.tc_seq}</td>
              <td className={rowBg(key)}>{item.assignedTester}</td>
              <td className={rowBg(key)}>{item.TC_stat}</td>
              <td className={rowBg(key)}>{item.tc_instanceid}</td>
              <td className={rowBg(key)}>{item.TC_pre_req}</td>
              <td className={rowBg(key)}>{item.Pre_req_stat}</td>
              <td className={rowBg(key)}>{item.PreReqTester}</td>
            </tr>
          )
        );
      }
    }
      if (props.tablename === "testers") {
      if (items.length >= 1) {
        items.map((item, key) =>
          content.push(
            <tr key={uniqid()}>
              <td className={rowBg(key)}>{item['Tester']}</td>
              <td className={rowBg(key)}>{item['Started']}</td>
              <td className={rowBg(key)}>{item['Passed']}</td>
              <td className={rowBg(key)}>{item['For Execution']}</td>
              <td className={rowBg(key)}>{item['In Progress']}</td>
              <td className={rowBg(key)}>{item['Assigned']}</td>
              <td className={rowBg(key)}>{item['Failed']}</td>
              <td className={rowBg(key)}>{item['Abandon']}</td>
              <td className={rowBg(key)}>{item['Blocked']}</td>
              <td className={rowBg(key)}>{item['For Review']}</td>
             <td className={rowBg(key)}>{item['For Rejection']}</td>
           
            </tr>
          )
        );
      }
    }
    if (props.tablename === "usergroup") {
      if (items.length >= 1) {
        items.map((item, key) =>
          content.push(
            <tr key={uniqid()}>
              <td className={rowBg(key)}>{item.grp_name}</td>
              <td className={rowBg(key)}>{item.grp_description}</td>
              <td className={rowBg(key)}>
                {item.grp_status === 1 ? (
                  <Badge bg="success">Active</Badge>
                ) : (
                  <Badge bg="danger">Inactive</Badge>
                )}
              </td>
              <td className={rowBg(key)}></td>
              <td className={rowBg(key)}></td>
              <td className={rowBg(key)}></td>
            </tr>
          )
        );
      }
    }
    if (props.tablename === "roles") {
      if (items.length >= 1) {
        var states = false;
        items.map((item, key) =>
          content.push(
            <tr key={uniqid()}>
              <td className={rowBg(key)}>
                <b>{item.module_name}</b>
              </td>
              <td className={rowBg(key)}>{item.sub_module_name}</td>
              <td className={rowBg(key)}>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name={"form-read-" + item.submodule_id}
                    onChange={(e) =>
                      props.roleCallback(item.submodule_id, item.read, "read")
                    }
                    id={"form-read-" + item.submodule_id}
                    checked={item.read === 1 ? true : false}
                  />

                  <label
                    className="form-check-label"
                    htmlFor={"form-read-" + item.submodule_id}
                  ></label>
                </div>
              </td>
              <td className={rowBg(key)}>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={"form-write-" + item.submodule_id}
                    onChange={(e) =>
                      props.roleCallback(item.submodule_id, item.write, "write")
                    }
                    checked={item.write === 1 ? true : false}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={"form-write-" + item.submodule_id}
                  ></label>
                </div>
              </td>
            </tr>
          )
        );
      }
    }

    return content;
  };
  if (props.tablename === "executionlogview"){
      return (
        <table border="1">
          <thead>
            <tr key={uniqid()}>
              <th>El ID</th>
              <th>TCE ID</th>
              <th>Username</th>
              <th>LogDate</th>
              <th>TC Instance ID</th>
              <th>Previous Status</th>
              <th>New Status</th>
              <th>Testers Remarks</th>
              <th>Arbiters Remarks</th>
              <th>Updated At</th>
              <th>Old Value</th>
              <th>New Value</th>
            </tr>
          </thead>
          <tbody>
            {props.rows !== undefined ? rows(props.rows) : <tr></tr>}
          </tbody>
        </table>
      );
  }
    if (props.tablename === "filereport") {
      return (
        <table border="1">
          <thead>
            <tr key={uniqid()}>
              <th>Id</th>
              <th>File Name</th>
              <th>File Type</th>
              <th>Date Upload</th>
              <th>Uploaded By</th>
              <th>Date Processed</th>
              <th># Rows</th>
              <th>Status</th>
              <th>Raw File</th>
              <th>Response File</th>
            </tr>
          </thead>
          <tbody>
            {props.rows !== undefined ? rows(props.rows) : <tr></tr>}
          </tbody>
        </table>
      );
    }
  if (props.tablename === "user") {
    return (
      <table border="1">
        <thead>
          <tr key={uniqid()}>
            <th>Username</th>
            <th>Full Name</th>
            <th>Email Address</th>
            <th>Group Name</th>
            <th>Login</th>
            <th>Status</th>
            <th>Edit</th>
            <th>Activation</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>{rows(props.rows)}
  
        
        </tbody>
      </table>
    );
  }
  if (props.tablename === "usergroup") {
    return (
      <table border="1">
        <thead>
          <tr key={uniqid()}>
            <th>Group Name</th>
            <th>Group Desc</th>
            <th>Status</th>
            <th>Edit</th>
            <th>Deact</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>{rows(props.rows)}</tbody>
      </table>
    );
  }
   if (props.tablename === "dashboard") {
    return (
      <table border="1">
        <thead>
          <tr key={uniqid()}>
            <th>Testers</th>
            <th>Status</th>
            <th>Current Assigned Test Case</th>
            <th>Pre-req Test Case</th>
            <th>Physical Day</th>
            <th>Virtual Day</th>
            <th>Date Assigned</th>
            <th>Execution Date</th>
            <th>Aging of the Test Case <br/> (Upon Assigning)</th>
            <th>Aging of the Test Case <br/> (Upon Execution)</th>
          </tr>
        </thead>
        <tbody>{rows(props.rows)}</tbody>
      </table>
    );
  }
    if (props.tablename === "testers") {
    return (
      <table border="1">
        <thead>
          <tr key={uniqid()}>
            <th>Testers</th>
            <th>Started</th>
            <th>Passed</th>
            <th>For Execution</th>
            <th>In Progress</th>
            <th>Assigned</th>
            <th>Failed</th>
            <th>Abandon</th>
            <th>Blocked</th>
            <th>For Review</th>
            <th>For Rejection</th>
          </tr>
        </thead>
        <tbody>{rows(props.rows)}</tbody>
      </table>
    );
  }
  if (props.tablename === "execution_mode") {
    return (
      <div>
        <table border="1">
          <thead>
            <tr key={uniqid()}>
              <th className="col-6">Transaction Executed</th>
              <th>Manual</th>
              <th>Auto</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>{rows(props.rows)}</tbody>
        </table>
        <br/><br/>
        <table border="1">
          <thead>
            <tr key={uniqid()}>
              <th className="col-6">Assigned But Not Executed</th>
              <th>Manual</th>
              <th>Auto</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {
              props.rows.map((item, key) =>
                
                  (item.Status === 'Assigned') ? 
                    <tr key={uniqid()}>
                      <td className={rowBg(key)}>{item.Status}</td>
                      <td className={rowBg(key)}>{item.Manual}</td>
                      <td className={rowBg(key)}>{item.Auto}</td>
                      <td className={rowBg(key)}>{item.Total}</td>
                    </tr>
                  : <tr key={uniqid()}></tr>
                
              )
            }
          </tbody>
        </table>
      </div>
    );
  }
  if (props.tablename === "roles") {
    return (
      <table border="1">
        <thead>
          <tr key={uniqid()}>
            <th>Module Name</th>
            <th>Sub Module Name</th>
            <th>Read</th>
            <th>Write</th>
          </tr>
        </thead>
        <tbody>{rows(props.rows)}</tbody>
      </table>
    );
  }
 if(props.tablename==="executionplan"){
      return (
      <table border="1">
        <thead>
          <tr key={uniqid()}>
            <th>Execution Date</th>
            <th>TC Execution ID</th>
            <th>Physical Day</th>
            <th>Virtual Day</th>
            <th>Sequence #</th>
            <th>Assign Tester</th>
            <th>TC Status</th>
            <th>TC Instance ID</th>
            <th>TC Pre-Req</th>
            <th>Pre-Req Status</th>
            <th>Pre-Req Tester</th>
          </tr>
        </thead>
        <tbody>{rows(props.rows)}</tbody>
      </table>
    );
 }
  if(props.tablename==="chaser_report"){
    return (
    <table border="1">
      <thead>
        <tr key={uniqid()}>
          <th>u_name</th>
          <th>Test Case ID</th>
          <th>Age Type</th>
          <th>Subsequent Assigned TC</th>
          <th>Subsequent Unassigned TC</th>
          <th>Start Date Time</th>
          <th>Age</th>
          
        </tr>
      </thead>
      <tbody>{rows(props.rows)}</tbody>
    </table>
  );
  }
  if(props.tablename==="in_progress"){
    return (
    <table border="1">
      <thead>
        <tr key={uniqid()}>
          <th>u_name</th>
          <th>Test Case ID</th>
          <th>Age Type</th>
          <th>cntAss</th>
          <th>cntUnAss</th>
          <th>Start Date Time</th>
          <th>Age</th>
          
        </tr>
      </thead>
      <tbody>{rows(props.rows)}</tbody>
    </table>
  );
  }
}

export default TableServices;
