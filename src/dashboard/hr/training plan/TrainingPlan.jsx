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
import EditTrainingPlan from './EditTrainingPlan';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { fetchDepartmentsAction } from '../../../services/action/DepartmentAction';
import { getDesignation } from '../../../services/action/DesignationAction';
import { getTrainingVenues } from '../../../services/action/TrainingVenue';
import { getTrainings } from '../../../services/action/TrainingAction';
import { getEmployeeByDesignation } from '../../../services/action/EmployeesAction';
import {
	createTrainingPlanes,
	deleteTrainingPlanes,
	getTrainingsPlanes,
	startTrainingPlane,
	endTrainingPlane,
} from '../../../services/action/TrainingPlan';
import Loader from 'react-loader-spinner';
import { capitalize } from '../../../utils/capitalize';

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
	topic: '',
	needIdentifiedByDesignation: '',
	needIdentifiedByEmployee: '',
	participants: '',
	trainerDesignation: '',
	trainerName: '',
	venue: '',
};

const validationSchema = yup.object({
	topic: yup.string().required(),
	needIdentifiedByDesignation: yup.string().required(),
	needIdentifiedByEmployee: yup.string().required(),
	participants: yup.string().required(),
	trainerDesignation: yup.string().required(),
	trainerName: yup.string().required(),
	venue: yup.string().required(),
});

