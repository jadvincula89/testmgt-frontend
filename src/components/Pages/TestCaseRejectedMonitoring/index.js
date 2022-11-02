
import React, { useState,useEffect,useCallback,useRef} from 'react';
import Cookies from "universal-cookie";
import PageTitle from "../../General/PageTitle";
import ReviewRemarksModal from '../../General/Modals/ReviewRemarksModal';
import { SearchOutlined } from '@ant-design/icons';
import ReviewTable  from "../../General/TestCaseTracker/sections/ReviewTable";
import { PostData } from '../../../utils/api/PostData';
import { FadeLoader } from "react-spinners";
import BasicBtn from '../../General/Buttons/BasicBtn';
//import exportFromJSON from 'export-from-json';
import {Excel} from '../../../shared/Excel';
import {
    Form,
    Card,
    Col,
    Row,
    Container,
  } from "react-bootstrap";
import '../TestCaseTracker/testCase.css';
import { PASSED_STATUS, BLOCKED_STATUS,ASSIGNED_STATUS,REJECTED_STATUS, TS_STATUS_UNKNOWN,FAILED_STATUS,ABANDON_STATUS,IN_PROGRESS_STATUS,REVIEW_STATUS,FOR_REJECTION_STATUS,FOR_EXECUTION_STATUS } from '../../../shared/constants';
const cookies = new Cookies();

