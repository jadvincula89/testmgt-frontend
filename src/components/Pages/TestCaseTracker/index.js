import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PageTitle from "../../General/PageTitle";
import { GetData } from '../../../utils/api/GetData';
import StepsTable  from "../../General/TestCaseTracker/sections/StepsTable";
import Runtest  from "../../General/TestCaseTracker/sections/Runtest";
import { BLOCKED_STATUS, FOR_EXECUTION_STATUS, FOR_REJECTION_STATUS, ASSIGNED_STATUS, IN_PROGRESS_STATUS, DYNAMIC_DATA_COLS, PASSED_STATUS } from '../../../shared/constants';
import { SearchOutlined } from '@ant-design/icons';
import EditActualResultModal from '../../General/Modals/EditActualResultModal';
import TcDisabledModal from '../../General/Modals/TcDisabledModal';
import InformationalModal from '../../General/Modals/InformationalModal';
import TCStatusLabel from '../../General/StatusLabel/TCStatusLabel';
import ConfirmModal from '../../General/Modals/ConfirmModal';
import NextCaseModal from '../../General/Modals/NextCaseModal';
import ExitToNextCaseModal from '../../General/Modals/ExitToNextCaseModal';
import TestDataModal from '../../General/Modals/TestDataModal';
import RejectTestCase from '../../General/Modals/RejectTestCase';
import BasicBtn from '../../General/Buttons/BasicBtn';
import CancelBtn from '../../General/Buttons/CancelBtn';
import ExitBtn from '../../General/Buttons/ExitBtn';
import Cookies from "universal-cookie";
import { PostData } from '../../../utils/api/PostData';
import SelectTestData from './SelectTestData';
import './testCase.css';
import {
    Form,
    Card,
    Col,
    Row,
    Container,
  } from "react-bootstrap";
