import React, { Component } from "react";
import { PostData } from '../../utils/api/PostData';
import {
  Card,
  Container,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import Cookies from "universal-cookie";

import { sha256, sha224 } from 'js-sha256';
/*
const mapDispatchToProps = dispatch => ({
    login : () => dispatch(loginToken())
})*/
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uname : '',
            password : '',
            error : ''
        };
    }

    changeValue = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    submit = (e) => {
        if(this.state.uname !== '' && this.state.password !== ''){
            let hashedPassword = sha256(this.state.password);
            
            PostData('login', { uname : this.state.uname ,password : hashedPassword}, false).then((result) => {
                let responseJSON = result;
                
                if(responseJSON.result !== null){
                    const cookies = new Cookies();
                
                    cookies.set('accessToken', responseJSON.result.session_id, { path: '/' });
                    cookies.set('u_name', this.state.uname, { path: '/' });
                    window.location.href="/";
                }else{
                    this.setState({error : result.message})
                }
            })
        }
    }

    render() {
      
        return (
            <Container fluid>
                <div>
                    <div className="col-md-4 top-30 margin-center">
                            <Card border="secondary" text="dark">
                            <Card.Body>
                                Login
                                <div>
                                    <input className="top-15 form-control" type="text" onChange={ this.changeValue } name='uname'/>
                                </div>

                                <div >
                                    <input className="top-15 form-control" type="password" onChange={ this.changeValue } name='password'/>
                                </div>
                                <div className="error-msg">{ this.state.error }</div>
                                <div className="text-centered"><Link onClick={ () => window.location.href="/forgot-password" }>Forgot Password</Link></div>
                                <div className="top-15">
                                    <button value="Submit" onClick={ this.submit }>Submit</button>
                                </div>
                            </Card.Body>
                            </Card>
                    </div>
                </div>
            </Container>
        )
    }
}

export default Login;
