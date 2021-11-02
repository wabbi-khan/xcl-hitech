import React, { useState, useEffect } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import {
	CustomContainer,
	CustomButton,
	CustomInput,
	generateOptions,
	CustomTable,
} from '../../../components';
import {
	createCustomerFeedback,
	getCustomerFeedback,
} from '../../../services/action/customerFeedbackAction';
import { Formik, Form, FieldArray } from 'formik';
import * as yup from 'yup';

const options = [
	{
		value: '1',
		name: '1',
	},
	{
		value: '2',
		name: '2',
	},
	{
		value: '3',
		name: '3',
	},
	{
		value: '4',
		name: '4',
	},
	{
		value: '5',
		name: '5',
	},
];

const initialValues = {
	customerName: '',
	address: '',
	q1: '',
	q2: '',
	q3: '',
	q4: '',
	q5: '',
	q6: '',
	comments: '',
};

const validationSchema = yup.object({
	customerName: yup.string().required('Customer Name is required'),
	address: yup.string().required('Address is required'),
	q1: yup.string().required('Question 1 is required'),
	q2: yup.string().required('Question 2 is required'),
	q3: yup.string().required('Question 3 is required'),
	q4: yup.string().required('Question 4 is required'),
	q5: yup.string().required('Question 5 is required'),
	q6: yup.string().required('Question 6 is required'),
	comments: yup.string().required('Comments are required'),
});

