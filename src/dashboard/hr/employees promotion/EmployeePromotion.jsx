import React, { useEffect, useState } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import { Formik, Form } from 'formik';
import { getDesignation } from '../../../services/action/DesignationAction';
import { fetchDepartmentsAction } from '../../../services/action/DepartmentAction';
import {
	getEmployeeByDesignationAndDepartment,
	promoteEmployee,
} from '../../../services/action/EmployeesAction';

import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../components/utils/Button';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: '25ch',
		},
	},
	mainContainer: {
		marginTop: 20,
		textAlign: 'center',
	},
	addButton: {
		marginTop: 50,
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
	table: {
		minWidth: 600,
	},
	dataTable: {
		marginTop: 40,
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
		[theme.breakpoints.up('md')]: {
			width: 330,
			marginLeft: 10,
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
	promoteTo: '',
};

const validationSchema = yup.object({
	department: yup.string().required(),
	designation: yup.string().required(),
	employee: yup.string().required(),
	promoteTo: yup.string().required(),
});

const EmployeePromotion = ({ history }) => {
	const [department, setDepartment] = useState('');
	const [designation, setDesignations] = useState('');
	const [employee, setEmployee] = useState('');
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState('');

	const { departments } = useSelector((state) => state.departments);
	const { designations } = useSelector((state) => state.designations);
	const { employees } = useSelector((state) => state.employees);

	const classes = useStyles();

	const dispatch = useDispatch();

	useEffect(() => {
		if (department && designation) {
			dispatch(getEmployeeByDesignationAndDepartment(designation, department));
		}
	}, [department, designation]);

	useEffect(async () => {
		dispatch(getDesignation());
		dispatch(fetchDepartmentsAction());
	}, []);

	const onSubmit = async (props) => {
		setLoading(true);
		dispatch(
			promoteEmployee(employee, { promoteTo: props.promoteTo }, (err) => {
				if (err) {
				} else {
					setSuccess('Employee successfully promoted');
					setTimeout(() => {
						setSuccess('');
					}, 4000);
				}
				setLoading(false);
			}),
		);
	};

	return (
		<Sidenav title={'Employees Promotion'}>
			<div>
				<Container className={classes.mainContainer}>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={onSubmit}>
						{(props) => (
							<Form>
								<Grid container spacing={1}>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id='outlined-basic'
											label='Select Department'
											variant='outlined'
											type='text'
											autocomplete='off'
											size='small'
											select
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
											label='Designation'
											variant='outlined'
											type='text'
											autocomplete='off'
											size='small'
											select
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
														onClick={() => setDesignations(el._id)}>
														{el.name}
													</MenuItem>
												))
											)}
										</CssTextField>
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id='outlined-basic'
											label='Select Employee'
											variant='outlined'
											type='text'
											size='small'
											select
											autocomplete='off'
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
													<MenuItem
														value={el._id}
														key={i}
														onClick={() => setEmployee(el._id)}>
														{el.name}
													</MenuItem>
												))
											)}
										</CssTextField>
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id='outlined-basic'
											label='Promote To'
											variant='outlined'
											type='text'
											select
											size='small'
											autocomplete='off'
											style={{ width: '100%' }}
											onChange={props.handleChange('promoteTo')}
											onBlur={props.handleBlur('promoteTo')}
											value={props.values.promoteTo}
											helperText={props.touched.promoteTo && props.errors.promoteTo}
											error={props.touched.promoteTo && props.errors.promoteTo}
											inputProps={{ style: { fontSize: 14 } }}
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
								<div>
									<Button
										variant='outlined'
										color='primary'
										text='Submit'
										loading={loading}
										loaderColor='#333'
										classNames={classes.addButton}
									/>

									{success && <p>{success}</p>}
								</div>
							</Form>
						)}
					</Formik>
				</Container>
			</div>
		</Sidenav>
	);
};

export default EmployeePromotion;
