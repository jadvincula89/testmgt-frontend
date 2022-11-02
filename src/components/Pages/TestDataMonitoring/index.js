import React, { useState, useEffect, useRef, useMemo } from "react";
import Cookies from "universal-cookie";
import PageTitle from "../../General/PageTitle";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { PostData } from "../../../utils/api/PostData";
import { CHART_COLOR } from "../../../shared/constants";
import { FormOutlined, SearchOutlined } from "@ant-design/icons";
import "../Dashboard/testCase.css";
import TestDataMonitoringTable from "../../General/TestCaseTracker/sections/TestDataMonitoringTable";
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
function TestDataMonitoring() {
  const [monitordata, setmonitordata] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [PreReqStatus, SetPreReqStatus] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setitemsPerPage] = useState(10);
  const [pageLimit,setPageLimit]=useState(10000);
  const [isLoading, setLoading] = useState(false);
  const [active, setActive] = useState(0);
 
  const accessToken = cookies.get("accessToken");
  const changePageSize = async(e) => {
   await setitemsPerPage(e.target.value);
   
	 search(itemOffset,e.target.value);
  };  
	const searchButton = () => {
    search(itemOffset, itemsPerPage);
  };
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % monitordata.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
    search(event.selected, itemsPerPage);
  };
  const searchKeyword = (e) => {
    setKeyword(e.target.value);
  };

  const keyPress = (e) => {
    if (e.keyCode == 13) {
      search();
    }
  };
  const search = useMemo(() => (offst = 0,lmt=10) => {
    setLoading(true);
    const payload = {
      status: "monitoring",
      offset: offst,
      keyword: keyword,
      isactive: active,
      limit: lmt,
      session: accessToken,
    };
    PostData("search", payload, true).then((response) => {
      setmonitordata(response.result.data);
      setPageLimit(response.result.totalrows);
      	setPageCount(Math.ceil(response.result.totalrows / lmt));
      setLoading(false);
    });
  });
   const ExportToExcel = async () => {
      const payload = {
        status: "monitoring",
        offset: 0,
        keyword: keyword,
        isactive: active,
        limit: pageLimit,
        session: accessToken,
      };
      PostData("search", payload, true).then((response) => {
        var date = new Date().getTime();
        var fileName = "Test_Data_Monitoring_" + date;
         Excel(response.result.data, fileName);
      });
   };
  
  useEffect(() => {
    //loadDropdownAPI();
    search(0);
  }, [active]);

  return (
    <Container fluid>
      <Row className="top-1 separator-border">
        <Col xs={12} md={12}>
          <div className="col-lg-12 col-sm-12 top-10 mb-10 ">
            <PageTitle title="Test Data Monitoring" />
          </div>
        </Col>
      </Row>
      <div className="col-md-12">
        <Row className="top-2">
          <Card border="secondary" text="dark">
            <Card.Body>
              <div className="col-md-12 container-div separator-border">
                <div className="col-md-12">
                  <Row className="top-20">
                    <div className="clear"></div>
                    <div className="clear"></div>

                    <div className="col-lg-1   mt-1">
                      <Form.Group className="mb-2 relative">
                        <Form.Label>
                          <i> Page Size</i>
                        </Form.Label>
                        <Form.Select name="pagesize" onChange={changePageSize}>
                          <option value="10">10</option>
                          <option value="20">20</option>
                          <option value="50">50</option>
                          <option value="100">100</option>
                          <option value="200">200</option>
                        </Form.Select>
                      </Form.Group>
                    </div>
                    <div className="col-md-3  m-1 mt-1">
                      <Form.Group
                        className="mb-3 relative"
                        controlId="formGroupName"
                      >
                        <Form.Label>
                          <i> &nbsp;</i>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          onChange={searchKeyword}
                          onKeyDown={keyPress}
                          placeholder="Search by Scenario ID or Dataset ID"
                        />
                        <span className="search-icon" onClick={searchButton}>
                          <SearchOutlined />
                        </span>
                      </Form.Group>
                    </div>

                    <div className="col-lg-1  mt-1">
                      <Form.Group className="mb-2 relative">
                        <Form.Label>
                          <i> &nbsp;</i>
                        </Form.Label>
                        <Form.Select
                          name="PreReqStatus"
                          value={active}
                          onChange={(e) => setActive(e.target.value)}
                        >
                          <option value={""}>Select Status</option>
                          <option value={0}>Active</option>
                          <option value={1}>Inactive</option>
                        </Form.Select>
                      </Form.Group>
                    </div>

                    <div className="col-lg-3 mt-1 ">
                      <br /> <br />
                      <button
                        className=" bg-blue text-color-white right"
                        onClick={() => ExportToExcel()}
                      >
                        Export to Excel
                      </button>
                    </div>
                  </Row>

                  <Row className="top-5">
                    <Col xs={12} md={12}>
                      <Card>
                        <Card.Body>
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
                          <TestDataMonitoringTable
                            data={monitordata}
                            key={1}
                            activeKey={active}
                          />
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
export default TestDataMonitoring;
