import React, { useState, useEffect } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import {
	CustomContainer,
	CustomButton,
	CustomInput,
	generateOptions,
} from '../../../components';
import { createOrderBooking } from '../../../services/action/orderBookingAction';
import { getDesignation } from '../../../services/action/DesignationAction';
import { getEmployees } from '../../../services/action/EmployeesAction';
import { Formik, Form, FieldArray } from 'formik';
import * as yup from 'yup';

const itemsInitialState = {
	size: '',
	pe: '',
	pn: '',
	sdr: '',
	lengthInMeters: '',
	noOfPipes: '',
};

const initialValues = {
	designation: '',
	employee: '',
	address: '',
	customerName: '',
	customerAddress: '',
	deliveryAddress: '',
	fittingRequired: '',
	weldingRequired: '',
	fittingQuantity: '',
	modeOfTransportation: '',
	modeOfPayment: '',
	expectedDateOfDelivery: '',
	requirements: '',
	remarks: '',
	items: [
		{
			...itemsInitialState,
		},
	],
};

const validationSchema = yup.object({
	designation: yup.string().required(),
	employee: yup.string().required(),
	address: yup.string().required(),
	customerName: yup.string().required(),
	customerAddress: yup.string().required(),
	deliveryAddress: yup.string().required(),
	fittingRequired: yup.string().required(),
	weldingRequired: yup.string().required(),
	fittingQuantity: yup.string().required(),
	modeOfTransportation: yup.string().required(),
	modeOfPayment: yup.string().required(),
	expectedDateOfDelivery: yup.string().required(),
	requirements: yup.string().required(),
	remarks: yup.string().required(),
	items: yup.array().of(
		yup.object().shape({
			size: yup.string().required('Size is required'),
			pe: yup.string().required('PE is required'),
			pn: yup.string().required('PN is required'),
			sdr: yup.string().required('SDR is required'),
			lengthInMeters: yup.string().required('Length in meters is required'),
			noOfPipes: yup.string().required('No of pipes is required'),
		})
	),
});

