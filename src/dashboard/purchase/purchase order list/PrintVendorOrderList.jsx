import React, { useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import axios from 'axios';
import { fetchSinglePurchaseOrderAction } from '../../../services/action/OrdersAction';
import { withRouter } from 'react-router';
import Grid from '@material-ui/core/Grid';

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

// function createData(No, name, Action) {
// 	return { No, name, Action };
// }

// const rows = [createData(1, 'Item1')];

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
}));

const PrintVendorOrderList = ({ location }) => {
	const { order } = location?.state;
	const classes = useStyles();

	const dispatch = useDispatch();

	const date = new Date();
	const currDate = date.getDate();
	const months = date.getMonth() + 1;
	const years = date.getFullYear();
	const fullDate = `${currDate} / ${months} / ${years}`;

	return (
		<div className='text-center'>
			<div className='container'>
				<img src='./logo.png' alt='' />
				<h4>Hi-Tech Pipe & Engineering Industries</h4>
				<h6>Plot No X-22, Site Area Kotri</h6>
				<p>Ph-No 022-3870614-5, Fax: 022-3870606</p>
				<h5 className='mt-4' style={{ textDecoration: 'underline', fontWeight: 'bold' }}>PURCHASE ORDER</h5>
			</div>
			<div className='container-fluid'>
				<div
					className='mt-4'
					id='printBtn'
					style={{ textAlign: 'right', marginRight: '2rem' }}
				>
					<Button
						variant='contained'
						size='small'
						className='bg-dark text-light'
						onClick={() => window.print()}>
						Print
					</Button>
				</div>
				<div class='container-fluid mt-5'>
					<Grid container spacing={1} >
						<Grid item lg={6} md={6} sm={6} xs={6} style={{ border: '1px solid black', padding: '1.5rem' }}>
							<div style={{ display: 'flex', alignItems: 'center' }}>
								<h6 style={{ marginTop: '-10px' }}>
									Mr/s.
								</h6>

								<hr
									style={{
										borderTop: '1.5px dotted black',
										borderColor: 'black',
										width: '50%',
										marginLeft: '7px'
									}}
								/>
							</div>
							<div style={{ display: 'flex', alignItems: 'center', marginTop: '2rem', }}>
								<h6 style={{ marginTop: '-10px' }}>
									Address
								</h6>
								<hr
									style={{
										borderTop: '1.5px dotted black',
										borderColor: 'black',
										width: '50%',
										marginLeft: '10px'
									}}
								/>
							</div>
						</Grid>
						<Grid item lg={6} md={6} sm={6} xs={6} style={{ border: '1px solid black', padding: '1rem' }}>
							<div style={{ display: 'flex', alignItems: 'center' }}>
								<h6 >
									P.O. No:
								</h6>
							</div>
							<div style={{ display: 'flex', alignItems: 'center', marginTop: '0.2rem', borderBottom: '1px solid black' }}>
								<h6 >
									Date:
								</h6>
							</div>
							<div style={{ display: 'flex', alignItems: 'center', marginTop: '1rem', borderBottom: '1px solid black' }}>
								<h6 >
									Your Ref:
								</h6>
							</div>
							<div style={{ display: 'flex', alignItems: 'center', marginTop: '1rem', }}>
								<h6 >
									P.R. No:
								</h6>
							</div>
						</Grid>
					</Grid>
				</div>
				<div className={classes.table}>
					<table class='table table-bordered border-dark table-responsive mt-5'>
						<thead class='thead-inverse'>
							<tr>
								<th>S.No.</th>
								<th>Description</th>
								<th>Quantity</th>
								<th>Unit</th>
								<th>Remarks</th>
							</tr>
						</thead>
						<tbody>

							<tr>
								<td scope='row'>1</td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>

						</tbody>
					</table>
				</div>
				<div style={{ textAlign: 'left' }}>
					<div class='d-flex '>
						<p>- Payment terms:</p>
						<p>	</p>
					</div>
					<div class='d-flex '>
						<p>- Payment terms:</p>
						<p>	</p>
					</div>
					<div class='d-flex '>
						<p>- Payment terms:</p>
						<p>	</p>
					</div>
				</div>
				<div className='container mt-5'>
					<div className='row'>
						<div className='col-lg-3 col-md-3 col-sm-3 mt-5'>
							{/* <hr style={{ backgroundColor: 'black', paddingTop: 2 }} /> */}
							<hr
								style={{
									borderTop: '1.5px dotted black',
									borderColor: 'black',
									// width: '50%',
									// marginLeft: '7px'
								}}
							/>
							<p style={{ marginTop: -10 }}>Purchase Officer</p>
						</div>
						<div className='offset-lg-6 offset-md-6 offset-sm-6 col-lg-3 col-md-3 col-sm-3 mt-5'>
							{/* <hr style={{ backgroundColor: 'black', paddingTop: 2 }} /> */}
							<hr
								style={{
									borderTop: '1.5px dotted black',
									borderColor: 'black',
									// width: '50%',
									// marginLeft: '7px'
								}}
							/>
							<p style={{ marginTop: -10 }}>Approved By</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default withRouter(PrintVendorOrderList);
