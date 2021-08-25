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
import Button from '../../../components/utils/Button';
import { updateVehicles } from '../../../services/action/VehiclesAction';
import { useDispatch } from 'react-redux';

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
		textTransform: 'capitalize',
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
		textTransform: 'capitalize',
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

const initialValue = {
	number: '',
	type: '',
	driverName: '',
	phoneNum: '',
	cnicNum: '',
};

const validationSchema = yup.object({
	number: yup.string().required('Vehicle No. is required'),
	type: yup.string().required('Vehicle Type is required'),
	driverName: yup.string().required('Driver name is required'),
	phoneNum: yup.string().required('Phone No. is required'),
	cnicNum: yup.string().required('CNIC No. is required'),
});

const EditVehicles = (props) => {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState('');
	const [success, setSuccess] = React.useState('');
	const [initialValuesState, setInitialValues] = React.useState({
		...initialValue,
	});

	const { show, handler, vehicle } = props;

	const classes = useStyles();
	const dispatch = useDispatch();

	useEffect(() => {
		if (vehicle) {
			setInitialValues({
				...vehicle,
			});
		}
	}, [vehicle]);

	useEffect(() => {
		setOpen(show);
	}, [show]);

	const onSubmit = async (values) => {
		setLoading(true);
		dispatch(
			updateVehicles(vehicle._id, values, (err) => {
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
			}),
		);
		setLoading(true);
	};

	const handleClose = () => {
		handler(false);
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
						<h5 className='text-center mt-4'>Update</h5>
						<Container className={classes.mainContainer}>
							<Formik
								initialValues={initialValuesState}
								validationSchema={validationSchema}
								onSubmit={onSubmit}
								enableReinitialize>
								{(props) => (
									<Form>
										<Grid container spacing={1}>
											<Grid lg={12} md={12} sm={12}>
												<CssTextField
													id='outlined-basic'
													label='Vehicle No.'
													variant='outlined'
													type='text'
													size='small'
													style={{ width: '100%', marginBottom: '1rem' }}
													autoComplete='off'
													defaultValue={vehicle.number}
													inputProps={{ style: { fontSize: 14 } }}
													InputLabelProps={{ style: { fontSize: 14 } }}
													onChange={props.handleChange('number')}
													onBlur={props.handleBlur('number')}
													value={props.values.number}
													helperText={props.touched.number && props.errors.number}
													error={props.touched.number && props.errors.number}
												/>
											</Grid>
											<Grid lg={12} md={12} sm={12}>
												<CssTextField
													id='outlined-basic'
													label='Vehicle Type'
													variant='outlined'
													type='text'
													size='small'
													autoComplete='off'
													select
													style={{ width: '100%', marginBottom: '1rem' }}
													defaultValue={vehicle.type}
													inputProps={{ style: { fontSize: 14 } }}
													InputLabelProps={{ style: { fontSize: 14 } }}
													onChange={props.handleChange('type')}
													onBlur={props.handleBlur('type')}
													value={props.values.type}
													helperText={props.touched.type && props.errors.type}
													error={props.touched.type && props.errors.type}>
													<MenuItem value='truck'>truck</MenuItem>
													<MenuItem value='heavy truck'>heavy truck</MenuItem>
												</CssTextField>
											</Grid>
											<Grid lg={12} md={12} sm={12}>
												<CssTextField
													id='outlined-basic'
													style={{ width: '100%', marginBottom: '1rem' }}
													label='Driver Name'
													variant='outlined'
													type='text'
													size='small'
													autoComplete='off'
													defaultValue={vehicle.driverName}
													inputProps={{ style: { fontSize: 14 } }}
													InputLabelProps={{ style: { fontSize: 14 } }}
													onChange={props.handleChange('driverName')}
													onBlur={props.handleBlur('driverName')}
													value={props.values.driverName}
													helperText={props.touched.driverName && props.errors.driverName}
													error={props.touched.driverName && props.errors.driverName}
												/>
											</Grid>
											<Grid lg={12} md={12} sm={12}>
												<CssTextField
													id='outlined-basic'
													label='Phone No.'
													variant='outlined'
													type='text'
													style={{ width: '100%', marginBottom: '1rem' }}
													size='small'
													autoComplete='off'
													defaultValue={vehicle.phoneNum}
													inputProps={{ style: { fontSize: 14 } }}
													InputLabelProps={{ style: { fontSize: 14 } }}
													onChange={props.handleChange('phoneNum')}
													onBlur={props.handleBlur('phoneNum')}
													value={props.values.phoneNum}
													helperText={props.touched.phoneNum && props.errors.phoneNum}
													error={props.touched.phoneNum && props.errors.phoneNum}
												/>
											</Grid>
											<Grid lg={12} md={12} sm={12}>
												<CssTextField
													id='outlined-basic'
													label='CNIC No.'
													variant='outlined'
													type='text'
													style={{ width: '100%' }}
													size='small'
													autoComplete='off'
													defaultValue={vehicle.cnicNum}
													className={classes.inputFieldStyle1}
													inputProps={{ style: { fontSize: 14 } }}
													InputLabelProps={{ style: { fontSize: 14 } }}
													onChange={props.handleChange('cnicNum')}
													onBlur={props.handleBlur('cnicNum')}
													value={props.values.cnicNum}
													helperText={props.touched.cnicNum && props.errors.cnicNum}
													error={props.touched.cnicNum && props.errors.cnicNum}
												/>
											</Grid>
										</Grid>
										<div
											style={{
												marginTop: '2rem',
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
											}}>
											<Button
												variant='contained'
												color='primary'
												text='Update'
												style={{ marginRight: '1rem' }}
												loading={loading}
											/>
											<Button
												variant='outlined'
												color='dark'
												onClick={handleClose}
												text='Close'
												type='button'
												classNames='bg-danger text-light'
											/>
										</div>
										{error && <p>{error}</p>}
										{success && <p>Responsibility Successfully Updated</p>}
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

export default EditVehicles;
