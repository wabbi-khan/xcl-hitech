import React, { useEffect, useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '../../../components/utils/Button';
import { useDispatch, useSelector } from 'react-redux';
import { updateTrainingIdentification } from '../../../services/action/TrainingNeedIdentification';
import { getDesignation } from '../../../services/action/DesignationAction';
import { fetchDepartmentsAction } from '../../../services/action/DepartmentAction';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { Grid, MenuItem } from '@material-ui/core';

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
		width: 900,
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

const EditTrainingNeed = (props) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [open, setOpen] = useState(false);
	const [initialValues, setInitialValues] = useState(props?.need);
	const [department, setDepartment] = useState('');
	const [designation, setDesignation] = useState('');
	const [list, setList] = useState('');

	const { show, handler, need } = props;
	const classes = useStyles();
	const dispatch = useDispatch();

	const { departments } = useSelector((state) => state.departments);
	const { designations } = useSelector((state) => state.designations);

	useEffect(() => {
		if (need) {
			setInitialValues({
				...need,
				department: need?.department?._id,
				designation: need?.designation?._id,
				interviewedBy: need?.interviewedBy?._id,
			});

			const temp = [];
			for (const el of need.preRequestion) {
				temp.push({
					...el._id,
					satisfaction: el.satisfaction,
					need: el.need,
				});
			}
			setList(temp);
		}
	}, [need]);

	useEffect(() => {
		dispatch(getDesignation());
		dispatch(fetchDepartmentsAction());
	}, [dispatch]);

	useEffect(() => {
		setOpen(show);
	}, [show]);

	const onSubmit = async (values) => {
		setLoading(true);
		dispatch(
			updateTrainingIdentification(
				need._id,
				{ ...values, preRequestion: list },
				(err) => {
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
				}
			)
		);
	};

	const onChange = (key, value, index) => {
		const temp = list.map((el, i) =>
			i === index ? { ...el, [key]: value } : el
		);
		setList(temp);
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
								initialValues={initialValues}
								enableReinitialize
								onSubmit={onSubmit}
							>
								{(props) => (
									<Form>
										<CssTextField
											id="outlined-basic"
											label="Responsibility Name"
											variant="outlined"
											type="text"
											select
											size="small"
											autoComplete="off"
											style={{ width: '100%', marginBottom: '1rem' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('interviewedBy')}
											onBlur={props.handleBlur('interviewedBy')}
											value={props.values.interviewedBy}
											helperText={
												props.touched.interviewedBy &&
												props.errors.interviewedBy
											}
											error={
												props.touched.interviewedBy &&
												props.errors.interviewedBy
											}
										>
											{!designations || !designations.length ? (
												<p>Data Not Found</p>
											) : (
												designations.map((el, i) => (
													<MenuItem
														value={el._id}
														key={i}
														onClick={() => setDepartment(el._id)}
													>
														{el.name}
													</MenuItem>
												))
											)}
										</CssTextField>
										{list &&
											list?.length > 0 &&
											list?.map((el, i) => (
												<Grid
													container
													spacing={1}
													style={{ marginTop: 35 }}
												>
													<Grid item lg={1} md={1}>
														<h5 className={classes.itemHeading}>
															{i + 1}
														</h5>
													</Grid>
													<Grid item lg={5} md={5} sm={12} xs={12}>
														<div style={{ textAlign: 'left' }}>
															<h5 style={{ marginBottom: 15 }}>
																{el?.name}
															</h5>
															{el?.preRequisition?.map(
																(el, i) => (
																	<p>{el}</p>
																)
															)}
														</div>
													</Grid>
													<Grid item lg={3} md={3} sm={12} xs={12}>
														<CssTextField
															id="outlined-basic"
															label="Select Satisfaction"
															variant="outlined"
															type="text"
															size="small"
															name="yearOfPassing"
															select
															value={el?.satisfaction}
															onChange={(e) =>
																onChange(
																	'satisfaction',
																	e.target.value,
																	i
																)
															}
															style={{ width: '75%' }}
															inputProps={{
																style: { fontSize: 14 },
															}}
															InputLabelProps={{
																style: { fontSize: 14 },
															}}
														>
															<MenuItem value="excellent">
																Excellent
															</MenuItem>
															<MenuItem value="good">
																Good
															</MenuItem>
															<MenuItem value="satisfactory">
																Satisfactory
															</MenuItem>
															<MenuItem value="poor">
																Poor
															</MenuItem>
														</CssTextField>
													</Grid>
													<Grid item lg={3} md={3} sm={12} xs={12}>
														<CssTextField
															id="outlined-basic"
															label="Training Need"
															variant="outlined"
															type="text"
															size="small"
															name="yearOfPassing"
															select
															value={el?.need}
															onChange={(e) =>
																onChange(
																	'need',
																	e.target.value,
																	i
																)
															}
															style={{ width: '75%' }}
															inputProps={{
																style: { fontSize: 14 },
															}}
															InputLabelProps={{
																style: { fontSize: 14 },
															}}
														>
															<MenuItem value="true">
																Yes
															</MenuItem>
															<MenuItem value="false">
																No
															</MenuItem>
														</CssTextField>
													</Grid>
												</Grid>
											))}
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

export default EditTrainingNeed;
