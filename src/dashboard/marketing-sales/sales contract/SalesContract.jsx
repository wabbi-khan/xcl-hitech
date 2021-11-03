import React, { useState, useEffect } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { Formik, Form, FieldArray } from 'formik';
import * as yup from 'yup';
import {
	CustomContainer,
	CustomInput,
	CustomButton,
	CustomTable,
} from '../../../components';
import {
	createSalesContract,
	getSalesContract,
} from '../../../services/action/salesContractAction';
import { withRouter } from 'react-router';

const orderInitialValues = {
	size: '',
	snPn: '',
	unit: '',
	qty: '',
	unitPrice: '',
	total: '',
};

const initialValues1 = {
	ntnNo: '',
	strnNo: '',
	conpanyRegName: '',
	contractor: '',
	companyTelephoneNo: '',
	companyFax: '',
	email: '',
	bussinessAddress: '',
	bussinessTelephoneNo: '',
	bussinessFax: '',
	bussinessEmail: '',
};

const initialValues2 = {
	deliverAddress: '',
	deliveryTelephoneNo: '',
	deliveryFax: '',
	deliveryEmail: '',
	nationalityOfComp: '',
	nameCompany: '',
};

const initialValuesOfOrder = {
	orders: [
		{
			...orderInitialValues,
		},
	],
};

const initialValues3 = {
	remarks: '',
	actualPrice: '',
	discountPerc: '',
	contractPrice: '',
	otherConditions: '',
};

const initialValues4 = {
	nameOfSeller: '',
	totalAmountOfContract: '',
	timeOfDelivery: '',
	termOfPayments: '',
	transportation: '',
};

const validationSchema1 = yup.object({
	ntnNo: yup.string().required(),
	strnNo: yup.string().required(),
	conpanyRegName: yup.string().required(),
	contractor: yup.string().required(),
	companyTelephoneNo: yup.string().required(),
	companyFax: yup.string().required(),
	email: yup.string().required(),
	bussinessAddress: yup.string().required(),
	bussinessTelephoneNo: yup.string().required(),
	bussinessFax: yup.string().required(),
	bussinessEmail: yup.string().required(),
});

const validationSchema2 = yup.object({
	deliverAddress: yup.string().required(),
	deliveryTelephoneNo: yup.string().required(),
	deliveryFax: yup.string().required(),
	deliveryEmail: yup.string().required(),
	nationalityOfComp: yup.string().required(),
	nameCompany: yup.string().required(),
});

const validationSchemaForOrder = yup.object({
	orders: yup.array().of(
		yup.object().shape({
			size: yup.string().required('size is required'),
			snPn: yup.string().required('sn / pn is required'),
			unit: yup.string().required('unit is required'),
			qty: yup.string().required('quantity is required'),
			unitPrice: yup.string().required('unit price is required'),
			total: yup.string().required('total is required'),
		})
	),
});

const validationSchema3 = yup.object({
	remarks: yup.string().required(),
	actualPrice: yup.string().required(),
	discountPerc: yup.string().required(),
	contractPrice: yup.string().required(),
	otherConditions: yup.string().required(),
});

const validationSchema4 = yup.object({
	nameOfSeller: yup.string().required(),
	totalAmountOfContract: yup.string().required(),
	timeOfDelivery: yup.string().required(),
	termOfPayments: yup.string().required(),
	transportation: yup.string().required(),
});

