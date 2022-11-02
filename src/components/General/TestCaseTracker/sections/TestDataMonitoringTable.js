import React from "react";
import ReviewTableRowValue from "./ReviewTableRowValue";
import ReviewStatusOptions from "../../StatusLabel/ReviewStatusOptions";
import { FormOutlined,SearchOutlined } from "@ant-design/icons";
import TCStatusLabel from '../../../General/StatusLabel/TCStatusLabel';
 
const uniqid = require("uniqid");

function TestDataMonitoringTable(props) {
  const rowBg = (key) => {
    return key % 2 === 0 ? "dark" : "light";
  };

  const rowData = (key, item) => {
  
    return (
      <>
        <tr key={uniqid()}>
          <td
            className={rowBg(key) + " hoverable"}
            data-id={key}
            key={uniqid()}
          >
            {item["Scenario ID"]}
          </td>
          <td
            className={rowBg(key) + " hoverable"}
            data-id={key}
            key={uniqid()}
          >
            <a
              key={uniqid()}
              data-id={key}
              className="text-color-blue bold"
              onClick={() =>
                window.open("/test-data-report/" + item["Dataset ID"], "_blank")
              }
            >
              {item["Dataset ID"]}
            </a>
          </td>
          <td
            className={rowBg(key) + " hoverable"}
            data-id={key}
            key={uniqid()}
          >
            {item["Used Date"] != null ? item["Used Date"] : "\\N"}
          </td>
          <td
            className={rowBg(key) + " hoverable"}
            data-id={key}
            key={uniqid()}
          >
            {item["Used By"] != null ? item["Used By"] : "\\N"}
          </td>
          <td
            className={rowBg(key) + " hoverable"}
            data-id={key}
            key={uniqid()}
          >
            {item["Test Data Status"]}
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
          <th key={uniqid()}>Dataset ID</th>
          <th key={uniqid()}>Used Date</th>
          <th key={uniqid()}>Used By</th>
          <th key={uniqid()}>Status</th>
          
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
export default TestDataMonitoringTable;
;
