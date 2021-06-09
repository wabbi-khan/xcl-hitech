import React, { useState, useEffect } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { appSuppListAction } from '../../../services/action/VendorAction';
import { useForm } from 'react-hook-form';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import axios from 'axios';
import { fetchShiftAction } from '../../../services/action/ShiftAction';

// import MaterialAddRow from './commponent/materialAddRow'

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
		marginTop: 10,
		marginLeft: 15,
		color: '#22A19A',
		borderColor: '#22A19A',
		'&:hover': {
			border: 'none',
			backgroundColor: '#22A19A',
			color: 'whitesmoke',
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
		// boxShadow: '0.4px 0.4px 0.4px 0.4px grey',
		// borderRadius: 5,
		[theme.breakpoints.up('md')]: {
			width: 270,
		},
		[theme.breakpoints.down('sm')]: {
			width: 200,
		},
	},
	inputFieldStyle1: {
		[theme.breakpoints.up('md')]: {
			width: 270,
		},
		[theme.breakpoints.down('sm')]: {
			width: 200,
		},
	},
	inputFieldStyle2: {
		// boxShadow: '0.4px 0.4px 0.4px 0.4px grey',
		// borderRadius: 5,
		[theme.breakpoints.up('md')]: {
			width: 250,
		},
		[theme.breakpoints.down('sm')]: {
			width: 200,
		},
	},
	inputFieldStyle3: {
		[theme.breakpoints.up('md')]: {
			width: 250,
			marginLeft: -30,
		},
		[theme.breakpoints.down('sm')]: {
			width: 200,
		},
	},
	inputFieldStyle4: {
		[theme.breakpoints.up('md')]: {
			width: 250,
			marginLeft: 40,
		},
		[theme.breakpoints.down('sm')]: {
			width: 200,
		},
	},
	inputFieldStyle5: {
		[theme.breakpoints.up('md')]: {
			width: 250,
			marginLeft: 110,
		},
		[theme.breakpoints.down('sm')]: {
			width: 200,
		},
	},
	itemHeading: {
		marginTop: 7,
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
		marginLeft: 120,
		'&:hover': {
			border: 'none',
			background: 'none',
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

const PurchaseReport = ({ history }) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	// const [ItemCounter, setItemCounter] = useState([{ id: 'text' }])
	const [ItemCounter, setItemCounter] = useState([
		{
			item: '',
			nameOfOperator: '',
			weight: '',
			desc: '',
			finishedPipe: '',
			finishedWt: '',
			rcyc: '',
			wastage: '',
			totalWeight: '',
			downTime: '',
		},
	]);
	const [VendorId, setVendorId] = useState('');
	const [VendorAddress, setVendorAddress] = useState('');
	const [vendorMaterial, setVendorMaterial] = useState([]);
	const [orderBody, setOrderBody] = useState({});
	// console.log(vendorMaterial);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	useEffect(async () => {
		await dispatch(fetchShiftAction());
	}, [dispatch]);

	const { shifts } = useSelector((state) => state.shifts);

	const addMoreFunc = () => {
		setItemCounter([
			...ItemCounter,
			{
				item: '',
				nameOfOperator: '',
				weight: '',
				desc: '',
				finishedPipe: '',
				finishedWt: '',
				rcyc: '',
				wastage: '',
				totalWeight: '',
				downTime: '',
			},
		]);
	};

	const deleteItem = (i) => {
		const temp = [...ItemCounter];
		temp.splice(i, 1);
		setItemCounter(temp);
	};

	// const onAdd = async (data) => {
	//     console.log(data);
	// }

	// const onAddMaterial = async data => {
	//     console.log(data);
	// }

	const onChangeHandler = (e, placeholder, index) => {
		console.log(e.target.value);
		const tempFields = ItemCounter.map((item, i) => {
			if (i === index) {
				return { ...item, [placeholder]: e.target.value };
			} else {
				return { ...item };
			}
		});
		setItemCounter(tempFields);
	};

	const onSubmitDate = async (props) => {
		// console.log(ItemCounter);
		// console.log(props);
		try {
			await axios.post(`${process.env.REACT_APP_API_URL}/order`, {
				vendor: props.vendor,
				poNum: props.poNum,
				prNum: props.prNum,
				reference: props.reference,
				paymentTerm: props.paymentTerm,
				paymentSubject: props.paymentSubject,
				materials: ItemCounter,
				// materials: [
				//     {
				//         material: "60967de642ab87001586f002",
				//         quantity: 15,
				//         unitValue: 12,
				//         remarks: "dfsd"
				//     },
				//     {
				//         material: "609baa076768bb00154affe7",
				//         quantity: 25,
				//         unitValue: 23,
				//         remarks: "dfsd"
				//     }
				// ]
			});
			window.location.reload();
			// setAddMatError(false)
		} catch (error) {
			console.log(error);
			// setAddMatError(true)
		}
	};
	console.log(orderBody);

	return (
		<Sidenav title={'Purchase Order'}>
			<div>
				{/* <form onSubmit={handleSubmit(onAdd)}> */}
				<form action='' onSubmit={handleSubmit(onSubmitDate)}>
					<Container className={classes.mainContainer}>
						<Grid container spacing={1} style={{ marginTop: 15 }}>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='P.R. No.'
									variant='outlined'
									type='text'
									size='small'
									className={classes.inputFieldStyle1}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
									{...register('poNum', { required: true })}
								/>
								{errors.poNum?.type === 'required' && (
									<p className='mt-1 text-danger'>P.O. No. is required</p>
								)}
							</Grid>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='HPEI/786/'
									variant='outlined'
									type='text'
									size='small'
									className={classes.inputFieldStyle1}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
									// {...register("address", { required: true })}
								/>
							</Grid>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									variant='outlined'
									type='date'
									size='small'
									className={classes.inputFieldStyle1}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
									{...register('reference', { required: true })}
								/>
								{errors.reference?.type === 'required' && (
									<p className='mt-1 text-danger'>Reference is required</p>
								)}
							</Grid>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='Machine No.'
									variant='outlined'
									type='text'
									size='small'
									className={classes.inputFieldStyle1}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
									{...register('reference', { required: true })}
								/>
								{errors.reference?.type === 'required' && (
									<p className='mt-1 text-danger'>Reference is required</p>
								)}
							</Grid>
						</Grid>
					</Container>
					<Container className={classes.mainContainer}>
						<Grid container spacing={1} style={{ marginTop: 15 }}>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='Order No.'
									variant='outlined'
									type='text'
									size='small'
									className={classes.inputFieldStyle1}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
									{...register('paymentTerm', { required: true })}
								/>
								{errors.paymentTerm?.type === 'required' && (
									<p className='mt-1 text-danger'>Payment Terms required</p>
								)}
							</Grid>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='Raw Material'
									variant='outlined'
									type='text'
									size='small'
									className={classes.inputFieldStyle1}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
									{...register('paymentSubject', { required: true })}
								/>
								{errors.paymentSubject?.type === 'required' && (
									<p className='mt-1 text-danger'>Payment Subject is required</p>
								)}
							</Grid>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='Production Hours'
									variant='outlined'
									type='text'
									size='small'
									className={classes.inputFieldStyle1}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
									{...register('paymentSubject', { required: true })}
								/>
								{errors.paymentSubject?.type === 'required' && (
									<p className='mt-1 text-danger'>Payment Subject is required</p>
								)}
							</Grid>
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
									InputLabelProps={{ style: { fontSize: 14 } }}
									{...register('vendor', { required: true })}>
									{!shifts || !shifts.length ? (
										<p>Data Not Found</p>
									) : (
										shifts.map((verifiedVendor) => (
											<MenuItem
												value={verifiedVendor._id}
												key={verifiedVendor._id}
												onClick={() => {
													setVendorId(verifiedVendor._id);
													setVendorAddress(verifiedVendor.location);
													setVendorMaterial(verifiedVendor.material);
												}}>
												{verifiedVendor.name}
											</MenuItem>
										))
									)}
								</CssTextField>
							</Grid>
						</Grid>
					</Container>
					<div style={{ marginTop: 30, marginBottom: 30 }}>
						<hr />
					</div>
					<Container className={classes.mainContainer}>
						<h4 className='text-left'>Items</h4>
						{ItemCounter.map((value, i) => {
							const no = i + 1;
							return (
								<>
									<Grid container spacing={1} style={{ marginTop: 15 }}>
										<Grid item lg={1} md={1} sm={12} xs={12}>
											{no}
										</Grid>
										<Grid item lg={2} md={2} sm={12} xs={12}>
											<CssTextField
												id='outlined-basic'
												label='Production Hours'
												variant='outlined'
												type='text'
												size='small'
												className={classes.inputFieldStyle1}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
												{...register('paymentSubject', { required: true })}
											/>
											{errors.paymentSubject?.type === 'required' && (
												<p className='mt-1 text-danger'>Payment Subject is required</p>
											)}
										</Grid>
										<Grid item lg={1} md={1} sm={12} xs={12}></Grid>
										<Grid item lg={2} md={2} sm={12} xs={12}>
											<CssTextField
												id='outlined-basic'
												label='Production Hours'
												variant='outlined'
												type='text'
												size='small'
												className={classes.inputFieldStyle1}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
												{...register('paymentSubject', { required: true })}
											/>
											{errors.paymentSubject?.type === 'required' && (
												<p className='mt-1 text-danger'>Payment Subject is required</p>
											)}
										</Grid>
										<Grid item lg={1} md={1} sm={12} xs={12}></Grid>

										<Grid item lg={2} md={2} sm={12} xs={12}>
											<CssTextField
												id='outlined-basic'
												label='Production Hours'
												variant='outlined'
												type='text'
												size='small'
												className={classes.inputFieldStyle1}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
												{...register('paymentSubject', { required: true })}
											/>
											{errors.paymentSubject?.type === 'required' && (
												<p className='mt-1 text-danger'>Payment Subject is required</p>
											)}
										</Grid>
										<Grid item lg={1} md={1} sm={12} xs={12}></Grid>

										<Grid item lg={2} md={2} sm={12} xs={12}>
											<CssTextField
												id='outlined-basic'
												label='Production Hours'
												variant='outlined'
												type='text'
												size='small'
												className={classes.inputFieldStyle1}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
												{...register('paymentSubject', { required: true })}
											/>
											{errors.paymentSubject?.type === 'required' && (
												<p className='mt-1 text-danger'>Payment Subject is required</p>
											)}
										</Grid>
									</Grid>
									<Grid container spacing={1} style={{ marginTop: 15 }}>
										<Grid item lg={1} md={1} sm={12} xs={12}></Grid>

										<Grid item lg={2} md={2} sm={12} xs={12}>
											<CssTextField
												id='outlined-basic'
												label='Production Hours'
												variant='outlined'
												type='text'
												size='small'
												className={classes.inputFieldStyle1}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
												{...register('paymentSubject', { required: true })}
											/>
											{errors.paymentSubject?.type === 'required' && (
												<p className='mt-1 text-danger'>Payment Subject is required</p>
											)}
										</Grid>
										<Grid item lg={1} md={1} sm={12} xs={12}></Grid>

										<Grid item lg={2} md={2} sm={12} xs={12}>
											<CssTextField
												id='outlined-basic'
												label='Production Hours'
												variant='outlined'
												type='text'
												size='small'
												className={classes.inputFieldStyle1}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
												{...register('paymentSubject', { required: true })}
											/>
											{errors.paymentSubject?.type === 'required' && (
												<p className='mt-1 text-danger'>Payment Subject is required</p>
											)}
										</Grid>
										<Grid item lg={1} md={1} sm={12} xs={12}></Grid>

										<Grid item lg={2} md={2} sm={12} xs={12}>
											<CssTextField
												id='outlined-basic'
												label='Production Hours'
												variant='outlined'
												type='text'
												size='small'
												className={classes.inputFieldStyle1}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
												{...register('paymentSubject', { required: true })}
											/>
											{errors.paymentSubject?.type === 'required' && (
												<p className='mt-1 text-danger'>Payment Subject is required</p>
											)}
										</Grid>
										<Grid item lg={1} md={1} sm={12} xs={12}></Grid>

										<Grid item lg={2} md={2} sm={12} xs={12}>
											<CssTextField
												id='outlined-basic'
												label='Production Hours'
												variant='outlined'
												type='text'
												size='small'
												className={classes.inputFieldStyle1}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
												{...register('paymentSubject', { required: true })}
											/>
											{errors.paymentSubject?.type === 'required' && (
												<p className='mt-1 text-danger'>Payment Subject is required</p>
											)}
										</Grid>
									</Grid>
									<Grid container spacing={1} style={{ marginTop: 15 }}>
										<Grid item lg={1} md={1} sm={12} xs={12}></Grid>

										<Grid item lg={2} md={2} sm={12} xs={12}>
											<CssTextField
												id='outlined-basic'
												label='Production Hours'
												variant='outlined'
												type='text'
												size='small'
												className={classes.inputFieldStyle1}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
												{...register('paymentSubject', { required: true })}
											/>
											{errors.paymentSubject?.type === 'required' && (
												<p className='mt-1 text-danger'>Payment Subject is required</p>
											)}
										</Grid>
										<Grid item lg={1} md={1} sm={12} xs={12}></Grid>

										<Grid item lg={2} md={2} sm={12} xs={12}>
											<CssTextField
												id='outlined-basic'
												label='Production Hours'
												variant='outlined'
												type='text'
												size='small'
												className={classes.inputFieldStyle1}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
												{...register('paymentSubject', { required: true })}
											/>
											{errors.paymentSubject?.type === 'required' && (
												<p className='mt-1 text-danger'>Payment Subject is required</p>
											)}
										</Grid>
										<Grid item lg={1} md={1} sm={12} xs={12}></Grid>
									</Grid>
								</>
							);
						})}
						<Grid container spacing={1}>
							<Grid item lg={3} md={3} sm={10} xs={11}>
								<Button
									variant='outlined'
									color='primary'
									className={classes.addButton}
									onClick={addMoreFunc}
									// style={{ marginLeft: 'auto', marginRight: 'auto' }}
								>
									Add More
								</Button>
							</Grid>
						</Grid>
						<Grid container spacing={1}>
							<Grid item lg={5} md={5} sm={10} xs={11}></Grid>
							<Grid item lg={3} md={3} sm={10} xs={11}>
								<Button
									variant='outlined'
									color='primary'
									type='submit'
									className={classes.addButton}
									onClick={() => {
										// console.log(ItemCounter)
										// history.push('/purchase/purchase_requisition/print_purchase_requisition')
									}}
									// style={{ marginLeft: 'auto', marginRight: 'auto' }}
								>
									Submit
								</Button>
							</Grid>
						</Grid>
					</Container>
				</form>
				{/* </form> */}
			</div>
		</Sidenav>
	);
};

export default PurchaseReport;
