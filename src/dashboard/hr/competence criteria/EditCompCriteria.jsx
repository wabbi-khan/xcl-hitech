import React, { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';

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

const EditCompCriteria = (props) => {
	const { show, handler, criteria } = props;
	// const { _id, name, category } = material
	// const { departments } = criteria

	const classes = useStyles();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const [open, setOpen] = useState(false);
	const [isUpdate, setIsUpdate] = useState(false);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		setOpen(show);
	}, [show]);

	const { departments } = useSelector((state) => state.departments);
	const { designations } = useSelector((state) => state.designations);
	// const { education } = useSelector(state => state.education)
	const { skills } = useSelector((state) => state.skills);
	// const { experience } = useSelector(state => state.experience)

	const onUpdate = async (data) => {
		// try {
		//     await axios.patch(`${process.env.REACT_APP_API_URL}/criteria/${criteria._id}`, data)
		//     setIsUpdate(true)
		// }
		// catch (error) {
		//     setIsError(true)
		// }
	};

	const handleClose = () => {
		handler(false);
		window.location.reload();
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
						<h5 className="text-center mt-4">Update</h5>
						<Container className={classes.mainContainer}>
							{/* Form */}
							{criteria ? (
								<form onSubmit={handleSubmit(onUpdate)}>
									<Grid container spacing={1}>
										<Grid lg={12} md={12} sm={12}>
											<CssTextField
												id="outlined-basic"
												label="Department"
												variant="outlined"
												type="text"
												autocomplete="off"
												size="small"
												select
												className={classes.inputFieldStyle}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
												defaultValue={criteria.department._id}
												{...register('department', {
													required: true,
												})}
											>
												{!departments || !departments.length ? (
													<p>Data Not Found</p>
												) : (
													departments.map((dept) => (
														<MenuItem
															value={dept._id}
															key={dept._id}
														>
															{dept.name}
														</MenuItem>
													))
												)}
											</CssTextField>
										</Grid>
										<Grid lg={12} md={12} sm={12} className="mt-3">
											<CssTextField
												id="outlined-basic"
												label="Designation"
												variant="outlined"
												type="text"
												autocomplete="off"
												size="small"
												select
												className={classes.inputFieldStyle}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
												defaultValue={criteria.designation._id}
												{...register('designation', {
													required: true,
												})}
											>
												{!designations || !designations.length ? (
													<p>Data Not Found</p>
												) : (
													designations.map((designation) => (
														<MenuItem
															value={designation._id}
															key={designation._id}
														>
															{designation.name}
														</MenuItem>
													))
												)}
											</CssTextField>
											{/* {
                                                    errors.category?.type === 'required' && <p className="mt-3 text-danger">Category must be required</p>
                                                }
                                                <br />
                                                {
                                                    errors.name?.type === 'required' && <p className="text-danger">Material name is required</p>
                                                }
                                                <br />
                                                {
                                                    errors.name?.type === 'maxLength' && <p className="text-danger">Length must be less than 30</p>
                                                } */}
										</Grid>
										<Grid lg={12} md={12} sm={12}>
											<CssTextField
												id="outlined-basic"
												label="Education"
												variant="outlined"
												type="text"
												autocomplete="off"
												size="small"
												select
												className={classes.inputFieldStyle}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
												defaultValue={criteria.education._id}
												{...register('education', {
													required: true,
												})}
											>
												{/* {
                                                        !education || !education.length ? <p>Data Not Found</p> :
                                                            education.map(edu => (
                                                                <MenuItem value={edu._id} key={edu._id}>{edu.name}</MenuItem>
                                                            ))
                                                    } */}
											</CssTextField>
										</Grid>
										<Grid lg={12} md={12} sm={12} className="mt-3">
											<CssTextField
												id="outlined-basic"
												label="Skills"
												variant="outlined"
												type="text"
												autocomplete="off"
												size="small"
												select
												className={classes.inputFieldStyle}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
												defaultValue={criteria.skill._id}
												{...register('skill', { required: true })}
											>
												{!skills || !skills.length ? (
													<p>Data Not Found</p>
												) : (
													skills.map((skill) => (
														<MenuItem
															value={skill._id}
															key={skill._id}
														>
															{skill.skill}
														</MenuItem>
													))
												)}
											</CssTextField>
										</Grid>
										<Grid lg={12} md={12} sm={12} className="mt-3">
											<CssTextField
												id="outlined-basic"
												label="Experience"
												variant="outlined"
												type="text"
												autocomplete="off"
												size="small"
												select
												className={classes.inputFieldStyle}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
												defaultValue={criteria.experience._id}
												{...register('experience', {
													required: true,
												})}
											>
												{/* {
                                                        !experience || !experience.length ? <p>Data Not Found</p> :
                                                            experience.map(exp => (
                                                                <MenuItem value={exp._id} key={exp._id}>{exp.name}</MenuItem>
                                                            ))
                                                    } */}
											</CssTextField>
											{isUpdate ? (
												<p className="text-success mt-1">
													Competence Criteria Update Success
												</p>
											) : isError ? (
												<p className="text-danger mt-1">
													Competence Criteria Update Failed
												</p>
											) : null}
										</Grid>
									</Grid>
									<div>
										<Button
											variant="outlined"
											color="primary"
											className={classes.addButton}
											type="submit"
										>
											Update
										</Button>
										<Button
											variant="outlined"
											color="primary"
											className={classes.closeButton}
											onClick={handleClose}
										>
											close
										</Button>
									</div>
								</form>
							) : null}
						</Container>
					</div>
				</Fade>
			</Modal>
		</div>
	);
};

export default EditCompCriteria;
