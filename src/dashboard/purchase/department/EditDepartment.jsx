import React, { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { updateDepartmentAction } from '../../../services/action/DepartmentAction';
import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import Button from '../../../components/utils/Button';

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

const EditDepartment = (props) => {
	const dispatch = useDispatch();

	const { show, handler, department } = props;

	const classes = useStyles();

	const [open, setOpen] = useState(false);
	const [isUpdate, setIsUpdate] = useState(false);
	const [error, setError] = useState(false);
	const [initialValues, setInitialValues] = useState({ name: '' });
	const [loading, setLoading] = React.useState(false);

	useEffect(() => {
		setOpen(show);
	}, [show]);

	useEffect(() => {
		if (department) setInitialValues({ name: department.name });
	}, [department]);

	const onSubmit = async (values) => {
		setLoading(true);
		dispatch(
			updateDepartmentAction(department._id, values, (err) => {
				if (err) {
					setError(err);
					setTimeout(() => {
						setError('');
					}, 4000);
				} else {
					setIsUpdate(true);
					setTimeout(() => {
						setIsUpdate('');
					}, 4000);
				}
				setLoading(false);
			}),
		);
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
							{department ? (
								<Formik initialValues={initialValues} onSubmit={onSubmit}>
									{(props) => (
										<Form>
											<Grid container spacing={1}>
												<Grid lg={12} md={12} sm={12}>
													<CssTextField
														id='outlined-basic'
														label='Enter Department Name'
														variant='outlined'
														type='text'
														autocomplete='off'
														size='small'
														autoComplete='off'
														className={classes.inputFieldStyle1}
														inputProps={{ style: { fontSize: 14 } }}
														InputLabelProps={{ style: { fontSize: 14 } }}
														onChange={props.handleChange('name')}
														onBlur={props.handleBlur('name')}
														value={props.values.name}
														helperText={props.touched.name && props.errors.name}
														error={props.touched.name && props.errors.name}
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
													style={{ marginRight: '1rem' }}
													loading={loading}
													text='Update'
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
											{isUpdate && <p>Category Successfully Updated</p>}
										</Form>
									)}
								</Formik>
							) : null}
						</Container>
					</div>
				</Fade>
			</Modal>
		</div>
	);
};

export default EditDepartment;
