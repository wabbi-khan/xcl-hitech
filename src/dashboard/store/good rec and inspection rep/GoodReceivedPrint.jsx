import React, { useEffect } from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import './style.css';
import { fetchSinglePurchaseOrderAction } from '../../../services/action/OrdersAction';
import Loading from '../../purchase/material/Loading';
import Grid from '@material-ui/core/Grid';

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
	table1: {
		marginBottom: 300,
	},
	tableContainer: {
		marginTop: '30px',
	},
}));

const GoodReceivedPrint = (props) => {
	const classes = useStyles();

	const id = props.match.params.id;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchSinglePurchaseOrderAction(id));
	}, [dispatch, id]);

	const { order, loading, error } = useSelector((state) => state.orders);

	const date = new Date();
	const currDate = date.getDate();
	const months = date.getMonth() + 1;
	const years = date.getFullYear();
	const fullDate = `${currDate} / ${months} / ${years}`;

	return (
		<div className="text-center">
			<div className="container">
				<img src="./logo.png" alt="" />
				<h4>Hi-Tech Pipe & Engineering Industries</h4>
				<h6>Plot No X-22, Site Area Kotri</h6>
				<p>Ph.No 022-3870614-5, Fax: 022-3870606</p>
				<h5 className="mt-4" style={{ textDecoration: 'underline' }}>
					Goods Received and Inspection Report
				</h5>
			</div>
			<div
				className="container-fluid"
				style={{ textAlign: 'left', marginTop: 70 }}
			>
				<Grid container spacing={1}>
					<Grid item lg={2} md={2} sm={2} xs={2}>
						<div className="col-lg-6 col-md-6 col-sm-6">
							<p style={{ fontWeight: 'bold', marginLeft: '12px' }}>
								Date:
							</p>
						</div>
					</Grid>
					<Grid item lg={2} md={2} sm={2} xs={2}>
						<p>
							{fullDate}
							<hr
								style={{
									borderTop: '3px double black',
									marginTop: '5px',
								}}
							/>
						</p>
					</Grid>
					<Grid item lg={6} md={6} sm={6} xs={6}></Grid>
					<Grid item lg={2} md={2} sm={2} xs={2} id="printBtn">
						<Button
							variant="contained"
							size="small"
							className="bg-dark text-light"
							onClick={() => window.print()}
						>
							Print
						</Button>
					</Grid>
				</Grid>
			</div>
			<div className={classes.dataTable}>
				<TableContainer>
					<h5>Inspected Orders</h5>
					<div className="container-fluid" style={{ textAlign: 'left' }}>
						<table class="table table-responsive table-hover table-striped table-bordered border-dark text-center mt-3">
							<thead>
								<tr>
									<th>Date/Time</th>
									<th>P.R. No.</th>
									<th>P.O. No.</th>
									<th>Received From</th>
									<th>Department</th>
									<th>Description</th>
									<th>Status of Inspection</th>
									<th>Remarks</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>asd</td>
									<td>asd</td>
									<td>asd</td>
									<td>asd</td>
									<td>asd</td>
									<td>asd</td>
									<td>asd</td>
									<td>asd</td>
								</tr>
							</tbody>
						</table>
					</div>
				</TableContainer>
			</div>
			<div className={classes.dataTable}>
				<TableContainer className={classes.tableContainer}>
					<h6>Purchase Inspection Materials</h6>
					<div className="container-fluid" style={{ textAlign: 'left' }}>
						<table class="table table-responsive table-hover table-striped table-bordered border-dark text-center mt-3">
							<thead>
								<tr>
									<th>Sr.No</th>
									<th>Material Name</th>
									<th>Quantity</th>
									<th>Unit</th>
									<th>Remarks</th>
								</tr>
							</thead>
							<tbody>
								{loading ? (
									<Loading />
								) : error ? (
									<span>Error</span>
								) : !order.materials || !order.materials.length ? (
									<span>Not Found</span>
								) : (
									order.materials.map((material, i) => (
										<tr key={1}>
											<td>asd</td>
											<td>asd</td>
											<td>asd</td>
											<td>asd</td>
											<td>asd</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>
				</TableContainer>
			</div>
			<div className="container" style={{ marginTop: '100px' }}>
				<Grid container spacing={1}>
					<Grid item lg={3} md={3} sm={3} xs={3}>
						<hr
							style={{ borderTop: '3px double black', marginTop: '5px' }}
						/>
						<p style={{ marginTop: -10 }}>Store Incharge</p>
					</Grid>
					<Grid item lg={6} md={6} sm={6} xs={6}></Grid>
					<Grid item lg={3} md={3} sm={3} xs={3}>
						<hr
							style={{ borderTop: '3px double black', marginTop: '5px' }}
						/>
						<p style={{ marginTop: -10 }}>Q.A Dept</p>
					</Grid>
				</Grid>
			</div>
		</div>
	);
};

export default GoodReceivedPrint;
