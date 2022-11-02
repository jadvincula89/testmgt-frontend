import React, {Component} from 'react';
import { CaretDownOutlined } from '@ant-design/icons';
import PageTitle from '../../General/PageTitle';
import { PostData } from '../../../utils/api/PostData';
import { GetData } from '../../../utils/api/GetData';
import { FadeLoader } from 'react-spinners';
import { UserRestriction } from '../../../shared/UserRestriction';
import  ForbiddenComponent  from '../Forbidden/ForbiddenComponent';

import DropDownServices from  "./DropDownServices";
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

import Cookies from 'universal-cookie';
const cookies = new Cookies();
class Roles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading:false,
      isAllowed:0,
      groupId:0,
     RoleList:[],
     GroupList:[],
    };
    
  }
    componentDidMount(){
      this.setState({isAllowed:UserRestriction("System Settings", "Access Roles")});
      this.GetUserGroup();
      if(this.state.groupId>0){
      this.GetRoles(0);
      }
      }
      GetRoles=(params)=>{
        this.setState({ isLoading: true });
    if(params>0){

        GetData('user-roles/'+params,true).then((result) => {
          let responseJSON = result.data;
           this.setState({ RoleList:responseJSON.result,isLoading: false});
      
        })
      }
      }
      DropDownFunction=(e)=>{
 
      this.setState({groupId:e});
      this.GetRoles(e);
      }
      RWExchange=(a,b,rw)=>{
 
     let accessToken = cookies.get('accessToken');
     const payload = {
       'submodule_id' : a,
       'readwrite' : rw,
       'rwcode':b,
       'group_id': this.state.groupId,
       'session_id' : accessToken
     }
     PostData('save-role', payload, true).then((result) => {
 
       this.setState({ isLoading: false });
       this.GetRoles(this.state.groupId);
       })
   
      }
      GetUserGroup=()=>{
     
    
        GetData('user-groups/1',true).then((result) => {
          let responseJSON = result.data;
          
           this.setState({ GroupList:responseJSON.result});
        
          
        })
      
      }
    render() {
   
        return (
          <Container fluid>
             <Row className="top-30 separator-border">
                <Col xs={12} md={12}>
 
                    <div className="col-lg-12 col-sm-12 top-10 mb-10 ">
 
                        <PageTitle title="Access Roles"/>
                    </div>
                </Col>
            </Row>
           
            <Row>
           
              <Col xs={12} md={12}>
                <Card border="secondary">
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
                  <Col xs={2} md={2}>
                  <DropDownServices combolist={this.state.GroupList} value={this.state.groupId} dropdownvalue={this.DropDownFunction}  />
              </Col>
              <TableServices  rows={this.state.RoleList} tablename="roles" roleCallback={this.RWExchange}/> 
               
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        );
        
      
      
  }

}

export default Roles;