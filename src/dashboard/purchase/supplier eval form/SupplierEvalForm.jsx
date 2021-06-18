import React, { useState, useEffect } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import {
	getVendorAction,
	updateVendorAction,
} from '../../../services/action/VendorAction';
import { fetchPersonAction } from '../../../services/action/PersonAction';
import axios from 'axios';

const GreenCheckbox = withStyles({
	root: {
		//   color: black[400],
		'&$checked': {
			// color: green[600],
		},
	},
	checked: {},
})((props) => <Checkbox color='default' {...props} />);

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

function createData(No, name, Action) {
	return { No, name, Action };
}

const rows = [createData(1, 'Item1')];

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: '25ch',
		},
	},
	mainContainer: {
		// textAlign: 'center',
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
		// [theme.breakpoints.down('sm')]: {
		//     width: '40%',
		// },
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
const select = withStyles({
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
})(Select);

const SupplierEvalForm = () => {
	const classes = useStyles();
	const [VendorId, setVendorId] = useState('');
	const [VendorContact, setVendorContact] = useState('');
	const [VendorAddress, setVendorAddress] = useState('');
	const [VendorMaterials, setVendorMaterials] = useState('');
	const [EvalSuccess, setEvalSuccess] = useState(false);
	const [EvalError, setEvalError] = useState(false);
	const [EvalMsg, setEvalMsg] = useState('');

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchPersonAction());
		dispatch(getVendorAction(`verified=false`));
	}, [dispatch]);

	const { vendors, verifiedMsg } = useSelector((state) => state.vendors);
	const personsData = useSelector((state) => state.persons);

	console.log(verifiedMsg);

	const onAdd = async (data) => {
		try {
			dispatch(updateVendorAction(VendorId, data));
			setEvalSuccess(true);
			setEvalMsg('Evaluation form has been submitted successfully');
		} catch (error) {
			setEvalError(true);
			setEvalMsg('Something went wrong');
			console.log(error);
		}
		// window.location.reload()
	};
	return (
		<Sidenav title={'Supplier Evaluation Form'}>
			<div>
				<h5 className='text-center'>Section-A (Company Data)</h5>
				<form onSubmit={handleSubmit(onAdd)}>
					<Container className={classes.mainContainer}>
						<Grid container spacing={1} style={{ marginTop: 15 }}>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='Select Vendor Name*'
									variant='outlined'
									type='email'
									size='small'
									select
									className={classes.inputFieldStyle}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}>
									{!vendors || !vendors.length ? (
										<p>Data Not Found</p>
									) : (
										vendors.map((vendor) => (
											<MenuItem
												value={vendor._id}
												key={vendor._id}
												onClick={() => {
													setVendorId(vendor._id);
													setVendorContact(vendor.phone);
													setVendorAddress(vendor.location);
													setVendorMaterials(vendor.material);
												}}>
												{vendor.name}
											</MenuItem>
										))
									)}
								</CssTextField>
							</Grid>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='Contact No.'
									variant='outlined'
									type='email'
									size='small'
									disabled
									value={VendorContact}
									className={classes.inputFieldStyle1}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
								/>
							</Grid>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='Contact Person'
									variant='outlined'
									type='text'
									size='small'
									select
									className={classes.inputFieldStyle}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
									{...register('contactPerson', { required: true })}>
									{!personsData.persons || !personsData.persons.length ? (
										<p>Data Not Found</p>
									) : (
										personsData.persons.map((person) => (
											<MenuItem value={person._id} key={person._id}>
												{person.name}
											</MenuItem>
										))
									)}
								</CssTextField>
								{errors.contactPerson?.type === 'required' && (
									<p className='mt-3 text-danger'>Please Select Contact Person</p>
								)}
							</Grid>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='Address'
									variant='outlined'
									type='email'
									size='small'
									disabled
									value={VendorAddress}
									className={classes.inputFieldStyle}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
								/>
							</Grid>
						</Grid>
					</Container>
					<Container className={classes.mainContainer}>
						<Grid container spacing={1}>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								{!VendorMaterials || !VendorMaterials.length ? (
									<p>Please select any vendor</p>
								) : (
									VendorMaterials.map((vendorMat) => (
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
					<h5 className='text-center mt-5'>Section-B (Quality System)</h5>
					<Container className={classes.mainContainer}>
						<Grid container spacing={1} style={{ marginTop: 15 }}>
							<Grid item lg={3} md={3} sm={12} xs={12}></Grid>
							<Grid item lg={7} md={3} sm={12} xs={12}>
								<h6 className={classes.questinOne}>
									1. Are you registered to ISO 9001/ API?
								</h6>
								{errors.registered?.type === 'required' && (
									<p className='mt-3 ml-5 text-danger'>
										ISO Certification must be required
									</p>
								)}
							</Grid>
							<Grid item lg={2} md={3} sm={12} xs={12}>
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
									{...register('registered', { required: true })}>
									<MenuItem value=''>
										<em>None</em>
									</MenuItem>
									<MenuItem value={true}>Yes</MenuItem>
									<MenuItem value={false}>No</MenuItem>
								</CssTextField>
							</Grid>
						</Grid>
						<Grid container spacing={1} style={{ marginTop: 15 }}>
							<Grid item lg={3} md={3} sm={12} xs={12}></Grid>
							<Grid item lg={7} md={7} sm={12} xs={12}>
								<h6 className={classes.questinOne}>
									2. Do you have Quality Management / Quality Assurance System?
								</h6>
								{errors.quality?.type === 'required' && (
									<p className='mt-3 ml-5 text-danger'>
										Quality Assurance must be required
									</p>
								)}
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
									{...register('quality', { required: true })}>
									<MenuItem value=''>
										<em>None</em>
									</MenuItem>
									<MenuItem value={true}>Yes</MenuItem>
									<MenuItem value={false}>No</MenuItem>
								</CssTextField>
							</Grid>
						</Grid>
						<Grid container spacing={1} style={{ marginTop: 15 }}>
							<Grid item lg={3} md={3} sm={12} xs={12}></Grid>
							<Grid item lg={7} md={3} sm={12} xs={12}>
								<h6 className={classes.questinOne}>
									3. Do you perform inspection and testing it?
								</h6>
							</Grid>
						</Grid>
						<Grid container spacing={1}>
							<Grid item lg={3} md={3} sm={12} xs={12}></Grid>
							<Grid item lg={7} md={3} sm={12} xs={12}>
								<h6 className={classes.questinOne}>a. Incoming stage?</h6>
								{/* {
                                    errors.testingIncoming?.type === 'required' && <p className="mt-3 text-danger">Incoming stage must be required</p>
                                } */}
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
									{...register('testingIncoming')}>
									<MenuItem value=''>
										<em>None</em>
									</MenuItem>
									<MenuItem value={true}>Yes</MenuItem>
									<MenuItem value={false}>No</MenuItem>
								</CssTextField>
							</Grid>
						</Grid>
						<Grid container spacing={1}>
							<Grid item lg={3} md={3} sm={12} xs={12}></Grid>
							<Grid item lg={7} md={3} sm={12} xs={12}>
								<h6 className={classes.questinOne}>b. In process state?</h6>
								{/* {
                                    errors.testingProcess?.type === 'required' && <p className="mt-3 text-danger">Incoming stage must be required</p>
                                } */}
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
									{...register('testingProcess')}>
									<MenuItem value=''>
										<em>None</em>
									</MenuItem>
									<MenuItem value={true}>Yes</MenuItem>
									<MenuItem value={false}>No</MenuItem>
								</CssTextField>
							</Grid>
						</Grid>
						<Grid container spacing={1}>
							<Grid item lg={3} md={3} sm={12} xs={12}></Grid>
							<Grid item lg={7} md={3} sm={12} xs={12}>
								<h6 className={classes.questinOne}>c. Final state?</h6>
								{/* {
                                    errors.testingFinal?.type === 'required' && <p className="mt-3 text-danger">Incoming stage must be required</p>
                                } */}
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
									{...register('testingFinal')}>
									<MenuItem value=''>
										<em>None</em>
									</MenuItem>
									<MenuItem value={true}>Yes</MenuItem>
									<MenuItem value={false}>No</MenuItem>
								</CssTextField>
							</Grid>
						</Grid>
						<Grid container spacing={1} style={{ marginTop: 15 }}>
							<Grid item lg={3} md={3} sm={12} xs={12}></Grid>
							<Grid item lg={7} md={3} sm={12} xs={12}>
								<h6 className={classes.questinOne}>
									4. How do you control Non-Confirming products?
								</h6>
								{errors.question?.type === 'required' && (
									<p className='mt-3 ml-5 text-danger'>Ans must be required</p>
								)}
								{errors.question?.type === 'maxLength' && (
									<p className='mt-3 ml-5 text-danger'>
										Ans must be less than or equal to 100
									</p>
								)}
								{errors.question?.type === 'minLength' && (
									<p className='mt-3 ml-5 text-danger'>Ans must be min 5 letters</p>
								)}
							</Grid>
							<Grid item lg={2} md={3} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='Ans'
									variant='outlined'
									type='text'
									size='small'
									className={classes.inputFieldStyle2}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
									{...register('question', {
										required: true,
										minLength: 5,
										maxLength: 100,
									})}></CssTextField>
							</Grid>
						</Grid>
						<Grid container spacing={1} style={{ marginTop: 15 }}>
							<Grid item lg={3} md={3} sm={12} xs={12}></Grid>
							<Grid item lg={7} md={3} sm={12} xs={12}>
								<h6 className={classes.questinOne}>
									5. How do you rate the skills and training of your personnel?
								</h6>
								{errors.rating?.type === 'required' && (
									<p className='mt-3 ml-5 text-danger'>rating must be required</p>
								)}
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
									{...register('rating', { required: true })}>
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
							<Grid item lg={6} md={3} sm={4} xs={4}>
								{EvalSuccess ? (
									<span>{EvalMsg}</span>
								) : EvalError ? (
									<span>{EvalMsg}</span>
								) : null}
							</Grid>
						</Grid>
						<Grid container spacing={1} style={{ marginTop: 15 }}>
							<Grid item lg={6} md={3} sm={4} xs={4}>
								{verifiedMsg && verifiedMsg}
							</Grid>
						</Grid>
						<Grid container spacing={1} style={{ marginTop: 15 }}>
							<Grid item lg={6} md={3} sm={4} xs={4}></Grid>
							<Grid item lg={6} md={3} sm={3} xs={3}>
								<Button
									variant='outlined'
									color='primary'
									className={classes.submitButton}
									type='submit'>
									Submit
								</Button>
							</Grid>
						</Grid>
						<br />
					</Container>
				</form>
			</div>
		</Sidenav>
	);
};

export default SupplierEvalForm;