import { FadeLoader } from 'react-spinners';
const tcEnabled = localStorage.getItem('isEnabledTCexec');
const cookies = new Cookies();
class TestCaseTrackerIndex extends Component {
    constructor(props) {
		super(props)
		this.state = {
            tester : '',
            scenario : '',
            steps: [],
            planned_date : '',
            biz_txn_date : '',
            tc_title : '',
            run_tests: {
                'first_run' : 1,
                'resume' : 0,
                'restart' : 0,
                'retest' : 0
            },
            tc_id : '',
            tc_pretc_Id:'',
            tc_instanceid: '',
            sc_code: '',
            sc_id: '',
            showAclRsltModal : false,
            activeStepSelection : {},
            updateActlRsltValue : '',
            errorSavingActlRslt: '',
            showConfirmModal : false,
            showConfirmModalForExec : false,
            showNextCaseModal: false,
            showExitToNextCaseModal: false,
            showRejectAssignmentModal: false,
            tc_status: '',
            tc_status_lbl: '',        
            preq : 0,
            updateRejectReasonValue: '',
            rejectReasonType: '',
            rejectReason: '',
            errReasonType: '',
            errReason: '',
            hasACtiveTestCase: false,
            saveNext : true,
            exitNextDisable : false,
            updateExitReasonValue: "",
            exitReasonType : "",
            saveReasonType: "",
            updateSaveReasonValue: "",
            hasPrerequisite: false,
            prerequisite: "",
            showPrerequisite:false,
            showTestDataModal: false,
            sc_test_data : [],
            test_data: [],
            showSelectTestData : false,
            dynamicData_count : 1,
            dynamic_data : [ DYNAMIC_DATA_COLS ],
            dynamic_data_attr: [],
            dynamic_data_err : [],
            dynamic_data_delete : [],
            tc_pot: "",
            tce_id: "",
            status_reasons: [],
            reasons: [],
            exitReason : '',
            selectedTSstatus: '',
            hobs_role: '',
            errorSavingPOT: '',
            exitStatus: '',
            remarks: '',
            showModalDisabled : false,
            showNoTestDataAvailable: false,
            dataSetId:'',
            loading: false
		};
       
	}
    initTesterTC(){

        GetData('testers_tc',true).then((result) => {
            let responseJSON = result.data;
            let preq = (responseJSON.result.prerequisite) ? responseJSON.result.prerequisite : undefined;
           
            if(responseJSON.result !== null && preq === undefined){
                var datasetID = '';
                if(responseJSON.result.test_data !== undefined){
                    if(responseJSON.result.test_data['test_data']['cloned'] !== undefined && responseJSON.result.test_data['test_data']['cloned'].length >= 1){
                        datasetID = (responseJSON.result.test_data['test_data']['cloned'][0]['Dataset ID'] !== undefined) ? responseJSON.result.test_data['test_data']['cloned'][0]['Dataset ID'] : '';
                    }else if(responseJSON.result.test_data['test_data']['static'] !== undefined && responseJSON.result.test_data['test_data']['static'].length >= 1){
                        datasetID = (responseJSON.result.test_data['test_data']['static'][0]['Dataset ID']) ? responseJSON.result.test_data['test_data']['static'][0]['Dataset ID'] : ''
                    }
                }
                console.log('datasetID: '+datasetID)
                this.setState({
                    hasACtiveTestCase: true,
                    tester : responseJSON.result.tester,
                    scenario : responseJSON.result.sc_title,
                    steps : responseJSON.result.steps,
                    planned_date : responseJSON.result.planned_date,
                    biz_txn_date : responseJSON.result.biz_txn_date,
                    remarks: responseJSON.result.remarks,
                    tce_id: responseJSON.result.tce_id,
                    tc_title : responseJSON.result.tc_title,
                    tc_pot : responseJSON.result.tc_pot,
                    tc_instanceid: responseJSON.result.tc_instanceid,
                    tc_status : responseJSON.result.tc_status,
                    tc_status_lbl : responseJSON.result.tc_status_lbl,
                    tc_id : responseJSON.result.tc_id,
                    tc_pretc_Id : responseJSON.result.tc_pretc_Id,
                    sc_code : responseJSON.result.sc_code,
                    prerequisite :  preq,
                    hasPrerequisite:(preq !== undefined ) ? true : false,
                    showPrerequisite : ( preq !== undefined && preq.length >= 1 ) ? true : false,
                    showTestDataModal : false,
                    sc_test_data : responseJSON.result.sc_test_data,
                    test_data : responseJSON.result.test_data,
                    sc_id : responseJSON.result.sc_id,
                    emptyTestCase : ( responseJSON.result.length === 0) ? true : false,
                    dynamic_data_delete : [],
                    dynamic_data_err : [],
                    selectedTSstatus : '',
                    exitNextDisable : responseJSON.result.disable_exit_next_case,
                    hobs_role : responseJSON.result.tc_hobsRole,
                    errorSavingPOT: '',
                    run_tests : responseJSON.result.tc_runID,
                    dataSetId : datasetID
                })
                
                this.preRequisiteTS();
                this.saveNextActive();
                this.setState({ hasACtiveTestCase : false });
            }else{
                this.setState({ hasACtiveTestCase : false, showPrerequisite : ( preq !== undefined  && preq.length >= 1 ) ? true : false,prerequisite :  preq });
            }
            
		})
    }
    componentDidMount(){
        this.getStatusResons();
        this.initTesterTC();
        this.getDynamicDataAttr();
       
    }
    
