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
	hireEmployee,
	updateEmployee,
} from '../../../services/action/EmployeesAction';
import { getExperiences } from '../../../services/action/ExperienceAction';
import { fetchDepartmentsAction } from '../../../services/action/DepartmentAction';
import { getDesignation } from '../../../services/action/DesignationAction';
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
	finalSal: undefined,
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
	finalDepartment: yup.string().nullable(),
	finalDesignation: yup.string().nullable(),
	finalSal: yup.string().nullable(),
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
	contactNo: '',
	address: '',
};

const validationForReference = yup.object({
	name: yup.string().required(),
	contactNo: yup.string().required(),
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

const Employees = ({ history, location }) => {
	const [hireError, setHireError] = React.useState('');
	const [hireLoading, setHireLoading] = React.useState('');
	const [initialValues1State, setInitialValues1State] =
		React.useState(initialValues1);
	const [initialValues2State, setInitialValues2State] = React.useState({
		...initialValues2,
	});
	const [initialValueStateForNextToKin, setInitialValueStateForNextToKin] =
		React.useState(initialValuesForNextToKin);
	const [initialValueStateForReference, setInitialValueStateForReference] =
		React.useState(initialValuesForReference);
	const [initialValueStateForOfficeUse, setInitialValueStateForOfficeUse] =
		React.useState(initialValuesForOfficeUse);
	const [updateLoading, setUpdateLoading] = React.useState(false);
	const [success, setSuccess] = React.useState('');
	const [createLoading, setCreateLoading] = React.useState(false);
	const [createError, setCreateError] = React.useState('');
	const classes = useStyles();
	const [image, setImage] = useState({ path: avatar });
	let nextToKinForm = {};
	let referenceForm = {};
	let officeUseForm = {};
	let initialValues1Form = {};
	let initialValues2Form = {};
	const [academicQualifications, setAcademicQualification] = React.useState(
		[]
	);
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

	React.useEffect(() => {
		if (location.state?.user) {
			const {
				name,
				fatherName_husbandName,
				presentAddress,
				jobAppliedFor,
				permanentAddress,
				telephoneNo,
				mobileNo,
				gender,
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
				isExecutive,
				empType,
				finalDepartment,
				finalDesignation,
				finalSal,
			} = location.state?.user;
			setInitialValues1State({
				name,
				fatherName_husbandName,
				presentAddress,
				permanentAddress,
				telephoneNo,
				mobileNo,
				gender,
				jobAppliedFor: jobAppliedFor?._id,
			});
			setInitialValues2State({
				status,
				age,
				email,
				cnic,
				dateOfBirth,
				placeOfBirth,
				DatePlaceOfIssue,
				nationality,
				bankAccount,
				bankNameAndBranch,
				isExecutive,
				empType,
				finalSal,
				finalDepartment: finalDepartment ? finalDepartment._id : '',
				finalDesignation: finalDesignation ? finalDesignation._id : '',
			});
			setAcademicQualification(location.state?.user.academicQualification);
			setExperience(location.state?.user.experience);
			setProfessionalQualification(
				location.state?.user.professionalQualification
			);
			setInitialValueStateForNextToKin(location.state?.user.nextToKin);
			setInitialValueStateForReference(location.state?.user.reference);
			setInitialValueStateForOfficeUse({
				...location.state?.user.officeUse,
				department: location.state?.user.officeUse.department._id,
			});
		}
	}, [location?.state?.user]);

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
		dispatch(getDesignation());
		dispatch(fetchDepartmentsAction());
	}, [dispatch]);

	const { experiences: experiencesState } = useSelector(
		(state) => state.experiences
	);
	const { departments } = useSelector((state) => state.departments);
	const { designations } = useSelector((state) => state.designations);

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

	function isEmpty(obj) {
		for (var x in obj) {
			if (obj.hasOwnProperty(x)) return false;
		}
		return true;
	}

	const onSubmit = async (e) => {
		e.preventDefault();

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

		const data = {
			...initialValues1Form.values,
			...initialValues2Form.values,
			nextToKin: {
				...nextToKinForm.values,
			},
			reference: {
				...referenceForm.values,
			},
			officeUse: {
				...officeUseForm.values,
			},
			academicQualification: academicQualifications,
			professionalQualification,
			experience,
			picture: image.image,
		};

		if (!data.finalDepartment) {
			data.finalDepartment = undefined;
			data.finalDesignation = undefined;
			// initialValues2Form.values.finalDesignation = undefined;
		} else {
		}

		if (
			isEmpty(nextToKinErrors) &&
			isEmpty(referenceErrors) &&
			isEmpty(officeUseErrors) &&
			isEmpty(initialValues1Error) &&
			isEmpty(initialValues2Error)
		) {
			if (location.state?.isHiring) {
				if (
					initialValues2Form.values.finalDepartment &&
					initialValues2Form.values.finalDesignation &&
					initialValues2Form.values.finalSal
				) {
					hireEmployeeFunc(data);
				} else {
					setHireError(
						'Please check Final Department, Final Designation and Final Sal fields are filled to hire employee'
					);
					setTimeout(() => {
						setHireError('');
					}, 4000);
				}
			} else if (location?.state?.toUpdate) {
				onUpdateEmployee(data);
			} else {
				onCreateEmployee(data);
			}
		} else {
		}
	};

	const onCreateEmployee = (data) => {
		setCreateLoading(true);
		dispatch(
			createEmployee(data, (err) => {
				if (err) {
					setCreateError(err);
					setTimeout(() => {
						setCreateError('');
					}, 4000);
				} else {
					setSuccess('Employee added successfully');
					setTimeout(() => {
						setSuccess('');
					}, 4000);
					clearForm();
				}
				setCreateLoading(false);
			})
		);
	};

	const clearForm = () => {
		nextToKinForm.resetForm();
		referenceForm.resetForm();
		officeUseForm.resetForm();
		initialValues1Form.resetForm();
		initialValues2Form.resetForm();
		setAcademicQualification([]);
		setProfessionalQualification([]);
		setExperience([]);
	};

	const onUpdateEmployee = (data) => {
		setUpdateLoading(true);
		dispatch(
			updateEmployee(location.state?.user._id, data, (err) => {
				if (err) {
					setCreateError(err);
					setTimeout(() => {
						setCreateError('');
					}, 4000);
				} else {
					setSuccess('Employee Updated successfully');
					setTimeout(() => {
						setSuccess('');
					}, 4000);
				}
				setUpdateLoading(false);
			})
		);
	};

	const hireEmployeeFunc = (data) => {
		setHireLoading(true);
		dispatch(
			hireEmployee(location.state?.user._id, data, (err) => {
				if (err) {
					setCreateError(err);
					setTimeout(() => {
						setCreateError('');
					}, 4000);
				} else {
					setSuccess('Employee Hired successfully');
					setTimeout(() => {
						setSuccess('');
					}, 4000);
				}
				setHireLoading(false);
			})
		);
	};

	return (
		<Sidenav title={'Employees'}>
			<div>
				<Container className={classes.mainContainer}>
					{success && <p>{success}</p>}
					<form onSubmit={onSubmit} autoComplete="off">
						<Formik
							initialValues={initialValues1State}
							enableReinitialize
							validationSchema={validationSchema1}
						>
							{(props) => {
								initialValues1Form = props;
								return (
									<Grid container spacing={1}>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<CssTextField
												id="outlined-basic"
												label="Name"
												variant="outlined"
												type="text"
												style={{
													marginTop: '1rem',
													marginLeft: '1rem',
													width: '100%',
												}}
												size="small"
												disabled={
													location.state?.isHiring ? true : false
												}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
												onChange={props.handleChange('name')}
												onBlur={props.handleBlur('name')}
												value={props.values.name}
												helperText={
													props.touched.name && props.errors.name
												}
												error={
													props.touched.name && props.errors.name
												}
											/>
										</Grid>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<CssTextField
												id="outlined-basic"
												label="Father Name OR Husband Name"
												variant="outlined"
												disabled={
													location.state?.isHiring ? true : false
												}
												style={{
													marginTop: '1rem',
													marginLeft: '1rem',
													width: '100%',
												}}
												type="text"
												size="small"
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
												onChange={props.handleChange(
													'fatherName_husbandName'
												)}
												onBlur={props.handleBlur(
													'fatherName_husbandName'
												)}
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
												id="outlined-basic"
												label="Job Applied For"
												disabled={
													location.state?.isHiring ? true : false
												}
												style={{
													marginTop: '1rem',
													marginLeft: '1rem',
													width: '100%',
												}}
												variant="outlined"
												type="text"
												size="small"
												select
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
												onChange={props.handleChange(
													'jobAppliedFor'
												)}
												onBlur={props.handleBlur('jobAppliedFor')}
												value={props.values.jobAppliedFor}
												helperText={
													props.touched.jobAppliedFor &&
													props.errors.jobAppliedFor
												}
												error={
													props.touched.jobAppliedFor &&
													props.errors.jobAppliedFor
												}
											>
												{designations.map((el) => (
													<MenuItem value={el._id}>
														{el.name}
													</MenuItem>
												))}
											</CssTextField>
										</Grid>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<CssTextField
												id="outlined-basic"
												disabled={
													location.state?.isHiring ? true : false
												}
												label="Present Address"
												variant="outlined"
												style={{
													marginTop: '1rem',
													marginLeft: '1rem',
													width: '100%',
												}}
												type="text"
												size="small"
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
												onChange={props.handleChange(
													'presentAddress'
												)}
												onBlur={props.handleBlur('presentAddress')}
												value={props.values.presentAddress}
												helperText={
													props.touched.presentAddress &&
													props.errors.presentAddress
												}
												error={
													props.touched.presentAddress &&
													props.errors.presentAddress
												}
											/>
										</Grid>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<CssTextField
												id="outlined-basic"
												label="Permanent Address"
												variant="outlined"
												style={{
													marginTop: '1rem',
													marginLeft: '1rem',
													width: '100%',
												}}
												type="text"
												disabled={
													location.state?.isHiring ? true : false
												}
												size="small"
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
												onChange={props.handleChange(
													'permanentAddress'
												)}
												onBlur={props.handleBlur(
													'permanentAddress'
												)}
												value={props.values.permanentAddress}
												helperText={
													props.touched.permanentAddress &&
													props.errors.permanentAddress
												}
												error={
													props.touched.permanentAddress &&
													props.errors.permanentAddress
												}
											/>
										</Grid>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<CssTextField
												id="outlined-basic"
												label="Telephone No"
												variant="outlined"
												type="number"
												disabled={
													location.state?.isHiring ? true : false
												}
												style={{
													marginTop: '1rem',
													marginLeft: '1rem',
													width: '100%',
												}}
												size="small"
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
												onChange={props.handleChange('telephoneNo')}
												onBlur={props.handleBlur('telephoneNo')}
												value={props.values.telephoneNo}
												helperText={
													props.touched.telephoneNo &&
													props.errors.telephoneNo
												}
												error={
													props.touched.telephoneNo &&
													props.errors.telephoneNo
												}
											/>
										</Grid>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<CssTextField
												id="outlined-basic"
												label="Mobile No"
												disabled={
													location.state?.isHiring ? true : false
												}
												variant="outlined"
												style={{
													marginTop: '1rem',
													marginLeft: '1rem',
													width: '100%',
												}}
												type="number"
												size="small"
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
												onChange={props.handleChange('mobileNo')}
												onBlur={props.handleBlur('mobileNo')}
												value={props.values.mobileNo}
												helperText={
													props.touched.mobileNo &&
													props.errors.mobileNo
												}
												error={
													props.touched.mobileNo &&
													props.errors.mobileNo
												}
											/>
										</Grid>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<CssTextField
												id="outlined-basic"
												disabled={
													location.state?.isHiring ? true : false
												}
												label="Gender"
												variant="outlined"
												type="text"
												style={{
													marginTop: '1rem',
													marginLeft: '1rem',
													width: '100%',
												}}
												size="small"
												select
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
												onChange={props.handleChange('gender')}
												onBlur={props.handleBlur('gender')}
												value={props.values.gender}
												helperText={
													props.touched.gender &&
													props.errors.gender
												}
												error={
													props.touched.gender &&
													props.errors.gender
												}
											>
												{genders.map((gender) => (
													<MenuItem value={gender}>
														{gender}
													</MenuItem>
												))}
											</CssTextField>
										</Grid>
									</Grid>
								);
							}}
						</Formik>
						<Formik
							initialValues={initialValues2State}
							enableReinitialize
							validationSchema={validationSchema2}
						>
							{(props) => {
								initialValues2Form = { ...props };
								return (
									<Form autoComplete="off">
										<Grid container spacing={1}>
											<Grid item lg={3} md={3} sm={12} xs={12}>
												<FastField name="status">
													{({ meta, field }) => (
														<CssTextField
															id="outlined-basic"
															label="Status"
															disabled={
																location.state?.isHiring
																	? true
																	: false
															}
															variant="outlined"
															type="text"
															size="small"
															select
															style={{
																marginTop: '1rem',
																marginLeft: '1rem',
																width: '100%',
															}}
															autocomplete="off"
															inputProps={{
																style: { fontSize: 14 },
															}}
															InputLabelProps={{
																style: { fontSize: 14 },
															}}
															{...field}
															helperText={
																meta.touched && meta.error
															}
															error={meta.touched && meta.error}
														>
															{martialStatus.map((status) => (
																<MenuItem value={status}>
																	{status}
																</MenuItem>
															))}
														</CssTextField>
													)}
												</FastField>
											</Grid>
											<Grid item lg={3} md={3} sm={12} xs={12}>
												<FastField name="age">
													{({ meta, field }) => (
														<CssTextField
															id="outlined-basic"
															label="Age"
															disabled={
																location.state?.isHiring
																	? true
																	: false
															}
															variant="outlined"
															style={{
																marginTop: '1rem',
																marginLeft: '1rem',
																width: '100%',
															}}
															type="number"
															size="small"
															autocomplete="off"
															inputProps={{
																style: { fontSize: 14 },
															}}
															InputLabelProps={{
																style: { fontSize: 14 },
															}}
															{...field}
															helperText={
																meta.touched && meta.error
															}
															error={meta.touched && meta.error}
														/>
													)}
												</FastField>
											</Grid>
											<Grid item lg={3} md={3} sm={12} xs={12}>
												<FastField name="dateOfBirth">
													{({ meta, field }) => (
														<CssTextField
															id="outlined-basic"
															variant="outlined"
															label="Date of birth"
															type="date"
															style={{
																marginTop: '1rem',
																marginLeft: '1rem',
																width: '100%',
															}}
															size="small"
															autocomplete="off"
															disabled={
																location.state?.isHiring
																	? true
																	: false
															}
															inputProps={{
																style: { fontSize: 14 },
															}}
															InputLabelProps={{
																style: { fontSize: 14 },
															}}
															{...field}
															helperText={
																meta.touched && meta.error
															}
															error={meta.touched && meta.error}
														/>
													)}
												</FastField>
											</Grid>
											<Grid item lg={3} md={3} sm={12} xs={12}>
												<FastField name="placeOfBirth">
													{({ meta, field }) => (
														<CssTextField
															id="outlined-basic"
															style={{
																marginTop: '1rem',
																marginLeft: '1rem',
																width: '100%',
															}}
															label="Place Of Birth"
															variant="outlined"
															disabled={
																location.state?.isHiring
																	? true
																	: false
															}
															type="text"
															size="small"
															autocomplete="off"
															inputProps={{
																style: { fontSize: 14 },
															}}
															InputLabelProps={{
																style: { fontSize: 14 },
															}}
															{...field}
															helperText={
																meta.touched && meta.error
															}
															error={meta.touched && meta.error}
														/>
													)}
												</FastField>
											</Grid>
											<Grid item lg={3} md={3} sm={12} xs={12}>
												<FastField name="email">
													{({ meta, field }) => (
														<CssTextField
															id="outlined-basic"
															label="Email"
															variant="outlined"
															style={{
																marginTop: '1rem',
																marginLeft: '1rem',
																width: '100%',
															}}
															disabled={
																location.state?.isHiring
																	? true
																	: false
															}
															type="text"
															size="small"
															autocomplete="off"
															inputProps={{
																style: { fontSize: 14 },
															}}
															InputLabelProps={{
																style: { fontSize: 14 },
															}}
															{...field}
															helperText={
																meta.touched && meta.error
															}
															error={meta.touched && meta.error}
														/>
													)}
												</FastField>
											</Grid>
											<Grid item lg={3} md={3} sm={12} xs={12}>
												<FastField name="cnic">
													{({ meta, field }) => (
														<CssTextField
															id="outlined-basic"
															label="CNIC"
															variant="outlined"
															style={{
																marginTop: '1rem',
																marginLeft: '1rem',
																width: '100%',
															}}
															type="text"
															disabled={
																location.state?.isHiring
																	? true
																	: false
															}
															size="small"
															autocomplete="off"
															inputProps={{
																style: { fontSize: 14 },
															}}
															InputLabelProps={{
																style: { fontSize: 14 },
															}}
															{...field}
															helperText={
																meta.touched && meta.error
															}
															error={meta.touched && meta.error}
														/>
													)}
												</FastField>
											</Grid>
											<Grid item lg={3} md={3} sm={12} xs={12}>
												<FastField name="DatePlaceOfIssue">
													{({ meta, field }) => (
														<CssTextField
															id="outlined-basic"
															variant="outlined"
															label="Date of Issuse"
															type="date"
															style={{
																marginTop: '1rem',
																marginLeft: '1rem',
																width: '100%',
															}}
															disabled={
																location.state?.isHiring
																	? true
																	: false
															}
															size="small"
															autocomplete="off"
															inputProps={{
																style: { fontSize: 14 },
															}}
															InputLabelProps={{
																style: { fontSize: 14 },
															}}
															{...field}
															helperText={
																meta.touched && meta.error
															}
															error={meta.touched && meta.error}
														/>
													)}
												</FastField>
											</Grid>
											<Grid item lg={3} md={3} sm={12} xs={12}>
												<FastField name="nationality">
													{({ meta, field }) => (
														<CssTextField
															id="outlined-basic"
															label="Nationality"
															variant="outlined"
															disabled={
																location.state?.isHiring
																	? true
																	: false
															}
															type="text"
															size="small"
															style={{
																marginTop: '1rem',
																marginLeft: '1rem',
																width: '100%',
															}}
															select
															autocomplete="off"
															inputProps={{
																style: { fontSize: 14 },
															}}
															InputLabelProps={{
																style: { fontSize: 14 },
															}}
															{...field}
															helperText={
																meta.touched && meta.error
															}
															error={meta.touched && meta.error}
														>
															{countries.map((country) => (
																<MenuItem value={country}>
																	{country}
																</MenuItem>
															))}
														</CssTextField>
													)}
												</FastField>
											</Grid>
											<Grid item lg={3} md={3} sm={12} xs={12}>
												<FastField name="bankAccount">
													{({ meta, field }) => (
														<CssTextField
															id="outlined-basic"
															label="Bank Account No."
															disabled={
																location.state?.isHiring
																	? true
																	: false
															}
															variant="outlined"
															style={{
																marginTop: '1rem',
																marginLeft: '1rem',
																width: '100%',
															}}
															type="text"
															size="small"
															autocomplete="off"
															inputProps={{
																style: { fontSize: 14 },
															}}
															InputLabelProps={{
																style: { fontSize: 14 },
															}}
															{...field}
															helperText={
																meta.touched && meta.error
															}
															error={meta.touched && meta.error}
														/>
													)}
												</FastField>
											</Grid>
											<Grid item lg={3} md={3} sm={12} xs={12}>
												<FastField name="bankNameAndBranch">
													{({ meta, field }) => (
														<CssTextField
															id="outlined-basic"
															label="Bank Name And Branch"
															variant="outlined"
															type="text"
															disabled={
																location.state?.isHiring
																	? true
																	: false
															}
															size="small"
															style={{
																marginTop: '1rem',
																marginLeft: '1rem',
																width: '100%',
															}}
															autocomplete="off"
															inputProps={{
																style: { fontSize: 14 },
															}}
															InputLabelProps={{
																style: { fontSize: 14 },
															}}
															{...field}
															helperText={
																meta.touched && meta.error
															}
															error={meta.touched && meta.error}
														/>
													)}
												</FastField>
											</Grid>
											<Grid item lg={3} md={3} sm={12} xs={12}>
												<FastField name="isExecutive">
													{({ meta, field }) => (
														<CssTextField
															id="outlined-basic"
															label="Executive OR Non-Executive"
															disabled={
																location.state?.isHiring
																	? true
																	: false
															}
															variant="outlined"
															type="text"
															size="small"
															style={{
																marginTop: '1rem',
																marginLeft: '1rem',
																width: '100%',
															}}
															select
															autocomplete="off"
															inputProps={{
																style: { fontSize: 14 },
															}}
															InputLabelProps={{
																style: { fontSize: 14 },
															}}
															{...field}
															helperText={
																meta.touched && meta.error
															}
															error={meta.touched && meta.error}
														>
															<MenuItem value="Executive">
																Executive
															</MenuItem>
															<MenuItem value="Non Executive">
																Non Executive
															</MenuItem>
														</CssTextField>
													)}
												</FastField>
											</Grid>
											<Grid item lg={3} md={3} sm={12} xs={12}>
												<FastField name="empType">
													{({ meta, field }) => (
														<CssTextField
															id="outlined-basic"
															label="Employee Type"
															variant="outlined"
															type="text"
															size="small"
															select
															disabled={
																location.state?.isHiring
																	? true
																	: false
															}
															style={{
																marginTop: '1rem',
																marginLeft: '1rem',
																width: '100%',
															}}
															autocomplete="off"
															inputProps={{
																style: { fontSize: 14 },
															}}
															InputLabelProps={{
																style: { fontSize: 14 },
															}}
															{...field}
															helperText={
																meta.touched && meta.error
															}
															error={meta.touched && meta.error}
														>
															<MenuItem value="Executive">
																Executive
															</MenuItem>
															<MenuItem value="Electrician">
																Electrician
															</MenuItem>
															<MenuItem value="Skilled Employee">
																Skilled Employee
															</MenuItem>
															<MenuItem value="Final Labour">
																Final Labour
															</MenuItem>
														</CssTextField>
													)}
												</FastField>
											</Grid>
											{(location.state?.isHiring ||
												location.state?.user?.isHired) && (
												<>
													<Grid item lg={3} md={3} sm={12} xs={12}>
														<FastField name="finalDepartment">
															{({ meta, field }) => (
																<CssTextField
																	id="outlined-basic"
																	label="Final Department"
																	style={{
																		marginTop: '1rem',
																		marginLeft: '1rem',
																		width: '100%',
																	}}
																	variant="outlined"
																	type="text"
																	size="small"
																	select
																	autocomplete="off"
																	inputProps={{
																		style: { fontSize: 14 },
																	}}
																	InputLabelProps={{
																		style: { fontSize: 14 },
																	}}
																	{...field}
																	helperText={
																		meta.touched && meta.error
																	}
																	error={
																		meta.touched && meta.error
																	}
																>
																	{departments.map((el) => (
																		<MenuItem value={el._id}>
																			{el.name}
																		</MenuItem>
																	))}
																</CssTextField>
															)}
														</FastField>
													</Grid>
													<Grid item lg={3} md={3} sm={12} xs={12}>
														<FastField name="finalDesignation">
															{({ meta, field }) => (
																<CssTextField
																	id="outlined-basic"
																	label="Final Designation"
																	variant="outlined"
																	type="text"
																	size="small"
																	select
																	style={{
																		marginTop: '1rem',
																		marginLeft: '1rem',
																		width: '100%',
																	}}
																	inputProps={{
																		style: { fontSize: 14 },
																	}}
																	InputLabelProps={{
																		style: { fontSize: 14 },
																	}}
																	helperText={
																		meta.touched && meta.error
																	}
																	error={
																		meta.touched && meta.error
																	}
																	{...field}
																>
																	{designations.map((el) => (
																		<MenuItem value={el._id}>
																			{el.name}
																		</MenuItem>
																	))}
																</CssTextField>
															)}
														</FastField>
													</Grid>
													<Grid item lg={3} md={3} sm={12} xs={12}>
														<FastField name="finalSal">
															{({ meta, field }) => (
																<CssTextField
																	id="outlined-basic"
																	label="Final Sal"
																	variant="outlined"
																	type="number"
																	size="small"
																	style={{
																		marginTop: '1rem',
																		marginLeft: '1rem',
																		width: '100%',
																	}}
																	autocomplete="off"
																	inputProps={{
																		style: { fontSize: 14 },
																	}}
																	InputLabelProps={{
																		style: { fontSize: 14 },
																	}}
																	{...field}
																	helperText={
																		meta.touched && meta.error
																	}
																	error={
																		meta.touched && meta.error
																	}
																/>
															)}
														</FastField>
													</Grid>
												</>
											)}
										</Grid>
									</Form>
								);
							}}
						</Formik>
						<Button
							variant="outlined"
							color="primary"
							text="Add"
							classNames={classes.addButton}
							style={{ display: 'none' }}
						/>
						<Grid container spacing={1} className="mt-5">
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<input
									disabled={location.state?.isHiring ? true : false}
									type="file"
									className={classes.uploadImgBtn}
									onChange={(event) => picUploadFunc(event)}
								></input>
								<img
									src={
										location.state?.toUpdate
											? location.state?.user?.picture
											: image.path
									}
									alt="Employee Picture"
									width="150"
									height="150"
									className="mt-4 ml-3"
									align="left"
								/>
							</Grid>
						</Grid>

						<div style={{ marginTop: 30, marginBottom: 30 }}>
							<hr />
						</div>

						<Formik
							initialValues={initialValueStateForNextToKin}
							enableReinitialize
							validationSchema={validationForNextToKin}
						>
							{(props) => {
								nextToKinForm = props;
								return (
									<NextToKin isHiring={location.state?.isHiring} />
								);
							}}
						</Formik>
					</form>

					<div style={{ marginTop: 30, marginBottom: 30 }}>
						<hr />
					</div>
					<Container className={classes.mainContainer}>
						<h5 className="text-left">Academic Qualification</h5>
						<Formik
							initialValues={initialValuesForAcademicQualification}
							validationSchema={validationSchemaForAcademicQualification}
							enableReinitialize
							onSubmit={addMoreAcademicQualification}
						>
							{(props) => (
								<Form autoComplete="off">
									<Grid
										container
										spacing={1}
										style={{ marginTop: 15 }}
									>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<CssTextField
												id="outlined-basic"
												label="Degree/Certification"
												variant="outlined"
												disabled={
													location.state?.isHiring ? true : false
												}
												type="text"
												size="small"
												style={{ width: '100%' }}
												name="degree"
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
												onChange={props.handleChange('degree')}
												onBlur={props.handleBlur('degree')}
												value={props.values.degree}
												helperText={
													props.touched.degree &&
													props.errors.degree
												}
												error={
													props.touched.degree &&
													props.errors.degree
												}
											/>
										</Grid>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<CssTextField
												id="outlined-basic"
												label="Board/University"
												variant="outlined"
												type="text"
												style={{ width: '100%' }}
												size="small"
												name="university"
												disabled={
													location.state?.isHiring ? true : false
												}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
												onChange={props.handleChange('university')}
												onBlur={props.handleBlur('university')}
												value={props.values.university}
												helperText={
													props.touched.university &&
													props.errors.university
												}
												error={
													props.touched.university &&
													props.errors.university
												}
											/>
										</Grid>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<CssTextField
												id="outlined-basic"
												label="Year of Passing"
												variant="outlined"
												type="text"
												name="yearOfPassing"
												style={{ width: '100%' }}
												size="small"
												inputProps={{ style: { fontSize: 14 } }}
												disabled={
													location.state?.isHiring ? true : false
												}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
												onChange={props.handleChange(
													'yearOfPassing'
												)}
												onBlur={props.handleBlur('yearOfPassing')}
												value={props.values.yearOfPassing}
												helperText={
													props.touched.yearOfPassing &&
													props.errors.yearOfPassing
												}
												error={
													props.touched.yearOfPassing &&
													props.errors.yearOfPassing
												}
											/>
										</Grid>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<CssTextField
												id="outlined-basic"
												label="Division"
												variant="outlined"
												style={{ width: '100%' }}
												type="text"
												size="small"
												name="division"
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
												disabled={
													location.state?.isHiring ? true : false
												}
												onChange={props.handleChange('division')}
												onBlur={props.handleBlur('division')}
												value={props.values.division}
												helperText={
													props.touched.division &&
													props.errors.division
												}
												error={
													props.touched.division &&
													props.errors.division
												}
											/>
										</Grid>
										<Grid
											item
											lg={12}
											md={12}
											sm={10}
											xs={11}
											style={{
												marginTop: '1rem',
												marginBottom: '3rem',
											}}
										>
											<Button
												variant="outlined"
												color="primary"
												classNames={classes.addMoreButton}
												text={
													academicQualificationsEdit
														? 'Edit'
														: 'Add'
												}
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
										className="table table-dark"
										style={{
											backgroundColor: '#d0cfcf',
											border: '1px solid grey',
										}}
									>
										<TableHead>
											<TableRow hover role="checkbox">
												<StyledTableCell align="center">
													Sr.No
												</StyledTableCell>
												<StyledTableCell align="center">
													Degree
												</StyledTableCell>
												<StyledTableCell align="center">
													University
												</StyledTableCell>
												<StyledTableCell align="center">
													Year Of Passing
												</StyledTableCell>
												<StyledTableCell align="center">
													Division
												</StyledTableCell>
												<StyledTableCell align="center">
													Action
												</StyledTableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{academicQualifications.length &&
												academicQualifications.map((el, i) => (
													<StyledTableRow key={i}>
														<StyledTableCell
															className="text-dark bg-light"
															align="center"
														>
															{i + 1}
														</StyledTableCell>
														<StyledTableCell
															className="text-dark bg-light"
															align="center"
														>
															{el.degree}
														</StyledTableCell>
														<StyledTableCell
															className="text-dark bg-light"
															align="center"
														>
															{el.university}
														</StyledTableCell>
														<StyledTableCell
															className="text-dark bg-light"
															align="center"
														>
															{el.yearOfPassing}
														</StyledTableCell>
														<StyledTableCell
															className="text-dark bg-light"
															align="center"
														>
															{el.division}
														</StyledTableCell>
														<StyledTableCell
															className="text-light bg-light"
															align="center"
														>
															<div
																style={{
																	display: 'flex',
																	justifyContent: 'center',
																}}
															>
																<Button
																	variant="contained"
																	text="Edit"
																	size="small"
																	classNames="bg-dark text-light"
																	onClick={() =>
																		editAcademicQualification(
																			el
																		)
																	}
																/>
																<Button
																	variant="contained"
																	text="Delete"
																	size="small"
																	color="secondary"
																	onClick={() =>
																		deleteAcademicQualification(
																			el.id
																		)
																	}
																	style={{
																		marginLeft: '1rem',
																	}}
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
						<h5 className="text-left">Professional Qualification</h5>
						<Formik
							initialValues={initialValuesForProfessionalQualification}
							validationSchema={
								validationSchemaForProfessionalQualification
							}
							onSubmit={addMoreProfessionalQualification}
						>
							{(props) => (
								<Form autoComplete="off">
									<Grid
										container
										spacing={1}
										style={{ marginTop: 15 }}
									>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<CssTextField
												id="outlined-basic"
												label="Degree/Certification"
												variant="outlined"
												type="text"
												disabled={
													location.state?.isHiring ? true : false
												}
												style={{ width: '100%' }}
												size="small"
												name="degree"
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
												onChange={props.handleChange('degree')}
												onBlur={props.handleBlur('degree')}
												value={props.values.degree}
												helperText={
													props.touched.degree &&
													props.errors.degree
												}
												error={
													props.touched.degree &&
													props.errors.degree
												}
											/>
										</Grid>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<CssTextField
												id="outlined-basic"
												label="Board/University"
												variant="outlined"
												type="text"
												size="small"
												style={{ width: '100%' }}
												name="university"
												inputProps={{ style: { fontSize: 14 } }}
												disabled={
													location.state?.isHiring ? true : false
												}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
												onChange={props.handleChange('university')}
												onBlur={props.handleBlur('university')}
												value={props.values.university}
												helperText={
													props.touched.university &&
													props.errors.university
												}
												error={
													props.touched.university &&
													props.errors.university
												}
											/>
										</Grid>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<CssTextField
												id="outlined-basic"
												label="Year of Passing"
												variant="outlined"
												style={{ width: '100%' }}
												type="text"
												size="small"
												disabled={
													location.state?.isHiring ? true : false
												}
												name="yearOfPassing"
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
												onChange={props.handleChange(
													'yearOfPassing'
												)}
												onBlur={props.handleBlur('yearOfPassing')}
												value={props.values.yearOfPassing}
												helperText={
													props.touched.yearOfPassing &&
													props.errors.yearOfPassing
												}
												error={
													props.touched.yearOfPassing &&
													props.errors.yearOfPassing
												}
											/>
										</Grid>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<CssTextField
												id="outlined-basic"
												label="Division"
												disabled={
													location.state?.isHiring ? true : false
												}
												variant="outlined"
												type="text"
												size="small"
												style={{ width: '100%' }}
												name="division"
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
												onChange={props.handleChange('division')}
												onBlur={props.handleBlur('division')}
												value={props.values.division}
												helperText={
													props.touched.division &&
													props.errors.division
												}
												error={
													props.touched.division &&
													props.errors.division
												}
											/>
										</Grid>
									</Grid>
									<Grid
										item
										lg={12}
										md={12}
										sm={10}
										xs={11}
										style={{
											marginTop: '1rem',
											marginBottom: '3rem',
										}}
									>
										<Button
											variant="outlined"
											color="primary"
											classNames={classes.addMoreButton}
											text={
												professionalQualificationEdit
													? 'Edit'
													: 'Add'
											}
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
										className="table table-dark"
										style={{
											backgroundColor: '#d0cfcf',
											border: '1px solid grey',
										}}
									>
										<TableHead>
											<TableRow hover role="checkbox">
												<StyledTableCell align="center">
													Sr.No
												</StyledTableCell>
												<StyledTableCell align="center">
													Degree
												</StyledTableCell>
												<StyledTableCell align="center">
													University
												</StyledTableCell>
												<StyledTableCell align="center">
													Year Of Passing
												</StyledTableCell>
												<StyledTableCell align="center">
													Division
												</StyledTableCell>
												<StyledTableCell align="center">
													Action
												</StyledTableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{professionalQualification.length &&
												professionalQualification.map((el, i) => (
													<StyledTableRow key={i}>
														<StyledTableCell
															className="text-dark bg-light"
															align="center"
														>
															{i + 1}
														</StyledTableCell>
														<StyledTableCell
															className="text-dark bg-light"
															align="center"
														>
															{el.degree}
														</StyledTableCell>
														<StyledTableCell
															className="text-dark bg-light"
															align="center"
														>
															{el.university}
														</StyledTableCell>
														<StyledTableCell
															className="text-dark bg-light"
															align="center"
														>
															{el.yearOfPassing}
														</StyledTableCell>
														<StyledTableCell
															className="text-dark bg-light"
															align="center"
														>
															{el.division}
														</StyledTableCell>
														<StyledTableCell
															className="text-light bg-light"
															align="center"
														>
															<div
																style={{
																	display: 'flex',
																	justifyContent: 'center',
																}}
															>
																<Button
																	variant="contained"
																	text="Edit"
																	size="small"
																	classNames="bg-dark text-light"
																	onClick={() =>
																		editProfessionalQualification(
																			el
																		)
																	}
																/>
																<Button
																	variant="contained"
																	text="Delete"
																	size="small"
																	color="secondary"
																	onClick={() =>
																		deleteProfessionalQualification(
																			el.id
																		)
																	}
																	style={{
																		marginLeft: '1rem',
																	}}
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
						<h5 className="text-left">
							Experience (Recent First) in Relevant Field
						</h5>
						<Formik
							initialValues={initialValuesForExperience}
							validationSchema={validationSchemaForExperience}
							enableReinitialize
							onSubmit={addMoreExperience}
						>
							{(props) => (
								<Form autoComplete="off">
									<Grid
										container
										spacing={1}
										style={{ marginTop: 15 }}
									>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<CssTextField
												id="outlined-basic"
												label="Company Name"
												variant="outlined"
												disabled={
													location.state?.isHiring ? true : false
												}
												type="text"
												size="small"
												style={{ width: '100%' }}
												name="companyName"
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
												onChange={props.handleChange('companyName')}
												onBlur={props.handleBlur('companyName')}
												value={props.values.companyName}
												helperText={
													props.touched.companyName &&
													props.errors.companyName
												}
												error={
													props.touched.companyName &&
													props.errors.companyName
												}
											/>
										</Grid>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<CssTextField
												id="outlined-basic"
												label="Company Address"
												variant="outlined"
												type="text"
												disabled={
													location.state?.isHiring ? true : false
												}
												size="small"
												style={{ width: '100%' }}
												name="companyAddress"
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
												onChange={props.handleChange(
													'companyAddress'
												)}
												onBlur={props.handleBlur('companyAddress')}
												value={props.values.companyAddress}
												helperText={
													props.touched.companyAddress &&
													props.errors.companyAddress
												}
												error={
													props.touched.companyAddress &&
													props.errors.companyAddress
												}
											/>
										</Grid>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<CssTextField
												id="outlined-basic"
												label="Last Salary"
												variant="outlined"
												disabled={
													location.state?.isHiring ? true : false
												}
												type="number"
												size="small"
												style={{ width: '100%' }}
												name="from"
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
												onChange={props.handleChange('lastSalary')}
												onBlur={props.handleBlur('lastSalary')}
												value={props.values.lastSalary}
												helperText={
													props.touched.lastSalary &&
													props.errors.lastSalary
												}
												error={
													props.touched.lastSalary &&
													props.errors.lastSalary
												}
											/>
										</Grid>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<CssTextField
												id="outlined-basic"
												label="Reason of Left"
												variant="outlined"
												type="text"
												disabled={
													location.state?.isHiring ? true : false
												}
												size="small"
												style={{ width: '100%' }}
												name="to"
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
												onChange={props.handleChange(
													'reasonOfLeft'
												)}
												onBlur={props.handleBlur('reasonOfLeft')}
												value={props.values.reasonOfLeft}
												helperText={
													props.touched.reasonOfLeft &&
													props.errors.reasonOfLeft
												}
												error={
													props.touched.reasonOfLeft &&
													props.errors.reasonOfLeft
												}
											/>
										</Grid>
										<Grid container spacing={1} className="mt-1">
											<Grid item lg={3} md={3} sm={12} xs={12}>
												<CssTextField
													id="outlined-basic"
													variant="outlined"
													label="From"
													type="date"
													size="small"
													disabled={
														location.state?.isHiring
															? true
															: false
													}
													style={{ width: '100%' }}
													name="lastSalary"
													inputProps={{ style: { fontSize: 14 } }}
													InputLabelProps={{
														style: { fontSize: 14 },
													}}
													onChange={props.handleChange('from')}
													onBlur={props.handleBlur('from')}
													value={props.values.from}
													helperText={
														props.touched.from &&
														props.errors.from
													}
													error={
														props.touched.from &&
														props.errors.from
													}
												/>
											</Grid>
											<Grid item lg={3} md={3} sm={12} xs={12}>
												<CssTextField
													id="outlined-basic"
													variant="outlined"
													disabled={
														location.state?.isHiring
															? true
															: false
													}
													type="date"
													size="small"
													name="reasonOfLeft"
													label="To"
													style={{ width: '100%' }}
													inputProps={{ style: { fontSize: 14 } }}
													InputLabelProps={{
														style: { fontSize: 14 },
													}}
													onChange={props.handleChange('to')}
													onBlur={props.handleBlur('to')}
													value={props.values.to}
													helperText={
														props.touched.to && props.errors.to
													}
													error={
														props.touched.to && props.errors.to
													}
												/>
											</Grid>
											<Grid item lg={3} md={3} sm={12} xs={12}>
												<CssTextField
													id="outlined-basic"
													variant="outlined"
													label="Select Experience level"
													type="text"
													size="small"
													disabled={
														location.state?.isHiring
															? true
															: false
													}
													select
													style={{ width: '100%' }}
													name="experienceLevel"
													inputProps={{ style: { fontSize: 14 } }}
													InputLabelProps={{
														style: { fontSize: 14 },
													}}
													onChange={props.handleChange(
														'experienceLevel'
													)}
													onBlur={props.handleBlur(
														'experienceLevel'
													)}
													value={props.values.experienceLevel}
													helperText={
														props.touched.experienceLevel &&
														props.errors.experienceLevel
													}
													error={
														props.touched.experienceLevel &&
														props.errors.experienceLevel
													}
												>
													{!experiencesState ||
													!experiencesState.length ? (
														<p>Data Not Found</p>
													) : (
														experiencesState.map(
															(experience, i) => (
																<MenuItem
																	value={experience.name}
																	key={i}
																>
																	{experience.name}
																</MenuItem>
															)
														)
													)}
												</CssTextField>
											</Grid>
											<Grid item lg={12} md={12} sm={10} xs={11}>
												<Button
													variant="outlined"
													color="primary"
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
										className="table table-dark"
										style={{
											backgroundColor: '#d0cfcf',
											border: '1px solid grey',
										}}
									>
										<TableHead>
											<TableRow hover role="checkbox">
												<StyledTableCell align="center">
													Sr.No
												</StyledTableCell>
												<StyledTableCell align="center">
													Company Name
												</StyledTableCell>
												<StyledTableCell align="center">
													Company Address
												</StyledTableCell>
												<StyledTableCell align="center">
													Last Salary
												</StyledTableCell>
												<StyledTableCell align="center">
													Reason Of Left
												</StyledTableCell>
												<StyledTableCell align="center">
													From
												</StyledTableCell>
												<StyledTableCell align="center">
													To
												</StyledTableCell>
												<StyledTableCell align="center">
													Experience Level
												</StyledTableCell>
												<StyledTableCell align="center">
													Action
												</StyledTableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{experience.length &&
												experience.map((el, i) => (
													<StyledTableRow key={i}>
														<StyledTableCell
															className="text-dark bg-light"
															align="center"
														>
															{i + 1}
														</StyledTableCell>
														<StyledTableCell
															className="text-dark bg-light"
															align="center"
														>
															{el.companyName}
														</StyledTableCell>
														<StyledTableCell
															className="text-dark bg-light"
															align="center"
														>
															{el.companyAddress}
														</StyledTableCell>
														<StyledTableCell
															className="text-dark bg-light"
															align="center"
														>
															{el.lastSalary}
														</StyledTableCell>
														<StyledTableCell
															className="text-dark bg-light"
															align="center"
														>
															{el.reasonOfLeft}
														</StyledTableCell>
														<StyledTableCell
															className="text-dark bg-light"
															align="center"
														>
															{el.from}
														</StyledTableCell>
														<StyledTableCell
															className="text-dark bg-light"
															align="center"
														>
															{el.to}
														</StyledTableCell>
														<StyledTableCell
															className="text-dark bg-light"
															align="center"
														>
															{location.state?.toUpdate
																? el.experienceLevel.name
																: el.experienceLevel}
														</StyledTableCell>
														<StyledTableCell
															className="text-light bg-light"
															align="center"
														>
															<div
																style={{
																	display: 'flex',
																	justifyContent: 'center',
																}}
															>
																<Button
																	variant="contained"
																	text="Edit"
																	size="small"
																	classNames="bg-dark text-light"
																	onClick={() =>
																		editExperience(el)
																	}
																/>
																<Button
																	variant="contained"
																	text="Delete"
																	size="small"
																	color="secondary"
																	onClick={() =>
																		deleteExperience(el.id)
																	}
																	style={{
																		marginLeft: '1rem',
																	}}
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
					<form onSubmit={onSubmit}>
						<Formik
							initialValues={initialValueStateForReference}
							enableReinitialize
							validationSchema={validationForReference}
						>
							{(props) => {
								referenceForm = props;
								return (
									<Container className={classes.mainContainer}>
										<h5 className="text-left">Reference</h5>
										<Grid
											container
											spacing={1}
											style={{ marginTop: 15 }}
										>
											<Grid item lg={4} md={4} sm={12} xs={12}>
												<FastField name="name">
													{({ meta, field }) => (
														<CssTextField
															id="outlined-basic"
															disabled={
																location.state?.isHiring
																	? true
																	: false
															}
															label="Name"
															variant="outlined"
															type="text"
															size="small"
															autocomplete="off"
															style={{ width: '100%' }}
															inputProps={{
																style: { fontSize: 14 },
															}}
															InputLabelProps={{
																style: { fontSize: 14 },
															}}
															{...field}
															helperText={
																meta.touched && meta.error
															}
															error={meta.touched && meta.error}
														/>
													)}
												</FastField>
											</Grid>
											<Grid item lg={4} md={4} sm={12} xs={12}>
												<FastField name="contactNo">
													{({ meta, field }) => (
														<CssTextField
															id="outlined-basic"
															label="Contact No"
															variant="outlined"
															disabled={
																location.state?.isHiring
																	? true
																	: false
															}
															type="number"
															size="small"
															autocomplete="off"
															style={{ width: '100%' }}
															inputProps={{
																style: { fontSize: 14 },
															}}
															InputLabelProps={{
																style: { fontSize: 14 },
															}}
															{...field}
															helperText={
																meta.touched && meta.error
															}
															error={meta.touched && meta.error}
														/>
													)}
												</FastField>
											</Grid>
											<Grid item lg={4} md={4} sm={12} xs={12}>
												<FastField name="address">
													{({ meta, field }) => (
														<CssTextField
															id="outlined-basic"
															label="Address"
															variant="outlined"
															type="text"
															size="small"
															disabled={
																location.state?.isHiring
																	? true
																	: false
															}
															autocomplete="off"
															style={{ width: '100%' }}
															inputProps={{
																style: { fontSize: 14 },
															}}
															InputLabelProps={{
																style: { fontSize: 14 },
															}}
															{...field}
															helperText={
																meta.touched && meta.error
															}
															error={meta.touched && meta.error}
														/>
													)}
												</FastField>
											</Grid>
										</Grid>
									</Container>
								);
							}}
						</Formik>
						<div style={{ marginTop: 30, marginBottom: 30 }}>
							<hr />
						</div>
						<Formik
							initialValues={initialValueStateForOfficeUse}
							enableReinitialize
							validationSchema={validationForOfficeUse}
						>
							{(props) => {
								officeUseForm = props;
								return (
									<Container className={classes.mainContainer}>
										<h5 className="text-left">For Office Use Only</h5>
										<Grid
											container
											spacing={1}
											style={{ marginTop: 15 }}
										>
											<Grid item lg={3} md={3} sm={12} xs={12}>
												<FastField name="dateOfInterviewed">
													{({ meta, field }) => (
														<CssTextField
															id="outlined-basic"
															variant="outlined"
															label="Date of Interviewd"
															type="date"
															size="small"
															autocomplete="off"
															disabled={
																location.state?.isHiring
																	? true
																	: false
															}
															style={{ width: '100%' }}
															inputProps={{
																style: { fontSize: 14 },
															}}
															InputLabelProps={{
																style: { fontSize: 14 },
															}}
															{...field}
															helperText={
																meta.touched && meta.error
															}
															error={meta.touched && meta.error}
														/>
													)}
												</FastField>
											</Grid>
											<Grid item lg={3} md={3} sm={12} xs={12}>
												<FastField name="remarks">
													{({ meta, field }) => (
														<CssTextField
															id="outlined-basic"
															label="Remarks"
															variant="outlined"
															type="text"
															size="small"
															autocomplete="off"
															style={{ width: '100%' }}
															inputProps={{
																style: { fontSize: 14 },
															}}
															disabled={
																location.state?.isHiring
																	? true
																	: false
															}
															InputLabelProps={{
																style: { fontSize: 14 },
															}}
															{...field}
															helperText={
																meta.touched && meta.error
															}
															error={meta.touched && meta.error}
														/>
													)}
												</FastField>
											</Grid>
											<Grid item lg={3} md={3} sm={12} xs={12}>
												<FastField name="recommended">
													{({ meta, field }) => (
														<CssTextField
															id="outlined-basic"
															label="Recommended"
															variant="outlined"
															type="text"
															disabled={
																location.state?.isHiring
																	? true
																	: false
															}
															size="small"
															select
															autocomplete="off"
															style={{ width: '100%' }}
															inputProps={{
																style: { fontSize: 14 },
															}}
															InputLabelProps={{
																style: { fontSize: 14 },
															}}
															{...field}
															helperText={
																meta.touched && meta.error
															}
															error={meta.touched && meta.error}
														>
															<MenuItem value="true">
																Yes
															</MenuItem>
															<MenuItem value="false">
																No
															</MenuItem>
														</CssTextField>
													)}
												</FastField>
											</Grid>
											<Grid item lg={3} md={3} sm={12} xs={12}>
												<FastField name="jobTitle">
													{({ meta, field }) => (
														<CssTextField
															disabled={
																location.state?.isHiring
																	? true
																	: false
															}
															id="outlined-basic"
															label="Job Title"
															variant="outlined"
															type="text"
															size="small"
															autocomplete="off"
															style={{ width: '100%' }}
															inputProps={{
																style: { fontSize: 14 },
															}}
															InputLabelProps={{
																style: { fontSize: 14 },
															}}
															{...field}
															helperText={
																meta.touched && meta.error
															}
															error={meta.touched && meta.error}
														/>
													)}
												</FastField>
											</Grid>
										</Grid>
										<Grid
											container
											spacing={1}
											style={{ marginTop: 15 }}
										>
											<Grid item lg={3} md={3} sm={12} xs={12}>
												<FastField name="department">
													{({ meta, field }) => (
														<CssTextField
															disabled={
																location.state?.isHiring
																	? true
																	: false
															}
															id="outlined-basic"
															label="Department"
															variant="outlined"
															type="text"
															size="small"
															select
															autocomplete="off"
															style={{ width: '100%' }}
															inputProps={{
																style: { fontSize: 14 },
															}}
															InputLabelProps={{
																style: { fontSize: 14 },
															}}
															{...field}
															helperText={
																meta.touched && meta.error
															}
															error={meta.touched && meta.error}
														>
															{departments.map(
																(department, i) => (
																	<MenuItem
																		value={department._id}
																		key={i}
																	>
																		{department.name}
																	</MenuItem>
																)
															)}
														</CssTextField>
													)}
												</FastField>
											</Grid>

											<Grid item lg={3} md={3} sm={12} xs={12}>
												<FastField name="recommendedSalary">
													{({ meta, field }) => (
														<CssTextField
															id="outlined-basic"
															label="Recommended Salary"
															variant="outlined"
															type="number"
															disabled={
																location.state?.isHiring
																	? true
																	: false
															}
															size="small"
															autocomplete="off"
															style={{ width: '100%' }}
															inputProps={{
																style: { fontSize: 14 },
															}}
															InputLabelProps={{
																style: { fontSize: 14 },
															}}
															{...field}
															helperText={
																meta.touched && meta.error
															}
															error={meta.touched && meta.error}
														/>
													)}
												</FastField>
											</Grid>
											<Grid item lg={3} md={3} sm={12} xs={12}>
												<FastField name="approved">
													{({ meta, field }) => (
														<CssTextField
															id="outlined-basic"
															label="Approved"
															variant="outlined"
															type="text"
															size="small"
															select
															disabled={
																location.state?.isHiring
																	? true
																	: false
															}
															autocomplete="off"
															style={{ width: '100%' }}
															inputProps={{
																style: { fontSize: 14 },
															}}
															InputLabelProps={{
																style: { fontSize: 14 },
															}}
															{...field}
															helperText={
																meta.touched && meta.error
															}
															error={meta.touched && meta.error}
														>
															<MenuItem value="Yes">
																Yes
															</MenuItem>
															<MenuItem value="No">No</MenuItem>
														</CssTextField>
													)}
												</FastField>
											</Grid>
										</Grid>
									</Container>
								);
							}}
						</Formik>
						<Button
							variant="outlined"
							color="primary"
							text={
								location.state?.isHiring
									? 'Hire'
									: location.state?.toUpdate
									? 'Update'
									: 'Add'
							}
							classNames={classes.addButton}
							loading={
								location.state?.toUpdate ? updateLoading : createLoading
							}
							loaderColor="#333"
						/>
						{success && <p>{success}</p>}
						{createError && (
							<p className="text-light bg-danger">{createError}</p>
						)}
						{hireError && (
							<p className="text-light bg-danger">{hireError}</p>
						)}
					</form>
				</Container>
			</div>
		</Sidenav>
	);
};

export default Employees;
