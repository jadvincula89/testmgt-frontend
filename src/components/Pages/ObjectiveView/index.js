
import React, { useState,useEffect } from 'react';
import Cookies from "universal-cookie";
import PageTitle from "../../General/PageTitle";
import ReviewRemarksModal from '../../General/Modals/ReviewRemarksModal';
import { SearchOutlined } from '@ant-design/icons';
import ObjectiveViewTable from "../../General/TestCaseTracker/sections/ObjectiveViewTable";
import { PostData } from '../../../utils/api/PostData';
import BasicBtn from "../../General/Buttons/BasicBtn";
import { ToastContainer, toast } from 'react-toastify';
import exportFromJSON from 'export-from-json';
import {Excel} from '../../../shared/Excel';
import 'react-toastify/dist/ReactToastify.css';
import {
    Form,
    Card,
    Col,
    Row,
    Container,
  } from "react-bootstrap";
import '../TestCaseTracker/testCase.css';
import { ASSIGNED_STATUS,BLOCKED_STATUS, TS_STATUS_UNKNOWN } from '../../../shared/constants';
const cookies = new Cookies();

function ObjectiveView() {
    const [data , setData] =  useState([]);
    const [keyword , setKeyword] =  useState("");
    const [active , setActive] =  useState("");
    const [showReassignModal , setShowReassignModal] =  useState(false);
    const [selectedId,SetTCID]=useState("");
    const [isBlocked , setIsBlocked] =  useState(false);
    const [isPassed , setIsPassed] =  useState(false);
    const [isFailed, setisFailed] =  useState(false);
    const [status , setStatus] =  useState("");
    const [remarks , setRemarks] =  useState("");
    const [openModal,setModal]= useState(false);
    const [confirmChangeStatusMsg , setConfirmChangeStatusMsg] =  useState("");
    
    const accessToken = cookies.get('accessToken');

    const ExportToExcel =()=> {
        var date=new Date().getTime();
        var jsondata=data;
        for (const key in jsondata) {
            delete jsondata[key].tso_id;
          }
      
       var fileName = 'objectives_'+date ;  
       var exportType = 'excel';  
       // exportFromJSON({ data: jsondata, fileName: fileName, exportType:'xls'})  
             Excel(jsondata,fileName);

    }
    const search = () => {
        const payload = {
            "keyword" : keyword,
	        "session" : accessToken,
            "status": "search_objectives"
        }
        PostData('search', payload, true).then((result) => {
            let responseJSON = result;
            
            setData(responseJSON.result)
            /**
             * After Post event here after saving, add error handling / success modal
             */
        })
    }
    const removeObject=(id)=>{
        const payload={"tso_id":id}
        PostData('remove_sc_objective', payload, true).then((result) => {
            notify(result.message);
            search();
        })
    }
    const keyPress =(e)=>{
        if(e.keyCode == 13){
         
            search();
        }
     }
    useEffect(() => {
        search();
    }, []);
    const notify = (msg) => toast.success(msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    const  changeRemarksValue = (e) => {
   
        setRemarks(e.target.value);
    }

    const setActiveRow = (e) => {
        var key = ( e.target.attributes.getNamedItem('data-id') !== null ) ? e.target.attributes.getNamedItem('data-id').value : '';
        setActive(key)
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
      setTimeout(loadModal(),10000);
        if(value == BLOCKED_STATUS){
          
            setStatus(BLOCKED_STATUS)
            setConfirmChangeStatusMsg("Are you sure you want to change status to BLOCKED?")
        } 
        else
        setStatus("")
     
    }
    const updateStatus = () =>{
        var activeKey = active;
        let tcId = data[activeKey]['tc_id'];
        let oldstatus=data[activeKey]['tc_status'];
        let payload = {
            'tc_id' : tcId,
            'status' : status,
            'old_status': oldstatus,
            'remarks': remarks
        }
       PostData('update-tc-review', payload, true).then((result) => {
            
            setModal(false)
                setIsBlocked(false)
                setIsPassed(false)
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
            <Row className="top-30 separator-border">
                <Col xs={12} md={12}>

                    <div className="col-lg-12 col-sm-12 top-10 mb-10 ">


                        <PageTitle title="Objectives View"/>
                    </div>
                </Col>
            </Row>
            <div className='col-md-12'>
                <Row className="top-30">
                    <Col md={12}>
                        <Card border="secondary" text="dark">
                        <Card.Body>
                            <Card.Title>Search</Card.Title>
                        
                          
                                <div className='col-lg-4 left'>
                                    <Form.Group className="mb-3 relative" controlId="formGroupName">
                                    <Form.Label><i> Scenario/Test Case</i></Form.Label>
                                    <Form.Control type="text" onChange={ searchKeyword } placeholder="Search by Scenario Title,Scenario Code or Objectives" onKeyDown={keyPress}/>
                                        <span className='search-icon' onClick={search}><SearchOutlined /></span>
                                    </Form.Group>
                                </div>
                                <div className=" col-lg-2 right mt-3">
                                   <BasicBtn title="Export to Excel"  onClick={() =>ExportToExcel()} />
                               </div>
                             
                        </Card.Body>
                        </Card>
                    </Col>
                    <Col md={12} className='top-30'>
                        <ObjectiveViewTable 
                            dropdownselected={status}
                            selectedID={selectedId}
                            data={ data } 
                            remove={removeObject}
                            selectRow={ setActiveRow } 
                            activeKey = { active }
                            selectStatus = { selectStatus }
                        />
                    </Col>
                </Row>
            </div>
        </Container>
    )
}
export default ObjectiveView;