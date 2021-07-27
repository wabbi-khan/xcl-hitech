import React, { useEffect } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import TableContainer from '@material-ui/core/TableContainer';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRequisitionAction } from '../../../services/action/PurchaseReqAction';
import Loading from '../../purchase/material/Loading';
import MaterialError from '../../purchase/material/MaterialError';
import { Grid } from '@material-ui/core';

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
		marginTop: 15,
	},
	table: {
		minWidth: 600,
	},
	dataTable: {
		marginTop: 10,
	},
}));

const MaterialIssueReq = ({ history }) => {
	const classes = useStyles();

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchRequisitionAction(`isComplete=false`));
	}, [dispatch]);

	const { purchaseRequisitions, loading, error } = useSelector(
		(state) => state.purchaseRequisitions,
	);
	console.log(purchaseRequisitions);

	// const onSubmitDate = async (props) => {
	// 	console.log(props);
	// 	// try {
	// 	// await axios.post(`${process.env.REACT_APP_API_URL}/material`, props)
	// 	// window.location.reload()
	// 	// setAddMatError(false)
	// 	// }
	// 	// catch (error) {
	// 	// setAddMatError(true)

	// 	// }
	// };

	return (
		<Sidenav title={'Material Issue Requisition'}>
			<div>
				<div className={classes.dataTable}>
					<Grid container spacing={1}>
						<Grid item lg={3} md={3} sm={6} xs={6}>
							<h5 className='ml-1 mt-3'>UnComplete Purchase Requisitions</h5>
						</Grid>
						<Grid item lg={3} md={3} sm={6} xs={6}></Grid>
						<Grid item lg={4} md={3} sm={6} xs={6}></Grid>
						<Grid item lg={2} md={3} sm={6} xs={6}>
							<Button
								variant='contained'
								size='small'
								className='bg-dark text-light'
								onClick={() => {
									history.push(
										`/storedashboard/material_issue_requisition/complete_material_issue_requisition`,
									);
								}}>
								View Complete Requisitions
							</Button>
						</Grid>
					</Grid>
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
																	`/storedashboard/material_issue_requisition/material_requisition_details/${request._id}`,
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
				</div>
			</div>
		</Sidenav>
	);
};

export default MaterialIssueReq;
