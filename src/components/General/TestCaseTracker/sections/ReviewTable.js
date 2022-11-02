import React from "react";
import ReviewTableRowValue from "./ReviewTableRowValue";
import ReviewStatusOptions from "../../StatusLabel/ReviewStatusOptions";
import { FormOutlined } from "@ant-design/icons";
import TCStatusLabel from '../../../General/StatusLabel/TCStatusLabel';

const uniqid = require("uniqid");

function ReviewTable(props) {
  const rowBg = (key) => {
    return key % 2 === 0 ? "dark" : "light";
  };  

  const rowData = (key, item) => {
    var testdata="";
    try { 
      if(props.option==='admin'){
                   testdata=props.stepdata.test_data['test_data'][0]['Dataset ID'];
                  }
        if(props.option!=='admin'){
           testdata = item.test_data.test_data.static[0]["Dataset ID"];
        }
    }

    catch(err) {
   testdata = "";

    } 
    return (
      <>
      <tr key={uniqid()}>
          <td className={rowBg(key) + " hoverable"} data-id={key} key={uniqid()} onClick={props.selectRow}>{item.sc_code}</td>
          <td className={rowBg(key) + " hoverable"} data-id={key} key={uniqid()} onClick={props.selectRow}>{item.sc_title}</td>
          <td className={rowBg(key) + " hoverable"} data-id={key} key={uniqid()} onClick={props.selectRow}>{item.tc_instanceid}</td>
          <td className={rowBg(key) + " hoverable"} data-id={key} key={uniqid()} onClick={props.selectRow}>{item.tc_title}</td>
           <td className={rowBg(key) + " hoverable"} data-id={key} key={uniqid()} onClick={props.selectRow}>{item.biz_txn_date}</td>
          <td className={rowBg(key) + " hoverable"} data-id={key} key={uniqid()} onClick={props.selectRow}>{item.tc_hobsRole}</td>
             <td className={rowBg(key) + " hoverable"} data-id={key} key={uniqid()} onClick={props.selectRow}>{item.tc_assigned_tester}</td>
          <td className={rowBg(key) + " hoverable"} data-id={key} key={uniqid()} onClick={props.selectRow}>{item.te_lastUpdateDate}</td>
          <td className={rowBg(key) + " hoverable"} data-id={key} key={uniqid()} onClick={props.selectRow}>{item.te_reason_code}</td>
          <td className={rowBg(key) + " hoverable"} data-id={key} key={uniqid()} onClick={props.selectRow}>{item.te_reason}</td>
          <td className={rowBg(key) + " hoverable"} data-id={key} key={uniqid()} onClick={props.selectRow}>
           <span key={uniqid()} data-id={key} className="text-color-blue bold" onClick={() =>window.open("/sc-test-data/" + item.sc_code, "_blank")}>{testdata}</span></td>
        
          <td className={rowBg(key) + " relative hoverable"} data-id={key} key={uniqid()}>
                 
          {props.option!=='admin' && <ReviewStatusOptions option={props.option} onChange={props.selectStatus} setActiveRow={props.selectRow} combolabels={props.dropdownselected} selectedid={props.selectedID} tc_id={item.tc_id} index={key} />}
          {props.option==='admin' &&  
                     <TCStatusLabel forTestStep={false} label={ item.tc_status } status={ item.tc_status }/>
                    }
                    
          </td>
        </tr>
        <tr  key={uniqid()} className={ props.activeKey != "" && props.activeKey == key ? "" : "hide"}>
         <td colSpan="12"   key={uniqid()} className={rowBg(key) + " hoverable"} data-id={key}>
          <ReviewTableRowValue data={item.steps} key={uniqid()} />
          </td>
        </tr>
      </>
    );
  };

  const rows = (items) => {
    let content = [];
    
    if (items.length >= 1) {
      items.map((item, key) => content.push(rowData(key, item)));
    }

    return content;
  };

  return (
    <table border="1">
      <thead key={uniqid()}>
        <tr key={uniqid()}>
          <th key={uniqid()}>Scenario ID</th>
          <th key={uniqid()}>Scenario Title</th>
          <th key={uniqid()}>Test Case ID</th>
          <th key={uniqid()}>Test Case Title</th>
          <th key={uniqid()}>Virtual Date</th>
          <th key={uniqid()}>HOBS Role</th>
          <th key={uniqid()}>Assigned Tester</th>
          <th key={uniqid()}>Last Updated</th>
          <th key={uniqid()}>Reason Code</th>
          <th key={uniqid()}>Reason Desc</th>
          <th key={uniqid()}>Data Set</th>
          <th key={uniqid()}>{props.option==='admin' && ('Status')}{props.option!=='admin' && ('Action')}</th>
        </tr>
      </thead>
      <tbody key={uniqid()}>
        {props.data !== undefined && props.data.length >= 1 ? (
          rows(props.data)
        ) : (
          <tr key={uniqid()}>
<td  key={uniqid()} colSpan="12" className="light">
  No data found
</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
export default ReviewTable;
