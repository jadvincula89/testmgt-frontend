import React, { useState, useEffect, useRef } from 'react';
import Cookies from 'universal-cookie';
import PageTitle from '../../General/PageTitle';
import ReviewRemarksModal from '../../General/Modals/ReviewRemarksModal';
import { SearchOutlined } from '@ant-design/icons';
import TrackerTable from '../../General/TestCaseTracker/sections/TrackerTable';
import { FadeLoader } from 'react-spinners';
import ReviewTableAdmin from '../../General/TestCaseTracker/sections/ReviewTableAdmin';
import { PostData } from '../../../utils/api/PostData';
import ReactPaginate from 'react-paginate';
import exportFromJSON from 'export-from-json';
import {Excel} from '../../../shared/Excel';
import BasicBtn from '../../General/Buttons/BasicBtn';
import { Form, Card, Col, Row, Container } from 'react-bootstrap';
import '../AdminTestCaseTracker/testCase.css';
import {
	ASSIGNED_STATUS,
	ABANDON_STATUS,
	TS_STATUS_UNKNOWN,
	FOR_EXECUTION_STATUS,
	IN_PROGRESS_STATUS,
	COMPLETED_STATUS,
	FAILED_STATUS,
	FOR_REJECTION_STATUS,
	BLOCKED_STATUS,
	PASSED_STATUS,
	REJECTED_STATUS,
	REVIEW_STATUS
} from '../../../shared/constants';
const cookies = new Cookies();

