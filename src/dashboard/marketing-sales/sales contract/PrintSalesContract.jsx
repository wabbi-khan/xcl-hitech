import React from 'react';
import { withRouter } from 'react-router';
import { CustomButton, CustomTable } from '../../../components';
import contractLogo from './salesContractLogo.png';
import moment from 'moment';

const PrintSalesContract = ({ location }) => {
	const salesContract = location.state.salesContract;

	return (
		<div className="text-center">
			<div class="row mt-2">
				<div class="col-3 col-lg-3 col-md-3" style={{ marginTop: '6rem' }}>
					<img
						src="/images/nameLogo.png"
						width="220px"
						height="75px"
						alt=""
					/>
				</div>
				<div class="col-9 mt-3">
					<div
						style={{
							textAlign: 'end',
							paddingRight: '4rem',
						}}
					>
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
							}}
						>
							<h6>FM-36</h6>
							<h6>Issue.01</h6>
						</div>
						<h5
							style={{
								fontWeight: 'bold',
								marginTop: '1rem',
							}}
						>
							HI-TECH PIPE & ENGINEERING INDUSTRIES
						</h5>
						<h6
							style={{
								fontWeight: 'bold',
							}}
						>
							Ph: 022-2116500-01 Fax: 022-2116509
						</h6>
						<p>Email: sales.kar@hitechpipe.com</p>
						<p style={{ marginTop: -15, fontSize: 13 }}>
							<a href="#">www.hitechpipe.com</a>
						</p>
					</div>
				</div>
				<h4
					style={{
						marginTop: '3rem',
						fontWeight: 'bold',
					}}
				>
					SALES CONTRACT
				</h4>
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
				<div
					className="d-flex justify-content-between"
					style={{ fontSize: '13px' }}
				>
					<div className="d-flex">
						<p style={{ padding: '.5rem' }}>Sale Contract #</p>
						<p style={{ border: '1px solid black', padding: '.5rem' }}>
							{salesContract.code}
						</p>
					</div>
					<div className="d-flex" style={{ marginRight: '6rem' }}>
						<p style={{ padding: '.5rem' }}>Dated: </p>
						<p style={{ border: '1px solid black', padding: '.5rem' }}>
							{moment().format('DD-MMM-YYYY')}
						</p>
					</div>
				</div>
				<div
					className="row"
					style={{ fontSize: '12px', textAlign: 'left' }}
				>
					<div className="col-4">
						<p>1. Registered Name of Company/ Buyers:</p>
					</div>
					<div className="col-8">
						<p style={{ fontWeight: 'bold' }}>
							{salesContract.conpanyRegName}
						</p>
					</div>
				</div>
				<div
					className="row"
					style={{ fontSize: '12px', textAlign: 'left' }}
				>
					<div className="col-4">
						<p>Contractor: </p>
					</div>
					<div className="col-8">
						<p style={{ fontWeight: 'bold' }}>
							{salesContract.contractor}
						</p>
					</div>
				</div>
				<div
					className="row"
					style={{ fontSize: '12px', textAlign: 'left' }}
				>
					<div className="col-4">
						<p>Telephone: </p>
					</div>
					<div className="col-8">
						<p
							style={{ fontWeight: 'bold', textDecoration: 'underline' }}
						>
							{salesContract.companyTelephoneNo}
						</p>
					</div>
				</div>
				<div
					className="row"
					style={{ fontSize: '12px', textAlign: 'left' }}
				>
					<div className="col-4">
						<p>Fax: </p>
					</div>
					<div className="col-8">
						<p
							style={{ fontWeight: 'bold', textDecoration: 'underline' }}
						>
							{salesContract.companyFax}
						</p>
					</div>
				</div>
				<div
					className="row"
					style={{ fontSize: '12px', textAlign: 'left' }}
				>
					<div className="col-4">
						<p>Email: </p>
					</div>
					<div className="col-8">
						<p
							style={{ fontWeight: 'bold', textDecoration: 'underline' }}
						>
							{salesContract.email}
						</p>
					</div>
				</div>
				<div
					className="row mt-3"
					style={{ fontSize: '12px', textAlign: 'left' }}
				>
					<div className="col-4">
						<p>2. Business Address: </p>
					</div>
					<div className="col-8">
						<p
							style={{ fontWeight: 'bold', textDecoration: 'underline' }}
						>
							{salesContract.bussinessAddress}
						</p>
					</div>
				</div>
				<div
					className="row"
					style={{ fontSize: '12px', textAlign: 'left' }}
				>
					<div className="col-4">
						<p>Telephone: </p>
					</div>
					<div className="col-8">
						<p
							style={{ fontWeight: 'bold', textDecoration: 'underline' }}
						>
							{salesContract.bussinessTelephoneNo}
						</p>
					</div>
				</div>
				<div
					className="row"
					style={{ fontSize: '12px', textAlign: 'left' }}
				>
					<div className="col-4">
						<p>Fax: </p>
					</div>
					<div className="col-8">
						<p
							style={{ fontWeight: 'bold', textDecoration: 'underline' }}
						>
							{salesContract.bussinessFax}
						</p>
					</div>
				</div>
				<div
					className="row"
					style={{ fontSize: '12px', textAlign: 'left' }}
				>
					<div className="col-4">
						<p>Email: </p>
					</div>
					<div className="col-8">
						<p
							style={{ fontWeight: 'bold', textDecoration: 'underline' }}
						>
							{salesContract.bussinessAddress}
						</p>
					</div>
				</div>
				<div
					className="row mt-3"
					style={{ fontSize: '12px', textAlign: 'left' }}
				>
					<div className="col-4">
						<p>3. Delivery Address: </p>
					</div>
					<div className="col-8">
						<p
							style={{ fontWeight: 'bold', textDecoration: 'underline' }}
						>
							{salesContract.deliverAddress}
						</p>
					</div>
				</div>
				<div
					className="row"
					style={{ fontSize: '12px', textAlign: 'left' }}
				>
					<div className="col-4">
						<p>Contact Person: </p>
					</div>
					<div className="col-8">
						<p
							style={{ fontWeight: 'bold', textDecoration: 'underline' }}
						>
							{salesContract.deliveryTelephoneNo}
						</p>
					</div>
				</div>
				<div
					className="row"
					style={{ fontSize: '12px', textAlign: 'left' }}
				>
					<div className="col-4">
						<p>Designation: </p>
					</div>
					<div className="col-8">
						<p
							style={{ fontWeight: 'bold', textDecoration: 'underline' }}
						>
							{salesContract.deliveryFax}
						</p>
					</div>
				</div>
				<div
					className="row"
					style={{ fontSize: '12px', textAlign: 'left' }}
				>
					<div className="col-4">
						<p>Cell # </p>
					</div>
					<div className="col-8">
						<p
							style={{ fontWeight: 'bold', textDecoration: 'underline' }}
						>
							{salesContract.deliveryTelephoneNo}
						</p>
					</div>
				</div>
				<div
					className="row mt-3"
					style={{ fontSize: '12px', textAlign: 'left' }}
				>
					<div className="col-4">
						<p>4. Nationality of Company/Buyer/Contractor: </p>
					</div>
					<div className="col-8">
						<p
							style={{ fontWeight: 'bold', textDecoration: 'underline' }}
						>
							{salesContract.nationalityOfComp}
						</p>
					</div>
				</div>
				<div
					className="row mt-3"
					style={{ fontSize: '12px', textAlign: 'left' }}
				>
					<div className="col-4">
						<p>5. Name Company/Buyer Owner/Chairman/M.D/Proprioter: </p>
					</div>
					<div className="col-8">
						<p
							style={{ fontWeight: 'bold', textDecoration: 'underline' }}
						>
							{salesContract.nameCompany}
						</p>
					</div>
				</div>
				<div
					className="row mt-3"
					style={{ fontSize: '12px', textAlign: 'left' }}
				>
					<div className="col-4">
						<p>6. Orders: </p>
					</div>
				</div>
				<div className="">
					<CustomTable
						data={salesContract.orders}
						columnHeadings={[
							'S.No',
							'Size/Diameter',
							'SN/PN',
							'Unit',
							'Qty.',
							'Unit Price',
							'Total Price(Rs.)',
							'Remarks',
						]}
						keys={[
							'size',
							'snPn',
							'unit	',
							'qty',
							'unitPrice',
							'total',
							'remarks',
						]}
						withSrNo
						tablePrint
					/>
				</div>
			</div>
			<div
				className="row mt-3"
				style={{ fontSize: '13px', textAlign: 'left', fontWeight: 'bold' }}
			>
				<div className="col-4">
					<p>7. Pricing & Discount: </p>
				</div>
				<div
					className="d-flex justify-content-between"
					style={{ fontSize: '13px' }}
				>
					<div className="d-flex">
						<p style={{ padding: '.5rem' }}>Actual</p>
						<p style={{ border: '1px solid black', padding: '.5rem' }}>
							{salesContract.actualPrice}
						</p>
					</div>
					<div className="d-flex">
						<p style={{ padding: '.5rem' }}>Discount(%): </p>
						<p style={{ border: '1px solid black', padding: '.5rem' }}>
							{`${salesContract.discountPerc}%`}
						</p>
					</div>
					<div className="d-flex">
						<p style={{ padding: '.5rem' }}>Contract Price: </p>
						<p style={{ border: '1px solid black', padding: '.5rem' }}>
							{`Rs.${salesContract.contractPrice}`}
						</p>
					</div>
				</div>
			</div>
			<div
				style={{
					textAlign: 'left',
					fontSize: '12px',
					border: '1px solid black',
					padding: '1rem',
					display: 'flex',
					gap: '.2rem',
				}}
			>
				<p>Other Conditions: (If any) Total material price Rs.</p>
				<p>{salesContract.otherConditions}</p>
				<p>Cartage of Rs. </p>
				<p>{salesContract.total}</p>
				<p>Grand Total Rs. </p>
				<p>{salesContract.grandTotal}</p>
			</div>
			<div
				className="row mt-3"
				style={{ fontSize: '12px', textAlign: 'left' }}
			>
				<div className="d-flex">
					<p>
						8. HI-TECH PIPE & ENGINEERING INDUSTRIES hereafter referred to
						as the "seller" on the one party,
						<span style={{ fontWeight: 'bold' }}>
							{salesContract.nameOfSeller}
						</span>{' '}
						, and hereafter referred to as the "Buyer" on the party have
						concluded the present contract as the following.
					</p>
				</div>
			</div>
			<div
				className="row mt-3"
				style={{ fontSize: '12px', textAlign: 'left' }}
			>
				<p style={{ fontWeight: 'bold' }}>
					9. Price & total amount of contract
				</p>
				<div style={{ display: 'flex', gap: '.2rem' }}>
					<p>
						The total amount of this contract is RS:
						<span style={{ fontWeight: 'bold' }}>
							{salesContract.totalAmountOfContract}
						</span>
						for HDPE pipe Orders Pressure PN (As mentioned in Sr # 6)
						prices are firm for the duration of contract.
					</p>
				</div>
			</div>
			<div
				className="row mt-3"
				style={{ fontSize: '12px', textAlign: 'left' }}
			>
				<p style={{ fontWeight: 'bold' }}>10. Time & Term of Delivery</p>
				<div style={{ display: 'flex', gap: '.2rem' }}>
					<p>Delivery made after the receipt of Payment with in </p>
					<p>{salesContract.timeOfDelivery} (Min.)</p>
				</div>
			</div>
			<div
				className="row mt-3"
				style={{ fontSize: '12px', textAlign: 'left' }}
			>
				<p style={{ fontWeight: 'bold' }}>11. Term of Payments</p>
				<div style={{ display: 'flex', gap: '.2rem' }}>
					<p>Payment must be made by </p>
					<p>{salesContract.termOfPayments} (advance)</p>
				</div>
			</div>
			<div
				className="row mt-3"
				style={{ fontSize: '12px', textAlign: 'left' }}
			>
				<p style={{ fontWeight: 'bold' }}>12. Transportation</p>
				<div style={{ display: 'flex', gap: '.2rem' }}>
					<p>Transportation charges to paid by "buyer"</p>
				</div>
			</div>
			<div
				className="row mt-3"
				style={{ fontSize: '12px', textAlign: 'left' }}
			>
				<p style={{ fontWeight: 'bold' }}>13. Other conditions</p>
				<p style={{ fontWeight: 'bold' }}>Arbitration</p>
				<p>
					All disputes & differences ,which one can arise to or in
					connection with the present contract , should be decided by
					negotiation between Seller & the buyer
				</p>
			</div>
			<div
				className="d-flex justify-content-between"
				style={{ fontSize: '13px' }}
			>
				<div className="">
					<p
						style={{
							border: '1px solid black',
							padding: '1.5rem',
							width: '200px',
						}}
					>
						{}
					</p>
				</div>
				<div className="">
					<p
						style={{
							border: '1px solid black',
							padding: '1.5rem',
							width: '300px',
						}}
					>
						{}
					</p>
					<p style={{ marginTop: '-.8rem' }}>
						{' '}
						For & on behalf of the Buyer{' '}
					</p>
				</div>
			</div>
			<p
				className="endOfContract"
				style={{
					marginTop: '2.5rem',
					width: '75%',
					marginLeft: 'auto',
					marginRight: 'auto',
				}}
			>
				End of Contract
			</p>
			<img src={contractLogo} style={{ float: 'right' }} />
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

export default withRouter(PrintSalesContract);
