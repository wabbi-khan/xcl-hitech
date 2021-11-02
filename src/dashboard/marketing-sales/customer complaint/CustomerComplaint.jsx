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

const customerOptions = [
	{
		value: 'publicSector',
		name: 'Public Sector',
	},
	{
		value: 'privateSector',
		name: 'Private Sector',
	},
	{
		value: 'industrialSector',
		name: 'Industrial Sector',
	},
	{
		value: 'armedForces',
		name: 'Armed Forces',
	},
];

const customerInquirer = [
	{
		value: 'dealer',
		name: 'Dealer/Distributor',
	},
	{
		value: 'project',
		name: 'Project/Residence Owner',
	},
	{
		value: 'architect',
		name: 'Architect/Consultant',
	},
	{
		value: 'contractor',
		name: 'Contractor/Builder',
	},
	{
		value: 'endUser',
		name: 'End User',
	},
	{
		value: 'other',
		name: 'Other',
	},
];

const stampingOptions = [
	{
		value: 'yes',
		name: 'Yes',
	},
	{
		value: 'no',
		name: 'No',
	},
];

const complaintOptions = [
	{
		value: 'quality',
		name: 'Quality',
	},
	{
		value: 'logistics',
		name: 'Logistics',
	},
	{
		value: 'installation',
		name: 'Installation',
	},
	{
		value: 'other',
		name: 'Other',
	},
];

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

const initialValues3 = {
	sampleRec: '',
	sampleRecDate: '',
	inspected: '',
	inspectedDate: '',
	tested: '',
	testedDate: '',
	initialSiteVisitConductBy: '',
	initialSiteVisitDate: '',
	complaintType: '',
	dispositionOfSales: '',
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
	salesOrderNoDate: yup.string().required('Sales Order No. Date is required'),
	deliveryOrder: yup.string().required('Delivery Order is required'),
	deliveryOrderNoDate: yup
		.string()
		.required('Delivery Order No. Date is required'),
	quantitySupplied: yup.string().required('Quantity Supplied is required'),
	quantityAffected: yup.string().required('Quantity Affected is required'),
	totalValueOfOrder: yup.string().required('Total Value Of Order is required'),
	totalValueOfQuantity: yup
		.string()
		.required('Total Value Of Quantity is required'),
	initialRecommendations: yup
		.string()
		.required('Initial Recommendations is required'),
	reportPreparedBy: yup.string().required('Report Prepared By is required'),
	date: yup.string().required('Date is required'),
});

