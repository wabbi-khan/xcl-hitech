import React, { useState, useEffect } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '../../../components/utils/Button';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { fetchDepartmentsAction } from '../../../services/action/DepartmentAction';
import { getDesignation } from '../../../services/action/DesignationAction';
import { getEmployeeByDesignationAndDepartment } from '../../../services/action/EmployeesAction';
import { getResponsibilities } from '../../../services/action/responsibilityAction';
import { getAuthorities } from '../../../services/action/authorityAction';

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

const initialValues = {
	department: '',
	designation: '',
	employee: '',
	reportTo: '',
	interactionWith: '',
};

const validationSchema = yup.object({
	department: yup.string().required(),
	designation: yup.string().required(),
	employee: yup.string().required(),
	reportTo: yup.string().required(),
	interactionWith: yup.string().required(),
});

const responsibilityInitialValue = {
	name: '',
};

const responsibilityValidationSchema = yup.object({
	name: yup.string().required(),
});

const authorityInitialValue = {
	name: '',
};

const authorityValidationSchema = yup.object({
	name: yup.string().required(),
});

const JobDescription = ({ history }) => {
	const [responsibilitiesState, setResponsibilitiesState] = React.useState([]);
	const [addResError, setAddResError] = React.useState('');
	const [addAuthError, setAddAuthError] = React.useState('');
	const [authoritiesState, setAuthoritiesState] = React.useState([]);
	const [designation, setDesignation] = React.useState({
		responsibilities: [],
		authorities: [],
	});
	const [createLoading, setCreateLoading] = React.useState(false);
	const [createError, setCreateError] = React.useState('');
	const [success, setSuccess] = React.useState('');

	const [department, setDepartment] = React.useState('');
	const { departments } = useSelector((state) => state.departments);
	const { designations } = useSelector((state) => state.designations);
	const { employees } = useSelector((state) => state.employees);
	const { responsibilities } = useSelector((state) => state.responsibilities);
	const { authorities } = useSelector((state) => state.authorities);

	console.log(employees);

	const classes = useStyles();
	const dispatch = useDispatch();

	React.useEffect(() => {
		setTimeout(() => {
			setAddResError('');
		}, 4000);
	}, [addResError]);

	React.useEffect(() => {
		setTimeout(() => {
			setAddAuthError('');
		}, 4000);
	}, [addAuthError]);

	React.useEffect(() => {
		if (department && designation) {
			dispatch(getEmployeeByDesignationAndDepartment(designation._id, department));
		}
	}, [department && designation]);

	useEffect(async () => {
		dispatch(getDesignation());
		dispatch(fetchDepartmentsAction());
		dispatch(getResponsibilities());
		dispatch(getAuthorities());
	}, [dispatch]);

	const onSubmit = async (values) => {
		values = {
			...values,
			responsibilities: responsibilitiesState,
			authorities: authoritiesState,
		};
		try {
			const res = await axios.post(
				`${process.env.REACT_APP_API_URL}/job-description`,
				values,
			);

			console.log(res);

			if (res.status == 200) {
				console.log('object');
				history.push({
					pathname: '/hr/print_job_description',
					state: { description: res.data.description },
				});
			}
		} catch (error) {
			console.log(error.response.data.error);
		}
	};

	const addResponsibility = (values) => {
		let exist = false;
		responsibilitiesState.forEach((el) => {
			if (el.name === values.name) exist = true;
		});

		!exist
			? setResponsibilitiesState((prev) => [...prev, values])
			: setAddResError('Already Added');
	};

	const addAuthority = (values) => {
		let exist = false;
		authoritiesState.forEach((el) => {
			if (el.name === values.name) exist = true;
		});

		!exist
			? setAuthoritiesState((prev) => [...prev, values])
			: setAddAuthError('Already Added');
	};

	const deleteAuth = (name) =>
		setAuthoritiesState((prev) => prev.filter((el) => el.name !== name));

	const deleteRes = (name) =>
		setResponsibilitiesState((prev) => prev.filter((el) => el.name !== name));

	return (
		<Sidenav title={'Job Description'}>
			<div>
				<div className='text-center mt-3'>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={onSubmit}>
						{(props) => (
							<>
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
												style={{ width: '100%' }}
												inputProps={{ style: { fontSize: 14 } }}
												onChange={props.handleChange('department')}
												onBlur={props.handleBlur('department')}
												value={props.values.department}
												helperText={props.touched.department && props.errors.department}
												error={props.touched.department && props.errors.department}
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
												style={{ width: '100%' }}
												inputProps={{ style: { fontSize: 14 } }}
												onChange={props.handleChange('designation')}
												onBlur={props.handleBlur('designation')}
												value={props.values.designation}
												helperText={props.touched.designation && props.errors.designation}
												error={props.touched.designation && props.errors.designation}
												InputLabelProps={{ style: { fontSize: 14 } }}>
												{!designations || !designations.length ? (
													<p>Data Not Found</p>
												) : (
													designations.map((el, i) => (
														<MenuItem
															value={el._id}
															key={i}
															onClick={() => setDesignation(el)}>
															{el.name}
														</MenuItem>
													))
												)}
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
												style={{ width: '100%' }}
												inputProps={{ style: { fontSize: 14 } }}
												onChange={props.handleChange('employee')}
												onBlur={props.handleBlur('employee')}
												value={props.values.employee}
												helperText={props.touched.employee && props.errors.employee}
												error={props.touched.employee && props.errors.employee}
												InputLabelProps={{ style: { fontSize: 14 } }}>
												{!employees || !employees.length ? (
													<p>Data Not Found</p>
												) : (
													employees.map((el, i) => (
														<MenuItem value={el._id} key={i}>
															{el.name}
														</MenuItem>
													))
												)}
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
												style={{ width: '100%' }}
												inputProps={{ style: { fontSize: 14 } }}
												onChange={props.handleChange('reportTo')}
												onBlur={props.handleBlur('reportTo')}
												value={props.values.reportTo}
												helperText={props.touched.reportTo && props.errors.reportTo}
												error={props.touched.reportTo && props.errors.reportTo}
												InputLabelProps={{ style: { fontSize: 14 } }}>
												{!designations || !designations.length ? (
													<p>Data Not Found</p>
												) : (
													designations.map((el, i) => (
														<MenuItem value={el._id} key={i}>
															{el.name}
														</MenuItem>
													))
												)}
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
												style={{ width: '100%' }}
												inputProps={{ style: { fontSize: 14 } }}
												onChange={props.handleChange('interactionWith')}
												onBlur={props.handleBlur('interactionWith')}
												value={props.values.interactionWith}
												helperText={
													props.touched.interactionWith && props.errors.interactionWith
												}
												error={
													props.touched.interactionWith && props.errors.interactionWith
												}
												InputLabelProps={{ style: { fontSize: 14 } }}>
												{!designations || !designations.length ? (
													<p>Data Not Found</p>
												) : (
													designations.map((el, i) => (
														<MenuItem value={el._id} key={i}>
															{el.name}
														</MenuItem>
													))
												)}
											</CssTextField>
										</Grid>
									</Grid>
								</Form>

								<div className='container mt-5' style={{ textAlign: 'left' }}>
									<h5
										style={{
											textDecoration: 'underline',
											fontWeight: 'bold',
											marginBottom: '1rem',
										}}>
										Responsibilities
									</h5>
									<Formik
										initialValues={responsibilityInitialValue}
										onSubmit={addResponsibility}
										validationSchema={responsibilityValidationSchema}>
										{(props) => (
											<Form>
												<div style={{ display: 'flex', alignItems: 'center' }}>
													<CssTextField
														id='outlined-basic'
														label='Add Responsibility'
														variant='outlined'
														type='date'
														size='small'
														select
														autocomplete='off'
														style={{ width: '75%' }}
														inputProps={{ style: { fontSize: 14 } }}
														onChange={props.handleChange('name')}
														onBlur={props.handleBlur('name')}
														value={props.values.name}
														helperText={props.touched.name && props.errors.name}
														error={props.touched.name && props.errors.name}
														InputLabelProps={{ style: { fontSize: 14 } }}>
														{!responsibilities || !responsibilities.length ? (
															<p>Data Not Found</p>
														) : (
															responsibilities.map((el, i) => (
																<MenuItem
																	value={el.name}
																	key={i}
																	onClick={() => addResponsibility({ name: el?.name })}>
																	{el.name}
																</MenuItem>
															))
														)}
													</CssTextField>

													{addResError && <p>{addResError}</p>}
												</div>
											</Form>
										)}
									</Formik>
									{responsibilitiesState.map((el) => (
										<div
											style={{
												display: 'flex',
												alignItems: 'center',
												gap: '1rem',
												marginTop: '1rem',
											}}>
											<span>{el?.name}</span>
											<Button
												variant='outlined'
												color='primary'
												text='Delete'
												size='small'
												classNames='bg-danger text-light'
												onClick={() => deleteRes(el?.name)}
											/>
										</div>
									))}
									<div style={{ marginTop: 30, marginBottom: 30 }}>
										<hr />
									</div>
								</div>
								<div className='container mt-5' style={{ textAlign: 'left' }}>
									<h5
										style={{
											textDecoration: 'underline',
											fontWeight: 'bold',
											marginBottom: '1rem',
										}}>
										Authorities
									</h5>

									<Formik
										initialValues={authorityInitialValue}
										onSubmit={addAuthority}
										validationSchema={authorityValidationSchema}>
										{(props) => (
											<Form>
												<div style={{ display: 'flex', alignItems: 'center' }}>
													<CssTextField
														id='outlined-basic'
														label='Add Authority'
														variant='outlined'
														type='date'
														size='small'
														select
														autocomplete='off'
														style={{ width: '75%' }}
														inputProps={{ style: { fontSize: 14 } }}
														onChange={props.handleChange('name')}
														onBlur={props.handleBlur('name')}
														value={props.values.name}
														helperText={props.touched.name && props.errors.name}
														error={props.touched.name && props.errors.name}
														InputLabelProps={{ style: { fontSize: 14 } }}>
														{!authorities || !authorities.length ? (
															<p>Data Not Found</p>
														) : (
															authorities.map((el, i) => (
																<MenuItem
																	value={el.name}
																	key={i}
																	onClick={() => addAuthority({ name: el?.name })}>
																	{el.name}
																</MenuItem>
															))
														)}
													</CssTextField>

													{addAuthError && <p>{addAuthError}</p>}
												</div>
											</Form>
										)}
									</Formik>
									{authoritiesState.map((el) => (
										<div
											style={{
												display: 'flex',
												alignItems: 'center',
												gap: '1rem',
												marginTop: '1rem',
											}}>
											<span>{el?.name}</span>
											<Button
												variant='outlined'
												color='primary'
												text='Delete'
												classNames='bg-danger text-light'
												size='small'
												onClick={() => deleteAuth(el?.name)}
											/>
										</div>
									))}
									<div style={{ marginTop: 30, marginBottom: 30 }}>
										<hr />
									</div>
								</div>
								<Form>
									<div>
										<Button
											variant='outlined'
											color='primary'
											classNames={classes.addButton}
											text='Add'
										/>
									</div>
								</Form>
							</>
						)}
					</Formik>
				</div>
			</div>
		</Sidenav>
	);
};

export default JobDescription;
