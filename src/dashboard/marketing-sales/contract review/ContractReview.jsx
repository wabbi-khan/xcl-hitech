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

const ContractReview = () => {
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

	const onSubmit = (values) => {};

	return (
		<Sidenav title="Contract Review">
			<CustomContainer></CustomContainer>
		</Sidenav>
	);
};

export default ContractReview;