const validationSchema3 = yup.object({
	sampleRec: yup.string().required('Sample Received is required'),
	sampleRecDate: yup.string().required('Sample Received Date is required'),
	inspected: yup.string().required('Inspected is required'),
	inspectedDate: yup.string().required('Inspected Date is required'),
	tested: yup.string().required('Tested is required'),
	testedDate: yup.string().required('Tested Date is required'),
	initialSiteVisitConductBy: yup
		.string()
		.required('Initial Visit Conduct By is required'),
	initialSiteVisitDate: yup
		.string()
		.required('Initial Site Visit Conduct Date is required'),
	complaintType: yup.string().required('Complaint Type is required'),
	dispositionOfSales: yup
		.string()
		.required('Disposition of Sales Department/QAD is required'),
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
											selectValues={customerOptions}
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
											selectValues={customerInquirer}
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
											label="Project (Mention Name & Address of Site)"
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
											//   label="Complaint Receiving Date"
											type="date"
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
											selectValues={stampingOptions}
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
											label="Sales Order No."
											selectValues={[]} //dispatch sales order no. here
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
											//   label="Sales Order No. Date"
											type="date"
											disabled
											onChange={props.handleChange(
												'salesOrderNoDate'
											)}
											value={props.values.salesOrderNoDate}
											onBlur={props.handleBlur('salesOrderNoDate')}
											helperText={
												props.touched.salesOrderNoDate &&
												props.errors.salesOrderNoDate
											}
											error={
												props.touched.salesOrderNoDate &&
												props.errors.salesOrderNoDate
											}
										/>
										<CustomInput
											label="Delivery Order No."
											selectValues={[]} //dispatch delivery order no. here
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
									</div>
									<div
										style={{
											display: 'flex',
											gap: '1rem',
											justifyContent: 'flex-start',
										}}
									>
										<CustomInput
											//   label="Sales Order No. Date"
											type="date"
											disabled
											onChange={props.handleChange(
												'deliveryOrderNoDate'
											)}
											value={props.values.deliveryOrderNoDate}
											onBlur={props.handleBlur(
												'deliveryOrderNoDate'
											)}
											helperText={
												props.touched.deliveryOrderNoDate &&
												props.errors.deliveryOrderNoDate
											}
											error={
												props.touched.deliveryOrderNoDate &&
												props.errors.deliveryOrderNoDate
											}
										/>
										<CustomInput
											label="Quantity Supplied"
											type="number"
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
										<CustomInput
											label="Quantity Affected"
											type="number"
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
											type="number"
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
									</div>
									<div
										style={{
											display: 'flex',
											gap: '1rem',
											justifyContent: 'flex-start',
										}}
									>
										<CustomInput
											type="number"
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
											label="Initial Recommendations After 1st Visit"
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
											label="Report Prepared By"
											selectValues={[]} //dispatch sales order no. here
											width="25%"
											onChange={props.handleChange(
												'reportPreparedBy'
											)}
											value={props.values.reportPreparedBy}
											onBlur={props.handleBlur('reportPreparedBy')}
											helperText={
												props.touched.reportPreparedBy &&
												props.errors.reportPreparedBy
											}
											error={
												props.touched.reportPreparedBy &&
												props.errors.reportPreparedBy
											}
										/>
										<CustomInput
											type="date"
											width="25%"
											onChange={props.handleChange('date')}
											value={props.values.date}
											onBlur={props.handleBlur('date')}
											helperText={
												props.touched.date && props.errors.date
											}
											error={props.touched.date && props.errors.date}
										/>
									</div>
									<div style={{ marginTop: 5, marginBottom: 10 }}>
										<hr />
									</div>
								</div>
							</Form>
						);
					}}
				</Formik>
				<Formik
					initialValues={initialValues3}
					validationSchema={validationSchema3}
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
											justifyContent: 'flex-end',
										}}
									>
										<CustomInput
											label="Sample Received"
											selectValues={stampingOptions} //dispatch sales order no. here
											onChange={props.handleChange('sampleRec')}
											value={props.values.sampleRec}
											onBlur={props.handleBlur('sampleRec')}
											helperText={
												props.touched.sampleRec &&
												props.errors.sampleRec
											}
											error={
												props.touched.sampleRec &&
												props.errors.sampleRec
											}
										/>
										<CustomInput
											//   label="Sales Order No. Date"
											type="date"
											onChange={props.handleChange('sampleRecDate')}
											value={props.values.sampleRecDate}
											onBlur={props.handleBlur('sampleRecDate')}
											helperText={
												props.touched.sampleRecDate &&
												props.errors.sampleRecDate
											}
											error={
												props.touched.sampleRecDate &&
												props.errors.sampleRecDate
											}
										/>
										<CustomInput
											label="Inspected"
											selectValues={stampingOptions} //dispatch sales order no. here
											onChange={props.handleChange('inspected')}
											value={props.values.inspected}
											onBlur={props.handleBlur('inspected')}
											helperText={
												props.touched.inspected &&
												props.errors.inspected
											}
											error={
												props.touched.inspected &&
												props.errors.inspected
											}
										/>
										<CustomInput
											//   label="Sales Order No. Date"
											type="date"
											onChange={props.handleChange('inspectedDate')}
											value={props.values.inspectedDate}
											onBlur={props.handleBlur('inspectedDate')}
											helperText={
												props.touched.inspectedDate &&
												props.errors.inspectedDate
											}
											error={
												props.touched.inspectedDate &&
												props.errors.inspectedDate
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
											label="Tested"
											selectValues={stampingOptions} //dispatch sales order no. here
											onChange={props.handleChange('tested')}
											value={props.values.tested}
											onBlur={props.handleBlur('tested')}
											helperText={
												props.touched.tested && props.errors.tested
											}
											error={
												props.touched.tested && props.errors.tested
											}
										/>
										<CustomInput
											//   label="Sales Order No. Date"
											type="date"
											onChange={props.handleChange('testedDate')}
											value={props.values.testedDate}
											onBlur={props.handleBlur('testedDate')}
											helperText={
												props.touched.testedDate &&
												props.errors.testedDate
											}
											error={
												props.touched.testedDate &&
												props.errors.testedDate
											}
										/>
										<CustomInput
											label="Initial Site Visit Conducted By"
											selectValues={[]} //dispatch sales order no. here
											onChange={props.handleChange(
												'initialSiteVisitConductBy'
											)}
											value={props.values.initialSiteVisitConductBy}
											onBlur={props.handleBlur(
												'initialSiteVisitConductBy'
											)}
											helperText={
												props.touched.initialSiteVisitConductBy &&
												props.errors.initialSiteVisitConductBy
											}
											error={
												props.touched.initialSiteVisitConductBy &&
												props.errors.initialSiteVisitConductBy
											}
										/>
										<CustomInput
											//   label="Sales Order No. Date"
											type="date"
											onChange={props.handleChange(
												'initialSiteVisitDate'
											)}
											value={props.values.initialSiteVisitDate}
											onBlur={props.handleBlur(
												'initialSiteVisitDate'
											)}
											helperText={
												props.touched.initialSiteVisitDate &&
												props.errors.initialSiteVisitDate
											}
											error={
												props.touched.initialSiteVisitDate &&
												props.errors.initialSiteVisitDate
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
											label="Type of Complaint"
											selectValues={complaintOptions}
											width="25%"
											onChange={props.handleChange('complaintType')}
											value={props.values.complaintType}
											onBlur={props.handleBlur('complaintType')}
											helperText={
												props.touched.complaintType &&
												props.errors.complaintType
											}
											error={
												props.touched.complaintType &&
												props.errors.complaintType
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
											label="Enter Disposition of Sales Department/QAD"
											width="75%"
											onChange={props.handleChange(
												'dispositionOfSales'
											)}
											value={props.values.dispositionOfSales}
											onBlur={props.handleBlur('dispositionOfSales')}
											helperText={
												props.touched.dispositionOfSales &&
												props.errors.dispositionOfSales
											}
											error={
												props.touched.dispositionOfSales &&
												props.errors.dispositionOfSales
											}
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
