import React, { useEffect, useState } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
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

import {
	createTrainingPlanes,
	deleteTrainingPlanes,
	getTrainingsPlanes,
	startTrainingPlane,
	endTrainingPlane,
} from '../../../services/action/TrainingPlan';

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
	needIdentifiedBy: '',
	participants: '',
	trainer: '',
	venue: '',
};

const validationSchema = yup.object({
	topic: yup.string().required(),
	needIdentifiedBy: yup.string().required(),
	participants: yup.string().required(),
	trainer: yup.string().required(),
	venue: yup.string().required(),
});

const TrainingPlan = ({ history }) => {
	const [plan, setPlan] = React.useState();
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState(false);
	const classes = useStyles();
	const dispatch = useDispatch();
	const { designations } = useSelector((state) => state.designations);
	const { venues } = useSelector((state) => state.venues);
	const { trainings } = useSelector((state) => state.trainings);
	const { plans } = useSelector((state) => state.trainingPlanes);

	console.log(plans);

	useEffect(async () => {
		dispatch(getDesignation());
		dispatch(getTrainingVenues());
		dispatch(getTrainings());
		dispatch(getTrainingsPlanes());
	}, [dispatch]);

	const onSubmit = async (values) => {
		console.log(values);
		dispatch(createTrainingPlanes(values));
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
						onSubmit={onSubmit}>
						{(props) => (
							<Form>
								{/* Material category selector */}
								<Grid container spacing={1}>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id='outlined-basic'
											label='Select Topic'
											variant='outlined'
											type='text'
											size='small'
											select
											autocomplete='off'
											style={{ width: '80%' }}
											inputProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('topic')}
											onBlur={props.handleBlur('topic')}
											value={props.values.topic}
											helperText={props.touched.topic && props.errors.topic}
											error={props.touched.topic && props.errors.topic}
											InputLabelProps={{ style: { fontSize: 14 } }}>
											{!trainings || !trainings.length ? (
												<p>Data Not Found</p>
											) : (
												trainings.map((el, i) => (
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
											label='Training Needs Identified By'
											variant='outlined'
											type='text'
											autocomplete='off'
											size='small'
											select
											style={{ width: '80%' }}
											inputProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('needIdentifiedBy')}
											onBlur={props.handleBlur('needIdentifiedBy')}
											value={props.values.needIdentifiedBy}
											helperText={
												props.touched.needIdentifiedBy && props.errors.needIdentifiedBy
											}
											error={
												props.touched.needIdentifiedBy && props.errors.needIdentifiedBy
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
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id='outlined-basic'
											label='Participants'
											variant='outlined'
											type='text'
											autocomplete='off'
											size='small'
											select
											style={{ width: '80%' }}
											inputProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('participants')}
											onBlur={props.handleBlur('participants')}
											value={props.values.participants}
											helperText={props.touched.participants && props.errors.participants}
											error={props.touched.participants && props.errors.participants}
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
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id='outlined-basic'
											label='Trainer'
											variant='outlined'
											type='text'
											autocomplete='off'
											size='small'
											select
											style={{ width: '80%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('trainer')}
											onBlur={props.handleBlur('trainer')}
											value={props.values.trainer}
											helperText={props.touched.trainer && props.errors.trainer}
											error={props.touched.trainer && props.errors.trainer}>
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
								<Grid container spacing={1} className='mt-4'>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id='outlined-basic'
											label='Training Venue'
											variant='outlined'
											type='text'
											autocomplete='off'
											size='small'
											select
											style={{ width: '80%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('venue')}
											onBlur={props.handleBlur('venue')}
											value={props.values.venue}
											helperText={props.touched.venue && props.errors.venue}
											error={props.touched.venue && props.errors.venue}>
											{!venues || !venues.length ? (
												<p>Data Not Found</p>
											) : (
												venues.map((el, i) => (
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
										type='submit'
										className={classes.addButton}>
										Add Plan
									</Button>
								</div>
							</Form>
						)}
					</Formik>
				</Container>
				<EditTrainingPlan show={open} handler={handleClose} />

				<div className={classes.dataTable}>
					<TableContainer className={classes.tableContainer}>
						<Table
							stickyHeader
							className='table table-dark'
							style={{ backgroundColor: '#d0cfcf', border: '1px solid grey' }}>
							<TableHead>
								<TableRow hover role='checkbox'>
									<StyledTableCell align='center'>Sr.No</StyledTableCell>
									<StyledTableCell align='center'>Topic</StyledTableCell>
									<StyledTableCell align='center'>
										Training Need Identified By
									</StyledTableCell>
									<StyledTableCell align='center'>Participants</StyledTableCell>
									<StyledTableCell align='center'>Trainer</StyledTableCell>
									<StyledTableCell align='center'>Expected Date/Month</StyledTableCell>
									<StyledTableCell align='center'>Training Venue</StyledTableCell>
									<StyledTableCell align='center'>Action</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{loading ? (
									<p>Loading</p>
								) : error ? (
									<p>Error</p>
								) : plans.length ? (
									plans.map((el, i) => (
										<StyledTableRow>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{i + 1}
											</StyledTableCell>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{el?.topic?.name}
											</StyledTableCell>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{el?.needIdentifiedBy?.name}
											</StyledTableCell>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{el?.participants?.name}
											</StyledTableCell>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{el?.trainer?.name}
											</StyledTableCell>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{el?.startDate ? el?.startDate : '-----'}
											</StyledTableCell>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{el?.venue?.name}
											</StyledTableCell>
											<StyledTableCell className='text-light bg-light' align='center'>
												<>
													<Button
														variant='contained'
														className='bg-dark text-light'
														size='small'
														onClick={() =>
															history.push({
																pathname: '/hr/print_training_plan',
																status: { plane: el },
															})
														}
														style={{ marginTop: 2 }}>
														View
													</Button>
													{el?.status === 'a' && (
														<>
															<Button
																variant='contained'
																className='bg-dark text-light'
																size='small'
																onClick={() => handleOpen()}
																style={{ marginLeft: 2, marginTop: 2 }}>
																Edit
															</Button>
															<Button
																variant='contained'
																color='secondary'
																size='small'
																onClick={() => deleteCategory(el?._id)}
																style={{ marginLeft: 2, marginTop: 2 }}>
																Delete
															</Button>
														</>
													)}
													<Button
														variant='contained'
														color='secondary'
														size='small'
														className='bg-primary'
														onClick={() => {
															el?.status === 'a' && startTraining(el?._id);
															el?.status === 'b' && endTraining(el?._id);
														}}
														style={{ marginLeft: 2, marginTop: 2 }}>
														{el?.status === 'a' && 'Start'}
														{el?.status === 'b' && 'End'}
														{el?.status === 'c' && 'Done'}
													</Button>
													{el?.status !== 'a' && (
														<Link to='/hr/training_attendance' target='_blank'>
															<Button
																variant='contained'
																className='text-light'
																size='small'
																style={{
																	marginLeft: 2,
																	marginTop: 2,
																	backgroundColor: 'rgb(34, 161, 154)',
																}}>
																Attendance
															</Button>
														</Link>
													)}
												</>
											</StyledTableCell>
										</StyledTableRow>
									))
								) : (
									<h5>Not Found</h5>
								)}
							</TableBody>
						</Table>
					</TableContainer>
				</div>
			</div>
		</Sidenav>
	);
};

export default TrainingPlan;
