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
import Loader from 'react-loader-spinner';

import TextField from '@material-ui/core/TextField';
import { MenuItem } from '@material-ui/core';
import { useHistory } from 'react-router';

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

const searchOptions = [
	{ key: 'prNum', value: 'PR No' },
	{ key: 'poNum', value: 'Order No' },
];

export const PurchaseOrderList = () => {
	const [searchText, setSearchText] = React.useState('');
	const [searchBy, setSearchBy] = React.useState('prNum');
	const [fetchLoading, setFetchLoading] = React.useState(true);
	const classes = useStyles();
	const dispatch = useDispatch();

	const history = useHistory();

	useEffect(() => {
		setFetchLoading(true);
		dispatch(
			fetchPurchaseOrderAction(null, () => {
				setFetchLoading(false);
			})
		);
	}, [dispatch]);

	useEffect(() => {
		setFetchLoading(true);
		if (searchText) {
			dispatch(
				fetchPurchaseOrderAction(`${searchBy}[regex]=${searchText}`, () => {
					setFetchLoading(false);
				})
			);
		} else {
			dispatch(
				fetchPurchaseOrderAction(null, () => {
					setFetchLoading(false);
				})
			);
		}
	}, [searchText]);

	const { orders } = useSelector((state) => state.orders);

	return (
		<Sidenav title={'Purchase Order List'}>
			<div>
				<h4>Uninspected Orders List</h4>
				<CssTextField
					id="outlined-basic"
					label="Search Orders"
					variant="outlined"
					type="search"
					size="small"
					onChange={(e) => setSearchText(e.target.value)}
					autoComplete="off"
					className={classes.inputFieldStyle1}
					inputProps={{ style: { fontSize: 14 } }}
					InputLabelProps={{ style: { fontSize: 14 } }}
				/>
				<CssTextField
					id="outlined-basic"
					label="Search Orders"
					variant="outlined"
					type="search"
					size="small"
					select
					value={searchBy}
					autoComplete="off"
					onChange={(e) => setSearchBy(e.target.value)}
					className={classes.inputFieldStyle1}
					inputProps={{ style: { fontSize: 14 } }}
					InputLabelProps={{ style: { fontSize: 14 } }}
				>
					{searchOptions.map((el, i) => (
						<MenuItem value={el.key} key={i}>
							{el.value}
						</MenuItem>
					))}
				</CssTextField>
				{fetchLoading ? (
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							marginTop: '3rem',
						}}
					>
						<Loader
							type="TailSpin"
							color="#000"
							width="3rem"
							height="3rem"
						/>
					</div>
				) : orders?.length === 0 ? (
					<p>There is no data found</p>
				) : (
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
											PR No
										</StyledTableCell>
										<StyledTableCell align="center">
											Items
										</StyledTableCell>
										<StyledTableCell align="center">
											Date
										</StyledTableCell>
										<StyledTableCell align="center">
											View Details
										</StyledTableCell>
									</TableRow>
								</TableHead>

								<TableBody>
									{orders.map((order, i) => {
										return (
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
													{order?.poNum}
												</StyledTableCell>
												<StyledTableCell
													className="text-dark"
													align="center"
												>
													{order?.prNum?.code}
												</StyledTableCell>
												<StyledTableCell
													className="text-dark"
													align="center"
												>
													{order?.materials &&
														order?.materials?.map((el) => (
															<span>
																{el?.material?.name} -{' '}
																{el?.vendor?.name}
															</span>
														))}
												</StyledTableCell>

												<StyledTableCell
													className="text-dark"
													align="center"
												>
													{order?.date}
												</StyledTableCell>
												<StyledTableCell
													className="text-dark"
													align="center"
												>
													<Button
														className="btn bg-dark text-light"
														onClick={() => {
															history.push({
																pathname: `/purchase/purchase_order_list/order_details/${order?._id}`,
																state: { order },
															});
														}}
													>
														View Details
													</Button>
												</StyledTableCell>
											</StyledTableRow>
										);
									})}
								</TableBody>
							</Table>
						</TableContainer>
					</div>
				)}
			</div>
		</Sidenav>
	);
};
