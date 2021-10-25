import React, { useState, useEffect } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { makeStyles } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../purchase/material/Loading';
import MaterialError from '../../purchase/material/MaterialError';
import {
	fetchSingleRequisitionAction,
	updatePurchaseReqAction,
} from '../../../services/action/PurchaseReqAction';

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

const MaterialReqDetails = (props) => {
	const classes = useStyles();
	const { history } = props;
	const [IsComplete, setIsComplete] = useState(false);
	const [IsError, setIsError] = useState(false);

	const id = props.match.params.id;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchSingleRequisitionAction(id));
	}, [dispatch, id]);

	const { purchaseRequisition, loading, error } = useSelector(
		(state) => state.purchaseRequisitions
	);

	const completeReqFunc = () => {
		try {
			dispatch(updatePurchaseReqAction(id, { isComplete: true }));
			setIsComplete(true);
		} catch (error) {
			setIsError(true);
		}
	};

	return (
		<Sidenav title={'Material Issue Requisition Details'}>
			<Button
				variant="contained"
				className="bg-dark text-light"
				onClick={() => {
					history.push('/storedashboard/print_purchase_issue_requisition');
				}}
			>
				Print Purchase Req
			</Button>
			<div className={classes.dataTable}>
				<TableContainer className={classes.tableContainer}>
					{/* <h5>Inspected Orders</h5> */}
					<div className="container-fluid" style={{ textAlign: 'left' }}>
						<table class="table table-responsive table-hover table-striped table-bordered border-dark text-center mt-1">
							<thead class="bg-dark text-light">
								<tr>
									<th>S.No.</th>
									<th>Department</th>
									<th>Purpose</th>
									<th>Req. Date</th>
									<th>Status</th>
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
										<td>{purchaseRequisition.status}</td>
										{/* <td>
													<Button
														variant='contained'
														size='small'
														class='btn btn-sm bg-dark text-light'
														onClick={() => {
															history.push(
																`/storedashboard/material_issue_requisition/material_requisition_details/${request._id}`,
															);
														}} */}
										{/* // style={{ backgroundColor: 'red', color: 'whitesmoke', }} */}
										{/* // > */}
										{/* View Requisition */}
										{/* {switchButton} */}
										{/* </Button> */}
										{/* </td> */}
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
					<div className="container-fluid" style={{ textAlign: 'left' }}>
						<table class="table table-responsive table-hover table-striped table-bordered border-dark text-center mt-1">
							<thead class="bg-dark text-light">
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
											<td>
												{!material.material
													? null
													: material.material.name}
											</td>
											<td>{material.quantity}</td>
											<td>{material.material?.unit?.name}</td>
											<td>{material.remarks}</td>
											{/* <td>
													<Button
														variant='contained'
														size='small'
														class='btn btn-sm bg-dark text-light'
														onClick={() => {
															history.push(
																`/storedashboard/material_issue_requisition/material_requisition_details/${request._id}`,
															);
														}} */}
											{/* // style={{ backgroundColor: 'red', color: 'whitesmoke', }} */}
											{/* // > */}
											{/* View Requisition */}
											{/* {switchButton} */}
											{/* </Button> */}
											{/* </td> */}
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
			<div className={classes.dataTable}>
				<div className="text-center">
					<Button
						variant="contained"
						className="bg-dark text-light"
						onClick={() => completeReqFunc()}
					>
						Complete Requisition
					</Button>
				</div>
				{IsComplete ? (
					<span className="text-success">
						Purchase Requisition has been Completed Successfully
					</span>
				) : IsError ? (
					<span className="text-danger">Internal Server Error</span>
				) : null}
			</div>
		</Sidenav>
	);
};

export default MaterialReqDetails;
