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
import { updateNonExtEmpRatAction } from '../../../../../services/action/NonExecRat';

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

const initialValues = {
	name: '',
	description: '',
	min: '',
	max: '',
};

const validationSchema = yup.object({
	name: yup.string().required(),
	description: yup.string().required(),
	min: yup.number().required(),
	max: yup.number().required(),
});
const EditNonExecRat = (props) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { show, handler, rating } = props;
	const [open, setOpen] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);
	const [params, setParams] = React.useState([]);
	const [initialValues, setInitialValues] = React.useState({
		...rating,
	});

	useEffect(() => {
		setOpen(show);
		setInitialValues({ ...rating });
	}, [show]);

	const handleClose = () => {
		handler(false);
	};

	const onSubmit = (values) => {
		dispatch(
			updateNonExtEmpRatAction(rating._id, values, () => {
				setSuccess(true);
				setTimeout(() => {
					setSuccess(false);
				}, 4000);
			})
		);
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
						<h5 className="text-center mt-4">Edit Rating</h5>
						<Container className={classes.mainContainer}>
							<Formik
								initialValues={initialValues}
								validationSchema={validationSchema}
								onSubmit={onSubmit}
							>
								{(props) => (
									<Form>
										<Grid
											container
											spacing={1}
											style={{ marginTop: 20 }}
										>
											<Grid item lg={2} md={2} sm={12} xs={12}>
												<CssTextField
													id="outlined-basic"
													label="Name"
													variant="outlined"
													type="text"
													autocomplete="off"
													size="small"
													style={{ width: '125%' }}
													inputProps={{ style: { fontSize: 14 } }}
													InputLabelProps={{
														style: { fontSize: 14 },
													}}
													onChange={props.handleChange('name')}
													onBlur={props.handleBlur('name')}
													value={props.values.name}
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
											<Grid item lg={2} md={2} sm={12} xs={12}>
												<CssTextField
													id="outlined-basic"
													label="Description"
													variant="outlined"
													type="text"
													autocomplete="off"
													size="small"
													style={{ width: '125%', marginLeft: 50 }}
													inputProps={{ style: { fontSize: 14 } }}
													InputLabelProps={{
														style: { fontSize: 14 },
													}}
													onChange={props.handleChange(
														'description'
													)}
													onBlur={props.handleBlur('description')}
													value={props.values.description}
													helperText={
														props.touched.description &&
														props.errors.description
													}
													error={
														props.touched.description &&
														props.errors.description
													}
												/>
											</Grid>
											<Grid item lg={2} md={2} sm={12} xs={12}>
												<CssTextField
													id="outlined-basic"
													label="Min Value"
													variant="outlined"
													type="number"
													autocomplete="off"
													size="small"
													style={{
														width: '125%',
														marginLeft: 100,
													}}
													inputProps={{ style: { fontSize: 14 } }}
													InputLabelProps={{
														style: { fontSize: 14 },
													}}
													onChange={props.handleChange('min')}
													onBlur={props.handleBlur('min')}
													value={props.values.min}
													helperText={
														props.touched.min && props.errors.min
													}
													error={
														props.touched.min && props.errors.min
													}
												/>
											</Grid>
											<Grid item lg={2} md={2} sm={12} xs={12}>
												<CssTextField
													id="outlined-basic"
													label="Max Value"
													variant="outlined"
													type="number"
													autocomplete="off"
													size="small"
													style={{
														width: '125%',
														marginLeft: 150,
													}}
													inputProps={{ style: { fontSize: 14 } }}
													InputLabelProps={{
														style: { fontSize: 14 },
													}}
													onChange={props.handleChange('max')}
													onBlur={props.handleBlur('max')}
													value={props.values.max}
													helperText={
														props.touched.max && props.errors.max
													}
													error={
														props.touched.max && props.errors.max
													}
												/>
											</Grid>
										</Grid>
										<div>
											<Button
												variant="outlined"
												color="primary"
												type="submit"
												className={classes.addButton}
											>
												Add
											</Button>
											{success && <p>SuccessFully updated</p>}
										</div>
									</Form>
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

export default EditNonExecRat;