    getStatusResons(){
        GetData('status-reasons',true).then((result) => {
            let responseJSON = result.data;
            this.setState({ status_reasons :  responseJSON.result })
        });
    }
    getDynamicDataAttr(){
        GetData('dynamic-data',true).then((result) => {
            let responseJSON = result.data;
            this.setState({ dynamic_data_attr :  responseJSON.result })
        });
    }
    addDynamicData = () => {
        var count = this.state.dynamicData_count;
        var dyData = this.state.dynamic_data;
        dyData.push({
            'attr' : '',
            'value': '',
            'remarks' : ''
        })
        this.setState( { dynamicData_count : count+1, dynamic_data : dyData } )
    }
    changeDynamicDataValue = (e) => {
        var type = e.target.name;
        var dyData = this.state.dynamic_data;
        var index = e.target.id;
        dyData[index][type] = e.target.value;

        this.setState({ dynamic_data : dyData })

    }
    removeDynamicData = (i)=>{
       
        var count = this.state.dynamicData_count;
        
        // var index = array.indexOf(i)
        var del = this.state.dynamic_data_delete;
        var dyData = this.state.dynamic_data.splice(i,  1);
        

        if(dyData[0]['id'] !== undefined){
            del.push(dyData[0]['id']);
        }
       
        this.setState( { dynamicData_count : count-1,dynamic_data_delete:del, } )
    }
    changeActlRsltValue = (e) =>{
        var activeStepSelection = this.state.activeStepSelection;
        if(e.target.name === 'pot'){
            
            activeStepSelection['tse_pot'] = e.target.value 
            this.setState({ activeStepSelection : activeStepSelection });
        }else if(e.target.name === 'issue_tracker'){
            activeStepSelection['issue_tracker'] = e.target.value 
            this.setState({ activeStepSelection : activeStepSelection });
        
        }else{
            this.setState({ updateActlRsltValue : e.target.value });
        }
        
    }
     checkFailedorBlock(){
       
       
          let count = this.state.test_data.dynamic_data.length - 1;
          console.log(this.state.test_data.dynamic_data);
         
           let tempstatus = false;
           if(count<0){
            return false;
           }
        for(let i = 0; i <= count; i++){
           
           if( (this.state.test_data.dynamic_data[i].attr === 'Issue Number') && (this.state.test_data.dynamic_data[i].value!=='')) {
            let values = this.state.test_data.dynamic_data[i].value;
            let checker = (/\s/).test(values);
            if(checker===false){
                if(values.length ===7){
                    let newdata = /^\d+$/.test(values.slice(2, 7));
                   if (
                     values[0].toUpperCase() === "I" &&
                     values[1].toUpperCase() === "S" &&
                     newdata=== true
                   ) {
                    tempstatus = true;
                   }
                }
            }
           
             break;  
           }
           
        }
         
        return tempstatus;
       
       
     }
    changeRejectReasonValue = (e)=>{
        this.setState({ updateRejectReasonValue : e.target.value });
    }
    changeRuntestValue = (e) =>{
        let rt = this.state.run_tests;
        
        rt[e] = ( rt[e] === 1 ) ? 0 : 1;
        this.setState({ run_tests : rt });
    }

