import React, { useState, useEffect, useRef } from 'react';
import Cookies from 'universal-cookie';
import PageTitle from '../../General/PageTitle';
import { PostData } from '../../../utils/api/PostData';
import '../Dashboard/testCase.css';
import { Card, Col, Row, Container } from 'react-bootstrap';
import BasicBtn from '../../General/Buttons/BasicBtn';
import {Excel} from '../../../shared/Excel';
import { FadeLoader } from 'react-spinners';
import Table from './table.js';
import DateRangePicker from '../../General/DateRangePicker';

const cookies = new Cookies();
 

const uniqid = require("uniqid");
function  DailyOpsTracker() {
	const [ data, setData]=useState([]);
	const [ tc, setTC]=useState([]);
	const [ loading, setLoading]=useState(true);
	const [ fromSc, setfromSc]=useState('');
	const [ toSc, setToSc]=useState('');
    const [ fromTc, setfromTc]=useState('');
	const [ toTc, setToTc]=useState('');

	
      const ExportToExcel =async (type)=> {
        
        const payload ={
            'type' : (type === 'SC') ? 'SC' : 'TC',
            'from' : (type === 'SC') ?fromSc : fromTc,
            'to' : (type === 'SC') ? toSc : toTc
        }

        if(
            type === 'SC' && fromSc !== undefined && toSc !== undefined
        ){
                var datas=await PostData('daily-ops/report',payload, true).then((response) => {
        
                var date=new Date().getTime();
                
                var fileName = 'Daily_Operations_'+date; 
            
                Excel(response.result);
            })
        }

        if(
            type === 'TC' && fromTc !== undefined && toTc !== undefined
        ){
                var datas=await PostData('daily-ops/report',payload, true).then((response) => {
        
                var date=new Date().getTime();
                
                var fileName = 'Daily_Operations_'+date; 
            
                Excel(response.result);
            })
        }

    }
	const loadAPI = () => {
        setLoading(true)
        const payload ={
            'type' : 'SC',
            'from' : '',
            'to' : ''
        }
        PostData('daily-ops',payload,true).then((result) => {
            
            let responseJSON = result.result;
            setData(responseJSON)
                // setLoading(false)
 
        })
        const payload2 ={
            'type' : 'TC',
            'from' : '',
            'to' : ''
        }
        PostData('daily-ops',payload2,true).then((result) => {
            let responseJSON = result.result;
            setTC(responseJSON)
            
                setLoading(false)
 
        })

	};

   
	useEffect(() => {
		loadAPI();
	}, []);
    const formatDate = (day) => {
        if(day){
            var daymonth = ("0" + (day.getMonth() + 1)).slice(-2); 
            var dayday = day.getDate();
            var dayyear = day.getFullYear();

            const today = new Date(day.toLocaleString());
            var month = (parseInt(today.getMonth()+1)<= 9) ? "0"+parseInt(today.getMonth()+1) : parseInt(today.getMonth()+1);
            var day = (today.getDate() <= 9) ? "0"+today.getDate() : today.getDate();
            let date = today.getFullYear()+"-"+month+"-"+day;

            return date;
            
		}
    }
    const handleDayChangeFromSc = (day) => {
        setfromSc( formatDate(day))
    }
    const handleDayChangeToSc = (day) => {
        setToSc( formatDate(day))
    }
    const handleDayChangeFromTc = (day) => {
        setfromTc( formatDate(day))
    }
    const handleDayChangeToTc = (day) => {
        setToTc( formatDate(day))
    }
    const filterDate = (type) => {
        const payload ={
            'type' : (type === 'SC') ? 'SC' : 'TC',
            'from' : (type === 'SC') ?fromSc : fromTc,
            'to' : (type === 'SC') ? toSc : toTc
        }

        if(
            type === 'SC' && fromSc !== '' && toSc !== '' && fromSc !== undefined && toSc !== undefined
        ){
            
            PostData('daily-ops',payload,true).then((result) => {
                let responseJSON = result.result;
                setData(responseJSON)
        
            })
        }

        if(type === 'TC' && fromTc !== '' && toTc !== '' && fromTc !== undefined && toTc !== undefined){
            PostData('daily-ops',payload,true).then((result) => {
                let responseJSON = result.result;
                setTC(responseJSON)
        
            })
        }
        
        
    }
   
	return (
		<Container fluid>
            <span className="spinner-holder absolute" style={{position:'fixed',zIndex:'999'}}>
                <FadeLoader
                    style={{display: 'block', margin: '0 auto', borderColor: 'red'}}
                    sizeUnit={"px"}
                    size={10}
                    color={'#ca5d41'}
                    loading={loading}
                />
            </span>
			<Row className="top-30 separator-border">
				<Col xs={12} md={12}>
					<div className="col-lg-12 col-sm-12 top-10 mb-10 ">
						<PageTitle title="Daily Operations Tracker" />
					</div>
				</Col>
			</Row>
			<div className="col-md-12 container-div top-30 separator-border">
				 
		 
				<div className="col-md-12 container-div">
				<Row className="top-30">
				   <Col xs={12} md={12}>
                <Card style={{display:'inline'}}>
                    <div className="left col-sm-2  mt-3">
                        <BasicBtn title="Export to Excel"  onClick={() =>ExportToExcel('SC')}/>  
                    </div>
                    

                    

                <Card.Body>
                    <h3 className='left' style={{color:'#000'}}>Daily Scenario Report</h3>
                    <div className='right col-6'>
                        <div className="left">
                            <DateRangePicker
                                name="from-sc"
                                value={fromSc}
                                handleDayChange={ handleDayChangeFromSc }
                            />
                        </div>
                        <div className='left' style={{ lineHeight:'40px', color:'#000',margin:'0px 10px' }}> - </div>
                        <div className="left">
                            <DateRangePicker
                                name="to-sc"
                                value={toSc}
                                handleDayChange={ handleDayChangeToSc }
                            />                            
                        </div>
                        <div className="left">
                        <button className='bg-blue text-color-white' style={{margin:'0px 10px', height:'40px', lineHeight:'20px'}} onClick={() =>filterDate('SC')}>Filter date</button>
                        </div>
                    </div>
                    { (loading === false && data.cols !== undefined) ? 
                        <Table
                        data={ data }
                    /> : 'no data'
                    }
                   
                        
				</Card.Body>
				 </Card>
               </Col>
				</Row>
				</div>
			</div>

            <div className="col-md-12 container-div top-30 separator-border">
				 
		 
				<div className="col-md-12 container-div">
				<Row className="top-30">
				   <Col xs={12} md={12}>
                <Card style={{display:'inline'}}>
                    <div className="left col-sm-2  mt-3">
                        <BasicBtn title="Export to Excel"  onClick={() =>ExportToExcel('TC')}/>  
                    </div>
                <Card.Body>
                    
                    <h3 className='left' style={{color:'#000'}}>Daily Test Case Report</h3>
                    <div className='right col-6' style={{marginBottom:'5px'}}>
                        <div className="left">
                            <DateRangePicker
                                name="from-tc"
                                value={fromTc}
                                handleDayChange={ handleDayChangeFromTc }
                            />
                        </div>
                        <div className='left' style={{ lineHeight:'40px', color:'#000',margin:'0px 10px' }}> - </div>
                        <div className="left">
                            <DateRangePicker
                                name="to-tc"
                                value={toTc}
                                handleDayChange={ handleDayChangeToTc }
                            />                            
                        </div>
                        <div className="left">
                        <button className='bg-blue text-color-white' style={{margin:'0px 10px', height:'40px', lineHeight:'20px'}} onClick={() =>filterDate('TC')}>Filter date</button>
                        </div>
                    </div>
                    { (loading === false && tc.cols !== undefined) ? 
                        <Table
                        data={ tc }
                    /> : 'no data'
                    }
                   
                        
				</Card.Body>
				 </Card>
               </Col>
				</Row>
				</div>
			</div>
		</Container>
	);
}
export default DailyOpsTracker;
