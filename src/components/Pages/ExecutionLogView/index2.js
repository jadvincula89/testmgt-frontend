import React, { useState, useEffect, useRef, useMemo } from "react";
import Cookies from "universal-cookie";
import PageTitle from "../../General/PageTitle";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { PostData } from "../../../utils/api/PostData";
import { CHART_COLOR } from "../../../shared/constants";
import "../Dashboard/testCase.css";
import "./execution.css";
import * as Icon from "react-bootstrap-icons";
import TableServices from "../Settings/TableServices";
import ReactPaginate from "react-paginate";
import BasicBtn from "../../General/Buttons/BasicBtn";
import exportFromJSON from "export-from-json";
import { Excel } from "../../../shared/Excel";
import {
  Alert,
  Form,
  Button,
  Card,
  Col,
  Row,
  Container,
  InputGroup,
} from "react-bootstrap";
import { FadeLoader } from "react-spinners";

const cookies = new Cookies();
const uniqid = require("uniqid");
function ExecutionLogView() {
  const [executionplandata, setexecutionplandata] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [AssignedTester, changeAssignedTester] = useState("");
  const [statusType, setStatusType] = useState([
    { description: "Status Type", value: "" },
    { description: "Executable", value: "executable" },
    { description: "Not Executable", value: "not-executable" },
  ]);
  const [PreReqTester, changePreReqTester] = useState("");
  const [exportlabel, setLabel] = useState("Export to Excel");
  const [TCStatus, SetTCStatus] = useState(0);
  const [PreReqStatus, SetPreReqStatus] = useState(0);
  const [pageCount, setPageCount] = useState(0);
   const [startDate, setStartDate] = useState('');
   const [endDate, setEndDate] = useState('');
 
  const [itemOffset, setItemOffset] = useState(0);
  const [statustype, SetTCStatusType] = useState("");
  const [customerType, setCustomerType] = useState("Individual");
  const [itemsPerPage, setitemsPerPage] = useState(10);
  const [testers, SetTesters] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [filteredTCStatus, setFilteredTCStatus] = useState([]);
  const [filteredPreReqStatus, setFilteredPreReqStatus] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const changePageSize = (e) => {
    setitemsPerPage(e.target.value);
    setItemOffset(0);
  };

  const changeCustomerType = (e) => {
    setCustomerType(e.target.value);
    loadAPI(itemOffset, e.target.value);
  };

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % executionplandata.length;

    setItemOffset(newOffset);
    loadAPI(event.selected);
  };
  const search = () => {
    loadAPI(itemOffset);
  };
  const formatDate=(date)=> {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
  const ExportToExcel = async () => {
    setLabel("Loading...");
    const payload = {
      requesttype: "download",
      offset: 0,
      limit: itemsPerPage,
      assignedtester: AssignedTester,
      prereqtester: PreReqTester,
      tcstatus: TCStatus,
      prereqstatus: PreReqStatus,
      statusType: statustype,
      startDate: startDate != "" ? formatDate(startDate) : "",
      endDate: endDate != "" ? formatDate(endDate) : "",
    };
    var datas = await PostData("execution-plan", payload, true).then(
      (response) => {
        var date = new Date().getTime();
        setLabel("Export to Excel");
        var fileName = "ExecutionPlanReport_" + date;
        //exportFromJSON({ data:response.result.rows, fileName: fileName, exportType: 'xls' });
        Excel(response.result.rows, fileName);
      }
    );
  };

  const loadAPI = (offst = 0) => {
    setLoading(true);
    const payload = {
      requesttype: "display",
      offset: offst,
      limit: itemsPerPage,
      assignedtester: AssignedTester,
      prereqtester: PreReqTester,
      tcstatus: TCStatus,
      prereqstatus: PreReqStatus,
      statusType: statustype,
      startDate: (startDate!=''?formatDate(startDate):''),
      endDate:  (endDate!=''?formatDate(endDate):''),
    };
    PostData("execution-plan", payload, true).then((response) => {
      setexecutionplandata(response.result.rows);
      setFilteredData(response.result.rows);
      setPageCount(Math.ceil(response.result.count / itemsPerPage));
      setLoading(false);
    });
  };
  const changeStatus = (value) => {
    SetTCStatusType(value);

    reloadTCStatus(value);
    //reloadPreReqStatus(value);
  };
  const reloadTCStatus = (value) => {
    const uniqueTags = [];
    //executable 2,3,4,13

    //non-executable (11,6,14,8,7,10,13)
    if (value != "not-executable" && value != "executable") {
      statusList
        .filter(
          (obj) =>
            obj.id == 2 ||
            obj.id == 3 ||
            obj.id == 4 ||
            obj.id === 6 ||
            obj.id === 7 ||
            obj.id === 8 ||
            obj.id === 10 ||
            obj.id === 14 ||
            obj.id === 11
        )
        .map((item) => {
          uniqueTags.push(item);
        });
      setFilteredTCStatus(uniqueTags);
    }

    if (value == "executable") {
      statusList
        .filter((obj) => obj.id == 2 || obj.id == 3 || obj.id == 4)
        .map((item) => {
          uniqueTags.push(item);
        });
      setFilteredTCStatus(uniqueTags);
    }
    if (value == "not-executable") {
      statusList
        .filter(
          (obj) =>
            obj.id === 6 ||
            obj.id === 7 ||
            obj.id === 8 ||
            obj.id === 10 ||
            obj.id === 14 ||
            obj.id === 11
        )
        .map((item) => {
          uniqueTags.push(item);
        });
      setFilteredTCStatus(uniqueTags);
    }
  };
  const reloadPreReqStatus = (value) => {
    const uniqueTags = [];
    //executable 2,3,4,13

    //non-executable (11,6,14,8,7,10,13)
    if (value != "not-executable" && value != "executable") {
      statusList.map((item) => {
        uniqueTags.push(item);
      });
      setFilteredPreReqStatus(uniqueTags);
    }
    if (value == "executable") {
      statusList
        .filter(
          (obj) => obj.id == 2 || obj.id == 3 || obj.id == 4 || obj.id == 13
        )
        .map((item) => {
          uniqueTags.push(item);
        });
      setFilteredPreReqStatus(uniqueTags);
    }
    if (value == "not-executable") {
      statusList
        .filter(
          (obj) =>
            obj.id === 6 ||
            obj.id === 7 ||
            obj.id === 8 ||
            obj.id === 10 ||
            obj.id === 14 ||
            obj.id === 11 ||
            obj.id === 13
        )
        .map((item) => {
          uniqueTags.push(item);
        });
      setFilteredPreReqStatus(uniqueTags);
    }
  };
  const loadDropdownAPI = async () => {
    const payload = {
      requesttype: "dropdown",
      statusType: statustype,
    };
    if (testers.length === 0) {
      PostData("execution-plan", payload, true).then((response) => {
        SetTesters(response.result.users);
        setStatusList(response.result.status);
        setFilteredTCStatus(response.result.status);

        setFilteredPreReqStatus(response.result.status);
      });
    }
  };

  useEffect(() => {
    loadDropdownAPI();
    //loadAPI(0);
  }, [
    itemsPerPage,
    AssignedTester,
    PreReqTester,
    TCStatus,
    PreReqStatus,
    statustype,
  ]);

  return (
    <Container fluid>
      <Row className="top-1 separator-border">
        <Col xs={12} md={12}>
          <div className="col-lg-12 col-sm-12 top-10 mb-10 ">
            <PageTitle title="Execution Log View" />
          </div>
        </Col>
      </Row>
      <div>
        <Row className="top-2">
          <Card border="secondary" text="dark">
            <Card.Body>
              <div className="col-md-12 container-div separator-border">
                <div className="col-md-12">
                  <Row className="top-10">
                    <div className="clear"></div>
                    <div className="clear"></div>

                    <div className="col-md-3  mt-2">
                      <Form.Group className="mb-2 relative">
                        <Form.Select
                          name="AssignedTester"
                          value={AssignedTester}
                          onChange={(e) => changeAssignedTester(e.target.value)}
                        >
                          <option value={""}>Select Assigned Tester</option>
                          {testers.map((item, i) => (
                            <option value={item.u_name} key={uniqid()}>
                              {item.u_name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </div>
                    <div className="col-lg-3   mt-2">
                      <Form.Group className="mb-2 relative">
                        <Form.Select
                          name="PreReqTester"
                          value={PreReqTester}
                          onChange={(e) => changePreReqTester(e.target.value)}
                        >
                          <option value={""}>Select Pre-Req Tester</option>
                          {testers.map((item, i) => (
                            <option value={item.u_name} key={uniqid()}>
                              {item.u_name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </div>
                    <div className=" col-lg-2  mt-2">
                      <Form.Group className="mb-2  relative">
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          selectsStart
                          startDate={startDate}
                          endDate={endDate}
                          name="startDate"
                          dateFormat="yyyy-MM-dd"
                          placeholderText="PhyDay From"
                          className="form-control"
                          maxDate={endDate}
                        />
                      </Form.Group>
                    </div>
                    <div className=" col-lg-2  mt-2">
                      <Form.Group className="mb-2  relative">
                        <DatePicker
                          selected={endDate}
                          onChange={(date) => setEndDate(date)}
                          selectsEnd
                          startDate={startDate}
                          endDate={endDate}
                          minDate={startDate}
                          name="endDate"
                          dateFormat="yyyy-MM-dd"
                          placeholderText="PhyDay To"
                          className="form-control"
                        />
                      </Form.Group>
                    </div>

                    <div className="col-lg-2  mt-2">
                      <Form.Group className="mb-2 relative">
                        <Form.Select
                          name="statustype"
                          value={statustype}
                          onChange={(e) => changeStatus(e.target.value)}
                        >
                          {statusType.map((item, i) => (
                            <option value={item.value} key={uniqid()}>
                              {item.description}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </div>
                    <div className="col-lg-2  mt-2">
                      <Form.Group className="mb-2 relative">
                        <Form.Select
                          name="TCStatus"
                          value={TCStatus}
                          onChange={(e) => SetTCStatus(e.target.value)}
                        >
                          <option value={""}>All Test Case Status</option>
                          {filteredTCStatus
                            .filter((obj) => obj.id != 13)
                            .map((item, i) => (
                              <option value={item.description} key={uniqid()}>
                                {item.description}
                              </option>
                            ))}
                        </Form.Select>
                      </Form.Group>
                    </div>
                    <div className="col-lg-2  mt-2">
                      <Form.Group className="mb-2 relative">
                        <Form.Select
                          name="PreReqStatus"
                          value={PreReqStatus}
                          onChange={(e) => SetPreReqStatus(e.target.value)}
                        >
                          <option value={""}>All Pre-Req Status</option>
                          {filteredPreReqStatus.map((item, i) => (
                            <option value={item.description} key={uniqid()}>
                              {item.description}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </div>

                    <div className="col-lg-2   mt-1">
                      <button
                        class="btn-success btn-xs text-color-white"
                        onClick={() => search()}
                      >
                        Filter Data
                      </button>
                    </div>
                  </Row>

                  <Row className="top-2">
                    <Col xs={12} md={12}>
                      <Card>
                        <Card.Body>
                          <Row className="top-2">
                            <div className="col-lg-1   mt-2">
                              <Form.Group className="mb-2 relative">
                                <Form.Select
                                  name="pagesize"
                                  onChange={changePageSize}
                                >
                                  <option value="10">10</option>
                                  <option value="20">20</option>
                                  <option value="50">50</option>
                                  <option value="100">100</option>
                                  <option value="200">200</option>
                                </Form.Select>
                              </Form.Group>
                            </div>
                            <div className="col-lg-2   mt-1">
                              <button
                                class=" bg-blue btn-xs text-color-white"
                                onClick={() => ExportToExcel()}
                              >
                                {exportlabel}
                              </button>
                            </div>
                          </Row>
                          <span
                            className="spinner-holder absolute"
                            style={{ position: "fixed", zIndex: "999" }}
                          >
                            <FadeLoader
                              style={{
                                display: "block",
                                margin: "0 auto",
                                borderColor: "red",
                              }}
                              sizeUnit={"px"}
                              size={10}
                              color={"#ca5d41"}
                              loading={isLoading}
                            />
                          </span>
                          {filteredData.length > 0 && (
                            <TableServices
                              rows={filteredData}
                              tablename="executionlogview"
                            />
                          )}
                          <ReactPaginate
                            breakLabel="..."
                            nextLabel="next >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={5}
                            pageCount={pageCount}
                            previousLabel="< previous"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            containerClassName="pagination"
                            activeClassName="active"
                            renderOnZeroPageCount={null}
                          />
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Row>
      </div>
    </Container>
  );
}
export default ExecutionLogView;