const CustomerFeedback = ({ history }) => {
	const [createLoading, setCreateLoading] = useState(false);
	const [createError, setCreateError] = useState('');
	const [success, setSuccess] = useState('');
	const [fetchLoading, setFetchLoading] = useState(false);

	const { customerFeedbacks } = useSelector(
		(state) => state.customerFeedbacks
	);

	const dispatch = useDispatch();

	useEffect(() => {
		setFetchLoading(true);
		dispatch(
			getCustomerFeedback(null, (err) => {
				setFetchLoading(false);
			})
		);
	}, []);

	const onSubmit = (values) => {
		console.log(values);
		setCreateLoading(true);
		dispatch(
			createCustomerFeedback(values, (err) => {
				if (err) {
					setCreateError(err);
					setTimeout(() => {
						setCreateError('');
					}, 4000);
				} else {
					setSuccess('Customer Feedback added successfully');
					setTimeout(() => {
						setSuccess('');
					}, 4000);
				}
				setCreateLoading(false);
			})
		);
	};

	const printFeedback = (e) => {
		history.push({
			pathname: '/marketing_dashboard/print_customer_feedback',
			state: { customerFeedback: e },
		});
	};

	return (
		<Sidenav title="Customer Feedback">
			<CustomContainer>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={onSubmit}
				>
					{(props) => (
						<Form>
							<div style={{ display: 'flex', gap: '1rem' }}>
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
									label="Address"
									onChange={props.handleChange('address')}
									value={props.values.address}
									onBlur={props.handleBlur('address')}
									helperText={
										props.touched.address && props.errors.address
									}
									error={props.touched.address && props.errors.address}
								/>
							</div>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									gap: '.4rem',
									alignItems: 'flex-start',
									justifyContent: 'flex-start',
									textAlign: 'left',
									marginTop: '1rem',
								}}
							>
								<h6 style={{ fontWeight: 'bold' }}>Dear Sir,</h6>
								<div>
									<p>
										We are thankful for your patronaization and using
										our products, HI TECH Management is always very
										keen to extend best cooperation to facilitate our
										customers, to their best. To further improve, we
										need your cooperation & assistance & therefore,
										forwarding you a format for yout comments and
										advice.
									</p>
									<p>
										We would be much obliged, if you may return us the
										same with your valued advice and comments
									</p>
								</div>

								<div
									style={{
										marginTop: '1rem',
										display: 'flex',
										flexDirection: 'column',
									}}
								>
									<div style={{ display: 'flex', gap: '1rem' }}>
										<div>
											<h6 style={{ fontWeight: 'bold' }}>
												Description
											</h6>
											<div
												style={{
													display: 'flex',
													flexDirection: 'column',
													gap: '2rem',
													marginTop: '1rem',
												}}
											>
												<div
													style={{ display: 'flex', gap: '1rem' }}
												>
													<span>1.</span>
													<span>
														Customer Requirements are defined:
													</span>
												</div>
												<div
													style={{ display: 'flex', gap: '1rem' }}
												>
													<span>2.</span>
													<span>
														Production Capability is available:
													</span>
												</div>
												<div
													style={{ display: 'flex', gap: '1rem' }}
												>
													<span>3.</span>
													<span>
														Delivery time is achivevable:
													</span>
												</div>
												<div
													style={{ display: 'flex', gap: '1rem' }}
												>
													<span>4.</span>
													<span>Raw material is available:</span>
												</div>
												<div
													style={{ display: 'flex', gap: '1rem' }}
												>
													<span>5.</span>
													<span>Any regulatory requirement: </span>
												</div>
												<div
													style={{ display: 'flex', gap: '1rem' }}
												>
													<span>6.</span>
													<span>
														Previous difference resolve (if any)
													</span>
												</div>
											</div>
										</div>
										<div>
											<h6 style={{ fontWeight: 'bold' }}>
												Rating: 5
											</h6>
											<div
												style={{
													display: 'flex',
													flexDirection: 'column',
													gap: '.9rem',
												}}
											>
												<CustomInput
													label="Rating"
													selectValues={options}
													width="200px"
													onChange={props.handleChange('q1')}
													value={props.values.q1}
													onBlur={props.handleBlur('q1')}
													helperText={
														props.touched.q1 && props.errors.q1
													}
													error={
														props.touched.q1 && props.errors.q1
													}
												/>
												<CustomInput
													width="200px"
													label="Rating"
													selectValues={options}
													onChange={props.handleChange('q2')}
													value={props.values.q2}
													onBlur={props.handleBlur('q2')}
													helperText={
														props.touched.q2 && props.errors.q2
													}
													error={
														props.touched.q2 && props.errors.q2
													}
												/>
												<CustomInput
													width="200px"
													label="Rating"
													selectValues={options}
													onChange={props.handleChange('q3')}
													value={props.values.q3}
													onBlur={props.handleBlur('q3')}
													helperText={
														props.touched.q3 && props.errors.q3
													}
													error={
														props.touched.q3 && props.errors.q3
													}
												/>
												<CustomInput
													width="200px"
													label="Rating"
													selectValues={options}
													onChange={props.handleChange('q4')}
													value={props.values.q4}
													onBlur={props.handleBlur('q4')}
													helperText={
														props.touched.q4 && props.errors.q4
													}
													error={
														props.touched.q4 && props.errors.q4
													}
												/>
												<CustomInput
													width="200px"
													label="Rating"
													selectValues={options}
													onChange={props.handleChange('q5')}
													value={props.values.q5}
													onBlur={props.handleBlur('q5')}
													helperText={
														props.touched.q5 && props.errors.q5
													}
													error={
														props.touched.q5 && props.errors.q5
													}
												/>
												<CustomInput
													width="200px"
													label="Rating"
													selectValues={options}
													onChange={props.handleChange('q6')}
													value={props.values.q6}
													onBlur={props.handleBlur('q6')}
													helperText={
														props.touched.q6 && props.errors.q6
													}
													error={
														props.touched.q6 && props.errors.q6
													}
												/>
											</div>
										</div>
									</div>
									<div style={{ marginTop: '3rem' }}>
										<CustomInput
											label="Comments/Any Suggestions"
											width="70%"
											onChange={props.handleChange('comments')}
											value={props.values.comments}
											onBlur={props.handleBlur('comments')}
											helperText={
												props.touched.comments &&
												props.errors.comments
											}
											error={
												props.touched.comments &&
												props.errors.comments
											}
										/>
									</div>
									<p style={{ marginTop: '1rem' }}>
										Look forward to have your continued patronization
										& cooperation, we remains
									</p>
								</div>
							</div>
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
							<p>{success}</p>
							<p>{createError}</p>
						</Form>
					)}
				</Formik>
			</CustomContainer>

			<CustomTable
				fetchLoading={fetchLoading}
				data={customerFeedbacks}
				columnHeadings={['Sr.No', 'Customer Name', 'Customer Address']}
				keys={['customerName', 'address']}
				firstOptionText="View"
				onFirstOptionClick={printFeedback}
				withSrNo
			/>
		</Sidenav>
	);
};

export default CustomerFeedback;
