
import React, { useState,useEffect } from 'react';
import Cookies from "universal-cookie";
import PageTitle from "../../General/PageTitle";
import CloningModal from '../../General/Modals/CloningModal';
import { SearchOutlined } from '@ant-design/icons';
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
const cookies = new Cookies();
const uniqid = require('uniqid');

function ScenarioCloning() {
    const [initialData , setInitialData] =  useState([]);
    const [data , setData] =  useState([]);
    const [scenario,setScenario]=useState([]);
    const [keyword , setKeyword] =  useState("");
    const [active , setActive] =  useState("");
    const [showReassignModal , setShowReassignModal] =  useState(false);
    const [isBlocked , setIsBlocked] =  useState(false);
    const [isPassed , setIsPassed] =  useState(false);
    const [isFailed, setisFailed] =  useState(false);
    const [status , setStatus] =  useState("");
    const [to , setDynamicSCID] =  useState(0);
    const [from , setSelectedSCID] =  useState(0);
    const [openModal,setModal]= useState(false);
    const [confirmChangeStatusMsg , setConfirmChangeStatusMsg] =  useState("");
    
    const accessToken = cookies.get('accessToken');

    const [ uniqueValue,setUniqueValue ] = useState( [] );
    const [ uniqueAttr ] = useState( DynamicDataService.getUniqueAttr([]) );

    const [ filterValue, setFilterValue ] = useState('');
    const [ filterAttr, setFilterAttr ] = useState('');
    const [ loader, setLoader ] = useState( false );

    const search = (isInit) => {
        setLoader( true )
        const payload = {
            "keyword" : keyword
        }
        PostData('search-sc-dss', payload, false).then((result) => {
           
            let responseJSON = result;
           
            if(filterValue !== '' || filterAttr !== ''){
                
                setData( DynamicDataService.search(responseJSON.result, filterValue, filterAttr) )
            }else{
                setData(responseJSON.result)
            }
            

            
            if(isInit){
                /**
                 * Only set during initial api call
                 */
                setInitialData( responseJSON.result )
                setUniqueValue( DynamicDataService.getUniqueValue(responseJSON.result) )
            }
            setLoader( false )
        })
    }
    const getScenario=(id)=>{
        GetData('get-sccode-sctitle/'+id,true).then((result) => {
     
            setScenario(result.data);
        });
 
    }
    const keyPress =(e)=>{
        if(e.keyCode == 13){
         
            search(false);
        }
     }
    useEffect(() => {
        search(true);
        // getScenario();
    }, []);

    const  changeDynamicSCID = (e) => {

        setDynamicSCID(e);
    }

    const setActiveRow = (e) => {
        var key = ( e.target.attributes.getNamedItem('data-id') !== null ) ? e.target.attributes.getNamedItem('data-id').value : '';
        setActive(key)
    }

  


    const searchKeyword = event => {
        if(event.target.name === 'val'){
            setFilterValue(event.target.value);
        }else{
            setKeyword(event.target.value);
        }
        
     };


    const loadModal=()=>{
   
        setModal(true);
    }
    const selectStatus = (e)=>{
         setSelectedSCID(e.target.name)
         setModal(true);

         getScenario(e.target.name);
    }
    const updateStatus = () =>{
        var activeKey = active;
      
        let payload = {
            'from' : from,
            'to' : to,
        }
    
     PostData('sc-clone-dds', payload, true).then((result) => {
            
            setModal(false)
                search(false);
                // getScenario();
            
        }) 
    }
    const closeConfirm = () => {
    
        setModal(false)
    }
    const filter = (e) => {
       
        setFilterAttr( e.target.value )
    }
    const filterBtn = () => {
        search(false)
    }
    
    return(
        <Container fluid>
            <span className="spinner-holder absolute" style={{position:'fixed',zIndex:'999'}}>
                <FadeLoader
                    style={{display: 'block', margin: '0 auto', borderColor: 'red'}}
                    sizeUnit={"px"}
                    size={10}
                    color={'#ca5d41'}
                    loading={loader}
                />
            </span>
            <CloningModal 
                title = "Confirm Status Change" 
             
                optionsdata={scenario}
                close = { closeConfirm }
                save = { updateStatus }
                changeSCID={changeDynamicSCID}
             
                isOpen = {  openModal}
            /> 
            <Row className="top-15 separator-border">
                <Col xs={12} md={12}>
 
                    <div className="col-lg-12 col-sm-12 top-10 mb-10 ">
 
                        <PageTitle title="Cloning Dynamic Test Data"/>
                    </div>
                </Col>
            </Row>
            <div className='col-md-12'>
                <Row className="top-30">
                    <Col md={12}>
                        <Card border="secondary" text="dark">
                        <Card.Body>
                            <Card.Title>Search</Card.Title>
                        
                         
                                <div className='col-lg-6 left' style={{paddingRight:'5px'}}>
                                    <Form.Group className="mb-3 relative" controlId="formGroupName">
                                        <Form.Label><i> Scenario/Test Case</i></Form.Label>
                                
                                        <Form.Control type="text" onChange={searchKeyword} onKeyDown={keyPress} name='keyword'/>
                                        <span className='search-icon' onClick={search}><SearchOutlined /></span>
                                    </Form.Group>
                                </div>
                                <div className='col-lg-2 left' style={{paddingRight:'5px'}}>
                                    <Form.Group className="mb-3 relative" controlId="formGroupName">
                                        <Form.Label><i>Data Name</i></Form.Label>
                                        {/* <Form.Control type="text"  onChange={searchKeyword} onKeyDown={keyPress} name='attr' vlaue={filterAttr}/> */}
                                        <select className='form-control' onChange={ filter } value={ filterAttr }>
                                            <option value=''></option>
                                            { DynamicDataService.renderFilterAttrOptions(uniqueValue) }
                                        </select>
                                    </Form.Group>
                                    
                                </div>    
                                <div className='col-lg-2 left' style={{paddingRight:'5px'}}>
                                    <Form.Group className="mb-3 relative" controlId="formGroupName">
                                        <Form.Label><i>Data Value</i></Form.Label>
                                        <Form.Control type="text"  onChange={searchKeyword} onKeyDown={keyPress} vlaue={filterValue}  name='val'/>
                                        <span className='search-icon' onClick={search}><SearchOutlined /></span>
                                    </Form.Group>
                                </div>
                                <div className='col-lg-2 right'>
                                    <Form.Group className="mb-3 relative" controlId="formGroupName">
                                        <Form.Label>&nbsp;</Form.Label>
                                        <Button variant="success" key={ uniqid() } onClick={ filterBtn } style={{width:'100%'}}> 
                                            Filter
                                        </Button>
                                        </Form.Group>

                                </div>
                                <div className='clear'></div>
                         
                        </Card.Body>
                        </Card>
                    </Col>
                    <Col md={12} className='top-30'>
                        <div style={{fontSize: '18px'}}><i>No. of result: ({ data.length })</i></div>
                        <DynamicScenarioTable 
                            dropdownselected={status}
                            data={ data } 
                            selectRow={ setActiveRow } 
                            showmodal={loadModal}
                            activeKey = { active }
                            selectStatus = { selectStatus }
                        />
                    </Col>
                </Row>
            </div>
        </Container>
    )
}
export default ScenarioCloning;