function TestCaseRejectedMonitoring() {
    const [data , setData] =  useState([]);
    const [keyword , setKeyword] =  useState("");
    const [active , setActive] =  useState("");
    	const [ isLoading, setLoading ] = useState(false);
    const [showReassignModal , setShowReassignModal] =  useState(false);
    const [isBlocked , setIsBlocked] =  useState(false);
    const [selectedId,SetTCID]=useState("");
    const [isPassed , setIsPassed] =  useState(false);
    const [isFailed, setisFailed] =  useState(false);
    const [status , setStatus] =  useState("");
    const [tracker,setTracker]=useState("");
    const [remarks , setRemarks] =  useState("");
    const [openModal,setModal]= useState(false);
    const [confirmChangeStatusMsg , setConfirmChangeStatusMsg] =  useState("");
    
    const accessToken = cookies.get('accessToken');
  const ExportToExcel = () => {
 var date = new Date().getTime();
			var fileName = 'Rejected_Test_Case_' + date;
            	var holderArray = [];
                data.map((data) =>{
               
               var datasets='';
                data.sc_test_data['data'].map((subdata)=>{
                     datasets=subdata['Dataset ID'];
                });

                
                holderArray.push({
					"Scenario ID": data.sc_code,
					"Scenario Title": data.tc_instanceid,
					"Test Case ID": data.tc_txtype,
					"Test Case Title": data.tc_title,
					"Virtual Date": data.biz_txn_date,
                    "HOBS Role":data.tc_hobsRole,
					"Assigned Tester": data.tc_assigned_tester,
					"Last Updated": data.te_lastUpdateDate,
					"Reason Code": data.te_reason_code,
					"Reason Desc": data.te_reason,
                    "Data Set ID": datasets,
				});
           
                });
			//exportFromJSON({ data:holderArray, fileName: fileName, exportType: 'xls' });
                  Excel(holderArray,fileName);

        }
    const search = () => {
        const payload = {
            "keyword" : keyword,
	        "session" : accessToken,
            "status": "rejected"
        }
        setLoading(true);
        PostData('search', payload, false).then((result) => {
            let responseJSON = result;
            setLoading(false);
            setData(responseJSON.result)
            /**
             * After Post event here after saving, add error handling / success modal
             */
        });
    }

    useEffect(() => {
       search();
     

 
    },[tracker]);

     const  changeRemarksValue = (e) => {
   
        setRemarks(e.target.value);
    };


    const setActiveRow = (e) => {
        var key = (active === e.target.attributes.getNamedItem('data-id').value) ? ''
        :( e.target.attributes.getNamedItem('data-id') !== null ) ? e.target.attributes.getNamedItem('data-id').value : '';
        setActive(key)
    }

 
    const keyPress =(e)=>{
        if(e.keyCode == 13){
         
            search();
        }
     }
    const searchKeyword = (e) =>{
        
        setKeyword(e.target.value)
    }
    const loadModal=()=>{
   
        setModal(true);
    }
    const selectStatus = (e)=>{
        var key = e.target.name;
        var tcId = e.target.id;
        var value = e.target.value;
        SetTCID(tcId);
        setActive(key)
      setTimeout(loadModal(),5000);
        if(value == ASSIGNED_STATUS){
            setisFailed(true)
            setStatus(ASSIGNED_STATUS)
            setConfirmChangeStatusMsg("Are you sure you want to change status to ASSIGNED?")
        } 
        if(value == REJECTED_STATUS){
            setIsBlocked(true)
            setStatus(REJECTED_STATUS)
            setConfirmChangeStatusMsg("Are you sure you want to change status to REJECTED?")
        } 
         if(value == FOR_EXECUTION_STATUS){
            setIsPassed(true)
            setStatus(FOR_EXECUTION_STATUS)
            setConfirmChangeStatusMsg("Are you sure you want to change status to READY FOR EXECUTION?")
        }
        if(value == ABANDON_STATUS){
            setIsPassed(true)
            setStatus(ABANDON_STATUS)
            setConfirmChangeStatusMsg("Are you sure you want to change status to ABANDON?")
        }
        if (value == BLOCKED_STATUS) {
          setIsPassed(true);
          setStatus(BLOCKED_STATUS);
          setConfirmChangeStatusMsg(
            "Are you sure you want to change status to BLOCKED?"
          );
        }
    
    }
    const updateStatus = (remark) =>{
        var activeKey = active;
        let tcId = data[activeKey]['tc_id'];
        let tceID= data[activeKey]['tce_id'];
        let testerID= data[activeKey]['tester_id'];
        let payload = {
            'tc_id' : tcId,
            'tester_id' : testerID,
            'tc_pretc_Id': data[activeKey]['tc_pretc_Id'],
            'tce_id':tceID,
            'status' : status,
            'old_status': FOR_REJECTION_STATUS,
            'remarks': remark
        }
        setTracker(Math.random());
        PostData('update-tc-review', payload, true).then((result) => {
            
            setModal(false)

                setIsBlocked(false)
                setIsPassed(false)
                 setActive("");
                search();
            
        })
    }
    const closeConfirm = () => {
        setIsBlocked(false)
        setIsPassed(false)
        setisFailed(false)
        setModal(false)
    }
   
    return(
        <Container fluid>
            <ReviewRemarksModal 
                title = "Confirm Status Change" 
                text = { confirmChangeStatusMsg }  
                close = { closeConfirm }
                save = { updateStatus }
                changeRemarksValue = { changeRemarksValue }
                isOpen = {  openModal}
            />
            <Row className="top-15 separator-border">
                <Col xs={12} md={12}>
                    <div className="col-12 top-10 mb-10 ">
                        <PageTitle title=" Test Case For Rejection"/>
                    </div>
                </Col>
            </Row>
            <div className='col-md-12'>
                <Row className="top-30">
                    <Col md={12}>
                        <Card border="secondary" text="dark">
                        <Card.Body>
                            <Card.Title>Search</Card.Title>
                        
                      
                                <div className='col-lg-7 left'>
                                    <Form.Group className="mb-3 relative" controlId="formGroupName">
                                    <Form.Label><i> Scenario/Test Case</i></Form.Label>
                                    <Form.Control type="text" onChange={ searchKeyword } onKeyDown={keyPress}/>
                                        <span className='search-icon' onClick={search}><SearchOutlined /></span>
                                    </Form.Group>
                                </div>
                                	<div className=" col-sm-2 right mt-3">
									<BasicBtn title="Export to Excel" onClick={() => ExportToExcel()}  />
								</div>
                                 
                          
                        </Card.Body>
                        </Card>
                    </Col>
                   
                    <Col md={12} className='top-30'>
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
                        <ReviewTable 
                            dropdownselected={status}
                            selectedID={selectedId}
                            data={ data } 
                            key={1}
                            selectRow={ setActiveRow } 
                            activeKey = { active }
                            selectStatus = { selectStatus }
                            option={'rejected'}
                        />
                    </Col>
                </Row>
            </div>
        </Container>
    )
}
export default TestCaseRejectedMonitoring;
