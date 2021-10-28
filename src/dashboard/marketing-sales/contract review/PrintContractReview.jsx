import React from 'react';
import { CustomTable } from '../../../components';
import moment from 'moment';

const PrintContractReview = ({ location }) => {
	const { contractReview } = location.state;

	return (
		<div className="text-center">
			<div class="row mt-3">
				<div class="col-6" style={{ textAlign: 'right' }}>
					<h4
						style={{
							fontWeight: 'bold',
						}}
					>
						Contract Review
					</h4>
				</div>
				<div class="offset-3 col-2" style={{ marginRight: '1rem' }}>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							width: '100px',
							border: '1px solid black',
						}}
					>
						<h6>FM-43</h6>
						<h6>Issue.01</h6>
					</div>
				</div>
			</div>
			<div
				className="container"
				style={{
					maxWidth: '80%',
					justifyContent: 'space-between',
					marginTop: '2rem',
					alignItems: 'center',
				}}
			>
				<div
					className="d-flex justify-content-between"
					style={{ border: '1px solid black', padding: '4px' }}
				>
					<div className="d-flex">
						<p>Date: </p>
						<p style={{ marginLeft: '.5rem' }}>
							{moment().format('DD-MMM-YYYY')}
						</p>
					</div>
					<div className="d-flex">
						<p>Customer: </p>
						<p style={{ marginLeft: '.5rem' }}>
							{contractReview.customer}
						</p>
					</div>
				</div>
				<div
					className="d-flex"
					style={{
						borderBottom: '1px solid black',
						borderLeft: '1px solid black',
						borderRight: '1px solid black',
						padding: '4px',
					}}
				>
					<p>Ref No: </p>
					<p style={{ marginLeft: '.5rem' }}>
						{contractReview.refNo.code}
					</p>
				</div>
				<CustomTable
					data={contractReview.refNo.orders}
					columnHeadings={[
						'S.No',
						'Size/Diameter',
						'SN/PN',
						'Unit',
						'Qty.',
					]}
					keys={['size', 'snPn', 'unit', 'qty']}
					withSrNo
					tablePrint
				/>
				<div style={{ textAlign: 'left', marginTop: '2rem' }}>
					<h5>Contract Review</h5>
					<div className="row pt-2">
						<div className="col-6">
							<p>1- Customer’s requirements are defined</p>
						</div>
						<div className="col-1">
							<p style={{ marginLeft: '2rem' }}>
								{contractReview.q1 === 'true' ? 'Yes' : 'No'}
							</p>
						</div>
					</div>
					<div className="row">
						<div className="col-6">
							<p>2- Production Capability is available.</p>
						</div>
						<div className="col-1">
							<p style={{ marginLeft: '2rem' }}>
								{' '}
								{contractReview.q2 === 'true' ? 'Yes' : 'No'}
							</p>
						</div>
					</div>
					<div className="row">
						<div className="col-6">
							<p>3- Delivery time is achievable</p>
						</div>
						<div className="col-1">
							<p style={{ marginLeft: '2rem' }}>
								{' '}
								{contractReview.q3 === 'true' ? 'Yes' : 'No'}
							</p>
						</div>
					</div>
					<div className="row">
						<div className="col-6">
							<p>4- Raw material is available</p>
						</div>
						<div className="col-1">
							<p style={{ marginLeft: '2rem' }}>
								{' '}
								{contractReview.q4 === 'true' ? 'Yes' : 'No'}
							</p>
						</div>
					</div>
					<div className="row">
						<div className="col-6">
							<p>5- Any Regulatory Requirement</p>
						</div>
						<div className="col-1">
							<p style={{ marginLeft: '2rem' }}>
								{' '}
								{contractReview.q5 === 'true' ? 'Yes' : 'No'}
							</p>
						</div>
					</div>
					<div className="row">
						<div className="col-6">
							<p>6- Previous difference resolved (if any)</p>
						</div>
						<div className="col-1">
							<p style={{ marginLeft: '2rem' }}>
								{' '}
								{contractReview.q6 === 'true' ? 'Yes' : 'No'}
							</p>
						</div>
					</div>
				</div>
				<div style={{ textAlign: 'left', paddingTop: '2rem' }}>
					<hr
						style={{
							borderTop: '1px solid black',
							padding: '1px',
							width: '250px',
						}}
					/>
					<p>Sales Executive / Mark. Manager:</p>
				</div>
			</div>
		</div>
	);
};

export default PrintContractReview;
