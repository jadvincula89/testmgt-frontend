import React, { useState, useEffect, useRef } from 'react';
import Cookies from 'universal-cookie';
import PageTitle from '../../General/PageTitle';
 
import { GetData } from '../../../utils/api/GetData';
 import DatePicker from "react-datepicker";
 import "react-datepicker/dist/react-datepicker.css";
import '../Dashboard/testCase.css';
import { Form, Card, Col, Row, Container } from 'react-bootstrap';
import TableServices from "../Settings/TableServices";
import {Excel} from '../../../shared/Excel';
import ReactPaginate from 'react-paginate';
//import ChartDataLabels from "chartjs-plugin-datalabels";
import BasicBtn from '../../General/Buttons/BasicBtn';
import { FadeLoader } from "react-spinners";

const cookies = new Cookies();
 

const accessToken = cookies.get('accessToken');

function TesterPlanReport() {
	const [ testers, setTesters]=useState([]);
	 
    const [ currentItems, setCurrentItems ] = useState(null);
    const [ pageCount, setPageCount ] = useState(0);
	const [ itemOffset, setItemOffset ] = useState(0);
	const [customerType,setCustomerType]=useState('Individual');
	const [ itemsPerPage, setitemsPerPage ] = useState(10);
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const [ loading, setLoading ] = useState(false);
	const removeDuplicates = (arr) => {
		return arr.filter((item, index) => arr.indexOf(item) === index);
	};
	const changePageSize = (e) => {
		setitemsPerPage(e.target.value);
	 	setItemOffset(0);
		 loadAPI(0,customerType);
	};
	  
	const changeCustomerType = (e) => {
		setCustomerType(e.target.value);
	    loadAPI(itemOffset,e.target.value);
	};
	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % testers.length;
		console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
		setItemOffset(newOffset);
	loadAPI(event.selected);
	};
      const ExportToExcel =async (id)=> {
      	var params ="/" + getFormattedDate(startDate) + "/" + getFormattedDate(endDate);
         var datas=await GetData('graphreport/'+id+""+params, true).then((response) => {
         var date=new Date().getTime();
         var  fileName = 'TC_per_Tester_Report'+date; 
             Excel(response.data.result,fileName);
        })   
    }
	  const getFormattedDate=(date)=> {
  var year = date.getFullYear();

  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : '0' + month;

  var day = date.getDate().toString();
  day = day.length > 1 ? day : '0' + day;
  
  return year + "-" + month + "-" + day;
}
	const onChange = (dates) => {
		console.log(dates);
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
	const loadAPI = (offst = 0) => {
		  setLoading(true);
	var params =
    "/" +
    getFormattedDate(startDate) +
    "/" +
    getFormattedDate(endDate);
	   
         GetData("graphreport/4"+params, true).then((response) => {
           setTesters(response.data.result);
           setLoading(false);
         });   
	};

	useEffect(() => {
		loadAPI(0);
	}, []);

	return (
    <Container fluid>
      <Row className="top-30 separator-border">
        <Col xs={12} md={12}>
          <div className="col-lg-12 col-sm-12 top-10 mb-10 ">
            <PageTitle title="TC per Tester Report " />
          </div>
        </Col>
      </Row>
      <div className="col-md-12 container-div top-30 separator-border">
        <div className="col-md-12 container-div">
          <Row className="top-30">
            <div className="clear"></div>
            <div className="clear"></div>

            <Card>
              <Card.Body>
                <div className="col-md-12">
                  <Row className="top-30 mb-2">
                    <div className="col-lg-1 mt-3">
                      <button
                        class="btn-primary btn-xs text-color-white"
                        onClick={() => ExportToExcel(4)}
                      >
                        Export to Excel
                      </button>
                    </div>
                    <div className=" col-lg-3  mt-3">
                      <h3 className="left" style={{ color: "#000" }}>
                        Test Case per Tester Report
                      </h3>
                    </div>

                    <div className=" col-lg-2  mt-3">
                      <Form.Group className="mb-2  relative">
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          selectsStart
                          startDate={startDate}
                          endDate={endDate}
                          name="startDate"
                          dateFormat="yyyy-MM-dd"
                          placeholderText="From"
                          className="form-control"
                          maxDate={endDate}
                        />
                      </Form.Group>
                    </div>
                    <div className=" col-lg-2  mt-3">
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
                          placeholderText="To"
                          className="form-control"
                        />
                      </Form.Group>
                    </div>
                    <div className=" col-sm-3  mt-3">
                      <button
                        class="btn-success btn-xs text-color-white"
                        onClick={() => loadAPI()}
                      >
                        Filter By Date
                      </button>{" "}
                      &nbsp;&nbsp;
                    </div>
                  </Row>
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
                    loading={loading}
                  />
                </span>
                {testers.length >= 0 && (
                  <TableServices rows={testers} tablename="testers" />
                )}
              </Card.Body>
            </Card>
          </Row>
        </div>
      </div>
    </Container>
  );
}
export default TesterPlanReport;
