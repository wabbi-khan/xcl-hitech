import React from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { withRouter } from 'react-router-dom';
import { CustomButton, CustomTable } from '../../../components';

const DeliveryOrder = ({ history }) => {
	return (
		<Sidenav title="Delivery Order">
			<div>
				<div></div>
			</div>
		</Sidenav>
	);
};

export default withRouter(DeliveryOrder);
