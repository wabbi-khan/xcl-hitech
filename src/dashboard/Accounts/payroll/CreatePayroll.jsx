import React, { useEffect, useState } from 'react';
import { getEmployees } from '../../../services/action/EmployeesAction';
import { useDispatch, useSelector } from 'react-redux';
import { CustomInput, CustomButton } from '../../../components';
import Loader from 'react-loader-spinner';
import Sidenav from '../../SideNav/Sidenav';
import Checkbox from '@material-ui/core/Checkbox';
import moment from 'moment';

const CreatePayroll = () => {
	const [fetchLoading, setFetchLoading] = useState(true);
	const [employeesData, setEmployeesData] = useState([]);
	const [checkAll, setCheckAll] = useState(false);
	const [totalSal, setTotalSal] = useState(0);
	const [totalDeduction, setTotalDeduction] = useState(0);
	const [finalSal, setFinalSal] = useState(0);
	const [salaryOfMonth, setSalaryOfMonth] = useState('');

	const { employees } = useSelector((state) => state.employees);

	const dispatch = useDispatch();

	useEffect(() => {
		if (salaryOfMonth) {
			setFetchLoading(true);
			dispatch(
				getEmployees(null, (err) => {
					setFetchLoading(false);
				})
			);
		}
	}, [salaryOfMonth, dispatch]);

	function getAmountOfWeekDaysInMonth(date, weekday) {
		date.date(1);
		var dif = ((7 + (weekday - date.weekday())) % 7) + 1;
		return Math.floor((date.daysInMonth() - dif) / 7) + 1;
	}

	useEffect(() => {
		let totalDaysInCurrMonth = moment().daysInMonth();
		const temp = employees.map((el) => {
			let totalUnPaidLeaves = 0;
			let totalPaidLeaves = 0;
			let totalDeduction = 0;
			let totalSalaryAfterDeduction = el.finalSal;
			let empSalOfSingleDay = el.finalSal / totalDaysInCurrMonth;
			let currDate = new Date(salaryOfMonth);
			console.log(el);
			for (let i = 0; i < el.leaves.length; i++) {
				let fromDate = new Date(el.leaves[i].from);

				if (el.leaves[i].isPaid) {
					for (let j = 0; j < el.leaves[i].days; j++) {}
				} else {
					for (let j = 0; j < el.leaves[i].days; j++) {
						console.log('object');
					}
				}
			}
			if (totalUnPaidLeaves > 0) {
				totalDeduction = Math.ceil(empSalOfSingleDay * totalUnPaidLeaves);
				totalSalaryAfterDeduction -= totalDeduction;
			}

			return {
				...el,
				checked: false,
				totalUnPaidLeaves,
				totalPaidLeaves,
				totalDeduction,
				totalSalaryAfterDeduction,
			};
		});

		setEmployeesData([...temp]);
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

	return (
		<Sidenav title="Create Payroll">
			<div>
				<div className="d-flex justify-content-between">
					<div
						style={{
							display: 'flex',
							// justifyContent: "center",
							// alignItems: "center",
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
					<CustomButton
						text="Pay"
						classNames="btn btn-sm bg-dark text-light"
					/>
				</div>
				<div>
					<CustomInput
						width="30%"
						type="date"
						onChange={(e) => setSalaryOfMonth(e)}
					/>
				</div>
				{!salaryOfMonth ? (
					<p>Please select the month</p>
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
				<CustomButton
					text="Create Salary Voucher"
					classNames="btn btn-sm bg-dark text-light"
					style={{ float: 'right' }}
				/>
			</div>
		</Sidenav>
	);
};

export default CreatePayroll;
