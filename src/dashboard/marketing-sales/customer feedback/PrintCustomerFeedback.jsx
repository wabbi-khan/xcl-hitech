import React from 'react';
import { CustomTable } from '../../../components';

const PrintCustomerFeedback = ({ location }) => {
	const { customerFeedback } = location.state;

	return (
		<div className="">
			<div className="mt-4">
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						width: '100px',
						border: '1px solid black',
						textAlign: 'center',
						float: 'right',
						marginRight: '.2rem',
					}}
				>
					<h6>FM-49</h6>
					<h6>Issue.02</h6>
				</div>
				<h4
					style={{
						textAlign: 'center',
						fontWeight: 'bold',
					}}
				>
					CUSTOMER FEEDBACK FORM
				</h4>
			</div>
			<div
				className="container mt-5"
				style={{ display: 'flex', gap: '1rem' }}
			>
				<p>M/s: </p>
				<p style={{ textDecoration: 'underline' }}>
					{customerFeedback.customerName}
				</p>
			</div>
			<div className="container" style={{ display: 'flex', gap: '1rem' }}>
				<p>Address: </p>
				<p style={{ textDecoration: 'underline' }}>
					{customerFeedback.address}
				</p>
			</div>
			<div className="container">
				<p>Dear Sir,</p>
				<p>
					We are thankful for you patronization and using our products, HI
					TECH Management is always very keen to extend best cooperation to
					facilitate our customers, to their best. To further improve, we
					need your cooperation & assistance & therefore, forwarding you a
					format for your comments and advice.
				</p>
				<p>
					We would be much obliged, if you may return us the same with your
					valued advice and comments:
				</p>
				<p>Please tick √ on appropriate Box & return to us.</p>
				<table class="table table-responsive table-hover table-striped table-bordered border-dark text-center mt-4">
					<thead>
						<tr>
							<th>S. No.</th>
							<th>Description</th>
							<th>Excellent</th>
							<th>Better</th>
							<th>Good</th>
							<th>Average</th>
							<th>Poor</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>1.</td>
							<td>Customer Requirements are defined:</td>
							<td>{customerFeedback.q1 === '1' && '✔'}</td>
							<td>{customerFeedback.q1 === '2' && '✔'}</td>
							<td>{customerFeedback.q1 === '3' && '✔'}</td>
							<td>{customerFeedback.q1 === '4' && '✔'}</td>
							<td>{customerFeedback.q1 === '5' && '✔'}</td>
						</tr>
						<tr>
							<td>2.</td>
							<td>Production Capability is available:</td>
							<td>{customerFeedback.q2 === '1' && '✔'}</td>
							<td>{customerFeedback.q2 === '2' && '✔'}</td>
							<td>{customerFeedback.q2 === '3' && '✔'}</td>
							<td>{customerFeedback.q2 === '4' && '✔'}</td>
							<td>{customerFeedback.q2 === '5' && '✔'}</td>
						</tr>
						<tr>
							<td>3.</td>
							<td>Delivery time is achivevable:</td>
							<td>{customerFeedback.q3 === '1' && '✔'}</td>
							<td>{customerFeedback.q3 === '2' && '✔'}</td>
							<td>{customerFeedback.q3 === '3' && '✔'}</td>
							<td>{customerFeedback.q3 === '4' && '✔'}</td>
							<td>{customerFeedback.q3 === '5' && '✔'}</td>
						</tr>
						<tr>
							<td>4.</td>
							<td>Raw material is available:</td>
							<td>{customerFeedback.q4 === '1' && '✔'}</td>
							<td>{customerFeedback.q4 === '2' && '✔'}</td>
							<td>{customerFeedback.q4 === '3' && '✔'}</td>
							<td>{customerFeedback.q4 === '4' && '✔'}</td>
							<td>{customerFeedback.q4 === '5' && '✔'}</td>
						</tr>
						<tr>
							<td>5.</td>
							<td>Any regulatory requirement:</td>
							<td>{customerFeedback.q5 === '1' && '✔'}</td>
							<td>{customerFeedback.q5 === '2' && '✔'}</td>
							<td>{customerFeedback.q5 === '3' && '✔'}</td>
							<td>{customerFeedback.q5 === '4' && '✔'}</td>
							<td>{customerFeedback.q5 === '5' && '✔'}</td>
						</tr>
						<tr>
							<td>5.</td>
							<td>Previous difference resolve (if any)</td>
							<td>{customerFeedback.q6 === '1' && '✔'}</td>
							<td>{customerFeedback.q6 === '2' && '✔'}</td>
							<td>{customerFeedback.q6 === '3' && '✔'}</td>
							<td>{customerFeedback.q6 === '4' && '✔'}</td>
							<td>{customerFeedback.q6 === '5' && '✔'}</td>
						</tr>
						<tr>
							<td style={{ fontWeight: 'bold' }}>
								Comments/Any Suggestions:
							</td>
							<td colspan="6">{customerFeedback.comments}</td>
						</tr>
					</tbody>
				</table>
				<p className="mt-4">
					Look forward to have your continued patronization & cooperation,
					we remains
				</p>
			</div>
		</div>
	);
};

export default PrintCustomerFeedback;
