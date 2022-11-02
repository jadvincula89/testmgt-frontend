import React, { useState, useEffect, useRef, useMemo } from "react";
import Cookies from "universal-cookie";
import PageTitle from "../../General/PageTitle";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SearchOutlined } from "@ant-design/icons";
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
  
  const [filteredData, setFilteredData] = useState([]);
 
 
 
  const [keyword, setKeyword] = useState("");
 
  const [isLoading, setLoading] = useState(false);

 
 
  const search = () => {
    loadAPI();
  };
 
 
  const loadAPI = (offst = 0) => {
    setLoading(true);
    const payload = {
      keyword: keyword,
     
    };
    PostData("execution-log", payload, true).then((response) => {
      setFilteredData(response.result);
       setLoading(false);
    });
  };
 
 
    const searchKeyword = (event) => {
      setKeyword(event.target.value);
    };
    const keyPress = (e) => {
      if (e.keyCode == 13) {
        search();
      }
    };
 
  useEffect(() => {
     
  }, [
   
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
                  </Row>

                  <Row className="top-2">
                    <Col xs={12} md={12}>
                      <Card>
                        <Card.Body>
                          <div
                            className="col-lg-6 left"
                            style={{ paddingRight: "5px" }}
                          >
                            <Form.Group
                              className="mb-3 relative left col-md-8"
                              controlId="formGroupName"
                            >
                              <Form.Label>
                                <b> Test Case Instance ID</b>
                              </Form.Label>

                              <Form.Control
                                type="text"
                                onChange={searchKeyword}
                                onKeyDown={keyPress}
                                name="keyword"
                                placeholder="Test Case Instance ID"
                              />
                              <span className="search-icon" onClick={search}>
                                <SearchOutlined />
                              </span>
                            </Form.Group>

                            <BasicBtn
                              title="Search"
                              onClick={() => search()}
                              additionalStyle="left search-repl"
                            />
                          </div>

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
