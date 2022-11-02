import React, { useRef,useEffect,Component } from 'react';
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

 import "@trendmicro/react-sidenav/dist/react-sidenav.css";

function ForbiddenComponent(props) { 

    return (
<Container fluid>
<Row>
<Col xs={12} md={12}>
     <Card border="secondary" text="dark">
       <Card.Body>
         <Card.Title>
         <div className="col-lg-6 col-sm-12 top-10 mb-10 ">
         <h3><a className="text-color-black" href="/">Access Forbidden</a></h3>
         </div>

         </Card.Title>
       </Card.Body>
     </Card>
   </Col>
</Row></Container>);
}
export default ForbiddenComponent;
