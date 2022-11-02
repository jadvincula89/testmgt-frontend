import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import { PostData } from '../../utils/api/PostData';
import { GetData } from '../../utils/api/GetData';
import ForgotPassword from '../Pages/ForgotPassword';
import ChangePassword from '../Pages/ChangePassword';
import routes from '../../shared/routes';
import { ENV,TEST_SAMPLE_SESSION_ID,DynamicMenu } from '../../shared/constants';
import Drawer from '../General/Drawer/Drawer';
import Header from './Header';
import Cookies from 'universal-cookie';
import Login from '../Pages/Login';
import  ForbiddenComponent  from '../Pages/Forbidden/ForbiddenComponent';

const cookies = new Cookies();
class Main extends Component {
	/*
	 * The Main Component renders application routes
	 * Route list can be found in /src/shared/routes.js file
	 * If the current accessed URL is not found in routes file,
	 * 		this component will render a NotFound component
	 */
    constructor(props) {
		super(props)
		this.state = {
			email:'',
            password:'',
			access_token: '',
			name: '',
			UserAccess:'',
			hasAccess: false,
			loading: true
		};
		this.login = this.login.bind(this)
		this.changeValue = this.changeValue.bind(this)
	}

	 getKeyByValue= (value)=> {
		var UserAccess=JSON.parse(localStorage.getItem('UserAccess'));
 
        var newpath=value.split("/");
		let findpath=newpath[1];
		var nav_access="";
		var nav_name = "";
	 
 if(DynamicMenu[findpath]!==undefined){
	for (let i = 0; i < UserAccess["Maintainance"].sub_modules.length; i++) {
		nav_name = Object.keys(
			UserAccess["Maintainance"].sub_modules[i]
		  ).toString(); 
	nav_access = Object.values(
		UserAccess["Maintainance"].sub_modules[i]
	  ).toString();
     if(DynamicMenu[findpath]==nav_name){
	 
		 return nav_access;
		 break;
	 }
	}
	for (let i = 0; i < UserAccess["System Settings"].sub_modules.length; i++) {
		nav_name = Object.keys(
			UserAccess["System Settings"].sub_modules[i]
		  ).toString(); 
	nav_access = Object.values(
		UserAccess["System Settings"].sub_modules[i]
	  ).toString();
     if(DynamicMenu[findpath]==nav_name){
		 
		 return nav_access;
		 break;
	 }
	}
}
return;
}

	 componentDidMount(){
	
		/*persistStore(store, {}, () => {
            this.setState({rehydrated: true})
		});*/
	   this.InitAccessControl();
	   this.InitTestCaseExecEnabled();
	
	}
	InitTestCaseExecEnabled=()=>{
		let accessToken = cookies.get('accessToken');
		if(accessToken){
			GetData('test_exec',true).then((result) => {
				if(result.data.result.enabled !== undefined){
					localStorage.setItem('isEnabledTCexec',JSON.stringify(result.data.result.enabled));
					localStorage.setItem('isAdmin',JSON.stringify(result.data.result.isAdmin));
					this.setState({loading: false});
				}
			})
		}else{
			this.setState({loading: false})
		}
	}

    InitAccessControl=()=>{
		let accessToken = cookies.get('accessToken');
		if(accessToken){
			GetData('user-access',true).then((result) => {
				if(result.data.result !== undefined){
					localStorage.setItem('UserAccess',JSON.stringify(result.data.result));
					this.setState({loading: false, 'UserAccess':result.data.result,'hasAccess': ( localStorage.getItem('UserAccess').length >= 1 && accessToken !== undefined ) ? true : false});
				}else{
					
					localStorage.removeItem('UserAccess')
					cookies.remove('accessToken');
					window.location.href='/login';
					
				}
			})
		}else{
			this.setState({loading: false})
		}
		
	}
	login = () => {
        if(this.state.email !== '' && this.state.password !== ''){ 
			const payload = {
				'email' : this.state.email,
				'password' : this.state.password
			}
            PostData(ENV['AUTH'], payload, false).then((result) => {
				let responseJSON = result;
			
                if(responseJSON.access_token){

					const cookies = new Cookies();
					cookies.set('accessToken', responseJSON.access_token, { path: '/' });

                    //store.dispatch({type: ACTIONS.LOGIN_TOKEN, payload: responseJSON.login_token });
                    
					this.setState({
						hasSession : true, 
						access_token: responseJSON.access_token, 
						name: responseJSON.name
					})

					window.location.href="/";
                }else{
                    if(responseJSON.message){
                        this.setState({error: responseJSON.message});
                    }
                }
            })
        }
	}
	
	changeValue = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }
    renderRoute =()=>{
		let content = [];
		 
	     routes.map(element=>(
			content.push(
 <Route key={element.path} exact path={element.path} component={ this.getKeyByValue(element.path)!=='0' ? element.component : ForbiddenComponent}/>,

			)
		 ))
			
	return content;
}
    render() {
		var pathname = window.location.pathname;
		var split = pathname.split('/');

		if(this.state.hasAccess === true){
			if(localStorage.getItem('UserAccess')!==undefined){

			return(
				<div className='main-content bg-dark'>
					<div className="content-padding">
						<Header user={ this.state.name }/>
			    	{ (this.state.hasAccess)  ? <Drawer />	 : ''}
                        <div className="clear"></div>
						<div className="content-padding">
							<Switch>
									{
										this.renderRoute()
							 		}
									<Route/>
							</Switch>
						</div>
					</div>
				</div>
			)
	}
	}else if(this.state.hasAccess === false){
			if(split[1] === 'forgot-password'){
				return <ForgotPassword />
			}else if(split[1] === 'change-password'){
				return <ChangePassword /> ;
			}else{
				return ( this.state.loading === true )? "" :  <Login />
			}
			
		}else
			return (<div className='main-content bg-dark'>
				<div className="content-padding">	</div>
				</div>)	
   		}
}

export default Main;