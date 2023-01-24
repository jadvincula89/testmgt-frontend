import React, { useState, useEffect } from "react";
import { PostData } from '../../../utils/api/PostData';
import { GetData } from '../../../utils/api/GetData';
import {
    Form,
    Card,
    Col,
    Row,
    Container,
  } from "react-bootstrap";
  import { FadeLoader } from 'react-spinners';
import PageTitle from "../../General/PageTitle";
import { SearchOutlined } from '@ant-design/icons';
import BasicBtn from '../../General/Buttons/BasicBtn';
import ScDetails from './ScDetails';
import SCList from './SCList';
import ScenarioReplicationModal from "../../General/Modals/ScenarioReplicationModal";
import SuccessModal from "../../General/Modals/SuccessModal";
import ConfirmModal from '../../General/Modals/ConfirmModal';
import SelectDataSetModal from '../../General/Modals/SelectDataSetModal';
import DateFormatService from '../../../services/DateFormatService';

function ScenarioReplication() {
    const [ keyword, setKeyword ] = useState('')
    const [ loader, setLoader ] = useState(false)
    const [ data, setData ] = useState(false)
    const [ selectedItem, setSelectedItem ] = useState([])
    const [ detailModal, setDetailModal ] = useState(false)
    const [ details, setDetails ] = useState([])
    const [ phyDay, setPhyDay ] = useState('')
    const [ virDay, setVirDay ] = useState('')
    const [ testers, setTesters ] = useState([])
    const [ selectedTester, setSelectedTester ] = useState('')
    const [ remarks, setRemarks ] = useState('')
    const [ preq, setPreq ] = useState('')
    const [ activeTC, setActiveTC ] = useState('')
    const [ removeItemModal,setRemoveItemModal ] = useState(false)
    const [ modalErrorMsg,setModalErrorMsg ] = useState('')
    const [ successModal,setSuccessModal ] = useState(false)
    const [ parallel,setParallel ] = useState(false)
    const [ tcDuplicated,setTcDuplicated ] = useState([])
    const [ preqDuplicated,setPreqDuplicated ] = useState([])
    const [ remarksErr,setRemarksErr ] = useState('')
    const [ showTestData, setShowTestData ] = useState(false);
    const [ testData, setTestData ] = useState(false);
    const [ selectedDataset, setSelectedDataset ] = useState('');
    const [ activeTcCode, setActiveTcCode ] = useState('');
    useEffect(() => {
        callSearch()
        getTester()
    }, []);

    const getTester = () => {
        GetData("get-testers", true).then((result) => {
            setTesters(result.data)
        })
    }

    const callSearch = () => {
        setLoader(true)
        const payload = { 'keyword' : keyword }
        PostData('search-scenario-reexecution', payload, true).then((result) => {
            setData(result.result)
            setLoader(false)
            if(result.result.length >= 1){
                PostData('search-scenario-reexecution_dataset', {'keyword' : keyword}, true).then((res) => {
                    setTestData(res.result)
                })
            }
        })
    }
    const search = () => {
        setSelectedItem([])
        callSearch()
    }

    const ConfirmDuplicate = ()=>{
        setShowTestData(true)
    }
    const duplicate = ()=>{
        if(details.length >= 1){
            let item = data[0];
            const payload = {
                hs_id : item.hs_id,
                sc_code : item.sc_code,
                selectedTc : details,
                parallel : parallel,
                dataset : selectedDataset
            }

            PostData('scenario-reexecution', payload, true).then((result) => {
                setTcDuplicated(result.result)
                setShowTestData(false)
                setSuccessModal(true)
                
                // var res = [];

                // result.result.map((tc, i) => {
                //     res.push(tc.preq)
                // })

                // setPreqDuplicated(res);
                // if(result.result === true){
                //     setSuccessModal(true)
                //     // setTimeout(window.location.reload(),2000);
                // }
            })
           
        }
        
    }
    const searchKeyword = event => {
        setKeyword(event.target.value)
     };
    const keyPress =(e)=>{
        if(e.keyCode == 13){
         
            callSearch();
        }
    }
    const selectItems = (value) =>{
        console.log('value: '+value)
        let testCaseId = parseInt( value.split('-')[1] );
        let index = value.split('-')[0];
        
        setActiveTC(testCaseId)
        setPhyDay(( data[index].te_planPhyDay !== null && data[index].te_planPhyDay !== "" ) ? data[index].te_planPhyDay.split(' ')[0] : '')
        setVirDay(( data[index].te_planVirDay !== null && data[index].te_planVirDay !== "" ) ? data[index].te_planVirDay.split(' ')[0] : '')
        setPreq(data[index].tc_pretc_Id)
        setSelectedTester(data[index].Current_Tester)
        setRemarks(data[index].remarks)
        setActiveTcCode(data[index].Assigned_Test_Case)

        if( selectedItem.includes(testCaseId) ){
            setRemoveItemModal(true)
        }else{
            setDetailModal(true)
        }
        
        
    }

    const saveSelectedItems = () =>{
        if(phyDay === '' || virDay === '' || selectedTester === '' || remarks === '' || remarks === undefined){
            setModalErrorMsg('Please input details on required(*) fields')
        }else{
            if( selectedItem.includes(activeTC) ){
                let index = selectedItem.indexOf(activeTC)
                // let newDetails = details;
                details[index].phyDay = phyDay;
                details[index].virDay = virDay;
                details[index].tester = selectedTester;
                details[index].preq = preq;
                details[index].remarks = remarks;
                setDetails(details)
                setDetailModal(false)
                setModalErrorMsg('')
            }else{
               
                setSelectedItem([...selectedItem, activeTC])

                let newObj = {
                    'tc_id' : activeTC,
                    'phyDay' : phyDay,
                    'virDay' : virDay,
                    'tester' : selectedTester,
                    'preq' : preq,
                    'remarks' : remarks,
                }
                setDetails([...details, newObj])
                setModalErrorMsg('')
                setPreq('')
                setDetailModal(false)
            }
    
            
        }
    }

    const handleDateChangePhyDay = (day) => {
        setPhyDay( DateFormatService.formatDate(day))
    }
    const handleDateChangeVirDay = (day) => {
        setVirDay( DateFormatService.formatDate(day))
    }

    const selectTester = (e) =>{
        setSelectedTester(e.target.value)
    }
    const insertRemarks = (e) =>{
        setRemarks(e.target.value)
    }

    const changeValue = (e) => {
        setPreq(e.target.value)
    }
    const close = () =>{
        setDetailModal(false)
        setPhyDay('')
        setVirDay('')
        setPreq('')
        setSelectedTester('')
        setActiveTC('')
        setRemoveItemModal(false)
        setModalErrorMsg('')
        setSuccessModal(false)
        setRemarks('')
        setShowTestData(false)
        testData([])
    }
    const removeSelectedItem = () => {
        if( selectedItem.includes(activeTC) ){
            let result = selectedItem.filter(x => x !== activeTC)
            setSelectedItem(result)
        }

        setDetails( details.filter( el => el.tc_id !== activeTC) )
        setRemoveItemModal(false)
    }
    const update = (tc_id) => {
        if(selectedItem.includes(tc_id)){
            let index = selectedItem.indexOf(tc_id)
            setActiveTC(tc_id)
            setPhyDay(details[index].phyDay)
            setVirDay(details[index].virDay)
            setPreq(details[index].preq)
            setSelectedTester(details[index].tester)
            setRemarks(details[index].remarks)

            setDetailModal(true)
        }
    }   
   
    const checkParallel = () => {
        
        setParallel(!parallel)
    }
    
    const reload  = ()=>{
        window.location.reload()   
    }

    const changeValueDataset = (e) => {
        setSelectedDataset(e.target.value)
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
            <Row className="top-15 separator-border">
                <Col xs={12} md={12}>
 
                    <div className="col-lg-12 col-sm-12 top-10 mb-10 ">
 
                        <PageTitle title="Scenario Re-Execution"/>
                    </div>
                </Col>
            </Row>
            <div className='col-md-12'>
                <SuccessModal
                    isOpen={ successModal }
                    title="Scenario Re-Execution"
                    text="Successfully saved."
                    close={ reload }
                />
                <ScenarioReplicationModal
                    isOpen ={ detailModal }
                    text = { activeTcCode }
                    close = { close}
                    save = { saveSelectedItems }
                    handleDateChangePhyDay = { handleDateChangePhyDay }
                    handleDateChangeVirDay = { handleDateChangeVirDay }
                    testers = { testers }
                    selectTester = { selectTester }
                    changeValue = { changeValue }
                    selectedTester = { selectedTester }
                    modalErrorMsg = { modalErrorMsg }
                    phyDay={ phyDay }
                    virDay={ virDay }
                    preq={ preq }
                    remarks={ remarks }
                    insertRemarks={ insertRemarks }
                    isReexecution={true}
                />

                <ConfirmModal 
                    title = "Remove selected test case" 
                    text = "Are you sure you want to unselect Test Case?"
                    save = {removeSelectedItem}
                    close = {close}
                    isOpen = { removeItemModal }
                />

                <SelectDataSetModal 
                    title = "Test Data" 
                    text = "Change Dataset"
                    save = {duplicate}
                    close = {close}
                    isOpen = { showTestData }
                    options = { testData }
                    changeValue = { changeValueDataset }
                    hasSameOptions={ true }
                />
                

                <Row className="top-30">
                    <Col md={12}>
                        <Card border="secondary" text="dark">
                        <Card.Body>
                    
                                <div className='col-lg-6 left' style={{paddingRight:'5px'}}>
                                    <Form.Group className="mb-3 relative left col-md-8" controlId="formGroupName">
                                        <Form.Label><b> Scenario ID</b></Form.Label>
                                
                                        <Form.Control type="text" onChange={searchKeyword} onKeyDown={keyPress} name='keyword' placeholder="Scenario ID/Title"/>
                                        <span className='search-icon' onClick={search}><SearchOutlined /></span>
                                        
                                    </Form.Group>

                                    <BasicBtn title="Search" onClick={() => search()} additionalStyle='left search-repl' />
                                </div>
                                
                                <div className='clear'></div>
                                {
                                    ( data.length >= 1 ) ? <ScDetails data={data[0]} parallel={ parallel } checkParallel={ checkParallel } /> : ''
                                    
                                }
                                {
                                    ( data.length >= 1 ) ? 
                                        <SCList 
                                            data={data} 
                                            selectItems={ selectItems } 
                                            selectedItem={ selectedItem } 
                                            duplicate={ ConfirmDuplicate } 
                                            details={ details } 
                                            update={ update }
                                            
                                        /> : ''
                                }
                                
                        </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </Container>
    )
}

export default ScenarioReplication