import React, { useState, useEffect } from 'react';
import Sidenav from '../../../SideNav/Sidenav';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
	getSingleEmployee,
	hireEmployee,
} from '../../../../services/action/EmployeesAction';
import { fetchDepartmentsAction } from '../../../../services/action/DepartmentAction';
import { getDesignation } from '../../../../services/action/DesignationAction';

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

const HiredEmpDetails = ({ match }) => {
	const [isEmployeeHired, setIsEmployeeHired] = useState(false);
	const classes = useStyles();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const dispatch = useDispatch();

	const { employee, loading, error } = useSelector((state) => state.employees);
	const { departments } = useSelector((state) => state.departments);
	const { designations } = useSelector((state) => state.designations);

	useEffect(() => {
		dispatch(getSingleEmployee(match.params.id));
		dispatch(fetchDepartmentsAction());
		dispatch(getDesignation());
	}, [match.params]);

	const onSubmitData = (props) => {
		dispatch(hireEmployee(employee._id, props));
		setIsEmployeeHired(true);
	};

	const {
		name,
		fatherName_husbandName,
		jobAppliedFor,
		presentAddress,
		gender,
		permanentAddress,
		mobileNo,
		telephoneNo,
		status,
		age,
		dateOfBirth,
		placeOfBirth,
		email,
		cnic,
		DatePlaceOfIssue,
		nationality,
		bankAccount,
		bankNameAndBranch,
		picture,
		nextToKin,
		academicQualification,
		professionalQualification,
		experience,
		reference,
		officeUse,
	} = employee;

	return (
		<Sidenav title={'Hired Employee Details'}>
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
									value={name}
									disabled
									autocomplete='off'
									style={{ width: '90%' }}
									inputProps={{ style: { fontSize: 14 } }}></CssTextField>
							</Grid>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label="Father's Name/Husband Name"
									variant='outlined'
									type='text'
									autocomplete='off'
									value={fatherName_husbandName}
									disabled
									size='small'
									style={{ width: '90%' }}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}></CssTextField>
							</Grid>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='Job Applied For'
									variant='outlined'
									type='text'
									autocomplete='off'
									value={jobAppliedFor}
									disabled
									size='small'
									style={{ width: '90%' }}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}></CssTextField>
							</Grid>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='Present Address'
									variant='outlined'
									value={presentAddress}
									disabled
									type='text'
									autocomplete='off'
									size='small'
									style={{ width: '90%' }}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}></CssTextField>
							</Grid>
						</Grid>
						<Grid container spacing={1} className='mt-3'>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='Permanent Address'
									variant='outlined'
									type='text'
									value={permanentAddress}
									disabled
									size='small'
									autocomplete='off'
									style={{ width: '90%' }}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}></CssTextField>
							</Grid>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='Telephone No.'
									variant='outlined'
									type='number'
									autocomplete='off'
									value={telephoneNo}
									disabled
									size='small'
									style={{ width: '90%' }}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}></CssTextField>
							</Grid>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='Mobile No.'
									variant='outlined'
									type='number'
									autocomplete='off'
									size='small'
									value={mobileNo}
									disabled
									style={{ width: '90%' }}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}></CssTextField>
							</Grid>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='Gender'
									variant='outlined'
									type='text'
									autocomplete='off'
									value={gender}
									disabled
									size='small'
									style={{ width: '90%' }}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}></CssTextField>
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
									value={status}
									disabled
									autocomplete='off'
									style={{ width: '90%' }}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}></CssTextField>
							</Grid>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='Age'
									variant='outlined'
									type='number'
									autocomplete='off'
									value={age}
									disabled
									size='small'
									style={{ width: '90%' }}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}></CssTextField>
							</Grid>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='DOB'
									variant='outlined'
									type='date'
									autocomplete='off'
									size='small'
									value={dateOfBirth}
									disabled
									style={{ width: '90%' }}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}></CssTextField>
							</Grid>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='Place of Birth'
									variant='outlined'
									type='text'
									autocomplete='off'
									value={placeOfBirth}
									disabled
									size='small'
									style={{ width: '90%' }}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
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
									value={email}
									disabled
									autocomplete='off'
									style={{ width: '90%' }}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
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
									value={cnic}
									disabled
									style={{ width: '90%' }}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}></CssTextField>
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
									value={DatePlaceOfIssue}
									disabled
									style={{ width: '90%' }}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}></CssTextField>
							</Grid>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='Nationality'
									variant='outlined'
									type='text'
									autocomplete='off'
									size='small'
									value={nationality}
									disabled
									style={{ width: '90%' }}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}></CssTextField>
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
									value={bankAccount}
									disabled
									autocomplete='off'
									style={{ width: '90%' }}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
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
									value={bankNameAndBranch}
									disabled
									style={{ width: '90%' }}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}></CssTextField>
							</Grid>
						</Grid>
						<Grid container spacing={1} className='mt-5'>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<img
									src={picture}
									alt='Employee Picture'
									width='150'
									height='150'
									className='ml-3'
									align='left'
									style={{ objectFit: 'cover' }}
								/>
							</Grid>
						</Grid>
						<div style={{ marginTop: 30, marginBottom: 30 }}>
							<hr />
						</div>
						<Container className={classes.mainContainer}>
							<h5 style={{ textAlign: 'left', }}>Next To Kin</h5>
							<div class='container'>
								<Grid container spacing={1} style={{ marginTop: 15 }}>
									<Grid item lg={3} md={2} sm={12} xs={12}>
										<CssTextField
											id='outlined-basic'
											label='Name'
											variant='outlined'
											type='text'
											size='small'
											value={nextToKin?.name}
											disabled
											autocomplete='off'
											style={{ width: '90%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
										/>
									</Grid>
									<Grid item lg={3} md={2} sm={12} xs={12}>
										<CssTextField
											id='outlined-basic'
											label='Relationship'
											variant='outlined'
											type='text'
											value={nextToKin?.relation}
											disabled
											size='small'
											autocomplete='off'
											style={{ width: '90%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
										/>
									</Grid>
									<Grid item lg={3} md={2} sm={12} xs={12}>
										<CssTextField
											id='outlined-basic'
											label='Address'
											variant='outlined'
											type='text'
											size='small'
											autocomplete='off'
											value={nextToKin?.address}
											disabled
											style={{ width: '90%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
										/>
									</Grid>
									<Grid item lg={3} md={2} sm={12} xs={12}>
										<CssTextField
											id='outlined-basic'
											label='Contact No.'
											variant='outlined'
											type='number'
											size='small'
											value={nextToKin?.contact}
											disabled
											autocomplete='off'
											style={{ width: '90%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
										/>
									</Grid>

								</Grid>
							</div>
						</Container>
						{/* ) : null */}
						<div style={{ marginTop: 30, marginBottom: 30 }}>
							<hr />
						</div>
						<h5 style={{ textAlign: 'left', }}>Academic Qualifications</h5>
						{academicQualification &&
							academicQualification.map((value, i) => {
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
												disabled
												style={{ width: '100%' }}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}></CssTextField>
										</Grid>
										<Grid item lg={2} md={2} sm={12} xs={12}>
											<CssTextField
												id='outlined-basic'
												label='Board/University'
												variant='outlined'
												type='text'
												disabled
												size='small'
												name='university'
												value={value.university}
												style={{ width: '100%' }}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
											/>
										</Grid>
										<Grid item lg={2} md={2} sm={12} xs={12}>
											<CssTextField
												id='outlined-basic'
												label='Year of Passing'
												variant='outlined'
												disabled
												type='text'
												name='yearOfPassing'
												value={value.yearOfPassing}
												size='small'
												style={{ width: '100%' }}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
											/>
										</Grid>
										<Grid item lg={2} md={2} sm={12} xs={12}>
											<CssTextField
												id='outlined-basic'
												label='Division'
												variant='outlined'
												disabled
												type='text'
												size='small'
												name='division'
												value={value.division}
												style={{ width: '100%' }}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
											/>
										</Grid>
									</Grid>
								);
							})}
						<div style={{ marginTop: 30, marginBottom: 30 }}>
							<hr />
						</div>
						<h5 style={{ textAlign: 'left', }}>Professional Qualification</h5>

						{professionalQualification &&
							professionalQualification.map((value, i) => {
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
												disabled
												style={{ width: '100%' }}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}></CssTextField>
										</Grid>
										<Grid item lg={2} md={2} sm={12} xs={12}>
											<CssTextField
												id='outlined-basic'
												label='Board/University'
												variant='outlined'
												type='text'
												disabled
												size='small'
												name='university'
												value={value.university}
												style={{ width: '100%' }}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
											/>
										</Grid>
										<Grid item lg={2} md={2} sm={12} xs={12}>
											<CssTextField
												id='outlined-basic'
												label='Year of Passing'
												variant='outlined'
												disabled
												type='text'
												name='yearOfPassing'
												value={value.yearOfPassing}
												size='small'
												style={{ width: '100%' }}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
											/>
										</Grid>
										<Grid item lg={2} md={2} sm={12} xs={12}>
											<CssTextField
												id='outlined-basic'
												label='Division'
												variant='outlined'
												disabled
												type='text'
												size='small'
												name='division'
												value={value.division}
												style={{ width: '100%' }}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
											/>
										</Grid>
									</Grid>
								);
							})}
						<div style={{ marginTop: 30, marginBottom: 30 }}>
							<hr />
						</div>
						<h5 style={{ textAlign: 'left', }}>Experience</h5>
						{
							experience &&
							experience.map((value, i) => {
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
												disabled
												variant='outlined'
												type='text'
												size='small'
												value={value.companyName}
												name='companyName'
												style={{ width: '100%' }}
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
												disabled
												value={value.companyAddress}
												name='companyAddress'
												style={{ width: '100%' }}
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
												disabled
												name='from'
												style={{ width: '100%' }}
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
												disabled
												value={value.to}
												name='to'
												style={{ width: '100%' }}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
											/>
										</Grid>
										<Grid key={i} container spacing={1} style={{ marginTop: 15 }}>
											<Grid item lg={1} md={1}>
												{/* <h5 className={classes.itemHeading}>{no}</h5> */}
											</Grid>
											<Grid item lg={2} md={2} sm={12} xs={12}>
												<CssTextField
													id='outlined-basic'
													variant='outlined'
													type='date'
													size='small'
													name='lastSalary'
													disabled
													value={value.lastSalary}
													style={{ width: '100%' }}
													inputProps={{ style: { fontSize: 14 } }}
													InputLabelProps={{ style: { fontSize: 14 } }}
												/>
											</Grid>
											<Grid item lg={2} md={2} sm={12} xs={12}>
												<CssTextField
													id='outlined-basic'
													variant='outlined'
													type='date'
													size='small'
													value={value.reasonOfLeft}
													disabled
													name='reasonOfLeft'
													style={{ width: '100%' }}
													inputProps={{ style: { fontSize: 14 } }}
													InputLabelProps={{ style: { fontSize: 14 } }}
												/>
											</Grid>
											<Grid item lg={2} md={2} sm={12} xs={12}>
												<CssTextField
													id='outlined-basic'
													variant='outlined'
													type='text'
													size='small'
													disabled
													value={value?.experienceLevel?.name}
													style={{ width: '100%' }}
													name='experienceLevel'
													inputProps={{ style: { fontSize: 14 } }}
													InputLabelProps={{ style: { fontSize: 14 } }}></CssTextField>
											</Grid>
										</Grid>
									</Grid>
								);
							})
						}
						<div style={{ marginTop: 30, marginBottom: 30 }}>
							<hr />
						</div>
						<h5 style={{ textAlign: 'left', }}>Reference</h5>
						<Grid container spacing={1} style={{ marginTop: 15 }}>
							<Grid item lg={1} md={1}>
								{/* <h5 className={classes.itemHeading}>1.</h5> */}
							</Grid>
							<Grid item lg={2} md={2} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='Name'
									variant='outlined'
									disabled
									value={reference?.name}
									type='text'
									size='small'
									autocomplete='off'
									style={{ width: '100%' }}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
								/>
							</Grid>
							<Grid item lg={2} md={2} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='Address'
									variant='outlined'
									type='text'
									disabled
									value={reference?.address}
									size='small'
									autocomplete='off'
									style={{ width: '100%' }}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
								/>
							</Grid>
							<Grid item lg={2} md={2} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='Contact No.'
									variant='outlined'
									type='number'
									disabled
									value={reference?.contactNo}
									size='small'
									autocomplete='off'
									style={{ width: '100%' }}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
								/>
							</Grid>
						</Grid>
						<div style={{ marginTop: 30, marginBottom: 30 }}>
							<hr />
						</div>
						<h5 style={{ textAlign: 'left', }}>For Office Use Only</h5>
						<Grid container spacing={1} style={{ marginTop: 15 }}>
							<Grid item lg={1} md={1}></Grid>
							<Grid item lg={2} md={2} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									variant='outlined'
									type='text'
									disabled
									value={officeUse?.dateOfApproved}
									size='small'
									autocomplete='off'
									style={{ width: '100%' }}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
								/>
							</Grid>
							<Grid item lg={2} md={2} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='Remarks'
									variant='outlined'
									type='text'
									disabled
									value={officeUse?.remarks}
									size='small'
									autocomplete='off'
									style={{ width: '100%' }}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
								/>
							</Grid>
							<Grid item lg={2} md={2} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='Recommend For Employment'
									variant='outlined'
									type='text'
									size='small'
									disabled
									value={officeUse?.recommended}
									autocomplete='off'
									style={{ width: '100%' }}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}></CssTextField>
							</Grid>
							<Grid item lg={2} md={2} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='Job Title'
									variant='outlined'
									type='text'
									size='small'
									disabled
									value={officeUse?.jobTitle}
									autocomplete='off'
									style={{ width: '100%' }}
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
									label='Recommendations Dept'
									variant='outlined'
									type='text'
									select
									disabled
									value={officeUse?.department?.name}
									size='small'
									autocomplete='off'
									style={{ width: '100%' }}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}></CssTextField>
							</Grid>

							<Grid item lg={2} md={2} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='Recommended Salary'
									variant='outlined'
									type='number'
									size='small'
									autocomplete='off'
									disabled
									value={officeUse?.recommendedSalary}
									style={{ width: '100%' }}
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
									disabled
									value={officeUse?.approved}
									size='small'
									autocomplete='off'
									style={{ width: '100%' }}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}></CssTextField>
							</Grid>
						</Grid>
						<div style={{ marginTop: 30, marginBottom: 30 }}>
							<hr />
						</div>
						<h5 style={{ textAlign: 'left', }}>Assigned Final Details</h5>
						<Grid container spacing={1} style={{ marginTop: 15 }}>
							<Grid item lg={1} md={1}>
								{/* <h5 className={classes.itemHeading}>1.</h5> */}
							</Grid>
							<Grid item lg={2} md={2} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='Select Desired Dept'
									variant='outlined'
									type='text'
									{...register('finalDepartment', { required: true })}
									size='small'
									select
									autocomplete='off'
									style={{ width: '100%' }}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}>
									{departments &&
										departments.map((el) => (
											<MenuItem key={el._id} value={el._id}>
												{el?.name}
											</MenuItem>
										))}
								</CssTextField>
							</Grid>
							<Grid item lg={2} md={2} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='Designation'
									variant='outlined'
									type='text'
									{...register('finalDesignation', { required: true })}
									size='small'
									select
									autocomplete='off'
									style={{ width: '100%' }}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}>
									{designations && !designations.length ? (
										<h1>Not found</h1>
									) : (
										designations.map((el) => (
											<MenuItem key={el._id} value={el._id}>
												{el?.name}
											</MenuItem>
										))
									)}
								</CssTextField>
							</Grid>
							<Grid item lg={2} md={2} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='Salary'
									variant='outlined'
									{...register('finalSal', { required: true })}
									type='number'
									size='small'
									autocomplete='off'
									style={{ width: '100%' }}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
								/>
							</Grid>
						</Grid>
						<div>
							<Button
								variant='outlined'
								color='primary'
								type='submit'
								className={classes.addButton}>
								Submit
							</Button>
						</div>
					</form>
					<p>{isEmployeeHired && 'Employee is hired successfully'}</p>
				</Container>
			</div>
		</Sidenav>
	);
};

export default HiredEmpDetails;
