import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { MdCancel } from 'react-icons/md';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { updateExtEmpRequisitionAction } from '../../../../../services/action/ExecPrereq';

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
		width: '80%',
	},
	mainContainer: {
		textAlign: 'center',
		marginTop: 20,
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

const initialValuesSub = {
	value: '',
	marks: undefined,
};

const validationSchema = yup.object({
	heading: yup.string().required(),
});
const validationSchemaSub = yup.object({
	value: yup.string().required(),
});

const EditExecPrereq = (props) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { show, handler, req } = props;
	const [open, setOpen] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);
	const [params, setParams] = React.useState([]);
	const [initialValues, setInitialValues] = React.useState({
		heading: req?.heading,
	});

	useEffect(() => {
		setOpen(show);
		setInitialValues({ heading: req?.heading });
		if (req?.points) {
			setParams([...req?.points]);
		}
	}, [show]);

	const handleClose = () => {
		handler(false);
	};

	const onSubmit = (values) => {
		dispatch(
			updateExtEmpRequisitionAction(
				req._id,
				{ heading: values.heading, points: [...params] },
				() => {
					setSuccess(true);
					setTimeout(() => {
						setSuccess(false);
					}, 4000);
				}
			)
		);
	};

	const onRemoveParam = (e) => {
		const index = e.target.dataset.index;
		const temp = [...params];
		setParams(temp.filter((el, i) => i != index));
	};

	const onParamSubmit = (values) => {
		setParams([...params, values.value]);
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
						<h5 className="text-center mt-4">Edit Vendor</h5>
						<Container className={classes.mainContainer}>
							<Formik
								initialValues={initialValues}
								validationSchema={validationSchema}
								enableReinitialize
								onSubmit={onSubmit}
							>
								{(props) => (
									<>
										<Form>
											<Grid container spacing={1}>
												<Grid item lg={3} md={3} sm={12} xs={12}>
													<CssTextField
														id="outlined-basic"
														label="Add Heading Name"
														variant="outlined"
														type="text"
														autocomplete="off"
														size="small"
														className={classes.inputFieldStyle}
														inputProps={{
															style: { fontSize: 14 },
														}}
														InputLabelProps={{
															style: { fontSize: 14 },
														}}
														onChange={props.handleChange(
															'heading'
														)}
														onBlur={props.handleBlur('heading')}
														value={props.values.heading}
														helperText={
															props.touched.heading &&
															props.errors.heading
														}
														error={
															props.touched.heading &&
															props.errors.heading
														}
													/>
												</Grid>
											</Grid>
										</Form>

										<div style={{ marginTop: 30, marginBottom: 30 }}>
											<hr />
										</div>
										<Container className={classes.mainContainer1}>
											<Grid spacing={1}>
												<Formik
													initialValues={initialValuesSub}
													validationSchema={validationSchemaSub}
													onSubmit={onParamSubmit}
												>
													{(props) => (
														<Form>
															<Grid
																item
																lg={12}
																md={12}
																sm={12}
																xs={12}
															>
																<CssTextField
																	id="outlined-basic"
																	label="Add Parameter"
																	variant="outlined"
																	type="text"
																	size="small"
																	autocomplete="off"
																	inputProps={{
																		style: { fontSize: 14 },
																	}}
																	style={{ width: '30%' }}
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
																/>

																<Button
																	variant="contained"
																	size="small"
																	className={
																		classes.addMoreParaBtn
																	}
																	type="submit"
																>
																	Add
																</Button>
															</Grid>
														</Form>
													)}
												</Formik>
											</Grid>
											{params?.map((el, i) => (
												<div
													key={i}
													style={{
														display: 'flex',
														columnGap: '1rem',
														alignItems: 'center',
														marginBottom: '1rem',
													}}
												>
													<p style={{ padding: 0, margin: 0 }}>
														{el}
													</p>
													<div
														data-index={i}
														onClick={onRemoveParam}
													>
														<MdCancel
															size="20"
															style={{
																cursor: 'pointer',
																pointerEvents: 'none',
															}}
														/>
													</div>
												</div>
											))}
										</Container>
										<div>
											<Form>
												<Button
													variant="outlined"
													color="primary"
													type="submit"
													className={classes.addButton}
												>
													Submit
												</Button>
												{success && <p>Successfully updated</p>}
												{error && <p>{error}</p>}
											</Form>
										</div>
									</>
								)}
							</Formik>
							<Button
								variant="outlined"
								color="primary"
								type="submit"
								onClick={handleClose}
								className={classes.addButton}
							>
								Cancel
							</Button>
						</Container>
					</div>
				</Fade>
			</Modal>
		</div>
	);
};

export default EditExecPrereq;
