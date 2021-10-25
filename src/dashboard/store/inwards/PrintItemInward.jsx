import React from 'react';
import Button from '../../../components/utils/Button';

const PrintItemInward = ({ location }) => {
	const inward = location.state.inward;
	return (
		<div>
			<div class="text-center">
				<div class="row mt-2">
					{/* <div class="col-lg-3 col-md-3 col-sm-4">
                        <img src="/images/nameLogo.png" width="90%" height="80%" alt="" />
                    </div>
                    <div class="offset-lg-7 offset-md-7 offset-sm-6 col-lg-2 col-md-2 col-sm-2 mt-2">
                        <div
                            style={{
                                display: "flex",
                                // alignItems: 'flex-end',
                                flexDirection: "column",
                                border: "2px solid #333",
                                width: "100px",
                                // marginLeft: 'auto',
                                // paddingRight: '5px',
                                // marginRight: '-3rem'
                            }}
                        >
                            <h6>FM-27</h6>
                            <h6>Issue.02</h6>
                        </div>
                    </div> */}
					<h4>Hi-Tech Pipe & Engineering Industries</h4>
					<h6>Plot No X-22, Site Area Kotri</h6>
					<p>Ph-No 022-3870614-5, Fax: 022-3870606</p>
					<h3
						style={{
							marginTop: '1rem',
							fontWeight: 'bold',
							textDecoration: 'underline',
						}}
					>
						Inward Item
					</h3>
				</div>
				<div class="container" id="printBtn">
					<Button
						size="small"
						text="Print"
						variant="contained"
						classNames="btn bg-dark text-light"
						onClick={() => window.print()}
						style={{ marginLeft: 'auto' }}
					/>
				</div>
				{/* <div className="container-fluid mt-5"></div> */}
				<table class="table table-inverse table-responsive table-bordered border-dark mt-4">
					<thead class="thead-inverse">
						<tr>
							<td style={{ fontSize: '12px', fontWeight: 'bold' }}>
								S.No.
							</td>
							<td style={{ fontSize: '12px', fontWeight: 'bold' }}>
								Item Code
							</td>
							<td style={{ fontSize: '12px', fontWeight: 'bold' }}>
								Item Name
							</td>
							<td style={{ fontSize: '12px', fontWeight: 'bold' }}>
								Bill No
							</td>
							<td style={{ fontSize: '12px', fontWeight: 'bold' }}>
								DC No
							</td>
							<td style={{ fontSize: '12px', fontWeight: 'bold' }}>
								IGP No
							</td>
							<td style={{ fontSize: '12px', fontWeight: 'bold' }}>
								Unit
							</td>
							<td style={{ fontSize: '12px', fontWeight: 'bold' }}>
								Rate
							</td>
							<td style={{ fontSize: '12px', fontWeight: 'bold' }}>
								Qty
							</td>
							<td style={{ fontSize: '12px', fontWeight: 'bold' }}>
								Received From
							</td>
							<td style={{ fontSize: '12px', fontWeight: 'bold' }}>
								Dept
							</td>
							<td style={{ fontSize: '12px', fontWeight: 'bold' }}>
								Amount
							</td>
							<td style={{ fontSize: '12px', fontWeight: 'bold' }}>
								Balance
							</td>
							<td style={{ fontSize: '12px', fontWeight: 'bold' }}>
								Remarks
							</td>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>{1}</td>
							<td>{inward?.itemCode?.code}</td>
							<td>{inward?.itemCode?.name}</td>
							<td>{inward?.billNo}</td>
							<td>{inward?.dcNo}</td>
							<td>{inward?.IGPNo}</td>
							<td>{inward?.itemCode?.unit?.name}</td>
							<td>{inward?.rate}</td>
							<td>{inward?.recQty}</td>
							<td>{inward?.partyName}</td>
							<td>{inward?.inwardForDept?.name}</td>
							<td>{inward?.amount}</td>
							<td>0</td>
							<td>{inward?.remarks}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default PrintItemInward;
