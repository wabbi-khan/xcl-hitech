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
import Loading from '../material/Loading';
import MaterialError from '../material/MaterialError';

import TextField from '@material-ui/core/TextField';

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
	tableContainer: {
		marginTop: 10,
	},
	inputFieldStyle1: {
		[theme.breakpoints.up('md')]: {
			width: 300,
			marginLeft: 2,
		},
		[theme.breakpoints.down('sm')]: {
			width: 200,
			marginTop: 10,
		},
	},
}));

const CssTextField = withStyles({
	root: {
		'& label.Mui-focused': {
			color: 'black',
		},
		'& .MuiOutlinedInput-root': {
			'& fieldset': {
				borderColor: 'black',
			},
			'&.Mui-focused fieldset': {
				borderColor: 'black',
			},
		},
	},
})(TextField);

export const PurchaseOrderList = ({ history }) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchPurchaseOrderAction());
	}, [dispatch]);

	const { orders, loading, error } = useSelector((state) => state.orders);

	console.log(orders);

	const handleChange = async (e) => {
		e.preventDefault();
		dispatch(fetchPurchaseOrderAction(`poNum[regex]=${e.target.value}`));
	};

	return (
		<Sidenav title={'Purchase Order List'}>
			<div>
				<div className={classes.dataTable}>
					<h4>Uninspected Orders List</h4>
					<CssTextField
						id='outlined-basic'
						label='Search Orders'
						variant='outlined'
						type='search'
						size='small'
						autoComplete='off'
						onChange={handleChange}
						className={classes.inputFieldStyle1}
						inputProps={{ style: { fontSize: 14 } }}
						InputLabelProps={{ style: { fontSize: 14 } }}
					/>
					<TableContainer className={classes.tableContainer}>
						<Table
							stickyHeader
							className={classes.table}
							style={{ backgroundColor: '#d0cfcf', border: '1px solid grey' }}>
							<TableHead>
								<TableRow hover role='checkbox'>
									<StyledTableCell align='center'>Sr.No</StyledTableCell>
									<StyledTableCell align='center'>Order#</StyledTableCell>
									<StyledTableCell align='center'>Vendor Name</StyledTableCell>
									<StyledTableCell align='center'>Items</StyledTableCell>
									<StyledTableCell align='center'>Qty</StyledTableCell>
									<StyledTableCell align='center'>Date</StyledTableCell>
									<StyledTableCell align='center'>View Details</StyledTableCell>
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
									orders.map((order, i) => {
										// console.log(order)
										return (
											<StyledTableRow key={i}>
												<StyledTableCell className='text-dark' align='center'>
													{i + 1}
												</StyledTableCell>
												<StyledTableCell className='text-dark' align='center'>
													{order?.poNum}
												</StyledTableCell>
												<StyledTableCell className='text-dark' align='center'>
													{!order?.vendor ? null : order?.vendor?.name}
												</StyledTableCell>
												<StyledTableCell className='text-dark' align='center'>
													{!order?.materials || !order?.materials?.length ? (
														<h5>Not Found</h5>
													) : (
														order?.materials?.map((material, i) => {
															return i > 1 ? '...' : material?.material?.name + ', ';
														})
													)}
												</StyledTableCell>
												<StyledTableCell className='text-dark' align='center'>
													{order?.totalQuantity}
												</StyledTableCell>
												<StyledTableCell className='text-dark' align='center'>
													{order?.date}
												</StyledTableCell>
												<StyledTableCell className='text-dark' align='center'>
													<Button
														className='btn bg-dark text-light'
														onClick={() => {
															history.push(
																`/purchase/purchase_order_list/order_details/${order?._id}`,
															);
														}}>
														View Details
													</Button>
												</StyledTableCell>
											</StyledTableRow>
										);
									})
								)}
							</TableBody>
						</Table>
					</TableContainer>
				</div>
			</div>
		</Sidenav>
	);
};
