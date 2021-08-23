import React, { useEffect, useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import MenuItem from '@material-ui/core/MenuItem';

import Fade from '@material-ui/core/Fade';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '../../../components/utils/Button';
import { useDispatch, useSelector } from 'react-redux';
import { updateJobDescriptions } from '../../../services/action/jobDescriptionAction';
import { getEmployees } from '../../../services/action/EmployeesAction';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { getEmployeeByDesignationAndDepartment } from '../../../services/action/EmployeesAction';

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		width: 500,
	},
	mainContainer: {
		marginTop: 800,
	},
	addButton: {
		marginTop: 20,
		marginRight: 10,
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
			// width: '12%',
		},
	},
	closeButton: {
		marginTop: 20,
		marginRight: 10,
		color: '#e74c3c',
		borderColor: '#e74c3c',
		fontWeight: 'bold',
		'&:hover': {
			border: 'none',
			backgroundColor: '#e74c3c',
			color: 'whitesmoke',
		},
		[theme.breakpoints.up('md')]: {
			width: '15%',
		},
		[theme.breakpoints.down('sm')]: {
			// width: '12%',
		},
	},
	inputFieldStyle: {
		[theme.breakpoints.up('md')]: {
			width: 330,
		},
		[theme.breakpoints.down('sm')]: {
			width: 200,
		},
	},
	inputFieldStyle1: {
		marginTop: 10,
		[theme.breakpoints.up('md')]: {
			width: 330,
		},
		[theme.breakpoints.down('sm')]: {
			width: 200,
			marginTop: 10,
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
	department: yup.string(),
	designation: yup.string(),
	employee: yup.string(),
	reportTo: yup.string(),
	interactionWith: yup.string(),
});

const EditJobDescription = (props) => {
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState('');
	const [success, setSuccess] = React.useState('');
	const [open, setOpen] = useState(false);
	const [initialValuesState, setInitialValues] = React.useState({
		...initialValues,
	});
	const [responsibilitiesState, setResponsibilitiesState] = React.useState([]);
	const [authoritiesState, setAuthoritiesState] = React.useState([]);
	const [department, setDepartment] = React.useState('');
	const [designation, setDesignation] = React.useState('');
	const [addResError, setAddResError] = React.useState('');
	const [addAuthError, setAddAuthError] = React.useState('');

	const { departments } = useSelector((state) => state.departments);
	const { designations } = useSelector((state) => state.designations);
	const { employees } = useSelector((state) => state.employees);
	const { responsibilities } = useSelector((state) => state.responsibilities);
	const { authorities } = useSelector((state) => state.authorities);

	const { show, handler, description } = props;
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

	useEffect(() => {
		if (description) {
			setInitialValues({
				reportTo: description?.reportTo?._id,
				employee: description?.employee?._id,
				department: description?.employee?.finalDepartment?._id,
				designation: description?.employee?.finalDesignation?._id,
				interactionWith: description?.interactionWith?._id,
			});
			setAuthoritiesState([...description?.authorities]);
			setResponsibilitiesState([...description?.responsibilities]);
		}
	}, [description]);

	React.useEffect(() => {
		if (department && designation) {
			dispatch(getEmployeeByDesignationAndDepartment(designation._id, department));
		}
	}, [department && designation]);

	useEffect(() => {
		setOpen(show);
	}, [show]);

	useEffect(() => {
		dispatch(getEmployees());
	}, []);

	const onSubmit = async (values) => {
		values = {
			...values,
			responsibilities: responsibilitiesState,
			authorities: authoritiesState,
		};
		setLoading(true);
		dispatch(
			updateJobDescriptions(description._id, values, (err) => {
				if (err) {
					setError(err);
					setTimeout(() => {
						setError('');
					}, 4000);
				} else {
					setLoading(false);
					setSuccess(true);
					setTimeout(() => {
						setSuccess(false);
					}, 4000);
				}
				setLoading(false);
			}),
		);
	};

	const handleClose = () => {
		handler(false);
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
		<div>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				className={classes.modal}
				open={open}
				style={{
					overflowY: 'scroll',
				}}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}>
				<Fade in={open}>
					<div className={classes.paper}>
						<Container className={classes.mainContainer}>
							<div
								style={{
									height: '100%',
									backgroundColor: '#fff',
									border: '2px solid #333',
									padding: '10px 30px 10px 30px',
								}}>
								<h5 className='text-center mt-4'>Update</h5>
								<Formik
									initialValues={initialValuesState}
									validationSchema={validationSchema}
									enableReinitialize
									onSubmit={onSubmit}>
									{(props) => (
										<Form>
											<CssTextField
												id='outlined-basic'
												label='Select Department'
												variant='outlined'
												type='text'
												size='small'
												select
												autocomplete='off'
												style={{ width: '100%', marginTop: '1rem' }}
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
											<CssTextField
												id='outlined-basic'
												label='Select Designation'
												variant='outlined'
												type='text'
												size='small'
												select
												autocomplete='off'
												style={{ width: '100%', marginTop: '1rem' }}
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
											<CssTextField
												id='outlined-basic'
												label='Select Employee Name'
												variant='outlined'
												type='text'
												autocomplete='off'
												size='small'
												select
												style={{ width: '100%', marginTop: '1rem' }}
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
											<CssTextField
												id='outlined-basic'
												label='Reports To'
												variant='outlined'
												type='text'
												autocomplete='off'
												size='small'
												select
												style={{ width: '100%', marginTop: '1rem' }}
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
											<CssTextField
												id='outlined-basic'
												label='Interaction With'
												variant='outlined'
												type='date'
												size='small'
												select
												autocomplete='off'
												style={{ width: '100%', marginTop: '1rem' }}
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
											<h4 style={{ marginTop: '1rem' }}>Responsibilities</h4>
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
											<h4 style={{ marginTop: '1rem' }}>Authorities</h4>

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
											<div
												style={{
													marginTop: '2rem',
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'center',
												}}>
												<Button
													variant='contained'
													color='primary'
													text='Update'
													style={{ marginRight: '1rem' }}
													loading={loading}
												/>
												<Button
													variant='outlined'
													color='dark'
													onClick={handleClose}
													text='Close'
													type='button'
													classNames='bg-danger text-light'
												/>
											</div>
											{error && <p>{error}</p>}
											{success && <p>Responsibility Successfully Updated</p>}
										</Form>
									)}
								</Formik>
							</div>
						</Container>
					</div>
				</Fade>
			</Modal>
		</div>
	);
};

export default EditJobDescription;