const OrderBookingForm = () => {
	const [createLoading, setCreateLoading] = useState(false);
	const [createError, setCreateError] = useState('');
	const [success, setSuccess] = useState('');

	const dispatch = useDispatch();

	const { designations } = useSelector((state) => state.designations);
	const { employees } = useSelector((state) => state.employees);

	useEffect(() => {
		dispatch(getDesignation());
		dispatch(getEmployees());
	}, []);

	const onSubmit = (values) => {
		setCreateLoading(true);
		dispatch(
			createOrderBooking(values, (err) => {
				if (err) {
					setCreateError(err);
					setTimeout(() => {
						setCreateError('');
					}, 4000);
				} else {
					setSuccess('Order successfully created');
					setTimeout(() => {
						setSuccess('');
					}, 4000);
				}
				setCreateLoading(false);
			})
		);
	};

	return (
		<Sidenav title={'Order Booking Form'}>
			<CustomContainer>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={onSubmit}
				>
					{(props) => (
						<Form>
							<div style={{ textAlign: 'left' }}>
								<h5>Company Representative</h5>
							</div>
							<Grid container spacing={1} style={{ marginTop: 15 }}>
								<Grid item lg={3} md={3} sm={12} xs={12}>
									<CustomInput
										label="Select Designation"
										selectValues={generateOptions(
											designations,
											'name',
											'_id'
										)}
										onChange={props.handleChange('designation')}
										value={props.values.designation}
										onBlur={props.handleBlur('designation')}
										helperText={
											props.touched.designation &&
											props.errors.designation
										}
										error={
											props.touched.designation &&
											props.errors.designation
										}
									/>
								</Grid>
								<Grid item lg={3} md={3} sm={12} xs={12}>
									<CustomInput
										label="Select Employee Name"
										selectValues={generateOptions(
											employees,
											'name',
											'_id'
										)}
										onChange={props.handleChange('employee')}
										value={props.values.employee}
										onBlur={props.handleBlur('employee')}
										helperText={
											props.touched.employee && props.errors.employee
										}
										error={
											props.touched.employee && props.errors.employee
										}
									/>
								</Grid>
								<Grid item lg={3} md={3} sm={12} xs={12}>
									<CustomInput
										label="Address"
										onChange={props.handleChange('address')}
										value={props.values.address}
										onBlur={props.handleBlur('address')}
										helperText={
											props.touched.address && props.errors.address
										}
										error={
											props.touched.address && props.errors.address
										}
									/>
								</Grid>
							</Grid>
							<div style={{ textAlign: 'left', marginTop: '20px' }}>
								<h5>Customer Information</h5>
							</div>
							<Grid container spacing={1} style={{ marginTop: 15 }}>
								<Grid item lg={3} md={3} sm={12} xs={12}>
									<CustomInput
										label="Enter Customer Name"
										onChange={props.handleChange('customerName')}
										value={props.values.customerName}
										onBlur={props.handleBlur('customerName')}
										helperText={
											props.touched.customerName &&
											props.errors.customerName
										}
										error={
											props.touched.customerName &&
											props.errors.customerName
										}
									/>
								</Grid>
								<Grid item lg={3} md={3} sm={12} xs={12}>
									<CustomInput
										label="Customer Address"
										onChange={props.handleChange('customerAddress')}
										value={props.values.customerAddress}
										onBlur={props.handleBlur('customerAddress')}
										helperText={
											props.touched.customerAddress &&
											props.errors.customerAddress
										}
										error={
											props.touched.customerAddress &&
											props.errors.customerAddress
										}
									/>
								</Grid>
								<Grid item lg={3} md={3} sm={12} xs={12}>
									<CustomInput
										label="Delivery Site Address"
										onChange={props.handleChange('deliveryAddress')}
										value={props.values.deliveryAddress}
										onBlur={props.handleBlur('deliveryAddress')}
										helperText={
											props.touched.deliveryAddress &&
											props.errors.deliveryAddress
										}
										error={
											props.touched.deliveryAddress &&
											props.errors.deliveryAddress
										}
									/>
								</Grid>
							</Grid>

							<FieldArray name="items">
								{({ push, remove, form }) => (
									<>
										<div
											style={{
												textAlign: 'left',
												marginTop: '20px',
												display: 'flex',
												justifyContent: 'space-between',
												alignItems: 'center',
											}}
										>
											<h5>Description of Order</h5>

											<CustomButton
												type="button"
												text="Add More"
												variant="outlined"
												color="primary"
												style={{
													backgroundColor: '#22A19A',
													color: '#fff',
												}}
												onClick={() =>
													push({ ...itemsInitialState })
												}
											/>
										</div>
										{form.values.items.map((el, i) => (
											<Grid
												container
												spacing={1}
												style={{ marginTop: 15 }}
											>
												<Grid item lg={1} md={1}>
													<h5>{i + 1}</h5>
												</Grid>
												<Grid item lg={2} md={2} sm={12} xs={12}>
													<CustomInput
														label="Enter Size"
														onChange={form.handleChange(
															`items[${i}].size`
														)}
														value={form.values.items[i].size}
														onBlur={form.handleBlur(
															`items[${i}].size`
														)}
														helperText={
															form.errors.items &&
															form.touched.items &&
															form.errors.items[i] &&
															form.touched.items[i] &&
															form.touched.items[i].size &&
															form.errors.items[i].size
														}
														error={
															form.errors.items &&
															form.touched.items &&
															form.errors.items[i] &&
															form.touched.items[i] &&
															form.touched.items[i].size &&
															form.errors.items[i].size
														}
													/>
												</Grid>
												<Grid item lg={2} md={2} sm={12} xs={12}>
													<CustomInput
														label="PE-80/100"
														onChange={form.handleChange(
															`items[${i}].pe`
														)}
														value={form.values.items[i].pe}
														onBlur={form.handleBlur(
															`items[${i}].pe`
														)}
														helperText={
															form.errors.items &&
															form.touched.items &&
															form.errors.items[i] &&
															form.touched.items[i] &&
															form.touched.items[i].pe &&
															form.errors.items[i].pe
														}
														error={
															form.errors.items &&
															form.touched.items &&
															form.errors.items[i] &&
															form.touched.items[i] &&
															form.touched.items[i].pe &&
															form.errors.items[i].pe
														}
													/>
												</Grid>
												<Grid item lg={2} md={2} sm={12} xs={12}>
													<CustomInput
														label="PN"
														onChange={form.handleChange(
															`items[${i}].pn`
														)}
														value={form.values.items[i].pn}
														onBlur={form.handleBlur(
															`items[${i}].pn`
														)}
														helperText={
															form.errors.items &&
															form.touched.items &&
															form.errors.items[i] &&
															form.touched.items[i] &&
															form.touched.items[i].pn &&
															form.errors.items[i].pn
														}
														error={
															form.errors.items &&
															form.touched.items &&
															form.errors.items[i] &&
															form.touched.items[i] &&
															form.touched.items[i].pn &&
															form.errors.items[i].pn
														}
													/>
												</Grid>
												<Grid item lg={2} md={2} sm={12} xs={12}>
													<CustomInput
														label="SDR"
														onChange={form.handleChange(
															`items[${i}].sdr`
														)}
														value={form.values.items[i].sdr}
														onBlur={form.handleBlur(
															`items[${i}].sdr`
														)}
														helperText={
															form.errors.items &&
															form.touched.items &&
															form.errors.items[i] &&
															form.touched.items[i] &&
															form.touched.items[i].sdr &&
															form.errors.items[i].sdr
														}
														error={
															form.errors.items &&
															form.touched.items &&
															form.errors.items[i] &&
															form.touched.items[i] &&
															form.touched.items[i].sdr &&
															form.errors.items[i].sdr
														}
													/>
												</Grid>
												<Grid item lg={2} md={2} sm={12} xs={12}>
													<CustomInput
														label="Length in Meter"
														onChange={form.handleChange(
															`items[${i}].lengthInMeters`
														)}
														value={
															form.values.items[i].lengthInMeters
														}
														onBlur={form.handleBlur(
															`items[${i}].lengthInMeters`
														)}
														helperText={
															form.errors.items &&
															form.touched.items &&
															form.errors.items[i] &&
															form.touched.items[i] &&
															form.touched.items[i]
																.lengthInMeters &&
															form.errors.items[i].lengthInMeters
														}
														error={
															form.errors.items &&
															form.touched.items &&
															form.errors.items[i] &&
															form.touched.items[i] &&
															form.touched.items[i]
																.lengthInMeters &&
															form.errors.items[i].lengthInMeters
														}
													/>
												</Grid>
												<Grid item lg={2} md={2} sm={12} xs={12}>
													<CustomInput
														label="No. of Pipes/Coils"
														onChange={form.handleChange(
															`items[${i}].noOfPipes`
														)}
														value={form.values.items[i].noOfPipes}
														onBlur={form.handleBlur(
															`items[${i}].noOfPipes`
														)}
														helperText={
															form.errors.items &&
															form.touched.items &&
															form.errors.items[i] &&
															form.touched.items[i] &&
															form.touched.items[i].noOfPipes &&
															form.errors.items[i].noOfPipes
														}
														error={
															form.errors.items &&
															form.touched.items &&
															form.errors.items[i] &&
															form.touched.items[i] &&
															form.touched.items[i].noOfPipes &&
															form.errors.items[i].noOfPipes
														}
													/>
												</Grid>
												<Grid item lg={2} md={2} sm={12} xs={12}>
													<CustomButton
														text="Delete"
														style={{
															backgroundColor: 'red',
															color: '#fff',
														}}
														onClick={() => remove(i)}
													/>
												</Grid>
											</Grid>
										))}
									</>
								)}
							</FieldArray>

							<div style={{ marginTop: 30, marginBottom: 30 }}>
								<hr />
							</div>
							<Grid container spacing={1} style={{ marginTop: 15 }}>
								<Grid item lg={3} md={3} sm={12} xs={12}>
									<CustomInput
										label="Fitting Required"
										onChange={props.handleChange('fittingRequired')}
										value={props.values.fittingRequired}
										onBlur={props.handleBlur('fittingRequired')}
										helperText={
											props.touched.fittingRequired &&
											props.errors.fittingRequired
										}
										error={
											props.touched.fittingRequired &&
											props.errors.fittingRequired
										}
									/>
								</Grid>
								<Grid item lg={3} md={3} sm={12} xs={12}>
									<CustomInput
										label="Fitting Quantity"
										onChange={props.handleChange('fittingQuantity')}
										value={props.values.fittingQuantity}
										onBlur={props.handleBlur('fittingQuantity')}
										helperText={
											props.touched.fittingQuantity &&
											props.errors.fittingQuantity
										}
										error={
											props.touched.fittingQuantity &&
											props.errors.fittingQuantity
										}
									/>
								</Grid>
								<Grid item lg={3} md={3} sm={12} xs={12}>
									<CustomInput
										label="Welding Required"
										onChange={props.handleChange('weldingRequired')}
										value={props.values.weldingRequired}
										onBlur={props.handleBlur('weldingRequired')}
										helperText={
											props.touched.weldingRequired &&
											props.errors.weldingRequired
										}
										error={
											props.touched.weldingRequired &&
											props.errors.weldingRequired
										}
									/>
								</Grid>
								<Grid item lg={3} md={3} sm={12} xs={12}>
									<CustomInput
										label="Mode of Transportation"
										onChange={props.handleChange(
											'modeOfTransportation'
										)}
										value={props.values.modeOfTransportation}
										onBlur={props.handleBlur('modeOfTransportation')}
										helperText={
											props.touched.modeOfTransportation &&
											props.errors.modeOfTransportation
										}
										error={
											props.touched.modeOfTransportation &&
											props.errors.modeOfTransportation
										}
									/>
								</Grid>
							</Grid>
							<Grid container spacing={1} style={{ marginTop: 15 }}>
								<Grid item lg={3} md={3} sm={12} xs={12}>
									<CustomInput
										label="Mode of Payment"
										onChange={props.handleChange('modeOfPayment')}
										value={props.values.modeOfPayment}
										onBlur={props.handleBlur('modeOfPayment')}
										helperText={
											props.touched.modeOfPayment &&
											props.errors.modeOfPayment
										}
										error={
											props.touched.modeOfPayment &&
											props.errors.modeOfPayment
										}
									/>
								</Grid>
								<Grid item lg={3} md={3} sm={12} xs={12}>
									<CustomInput
										label="Expected Date of Delivery"
										onChange={props.handleChange(
											'expectedDateOfDelivery'
										)}
										value={props.values.expectedDateOfDelivery}
										onBlur={props.handleBlur(
											'expectedDateOfDelivery'
										)}
										helperText={
											props.touched.expectedDateOfDelivery &&
											props.errors.expectedDateOfDelivery
										}
										error={
											props.touched.expectedDateOfDelivery &&
											props.errors.expectedDateOfDelivery
										}
									/>
								</Grid>
								<Grid item lg={3} md={3} sm={12} xs={12}>
									<CustomInput
										label="Any Special Requirements"
										onChange={props.handleChange('requirements')}
										value={props.values.requirements}
										onBlur={props.handleBlur('requirements')}
										helperText={
											props.touched.requirements &&
											props.errors.requirements
										}
										error={
											props.touched.requirements &&
											props.errors.requirements
										}
									/>
								</Grid>
								<Grid item lg={3} md={3} sm={12} xs={12}>
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
								</Grid>
							</Grid>
							<div style={{ marginTop: '10px' }}>
								<CustomButton
									variant="outlined"
									color="primary"
									text="Submit"
									style={{ backgroundColor: '#22A19A', color: '#fff' }}
									loading={createLoading}
									loaderColor="#fff"
								/>
								{createError && <p>{createError}</p>}
								{success && <p>{success}</p>}
							</div>
						</Form>
					)}
				</Formik>
			</CustomContainer>
		</Sidenav>
	);
};

export default OrderBookingForm;
