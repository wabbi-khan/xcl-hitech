import React, { useEffect } from 'react';
import Sidenav from '../../../../SideNav/Sidenav';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import FormGroup from '@material-ui/core/FormGroup';
import RadioGroup from '@material-ui/core/RadioGroup';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { createExtEmpPerformanceAction } from '../../../../../services/action/ExecPerformance';
import { getEmployeeByDesignationAndDepartment } from '../../../../../services/action/EmployeesAction';
import { getDesignation } from '../../../../../services/action/DesignationAction';
import { fetchDepartmentsAction } from '../../../../../services/action/DepartmentAction';
import { getExtEmpRatingAction } from '../../../../../services/action/ExecRating';
import { getExtEmpRequisitionAction } from '../../../../../services/action/ExecPrereq';

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
	name: '',
	_id: '',
	probation: '',
	createdAt: '',
	suggestions: '',
	recommendations: '',
};

const validationSchema = yup.object({
	name: yup.mixed().required(),
	department: yup.string().required(),
	designation: yup.string().required(),
	_id: yup.string().required(),
	probation: yup.string().required(),
	createdAt: yup.string().required(),
	suggestions: yup.string().required(),
	recommendations: yup.string().required(),
});

const ExecEmpAssestPerform = ({ history }) => {
	const [department, setDepartment] = React.useState();
	const [designation, setDesignation] = React.useState();
	const [employee, setEmployee] = React.useState();
	const [initialValuesForForm, setInitialValuesForForm] =
		React.useState(initialValues);
	const [ratingList, setRatingList] = React.useState([]);
	const [total, setTotal] = React.useState(0);
	const classes = useStyles();
	const dispatch = useDispatch();
	const { designations } = useSelector((state) => state.designations);
	const { departments } = useSelector((state) => state.departments);
	const { employees } = useSelector((state) => state.employees);
	const { execPrereq } = useSelector((state) => state.execPrereq);
	const { execRat } = useSelector((state) => state.execRat);

	React.useEffect(() => {
		dispatch(getDesignation());
		dispatch(fetchDepartmentsAction());
		dispatch(getExtEmpRatingAction());
		dispatch(getExtEmpRequisitionAction());
	}, []);

	useEffect(() => {
		if (execPrereq) {
			const temp = execPrereq.map((el) => {
				return { ...el, selected: '', calculated: 0, comments: '' };
			});
			setRatingList([...temp]);
		}
	}, [execPrereq]);

	React.useEffect(() => {
		employee &&
			setInitialValuesForForm({
				...initialValuesForForm,
				...employee,
				designation,
				department,
				name: employee._id,
			});
	}, [employee]);

	React.useEffect(() => {
		department &&
			designation &&
			dispatch(
				getEmployeeByDesignationAndDepartment(designation, department)
			);
	}, [designation, department]);

	const onSubmit = (values) => {
		dispatch(
			createExtEmpPerformanceAction(
				{
					employee: values._id,
					...values,
					list: ratingList,
				},
				() => {
					history.push({
						pathname:
							'/hr/performance_assessment/print_executive_emp_performance',
						state: {
							assessment: { employee, list: ratingList, total, values },
						},
					});
				}
			)
		);
	};

	const onCheck = (e, index, index2) => {
		const temp = ratingList?.map((el, i) =>
			i === index
				? {
						...el,
						selected: e.target.value,
						calculated: execRat[index2].calculated,
				  }
				: el
		);
		setRatingList(temp);
	};

	const onRecommendationChange = (e, index) => {
		const temp = ratingList?.map((el, i) =>
			i === index ? { ...el, comments: e.target.value } : el
		);
		setRatingList(temp);
	};

	React.useEffect(() => {
		calculateTotal();
	}, [ratingList]);

	const calculateTotal = () => {
		if (ratingList) {
			let total = 0;
			ratingList.map((el) => {
				total += parseInt(el?.calculated);
			});
			setTotal(total);
		}
	};
	return (
		<Sidenav title={'Employees Performance Assessment (Executive)'}>
			<div>
				<Container className={classes.mainContainer}>
					<Formik
						initialValues={initialValuesForForm}
						validationSchema={validationSchema}
						enableReinitialize
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
											style={{ width: '75%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('department')}
											onBlur={props.handleBlur('department')}
											value={props.values.department}
											error={
												props.touched.department &&
												props.errors.department
											}
											helperText={
												props.touched.department &&
												props.errors.department
											}
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
											label="Select Position/Title"
											variant="outlined"
											type="text"
											autocomplete="off"
											size="small"
											select
											style={{ width: '75%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('designation')}
											onBlur={props.handleBlur('designation')}
											value={props.values.designation}
											error={
												props.touched.designation &&
												props.errors.designation
											}
											helperText={
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
											label="Employee Name"
											variant="outlined"
											type="text"
											autocomplete="off"
											size="small"
											select
											style={{ width: '75%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('name')}
											onBlur={props.handleBlur('name')}
											value={props.values.name}
											error={props.touched.name && props.errors.name}
											helperText={
												props.touched.name && props.errors.name
											}
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
								</Grid>
								<Grid container spacing={1} className="mt-3">
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											variant="outlined"
											type="text"
											size="small"
											disabled
											autocomplete="off"
											style={{ width: '75%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('createdAt')}
											onBlur={props.handleBlur('createdAt')}
											value={props.values.createdAt}
											error={
												props.touched.createdAt &&
												props.errors.createdAt
											}
											helperText={
												props.touched.createdAt &&
												props.errors.createdAt
											}
										/>
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="Select End of Probation"
											variant="outlined"
											type="text"
											autocomplete="off"
											size="small"
											select
											style={{ width: '75%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('probation')}
											onBlur={props.handleBlur('probation')}
											value={props.values.probation}
											error={
												props.touched.probation &&
												props.errors.probation
											}
											helperText={
												props.touched.probation &&
												props.errors.probation
											}
										>
											<MenuItem value="6">6-Months</MenuItem>
											<MenuItem value="1">1-Year</MenuItem>
										</CssTextField>
									</Grid>
								</Grid>
								<div style={{ marginTop: 30, marginBottom: 30 }}>
									<hr />
								</div>
								<div className="text-center">
									<h5 style={{ textDecoration: 'underline' }}>
										PERFORMANCE ASSESSMENT
									</h5>
									<h6 className="mt-3">
										A CHECK MARK HAS BEEN PLACED IN THE BOX WHICH MOST
										CLOSELY INDICATES THE EMPLOYEE'S PERFORMANCE{' '}
										<br /> OF EACH FACTOR. FACTOR RATINGS OF
										"OUTSTANDING" OR "UNSATISFACTORY" HAVE BEEN
										SUBSTANCIATED BY COMMENTS.
									</h6>
									<h4 style={{ marginTop: '2rem' }}>Rating</h4>
									{ratingList &&
										ratingList?.map((topEl, topIndex) => (
											<div className="text-center mt-4">
												<table
													class="table table-striped table-inverse table-responsive table-bordered table-hover"
													style={{ marginLeft: 60 }}
												>
													<thead class="thead-inverse thead-dark">
														{topIndex < 1 && (
															<tr>
																<th>PERFORMANCE FACTORS</th>
																{execRat &&
																	execRat?.length > 0 &&
																	execRat?.map((el, i) => (
																		<th>{el?.name}</th>
																	))}
															</tr>
														)}
													</thead>
													<tbody>
														{topIndex < 1 && (
															<tr>
																<td scope="row"></td>
																{execRat &&
																	execRat?.length > 0 &&
																	execRat?.map((el, i) => (
																		<td>
																			({el?.calculated})
																		</td>
																	))}
															</tr>
														)}
														<tr>
															<td scope="row">
																{topEl?.heading}
															</td>
															{topEl?.points?.map((el, i) => (
																<td>{el}</td>
															))}
														</tr>
														<tr>
															<td scope="row"></td>
															{topEl?.points?.map((el, i) => (
																<td className="text-center">
																	<RadioGroup
																		row
																		className="ml-5"
																		name="rating"
																		value={topEl?.selected}
																	>
																		<FormControlLabel
																			control={
																				<Radio
																					style={{
																						color: '#22A19A',
																					}}
																					onChange={(e) =>
																						onCheck(
																							e,
																							topIndex,
																							i
																						)
																					}
																					value={el}
																				/>
																			}
																		/>
																	</RadioGroup>
																</td>
															))}
														</tr>
													</tbody>
												</table>
												<div className="text-left mt-4">
													<CssTextField
														id="outlined-basic"
														label="Comments/Recommendations"
														variant="outlined"
														type="text"
														value={topEl?.comments}
														size="small"
														autocomplete="off"
														style={{
															width: '50%',
															marginLeft: 60,
														}}
														inputProps={{
															style: { fontSize: 14 },
														}}
														InputLabelProps={{
															style: { fontSize: 14 },
														}}
														onChange={(e) =>
															onRecommendationChange(e, topIndex)
														}
													/>
												</div>
											</div>
										))}
								</div>
								<div className="text-center mt-5">
									<table
										class="table table-striped table-inverse table-responsive table-hover"
										style={{ marginLeft: 60 }}
									>
										<thead class="thead-inverse thead-dark">
											<tr>
												<th colspan="2">RATING CALCULATION:</th>
												<th colspan="4">
													(Each number of ratingschecks, multiply
													and total)
												</th>
											</tr>
										</thead>
										<tbody>
											{execRat &&
												execRat?.length > 0 &&
												execRat?.map((el) => (
													<tr>
														<td scope="row">{el?.name}</td>
														<td scope="row">{el?.calculated}</td>
														<td scope="row">x</td>
														<td scope="row">
															{
																ratingList.filter(
																	(tempEl) =>
																		tempEl?.calculated ===
																		el?.calculated
																).length
															}
														</td>
														<td scope="row">=</td>
														<td scope="row">
															{ratingList.filter(
																(tempEl) =>
																	tempEl?.calculated ===
																	el?.calculated
															).length * parseInt(el.calculated)}
														</td>
													</tr>
												))}
											<tr>
												<td colspan="2">TOTAL</td>
												<td colspan="3"></td>
												<td>{total}</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div className="text-center mt-5">
									<table
										class="table table-striped table-inverse table-responsive table-hover"
										style={{ marginLeft: 60 }}
									>
										<thead class="thead-inverse thead-dark">
											<tr>
												<th>RATING TABLE:</th>
												<th colspan="2">MEETINGS OF GOALS</th>
											</tr>
										</thead>
										<tbody>
											{execRat &&
												execRat?.length > 0 &&
												execRat?.map((el) => (
													<tr>
														<td scope="row">{el?.name}</td>
														<td scope="row">
															{el?.min}-{el?.max}
														</td>
														<td className="text-center">
															<FormGroup
																row
																style={{
																	marginLeft: 30,
																	marginTop: -7,
																}}
															>
																<FormControlLabel
																	control={
																		<Checkbox
																			style={{
																				color: 'black',
																			}}
																			disabled
																			checked={
																				total > el?.min &&
																				total < el?.max
																					? true
																					: false
																			}
																			color="default"
																			icon={
																				<CheckBoxOutlineBlankIcon fontSize="small" />
																			}
																			checkedIcon={
																				<CheckBoxIcon fontSize="small" />
																			}
																		/>
																	}
																/>
															</FormGroup>
														</td>
													</tr>
												))}
										</tbody>
									</table>
								</div>
								<div style={{ marginTop: 30, marginBottom: 30 }}>
									<hr />
								</div>
								<Container className={classes.mainContainer}>
									<h5 className="text-left mt-5">Overall Ratings</h5>
									{execRat &&
										execRat?.length > 0 &&
										execRat?.map((el) => (
											<>
												<Grid
													container
													spacing={1}
													style={{ marginTop: 15 }}
												>
													<Grid item lg={2} md={2} sm={12} xs={12}>
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
								<div className="text-left mt-4">
									<CssTextField
										id="outlined-basic"
										label="Suggestions"
										variant="outlined"
										type="text"
										size="small"
										autocomplete="off"
										style={{ width: '50%', marginLeft: 60 }}
										inputProps={{ style: { fontSize: 14 } }}
										InputLabelProps={{ style: { fontSize: 14 } }}
										onChange={props.handleChange('suggestions')}
										onBlur={props.handleBlur('suggestions')}
										value={props.values.suggestions}
										error={
											props.touched.suggestions &&
											props.errors.suggestions
										}
										helperText={
											props.touched.suggestions &&
											props.errors.suggestions
										}
									/>
								</div>
								<div className="text-left mt-4">
									<CssTextField
										id="outlined-basic"
										label="Recommendations"
										variant="outlined"
										type="text"
										size="small"
										autocomplete="off"
										style={{ width: '50%', marginLeft: 60 }}
										inputProps={{ style: { fontSize: 14 } }}
										InputLabelProps={{ style: { fontSize: 14 } }}
										onChange={props.handleChange('recommendations')}
										onBlur={props.handleBlur('recommendations')}
										value={props.values.recommendations}
										error={
											props.touched.recommendations &&
											props.errors.recommendations
										}
										helperText={
											props.touched.recommendations &&
											props.errors.recommendations
										}
									/>
								</div>
								<div>
									<Button
										variant="outlined"
										color="primary"
										type="submit"
										className={classes.addButton}
									>
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

export default ExecEmpAssestPerform;
