import React, { useEffect } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { makeStyles } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../purchase/material/Loading';
import MaterialError from '../../purchase/material/MaterialError';
import { fetchSingleRequisitionAction } from '../../../services/action/PurchaseReqAction';

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
}));

const CompleteMatReqDetails = (props) => {
	const classes = useStyles();
	const id = props.match.params.id;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchSingleRequisitionAction(id));
	}, [dispatch, id]);

	const { purchaseRequisition, loading, error } = useSelector(
		(state) => state.purchaseRequisitions,
	);
	console.log(purchaseRequisition);

	return (
		<Sidenav title={'Completed Material Issue Requisition Details'}>
			<div className={classes.dataTable}>
				<TableContainer className={classes.tableContainer}>
					{/* <h5>Inspected Orders</h5> */}
					<div className='container-fluid' style={{ textAlign: 'left' }}>
						<table class='table table-responsive table-hover table-striped table-bordered border-dark text-center mt-1'>
							<thead class='bg-dark text-light'>
								<tr>
									<th>S.No.</th>
									<th>Department</th>
									<th>Purpose</th>
									<th>Req. Date</th>
								</tr>
							</thead>
							<tbody>
								{loading ? (
									<Loading />
								) : error ? (
									<MaterialError />
								) : purchaseRequisition ? (
									<tr>
										<td>{1}</td>
										<td>
											{!purchaseRequisition.department
												? null
												: purchaseRequisition.department.name}
										</td>
										<td>{purchaseRequisition.purpose}</td>
										<td>{purchaseRequisition.reqDate}</td>
									</tr>
								) : (
									<h5>Not Found</h5>
								)}
							</tbody>
						</table>
					</div>
				</TableContainer>
			</div>
			<div className={classes.dataTable}>
				<TableContainer className={classes.tableContainer}>
					{/* <h5>Inspected Orders</h5> */}
					<div className='container-fluid' style={{ textAlign: 'left' }}>
						<table class='table table-responsive table-hover table-striped table-bordered border-dark text-center mt-1'>
							<thead class='bg-dark text-light'>
								<tr>
									<th>S.No.</th>
									<th>Material Name</th>
									<th>Quantity</th>
									<th>Unit Value</th>
									<th>Remarks</th>
								</tr>
							</thead>
							<tbody>
								{loading ? (
									<Loading />
								) : error ? (
									<MaterialError />
								) : !purchaseRequisition.materials ||
								  !purchaseRequisition.materials.length ? (
									<h5>Not Found</h5>
								) : (
									purchaseRequisition.materials.map((material, i) => (
										<tr key={i}>
											<td>{i + 1}</td>
											<td>{!material.material ? null : material.material.name}</td>
											<td>{material.quantity}</td>
											<td>{material.unitValue}</td>
											<td>{material.remarks}</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>
				</TableContainer>
			</div>
			{/* <div className={classes.dataTable}>
				<TableContainer className={classes.tableContainer}>
					<Table
						stickyHeader
						className='table table-dark'
						style={{ backgroundColor: '#d0cfcf', border: '1px solid grey' }}>
						<TableHead>
							<TableRow hover role='checkbox'>
								<StyledTableCell align='center'>Sr.No</StyledTableCell>
								<StyledTableCell align='center'>Department</StyledTableCell>
								<StyledTableCell align='center'>Purpose</StyledTableCell>
								<StyledTableCell align='center'>Req. Date</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{
								loading ? (
									<Loading />
								) : error ? (
									<MaterialError />
								) : purchaseRequisition ? (
									<StyledTableRow>
										<StyledTableCell className='text-dark bg-light' align='center'>
											1
										</StyledTableCell>
										<StyledTableCell className='text-dark bg-light' align='center'>
											{
												!purchaseRequisition.department
													? null
													: purchaseRequisition.department.name
											}
										</StyledTableCell>
										<StyledTableCell className='text-dark bg-light' align='center'>
											{purchaseRequisition.purpose}
										</StyledTableCell>
										<StyledTableCell className='text-dark bg-light' align='center'>
											{purchaseRequisition.reqDate}
										</StyledTableCell>
									</StyledTableRow>
								) : (
									<h5>Not Found</h5>
								)
							}
						</TableBody>
					</Table>
				</TableContainer>
			</div> */}
			{/* <div className={classes.dataTable}>
				<TableContainer className={classes.tableContainer}>
					<Table
						stickyHeader
						className='table table-dark'
						style={{ backgroundColor: '#d0cfcf', border: '1px solid grey' }}>
						<TableHead>
							<TableRow hover role='checkbox'>
								<StyledTableCell align='center'>Sr.No</StyledTableCell>
								<StyledTableCell align='center'>Material Name</StyledTableCell>
								<StyledTableCell align='center'>Quantity</StyledTableCell>
								<StyledTableCell align='center'>Unit Value</StyledTableCell>
								<StyledTableCell align='center'>Remarks</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{
								loading ? (
									<Loading />
								) : error ? (
									<MaterialError />
								) : !purchaseRequisition.materials ||
									!purchaseRequisition.materials.length ? (
									<h5>Not Found</h5>
								) : (
									purchaseRequisition.materials.map((material, i) => (
										<StyledTableRow key={i}>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{i + 1}
											</StyledTableCell>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{
													!material.material ? <span>asd</span> : material.material.name
												}
											</StyledTableCell>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{material.quantity}
											</StyledTableCell>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{material.unitValue}
											</StyledTableCell>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{material.remarks}
											</StyledTableCell>
										</StyledTableRow>
									))
								)
							}
						</TableBody>
					</Table>
				</TableContainer>
			</div> */}
		</Sidenav>
	);
};

export default CompleteMatReqDetails;
