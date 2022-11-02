import React, { Component } from "react";
import { PostData } from '../../../utils/api/PostData';
import { GetData } from '../../../utils/api/GetData';
import { FadeLoader } from 'react-spinners';
import { ENV, TEST_SAMPLE_SESSION_ID } from '../../../shared/constants';
import { CaretDownOutlined } from "@ant-design/icons";
 
import PageTitle from "../../General/PageTitle";
import { UserRestriction } from '../../../shared/UserRestriction';
import TableServices from  "./TableServices";
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

const cookies = new Cookies();
class UserGroups extends Component {
  constructor(props) {
    super(props);
    this.state = {
			group_name : '',
      desc : '',
      isAllowed:0,
      isLoading:false,
      GroupList:[]
    };
    
		this.changeValue = this.changeValue.bind(this)
    this.submit = this.submit.bind(this)
    
  }

  changeValue = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  componentDidMount(){

  this.GetUserGroup();
	}
  GetUserGroup=()=>{
    this.setState({ isLoading: true });

    GetData('user-groups/0',true).then((result) => {
      let responseJSON = result.data;
      
       this.setState({ GroupList:responseJSON.result});
 
        if(result.status===200){
          this.setState({ isLoading: false });        
       }
           
 
      
    })
  
  }                          
  submit = () => {
    if(this.state.group_name !== '' && this.state.desc !== ''){
      this.setState({ isLoading: true });
      let accessToken = cookies.get('accessToken');
      const payload = {
				'group_name' : this.state.group_name,
        'description' : this.state.desc,
     
			}
      PostData('save-group', payload, true).then((result) => {
        let responseJSON = result;
        this.setState({ GroupList:responseJSON.result});
        this.setState({ isLoading: false });
      
        })
    } 
  }

  render() {
 
   
    return (
      <Container fluid>
        <Row className="top-30 separator-border">
                <Col xs={12} md={12}>
 
                    <div className="col-lg-12 col-sm-12 top-10 mb-10 ">
 
                        <PageTitle title="User Groups"/>
                    </div>
                </Col>
            </Row>
      
        <div className="col-md-12">
            <Row className="top-30">
          <Col xs={6} md={4}>
            <Card border="secondary" text="dark">
              <Card.Body>
              <span className="spinner-holder absolute" style={{position:'fixed',zIndex:'999'}}>
                                <FadeLoader
                                    style={{display: 'block', margin: '0 auto', borderColor: 'red'}}
                                    sizeUnit={"px"}
                                    size={10}
                                    color={'#ca5d41'}
                                    loading={this.state.isLoading}
                                />
                                
                            </span>
                <Card.Title>Add User Group</Card.Title>
               
                  <Form>
                    <Form.Group className="mb-3" controlId="formGroupName">
                      <Form.Label>Group Name<span className='text-color-red'>*</span></Form.Label>
                      <Form.Control type="text" onChange={this.changeValue} name="group_name"/>
                      <Form.Text className="text-muted"> 
                    
                      </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGroupDescription">
                      <Form.Label>Group Description<span className='text-color-red'>*</span></Form.Label>
                      <Form.Control type="text" onChange={this.changeValue} name="desc"/>
                    </Form.Group>
                    <div className="d-flex align-content-start flex-wrap">
                    <Button variant="success" type="button" onClick={this.submit}>
                      Submit
                    </Button>
                    </div>
                  </Form>
               
             
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={8}>
            <Card border="secondary">
              <Card.Body>
              <TableServices  rows={this.state.GroupList} tablename="usergroup"/>    
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
      </Container>
    );
     
  }
}

export default UserGroups;