const TrainingPlan = ({ history }) => {
	const [fetchLoading, setFetchLoading] = React.useState(true);
	const [fetchError, setFetchError] = React.useState('');
	const [deleteLoading, setDeleteLoading] = React.useState(false);
	const [deleteError, setDeleteError] = React.useState('');
	const [createLoading, setCreateLoading] = React.useState(false);
	const [createError, setCreateError] = React.useState('');
	const [success, setSuccess] = React.useState('');
	const [plan, setPlan] = React.useState();
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState(false);
	const [selectedTrainerDesignation, setSelectedTrainerDesignation] =
		React.useState('');
	const [
		selectedTrainerIdentifierDesignation,
		setSelectedTrainerIdentifierDesignation,
	] = React.useState('');
	const [trainers, setTrainers] = React.useState([]);
	const [trainingIdentifiers, setTrainingIdentifiers] = React.useState([]);

	const classes = useStyles();

	const dispatch = useDispatch();

	const { designations } = useSelector((state) => state.designations);
	const { venues } = useSelector((state) => state.venues);
	const { trainings } = useSelector((state) => state.trainings);
	const { plans } = useSelector((state) => state.trainingPlanes);

	React.useEffect(() => {
		if (selectedTrainerDesignation) {
			dispatch(
				getEmployeeByDesignation(selectedTrainerDesignation, (data) => {
					setTrainers(data);
				})
			);
		}
	}, [selectedTrainerDesignation]);

	React.useEffect(() => {
		if (selectedTrainerIdentifierDesignation) {
			dispatch(
				getEmployeeByDesignation(
					selectedTrainerIdentifierDesignation,
					(data) => {
						setTrainingIdentifiers(data);
					}
				)
			);
		}
	}, [selectedTrainerIdentifierDesignation]);

	useEffect(async () => {
		dispatch(getDesignation());
		dispatch(getTrainingVenues());
		dispatch(getTrainings());
		setFetchLoading(true);
		dispatch(
			getTrainingsPlanes(null, (err) => {
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
			createTrainingPlanes(values, (err) => {
				if (err) {
					setCreateError(err);
					setTimeout(() => {
						setCreateError('');
					}, 4000);
				} else {
					setSuccess('Training Plan added successfully');
					setTimeout(() => {
						setSuccess('');
					}, 4000);
				}
				setCreateLoading(false);
			})
		);
	};
	const deleteCategory = async (params) => {
		dispatch(deleteTrainingPlanes(params));
	};

	const [open, setOpen] = useState(false);

	const handleClose = (props) => {
		setOpen(props);
	};

	const handleOpen = async (plan) => {
		setPlan(plan);
		setOpen(true);
	};

	const startTraining = async (id) => {
		dispatch(startTrainingPlane(id));
	};

	const endTraining = async (id) => {
		dispatch(endTrainingPlane(id));
	};

	return (
		<Sidenav title={'Training Plan'}>
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
									<Grid item lg={4} md={4} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="Select Topic"
											variant="outlined"
											type="text"
											size="small"
											select
											autocomplete="off"
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('topic')}
											onBlur={props.handleBlur('topic')}
											value={props.values.topic}
											helperText={
												props.touched.topic && props.errors.topic
											}
											error={
												props.touched.topic && props.errors.topic
											}
											InputLabelProps={{ style: { fontSize: 14 } }}
										>
											{!trainings || !trainings.length ? (
												<p>Data Not Found</p>
											) : (
												trainings.map((el, i) => (
													<MenuItem value={el._id} key={i}>
														{capitalize(el.name)}
													</MenuItem>
												))
											)}
										</CssTextField>
									</Grid>
									<Grid item lg={4} md={4} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="Training Needs Identified By Employee Designation"
											variant="outlined"
											type="text"
											autocomplete="off"
											size="small"
											select
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange(
												'needIdentifiedByDesignation'
											)}
											onBlur={props.handleBlur(
												'needIdentifiedByDesignation'
											)}
											value={
												props.values.needIdentifiedByDesignation
											}
											helperText={
												props.touched.needIdentifiedByDesignation &&
												props.errors.needIdentifiedByDesignation
											}
											error={
												props.touched.needIdentifiedByDesignation &&
												props.errors.needIdentifiedByDesignation
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
															setSelectedTrainerIdentifierDesignation(
																el._id
															);
														}}
													>
														{capitalize(el.name)}
													</MenuItem>
												))
											)}
										</CssTextField>
									</Grid>
									<Grid item lg={4} md={4} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="Training Needs Identified By Employee Name"
											variant="outlined"
											type="text"
											autocomplete="off"
											size="small"
											select
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange(
												'needIdentifiedByEmployee'
											)}
											onBlur={props.handleBlur(
												'needIdentifiedByEmployee'
											)}
											value={props.values.needIdentifiedByEmployee}
											helperText={
												props.touched.needIdentifiedByEmployee &&
												props.errors.needIdentifiedByEmployee
											}
											error={
												props.touched.needIdentifiedByEmployee &&
												props.errors.needIdentifiedByEmployee
											}
											InputLabelProps={{ style: { fontSize: 14 } }}
										>
											{!trainingIdentifiers ||
											!trainingIdentifiers.length ? (
												<p>Data Not Found</p>
											) : (
												trainingIdentifiers.map((el, i) => (
													<MenuItem value={el._id} key={i}>
														{capitalize(el.name)}
													</MenuItem>
												))
											)}
										</CssTextField>
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="Participants"
											variant="outlined"
											type="text"
											autocomplete="off"
											size="small"
											select
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('participants')}
											onBlur={props.handleBlur('participants')}
											value={props.values.participants}
											helperText={
												props.touched.participants &&
												props.errors.participants
											}
											error={
												props.touched.participants &&
												props.errors.participants
											}
											InputLabelProps={{ style: { fontSize: 14 } }}
										>
											{!designations || !designations.length ? (
												<p>Data Not Found</p>
											) : (
												designations.map((el, i) => (
													<MenuItem value={el._id} key={i}>
														{capitalize(el.name)}
													</MenuItem>
												))
											)}
										</CssTextField>
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="Trainer Designation"
											variant="outlined"
											type="text"
											autocomplete="off"
											size="small"
											select
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange(
												'trainerDesignation'
											)}
											onBlur={props.handleBlur('trainerDesignation')}
											value={props.values.trainerDesignation}
											helperText={
												props.touched.trainerDesignation &&
												props.errors.trainerDesignation
											}
											error={
												props.touched.trainerDesignation &&
												props.errors.trainerDesignation
											}
										>
											{!designations || !designations.length ? (
												<p>Data Not Found</p>
											) : (
												designations.map((el, i) => (
													<MenuItem
														value={el._id}
														key={i}
														onClick={() => {
															setSelectedTrainerDesignation(
																el._id
															);
														}}
													>
														{capitalize(el.name)}
													</MenuItem>
												))
											)}
										</CssTextField>
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="Trainer Name"
											variant="outlined"
											type="text"
											autocomplete="off"
											size="small"
											select
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('trainerName')}
											onBlur={props.handleBlur('trainerName')}
											value={props.values.trainerName}
											helperText={
												props.touched.trainerName &&
												props.errors.trainerName
											}
											error={
												props.touched.trainerName &&
												props.errors.trainerName
											}
										>
											{!trainers || !trainers.length ? (
												<p>Data Not Found</p>
											) : (
												trainers.map((el, i) => (
													<MenuItem value={el._id} key={i}>
														{capitalize(el.name)}
													</MenuItem>
												))
											)}
										</CssTextField>
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="Training Venue"
											variant="outlined"
											type="text"
											autocomplete="off"
											size="small"
											select
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('venue')}
											onBlur={props.handleBlur('venue')}
											value={props.values.venue}
											helperText={
												props.touched.venue && props.errors.venue
											}
											error={
												props.touched.venue && props.errors.venue
											}
										>
											{!venues || !venues.length ? (
												<p>Data Not Found</p>
											) : (
												venues.map((el, i) => (
													<MenuItem value={el._id} key={i}>
														{capitalize(el.name)}
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
										loading={createLoading}
										loaderColor="#333"
										classNames={classes.addButton}
										text="Submit"
									/>
								</div>
							</Form>
						)}
					</Formik>
				</Container>
				<EditTrainingPlan
					show={open}
					handler={handleClose}
					training={plan}
				/>

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
				) : plans?.length === 0 ? (
					<p>There is no data found.</p>
				) : (
					<div className={classes.dataTable}>
						<TableContainer className={classes.tableContainer}>
							<Table
								stickyHeader
								className="table table-dark"
								style={{
									backgroundColor: '#d0cfcf',
									border: '1px solid grey',
								}}
							>
								<TableHead>
									<TableRow hover role="checkbox">
										<StyledTableCell align="center">
											Sr.No
										</StyledTableCell>
										<StyledTableCell align="center">
											Topic
										</StyledTableCell>
										<StyledTableCell align="center">
											Training Need Identified By
										</StyledTableCell>
										<StyledTableCell align="center">
											Participants
										</StyledTableCell>
										<StyledTableCell align="center">
											Trainer
										</StyledTableCell>
										<StyledTableCell align="center">
											Expected Date/Month
										</StyledTableCell>
										<StyledTableCell align="center">
											Training Venue
										</StyledTableCell>
										<StyledTableCell align="center">
											Action
										</StyledTableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{plans.map((el, i) => (
										<StyledTableRow>
											<StyledTableCell
												className="text-dark bg-light"
												align="center"
											>
												{i + 1}
											</StyledTableCell>
											<StyledTableCell
												className="text-dark bg-light"
												align="center"
											>
												{el?.topic?.name}
											</StyledTableCell>
											<StyledTableCell
												className="text-dark bg-light"
												align="center"
											>
												{el?.needIdentifiedByEmployee?.name}
												<p style={{ fontSize: 10 }}>
													({el?.needIdentifiedByDesignation?.name})
												</p>
											</StyledTableCell>
											<StyledTableCell
												className="text-dark bg-light"
												align="center"
											>
												{el?.participants?.name}
											</StyledTableCell>
											<StyledTableCell
												className="text-dark bg-light"
												align="center"
											>
												{el?.trainerName?.name}
												<p style={{ fontSize: 10 }}>
													({el?.trainerDesignation?.name})
												</p>
											</StyledTableCell>
											<StyledTableCell
												className="text-dark bg-light"
												align="center"
											>
												{el?.startDate ? el?.startDate : '-----'}
											</StyledTableCell>
											<StyledTableCell
												className="text-dark bg-light"
												align="center"
											>
												{el?.venue?.name}
											</StyledTableCell>
											<StyledTableCell
												className="text-light bg-light"
												align="center"
											>
												<>
													<Button
														variant="contained"
														classNames="bg-dark text-light"
														size="small"
														onClick={() =>
															history.push({
																pathname:
																	'/hr/print_training_plan',
																state: { plane: el },
															})
														}
														text="View"
														style={{ marginTop: 2 }}
													/>
													<Button
														variant="contained"
														classNames="bg-dark text-light"
														size="small"
														onClick={() => handleOpen(el)}
														text="Edit"
														style={{
															marginLeft: 2,
															marginTop: 2,
														}}
													/>

													{el?.status === 'a' && (
														<>
															<Button
																variant="contained"
																color="secondary"
																size="small"
																text="Delete"
																onClick={() =>
																	deleteCategory(el?._id)
																}
																style={{
																	marginLeft: 2,
																	marginTop: 2,
																}}
															/>
														</>
													)}
													<Button
														variant="contained"
														color="secondary"
														size="small"
														className="bg-primary"
														onClick={() => {
															el?.status === 'a' &&
																startTraining(el?._id);
															el?.status === 'b' &&
																endTraining(el?._id);
														}}
														style={{
															marginLeft: 2,
															marginTop: 2,
														}}
														text={
															el?.status === 'a'
																? 'Start'
																: el?.status === 'b'
																? 'End'
																: 'Done'
														}
													/>

													{el?.status !== 'a' && (
														<Link
															to={{
																pathname:
																	'/hr/training_attendance',
																state: el,
															}}
														>
															<Button
																variant="contained"
																className="text-light"
																size="small"
																style={{
																	marginLeft: 2,
																	marginTop: 2,
																	backgroundColor:
																		'rgb(34, 161, 154)',
																}}
																text="Attendance"
															/>
														</Link>
													)}
												</>
											</StyledTableCell>
										</StyledTableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</div>
				)}
			</div>
		</Sidenav>
	);
};

export default TrainingPlan;
