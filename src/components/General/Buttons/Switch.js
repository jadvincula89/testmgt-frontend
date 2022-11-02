import React from 'react';
import Switch from "react-switch";
export default function SwitchButton(props) {
    
    var checked = (props.checked === 'false' || props.checked === false) ? false : (props.checked === 'true' || props.checked === true) ? true : '';
    if(checked !== null && checked !== ''){
        return (
            <div className='right'>
                <Switch onChange={props.handleChange} checked={ checked } />
    
            </div>
            
        )
    }else{
        window.location.reload();
    }
    
}
