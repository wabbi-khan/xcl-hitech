import React, { useEffect, useState } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import TableContainer from '@material-ui/core/TableContainer';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRequisitionAction } from '../../../services/action/PurchaseReqAction';
import Button from '../../../components/utils/Button';
import Loader from 'react-loader-spinner';

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
	const [fetchLoading, setFetchLoading] = useState(true);
	const classes = useStyles();

	const dispatch = useDispatch();

	useEffect(() => {
		setFetchLoading(true);
		dispatch(
			fetchRequisitionAction('isComplete=true', (err) => {
				setFetchLoading(false);
			})
		);
	}, [dispatch]);

	const { purchaseRequisitions } = useSelector(
		(state) => state.purchaseRequisitions
	);

	return (
		<Sidenav title={'Completed Material Issue Requisitions'}>
			<Button
				variant="contained"
				size="small"
				classNames="bg-dark text-light"
				style={{ marginLeft: '0.8rem' }}
				onClick={() => {
					history.push(
						'/storedashboard/material_issue_requisition/print_all_complete_requisition_details'
					);
				}}
				text="Print Purchase Req"
			/>
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
							<table class="table table-responsive table-bordered border-dark text-center mt-1">
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
													text="View Requisition"
													classNames="btn btn-sm bg-dark text-light"
													onClick={() => {
														history.push(
															`/storedashboard/material_issue_requisition/print_all_complete_requisition_details`
														);
													}}
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
		</Sidenav>
	);
};

export default CompleteMaterialReq;
