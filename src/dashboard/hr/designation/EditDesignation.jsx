import React, { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { updateDesignation } from '../../../services/action/DesignationAction';
import { getEducations } from '../../../services/action/EducationAction';
import { getSkills } from '../../../services/action/SkillsAction';
import { getExperiences } from '../../../services/action/ExperienceAction';
import Button from '../../../components/utils/Button';
import { useDispatch, useSelector } from 'react-redux';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		justifyContent: 'center',
	},
	paper: {
		width: 500,
	},
	mainContainer: {
		textAlign: 'center',
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
	name: '',
};

const validationSchema = yup.object({
	name: yup.string().required(),
});

const educationInitialValues = {
	value: '',
};

const educationValidationSchema = yup.object({
	value: yup.string().required(),
});

const skillInitialValues = {
	value: '',
};

const skillValidationSchema = yup.object({
	value: yup.string().required(),
});

const experienceInitialValues = {
	value: '',
};

const experienceValidationSchema = yup.object({
	value: yup.string().required(),
});

const EditDesignation = (props) => {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState('');
	const [success, setSuccess] = React.useState('');
	const [pageError, setPageError] = React.useState('');
	const [educationsState, setEducations] = React.useState([]);
	const [skillsState, setSkills] = React.useState([]);
	const [experiencesState, setExperiences] = React.useState([]);
	const [initialValuesState, setInitialValuesState] = React.useState({
		...initialValues,
	});

	const { skills } = useSelector((state) => state.skills);
	const { educations } = useSelector((state) => state.educations);
	const { experiences } = useSelector((state) => state.experiences);

	const dispatch = useDispatch();

	const { show, handler, designation } = props;

	const classes = useStyles();

	useEffect(() => {
		if (designation) {
			setInitialValuesState({
				name: designation?.name,
			});
			setEducations([...designation?.educations]);
			setSkills([...designation?.skills]);
			setExperiences([...designation?.experiences]);
		}
	}, [designation]);

	useEffect(() => {
		dispatch(getEducations());
		dispatch(getExperiences());
		dispatch(getSkills());
	}, [dispatch]);

	useEffect(() => {
		setOpen(show);
	}, [show]);

	const setPageErrorState = (error) => {
		setPageError(error);
		setTimeout(() => {
			setPageError('');
		}, 4000);
	};

	function addEdu(el) {
		let found = false;
		educationsState.forEach((value) => {
			if (value._id === el._id) {
				found = true;
			}
		});
		if (!found) {
			setEducations((prev) => [...prev, el]);
		} else {
			setPageErrorState(`${el?.name} is already added in the Educations`);
		}
	}

	function addSkill(el) {
		let found = false;
		skillsState.forEach((value) => {
			if (value._id === el._id) {
				found = true;
			}
		});

		if (!found) {
			setSkills((prev) => [...prev, el]);
		} else {
			setPageErrorState(`${el?.skill} is already added in the Skills`);
		}
	}

	function addExp(el) {
		let found = false;
		experiencesState.forEach((value) => {
			if (value._id === el._id) {
				found = true;
			}
		});
		if (!found) {
			setExperiences((prev) => [...prev, el]);
		} else {
			setPageErrorState(`${el?.name} is already added in the Experiences`);
		}
	}

	function removeEdu(el) {
		setEducations((prev) => prev.filter((value) => value._id !== el?._id));
	}

	function removeSkill(el) {
		setSkills((prev) => prev.filter((value) => value._id !== el?._id));
	}

	function removeExp(el) {
		setExperiences((prev) => prev.filter((value) => value._id !== el?._id));
	}

	const onSubmit = (values) => {
		values = {
			...values,
			educations: educationsState,
			skills: skillsState,
			experiences: experiencesState,
		};
		setLoading(true);
		dispatch(
			updateDesignation(designation._id, values, (err) => {
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
				style={{
					overflowY: 'scroll',
				}}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<div className={classes.paper}>
						<Container className={classes.mainContainer}>
							<div
								style={{
									height: '100%',
									backgroundColor: '#fff',
									border: '2px solid #333',
									padding: '10px 30px 10px 30px',
								}}
							>
								{pageError && <p>{pageError}</p>}
								<h5
									style={{
										marginBottom: '50px',
										textDecoration: 'underline',
									}}
									className="text-center mt-4"
								>
									Update
								</h5>
								<Formik
									initialValues={initialValuesState}
									validationSchema={validationSchema}
									onSubmit={onSubmit}
								>
									{(props) => (
										<>
											<Form>
												<Grid container spacing={1}>
													<Grid lg={12} md={12} sm={12}>
														<CssTextField
															id="outlined-basic"
															label="Designation Name"
															variant="outlined"
															type="text"
															size="small"
															autoComplete="off"
															defaultValue={designation.name}
															style={{ width: '100%' }}
															inputProps={{
																style: { fontSize: 14 },
															}}
															InputLabelProps={{
																style: { fontSize: 14 },
															}}
															onChange={props.handleChange(
																'name'
															)}
															onBlur={props.handleBlur('name')}
															value={props?.values?.name}
															helperText={
																props.touched.name &&
																props.errors.name
															}
															error={
																props.touched.name &&
																props.errors.name
															}
														/>
													</Grid>
												</Grid>
											</Form>
											<div
												style={{
													margin: '3rem 0rem 2rem 0rem',
													textDecoration: 'underline',
												}}
											>
												<h4>Competence Criteria</h4>
											</div>
											<Formik
												initialValues={educationInitialValues}
												validationSchema={educationValidationSchema}
												onSubmit={addEdu}
											>
												{(props) => (
													<Form>
														<h5>Educations</h5>
														<div style={{ display: 'flex' }}>
															<CssTextField
																id="outlined-basic"
																label="Education"
																variant="outlined"
																type="text"
																autocomplete="off"
																size="small"
																select
																style={{ width: '100%' }}
																inputProps={{
																	style: { fontSize: 14 },
																}}
																InputLabelProps={{
																	style: { fontSize: 14 },
																}}
																onChange={props.handleChange(
																	'value'
																)}
																onBlur={props.handleBlur(
																	'value'
																)}
																value={props.values.value}
																helperText={
																	props.touched.value &&
																	props.errors.value
																}
																error={
																	props.touched.value &&
																	props.errors.value
																}
															>
																{educations &&
																	educations.map(
																		(education, i) => (
																			<MenuItem
																				value={
																					education._id
																				}
																				key={i}
																				onClick={() =>
																					addEdu(education)
																				}
																			>
																				{education.name}
																			</MenuItem>
																		)
																	)}
															</CssTextField>
														</div>
														{educationsState.map((el, i) => (
															<p className={classes.resStyle}>
																<span style={{ fontSize: 13 }}>
																	{i + 1}.{' '}
																</span>
																{el?.name}
																<DeleteOutlineIcon
																	type="button"
																	className={classes.delete}
																	onClick={() => removeEdu(el)}
																/>
															</p>
														))}
													</Form>
												)}
											</Formik>
											<div style={{ margin: '2rem 0rem' }}></div>

											<Formik
												initialValues={skillInitialValues}
												validationSchema={skillValidationSchema}
												onSubmit={addSkill}
											>
												{(props) => (
													<Form>
														<h5>Skills</h5>
														<div style={{ display: 'flex' }}>
															<CssTextField
																id="outlined-basic"
																label="Skills"
																variant="outlined"
																type="text"
																autocomplete="off"
																size="small"
																select
																style={{ width: '100%' }}
																inputProps={{
																	style: { fontSize: 14 },
																}}
																InputLabelProps={{
																	style: { fontSize: 14 },
																}}
																onChange={props.handleChange(
																	'value'
																)}
																onBlur={props.handleBlur(
																	'value'
																)}
																value={props.values.value}
																helperText={
																	props.touched.value &&
																	props.errors.value
																}
																error={
																	props.touched.value &&
																	props.errors.value
																}
															>
																{skills &&
																	skills.map((el, i) => (
																		<MenuItem
																			value={el._id}
																			key={i}
																			onClick={() =>
																				addSkill(el)
																			}
																		>
																			{el.skill}
																		</MenuItem>
																	))}
															</CssTextField>
														</div>
														{skillsState.map((el, i) => (
															<p className={classes.resStyle}>
																<span style={{ fontSize: 13 }}>
																	{i + 1}.{' '}
																</span>
																{el?.skill}
																<DeleteOutlineIcon
																	type="button"
																	className={classes.delete}
																	onClick={() =>
																		removeSkill(el)
																	}
																/>
															</p>
														))}
													</Form>
												)}
											</Formik>
											<div style={{ margin: '2rem 0rem' }}></div>
											<Formik
												initialValues={experienceInitialValues}
												validationSchema={
													experienceValidationSchema
												}
												onSubmit={addExp}
											>
												{(props) => (
													<Form>
														<h5>Experiences</h5>
														<div style={{ display: 'flex' }}>
															<CssTextField
																id="outlined-basic"
																label="Experience"
																variant="outlined"
																type="text"
																autocomplete="off"
																size="small"
																select
																style={{ width: '100%' }}
																inputProps={{
																	style: { fontSize: 14 },
																}}
																InputLabelProps={{
																	style: { fontSize: 14 },
																}}
																onChange={props.handleChange(
																	'value'
																)}
																onBlur={props.handleBlur(
																	'value'
																)}
																value={props.values.value}
																helperText={
																	props.touched.value &&
																	props.errors.value
																}
																error={
																	props.touched.value &&
																	props.errors.value
																}
															>
																{experiences &&
																	experiences.map((el, i) => (
																		<MenuItem
																			value={el._id}
																			key={i}
																			onClick={() =>
																				addExp(el)
																			}
																		>
																			{el.name}
																		</MenuItem>
																	))}
															</CssTextField>
														</div>
														{experiencesState.map((el, i) => (
															<p className={classes.resStyle}>
																<span style={{ fontSize: 13 }}>
																	{i + 1}.{' '}
																</span>
																{el?.name}
																<DeleteOutlineIcon
																	type="button"
																	className={classes.delete}
																	onClick={() => removeExp(el)}
																/>
															</p>
														))}
													</Form>
												)}
											</Formik>
											<Form>
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
													<p>
														Responsibility Successfully Updated
													</p>
												)}
											</Form>
										</>
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

export default EditDesignation;