const SalesContract = ({ history }) => {
	const [fetchLoading, setFetchLoading] = useState(true);
	const [fetchError, setFetchError] = useState('');
	const [createLoading, setCreateLoading] = useState(false);
	const [createError, setCreateError] = useState('');
	const [success, setSuccess] = useState('');
	const [total, setTotal] = useState(0);
	const [incomeTax, setIncomeTax] = useState(0);
	const [grandTotal, setGrandTotal] = useState(0);

	const { salesContracts } = useSelector((state) => state.salesContracts);

	const dispatch = useDispatch();

	let form1 = null;
	let form2 = null;
	let form3 = null;
	let form4 = null;
	let form5 = null;

	useEffect(() => {
		setFetchLoading(true);
		dispatch(
			getSalesContract(null, (err) => {
				if (err) {
					setFetchError(err);
					setTimeout(() => {
						setFetchError('');
					}, 4000);
				}
				setFetchLoading(false);
			})
		);
	}, []);

	const onSubmit = async (values) => {
		let error = false;
		const form1Errors = await form1.validateForm();
		if (!isEmpty(form1Errors)) {
			form1.setTouched(form1Errors);
			error = true;
		}
		const form2Errors = await form2.validateForm();
		if (!isEmpty(form2Errors)) {
			form2.setTouched(form2Errors);
			error = true;
		}
		const form4Errors = await form4.validateForm();
		if (!isEmpty(form4Errors)) {
			form4.setTouched(form4Errors);
			error = true;
		}
		const form5Errors = await form5.validateForm();
		if (!isEmpty(form5Errors)) {
			form5.setTouched(form5Errors);
			error = true;
		}

		if (error) return;

		values = {
			...form1.values,
			...form2.values,
			...form3.values,
			...form4.values,
			...form5.values,
			total,
			incomeTax,
			grandTotal,
		};

		setCreateLoading(true);
		dispatch(
			createSalesContract(values, (err) => {
				if (err) {
					setCreateError(err);
					setTimeout(() => {
						setCreateError('');
					}, 4000);
				} else {
					setSuccess('Sales Contract successfully added');
					setTimeout(() => {
						setSuccess('');
					}, 4000);
				}
				setCreateLoading(false);
			})
		);
	};

	function isEmpty(obj) {
		for (var x in obj) {
			if (obj.hasOwnProperty(x)) return false;
		}
		return true;
	}

	const printContract = (salesContract) => {
		history.push({
			pathname: '/marketing_dashboard/print_sales_contract',
			state: { salesContract },
		});
	};

	return (
		<Sidenav title={'Sales Contract'}>
			<CustomContainer>
				<Formik
					initialValues={initialValues1}
					validationSchema={validationSchema1}
					onSubmit={onSubmit}
				>
					{(props) => {
						form1 = props;
						return (
							<Form>
								<Grid container spacing={1} style={{ marginTop: 15 }}>
									<Grid item lg={2} md={2} sm={12} xs={12}>
										<CustomInput
											label="Enter NTN No."
											onChange={props.handleChange('ntnNo')}
											value={props.values.ntnNo}
											onBlur={props.handleBlur('ntnNo')}
											helperText={
												props.touched.ntnNo && props.errors.ntnNo
											}
											error={
												props.touched.ntnNo && props.errors.ntnNo
											}
										/>
									</Grid>
									<Grid item lg={2} md={2} sm={12} xs={12}>
										<CustomInput
											label="Enter STRN No."
											onChange={props.handleChange('strnNo')}
											value={props.values.strnNo}
											onBlur={props.handleBlur('strnNo')}
											helperText={
												props.touched.strnNo && props.errors.strnNo
											}
											error={
												props.touched.strnNo && props.errors.strnNo
											}
										/>
									</Grid>
								</Grid>
								<Grid container spacing={1} style={{ marginTop: 10 }}>
									<Grid item lg={2} md={2} sm={12} xs={12}>
										<CustomInput
											label="Reg. Name of Company"
											onChange={props.handleChange('conpanyRegName')}
											value={props.values.conpanyRegName}
											onBlur={props.handleBlur('conpanyRegName')}
											helperText={
												props.touched.conpanyRegName &&
												props.errors.conpanyRegName
											}
											error={
												props.touched.conpanyRegName &&
												props.errors.conpanyRegName
											}
										/>
									</Grid>
									<Grid item lg={2} md={2} sm={12} xs={12}>
										<CustomInput
											label="Contractor"
											onChange={props.handleChange('contractor')}
											value={props.values.contractor}
											onBlur={props.handleBlur('contractor')}
											helperText={
												props.touched.contractor &&
												props.errors.contractor
											}
											error={
												props.touched.contractor &&
												props.errors.contractor
											}
										/>
									</Grid>
									<Grid item lg={2} md={2} sm={12} xs={12}>
										<CustomInput
											label="Telephone No."
											onChange={props.handleChange(
												'companyTelephoneNo'
											)}
											value={props.values.companyTelephoneNo}
											onBlur={props.handleBlur('companyTelephoneNo')}
											helperText={
												props.touched.companyTelephoneNo &&
												props.errors.companyTelephoneNo
											}
											error={
												props.touched.companyTelephoneNo &&
												props.errors.companyTelephoneNo
											}
										/>
									</Grid>
									<Grid item lg={2} md={2} sm={12} xs={12}>
										<CustomInput
											label="Fax"
											onChange={props.handleChange('companyFax')}
											value={props.values.companyFax}
											onBlur={props.handleBlur('companyFax')}
											helperText={
												props.touched.companyFax &&
												props.errors.companyFax
											}
											error={
												props.touched.companyFax &&
												props.errors.companyFax
											}
										/>
									</Grid>
									<Grid item lg={2} md={2} sm={12} xs={12}>
										<CustomInput
											label="Email"
											onChange={props.handleChange('email')}
											value={props.values.email}
											onBlur={props.handleBlur('email')}
											helperText={
												props.touched.email && props.errors.email
											}
											error={
												props.touched.email && props.errors.email
											}
										/>
									</Grid>
								</Grid>
								<Grid container spacing={1} style={{ marginTop: 10 }}>
									<Grid item lg={2} md={2} sm={12} xs={12}>
										<CustomInput
											label="Business Address"
											onChange={props.handleChange(
												'bussinessAddress'
											)}
											value={props.values.bussinessAddress}
											onBlur={props.handleBlur('bussinessAddress')}
											helperText={
												props.touched.bussinessAddress &&
												props.errors.bussinessAddress
											}
											error={
												props.touched.bussinessAddress &&
												props.errors.bussinessAddress
											}
										/>
									</Grid>
									<Grid item lg={2} md={2} sm={12} xs={12}>
										<CustomInput
											label="Telephone No."
											onChange={props.handleChange(
												'bussinessTelephoneNo'
											)}
											value={props.values.bussinessTelephoneNo}
											onBlur={props.handleBlur(
												'bussinessTelephoneNo'
											)}
											helperText={
												props.touched.bussinessTelephoneNo &&
												props.errors.bussinessTelephoneNo
											}
											error={
												props.touched.bussinessTelephoneNo &&
												props.errors.bussinessTelephoneNo
											}
										/>
									</Grid>
									<Grid item lg={2} md={2} sm={12} xs={12}>
										<CustomInput
											label="Fax"
											onChange={props.handleChange('bussinessFax')}
											value={props.values.bussinessFax}
											onBlur={props.handleBlur('bussinessFax')}
											helperText={
												props.touched.bussinessFax &&
												props.errors.bussinessFax
											}
											error={
												props.touched.bussinessFax &&
												props.errors.bussinessFax
											}
										/>
									</Grid>
									<Grid item lg={2} md={2} sm={12} xs={12}>
										<CustomInput
											label="Email"
											onChange={props.handleChange('bussinessEmail')}
											value={props.values.bussinessEmail}
											onBlur={props.handleBlur('bussinessEmail')}
											helperText={
												props.touched.bussinessEmail &&
												props.errors.bussinessEmail
											}
											error={
												props.touched.bussinessEmail &&
												props.errors.bussinessEmail
											}
										/>
									</Grid>
								</Grid>
								<CustomButton
									text="Submit"
									style={{ display: 'none' }}
								/>
							</Form>
						);
					}}
				</Formik>

				<Formik
					initialValues={initialValues2}
					validationSchema={validationSchema2}
					onSubmit={onSubmit}
				>
					{(props) => {
						form2 = props;
						return (
							<Form>
								<Grid container spacing={1} style={{ marginTop: 10 }}>
									<Grid item lg={2} md={2} sm={12} xs={12}>
										<CustomInput
											label="Delivery Address"
											onChange={props.handleChange('deliverAddress')}
											value={props.values.deliverAddress}
											onBlur={props.handleBlur('deliverAddress')}
											helperText={
												props.touched.deliverAddress &&
												props.errors.deliverAddress
											}
											error={
												props.touched.deliverAddress &&
												props.errors.deliverAddress
											}
										/>
									</Grid>
									<Grid item lg={2} md={2} sm={12} xs={12}>
										<CustomInput
											label="Telephone No."
											type="number"
											onChange={props.handleChange(
												'deliveryTelephoneNo'
											)}
											value={props.values.deliveryTelephoneNo}
											onBlur={props.handleBlur(
												'deliveryTelephoneNo'
											)}
											helperText={
												props.touched.deliveryTelephoneNo &&
												props.errors.deliveryTelephoneNo
											}
											error={
												props.touched.deliveryTelephoneNo &&
												props.errors.deliveryTelephoneNo
											}
										/>
									</Grid>
									<Grid item lg={2} md={2} sm={12} xs={12}>
										<CustomInput
											label="Fax"
											onChange={props.handleChange('deliveryFax')}
											value={props.values.deliveryFax}
											onBlur={props.handleBlur('deliveryFax')}
											helperText={
												props.touched.deliveryFax &&
												props.errors.deliveryFax
											}
											error={
												props.touched.deliveryFax &&
												props.errors.deliveryFax
											}
										/>
									</Grid>
									<Grid item lg={2} md={2} sm={12} xs={12}>
										<CustomInput
											label="Email"
											type="email"
											onChange={props.handleChange('deliveryEmail')}
											value={props.values.deliveryEmail}
											onBlur={props.handleBlur('deliveryEmail')}
											helperText={
												props.touched.deliveryEmail &&
												props.errors.deliveryEmail
											}
											error={
												props.touched.deliveryEmail &&
												props.errors.deliveryEmail
											}
										/>
									</Grid>
								</Grid>
								<Grid container spacing={1} style={{ marginTop: 10 }}>
									<Grid item lg={2} md={2} sm={12} xs={12}>
										<CustomInput
											label="Nationality Of Component"
											onChange={props.handleChange(
												'nationalityOfComp'
											)}
											value={props.values.nationalityOfComp}
											onBlur={props.handleBlur('nationalityOfComp')}
											helperText={
												props.touched.nationalityOfComp &&
												props.errors.nationalityOfComp
											}
											error={
												props.touched.nationalityOfComp &&
												props.errors.nationalityOfComp
											}
										/>
									</Grid>
								</Grid>
								<Grid container spacing={1} style={{ marginTop: 10 }}>
									<Grid item lg={2} md={2} sm={12} xs={12}>
										<CustomInput
											label="Name Company/Buyer"
											onChange={props.handleChange('nameCompany')}
											value={props.values.nameCompany}
											onBlur={props.handleBlur('nameCompany')}
											helperText={
												props.touched.nameCompany &&
												props.errors.nameCompany
											}
											error={
												props.touched.nameCompany &&
												props.errors.nameCompany
											}
										/>
									</Grid>
								</Grid>
								<CustomButton
									text="Submit"
									style={{ display: 'none' }}
								/>
							</Form>
						);
					}}
				</Formik>

				<Formik
					initialValues={initialValuesOfOrder}
					validationSchema={validationSchemaForOrder}
					onSubmit={onSubmit}
					validateOnMount
				>
					{(props) => {
						form4 = props;
						return (
							<Form>
								<FieldArray name="orders">
									{({ remove, push, form }) => (
										<>
											<div
												style={{
													display: 'flex',
													justifyContent: 'space-between',
													alignItems: 'center',
													marginTop: '1rem',
												}}
											>
												<h5>Orders:</h5>
												<CustomButton
													text="Add More"
													style={{
														backgroundColor: '#22A19A',
														color: '#fff',
													}}
													onClick={() =>
														push({ ...orderInitialValues })
													}
													type="button"
												/>
											</div>
											{form.values.orders.map((el, i) => (
												<Grid
													container
													spacing={1}
													style={{ marginTop: 10 }}
												>
													<Grid item lg={2} md={2} sm={12} xs={12}>
														<CustomInput
															label="Enter Size / Dis"
															onChange={form.handleChange(
																`orders[${i}].size`
															)}
															onBlur={form.handleBlur(
																`orders[${i}].size`
															)}
															value={el.size}
															helperText={
																form.errors.orders &&
																form.touched.orders &&
																form.touched.orders[i] &&
																form.errors.orders[i] &&
																form.touched?.orders[i]?.size &&
																form.errors?.orders[i]?.size
															}
															error={
																form.errors.orders &&
																form.touched.orders &&
																form.touched.orders[i] &&
																form.errors.orders[i] &&
																form.touched?.orders[i]?.size &&
																form.errors?.orders[i]?.size
															}
														/>
													</Grid>
													<Grid item lg={2} md={2} sm={12} xs={12}>
														<CustomInput
															label="SN / PN"
															onChange={form.handleChange(
																`orders[${i}].snPn`
															)}
															onBlur={form.handleBlur(
																`orders[${i}].snPn`
															)}
															value={el.snPn}
															helperText={
																form.errors.orders &&
																form.touched.orders &&
																form.touched.orders[i] &&
																form.errors.orders[i] &&
																form.touched?.orders[i]?.snPn &&
																form.errors?.orders[i]?.snPn
															}
															error={
																form.errors.orders &&
																form.touched.orders &&
																form.touched.orders[i] &&
																form.errors.orders[i] &&
																form.touched?.orders[i]?.snPn &&
																form.errors?.orders[i]?.snPn
															}
														/>
													</Grid>
													<Grid item lg={2} md={2} sm={12} xs={12}>
														<CustomInput
															label="Unit"
															onChange={form.handleChange(
																`orders[${i}].unit`
															)}
															onBlur={form.handleBlur(
																`orders[${i}].unit`
															)}
															value={el.unit}
															helperText={
																form.errors.orders &&
																form.touched.orders &&
																form.touched.orders[i] &&
																form.errors.orders[i] &&
																form.touched?.orders[i]?.unit &&
																form.errors?.orders[i]?.unit
															}
															error={
																form.errors.orders &&
																form.touched.orders &&
																form.touched.orders[i] &&
																form.errors.orders[i] &&
																form.touched?.orders[i]?.unit &&
																form.errors?.orders[i]?.unit
															}
														/>
													</Grid>
													<Grid item lg={2} md={2} sm={12} xs={12}>
														<CustomInput
															label="Qty."
															type="number"
															onChange={(e) => {
																form.setFieldValue(
																	`orders[${i}].qty`,
																	e
																);

																let total =
																	+form.values.orders[i]
																		.unitPrice * e;

																form.setFieldValue(
																	`orders[${i}].total`,
																	total
																);

																form.values.orders.forEach(
																	(order, i2) => {
																		if (i2 !== i) {
																			total += order.total;
																		}
																	}
																);
																setTotal(total);
																let grandTotal =
																	(incomeTax / 100) * total;
																setGrandTotal(
																	total - grandTotal
																);
															}}
															onBlur={form.handleBlur(
																`orders[${i}].qty`
															)}
															value={el.qty}
															helperText={
																form.errors.orders &&
																form.touched.orders &&
																form.touched.orders[i] &&
																form.errors.orders[i] &&
																form.touched?.orders[i]?.qty &&
																form.errors?.orders[i]?.qty
															}
															error={
																form.errors.orders &&
																form.touched.orders &&
																form.touched.orders[i] &&
																form.errors.orders[i] &&
																form.touched?.orders[i]?.qty &&
																form.errors?.orders[i]?.qty
															}
														/>
													</Grid>
													<Grid item lg={2} md={2} sm={12} xs={12}>
														<CustomInput
															label="Unit Price"
															type="number"
															onChange={(e) => {
																form.setFieldValue(
																	`orders[${i}].unitPrice`,
																	e
																);
																let total =
																	+form.values.orders[i].qty *
																	e;
																form.setFieldValue(
																	`orders[${i}].total`,
																	total
																);

																form.values.orders.forEach(
																	(order, i2) => {
																		if (i2 !== i) {
																			total += order.total;
																		}
																	}
																);
																setTotal(total);
																let grandTotal =
																	(incomeTax / 100) * total;
																setGrandTotal(
																	total - grandTotal
																);
															}}
															onBlur={form.handleBlur(
																`orders[${i}].unitPrice`
															)}
															value={el.unitPrice}
															helperText={
																form.errors.orders &&
																form.touched.orders &&
																form.touched.orders[i] &&
																form.errors.orders[i] &&
																form.touched?.orders[i]
																	?.unitPrice &&
																form.errors?.orders[i]
																	?.unitPrice
															}
															error={
																form.errors.orders &&
																form.touched.orders &&
																form.touched.orders[i] &&
																form.errors.orders[i] &&
																form.touched?.orders[i]
																	?.unitPrice &&
																form.errors?.orders[i]
																	?.unitPrice
															}
														/>
													</Grid>
													<Grid item lg={2} md={2} sm={12} xs={12}>
														<CustomInput
															label="Total Amount (Rs.)"
															onChange={form.handleChange(
																`orders[${i}].total`
															)}
															onBlur={form.handleBlur(
																`orders[${i}].total`
															)}
															value={el.total}
															helperText={
																form.errors.orders &&
																form.touched.orders &&
																form.touched.orders[i] &&
																form.errors.orders[i] &&
																form.touched?.orders[i]
																	?.total &&
																form.errors?.orders[i]?.total
															}
															error={
																form.errors.orders &&
																form.touched.orders &&
																form.touched.orders[i] &&
																form.errors.orders[i] &&
																form.touched?.orders[i]
																	?.total &&
																form.errors?.orders[i]?.total
															}
															disabled
														/>
													</Grid>
													<div
														style={{
															display: 'flex',
															justifyContent: 'flex-end',
															width: '100%',
														}}
													>
														{i !== 0 && (
															<CustomButton
																text="Delete"
																onClick={() => {
																	if (i !== 0) {
																		let rowTotal =
																			form.values.orders[i]
																				.total;

																		let currTotal =
																			total - rowTotal;

																		setTotal(currTotal);

																		let grandTotal =
																			(incomeTax / 100) *
																			currTotal;
																		setGrandTotal(
																			currTotal - grandTotal
																		);

																		i !== 0 && remove(i);
																	}
																}}
																type="button"
																style={{
																	backgroundColor: 'red',
																	color: '#fff',
																}}
																size="small"
															/>
														)}
													</div>
												</Grid>
											))}
										</>
									)}
								</FieldArray>
							</Form>
						);
					}}
				</Formik>

				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						width: '70%',
						float: 'right',
						marginTop: '1rem',
						gap: '.8rem',
					}}
				>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: '1rem',
						}}
					>
						<span style={{ width: '80%', textAlign: 'right' }}>
							Total Material EX-Factory Kotrim Pak(PKR):
						</span>
						<CustomInput label="20,000" value={total} disabled />
					</div>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: '1rem',
						}}
					>
						<span
							style={{
								width: '80%',
								textAlign: 'right',
							}}
						>
							Less Income Tax (PKR):
						</span>
						<CustomInput
							label="4.5%"
							onChange={(e) => {
								setIncomeTax(e);
								let grandTotal = (e / 100) * total;
								setGrandTotal(total - grandTotal);
							}}
							value={incomeTax}
							type="number"
						/>
					</div>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: '1rem',
						}}
					>
						<span style={{ width: '80%', textAlign: 'right' }}>
							Grand Total Material EX-Factory Kotri, Pak(PKR):
						</span>
						<CustomInput
							label="20,000"
							type="text"
							value={grandTotal}
							disabled
						/>
					</div>
				</div>

				<Formik
					initialValues={initialValues3}
					validationSchema={validationSchema3}
					onSubmit={onSubmit}
				>
					{(props) => {
						form3 = props;
						return (
							<Form>
								<div style={{ width: '30%', marginTop: '11rem' }}>
									<CustomInput
										label="Remarks"
										onChange={props.handleChange('remarks')}
										value={props.values.remarks}
										onBlur={props.handleBlur('remarks')}
										helperText={
											props.touched.remarks && props.errors.remarks
										}
										error={
											props.touched.remarks && props.errors.remarks
										}
									/>
								</div>
								<Grid container spacing={1} style={{ marginTop: 10 }}>
									<h5>Pricing & Discount:</h5>
								</Grid>
								<Grid container spacing={1} style={{ marginTop: 10 }}>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CustomInput
											label="Actual"
											type="number"
											onChange={props.handleChange('actualPrice')}
											value={props.values.actualPrice}
											onBlur={props.handleBlur('actualPrice')}
											helperText={
												props.touched.actualPrice &&
												props.errors.actualPrice
											}
											error={
												props.touched.actualPrice &&
												props.errors.actualPrice
											}
										/>
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CustomInput
											label="Discount %"
											type="number"
											onChange={props.handleChange('discountPerc')}
											value={props.values.discountPerc}
											onBlur={props.handleBlur('discountPerc')}
											helperText={
												props.touched.discountPerc &&
												props.errors.discountPerc
											}
											error={
												props.touched.discountPerc &&
												props.errors.discountPerc
											}
										/>
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CustomInput
											type="number"
											label="Contract Price (Rs.)"
											onChange={props.handleChange('contractPrice')}
											value={props.values.contractPrice}
											onBlur={props.handleBlur('contractPrice')}
											helperText={
												props.touched.contractPrice &&
												props.errors.contractPrice
											}
											error={
												props.touched.contractPrice &&
												props.errors.contractPrice
											}
										/>
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CustomInput
											label="Other Conditions (if any)"
											onChange={props.handleChange(
												'otherConditions'
											)}
											value={props.values.otherConditions}
											onBlur={props.handleBlur('otherConditions')}
											helperText={
												props.touched.otherConditions &&
												props.errors.otherConditions
											}
											error={
												props.touched.otherConditions &&
												props.errors.otherConditions
											}
										/>
									</Grid>
									<CustomButton stype={{ display: 'none' }} />
								</Grid>
							</Form>
						);
					}}
				</Formik>
				<Formik
					initialValues={initialValues4}
					validationSchema={validationSchema4}
					onSubmit={onSubmit}
				>
					{(props) => {
						form5 = props;
						return (
							<Form>
								<Grid container spacing={1} style={{ marginTop: 35 }}>
									<p>
										HI-TECH PIPE AND EBGINEERING INDUSTRIES here after
										referred to as the "seller" on the one party,
									</p>
								</Grid>
								<Grid container spacing={1} style={{ marginTop: 5 }}>
									<Grid item lg={2} md={2} sm={12} xs={12}>
										<CustomInput
											label="Enter Name"
											onChange={props.handleChange('nameOfSeller')}
											value={props.values.nameOfSeller}
											onBlur={props.handleBlur('nameOfSeller')}
											helperText={
												props.touched.nameOfSeller &&
												props.errors.nameOfSeller
											}
											error={
												props.touched.nameOfSeller &&
												props.errors.nameOfSeller
											}
										/>
									</Grid>
								</Grid>
								<Grid container spacing={1} style={{ marginTop: 15 }}>
									<p>
										and hereafter referred to as the "Buyer" on the
										party have concluded the present contract as the
										following.
									</p>
								</Grid>
								<Grid container spacing={1} style={{ marginTop: 35 }}>
									<h5>Pricing & Total Amount of Contract</h5>
								</Grid>
								<Grid container spacing={1} style={{ marginTop: 5 }}>
									<p>The total amount of this contract is:</p>
								</Grid>
								<Grid container spacing={1} style={{ marginTop: 5 }}>
									<Grid item lg={2} md={2} sm={12} xs={12}>
										<CustomInput
											label="Rs."
											type="number"
											onChange={props.handleChange(
												'totalAmountOfContract'
											)}
											value={props.values.totalAmountOfContract}
											onBlur={props.handleBlur(
												'totalAmountOfContract'
											)}
											helperText={
												props.touched.totalAmountOfContract &&
												props.errors.totalAmountOfContract
											}
											error={
												props.touched.totalAmountOfContract &&
												props.errors.totalAmountOfContract
											}
										/>
									</Grid>
								</Grid>
								<Grid container spacing={1} style={{ marginTop: 5 }}>
									<p>
										for HDPE pipe Orders Pressure PN (As mentioned in
										Sr # 6) prices are firm for the duration of
										contract.
									</p>
								</Grid>
								<Grid container spacing={1} style={{ marginTop: 35 }}>
									<h5>Time & Term Of Delivery</h5>
								</Grid>
								<Grid container spacing={1} style={{ marginTop: 5 }}>
									<p>
										Delivery made after the receipt of Payment with in
										(min):
									</p>
								</Grid>
								<Grid container spacing={1} style={{ marginTop: 5 }}>
									<Grid item lg={2} md={2} sm={12} xs={12}>
										<CustomInput
											label="Days"
											type="number"
											onChange={props.handleChange('timeOfDelivery')}
											value={props.values.timeOfDelivery}
											onBlur={props.handleBlur('timeOfDelivery')}
											helperText={
												props.touched.timeOfDelivery &&
												props.errors.timeOfDelivery
											}
											error={
												props.touched.timeOfDelivery &&
												props.errors.timeOfDelivery
											}
										/>
									</Grid>
								</Grid>
								<Grid container spacing={1} style={{ marginTop: 35 }}>
									<h5>Term Of Payments</h5>
								</Grid>
								<Grid container spacing={1} style={{ marginTop: 15 }}>
									<p>Payment must be made by:</p>
								</Grid>
								<Grid container spacing={1}>
									<Grid item lg={2} md={2} sm={12} xs={12}>
										<CustomInput
											label="Percent (%)"
											type="number"
											onChange={props.handleChange('termOfPayments')}
											value={props.values.termOfPayments}
											onBlur={props.handleBlur('termOfPayments')}
											helperText={
												props.touched.termOfPayments &&
												props.errors.termOfPayments
											}
											error={
												props.touched.termOfPayments &&
												props.errors.termOfPayments
											}
										/>
									</Grid>
								</Grid>
								<Grid container spacing={1} style={{ marginTop: 5 }}>
									<p>advance</p>
								</Grid>
								<Grid container spacing={1} style={{ marginTop: 35 }}>
									<h5>Transportation</h5>
								</Grid>
								<Grid container spacing={1} style={{ marginTop: 15 }}>
									<p>Transportation charges to paid by:</p>
								</Grid>
								<Grid container spacing={1}>
									<Grid item lg={2} md={2} sm={12} xs={12}>
										<CustomInput
											label="Transport Charges"
											onChange={props.handleChange('transportation')}
											value={props.values.transportation}
											onBlur={props.handleBlur('transportation')}
											helperText={
												props.touched.transportation &&
												props.errors.transportation
											}
											error={
												props.touched.transportation &&
												props.errors.transportation
											}
										/>
									</Grid>
								</Grid>
								<Grid container spacing={1} style={{ marginTop: 35 }}>
									<h5>Other Conditions</h5>
								</Grid>
								<Grid container spacing={1} style={{ marginTop: 10 }}>
									<p style={{ fontWeight: 'bold' }}>Arbitration:</p>
								</Grid>
								<p>
									All disputes & differences ,which one can arise to or
									in connection with the present contract , should be
									decided by negotiation between Seller & the buyer.
								</p>
								<div style={{ marginTop: '1rem' }}>
									<CustomButton
										text="Submit"
										style={{
											backgroundColor: '#22A19A',
											color: '#fff',
										}}
										loading={createLoading}
										loaderColor="#fff"
									/>
									<p style={{ color: 'red' }}>{createError}</p>
									<p>{success}</p>
								</div>
							</Form>
						);
					}}
				</Formik>
			</CustomContainer>
			<CustomTable
				fetchLoading={fetchLoading}
				data={salesContracts}
				columnHeadings={[
					'Sr.No',
					'Sales Contract No.',
					'NTN No.',
					'STRN No.',
					'Company/Buyer Name',
					'Time Of Delivery',
				]}
				keys={[
					'code',
					'ntnNo',
					'strnNo',
					'conpanyRegName',
					'timeOfDelivery',
				]}
				firstOptionText="View"
				onFirstOptionClick={printContract}
				withSrNo
			/>
		</Sidenav>
	);
};

export default withRouter(SalesContract);
