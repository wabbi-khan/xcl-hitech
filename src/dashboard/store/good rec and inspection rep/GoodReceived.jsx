import React, { useEffect } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TableContainer from '@material-ui/core/TableContainer';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import { useDispatch } from 'react-redux';
import {
	fetchSinglePurchaseOrderAction,
	fetchPurchaseOrderAction,
} from '../../../services/action/OrdersAction';
import { fetchDepartmentsAction } from '../../../services/action/DepartmentAction';
// import * as yup from 'yup';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: '25ch',
		},
	},
	mainContainer: {
		textAlign: 'center',
		marginTop: 20,
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
	table: {
		minWidth: 600,
	},
	dataTable: {
		marginTop: 40,
	},
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

// const initialValue = {
// 	prNum: '',
// 	poNum: '',
// 	receivedFrom: '',
// 	desc: '',
// 	statusOfIns: '',
// 	remarks: '',
// };

// const validationSchema = yup.object({
// 	prNum: yup.string().required('P.R. No. is required'),
// 	poNum: yup.string().required('P.O. No. is required'),
// 	receivedFrom: yup.string().required('Received From is required'),
// 	desc: yup.string().required('Description is required'),
// 	statusOfIns: yup.string().required('Status of Inspection is required'),
// 	remarks: yup.string().required('Remarks is required'),
// });

const GoodReceived = (props) => {
	const classes = useStyles();

	const { history, location } = props;

	const { order } = location.state;

	const id = props.match.params.id;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchPurchaseOrderAction(`inspected=true`));
		dispatch(fetchSinglePurchaseOrderAction(id));
		dispatch(fetchDepartmentsAction());
	}, [dispatch, id]);

	// const { order } = useSelector((state) => state.orders);

	// const onSubmitDate = async (props) => {
	// 	// try {
	// 	// 	await axios.patch(
	// 	// 		`${process.env.REACT_APP_API_URL}/order/inspection/${id}`,
	// 	// 		props,
	// 	// 	);
	// 	// 	window.location.reload();
	// 	// } catch (error) {
	// 	// }
	// };

	return (
		<Sidenav title={'Good Received and Inspection Report (Inspected)'}>
			<div>
				{!order ? null : (
					<Container className={classes.mainContainer}>
						<Grid container spacing={1} style={{ marginTop: 15 }}>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id="outlined-basic"
									label="P.R. No."
									variant="outlined"
									type="text"
									size="small"
									autoComplete="off"
									disabled
									defaultValue={order?.prNum}
									style={{ width: '100%' }}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
								></CssTextField>
							</Grid>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id="outlined-basic"
									label="P.O. No."
									variant="outlined"
									type="text"
									size="small"
									autoComplete="off"
									disabled
									defaultValue={order?.poNum}
									style={{ width: '100%' }}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
								/>
							</Grid>
							{!order.vendor ? null : (
								<Grid item lg={3} md={3} sm={12} xs={12}>
									<CssTextField
										id="outlined-basic"
										label="Received From"
										variant="outlined"
										type="text"
										size="small"
										autoComplete="off"
										disabled
										defaultValue={order?.vendor.name}
										style={{ width: '100%' }}
										inputProps={{ style: { fontSize: 14 } }}
										InputLabelProps={{ style: { fontSize: 14 } }}
									/>
								</Grid>
							)}
							{/* {
									!order.department ? null : ( */}
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id="outlined-basic"
									label="Department"
									variant="outlined"
									type="text"
									size="small"
									autoComplete="off"
									disabled
									// defaultValue={order?.department.name}
									style={{ width: '100%' }}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
								/>
							</Grid>
							{/* )
								} */}
						</Grid>
					</Container>
				)}
				<Container className={classes.mainContainer}>
					<Grid container spacing={1} style={{ marginTop: 15 }}>
						<Grid item lg={3} md={3} sm={12} xs={12}>
							<CssTextField
								id="outlined-basic"
								label="Description"
								variant="outlined"
								type="text"
								size="small"
								autoComplete="off"
								style={{ width: '100%' }}
								inputProps={{ style: { fontSize: 14 } }}
								InputLabelProps={{ style: { fontSize: 14 } }}
							/>
						</Grid>
						<Grid item lg={3} md={3} sm={12} xs={12}>
							<CssTextField
								id="outlined-basic"
								label="Status of Inspection"
								variant="outlined"
								type="text"
								size="small"
								select
								autoComplete="off"
								style={{ width: '100%' }}
								inputProps={{ style: { fontSize: 14 } }}
								InputLabelProps={{ style: { fontSize: 14 } }}
							>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								<MenuItem value="Accepted">Accepted</MenuItem>
								<MenuItem value="Rejected">Rejected</MenuItem>
								<MenuItem value="Signature">Signature</MenuItem>
							</CssTextField>
						</Grid>
						<Grid item lg={3} md={3} sm={12} xs={12}>
							<CssTextField
								id="outlined-basic"
								label="Remarks"
								variant="outlined"
								type="text"
								size="small"
								autoComplete="off"
								style={{ width: '100%' }}
								inputProps={{ style: { fontSize: 14 } }}
								InputLabelProps={{ style: { fontSize: 14 } }}
							/>
						</Grid>
					</Grid>
					<div>
						<Button
							variant="outlined"
							color="primary"
							className={classes.addButton}
							type="submit"
						>
							Add
						</Button>
					</div>
				</Container>
				<div className={classes.dataTable}>
					<TableContainer className={classes.tableContainer}>
						<h5>Inspected Orders</h5>
						<div
							className="container-fluid"
							style={{ textAlign: 'left' }}
						>
							<table class="table table-responsive table-hover table-striped table-bordered border-dark text-center mt-3">
								<thead class="bg-dark text-light">
									<tr>
										<th>Date/Time</th>
										<th>P.R. No.</th>
										<th>P.O. No.</th>
										<th>Received From</th>
										<th>Department</th>
										<th>Description</th>
										<th>Status of Inspection</th>
										<th>Remarks</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>{order?.inspectionDate}</td>
										<td>{order?.prNum}</td>
										<td>{order?.poNum}</td>
										<td>{order?.vendor?.name}</td>
										<td>{order?.department?.name}</td>
										<td>{order?.description}</td>
										<td>{order?.inspectionStatus}</td>
										<td>{order?.remarks}</td>
										<td>
											<Button
												variant="contained"
												color="secondary"
												size="small"
												class="btn btn-sm bg-dark text-light"
												onClick={() =>
													history.push(
														`/storedashboard/good_received_and_inspection_report/good_rec_inspection_print/${order?._id}`
													)
												}
												style={{ marginLeft: 2, marginTop: 2 }}
											>
												View Report
											</Button>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</TableContainer>
				</div>
			</div>
		</Sidenav>
	);
};

export default GoodReceived;
