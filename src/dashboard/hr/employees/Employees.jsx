import React, { useState, useEffect } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import avatar from '../assests/user.svg';
import {
	createEmployee,
	getEmployees,
} from '../../../services/action/EmployeesAction';
import { getExperiences } from '../../../services/action/ExperienceAction';
import { fetchDepartmentsAction } from '../../../services/action/DepartmentAction';
import Loading from '../../purchase/material/Loading';
import MaterialError from '../../purchase/material/MaterialError';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { TableCell, TableRow } from '@material-ui/core';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Button from '../../../components/utils/Button';

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

const initialValues = {
	name: '',
	fatherName_husbandName: '',
	jobAppliedFor: '',
	presentAddress: '',
	permanentAddress: '',
	email: '',
	cnic: '',
	mobileNo: '',
	isHired: '',
	telephoneNo: '',
	gender: '',
	status: '',
	age: '',
	dateOfBirth: '',
	placeOfBirth: '',
	DatePlaceOfIssue: '',
	nationality: '',
	bankAccount: '',
	bankNameAndBranch: '',
	isExecutive: '',
	empType: '',
	finalDepartment: '',
	finalDesignation: '',
	finalSal: '',
	nextToKin: {
		name: '',
		relation: '',
		contact: '',
		address: '',
	},
	reference: {
		name: '',
		address: '',
		contactNo: '',
	},
	officeUse: {
		dateOfInterviewed: '',
		remarks: '',
		recommended: '',
		jobTitle: '',
		recommendedSalary: '',
		approved: '',
		dateOfApproved: '',
		department: '',
	},
};

const validationSchema = yup.object({
	name: yup.string().required(),
	fatherName_husbandName: yup.string().required(),
	jobAppliedFor: yup.string().required(),
	presentAddress: yup.string().required(),
	permanentAddress: yup.string().required(),
	email: yup.string().required(),
	cnic: yup.string().required(),
	mobileNo: yup.string().required(),
	isHired: yup.string().required(),
	telephoneNo: yup.string().required(),
	gender: yup.string().required(),
	status: yup.string().required(),
	age: yup.string().required(),
	dateOfBirth: yup.string().required(),
	placeOfBirth: yup.string().required(),
	nationality: yup.string().required(),
	bankAccount: yup.string().required(),
	bankNameAndBranch: yup.string().required(),
	isExecutive: yup.string().required(),
	empType: yup.string().required(),
	finalDepartment: yup.string().required(),
	finalDesignation: yup.string().required(),
	finalSal: yup.string().required(),
	nextToKin: yup.object({
		name: yup.string().required(),
		relation: yup.string().required(),
		contact: yup.string().required(),
		address: yup.string().required(),
	}),
	reference: yup.object({
		name: yup.string().required(),
		address: yup.string().required(),
		contactNo: yup.string().required(),
	}),
	officeUse: yup.object({
		dateOfInterviewed: yup.string().required(),
		remarks: yup.string().required(),
		recommended: yup.string().required(),
		jobTitle: yup.string().required(),
		recommendedSalary: yup.string().required(),
		approved: yup.string().required(),
		dateOfApproved: yup.string().required(),
		department: yup.string().required(),
	}),
});

const validationSchemaForAcademicQualification = yup.object({
	degree: yup.string().required(),
	university: yup.string().required(),
	yearOfPassing: yup.string().required(),
	division: yup.string().required(),
});
const validationSchemaForProfessionalQualification = yup.object({
	degree: yup.string().required(),
	university: yup.string().required(),
	yearOfPassing: yup.string().required(),
	division: yup.string().required(),
});

const validationSchemaForExperience = yup.object({
	companyName: yup.string().required(),
	companyAddress: yup.string().required(),
	from: yup.string().required(),
	to: yup.string().required(),
	lastSalary: yup.string().required(),
	reasonOfLeft: yup.string().required(),
	experienceLevel: yup.string().required(),
});

