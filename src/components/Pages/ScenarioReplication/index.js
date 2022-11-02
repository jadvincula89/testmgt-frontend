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
import SuccessModal from "../../General/Modals/TcReplicatedModal";
import ConfirmModal from '../../General/Modals/ConfirmModal';
import DateFormatService from '../../../services/DateFormatService';
import SelectDataSetModal from '../../General/Modals/SelectDataSetModal';
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
    const [ seId, setSeId ] = useState('');
    
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
        PostData('search-scenario-duplication', payload, true).then((result) => {
            setData(result.result)
            setLoader(false)
        })
    }
    const search = () => {
        setSelectedItem([])
        callSearch()
    }
    const duplicate = ()=>{
        if(details.length >= 1){
            let item = data[0];
            const payload = {
                hs_id : item.hs_id,
                sc_code : item.sc_code,
                selectedTc : details,
                parallel : parallel
            }

            PostData('scenario-duplication', payload, true).then((result) => {
                setTcDuplicated(result.result['new_id'])
                setTestData(result.result['new_test_data'])
                setSeId(result.result['se_id'])
                setSuccessModal(true)
                
                var res = [];

                result.result.new_id.map((tc) => {
                    res.push(tc.preq)
                })

                
                setPreqDuplicated(res);
                
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


        if( selectedItem.includes(testCaseId) ){
            setRemoveItemModal(true)
        }else{
            setDetailModal(true)
        }
        
        
    }

    const saveSelectedItems = () =>{
        if(phyDay === '' || virDay === '' || selectedTester === ''){
            setModalErrorMsg('Please input details on required(*) fields')
        }else{
            if( selectedItem.includes(activeTC) ){
                let index = selectedItem.indexOf(activeTC)
                // let newDetails = details;
                details[index].phyDay = phyDay;
                details[index].virDay = virDay;
                details[index].tester = selectedTester;
                details[index].preq = preq;
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
                    'preq' : preq
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
        setShowTestData(false)
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

            setDetailModal(true)
        }
    }   
   
    const checkParallel = () => {
        
        setParallel(!parallel)
    }
    const updatetcDuplicatedPreq = (e) => {
        let index = e.target.id
        let preq = [...preqDuplicated];
        preq[index]= e.target.value;

       setPreqDuplicated(preq)
        
    }
    const updatePreq = () => {
        setLoader(true)
        var validator = tcDuplicated.filter(function (el){
            return el.remarks === '';
        });

        if(validator.length === 0){
            PostData('update-preq-sc-duplication', tcDuplicated, true).then((result) => {
                // window.location.reload()
                setSuccessModal(false)
                setShowTestData(true)
                setRemarksErr('');
            })
        }else{
            setRemarksErr('Please add remarks.');
        }
       
        
    }
    const changeValueDataset = (e) => {
        setSelectedDataset(e.target.value)
    }
    const updateTestData = () => {
        const payload = {
            'se_id' : seId,
            'dataset' : selectedDataset
        }
        PostData('update-dataset-replication', payload, true).then((result) => {
            window.location.reload()
        })
    }
    console.log(selectedDataset)
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
 
                        <PageTitle title="Scenario Replication"/>
                    </div>
                </Col>
            </Row>
            <div className='col-md-12'>
                <SuccessModal
                    isOpen={ successModal }
                    text="Duplicated Test Cases:"
                    close={ close }
                    tcDuplicated={ tcDuplicated }
                    preq={ preqDuplicated }
                    save={ updatePreq }
                    onchangePreq={ updatetcDuplicatedPreq }
                    setDatas={ setTcDuplicated }
                    remarksErr={ remarksErr }
                />
                <ScenarioReplicationModal
                    isOpen ={ detailModal }
                    text = "Test Case"
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
                    isReexecution={false}
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
                    save = { updateTestData }
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
                                            duplicate={ duplicate } 
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