    editAclRslt = (key) =>{
        let tcStp = this.state.steps;
        
        this.setState({ showAclRsltModal : true , activeStepSelection : tcStp[key], dynamic_data : (tcStp[key]['dynamic_data'].length >= 1) ?  tcStp[key]['dynamic_data'] : [ {
            'attr' : '',
            'value' : '',
            'remarks' : '',
            'isOldRecord' : false,
            'selectedTSstatus' : ''
        } ]});
    }
    close = ()=> {
        this.setState({ dynamic_data : [ {
            'attr' : '',
            'value' : '',
            'remarks' : '',
            'isOldRecord' : false
        } ],dynamicData_count: 1, dynamic_data_delete: [], showAclRsltModal : false, updateActlRsltValue: '' ,showConfirmModal: false, showNextCaseModal: false, showExitToNextCaseModal: false, showRejectAssignmentModal: false, showPrerequisite : false, activeStepSelection : {},tc_pot:"", selectedTSstatus: '',errorSavingActlRslt: '', showModalDisabled: false, showNoTestDataAvailable: false})
    }
    closeConfirm = () => {
        this.setState({ showConfirmModal : false, showConfirmModalForExec: false })
    }
    saveActlRslt = () => {
       
        
        let ts = this.state.activeStepSelection;
        if(this.checkDynamicData() === true && this.state.updateActlRsltValue !== '' || this.checkDynamicData() === true && this.state.activeStepSelection['actualResult'] !== ""){
           
            const payload = {
                value       : (this.state.updateActlRsltValue !== '') ? this.state.updateActlRsltValue : this.state.activeStepSelection['actualResult'],
                ts_id       : ts.ts_id,
                tc_id       : ts.tc_id,
                tce_id        : this.state.tce_id,
                dynamic_data : this.state.dynamic_data,
                dynamic_data_delete : this.state.dynamic_data_delete,
                pot         : this.state.activeStepSelection['tse_pot'],
                status      : (this.state.selectedTSstatus !== "") ? this.state.selectedTSstatus : this.state.activeStepSelection['tse_status'] ,
                issue_tracker      : this.state.activeStepSelection['issue_tracker']
            }
           
            
            PostData('edit-actual-result', payload, true).then((result) => {
                this.initTesterTC();
                this.close();
                
            })
        }else{
            this.setState({ errorSavingActlRslt : (this.state.activeStepSelection['actualResult'] === "" && this.state.updateActlRsltValue === "") ? 'Please insert Actual Result.' : ''})
        }
       
    }
    checkDynamicData(){
        var dyData = this.state.dynamic_data
        var err = this.state.dynamic_data_err
        dyData.map((val, key) => {
            if(val['attr'] === "" && val['value'] !== "" || val['attr'] !== "" && val['value'] === "" ){
               err.push(key)
            }else{
                err.splice(key,  1)
            }
        })
        this.setState({ dynamic_data_err:err})

        if(err.length >= 1){
            return false;
        }else{
            return true;
        }
        
    }
    saveExec = () => {
        let accessToken = cookies.get('accessToken');
        const payload = {
            tc_id        : this.state.tc_id,
            session_id   : accessToken
        }

        PostData('execute-tc', payload, false).then((result) => {
            this.setState({ showConfirmModalForExec : false})
            this.initTesterTC();
        })
    }
    
