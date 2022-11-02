import { keyboardImplementationWrapper } from '@testing-library/user-event/dist/keyboard';
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { GetData } from '../../utils/api/GetData';
import DynamicDataTable from '../General/DynamicDataTable';
import POTDataTable from '../General/POTDataTable';
import StaticDataTable from '../General/StaticDataTable';
import IssueTrackerDataTable from '../General/IssueTrackerDataTable';

const uniqid = require('uniqid');

function DummyTestData( props ) {
    const { code } = useParams();
    const [data, setData] = useState([]);
    const [statik, setStatic] = useState([]);
    const [dynamic, setDynamic] = useState([]);
    const [pot, setPot] = useState([]);
    const [issue, setIssue] = useState([]);

    useEffect(() => {
      
        if(code !== undefined && code !== ""){
           
            GetData('sc-test-data/'+code,true).then((result) => {
                let responseJSON = result.data;
                setData((responseJSON.result['test_data']['cloned'] !== undefined) ? responseJSON.result['test_data']['cloned'] : [])
                setStatic((responseJSON.result['test_data']['static'] !== undefined) ? responseJSON.result['test_data']['static'] : [])
                setDynamic(responseJSON.result['dynamic_data'])
                setPot(responseJSON.result['pot_data'])
                setIssue(responseJSON.result['issue_id_data'])
            });
        }
        
    }, []);
    
    const tableData = (data)=>{
        return (
            <table border="1">
            <thead>
                <tr key={ uniqid() }>
                    { cols(data[0]) }
                </tr>
            </thead>
            <tbody>
                { rows(data) }
            </tbody>
        </table>
        );

    }
    const rowBg = (key) => {
        return (key % 2 == 0) ? 'dark' : 'light';
    }

    const rows = (data) => {
        let content = [];
        
        // data.map((i,key)=>{
        //     content.push(
        //         <tr key={ uniqid()}>
        //             {/* { rowData(i, key) } */}
        //         </tr>
        //     )
        // })
       
        

        return content;

    }

    const rowData = (data,k) => {
        let content = [];

        Object.keys(data).forEach(function(k) {
            content.push(<td className={ rowBg(k) } key={uniqid()}>{ (data[k] !== undefined) ? data[k] : ""}</td>)
            // console.log(data[k])
        })

        return content;
    }
    const cols = (columns)=>{
        var content = [];

        Object.keys(columns).forEach(function(key) {
            content.push(<th key={uniqid()}>{key}</th>);
        });

        return content;
    }

    
    return (
        <table className='testdatatbl'>
            <tr>
                <th className='half' >{ (data.length >= 1) ? 'CLONED STATIC DATA' : 'SELECTED STATIC DATA' }</th>
                <th className='half'>DYNAMIC DATA</th>
                
            </tr>
            <tr>
                <td style={{backgroundColor:'#ebebeb',verticalAlign:'top' , position:'relative'}}>
                    { ( data.length >= 1 ) ? 
                        <div>
                            <div style={{minHeight:'500px'}}><StaticDataTable data={data[0]} /></div>
                            <div className='absolute' style={{left:'0px', width:'100%'}}>
                                <div  style={{background:'#8bbb11',marginTop:'15px', lineHeight:'40px', padding:'5px', fontWeight:'bold'}}>SELECTED STATIC DATA</div>
                                { ( statik.length >= 1 ) ? <div style={{minHeight:'500px'}}><StaticDataTable data={statik[0]} /></div> : <div style={{minHeight:'500px',backgroundColor:'#ebebeb'}}>No selected data Set found.</div> } 
                            </div>
                        </div>
                        :    

                        ( statik.length >= 1 ) ? <div style={{minHeight:'500px'}}><StaticDataTable data={statik[0]} /></div> : <div style={{minHeight:'500px',backgroundColor:'#ebebeb'}}>No selected data Set found.</div>
                    }
                </td>
                <td style={{backgroundColor:'#ebebeb',verticalAlign:'top', position:'relative' }}>
                    { ( dynamic.length >= 1 ) ? <DynamicDataTable data={ dynamic }/> : <i>No dynamic data added.</i>   }  
                    
                    <div className='absolute' style={{left:'0px', width:'100%'}}>
                        <div  style={{background:'#8bbb11',marginTop:'15px', lineHeight:'40px', padding:'5px', fontWeight:'bold'}}>PROOF OF TEST</div>
                        { ( pot.length >= 1 ) ? <POTDataTable data={ pot }/> : <div style={{backgroundColor:'#ebebeb'}}><i>No proof os test added.</i></div>   }  

                        <div  style={{background:'#8bbb11',marginTop:'15px', lineHeight:'40px', padding:'5px', fontWeight:'bold'}}>ISSUE TRACKER ID</div>
                        { ( issue.length >= 1 ) ? <IssueTrackerDataTable data={ issue }/> : <div style={{backgroundColor:'#ebebeb'}}><i>No issue tracker id added.</i></div>   }  
                    </div>
                   
                </td>
            </tr>
            {/* <tr className='half'>
                <th style={{backgroundColor:'#8bbb11',verticalAlign:'top' }} >POT</th>
            </tr> */}
        </table>
    )
}
export default DummyTestData;
