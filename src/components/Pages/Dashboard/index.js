import React, { useState, useEffect, useRef } from 'react';
import Cookies from 'universal-cookie';
import PageTitle from '../../General/PageTitle';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { PostData } from '../../../utils/api/PostData';
import { CHART_COLOR } from '../../../shared/constants';
import '../Dashboard/testCase.css';
import { Form, Card, Col, Row, Container } from 'react-bootstrap';
import TableServices from "../Settings/TableServices";
import ReactPaginate from 'react-paginate';
//import ChartDataLabels from "chartjs-plugin-datalabels";
 
const cookies = new Cookies();
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
	plugins: {
			title: {
			display: true,
			text: 'Execution Per Day'
		}
	},
	responsive: true,
	scales: {
		x: {
			stacked: true
		},
		y: {
			stacked: true
		}
	}
};
const options2 = {
	responsive: true,
	aspectRatio: 2,

	plugins: {
		legend: {
			position: 'chartArea'
		},
		title: {
			display: true,
			text: 'Test Cases'
		}
	}
};
const labels = [ 'January', 'February', 'March', 'April', 'May', 'June' ];
const s = [ 221, 312, 312, 454, 121, 345 ];
const dataprogress = [ 12, 41, 78, 21, 90, 23 ];

const accessToken = cookies.get('accessToken');

