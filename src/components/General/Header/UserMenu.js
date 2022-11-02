import React, {Component} from 'react';
import { CaretDownOutlined } from '@ant-design/icons';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { PostData } from '../../../utils/api/PostData';
/*import { connect } from 'react-redux';
import { loginToken } from '../../../redux/actions/loginToken';
import  store from '../../../redux/store';
import { ACTIONS } from '../../../redux/constants';*/
import Cookies from 'universal-cookie';
import Pusher from 'pusher-js';

/*
const mapDispatchToProps = dispatch => ({
    login : () => dispatch(loginToken())
})*/
class UserMenu extends Component {
    constructor(props) {
		super(props)
		this.state = {
            isOpen : false,
            usertoken:'',
            notifycount: 0,
            message:'',
        }
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }
    componentDidMount(){
  
        document.addEventListener('mousedown', this.handleClickOutside);
        const pusher = new Pusher(
            process.env.REACT_APP_APP_KEY, {
            cluster: process.env.REACT_APP_CLUSTER,
            encrypted: true
          });
          const channel = pusher.subscribe( process.env.REACT_APP_CHANNEL);
          channel.bind( process.env.REACT_APP_EVENT, data => {
            const cookies = new Cookies();
            let accessToken = cookies.get('accessToken');
            let username=cookies.get('u_name');

          if(username==data.username){
            this.setState({'usertoken':data.token,'notifycount':data.notifycount,'message':data.message});

          }
           
           
          });
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }
    handleClickOutside(event) {
        
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({isOpen: false});
        }else{
            this.setState({isOpen: true});
        }
    }
    handleClick(){
        this.setState({ isOpen : !this.state.isOpen })
    }
    logout(){
        const cookies = new Cookies();
        
        PostData('logout', { 'session': cookies.get('accessToken') }, false).then((result) => {
            
            if(result.result !== null){
                localStorage.removeItem('UserAccess')
                cookies.remove('accessToken');
                window.location.href='/login';
            }
        })

       
    }
    render(){
        const cookies = new Cookies();
        return(
            <div>
              
         
   <span className="hover" onClick={() => this.handleClick()}>{ /*this.props.user*/ } 
                {cookies.get('u_name')}  { this.state.notifycount>0 && 
                  <OverlayTrigger
                  key={'right'}
                  placement={'left'}
                  overlay={
                    <Tooltip id={`tooltip-left`}>
                    Test ID : <strong>{this.state.message} </strong> was Completed.
                    </Tooltip>
                  }
                >
                <a className="notification"> <span className="badger"><b>{'!'}</b>
                </span>
          
                <CaretDownOutlined /></a> 
                </OverlayTrigger>
                }</span>
               
                <div className={ (this.state.isOpen === false) ? 'hide' : '' } style={{position:'relative'}} ref={this.setWrapperRef}>
                    <ul className="ul-usermenu bg-gray">
                        <li onClick={() => this.logout()}>Logout</li>
                    </ul>
                </div>
              
            </div>
        )
    }

}

//export default connect(mapDispatchToProps)(UserMenu);
export default UserMenu;