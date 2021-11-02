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
import {
	createCustomerComplaint,
	getCustomerComplaint,
} from '../../../services/action/customerComplaintAction';
import { getEmployees } from '../../../services/action/EmployeesAction';
import { getSalesContract } from '../../../services/action/salesContractAction';
import { fetchDepartmentsAction } from '../../../services/action/DepartmentAction';
import { Formik, Form, FieldArray } from 'formik';
import * as yup from 'yup';
import moment from 'moment';

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
});

const initialValues2 = {
	suppliedThrough: '',
	project: '',
	complaintReceivingData: '',
	product: '',
	stamping: '',
	salesOrder: '',
	salesOrderDate: '',
	quantitySupplied: '',
};

const validationSchema2 = yup.object({
	suppliedThrough: yup.string().required(),
	project: yup.string().required(),
	complaintReceivingData: yup.string().required(),
	product: yup.string().required(),
	stamping: yup.string().required(),
	salesOrder: yup.string().required(),
	salesOrderDate: yup.string().required(),
	quantitySupplied: yup.string().required(),
});

const initialValues3 = {
	quantityAffected: '',
	totalValueOfOrder: '',
	totalValueOfQuantity: '',
	initialRecommendations: '',
	reportPreparedBy: '',
	date: '',
	sampleRec: '',
	sampleRecDate: '',
};

const validationSchema3 = yup.object({
	quantityAffected: yup.string().required(),
	totalValueOfOrder: yup.string().required(),
	totalValueOfQuantity: yup.string().required(),
	initialRecommendations: yup.string().required(),
	reportPreparedBy: yup.string(),
	date: yup.string(),
	sampleRec: yup.string().required(),
	sampleRecDate: yup.string().required(),
});

const initialValues4 = {
	inspected: '',
	inspectedDate: '',
	tested: '',
	testedDate: '',
	initialSiteVisitConductBy: '',
	initialSiteVisitDate: '',
	complaintType: '',
	dispositionOfSales: '',
};

const validationSchema4 = yup.object({
	inspected: yup.string().required(),
	inspectedDate: yup.string().required(),
	tested: yup.string().required(),
	testedDate: yup.string().required(),
	initialSiteVisitConductBy: yup.string().required(),
	initialSiteVisitDate: yup.string().required(),
	complaintType: yup.string().required(),
	dispositionOfSales: yup.string().required(),
});

const inititalValues5 = {
	letterSentToComplaint: '',
	letterSentToComplaintDate: '',
	complaintClosedDate: '',
	distribution: '',
};

const validationSchema5 = yup.object({
	letterSentToComplaint: yup.string().required(),
	letterSentToComplaintDate: yup.string().required(),
	complaintClosedDate: yup.string().required(),
	distribution: yup.string().required(),
});

const Rows = ({ children, style }) => (
	<div
		style={{
			display: 'flex',
			flexDirection: 'column',
			gap: '1rem',
			...style,
		}}
	>
		{children}
	</div>
);

const Row = ({ children }) => (
	<div
		style={{
			display: 'flex',
			gap: '1rem',
			justifyContent: 'flex-start',
		}}
	>
		{children}
	</div>
);

