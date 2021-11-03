import React, { useEffect, useState } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import TableContainer from '@material-ui/core/TableContainer';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRequisitionAction } from '../../../services/action/PurchaseReqAction';
import { Grid } from '@material-ui/core';
import Loader from 'react-loader-spinner';
import Button from '../../../components/utils/Button';

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
	const [fetchLoading, setFetchLoading] = useState(true);

	const classes = useStyles();

	const dispatch = useDispatch();

	useEffect(() => {
		setFetchLoading(true);
		dispatch(
			fetchRequisitionAction(`isComplete=false`, (err) => {
				setFetchLoading(false);
			})
		);
	}, [dispatch]);

	const { purchaseRequisitions } = useSelector(
		(state) => state.purchaseRequisitions
	);

	// const onSubmitDate = async (props) => {
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
							<h5 className="ml-1 mt-3">
								UnComplete Purchase Requisitions
							</h5>
						</Grid>
						<Grid item lg={3} md={3} sm={6} xs={6}></Grid>
						<Grid item lg={4} md={3} sm={6} xs={6}></Grid>
						<Grid item lg={2} md={3} sm={6} xs={6}>
							<Button
								variant="contained"
								size="small"
								classNames="bg-dark text-light"
								onClick={() => {
									history.push(
										`/storedashboard/material_issue_requisition/complete_material_issue_requisition`
									);
								}}
								text="View Complete Requisition"
							/>
						</Grid>
					</Grid>
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
					) : purchaseRequisitions?.length === 0 ? (
						<p>There is no data found.</p>
					) : (
						<div className={classes.dataTable}>
							<TableContainer className={classes.tableContainer}>
								<div
									className="container-fluid"
									style={{ textAlign: 'left' }}
								>
									<table class="table table-responsive table-hover table-striped table-bordered border-dark text-center mt-1">
										<thead class="bg-dark text-light">
											<tr>
												<th>S.No.</th>
												<th>Department</th>
												<th>Purpose</th>
												<th>Req. Date</th>
												<th>Status</th>
												<th>Action</th>
											</tr>
										</thead>
										<tbody>
											{purchaseRequisitions.map((request, i) => (
												<tr key={i}>
													<td>{i + 1}</td>
													<td>
														{!request.department
															? null
															: request.department.name}
													</td>
													<td>{request.purpose}</td>
													<td>{request.reqDate}</td>
													<td>{request.status}</td>
													<td>
														<Button
															variant="contained"
															size="small"
															classNames="btn btn-sm bg-dark text-light"
															onClick={() => {
																history.push(
																	`/storedashboard/material_issue_requisition/material_requisition_details/${request._id}`
																);
															}}
															text="View Requisition"
														/>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</TableContainer>
						</div>
					)}
				</div>
			</div>
		</Sidenav>
	);
};

export default MaterialIssueReq;
