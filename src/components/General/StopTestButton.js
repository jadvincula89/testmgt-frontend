import React, { useState } from 'react';
import Switch from './Buttons/Switch';
import ConfirmModal from './Modals/ConfirmModal';
import { PostData } from '../../utils/api/PostData';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
export default function StopTestButton(props) {
    const [isEnabled,setIsEnabled]= useState(localStorage.getItem('isEnabledTCexec'));
    const [ showConfirm, setshowConfirm ] = useState(false);
    const [ confirmText, setconfirmText ] = useState(false);
    
    
    const handleChange = () => {
        let availability = (isEnabled === true || isEnabled === 'true') ? !Boolean(isEnabled) : Boolean(isEnabled);
        
        setIsEnabled(availability)
        setshowConfirm(true)
        setconfirmText( ( availability === true ) ? "Are you sure you want to START execution for all test cases?" : "Are you sure you want to STOP execution for all test cases?" )
    }
    const save = () => {
        let payload = {
            'isEnabled' : isEnabled
        }
        PostData('enable-test-execution', payload, true).then((result) => {
            
                localStorage.removeItem('isEnabledTCexec')
                localStorage.removeItem('isAdmin')
                
                window.location.reload();
            
        })
    }
    const close = () => {
        setshowConfirm(false)
    }

    const btn = ()=>{
        if(localStorage.getItem('isAdmin') === true ||  
            localStorage.getItem('isAdmin') === 'true'){
            return(
                <div className='right m-15 text-color-white bold'>
                    Enable Test Execution: &nbsp;
                    <Switch handleChange={ handleChange } checked={isEnabled}/>
                    <div className='clear'></div>
                </div>
            )
        }
    }
    return (
        <div>
            <ConfirmModal 
                title = "Start/Stop Test execution" 
                text = { confirmText }
                save = {save}
                close = {close}
                isOpen = { showConfirm }
            />
            {btn()}
            
            
        </div>
        
    )
}
