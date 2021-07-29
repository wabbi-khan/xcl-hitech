import React, { useState, useEffect } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
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
import { Formik, Form, useFormik, FastField } from 'formik';
import * as yup from 'yup';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Button from '../../../components/utils/Button';
import NextToKin from './NextToKin';

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

const initialValues2 = {
	status: '',
	age: '',
	dateOfBirth: '',
	placeOfBirth: '',
	email: '',
	cnic: '',
	DatePlaceOfIssue: '',
	nationality: '',
	bankAccount: '',
	bankNameAndBranch: '',
	isExecutive: '',
	empType: '',
	finalDepartment: '',
	finalDesignation: '',
	finalSal: '',
};

const initialValues1 = {
	name: '',
	fatherName_husbandName: '',
	jobAppliedFor: '',
	presentAddress: '',
	permanentAddress: '',
	telephoneNo: '',
	mobileNo: '',
	gender: '',
};

const validationSchema1 = yup.object({
	name: yup.string().required(),
	fatherName_husbandName: yup.string().required(),
	jobAppliedFor: yup.string().required(),
	presentAddress: yup.string().required(),
	permanentAddress: yup.string().required(),
	telephoneNo: yup.string().required(),
	mobileNo: yup.string().required(),
	gender: yup.string().required(),
});

const validationSchema2 = yup.object({
	age: yup.string().required(),
	dateOfBirth: yup.string().required(),
	placeOfBirth: yup.string().required(),
	nationality: yup.string().required(),
	bankAccount: yup.string().required(),
	bankNameAndBranch: yup.string().required(),
	isExecutive: yup.string().required(),
	empType: yup.string().required(),
	finalDepartment: yup.string(),
	finalDesignation: yup.string(),
	finalSal: yup.string(),
	DatePlaceOfIssue: yup.string(),
	email: yup.string().required(),
	cnic: yup.string().required(),
	isHired: yup.string(),
	status: yup.string().required(),
});

const initialValuesForNextToKin = {
	name: '',
	relation: '',
	contact: '',
	address: '',
};

const validationForNextToKin = yup.object({
	name: yup.string().required(),
	relation: yup.string().required(),
	contact: yup.string().required(),
	address: yup.string().required(),
});

const initialValuesForReference = {
	name: '',
	contact: '',
	address: '',
};

const validationForReference = yup.object({
	name: yup.string().required(),
	contact: yup.string().required(),
	address: yup.string().required(),
});

const initialValuesForOfficeUse = {
	dateOfInterviewed: '',
	remarks: '',
	recommended: '',
	jobTitle: '',
	recommendedSalary: '',
	approved: '',
	dateOfApproved: '',
	department: '',
};

