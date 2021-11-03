import React, { useState, useEffect } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { getVendorAction } from '../../../services/action/VendorAction';
import { fetchDepartmentsAction } from '../../../services/action/DepartmentAction';
import { createPurchaseOrderAction } from '../../../services/action/OrdersAction';
import { fetchRequisitionAction } from '../../../services/action/PurchaseReqAction';
import { getMaterialAction } from '../../../services/action/MaterialDataHandle';
import MyButton from '../../../components/utils/Button';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import Loader from 'react-loader-spinner';
import Button from '../../../components/utils/Button';

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

const initialValues = {
	department: '',
	prNum: '',
	paymentTerm: '',
	paymentSubject: '',
};

const validationSchema = yup.object({
	department: yup.string().required(),
	prNum: yup.string().required(),
	paymentTerm: yup.string().required(),
	paymentSubject: yup.string().required(),
});

const PurchaseOrder = ({ history }) => {
	const [selectedRequest, setSelectedRequests] = React.useState({});
	const [VendorId, setVendorId] = useState('');
	const [VendorAddress, setVendorAddress] = useState('');
	const [vendorMaterial, setVendorMaterial] = useState([]);
	const [materialsState, setMaterials] = useState([]);
	const [createLoading, setCreateLoading] = useState(false);
	const [success, setSuccess] = useState();
	const [createError, setCreateError] = useState();
	const [materialsLoading, setMaterialsLoading] = React.useState(false);
	const [ItemCounter, setItemCounter] = useState([
		{ material: '', quantity: '', unitValue: '', remarks: '' },
	]);
	const [totalAmount, setTotalAmount] = useState(0);

	const classes = useStyles();

	const dispatch = useDispatch();

	useEffect(async () => {
		if (selectedRequest) {
			let tempTotalAmount = 0;
			if (selectedRequest?.materials?.length > 0) {
				setMaterialsLoading(true);
				let index = 0;
				for (const el of selectedRequest?.materials) {
					let availableVendors = [];
					const itemTotalPrice = el?.quantity * el?.material?.price;
					tempTotalAmount += itemTotalPrice;
					await dispatch(
						getVendorAction(
							`verified=true&materials=${el?.material?._id}`,
							(err, data) => {
								if (err) {
									availableVendors.push({
										id: 'empty',
										name: 'No Vendors Found',
									});
								}
								if (data) {
									if (data.length > 0) {
										availableVendors = [...data];
									} else {
										availableVendors.push({
											id: 'empty',
											name: 'No Vendors Found',
										});
									}
								}
								index++;
								setMaterials((prev) => [
									...prev,
									{
										...el,
										vendor: '',
										availableVendors,
										itemTotalPrice,
									},
								]);
								if (index === selectedRequest?.materials?.length) {
									setMaterialsLoading(false);
								}
							}
						)
					);
				}
				setTotalAmount(tempTotalAmount);
			}
		}
	}, [selectedRequest]);

	useEffect(() => {
		dispatch(fetchDepartmentsAction());
		dispatch(fetchRequisitionAction('status=Requested'));
		dispatch(getMaterialAction());
	}, [dispatch]);

	const { departments } = useSelector((state) => state.departments);
	const { purchaseRequisitions } = useSelector(
		(state) => state.purchaseRequisitions
	);
	const { materials } = useSelector((state) => state.materials);

	const onSubmit = async (values) => {
		const tempMaterials = [];
		let error = false;
		materialsState.forEach((el) => {
			if (!el?.vendor) {
				error = true;
				setCreateError('Please add vendors for all requested materials');
				setTimeout(() => {
					setCreateError('');
				}, 4000);
			}
			tempMaterials.push({
				material: el.material._id,
				quantity: el?.quantity,
				remarks: el?.remarks,
				vendor: el?.vendor,
			});
		});
		if (!error) {
			setCreateLoading(true);
			dispatch(
				createPurchaseOrderAction(
					{ ...values, materials: tempMaterials },
					(err) => {
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
					}
				)
			);
		}
	};

	const setVendorForMaterial = (index, vendor) => {
		if (vendor) {
			setMaterials((prev) =>
				prev.map((el, i) => (i === index ? { ...el, vendor } : el))
			);
		}
	};

	return (
		<Sidenav title={'Purchase Order'}>
			<div>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={onSubmit}
				>
					{(props) => (
						<Form autoComplete="off">
							<Container className={classes.mainContainer}>
								<Grid container spacing={1} style={{ marginTop: 15 }}>
									<Grid
										item
										lg={12}
										md={12}
										sm={12}
										xs={12}
										style={{
											textAlign: 'left',
											marginBottom: '2rem',
										}}
									>
										<p>Select Purchase Request #</p>
										<CssTextField
											id="outlined-basic"
											label="P.R.No."
											variant="outlined"
											type="text"
											size="small"
											style={{ width: '40%' }}
											select
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('prNum')}
											onBlur={props.handleBlur('prNum')}
											value={props.values.prNum}
											helperText={
												props.touched.prNum && props.errors.prNum
											}
											error={
												props.touched.prNum && props.errors.prNum
											}
										>
											{purchaseRequisitions?.length === 0 ? (
												<MenuItem disabled>No Data Found</MenuItem>
											) : (
												purchaseRequisitions.map((el) => (
													<MenuItem
														key={el._id}
														value={el._id}
														onClick={() =>
															setSelectedRequests(el)
														}
													>
														{el.code}
													</MenuItem>
												))
											)}
										</CssTextField>
									</Grid>

									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="Department"
											variant="outlined"
											type="text"
											size="small"
											style={{ width: '100%' }}
											select
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('department')}
											onBlur={props.handleBlur('department')}
											value={props.values.department}
											helperText={
												props.touched.department &&
												props.errors.department
											}
											error={
												props.touched.department &&
												props.errors.department
											}
										>
											{departments &&
												departments.map((el) => (
													<MenuItem key={el._id} value={el._id}>
														{el.name}
													</MenuItem>
												))}
										</CssTextField>
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="Payment Terms"
											variant="outlined"
											type="text"
											style={{ width: '100%' }}
											size="small"
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('paymentTerm')}
											onBlur={props.handleBlur('paymentTerm')}
											value={props.values.paymentTerm}
											helperText={
												props.touched.paymentTerm &&
												props.errors.paymentTerm
											}
											error={
												props.touched.paymentTerm &&
												props.errors.paymentTerm
											}
										/>
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="Payment Subject To"
											variant="outlined"
											type="text"
											size="small"
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('paymentSubject')}
											onBlur={props.handleBlur('paymentSubject')}
											value={props.values.paymentSubject}
											helperText={
												props.touched.paymentSubject &&
												props.errors.paymentSubject
											}
											error={
												props.touched.paymentSubject &&
												props.errors.paymentSubject
											}
										/>
									</Grid>
								</Grid>
							</Container>
							<div style={{ marginTop: 30, marginBottom: 30 }}>
								<hr />
							</div>
							<Container className={classes.mainContainer}>
								{materialsLoading ? (
									<div
										style={{
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											marginTop: '3rem',
										}}
									>
										<Loader
											type="TailSpin"
											color="#000"
											width="3rem"
											height="3rem"
										/>
									</div>
								) : (
									materialsState?.map((el, i) => {
										return (
											<>
												{i === 0 && (
													<div style={{ textAlign: 'left' }}>
														<h4>Items</h4>
													</div>
												)}
												<Grid
													key={i}
													container
													spacing={1}
													style={{ marginTop: 15 }}
												>
													<Grid item lg={2} md={2} sm={12} xs={12}>
														<CssTextField
															id="outlined-basic"
															label="Select Item"
															variant="outlined"
															type="text"
															size="small"
															value={el?.material?._id}
															disabled
															select
															style={{ width: '100%' }}
															inputProps={{
																style: { fontSize: 14 },
															}}
															InputLabelProps={{
																style: { fontSize: 14 },
															}}
														>
															{materials &&
																materials.map((el) => (
																	<MenuItem
																		key={el._id}
																		value={el._id}
																		onClick={() =>
																			setSelectedRequests(el)
																		}
																	>
																		{el.name}
																	</MenuItem>
																))}
														</CssTextField>
													</Grid>
													<Grid item lg={2} md={2} sm={12} xs={12}>
														<CssTextField
															id="outlined-basic"
															label="Quantity"
															variant="outlined"
															type="number"
															style={{ width: '100%' }}
															size="small"
															value={el.quantity}
															disabled
															inputProps={{
																style: { fontSize: 14 },
															}}
															InputLabelProps={{
																style: { fontSize: 14 },
															}}
														/>
													</Grid>
													<Grid item lg={2} md={2} sm={12} xs={12}>
														<CssTextField
															id="outlined-basic"
															label="Unit"
															variant="outlined"
															type="text"
															style={{ width: '100%' }}
															size="small"
															value={el?.material?.unit?.name}
															disabled
															inputProps={{
																style: { fontSize: 14 },
															}}
															InputLabelProps={{
																style: { fontSize: 14 },
															}}
														/>
													</Grid>
													<Grid item lg={2} md={2} sm={12} xs={12}>
														<CssTextField
															id="outlined-basic"
															label="Per unit price"
															variant="outlined"
															type="text"
															style={{ width: '100%' }}
															size="small"
															value={el?.material?.price}
															disabled
															inputProps={{
																style: { fontSize: 14 },
															}}
															InputLabelProps={{
																style: { fontSize: 14 },
															}}
														/>
													</Grid>
													<Grid item lg={2} md={2} sm={12} xs={12}>
														<CssTextField
															id="outlined-basic"
															label="Remarks"
															variant="outlined"
															type="text"
															style={{ width: '100%' }}
															size="small"
															value={el.remarks}
															disabled
															inputProps={{
																style: { fontSize: 14 },
															}}
															InputLabelProps={{
																style: { fontSize: 14 },
															}}
														/>
													</Grid>
													<Grid item lg={2} md={2} sm={12} xs={12}>
														<CssTextField
															id="outlined-basic"
															label="Select Supplier"
															variant="outlined"
															type="text"
															style={{ width: '100%' }}
															value={el?.vendor}
															size="small"
															select
															inputProps={{
																style: { fontSize: 14 },
															}}
															InputLabelProps={{
																style: { fontSize: 14 },
															}}
														>
															{el?.availableVendors &&
																el?.availableVendors.map(
																	(el) => (
																		<MenuItem
																			key={el._id}
																			value={el._id}
																			onClick={() =>
																				setVendorForMaterial(
																					i,
																					el._id
																				)
																			}
																		>
																			{el.name}
																		</MenuItem>
																	)
																)}
														</CssTextField>
													</Grid>
													<Grid item lg={2} md={2} sm={12} xs={12}>
														<CssTextField
															id="outlined-basic"
															label="Item Total Price"
															variant="outlined"
															type="text"
															style={{ width: '100%' }}
															size="small"
															value={el.itemTotalPrice}
															disabled
															inputProps={{
																style: { fontSize: 14 },
															}}
															InputLabelProps={{
																style: { fontSize: 14 },
															}}
														/>
													</Grid>
												</Grid>
											</>
										);
									})
								)}
								<p>Total Amount: {totalAmount}</p>
								<Grid container spacing={1}>
									<Grid item lg={5} md={5} sm={10} xs={11}></Grid>
									<Grid item lg={3} md={3} sm={10} xs={11}>
										<Button
											variant="outlined"
											color="primary"
											text="Submit"
											loading={createLoading}
											loaderColor="#333"
											classNames={classes.addButton}
										/>
										{success && <p>Request ordered successfully</p>}
										{createError && <p>{createError}</p>}
									</Grid>
								</Grid>
							</Container>
						</Form>
					)}
				</Formik>
			</div>
		</Sidenav>
	);
};

export default PurchaseOrder;
