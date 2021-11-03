import React from 'react';
import { CustomTable, CustomButton } from '../../../components';

const PrintStockAssesment = ({ location }) => {
	const report = location.state.report;

	return (
		<div className="text-center">
			<div class="row mt-2">
				<div class="col-3 col-lg-3 col-md-3">
					<img
						src="/images/nameLogo.png"
						width="220px"
						height="75px"
						alt=""
					/>
				</div>
				<div class="offset-7 col-2 mt-3">
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							border: '2px solid #333',
							width: '100px',
						}}
					>
						<h6>FM-36</h6>
						<h6>Issue.01</h6>
					</div>
				</div>
				<h5
					style={{
						marginTop: '2rem',
						fontWeight: 'bold',
						textDecoration: 'underline',
					}}
				>
					STOCK ASSESSMENT REPORT
				</h5>
			</div>
			<div class="container" id="printBtn">
				<CustomButton
					text="Print"
					classNames="btn bg-dark text-light"
					onClick={() => window.print()}
					style={{ marginLeft: 'auto' }}
				/>
			</div>
			<div className="mt-4">
				<div className="" style={{ marginTop: 30, marginLeft: 'auto' }}>
					<CustomTable
						//   fetchLoading={fetchLoading}
						data={[{ ...report }]}
						columnHeadings={[
							'S.No',
							'Item Description',
							'QTY Examined',
							'Items Retains',
							'Ok for Further Use',
							'Rejected/To Be Discarded',
							'Reason For Rejection',
							'Remarks',
						]}
						keys={[
							'item.name',
							'quantityExamined',
							'properties',
							'ok',
							'ok',
							'reasonForRejection',
							'remarks',
						]}
						// firstOptionText="Edit"
						// onFirstOptionClick={handleOpen}
						// secondOptionText="Delete"
						// onSecondOptionClick={deleteOutwardGatePass}
						// thirdOptionText="View"
						// onThirdOptionClick={pushToPrint}
						withSrNo
						tablePrint
					/>
				</div>
			</div>
			<div className="row" style={{ marginTop: '6rem' }}>
				<div className="col-3">
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<hr
							style={{ borderTop: '3px solid black', width: '200px' }}
						/>
						<p
							style={{
								marginTop: -10,
								fontSize: 12,
								fontWeight: 'bold',
							}}
						>
							Prepared By
						</p>
					</div>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<hr
							style={{ borderTop: '3px solid black', width: '200px' }}
						/>
						<p
							style={{
								marginTop: -10,
								fontSize: 12,
								fontWeight: 'bold',
							}}
						>
							Approved By
						</p>
					</div>
				</div>
				<div className="offset-6 col-3">
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: '1rem',
						}}
					>
						<p
							style={{
								marginTop: -10,
								fontSize: 12,
								fontWeight: 'bold',
							}}
						>
							Date:
						</p>
						<p
							style={{
								marginTop: -10,
								fontSize: 12,
								textDecoration: 'underline',
							}}
						>
							{}
						</p>
					</div>
				</div>
			</div>
			{/* <div className="container" style={{ marginTop: 30 }}>
                  <div className="row">
                      <div className="offset-lg-9 offset-md-9 offset-sm-9 offset-xs-9 col-lg-3 col-md-3 col-sm-3 mt-5">
                          <hr style={{ backgroundColor: 'black', paddingTop: 2 }} />
                          <p style={{ marginTop: -10, fontSize: 14, fontWeight: 'bold' }}>FAKHR-E-ALAM</p>
                          <p style={{ marginTop: -10, fontSize: 12, fontWeight: 'bold' }}>Cheif Executive Officer</p>
                      </div>
                  </div>
              </div> */}
		</div>
	);
};

export default PrintStockAssesment;
