import React, { useEffect, useState } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchSinglePurchaseOrderAction,
	fetchPurchaseOrderAction,
} from '../../../services/action/OrdersAction';
import { fetchDepartmentsAction } from '../../../services/action/DepartmentAction';
import Loading from '../../purchase/material/Loading';
import MaterialError from '../../purchase/material/MaterialError';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Form, Formik } from 'formik'
import * as yup from 'yup';

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

const initialValue = {
	prNum: '',
	poNum: '',
	receivedFrom: '',
	desc: '',
	statusOfIns: '',
	remarks: '',
};

const validationSchema = yup.object({
	prNum: yup.string().required('P.R. No. is required'),
	poNum: yup.string().required('P.O. No. is required'),
	receivedFrom: yup.string().required('Received From is required'),
	desc: yup.string().required('Description is required'),
	statusOfIns: yup.string().required('Status of Inspection is required'),
	remarks: yup.string().required('Remarks is required'),
});

const GoodReceived = (props) => {
	const classes = useStyles();

	const { history } = props;

	const id = props.match.params.id;

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const dispatch = useDispatch();

	useEffect(async () => {
		await dispatch(fetchPurchaseOrderAction(`inspected=true`));
		await dispatch(fetchSinglePurchaseOrderAction(id));
		dispatch(fetchDepartmentsAction());
	}, [dispatch]);

	const { loading, order, error } = useSelector((state) => state.orders);
	const { departments } = useSelector((state) => state.departments);

	const onSubmitDate = async (props) => {
		// try {
		// 	await axios.patch(
		// 		`${process.env.REACT_APP_API_URL}/order/inspection/${id}`,
		// 		props,
		// 	);
		// 	window.location.reload();
		// 	console.log('submit');
		// } catch (error) {
		// 	console.log(error);
		// }
	};

	return (
		<Sidenav title={'Good Received and Inspection Report (Inspected)'}>
			<div>
				{
					!order ? null : (
						<Container className={classes.mainContainer}>
							<Grid container spacing={1} style={{ marginTop: 15 }}>
								<Grid item lg={3} md={3} sm={12} xs={12}>
									<CssTextField
										id='outlined-basic'
										label='P.R. No.'
										variant='outlined'
										type='text'
										size='small'
										autoComplete='off'
										disabled
										defaultValue={order?.prNum}
										className={classes.inputFieldStyle1}
										inputProps={{ style: { fontSize: 14 } }}
										InputLabelProps={{ style: { fontSize: 14 } }}></CssTextField>
								</Grid>
								<Grid item lg={3} md={3} sm={12} xs={12}>
									<CssTextField
										id='outlined-basic'
										label='P.O. No.'
										variant='outlined'
										type='text'
										size='small'
										autoComplete='off'
										disabled
										defaultValue={order?.poNum}
										className={classes.inputFieldStyle1}
										inputProps={{ style: { fontSize: 14 } }}
										InputLabelProps={{ style: { fontSize: 14 } }}
									/>
								</Grid>
								{!order.vendor ? null : (
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id='outlined-basic'
											label='Received From'
											variant='outlined'
											type='text'
											size='small'
											autoComplete='off'
											disabled
											defaultValue={order?.vendor.name}
											className={classes.inputFieldStyle1}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
										/>
									</Grid>
								)}
								<Grid item lg={3} md={3} sm={12} xs={12}>
									<CssTextField
										id='outlined-basic'
										label='Description'
										variant='outlined'
										type='text'
										size='small'
										autoComplete='off'
										className={classes.inputFieldStyle1}
										inputProps={{ style: { fontSize: 14 } }}
										InputLabelProps={{ style: { fontSize: 14 } }}
										{...register('description', { required: true })}
									/>
									{errors.description?.type === 'required' && (
										<p className='mt-1 text-danger'>Description is required</p>
									)}
								</Grid>
							</Grid>
						</Container>
					)
				}
				<Container className={classes.mainContainer}>
					<Grid container spacing={1} style={{ marginTop: 15 }}>
						<Grid item lg={3} md={3} sm={12} xs={12}>
							<CssTextField
								id='outlined-basic'
								label='Status of Inspection'
								variant='outlined'
								type='text'
								size='small'
								select
								autoComplete='off'
								className={classes.inputFieldStyle1}
								inputProps={{ style: { fontSize: 14 } }}
								InputLabelProps={{ style: { fontSize: 14 } }}
								{...register('inspectionStatus', { required: true })}>
								<MenuItem value=''>
									<em>None</em>
								</MenuItem>
								<MenuItem value='Accepted'>Accepted</MenuItem>
								<MenuItem value='Rejected'>Rejected</MenuItem>
								<MenuItem value='Signature'>Signature</MenuItem>
							</CssTextField>
							{errors.inspectionStatus?.type === 'required' && (
								<p className='mt-1 text-danger'>Status of Inspection is required</p>
							)}
						</Grid>
						<Grid item lg={3} md={3} sm={12} xs={12}>
							<CssTextField
								id='outlined-basic'
								label='Remarks'
								variant='outlined'
								type='text'
								size='small'
								autoComplete='off'
								className={classes.inputFieldStyle1}
								inputProps={{ style: { fontSize: 14 } }}
								InputLabelProps={{ style: { fontSize: 14 } }}
								{...register('remarks', { required: true })}
							/>
							{errors.remarks?.type === 'required' && (
								<p className='mt-1 text-danger'>Category Name is required</p>
							)}
						</Grid>
					</Grid>
					<div>
						<Button
							variant='outlined'
							color='primary'
							className={classes.addButton}
							type='submit'>
							Add
						</Button>
					</div>
				</Container>
				<div className={classes.dataTable}>
					<TableContainer className={classes.tableContainer}>
						<h5>Inspected Orders</h5>
						<div className='container-fluid' style={{ textAlign: 'left', }}>
							<table class="table table-responsive table-hover table-striped table-bordered border-dark text-center mt-3">
								<thead class="bg-dark text-light">
									<tr>
										<th>Date/Time</th>
										<th>P.R. No.</th>
										<th>P.O. No.</th>
										<th>Received From</th>
										<th>Description</th>
										<th>Status of Inspection</th>
										<th>Remarks</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									<tr >
										<td>
											{order?.inspectionDate}
										</td>
										<td>
											{order?.prNum}
										</td>
										<td>
											{order?.poNum}
										</td>
										<td>
											{order?.vendor.name}
										</td>
										<td>
											{order?.description}
										</td>
										<td>
											{order?.inspectionStatus}
										</td>
										<td>
											{order?.remarks}
										</td>
										<td>
											<Button
												variant='contained'
												color='secondary'
												size='small'
												class='btn btn-sm bg-dark text-light'
												onClick={() =>
													history.push(
														`/storedashboard/good_received_and_inspection_report/good_rec_inspection_print/${order?._id}`,
													)
												}
												style={{ marginLeft: 2, marginTop: 2 }}>
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
