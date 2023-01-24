
import React, { Component } from "react";
import Cookies from "universal-cookie";
import PageTitle from "../../General/PageTitle";
import CloningModal from '../../General/Modals/CloningModal';
import AddDynamicDataModal from "../../General/Modals/AddDynamicDataModal";
 
 import {
 
   DYNAMIC_DATA_COLS
 
 } from "../../../shared/constants";

import { SearchOutlined } from "@ant-design/icons";
import DynamicScenarioTable  from "../../General/TestCaseTracker/sections/DynamicScenarioTable";
import { PostData } from '../../../utils/api/PostData';
import { GetData } from '../../../utils/api/GetData';
import DynamicDataService from '../../../services/DynamicDataService';
import { FadeLoader } from 'react-spinners';

import {
    Form,
    Card,
    Col,
    Row,
    Container,
  } from "react-bootstrap";
import '../TestCaseTracker/testCase.css';
import { Button } from "react-bootstrap";


const uniqid = require('uniqid');
 const cookies = new Cookies();
 
  class ScenarioCloning extends Component {
    constructor(props) {
      super(props);
      this.state = {
        initialData: [],
        data: [],
        scenario: [],
        testcaseid: "",
        testcasedata: [],
        keyword: "",
        active: "",
        dynamicData_count: 1,
        test_case_step: [],
        dynamic_data: [DYNAMIC_DATA_COLS],
        dynamic_data_attr: [],
        dynamic_data_err: [],
        dynamic_data_delete: [],
        showReassignModal: false,
        isBlocked: false,
        isPassed: false,
        isFailed: false,
        status: "",
        to: 0,
        ts_id: 0,
        tc_id: 0,
        tce_id: 0,
        from: 0,
        openModal: false,
        openDynamicModal: false,
        confirmChangeStatusMsg: "",
        uniqueValue: [],
        uniqueAttr: DynamicDataService.getUniqueAttr([]),
        filterValue: "",
        filterAttr: "",
        loader: "",
        selectedstepdesc: "",
      };
    }
    searchkeypressTestCaseID = (e) => {
  if (e.keyCode === 13) {
    this.searchTestCaseId();
  }
    }
    changeTestCaseID = (e) => {
      let value = e.target.value;
      this.setState({ testcaseid: value });
    
    };
    getTestCaseStep = (tcid) => {
      let accessToken = cookies.get("accessToken");
      const payload = {
        keyword: tcid,
        session: accessToken,
        status: "testcase-step",
      };
      PostData("search", payload, true).then((result) => {
        let responseJSON = result;
        this.setState({ test_case_step: responseJSON.result });
        /**
         * After Post event here after saving, add error handling / success modal
         */
      });
    };
    getDynamicDS = (ts_id) => {
      let accessToken = cookies.get("accessToken");
      const payload = {
        keyword: ts_id,
        session: accessToken,
        status: "dynamic-ds",
      };
      PostData("search", payload, true).then((result) => {
        let responseJSON = result;
        this.setState({
          dynamic_data: responseJSON.result,
          dynamicData_count: responseJSON.result.length,
        });
        console.log(responseJSON.result);

        /**
         * After Post event here after saving, add error handling / success modal
         */
      });
    };
    searchTestCaseId = () => {
      let accessToken = cookies.get("accessToken");
      const payload = {
        keyword: this.state.testcaseid,
        session: accessToken,
        status: "testcase",
      };
      PostData("search", payload, true).then((result) => {
        let responseJSON = result;

        this.setState({
          testcasedata: responseJSON.result[0],
          tc_id: responseJSON.result[0].tc_id,
          tce_id: responseJSON.result[0].tce_id,
        });

        this.getTestCaseStep(responseJSON.result[0].tc_id);
        /**
         * After Post event here after saving, add error handling / success modal
         */
      });
    };
    search = (isInit) => {
      //setLoader( true )
      this.setState({ loader: true });
      const payload = {
        keyword: this.state.keyword,
      };
      PostData("search-sc-dss", payload, false).then((result) => {
        let responseJSON = result;

        if (this.state.filterValue !== "" || this.state.filterAttr !== "") {
          this.setState({
            data: DynamicDataService.search(
              responseJSON.result,
              this.state.filterValue,
              this.state.filterAttr
            ),
          });
          // setData( DynamicDataService.search(responseJSON.result, filterValue, filterAttr) )
        } else {
          // setData(responseJSON.result)
          this.setState({ data: responseJSON.result });
        }

        if (isInit) {
          /**
           * Only set during initial api call
           */

          this.setState({ initialData: responseJSON.result });

          this.setState({
            uniqueValue: DynamicDataService.getUniqueValue(responseJSON.result),
          });
        }

        this.setState({ loader: false });
      });
    };
    addDynamicDataModal = () => {
      this.setState({ openDynamicModal: true });
    };
    changeDynamicDataAttr = (e) => {
      let value = e.target.value;
      let dyData = this.state.dynamic_data;
      let index = e.target.id - 1;

      dyData[index]["attr"] = value;
      // console.log()
      this.setState({ dynamic_data: dyData });
    };
    changeDynamicDataValue = (e) => {
      var type = e.target.name;
      var dyData = this.state.dynamic_data;
      var index = e.target.id;
      dyData[index][type] = e.target.value;

      this.setState({ dynamic_data: dyData });
    };
    getScenario = (id) => {
      GetData("get-sccode-sctitle/" + id, true).then((result) => {
        // setScenario(result.data);
        this.state({ scenario: result.data });
      });
    };
    keyPress = (e) => {
      if (e.keyCode === 13) {
        this.search(false);
      }
    };
    componentDidMount() {
      this.search(true);
      this.getDynamicDataAttr();
      // getScenario();
    }
    getDynamicDataAttr = () => {
      GetData("dynamic-data", true).then((result) => {
        let responseJSON = result.data;

        this.setState({ dynamic_data_attr: responseJSON.result });
      });
    };
    changeDynamicSCID = (e) => {
      this.setState({ to: e });
    };

    setActiveRow = (e) => {
      var key =
        e.target.attributes.getNamedItem("data-id") !== null
          ? e.target.attributes.getNamedItem("data-id").value
          : "";

      this.setState({ active: key });
    };

    searchKeyword = (event) => {
      if (event.target.name === "val") {
        this.setState({ filterValue: event.target.value });
      } else {
        this.setState({ keyword: event.target.value });
      }
    };

    loadModal = () => {
      this.setState({ openModal: true });
    };
    selectStatus = (e) => {
      this.setState({ from: e.target.name });
      this.setState({ openModal: true });

      this.getScenario(e.target.name);
    };
    updateStatus = () => {
      let payload = {
        from: this.state.from,
        to: this.state.to,
      };

      PostData("sc-clone-dds", payload, true).then((result) => {
        this.setState({ search: false, openModal: false });

        // getScenario();
      });
    };
    changeTestCaseStep = (e) => {
      this.state.test_case_step
        .filter((obj) => obj.ts_id == e.target.value)
        .map((item) => {
          this.setState({ selectedstepdesc: item.ts_desc, ts_id: item.ts_id });
          this.getDynamicDS(item.ts_id);
        });
    };
    addDynamicData = () => {
      var count = this.state.dynamicData_count;
      var dyData = this.state.dynamic_data;
      dyData.push({
        attr: "",
        value: "",
        remarks: "",
      });
      this.setState({ dynamicData_count: count + 1, dynamic_data: dyData });
    };
    savechangesDynamicData = () => {
      const payload = {
        dynamic_data: this.state.dynamic_data,
        ts_id: this.state.ts_id,
        tc_id: this.state.tc_id,
        tce_id: this.state.tce_id,
        dynamic_data_delete: this.state.dynamic_data_delete,
      };
      PostData("save-dynamic-ds", payload, true).then((result) => {
        this.setState({ openDynamicModal: false ,
           dynamicData_count: 1,
           test_case_step: [],
           dynamic_data: [DYNAMIC_DATA_COLS],
           dynamic_data_attr: [],
           dynamic_data_err: [],
          dynamic_data_delete: []
        });

      });
    };
    removeDynamicData = (i) => {
      var count = this.state.dynamicData_count;

      // var index = array.indexOf(i)
      var del = this.state.dynamic_data_delete;
      var dyData = this.state.dynamic_data.splice(i, 1);

      if (dyData[0]["id"] !== undefined) {
        del.push(dyData[0]["id"]);
      }

      this.setState({ dynamicData_count: count - 1, dynamic_data_delete: del });
    };
    closeConfirm = () => {
      this.setState({ openModal: false });
     
       this.setState({
         openDynamicModal: false,
         dynamicData_count: 1,
         test_case_step: [],
         dynamic_data: [DYNAMIC_DATA_COLS],
         dynamic_data_attr: [],
         dynamic_data_err: [],
         dynamic_data_delete: [],
         testcaseid:'',
         testcasedata:[],
        selectedstepdesc:'',
        stepdescription:''
          
       });

    };
    filter = (e) => {
      this.setState({ filterAttr: e.target.value });
    };
    filterBtn = () => {
      this.search(false);
    };
    render() {
      return (
        <Container fluid>
          <span
            className="spinner-holder absolute"
            style={{ position: "fixed", zIndex: "999" }}
          >
            <FadeLoader
              style={{ display: "block", margin: "0 auto", borderColor: "red" }}
              sizeUnit={"px"}
              size={10}
              color={"#ca5d41"}
              loading={this.state.loader}
            />
          </span>
          <CloningModal
            title="Confirm Status Change"
            optionsdata={this.state.scenario}
            close={this.closeConfirm}
            save={this.state.updateStatus}
            changeSCID={this.changeDynamicSCID}
            isOpen={this.state.openModal}
          />
          <AddDynamicDataModal
            title="Dynamic Data Entry"
            add={this.addDynamicData}
            remove={this.removeDynamicData}
            dynamic_data={this.state.dynamic_data}
            dynamic_data_attr={this.state.dynamic_data_attr}
            count={this.state.dynamicData_count}
            testcaseid={this.state.testcaseid}
            changeDynamicDataAttr={this.changeDynamicDataAttr}
            changeDynamicDataValue={this.changeDynamicDataValue}
            changeTestCaseStep={this.changeTestCaseStep}
            changeTestCaseID={this.changeTestCaseID}
            testcasedata={this.state.testcasedata}
            stepdata={this.state.test_case_step}
            selectedstep={this.state.selectedstepdesc}
            stepdescription={this.state.stepdescription}
            search={this.searchTestCaseId}
            searchkeypressTestCaseID={this.searchkeypressTestCaseID}
            close={this.closeConfirm}
            save={this.savechangesDynamicData}
            isOpen={this.state.openDynamicModal}
          />
          <Row className="top-15 separator-border">
            <Col xs={12} md={12}>
              <div className="col-lg-12 col-sm-12 top-10 mb-10 ">
                <PageTitle title="Cloning Dynamic Test Data" />
              </div>
            </Col>
          </Row>
          <div className="col-md-12">
            <Row className="top-30">
              <Col md={12}>
                <Card border="secondary" text="dark">
                  <Card.Body>
                    <Card.Title>Search</Card.Title>

                    <div
                      className="col-lg-5 left"
                      style={{ paddingRight: "5px" }}
                    >
                      <Form.Group
                        className="mb-3 relative"
                        controlId="formGroupName"
                      >
                        <Form.Label>
                          <i> Scenario/Test Case</i>
                        </Form.Label>

                        <Form.Control
                          type="text"
                          onChange={this.searchKeyword}
                          onKeyDown={this.keyPress}
                          name="keyword"
                        />
                        <span className="search-icon" onClick={this.search}>
                          <SearchOutlined />
                        </span>
                      </Form.Group>
                    </div>
                    <div
                      className="col-lg-2 left"
                      style={{ paddingRight: "5px" }}
                    >
                      <Form.Group
                        className="mb-3 relative"
                        controlId="formGroupName"
                      >
                        <Form.Label>
                          <i>Data Name</i>
                        </Form.Label>
                        {/* <Form.Control type="text"  onChange={searchKeyword} onKeyDown={keyPress} name='attr' vlaue={filterAttr}/> */}
                        <select
                          className="form-control"
                          onChange={this.filter}
                          value={this.state.filterAttr}
                        >
                          <option value=""></option>
                          {DynamicDataService.renderFilterAttrOptions(
                            this.state.uniqueValue
                          )}
                        </select>
                      </Form.Group>
                    </div>
                    <div
                      className="col-lg-2 left"
                      style={{ paddingRight: "5px" }}
                    >
                      <Form.Group
                        className="mb-3 relative"
                        controlId="formGroupName"
                      >
                        <Form.Label>
                          <i>Data Value</i>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          onChange={this.searchKeyword}
                          onKeyDown={this.keyPress}
                          vlaue={this.filterValue}
                          name="val"
                        />
                        <span className="search-icon" onClick={this.search}>
                          <SearchOutlined />
                        </span>
                      </Form.Group>
                    </div>
                    <div
                      className="col-lg-1 left"
                      style={{ paddingRight: "5px" }}
                    >
                      <Form.Group
                        className="mb-3 relative"
                        controlId="formGroupName"
                      >
                        <Form.Label>&nbsp;</Form.Label>
                        <Button
                          variant="success"
                          key={uniqid()}
                          onClick={this.filterBtn}
                          style={{ width: "100%" }}
                        >
                          Filter
                        </Button>
                      </Form.Group>
                    </div>
                    <div
                      className="col-lg-1 left"
                      style={{ paddingRight: "5px" }}
                    >
                      <Form.Group
                        className="mb-3 relative"
                        controlId="formGroupName"
                      >
                        <Form.Label>&nbsp;</Form.Label>
                        <Button
                          variant="primary"
                          key={uniqid()}
                          onClick={this.addDynamicDataModal}
                          style={{ width: "100%" }}
                        >
                          Add
                        </Button>
                      </Form.Group>
                    </div>
                    <div className="clear"></div>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={12} className="top-30">
                <div style={{ fontSize: "18px" }}>
                  <i>No. of result: ({this.state.data.length})</i>
                </div>
                <DynamicScenarioTable
                  dropdownselected={this.state.status}
                  data={this.state.data}
                  selectRow={this.setActiveRow}
                  showmodal={this.loadModal}
                  activeKey={this.state.active}
                  selectStatus={this.selectStatus}
                />
              </Col>
            </Row>
          </div>
        </Container>
      );
    }
  }
export default ScenarioCloning;
