import React, { useState, useEffect } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '../../../components/utils/Button';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import {
	getVendorAction,
	updateVendorAction,
} from '../../../services/action/VendorAction';
import { getPersons } from '../../../services/action/PersonAction';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { capitalize } from '../../../utils/capitalize';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: '25ch',
		},
	},
	mainContainer: {
		[theme.breakpoints.up('md')]: {
			marginLeft: 0,
			marginTop: 15,
		},
		[theme.breakpoints.down('sm')]: {
			marginTop: -5,
		},
	},
	submitButton: {
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
			width: '25%',
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
			marginLeft: 25,
		},
		[theme.breakpoints.down('sm')]: {
			marginLeft: 0,
		},
	},
	inputFieldStyle: {
		[theme.breakpoints.up('md')]: {
			width: 250,
		},
		[theme.breakpoints.down('sm')]: {
			width: 200,
			marginLeft: 15,
		},
	},
	inputFieldStyle1: {
		[theme.breakpoints.up('md')]: {
			width: 250,
		},
		[theme.breakpoints.down('sm')]: {
			width: 200,
			marginLeft: 15,
		},
	},
	inputFieldStyle2: {
		[theme.breakpoints.up('md')]: {
			width: 100,
			marginLeft: -70,
		},
		[theme.breakpoints.down('sm')]: {
			width: 200,
			marginLeft: 10,
		},
	},
	questinOne: {
		[theme.breakpoints.up('md')]: {
			marginLeft: 30,
			marginTop: 15,
		},
		[theme.breakpoints.down('sm')]: {},
	},
	select: {
		'&:before': {
			borderColor: 'red',
		},
		'&:hover:not(.Mui-disabled):before': {
			borderColor: 'red',
		},
		[theme.breakpoints.up('md')]: {
			width: 400,
		},
		[theme.breakpoints.down('sm')]: {
			width: 200,
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
	contactPerson: '',
	phone: '',
	location: '',
	name: '',
	productServices: '',
	supplierStatus: '',
};

const validationSchema = yup.object({
	contactPerson: yup.string().required(),
	phone: yup.string().required(),
	location: yup.string().required(),
	name: yup.string().required(),
	productServices: yup.string().required(),
	supplierStatus: yup.string().required(),
});

const sectionBFormInitialValues = {
	registered: false,
	quality: false,
	testingIncoming: false,
	testingProcess: false,
	testingFinal: false,
	rating: 1,
	controlNonConfirming: '',
	customerComplaintSystem: false,
	majorCustomers: '',
	informationProvidedByName: '',
	informationProvidedByDesignation: '',
};

const SupplierEvalForm = ({ history }) => {
	const classes = useStyles();
	const [initialValuesState, setInitialValuesState] = useState({
		...initialValues,
	});
	const [vendor, setVendor] = React.useState({});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	let sectionB = null;
	let sectionC = null;
	let sectionD = null;
	let sectionE = null;
	let sectionF = null;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getPersons());
		dispatch(getVendorAction(`verified=false`));
	}, [dispatch]);

	const { vendors } = useSelector((state) => state.vendors);

	const onSubmit = (values) => {
		console.log('values', values);
		console.log('section B', sectionB.values);
		// values = {
		// 	...form.values,
		// };
		// setLoading(true);
		// dispatch(
		// 	updateVendorAction(vendor?._id, values, (err, verfied) => {
		// 		if (err) {
		// 			setError(err);
		// 			setTimeout(() => {
		// 				setError('');
		// 			}, 4000);
		// 		} else {
		// 			if (verfied) {
		// 				setSuccess('vendor is verfied');
		// 				setTimeout(() => {
		// 					setSuccess(false);
		// 				}, 4000);
		// 			} else {
		// 				setSuccess('vendor is not verfied');
		// 				setTimeout(() => {
		// 					setSuccess(false);
		// 				}, 4000);
		// 				dispatch(getVendorAction(`verified=false`));
		// 			}
		// 		}
		// 		setLoading(false);
		// 	}),
		// );
	};

	return (
		<Sidenav title={'Supplier Evaluation Form'}>
			<div>
				<Grid container spacing={1}>
					<Grid item lg={10} md={10} sm={2} xs={2}></Grid>
					<Grid item lg={2} md={2} sm={2} xs={2}>
						<Button
							variant='contained'
							size='small'
							text='View Supplier Eval Forms'
							classNames='bg-dark text-light'
							style={{ textTransform: 'capitalize' }}
							onClick={() => {
								history.push('/purchase/supplier_eval/view_supplier_evaluation_form');
							}}
						/>
					</Grid>
				</Grid>
				<h5 className='text-center'>Section-A (Company Data)</h5>
				<Formik
					initialValues={initialValuesState}
					enableReinitialize
					// validationSchema={validationSchema}
					onSubmit={onSubmit}>
					{(props) => (
						<Form>
							<Container className={classes.mainContainer}>
								<Grid container spacing={1} style={{ marginTop: 15 }}>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id='outlined-basic'
											label='Select Vendor Name*'
											variant='outlined'
											type='email'
											size='small'
											style={{ width: '100%' }}
											select
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('name')}
											onBlur={props.handleBlur('name')}
											value={props.values.name}
											helperText={props.touched.name && props.errors.name}
											error={props.touched.name && props.errors.name}>
											{!vendors || !vendors.length ? (
												<p>Data Not Found</p>
											) : (
												vendors.map((el) => (
													<MenuItem
														value={el._id}
														key={el._id}
														onClick={() => {
															setVendor(el);
															setInitialValuesState({
																name: el?._id,
																location: el?.location,
																phone: el?.phone,
																contactPerson: el?.contactPerson,
																...props.values,
															});
														}}>
														{capitalize(el.name)}
													</MenuItem>
												))
											)}
										</CssTextField>
									</Grid>
								</Grid>
							</Container>
							<Container className={classes.mainContainer}>
								<Grid container spacing={1}>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										{!vendor.materials || !vendor.materials.length ? (
											<p>Please select any vendor</p>
										) : (
											vendor.materials.map((vendorMat) => (
												<FormControlLabel
													disabled
													label={vendorMat.name}
													control={<Checkbox checked name='checkedE' />}
												/>
											))
										)}
									</Grid>
								</Grid>
							</Container>
							<Container className={classes.mainContainer}>
								<Grid container spacing={1} style={{ marginTop: 15 }}>
									<Grid item lg={2} md={2} sm={12} xs={12}>
										<CssTextField
											id='outlined-basic'
											label='Contact No.'
											variant='outlined'
											type='email'
											style={{ width: '100%' }}
											size='small'
											disabled
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('phone')}
											onBlur={props.handleBlur('phone')}
											value={props.values.phone}
											helperText={props.touched.phone && props.errors.phone}
											error={props.touched.phone && props.errors.phone}
										/>
									</Grid>
									<Grid item lg={2} md={2} sm={12} xs={12}>
										<CssTextField
											id='outlined-basic'
											label='Contact Person'
											variant='outlined'
											type='text'
											size='small'
											disabled
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('contactPerson')}
											onBlur={props.handleBlur('contactPerson')}
											value={props.values.contactPerson}
											helperText={
												props.touched.contactPerson && props.errors.contactPerson
											}
											error={props.touched.contactPerson && props.errors.contactPerson}
										/>
									</Grid>
									<Grid item lg={2} md={2} sm={12} xs={12}>
										<CssTextField
											id='outlined-basic'
											label='Address'
											variant='outlined'
											style={{ width: '100%' }}
											type='email'
											size='small'
											disabled
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('location')}
											onBlur={props.handleBlur('location')}
											value={props.values.location}
											helperText={props.touched.location && props.errors.location}
											error={props.touched.location && props.errors.location}
										/>
									</Grid>
									<Grid item lg={2} md={2} sm={12} xs={12}>
										<CssTextField
											id='outlined-basic'
											label='Product/Services'
											variant='outlined'
											style={{ width: '100%' }}
											type='text'
											size='small'
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('productServices')}
											onBlur={props.handleBlur('productServices')}
											value={props.values.productServices}
											helperText={
												props.touched.productServices && props.errors.productServices
											}
											error={props.touched.productServices && props.errors.productServices}
										/>
									</Grid>
									<Grid item lg={2} md={2} sm={12} xs={12}>
										<CssTextField
											id='outlined-basic'
											label='Supplier Status'
											variant='outlined'
											style={{ width: '100%' }}
											type='text'
											size='small'
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('supplierStatus')}
											onBlur={props.handleBlur('supplierStatus')}
											value={props.values.supplierStatus}
											helperText={
												props.touched.supplierStatus && props.errors.supplierStatus
											}
											error={props.touched.supplierStatus && props.errors.supplierStatus}
										/>
									</Grid>
								</Grid>
							</Container>
						</Form>
					)}
				</Formik>
				<Formik
					initialValues={sectionBFormInitialValues}
					// validationSchema={validationSchemaForQualityCheck}
				>
					{(props) => {
						sectionB = props;
						return (
							<Form autoComplete='off'>
								<h5 className='text-center mt-5'>Section-B (Quality System)</h5>
								<Container className={classes.mainContainer}>
									<Grid container spacing={1} style={{ marginTop: 15 }}>
										<Grid item lg={2} md={2} sm={12} xs={12}></Grid>
										<Grid item lg={8} md={8} sm={12} xs={12}>
											<h6 className={classes.questinOne}>
												1. Are you registered to ISO 9001/ API?
											</h6>
										</Grid>
										<Grid item lg={2} md={3} sm={12} xs={12}>
											<CssTextField
												id='outlined-basic'
												label='Ans'
												variant='outlined'
												type='email'
												size='small'
												select
												className={classes.inputField}
												size='small'
												select
												className={classes.inputFieldStyle2}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
												onChange={props.handleChange('registered')}
												onBlur={props.handleBlur('registered')}
												value={props.values.registered}
												helperText={props.touched.registered && props.errors.registered}
												error={props.touched.registered && props.errors.registered}>
												<MenuItem value=''>
													<em>None</em>
												</MenuItem>
												<MenuItem value={true}>Yes</MenuItem>
												<MenuItem value={false}>No</MenuItem>
											</CssTextField>
										</Grid>
									</Grid>
									<Grid container spacing={1} style={{ marginTop: 15 }}>
										<Grid item lg={2} md={2} sm={12} xs={12}></Grid>
										<Grid item lg={8} md={8} sm={12} xs={12}>
											<h6 className={classes.questinOne}>
												2. Do you have Quality Management / Quality Assurance System?
											</h6>
										</Grid>
										<Grid item lg={2} md={2} sm={12} xs={12}>
											<CssTextField
												id='outlined-basic'
												label='Ans'
												variant='outlined'
												type='email'
												size='small'
												select
												className={classes.inputFieldStyle2}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
												onChange={props.handleChange('quality')}
												onBlur={props.handleBlur('quality')}
												value={props.values.quality}
												helperText={props.touched.quality && props.errors.quality}
												error={props.touched.quality && props.errors.quality}>
												<MenuItem value=''>
													<em>None</em>
												</MenuItem>
												<MenuItem value={true}>Yes</MenuItem>
												<MenuItem value={false}>No</MenuItem>
											</CssTextField>
										</Grid>
									</Grid>
									<Grid container spacing={1} style={{ marginTop: 15 }}>
										<Grid item lg={2} md={2} sm={12} xs={12}></Grid>
										<Grid item lg={7} md={7} sm={12} xs={12}>
											<h6 className={classes.questinOne}>
												3. Do you perform inspection and testing it?
											</h6>
										</Grid>
									</Grid>
									<Grid container spacing={1}>
										<Grid item lg={2} md={2} sm={12} xs={12}></Grid>
										<Grid
											item
											lg={8}
											md={8}
											sm={12}
											xs={12}
											style={{ marginTop: '0.5rem' }}>
											<h6 className={classes.questinOne} style={{ marginLeft: '3rem' }}>
												a. Incoming stage?
											</h6>
										</Grid>
										<Grid item lg={2} md={3} sm={12} xs={12}>
											<CssTextField
												id='outlined-basic'
												label='Ans'
												variant='outlined'
												type='text'
												size='small'
												select
												className={classes.inputFieldStyle2}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
												onChange={props.handleChange('testingIncoming')}
												onBlur={props.handleBlur('testingIncoming')}
												value={props.values.testingIncoming}
												helperText={
													props.touched.testingIncoming && props.errors.testingIncoming
												}
												error={
													props.touched.testingIncoming && props.errors.testingIncoming
												}>
												<MenuItem value=''>
													<em>None</em>
												</MenuItem>
												<MenuItem value={true}>Yes</MenuItem>
												<MenuItem value={false}>No</MenuItem>
											</CssTextField>
										</Grid>
									</Grid>
									<Grid container spacing={1}>
										<Grid item lg={2} md={2} sm={12} xs={12}></Grid>
										<Grid
											item
											lg={8}
											md={8}
											sm={12}
											xs={12}
											style={{ marginTop: '0.5rem' }}>
											<h6 className={classes.questinOne} style={{ marginLeft: '3rem' }}>
												b. In process state?
											</h6>
										</Grid>
										<Grid item lg={2} md={3} sm={12} xs={12}>
											<CssTextField
												id='outlined-basic'
												label='Ans'
												variant='outlined'
												type='text'
												size='small'
												select
												className={classes.inputFieldStyle2}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
												onChange={props.handleChange('testingProcess')}
												onBlur={props.handleBlur('testingProcess')}
												value={props.values.testingProcess}
												helperText={
													props.touched.testingProcess && props.errors.testingProcess
												}
												error={props.touched.testingProcess && props.errors.testingProcess}>
												<MenuItem value=''>
													<em>None</em>
												</MenuItem>
												<MenuItem value={true}>Yes</MenuItem>
												<MenuItem value={false}>No</MenuItem>
											</CssTextField>
										</Grid>
									</Grid>
									<Grid container spacing={1}>
										<Grid item lg={2} md={2} sm={12} xs={12}></Grid>
										<Grid
											item
											lg={8}
											md={8}
											sm={12}
											xs={12}
											style={{ marginTop: '0.5rem' }}>
											<h6 className={classes.questinOne} style={{ marginLeft: '3rem' }}>
												c. Final state?
											</h6>
										</Grid>
										<Grid item lg={2} md={3} sm={12} xs={12}>
											<CssTextField
												id='outlined-basic'
												label='Ans'
												variant='outlined'
												type='text'
												size='small'
												select
												className={classes.inputFieldStyle2}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
												onChange={props.handleChange('testingFinal')}
												onBlur={props.handleBlur('testingFinal')}
												value={props.values.testingFinal}
												helperText={props.touched.testingFinal && props.errors.testingFinal}
												error={props.touched.testingFinal && props.errors.testingFinal}>
												<MenuItem value=''>
													<em>None</em>
												</MenuItem>
												<MenuItem value={true}>Yes</MenuItem>
												<MenuItem value={false}>No</MenuItem>
											</CssTextField>
										</Grid>
									</Grid>
									<Grid container spacing={1} style={{ marginTop: 15 }}>
										<Grid item lg={2} md={2} sm={12} xs={12}></Grid>
										<Grid item lg={8} md={8} sm={12} xs={12}>
											<h6 className={classes.questinOne}>
												4. How do you control Non-Confirming products?
											</h6>
										</Grid>
										<Grid item lg={2} md={3} sm={12} xs={12}>
											<CssTextField
												id='outlined-basic'
												label='Ans'
												variant='outlined'
												type='text'
												size='small'
												autoComplete='off'
												className={classes.inputFieldStyle2}
												inputProps={{ style: { fontSize: 14 } }}
												onChange={props.handleChange('controlNonConfirming')}
												onBlur={props.handleBlur('controlNonConfirming')}
												value={props.values.controlNonConfirming}
												helperText={
													props.touched.controlNonConfirming &&
													props.errors.controlNonConfirming
												}
												error={
													props.touched.controlNonConfirming &&
													props.errors.controlNonConfirming
												}
												InputLabelProps={{ style: { fontSize: 14 } }}></CssTextField>
										</Grid>
									</Grid>
									<Grid container spacing={1} style={{ marginTop: 15 }}>
										<Grid item lg={2} md={2} sm={12} xs={12}></Grid>
										<Grid item lg={8} md={8} sm={12} xs={12}>
											<h6 className={classes.questinOne}>
												5. How do you rate the skills and training of your personnel?
											</h6>
										</Grid>
										<Grid item lg={2} md={3} sm={12} xs={12}>
											<CssTextField
												id='outlined-basic'
												label='Ans'
												variant='outlined'
												type='text'
												size='small'
												select
												className={classes.inputFieldStyle2}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
												onChange={props.handleChange('rating')}
												onBlur={props.handleBlur('rating')}
												value={props.values.rating}
												helperText={props.touched.rating && props.errors.rating}
												error={props.touched.rating && props.errors.rating}>
												<MenuItem value=''>
													<em>None</em>
												</MenuItem>
												<MenuItem value={1}>Low</MenuItem>
												<MenuItem value={2}>Medium</MenuItem>
												<MenuItem value={3}>High</MenuItem>
											</CssTextField>
										</Grid>
									</Grid>
									<Grid container spacing={1} style={{ marginTop: 15 }}>
										<Grid item lg={2} md={2} sm={12} xs={12}></Grid>
										<Grid item lg={8} md={8} sm={12} xs={12}>
											<h6 className={classes.questinOne}>
												6. Do you have a customer complaint system?
											</h6>
										</Grid>
										<Grid item lg={2} md={3} sm={12} xs={12}>
											<CssTextField
												id='outlined-basic'
												label='Ans'
												variant='outlined'
												type='text'
												size='small'
												select
												className={classes.inputFieldStyle2}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
												onChange={props.handleChange('customerComplaintSystem')}
												onBlur={props.handleBlur('customerComplaintSystem')}
												value={props.values.customerComplaintSystem}
												helperText={
													props.touched.customerComplaintSystem &&
													props.errors.customerComplaintSystem
												}
												error={
													props.touched.customerComplaintSystem &&
													props.errors.customerComplaintSystem
												}>
												<MenuItem value=''>
													<em>None</em>
												</MenuItem>
												<MenuItem value={true}>Yes</MenuItem>
												<MenuItem value={false}>No</MenuItem>
											</CssTextField>
										</Grid>
									</Grid>
									<Grid container spacing={1} style={{ marginTop: 15 }}>
										<Grid item lg={2} md={2} sm={12} xs={12}></Grid>
										<Grid item lg={8} md={8} sm={12} xs={12}>
											<h6 className={classes.questinOne}>
												7. What are your major customers?
											</h6>
										</Grid>
										<Grid item lg={2} md={3} sm={12} xs={12}>
											<CssTextField
												id='outlined-basic'
												label='Ans'
												variant='outlined'
												type='text'
												size='small'
												autoComplete='off'
												className={classes.inputFieldStyle2}
												inputProps={{ style: { fontSize: 14 } }}
												onChange={props.handleChange('majorCustomers')}
												onBlur={props.handleBlur('majorCustomers')}
												value={props.values.majorCustomers}
												helperText={
													props.touched.majorCustomers && props.errors.majorCustomers
												}
												error={props.touched.majorCustomers && props.errors.majorCustomers}
												InputLabelProps={{ style: { fontSize: 14 } }}></CssTextField>
										</Grid>
									</Grid>
									<Grid container spacing={1} style={{ marginTop: 15 }}>
										<Grid item lg={2} md={2} sm={12} xs={12}></Grid>
										<Grid item lg={8} md={8} sm={12} xs={12}>
											<h6 className={classes.questinOne}>8. Information provided by:</h6>
										</Grid>
									</Grid>
									<Grid container spacing={1} style={{ marginTop: '10px' }}>
										<Grid item lg={4} md={4} sm={2}></Grid>
										<Grid item lg={2} md={2} sm={2}>
											<CssTextField
												id='outlined-basic'
												label='Enter Name'
												variant='outlined'
												type='text'
												size='small'
												autoComplete='off'
												style={{ width: '100%' }}
												inputProps={{ style: { fontSize: 14 } }}
												onChange={props.handleChange('informationProvidedByName')}
												onBlur={props.handleBlur('informationProvidedByName')}
												value={props.values.informationProvidedByName}
												helperText={
													props.touched.informationProvidedByName &&
													props.errors.informationProvidedByName
												}
												error={
													props.touched.informationProvidedByName &&
													props.errors.informationProvidedByName
												}
												InputLabelProps={{ style: { fontSize: 14 } }}
											/>
										</Grid>
										<Grid item lg={2} md={2} sm={2}>
											<CssTextField
												id='outlined-basic'
												label='Enter Position/Designation'
												variant='outlined'
												type='text'
												size='small'
												autoComplete='off'
												style={{ width: '100%' }}
												inputProps={{ style: { fontSize: 14 } }}
												// onChange={props.handleChange('question')}
												onBlur={props.handleBlur('question')}
												// value={props.values.question}
												helperText={props.touched.question && props.errors.question}
												error={props.touched.question && props.errors.question}
												InputLabelProps={{ style: { fontSize: 14 } }}
											/>
										</Grid>
									</Grid>
								</Container>
							</Form>
						);
					}}
				</Formik>
				<Formik
					initialValues={sectionBFormInitialValues}
					// validationSchema={validationSchemaForQualityCheck}
				>
					{(props) => {
						sectionC = props;
						return (
							<Form autoComplete='off'>
								<h5 className='text-center mt-5'>Section-C (PAST PERFORMANCE)</h5>
								<p className='text-center'>
									To be completed by the Purchasing Department
								</p>
								<Container className={classes.mainContainer}>
									<Grid container spacing={1} style={{ marginTop: 15 }}>
										<Grid item lg={2} md={2} sm={12} xs={12}></Grid>
										<Grid item lg={8} md={8} sm={12} xs={12}>
											<h6 className={classes.questinOne}>
												1. For how long has the supplier been providing goode/services to
												the company?
											</h6>
										</Grid>
										<Grid
											item
											lg={2}
											md={3}
											sm={12}
											xs={12}
											style={{ marginTop: '0.5rem' }}>
											<CssTextField
												id='outlined-basic'
												label='Ans'
												variant='outlined'
												type='text'
												size='small'
												autoComplete='off'
												className={classes.inputFieldStyle2}
												inputProps={{ style: { fontSize: 14 } }}
												onChange={props.handleChange('question')}
												onBlur={props.handleBlur('question')}
												value={props.values.question}
												helperText={props.touched.question && props.errors.question}
												error={props.touched.question && props.errors.question}
												InputLabelProps={{ style: { fontSize: 14 } }}></CssTextField>
										</Grid>
									</Grid>
									<Grid container spacing={1} style={{ marginTop: 15 }}>
										<Grid item lg={2} md={2} sm={12} xs={12}></Grid>
										<Grid item lg={7} md={7} sm={12} xs={12}>
											<h6 className={classes.questinOne}>
												2. Has the vendor regularly met his commitment to the company with
												respect to:
											</h6>
										</Grid>
									</Grid>
									<Grid container spacing={1}>
										<Grid item lg={2} md={2} sm={12} xs={12}></Grid>
										<Grid
											item
											lg={8}
											md={8}
											sm={12}
											xs={12}
											style={{ marginTop: '0.5rem' }}>
											<h6 className={classes.questinOne} style={{ marginLeft: '3rem' }}>
												a. Quality requirements?
											</h6>
										</Grid>
										<Grid
											item
											lg={2}
											md={3}
											sm={12}
											xs={12}
											style={{ marginTop: '0.5rem' }}>
											<CssTextField
												id='outlined-basic'
												label='Ans'
												variant='outlined'
												type='text'
												size='small'
												select
												className={classes.inputFieldStyle2}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
												onChange={props.handleChange('testingIncoming')}
												onBlur={props.handleBlur('testingIncoming')}
												value={props.values.testingIncoming}
												helperText={
													props.touched.testingIncoming && props.errors.testingIncoming
												}
												error={
													props.touched.testingIncoming && props.errors.testingIncoming
												}>
												<MenuItem value=''>
													<em>None</em>
												</MenuItem>
												<MenuItem value={true}>Yes</MenuItem>
												<MenuItem value={false}>No</MenuItem>
											</CssTextField>
										</Grid>
									</Grid>
									<Grid container spacing={1}>
										<Grid item lg={2} md={2} sm={12} xs={12}></Grid>
										<Grid
											item
											lg={8}
											md={8}
											sm={12}
											xs={12}
											style={{ marginTop: '0.5rem' }}>
											<h6 className={classes.questinOne} style={{ marginLeft: '3rem' }}>
												b. On time delivery?
											</h6>
										</Grid>
										<Grid
											item
											lg={2}
											md={3}
											sm={12}
											xs={12}
											style={{ marginTop: '0.5rem' }}>
											<CssTextField
												id='outlined-basic'
												label='Ans'
												variant='outlined'
												type='text'
												size='small'
												select
												className={classes.inputFieldStyle2}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
												onChange={props.handleChange('testingProcess')}
												onBlur={props.handleBlur('testingProcess')}
												value={props.values.testingProcess}
												helperText={
													props.touched.testingProcess && props.errors.testingProcess
												}
												error={props.touched.testingProcess && props.errors.testingProcess}>
												<MenuItem value=''>
													<em>None</em>
												</MenuItem>
												<MenuItem value={true}>Yes</MenuItem>
												<MenuItem value={false}>No</MenuItem>
											</CssTextField>
										</Grid>
									</Grid>
									<Grid container spacing={1}>
										<Grid item lg={2} md={2} sm={12} xs={12}></Grid>
										<Grid
											item
											lg={8}
											md={8}
											sm={12}
											xs={12}
											style={{ marginTop: '0.5rem' }}>
											<h6 className={classes.questinOne} style={{ marginLeft: '3rem' }}>
												c. After sales services?
											</h6>
										</Grid>
										<Grid
											item
											lg={2}
											md={3}
											sm={12}
											xs={12}
											style={{ marginTop: '0.5rem' }}>
											<CssTextField
												id='outlined-basic'
												label='Ans'
												variant='outlined'
												type='text'
												size='small'
												select
												className={classes.inputFieldStyle2}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
												onChange={props.handleChange('testingFinal')}
												onBlur={props.handleBlur('testingFinal')}
												value={props.values.testingFinal}
												helperText={props.touched.testingFinal && props.errors.testingFinal}
												error={props.touched.testingFinal && props.errors.testingFinal}>
												<MenuItem value=''>
													<em>None</em>
												</MenuItem>
												<MenuItem value={true}>Yes</MenuItem>
												<MenuItem value={false}>No</MenuItem>
											</CssTextField>
										</Grid>
									</Grid>
									<Grid container spacing={1} style={{ marginTop: 15 }}>
										<Grid item lg={2} md={2} sm={12} xs={12}></Grid>
										<Grid item lg={8} md={8} sm={12} xs={12}>
											<h6 className={classes.questinOne}>
												3. Is the supplier prompt in reply to enquiries?
											</h6>
										</Grid>
										<Grid
											item
											lg={2}
											md={3}
											sm={12}
											xs={12}
											style={{ marginTop: '0.3rem' }}>
											<CssTextField
												id='outlined-basic'
												label='Ans'
												variant='outlined'
												type='text'
												size='small'
												select
												className={classes.inputFieldStyle2}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
												// onChange={props.handleChange('rating')}
												// onBlur={props.handleBlur('rating')}
												value={props.values.rating}
												helperText={props.touched.rating && props.errors.rating}
												error={props.touched.rating && props.errors.rating}>
												<MenuItem value=''>
													<em>None</em>
												</MenuItem>
												<MenuItem value={true}>Yes</MenuItem>
												<MenuItem value={false}>No</MenuItem>
											</CssTextField>
										</Grid>
									</Grid>
									<Grid container spacing={1} style={{ marginTop: 15 }}>
										<Grid item lg={2} md={2} sm={12} xs={12}></Grid>
										<Grid item lg={8} md={8} sm={12} xs={12}>
											<h6 className={classes.questinOne}>
												4. Does the vendor enjoy good market reputation?
											</h6>
										</Grid>
										<Grid
											item
											lg={2}
											md={3}
											sm={12}
											xs={12}
											style={{ marginTop: '0.3rem' }}>
											<CssTextField
												id='outlined-basic'
												label='Ans'
												variant='outlined'
												type='text'
												size='small'
												select
												className={classes.inputFieldStyle2}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
												// onChange={props.handleChange('rating')}
												// onBlur={props.handleBlur('rating')}
												value={props.values.rating}
												helperText={props.touched.rating && props.errors.rating}
												error={props.touched.rating && props.errors.rating}>
												<MenuItem value=''>
													<em>None</em>
												</MenuItem>
												<MenuItem value={true}>Yes</MenuItem>
												<MenuItem value={false}>No</MenuItem>
											</CssTextField>
										</Grid>
									</Grid>
								</Container>
							</Form>
						);
					}}
				</Formik>
				<Formik
					initialValues={sectionBFormInitialValues}
					// validationSchema={validationSchemaForQualityCheck}
				>
					{(props) => {
						sectionD = props;
						return (
							<Form autoComplete='off'>
								<h5 className='text-center mt-5'>Section-D (ON-SITE SURVEY)</h5>
								<p className='text-center'>
									To be completed by the Auditor/Representative
								</p>
								<Container className={classes.mainContainer}>
									<Grid container spacing={1} style={{ marginTop: 15 }}>
										<Grid item lg={2} md={2} sm={12} xs={12}></Grid>
										<Grid item lg={8} md={8} sm={12} xs={12}>
											<h6 className={classes.questinOne}>
												1. Does the supplier follow set procedures for perofrming work?
											</h6>
										</Grid>
										<Grid
											item
											lg={2}
											md={3}
											sm={12}
											xs={12}
											style={{ marginTop: '0.3rem' }}>
											<CssTextField
												id='outlined-basic'
												label='Ans'
												variant='outlined'
												type='text'
												size='small'
												select
												className={classes.inputFieldStyle2}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
												// onChange={props.handleChange('rating')}
												// onBlur={props.handleBlur('rating')}
												// value={props.values.rating}
												helperText={props.touched.rating && props.errors.rating}
												error={props.touched.rating && props.errors.rating}>
												<MenuItem value=''>
													<em>None</em>
												</MenuItem>
												<MenuItem value={true}>Yes</MenuItem>
												<MenuItem value={false}>No</MenuItem>
											</CssTextField>
										</Grid>
									</Grid>
									<Grid container spacing={1} style={{ marginTop: 15 }}>
										<Grid item lg={2} md={2} sm={12} xs={12}></Grid>
										<Grid item lg={8} md={8} sm={12} xs={12}>
											<h6 className={classes.questinOne}>
												2. Are machines sufficient/adequate to produce required quality
												product?
											</h6>
										</Grid>
										<Grid
											item
											lg={2}
											md={3}
											sm={12}
											xs={12}
											style={{ marginTop: '0.3rem' }}>
											<CssTextField
												id='outlined-basic'
												label='Ans'
												variant='outlined'
												type='text'
												size='small'
												select
												className={classes.inputFieldStyle2}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
												// onChange={props.handleChange('rating')}
												// onBlur={props.handleBlur('rating')}
												// value={props.values.rating}
												helperText={props.touched.rating && props.errors.rating}
												error={props.touched.rating && props.errors.rating}>
												<MenuItem value=''>
													<em>None</em>
												</MenuItem>
												<MenuItem value={true}>Yes</MenuItem>
												<MenuItem value={false}>No</MenuItem>
											</CssTextField>
										</Grid>
									</Grid>
									<Grid container spacing={1} style={{ marginTop: 15 }}>
										<Grid item lg={2} md={2} sm={12} xs={12}></Grid>
										<Grid item lg={8} md={8} sm={12} xs={12}>
											<h6 className={classes.questinOne}>
												3. Are storage areas/conditions adequate to safeguard the product
												against deterioration?
											</h6>
										</Grid>
										<Grid
											item
											lg={2}
											md={3}
											sm={12}
											xs={12}
											style={{ marginTop: '0.3rem' }}>
											<CssTextField
												id='outlined-basic'
												label='Ans'
												variant='outlined'
												type='text'
												size='small'
												select
												className={classes.inputFieldStyle2}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
												// onChange={props.handleChange('rating')}
												// onBlur={props.handleBlur('rating')}
												// value={props.values.rating}
												helperText={props.touched.rating && props.errors.rating}
												error={props.touched.rating && props.errors.rating}>
												<MenuItem value=''>
													<em>None</em>
												</MenuItem>
												<MenuItem value={true}>Yes</MenuItem>
												<MenuItem value={false}>No</MenuItem>
											</CssTextField>
										</Grid>
									</Grid>
									<Grid container spacing={1} style={{ marginTop: 15 }}>
										<Grid item lg={2} md={2} sm={12} xs={12}></Grid>
										<Grid item lg={8} md={8} sm={12} xs={12}>
											<h6 className={classes.questinOne}>
												4. Are the management and workers committed to quality?
											</h6>
										</Grid>
										<Grid
											item
											lg={2}
											md={3}
											sm={12}
											xs={12}
											style={{ marginTop: '0.3rem' }}>
											<CssTextField
												id='outlined-basic'
												label='Ans'
												variant='outlined'
												type='text'
												size='small'
												select
												className={classes.inputFieldStyle2}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
												// onChange={props.handleChange('rating')}
												// onBlur={props.handleBlur('rating')}
												// value={props.values.rating}
												helperText={props.touched.rating && props.errors.rating}
												error={props.touched.rating && props.errors.rating}>
												<MenuItem value=''>
													<em>None</em>
												</MenuItem>
												<MenuItem value={true}>Yes</MenuItem>
												<MenuItem value={false}>No</MenuItem>
											</CssTextField>
										</Grid>
									</Grid>
									<Grid container spacing={1} style={{ marginTop: 15 }}>
										<Grid item lg={2} md={2} sm={12} xs={12}></Grid>
										<Grid item lg={8} md={8} sm={12} xs={12}>
											<h6 className={classes.questinOne}>
												5. Does the supplier follow written specifications/standards?
											</h6>
										</Grid>
										<Grid
											item
											lg={2}
											md={3}
											sm={12}
											xs={12}
											style={{ marginTop: '0.3rem' }}>
											<CssTextField
												id='outlined-basic'
												label='Ans'
												variant='outlined'
												type='text'
												size='small'
												select
												className={classes.inputFieldStyle2}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
												// onChange={props.handleChange('rating')}
												// onBlur={props.handleBlur('rating')}
												// value={props.values.rating}
												helperText={props.touched.rating && props.errors.rating}
												error={props.touched.rating && props.errors.rating}>
												<MenuItem value=''>
													<em>None</em>
												</MenuItem>
												<MenuItem value={true}>Yes</MenuItem>
												<MenuItem value={false}>No</MenuItem>
											</CssTextField>
										</Grid>
									</Grid>
									<Grid container spacing={1} style={{ marginTop: 15 }}>
										<Grid item lg={2} md={2} sm={12} xs={12}></Grid>
										<Grid item lg={8} md={8} sm={12} xs={12}>
											<h6 className={classes.questinOne}>6. Visit conducted by:</h6>
										</Grid>
										{/* <Grid item lg={2} md={3} sm={12} xs={12}>
														<CssTextField
														id='outlined-basic'
														label='Ans'
														variant='outlined'
															type='text'
															size='small'
															className={classes.inputFieldStyle2}
															inputProps={{ style: { fontSize: 14 } }}
															onChange={props.handleChange('question')}
															onBlur={props.handleBlur('question')}
															value={props.values.question}
															helperText={props.touched.question && props.errors.question}
															error={props.touched.question && props.errors.question}
															InputLabelProps={{ style: { fontSize: 14 } }}></CssTextField>
														</Grid> */}
									</Grid>
									<Grid container spacing={1} style={{ marginTop: '10px' }}>
										<Grid item lg={4} md={4} sm={4} xs={4}></Grid>
										<Grid item lg={2} md={2} sm={2}>
											<CssTextField
												id='outlined-basic'
												label='Enter Name'
												variant='outlined'
												type='text'
												size='small'
												autoComplete='off'
												style={{ width: '100%' }}
												inputProps={{ style: { fontSize: 14 } }}
												// onChange={props.handleChange('question')}
												onBlur={props.handleBlur('question')}
												// value={props.values.question}
												helperText={props.touched.question && props.errors.question}
												error={props.touched.question && props.errors.question}
												InputLabelProps={{ style: { fontSize: 14 } }}
											/>
										</Grid>
										<Grid item lg={2} md={2} sm={2}>
											<CssTextField
												id='outlined-basic'
												// label='Date'
												variant='outlined'
												type='date'
												size='small'
												autoComplete='off'
												style={{ width: '100%' }}
												inputProps={{ style: { fontSize: 14 } }}
												// onChange={props.handleChange('question')}
												// onBlur={props.handleBlur('question')}
												// value={props.values.question}
												helperText={props.touched.question && props.errors.question}
												error={props.touched.question && props.errors.question}
												InputLabelProps={{ style: { fontSize: 14 } }}
											/>
										</Grid>
									</Grid>
								</Container>
							</Form>
						);
					}}
				</Formik>
				<Formik
					initialValues={sectionBFormInitialValues}
					// validationSchema={validationSchemaForQualityCheck}
				>
					{(props) => {
						sectionE = props;
						return (
							<Form autoComplete='off'>
								<h5 className='text-center mt-5'>Section-E (SAMPLE APPRROVAL)</h5>
								<p className='text-center'>
									TO BE FILLED BY QUALITY ASSURANCE DEPARTMENT
								</p>
								<Container className={classes.mainContainer}>
									<Grid container spacing={1} style={{ marginTop: 15 }}>
										<Grid item lg={2} md={2} sm={12} xs={12}></Grid>
										<Grid item lg={8} md={8} sm={12} xs={12}>
											<h6 className={classes.questinOne}>1. No. of Samples Provided:</h6>
										</Grid>
										<Grid
											item
											lg={2}
											md={3}
											sm={12}
											xs={12}
											style={{ marginTop: '0.5rem' }}>
											<CssTextField
												id='outlined-basic'
												label='Ans'
												variant='outlined'
												type='text'
												size='small'
												autoComplete='off'
												className={classes.inputFieldStyle2}
												inputProps={{ style: { fontSize: 14 } }}
												onChange={props.handleChange('question')}
												onBlur={props.handleBlur('question')}
												value={props.values.question}
												helperText={props.touched.question && props.errors.question}
												error={props.touched.question && props.errors.question}
												InputLabelProps={{ style: { fontSize: 14 } }}></CssTextField>
										</Grid>
									</Grid>
									<Grid container spacing={1} style={{ marginTop: 15 }}>
										<Grid item lg={2} md={2} sm={12} xs={12}></Grid>
										<Grid item lg={8} md={8} sm={12} xs={12}>
											<h6 className={classes.questinOne}>
												2. Results of Testing/Inspection:
											</h6>
										</Grid>
										<Grid
											item
											lg={2}
											md={3}
											sm={12}
											xs={12}
											style={{ marginTop: '0.5rem' }}>
											<CssTextField
												id='outlined-basic'
												label='Ans'
												variant='outlined'
												type='text'
												size='small'
												autoComplete='off'
												className={classes.inputFieldStyle2}
												inputProps={{ style: { fontSize: 14 } }}
												onChange={props.handleChange('question')}
												onBlur={props.handleBlur('question')}
												value={props.values.question}
												helperText={props.touched.question && props.errors.question}
												error={props.touched.question && props.errors.question}
												InputLabelProps={{ style: { fontSize: 14 } }}></CssTextField>
										</Grid>
									</Grid>
									<Grid container spacing={1} style={{ marginTop: 15 }}>
										<Grid item lg={2} md={2} sm={12} xs={12}></Grid>
										<Grid item lg={8} md={8} sm={12} xs={12}>
											<h6 className={classes.questinOne}>3. Report Reference No:</h6>
										</Grid>
										<Grid
											item
											lg={2}
											md={3}
											sm={12}
											xs={12}
											style={{ marginTop: '0.5rem' }}>
											<CssTextField
												id='outlined-basic'
												label='Ans'
												variant='outlined'
												type='text'
												size='small'
												autoComplete='off'
												className={classes.inputFieldStyle2}
												inputProps={{ style: { fontSize: 14 } }}
												onChange={props.handleChange('question')}
												onBlur={props.handleBlur('question')}
												value={props.values.question}
												helperText={props.touched.question && props.errors.question}
												error={props.touched.question && props.errors.question}
												InputLabelProps={{ style: { fontSize: 14 } }}></CssTextField>
										</Grid>
									</Grid>
									<Grid container spacing={1} style={{ marginTop: 15 }}>
										<Grid item lg={2} md={2} sm={12} xs={12}></Grid>
										<Grid item lg={8} md={8} sm={12} xs={12}>
											<h6 className={classes.questinOne}>4. Inspection By:</h6>
										</Grid>
										{/* <Grid item lg={2} md={3} sm={12} xs={12} style={{ marginTop: '0.5rem' }}>
															<CssTextField
																id='outlined-basic'
																label='Ans'
																variant='outlined'
																type='text'
																size='small'
																autoComplete='off'
																className={classes.inputFieldStyle2}
																inputProps={{ style: { fontSize: 14 } }}
																onChange={props.handleChange('question')}
																onBlur={props.handleBlur('question')}
																value={props.values.question}
																helperText={props.touched.question && props.errors.question}
																error={props.touched.question && props.errors.question}
																InputLabelProps={{ style: { fontSize: 14 } }}></CssTextField>
															</Grid> */}
									</Grid>
									<Grid container spacing={1} style={{ marginTop: '10px' }}>
										<Grid item lg={4} md={4} sm={4} xs={4}></Grid>
										<Grid item lg={2} md={2} sm={2}>
											<CssTextField
												id='outlined-basic'
												label='Enter Name'
												variant='outlined'
												type='text'
												size='small'
												autoComplete='off'
												style={{ width: '100%' }}
												inputProps={{ style: { fontSize: 14 } }}
												// onChange={props.handleChange('question')}
												onBlur={props.handleBlur('question')}
												// value={props.values.question}
												helperText={props.touched.question && props.errors.question}
												error={props.touched.question && props.errors.question}
												InputLabelProps={{ style: { fontSize: 14 } }}
											/>
										</Grid>
									</Grid>
									<Grid container spacing={1} style={{ marginTop: 15 }}>
										<Grid item lg={2} md={2} sm={12} xs={12}></Grid>
										<Grid item lg={7} md={7} sm={12} xs={12}>
											<h6 className={classes.questinOne}>5. Vendor Rating Method:</h6>
										</Grid>
									</Grid>
									<Grid container spacing={1}>
										<Grid item lg={2} md={2} sm={12} xs={12}></Grid>
										<Grid
											item
											lg={8}
											md={8}
											sm={12}
											xs={12}
											style={{ marginTop: '0.5rem' }}>
											<h6 className={classes.questinOne} style={{ marginLeft: '3rem' }}>
												a. Quality(Total lots passes/Total lots supplied + Qty Passes/Qty
												Supplied) / 2x60 = 60
											</h6>
										</Grid>
										<Grid
											item
											lg={2}
											md={3}
											sm={12}
											xs={12}
											style={{ marginTop: '0.5rem' }}>
											<CssTextField
												id='outlined-basic'
												label='Ans'
												variant='outlined'
												type='text'
												size='small'
												select
												className={classes.inputFieldStyle2}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
												onChange={props.handleChange('testingIncoming')}
												onBlur={props.handleBlur('testingIncoming')}
												value={props.values.testingIncoming}
												helperText={
													props.touched.testingIncoming && props.errors.testingIncoming
												}
												error={
													props.touched.testingIncoming && props.errors.testingIncoming
												}>
												<MenuItem value=''>
													<em>None</em>
												</MenuItem>
												{/* <MenuItem value={true}>Yes</MenuItem> */}
												{/* <MenuItem value={false}>No</MenuItem> */}
											</CssTextField>
										</Grid>
									</Grid>
									<Grid container spacing={1}>
										<Grid item lg={2} md={2} sm={12} xs={12}></Grid>
										<Grid
											item
											lg={8}
											md={8}
											sm={12}
											xs={12}
											style={{ marginTop: '0.5rem' }}>
											<h6 className={classes.questinOne} style={{ marginLeft: '3rem' }}>
												b. On Time Delivery: Marks Detected @ 3 Marks Per Day Late Delivery.
												= 30
											</h6>
										</Grid>
										<Grid
											item
											lg={2}
											md={3}
											sm={12}
											xs={12}
											style={{ marginTop: '0.5rem' }}>
											<CssTextField
												id='outlined-basic'
												label='Ans'
												variant='outlined'
												type='text'
												size='small'
												select
												className={classes.inputFieldStyle2}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
												onChange={props.handleChange('testingProcess')}
												onBlur={props.handleBlur('testingProcess')}
												value={props.values.testingProcess}
												helperText={
													props.touched.testingProcess && props.errors.testingProcess
												}
												error={props.touched.testingProcess && props.errors.testingProcess}>
												<MenuItem value=''>
													<em>None</em>
												</MenuItem>
												{/* <MenuItem value={true}>Yes</MenuItem> */}
												{/* <MenuItem value={false}>No</MenuItem> */}
											</CssTextField>
										</Grid>
									</Grid>
									<Grid container spacing={1}>
										<Grid item lg={2} md={2} sm={12} xs={12}></Grid>
										<Grid
											item
											lg={8}
											md={8}
											sm={12}
											xs={12}
											style={{ marginTop: '0.5rem' }}>
											<h6 className={classes.questinOne} style={{ marginLeft: '3rem' }}>
												c. Price: Maximum Marks (i.e. 10) / (Unit price/lower unit price) =
												10
											</h6>
										</Grid>
										<Grid
											item
											lg={2}
											md={3}
											sm={12}
											xs={12}
											style={{ marginTop: '0.5rem' }}>
											<CssTextField
												id='outlined-basic'
												label='Ans'
												variant='outlined'
												type='text'
												size='small'
												select
												className={classes.inputFieldStyle2}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
												onChange={props.handleChange('testingFinal')}
												onBlur={props.handleBlur('testingFinal')}
												value={props.values.testingFinal}
												helperText={props.touched.testingFinal && props.errors.testingFinal}
												error={props.touched.testingFinal && props.errors.testingFinal}>
												<MenuItem value=''>
													<em>None</em>
												</MenuItem>
												{/* <MenuItem value={true}>Yes</MenuItem> */}
												{/* <MenuItem value={false}>No</MenuItem> */}
											</CssTextField>
										</Grid>
									</Grid>
									<Formik
										initialValues={sectionBFormInitialValues}
										// validationSchema={validationSchemaForQualityCheck}
									>
										{(props) => {
											sectionF = props;
											return (
												<Form autoComplete='off'>
													<h5 className='text-center mt-5'>Section-F (DECISION)</h5>
													<p className='text-center'>
														To be completed by Director Finance, Procurement and Admin
													</p>
													<Container className={classes.mainContainer}>
														<Grid container spacing={1} style={{ marginTop: 15 }}>
															<Grid item lg={2} md={2} sm={12} xs={12}></Grid>
															<Grid item lg={8} md={8} sm={12} xs={12}>
																<h6 className={classes.questinOne}>Decision</h6>
															</Grid>
															<Grid
																item
																lg={2}
																md={3}
																sm={12}
																xs={12}
																style={{ marginTop: '0.3rem' }}>
																<CssTextField
																	id='outlined-basic'
																	label='Ans'
																	variant='outlined'
																	type='text'
																	size='small'
																	select
																	className={classes.inputFieldStyle2}
																	inputProps={{ style: { fontSize: 14 } }}
																	InputLabelProps={{ style: { fontSize: 14 } }}
																	// onChange={props.handleChange('rating')}
																	// onBlur={props.handleBlur('rating')}
																	// value={props.values.rating}
																	helperText={props.touched.rating && props.errors.rating}
																	error={props.touched.rating && props.errors.rating}>
																	{/* <MenuItem value=''>
																	<em>None</em>
																</MenuItem> */}
																	<MenuItem value={true}>Approved</MenuItem>
																	<MenuItem value={false}>Not Approved</MenuItem>
																</CssTextField>
															</Grid>
														</Grid>
														<Grid container spacing={1} style={{ marginTop: 15 }}>
															<Grid item lg={2} md={2} sm={12} xs={12}></Grid>
															<Grid item lg={8} md={8} sm={12} xs={12}>
																<h6 className={classes.questinOne}>Basis For Approval</h6>
															</Grid>
															<Grid
																item
																lg={2}
																md={3}
																sm={12}
																xs={12}
																style={{ marginTop: '0.3rem' }}>
																<CssTextField
																	id='outlined-basic'
																	label='Ans'
																	variant='outlined'
																	type='text'
																	size='small'
																	className={classes.inputFieldStyle2}
																	inputProps={{ style: { fontSize: 14 } }}
																	InputLabelProps={{ style: { fontSize: 14 } }}
																	// onChange={props.handleChange('rating')}
																	// onBlur={props.handleBlur('rating')}
																	// value={props.values.rating}
																	helperText={props.touched.rating && props.errors.rating}
																	error={props.touched.rating && props.errors.rating}
																/>
															</Grid>
														</Grid>
														<Grid container spacing={1} style={{ marginTop: 15 }}>
															<Grid item lg={2} md={2} sm={12} xs={12}></Grid>
															<Grid item lg={8} md={8} sm={12} xs={12}>
																<h6 className={classes.questinOne}>Approved By & Date</h6>
															</Grid>
															{/* <Grid item lg={2} md={3} sm={12} xs={12}>
														<CssTextField
														id='outlined-basic'
														label='Ans'
														variant='outlined'
														type='text'
														size='small'
														className={classes.inputFieldStyle2}
														inputProps={{ style: { fontSize: 14 } }}
														onChange={props.handleChange('question')}
														onBlur={props.handleBlur('question')}
														value={props.values.question}
														helperText={props.touched.question && props.errors.question}
														error={props.touched.question && props.errors.question}
														InputLabelProps={{ style: { fontSize: 14 } }}></CssTextField>
													</Grid> */}
														</Grid>
														<Grid container spacing={1} style={{ marginTop: '10px' }}>
															<Grid item lg={4} md={4} sm={4} xs={4}></Grid>
															<Grid item lg={2} md={2} sm={2}>
																<CssTextField
																	id='outlined-basic'
																	label='Enter Name'
																	variant='outlined'
																	type='text'
																	size='small'
																	autoComplete='off'
																	style={{ width: '100%' }}
																	inputProps={{ style: { fontSize: 14 } }}
																	// onChange={props.handleChange('question')}
																	onBlur={props.handleBlur('question')}
																	// value={props.values.question}
																	helperText={props.touched.question && props.errors.question}
																	error={props.touched.question && props.errors.question}
																	InputLabelProps={{ style: { fontSize: 14 } }}
																/>
															</Grid>
															<Grid item lg={2} md={2} sm={2}>
																<CssTextField
																	id='outlined-basic'
																	// label='Date'
																	variant='outlined'
																	type='date'
																	size='small'
																	autoComplete='off'
																	style={{ width: '100%' }}
																	inputProps={{ style: { fontSize: 14 } }}
																	// onChange={props.handleChange('question')}
																	// onBlur={props.handleBlur('question')}
																	// value={props.values.question}
																	helperText={props.touched.question && props.errors.question}
																	error={props.touched.question && props.errors.question}
																	InputLabelProps={{ style: { fontSize: 14 } }}
																/>
															</Grid>
														</Grid>
														<Grid container spacing={1} style={{ marginTop: 15 }}>
															<Grid item lg={2} md={2} sm={12} xs={12}></Grid>
															<Grid item lg={8} md={8} sm={12} xs={12}>
																<h6 className={classes.questinOne}>Next Review:</h6>
															</Grid>
															<Grid
																item
																lg={2}
																md={3}
																sm={12}
																xs={12}
																style={{ marginTop: '0.3rem' }}>
																<CssTextField
																	id='outlined-basic'
																	label='Ans'
																	variant='outlined'
																	type='text'
																	size='small'
																	className={classes.inputFieldStyle2}
																	inputProps={{ style: { fontSize: 14 } }}
																	InputLabelProps={{ style: { fontSize: 14 } }}
																	// onChange={props.handleChange('rating')}
																	// onBlur={props.handleBlur('rating')}
																	// value={props.values.rating}
																	helperText={props.touched.rating && props.errors.rating}
																	error={props.touched.rating && props.errors.rating}
																/>
															</Grid>
														</Grid>
													</Container>
												</Form>
											);
										}}
									</Formik>
								</Container>
							</Form>
						);
					}}
				</Formik>

				<Formik onSubmit={onSubmit}>
					{(props) => (
						<Form>
							<Grid container spacing={1} style={{ marginTop: 15 }}>
								<Grid item lg={12} md={12} sm={3} xs={3}>
									<Button
										variant='outlined'
										color='primary'
										classNames={classes.submitButton}
										text='Submit'
										loading={loading}
										loaderColor='#333'
									/>
								</Grid>
								{success && <p>{success}</p>}
								{error && <p>{error}</p>}
							</Grid>
							<br />
						</Form>
					)}
				</Formik>
			</div>
		</Sidenav>
	);
};

export default SupplierEvalForm;
