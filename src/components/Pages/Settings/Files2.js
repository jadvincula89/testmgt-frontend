import React, { Component } from "react";
import { CaretDownOutlined } from "@ant-design/icons";
import PageTitle from "../../General/PageTitle";
import { UploadData } from "../../../utils/api/UploadData";
import { ENV, TEST_SAMPLE_SESSION_ID } from "../../../shared/constants";
import Cookies from "universal-cookie";
import Stack from "react-bootstrap/Stack";
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

const cookies = new Cookies();
class Files extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAllowed: true,
      selectedFile: null,
      filetype: 0,
      loading: false,
      show: false,
      success: false,
    };
  }
  onFileTypeChange = (event) => {
    this.setState({ filetype: event.target.value, loading: false });
  };
  onFileChange = (event) => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0], loading: false });
  };
  setShow = (isBoolean) => {
    this.setState({ show: isBoolean });
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

      UploadData("uploading-file-api", formData, true)
        .then((result) => {
          let responseJSON = result;

          if (result.success == true) {
            this.setState({ success: true });
            this.setState({ show: false });
          } else {
            this.setState({ show: true });
          }

          this.setState({ loading: false });
        })
        .catch((error) => {
          console.log("error");
        });
    }
  };
  componentDidMount() {
    // this.setState({isAllowed:UserRestriction("System Settings", "Access Roles")});
  }
  render() {
    if (this.state.isAllowed === true) {
      return (
        <Container fluid>
          <Row className="top-30 separator-border">
            <Col xs={12} md={12}>
              <div className="col-lg-12">
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
                    <Alert variant="danger" show={this.state.show}>
                      <p>Failure to Upload file. Please try again</p>
                    </Alert>
                    <Alert
                      variant="success"
                      show={this.state.success && this.state.show === false}
                    >
                      <p>File successfully uploaded</p>
                    </Alert>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      );
    } else
      return (
        <Container fluid>
          <Row>
            <Col xs={12} md={12}>
              <Card border="secondary" text="dark">
                <Card.Body>
                  <Card.Title>
                    <div className="col-lg-12 top-10 mb-10 ">
                      <PageTitle title="Access Forbidden" />
                    </div>
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      );
  }
}

export default Files;
