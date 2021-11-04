import React from 'react';
import Sidenav from '../../../../SideNav/Sidenav';
import Button from '../../../../../components/utils/Button';
import { getExtEmpPerformanceAction } from '../../../../../services/action/ExecPerformance';
import { useDispatch, useSelector } from 'react-redux';

const ViewAllExecEmpAssest = ({ history }) => {
	return (
		<Sidenav title={'Employee Assessments (Executive)'}>
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
						<tr>
							<td>{}</td>
							<td>{}</td>
							<td>{}</td>
							<td>{}</td>
							<td>{}</td>
							<td>
								<Button
									variant="outlined"
									color="primary"
									text="View"
									size="small"
									classNames="bg-dark text-light"
									// classNames={classes.addButton}
									onClick={() => {
										history.push(
											`/hr/performance_assessment/print_executive_emp_performance`
										);
									}}
								/>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</Sidenav>
	);
};

export default ViewAllExecEmpAssest;
