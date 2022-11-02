import React, { Component } from "react";
 
import PageTitle from "../../General/PageTitle";
 
import {
  Alert,
  Form,
  Button,
  Card,
  Col,
  Row,
  Container,
  Table,
} from "react-bootstrap";

import Cookies from "universal-cookie";
/*
const mapDispatchToProps = dispatch => ({
    login : () => dispatch(loginToken())
})*/
class Forbidden extends Component {
  constructor(props) {
    super(props);
   
    
  }
 

  render() {
   
    return( <Container fluid>
        <Row>
        <Col xs={12} md={12}>
             <Card border="secondary" text="dark">
               <Card.Body>
                 <Card.Title>
                 <div className="col-lg-12 top-10 mb-10 ">
                     <PageTitle title="Access Forbidden"/>
                 </div>
  
                 </Card.Title>
               </Card.Body>
             </Card>
           </Col>
        </Row></Container>)
  }
}

export default Forbidden;