    exec = ()=>{
        this.setState({ 
            showConfirmModalForExec : (this.state.test_data['test_data'].length === 0) ? false : true, 
            showTestDataModal: (this.state.test_data['test_data'].length === 0) ? true : false 
        })
    }
    changeTSstatus = (e)=>{
        // let accessToken = cookies.get('accessToken');
        // let tseId = e.target.id;
        // console.log('tseId: '+tseId)
        // const payload = {
        //     tc_id        : this.state.tc_id,
        //     tse_id        : tseId,
        //     session_id   : accessToken,
        //     value : e.target.value
        // }
        
        // PostData('update-status-tse', payload, true).then((result) => {
        //     this.initTesterTC();
        // })
        this.setState({ selectedTSstatus : e.target.value })

    }
    nextCase = () =>{
      
        this.setState({ showNextCaseModal : true })
    }
    exitToNextCase = ()=>{
      
        this.setState({ showExitToNextCaseModal : true })
       
    }
    reject = () => {
        this.setState({ showRejectAssignmentModal : true })
    }
    rejectExec = () => {
        if(this.state.rejectReason !== '' && this.state.updateRejectReasonValue !== ''){
            const payload = {
                tc_id        : this.state.tc_id,
                reason       : this.state.updateRejectReasonValue,
                reason_type  : this.state.rejectReason,
                status       : FOR_REJECTION_STATUS,
                sc_id        : this.state.sc_id
            }
           
            PostData('reject-tc', payload, true).then((result) => {
                window.location.href='/';
            })
        }else{
            this.setState({
                errReasonType: ( this.state.rejectReason === "" || this.state.rejectReason === null) ? "Please select type" : '',
                errReason : ( this.state.updateRejectReasonValue === "" ) ? "Please input reason" : '',
            })
        }
        
    }
    exitSave = () => {
        /**
         * Exit & Next TC
         */
        if(this.state.updateExitReasonValue !== ''){
            const payload = {
                tc_id        : this.state.tc_id,
                reason       : this.state.updateExitReasonValue,
                status       : this.state.exitReasonType,
                exit_reason  : this.state.exitReason
            }
            let state = this.checkFailedorBlock();
         
            let lock=false;
           
            if (
              state === false &&
              (this.state.exitReasonType === '7' ||
                this.state.exitReasonType === '8')
            ) {
               lock=true;
               alert("Please add Issue Number on Dynamic Data");
             }
             if (lock===false){
              
            PostData("exit-tc", payload, true).then((result) => {
               window.location.href = "/";
               }); 
            }
        }else{
            this.setState({
                errReasonType: ( this.state.exitReasonType === "" ) ? "Please select type" : '',
                errReason : ( this.state.updateExitReasonValue === "" ) ? "Please input reason" : '',
            })
        }
        
    }
    saveAndExit = () =>{
        if(this.state.updateSaveReasonValue !== '' && this.state.tc_pot !== ''){
            this.setState({loading:true})
            const payload = {
                tc_id        : this.state.tc_id,
                tc_pretc_Id  : this.state.tc_pretc_Id,
                reason       : this.state.updateSaveReasonValue,
                status       : PASSED_STATUS,
                tc_pot       : this.state.tc_pot
            }
    
            PostData('exit-tc', payload, true).then((result) => {
                window.location.href='/';
            })
        }else{
            this.setState({
                loading: false,
                errReasonType: ( this.state.exitReasonType === "" ) ? "Please select type" : '',
                errReason : ( this.state.updateExitReasonValue === "" ) ? "Please input reason" : '',
                errorSavingPOT : ( this.state.tc_pot === null || this.state.tc_pot === "" ) ? 'Please insert proof of test url' : ''
            })
        }
    }
    changeRejectReasonType = (e) => {
        this.setState({rejectReasonType: e.target.value})
    }
    changeExitType = (e) =>{
      
        if(e.target.name === 'exitReason'){
            this.setState({ exitReason: e.target.value })
        }else if(e.target.name === 'save'){
            this.setState({ saveReasonType: e.target.value })
        }else if(e.target.name === 'rejectReason'){
            this.setState({ rejectReason: e.target.value })
        }else{
            this.setState({ exitReasonType: e.target.value, reasons : this.state.status_reasons[e.target.value] })
        }
        
    }
    
    saveNextActive(){
        let Sn = true;
        let items = this.state.steps;
        let count = items.length - 1;
        for(let i = 0; i <= count; i++){
            if( items[i].tse_status === 0 || items[i].tse_status === '' ){
                Sn = false;
                this.setState({ saveNext : Sn })
                break;
            }else{
                Sn = true;
                this.setState({ saveNext : Sn })
            }
        }
    }
   
    preRequisiteTS(){
        /**
         * (preq) - Prevents doing steps on sequence &
         */
        let items = this.state.steps;
        
        if(items !== undefined && items.length >= 1){
            let count = items.length;
            for(let i = 1; i <= count; i++){
                
                let key = i - 1;
                if(i < count){
                    if(key === 0 && items[key].tse_status === '' || items[key].tse_status === 0){
                        
                        this.setState({ preq : -1})
                        break;
                    }else if(i >= 2 && items[key].tse_status === '' || items[key].tse_status === 0){
                       
                        this.setState({ preq : key })
                        break;
                    }
                }else{
                    this.setState({ preq : count })
                }
                
            }
        }
            
    }
    changeExitReasonValue = (e) => {
        if(e.target.name === 'save'){
            this.setState({ updateSaveReasonValue : e.target.value })
        }else if(e.target.name === 'pot'){
            this.setState({ tc_pot : e.target.value })
        }else{
            this.setState({ updateExitReasonValue : e.target.value })
        }
        
    }
    testData = () => {
        this.setState({ showTestDataModal : true })
    }
    selectTestData = () =>{
        this.setState({ showSelectTestData : true, showTestDataModal : false })
    }
    saveDynamicData = () => {
        let tc_id  = this.state.activeStepSelection.tc_id
        let sc_id = this.state.sc_id
        let ts_id =this.state.activeStepSelection.ts_id


    }
    changeDynamicDataAttr = (e) => {
        let value = e.target.value
        let dyData = this.state.dynamic_data
        let index = e.target.id - 1
       
        dyData[index]['attr'] = value;
        // console.log()
        this.setState({dynamic_data : dyData})

    }
    
