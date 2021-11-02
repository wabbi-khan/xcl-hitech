import React, { useState, useEffect } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { useDispatch, useSelector } from 'react-redux';
import {
	CustomContainer,
	CustomButton,
	CustomInput,
	generateOptions,
	CustomTable,
} from '../../../components';
import { createCustomerComplaint } from '../../../services/action/customerComplaintAction';
import { fetchDepartmentsAction } from '../../../services/action/DepartmentAction';
import { Formik, Form, FieldArray } from 'formik';
import * as yup from 'yup';

const initialValues1 = {
	department: '',
	complaintNo: '',
	customerType: '',
	inquirer: '',
	customerName: '',
	contactPerson: '',
	address: '',
	phoneNo: '',
	suppliedThrough: '',
	project: '',
	complaintReceivingData: '',
	product: '',
};

const initialValues2 = {
	stamping: '',
	salesOrder: '',
	deliveryOrder: '',
	quantitySupplied: '',
	quantityAffected: '',
	totalValueOfOrder: '',
	totalValueOfQuantity: '',
	initialRecommendations: '',
	date: '',
};

const validationSchema1 = yup.object({
	department: yup.string().required('Department is required'),
	complaintNo: yup.string().required('Complaint No is required'),
	customerType: yup.string().required('Customer Type is required'),
	inquirer: yup.string().required('Inquirer is required'),
	customerName: yup.string().required('Customer Name is required'),
	contactPerson: yup.string().required('Contact Person is required'),
	address: yup.string().required('Address is required'),
	phoneNo: yup.string().required('Phone No is required'),
	suppliedThrough: yup.string().required('Supplied Thorugh is required'),
	project: yup.string().required('Project is required'),
	complaintReceivingData: yup
		.string()
		.required('Complaint Receiving Date is required'),
	product: yup.string().required('Product is required'),
});

const validationSchema2 = yup.object({
	stamping: yup.string().required('Stamping is required'),
	salesOrder: yup.string().required('Sales Order is required'),
	deliveryOrder: yup.string().required('Delivery Order is required'),
	quantitySupplied: yup.string().required('Quantity Supplied is required'),
	quantityAffected: yup.string().required('Quantity Affected is required'),
	totalValueOfOrder: yup.string().required('Total Value Of Order is required'),
	totalValueOfQuantity: yup
		.string()
		.required('Total Value Of Quantity is required'),
	initialRecommendations: yup
		.string()
		.required('Initial Recommendations is required'),
	date: yup.string().required('Date is required'),
});

