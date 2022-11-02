import React, { useRef, useEffect, Component, useState } from "react";

import { DynamicMenu } from "../../../shared/constants";
import { Link } from "react-router-dom";
import {
  MinusCircleFilled,
  PlusCircleFilled,
  SettingOutlined,
  BarChartOutlined,
  ClusterOutlined,
} from "@ant-design/icons";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import { GetData } from "../../../utils/api/GetData";
import exportFromJSON from "export-from-json";
import { Excel } from "../../../shared/Excel";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
const uniqid = require("uniqid");
var isLoading = false;

function MenuComponent(props) {
  const [Label, setLabel] = useState("Export Flat File");
  const [Label2, setLabel2] = useState("All Test Case Monitoring");
  const [Label3, setLabel3] = useState("All Test Data Monitoring");
  const [Label4, setLabel4] = useState("ALL TC Monitoring V2");
  const [Label5, setLabel5] = useState("Historical TC Exec");
  const [Label6, setLabel6] = useState("ALL TC Monitoring V3");
  const [Label7, setLabel7] = useState("Blocked Report");
  const inputRef = useRef([]); // Javascript
  const itemsRef = useRef([]); // Javascript
  const getKeyByValue = (value) => {
    return Object.keys(DynamicMenu).find((key) => DynamicMenu[key] === value);
  };
  const rowBg = (key) => {
    return key % 2 == 0 ? "dark" : "light";
  };

  const ExportToExcel = async (id) => {
    if (id === 1) {
      setLabel("Loading...");
    }
    if (id === 2) {
      setLabel2("Loading...");
    }
    if (id === 3) {
      setLabel3("Loading...");
    }
    if (id === 8) {
      setLabel4("Loading...");
    }
    if (id === 9) {
      setLabel5("Loading...");
    }
     if (id === 10) {
       setLabel6("Loading...");
     }
      if (id === 11) {
        setLabel7("Loading...");
      }
    var datas = await GetData("graphreport/" + id, true).then((response) => {
      var date = new Date().getTime();
      var exportType = "excel";
      var fileName = "";
      if (id === 1) {
        setLabel("Export Flat File");
        fileName = "Export_Flat_File_" + date;
      }
      if (id === 2) {
        setLabel2("All Test Case Monitoring");
        fileName = "All_Test_Case_Monitoring_" + date;
      }
      if (id === 3) {
        setLabel3("All Test Data Monitoring");
        fileName = "All_Test_Data_Monitoring_" + date;
      }
      if (id === 8) {
        setLabel4("ALL TC Monitoring V2");
        fileName = "ALL_TC_Monitoring_V2_" + date;
      }
      if (id === 9) {
        setLabel5("Historical TC Exec");
        fileName = "Historical_TC_Exec_" + date;
      }
     if (id === 10) {
        setLabel6("ALL TC Monitoring V3");
        fileName = "ALL_TC_Monitoring_V3" + date;
      }
       if (id === 11) {
         setLabel7("Blocked Report");
         fileName = "Blocked_Report" + date;
       }
      // exportFromJSON({ data: response.data.result, fileName: fileName, exportType:'xls'})
      Excel(response.data.result, fileName);
    });
  };

  const rows = () => {
    let content = [];
    let tempcontent=[];
    if (localStorage.getItem("UserAccess") !== undefined) {
      var UserAccess = JSON.parse(localStorage.getItem("UserAccess"));

      if (UserAccess[props.module_name].sub_modules.length >= 1) {
        var nav_name = "";
        var nav_access = "";
        for (
          let i = 0;
          i < UserAccess[props.module_name].sub_modules.length;
          i++
        ) {
          let arrkey = i - 1;
          nav_name = Object.keys(
            UserAccess[props.module_name].sub_modules[i]
          ).toString();
          nav_access = Object.values(
            UserAccess[props.module_name].sub_modules[i]
          ).toString();
          let path = getKeyByValue(nav_name);
              if (
                nav_access !== "0" &&
                nav_name !== "All Test Case Monitoring" &&
                nav_name !== "All Test Data Monitoring" &&
                nav_name !== "Export Flat File" &&
                nav_name !== "ALL TC Monitoring V2" &&
                nav_name !== "Historical TC Exec" &&
                nav_name !== "ALL TC Monitoring V3" &&
                nav_name !== "Blocked Report"
              ) {
                content.push(
                  <NavItem eventKey={uniqid()} key={uniqid()}>
                    <NavText key={uniqid()}>
                      <Link to={path} className="crud" key={uniqid()}>
                        {nav_name}
                      </Link>
                    </NavText>
                  </NavItem>
                );
              }
        }
        if (
          Object.values(UserAccess["Dashboard"].sub_modules[8]).toString() !==
          "0"
        ) {
          tempcontent.push(
            <NavItem eventKey={uniqid()} key={uniqid()}>
              <NavText key={uniqid()}>
                <Link
                  to="#"
                  className="crud"
                  onClick={() => ExportToExcel(1)}
                  key={uniqid()}
                >
                  {Label}
                </Link>
              </NavText>
            </NavItem>
          );
        }
        if (
          Object.values(UserAccess["Dashboard"].sub_modules[9]).toString() !==
          "0"
        ) {
          tempcontent.push(
            <NavItem eventKey={uniqid()} key={uniqid()}>
              <NavText key={uniqid()}>
                <Link
                  to="#"
                  className="crud"
                  onClick={() => ExportToExcel(2)}
                  key={uniqid()}
                >
                  {Label2}
                </Link>
              </NavText>
            </NavItem>
          );
        }
        if (
          Object.values(UserAccess["Dashboard"].sub_modules[10]).toString() !==
          "0"
        ) {
          tempcontent.push(
            <NavItem eventKey={uniqid()} key={uniqid()}>
              <NavText key={uniqid()}>
                <Link
                  to="#"
                  className="crud"
                  onClick={() => ExportToExcel(3)}
                  key={uniqid()}
                >
                  {Label3}
                </Link>
              </NavText>
            </NavItem>
          );
        }
        if (
          Object.values(UserAccess["Dashboard"].sub_modules[11]).toString() !==
          "0"
        ) {
          tempcontent.push(
            <NavItem eventKey={uniqid()} key={uniqid()}>
              <NavText key={uniqid()}>
                <Link
                  to="#"
                  className="crud"
                  onClick={() => ExportToExcel(8)}
                  key={uniqid()}
                >
                  {Label4}
                </Link>
              </NavText>
            </NavItem>
          );
        }
        if (
          Object.values(UserAccess["Dashboard"].sub_modules[12]).toString() !==
          "0"
        ) {
          tempcontent.push(
            <NavItem eventKey={uniqid()} key={uniqid()}>
              <NavText key={uniqid()}>
                <Link
                  to="#"
                  className="crud"
                  onClick={() => ExportToExcel(9)}
                  key={uniqid()}
                >
                  {Label5}
                </Link>
              </NavText>
            </NavItem>
          );
        }
           if (
             Object.values(
               UserAccess["Dashboard"].sub_modules[13]
             ).toString() !== "0"
           ) {
             tempcontent.push(
               <NavItem eventKey={uniqid()} key={uniqid()}>
                 <NavText key={uniqid()}>
                   <Link
                     to="#"
                     className="crud"
                     onClick={() => ExportToExcel(10)}
                     key={uniqid()}
                   >
                     {Label6}
                   </Link>
                 </NavText>
               </NavItem>
             );
           }
             if (
               Object.values(
                 UserAccess["Dashboard"].sub_modules[14]
               ).toString() !== "0"
             ) {
               tempcontent.push(
                 <NavItem eventKey={uniqid()} key={uniqid()}>
                   <NavText key={uniqid()}>
                     <Link
                       to="#"
                       className="crud"
                       onClick={() => ExportToExcel(11)}
                       key={uniqid()}
                     >
                       {Label7}
                     </Link>
                   </NavText>
                 </NavItem>
               );
             }
      }

      if (tempcontent.length > 0 && props.module_name=='Dashboard') {
        content.push(
          <NavItem
            eventKey={uniqid()}
            key={uniqid()}
            className="custom-nav-item"
          >
            <NavText key={uniqid()}>
              <div
                style={{
                  marginTop: "10px",
                  marginBottom: "5px",
                  color: "#fff",
                  lineHeight: "48px",
                  borderBottom: "1px #ccc solid",
                  textAlign: "center",
                }}
              >
                Direct Export Report
              </div>
            </NavText>
          </NavItem>
        );
        content.push(tempcontent);
      }
    }
    return content;
  };

  return (
    <NavItem eventKey="settings">
      <NavIcon>
        {props.module_name === "Maintainance" && (
          <ClusterOutlined className="drawer-icon" />
        )}
        {props.module_name === "System Settings" && (
          <SettingOutlined className="drawer-icon" />
        )}
        {props.module_name === "Dashboard" && (
          <BarChartOutlined
            onClick={() => this.gotoIconLink("dashboard")}
            className="drawer-icon"
          />
        )}
      </NavIcon>

      <NavText>
        <span className="drawer-text">{props.module_name}</span>
      </NavText>

      {rows()}
    </NavItem>
  );
}
export default MenuComponent;
