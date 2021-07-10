import React, { useEffect } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { getDesignation } from '../../../services/action/DesignationAction';
import { fetchDepartmentsAction } from '../../../services/action/DepartmentAction';
import { getEmployees } from '../../../services/action/EmployeesAction';
import { useDispatch, useSelector } from 'react-redux';

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow);

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
	employees: '',
	department: '',
	designation: '',
};

const validationSchema = yup.object({
	employees: yup.string().required(),
	department: yup.string().required(),
	designation: yup.string().required(),
});

const EmpCompetencEval = ({ history }) => {
	const [cnic, setCnic] = React.useState('');
	const [selectedDesignation, setSelectedDesignation] = React.useState();
	const [criteria, setCriteria] = React.useState([]);
	const classes = useStyles();
	const { designations } = useSelector((state) => state.designations);
	const { departments } = useSelector((state) => state.departments);
	const { employees } = useSelector((state) => state.employees);

	const dispatch = useDispatch();

	React.useEffect(() => {
		if (selectedDesignation) {
			let temp = Object.keys(selectedDesignation?.criteria);
			temp = temp.map((el) => {
				return { name: el, capability: '', remarks: '' };
			});
			console.log(temp);
			setCriteria(temp);
		}
	}, [selectedDesignation]);

	useEffect(async () => {
		dispatch(fetchDepartmentsAction());
		dispatch(getDesignation());
		dispatch(getEmployees());
	}, []);

	const onSubmit = async (props) => {
		console.log(criteria);
	};

	const onChange = (value, index, key) => {
		const temp = criteria.map((el, i) =>
			i === index ? { ...el, [key]: value } : el,
		);
		setCriteria(temp);
	};

	return (
		<Sidenav title={"Employee's Competency Evaluation"}>
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
											label='Select Employee Name'
											variant='outlined'
											type='text'
											size='small'
											select
											autocomplete='off'
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('employees')}
											onBlur={props.handleBlur('employees')}
											value={props.values.employees}
											helperText={props.touched.employees && props.errors.employees}
											error={props.touched.employees && props.errors.employees}
											InputLabelProps={{ style: { fontSize: 14 } }}>
											{employees && employees.length > 0 ? (
												employees.map((el) => (
													<MenuItem
														key={el?._id}
														value={el?._id}
														onClick={() => setCnic(el?.cnic)}>
														{el?.name}
													</MenuItem>
												))
											) : (
												<p>Not found</p>
											)}
										</CssTextField>
									</Grid>
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
											{departments && departments.length > 0 ? (
												departments.map((el) => (
													<MenuItem key={el?._id} value={el?._id}>
														{el?.name}
													</MenuItem>
												))
											) : (
												<p>Not found</p>
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
											{designations && designations.length > 0 ? (
												designations.map((el) => (
													<MenuItem
														key={el?._id}
														value={el?._id}
														onClick={() => setSelectedDesignation(el)}>
														{el?.name}
													</MenuItem>
												))
											) : (
												<p>Not found</p>
											)}
										</CssTextField>
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id='outlined-basic'
											label='CNIC No.'
											variant='outlined'
											type='text'
											autocomplete='off'
											size='small'
											disabled
											style={{ width: '100%' }}
											value={cnic}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
										/>
									</Grid>
								</Grid>
								{criteria &&
									criteria.length > 0 &&
									criteria.map((el, i) => (
										<div
											className='container-fluid'
											style={{ textAlign: 'left', marginTop: '50px' }}>
											{i === 0 && (
												<h5 style={{ textDecoration: 'underline' }}>Evaluation:</h5>
											)}
											<table class='table table-responsive table-hover table-striped table-bordered border-dark text-center mt-3'>
												<tbody>
													{i === 0 && (
														<tr style={{ fontWeight: 'bold' }}>
															<td>Parameter</td>
															<td>Minimum Required</td>
														</tr>
													)}
													<tr>
														<td style={{ fontWeight: 'bold' }}>{el?.name}</td>
														{selectedDesignation?.criteria[el?.name]?.req?.map((el, i) => (
															<td>
																{el.name && el.name}
																{el.skill && el.skill}
															</td>
														))}
													</tr>
													<Grid
														container
														spacing={1}
														style={{ marginTop: 15, marginBottom: '10px' }}>
														<Grid item lg={6} md={6} sm={12} xs={12}>
															<CssTextField
																id='outlined-basic'
																label='Remarks'
																variant='outlined'
																type='text'
																size='small'
																autocomplete='off'
																style={{ width: '100%' }}
																onChange={(e) => onChange(e.target.value, i, 'capability')}
																inputProps={{ style: { fontSize: 14 } }}
																InputLabelProps={{ style: { fontSize: 14 } }}
															/>
														</Grid>
														<Grid item lg={6} md={6} sm={12} xs={12}>
															<CssTextField
																id='outlined-basic'
																label='Remarks'
																variant='outlined'
																type='text'
																size='small'
																autocomplete='off'
																onChange={(e) => onChange(e.target.value, i, 'remarks')}
																style={{ width: '100%' }}
																inputProps={{ style: { fontSize: 14 } }}
																InputLabelProps={{ style: { fontSize: 14 } }}
															/>
														</Grid>
													</Grid>
												</tbody>
											</table>
											<div style={{ marginTop: 30, marginBottom: 30 }}>
												<hr />
											</div>
											<Grid
												container
												spacing={1}
												style={{ marginTop: 15, marginBottom: '10px' }}>
												<Grid item lg={6} md={8} sm={12} xs={12}>
													<CssTextField
														id='outlined-basic'
														label='Evaluation Summary'
														variant='outlined'
														type='text'
														size='small'
														autocomplete='off'
														style={{ width: '100%' }}
														inputProps={{ style: { fontSize: 14 } }}
														InputLabelProps={{ style: { fontSize: 14 } }}
													/>
												</Grid>
											</Grid>
										</div>
									))}
								<div>
									<Button
										variant='outlined'
										color='primary'
										type='submit'
										className={classes.addButton}>
										Submit
									</Button>
								</div>
							</Form>
						)}
					</Formik>
				</Container>
			</div>
		</Sidenav>
	);
};

export default EmpCompetencEval;
