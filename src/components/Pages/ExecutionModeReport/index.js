import React, { useState, useEffect, useRef } from 'react';
import Cookies from 'universal-cookie';
import PageTitle from '../../General/PageTitle';
import { GetData } from '../../../utils/api/GetData';
import '../Dashboard/testCase.css';
import { Card, Col, Row, Container } from 'react-bootstrap';
import {Excel} from '../../../shared/Excel';
import TableServices from "../Settings/TableServices";
import BasicBtn from '../../General/Buttons/BasicBtn';
import exportFromJSON from 'export-from-json';
import FormulaTable from './FormulaTable';
const cookies = new Cookies();
 
function ExecutionModeReport() {
	const [ data, setData]=useState([]);
	const [ scTarget, setScTarget]=useState(0);
	const [ tcTarget, setTcTarget]=useState(0);

	
      const ExportToExcel =async (id)=> {
      
         var datas=await GetData('graphreport/'+id, true).then((response) => {
        
         var date=new Date().getTime();
         var exportType = 'excel';  
            var fileName = '';  
           
            fileName = 'Execution_Mode_Report_'+date; 
       
            Excel(response.data.result,fileName);
        })   
    }
	const loadAPI = () => {
	 
	 
         GetData('execution-report', true).then((response) => {
        
			setScTarget(parseInt(response.data.result['target'][0]['Sum']))
			setTcTarget(parseInt(response.data.result['target'][1]['Sum']))
            setData(response.data.result['modes']);
 
        })   
	};

	useEffect(() => {
		loadAPI(0);
	}, []);
    
	return (
		<Container fluid>
			<Row className="top-30 separator-border">
				<Col xs={12} md={12} >
					<div className="col-lg-12 col-sm-12 top-10 mb-10 ">
						<PageTitle title="Execution Mode Report " />
					</div>
				</Col>
			</Row>
			<div className="col-md-12 container-div top-30 separator-border report-container" >
				{
					(data.length >= 1) ?
					<FormulaTable
						scTarget={ scTarget }
						tcTarget={ tcTarget }
						total={ (data[10] !== undefined) ? data[10]['Manual'] : '' }
						passed={ (data[8] !== undefined ) ? data[8]['Manual'] : '' }
					/> : ''
				}
				
		 
				<div className="col-md-12 container-div">
				<Row className="top-30">
				   <Col xs={12} md={12}>
                <Card>
                    	<div className=" col-sm-2  mt-3">
						    <BasicBtn title="Export to Excel"  onClick={() =>ExportToExcel(5)}/>  
						</div>
                <Card.Body>
                { data.length>=0 && 
                  <TableServices
                    rows={data}
                    tablename="execution_mode"
                    
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
export default ExecutionModeReport;
