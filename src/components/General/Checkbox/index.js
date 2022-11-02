import React, { useState, useEffect } from 'react';
import { CheckOutlined  } from '@ant-design/icons';
import './checkbox.css';
const uniqid = require("uniqid");

function Checkbox(props) {
    const uniqid = require('uniqid');
   
    const checked = (isSelected)=>{
        if(isSelected){
            return <CheckOutlined/>
        }else{
            return ''
        }
    }
    if(props.isCheck !== undefined){
        return (
            <div key={ uniqid() }>
                <div className='cbox' key={uniqid()} onClick={() => props.changeValue(props.value)}>
                    {checked(props.isSelected)}
                </div>
            </div>
        )
    }else{
        return (
            <div key={ uniqid() }>
                <span key={ uniqid() } className='chkbx' onClick={() => props.changeValue(props.name)}>{ (props.status === 1) ? <span className='dot'></span> : '' }</span>
                <span key={ uniqid() } onClick={() => props.changeValue(props.name)}>{ props.value }</span>
                <div key={ uniqid() } className="clear"></div>
            </div>
        )
    }
    
}
export default Checkbox;
