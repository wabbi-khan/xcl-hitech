import React, { useEffect } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPurchaseOrderAction } from '../../../services/action/OrdersAction';
import Loading from '../../purchase/material/Loading';
import MaterialError from '../../purchase/material/MaterialError';

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow);

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: '25ch',
		},
	},
	mainContainer: {
		textAlign: 'center',
	},
	table: {
		minWidth: 700,
		border: '1px solid grey',
	},
}));

const InspectionForm = ({ history }) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchPurchaseOrderAction());
	}, [dispatch]);

	const { orders, loading, error } = useSelector((state) => state.orders);

	return (
		<Sidenav title={'Good Received and Inspection Form'}>
			<div>
				<div className={classes.dataTable}>
					<TableContainer className={classes.tableContainer}>
						<Table
							stickyHeader
							className={classes.table}
							style={{
								backgroundColor: '#d0cfcf',
								border: '1px solid grey',
							}}
						>
							<TableHead>
								<TableRow hover role="checkbox">
									<StyledTableCell align="center">
										Sr.No
									</StyledTableCell>
									<StyledTableCell align="center">
										Order#
									</StyledTableCell>
									<StyledTableCell align="center">
										Department
									</StyledTableCell>
									<StyledTableCell align="center">
										Vendor Name
									</StyledTableCell>
									<StyledTableCell align="center">
										Items
									</StyledTableCell>
									<StyledTableCell align="center">Qty</StyledTableCell>
									<StyledTableCell align="center">
										Date
									</StyledTableCell>
									<StyledTableCell align="center">
										View Details
									</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{loading ? (
									<Loading />
								) : error ? (
									<MaterialError />
								) : !orders || !orders.length ? (
									<h5>Not Found</h5>
								) : (
									orders.map((order, i) => (
										<StyledTableRow key={i}>
											<StyledTableCell
												className="text-dark"
												align="center"
											>
												{i + 1}
											</StyledTableCell>
											<StyledTableCell
												className="text-dark"
												align="center"
											>
												{order.poNum}
											</StyledTableCell>
											<StyledTableCell
												className="text-dark"
												align="center"
											>
												{!order.department
													? null
													: order.department.name}
											</StyledTableCell>
											<StyledTableCell
												className="text-dark"
												align="center"
											>
												{!order.vendor ? null : order.vendor.name}
											</StyledTableCell>
											<StyledTableCell
												className="text-dark"
												align="center"
											>
												{!order.materials.length ? (
													<span>Not Found</span>
												) : (
													order.materials.map((material, i) => (
														<span key={i}>
															{material?.material?.name},{' '}
														</span>
													))
												)}
											</StyledTableCell>
											<StyledTableCell
												className="text-dark"
												align="center"
											>
												{order.totalQuantity}
											</StyledTableCell>
											<StyledTableCell
												className="text-dark"
												align="center"
											>
												{order.date}
											</StyledTableCell>
											<StyledTableCell
												className="text-dark"
												align="center"
											>
												<Button
													className="btn bg-dark text-light"
													onClick={() => {
														history.push({
															pathname: `/storedashboard/good_received_and_inspection_report/${order._id}`,
															state: { order },
														});
													}}
												>
													Inspection
												</Button>
											</StyledTableCell>
										</StyledTableRow>
									))
								)}
							</TableBody>
						</Table>
					</TableContainer>
				</div>
			</div>
		</Sidenav>
	);
};

export default InspectionForm;
