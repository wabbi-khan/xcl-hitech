import React, { useState, useEffect } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { fetchDepartmentsAction } from '../../../services/action/DepartmentAction';
import { getDesignation } from '../../../services/action/DesignationAction';
import { getEmployeeByDesignationAndDepartment } from '../../../services/action/EmployeesAction';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: '25ch',
		},
	},
	mainContainer: {
		textAlign: 'center',
		[theme.breakpoints.up('md')]: {
			marginLeft: 0,
			marginTop: 15,
		},
		[theme.breakpoints.down('sm')]: {
			marginTop: -15,
		},
	},
	addButton: {
		marginTop: 70,
		color: '#22A19A',
		borderColor: '#22A19A',
		fontWeight: 'bold',
		'&:hover': {
			border: 'none',
			backgroundColor: '#22A19A',
			color: 'whitesmoke',
		},
		[theme.breakpoints.up('md')]: {
			width: '15%',
		},
		[theme.breakpoints.down('sm')]: {
			width: '30%',
		},
	},
	addMoreButton: {
		backgroundColor: '#22A19A',
		color: 'whitesmoke',
		marginLeft: 20,
		marginTop: 5,
		'&:hover': {
			color: '#22A19A',
			borderColor: '#22A19A',
		},
	},
	table: {
		minWidth: 600,
	},
	dataTable: {
		marginTop: 40,
	},
	ckeckBox: {
		[theme.breakpoints.up('md')]: {
			marginLeft: 7,
		},
		[theme.breakpoints.down('sm')]: {
			marginLeft: 0,
		},
	},
}));

const CssTextField = withStyles({
	root: {
		'& label.Mui-focused': {
			color: 'black',
		},
		'& .MuiOutlinedInput-root': {
			'& fieldset': {
				borderColor: 'black',
			},
			'&.Mui-focused fieldset': {
				borderColor: 'black',
			},
		},
	},
})(TextField);

const JobDescription = ({ history }) => {
	const [designation, setDesignation] = React.useState('');
	const [department, setDepartment] = React.useState('');
	const { departments } = useSelector((state) => state.departments);
	const { designations } = useSelector((state) => state.designations);
	const { employees } = useSelector((state) => state.employees);

	const classes = useStyles();
	const dispatch = useDispatch();

	React.useEffect(() => {
		if (department && designation) {
			dispatch(getEmployeeByDesignationAndDepartment(designation, department));
		}
	}, [department && designation]);

	useEffect(async () => {
		dispatch(getDesignation());
		dispatch(fetchDepartmentsAction());
	}, [dispatch]);

	const onSubmit = (values) => {
		console.log(values);

		// history.push('/hr/print_job_description')
	};

	return (
		<Sidenav title={'Job Description'}>
			<div>
				<div className='text-center mt-3'>
					<Formik>
						{(props) => (
							<Form>
								<Grid container spacing={1}>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id='outlined-basic'
											label='Select Department'
											variant='outlined'
											type='text'
											size='small'
											select
											autocomplete='off'
											style={{ width: '75%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}>
											{!departments || !departments.length ? (
												<p>Data Not Found</p>
											) : (
												departments.map((el, i) => (
													<MenuItem
														value={el._id}
														key={i}
														onClick={() => setDepartment(el._id)}>
														{el.name}
													</MenuItem>
												))
											)}
										</CssTextField>
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id='outlined-basic'
											label='Select Designation'
											variant='outlined'
											type='text'
											size='small'
											select
											autocomplete='off'
											style={{ width: '75%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}>
											<MenuItem>Manager</MenuItem>
										</CssTextField>
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id='outlined-basic'
											label='Select Employee Name'
											variant='outlined'
											type='text'
											autocomplete='off'
											size='small'
											select
											style={{ width: '75%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}>
											<MenuItem>Arsalan</MenuItem>
										</CssTextField>
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id='outlined-basic'
											label='Reports To'
											variant='outlined'
											type='text'
											autocomplete='off'
											size='small'
											select
											style={{ width: '75%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}>
											<MenuItem>Factory Manager</MenuItem>
										</CssTextField>
									</Grid>
								</Grid>
								<Grid container spacing={1} className='mt-3'>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id='outlined-basic'
											label='Interaction With'
											variant='outlined'
											type='date'
											size='small'
											select
											autocomplete='off'
											style={{ width: '75%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}>
											<MenuItem value='0'>Store In-Charege</MenuItem>
										</CssTextField>
									</Grid>
								</Grid>
								<div className='container mt-5' style={{ textAlign: 'left' }}>
									<h5 style={{ textDecoration: 'underline', fontWeight: 'bold' }}>
										Responsibilities
									</h5>
									<p>
										Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto, eaque
										cupiditate magnam repellendus
									</p>
									<p>
										Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto, eaque
										cupiditate magnam repellendus
									</p>
									<div style={{ marginTop: 30, marginBottom: 30 }}>
										<hr />
									</div>
								</div>
								<div className='container mt-5' style={{ textAlign: 'left' }}>
									<h5 style={{ textDecoration: 'underline', fontWeight: 'bold' }}>
										Authorities
									</h5>
									<p>
										Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto, eaque
										cupiditate magnam repellendus
									</p>
									<p>
										Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto, eaque
										cupiditate magnam repellendus
									</p>
									<div style={{ marginTop: 30, marginBottom: 30 }}>
										<hr />
									</div>
								</div>
								<div>
									<Button
										variant='outlined'
										color='primary'
										type='submit'
										className={classes.addButton}>
										Print
									</Button>
								</div>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</Sidenav>
	);
};

export default JobDescription;
