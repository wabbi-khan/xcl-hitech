import React, { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import Button from '../../../components/utils/Button';
import { getEmployeeByDesignation } from '../../../services/action/EmployeesAction';
import { updateTrainingPlanes } from '../../../services/action/TrainingPlan';

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		height: 'auto',
		width: 500,
	},
	mainContainer: {
		textAlign: 'center',
		marginTop: 20,
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

const EditTrainingPlan = (props) => {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState('');
	const [success, setSuccess] = React.useState('');
	const [initialValuesState, setInitialValues] = React.useState({
		...initialValues,
	});
	const [trainingIdentifiers, setTrainingIdentifiers] = React.useState([]);
	const [selectedTrainerDesignation, setSelectedTrainerDesignation] =
		React.useState('');
	const [trainers, setTrainers] = React.useState([]);
	const [
		selectedTrainerIdentifierDesignation,
		setSelectedTrainerIdentifierDesignation,
	] = React.useState('');

	const { show, handler, training } = props;

	const dispatch = useDispatch();

	const classes = useStyles();

	const { designations } = useSelector((state) => state.designations);
	const { venues } = useSelector((state) => state.venues);
	const { trainings } = useSelector((state) => state.trainings);

	useEffect(() => {
		setOpen(show);
	}, [show]);

	useEffect(() => {
		if (training) {
			setInitialValues({
				topic: training?.topic?._id,
				needIdentifiedByDesignation:
					training?.needIdentifiedByDesignation?._id,
				needIdentifiedByEmployee: training?.needIdentifiedByEmployee?._id,
				participants: training?.participants?._id,
				trainerDesignation: training?.trainerDesignation?._id,
				trainerName: training?.trainerName?._id,
				venue: training?.venue?._id,
			});
			setSelectedTrainerIdentifierDesignation(
				training?.needIdentifiedByDesignation?._id
			);
			setSelectedTrainerDesignation(training?.trainerDesignation?._id);
		}
	}, [training]);

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

	React.useEffect(() => {
		if (selectedTrainerDesignation) {
			dispatch(
				getEmployeeByDesignation(selectedTrainerDesignation, (data) => {
					setTrainers(data);
				})
			);
		}
	}, [selectedTrainerDesignation]);

	const onSubmit = async (values) => {
		setLoading(true);
		dispatch(
			updateTrainingPlanes(training._id, values, (err) => {
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
			})
		);
		setLoading(true);
	};

	const handleClose = () => {
		handler(false);
	};

	return (
		<div>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={open}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<div className={classes.paper}>
						<h5 className="text-center mt-4">Edit/Update</h5>
						<Container className={classes.mainContainer}>
							<Formik
								initialValues={initialValuesState}
								validationSchema={validationSchema}
								onSubmit={onSubmit}
							>
								{(props) => (
									<Form>
										<Grid container spacing={1}>
											<Grid lg={12} md={12} sm={12} className="mt-2">
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
														props.touched.topic &&
														props.errors.topic
													}
													error={
														props.touched.topic &&
														props.errors.topic
													}
													InputLabelProps={{
														style: { fontSize: 14 },
													}}
												>
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
											<Grid lg={12} md={12} sm={12} className="mt-3">
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
														props.values
															.needIdentifiedByDesignation
													}
													helperText={
														props.touched
															.needIdentifiedByDesignation &&
														props.errors
															.needIdentifiedByDesignation
													}
													error={
														props.touched
															.needIdentifiedByDesignation &&
														props.errors
															.needIdentifiedByDesignation
													}
													InputLabelProps={{
														style: { fontSize: 14 },
													}}
												>
													{!designations ||
													!designations.length ? (
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
																{el.name}
															</MenuItem>
														))
													)}
												</CssTextField>
											</Grid>
											<Grid lg={12} md={12} sm={12} className="mt-3">
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
													value={
														props.values.needIdentifiedByEmployee
													}
													helperText={
														props.touched
															.needIdentifiedByEmployee &&
														props.errors.needIdentifiedByEmployee
													}
													error={
														props.touched
															.needIdentifiedByEmployee &&
														props.errors.needIdentifiedByEmployee
													}
													InputLabelProps={{
														style: { fontSize: 14 },
													}}
												>
													{!trainingIdentifiers ||
													!trainingIdentifiers.length ? (
														<p>Data Not Found</p>
													) : (
														trainingIdentifiers.map((el, i) => (
															<MenuItem value={el._id} key={i}>
																{el.name}
															</MenuItem>
														))
													)}
												</CssTextField>
											</Grid>
											<Grid lg={12} md={12} sm={12} className="mt-3">
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
													onChange={props.handleChange(
														'participants'
													)}
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
													InputLabelProps={{
														style: { fontSize: 14 },
													}}
												>
													{!designations ||
													!designations.length ? (
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
											<Grid lg={12} md={12} sm={12} className="mt-3">
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
													InputLabelProps={{
														style: { fontSize: 14 },
													}}
													onChange={props.handleChange(
														'trainerDesignation'
													)}
													onBlur={props.handleBlur(
														'trainerDesignation'
													)}
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
													{!designations ||
													!designations.length ? (
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
																{el.name}
															</MenuItem>
														))
													)}
												</CssTextField>
											</Grid>
											<Grid lg={12} md={12} sm={12} className="mt-3">
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
													InputLabelProps={{
														style: { fontSize: 14 },
													}}
													onChange={props.handleChange(
														'trainerName'
													)}
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
																{el.name}
															</MenuItem>
														))
													)}
												</CssTextField>
											</Grid>
											<Grid lg={12} md={12} sm={12} className="mt-3">
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
													InputLabelProps={{
														style: { fontSize: 14 },
													}}
													onChange={props.handleChange('venue')}
													onBlur={props.handleBlur('venue')}
													value={props.values.venue}
													helperText={
														props.touched.venue &&
														props.errors.venue
													}
													error={
														props.touched.venue &&
														props.errors.venue
													}
												>
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
										<div
											style={{
												marginTop: '2rem',
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
											}}
										>
											<Button
												variant="contained"
												color="primary"
												text="Update"
												style={{ marginRight: '1rem' }}
												loading={loading}
											/>
											<Button
												variant="outlined"
												color="dark"
												onClick={handleClose}
												text="Close"
												type="button"
												classNames="bg-danger text-light"
											/>
										</div>
										{error && <p>{error}</p>}
										{success && (
											<p>Responsibility Successfully Updated</p>
										)}
									</Form>
								)}
							</Formik>
						</Container>
					</div>
				</Fade>
			</Modal>
		</div>
	);
};

export default EditTrainingPlan;
