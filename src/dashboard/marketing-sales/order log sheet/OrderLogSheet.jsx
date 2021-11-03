import React, { useState, useEffect } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { CustomButton, CustomTable } from '../../../components';
import { getOrderBooking } from '../../../services/action/orderBookingAction';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

const OrderLogSheet = ({ history }) => {
	const [fetchLoading, setFetchLoading] = useState(true);
	const [fetchError, setFetchError] = useState();

	const { orderBookings } = useSelector((state) => state.orderBookings);

	const dispatch = useDispatch();

	useEffect(() => {
		setFetchLoading(true);
		dispatch(
			getOrderBooking(null, (err) => {
				if (err) {
					setFetchError(err);
					setTimeout(() => {
						setFetchError('');
					}, 4000);
				}
				setFetchLoading(false);
			})
		);
	}, []);

	const printLogSheet = (value) => {
		history.push({
			pathname: '/marketing_dashboard/print_order_log_sheet',
			state: {
				orderBooking: value,
			},
		});
	};

	return (
		<Sidenav title={'Order Log Sheet'}>
			<CustomTable
				fetchLoading={fetchLoading}
				data={orderBookings}
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
				firstOptionText="Print"
				onFirstOptionClick={printLogSheet}
				withSrNo
			/>
		</Sidenav>
	);
};

export default OrderLogSheet;
