import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import './style.css';
import { fetchSinglePurchaseOrderAction } from '../../../services/action/OrdersAction';
import Loading from '../../purchase/material/Loading';

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

function createData(No, name, Action) {
	return { No, name, Action };
}

const rows = [createData(1, 'Item1')];

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
}));

const GoodReceivedPrint = (props) => {
	const classes = useStyles();

	const id = props.match.params.id;

	const dispatch = useDispatch();

	useEffect(async () => {
		await dispatch(fetchSinglePurchaseOrderAction(id));
	}, [dispatch]);

	const { order, loading, error } = useSelector((state) => state.orders);

	const date = new Date();
	const currDate = date.getDate();
	const months = date.getMonth() + 1;
	const years = date.getFullYear();
	const fullDate = `${currDate} / ${months} / ${years}`;
	// console.log(currDate +" "+ months + " "+ years);

	return (
		<div className='text-center'>
			<div className='container'>
				<img src='./logo.png' alt='' />
				<h4>Hi-Tech Pipe & Engineering Industries</h4>
				<h6>Plot No X-22, Site Area Kotri</h6>
				<p>Ph-No 022-3870614-5, Fax: 022-3870606</p>
				<h5 className='mt-5'>Goods Received and Inspection Report</h5>
			</div>
			<div className='container-fluid'>
				<div className='row'>
					<div className='col-lg-6 col-md-6 mt-4'>
						<div className='row no-gutters mt-2'>
							<div className='col-lg-4 col-md-4' align='right'>
								<p>Date</p>
							</div>
							<div className='col-lg-4 col-md-4 ml-3'>
								<p>{fullDate}</p>
								<hr style={{ backgroundColor: 'black', paddingTop: 1 }} />
							</div>
						</div>
					</div>
					<div
						className='offset-lg-4 offset-md-4 col-lg-2 col-md-2 mt-4'
						id='printBtn'>
						<Button
							variant='contained'
							size='small'
							className='bg-dark text-light'
							onClick={() => window.print()}>
							Print
						</Button>
					</div>
				</div>
			</div>
			<div className={classes.table}>
				<div className='table ml-auto mr-auto mt-4'>
					<TableContainer>
						<Table>
							<TableHead>
								<TableRow hover role='checkbox'>
									<StyledTableCell className='text-dark bg-light' align='center'>
										Sr.No
									</StyledTableCell>
									<StyledTableCell className='text-dark bg-light' align='center'>
										Date/Time
									</StyledTableCell>
									<StyledTableCell className='text-dark bg-light' align='center'>
										P.R. No.
									</StyledTableCell>
									<StyledTableCell className='text-dark bg-light' align='center'>
										P.O. No.
									</StyledTableCell>
									<StyledTableCell className='text-dark bg-light' align='center'>
										Received From
									</StyledTableCell>
									<StyledTableCell className='text-dark bg-light' align='center'>
										Description
									</StyledTableCell>
									<StyledTableCell className='text-dark bg-light' align='center'>
										Signature of Inspection
									</StyledTableCell>
									<StyledTableCell className='text-dark bg-light' align='center'>
										Justification/Remarks
									</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{loading ? (
									<Loading />
								) : error ? (
									<span>Error</span>
								) : !order ? (
									<h5>Not Found</h5>
								) : (
									<StyledTableRow>
										<StyledTableCell className='text-dark' align='center'>
											1.
										</StyledTableCell>
										<StyledTableCell className='text-dark' align='center'>
											{order.inspectionDate}
										</StyledTableCell>
										<StyledTableCell className='text-dark' align='center'>
											{order.prNum}
										</StyledTableCell>
										<StyledTableCell className='text-dark' align='center'>
											{order.poNum}
										</StyledTableCell>
										<StyledTableCell className='text-dark' align='center'>
											{order.vendor ? order.vendor.name : null}
										</StyledTableCell>
										<StyledTableCell className='text-dark' align='center'>
											{order.description}
										</StyledTableCell>
										<StyledTableCell className='text-dark' align='center'>
											{order.inspectionStatus}
										</StyledTableCell>
										<StyledTableCell className='text-dark' align='center'>
											{order.remarks}
										</StyledTableCell>
									</StyledTableRow>
								)}
							</TableBody>
						</Table>
					</TableContainer>
					{/* <thead class="thead-dark">
                    <tr>
                    <th>S.No.</th>
                    <td colspan="5">
                    <th>DESCRIPTION</th>
                    </td>
                    <th>Quantity</th>
                    <th>Unit Value</th>
                    <th>Remarks</th>
                    </tr>
                </thead> */}
				</div>
			</div>
			<div className={classes.table1}>
				<div className='table ml-auto mr-auto mt-4'>
					<h6>Purchase Inspection Materials</h6>
					<TableContainer>
						<Table>
							<TableHead>
								<TableRow hover role='checkbox'>
									<StyledTableCell className='text-dark bg-light' align='center'>
										Sr.No
									</StyledTableCell>
									<StyledTableCell className='text-dark bg-light' align='center'>
										Material Name
									</StyledTableCell>
									<StyledTableCell className='text-dark bg-light' align='center'>
										Quantity
									</StyledTableCell>
									<StyledTableCell className='text-dark bg-light' align='center'>
										Unit Value
									</StyledTableCell>
									<StyledTableCell className='text-dark bg-light' align='center'>
										Remarks
									</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{loading ? (
									<Loading />
								) : error ? (
									<span>Error</span>
								) : !order.materials || !order.materials.length ? (
									<span>Not Found</span>
								) : (
									order.materials.map((material, i) => (
										<StyledTableRow key={i}>
											<StyledTableCell className='text-dark' align='center'>
												{i + 1}
											</StyledTableCell>
											<StyledTableCell className='text-dark' align='center'>
												{material.material.name}
											</StyledTableCell>
											<StyledTableCell className='text-dark' align='center'>
												{material.quantity}
											</StyledTableCell>
											<StyledTableCell className='text-dark' align='center'>
												{material.unitValue}
											</StyledTableCell>
											<StyledTableCell className='text-dark' align='center'>
												{material.remarks}
											</StyledTableCell>
										</StyledTableRow>
									))
								)}
							</TableBody>
						</Table>
					</TableContainer>
					{/* <thead class="thead-dark">
                    <tr>
                    <th>S.No.</th>
                    <td colspan="5">
                    <th>DESCRIPTION</th>
                    </td>
                    <th>Quantity</th>
                    <th>Unit Value</th>
                    <th>Remarks</th>
                    </tr>
                </thead> */}
				</div>
			</div>
			<div className='container'>
				<div className='row'>
					<div className='col-lg-3 col-md-3'>
						<hr style={{ backgroundColor: 'black', paddingTop: 2 }} />
						<p style={{ marginTop: -10 }}>Store Incharge</p>
					</div>
					<div className='offset-lg-6 offset-md-6 col-lg-3 col-md-3'>
						<hr style={{ backgroundColor: 'black', paddingTop: 2 }} />
						<p style={{ marginTop: -10 }}>Q.A Dept</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GoodReceivedPrint;
