import React, { useState, useEffect, useRef } from 'react';
import Cookies from 'universal-cookie';
import PageTitle from '../../General/PageTitle';
import { PostData } from '../../../utils/api/PostData';
import { GetData } from '../../../utils/api/GetData';
import '../Dashboard/testCase.css';
import { Card, Col, Row, Container } from 'react-bootstrap';
import TableServices from "../Settings/TableServices";
import BasicBtn from '../../General/Buttons/BasicBtn';
import exportFromJSON from 'export-from-json';
import {Excel} from '../../../shared/Excel';
import { FadeLoader } from 'react-spinners';
const cookies = new Cookies();
 

const uniqid = require("uniqid");
function ChaserReport() {
	const [ data, setData]=useState([]);
	const [ testers, setTesters]=useState([]);
	const [ type, setType]=useState('all');
	const [ tester, setTester]=useState('');
	const [ loading, setLoading]=useState(false);

	
      const ExportToExcel =async (filter, tester)=> {
        setLoading(true)
        const payload = {
            'type' : ( filter === undefined ) ? 'all' : filter,
            'tester' : ( tester === undefined ) ? '' : tester,
            'isDownload' : 1
        }
         var datas=await PostData('chaser-report', payload, true).then((response) => {
        
         var date=new Date().getTime();
        
             var fileName = '';  
           
               fileName = 'Chaser_Report_'+date; 
       
          //  exportFromJSON({ data: response.result, fileName: fileName, exportType:'xls'})
                Excel(response.result,fileName);
            setLoading(false)
        })   
    }
	const loadAPI = (filter, tester) => {
        setLoading(true)
        const payload = {
            'type' : ( filter === undefined ) ? 'all' : filter,
            'tester' : ( tester === undefined ) ? '' : tester,
            'isDownload' : 0
        }
	 
        PostData('chaser-report', payload, true).then((result) => {
            if(filter === undefined && tester === undefined){
                
                setTesters(filterUniqueTesters(result.result))
            }
            setLoading(false)
            setData(result.result);
 
        })   
	};

    const filterUniqueTesters = (array) => {
        return [...new Map(array.map(item =>
            [item['u_name'], item['u_name']])).values()];
        
    };
    
   
	useEffect(() => {
		loadAPI(undefined, undefined);
	}, []);
    
    const chooseTester = (e) => {
        setTester(e.target.value)
        
        loadAPI(type, e.target.value)
    }
    
    const chooseFilter = (e) => {
        setType(e.target.value)
        loadAPI(e.target.value, tester)
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
						<PageTitle title="Chaser Report" />
					</div>
				</Col>
			</Row>
			<div className="col-md-12 container-div top-30 separator-border">
				 
		 
				<div className="col-md-12 container-div">
				<Row className="top-30">
				   <Col xs={12} md={12}>
                <Card style={{display:'inline'}}>
                    <div className="left col-sm-2  mt-3">
                        <BasicBtn title="Export to Excel"  onClick={() =>ExportToExcel(type, tester)}/>  
                    </div>
                    <div className="right col-sm-6  mt-4 m-right-15">
                        <Col md={4} className="left">
                            <select className='form-control ' onChange={chooseFilter}>
                                <option value="all">ALL</option>
                                <option value="idle">IDLE</option>
                                <option value="in_progress">In-Progress</option>
                            </select>
                        </Col>
                        <Col md={4}  className="right">
                            <select className='form-control' onChange={chooseTester} value={tester}>
                                <option value="">---Testers---</option>
                                {testers.map((item, i) => (<option value={item} key={uniqid()}>{item}</option>))}
                            </select>
                        </Col>

                    </div>

                <Card.Body>
                { data.length>=0 && 
                  <TableServices
                    rows={data}
                    tablename={ (type === 'in_progress') ? "in_progress" : "chaser_report" }
                    
                  />}
                        
				</Card.Body>
				 </Card>
               </Col>
				</Row>
				</div>
			</div>
		</Container>
	);
}
export default ChaserReport;
