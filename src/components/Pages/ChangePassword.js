import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { PostData } from '../../utils/api/PostData';
import {
    Card,
    Container,
  } from "react-bootstrap";
import InformationalModal from '../General/Modals/InformationalModal';
import { FadeLoader } from 'react-spinners';

function ForPw() {
    const { sessionId } = useParams();
    const [pw, setPw] = useState('');
    const [cpw, setCpw] = useState('');
    const [loader, setLoader] = useState(false);
    const [showSucc, setShowSucc] = useState(false);
   

    const changeValue = (e) =>{
        if(e.target.name === 'pw'){
            setPw(e.target.value)
        }else if(e.target.name === 'cpw'){
            setCpw(e.target.value)
        }
       
    }
    const close = ()=>{
        // setShowSucc(false);
    }
    const submit = () => {
    //   console.log(window.location.origin)
    //   console.log(window.location)
    let session = window.location.href.split(window.location.origin+'/change-password/');
        if(session[1] !== undefined){
            if(pw !== '' && cpw !== '' && pw === cpw){
                setLoader(true)
                const payload = {
                    'session' : session[1],
                    'password' : pw
                }
                PostData('change-password', payload, false).then((result) => {
                    let responseJSON = result;
                    if(result.result === true){
                        window.location.href='/login';
                    }else{
                        setLoader(false)
                    }
                })
            }
        }
    }

    return (
        
        <Container fluid>
            <div>
                
                <InformationalModal 
                    isOpen  = { showSucc }
                    close  = { close }
                    title  = "Success"
                    text  = "Password successfuly changed."
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
                            Change Password
                            <div>
                                <input className="top-15 form-control" type="password" onChange={ changeValue } name='pw'/>
                            </div>
                            Confirm Password
                            <div>
                                <input className="top-15 form-control" type="password" onChange={ changeValue } name='cpw'/>
                            </div>
                            <div className="top-15">
                                <button className="margin-center block" onClick={ submit } >Save Password</button>
                            </div>
                        </Card.Body>
                        </Card>
                </div>
            </div>
        </Container>
    )
}
export default ForPw;
