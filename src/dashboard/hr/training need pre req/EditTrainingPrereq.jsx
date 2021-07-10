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
import { fetchDepartmentsAction } from '../../../services/action/DepartmentAction';
import { getDesignation } from '../../../services/action/DesignationAction';
import { updateTrainingPrereq } from '../../../services/action/TrainingPrereq';

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

const initialValuesForNestedForm = {
	param: '',
};

const validationSchemaForNestedForm = yup.object({
	param: yup.string().required(),
});

const EditTrainingPrereq = (props) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { show, handler, requisition } = props;
	const [open, setOpen] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);
	const [params, setParams] = React.useState([]);
	const [initialValuesForTopForm, setInitialValuesForTopForm] = React.useState({
		...requisition,
		department: requisition?.department._id,
		designation: requisition?.designation._id,
	});
	const { departments } = useSelector((state) => state.departments);
	const { designations } = useSelector((state) => state.designations);

	React.useEffect(() => {
		dispatch(getDesignation());
		dispatch(fetchDepartmentsAction());
	}, []);

	useEffect(() => {
		setOpen(show);
		setInitialValuesForTopForm({
			...requisition,
			department: requisition?.department._id,
			designation: requisition?.designation._id,
		});
		if (requisition?.preRequisition) {
			setParams([...requisition?.preRequisition]);
		}
	}, [show, requisition]);

	const handleClose = () => {
		handler(false);
	};

	const onSubmit = (values) => {
		console.log('object');
		dispatch(
			updateTrainingPrereq(
				requisition._id,
				{ ...values, preRequisition: params },
				() => {
					setSuccess(true);
					setTimeout(() => {
						setSuccess(false);
					}, 4000);
				},
			),
		);
	};

	const onRemoveParam = (e) => {
		const index = e.target.dataset.index;
		const temp = [...params];
		setParams(temp.filter((el, i) => i != index));
	};

	const onParamSubmit = (values) => {
		setParams([...params, values]);
	};

	return (
		<div>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				className={classes.modal}
				open={open}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}>
				<Fade in={open}>
					<div className={classes.paper}>
						<h5 className='text-center mt-4'>Edit Vendor</h5>
						<Container className={classes.mainContainer}>
							<Formik
								initialValues={initialValuesForTopForm}
								enableReinitialize
								onSubmit={onSubmit}>
								{(props) => (
									<>
										<Form>
											<CssTextField
												id='outlined-basic'
												label='Select Department'
												variant='outlined'
												type='text'
												size='small'
												select
												autocomplete='off'
												className={classes.inputFieldStyle}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
												onChange={props.handleChange('department')}
												onBlur={props.handleBlur('department')}
												value={props.values.department}
												helperText={props.touched.department && props.errors.department}
												error={props.touched.department && props.errors.department}>
												{!departments || !departments.length ? (
													<p>Data Not Found</p>
												) : (
													departments.map((department, i) => (
														<MenuItem value={department._id} key={i}>
															{department.name}
														</MenuItem>
													))
												)}
											</CssTextField>
											<CssTextField
												id='outlined-basic'
												label='Select Designation'
												variant='outlined'
												type='text'
												size='small'
												select
												autocomplete='off'
												className={classes.inputFieldStyle1}
												inputProps={{ style: { fontSize: 14 } }}
												onChange={props.handleChange('designation')}
												onBlur={props.handleBlur('designation')}
												value={props.values.designation}
												helperText={props.touched.designation && props.errors.designation}
												error={props.touched.designation && props.errors.designation}
												InputLabelProps={{ style: { fontSize: 14 } }}>
												{!designations || !designations.length ? (
													<p>Data Not Found</p>
												) : (
													designations.map((designation, i) => (
														<MenuItem value={designation._id} key={i}>
															{designation.name}
														</MenuItem>
													))
												)}
											</CssTextField>
											<CssTextField
												id='outlined-basic'
												label='Pre-Requisition Name'
												variant='outlined'
												type='text'
												size='small'
												autocomplete='off'
												className={classes.inputFieldStyle1}
												inputProps={{ style: { fontSize: 14 } }}
												onChange={props.handleChange('name')}
												onBlur={props.handleBlur('name')}
												value={props.values.name}
												helperText={props.touched.name && props.errors.name}
												error={props.touched.name && props.errors.name}
												InputLabelProps={{ style: { fontSize: 14 } }}></CssTextField>
										</Form>
										<Formik
											initialValues={initialValuesForNestedForm}
											validationSchema={validationSchemaForNestedForm}
											onSubmit={onParamSubmit}>
											{(props) => (
												<div>
													<div style={{ marginTop: 30, marginBottom: 30 }}>
														<hr />
													</div>
													<Container className={classes.mainContainer}>
														<h4 className='text-left'>Prerequisites</h4>
														<Form>
															<CssTextField
																id='outlined-basic'
																label='Point'
																variant='outlined'
																type='text'
																size='small'
																autocomplete='off'
																className={classes.inputFieldStyle1}
																inputProps={{ style: { fontSize: 14 } }}
																onChange={props.handleChange('param')}
																onBlur={props.handleBlur('param')}
																value={props.values.param}
																helperText={props.touched.param && props.errors.param}
																error={props.touched.param && props.errors.param}
																InputLabelProps={{ style: { fontSize: 14 } }}></CssTextField>
															<Button
																variant='outlined'
																type='submit'
																className={classes.addButton}>
																Add
															</Button>
														</Form>
													</Container>
												</div>
											)}
										</Formik>
										{params.map((el, i) => (
											<div
												style={{
													display: 'flex',
													columnGap: '1rem',
													alignItems: 'center',
													marginBottom: '1rem',
												}}>
												<p style={{ padding: 0, margin: 0 }}>{el}</p>
												<div data-index={i} onClick={onRemoveParam}>
													<MdCancel
														size='20'
														style={{ cursor: 'pointer', pointerEvents: 'none' }}
													/>
												</div>
											</div>
										))}
										<Form>
											<div>
												<Button
													variant='outlined'
													type='submit'
													className={classes.addButton}>
													Update
												</Button>
												{success & <p>Successfully Updated</p>}
											</div>
										</Form>
									</>
								)}
							</Formik>
							<Button
								variant='outlined'
								color='primary'
								type='submit'
								onClick={handleClose}
								className={classes.addButton}>
								Cancel
							</Button>
						</Container>
					</div>
				</Fade>
			</Modal>
		</div>
	);
};

export default EditTrainingPrereq;
