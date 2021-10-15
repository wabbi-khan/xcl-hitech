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
import { createContractReview } from '../../../services/action/contractReviewAction';
import { getSalesContract } from '../../../services/action/salesContractAction';
import { Formik, Form, FieldArray } from 'formik';
import * as yup from 'yup';

const CustomerComplaint = () => {
	const dispatch = useDispatch();

	return (
		<Sidenav title="Contract Review">
			<CustomContainer>
				<div
					style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
				>
					<div
						style={{
							display: 'flex',
							gap: '1rem',
							justifyContent: 'flex-start',
						}}
					>
						<CustomInput label="Select Department" />
						<CustomInput label="Complaint No. (To be filled by SO)" />
					</div>
					<div
						style={{
							display: 'flex',
							gap: '1rem',
							justifyContent: 'flex-start',
						}}
					>
						<CustomInput label="Customer Type" />
						<CustomInput label="Select Inquirer" />
					</div>
					<div
						style={{
							display: 'flex',
							gap: '1rem',
							justifyContent: 'flex-start',
						}}
					>
						<CustomInput label="Customer Name" />
						<CustomInput label="Contact Person" />
						<CustomInput label="Address" />
						<CustomInput label="Phone No" />
					</div>
					<div
						style={{
							display: 'flex',
							gap: '1rem',
							justifyContent: 'flex-start',
						}}
					>
						<CustomInput label="Supplied Through" />
						<CustomInput label="Project(Mention Name & Add...)" />
						<CustomInput label="Complaint Receiving Date" />
						<CustomInput label="Product" />
					</div>
					<div
						style={{
							display: 'flex',
							gap: '1rem',
							justifyContent: 'flex-start',
						}}
					>
						<CustomInput label="Stamping" />
						<CustomInput label="Sales Order No. & Date" />
						<CustomInput label="Delivery Order No. & Date" />
						<CustomInput label="Quantity Supplied" />
					</div>
					<div
						style={{
							display: 'flex',
							gap: '1rem',
							justifyContent: 'flex-start',
						}}
					>
						<CustomInput label="Quantity Affected" />
						<CustomInput label="Total Value of order (Rs)" />
						<CustomInput label="Total value of affected quantity (Rs)" />
						<CustomInput label="Initial Recommendations After..." />
					</div>
					<div
						style={{
							display: 'flex',
							gap: '1rem',
							justifyContent: 'flex-end',
						}}
					>
						<CustomInput type="date" width="30%" />
					</div>
					<div
						style={{
							display: 'flex',
							gap: '1rem',
							justifyContent: 'flex-start',
						}}
					>
						<CustomButton
							text="Submit"
							style={{ backgroundColor: '#22A19A', color: '#fff' }}
						/>
					</div>
				</div>
			</CustomContainer>
		</Sidenav>
	);
};

export default CustomerComplaint;
