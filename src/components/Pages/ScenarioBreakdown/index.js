import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import PageTitle from '../../General/PageTitle';

import { GetData } from '../../../utils/api/GetData';

import '../Dashboard/style.css';
import { Form, Card, Col, Row, Container } from 'react-bootstrap';

const cookies = new Cookies();

function ScenarioBreakdown() {
	const [letters,setBreakdown]=useState({a:"0",b:"0",c:"0",d:"0",e:"0",f:"0",g:"0",h:"0",i:"0",j:"0",k:"0",l:"0"});
    	const [letters2, setSCDetails] = useState({
        a: "0",
        b: "0",
        c: "0",
        d: "0",
        e: "0",
        f: "0",
        g: "0",
        h: "0",
        i: "0",
        j: "0",
        k: "0",
        l: "0",
      });

	const [inprogress,setInpogress]=useState({gi:"0",hj:"0"})
	const  ScenarioBreakdownDetails=()=>{
       return (
         <table border="1" className="sc-table">
           <thead>
             <tr>
               <th>SCENARIOS*</th>
               <th>Individual</th>
               <th>Organization</th>
             </tr>
           </thead>
           <tbody>
             <tr>
               <td className={"dark"}>Total for Cycle 2</td>
               <td className={"light text-center"}>
                 {parseInt(letters2.a + letters2.c + letters2.e)}
               </td>
               <td className={"light text-center"}>
                 {" "}
                 {parseInt(letters2.b + letters2.d + letters2.f)}
               </td>
             </tr>
             <tr>
               <td className={"dark span-l"}>Plan for Run 1 &#38; Run 2</td>
               <td className={"light text-right"}>
                 {parseInt(letters2.a + letters2.c)}
               </td>
               <td className={"light text-right"}>
                 {parseInt(letters2.b + letters2.d)}
               </td>
             </tr>
             <tr>
               <td className={"dark span-l"}>Plan for Run 3</td>
               <td className={"light text-right"}>{parseInt(letters2.e)}</td>
               <td className={"light text-right"}> {parseInt(letters2.f)}</td>
             </tr>
           </tbody>
         </table>
       );
	}
	const Breakdown=()=>{

		return( <table border="1" className="sc-table">
        <thead>
         	 <tr>
          	  <th >Currently Commenced(Started) - Run#1 and #2</th>
              <th colSpan={3}>Individual</th>
              <th colSpan={3}>Organization</th>
            </tr>
			 <tr>
          	  <th>Total Executed</th>
              <th colSpan={3}>{parseInt(letters.a+letters.e+letters.g+letters.i+letters.c)}</th>
              <th colSpan={3}>{parseInt(letters.d+letters.h+letters.j+letters.f+letters.b)}</th>
            </tr>
        </thead>
        <tbody>
			<tr>
				<td  className={"dark span-l"}>Blocked (Bug Fix)</td>
				<td className={"light"}></td>
			    <td className={"light"}>{parseInt(letters.c)}</td>
				<td className={"light"}></td>
				<td className={"light"}></td>
				<td className={"light"}>{parseInt(letters.d)}</td>
				<td className={"light"}></td>
			</tr>
			<tr>
				<td  className={"dark  span-l"}>In Progress</td>
				<td className={"light"}></td>
			    <td className={"light"}>{parseInt(letters.g+letters.i)}</td>
				<td className={"light"}></td>
				<td className={"light"}></td>
				<td className={"light"}>{parseInt(letters.h+letters.j)}</td>
				<td className={"light"}></td>
			</tr>
			<tr>
			
				<td className={"dark span-sl "}>&nbsp;&nbsp;Scenario Execution (Execute / Verify)</td>
				<td  className={"light"}></td>
				<td className={"light"}></td>
			    <td className={"light"}>{letters.g!=undefined &&  parseInt(letters.g)}</td>
				<td className={"light"}></td>
					<td className={"light"}></td>
				<td className={"light"}>{ letters.h!=undefined && parseInt(letters.h)}</td>
			
			</tr>
			<tr>
			
				<td className={"dark span-sl "}>&nbsp;&nbsp;Scenario where Review Required</td>
				<td className={"light"}></td>
				<td  className={"light"}></td>
			      <td className={"light"}>{ letters.i!=undefined &&  parseInt(letters.i)}</td>
				<td className={"light"}></td>
					<td className={"light"}></td>
				<td className={"light"}>{letters.j!=undefined &&  parseInt(letters.j)}</td>
			
			</tr>
			<tr>
				<td  className={"dark  span-l"}>Passed</td>
				<td className={"light"}></td>
				<td className={"light"}>{ letters.e!=undefined &&  parseInt(letters.e)}</td>
			    <td className={"light"}></td>
				<td className={"light"}></td>
				<td className={"light"}>{ letters.f!=undefined && parseInt(letters.f)}</td>
				<td className={"light"}></td>
			</tr>
			<tr>
				<td  className={"dark  span-l"}>Abandoned</td>
				<td className={"light"}></td>
			    <td className={"light"}>{letters.a!=undefined && parseInt(letters.a)}</td>
				<td className={"light"}></td>
				<td className={"light"}></td>
				<td className={"light"}>{letters.b!=undefined && parseInt(letters.b)}</td>
				<td className={"light"}></td>
			</tr>
		</tbody>
		   <tfoot>
			<tr>
				<td  className={"dark tfoot"}>Total Unexecuted</td>
				<td className={"light tfoot"}>{parseInt(letters.k)}</td>
			    <td className={"light tfoot"}></td>
				<td className={"light tfoot"}></td>
				<td className={"light tfoot "}>{parseInt(letters.l)}</td>
				<td className={"light tfoot"}></td>
				<td className={"light tfoot"}></td>
			</tr>
		   </tfoot>
		
      </table>);
	}
	const loadAPI = (offst = 0) => {
	 
         GetData('graphreport/7', true).then((response) => {
                      //setLoading(false);
			const report = response.data.result.report;
			const scenario=response.data.result.scenario;
			let [a1,b1,c1,d1,e1,f1,g1,h1,i1,j1,k1,l1]="0";
			let [a2, b2, c2, d2, e2, f2] = "0";
				scenario.map((item) => {
				if (item["st_runid"] === 1 && item["st_custtype"] === "Individual") {
         		 a2= item["st_count"];
       				 }
				  if (item["st_runid"] === 1 &&item["st_custtype"] === "Organization") {
            	b2 = item["st_count"];
           		}
				if (item["st_runid"] === 2 && item["st_custtype"] === "Individual") {
				c2 = item["st_count"];
				}
				if (item["st_runid"] === 2 && item["st_custtype"] === "Organization") {
				d2 = item["st_count"];
				}
				if (item["st_runid"] === 3 && item["st_custtype"] === "Individual") {
				e2 = item["st_count"];
			}
			if (item["st_runid"] === 3 && item["st_custtype"] === "Organization") {
				f2 = item["st_count"];
			}
				});
				 a2 = valueChecker(a2);
         b2 = valueChecker(b2);
         c2 = valueChecker(c2);
         d2 = valueChecker(d2);
         e2 = valueChecker(e2);
         f2 = valueChecker(f2);
		 	setSCDetails({
        a: a2,
        b: b2,
        c: c2,
        d: d2,
        e: e2,
        f: f2,
        
      });
			report.map( item =>{
			
                if(item['SC Status']==='Abandon' && item['Customer Type']==='Individual'){
					a1=item['CNT'];
				}
				  if(item['SC Status']==='Abandon' && item['Customer Type']==='Organization'){
				   b1=item['CNT']; 
				}
				else if(item['SC Status']==='Blocked' && item['Customer Type']==='Individual'){
					c1=item['CNT'];
				}
				else if(item['SC Status']==='Blocked' && item['Customer Type']==='Organization'){
					d1=item['CNT'];
				}
				else if(item['SC Status']==='Completed' && item['Customer Type']==='Individual'){
					e1=item['CNT'];
				}
				else if(item['SC Status']==='Completed' && item['Customer Type']==='Organization'){
					f1=item['CNT'];
				}
				else if(item['SC Status']==='In-Progress' && item['Customer Type']==='Individual'){
					g1=item['CNT'];
				}
			    else if(item['SC Status']==='In-Progress' && item['Customer Type']==='Organization'){
					h1=item['CNT'];
				}
				else if(item['SC Status']==='Scenario with For Review' && item['Customer Type']==='Individual'){
					i1=item['CNT'];
				}
				else if(item['SC Status']==='Scenario with For Review' && item['Customer Type']==='Organization'){
					j1=item['CNT'];
				}
				else if(item['SC Status']==='Unassigned' && item['Customer Type']==='Individual'){
					k1=item['CNT'];
				}
				else if(item['SC Status']==='Unassigned' && item['Customer Type']==='Organization'){
					l1=item['CNT'];
				}
		 });
	  a1=valueChecker(a1);
	  b1=valueChecker(b1);
	  c1=valueChecker(c1);
	  d1=valueChecker(d1);
	  e1=valueChecker(e1);
	  f1=valueChecker(f1);
	  g1=valueChecker(g1);
	  h1=valueChecker(h1);
	  i1=valueChecker(i1);
	  j1=valueChecker(j1);
	  k1=valueChecker(k1);
	  l1=valueChecker(l1);
		setBreakdown({a:a1,b:b1,c:c1,d:d1,e:e1,f:f1,g:g1,h:h1,i:i1,j:j1,k:k1,l:l1});
		
  	})   
	
	};

   const valueChecker=(str)=>{
		let newstr=str!=undefined?str:0;
   return newstr;
	} 
	useEffect(() => {
		loadAPI(0);
		
	}, []);

	return (
    <Container fluid>
      <Row className="top-30 separator-border">
        <Col xs={12} md={12}>
          <div className="col-lg-12 col-sm-12 top-10 mb-10 ">
            <PageTitle title="Scenario Breakdown" />
          </div>
        </Col>
      </Row>
      <div className="col-md-12 container-div top-30 separator-border">
        <div className="col-md-6 container-div"></div>
        <div className="col-md-11 container-div">
          <Row className="top-30">
            <Col xs={3} md={3}></Col>
            <Col xs={6} md={6}>
              <Card>
                <Card.Body>
                  {ScenarioBreakdownDetails()}
                  {Breakdown()}
                </Card.Body>
              </Card>
            </Col>
            <Col xs={3} md={3}></Col>
          </Row>
        </div>
      </div>
    </Container>
  );
}
export default ScenarioBreakdown;