function AdminTestCaseTracker() {  
	const [ data, setData ] = useState([]);
	const [ stepdata, setStepData ] = useState([]);
	const [ keyword, setKeyword ] = useState('');
	const [ active, setActive ] = useState('');
	const [ rows, setRows ] = useState(0);
	const [ showReassignModal, setShowReassignModal ] = useState(false);
	const [ selectedId, SetTCID ] = useState('');
	const [ currentItems, setCurrentItems ] = useState(null);
	const [ itemsPerPage, setitemsPerPage ] = useState(10);
	const [ pageCount, setPageCount ] = useState(0);
	const [ itemOffset, setItemOffset ] = useState(0);
	const [ isBlocked, setIsBlocked ] = useState(false);
	const [ isPassed, setIsPassed ] = useState(false);
	const [ isFailed, setisFailed ] = useState(false);
	const [ status, setStatus ] = useState('');
	const [ isLoading, setLoading ] = useState(false);
	const [ remarks, setRemarks ] = useState('');
	const [ openModal, setModal ] = useState(false);
	const [ confirmChangeStatusMsg, setConfirmChangeStatusMsg ] = useState('');

	const accessToken = cookies.get('accessToken');
	var endOffset = 10;
	const searchButton = () => {
		search(itemOffset);
	};
	const search = (offst = 0) => {
		const payload = {
			keyword: keyword,
			session: accessToken,
			status: 'all',
			status_type: status,
			offset: offst,
			limit: itemsPerPage
		};
SetTCID('');
		setLoading(true);
	setStepData([]);
		setActive(''); 
		setData([]);
		PostData('search', payload, true).then((result) => {
			let responseJSON = result;
			setLoading(false);
			setData(responseJSON.result.result);

			console.log(`Loading items from ${itemOffset} to ${endOffset}`);
			endOffset = itemOffset + itemsPerPage;
			console.log(`Loading items from ${itemOffset} to ${endOffset}`);
			setCurrentItems(data.slice(itemOffset, endOffset));

			setPageCount(Math.ceil(responseJSON.result.count.totalrows / itemsPerPage));
			setRows(responseJSON.result.count.totalrows);
		});
	};
	const keyPress = (e) => {
		if (e.keyCode == 13) {
			search();
		}
	};
    const jsontocsv= (arraydata)=>{
		var date = new Date().getTime();
		console.log('converting...');
			var fileName = 'test_case_' + date;
			var exportType = 'excel';
         
			// exportFromJSON({ data: arraydata, fileName: fileName, exportType:'xls'})
			       Excel(arraydata,fileName);
	}
	const ExportToExcel = async() => {
		
		var jsondata = data;
		const payload = {
			keyword: keyword,
			session: accessToken,
			status: 'download',
			status_type: status
		};

		setLoading(true);
		 var newdata = [];
	 newdata= await PostData('search', payload, true).then((result) => {
			let responseJSON = result;
			setLoading(false);
	    var holderArray=[];
			 responseJSON.result.result.map((data) =>{
                var i=1;

	holderArray.push({
					hs_customerType: data.hs_customerType,
					"Scenario ID": data["Scenario ID"],
					sc_title: data.sc_title,
					"Scenario Status": data["Scenario Status"],
					"TC Secquence": data["TC Secquence"],
					"Test Case": data["Test Case"],
					"TC Transaction Name": data["TC Transaction Name"],
					"Assigned Tester": data["Assigned Tester"],
					"Status": data["Status"],
					"Pre-Req TC":data["Pre-Req TC"],
    				"Pre-Req Tester":data["Pre-Req Tester"],
    				"Pre-Req status":data["Pre-Req status"],
    				"tc_hobsrole":data["tc_hobsrole"],
    				"Physical Day":data["Physical Day"],
    				"Virtual Day":data["Virtual Day"],
    				"Assigned Date":data["Assigned Date"],
    				"Execution Date":data["Execution Date"],
   					"r_reason":data["r_reason"],
   					"te_reason":data["te_reason"],
   					"ABT Remarks":data["ABT Remarks"],
    			    "Dataset ID":data["Dataset ID"],
   					"Clone Dataset ID":data["Clone Dataset ID"],
					"remarks":data["remarks"],
					"StepNum":"",
                    "StepTitle":"",
                    "ExpectedResult":"",
                    "POTLink":"",
                    "ActualResult":"",
                    "Step_Status":"",
				});
              data.steps.map((subdata)=>{
                if(i===1){
					holderArray.pop();
				}
                
	holderArray.push({
					hs_customerType: data.hs_customerType,
					"Scenario ID": data["Scenario ID"],
					sc_title: data.sc_title,
					"Scenario Status": data["Scenario Status"],
					"TC Secquence": data["TC Secquence"],
					"Test Case": data["Test Case"],
					"TC Transaction Name": data["TC Transaction Name"],
					"Assigned Tester": data["Assigned Tester"],
					"Status": data["Status"],
					"Pre-Req TC":data["Pre-Req TC"],
    				"Pre-Req Tester":data["Pre-Req Tester"],
    				"Pre-Req status":data["Pre-Req status"],
    				"tc_hobsrole":data["tc_hobsrole"],
    				"Physical Day":data["Physical Day"],
    				"Virtual Day":data["Virtual Day"],
    				"Assigned Date":data["Assigned Date"],
    				"Execution Date":data["Execution Date"],
   					"r_reason":data["r_reason"],
   					"te_reason":data["te_reason"],
   					"ABT Remarks":data["ABT Remarks"],
    			    "Dataset ID":data["Dataset ID"],
   					"Clone Dataset ID":data["Clone Dataset ID"],
					"remarks":data["remarks"],
                    "StepNum":subdata.ts_stepNum,
                    "StepTitle":subdata.ts_desc,
                    "ExpectedResult":subdata.ts_expectedResult,
                    "POTLink":subdata.tse_pot,
                    "ActualResult":subdata.actualResult,
                    "Step_Status":subdata.tse_status
				})
            })
                 
            }
			
			);
		 return holderArray;
		   
		});
     jsontocsv(newdata);
	};

	useEffect(() => {
		search();
	}, []);

	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % data.length;
		console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
		setItemOffset(newOffset);
		search(event.selected);
	};
	const changeRemarksValue = (e) => {
		setRemarks(e.target.value);
	};

	const setActiveRow = (e) => {
		
		var key =
			(active === e.target.attributes.getNamedItem('data-id').value) ? ''
			: e.target.attributes.getNamedItem('data-id') !== null
				? e.target.attributes.getNamedItem('data-id').value
				: '';
		setActive(key);
		
		let tcId = data[key]['tc_id'];
		let payload = {
			tc_id: tcId,
			tce_id: data[key]['tce_id'],
			sc_code: data[key]['Scenario ID'],
			planned_date: data[key]['Physical Day'],
			biz_txn_date: data[key]['Physical Day']
		};
	 
		PostData('getstepdata', payload, true).then((response) => {
			setStepData(response.result);
		});
	};

	const changeFilter = (e) => {
		setStatus(e);
	};
	const changePageSize = (e) => {
		setitemsPerPage(e.target.value);
	};
	const searchKeyword = (e) => {
		setKeyword(e.target.value);
	};
	const loadModal = () => {
		setModal(true);
	};
	const selectStatus = (e) => {
		var key = e.target.name;
		var tcId = e.target.id;
		var value = e.target.value;
		SetTCID(tcId);
		setActive(key);
		setTimeout(loadModal(), 10000);
		if (value == BLOCKED_STATUS) {
			setStatus(BLOCKED_STATUS);
			setConfirmChangeStatusMsg('Are you sure you want to change status to BLOCKED?');
		} else setStatus('');
	};
	const updateStatus = () => {
		var activeKey = active;
		let tcId = data[activeKey]['tc_id'];
		let oldstatus = data[activeKey]['tc_status'];
		let payload = {
			tc_id: tcId,
			tce_id: data[activeKey]['tce_id'],
			status: status,
			old_status: oldstatus,
			remarks: remarks
		};
		PostData('update-tc-review', payload, true).then((result) => {
			setModal(false);
			setIsBlocked(false);
			setIsPassed(false);
			search();
		});
	};
	const closeConfirm = () => {
		setIsBlocked(false);
		setIsPassed(false);
		setisFailed(false);
		setModal(false);
	};
	
	return (
		<Container fluid>
			<ReviewRemarksModal
				title="Confirm Status Change"
				text={confirmChangeStatusMsg}
				close={closeConfirm}
				save={updateStatus}
				changeRemarksValue={changeRemarksValue}
				isOpen={openModal}
			/>
			<Row className="top-30 separator-border">
				<Col xs={12} md={12}>
					<div className="col-lg-12 col-sm-12 top-10 mb-10 ">
						<PageTitle title="Admin Test Case/Scenario Tracker" />
					</div>
				</Col>
			</Row>
			<div className="col-md-12">
				<Row className="top-30">
					<Col md={12}>
						<Card border="secondary" text="dark">
							<Card.Body>
								<Card.Title>Search</Card.Title>
								<div className="col-sm-1 left mt-1">
									<div>
										<Form.Group className="mb-1 relative">
											<Form.Label>
												<i>Page Size</i>
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
								</div>

								<div className="col-sm-6 left  m-1 mt-1">
									<Form.Group className="mb-1 relative" controlId="formGroupName">
										<Form.Label>
											<i> Scenario/Test Case</i>
										</Form.Label>
										<Form.Control
											type="text"
											onChange={searchKeyword}
											placeholder="Search by Scenario Title,Test Case Title,Scenario Code or Instance ID"
											onKeyDown={keyPress}
										/>
										<span className="search-icon" onClick={searchButton}>
											<SearchOutlined />
										</span>
									</Form.Group>
								</div>
								<div className="col-sm-2 left mt-1">
									<div>
										<Form.Group className="mb-1 relative">
											<Form.Label>
												<i>Filter by Status</i>
											</Form.Label>
											<Form.Select name="class" onChange={(e) => changeFilter(e.target.value)}>
												<option value="0" name="changefilter">
													--Select Class--
												</option>
												<option value={ASSIGNED_STATUS}>Assigned</option>
												<option value={ABANDON_STATUS}>Abandoned</option>
												<option value={FOR_EXECUTION_STATUS}>Ready For Execution</option>
												<option value={IN_PROGRESS_STATUS}>In Progress</option>
												<option value={COMPLETED_STATUS}>Completed</option>
												<option value={FAILED_STATUS}>Failed</option>
												<option value={FOR_REJECTION_STATUS}>For Rejection</option>
												<option value={BLOCKED_STATUS}>Blocked</option>
												<option value={PASSED_STATUS}>Passed</option>
												<option value={REJECTED_STATUS}>Rejected</option>
												<option value={REVIEW_STATUS}>Review</option>
												
											</Form.Select>
										</Form.Group>
									</div>
								</div>

								<div className=" col-sm-2 right mt-3">
									<BasicBtn title="Export to Excel" onClick={() => ExportToExcel()} />
								</div>
							</Card.Body>
						</Card>
					</Col>
					<Col md={12} className="top-30">
						<span className="spinner-holder absolute" style={{ position: 'fixed', zIndex: '999' }}>
							<FadeLoader
								style={{
									display: 'block',
									margin: '0 auto',
									borderColor: 'red'
								}}
								sizeUnit={'px'}
								size={10}
								color={'#ca5d41'}
								loading={isLoading}
							/>
						</span>
						<ReviewTableAdmin
							dropdownselected={status}
							selectedID={selectedId}
							data={data}
							stepdata={stepdata!==undefined>0 && stepdata}
							key={1}
							selectRow={setActiveRow}
							activeKey={active}
							selectStatus={selectStatus}
							option={'admin'}
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
					</Col>
				</Row>
			</div>
		</Container>
	);
}
export default AdminTestCaseTracker;
