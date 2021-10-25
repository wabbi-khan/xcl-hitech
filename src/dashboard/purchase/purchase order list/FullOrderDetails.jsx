import React, { useEffect } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSinglePurchaseOrderAction } from '../../../services/action/OrdersAction';
import Loading from '../material/Loading';
import MaterialError from '../material/MaterialError';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router';

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
		[theme.breakpoints.up('md')]: {
			marginLeft: 0,
			marginTop: 15,
		},
		[theme.breakpoints.down('sm')]: {
			marginTop: -15,
		},
	},
	addButton: {
		marginTop: 20,
		color: '#22A19A',
		borderColor: '#22A19A',
		fontWeight: 'bold',
		'&:hover': {
			border: 'none',
			backgroundColor: '#22A19A',
			color: 'whitesmoke',
		},
		[theme.breakpoints.up('md')]: {
			width: '15%',
		},
		[theme.breakpoints.down('sm')]: {
			width: '30%',
		},
	},
	table: {
		minWidth: 600,
	},
	dataTable: {
		marginTop: 40,
	},
	ckeckBox: {
		[theme.breakpoints.up('md')]: {
			marginLeft: 7,
		},
		[theme.breakpoints.down('sm')]: {
			marginLeft: 0,
		},
	},
	inputFieldStyle: {
		// boxShadow: '0.4px 0.4px 0.4px 0.4px grey',
		// borderRadius: 5,
		[theme.breakpoints.up('md')]: {
			width: 250,
		},
		[theme.breakpoints.down('sm')]: {
			width: 200,
		},
	},
	printBtn: {
		marginRight: 40,
		backgroundColor: '#22A19A',
		color: 'whitesmoke',
		fontWeight: 'bold',
		'&:hover': {
			border: 'none',
			backgroundColor: 'whitesmoke',
			color: '#22A19A',
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

const FullOrderDetails = ({ location, history }) => {
	const classes = useStyles();
	const order = location?.state?.order;

	return (
		<Sidenav title={'Order Details'}>
			<div>
				<Container className={classes.mainContainer}>
					{
						<>
							<Grid container spacing={1}>
								<Grid item lg={3} md={3} sm={12} xs={12}>
									<CssTextField
										id="outlined-basic"
										label="P.O. No"
										variant="outlined"
										type="text"
										autocomplete="off"
										size="small"
										disabled
										value={order?.poNum}
										style={{ width: '100%' }}
										inputProps={{ style: { fontSize: 14 } }}
										InputLabelProps={{ style: { fontSize: 14 } }}
									></CssTextField>
								</Grid>

								<Grid item lg={3} md={3} sm={12} xs={12}>
									<CssTextField
										id="outlined-basic"
										label="P.R. No."
										variant="outlined"
										type="text"
										autocomplete="off"
										size="small"
										style={{ width: '100%' }}
										disabled
										value={order?.prNum?.code}
										inputProps={{ style: { fontSize: 14 } }}
										InputLabelProps={{ style: { fontSize: 14 } }}
									></CssTextField>
								</Grid>

								<Grid item lg={3} md={3} sm={12} xs={12}>
									<CssTextField
										id="outlined-basic"
										label="Payment Terms"
										variant="outlined"
										type="email"
										autocomplete="off"
										style={{ width: '100%' }}
										size="small"
										disabled
										value={order?.paymentTerm}
										inputProps={{ style: { fontSize: 14 } }}
										InputLabelProps={{ style: { fontSize: 14 } }}
									></CssTextField>
								</Grid>
							</Grid>
							<Grid container spacing={1} className="mt-3">
								<Grid item lg={3} md={3} sm={12} xs={12}>
									<CssTextField
										id="outlined-basic"
										label="Payment Subject"
										variant="outlined"
										type="text"
										size="small"
										autocomplete="off"
										style={{ width: '100%' }}
										disabled
										value={order?.paymentSubject}
										inputProps={{ style: { fontSize: 14 } }}
										InputLabelProps={{ style: { fontSize: 14 } }}
									></CssTextField>
								</Grid>

								<Grid item lg={3} md={3} sm={12} xs={12}>
									<CssTextField
										id="outlined-basic"
										label="Date"
										variant="outlined"
										type="text"
										style={{ width: '100%' }}
										autocomplete="off"
										size="small"
										disabled
										value={order?.date}
										inputProps={{ style: { fontSize: 14 } }}
										InputLabelProps={{ style: { fontSize: 14 } }}
									></CssTextField>
								</Grid>
							</Grid>
							{/* ===========================Order Materials Table======================== */}
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
													Material Name
												</StyledTableCell>
												<StyledTableCell align="center">
													Quantity
												</StyledTableCell>
												<StyledTableCell align="center">
													Unit
												</StyledTableCell>
												<StyledTableCell align="center">
													Vendor name
												</StyledTableCell>
												<StyledTableCell align="center">
													Remarks
												</StyledTableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{!order?.materials ||
											!order?.materials?.length ? (
												<span>Material Not Found</span>
											) : (
												order?.materials?.map((material, i) => (
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
															{material?.material?.name}
														</StyledTableCell>
														<StyledTableCell
															className="text-dark"
															align="center"
														>
															{material?.quantity}
														</StyledTableCell>

														<StyledTableCell
															className="text-dark"
															align="center"
														>
															{material?.material?.unit?.name}
														</StyledTableCell>
														<StyledTableCell
															className="text-dark"
															align="center"
														>
															{material?.vendor?.name}
														</StyledTableCell>
														<StyledTableCell
															className="text-dark"
															align="center"
														>
															{material?.remarks}
														</StyledTableCell>
													</StyledTableRow>
												))
											)}
										</TableBody>
									</Table>
								</TableContainer>
							</div>
						</>
					}
					<Grid container spacing={1} className="mt-2">
						<Grid item lg={10} md={10}></Grid>
						<Grid item lg={2} md={2} sm={12} xs={12}>
							<Button
								variant="contained"
								size="small"
								className={classes.printBtn}
								onClick={() => {
									history.push({
										pathname: `/purchase/purchase_order_list/print_order_details/${order?._id}`,
										state: { order },
									});
								}}
							>
								Print
							</Button>
						</Grid>
					</Grid>
				</Container>
			</div>
		</Sidenav>
	);
};

export default withRouter(FullOrderDetails);
