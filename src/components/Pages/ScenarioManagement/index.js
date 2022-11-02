import React, { useState, useEffect } from "react";
import PageTitle from "../../General/PageTitle";
import { Form, Card, Col, Row, Container } from "react-bootstrap";
import BasicBtn from "../../General/Buttons/BasicBtn";
import { GetData } from '../../../utils/api/GetData';
import { PostData } from '../../../utils/api/PostData';
import ConfirmModal from "../../General/Modals/ConfirmModal";
import InformationalModal from "../../General/Modals/InformationalModal";
const uniqid = require("uniqid");
 
function ScenarioManagement() {
    const [ hlSC, sethlSC ] = useState([]);
    const [ selectedHL, setselectedHL ] = useState('');
    const [ selectedHLKey, setselectedHLKey ] = useState('');
    const [ hlCode, sethlCode ] = useState('');
    const [ custType, setcustType ] = useState('');
    const [ scID, setScID ] = useState('');
    const [ scTitle, setScTitle ] = useState('');
    const [ showConfirm, setshowConfirm ] = useState(false);
    const [ showErr, setshowErr ] = useState(false);
    
    const [ showSucc, setSucc ] = useState(false);
    const [ errorMsg, setErrorMsg ] = useState('');
    

    useEffect(() => {
        GetData('hl-scenarios',true).then((result) => {
            
            if(result !== undefined){ 
                if(result.data != undefined){
                    let responseJSON = result.data;
                
                    if(responseJSON.result.length >= 1){
                        sethlSC(responseJSON.result)
                    }
                }
            }
            
          })
    }, []);
    const Options = () =>{
        let content = [];

        hlSC.map((hl, key)=>{
            content.push(<option  key={ uniqid() } value={ key+'_'+hl.hs_id }>{ hl.hs_title }</option>)
        })

        return content;
    }
    const changeHL = (e) =>{
        if(e.target.value !== ""){
            let split = e.target.value.split('_');
            setselectedHL(split[1])
            setselectedHLKey(split[0])
            sethlCode(hlSC[split[0]].hs_code)
            setcustType(hlSC[split[0]].hs_customerType)
        }else{
            setselectedHL("")
            sethlCode("")
            setcustType("")
        }
       
    }
    const changeValue = (e) => {
        
        if(e.target.name === "scId"){
            setScID(e.target.value)
        }else if(e.target.name === "scTitle"){
            setScTitle(e.target.value)
        }
    }

    const save = () => {
        if(hlCode === "" || scID === "" || scTitle === ""){
            setshowErr(true)
            setErrorMsg("Please complete information.")
        }else{
            setshowConfirm(true)
            setErrorMsg("")
        }
        
    }
   
    const close = () => {
        setshowConfirm(false)
        setshowErr(false)
        
    }
    const saveConfirm = () =>{
        const payload ={
            hl_id : selectedHL,
            sc_id : scID,
            sc_title : scTitle
        }
        PostData('add-scenario',payload, true).then((result) => {
            if(result.result === null){
                setErrorMsg(result.message)
                setshowConfirm(false)
                setshowErr(true)
            }else if(result.result){
                setSucc(true)
                setshowConfirm(false)
            }
        })
    }
    const refresh = () => {
        window.location.href='/scenario-management';
    }
    
    return(
        

        <Container fluid>
            <InformationalModal 
                isOpen  = { showSucc }
                close  = { refresh }
                title  = "Success"
                text  = "Scenario added."
            />
            <InformationalModal 
                isOpen  = { showErr }
                close  = { close }
                title  = "Error"
                text  = { errorMsg }
            />
            <ConfirmModal 
                title = "Add Scenario" 
                text = "Are you sure you want to add this Scenario?"
                save = {saveConfirm}
                close = {close}
                isOpen = { showConfirm }
            />
            <Row className="top-30 separator-border">
                <Col xs={12} md={12}>
        
                <div className="col-lg-12 col-sm-12 top-10 mb-10 ">
        
                    <PageTitle title="Scenario Management" />
                </div>
                </Col>
            </Row>
            <div className="col-md-12">

                <Row className="top-30">
                    <Col md={12}>
                        <Card border="secondary" text="dark">
                            <Card.Body>
                                <div className=" col-lg-4 left padding-5">
                                    <Form.Label className='bold'>High Level Scenario:</Form.Label>
                                    <select className="form-control" onChange={ changeHL } value={selectedHLKey+'_'+selectedHL}>
                                        <option value="">Select HL Scenario</option>
                                        { Options() }
                                    </select>
                                </div>

                                <div className=" col-lg-4 left padding-5">
                                    <Form.Label className='bold'>High Level Scenario Code:</Form.Label>
                                    <input type="text" className="form-control" value={ hlCode } disabled/>
                                </div>

                                <div className=" col-lg-4 left padding-5">
                                    <Form.Label className='bold'>Customer Type:</Form.Label>
                                    <input type="text" className="form-control" value={ custType } disabled/>
                                </div>

                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={12}>
                        <Card border="secondary" text="dark" className="top-30">
                            <Card.Body>
                                <div className=" col-lg-4 left padding-5 ">
                                    <Form.Label className='bold'>Scenario ID:</Form.Label>
                                    <input type="text" className="form-control" name="scId" onChange={ changeValue }/>
                                </div>
                                <div className=" col-lg-4 left padding-5 ">
                                    <Form.Label className='bold'>Scenario Title:</Form.Label>
                                    <input type="text" className="form-control" name="scTitle" onChange={ changeValue }/>
                                </div>
                                <div className="clear"></div>
                                <div className="top-15 right">
                                    <BasicBtn title="Save Scenario" onClick={ save }/>
                                    
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </Container>
    )
}
export default ScenarioManagement;