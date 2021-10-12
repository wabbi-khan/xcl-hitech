import React, { useState } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { Formik, Form, FieldArray } from 'formik';
import * as yup from 'yup';
import {
	CustomContainer,
	CustomInput,
	CustomButton,
} from '../../../components';
import { createSalesContract } from '../../../services/action/salesContractAction';

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

const SalesContract = () => {
	const [createLoading, setCreateLoading] = useState(false);
	const [createError, setCreateError] = useState('');
	const [success, setSuccess] = useState('');
	const dispatch = useDispatch();

	let form1 = null;
	let form2 = null;
	let form3 = null;
	let form4 = null;

	const onSubmit = (values) => {
		console.log(form1);
		console.log(form2);
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
				>
					{(props) => {
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
															onChange={form.handleChange(
																`orders[${i}].qty`
															)}
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
															onChange={form.handleChange(
																`orders[${i}].unitPrice`
															)}
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
														/>
													</Grid>
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
						<CustomInput label="20,000" />
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
						<CustomInput label="4.5%" />
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
						<CustomInput label="20,000" type="text" />
					</div>
				</div>

				<div style={{ width: '30%', marginTop: '11rem' }}>
					<CustomInput label="Remarks" />
				</div>
				<Grid container spacing={1} style={{ marginTop: 10 }}>
					<h5>Pricing & Discount:</h5>
				</Grid>
				<Grid container spacing={1} style={{ marginTop: 10 }}>
					<Grid item lg={3} md={3} sm={12} xs={12}>
						<CustomInput label="Actual" />
					</Grid>
					<Grid item lg={3} md={3} sm={12} xs={12}>
						<CustomInput label="Discount %" />
					</Grid>
					<Grid item lg={3} md={3} sm={12} xs={12}>
						<CustomInput label="Contract Price (Rs.)" />
					</Grid>
					<Grid item lg={3} md={3} sm={12} xs={12}>
						<CustomInput label="Other Conditions (if any)" />
					</Grid>
				</Grid>
				<div style={{ marginTop: '1rem' }}>
					<CustomButton
						text="Submit"
						style={{ backgroundColor: '#22A19A', color: '#fff' }}
					/>
				</div>
			</CustomContainer>
		</Sidenav>
	);
};

export default SalesContract;