function Dashboard() {
	const [ testers, setTesters]=useState([]);
	const [ pieChartdata, setpieChartdata ] = useState({});
	const [ barChartdata, setbarChartdata ] = useState({});
    const [ currentItems, setCurrentItems ] = useState(null);
    const [ pageCount, setPageCount ] = useState(0);
	const [ itemOffset, setItemOffset ] = useState(0);
	const [customerType,setCustomerType]=useState('Individual');
	const [ itemsPerPage, setitemsPerPage ] = useState(10);

	const [ loading, setLoading ] = useState(false);
	const removeDuplicates = (arr) => {
		return arr.filter((item, index) => arr.indexOf(item) === index);
	};
	const changePageSize = (e) => {
		setitemsPerPage(e.target.value);
	 	setItemOffset(0);
		 loadAPI(0,customerType);
	};
	  
	const changeCustomerType = (e) => {
		setCustomerType(e.target.value);
	    loadAPI(itemOffset,e.target.value);
	};
	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % testers.length;
		console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
		setItemOffset(newOffset);
	loadAPI(event.selected);
	};
	const loadAPI = (offst = 0,customertypes='Individual') => {
		console.log(offst)
		let labelsPieChart = [];
		let PieColor = [];
		let DatelabelsBarChart = [];
		let BarData = [];
		let Piedata = [];
		let tempDateHolder = [];
		setLoading(true);
		const payload = {
			customerType: customertypes,
		    offset: offst,
			limit: itemsPerPage
		};
		PostData('graph',payload, true).then((response) => {
	 setTesters(response.result.table.rows);
			setPageCount(Math.ceil(response.result.table.count/ itemsPerPage));

			response.result.pie.forEach((obj) => {
				Piedata.push(obj.cnt);
				labelsPieChart.push(obj.Status);
				PieColor.push(CHART_COLOR[obj.tst_id]);
			});
			response.result.bar.forEach((obj) => {
				tempDateHolder.push(obj.Virtual_Day);
			});
			DatelabelsBarChart = removeDuplicates(tempDateHolder);

			let assignedArray = [];
			let blockedArray = [];
			let passedArray = [];
			let inprogressedArray = [];
			//let BarData=[];
			 
			DatelabelsBarChart.map((dates) => {
				var check = 0;
				response.result.bar
					.filter((el) => el.cnt && el.Virtual_Day === dates && el.Data_Status === 'In-Progress')
					.map((item) => {
						check = 1;
						inprogressedArray.push(item.cnt);
                    
					});
				if (check === 0) {
					inprogressedArray.push(0);
				}
			});
			DatelabelsBarChart.map((dates) => {
				var check = 0;
				response.result.bar
					.filter((el) => el.cnt && el.Virtual_Day === dates && el.Data_Status === 'Assigned')
					.map((item) => {
						check = 1;
						assignedArray.push(item.cnt);
					});
				if (check === 0) {
					assignedArray.push(0);
				}
			});
			DatelabelsBarChart.map((dates) => {
				var check = 0;
				response.result.bar
					.filter((el) => el.cnt && el.Virtual_Day === dates && el.Data_Status === 'Passed')
					.map((item) => {
						check = 1;
						passedArray.push(item.cnt);
					});
				if (check === 0) {
					passedArray.push(0);
				}
			});
			DatelabelsBarChart.map((dates) => {
				var check = 0;
				response.result.bar
					.filter((el) => el.cnt && el.Virtual_Day === dates && el.Data_Status === 'Blocked')
					.map((item) => {
						check = 1;
						blockedArray.push(item.cnt);
					});
				if (check === 0) {
					blockedArray.push(0);
				}
			});
			setLoading(false);
			console.log(PieColor);
			setpieChartdata({
				labels: labelsPieChart,
				datasets: [
					{
						label: '',
						data: Piedata,
						backgroundColor: PieColor,
						borderColor: PieColor,
						borderWidth: 0
					}
				]
			});
			setbarChartdata({
				borderColor: '#FFFFFF',
				labels: DatelabelsBarChart,
				
				datasets: [
					{
						label: 'Assigned',
						data: assignedArray,
						backgroundColor: CHART_COLOR[2]
					},
					{
						label: 'In-Progress',
						data: inprogressedArray,
						backgroundColor: CHART_COLOR[4]
					},
					{
						label: 'Blocked',
						data: blockedArray,
						backgroundColor: CHART_COLOR[8]
					},
					{
						label: 'Completed',
						data: [],
						backgroundColor: CHART_COLOR[5]
					},
					{
						label: 'Passed',
						data: passedArray,
						backgroundColor:  CHART_COLOR[10]
					},
					{
						label: 'Failed',
						data: [],
						backgroundColor:  CHART_COLOR[7]
					},
					
				],
				borderWidth: 0
			});
		});
	};

	useEffect(() => {
		loadAPI(0);
	}, []);

	return (
		<Container fluid>
			<Row className="top-30 separator-border">
				<Col xs={12} md={12}>
					<div className="col-lg-12 col-sm-12 top-10 mb-10 ">
						<PageTitle title="Dashboard" />
					</div>
				</Col>
			</Row>
			<div className="col-md-12 container-div top-30 separator-border">
					
					<Row >
					  
					 
					 	<div className="col-sm-1">
									<div className="offset-1">
										<Form.Group className="mb-1 relative">
											<Form.Label>
												<i>Page Size</i>
											</Form.Label>
											<Form.Select name="pagesize" onChange={changePageSize}>
												<option value="10">10</option>
												<option value="20">20</option>
												<option value="50">50</option>
												<option value="100">100</option>
												<option value="200">200</option>
											</Form.Select>
										</Form.Group>
									</div>
								</div>
						 	<div className="col-sm-2">
									<div >
										<Form.Group className="mb-1 relative">
											<Form.Label>
												<i>Customer Type</i>
											</Form.Label>
											<Form.Select name="customertype" onChange={changeCustomerType}>
												<option value="Individual">Individual</option>
												<option value="Organization">Organization</option>
											</Form.Select>
										</Form.Group>
									</div>
								</div>
									 
						</Row>
				<Row className="top-30">
					<Col md={1} />
					<Col md={4}>
						<Card border="white" text="dark">
							<Card.Body>
								<Card.Title> </Card.Title>
								<div className="col-sm-12 left mt-1">
									<div>
										{Object.keys(pieChartdata).length > 0 && (
											<Pie options={options2} data={pieChartdata} />
										)}
									</div>
								</div>
							</Card.Body>
						</Card>
					</Col>

					<Col md={5}>
						<Card border="white" text="dark">
							<Card.Body>
								<Card.Title> </Card.Title>
								<div className="col-sm-12 left mt-1">
									<div>
										{Object.keys(barChartdata).length > 0 && (
											<Bar options={options} data={barChartdata} />
										)}
									</div>
								</div>
							</Card.Body>
						</Card>
					</Col>
					<Col md={1} />
				</Row>
				<div className="col-md-12 container-div">
				<Row className="top-30">
				   <Col xs={12} md={12}>
                <Card>
                <Card.Body>
                { testers.length>0 && <TableServices
                    rows={testers}
                    tablename="dashboard"
                  />}
<ReactPaginate
							breakLabel="..."
							nextLabel="next >"
							onPageChange={handlePageClick}
							pageRangeDisplayed={5}
							pageCount={pageCount}
							previousLabel="< previous"
							pageClassName="page-item"
							pageLinkClassName="page-link"
							previousClassName="page-item"
							previousLinkClassName="page-link"
							nextClassName="page-item"
							nextLinkClassName="page-link"
							breakClassName="page-item"
							breakLinkClassName="page-link"
							containerClassName="pagination"
							activeClassName="active"
							renderOnZeroPageCount={null}
						/>
				</Card.Body>
				 </Card>
               </Col>
				</Row>
				</div>
			</div>
		</Container>
	);
}
export default Dashboard;
