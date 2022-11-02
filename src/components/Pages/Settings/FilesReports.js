import React, { Component } from "react";
import { CaretDownOutlined } from "@ant-design/icons";
import PageTitle from "../../General/PageTitle";
import { GetData } from "../../../utils/api/GetData";
import { PostData } from "../../../utils/api/PostData";
import { ENV, TEST_SAMPLE_SESSION_ID } from "../../../shared/constants";

import Stack from "react-bootstrap/Stack";
import TableServices from  "./TableServices";
//import exportFromJSON from 'export-from-json';
import {Excel} from '../../../shared/Excel';
import { UserRestriction } from "../../../shared/UserRestriction";
import {
  Alert,
  Form,
  Button,
  Card,
  Col,
  Row,
  Container,
  Table,
  InputGroup,
  FormControl,
} from "react-bootstrap";

import Cookies from "universal-cookie";
const uniqid = require('uniqid');
const cookies = new Cookies();
class FilesReports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAllowed: true,
      selectedFile: null,
      filetype: 0,
      startdate:'',
      enddate:'',
      loading: false,
      show: false,
      success: false,
      results:[],
    };
  }
  onChangeDate=(event)=>{
 
   if(event.target.name==='startdate'){
    this.setState({ startdate: event.target.value});
   }
   if(event.target.name==='enddate'){
    this.setState({ enddate: event.target.value});
   }
  }
  downloadCSV=(a,b,c,d,e)=>{
 
    const payload ={"state":b,"FileName":c,"FileID":a,"hasmoved":e,"fileType":d};
     
    PostData("download-file",payload, true).then((response) => {
      let responseJSON = response;
      var date=new Date().getTime();
      var fileName=a+'-'+b+'-'+date;
      var exportType = 'excel';
     
      //exportFromJSON({ data: responseJSON.result, fileName: fileName, exportType:'xls'})  
      Excel(responseJSON.result,fileName);
    });
 
  }
  setShow = (isBoolean) => {
    this.setState({ show: isBoolean });
  };
  ViewAll =() =>{
    const payload ={};
    this.setState({ results:[]});
    this.setState({ loading: true, success: false});
    PostData("filter-file",payload, true).then((result) => {
      let responseJSON = result;

     this.setState({ results:responseJSON});
      this.setState({ loading: false, success: false, });
    
    });
  }  
  
  componentDidMount() {
   this.setState({results:[]});
  }
  render() {
   
      return (
       
          <Container fluid>
             <Row className="top-30 separator-border">
            <Col xs={12} md={12}>
 
              <div className="col-lg-12 col-sm-12 top-10 mb-10 ">
 
                <PageTitle title="File Reports" />
              </div>
            </Col>
          </Row>
          <div className="col-md-12">
            <Row className="top-30">
              <Col md={12}>
            <Card border="secondary" text="dark">
              <Card.Body>
              <Stack direction="horizontal" gap={2}>

                 
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>&nbsp;</Form.Label>
                    <Button variant="primary" onClick={this.ViewAll}>
                      {this.state.loading ? "Loading.." : "ViewAll"}
                    </Button>
                  
                  </Form.Group>


                  </Stack>
                <Stack direction="horizontal" gap={2}>
             <TableServices  rows={this.state.results} downloadCSV={this.downloadCSV} tablename="filereport"/> 
                </Stack>
                
              </Card.Body>
            </Card>
            </Col>
            </Row>
          </div>
          </Container>
         
      );
  
      
  }
}

export default FilesReports;
