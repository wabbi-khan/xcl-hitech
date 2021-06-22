import React, { useState, useEffect } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import avatar from '../assests/user.svg';
import {
	createEmployee,
	getEmployees,
} from '../../../services/action/EmployeesAction';
import { getExperiences } from '../../../services/action/ExperienceAction';
import Loading from '../../purchase/material/Loading';
import MaterialError from '../../purchase/material/MaterialError';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { TableCell, TableRow } from '@material-ui/core';

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow);

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: '25ch',
		},
	},
	mainContainer: {
		textAlign: 'center',
		[theme.breakpoints.up('md')]: {
			marginLeft: 0,
			marginTop: 15,
		},
		[theme.breakpoints.down('sm')]: {
			marginTop: -15,
		},
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
			width: '30%',
		},
	},
	addMoreButton: {
		backgroundColor: '#22A19A',
		color: 'whitesmoke',
		marginLeft: 20,
		marginTop: 5,
		'&:hover': {
			color: '#22A19A',
			borderColor: '#22A19A',
		},
	},
	table: {
		minWidth: 600,
	},
	dataTable: {
		marginTop: 40,
	},
	ckeckBox: {
		[theme.breakpoints.up('md')]: {
			marginLeft: 7,
		},
		[theme.breakpoints.down('sm')]: {
			marginLeft: 0,
		},
	},
	inputFieldStyle: {
		// boxShadow: '0.4px 0.4px 0.4px 0.4px grey',
		// borderRadius: 5,
		[theme.breakpoints.up('md')]: {
			width: 250,
		},
		[theme.breakpoints.down('sm')]: {
			width: 200,
		},
	},
	inputFieldStyle1: {
		[theme.breakpoints.up('md')]: {
			width: 250,
			marginLeft: 70,
		},
		[theme.breakpoints.down('sm')]: {
			width: 200,
		},
	},
	inputFieldStyle2: {
		[theme.breakpoints.up('md')]: {
			width: 250,
			marginLeft: 140,
		},
		[theme.breakpoints.down('sm')]: {
			width: 200,
		},
	},
	inputFieldStyle3: {
		[theme.breakpoints.up('md')]: {
			width: 250,
			marginLeft: 210,
		},
		[theme.breakpoints.down('sm')]: {
			width: 200,
		},
	},
	delete: {
		color: 'red',
		fontSize: 38,
		[theme.breakpoints.up('md')]: {
			marginLeft: 50,
			marginTop: -7,
		},
		[theme.breakpoints.down('sm')]: {
			marginTop: -10,
		},
	},
	deleteRowBtn: {
		marginLeft: 220,
		'&:hover': {
			border: 'none',
			background: 'none',
		},
	},
	uploadImgBtn: {
		paddingLeft: 20,
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

const countries = ['Pakistan'];
const genders = ['Male', 'Female'];
const martialStatus = ['Single', 'Married'];

const Employees = ({ history }) => {
	const classes = useStyles();
	const [image, setImage] = useState({ path: avatar });
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const picUploadFunc = (event) => {
		if (event.target.files && event.target.files[0]) {
			setImage({
				path: URL.createObjectURL(event.target.files[0]),
				image: event.target.files[0],
			});
		}
	};

	const dispatch = useDispatch();

	useEffect(async () => {
		await dispatch(getEmployees());
		await dispatch(getExperiences());
	}, [dispatch]);

	const { experiences: experiencesState } = useSelector(
		(state) => state.experiences,
	);

	const [academicQualification, setAcademicQualification] = useState([
		{
			degree: '',
			university: '',
			yearOfPassing: '',
			division: '',
		},
	]);
	const [professionalQualification, setProfessionalQualification] = useState([
		{
			degree: '',
			university: '',
			yearOfPassing: '',
			division: '',
		},
	]);
	const [experience, setExperience] = useState([
		{
			companyName: '',
			companyAddress: '',
			from: '',
			to: '',
			lastSalary: '',
			reasonOfLeft: '',
			experienceLevel: '',
		},
	]);

	const { employees, loading, error } = useSelector((state) => state.employees);

	const onSubmitData = (props) => {
		console.log(props);
		dispatch(
			createEmployee({
				...props,
				picture: image.image,
				nextToKin: {
					name: props.kinName,
					address: props.kinAddress,
					contact: props.kinContact,
					relation: props.kinRelation,
				},
				academicQualification,
				professionalQualification,
				experience,
				reference: {
					name: props.refName,
					address: props.refAddress,
					contactNo: props.refContact,
				},
				officeUse: {
					dateOfInterviewed: props.dateOfInterviewed,
					remarks: props.remarks,
					recommended: props.recommended,
					jobTitle: props.jobTitle,
					recommendedSalary: props.recommendedSalary,
					approved: props.approved,
					dateOfApproved: props.dateOfApproved,
				},
			}),
		);
	};

	const addMoreAcademicQualification = () => {
		setAcademicQualification([
			...academicQualification,
			{
				degree: '',
				university: '',
				yearOfPassing: '',
				division: '',
			},
		]);
	};

	const onChangeAcademicQualification = (e, index) => {
		const temp2 = [...academicQualification];
		temp2[index][e.target.name] = e.target.value;
		setAcademicQualification(temp2);
	};

	const deleteAcademicQualification = (i) => {
		const temp = [...academicQualification];
		temp.splice(i, 1);
		setAcademicQualification(temp);
	};

	const addMoreProfessionalQualification = () => {
		setProfessionalQualification([
			...professionalQualification,
			{
				degree: '',
				university: '',
				yearOfPassing: '',
				division: '',
			},
		]);
	};

	const onChangeProfessionalQualification = (e, index) => {
		const temp2 = [...professionalQualification];
		temp2[index][e.target.name] = e.target.value;
		setProfessionalQualification(temp2);
	};

	const deleteProfessionalQualification = (i) => {
		const temp = [...professionalQualification];
		temp.splice(i, 1);
		setProfessionalQualification(temp);
	};

	const addMoreExperience = () => {
		setExperience([
			...experience,
			{
				companyName: '',
				companyAddress: '',
				from: '',
				to: '',
				lastSalary: '',
				reasonOnLeft: '',
				experienceLevel: '',
			},
		]);
	};

	const onChangeExperience = (e, index) => {
		const temp2 = [...experience];
		temp2[index][e.target.name] = e.target.value;
		setExperience(temp2);
	};

	const deleteExperience = (i) => {
		const temp = [...experience];
		temp.splice(i, 1);
		setExperience(temp);
	};

	return (
		<Sidenav title={'Employees'}>
			<div>
				<Container className={classes.mainContainer}>
					<form onSubmit={handleSubmit(onSubmitData)}>
						{/* employee ? ( */}
						<Grid container spacing={1}>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='Name'
									variant='outlined'
									type='text'
									size='small'
									autocomplete='off'
									className={classes.inputFieldStyle}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
									{...register('name', { required: true })}></CssTextField>
							</Grid>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label="Father's Name/Husband Name"
									variant='outlined'
									type='text'
									autocomplete='off'
									size='small'
									className={classes.inputFieldStyle}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
									{...register('fatherName_husbandName', {
										required: true,
									})}></CssTextField>
							</Grid>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='Job Applied For'
									variant='outlined'
									type='text'
									autocomplete='off'
									size='small'
									className={classes.inputFieldStyle}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
									{...register('jobAppliedFor', { required: true })}></CssTextField>
							</Grid>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='Present Address'
									variant='outlined'
									type='text'
									autocomplete='off'
									size='small'
									className={classes.inputFieldStyle}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
									{...register('presentAddress', { required: true })}></CssTextField>
							</Grid>
						</Grid>
						<Grid container spacing={1} className='mt-3'>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='Permanent Address'
									variant='outlined'
									type='text'
									size='small'
									autocomplete='off'
									className={classes.inputFieldStyle}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
									{...register('permanentAddress', { required: true })}></CssTextField>
							</Grid>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='Telephone No.'
									variant='outlined'
									type='number'
									autocomplete='off'
									size='small'
									className={classes.inputFieldStyle}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
									{...register('telephoneNo', { required: true })}></CssTextField>
							</Grid>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='Mobile No.'
									variant='outlined'
									type='number'
									autocomplete='off'
									size='small'
									className={classes.inputFieldStyle}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
									{...register('mobileNo', { required: true })}></CssTextField>
							</Grid>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='Gender'
									variant='outlined'
									type='text'
									autocomplete='off'
									size='small'
									select
									className={classes.inputFieldStyle}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
									{...register('gender', { required: true })}>
									{genders.map((gender) => (
										<MenuItem value={gender}>{gender}</MenuItem>
									))}
								</CssTextField>
							</Grid>
						</Grid>
						<Grid container spacing={1} className='mt-3'>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='Marital Status'
									variant='outlined'
									type='text'
									size='small'
									select
									autocomplete='off'
									className={classes.inputFieldStyle}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
									{...register('status', { required: true })}>
									{martialStatus.map((status) => (
										<MenuItem value={status}>{status}</MenuItem>
									))}
								</CssTextField>
							</Grid>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='Age'
									variant='outlined'
									type='number'
									autocomplete='off'
									size='small'
									className={classes.inputFieldStyle}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
									{...register('age', { required: true })}></CssTextField>
							</Grid>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									variant='outlined'
									type='date'
									autocomplete='off'
									size='small'
									// views={["day", "month", "year"]}
									// format="DD-MM-YYYY"
									// onClick={(e) => {
									//     console.log(e.target.value);
									// }}
									className={classes.inputFieldStyle}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
									{...register('dateOfBirth', { required: true })}></CssTextField>
							</Grid>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='Place of Birth'
									variant='outlined'
									type='text'
									autocomplete='off'
									size='small'
									className={classes.inputFieldStyle}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
									{...register('placeOfBirth', { required: true })}
								/>
							</Grid>
						</Grid>
						<Grid container spacing={1} className='mt-3'>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='Email'
									variant='outlined'
									type='email'
									size='small'
									autocomplete='off'
									className={classes.inputFieldStyle}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
									{...register('email', { required: true })}
								/>
							</Grid>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='CNIC No.'
									variant='outlined'
									type='number'
									autocomplete='off'
									size='small'
									className={classes.inputFieldStyle}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
									{...register('cnic', { required: true })}></CssTextField>
							</Grid>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='Date & Place of Issue'
									variant='outlined'
									type='text'
									placeholder='12-2-20, Hyderabad'
									autocomplete='off'
									size='small'
									className={classes.inputFieldStyle}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
									{...register('DatePlaceOfIssue', { required: true })}></CssTextField>
							</Grid>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='Nationality'
									variant='outlined'
									type='text'
									autocomplete='off'
									size='small'
									select
									className={classes.inputFieldStyle}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
									{...register('nationality', { required: true })}>
									{countries.map((country) => (
										<MenuItem value={country}>{country}</MenuItem>
									))}
								</CssTextField>
							</Grid>
						</Grid>
						<Grid container spacing={1} className='mt-3'>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='Bank Account No.'
									variant='outlined'
									type='text'
									size='small'
									autocomplete='off'
									className={classes.inputFieldStyle}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
									{...register('bankAccount', { required: true })}
								/>
							</Grid>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='Bank Name & Branch'
									variant='outlined'
									type='text'
									autocomplete='off'
									size='small'
									className={classes.inputFieldStyle}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
									{...register('bankNameAndBranch', { required: true })}></CssTextField>
							</Grid>
						</Grid>
						<Grid container spacing={1} className='mt-5'>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<input
									type='file'
									className={classes.uploadImgBtn}
									onChange={(event) => picUploadFunc(event)}
									// {...register("name", { required: true })}
								></input>
								<img
									src={image.path}
									alt='Employee Picture'
									width='150'
									height='150'
									className='mt-4 ml-3'
									align='left'
								/>
							</Grid>
						</Grid>
						<div style={{ marginTop: 30, marginBottom: 30 }}>
							<hr />
						</div>

						<Container className={classes.mainContainer}>
							<h5 className='text-left'>Next To Kin</h5>
							<Grid container spacing={1} style={{ marginTop: 15 }}>
								<Grid item lg={1} md={1}>
									<h5 className={classes.itemHeading}>1.</h5>
								</Grid>
								<Grid item lg={2} md={2} sm={12} xs={12}>
									<CssTextField
										id='outlined-basic'
										label='Name'
										variant='outlined'
										type='text'
										size='small'
										autocomplete='off'
										name='name'
										className={classes.inputFieldStyle}
										inputProps={{ style: { fontSize: 14 } }}
										{...register('kinName', { required: true })}
										InputLabelProps={{ style: { fontSize: 14 } }}
									/>
								</Grid>
								<Grid item lg={2} md={2} sm={12} xs={12}>
									<CssTextField
										id='outlined-basic'
										label='Relationship'
										variant='outlined'
										type='text'
										name='relation'
										size='small'
										autocomplete='off'
										className={classes.inputFieldStyle1}
										inputProps={{ style: { fontSize: 14 } }}
										{...register('kinRelation', { required: true })}
										InputLabelProps={{ style: { fontSize: 14 } }}
									/>
								</Grid>
								<Grid item lg={2} md={2} sm={12} xs={12}>
									<CssTextField
										id='outlined-basic'
										label='Address'
										variant='outlined'
										type='text'
										name='address'
										size='small'
										autocomplete='off'
										className={classes.inputFieldStyle2}
										inputProps={{ style: { fontSize: 14 } }}
										{...register('kinAddress', { required: true })}
										InputLabelProps={{ style: { fontSize: 14 } }}
									/>
								</Grid>
								<Grid item lg={2} md={2} sm={12} xs={12}>
									<CssTextField
										id='outlined-basic'
										label='Contact No.'
										variant='outlined'
										type='number'
										name='contact'
										size='small'
										autocomplete='off'
										className={classes.inputFieldStyle3}
										inputProps={{ style: { fontSize: 14 } }}
										{...register('kinContact', { required: true })}
										InputLabelProps={{ style: { fontSize: 14 } }}
									/>
								</Grid>
							</Grid>
						</Container>
						<div style={{ marginTop: 30, marginBottom: 30 }}>
							<hr />
						</div>
						<Container className={classes.mainContainer}>
							<h5 className='text-left'>Academic Qualification</h5>
							{academicQualification.map((value, i) => {
								const no = i + 1;
								return (
									<Grid key={i} container spacing={1} style={{ marginTop: 15 }}>
										<Grid item lg={1} md={1}>
											<h5 className={classes.itemHeading}>{no}</h5>
										</Grid>
										<Grid item lg={2} md={2} sm={12} xs={12}>
											<CssTextField
												id='outlined-basic'
												label='Degree/Certification'
												variant='outlined'
												type='text'
												size='small'
												name='degree'
												value={value.degree}
												onChange={(e) => {
													onChangeAcademicQualification(e, i);
												}}
												className={classes.inputFieldStyle}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}></CssTextField>
										</Grid>
										<Grid item lg={2} md={2} sm={12} xs={12}>
											<CssTextField
												id='outlined-basic'
												label='Board/University'
												variant='outlined'
												type='text'
												size='small'
												name='university'
												value={value.university}
												onChange={(e) => {
													onChangeAcademicQualification(e, i);
												}}
												className={classes.inputFieldStyle1}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
											/>
										</Grid>
										<Grid item lg={2} md={2} sm={12} xs={12}>
											<CssTextField
												id='outlined-basic'
												label='Year of Passing'
												variant='outlined'
												type='text'
												name='yearOfPassing'
												value={value.yearOfPassing}
												size='small'
												onChange={(e) => {
													onChangeAcademicQualification(e, i);
												}}
												className={classes.inputFieldStyle2}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
											/>
										</Grid>
										<Grid item lg={2} md={2} sm={12} xs={12}>
											<CssTextField
												id='outlined-basic'
												label='Division'
												variant='outlined'
												type='text'
												size='small'
												name='division'
												value={value.division}
												onChange={(e) => {
													onChangeAcademicQualification(e, i);
												}}
												className={classes.inputFieldStyle3}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
											/>
										</Grid>
										<Grid item lg={2} md={2} sm={12} xs={12}>
											<Button
												onClick={() => deleteAcademicQualification(i)}
												className={classes.deleteRowBtn}>
												<DeleteOutlineIcon className={classes.delete} />
											</Button>
										</Grid>
									</Grid>
								);
							})}

							<Grid container spacing={1}>
								<Grid item lg={3} md={3} sm={10} xs={11}>
									<Button
										variant='outlined'
										color='primary'
										className={classes.addMoreButton}
										onClick={addMoreAcademicQualification}
										// style={{ marginLeft: 'auto', marginRight: 'auto' }}
									>
										Add More
									</Button>
								</Grid>
							</Grid>
							{/* {
                                AddOrderError ? <p className="mt-3 text-danger"> Something Went Wrong. Internal Server Error </p> : null
                            }
                            {
                                AddOrderSuccess ? <p className="mt-3 text-success"> Purchase Order Added Successfully</p> : null
                            } */}
						</Container>

						<Container className={classes.mainContainer}>
							<h5 className='text-left'>Professional Qualification</h5>
							{professionalQualification.map((value, i) => {
								const no = i + 1;
								return (
									<Grid key={i} container spacing={1} style={{ marginTop: 15 }}>
										<Grid item lg={1} md={1}>
											<h5 className={classes.itemHeading}>{no}</h5>
										</Grid>
										<Grid item lg={2} md={2} sm={12} xs={12}>
											<CssTextField
												id='outlined-basic'
												label='Degree/Certification'
												variant='outlined'
												type='text'
												size='small'
												value={value.degree}
												name='degree'
												onChange={(e) => {
													onChangeProfessionalQualification(e, i);
												}}
												className={classes.inputFieldStyle}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}></CssTextField>
										</Grid>
										<Grid item lg={2} md={2} sm={12} xs={12}>
											<CssTextField
												id='outlined-basic'
												label='Board/University'
												variant='outlined'
												type='text'
												size='small'
												value={value.university}
												name='university'
												onChange={(e) => {
													onChangeProfessionalQualification(e, i);
												}}
												className={classes.inputFieldStyle1}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
											/>
										</Grid>
										<Grid item lg={2} md={2} sm={12} xs={12}>
											<CssTextField
												id='outlined-basic'
												label='Year of Passing'
												variant='outlined'
												type='text'
												size='small'
												value={value.yearOfPassing}
												name='yearOfPassing'
												onChange={(e) => {
													onChangeProfessionalQualification(e, i);
												}}
												className={classes.inputFieldStyle2}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
											/>
										</Grid>
										<Grid item lg={2} md={2} sm={12} xs={12}>
											<CssTextField
												id='outlined-basic'
												label='Division'
												variant='outlined'
												type='text'
												size='small'
												value={value.division}
												name='division'
												onChange={(e) => {
													onChangeProfessionalQualification(e, i);
												}}
												className={classes.inputFieldStyle3}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
											/>
										</Grid>
										<Grid item lg={2} md={2} sm={12} xs={12}>
											<Button
												onClick={() => deleteProfessionalQualification(i)}
												className={classes.deleteRowBtn}>
												<DeleteOutlineIcon className={classes.delete} />
											</Button>
										</Grid>
									</Grid>
								);
							})}
							<Grid container spacing={1}>
								<Grid item lg={3} md={3} sm={10} xs={11}>
									<Button
										variant='outlined'
										color='primary'
										className={classes.addMoreButton}
										onClick={addMoreProfessionalQualification}
										// style={{ marginLeft: 'auto', marginRight: 'auto' }}
									>
										Add More
									</Button>
								</Grid>
							</Grid>
							{/* {
                                AddOrderError ? <p className="mt-3 text-danger"> Something Went Wrong. Internal Server Error </p> : null
                            }
                            {
                                AddOrderSuccess ? <p className="mt-3 text-success"> Purchase Order Added Successfully</p> : null
                            } */}
						</Container>

						<div style={{ marginTop: 30, marginBottom: 30 }}>
							<hr />
						</div>
						<Container className={classes.mainContainer}>
							<h5 className='text-left'>
								Experience (Recent First) in Relevant Field
							</h5>
							{experience.map((value, i) => {
								const no = i + 1;
								return (
									<Grid key={i} container spacing={1} style={{ marginTop: 15 }}>
										<Grid item lg={1} md={1}>
											<h5 className={classes.itemHeading}>{no}</h5>
										</Grid>
										<Grid item lg={2} md={2} sm={12} xs={12}>
											<CssTextField
												id='outlined-basic'
												label='Company Name'
												variant='outlined'
												type='text'
												size='small'
												value={value.companyName}
												name='companyName'
												onChange={(e) => {
													onChangeExperience(e, i);
												}}
												className={classes.inputFieldStyle}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
											/>
										</Grid>
										<Grid item lg={2} md={2} sm={12} xs={12}>
											<CssTextField
												id='outlined-basic'
												label='Company Address'
												variant='outlined'
												type='text'
												size='small'
												value={value.companyAddress}
												name='companyAddress'
												onChange={(e) => {
													onChangeExperience(e, i);
												}}
												className={classes.inputFieldStyle1}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
											/>
										</Grid>
										<Grid item lg={2} md={2} sm={12} xs={12}>
											<CssTextField
												id='outlined-basic'
												label='Last Salary'
												variant='outlined'
												type='number'
												size='small'
												value={value.from}
												name='from'
												onChange={(e) => {
													onChangeExperience(e, i);
												}}
												className={classes.inputFieldStyle2}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
											/>
										</Grid>
										<Grid item lg={2} md={2} sm={12} xs={12}>
											<CssTextField
												id='outlined-basic'
												label='Reason of Left'
												variant='outlined'
												type='text'
												size='small'
												value={value.to}
												name='to'
												onChange={(e) => {
													onChangeExperience(e, i);
												}}
												className={classes.inputFieldStyle3}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
											/>
										</Grid>
										<Grid container spacing={1} className='mt-1'>
											<Grid item lg={1} md={1} sm={12} xs={12}></Grid>
											<Grid item lg={3} md={3} sm={12} xs={12}>
												<CssTextField
													id='outlined-basic'
													// label="From"
													variant='outlined'
													type='date'
													style={{ width: '100%' }}
													size='small'
													value={value.lastSalary}
													name='lastSalary'
													onChange={(e) => {
														onChangeExperience(e, i);
													}}
													className={classes.inputFieldStyle5}
													inputProps={{ style: { fontSize: 14 } }}
													InputLabelProps={{ style: { fontSize: 14 } }}
												/>
											</Grid>
											<Grid item lg={1} md={1} sm={12} xs={12}></Grid>
											<Grid item lg={3} md={3} sm={12} xs={12}>
												<CssTextField
													id='outlined-basic'
													// label="To Date"
													variant='outlined'
													type='date'
													size='small'
													value={value.reasonOfLeft}
													name='reasonOfLeft'
													onChange={(e) => {
														onChangeExperience(e, i);
													}}
													style={{ width: '100%' }}
													className={classes.inputFieldStyle4}
													inputProps={{ style: { fontSize: 14 } }}
													InputLabelProps={{ style: { fontSize: 14 } }}
												/>
											</Grid>
											<Grid item lg={3} md={3} sm={12} xs={12}>
												<CssTextField
													id='outlined-basic'
													variant='outlined'
													type='text'
													size='small'
													select
													value={value.experienceLevel}
													style={{ width: '100%' }}
													name='experienceLevel'
													onChange={(e) => {
														onChangeExperience(e, i);
													}}
													className={classes.inputFieldStyle4}
													inputProps={{ style: { fontSize: 14 } }}
													InputLabelProps={{ style: { fontSize: 14 } }}>
													{!experiencesState || !experiencesState.length ? (
														<p>Data Not Found</p>
													) : (
														experiencesState.map((experience, i) => (
															<MenuItem value={experience._id} key={i}>
																{experience.name}
															</MenuItem>
														))
													)}
												</CssTextField>
											</Grid>
											<Grid item lg={1} md={2} sm={12} xs={12}>
												<Button
													onClick={() => deleteExperience(i)}
													className={classes.deleteRowBtn}>
													<DeleteOutlineIcon className={classes.delete} />
												</Button>
											</Grid>
										</Grid>
									</Grid>
								);
							})}
							<Grid container spacing={1}>
								<Grid item lg={3} md={3} sm={10} xs={11}>
									<Button
										variant='outlined'
										color='primary'
										className={classes.addMoreButton}
										onClick={addMoreExperience}
										// style={{ marginLeft: 'auto', marginRight: 'auto' }}
									>
										Add More
									</Button>
								</Grid>
							</Grid>
							{/* {
                                AddOrderError ? <p className="mt-3 text-danger"> Something Went Wrong. Internal Server Error </p> : null
                            }
                            {
                                AddOrderSuccess ? <p className="mt-3 text-success"> Purchase Order Added Successfully</p> : null
                            } */}
						</Container>
						<div style={{ marginTop: 30, marginBottom: 30 }}>
							<hr />
						</div>
						<Container className={classes.mainContainer}>
							<h5 className='text-left'>Reference</h5>
							<Grid container spacing={1} style={{ marginTop: 15 }}>
								<Grid item lg={1} md={1}>
									{/* <h5 className={classes.itemHeading}>1.</h5> */}
								</Grid>
								<Grid item lg={2} md={2} sm={12} xs={12}>
									<CssTextField
										id='outlined-basic'
										label='Name'
										variant='outlined'
										type='text'
										size='small'
										autocomplete='off'
										// onChange={(e) => {
										// }}
										className={classes.inputFieldStyle}
										inputProps={{ style: { fontSize: 14 } }}
										{...register('refName', { required: true })}
										InputLabelProps={{ style: { fontSize: 14 } }}
									/>
								</Grid>
								<Grid item lg={2} md={2} sm={12} xs={12}>
									<CssTextField
										id='outlined-basic'
										label='Address'
										variant='outlined'
										type='text'
										size='small'
										autocomplete='off'
										// value={value.quantity}
										// onChange={(e) => {
										// }}
										className={classes.inputFieldStyle1}
										inputProps={{ style: { fontSize: 14 } }}
										{...register('refAddress', { required: true })}
										InputLabelProps={{ style: { fontSize: 14 } }}
									/>
								</Grid>
								<Grid item lg={2} md={2} sm={12} xs={12}>
									<CssTextField
										id='outlined-basic'
										label='Contact No.'
										variant='outlined'
										type='number'
										size='small'
										autocomplete='off'
										// value={ItemCounter[i].unitValue}
										className={classes.inputFieldStyle2}
										{...register('refContact', { required: true })}
										inputProps={{ style: { fontSize: 14 } }}
										InputLabelProps={{ style: { fontSize: 14 } }}
									/>
								</Grid>
							</Grid>
						</Container>
						<div style={{ marginTop: 30, marginBottom: 30 }}>
							<hr />
						</div>
						<Container className={classes.mainContainer}>
							<h5 className='text-left'>For Office Use Only</h5>
							<Grid container spacing={1} style={{ marginTop: 15 }}>
								<Grid item lg={1} md={1}></Grid>
								<Grid item lg={2} md={2} sm={12} xs={12}>
									<CssTextField
										id='outlined-basic'
										variant='outlined'
										type='date'
										size='small'
										autocomplete='off'
										className={classes.inputFieldStyle}
										inputProps={{ style: { fontSize: 14 } }}
										{...register('dateOfInterviewed', { required: true })}
										InputLabelProps={{ style: { fontSize: 14 } }}
									/>
								</Grid>
								<Grid item lg={2} md={2} sm={12} xs={12}>
									<CssTextField
										id='outlined-basic'
										label='Remarks'
										variant='outlined'
										type='text'
										size='small'
										autocomplete='off'
										className={classes.inputFieldStyle1}
										inputProps={{ style: { fontSize: 14 } }}
										{...register('remarks', { required: true })}
										InputLabelProps={{ style: { fontSize: 14 } }}
									/>
								</Grid>
								<Grid item lg={2} md={2} sm={12} xs={12}>
									<CssTextField
										id='outlined-basic'
										label='Recommend For Employment'
										variant='outlined'
										type='number'
										size='small'
										select
										autocomplete='off'
										className={classes.inputFieldStyle2}
										{...register('recommended', { required: true })}
										inputProps={{ style: { fontSize: 14 } }}
										InputLabelProps={{ style: { fontSize: 14 } }}>
										<MenuItem value='true'>true</MenuItem>
										<MenuItem value='false'>false</MenuItem>
									</CssTextField>
								</Grid>
								<Grid item lg={2} md={2} sm={12} xs={12}>
									<CssTextField
										id='outlined-basic'
										label='Job Title'
										variant='outlined'
										type='text'
										size='small'
										{...register('jobTitle', { required: true })}
										autocomplete='off'
										className={classes.inputFieldStyle3}
										inputProps={{ style: { fontSize: 14 } }}
										InputLabelProps={{ style: { fontSize: 14 } }}
									/>
								</Grid>
							</Grid>
							<Grid container spacing={1} style={{ marginTop: 15 }}>
								<Grid item lg={1} md={1}></Grid>
								<Grid item lg={2} md={2} sm={12} xs={12}>
									<CssTextField
										id='outlined-basic'
										label='Recommended Salary'
										variant='outlined'
										type='number'
										size='small'
										{...register('recommendedSalary', { required: true })}
										autocomplete='off'
										className={classes.inputFieldStyle}
										inputProps={{ style: { fontSize: 14 } }}
										InputLabelProps={{ style: { fontSize: 14 } }}
									/>
								</Grid>
								<Grid item lg={2} md={2} sm={12} xs={12}>
									<CssTextField
										id='outlined-basic'
										label='Recommendations Approved'
										variant='outlined'
										type='text'
										size='small'
										select
										autocomplete='off'
										{...register('approved', { required: true })}
										className={classes.inputFieldStyle1}
										inputProps={{ style: { fontSize: 14 } }}
										InputLabelProps={{ style: { fontSize: 14 } }}>
										<MenuItem value='Yes'>Yes</MenuItem>
										<MenuItem value='No'>No</MenuItem>
									</CssTextField>
								</Grid>
							</Grid>
						</Container>
						<Container className={classes.mainContainer}>
							<h5 className='text-left'>Executive or non Executive</h5>
							<Grid container spacing={1} style={{ marginTop: 15 }}>
								<Grid item lg={1} md={1}></Grid>
								<Grid item lg={2} md={2} sm={12} xs={12}>
									<CssTextField
										id='outlined-basic'
										variant='outlined'
										type='text'
										label='Executive or non Executive'
										size='small'
										autocomplete='off'
										select
										className={classes.inputFieldStyle}
										inputProps={{ style: { fontSize: 14 } }}
										{...register('isExecutive', { required: true })}
										InputLabelProps={{ style: { fontSize: 14 } }}>
										<MenuItem value='Executive'>Executive</MenuItem>
										<MenuItem value='Non Executive'>Non Executive</MenuItem>
									</CssTextField>
								</Grid>
								<Grid item lg={1} md={1}></Grid>

								<Grid item lg={2} md={2} sm={12} xs={12}>
									<CssTextField
										id='outlined-basic'
										variant='outlined'
										type='text'
										size='small'
										select
										label='Employee Type'
										autocomplete='off'
										className={classes.inputFieldStyle}
										inputProps={{ style: { fontSize: 14 } }}
										{...register('empType', { required: true })}
										InputLabelProps={{ style: { fontSize: 14 } }}>
										<MenuItem value='Executive'>Executive</MenuItem>
										<MenuItem value='Electrician'>Electrician</MenuItem>
										<MenuItem value='Skilled Employee'>Skilled Employee</MenuItem>
										<MenuItem value='Final Labour'>Final Labour</MenuItem>
									</CssTextField>
								</Grid>
							</Grid>
						</Container>
						{error && <p style={{ margin: '20px 0px', color: 'red' }}>{error}</p>}
						<Button
							variant='outlined'
							color='primary'
							type='submit'
							className={classes.addButton}>
							Add
						</Button>
					</form>
				</Container>
			</div>
		</Sidenav>
	);
};

export default Employees;
