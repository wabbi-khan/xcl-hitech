import React, { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '../../../components/utils/Button';
import { useForm } from 'react-hook-form';
import { updateUnit } from '../../../services/action/unitAction';
import { Form, Formik } from 'formik';
import * as yup from 'yup';

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

const validationSchema = yup.object({
	name: yup.string().required(),
});

const EditUnit = (props) => {
	const { show, handler, unit } = props;
	const dispatch = useDispatch();

	const classes = useStyles();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const [open, setOpen] = useState(false);
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState('');
	const [success, setSuccess] = React.useState('');
	const [initialValues, setInitialValues] = React.useState(
		props?.responsibility
	);
	// const [isUpdate, setIsUpdate] = useState(false);
	// const [isError, setIsError] = useState(false);

	useEffect(() => {
		if (unit) setInitialValues({ name: unit.name });
	}, [unit]);

	useEffect(() => {
		setOpen(show);
	}, [show]);

	// useEffect(() => {
	//     setOpen(show);
	// }, [show]);

	const onSubmit = async (values) => {
		setLoading(true);
		dispatch(
			updateUnit(unit._id, values, (err) => {
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
								initialValues={initialValues}
								validationSchema={validationSchema}
								enableReinitialize
								onSubmit={onSubmit}
							>
								{(props) => (
									<Form>
										<CssTextField
											id="outlined-basic"
											label="Sub Category"
											variant="outlined"
											type="text"
											size="small"
											autoComplete="off"
											style={{ width: '75%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('name')}
											onBlur={props.handleBlur('name')}
											value={props?.values?.name}
											helperText={
												props.touched.name && props.errors.name
											}
											error={props.touched.name && props.errors.name}
										/>
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
									</Form>
								)}
							</Formik>
							{error && <p>{error}</p>}
							{success && (
								<p className="mt-2">
									Sub Category Successfully Updated
								</p>
							)}
							{/* <form onSubmit={handleSubmit(onSubmit)}>
                                <Grid container spacing={1}>
                                    <Grid lg={12} md={12} sm={12}>
                                        <CssTextField
                                            id='outlined-basic'
                                            label='Unit'
                                            variant='outlined'
                                            type='text'
                                            size='small'
                                            autoComplete='off'
                                            // defaultValue={training.name}
                                            style={{ width: '75%' }}
                                            inputProps={{ style: { fontSize: 14 } }}
                                            InputLabelProps={{ style: { fontSize: 14 } }}
                                            {...register('name')}
                                        />
                                        {errors.name?.type === 'required' && (
                                            <p className='text-danger'>Unit is required</p>
                                        )}
                                        {isUpdate ? (
                                            <p className='text-success mt-2'>Unit Update Successfully</p>
                                        ) : isError ? (
                                            <p className='text-danger mt-2'>Unit Update Failed </p>
                                        ) : null}
                                    </Grid>
                                </Grid>
                                <div>
                                    <Button
                                        variant='outlined'
                                        color='primary'
                                        className={classes.addButton}
                                        type='submit'>
                                        Update
                                    </Button>
                                    <Button
                                        variant='outlined'
                                        color='primary'
                                        className={classes.closeButton}
                                        onClick={handleClose}>
                                        close
                                    </Button>
                                </div>
                            </form> */}
							{/* ) : null
                            } */}
						</Container>
					</div>
				</Fade>
			</Modal>
		</div>
	);
};

export default EditUnit;
