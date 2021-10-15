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

const CustomerFeedback = () => {
	const [createLoading, setCreateLoading] = useState(false);
	const [createError, setCreateError] = useState('');
	const [success, setSuccess] = useState('');

	const dispatch = useDispatch();

	useEffect(() => {}, []);

	const onSubmit = (values) => {};

	return (
		<Sidenav title="Customer Feedback">
			<CustomContainer>
				<div style={{ display: 'flex', gap: '1rem' }}>
					<CustomInput label="Customer Name" />
					<CustomInput label="Address" />
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
							We are thankful for your patronaization and using our
							products, HI TECH Management is always very keen to extend
							best cooperation to facilitate our customers, to their
							best. To further improve, we need your cooperation &
							assistance & therefore, forwarding you a format for yout
							comments and advice.
						</p>
						<p>
							We would be much obliged, if you may return us the same
							with your valued advice and comments
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
								<h6 style={{ fontWeight: 'bold' }}>Description</h6>
								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										gap: '2rem',
										marginTop: '1rem',
									}}
								>
									<div style={{ display: 'flex', gap: '1rem' }}>
										<span>1.</span>
										<span>Customer Requirements are defined:</span>
									</div>
									<div style={{ display: 'flex', gap: '1rem' }}>
										<span>2.</span>
										<span>Production Capability is available:</span>
									</div>
									<div style={{ display: 'flex', gap: '1rem' }}>
										<span>3.</span>
										<span>Delivery time is achivevable:</span>
									</div>
									<div style={{ display: 'flex', gap: '1rem' }}>
										<span>4.</span>
										<span>Raw material is available:</span>
									</div>
									<div style={{ display: 'flex', gap: '1rem' }}>
										<span>5.</span>
										<span>Any regulatory requirement: </span>
									</div>
									<div style={{ display: 'flex', gap: '1rem' }}>
										<span>6.</span>
										<span>Previous difference resolve (if any)</span>
									</div>
								</div>
							</div>
							<div>
								<h6 style={{ fontWeight: 'bold' }}>Rating: 5</h6>
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
									/>
									<CustomInput
										width="200px"
										label="Rating"
										selectValues={options}
									/>
									<CustomInput
										width="200px"
										label="Rating"
										selectValues={options}
									/>
									<CustomInput
										width="200px"
										label="Rating"
										selectValues={options}
									/>
									<CustomInput
										width="200px"
										label="Rating"
										selectValues={options}
									/>
									<CustomInput
										width="200px"
										label="Rating"
										selectValues={options}
									/>
								</div>
							</div>
						</div>
						<div style={{ marginTop: '3rem' }}>
							<CustomInput
								label="Comments/Any Suggestions"
								width="70%"
							/>
						</div>
						<p style={{ marginTop: '1rem' }}>
							Look forward to have your continued patronization &
							cooperation, we remains
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
				/>
			</CustomContainer>
		</Sidenav>
	);
};

export default CustomerFeedback;
