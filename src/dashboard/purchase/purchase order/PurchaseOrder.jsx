import React, { useState, useEffect } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
// import axios from 'axios';
import { getVendorAction } from '../../../services/action/VendorAction';
import { fetchDepartmentsAction } from '../../../services/action/DepartmentAction';
import { createPurchaseOrderAction } from '../../../services/action/OrdersAction';
import { fetchRequisitionAction } from '../../../services/action/PurchaseReqAction';
import { getMaterialAction } from '../../../services/action/MaterialDataHandle';
import MyButton from '../../../components/utils/Button';

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

const PurchaseOrder = ({ history }) => {
	const [selectedRequest, setSelectedRequests] = React.useState({});

	console.log(selectedRequest);

	const classes = useStyles();

	const dispatch = useDispatch();

	// const [ItemCounter, setItemCounter] = useState([{ id: 'text' }])
	const [ItemCounter, setItemCounter] = useState([
		{ material: '', quantity: '', unitValue: '', remarks: '' },
	]);
	const [VendorId, setVendorId] = useState('');
	const [VendorAddress, setVendorAddress] = useState('');
	const [vendorMaterial, setVendorMaterial] = useState([]);
	const [AddOrderSuccess, setAddOrderSuccess] = useState(false);
	const [AddOrderError, setAddOrderError] = useState(false);
	const [materialsState, setMaterials] = useState([]);
	const [createLoading, setCreateLoading] = useState(false);
	const [success, setSuccess] = useState();
	const [createError, setCreateError] = useState();

	useEffect(() => {
		if (selectedRequest) {
			setMaterials(selectedRequest?.materials);
		}
	}, [selectedRequest]);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		dispatch(getVendorAction('verified=true'));
		dispatch(fetchDepartmentsAction());
		dispatch(fetchRequisitionAction());
		dispatch(getMaterialAction());
	}, [dispatch]);

	const { vendors } = useSelector((state) => state.vendors);
	const { departments } = useSelector((state) => state.departments);
	const { purchaseRequisitions } = useSelector(
		(state) => state.purchaseRequisitions,
	);
	const { materials } = useSelector((state) => state.materials);

	const onSubmitDate = async (props) => {
		const tempMaterials = [];
		materialsState.forEach((el) => {
			tempMaterials.push({
				material: el.material._id,
				quantity: el?.quantity,
				unitValue: el?.unitValue,
				remarks: el?.remarks,
			});
		});
		console.log(tempMaterials);
		try {
			setCreateLoading(true);
			dispatch(
				createPurchaseOrderAction({ ...props, materials: tempMaterials }, (err) => {
					if (err) {
						setCreateError(err);
						setTimeout(() => {
							setCreateError('');
						}, 4000);
					} else {
						setSuccess(true);
						setTimeout(() => {
							setSuccess(false);
						}, 4000);
					}
					setCreateLoading(false);
				}),
			);
			setAddOrderSuccess(true);
			setAddOrderError(false);
		} catch (error) {
			setAddOrderError(true);
			setAddOrderSuccess(false);
		}
	};

	return (
		<Sidenav title={'Purchase Order'}>
			<div>
				<form action='' onSubmit={handleSubmit(onSubmitDate)}>
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
									InputLabelProps={{ style: { fontSize: 14 } }}
									{...register('vendor', { required: true })}>
									{!vendors || !vendors.length ? (
										<p>Data Not Found</p>
									) : (
										vendors.map((el) => (
											<MenuItem
												value={el?._id}
												key={el?._id}
												onClick={() => {
													setVendorId(el?._id);
													setVendorAddress(el?.location);
													setVendorMaterial(el?.materials);
												}}>
												{el?.name}
											</MenuItem>
										))
									)}
								</CssTextField>
							</Grid>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='P.O. No.'
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
									label='Address'
									variant='outlined'
									type='text'
									size='small'
									disabled
									value={VendorAddress}
									className={classes.inputFieldStyle1}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
								/>
							</Grid>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='Department'
									variant='outlined'
									type='text'
									size='small'
									select
									className={classes.inputFieldStyle1}
									inputProps={{ style: { fontSize: 14 } }}
									{...register('department', { required: true })}
									InputLabelProps={{ style: { fontSize: 14 } }}>
									{departments &&
										departments.map((el) => (
											<MenuItem key={el._id} value={el._id}>
												{el.name}
											</MenuItem>
										))}
								</CssTextField>
							</Grid>
						</Grid>
					</Container>
					<Container className={classes.mainContainer}>
						<Grid container spacing={1} style={{ marginTop: 15 }}>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='Your Reference'
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
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='P.R.No.'
									variant='outlined'
									type='text'
									size='small'
									select
									className={classes.inputFieldStyle}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
									{...register('prNum', { required: true })}>
									{purchaseRequisitions &&
										purchaseRequisitions.map((el) => (
											<MenuItem
												key={el._id}
												value={el._id}
												onClick={() => setSelectedRequests(el)}>
												{el.code}
											</MenuItem>
										))}
								</CssTextField>
								{errors.prNum?.type === 'required' && (
									<p className='mt-1 text-danger'>P.R. No. is required</p>
								)}
							</Grid>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='Payment Terms'
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
									label='Payment Subject To'
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
					</Container>
					<div style={{ marginTop: 30, marginBottom: 30 }}>
						<hr />
					</div>
					<Container className={classes.mainContainer}>
						<h4 className='text-left'>Items</h4>
						{materialsState?.map((el, i) => {
							const no = i + 1;
							return (
								<Grid key={i} container spacing={1} style={{ marginTop: 15 }}>
									<Grid item lg={1} md={1}>
										<h5 className={classes.itemHeading}>{no}</h5>
									</Grid>
									<Grid item lg={2} md={2} sm={12} xs={12}>
										<CssTextField
											id='outlined-basic'
											label='Select Item'
											variant='outlined'
											type='text'
											size='small'
											className={classes.inputFieldStyle2}
											value={el?.material?._id}
											disabled
											select
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}>
											{materials &&
												materials.map((el) => (
													<MenuItem
														key={el._id}
														value={el._id}
														onClick={() => setSelectedRequests(el)}>
														{el.name}
													</MenuItem>
												))}
										</CssTextField>
									</Grid>
									<Grid item lg={1} md={1} sm={12} xs={12}></Grid>
									<Grid item lg={2} md={2} sm={12} xs={12}>
										<CssTextField
											id='outlined-basic'
											label='Quantity'
											variant='outlined'
											type='number'
											size='small'
											value={el.quantity}
											disabled
											className={classes.inputFieldStyle3}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
										/>
									</Grid>
									<Grid item lg={2} md={2} sm={12} xs={12}>
										<CssTextField
											id='outlined-basic'
											label='Unit'
											variant='outlined'
											type='text'
											size='small'
											value={el.unitValue}
											disabled
											className={classes.inputFieldStyle4}
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
											size='small'
											value={el.remarks}
											disabled
											className={classes.inputFieldStyle5}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
										/>
									</Grid>
								</Grid>
							);
						})}
						{AddOrderError ? (
							<p className='mt-3 text-danger'>
								{' '}
								Something Went Wrong. Internal Server Error{' '}
							</p>
						) : null}
						{AddOrderSuccess ? (
							<p className='mt-3 text-success'> Purchase Order Added Successfully</p>
						) : null}
						<Grid container spacing={1}>
							<Grid item lg={5} md={5} sm={10} xs={11}></Grid>
							<Grid item lg={3} md={3} sm={10} xs={11}>
								<MyButton
									variant='outlined'
									color='primary'
									text='Submit'
									loading={createLoading}
									loaderColor='#333'
									classNames={classes.addButton}
								/>
								{createError && <p>{createError}</p>}
							</Grid>
						</Grid>
					</Container>
				</form>
			</div>
		</Sidenav>
	);
};

export default PurchaseOrder;
