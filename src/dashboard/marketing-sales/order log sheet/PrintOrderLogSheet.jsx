import React from 'react';
import { CustomButton, CustomTable } from '../../../components';

const PrintOrderLogSheet = ({ location }) => {
	const orderBooking = location.state.orderBooking;

	return (
		<div className="text-center">
			<div class="row mt-2">
				<div class="col-3 col-lg-3 col-md-3">
					<img
						src="/images/nameLogo.png"
						width="200px"
						height="65px"
						alt=""
					/>
				</div>
				<div class="col-6">
					<h5
						style={{
							marginTop: '1.3rem',
							fontWeight: 'bold',
							textDecoration: 'underline',
						}}
					>
						ORDER LOG SHEET
					</h5>
				</div>
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
						data={[orderBooking]}
						heading="orderLogSheet"
						columnHeadings={[
							'Sr.No',
							'Req. Date',
							'Order No',
							"Customer's Name",
							"Customer's Address",
							'Delivery Site Address',
							'Fittings Required',
							'Mode Of Payment',
							'Expected Delivery Date',
							'Special Requirements',
							'Remarks',
						]}
						keys={[
							{ dateFrom: 'createdAt' },
							'code',
							'customerName',
							'customerAddress',
							'deliveryAddress',
							'fittingRequired',
							'modeOfPayment',
							'expectedDateOfDelivery',
							'requirements',
							'remarks',
						]}
						withSrNo
						tablePrint
					/>
				</div>
			</div>
			{/* <div className="row" style={{ marginTop: "6rem" }}>
        <div className="col-3">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <hr style={{ borderTop: "3px solid black", width: "200px" }} />
            <p style={{ marginTop: -10, fontSize: 12, fontWeight: "bold" }}>
              Prepared By
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <hr style={{ borderTop: "3px solid black", width: "200px" }} />
            <p style={{ marginTop: -10, fontSize: 12, fontWeight: "bold" }}>
              Approved By
            </p>
          </div>
        </div>
        <div className="offset-6 col-3">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <p style={{ marginTop: -10, fontSize: 12, fontWeight: "bold" }}>
              Date:
            </p>
            <p
              style={{
                marginTop: -10,
                fontSize: 12,
                textDecoration: "underline",
              }}
            >
              {}
            </p>
          </div>
        </div>
      </div> */}
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

export default PrintOrderLogSheet;
