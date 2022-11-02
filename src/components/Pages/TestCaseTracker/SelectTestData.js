
import React, { useState } from 'react';
import BasicBtn from '../../General/Buttons/BasicBtn';
import ExitBtn from '../../General/Buttons/ExitBtn';
import Checkbox from '../../General/Checkbox';
import DynamicDataTable from '../../General/DynamicDataTable';
import { PostData } from '../../../utils/api/PostData';
import StaticDataTable from '../../General/StaticDataTable';
const uniqid = require('uniqid');

function SelectTestData(props) {
    const columns = props.sc_test_data['columns'];
    const data = props.sc_test_data['data'];
    const [selectedId , setSelectedId] =  useState("");

    const tableData = (columns)=>{
        
        return (
            <table border="1">
            <thead>
                <tr key={ uniqid() } className='d-flex'>
                    { cols(columns) }
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
        
        data.map((i,key)=>{
           
                content.push(
                    <tr key={ uniqid()} className='d-flex'>
                        
                       { rowsTd(i, key) }
                    </tr>
                )
            
        })

        return content;

    }
    const rowsTd = (i, key) =>{
        let content = [];
        
        columns.map((c,k) => {
            content.push( rowData(i, c, key) )
        })
        return content;
    }
    const changeValue = (e) =>{
        setSelectedId(e)
    }
    const rowData = (data,col, k) => {
        let content = [];
        if(data[col] !== undefined){
            let width = (col === 'Payment details') ? 'col-3' : 'col-1';
            if(col !== 'td_srcrow' && col !== 'td_status'){
                content.push( (col !== 'td_id') ? <td className={ rowBg(k)+' '+width } key={uniqid()}><pre>{data[col]}</pre></td> : <td className={ rowBg(k)+' '+width }> <Checkbox value="" status={ (k === selectedId) ? 1 : 0  } name={k} changeValue={changeValue}/></td>)
            }
        }
        
        return content;
    }
    const cols = (columns)=>{
        var content = [];
        content.push( <th key={uniqid()} className="col-1"></th> )
        columns.map((col)=>{
            content.push( ( col !== 'td_id' && col !== 'td_srcrow' && col !== 'td_status') ? <th key={uniqid()} className={ (col === 'Payment details') ? 'col-3' : 'col-1' }>{ ( col !== 'td_id' ) ? col : ""}</th> : "")
        })

        return content;
    }
    const cardContent = (data) => {
        let content = [];
        if(data !== null && data !== undefined){
            Object.keys(data).forEach(function(k) {

                content.push(<div key={uniqid()}><b>{ 
                    ( data[k] !== "" && 
                        k !== 'td_id' && 
                        k !== 'td_srcrow' &&
                        k !== 'td_status' 
                        && k !== 'td_spr_scenario') ? k+': ' : "" }</b><pre>{ ( data[k] !== "" && 
                        k !== 'td_id' && 
                        k !== 'td_srcrow' &&
                        k !== 'td_status' 
                        && k !== 'td_spr_scenario') ? data[k] : "" 
                    }</pre></div>)

            })
        }else{
            content.push(<p>Please select Test Data.</p>)
        }
        

        return content;
    }
    const cardData = (data) =>{
        return(
            <StaticDataTable data={data[selectedId]} />
        );    
       
    }
    const saveTestData = () =>{
        if(selectedId !== ""){

            const payload ={
                sc_id : props.sc_id,
                td_id :data[selectedId].td_id,
                tc_id : props.tc_id
            }
            PostData('save-td', payload, true).then((result) => {
                
                
                window.location.href="/";
                
                
            })
        }
    }
    const dynamicTd = () =>{
        return <div  key={uniqid()} style={{ color:'#000',padding: '15px'}} className='top-15'></div>
    }
    return(
        <div>
                Please Select (1) Test Data for this scenario.
                <div className='col-md-12'>
                    <div className='col-md-12 margin-center scroll'>{ ( columns.length >= 1 ) ? tableData( columns ) : <i className='text-color-red bold'>No Uploaded Test Data on this Scenario. Please contact the Test Manager.</i> } </div>
                    <div className='col-md-11 margin-center top-15'>
                        <table>
                            <tr>
                                <th>Selected Test Data</th>
                                <th>Dynamic Test Data from Scenario</th>
                            </tr>
                            <tr>
                                <td style={{backgroundColor:'#ebebeb', minHeight: '300px', width:'50%' }}>{ (data[selectedId]) ? cardData( data ) : ""}  </td>
                                <td style={{backgroundColor:'#ebebeb', minHeight: '300px', width:'50%', verticalAlign:'top'}}> <DynamicDataTable data={ props.dynamic_data }/> </td>
                            </tr>
                        </table>
                    </div>
                    <div className='clear'></div>
                    <div className='col-md-12'>
                        <div className='col-md-6 right'>
                            <div className='right'>
                                <BasicBtn title="Select Data Set" additionalStyle={ (selectedId === "") ? "bg-light-gray disabledClick" : ""  } onClick={ saveTestData } /> 
                                <ExitBtn title="Cancel" onClick={ (()=> window.location.href='/') }/>
                            </div>
                        </div>
                    </div>
                    <div className='clear'></div>
                </div>
        </div>
    )
}
export default SelectTestData;
