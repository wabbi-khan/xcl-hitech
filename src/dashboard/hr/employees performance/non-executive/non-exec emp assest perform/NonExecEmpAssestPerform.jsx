import React, { useState, useEffect } from 'react';
import Sidenav from '../../../../SideNav/Sidenav';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import { AiOutlineCheck } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { getDesignation } from '../../../../../services/action/DesignationAction';
import { fetchDepartmentsAction } from '../../../../../services/action/DepartmentAction';
import { getEmployeeByDesignationAndDepartment } from '../../../../../services/action/EmployeesAction';
import { getNonExtEmpRatAction } from '../../../../../services/action/NonExecRat';
import { getNonExtEmpAssesAction } from '../../../../../services/action/NonExecPrereqActions';
import { createNonExtEmpPerformanceAction } from '../../../../../services/action/NonExtPerformance';
import Button from '../../../../../components/utils/Button';

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
		marginTop: 20,
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
	inputFieldStyle: {
		// boxShadow: '0.4px 0.4px 0.4px 0.4px grey',
		// borderRadius: 5,
		[theme.breakpoints.up('md')]: {
			width: 250,
		},
		[theme.breakpoints.down('sm')]: {
			width: 200,
		},
	},
	inputFieldStyle1: {
		[theme.breakpoints.up('md')]: {
			width: 250,
			marginLeft: 70,
		},
		[theme.breakpoints.down('sm')]: {
			width: 200,
		},
	},
	inputFieldStyle2: {
		[theme.breakpoints.up('md')]: {
			width: 250,
			marginLeft: 140,
		},
		[theme.breakpoints.down('sm')]: {
			width: 200,
		},
	},
	inputFieldStyle3: {
		[theme.breakpoints.up('md')]: {
			width: 250,
			marginLeft: 210,
		},
		[theme.breakpoints.down('sm')]: {
			width: 200,
		},
	},
	delete: {
		color: 'red',
		fontSize: 38,
		[theme.breakpoints.up('md')]: {
			marginLeft: 50,
			marginTop: -7,
		},
		[theme.breakpoints.down('sm')]: {
			marginTop: -10,
		},
	},
	deleteRowBtn: {
		marginLeft: 220,
		'&:hover': {
			border: 'none',
			background: 'none',
		},
	},
	uploadImgBtn: {
		paddingLeft: 20,
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

const initialValuesForTopForm = {
	employeeName: '',
	_id: '',
	age: '',
	dateOfBirth: '',
	finalSal: '',
	createdAt: '',
	department: '',
	designation: '',
	remarks: '',
};

const validationSchemaForTopForm = yup.object({
	employeeName: yup.mixed().required(),
	_id: yup.string().required(),
	age: yup.string().required(),
	dateOfBirth: yup.string().required(),
	finalSal: yup.string().required(),
	createdAt: yup.string().required(),
	designation: yup.string().required(),
	department: yup.string().required(),
	remarks: yup.string().required(),
});

const NonExecEmpAssestPerform = ({ history }) => {
	const [createLoading, setCreateLoading] = useState(false);
	const [createError, setCreateError] = useState('');
	const [success, setSuccess] = useState('');
	const [department, setDepartment] = React.useState();
	const [designation, setDesignation] = React.useState();
	const [initialValueState, setInitialValueState] = useState(
		initialValuesForTopForm
	);
	const [employee, setEmployee] = React.useState({});
	const [total, setTotal] = useState(0);
	const [initialValuesForDiscipline, setInitialValuesForDiscipline] = useState(
		[]
	);

	const classes = useStyles();
	const dispatch = useDispatch();

	const { designations } = useSelector((state) => state.designations);
	const { departments } = useSelector((state) => state.departments);
	const { nonExecRat } = useSelector((state) => state.nonExecRat);
	const { nonExecPrereq } = useSelector((state) => state.nonExecPrereq);
	const { employees } = useSelector((state) => state.employees);

	useEffect(() => {
		nonExecPrereq && setInitialValuesForDiscipline(nonExecPrereq);
	}, [nonExecPrereq]);

	useEffect(() => {
		employee &&
			setInitialValueState({
				...initialValueState,
				...employee,
				designation,
				department,
				employeeName: employee._id,
			});
	}, [employee]);

	useEffect(() => {
		dispatch(getDesignation());
		dispatch(fetchDepartmentsAction());
		dispatch(getNonExtEmpRatAction());
		dispatch(getNonExtEmpAssesAction());
	}, [dispatch]);

	React.useEffect(() => {
		if (department && designation) {
			dispatch(
				getEmployeeByDesignationAndDepartment(designation, department)
			);
		}
	}, [department, designation]);

	const onSubmit = (values) => {
		values = {
			employee: values._id,
			remarks: values.remarks,
			total,
			assessment: initialValuesForDiscipline,
		};
		setCreateLoading(true);
		dispatch(
			createNonExtEmpPerformanceAction(values, (err) => {
				if (err) {
					setCreateError(err);
					setTimeout(() => {
						setCreateError('');
					}, 4000);
				} else {
					setSuccess('Category added successfully');
					setTimeout(() => {
						setSuccess('');
					}, 4000);
				}
				setCreateLoading(false);
			})
		);
	};

	React.useEffect(() => {
		let tempTotal = 0;
		initialValuesForDiscipline.length > 0 &&
			initialValuesForDiscipline.forEach((el) => {
				el.list.forEach((el, i) => {
					if (el?.obtain) tempTotal += el.obtain;
				});
			});
		setTotal(tempTotal);
	}, [initialValuesForDiscipline]);

	const onMarksChange = (e, i1, i2) => {
		const temp = { ...initialValuesForDiscipline[i1] };
		const temp2 = temp.list.map((el, i) =>
			i === i2 ? { ...el, obtain: parseInt(e.target.value) } : el
		);
		setInitialValuesForDiscipline([
			...initialValuesForDiscipline.map((el, i) =>
				i === i1 ? { ...temp, list: temp2 } : el
			),
		]);
	};
	return (
		<Sidenav title={'Assest Employees Performance (Non-Executive)'}>
			<div>
				<Container className={classes.mainContainer}>
					<Formik
						initialValues={initialValueState}
						enableReinitialize
						validationSchema={validationSchemaForTopForm}
						onSubmit={onSubmit}
					>
						{(props) => (
							<Form>
								<Grid container spacing={1}>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="Select Department"
											variant="outlined"
											type="text"
											autocomplete="off"
											size="small"
											select
											style={{ width: '100%', marginBottom: '1rem' }}
											inputProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('department')}
											onBlur={props.handleBlur('department')}
											value={props.values.department}
											helperText={
												props.touched.department &&
												props.errors.department
											}
											error={
												props.touched.department &&
												props.errors.department
											}
											InputLabelProps={{ style: { fontSize: 14 } }}
										>
											{departments && departments.length > 0 ? (
												departments.map((el) => (
													<MenuItem
														key={el?._id}
														value={el?._id}
														onClick={() => setDepartment(el._id)}
													>
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
											id="outlined-basic"
											label="Select Designation"
											variant="outlined"
											type="text"
											autocomplete="off"
											size="small"
											style={{ width: '100%', marginBottom: '1rem' }}
											select
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('designation')}
											onBlur={props.handleBlur('designation')}
											value={props.values.designation}
											helperText={
												props.touched.designation &&
												props.errors.designation
											}
											error={
												props.touched.designation &&
												props.errors.designation
											}
										>
											{designations && designations.length > 0 ? (
												designations.map((el) => (
													<MenuItem
														key={el?._id}
														value={el?._id}
														onClick={() => setDesignation(el._id)}
													>
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
											id="outlined-basic"
											label="Select Employee"
											variant="outlined"
											type="text"
											autocomplete="off"
											size="small"
											select
											style={{ width: '100%', marginBottom: '1rem' }}
											onChange={props.handleChange('employeeName')}
											onBlur={props.handleBlur('employeeName')}
											value={props.values.employeeName}
											helperText={
												props.touched.employeeName &&
												props.errors.employeeName
											}
											error={
												props.touched.employeeName &&
												props.errors.employeeName
											}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
										>
											{employees && employees.length > 0 ? (
												employees.map((el) => (
													<MenuItem
														key={el?._id}
														value={el?._id}
														onClick={() => setEmployee(el)}
													>
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
											id="outlined-basic"
											label="Employee No."
											variant="outlined"
											type="text"
											size="small"
											disabled
											autocomplete="off"
											style={{ width: '100%', marginBottom: '1rem' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('_id')}
											onBlur={props.handleBlur('_id')}
											value={props.values._id}
											helperText={
												props.touched._id && props.errors._id
											}
											error={props.touched._id && props.errors._id}
										/>
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="DOB"
											variant="outlined"
											type="text"
											autocomplete="off"
											size="small"
											disabled
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											style={{ width: '100%', marginBottom: '1rem' }}
											onChange={props.handleChange('dateOfBirth')}
											onBlur={props.handleBlur('dateOfBirth')}
											value={props.values.dateOfBirth}
											helperText={
												props.touched.dateOfBirth &&
												props.errors.dateOfBirth
											}
											error={
												props.touched.dateOfBirth &&
												props.errors.dateOfBirth
											}
										/>
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="Age"
											variant="outlined"
											type="number"
											autocomplete="off"
											size="small"
											style={{ width: '100%', marginBottom: '1rem' }}
											disabled
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('age')}
											onBlur={props.handleBlur('age')}
											value={props.values.age}
											helperText={
												props.touched.age && props.errors.age
											}
											error={props.touched.age && props.errors.age}
										/>
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="Present Basic Pay"
											variant="outlined"
											type="text"
											autocomplete="off"
											size="small"
											style={{ width: '100%', marginBottom: '1rem' }}
											disabled
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('finalSal')}
											onBlur={props.handleBlur('finalSal')}
											value={props.values.finalSal}
											helperText={
												props.touched.finalSal &&
												props.errors.finalSal
											}
											error={
												props.touched.finalSal &&
												props.errors.finalSal
											}
										/>
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="Date of Joining"
											variant="outlined"
											type="text"
											size="small"
											disabled
											style={{ width: '100%', marginBottom: '1rem' }}
											autocomplete="off"
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('createdAt')}
											onBlur={props.handleBlur('createdAt')}
											value={props.values.createdAt}
											helperText={
												props.touched.createdAt &&
												props.errors.createdAt
											}
											error={
												props.touched.createdAt &&
												props.errors.createdAt
											}
										/>
									</Grid>
								</Grid>
								<div style={{ marginTop: 30, marginBottom: 30 }}>
									<hr />
								</div>
								<Container className={classes.mainContainer}>
									<h5 className="text-left">Disciplines</h5>
									{initialValuesForDiscipline &&
										initialValuesForDiscipline.length > 0 &&
										initialValuesForDiscipline?.map((el, i1) => (
											<Grid
												container
												spacing={1}
												style={{ marginTop: 15 }}
											>
												<Grid item lg={1} md={1} className="mt-2">
													<h5 className={classes.itemHeading}>
														{i1 + 1}
													</h5>
												</Grid>
												<Grid
													item
													lg={12}
													md={12}
													sm={12}
													xs={12}
													className="mt-2"
												>
													<h6>{el?.heading}</h6>
												</Grid>
												{el?.list?.map((el, i2) => (
													<Grid
														container
														spacing={1}
														style={{ marginTop: 15 }}
													>
														<p>{el?.value}</p>
														<Grid
															item
															lg={2}
															md={2}
															sm={12}
															xs={12}
														>
															<CssTextField
																id="outlined-basic"
																label="Marks Allocated"
																variant="outlined"
																type="number"
																size="small"
																autocomplete="off"
																disabled
																value={el?.marks}
																inputProps={{
																	style: { fontSize: 14 },
																}}
																InputLabelProps={{
																	style: { fontSize: 14 },
																}}
															/>
														</Grid>
														<Grid
															item
															lg={2}
															md={2}
															sm={12}
															xs={12}
														>
															<CssTextField
																id="outlined-basic"
																label="Marks Awarded"
																variant="outlined"
																type="number"
																size="small"
																autocomplete="off"
																onChange={(e) =>
																	onMarksChange(e, i1, i2)
																}
																inputProps={{
																	style: { fontSize: 14 },
																}}
																InputLabelProps={{
																	style: { fontSize: 14 },
																}}
															/>
														</Grid>
													</Grid>
												))}
											</Grid>
										))}
									<p>{total}</p>
								</Container>
								<div style={{ marginTop: 30, marginBottom: 30 }}>
									<hr />
								</div>
								<Container className={classes.mainContainer1}>
									<h5 className="text-left">Ratings Table</h5>
									{nonExecRat &&
										nonExecRat.length > 0 &&
										nonExecRat.map((el, i) => (
											<Grid
												container
												spacing={1}
												style={{ marginTop: 15, paddingRight: 120 }}
											>
												<Grid item lg={3} md={3} sm={12} xs={12}>
													{total >= el?.min && total < el?.max && (
														<AiOutlineCheck />
													)}
													<h6>{el?.name}</h6>
												</Grid>
												<Grid item lg={2} md={2} sm={12} xs={12}>
													<h6>
														{el?.min}-{el?.max - 1}
													</h6>
												</Grid>
											</Grid>
										))}
								</Container>
								<Container className={classes.mainContainer}>
									<h5 className="text-left mt-5">Overall Ratings</h5>
									{nonExecRat &&
										nonExecRat.length > 0 &&
										nonExecRat.map((el, i) => (
											<>
												<Grid
													container
													spacing={1}
													style={{ marginTop: 15 }}
												>
													<Grid item lg={2} md={2} sm={12} xs={12}>
														{total >= el?.min &&
															total < el?.max && (
																<AiOutlineCheck />
															)}
														<h6
															style={{
																textDecoration: 'underline',
															}}
														>
															{el?.name}
														</h6>
													</Grid>
												</Grid>
												<Grid container spacing={1}>
													<Grid item lg={6} md={6} sm={12} xs={12}>
														<p>{el?.description}</p>
													</Grid>
												</Grid>
											</>
										))}
								</Container>
								<div style={{ marginTop: 30, marginBottom: 30 }}>
									<hr />
								</div>
								<Container style={{ textAlign: 'left' }}>
									<h5 className="text-left">General Remarks</h5>
									<CssTextField
										id="outlined-basic"
										label="Remarks (If Any)"
										variant="outlined"
										type="text"
										size="small"
										autocomplete="off"
										style={{ width: '50%' }}
										inputProps={{ style: { fontSize: 14 } }}
										InputLabelProps={{ style: { fontSize: 14 } }}
										onChange={props.handleChange('remarks')}
										onBlur={props.handleBlur('remarks')}
										value={props.values.remarks}
										helperText={
											props.touched.remarks && props.errors.remarks
										}
										error={
											props.touched.remarks && props.errors.remarks
										}
									/>
								</Container>
								<div>
									<Button
										variant="outlined"
										color="primary"
										text="Submit"
										loading={createLoading}
										loaderColor="#333"
										classNames={classes.addButton}
									/>
								</div>
								{createError && <p>{createError}</p>}
								{success && <p>Successfully added</p>}
							</Form>
						)}
					</Formik>
				</Container>
			</div>
		</Sidenav>
	);
};

export default NonExecEmpAssestPerform;
