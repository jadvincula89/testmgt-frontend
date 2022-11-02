import React, { useState, useEffect } from 'react';
import { PostData } from '../../utils/api/PostData';
import {
    Card,
    Container,
  } from "react-bootstrap";
import InformationalModal from '../General/Modals/InformationalModal';
import { FadeLoader } from 'react-spinners';

function ForPw() {
    const [uname, setUname] = useState('');
    const [showSucc, setShowSucc] = useState(false);
    const [loader, setLoader] = useState(false);
    const [infoTitle, setInfoTitle] = useState("");
    const [infoText, setInfoText] = useState("");

    const changeValue = (e) =>{
        setUname(e.target.value)
    }
    const close = ()=>{
        setShowSucc(false);
    }
    const submit = () => {
        if(uname !== ''){
            setLoader(true)
            PostData('request-change-pw-link', { u_name : uname }, false).then((result) => {
                let responseJSON = result;
                if(result.result === true){
                    setInfoText("The change password link was sent to your registered email.")
                    setInfoTitle("Success")
                    
                }else{
                    setInfoText( ( responseJSON.message !== undefined ) ? responseJSON.message : "")
                    setInfoTitle("Error")
                }
                setShowSucc(true)
                setLoader(false)
            })

        }
    }

    return (
        <Container fluid>
            <div>
                
                <InformationalModal 
                    isOpen  = { showSucc }
                    close  = { close }
                    title  = { infoTitle }
                    text  = { infoText }
                />
                <div className="col-md-4 top-30 margin-center">
                        <Card border="secondary" text="dark">
                        <Card.Body>
                        
                            <span className="spinner-holder absolute" style={{position:'fixed',zIndex:'999'}}>
                                <FadeLoader
                                    style={{display: 'block', margin: '0 auto', borderColor: 'red'}}
                                    sizeUnit={"px"}
                                    size={10}
                                    color={'#ca5d41'}
                                    loading={loader}
                                />
                            </span>
                            Insert User name
                            <div>
                                <input className="top-15 form-control" type="text" onChange={ changeValue } name='uname'/>
                            </div>
                            <div className="top-15">
                                <button className="margin-center block" onClick={ submit } >Send Password Link to email</button>
                            </div>
                        </Card.Body>
                        </Card>
                </div>
            </div>
        </Container>
    )
}
export default ForPw;