const CustomerComplaint = () => {
	const [createLoading, setCreateLoading] = useState(false);
	const [createError, setCreateError] = useState('');
	const [success, setSuccess] = useState('');

	const dispatch = useDispatch();

	let form1 = null;
	let form2 = null;

	const { departments } = useSelector((state) => state.departments);

	useEffect(() => {
		dispatch(fetchDepartmentsAction());
	}, []);

	const onSubmit = async () => {
		let values = {};
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

		if (error) return;

		values = {
			...form1.values,
			...form2.values,
		};

		setCreateLoading(true);
		dispatch(
			createCustomerComplaint(values, (err) => {
				if (err) {
					setCreateError(err);
					setTimeout(() => {
						setCreateError('');
					}, 4000);
				} else {
					setSuccess('Customer Complaint added successfully');
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

	return (
		<Sidenav title="Customer Complaint">
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
								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										gap: '1rem',
									}}
								>
									<div
										style={{
											display: 'flex',
											gap: '1rem',
											justifyContent: 'flex-start',
										}}
									>
										<CustomInput
											label="Select Department"
											selectValues={generateOptions(
												departments,
												'name',
												'_id'
											)}
											onChange={props.handleChange('department')}
											value={props.values.department}
											onBlur={props.handleBlur('department')}
											helperText={
												props.touched.department &&
												props.errors.department
											}
											error={
												props.touched.department &&
												props.errors.department
											}
										/>
										<CustomInput
											label="Complaint No. (To be filled by SO)"
											onChange={props.handleChange('complaintNo')}
											value={props.values.complaintNo}
											onBlur={props.handleBlur('complaintNo')}
											helperText={
												props.touched.complaintNo &&
												props.errors.complaintNo
											}
											error={
												props.touched.complaintNo &&
												props.errors.complaintNo
											}
										/>
									</div>
									<div
										style={{
											display: 'flex',
											gap: '1rem',
											justifyContent: 'flex-start',
										}}
									>
										<CustomInput
											label="Customer Type"
											onChange={props.handleChange('customerType')}
											value={props.values.customerType}
											onBlur={props.handleBlur('customerType')}
											helperText={
												props.touched.customerType &&
												props.errors.customerType
											}
											error={
												props.touched.customerType &&
												props.errors.customerType
											}
										/>
										<CustomInput
											label="Select Inquirer"
											onChange={props.handleChange('inquirer')}
											value={props.values.inquirer}
											onBlur={props.handleBlur('inquirer')}
											helperText={
												props.touched.inquirer &&
												props.errors.inquirer
											}
											error={
												props.touched.inquirer &&
												props.errors.inquirer
											}
										/>
									</div>
									<div
										style={{
											display: 'flex',
											gap: '1rem',
											justifyContent: 'flex-start',
										}}
									>
										<CustomInput
											label="Customer Name"
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
										<CustomInput
											label="Contact Person"
											onChange={props.handleChange('contactPerson')}
											value={props.values.contactPerson}
											onBlur={props.handleBlur('contactPerson')}
											helperText={
												props.touched.contactPerson &&
												props.errors.contactPerson
											}
											error={
												props.touched.contactPerson &&
												props.errors.contactPerson
											}
										/>
										<CustomInput
											label="Address"
											onChange={props.handleChange('address')}
											value={props.values.address}
											onBlur={props.handleBlur('address')}
											helperText={
												props.touched.address &&
												props.errors.address
											}
											error={
												props.touched.address &&
												props.errors.address
											}
										/>
										<CustomInput
											label="Phone No"
											onChange={props.handleChange('phoneNo')}
											value={props.values.phoneNo}
											onBlur={props.handleBlur('phoneNo')}
											helperText={
												props.touched.phoneNo &&
												props.errors.phoneNo
											}
											error={
												props.touched.phoneNo &&
												props.errors.phoneNo
											}
										/>
									</div>
									<div
										style={{
											display: 'flex',
											gap: '1rem',
											justifyContent: 'flex-start',
										}}
									>
										<CustomInput
											label="Supplied Through"
											onChange={props.handleChange(
												'suppliedThrough'
											)}
											value={props.values.suppliedThrough}
											onBlur={props.handleBlur('suppliedThrough')}
											helperText={
												props.touched.suppliedThrough &&
												props.errors.suppliedThrough
											}
											error={
												props.touched.suppliedThrough &&
												props.errors.suppliedThrough
											}
										/>
										<CustomInput
											label="Project(Mention Name & Add...)"
											onChange={props.handleChange('project')}
											value={props.values.project}
											onBlur={props.handleBlur('project')}
											helperText={
												props.touched.project &&
												props.errors.project
											}
											error={
												props.touched.project &&
												props.errors.project
											}
										/>
										<CustomInput
											label="Complaint Receiving Date"
											onChange={props.handleChange(
												'complaintReceivingData'
											)}
											value={props.values.complaintReceivingData}
											onBlur={props.handleBlur(
												'complaintReceivingData'
											)}
											helperText={
												props.touched.complaintReceivingData &&
												props.errors.complaintReceivingData
											}
											error={
												props.touched.complaintReceivingData &&
												props.errors.complaintReceivingData
											}
										/>
										<CustomInput
											label="Product"
											onChange={props.handleChange('product')}
											value={props.values.product}
											onBlur={props.handleBlur('product')}
											helperText={
												props.touched.product &&
												props.errors.product
											}
											error={
												props.touched.product &&
												props.errors.product
											}
										/>
									</div>
									<CustomButton
										text="Submit"
										style={{
											backgroundColor: '#22A19A',
											color: '#fff',
											display: 'none',
										}}
									/>
								</div>
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
								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										gap: '1rem',
									}}
								>
									<div
										style={{
											display: 'flex',
											gap: '1rem',
											justifyContent: 'flex-start',
										}}
									>
										<CustomInput
											label="Stamping"
											onChange={props.handleChange('stamping')}
											value={props.values.stamping}
											onBlur={props.handleBlur('stamping')}
											helperText={
												props.touched.stamping &&
												props.errors.stamping
											}
											error={
												props.touched.stamping &&
												props.errors.stamping
											}
										/>
										<CustomInput
											label="Sales Order No. & Date"
											onChange={props.handleChange('salesOrder')}
											value={props.values.salesOrder}
											onBlur={props.handleBlur('salesOrder')}
											helperText={
												props.touched.salesOrder &&
												props.errors.salesOrder
											}
											error={
												props.touched.salesOrder &&
												props.errors.salesOrder
											}
										/>
										<CustomInput
											label="Delivery Order No. & Date"
											onChange={props.handleChange('deliveryOrder')}
											value={props.values.deliveryOrder}
											onBlur={props.handleBlur('deliveryOrder')}
											helperText={
												props.touched.deliveryOrder &&
												props.errors.deliveryOrder
											}
											error={
												props.touched.deliveryOrder &&
												props.errors.deliveryOrder
											}
										/>
										<CustomInput
											label="Quantity Supplied"
											onChange={props.handleChange(
												'quantitySupplied'
											)}
											value={props.values.quantitySupplied}
											onBlur={props.handleBlur('quantitySupplied')}
											helperText={
												props.touched.quantitySupplied &&
												props.errors.quantitySupplied
											}
											error={
												props.touched.quantitySupplied &&
												props.errors.quantitySupplied
											}
										/>
									</div>
									<div
										style={{
											display: 'flex',
											gap: '1rem',
											justifyContent: 'flex-start',
										}}
									>
										<CustomInput
											label="Quantity Affected"
											onChange={props.handleChange(
												'quantityAffected'
											)}
											value={props.values.quantityAffected}
											onBlur={props.handleBlur('quantityAffected')}
											helperText={
												props.touched.quantityAffected &&
												props.errors.quantityAffected
											}
											error={
												props.touched.quantityAffected &&
												props.errors.quantityAffected
											}
										/>
										<CustomInput
											label="Total Value of order (Rs)"
											onChange={props.handleChange(
												'totalValueOfOrder'
											)}
											value={props.values.totalValueOfOrder}
											onBlur={props.handleBlur('totalValueOfOrder')}
											helperText={
												props.touched.totalValueOfOrder &&
												props.errors.totalValueOfOrder
											}
											error={
												props.touched.totalValueOfOrder &&
												props.errors.totalValueOfOrder
											}
										/>
										<CustomInput
											label="Total value of affected quantity (Rs)"
											onChange={props.handleChange(
												'totalValueOfQuantity'
											)}
											value={props.values.totalValueOfQuantity}
											onBlur={props.handleBlur(
												'totalValueOfQuantity'
											)}
											helperText={
												props.touched.totalValueOfQuantity &&
												props.errors.totalValueOfQuantity
											}
											error={
												props.touched.totalValueOfQuantity &&
												props.errors.totalValueOfQuantity
											}
										/>
										<CustomInput
											label="Initial Recommendations After..."
											onChange={props.handleChange(
												'initialRecommendations'
											)}
											value={props.values.initialRecommendations}
											onBlur={props.handleBlur(
												'initialRecommendations'
											)}
											helperText={
												props.touched.initialRecommendations &&
												props.errors.initialRecommendations
											}
											error={
												props.touched.initialRecommendations &&
												props.errors.initialRecommendations
											}
										/>
									</div>
									<div
										style={{
											display: 'flex',
											gap: '1rem',
											justifyContent: 'flex-end',
										}}
									>
										<CustomInput
											type="date"
											width="30%"
											onChange={props.handleChange('date')}
											value={props.values.date}
											onBlur={props.handleBlur('date')}
											helperText={
												props.touched.date && props.errors.date
											}
											error={props.touched.date && props.errors.date}
										/>
									</div>
									<div
										style={{
											display: 'flex',
											gap: '1rem',
											justifyContent: 'center',
											flexDirection: 'column',
										}}
									>
										<CustomButton
											text="Submit"
											style={{
												backgroundColor: '#22A19A',
												color: '#fff',
											}}
											loading={createLoading}
											loaderColor="#fff"
										/>
										<p>{success}</p>
									</div>
								</div>
							</Form>
						);
					}}
				</Formik>
			</CustomContainer>
		</Sidenav>
	);
};

export default CustomerComplaint;
