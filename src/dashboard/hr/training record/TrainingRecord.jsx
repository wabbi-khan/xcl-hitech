import React, { useEffect, useState } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '../../../components/utils/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import FormGroup from '@material-ui/core/FormGroup';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { getDesignation } from '../../../services/action/DesignationAction';
import { getTrainingsPlanes } from '../../../services/action/TrainingPlan';
import { getEmployeeByDesignation } from '../../../services/action/EmployeesAction';
import {
	getTrainingEvaluations,
	createTrainingEvaluation,
} from '../../../services/action/trainingEvaluationAction';
import Loader from 'react-loader-spinner';

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
		marginTop: 40,
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
		marginTop: 70,
		textAlign: 'center',
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
	training: '',
	method: '',
	result: '',
	evaluatedBy: '',
	evaluatedByEmployee: '',
};

const validationSchema = yup.object({
	training: yup.string().required(),
	method: yup.string().required(),
	result: yup.string().required(),
	evaluatedBy: yup.string().required(),
	evaluatedByEmployee: yup.string().required(),
});

const TrainingRecord = ({ history }) => {
	const [createLoading, setCreateLoading] = React.useState(false);
	const [createError, setCreateError] = React.useState('');
	const [success, setSuccess] = React.useState('');
	const [selectedDesignation, setSelectedDesignation] = React.useState('');
	const [fetchLoading, setFetchLoading] = React.useState(false);
	const [fetchError, setFetchError] = React.useState('');
	const classes = useStyles();

	const dispatch = useDispatch();
	const { designations } = useSelector((state) => state.designations);
	const { plans } = useSelector((state) => state.trainingPlanes);
	const { employees } = useSelector((state) => state.employees);
	const { trainingEvaluations } = useSelector(
		(state) => state.trainingEvaluations
	);

	useEffect(() => {
		if (selectedDesignation) {
			dispatch(getEmployeeByDesignation(selectedDesignation));
		}
	}, [selectedDesignation]);

	useEffect(async () => {
		dispatch(getDesignation());
		dispatch(getTrainingsPlanes());
		setFetchLoading(true);
		dispatch(
			getTrainingEvaluations(null, (err) => {
				if (err) {
					setFetchError(err);
					setTimeout(() => {
						setFetchError('');
					}, 4000);
				}
				setFetchLoading(false);
			})
		);
	}, [dispatch]);

	const onSubmit = async (values) => {
		setCreateLoading(true);
		dispatch(
			createTrainingEvaluation(values, (err) => {
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

	return (
		<Sidenav title={'Training Record and Evaluation'}>
			<div>
				<Container className={classes.mainContainer}>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={onSubmit}
					>
						{(props) => (
							<Form>
								<Grid container spacing={1}>
									<Grid item lg={8} md={8} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="Select Training"
											variant="outlined"
											type="text"
											size="small"
											select
											autocomplete="off"
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('training')}
											onBlur={props.handleBlur('training')}
											value={props.values.training}
											helperText={
												props.touched.training &&
												props.errors.training
											}
											error={
												props.touched.training &&
												props.errors.training
											}
											InputLabelProps={{ style: { fontSize: 14 } }}
										>
											{!plans || !plans.length ? (
												<p>Data Not Found</p>
											) : (
												plans.map((el, i) => (
													<MenuItem value={el._id} key={i}>
														{el.topic?.name}
													</MenuItem>
												))
											)}
										</CssTextField>
									</Grid>
									<Grid item lg={4} md={4} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="Evaluation Method"
											variant="outlined"
											type="text"
											autocomplete="off"
											size="small"
											select
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('method')}
											onBlur={props.handleBlur('method')}
											value={props.values.method}
											helperText={
												props.touched.method && props.errors.method
											}
											error={
												props.touched.method && props.errors.method
											}
											InputLabelProps={{ style: { fontSize: 14 } }}
										>
											<MenuItem value="interview">
												Interview
											</MenuItem>
											<MenuItem value="written test">
												Written Test
											</MenuItem>
										</CssTextField>
									</Grid>
									<Grid item lg={4} md={4} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="Training Evaluation Result"
											variant="outlined"
											type="text"
											autocomplete="off"
											size="small"
											select
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('result')}
											onBlur={props.handleBlur('result')}
											value={props.values.result}
											helperText={
												props.touched.result && props.errors.result
											}
											error={
												props.touched.result && props.errors.result
											}
											InputLabelProps={{ style: { fontSize: 14 } }}
										>
											<MenuItem value="satisfactory">
												Satisfactory
											</MenuItem>
											<MenuItem value="unsatisfactory">
												Unsatisfactory
											</MenuItem>
										</CssTextField>
									</Grid>
									<Grid item lg={4} md={4} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="Evaluated By"
											variant="outlined"
											type="text"
											autocomplete="off"
											size="small"
											select
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('evaluatedBy')}
											onBlur={props.handleBlur('evaluatedBy')}
											value={props.values.evaluatedBy}
											helperText={
												props.touched.evaluatedBy &&
												props.errors.evaluatedBy
											}
											error={
												props.touched.evaluatedBy &&
												props.errors.evaluatedBy
											}
											InputLabelProps={{ style: { fontSize: 14 } }}
										>
											{!designations || !designations.length ? (
												<p>Data Not Found</p>
											) : (
												designations.map((el, i) => (
													<MenuItem
														value={el._id}
														key={i}
														onClick={() => {
															setSelectedDesignation(el._id);
														}}
													>
														{el.name}
													</MenuItem>
												))
											)}
										</CssTextField>
									</Grid>
									<Grid item lg={4} md={4} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="Select Employee"
											variant="outlined"
											type="text"
											autocomplete="off"
											size="small"
											select
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange(
												'evaluatedByEmployee'
											)}
											onBlur={props.handleBlur(
												'evaluatedByEmployee'
											)}
											value={props.values.evaluatedByEmployee}
											helperText={
												props.touched.evaluatedByEmployee &&
												props.errors.evaluatedByEmployee
											}
											error={
												props.touched.evaluatedByEmployee &&
												props.errors.evaluatedByEmployee
											}
											InputLabelProps={{ style: { fontSize: 14 } }}
										>
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
								</Grid>
								<div>
									<Button
										variant="outlined"
										color="primary"
										text="Submit"
										classNames={classes.addButton}
										loading={createLoading}
										loaderColor="#333"
									/>
									{createError && <p>{createError}</p>}
								</div>
							</Form>
						)}
					</Formik>
				</Container>
				<div className={classes.dataTable}>
					{fetchLoading ? (
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								marginTop: '3rem',
							}}
						>
							<Loader
								type="TailSpin"
								color="#000"
								width="3rem"
								height="3rem"
							/>
						</div>
					) : trainingEvaluations?.length === 0 ? (
						<p>There are no Records for Evaluation</p>
					) : (
						<table class="table table-responsive table-hover table-striped table-bordered border-dark text-center mt-3">
							{trainingEvaluations?.map((el, i) => (
								<>
									{i === 0 && (
										<thead class="bg-dark text-light">
											<tr>
												<th>S.No.</th>
												<th>Training</th>
												<th>Evaluated By</th>
												<th>Method</th>
												<th>Result</th>
												<th>Action</th>
											</tr>
										</thead>
									)}
									<tbody>
										<tr>
											<td>{i + 1}</td>
											<td>{el?.training?.topic?.name}</td>
											<td>
												{el?.evaluatedByEmployee?.name}
												<p style={{ fontSize: 10 }}>
													({el?.evaluatedBy?.name})
												</p>
											</td>
											<td>{el?.method}</td>
											<td>{el?.result}</td>
											<td>
												<div
													style={{
														display: 'flex',
														flexDirection: 'row',
														alignItems: 'center',
														justifyContent: 'center',
													}}
												>
													<Button
														variant="contained"
														classNames="bg-dark text-light"
														size="small"
														onClick={() =>
															history.push({
																pathname:
																	'/hr/print_training_record_and_evaluation',
																state: { evaluation: el },
															})
														}
														text="View"
													/>
												</div>
											</td>
										</tr>
									</tbody>
								</>
							))}
						</table>
					)}
				</div>
			</div>
		</Sidenav>
	);
};

export default TrainingRecord;
