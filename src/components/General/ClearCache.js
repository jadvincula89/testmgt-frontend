import React, { useState } from 'react';
import { GetData } from '../../utils/api/GetData';
import Cookies from 'universal-cookie';
import {
    DeleteOutlined,LoadingOutlined, SecurityScanTwoTone
} from "@ant-design/icons";
import { clear } from '@testing-library/user-event/dist/clear';

const cookies = new Cookies();
export default function ClearCache() {
    const [load , setLoad] =  useState(false);

    const clear = () => {
        let uname = cookies.get('u_name');
        setLoad(true)
        GetData("cache-delete/"+uname, true).then((result) => {
            if(result.status){
                setLoad(false)
                window.location.reload();
            }
        })
    }

    return (
        <div className='right bg-green text-color-white bold hover' style={{padding:'3px', borderRadius:'3px'}} onClick={ ()=>clear() }>
            {
                (load === true) ? <LoadingOutlined style={{color:'#fff',fontSize:'18px',float:'left'}}/> : 
                <DeleteOutlined style={{color:'#fff',fontSize:'18px',float:'left'}}/>
                
            }
            <span className='right'>Clear Cache Data</span>
            <div className='clear'></div>
        </div>
        
    )

}