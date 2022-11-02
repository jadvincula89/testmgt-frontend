import React, { Component } from "react";

import PageTitle from "../../General/PageTitle";
import { UserRestriction } from "../../../shared/UserRestriction";
import DropDownServices from "./DropDownServices";
 
import BasicBtn from '../../General/Buttons/BasicBtn';
import "./style.css";
import {
  Alert,
  Form,
  Button,
  Card,
  Col,
  Row,
  Container,
  InputGroup,
} from "react-bootstrap";
import { FadeLoader } from "react-spinners";
import Cookies from "universal-cookie";
import { PostData } from "../../../utils/api/PostData";

//import exportFromJSON from 'export-from-json';
import {Excel} from '../../../shared/Excel';
import { GetData } from "../../../utils/api/GetData";
import TableServices from "./TableServices";

const cookies = new Cookies();

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isAllowed: 0,
      username: "",
      fullname:"",
      email: "",
      contactno: "",
      usergroup: "",
      error: false,
      success: false,
      Users: [],
      GroupList: [],
      groupId: 0,
      touched: false,
    };
  }
  ValidateEmail = (input) => {
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (input.match(validRegex)) {
      return true;
    } else {
      return false;
    }
  };
  Validation = (params, type = 1) => {
    const { touched, username, fullname, email, contactno, usergroup } =
      this.state;
    if (type == 0) {
      if (
        params === "all" &&
        (fullname === "" || username === "" || email === "" || contactno === "")
      ) {
        this.setState({ touched: true });
        return false;
      } else this.setState({ touched: true });
      return true;
    }
    if (type === 1) {
      let isValid = false;
      if (params === "username") {
        isValid = username !== "" ? true : false;
      }
      if (params === "fullname") {
        isValid = fullname !== "" ? true : false;
      }

      if (params === "email") {
        isValid = this.ValidateEmail(email) ? true : false;
      }
      if (params === "contactno") {
        isValid = contactno !== "" ? true : false;
      }
      if (params === "usergroup") {
        isValid = usergroup !== "" ? true : false;
      }

      if (this.state.touched === true && !isValid)
        return (
          <span className="error text-danger">{params} field is required</span>
        );
      else return true;
    }
  };
  onValueChange = (event) => {
    switch (event.target.name) {
      case "username":
        this.setState({ username: event.target.value });
        break;
      case "fullname":
        this.setState({ fullname: event.target.value });
        break;
      case "email":
        this.setState({ email: event.target.value });
        break;

      case "email":
        this.setState({ email: event.target.value });
        break;
      case "contactno":
        this.setState({ contactno: event.target.value });
        break;
      case "usergroup":
        this.setState({ usergroup: event.target.value });
        break;
    }

    //this.setState({ filetype: event.target.value, loading: false });
  };
      ExportToExcel =async ()=> {
      // setLabel('Loading...')
         var datas=await GetData('downloaduser', true).then((response) => {
        
         var date=new Date().getTime();
         var exportType = 'excel';  
             var fileName = 'LoggedInUsers_'+date;  
            if(response.data.result!==null){
    // exportFromJSON({ data: response.data.result, fileName: fileName, exportType:'xls'})
     Excel(response.data.result,fileName);
            }
        
              // setLabel('Export Flat File');
        })
            
    }
  GetSingleUser = () => {
    const payload = {
      u_name: this.state.username,
    };
         this.setState({ isLoading: true });
    PostData("search-user", payload, true)
      .then((response) => {
      let state=response.result;
        if ((response.result.status = 200)) {
          this.setState({
            isLoading: false,
            username: state.u_name,
            fullname: state.name,
            email: state.email,
            contactno: state.contact_no,
            groupId: state.grp_id
          });
            this.GetUsers();
        }
        
      })
      .catch((error) => {
        console.log("error");
        this.setState({isLoading: false });
      });
  };
  GetUserGroup = () => {
    GetData("user-groups/1", true).then((result) => {
      let responseJSON = result.data;

      this.setState({ GroupList: responseJSON.result });
    });
  };
  DropDownFunction = (e) => {
    this.setState({ groupId: e });
  };
  SaveUser = () => {
    let isvalid = this.Validation("all", 0);
    if (this.state.isLoading === false && isvalid) {
      this.setState({ isLoading: true, touched: true });
      let accessToken = cookies.get("accessToken");
      const payload = {
        session_id: accessToken,
        u_name: this.state.username,
        name: this.state.fullname,
        email: this.state.email,
        contact_no: this.state.contactno,
        grp_id: this.state.groupId,
      };

      PostData("user", payload, true)
        .then((response) => {
          if ((response.result.status = 200)) {
            this.setState({ success: true, error: false });
            this.setState({ isLoading: false });
            this.setState({ isLoading: false, touched: false });
                this.GetUsers();
          }
          if (response.result.status != 200) {
            this.setState({ isLoading: false, touched: true });
          
          }
        })
        .catch((error) => {
          console.log("error");
          this.setState({ success: false, error: true, isLoading: false });
        });
    }
  };
  getUser = (data) => {
    this.setState({
      username: data.u_name,
      fullname: data.name,
      email: data.email,
      contactno: data.contact_no,
      groupId: data.grp_id,
    });
 
  };
  GetUsers = () => {
    this.setState({ isLoading: true });
    let accessToken = cookies.get("accessToken");
    if (accessToken) {
      GetData("userlist", true).then((result) => {
        let responseJSON = result.data;

        this.setState({ Users: responseJSON.result });
        this.setState({ isLoading: false });
      });
    }
  };
  componentDidMount() {
    UserRestriction("System Settings", "Users").then((x) => {
      this.setState({ isAllowed: x });
    });

    this.GetUsers();
    this.GetUserGroup();
  }
  render() {
    const { touched, username, fullname, email, contactno, groupId } =
      this.state;
    return (
      <Container fluid>
        <Row className="top-30 separator-border">
          <Col xs={12} md={12}>
            <div className="col-lg-12 col-sm-12 top-10 mb-10 ">
              <PageTitle title="Users" />
            </div>
          </Col>
          <Alert variant="danger" show={this.state.error}>
            <p>Error Please try again</p>
          </Alert>
          <Alert variant="success" show={this.state.success}>
            <p>User was saved successfully</p>
          </Alert>
        </Row>

        <div className="col-md-12">
          <Row className="top-30">
            <Col xs={6} md={4}>
              <Card border="secondary" text="dark">
                <Card.Body>
                  <Card.Title>Add User</Card.Title>

                  <Form>
                    <Form.Label>Username<span className='text-color-red'>*</span></Form.Label>
                    <InputGroup className="mb-2">
                      <Form.Control
                        placeholder="Search username"
                        onChange={this.onValueChange}
                        aria-describedby="basic-addon2"
                        name="username"
                        value={username}
                      />
                      <span
                        className="input-group-text user-span"
                        id="basic-addon2"
                        onClick={this.GetSingleUser}
                      >
                        Fill in
                      </span>
                      <Form.Text className="text-muted" type="text"></Form.Text>
                      {this.Validation("username")}
                    </InputGroup>

                    <Form.Group
                      className="mb-3"
                      controlId="formGroupDescription"
                    >
                      <Form.Label>Full Name<span className='text-color-red'>*</span></Form.Label>
                      <Form.Control
                        name="fullname"
                        value={fullname}
                        onChange={this.onValueChange}
                        type="text"
                      />
                      {this.Validation("fullname")}
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="formGroupDescription"
                    >
                      <Form.Label>Email Address<span className='text-color-red'>*</span></Form.Label>
                      <Form.Control
                        type="text"
                        name="email"
                        value={email}
                        onChange={this.onValueChange}
                      />
                      {this.Validation("email")}
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="formGroupDescription"
                    >
                      <Form.Label>Contact Number<span className='text-color-red'>*</span></Form.Label>
                      <Form.Control
                        type="text"
                        name="contactno"
                        value={contactno}
                        onChange={this.onValueChange}
                      />
                      {this.Validation("contactno")}
                    </Form.Group>
                    <DropDownServices
                      combolist={this.state.GroupList}
                      value={groupId}
                      dropdownvalue={this.DropDownFunction}
                    />

                    <div className="d-flex align-content-start flex-wrap">
                      {this.state.isAllowed > 1 && (
                        <Button variant="success" onClick={this.SaveUser}>
                          {this.state.loading ? "Loading.." : "Submit"}
                        </Button>
                      )}
                    </div>
                  </Form>

                  <span
                    className="spinner-holder absolute"
                    style={{ position: "fixed", zIndex: "999" }}
                  >
                    <FadeLoader
                      style={{
                        display: "block",
                        margin: "0 auto",
                        borderColor: "red",
                      }}
                      sizeUnit={"px"}
                      size={10}
                      color={"#ca5d41"}
                      loading={this.state.isLoading}
                    />
                  </span>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={8}>
              <Card border="secondary">
                  	<div className=" col-sm-2  mt-3">
									<BasicBtn title="Export to Excel" onClick={this.ExportToExcel} />  
								</div>
                <Card.Body>
                
                  <TableServices
                    rows={this.state.Users}
                    tablename="user"
                    getUser={this.getUser}
                  />
                        
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    );
  }
}

export default Users;