    showMsgTcDisabled = () => {
        this.setState({showModalDisabled:true, showAclRsltModal: false})
    }
    
	render(){ 
        
        return(
            <Container fluid>
                <span className="spinner-holder absolute" style={{position:'fixed',zIndex:'9999'}}>
                    <FadeLoader
                        style={{display: 'block', margin: '0 auto', borderColor: 'red'}}
                        sizeUnit={"px"}
                        size={10}
                        color={'#ca5d41'}
                        loading={this.state.loading}
                    />
                </span>
                {
                    //(this.state.tc_status === IN_PROGRESS_STATUS && this.state.sc_test_data['columns'] !== undefined && this.state.sc_test_data['columns'].length >= 1 ) ?
                    
                    <TestDataModal
                        isOpen      = { this.state.showTestDataModal }
                        save       = { this.selectTestData }
                        title       = "No Test Data found for this Scenario."
                        // text        = { this.state.prerequisite }
                        // sc_test_data = { this.state.sc_test_data }
                    />
                    //: ""
                    
                }
                <TcDisabledModal
                    isOpen      = { this.state.showModalDisabled }
                    close       = { this.close }
                />
                <InformationalModal
                    isOpen      = { this.state.showPrerequisite }
                    close       = { this.close }
                    title       = "Test Case not yet ready"
                    data        = { this.state.prerequisite }
                    
                />
                <NextCaseModal
                    isOpen      = { this.state.showNextCaseModal }
                    close       = { this.close }
                    save        = { this.saveAndExit }
                    changeSaveType = { this.changeExitType }
                    changeSaveReasonValue =  { this.changeExitReasonValue }
                    tc_pot         = { this.state.tc_pot }
                    errorSavingPOT  = { this.state.errorSavingPOT }
                />
                <ExitToNextCaseModal
                    isOpen      = { this.state.showExitToNextCaseModal }
                    close       = { this.close }
                    save        = { this.exitSave }
                    changeExitType = { this.changeExitType }
                    changeExitReasonValue = { this.changeExitReasonValue }
                    errReasonType = { this.state.errReasonType }
                    errReason = { this.state.errReason }
                    statusReasons = { this.state.status_reasons }
                    reasons         = { this.state.reasons }
                    status_reasons         = { this.state.status_reasons }
                    exitReasonType = { this.state.exitReasonType }
                    exitReason      = { this.state.exitReason }
                />
                <RejectTestCase
                    isOpen      = { this.state.showRejectAssignmentModal }
                    close       = { this.close }
                    save        = { this.rejectExec }
                    changeRejectReasonValue = { this.changeRejectReasonValue }
                    changeRejectReasonType = { this.changeRejectReasonType }
                    errReasonType = { this.state.errReasonType }
                    errReason = { this.state.errReason }
                    status_reasons         = { this.state.status_reasons }
                    rejectReasonType = { this.state.rejectReasonType }
                    reasons         = { this.state.status_reasons }
                    changeExitType = { this.changeExitType }
                    rejectReason={ this.state.rejectReason }
                />
                
                <EditActualResultModal 
                    isOpen      = { this.state.showAclRsltModal }
                    tcTitle     = { this.state.tc_title }
                    close       = { this.close }
                    stepData    = { this.state.activeStepSelection }
                    changeActlRsltValue = { this.changeActlRsltValue }
                    save        = { (tcEnabled === false || tcEnabled === 'false') ? this.showMsgTcDisabled : this.saveActlRslt }
                    errorMessage = { this.state.errorSavingActlRslt }
                    errorSavingPOT = { this.state.errorSavingPOT }  
                    dynamicData_count = { this.state.dynamic_data.length }
                    addDynamicData = { this.addDynamicData }
                    removeDynamicData = { this.removeDynamicData }
                    dynamic_data = { this.state.dynamic_data }
                    dynamic_data_attr = { this.state.dynamic_data_attr }
                    changeDynamicDataAttr = { this.changeDynamicDataAttr }
                    changeDynamicDataValue = { this.changeDynamicDataValue }
                    changeTSstatus={ this.changeTSstatus }
                    selectedTSstatus ={ this.state.selectedTSstatus }
                />
                
                <ConfirmModal 
                    title = "Confirm Case execution" 
                    text = "Are you sure you want to start execution for this test case?"
                    close = { this.closeConfirm }
                    save = { this.saveExec }
                    isOpen = { this.state.showConfirmModalForExec }
                />
                <Row className="top-15 separator-border">
                    <Col xs={12} md={12}>
                          
                        <div className="col-12 top-10 mb-10 ">
                            <PageTitle title="Test Case Tracker"/>
                        </div>
                               
                        </Col>
                </Row>

                <Row className="top-30">
                    <Col xs={12}>
                        <Card border="secondary" text="dark">
                        <Card.Body>
                            <Card.Title>Get Test Case</Card.Title>
                        
                            <Form>
                                <div className='col-lg-7 left'>
                                    <Form.Group className="mb-3 relative" controlId="formGroupName">
                                    <Form.Label>Tester</Form.Label>
                                    <Form.Control type="text" disabled value={ this.state.tester }/>
                                        <span className='search-icon'><SearchOutlined /></span>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formGroupDescription">
                                        <Form.Label>Scenario</Form.Label>
                                        <Form.Control type="text" disabled value={ this.state.scenario }/>
                                    </Form.Group>
                                </div>
                                {
                                    ( this.state.emptyTestCase === false && this.state.hasACtiveTestCase === false || this.state.emptyTestCase === false && this.state.hasPrerequisite === false) ?
                                    <div className='col-lg-4 right'>
                                        <div>
                                            <Form.Label>Run Status</Form.Label>
                                            <Runtest run_tests={this.state.run_tests} changeValue={this.changeRuntestValue} />
                                        </div>
                                    </div> : ''
                                }
                                
                                
                            </Form>
                        </Card.Body>
                        </Card>
                    </Col>

                    <Col xs={12} className='top-30'>
                        <Card border="secondary" text="dark">
                                {
                                    ( this.state.emptyTestCase === false && this.state.hasACtiveTestCase === false || this.state.emptyTestCase === false && this.state.hasPrerequisite === false) ?
                                    <Card.Body>
                                        <div className='left'>
                                            <div><b>Scenario:</b> { this.state.scenario }</div>
                                        </div>
                                        <div className='right'>
                                            <div><b>Scenario Code:</b> { this.state.sc_code }</div>
                                        </div>
                                        <div className='clear'></div>
                                        {
                                             ( this.state.dataSetId !== '' ) ?  
                                                <div className=""><b>Data Set ID:</b><span className="text-color-blue bold" onClick={() => window.open('/sc-test-data/'+this.state.sc_code, "_blank")}>{ this.state.dataSetId }</span></div> : ""
                                        }

                                        <div className="top-15"><b>Hobs Role:</b> { this.state.hobs_role }</div>


                                        <div className="top-15"><b>Planned Date:</b> { this.state.planned_date }</div>
                                        <div><b>Planned Virtual Date:</b> { this.state.biz_txn_date }</div>
                                        <div><b>Remarks:</b> { this.state.remarks }</div>
                                        
                                        <div className="top-15">
                                            <div className='col-md-8 left'><b>Test Case Title: </b>{this.state.tc_title}</div>
                                            <div className=' right'><b>Instance ID: </b>{ this.state.tc_instanceid }</div>
                                            <div className='clear'></div>
                                        </div>

                                        
                                        
                                        {
                                            (this.state.showSelectTestData === true) ?
                                                <div>
                                                    <div className="left top-15"><b>Select Test Data:</b> </div>
                                                    <div className='col-md-2 right'><TCStatusLabel forTestStep={false} label={ this.state.tc_status_lbl } status={ this.state.tc_status }/></div>
                                                    <div className='clear'></div>
                                                    <SelectTestData
                                                        sc_test_data = { this.state.sc_test_data }
                                                        sc_id = { this.state.sc_id }
                                                        tc_id = { this.state.tc_id }
                                                        dynamic_data  = { this.state.test_data['dynamic_data'] }
                                                    />
                                                    <div className='clear'></div>

                                                </div>
                                            
                                            :
                                            <div>
                                                
                                                
                                                
                                                <div className='clear'></div>
                                                <div className="left top-15"><b>Case Steps:</b> </div>
                                                
                                                {   ( this.state.tc_status === FOR_EXECUTION_STATUS || this.state.tc_status === ASSIGNED_STATUS ) ? 
                                                        <div>
                                                            <div className=" right">
                                                                {
                                                                    <BasicBtn title="Execute Test Case " onClick={ (tcEnabled === false || tcEnabled === 'false') ? this.showMsgTcDisabled : this.exec }/>
                                                                   
                                                                        
                                                                }
                                                                 
                                                            </div>
                                                            <div className='clear'></div>
                                                        </div>
                                                    :  <div className='col-md-2 right'><TCStatusLabel forTestStep={false} label={ this.state.tc_status_lbl } status={ this.state.tc_status }/></div>
                                                
                                                }
                                                

                                                
                                                <div className='top-15'>
                                                    <StepsTable rows={ this.state.steps } editAclRslt = { this.editAclRslt } tcStatus={ this.state.tc_status } changeTSstatus={ this.changeTSstatus } preq={ this.state.preq }/>
                                                </div>

                                                { ( this.state.tc_status === FOR_EXECUTION_STATUS || this.state.tc_status === ASSIGNED_STATUS ) ? 
                                                    <div className="top-15 right">
                                                        {/* <BasicBtn title="Execute Test Case " onClick={ this.exec }/>  */}
                                                        <CancelBtn title="Reject Assignment" onClick={ (tcEnabled === false || tcEnabled === 'false') ? this.showMsgTcDisabled : this.reject }/>
                                                    </div>
                                                :   
                                                    <div className='top-15'>
                                                        <div className="left">
                                                            {/* <Link to={'/sc-test-data/'+this.state.sc_code} target="_blank" className='  btn-link bg-blue text-color-white m-15 padding-10'>View Data Set</Link>  */}
                                                            <BasicBtn title="View Data Set" onClick={() => window.open('/sc-test-data/'+this.state.sc_code, "_blank")}  /> 
                                                        </div>
                                                        <div className="right">
                                                          <BasicBtn title="Save & Next Case" onClick={ (tcEnabled === false || tcEnabled === 'false') ? this.showMsgTcDisabled : () => ( this.state.saveNext === true) ? this.nextCase() : ''} additionalStyle={ ( this.state.saveNext === false) ? "bg-light-gray disabledClick" :"" } /> 
                                                     
                                                            {
                                                                ( this.state.tc_status !== BLOCKED_STATUS ) ? 
                                                                <ExitBtn title="Exit to Next Case" onClick={ (tcEnabled === false || tcEnabled === 'false') ? this.showMsgTcDisabled : () => ( this.state.exitNextDisable === true) ? '' : this.exitToNextCase() } additionalStyle={ ( this.state.exitNextDisable === true) ? "bg-light-gray disabledClick" :"" }/> : ''
                                                            }
                                                            
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        }
                                    </Card.Body>
                                    : ""
                                }
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
        

    }

}
export default TestCaseTrackerIndex;
