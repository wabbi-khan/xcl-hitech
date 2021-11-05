import React, { useState, useEffect } from 'react';
import Sidenav from '../../../../SideNav/Sidenav';
import Button from '../../../../../components/utils/Button';
import { getNonExtEmpPerformanceAction } from '../../../../../services/action/NonExtPerformance';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';
import { capitalize } from '../../../../../utils/capitalize';
import moment from 'moment';

const ViewAllNonExecAssest = ({ history }) => {
	const [fetchLoading, setFetchLoading] = useState(true);

	const { nonExecPerformance } = useSelector(
		(state) => state.nonExecPerformance
	);

	const dispatch = useDispatch();

	useEffect(() => {
		setFetchLoading(true);
		dispatch(
			getNonExtEmpPerformanceAction(null, (err) => {
				setFetchLoading(false);
			})
		);
	}, [dispatch]);

	console.log(nonExecPerformance);

	return (
		<Sidenav title={'Employee Assessments (Non-Executive)'}>
			{fetchLoading ? (
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						marginTop: '3rem',
					}}
				>
					<Loader
						type="TailSpin"
						color="#000"
						width="3rem"
						height="3rem"
					/>
				</div>
			) : nonExecPerformance?.length === 0 ? (
				<p>There is no data found.</p>
			) : (
				<div>
					<table class="table table-bordered border-dark table-responsive text-center">
						<thead class="thead-inverse">
							<tr class="bg-dark text-light">
								<th>S.No.</th>
								<th>Employee Name</th>
								<th>Designation</th>
								<th>Department</th>
								<th>Date of Assessment</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{nonExecPerformance?.map((el, i) => (
								<tr>
									<td>{i + 1}</td>
									<td>{capitalize(el?.employee?.name)}</td>
									<td>
										{capitalize(el?.employee?.finalDesignation?.name)}
									</td>
									<td>
										{capitalize(el?.employee?.finalDepartment?.name)}
									</td>
									<td>
										{el?.createdAt &&
											moment(el?.createdAt).format('DD MMM YYYY')}
									</td>
									<td>
										<Button
											variant="outlined"
											color="primary"
											text="View"
											size="small"
											classNames="bg-dark text-light"
											onClick={() => {
												history.push({
													pathname: `/hr/performance_assessment/print_non_executive_emp_performance`,
													state: { performance: el },
												});
											}}
										/>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					{/* <pre>{JSON.stringify(nonExecPerformance, null, 2)}</pre> */}
				</div>
			)}
		</Sidenav>
	);
};

export default ViewAllNonExecAssest;