const validationForOfficeUse = yup.object({
	dateOfInterviewed: yup.string().required(),
	remarks: yup.string().required(),
	recommended: yup.string().required(),
	jobTitle: yup.string().required(),
	recommendedSalary: yup.string().required(),
	approved: yup.string().required(),
	dateOfApproved: yup.string(),
	department: yup.string().required(),
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
	let nextToKinForm = {};
	let referenceForm = {};
	let officeUseForm = {};
	let initialValues1Form = {};
	let initialValues2Form = {};
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

	const onSubmit = async (values) => {
		const nextToKinErrors = await nextToKinForm.validateForm();
		nextToKinForm.setTouched(nextToKinErrors);
		const referenceErrors = await referenceForm.validateForm();
		referenceForm.setTouched(referenceErrors);
		const officeUseErrors = await officeUseForm.validateForm();
		officeUseForm.setTouched(officeUseErrors);
		const initialValues1Error = await initialValues1Form.validateForm();
		initialValues1Form.setTouched(initialValues1Error);
		const initialValues2Error = await initialValues2Form.validateForm();
		initialValues2Form.setTouched(initialValues2Error);

		if (
			nextToKinErrors &&
			referenceErrors &&
			officeUseErrors &&
			initialValues1Error &&
			initialValues2Error
		) {
			console.log('error');
		}

		// dispatch(
		// 	createEmployee({
		// 		...values,
		// 		experience,
		// 		professionalQualification,
		// 		academicQualification,
		// 	}),
		// );
	};

	return (
		<Sidenav title={'Employees'}>
			<div>
				<Container className={classes.mainContainer}>
					<Formik
						initialValues={initialValues1}
						validationSchema={validationSchema1}
						onSubmit={onSubmit}>
						{(props) => {
							initialValues1Form = props;
							return (
								<Form>
									<Grid container spacing={1}>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<FastField name='name'>
												{({ meta, field }) => (
													<CssTextField
														id='outlined-basic'
														label='Name'
														variant='outlined'
														type='text'
														style={{ marginTop: '1rem', marginLeft: '1rem', width: '100%' }}
														size='small'
														autocomplete='off'
														inputProps={{ style: { fontSize: 14 } }}
														InputLabelProps={{ style: { fontSize: 14 } }}
														{...field}
														helperText={meta.touched && meta.error}
														error={meta.touched && meta.error}
													/>
												)}
											</FastField>
										</Grid>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<FastField name='fatherName_husbandName'>
												{({ meta, field }) => (
													<CssTextField
														id='outlined-basic'
														label='Father Name OR Husband Name'
														variant='outlined'
														style={{ marginTop: '1rem', marginLeft: '1rem', width: '100%' }}
														type='text'
														size='small'
														autocomplete='off'
														inputProps={{ style: { fontSize: 14 } }}
														InputLabelProps={{ style: { fontSize: 14 } }}
														{...field}
														helperText={meta.touched && meta.error}
														error={meta.touched && meta.error}
													/>
												)}
											</FastField>
										</Grid>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<FastField name='jobAppliedFor'>
												{({ meta, field }) => (
													<CssTextField
														id='outlined-basic'
														label='Job Applied For'
														style={{ marginTop: '1rem', marginLeft: '1rem', width: '100%' }}
														variant='outlined'
														type='text'
														size='small'
														autocomplete='off'
														inputProps={{ style: { fontSize: 14 } }}
														InputLabelProps={{ style: { fontSize: 14 } }}
														{...field}
														helperText={meta.touched && meta.error}
														error={meta.touched && meta.error}
													/>
												)}
											</FastField>
										</Grid>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<FastField name='presentAddress'>
												{({ meta, field }) => (
													<CssTextField
														id='outlined-basic'
														label='Present Address'
														variant='outlined'
														style={{ marginTop: '1rem', marginLeft: '1rem', width: '100%' }}
														type='text'
														size='small'
														autocomplete='off'
														inputProps={{ style: { fontSize: 14 } }}
														InputLabelProps={{ style: { fontSize: 14 } }}
														{...field}
														helperText={meta.touched && meta.error}
														error={meta.touched && meta.error}
													/>
												)}
											</FastField>
										</Grid>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<FastField name='permanentAddress'>
												{({ meta, field }) => (
													<CssTextField
														id='outlined-basic'
														label='Permanent Address'
														variant='outlined'
														style={{ marginTop: '1rem', marginLeft: '1rem', width: '100%' }}
														type='text'
														size='small'
														autocomplete='off'
														inputProps={{ style: { fontSize: 14 } }}
														InputLabelProps={{ style: { fontSize: 14 } }}
														{...field}
														helperText={meta.touched && meta.error}
														error={meta.touched && meta.error}
													/>
												)}
											</FastField>
										</Grid>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<FastField name='telephoneNo'>
												{({ meta, field }) => (
													<CssTextField
														id='outlined-basic'
														label='Telephone No'
														variant='outlined'
														type='number'
														style={{ marginTop: '1rem', marginLeft: '1rem', width: '100%' }}
														size='small'
														autocomplete='off'
														inputProps={{ style: { fontSize: 14 } }}
														InputLabelProps={{ style: { fontSize: 14 } }}
														{...field}
														helperText={meta.touched && meta.error}
														error={meta.touched && meta.error}
													/>
												)}
											</FastField>
										</Grid>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<FastField name='mobileNo'>
												{({ meta, field }) => (
													<CssTextField
														id='outlined-basic'
														label='Mobile No'
														variant='outlined'
														style={{ marginTop: '1rem', marginLeft: '1rem', width: '100%' }}
														type='number'
														size='small'
														autocomplete='off'
														inputProps={{ style: { fontSize: 14 } }}
														InputLabelProps={{ style: { fontSize: 14 } }}
														{...field}
														helperText={meta.touched && meta.error}
														error={meta.touched && meta.error}
													/>
												)}
											</FastField>
										</Grid>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<FastField name='gender'>
												{({ meta, field }) => (
													<CssTextField
														id='outlined-basic'
														label='Gender'
														variant='outlined'
														type='text'
														style={{ marginTop: '1rem', marginLeft: '1rem', width: '100%' }}
														size='small'
														select
														autocomplete='off'
														inputProps={{ style: { fontSize: 14 } }}
														InputLabelProps={{ style: { fontSize: 14 } }}
														{...field}
														helperText={meta.touched && meta.error}
														error={meta.touched && meta.error}>
														{genders.map((gender) => (
															<MenuItem value={gender}>{gender}</MenuItem>
														))}
													</CssTextField>
												)}
											</FastField>
										</Grid>
									</Grid>
								</Form>
							);
						}}
					</Formik>
					<Formik
						initialValues={initialValues2}
						validationSchema={validationSchema2}>
						{(props) => {
							initialValues2Form = props;
							return (
								<Form>
									<Grid container spacing={1}>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<FastField name='status'>
												{({ meta, field }) => (
													<CssTextField
														id='outlined-basic'
														label='Status'
														variant='outlined'
														type='text'
														size='small'
														select
														style={{ marginTop: '1rem', marginLeft: '1rem', width: '100%' }}
														autocomplete='off'
														inputProps={{ style: { fontSize: 14 } }}
														InputLabelProps={{ style: { fontSize: 14 } }}
														{...field}
														helperText={meta.touched && meta.error}
														error={meta.touched && meta.error}>
														{martialStatus.map((status) => (
															<MenuItem value={status}>{status}</MenuItem>
														))}
													</CssTextField>
												)}
											</FastField>
										</Grid>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<FastField name='age'>
												{({ meta, field }) => (
													<CssTextField
														id='outlined-basic'
														label='Age'
														variant='outlined'
														style={{ marginTop: '1rem', marginLeft: '1rem', width: '100%' }}
														type='number'
														size='small'
														autocomplete='off'
														inputProps={{ style: { fontSize: 14 } }}
														InputLabelProps={{ style: { fontSize: 14 } }}
														{...field}
														helperText={meta.touched && meta.error}
														error={meta.touched && meta.error}
													/>
												)}
											</FastField>
										</Grid>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<FastField name='dateOfBirth'>
												{({ meta, field }) => (
													<CssTextField
														id='outlined-basic'
														variant='outlined'
														type='date'
														style={{ marginTop: '1rem', marginLeft: '1rem', width: '100%' }}
														size='small'
														autocomplete='off'
														inputProps={{ style: { fontSize: 14 } }}
														InputLabelProps={{ style: { fontSize: 14 } }}
														{...field}
														helperText={meta.touched && meta.error}
														error={meta.touched && meta.error}
													/>
												)}
											</FastField>
										</Grid>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<FastField name='placeOfBirth'>
												{({ meta, field }) => (
													<CssTextField
														id='outlined-basic'
														style={{ marginTop: '1rem', marginLeft: '1rem', width: '100%' }}
														label='Place Of Birth'
														variant='outlined'
														type='text'
														size='small'
														autocomplete='off'
														inputProps={{ style: { fontSize: 14 } }}
														InputLabelProps={{ style: { fontSize: 14 } }}
														{...field}
														helperText={meta.touched && meta.error}
														error={meta.touched && meta.error}
													/>
												)}
											</FastField>
										</Grid>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<FastField name='email'>
												{({ meta, field }) => (
													<CssTextField
														id='outlined-basic'
														label='Email'
														variant='outlined'
														style={{ marginTop: '1rem', marginLeft: '1rem', width: '100%' }}
														type='text'
														size='small'
														autocomplete='off'
														inputProps={{ style: { fontSize: 14 } }}
														InputLabelProps={{ style: { fontSize: 14 } }}
														{...field}
														helperText={meta.touched && meta.error}
														error={meta.touched && meta.error}
													/>
												)}
											</FastField>
										</Grid>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<FastField name='cnic'>
												{({ meta, field }) => (
													<CssTextField
														id='outlined-basic'
														label='CNIC'
														variant='outlined'
														style={{ marginTop: '1rem', marginLeft: '1rem', width: '100%' }}
														type='text'
														size='small'
														autocomplete='off'
														inputProps={{ style: { fontSize: 14 } }}
														InputLabelProps={{ style: { fontSize: 14 } }}
														{...field}
														helperText={meta.touched && meta.error}
														error={meta.touched && meta.error}
													/>
												)}
											</FastField>
										</Grid>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<FastField name='DatePlaceOfIssue'>
												{({ meta, field }) => (
													<CssTextField
														id='outlined-basic'
														variant='outlined'
														type='date'
														style={{ marginTop: '1rem', marginLeft: '1rem', width: '100%' }}
														size='small'
														autocomplete='off'
														inputProps={{ style: { fontSize: 14 } }}
														InputLabelProps={{ style: { fontSize: 14 } }}
														{...field}
														helperText={meta.touched && meta.error}
														error={meta.touched && meta.error}
													/>
												)}
											</FastField>
										</Grid>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<FastField name='nationality'>
												{({ meta, field }) => (
													<CssTextField
														id='outlined-basic'
														label='Nationality'
														variant='outlined'
														type='text'
														size='small'
														style={{ marginTop: '1rem', marginLeft: '1rem', width: '100%' }}
														select
														autocomplete='off'
														inputProps={{ style: { fontSize: 14 } }}
														InputLabelProps={{ style: { fontSize: 14 } }}
														{...field}
														helperText={meta.touched && meta.error}
														error={meta.touched && meta.error}>
														{countries.map((country) => (
															<MenuItem value={country}>{country}</MenuItem>
														))}
													</CssTextField>
												)}
											</FastField>
										</Grid>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<FastField name='bankAccount'>
												{({ meta, field }) => (
													<CssTextField
														id='outlined-basic'
														label='Bank Account'
														variant='outlined'
														style={{ marginTop: '1rem', marginLeft: '1rem', width: '100%' }}
														type='text'
														size='small'
														autocomplete='off'
														inputProps={{ style: { fontSize: 14 } }}
														InputLabelProps={{ style: { fontSize: 14 } }}
														{...field}
														helperText={meta.touched && meta.error}
														error={meta.touched && meta.error}
													/>
												)}
											</FastField>
										</Grid>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<FastField name='bankNameAndBranch'>
												{({ meta, field }) => (
													<CssTextField
														id='outlined-basic'
														label='Bank Name And Branch'
														variant='outlined'
														type='text'
														size='small'
														style={{ marginTop: '1rem', marginLeft: '1rem', width: '100%' }}
														autocomplete='off'
														inputProps={{ style: { fontSize: 14 } }}
														InputLabelProps={{ style: { fontSize: 14 } }}
														{...field}
														helperText={meta.touched && meta.error}
														error={meta.touched && meta.error}
													/>
												)}
											</FastField>
										</Grid>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<FastField name='isExecutive'>
												{({ meta, field }) => (
													<CssTextField
														id='outlined-basic'
														label='Executive OR Non-Executive'
														variant='outlined'
														type='text'
														size='small'
														style={{ marginTop: '1rem', marginLeft: '1rem', width: '100%' }}
														select
														autocomplete='off'
														inputProps={{ style: { fontSize: 14 } }}
														InputLabelProps={{ style: { fontSize: 14 } }}
														{...field}
														helperText={meta.touched && meta.error}
														error={meta.touched && meta.error}>
														<MenuItem value='Executive'>Executive</MenuItem>
														<MenuItem value='Non Executive'>Non Executive</MenuItem>
													</CssTextField>
												)}
											</FastField>
										</Grid>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<FastField name='empType'>
												{({ meta, field }) => (
													<CssTextField
														id='outlined-basic'
														label='Employee Type'
														variant='outlined'
														type='text'
														size='small'
														select
														style={{ marginTop: '1rem', marginLeft: '1rem', width: '100%' }}
														autocomplete='off'
														inputProps={{ style: { fontSize: 14 } }}
														InputLabelProps={{ style: { fontSize: 14 } }}
														{...field}
														helperText={meta.touched && meta.error}
														error={meta.touched && meta.error}>
														<MenuItem value='Executive'>Executive</MenuItem>
														<MenuItem value='Electrician'>Electrician</MenuItem>
														<MenuItem value='Skilled Employee'>Skilled Employee</MenuItem>
														<MenuItem value='Final Labour'>Final Labour</MenuItem>
													</CssTextField>
												)}
											</FastField>
										</Grid>
									</Grid>
								</Form>
							);
						}}
					</Formik>
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

					<Formik
						initialValues={initialValuesForNextToKin}
						validationSchema={validationForNextToKin}>
						{(props) => {
							nextToKinForm = props;
							return (
								<Form>
									<NextToKin />
								</Form>
							);
						}}
					</Formik>

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
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<CssTextField
												id='outlined-basic'
												label='Degree/Certification'
												variant='outlined'
												type='text'
												size='small'
												style={{ width: '100%' }}
												name='degree'
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
												onChange={props.handleChange('degree')}
												onBlur={props.handleBlur('degree')}
												value={props.values.degree}
												helperText={props.touched.degree && props.errors.degree}
												error={props.touched.degree && props.errors.degree}
											/>
										</Grid>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<CssTextField
												id='outlined-basic'
												label='Board/University'
												variant='outlined'
												type='text'
												style={{ width: '100%' }}
												size='small'
												name='university'
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
												onChange={props.handleChange('university')}
												onBlur={props.handleBlur('university')}
												value={props.values.university}
												helperText={props.touched.university && props.errors.university}
												error={props.touched.university && props.errors.university}
											/>
										</Grid>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<CssTextField
												id='outlined-basic'
												label='Year of Passing'
												variant='outlined'
												type='text'
												name='yearOfPassing'
												style={{ width: '100%' }}
												size='small'
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
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<CssTextField
												id='outlined-basic'
												label='Division'
												variant='outlined'
												style={{ width: '100%' }}
												type='text'
												size='small'
												name='division'
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
												onChange={props.handleChange('division')}
												onBlur={props.handleBlur('division')}
												value={props.values.division}
												helperText={props.touched.division && props.errors.division}
												error={props.touched.division && props.errors.division}
											/>
										</Grid>
										<Grid
											item
											lg={12}
											md={12}
											sm={10}
											xs={11}
											style={{ marginTop: '1rem', marginBottom: '3rem' }}>
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
														<StyledTableCell className='text-light bg-light' align='center'>
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
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<CssTextField
												id='outlined-basic'
												label='Degree/Certification'
												variant='outlined'
												type='text'
												style={{ width: '100%' }}
												size='small'
												name='degree'
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
												onChange={props.handleChange('degree')}
												onBlur={props.handleBlur('degree')}
												value={props.values.degree}
												helperText={props.touched.degree && props.errors.degree}
												error={props.touched.degree && props.errors.degree}
											/>
										</Grid>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<CssTextField
												id='outlined-basic'
												label='Board/University'
												variant='outlined'
												type='text'
												size='small'
												style={{ width: '100%' }}
												name='university'
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
												onChange={props.handleChange('university')}
												onBlur={props.handleBlur('university')}
												value={props.values.university}
												helperText={props.touched.university && props.errors.university}
												error={props.touched.university && props.errors.university}
											/>
										</Grid>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<CssTextField
												id='outlined-basic'
												label='Year of Passing'
												variant='outlined'
												style={{ width: '100%' }}
												type='text'
												size='small'
												name='yearOfPassing'
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
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<CssTextField
												id='outlined-basic'
												label='Division'
												variant='outlined'
												type='text'
												size='small'
												style={{ width: '100%' }}
												name='division'
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
									<Grid
										item
										lg={12}
										md={12}
										sm={10}
										xs={11}
										style={{ marginTop: '1rem', marginBottom: '3rem' }}>
										<Button
											variant='outlined'
											color='primary'
											classNames={classes.addMoreButton}
											text={professionalQualificationEdit ? 'Edit' : 'Add Mote'}
										/>
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
														<StyledTableCell className='text-light bg-light' align='center'>
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
						<h5 className='text-left'>Experience (Recent First) in Relevant Field</h5>
						<Formik
							initialValues={initialValuesForExperience}
							validationSchema={validationSchemaForExperience}
							enableReinitialize
							onSubmit={addMoreExperience}>
							{(props) => (
								<Form>
									<Grid container spacing={1} style={{ marginTop: 15 }}>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<CssTextField
												id='outlined-basic'
												label='Company Name'
												variant='outlined'
												type='text'
												size='small'
												style={{ width: '100%' }}
												name='companyName'
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
												onChange={props.handleChange('companyName')}
												onBlur={props.handleBlur('companyName')}
												value={props.values.companyName}
												helperText={props.touched.companyName && props.errors.companyName}
												error={props.touched.companyName && props.errors.companyName}
											/>
										</Grid>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<CssTextField
												id='outlined-basic'
												label='Company Address'
												variant='outlined'
												type='text'
												size='small'
												style={{ width: '100%' }}
												name='companyAddress'
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
												onChange={props.handleChange('companyAddress')}
												onBlur={props.handleBlur('companyAddress')}
												value={props.values.companyAddress}
												helperText={
													props.touched.companyAddress && props.errors.companyAddress
												}
												error={props.touched.companyAddress && props.errors.companyAddress}
											/>
										</Grid>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<CssTextField
												id='outlined-basic'
												label='Last Salary'
												variant='outlined'
												type='number'
												size='small'
												style={{ width: '100%' }}
												name='from'
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
												onChange={props.handleChange('lastSalary')}
												onBlur={props.handleBlur('lastSalary')}
												value={props.values.lastSalary}
												helperText={props.touched.lastSalary && props.errors.lastSalary}
												error={props.touched.lastSalary && props.errors.lastSalary}
											/>
										</Grid>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<CssTextField
												id='outlined-basic'
												label='Reason of Left'
												variant='outlined'
												type='text'
												size='small'
												style={{ width: '100%' }}
												name='to'
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
												onChange={props.handleChange('reasonOfLeft')}
												onBlur={props.handleBlur('reasonOfLeft')}
												value={props.values.reasonOfLeft}
												helperText={props.touched.reasonOfLeft && props.errors.reasonOfLeft}
												error={props.touched.reasonOfLeft && props.errors.reasonOfLeft}
											/>
										</Grid>
										<Grid container spacing={1} className='mt-1'>
											<Grid item lg={3} md={3} sm={12} xs={12}>
												<CssTextField
													id='outlined-basic'
													variant='outlined'
													type='date'
													size='small'
													style={{ width: '100%' }}
													name='lastSalary'
													inputProps={{ style: { fontSize: 14 } }}
													InputLabelProps={{ style: { fontSize: 14 } }}
													onChange={props.handleChange('from')}
													onBlur={props.handleBlur('from')}
													value={props.values.from}
													helperText={props.touched.from && props.errors.from}
													error={props.touched.from && props.errors.from}
												/>
											</Grid>
											<Grid item lg={3} md={3} sm={12} xs={12}>
												<CssTextField
													id='outlined-basic'
													variant='outlined'
													type='date'
													size='small'
													name='reasonOfLeft'
													style={{ width: '100%' }}
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
													label='Select Experience level'
													type='text'
													size='small'
													select
													style={{ width: '100%' }}
													name='experienceLevel'
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
											<Grid item lg={12} md={12} sm={10} xs={11}>
												<Button
													variant='outlined'
													color='primary'
													classNames={classes.addMoreButton}
													text={experienceEdit ? 'Edit' : 'Add'}
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
												<StyledTableCell align='center'>Experience Level</StyledTableCell>
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
														<StyledTableCell className='text-light bg-light' align='center'>
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
					<Formik
						initialValues={initialValuesForReference}
						validationSchema={validationForReference}>
						{(props) => {
							referenceForm = props;
							return (
								<Form>
									<Container className={classes.mainContainer}>
										<h5 className='text-left'>Reference</h5>
										<Grid container spacing={1} style={{ marginTop: 15 }}>
											<Grid item lg={4} md={4} sm={12} xs={12}>
												<FastField name='name'>
													{({ meta, field }) => (
														<CssTextField
															id='outlined-basic'
															label='Name'
															variant='outlined'
															type='text'
															size='small'
															autocomplete='off'
															style={{ width: '100%' }}
															inputProps={{ style: { fontSize: 14 } }}
															InputLabelProps={{ style: { fontSize: 14 } }}
															{...field}
															helperText={meta.touched && meta.error}
															error={meta.touched && meta.error}
														/>
													)}
												</FastField>
											</Grid>
											<Grid item lg={4} md={4} sm={12} xs={12}>
												<FastField name='contact'>
													{({ meta, field }) => (
														<CssTextField
															id='outlined-basic'
															label='Contact'
															variant='outlined'
															type='text'
															size='small'
															autocomplete='off'
															style={{ width: '100%' }}
															inputProps={{ style: { fontSize: 14 } }}
															InputLabelProps={{ style: { fontSize: 14 } }}
															{...field}
															helperText={meta.touched && meta.error}
															error={meta.touched && meta.error}
														/>
													)}
												</FastField>
											</Grid>
											<Grid item lg={4} md={4} sm={12} xs={12}>
												<FastField name='address'>
													{({ meta, field }) => (
														<CssTextField
															id='outlined-basic'
															label='Address'
															variant='outlined'
															type='text'
															size='small'
															autocomplete='off'
															style={{ width: '100%' }}
															inputProps={{ style: { fontSize: 14 } }}
															InputLabelProps={{ style: { fontSize: 14 } }}
															{...field}
															helperText={meta.touched && meta.error}
															error={meta.touched && meta.error}
														/>
													)}
												</FastField>
											</Grid>
										</Grid>
									</Container>
								</Form>
							);
						}}
					</Formik>
					<div style={{ marginTop: 30, marginBottom: 30 }}>
						<hr />
					</div>
					<Formik>
						{(props) => {
							officeUseForm = props;
							return (
								<Form>
									<Container className={classes.mainContainer}>
										<h5 className='text-left'>For Office Use Only</h5>
										<Grid container spacing={1} style={{ marginTop: 15 }}>
											<Grid item lg={3} md={3} sm={12} xs={12}>
												<FastField name='dateOfInterviewed'>
													{({ meta, field }) => (
														<CssTextField
															id='outlined-basic'
															variant='outlined'
															type='date'
															size='small'
															autocomplete='off'
															style={{ width: '100%' }}
															inputProps={{ style: { fontSize: 14 } }}
															InputLabelProps={{ style: { fontSize: 14 } }}
															{...field}
															helperText={meta.touched && meta.error}
															error={meta.touched && meta.error}
														/>
													)}
												</FastField>
											</Grid>
											<Grid item lg={3} md={3} sm={12} xs={12}>
												<FastField name='remarks'>
													{({ meta, field }) => (
														<CssTextField
															id='outlined-basic'
															label='Remarks'
															variant='outlined'
															type='text'
															size='small'
															autocomplete='off'
															style={{ width: '100%' }}
															inputProps={{ style: { fontSize: 14 } }}
															InputLabelProps={{ style: { fontSize: 14 } }}
															{...field}
															helperText={meta.touched && meta.error}
															error={meta.touched && meta.error}
														/>
													)}
												</FastField>
											</Grid>
											<Grid item lg={3} md={3} sm={12} xs={12}>
												<FastField name='recommended'>
													{({ meta, field }) => (
														<CssTextField
															id='outlined-basic'
															label='Recommended'
															variant='outlined'
															type='text'
															size='small'
															select
															autocomplete='off'
															style={{ width: '100%' }}
															inputProps={{ style: { fontSize: 14 } }}
															InputLabelProps={{ style: { fontSize: 14 } }}
															{...field}
															helperText={meta.touched && meta.error}
															error={meta.touched && meta.error}>
															<MenuItem value='true'>Yes</MenuItem>
															<MenuItem value='false'>No</MenuItem>
														</CssTextField>
													)}
												</FastField>
											</Grid>
											<Grid item lg={3} md={3} sm={12} xs={12}>
												<FastField name='jobTitle'>
													{({ meta, field }) => (
														<CssTextField
															id='outlined-basic'
															label='Job Title'
															variant='outlined'
															type='text'
															size='small'
															autocomplete='off'
															style={{ width: '100%' }}
															inputProps={{ style: { fontSize: 14 } }}
															InputLabelProps={{ style: { fontSize: 14 } }}
															{...field}
															helperText={meta.touched && meta.error}
															error={meta.touched && meta.error}
														/>
													)}
												</FastField>
											</Grid>
										</Grid>
										<Grid container spacing={1} style={{ marginTop: 15 }}>
											<Grid item lg={3} md={3} sm={12} xs={12}>
												<FastField name='department'>
													{({ meta, field }) => (
														<CssTextField
															id='outlined-basic'
															label='Department'
															variant='outlined'
															type='text'
															size='small'
															select
															autocomplete='off'
															style={{ width: '100%' }}
															inputProps={{ style: { fontSize: 14 } }}
															InputLabelProps={{ style: { fontSize: 14 } }}
															{...field}
															helperText={meta.touched && meta.error}
															error={meta.touched && meta.error}>
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
													)}
												</FastField>
											</Grid>

											<Grid item lg={3} md={3} sm={12} xs={12}>
												<FastField name='recommendedSalary'>
													{({ meta, field }) => (
														<CssTextField
															id='outlined-basic'
															label='Recommended Salary'
															variant='outlined'
															type='number'
															size='small'
															autocomplete='off'
															style={{ width: '100%' }}
															inputProps={{ style: { fontSize: 14 } }}
															InputLabelProps={{ style: { fontSize: 14 } }}
															{...field}
															helperText={meta.touched && meta.error}
															error={meta.touched && meta.error}
														/>
													)}
												</FastField>
											</Grid>
											<Grid item lg={3} md={3} sm={12} xs={12}>
												<FastField name='approved'>
													{({ meta, field }) => (
														<CssTextField
															id='outlined-basic'
															label='Approved'
															variant='outlined'
															type='text'
															size='small'
															select
															autocomplete='off'
															style={{ width: '100%' }}
															inputProps={{ style: { fontSize: 14 } }}
															InputLabelProps={{ style: { fontSize: 14 } }}
															{...field}
															helperText={meta.touched && meta.error}
															error={meta.touched && meta.error}>
															<MenuItem value='Yes'>Yes</MenuItem>
															<MenuItem value='No'>No</MenuItem>
														</CssTextField>
													)}
												</FastField>
											</Grid>
										</Grid>
									</Container>
								</Form>
							);
						}}
					</Formik>
					<Button
						variant='outlined'
						color='primary'
						text='Add'
						classNames={classes.addButton}
						onClick={onSubmit}
					/>
				</Container>
			</div>
		</Sidenav>
	);
};

export default Employees;
