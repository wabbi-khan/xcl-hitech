import React from 'react';
import moment from 'moment';

const SalaryVoucher = ({ location }) => {
	const state = location.state;

	return (
		<div className="container mt-5">
			<h4
				style={{
					fontWeight: 'bold',
					textDecoration: 'underline',
					textAlign: 'center',
				}}
			>
				Salary Voucher
			</h4>
			<div className="d-flex mt-5" style={{ gap: '.5rem' }}>
				<p>Date: </p>
				<p style={{ textDecoration: 'underline' }}>
					{moment().format('DD-MMM-YYYY')}
				</p>
			</div>
			<div className="d-flex" style={{ gap: '.5rem' }}>
				<p>Voucher #:</p>
				<p style={{ textDecoration: 'underline' }}>{}</p>
			</div>
			<div className="d-flex" style={{ gap: '.5rem' }}>
				<p>To Account:</p>
				<p style={{ textDecoration: 'underline' }}>Salary Expence</p>
			</div>
			<div className="d-flex" style={{ gap: '.5rem' }}>
				<p>From Account: </p>
				<p style={{ textDecoration: 'underline' }}>Cash</p>
			</div>
			<div className="d-flex" style={{ gap: '.5rem' }}>
				<p>Account Head: </p>
				<p style={{ textDecoration: 'underline' }}>Expence</p>
			</div>
			<div className="d-flex" style={{ gap: '.5rem' }}>
				<p>Narration/Description: </p>
				<p style={{ textDecoration: 'underline' }}>{state.naration}</p>
			</div>
			<table class="table table-responsive table-hover table-striped table-bordered border-dark text-center mt-1">
				<thead class="thead-inverse">
					<tr>
						<td>Sr. #</td>
						<td>Items</td>
						<td>Details</td>
						<td>Amount</td>
					</tr>
				</thead>
				<tbody>
					{state.employees.map((emp, i) => {
						return (
							<tr>
								<td>{i + 1}</td>
								<td>{emp.name}</td>
								<td>{emp.name}</td>
								<td>{emp.totalSalaryAfterDeduction}</td>
							</tr>
						);
					})}
					<tr>
						<td
							colspan="3"
							style={{ textAlign: 'right', fontWeight: 'bold' }}
						>
							Total Amount:
						</td>
						<td>{state.finalSal}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default SalaryVoucher;
