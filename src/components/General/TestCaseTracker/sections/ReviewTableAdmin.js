import React from "react";
import ReviewTableRowValue from "./ReviewTableRowValue";
import ReviewStatusOptions from "../../StatusLabel/ReviewStatusOptions";
import { FormOutlined } from "@ant-design/icons";
import TCStatusLabelAdmin from '../../../General/StatusLabel/TCStatusLabelAdmin';

const uniqid = require("uniqid");

function ReviewTableAdmin(props) {
  const rowBg = (key) => {
    return key % 2 === 0 ? "dark" : "light";
  };

  const rowData = (key, item) => {
    console.log(props.activekey);
    var testdata="";
    try { 
     testdata=props.stepdata.test_data['test_data'][0]['Dataset ID'];
  
    }
    catch(err) {
   testdata = "";

    } 
 
    return (
      <>
      <tr key={uniqid()}>
          <td className={rowBg(key) + " hoverable"} data-id={key} key={uniqid()} onClick={props.selectRow}>{item["Scenario ID"]}</td>
          <td className={rowBg(key) + " hoverable"} data-id={key} key={uniqid()} onClick={props.selectRow}>{item.sc_title}</td>
          <td className={rowBg(key) + " hoverable"} data-id={key} key={uniqid()} onClick={props.selectRow}>{item["Scenario Status"]}</td>
          <td className={rowBg(key) + " hoverable"} data-id={key} key={uniqid()} onClick={props.selectRow}>{item["TC Secquence"]}</td>
          <td className={rowBg(key) + " hoverable"} data-id={key} key={uniqid()} onClick={props.selectRow}>{item["Test Case"]}</td>
          <td className={rowBg(key) + " hoverable"} data-id={key} key={uniqid()} onClick={props.selectRow}>{item["TC Transaction Name"]}</td>
          <td className={rowBg(key) + " hoverable"} data-id={key} key={uniqid()} onClick={props.selectRow}>{item["Assigned Tester"]}</td>
          <td className={rowBg(key) + " hoverable"} data-id={key} key={uniqid()} onClick={props.selectRow}>{item["Pre-Req TC"]}</td>
          <td className={rowBg(key) + " hoverable"} data-id={key} key={uniqid()} onClick={props.selectRow}>{item["Pre-Req Tester"]}</td>
          <td className={rowBg(key) + " hoverable"} data-id={key} key={uniqid()} onClick={props.selectRow}>{item["Pre-Req status"]}</td>
          <td className={rowBg(key) + " hoverable"} data-id={key} key={uniqid()} onClick={props.selectRow}>{item.tc_hobsrole}</td>
          <td className={rowBg(key) + " hoverable"} data-id={key} key={uniqid()} onClick={props.selectRow}>{item["Physical Day"]}</td>
          <td className={rowBg(key) + " hoverable"} data-id={key} key={uniqid()} onClick={props.selectRow}>{item["Virtual Day"]}</td>
          <td className={rowBg(key) + " hoverable"} data-id={key} key={uniqid()} onClick={props.selectRow}>{item["Assigned Date"]}</td>
          <td className={rowBg(key) + " hoverable"} data-id={key} key={uniqid()} onClick={props.selectRow}>{item["Execution Date"]}</td>
          <td className={rowBg(key) + " hoverable"} data-id={key} key={uniqid()} onClick={props.selectRow}>{item["te_reason"]}</td>
          <td className={rowBg(key) + " hoverable"} data-id={key} key={uniqid()} onClick={props.selectRow}>{item["ABT Remarks"]}</td>
          <td className={rowBg(key) + " hoverable"} data-id={key} key={uniqid()} onClick={props.selectRow}>
           {(props.activeKey != "" && props.activeKey == key)  && <a key={uniqid()} data-id={key} className="text-color-blue bold" onClick={() =>window.open("/sc-test-data/" + item["Scenario ID"], "_blank")}>{item["Dataset ID"]}</a>
          }
            </td>
         
          <td className={rowBg(key) + " hoverable"} data-id={key} key={uniqid()}>
                {props.option==='admin' &&  
                     <TCStatusLabelAdmin forTestStep={false} label={item["Status"] } status={ item["Status"]}/>
                    }
                    
          </td>
        </tr>
        <tr  key={uniqid()} className={ props.activeKey != "" && props.activeKey == key ? "" : "hide"}>
         <td colSpan="19"   key={uniqid()} className={rowBg(key) + " hoverable"} data-id={key}>
          <ReviewTableRowValue data={props.stepdata.steps} key={uniqid()} />
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
          <th key={uniqid()}>Scenario Status</th>
          <th key={uniqid()}>TC Sequence</th>
          <th key={uniqid()}>Test Case</th>
          <th key={uniqid()}>TC Transaction Name</th>
          <th key={uniqid()}>Assigned Tester</th>
       
          <th key={uniqid()}>Pre-Req TC</th>
          <th key={uniqid()}>Pre-Req Tester</th>
          <th key={uniqid()}>Pre-Req Status</th>
          <th key={uniqid()}>TC HobsRole</th>
          <th key={uniqid()}>Physical Day</th>
          <th key={uniqid()}>Virtual Day</th>
          <th key={uniqid()}>Assigned Date</th>
          <th key={uniqid()}>Execution Date</th>
          <th key={uniqid()}>Reason</th>
          <th key={uniqid()}>ABT Remarks</th>
          <th key={uniqid()}>Dataset</th>
          <th key={uniqid()}>Status</th>
        </tr>
      </thead>
      <tbody key={uniqid()}>
        {props.data !== undefined && props.data.length >= 1 ? (
          rows(props.data)
        ) : (
          <tr key={uniqid()}>
<td  key={uniqid()} colSpan="19" className="light">
  No data found
</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
export default ReviewTableAdmin;
