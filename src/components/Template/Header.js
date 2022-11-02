import React, {Component} from 'react';
import UserMenu from '../General/Header/UserMenu';
import './template.css'; 

class Header extends Component {

    render(){
        return(
            <div className="header bg-dark">
                <div className='content-padding left col-md-4 col-sm-12' >
                    <h3 style={{lineHeight:'60px'}}>Test Management Tool</h3>
                </div>
                <div className="right m-right-15">
                    <UserMenu user={this.props.user} />
                </div>
                
            </div>
        )
    }

}
export default Header;