import React, { useEffect, useState } from 'react';
import { getEmployees } from '../../../services/action/EmployeesAction';
import { getAttendanceAction } from '../../../services/action/attendanceAction';
import { createVouchers } from '../../../services/action/voucherActions';
import { getAccounts } from '../../../services/action/accountAction';
import { useDispatch, useSelector } from 'react-redux';
import {
	CustomInput,
	CustomButton,
	generateOptionsFromIndexes,
	generateOptions,
} from '../../../components';
import Loader from 'react-loader-spinner';
import Sidenav from '../../SideNav/Sidenav';
import Checkbox from '@material-ui/core/Checkbox';
import moment from 'moment';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { accountTypes } from '../../../constants/accountTypes';

const monthNames = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

const initialValues = {
	naration: '',
	to: '',
	from: '',
};

const validationSchema = yup.object({
	naration: yup.string().required(),
	to: yup.string().required(),
	from: yup.string().required(),
});

const CreatePayroll = ({ history }) => {
	const [fetchLoading, setFetchLoading] = useState(true);
	const [employeesData, setEmployeesData] = useState([]);
	const [checkAll, setCheckAll] = useState(false);
	const [totalSal, setTotalSal] = useState(0);
	const [totalDeduction, setTotalDeduction] = useState(0);
	const [finalSal, setFinalSal] = useState(0);
	const [salaryOfMonth, setSalaryOfMonth] = useState('');
	const [createLoading, setCreateLoading] = useState(false);
	const [createError, setCreateError] = useState('');
	const [success, setSuccess] = useState('');

	const { employees } = useSelector((state) => state.employees);
	const { accounts } = useSelector((state) => state.accounts);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAccounts());
	}, []);

	useEffect(() => {
		if (salaryOfMonth) {
			setFetchLoading(true);
			dispatch(getEmployees(null, (err) => {}));
		}
	}, [salaryOfMonth, dispatch]);

	function getAmountOfWeekDaysInMonth(date, weekday) {
		date.date(1);
		var dif = ((7 + (weekday - date.weekday())) % 7) + 1;
		return Math.floor((date.daysInMonth() - dif) / 7) + 1;
	}

	useEffect(async () => {
		let totalDaysInCurrMonth = moment().daysInMonth();
		let temp = [];

		for (let el of employees) {
			let totalUnPaidLeaves = 0;
			let totalPaidLeaves = 0;
			let totalDeduction = 0;
			let totalAbsents = 0;
			let totalPresents = 0;
			let totalSalaryAfterDeduction = el.finalSal;
			let empSalOfSingleDay = el.finalSal / totalDaysInCurrMonth;
			let currDate = new Date(salaryOfMonth);
			currDate.setFullYear(2021);
			for (let i = 0; i < el.leaves.length; i++) {
				let fromDate = new Date(el.leaves[i].from);
				fromDate.setDate(fromDate.getDate() + 1);
				if (el.leaves[i].isPaid) {
					for (let j = 0; j < el.leaves[i].days; j++) {
						if (fromDate.getMonth() === currDate.getMonth()) {
							totalPaidLeaves++;
						}
						fromDate.setDate(fromDate.getDate() + 1);
					}
				} else {
					for (let j = 0; j < el.leaves[i].days; j++) {
						if (fromDate.getMonth() === currDate.getMonth()) {
							totalUnPaidLeaves++;
						}
						fromDate.setDate(fromDate.getDate() + 1);
					}
				}
			}

			const today = moment(currDate).startOf('month').clone();

			await dispatch(
				getAttendanceAction(
					`employee=${el._id}&date[gte]=${today.format(
						'DD-MMM-YYYY'
					)}&date[lte]=${moment(today)
						.endOf('month')
						.clone()
						.format('DD-MMM-YYYY')}`,
					(err, data) => {
						if (err) return;
						totalPresents = data.data.length;

						for (let i = 0; i < data?.data?.length; i++) {
							if (!data.data[i].isLeave && !data.data[i].isPresent) {
								totalAbsents++;
								totalPresents--;
							}
						}
					}
				)
			);

			if (totalUnPaidLeaves > 0 || totalAbsents > 0) {
				let temp = totalUnPaidLeaves + totalAbsents;
				totalDeduction = Math.ceil(empSalOfSingleDay * temp);
				totalSalaryAfterDeduction -= totalDeduction;
			}

			temp.push({
				...el,
				checked: false,
				totalUnPaidLeaves,
				totalPaidLeaves,
				totalAbsents,
				totalPresents,
				totalDeduction,
				totalSalaryAfterDeduction,
			});
		}

		setEmployeesData([...temp]);
		setFetchLoading(false);
	}, [employees]);

	const check = (index) => {
		setEmployeesData((prevData) => {
			const temp = [...prevData];
			temp[index] = { ...temp[index], checked: !temp[index].checked };
			if (temp[index].checked) {
				setTotalSal((prevSal) => (prevSal += temp[index].finalSal));
				setTotalDeduction(
					(prevSal) => (prevSal += temp[index].totalDeduction)
				);
				setFinalSal(
					(prevSal) => (prevSal += temp[index].totalSalaryAfterDeduction)
				);
			} else {
				setTotalSal((prevSal) => (prevSal -= temp[index].finalSal));
				setTotalDeduction(
					(prevSal) => (prevSal -= temp[index].totalDeduction)
				);
				setFinalSal(
					(prevSal) => (prevSal -= temp[index].totalSalaryAfterDeduction)
				);
			}
			return temp;
		});
	};

	const checkAllFunc = () => {
		setCheckAll((prevData) => {
			if (prevData) {
				setEmployeesData((prevEmpData) =>
					prevEmpData.map((el) => ({ ...el, checked: false }))
				);
			} else {
				setEmployeesData((prevEmpData) =>
					prevEmpData.map((el) => ({ ...el, checked: true }))
				);
			}

			if (prevData) {
				setTotalSal(0);
				setTotalDeduction(0);
				setFinalSal(0);
			} else {
				let tempSal = 0;
				let tempDeduction = 0;
				let tempTotalAfterDed = 0;
				setEmployeesData((prevEmpData) =>
					prevEmpData.map((el) => ({ ...el, checked: true }))
				);

				for (let i = 0; i < employeesData.length; i++) {
					tempSal += employeesData[i].finalSal;
					tempDeduction += employeesData[i].totalDeduction;
					tempTotalAfterDed += employeesData[i].totalSalaryAfterDeduction;
				}
				setTotalSal(tempSal);
				setTotalDeduction(tempDeduction);
				setFinalSal(tempTotalAfterDed);
			}

			return !prevData;
		});
	};

	const setTotalSalFunc = (emp) => {
		let temp = 0;
		emp.forEach((el) => {
			if (el.checked) {
			}
		});
	};

	const pushToPrint = (values) => {
		values = {
			employees: employeesData,
			naration: values.naration,
			amount: finalSal,
			to: values.to,
			from: values.from,
			head: values.head,
		};
		setCreateLoading(true);
		dispatch(
			createVouchers(values, (err, data) => {
				if (err) {
					setCreateError(err);
					setTimeout(() => {
						setCreateError('');
					}, 4000);
				} else {
					history.push({
						pathname: '/payroll/salary_voucher',
						state: {
							employees: employeesData,
							naration: values.naration,
							totalSal,
							totalDeduction,
							finalSal,
							voucherNo: data.voucher.voucherNo,
						},
					});
				}
				setCreateLoading(false);
			})
		);
	};

	return (
		<Sidenav title="Create Payroll">
			<p>
				Make sure that you are creating the payroll after the month has
				ended, Or you may see incorrect results.
			</p>
			<div>
				{salaryOfMonth && (
					<div className="d-flex justify-content-between">
						<div
							style={{
								display: 'flex',
							}}
						>
							<p className="mt-3">
								{checkAll ? 'Uncheck All' : 'Check All'}
							</p>
							<Checkbox
								color="default"
								checked={checkAll}
								onChange={checkAllFunc}
							/>
						</div>
					</div>
				)}
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: '10px',
					}}
				>
					<span>Create Payroll for the month: </span>
					<CustomInput
						width="30%"
						onChange={(e) => setSalaryOfMonth(`${+e + 1}`)}
						selectValues={generateOptionsFromIndexes(monthNames)}
					/>
				</div>
				{!salaryOfMonth ? (
					<p style={{ textAlign: 'center', marginTop: '20px' }}></p>
				) : fetchLoading ? (
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							marginTop: '3rem',
							marginBottom: '3rem',
						}}
					>
						<Loader
							type="TailSpin"
							color="#000"
							width="3rem"
							height="3rem"
						/>
					</div>
				) : employeesData?.length === 0 ? (
					<p>There is no data found.</p>
				) : (
					<table class="table table-responsive table-hover table-striped table-bordered border-dark text-center mt-2">
						<thead class="thead-inverse bg-dark text-light">
							<tr>
								<td>Approve</td>
								<td>Sr. #</td>
								<td>Employee Name</td>
								<td>Designation</td>
								<td>Department</td>
								<td>Salary</td>
								<td>Presents</td>
								<td>Absents</td>
								<td>Paid Leaves</td>
								<td>UnPaid Leaves</td>
								<td>Deduction</td>
								<td>Final Salary</td>
							</tr>
						</thead>
						<tbody>
							{employeesData.map((emp, i) => {
								return (
									<tr>
										<td>
											<Checkbox
												color="default"
												size="small"
												checked={emp.checked}
												onChange={() => check(i)}
											/>
										</td>
										<td>{i + 1}</td>
										<td>{emp.name}</td>
										<td>{emp.finalDesignation.name}</td>
										<td>{emp.finalDepartment.name}</td>
										<td>{emp.finalSal}</td>
										<td>{emp.totalPresents}</td>
										<td>{emp.totalAbsents}</td>
										<td>{emp.totalPaidLeaves}</td>
										<td>{emp.totalUnPaidLeaves}</td>
										<td>{emp.totalDeduction}</td>
										<td>{emp.totalSalaryAfterDeduction}</td>
									</tr>
								);
							})}
							<tr>
								<td
									colspan="8"
									style={{ textAlign: 'right', fontWeight: 'bold' }}
								>
									Total Salary Amount:
								</td>
								<td>{totalSal}</td>
							</tr>
							<tr>
								<td
									colspan="8"
									style={{ textAlign: 'right', fontWeight: 'bold' }}
								>
									Total Deduction Amount:{' '}
								</td>
								<td>{totalDeduction}</td>
							</tr>
							<tr>
								<td
									colspan="8"
									style={{ textAlign: 'right', fontWeight: 'bold' }}
								>
									Final Salary Amount:{' '}
								</td>
								<td>{finalSal}</td>
							</tr>
						</tbody>
					</table>
				)}
				{salaryOfMonth && (
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={pushToPrint}
					>
						{(props) => (
							<Form>
								<div
									style={{
										textAlign: 'center',
										marginBottom: '1rem',
										marginTop: '1rem',
										gap: '1rem',
									}}
								>
									<CustomInput
										label="Naration/Description"
										width="30%"
										onChange={props.handleChange('naration')}
										value={props.values.naration}
										onBlur={props.handleBlur('naration')}
										helperText={
											props.touched.naration && props.errors.naration
										}
										error={
											props.touched.naration && props.errors.naration
										}
									/>
									<CustomInput
										label="Select From Account"
										width="30%"
										onChange={props.handleChange('from')}
										value={props.values.from}
										onBlur={props.handleBlur('from')}
										helperText={
											props.touched.from && props.errors.from
										}
										error={props.touched.from && props.errors.from}
										selectValues={generateOptions(
											accounts,
											'name',
											'_id'
										)}
									/>
									<CustomInput
										label="Select To Account"
										width="30%"
										onChange={props.handleChange('to')}
										value={props.values.to}
										onBlur={props.handleBlur('to')}
										helperText={props.touched.to && props.errors.to}
										error={props.touched.to && props.errors.to}
										selectValues={generateOptions(
											accounts,
											'name',
											'_id'
										)}
									/>
									<CustomInput
										label="Head"
										width="30%"
										onChange={props.handleChange('head')}
										value={props.values.head}
										onBlur={props.handleBlur('head')}
										helperText={
											props.touched.head && props.errors.head
										}
										error={props.touched.head && props.errors.head}
										selectValues={generateOptionsFromIndexes(
											accountTypes
										)}
									/>
								</div>
								<CustomButton
									text="Create Salary Voucher"
									classNames="btn btn-sm bg-dark text-light"
									style={{ float: 'right' }}
									loading={
										fetchLoading ? true : createLoading ? true : false
									}
									loaderColor="#fff"
								/>
								{createError && (
									<p style={{ color: 'red', textAlign: 'center' }}>
										{createError}
									</p>
								)}
							</Form>
						)}
					</Formik>
				)}
			</div>
		</Sidenav>
	);
};

export default CreatePayroll;
