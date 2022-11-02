import React, { Component } from "react";
import { Link } from "react-router-dom";
import { GetData } from '../../../utils/api/GetData';
import { ENV,TEST_SAMPLE_SESSION_ID } from '../../../shared/constants';
import MenuComponent from "./MenuComponent";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import Cookies from 'universal-cookie';
const cookies = new Cookies();
class DrawerNav extends Component {
  constructor(props) {
		super(props)
		this.state = {
			hasAccess:false,
        Maintenance:false,
        RequestDivision:false,
        BusinessAnalyst:false,
        SystemAnalyst:false,
        Developer:false,
        DeveloperSupervisor:false
      }
    };
 
 
	

  IsAllowed(type, subtype) {
    
    var allowed = false;
    var UserAccess=JSON.parse(localStorage.getItem('UserAccess'));
    
    if(UserAccess !== undefined){
     
      //this.props.UserAccess["Maintenance"].sub_modules
      var nav_name = "";
    
      var nav_access = "";
      if (type === subtype) {
        var UserAccess=JSON.parse(localStorage.getItem('UserAccess'));
        
        allowed =  UserAccess[type].access.toString();
      } else {
          for (var i = 0; i < UserAccess[type].sub_modules.length; i++) {
            nav_name = Object.keys(
              UserAccess[type].sub_modules[i]
            ).toString(); 
            nav_access = Object.values(
              UserAccess[type].sub_modules[i]
            ).toString();
            
            if (nav_name === subtype) {
              if (nav_access === "true") {
                allowed = true;
                break;
              } else allowed = false;
            }
          }
      }
      return allowed; 
    }else
      return allowed;
    }
 
  componentDidMount() {

    this.setState({Maintenance:this.IsAllowed("Maintainance", "Maintainance")});
    this.setState({RequestDivision:this.IsAllowed("Maintainance", "Request Division")});
    this.setState({BusinessAnalyst:this.IsAllowed("Maintainance", "Business Analyst")});
    this.setState({SystemAnalyst:this.IsAllowed("Maintainance", "System Analyst")});
    this.setState({Developer:this.IsAllowed("Maintainance", "Developer")});
    this.setState({DeveloperSupervisor:this.IsAllowed("Maintainance", "Developer Supervisor")});
  }
  gotoIconLink = (e) => {
    if(e === 'dashboard'){
      window.location.href='/';
    }
  }
  render() {
    
      return (
        <SideNav
          onSelect={(selected) => {
            // Add your code here
          }}
          className="bg-dark-gray"
        >
          <SideNav.Toggle />
          <SideNav.Nav defaultSelected="home">
            
         
           <MenuComponent module_name={'Dashboard'}/>
            <MenuComponent module_name={'Maintainance'}/>
            <MenuComponent module_name={'System Settings'}/>
          
           
          </SideNav.Nav>
        </SideNav>
      );
  
  }
}
export default DrawerNav;
