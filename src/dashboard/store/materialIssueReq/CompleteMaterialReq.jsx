import React, { useEffect } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import TableContainer from '@material-ui/core/TableContainer';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRequisitionAction } from '../../../services/action/PurchaseReqAction';
import Loading from '../../purchase/material/Loading';
import MaterialError from '../../purchase/material/MaterialError';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: '25ch',
		},
	},
	mainContainer: {
		textAlign: 'center',
		// marginLeft: 0
	},
	addButton: {
		marginTop: 20,
		color: '#22A19A',
		borderColor: '#22A19A',
		fontWeight: 'bold',
		width: '10%',
		'&:hover': {
			border: 'none',
			backgroundColor: '#22A19A',
			color: 'whitesmoke',
		},
	},
	tableContainer: {
		marginTop: 5,
	},
	table: {
		minWidth: 600,
	},
	dataTable: {},
	inputFieldStyle: {
		[theme.breakpoints.up('md')]: {
			width: 250,
		},
		[theme.breakpoints.down('sm')]: {
			width: 200,
		},
	},
	inputFieldStyle1: {
		[theme.breakpoints.up('md')]: {
			width: 250,
		},
		[theme.breakpoints.down('sm')]: {
			width: 200,
			marginTop: 10,
		},
	},
}));

const CompleteMaterialReq = ({ history }) => {
	const classes = useStyles();

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchRequisitionAction('isComplete=true'));
	}, [dispatch]);

	const { purchaseRequisitions, loading, error } = useSelector(
		(state) => state.purchaseRequisitions,
	);
	console.log(purchaseRequisitions);

	return (
		<Sidenav title={'Completed Material Issue Requisitions'}>
			<div className={classes.dataTable}>
				<TableContainer className={classes.tableContainer}>
					{/* <h5>Inspected Orders</h5> */}
					<div className='container-fluid' style={{ textAlign: 'left' }}>
						<table class='table table-responsive table-bordered border-dark text-center mt-1'>
							<thead class='bg-dark text-light'>
								<tr>
									<th>S.No.</th>
									<th>Department</th>
									<th>Purpose</th>
									<th>Req. Date</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{loading ? (
									<Loading />
								) : error ? (
									<MaterialError />
								) : purchaseRequisitions.length ? (
									purchaseRequisitions.map((request, i) => (
										<tr key={i}>
											<td>{i + 1}</td>
											<td>{!request.department ? null : request.department.name}</td>
											<td>{request.purpose}</td>
											<td>{request.reqDate}</td>
											<td>
												<Button
													variant='contained'
													size='small'
													class='btn btn-sm bg-dark text-light'
													onClick={() => {
														history.push(
															`/storedashboard/material_issue_requisition/complete_requisition_details/${request._id}`,
														);
													}}
													// style={{ backgroundColor: 'red', color: 'whitesmoke', }}
												>
													View Requisition
													{/* {switchButton} */}
												</Button>
											</td>
										</tr>
									))
								) : (
									<h5>Not Found</h5>
								)}
							</tbody>
						</table>
					</div>
				</TableContainer>
			</div>
			{/* <div>
				<div className={classes.dataTable}>
					<TableContainer className={classes.tableContainer}>
						<Table
							stickyHeader
							className='table table-dark table-md'
							style={{ backgroundColor: '#d0cfcf', border: '1px solid grey' }}>
							<TableHead>
								<TableRow hover role='checkbox'>
									<StyledTableCell align='center'>Sr.No</StyledTableCell>
									<StyledTableCell align='center'>Department</StyledTableCell>
									<StyledTableCell align='center'>Purpose</StyledTableCell>
									<StyledTableCell align='center'>Req. Date</StyledTableCell>
									<StyledTableCell align='center'>Action</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{
									loading ? (
										<Loading />
									) : error ? (
										<MaterialError />
									) : purchaseRequisitions.length ? (
										purchaseRequisitions.map((request, i) => (
											<StyledTableRow key={i}>
												<StyledTableCell className='text-dark bg-light' align='center'>
													{i + 1}
												</StyledTableCell>
												<StyledTableCell className='text-dark bg-light' align='center'>
													{!request.department ? null : request.department.name}
												</StyledTableCell>
												<StyledTableCell className='text-dark bg-light' align='center'>
													{request.purpose}
												</StyledTableCell>
												<StyledTableCell className='text-dark bg-light' align='center'>
													{request.reqDate}
												</StyledTableCell>
												<StyledTableCell className='text-dark bg-light' align='center'>
													<Button
														variant='contained'
														size='small'
														onClick={() => {
															history.push(
																`/storedashboard/material_issue_requisition/complete_requisition_details/${request._id}`,
															);
														}}
													>
														View Requisition
													</Button>
												</StyledTableCell>
											</StyledTableRow>
										))
									) : (
										<h5>Not Found</h5>
									)
								}
							</TableBody>
						</Table>
					</TableContainer>
				</div>
			</div> */}
		</Sidenav>
	);
};

export default CompleteMaterialReq;
