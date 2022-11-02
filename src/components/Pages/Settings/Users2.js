import React, { Component } from 'react';
import PageTitle from '../../General/PageTitle';
import { UserRestriction } from '../../../shared/UserRestriction';
import DropDownServices from './DropDownServices';
import ForbiddenComponent from '../Forbidden/ForbiddenComponent';
import { Alert, Form, Button, Card, Col, Row, Container, InputGroup } from 'react-bootstrap';
import { FadeLoader } from 'react-spinners';
import Cookies from 'universal-cookie';
import { PostData } from '../../../utils/api/PostData';

import { GetData } from '../../../utils/api/GetData';
import TableServices from './TableServices';

const cookies = new Cookies();

class Users extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			isAllowed: 0,
			username: '',
			firstname: '',
			lastname: '',
			email: '',
			contactno: '',
			usergroup: '',
			error: false,
			success: false,
			Users: [],
			GroupList: [],
			groupId: 0,
			touched: false
		};
	}
	ValidateEmail = (input) => {
		var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

		if (input.match(validRegex)) {
			return true;
		} else {
			return false;
		}
	};
	Validation = (params, type = 1) => {
		const { touched, username, firstname, lastname, email, contactno, usergroup } = this.state;
		if (type == 0) {
			if (
				params === 'all' &&
				(firstname === '' || username === '' || lastname === '' || email === '' || contactno === '')
			) {
				this.setState({ touched: true });
				return false;
			} else this.setState({ touched: true });
			return true;
		}
		if (type === 1) {
			let isValid = false;
			if (params === 'username') {
				isValid = username !== '' ? true : false;
			}
			if (params === 'firstname') {
				isValid = firstname !== '' ? true : false;
			}
			if (params === 'lastname') {
				isValid = lastname !== '' ? true : false;
			}
			if (params === 'email') {
				isValid = this.ValidateEmail(email) ? true : false;
			}
			if (params === 'contactno') {
				isValid = contactno !== '' ? true : false;
			}
			if (params === 'usergroup') {
				isValid = usergroup !== '' ? true : false;
			}

			if (this.state.touched === true && !isValid)
				return <span className="error text-danger">{params} field is required</span>;
			else return true;
		}
	};
	onValueChange = (event) => {
		switch (event.target.name) {
			case 'username':
				this.setState({ username: event.target.value });
				break;
			case 'firstname':
				this.setState({ firstname: event.target.value });
				break;
			case 'email':
				this.setState({ email: event.target.value });
				break;
			case 'lastname':
				this.setState({ lastname: event.target.value });
				break;
			case 'email':
				this.setState({ email: event.target.value });
				break;
			case 'contactno':
				this.setState({ contactno: event.target.value });
				break;
			case 'usergroup':
				this.setState({ usergroup: event.target.value });
				break;
		}

		//this.setState({ filetype: event.target.value, loading: false });
	};
	GetUserGroup = () => {
		GetData('user-groups/1', true).then((result) => {
			let responseJSON = result.data;

			this.setState({ GroupList: responseJSON.result });
		});
	};
	DropDownFunction = (e) => {
		this.setState({ groupId: e });
	};
	SaveUser = () => {
		let isvalid = this.Validation('all', 0);
		if (this.state.isLoading === false && isvalid) {
			this.setState({ isLoading: true, touched: true });
			let accessToken = cookies.get('accessToken');
			const payload = {
				session_id: accessToken,
				u_name: this.state.username,
				name: this.state.firstname + ' ' + this.state.lastname,
				email: this.state.email,
				contact_no: this.state.contactno,
				grp_id: this.state.groupId
			};

			PostData('user', payload, true)
				.then((response) => {
					if ((response.result.status = 200)) {
						this.setState({ success: true, error: false });
						this.setState({ isLoading: false });
						this.setState({ isLoading: false, touched: false });
					}
					if (response.result.status != 200) {
						this.setState({ isLoading: false, touched: true });
					}
				})
				.catch((error) => {
					console.log('error');
					this.setState({ success: false, error: true, isLoading: false });
				});
		}
	};
	getUser = (data) => {
		console.log(data.u_name);
		this.setState({
			username: data.u_name,
			firstname: data.u_name,
			touched: true
		});
	};
	GetUsers = () => {
		this.setState({ isLoading: true });
		let accessToken = cookies.get('accessToken');
		if (accessToken) {
			GetData('userlist', true).then((result) => {
				let responseJSON = result.data;

				this.setState({ Users: responseJSON.result });
				this.setState({ isLoading: false });
			});
		}
	};
	componentDidMount() {
		UserRestriction('System Settings', 'Users').then((x) => {
			this.setState({ isAllowed: x });
		});

		this.GetUsers();
		this.GetUserGroup();
	}
	render() {
		return (
			<Container fluid>
				<Row className="top-30 separator-border">
					<Col xs={12} md={12}>
						<div className="col-lg-12 col-sm-12 top-10 mb-10 ">
							<PageTitle title="Users" />
						</div>
					</Col>
					<Alert variant="danger" show={this.state.error}>
						<p>Error Please try again</p>
					</Alert>
					<Alert variant="success" show={this.state.success}>
						<p>User successfully added</p>
					</Alert>
				</Row>

				<div className="col-md-12">
					<Row className="top-30">
						<Col xs={6} md={4}>
							<Card border="secondary" text="dark">
								<Card.Body>
									<Card.Title>Add User</Card.Title>

									<Form>
										<Form.Label>Username</Form.Label>
										<InputGroup className="mb-3">
											<Form.Control
												placeholder="Search username"
												onChange={this.onValueChange}
												aria-describedby="basic-addon2"
												name="username"
											/>
											<InputGroup.Text id="basic-addon2">Fill in</InputGroup.Text>
											<Form.Text className="text-muted" type="text" />
											{this.Validation('username')}
										</InputGroup>

										<Form.Group className="mb-3" controlId="formGroupName">
											<Form.Label>First Name</Form.Label>
											<Form.Control name="firstname" type="text" onChange={this.onValueChange} />
											<Form.Text className="text-muted" />
											{this.Validation('firstname')}
										</Form.Group>

										<Form.Group className="mb-3" controlId="formGroupDescription">
											<Form.Label>Last Name</Form.Label>
											<Form.Control name="lastname" onChange={this.onValueChange} type="text" />
											{this.Validation('lastname')}
										</Form.Group>
										<Form.Group className="mb-3" controlId="formGroupDescription">
											<Form.Label>Email Address</Form.Label>
											<Form.Control type="text" name="email" onChange={this.onValueChange} />
											{this.Validation('email')}
										</Form.Group>
										<Form.Group className="mb-3" controlId="formGroupDescription">
											<Form.Label>Contact Number</Form.Label>
											<Form.Control type="text" name="contactno" onChange={this.onValueChange} />
											{this.Validation('contactno')}
										</Form.Group>
										<DropDownServices
											combolist={this.state.GroupList}
											value={this.state.groupId}
											dropdownvalue={this.DropDownFunction}
										/>

										<div className="d-flex align-content-start flex-wrap">
											{this.state.isAllowed > 1 && (
												<Button variant="success" onClick={this.SaveUser}>
													{this.state.loading ? 'Loading..' : 'Submit'}
												</Button>
											)}
										</div>
									</Form>

									<span
										className="spinner-holder absolute"
										style={{ position: 'fixed', zIndex: '999' }}
									>
										<FadeLoader
											style={{
												display: 'block',
												margin: '0 auto',
												borderColor: 'red'
											}}
											sizeUnit={'px'}
											size={10}
											color={'#ca5d41'}
											loading={this.state.isLoading}
										/>
									</span>
								</Card.Body>
							</Card>
						</Col>
						<Col xs={12} md={8}>
							<Card border="secondary">
								<Card.Body>
									<TableServices rows={this.state.Users} tablename="user" getUser={this.getUser} />
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</div>
			</Container>
		);
	}
}

export default Users;
