import React from "react";
import { MinusCircleFilled } from "@ant-design/icons";
const uniqid = require("uniqid");

function ObjectiveTrackerTable(props) {
const rowBg = (key) => {
return key % 2 == 0 ? "dark" : "light";
};

const rowData = (key, item) => {
return (
<>
  <tr key={uniqid()}>
    <td className={rowBg(key) + " hoverable" } data-id={key} key={uniqid()}>
      {item.to_area}
    </td>
    <td className={rowBg(key) + " hoverable" } data-id={key} key={uniqid()}>
      {item.to_group}
    </td>
    <td className={rowBg(key) + " hoverable" } data-id={key} key={uniqid()}>
      {item.to_objectives}
    </td>
    <td className={rowBg(key) + " hoverable" } data-id={key} key={uniqid()}>
      {item.to_description}
    </td>
    <td className={rowBg(key) + " hoverable" } data-id={key} key={uniqid()}>
      {item.to_objective_class}
    </td>
    <td className={rowBg(key) + " hoverable" } data-id={key} key={uniqid()}>
      {item.sc_code}
    </td>
    <td className={rowBg(key) + " hoverable" } data-id={key} key={uniqid()}>
      {item.sc_title}
    </td>
      <td className={rowBg(key) + " hoverable" } data-id={key} key={uniqid()}>
        {item.to_customertype}
      </td>
    <td className={rowBg(key) + " hoverable" } data-id={key} key={uniqid()}>
      {item.tso_id!==null && <MinusCircleFilled key={uniqid()} className='remove' onClick={()=>
        props.remove(item.tso_id)} /> }
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
<table border="1" className='tbl-no-style' key={Math.random()}>
  <thead>
    <tr key={Math.random() }>
      <th key={Math.random()}>Area</th>
      <th key={ Math.random()}>Group</th>
      <th key={Math.random()}>Objectives</th>
      <th key={Math.random() }>Description</th>
      <th key={Math.random()}>Objective Class</th>
      <th key={ Math.random()}>Scenario Code</th>
      <th key={Math.random()}>Scenario Title</th>
      <th key={Math.random()}>Customer Type</th>
      <th key={Math.random()}>Action</th>

    </tr>
  </thead>
  <tbody key={uniqid()}>
    {props.data !== undefined && props.data.length >= 1 ? (
    rows(props.data)
    ) : (
    <tr key={uniqid()}>
      <td colSpan="8" key={uniqid()} className="light">
        No data found
      </td>
    </tr>
    )}
  </tbody>
</table>
);
}
export default ObjectiveTrackerTable;