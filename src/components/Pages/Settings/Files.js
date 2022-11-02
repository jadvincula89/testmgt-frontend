import React, { Component } from "react";
import { CaretDownOutlined } from "@ant-design/icons";
import PageTitle from "../../General/PageTitle";
import { UploadData } from "../../../utils/api/UploadData";
import { Notification } from "../../../utils/api/Notification";
import { ENV, TEST_SAMPLE_SESSION_ID } from "../../../shared/constants";
import Cookies from "universal-cookie";
import Stack from "react-bootstrap/Stack";

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

const cookies = new Cookies();
class Files extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAllowed: true,
      selectedFile: null,
      filetype: 0,
      loading: false,
      
    };
  }
  onFileTypeChange = (event) => {
    this.setState({ filetype: event.target.value});
  };
  onFileChange = (event) => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0]});
  };
   


   onFileUpload = () => {
    const formData = new FormData();

    // Update the formData object

    if (this.state.filetype !== "0" && this.state.selectedFile) {
      this.setState({ loading: true });
      let accessToken = cookies.get("accessToken");
      formData.append(
        "file",
        this.state.selectedFile,
        this.state.selectedFile.name
      );
      formData.append("id", this.state.filetype);
     let check=0;
      UploadData("uploading-file-api", formData, true)
        .then((result) => {
          let responseJSON = result;
        check=1;
          if (result.success == true) {
            Notification('File successfully uploaded','success');
          } 
          if (result.success == false) {

            Notification('Failure to Upload the File','error')
      
          } 

          this.setState({ loading: false });
        })
        .catch((error) => {
          console.log("error");
        });
    
    }

  };
  componentDidMount() {

  }
  render() {

      return (
        <Container fluid>
          <Row className="top-30 separator-border">
            <Col xs={12} md={12}>
 
              <div className="col-lg-12 col-sm-12 top-10 mb-10 ">
 
                <PageTitle title="Upload Files" />
              </div>
            </Col>
          </Row>
          <div className="col-md-12">
            <Row className="top-30">
              <Col md={12}>
                <Card border="secondary" text="dark">
                  <Card.Body>
                    <Stack direction="horizontal" gap={2}>
                      <Form.Group
                        className="mb-3"
                        controlId="formGroupDescription"
                      >
                        <Form.Label>File Type</Form.Label>
                        <Form.Select onChange={this.onFileTypeChange}>
                          <option value="0">--Select File--</option>
                          <option value="1">1.Test Scenario File</option>
                          <option value="2">2.Test Cases Execution File</option>
                          <option value="3">3.Test Steps File</option>
                          <option value="4">4.Test Data File</option>
                        </Form.Select>
                      </Form.Group>
                      <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>CSV File</Form.Label>
                        <Form.Control
                          type="file"
                          onChange={this.onFileChange}
                        />
                      </Form.Group>
                      <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>&nbsp;</Form.Label>
                        <Button variant="primary" onClick={this.onFileUpload}>
                          {this.state.loading ? "Loading.." : "Upload"}
                        </Button>
                      </Form.Group>
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

export default Files;