const Employees = ({ history }) => {
	const classes = useStyles();
	const [image, setImage] = useState({ path: avatar });
	const [academicQualifications, setAcademicQualification] = React.useState([]);
	const [academicQualificationsEdit, setAcademicQualificationsEdit] =
		React.useState(false);
	const [professionalQualificationEdit, setProfessionalQualificationEdit] =
		React.useState(false);
	const [experienceEdit, setExperienceEdit] = React.useState(false);
	const [professionalQualification, setProfessionalQualification] =
		React.useState([]);
	const [experience, setExperience] = React.useState([]);
	const [
		initialValuesForAcademicQualification,
		setInitialValuesForAcademicQualification,
	] = React.useState({
		degree: '',
		university: '',
		yearOfPassing: '',
		division: '',
	});
	const [
		initialValuesForProfessionalQualification,
		setInitialValuesForProfessionalQualification,
	] = React.useState({
		degree: '',
		university: '',
		yearOfPassing: '',
		division: '',
	});
	const [initialValuesForExperience, setInitialValuesForExperience] =
		React.useState({
			companyName: '',
			companyAddress: '',
			from: '',
			to: '',
			lastSalary: '',
			reasonOfLeft: '',
			experienceLevel: '',
		});

	const picUploadFunc = (event) => {
		if (event.target.files && event.target.files[0]) {
			setImage({
				path: URL.createObjectURL(event.target.files[0]),
				image: event.target.files[0],
			});
		}
	};

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getEmployees());
		dispatch(getExperiences());
		dispatch(fetchDepartmentsAction());
	}, [dispatch]);

	const { experiences: experiencesState } = useSelector(
		(state) => state.experiences,
	);
	const { departments } = useSelector((state) => state.departments);

	const { employees } = useSelector((state) => state.employees);

	const onSubmit = (values) => {
		console.log({
			...values,
			experience,
			professionalQualification,
			academicQualification: academicQualifications,
		});
		// dispatch(
		// 	createEmployee({
		// 		...values,
		// 		experience,
		// 		professionalQualification,
		// 		academicQualification,
		// 	}),
		// );
	};

	const addMoreAcademicQualification = (values, actions) => {
		setAcademicQualification((prev) => {
			if (academicQualificationsEdit) {
				return prev.map((el) => (el.id === values.id ? values : el));
			} else {
				return [...prev, { ...values, id: prev.length + 1 }];
			}
		});
		setAcademicQualificationsEdit(false);
		actions.resetForm({
			values: {
				degree: '',
				university: '',
				yearOfPassing: '',
				division: '',
			},
		});
	};

	const editAcademicQualification = (values) => {
		setAcademicQualificationsEdit(true);
		setInitialValuesForAcademicQualification(values);
	};

	const deleteAcademicQualification = (id) => {
		setAcademicQualification((prev) => prev.filter((el) => el.id !== id));
	};

	const addMoreProfessionalQualification = (values, actions) => {
		setProfessionalQualification((prev) => {
			if (professionalQualificationEdit) {
				return prev.map((el) => (el.id === values.id ? values : el));
			} else {
				return [...prev, { ...values, id: prev.length + 1 }];
			}
		});
		setProfessionalQualificationEdit(false);
		actions.resetForm({
			values: {
				degree: '',
				university: '',
				yearOfPassing: '',
				division: '',
			},
		});
	};

	const editProfessionalQualification = (values) => {
		setProfessionalQualificationEdit(true);

		setInitialValuesForProfessionalQualification(values);
	};

	const deleteProfessionalQualification = (id) => {
		setProfessionalQualification((prev) => prev.filter((el) => el.id !== id));
	};

	const addMoreExperience = (values, actions) => {
		setExperience((prev) => {
			if (experienceEdit) {
				return prev.map((el) => (el.id === values.id ? values : el));
			} else {
				return [...prev, { ...values, id: prev.length + 1 }];
			}
		});
		setExperienceEdit(false);
		actions.resetForm({
			values: {
				companyName: '',
				companyAddress: '',
				from: '',
				to: '',
				lastSalary: '',
				reasonOfLeft: '',
				experienceLevel: '',
			},
		});
	};

	const editExperience = (values) => {
		setExperienceEdit(true);
		setInitialValuesForExperience(values);
	};

	const deleteExperience = (id) => {
		setExperience((prev) => prev.filter((el) => el.id !== id));
	};

	// const onChangeAcademicQualification = (e, index) => {
	// 	const temp2 = [...academicQualification];
	// 	temp2[index][e.target.name] = e.target.value;
	// 	setAcademicQualification(temp2);
	// };

	// const deleteAcademicQualification = (i) => {
	// 	const temp = [...academicQualification];
	// 	temp.splice(i, 1);
	// 	setAcademicQualification(temp);
	// };

	// const addMoreProfessionalQualification = () => {
	// 	setProfessionalQualification([
	// 		...professionalQualification,
	// 		{
	// 			degree: '',
	// 			university: '',
	// 			yearOfPassing: '',
	// 			division: '',
	// 		},
	// 	]);
	// };

	// const onChangeProfessionalQualification = (e, index) => {
	// 	const temp2 = [...professionalQualification];
	// 	temp2[index][e.target.name] = e.target.value;
	// 	setProfessionalQualification(temp2);
	// };

	// const deleteProfessionalQualification = (i) => {
	// 	const temp = [...professionalQualification];
	// 	temp.splice(i, 1);
	// 	setProfessionalQualification(temp);
	// };

	// const addMoreExperience = () => {
	// 	setExperience([
	// 		...experience,
	// 		{
	// 			companyName: '',
	// 			companyAddress: '',
	// 			from: '',
	// 			to: '',
	// 			lastSalary: '',
	// 			reasonOnLeft: '',
	// 			experienceLevel: '',
	// 		},
	// 	]);
	// };

	// const onChangeExperience = (e, index) => {
	// 	const temp2 = [...experience];
	// 	temp2[index][e.target.name] = e.target.value;
	// 	setExperience(temp2);
	// };

	// const deleteExperience = (i) => {
	// 	const temp = [...experience];
	// 	temp.splice(i, 1);
	// 	setExperience(temp);
	// };

	return (
		<Sidenav title={'Employees'}>
			<div>
				<Container className={classes.mainContainer}>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={onSubmit}>
						{(props) => (
							<>
								<Form>
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
												onChange={props.handleChange('name')}
												onBlur={props.handleBlur('name')}
												value={props.values.name}
												helperText={props.touched.name && props.errors.name}
												error={props.touched.name && props.errors.name}
											/>
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
												onChange={props.handleChange('fatherName_husbandName')}
												onBlur={props.handleBlur('fatherName_husbandName')}
												value={props.values.fatherName_husbandName}
												helperText={
													props.touched.fatherName_husbandName &&
													props.errors.fatherName_husbandName
												}
												error={
													props.touched.fatherName_husbandName &&
													props.errors.fatherName_husbandName
												}
											/>
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
												onChange={props.handleChange('jobAppliedFor')}
												onBlur={props.handleBlur('jobAppliedFor')}
												value={props.values.jobAppliedFor}
												helperText={
													props.touched.jobAppliedFor && props.errors.jobAppliedFor
												}
												error={props.touched.jobAppliedFor && props.errors.jobAppliedFor}
											/>
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
												onChange={props.handleChange('presentAddress')}
												onBlur={props.handleBlur('presentAddress')}
												value={props.values.presentAddress}
												helperText={
													props.touched.presentAddress && props.errors.presentAddress
												}
												error={props.touched.presentAddress && props.errors.presentAddress}
											/>
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
												onChange={props.handleChange('permanentAddress')}
												onBlur={props.handleBlur('permanentAddress')}
												value={props.values.permanentAddress}
												helperText={
													props.touched.permanentAddress && props.errors.permanentAddress
												}
												error={
													props.touched.permanentAddress && props.errors.permanentAddress
												}
											/>
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
												onChange={props.handleChange('telephoneNo')}
												onBlur={props.handleBlur('telephoneNo')}
												value={props.values.telephoneNo}
												helperText={props.touched.telephoneNo && props.errors.telephoneNo}
												error={props.touched.telephoneNo && props.errors.telephoneNo}
											/>
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
												onChange={props.handleChange('mobileNo')}
												onBlur={props.handleBlur('mobileNo')}
												value={props.values.mobileNo}
												helperText={props.touched.mobileNo && props.errors.mobileNo}
												error={props.touched.mobileNo && props.errors.mobileNo}
											/>
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
												onChange={props.handleChange('gender')}
												onBlur={props.handleBlur('gender')}
												value={props.values.gender}
												helperText={props.touched.gender && props.errors.gender}
												error={props.touched.gender && props.errors.gender}>
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
												onChange={props.handleChange('status')}
												onBlur={props.handleBlur('status')}
												value={props.values.status}
												helperText={props.touched.status && props.errors.status}
												error={props.touched.status && props.errors.status}>
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
												onChange={props.handleChange('age')}
												onBlur={props.handleBlur('age')}
												value={props.values.age}
												helperText={props.touched.age && props.errors.age}
												error={props.touched.age && props.errors.age}
											/>
										</Grid>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<CssTextField
												id='outlined-basic'
												variant='outlined'
												type='date'
												autocomplete='off'
												size='small'
												className={classes.inputFieldStyle}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
												onChange={props.handleChange('dateOfBirth')}
												onBlur={props.handleBlur('dateOfBirth')}
												value={props.values.dateOfBirth}
												helperText={props.touched.dateOfBirth && props.errors.dateOfBirth}
												error={props.touched.dateOfBirth && props.errors.dateOfBirth}
											/>
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
												onChange={props.handleChange('placeOfBirth')}
												onBlur={props.handleBlur('placeOfBirth')}
												value={props.values.placeOfBirth}
												helperText={props.touched.placeOfBirth && props.errors.placeOfBirth}
												error={props.touched.placeOfBirth && props.errors.placeOfBirth}
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
												onChange={props.handleChange('email')}
												onBlur={props.handleBlur('email')}
												value={props.values.email}
												helperText={props.touched.email && props.errors.email}
												error={props.touched.email && props.errors.email}
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
												onChange={props.handleChange('cnic')}
												onBlur={props.handleBlur('cnic')}
												value={props.values.cnic}
												helperText={props.touched.cnic && props.errors.cnic}
												error={props.touched.cnic && props.errors.cnic}
											/>
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
												onChange={props.handleChange('DatePlaceOfIssue')}
												onBlur={props.handleBlur('DatePlaceOfIssue')}
												value={props.values.DatePlaceOfIssue}
												helperText={
													props.touched.DatePlaceOfIssue && props.errors.DatePlaceOfIssue
												}
												error={
													props.touched.DatePlaceOfIssue && props.errors.DatePlaceOfIssue
												}
											/>
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
												onChange={props.handleChange('nationality')}
												onBlur={props.handleBlur('nationality')}
												value={props.values.nationality}
												helperText={props.touched.nationality && props.errors.nationality}
												error={props.touched.nationality && props.errors.nationality}>
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
												onChange={props.handleChange('bankAccount')}
												onBlur={props.handleBlur('bankAccount')}
												value={props.values.bankAccount}
												helperText={props.touched.bankAccount && props.errors.bankAccount}
												error={props.touched.bankAccount && props.errors.bankAccount}
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
												onChange={props.handleChange('bankNameAndBranch')}
												onBlur={props.handleBlur('bankNameAndBranch')}
												value={props.values.bankNameAndBranch}
												helperText={
													props.touched.bankNameAndBranch && props.errors.bankNameAndBranch
												}
												error={
													props.touched.bankNameAndBranch && props.errors.bankNameAndBranch
												}
											/>
										</Grid>
									</Grid>
									<Grid container spacing={1} className='mt-5'>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<input
												type='file'
												className={classes.uploadImgBtn}
												onChange={(event) => picUploadFunc(event)}></input>
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
													InputLabelProps={{ style: { fontSize: 14 } }}
													onChange={props.handleChange('nextToKin.name')}
													onBlur={props.handleBlur('nextToKin.name')}
													value={props.values.nextToKin?.name}
													helperText={
														props.touched.nextToKin?.name && props.errors.nextToKin?.name
													}
													error={
														props.touched.nextToKin?.name && props.errors.nextToKin?.name
													}
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
													InputLabelProps={{ style: { fontSize: 14 } }}
													onChange={props.handleChange('nextToKin.relation')}
													onBlur={props.handleBlur('nextToKin.relation')}
													value={props.values.nextToKin?.relation}
													helperText={
														props.touched.nextToKin?.relation &&
														props.errors.nextToKin?.relation
													}
													error={
														props.touched.nextToKin?.relation &&
														props.errors.nextToKin?.relation
													}
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
													InputLabelProps={{ style: { fontSize: 14 } }}
													onChange={props.handleChange('nextToKin.address')}
													onBlur={props.handleBlur('nextToKin.address')}
													value={props.values.nextToKin?.address}
													helperText={
														props.touched.nextToKin?.address &&
														props.errors.nextToKin?.address
													}
													error={
														props.touched.nextToKin?.address &&
														props.errors.nextToKin?.address
													}
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
													InputLabelProps={{ style: { fontSize: 14 } }}
													onChange={props.handleChange('nextToKin.contact')}
													onBlur={props.handleBlur('nextToKin.contact')}
													value={props.values.nextToKin?.contact}
													helperText={
														props.touched.nextToKin?.contact &&
														props.errors.nextToKin?.contact
													}
													error={
														props.touched.nextToKin?.contact &&
														props.errors.nextToKin?.contact
													}
												/>
											</Grid>
										</Grid>
									</Container>
								</Form>

								<div style={{ marginTop: 30, marginBottom: 30 }}>
									<hr />
								</div>
								<Container className={classes.mainContainer}>
									<h5 className='text-left'>Academic Qualification</h5>
									<Formik
										initialValues={initialValuesForAcademicQualification}
										validationSchema={validationSchemaForAcademicQualification}
										enableReinitialize
										onSubmit={addMoreAcademicQualification}>
										{(props) => (
											<Form>
												<Grid container spacing={1} style={{ marginTop: 15 }}>
													<Grid item lg={2} md={2} sm={12} xs={12}>
														<CssTextField
															id='outlined-basic'
															label='Degree/Certification'
															variant='outlined'
															type='text'
															size='small'
															name='degree'
															className={classes.inputFieldStyle}
															inputProps={{ style: { fontSize: 14 } }}
															InputLabelProps={{ style: { fontSize: 14 } }}
															onChange={props.handleChange('degree')}
															onBlur={props.handleBlur('degree')}
															value={props.values.degree}
															helperText={props.touched.degree && props.errors.degree}
															error={props.touched.degree && props.errors.degree}
														/>
													</Grid>
													<Grid item lg={2} md={2} sm={12} xs={12}>
														<CssTextField
															id='outlined-basic'
															label='Board/University'
															variant='outlined'
															type='text'
															size='small'
															name='university'
															className={classes.inputFieldStyle1}
															inputProps={{ style: { fontSize: 14 } }}
															InputLabelProps={{ style: { fontSize: 14 } }}
															onChange={props.handleChange('university')}
															onBlur={props.handleBlur('university')}
															value={props.values.university}
															helperText={props.touched.university && props.errors.university}
															error={props.touched.university && props.errors.university}
														/>
													</Grid>
													<Grid item lg={2} md={2} sm={12} xs={12}>
														<CssTextField
															id='outlined-basic'
															label='Year of Passing'
															variant='outlined'
															type='text'
															name='yearOfPassing'
															size='small'
															className={classes.inputFieldStyle2}
															inputProps={{ style: { fontSize: 14 } }}
															InputLabelProps={{ style: { fontSize: 14 } }}
															onChange={props.handleChange('yearOfPassing')}
															onBlur={props.handleBlur('yearOfPassing')}
															value={props.values.yearOfPassing}
															helperText={
																props.touched.yearOfPassing && props.errors.yearOfPassing
															}
															error={props.touched.yearOfPassing && props.errors.yearOfPassing}
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
															className={classes.inputFieldStyle3}
															inputProps={{ style: { fontSize: 14 } }}
															InputLabelProps={{ style: { fontSize: 14 } }}
															onChange={props.handleChange('division')}
															onBlur={props.handleBlur('division')}
															value={props.values.division}
															helperText={props.touched.division && props.errors.division}
															error={props.touched.division && props.errors.division}
														/>
													</Grid>
													<Grid item lg={2} md={2} sm={12} xs={12}></Grid>
													<Grid item lg={3} md={3} sm={10} xs={11}>
														<Button
															variant='outlined'
															color='primary'
															classNames={classes.addMoreButton}
															text={academicQualificationsEdit ? 'Edit' : 'Add More'}
														/>
													</Grid>
												</Grid>
											</Form>
										)}
									</Formik>
									{academicQualifications.length >= 1 && (
										<div className={classes.dataTable}>
											<TableContainer className={classes.tableContainer}>
												<Table
													stickyHeader
													className='table table-dark'
													style={{ backgroundColor: '#d0cfcf', border: '1px solid grey' }}>
													<TableHead>
														<TableRow hover role='checkbox'>
															<StyledTableCell align='center'>Sr.No</StyledTableCell>
															<StyledTableCell align='center'>Degree</StyledTableCell>
															<StyledTableCell align='center'>University</StyledTableCell>
															<StyledTableCell align='center'>Year Of Passing</StyledTableCell>
															<StyledTableCell align='center'>Division</StyledTableCell>
															<StyledTableCell align='center'>Action</StyledTableCell>
														</TableRow>
													</TableHead>
													<TableBody>
														{academicQualifications.length &&
															academicQualifications.map((el, i) => (
																<StyledTableRow key={i}>
																	<StyledTableCell className='text-dark bg-light' align='center'>
																		{i + 1}
																	</StyledTableCell>
																	<StyledTableCell className='text-dark bg-light' align='center'>
																		{el.degree}
																	</StyledTableCell>
																	<StyledTableCell className='text-dark bg-light' align='center'>
																		{el.university}
																	</StyledTableCell>
																	<StyledTableCell className='text-dark bg-light' align='center'>
																		{el.yearOfPassing}
																	</StyledTableCell>
																	<StyledTableCell className='text-dark bg-light' align='center'>
																		{el.division}
																	</StyledTableCell>
																	<StyledTableCell
																		className='text-light bg-light'
																		align='center'>
																		<div style={{ display: 'flex', justifyContent: 'center' }}>
																			<Button
																				variant='contained'
																				text='Edit'
																				size='small'
																				classNames='bg-dark text-light'
																				onClick={() => editAcademicQualification(el)}
																			/>
																			<Button
																				variant='contained'
																				text='Delete'
																				size='small'
																				color='secondary'
																				onClick={() => deleteAcademicQualification(el.id)}
																				style={{ marginLeft: '1rem' }}
																			/>
																		</div>
																	</StyledTableCell>
																</StyledTableRow>
															))}
													</TableBody>
												</Table>
											</TableContainer>
										</div>
									)}
								</Container>

								<Container className={classes.mainContainer}>
									<h5 className='text-left'>Professional Qualification</h5>
									<Formik
										initialValues={initialValuesForProfessionalQualification}
										validationSchema={validationSchemaForProfessionalQualification}
										onSubmit={addMoreProfessionalQualification}>
										{(props) => (
											<Form>
												<Grid container spacing={1} style={{ marginTop: 15 }}>
													<Grid item lg={2} md={2} sm={12} xs={12}>
														<CssTextField
															id='outlined-basic'
															label='Degree/Certification'
															variant='outlined'
															type='text'
															size='small'
															name='degree'
															className={classes.inputFieldStyle}
															inputProps={{ style: { fontSize: 14 } }}
															InputLabelProps={{ style: { fontSize: 14 } }}
															onChange={props.handleChange('degree')}
															onBlur={props.handleBlur('degree')}
															value={props.values.degree}
															helperText={props.touched.degree && props.errors.degree}
															error={props.touched.degree && props.errors.degree}
														/>
													</Grid>
													<Grid item lg={2} md={2} sm={12} xs={12}>
														<CssTextField
															id='outlined-basic'
															label='Board/University'
															variant='outlined'
															type='text'
															size='small'
															name='university'
															className={classes.inputFieldStyle1}
															inputProps={{ style: { fontSize: 14 } }}
															InputLabelProps={{ style: { fontSize: 14 } }}
															onChange={props.handleChange('university')}
															onBlur={props.handleBlur('university')}
															value={props.values.university}
															helperText={props.touched.university && props.errors.university}
															error={props.touched.university && props.errors.university}
														/>
													</Grid>
													<Grid item lg={2} md={2} sm={12} xs={12}>
														<CssTextField
															id='outlined-basic'
															label='Year of Passing'
															variant='outlined'
															type='text'
															size='small'
															name='yearOfPassing'
															className={classes.inputFieldStyle2}
															inputProps={{ style: { fontSize: 14 } }}
															InputLabelProps={{ style: { fontSize: 14 } }}
															onChange={props.handleChange('yearOfPassing')}
															onBlur={props.handleBlur('yearOfPassing')}
															value={props.values.yearOfPassing}
															helperText={
																props.touched.yearOfPassing && props.errors.yearOfPassing
															}
															error={props.touched.yearOfPassing && props.errors.yearOfPassing}
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
															className={classes.inputFieldStyle3}
															inputProps={{ style: { fontSize: 14 } }}
															InputLabelProps={{ style: { fontSize: 14 } }}
															onChange={props.handleChange('division')}
															onBlur={props.handleBlur('division')}
															value={props.values.division}
															helperText={props.touched.division && props.errors.division}
															error={props.touched.division && props.errors.division}
														/>
													</Grid>
												</Grid>
												<Grid container spacing={1}>
													<Grid item lg={3} md={3} sm={10} xs={11}>
														<Button
															variant='outlined'
															color='primary'
															classNames={classes.addMoreButton}
															text={professionalQualificationEdit ? 'Edit' : 'Add Mote'}
														/>
													</Grid>
												</Grid>
											</Form>
										)}
									</Formik>
									{professionalQualification.length >= 1 && (
										<div className={classes.dataTable}>
											<TableContainer className={classes.tableContainer}>
												<Table
													stickyHeader
													className='table table-dark'
													style={{ backgroundColor: '#d0cfcf', border: '1px solid grey' }}>
													<TableHead>
														<TableRow hover role='checkbox'>
															<StyledTableCell align='center'>Sr.No</StyledTableCell>
															<StyledTableCell align='center'>Degree</StyledTableCell>
															<StyledTableCell align='center'>University</StyledTableCell>
															<StyledTableCell align='center'>Year Of Passing</StyledTableCell>
															<StyledTableCell align='center'>Division</StyledTableCell>
															<StyledTableCell align='center'>Action</StyledTableCell>
														</TableRow>
													</TableHead>
													<TableBody>
														{professionalQualification.length &&
															professionalQualification.map((el, i) => (
																<StyledTableRow key={i}>
																	<StyledTableCell className='text-dark bg-light' align='center'>
																		{i + 1}
																	</StyledTableCell>
																	<StyledTableCell className='text-dark bg-light' align='center'>
																		{el.degree}
																	</StyledTableCell>
																	<StyledTableCell className='text-dark bg-light' align='center'>
																		{el.university}
																	</StyledTableCell>
																	<StyledTableCell className='text-dark bg-light' align='center'>
																		{el.yearOfPassing}
																	</StyledTableCell>
																	<StyledTableCell className='text-dark bg-light' align='center'>
																		{el.division}
																	</StyledTableCell>
																	<StyledTableCell
																		className='text-light bg-light'
																		align='center'>
																		<div style={{ display: 'flex', justifyContent: 'center' }}>
																			<Button
																				variant='contained'
																				text='Edit'
																				size='small'
																				classNames='bg-dark text-light'
																				onClick={() => editProfessionalQualification(el)}
																			/>
																			<Button
																				variant='contained'
																				text='Delete'
																				size='small'
																				color='secondary'
																				onClick={() => deleteProfessionalQualification(el.id)}
																				style={{ marginLeft: '1rem' }}
																			/>
																		</div>
																	</StyledTableCell>
																</StyledTableRow>
															))}
													</TableBody>
												</Table>
											</TableContainer>
										</div>
									)}
								</Container>

								<div style={{ marginTop: 30, marginBottom: 30 }}>
									<hr />
								</div>
								<Container className={classes.mainContainer}>
									<h5 className='text-left'>
										Experience (Recent First) in Relevant Field
									</h5>
									<Formik
										initialValues={initialValuesForExperience}
										validationSchema={validationSchemaForExperience}
										enableReinitialize
										onSubmit={addMoreExperience}>
										{(props) => (
											<Form>
												<Grid container spacing={1} style={{ marginTop: 15 }}>
													<Grid item lg={2} md={2} sm={12} xs={12}>
														<CssTextField
															id='outlined-basic'
															label='Company Name'
															variant='outlined'
															type='text'
															size='small'
															name='companyName'
															className={classes.inputFieldStyle}
															inputProps={{ style: { fontSize: 14 } }}
															InputLabelProps={{ style: { fontSize: 14 } }}
															onChange={props.handleChange('companyName')}
															onBlur={props.handleBlur('companyName')}
															value={props.values.companyName}
															helperText={
																props.touched.companyName && props.errors.companyName
															}
															error={props.touched.companyName && props.errors.companyName}
														/>
													</Grid>
													<Grid item lg={2} md={2} sm={12} xs={12}>
														<CssTextField
															id='outlined-basic'
															label='Company Address'
															variant='outlined'
															type='text'
															size='small'
															name='companyAddress'
															className={classes.inputFieldStyle1}
															inputProps={{ style: { fontSize: 14 } }}
															InputLabelProps={{ style: { fontSize: 14 } }}
															onChange={props.handleChange('companyAddress')}
															onBlur={props.handleBlur('companyAddress')}
															value={props.values.companyAddress}
															helperText={
																props.touched.companyAddress && props.errors.companyAddress
															}
															error={
																props.touched.companyAddress && props.errors.companyAddress
															}
														/>
													</Grid>
													<Grid item lg={2} md={2} sm={12} xs={12}>
														<CssTextField
															id='outlined-basic'
															label='Last Salary'
															variant='outlined'
															type='number'
															size='small'
															name='from'
															className={classes.inputFieldStyle2}
															inputProps={{ style: { fontSize: 14 } }}
															InputLabelProps={{ style: { fontSize: 14 } }}
															onChange={props.handleChange('lastSalary')}
															onBlur={props.handleBlur('lastSalary')}
															value={props.values.lastSalary}
															helperText={props.touched.lastSalary && props.errors.lastSalary}
															error={props.touched.lastSalary && props.errors.lastSalary}
														/>
													</Grid>
													<Grid item lg={2} md={2} sm={12} xs={12}>
														<CssTextField
															id='outlined-basic'
															label='Reason of Left'
															variant='outlined'
															type='text'
															size='small'
															name='to'
															className={classes.inputFieldStyle3}
															inputProps={{ style: { fontSize: 14 } }}
															InputLabelProps={{ style: { fontSize: 14 } }}
															onChange={props.handleChange('reasonOfLeft')}
															onBlur={props.handleBlur('reasonOfLeft')}
															value={props.values.reasonOfLeft}
															helperText={
																props.touched.reasonOfLeft && props.errors.reasonOfLeft
															}
															error={props.touched.reasonOfLeft && props.errors.reasonOfLeft}
														/>
													</Grid>
													<Grid container spacing={1} className='mt-1'>
														<Grid item lg={1} md={1} sm={12} xs={12}></Grid>
														<Grid item lg={3} md={3} sm={12} xs={12}>
															<CssTextField
																id='outlined-basic'
																variant='outlined'
																type='date'
																style={{ width: '100%' }}
																size='small'
																name='lastSalary'
																className={classes.inputFieldStyle5}
																inputProps={{ style: { fontSize: 14 } }}
																InputLabelProps={{ style: { fontSize: 14 } }}
																onChange={props.handleChange('from')}
																onBlur={props.handleBlur('from')}
																value={props.values.from}
																helperText={props.touched.from && props.errors.from}
																error={props.touched.from && props.errors.from}
															/>
														</Grid>
														<Grid item lg={1} md={1} sm={12} xs={12}></Grid>
														<Grid item lg={3} md={3} sm={12} xs={12}>
															<CssTextField
																id='outlined-basic'
																variant='outlined'
																type='date'
																size='small'
																name='reasonOfLeft'
																style={{ width: '100%' }}
																className={classes.inputFieldStyle4}
																inputProps={{ style: { fontSize: 14 } }}
																InputLabelProps={{ style: { fontSize: 14 } }}
																onChange={props.handleChange('to')}
																onBlur={props.handleBlur('to')}
																value={props.values.to}
																helperText={props.touched.to && props.errors.to}
																error={props.touched.to && props.errors.to}
															/>
														</Grid>
														<Grid item lg={3} md={3} sm={12} xs={12}>
															<CssTextField
																id='outlined-basic'
																variant='outlined'
																type='text'
																size='small'
																select
																style={{ width: '100%' }}
																name='experienceLevel'
																className={classes.inputFieldStyle4}
																inputProps={{ style: { fontSize: 14 } }}
																InputLabelProps={{ style: { fontSize: 14 } }}
																onChange={props.handleChange('experienceLevel')}
																onBlur={props.handleBlur('experienceLevel')}
																value={props.values.experienceLevel}
																helperText={
																	props.touched.experienceLevel && props.errors.experienceLevel
																}
																error={
																	props.touched.experienceLevel && props.errors.experienceLevel
																}>
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
														<Grid item lg={3} md={3} sm={10} xs={11}>
															<Button
																variant='outlined'
																color='primary'
																classNames={classes.addMoreButton}
																text={experienceEdit ? 'Edit' : 'Add More'}
															/>
														</Grid>
													</Grid>
												</Grid>
											</Form>
										)}
									</Formik>
									{experience.length >= 1 && (
										<div className={classes.dataTable}>
											<TableContainer className={classes.tableContainer}>
												<Table
													stickyHeader
													className='table table-dark'
													style={{ backgroundColor: '#d0cfcf', border: '1px solid grey' }}>
													<TableHead>
														<TableRow hover role='checkbox'>
															<StyledTableCell align='center'>Sr.No</StyledTableCell>
															<StyledTableCell align='center'>Company Name</StyledTableCell>
															<StyledTableCell align='center'>Company Address</StyledTableCell>
															<StyledTableCell align='center'>Last Salary</StyledTableCell>
															<StyledTableCell align='center'>Reason Of Left</StyledTableCell>
															<StyledTableCell align='center'>From</StyledTableCell>
															<StyledTableCell align='center'>To</StyledTableCell>
															<StyledTableCell align='center'>
																Experience Level
															</StyledTableCell>
															<StyledTableCell align='center'>Action</StyledTableCell>
														</TableRow>
													</TableHead>
													<TableBody>
														{experience.length &&
															experience.map((el, i) => (
																<StyledTableRow key={i}>
																	<StyledTableCell className='text-dark bg-light' align='center'>
																		{i + 1}
																	</StyledTableCell>
																	<StyledTableCell className='text-dark bg-light' align='center'>
																		{el.companyName}
																	</StyledTableCell>
																	<StyledTableCell className='text-dark bg-light' align='center'>
																		{el.companyAddress}
																	</StyledTableCell>
																	<StyledTableCell className='text-dark bg-light' align='center'>
																		{el.lastSalary}
																	</StyledTableCell>
																	<StyledTableCell className='text-dark bg-light' align='center'>
																		{el.reasonOfLeft}
																	</StyledTableCell>
																	<StyledTableCell className='text-dark bg-light' align='center'>
																		{el.from}
																	</StyledTableCell>
																	<StyledTableCell className='text-dark bg-light' align='center'>
																		{el.to}
																	</StyledTableCell>
																	<StyledTableCell className='text-dark bg-light' align='center'>
																		{el.experienceLevel}
																	</StyledTableCell>
																	<StyledTableCell
																		className='text-light bg-light'
																		align='center'>
																		<div style={{ display: 'flex', justifyContent: 'center' }}>
																			<Button
																				variant='contained'
																				text='Edit'
																				size='small'
																				classNames='bg-dark text-light'
																				onClick={() => editExperience(el)}
																			/>
																			<Button
																				variant='contained'
																				text='Delete'
																				size='small'
																				color='secondary'
																				onClick={() => deleteExperience(el.id)}
																				style={{ marginLeft: '1rem' }}
																			/>
																		</div>
																	</StyledTableCell>
																</StyledTableRow>
															))}
													</TableBody>
												</Table>
											</TableContainer>
										</div>
									)}
								</Container>
								<div style={{ marginTop: 30, marginBottom: 30 }}>
									<hr />
								</div>
								<Container className={classes.mainContainer}>
									<h5 className='text-left'>Reference</h5>
									<Grid container spacing={1} style={{ marginTop: 15 }}>
										<Grid item lg={1} md={1}></Grid>
										<Grid item lg={2} md={2} sm={12} xs={12}>
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
												onChange={props.handleChange('reference.name')}
												onBlur={props.handleBlur('reference.name')}
												value={props.values.reference?.name}
												helperText={
													props.touched.reference?.name && props.errors.reference?.name
												}
												error={
													props.touched.reference?.name && props.errors.reference?.name
												}
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
												className={classes.inputFieldStyle1}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
												onChange={props.handleChange('reference.address')}
												onBlur={props.handleBlur('reference.address')}
												value={props.values.reference?.address}
												helperText={
													props.touched.reference?.address && props.errors.reference?.address
												}
												error={
													props.touched.reference?.address && props.errors.reference?.address
												}
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
												className={classes.inputFieldStyle2}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
												onChange={props.handleChange('reference.contactNo')}
												onBlur={props.handleBlur('reference.contactNo')}
												value={props.values.reference?.contactNo}
												helperText={
													props.touched.reference?.contactNo &&
													props.errors.reference?.contactNo
												}
												error={
													props.touched.reference?.contactNo &&
													props.errors.reference?.contactNo
												}
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
												InputLabelProps={{ style: { fontSize: 14 } }}
												onChange={props.handleChange('officeUse.dateOfInterviewed')}
												onBlur={props.handleBlur('officeUse.dateOfInterviewed')}
												value={props.values.officeUse?.dateOfInterviewed}
												helperText={
													props.touched.officeUse?.dateOfInterviewed &&
													props.errors.officeUse?.dateOfInterviewed
												}
												error={
													props.touched.officeUse?.dateOfInterviewed &&
													props.errors.officeUse?.dateOfInterviewed
												}
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
												InputLabelProps={{ style: { fontSize: 14 } }}
												onChange={props.handleChange('officeUse.remarks')}
												onBlur={props.handleBlur('officeUse.remarks')}
												value={props.values.officeUse?.remarks}
												helperText={
													props.touched.officeUse?.remarks && props.errors.officeUse?.remarks
												}
												error={
													props.touched.officeUse?.remarks && props.errors.officeUse?.remarks
												}
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
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
												onChange={props.handleChange('officeUse.recommended')}
												onBlur={props.handleBlur('officeUse.recommended')}
												value={props.values.officeUse?.recommended}
												helperText={
													props.touched.officeUse?.recommended &&
													props.errors.officeUse?.recommended
												}
												error={
													props.touched.officeUse?.recommended &&
													props.errors.officeUse?.recommended
												}>
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
												autocomplete='off'
												className={classes.inputFieldStyle3}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
												onChange={props.handleChange('officeUse.jobTitle')}
												onBlur={props.handleBlur('officeUse.jobTitle')}
												value={props.values.officeUse?.jobTitle}
												helperText={
													props.touched.officeUse?.jobTitle &&
													props.errors.officeUse?.jobTitle
												}
												error={
													props.touched.officeUse?.jobTitle &&
													props.errors.officeUse?.jobTitle
												}
											/>
										</Grid>
									</Grid>
									<Grid container spacing={1} style={{ marginTop: 15 }}>
										<Grid item lg={1} md={1}></Grid>
										<Grid item lg={2} md={2} sm={12} xs={12}>
											<CssTextField
												id='outlined-basic'
												label='Recommendations Department'
												variant='outlined'
												type='text'
												size='small'
												select
												autocomplete='off'
												className={classes.inputFieldStyle}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
												onChange={props.handleChange('officeUse.department')}
												onBlur={props.handleBlur('officeUse.department')}
												value={props.values.officeUse?.department}
												helperText={
													props.touched.officeUse?.department &&
													props.errors.officeUse?.department
												}
												error={
													props.touched.officeUse?.department &&
													props.errors.officeUse?.department
												}>
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
										</Grid>

										<Grid item lg={2} md={2} sm={12} xs={12}>
											<CssTextField
												id='outlined-basic'
												label='Recommended Salary'
												variant='outlined'
												type='number'
												size='small'
												autocomplete='off'
												className={classes.inputFieldStyle1}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
												onChange={props.handleChange('officeUse.recommendedSalary')}
												onBlur={props.handleBlur('officeUse.recommendedSalary')}
												value={props.values.officeUse?.recommendedSalary}
												helperText={
													props.touched.officeUse?.recommendedSalary &&
													props.errors.officeUse?.recommendedSalary
												}
												error={
													props.touched.officeUse?.recommendedSalary &&
													props.errors.officeUse?.recommendedSalary
												}
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
												className={classes.inputFieldStyle2}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
												onChange={props.handleChange('officeUse.approved')}
												onBlur={props.handleBlur('officeUse.approved')}
												value={props.values.officeUse?.approved}
												helperText={
													props.touched.officeUse?.approved &&
													props.errors.officeUse?.approved
												}
												error={
													props.touched.officeUse?.approved &&
													props.errors.officeUse?.approved
												}>
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
												InputLabelProps={{ style: { fontSize: 14 } }}
												onChange={props.handleChange('isExecutive')}
												onBlur={props.handleBlur('isExecutive')}
												value={props.values.isExecutive}
												helperText={props.touched.isExecutive && props.errors.isExecutive}
												error={props.touched.isExecutive && props.errors.isExecutive}>
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
												InputLabelProps={{ style: { fontSize: 14 } }}
												onChange={props.handleChange('empType')}
												onBlur={props.handleBlur('empType')}
												value={props.values.empType}
												helperText={props.touched.empType && props.errors.empType}
												error={props.touched.empType && props.errors.empType}>
												<MenuItem value='Executive'>Executive</MenuItem>
												<MenuItem value='Electrician'>Electrician</MenuItem>
												<MenuItem value='Skilled Employee'>Skilled Employee</MenuItem>
												<MenuItem value='Final Labour'>Final Labour</MenuItem>
											</CssTextField>
										</Grid>
									</Grid>
								</Container>
								<Form>
									<Button
										variant='outlined'
										color='primary'
										text='Add'
										classNames={classes.addButton}
									/>
								</Form>
							</>
						)}
					</Formik>
				</Container>
			</div>
		</Sidenav>
	);
};

export default Employees;