const CustomerComplaint = ({ history }) => {
	const [createLoading, setCreateLoading] = useState(false);
	const [fetchLoading, setFetchLoading] = useState(false);

	const dispatch = useDispatch();

	let form1 = null;
	let form2 = null;
	let form3 = null;
	let form4 = null;
	let form5 = null;

	const { departments } = useSelector((state) => state.departments);
	const { salesContracts } = useSelector((state) => state.salesContracts);
	const { employees } = useSelector((state) => state.employees);
	const { customerComplaints } = useSelector(
		(state) => state.customerComplaints
	);

	useEffect(() => {
		dispatch(fetchDepartmentsAction());
		dispatch(getSalesContract());
		dispatch(getEmployees());

		setFetchLoading(true);
		dispatch(
			getCustomerComplaint(null, (err) => {
				setFetchLoading(false);
			})
		);
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
		const form3Errors = await form3.validateForm();
		if (!isEmpty(form3Errors)) {
			form3.setTouched(form3Errors);
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
		};

		setCreateLoading(true);
		dispatch(
			createCustomerComplaint(values, (err) => {
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

	const printComplaintForm = () => {
		history.push('/marketing_dashboard/print_customer_complaint');
	};

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
								<Rows style={{ marginBottom: '1rem' }}>
									<Row>
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
									</Row>
									<Row>
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
									</Row>
									<Row>
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
									</Row>
								</Rows>
								<CustomButton
									text="Submit"
									style={{
										display: 'none',
									}}
									loading={createLoading}
									loaderColor="#fff"
								/>
							</Form>
						);
					}}
				</Formik>

				<Formik
					initialValues={initialValues2}
					validationSchema={validationSchema2}
					enableReinitialize
					onSubmit={onSubmit}
				>
					{(props) => {
						form2 = props;
						return (
							<Form>
								<Rows style={{ marginBottom: '1rem' }}>
									<Row>
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
									</Row>
									<Row>
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
											selectValues={generateOptions(
												salesContracts,
												'code',
												'_id'
											)} //dispatch sales order no. here
											onChange={(id) => {
												const salesContract = salesContracts.find(
													(el) => el._id === id
												);
												console.log(salesContract);
												props.setFieldValue('salesOrder', id);
												props.setFieldValue(
													'salesOrderDate',
													moment(salesContract.createdAt).format(
														'DD-MMM-YYYY'
													)
												);
											}}
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
											label="Sales Order No. Date"
											type="text"
											disabled
											onChange={props.handleChange('salesOrderDate')}
											value={props.values.salesOrderDate}
											onBlur={props.handleBlur('salesOrderDate')}
											helperText={
												props.touched.salesOrderDate &&
												props.errors.salesOrderDate
											}
											error={
												props.touched.salesOrderDate &&
												props.errors.salesOrderDate
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
									</Row>
								</Rows>
								<CustomButton
									text="Submit"
									style={{
										display: 'none',
									}}
									loading={createLoading}
									loaderColor="#fff"
								/>
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
						form3 = props;
						return (
							<Form>
								<Rows style={{ marginBottom: '1rem' }}>
									<Row>
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
									</Row>
									<Row>
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
									</Row>

									<div style={{ marginTop: 5, marginBottom: 10 }}>
										<hr />
									</div>

									<Row>
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
									</Row>
								</Rows>
								<CustomButton
									text="Submit"
									style={{
										display: 'none',
									}}
									loading={createLoading}
									loaderColor="#fff"
								/>
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
						form4 = props;
						return (
							<Form>
								<Rows>
									<Row>
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
									</Row>
									<Row>
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
											selectValues={generateOptions(
												employees,
												'name',
												'_id'
											)}
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
									</Row>
									<Row>
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
									</Row>
									<Row>
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
									</Row>
								</Rows>
								<CustomButton
									text="Submit"
									style={{
										display: 'none',
									}}
									loading={createLoading}
									loaderColor="#fff"
								/>
							</Form>
						);
					}}
				</Formik>

				<div style={{ marginTop: 5, marginBottom: 10 }}>
					<hr />
				</div>

				<Formik
					initialValues={inititalValues5}
					validationSchema={validationSchema5}
					onSubmit={onSubmit}
				>
					{(props) => {
						form5 = props;
						return (
							<Form>
								<Rows>
									<Row>
										<CustomInput
											label="Letter Send to Complainant"
											selectValues={stampingOptions}
											style={{ width: '25%' }}
											onChange={props.handleChange(
												'letterSentToComplaint'
											)}
											value={props.values.letterSentToComplaint}
											onBlur={props.handleBlur(
												'letterSentToComplaint'
											)}
											helperText={
												props.touched.letterSentToComplaint &&
												props.errors.letterSentToComplaint
											}
											error={
												props.touched.letterSentToComplaint &&
												props.errors.letterSentToComplaint
											}
										/>
										<CustomInput
											type="date"
											style={{ width: '25%' }}
											onChange={props.handleChange(
												'letterSentToComplaintDate'
											)}
											value={props.values.letterSentToComplaintDate}
											onBlur={props.handleBlur(
												'letterSentToComplaintDate'
											)}
											helperText={
												props.touched.letterSentToComplaintDate &&
												props.errors.letterSentToComplaintDate
											}
											error={
												props.touched.letterSentToComplaintDate &&
												props.errors.letterSentToComplaintDate
											}
										/>

										<div
											style={{
												display: 'flex',
												flexDirection: 'column',
											}}
										>
											<CustomInput
												type="date"
												onChange={props.handleChange(
													'complaintClosedDate'
												)}
												value={props.values.complaintClosedDate}
												onBlur={props.handleBlur(
													'complaintClosedDate'
												)}
												helperText={
													props.touched.complaintClosedDate &&
													props.errors.complaintClosedDate
												}
												error={
													props.touched.complaintClosedDate &&
													props.errors.complaintClosedDate
												}
											/>
											<span
												style={{
													textAlign: 'left',
													fontSize: '11px',
												}}
											>
												Complaint Closed Date
											</span>
										</div>
										<div
											style={{
												display: 'flex',
												flexDirection: 'column',
											}}
										>
											<CustomInput label="Days" disabled />
											<span
												style={{
													textAlign: 'left',
													fontSize: '11px',
												}}
											>
												Time Period For Resolution
											</span>
										</div>
										<CustomInput
											label="Select Distribution"
											selectValues={generateOptions(
												departments,
												'name',
												'_id'
											)}
											style={{ width: '25%' }}
											onChange={props.handleChange('distribution')}
											value={props.values.distribution}
											onBlur={props.handleBlur('distribution')}
											helperText={
												props.touched.distribution &&
												props.errors.distribution
											}
											error={
												props.touched.distribution &&
												props.errors.distribution
											}
										/>
									</Row>
								</Rows>
								<CustomButton
									text="Submit"
									style={{
										marginTop: '2rem',
										backgroundColor: '#22A19A',
										color: '#fff',
									}}
									loading={createLoading}
									loaderColor="#fff"
								/>
							</Form>
						);
					}}
				</Formik>
			</CustomContainer>

			<CustomTable
				fetchLoading={fetchLoading}
				data={customerComplaints}
				columnHeadings={[
					'Sr.No',
					'Complaint No.',
					'Customer Name',
					'Sales Order No.',
					'Distribution',
				]}
				keys={[
					'complaintNo',
					'customerName',
					'salesOrder.code',
					'distribution.name',
				]}
				firstOptionText="View"
				onFirstOptionClick={printComplaintForm}
				withSrNo
			/>
		</Sidenav>
	);
};

export default CustomerComplaint;
