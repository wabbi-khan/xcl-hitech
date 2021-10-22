import React, { useEffect } from 'react';

import { getEmployees } from '../../../services/action/EmployeesAction';
import { useDispatch, useSelector } from 'react-redux';

import { CustomInput, CustomButton } from '../../../components';
import Sidenav from '../../SideNav/Sidenav';

const CreatePayroll = () => {
	const { employees } = useSelector((state) => state.employees);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getEmployees());
	}, []);

	console.log(employees);

	return (
		<Sidenav title="Create Payroll">
			<div>
				{employees.map((el) => (
					<div>
						<p>{el.name}</p>
					</div>
				))}
			</div>
		</Sidenav>
	);
};

export default CreatePayroll;
