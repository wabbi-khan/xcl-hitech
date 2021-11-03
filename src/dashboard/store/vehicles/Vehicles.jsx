import React, { useState, useEffect } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import TableContainer from '@material-ui/core/TableContainer';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import {
	getVehicles,
	createVehicles,
	deleteVehicles,
} from '../../../services/action/VehiclesAction';
import EditVehicles from './EditVehicles';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
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
	number: '',
	type: '',
	driverName: '',
	phoneNum: '',
	cnicNum: '',
};

const validationSchema = yup.object({
	number: yup.string().required('Vehicle No. is required'),
	type: yup.string().required('Vehicle Type is required'),
	driverName: yup.string().required('Driver name is required'),
	phoneNum: yup.string().required('Phone No. is required'),
	cnicNum: yup.string().required('CNIC No. is required'),
});

const Vehicles = () => {
	const [fetchLoading, setFetchLoading] = React.useState(true);
	const [createLoading, setCreateLoading] = React.useState(false);
	const [createError, setCreateError] = React.useState('');
	const [deleteLoading, setDeleteLoading] = React.useState('');
	const [deleteError, setDeleteError] = React.useState('');
	const [vehicle, setvehicle] = useState('');
	const [open, setOpen] = useState(false);

	const classes = useStyles();

	const dispatch = useDispatch();

	const { vehicles } = useSelector((state) => state.vehicles);

	useEffect(() => {
		setFetchLoading(true);
		dispatch(
			getVehicles(null, (err) => {
				setFetchLoading(false);
			})
		);
	}, [dispatch]);

	const onSubmit = async (values) => {
		setCreateLoading(true);
		dispatch(
			createVehicles(values, (err) => {
				if (err) {
					setCreateError(err);
					setTimeout(() => {
						setCreateError('');
					}, 4000);
				}
				setCreateLoading(false);
			})
		);
	};

	const handleClose = (props) => {
		setOpen(props);
	};

	const handleOpen = async (vehicle) => {
		setvehicle(vehicle);
		setOpen(true);
	};

	const deleteVehicle = async (params) => {
		setDeleteLoading(true);
		dispatch(
			deleteVehicles(params, (err) => {
				if (err) {
					setDeleteError(err);
					setTimeout(() => {
						setDeleteError('');
					}, 4000);
				}
				setDeleteLoading(false);
			})
		);
	};

	return (
		<Sidenav title={'Vehicles'}>
			<EditVehicles show={open} handler={handleClose} vehicle={vehicle} />
			{deleteLoading && (
				<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
					<Loader type="TailSpin" width="2rem" height="2rem" />
				</div>
			)}
			{deleteError && (
				<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
					<span>{deleteError}</span>
				</div>
			)}
			<div>
				<Container className={classes.mainContainer}>
					<Formik
						initialValues={initialValue}
						validationSchema={validationSchema}
						onSubmit={onSubmit}
					>
						{(props) => (
							<Form>
								<Container>
									<Grid
										container
										spacing={1}
										style={{ marginTop: 15 }}
									>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<CssTextField
												id="outlined-basic"
												label="Vehicle No."
												variant="outlined"
												type="text"
												size="small"
												autoComplete="off"
												style={{ width: '100%' }}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
												onChange={props.handleChange('number')}
												onBlur={props.handleBlur('number')}
												value={props.values.number}
												helperText={
													props.touched.number &&
													props.errors.number
												}
												error={
													props.touched.number &&
													props.errors.number
												}
											/>
										</Grid>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<CssTextField
												id="outlined-basic"
												label="Vehicle Type"
												variant="outlined"
												type="text"
												size="small"
												autoComplete="off"
												select
												style={{ width: '100%' }}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
												onChange={props.handleChange('type')}
												onBlur={props.handleBlur('type')}
												value={props.values.type}
												helperText={
													props.touched.type && props.errors.type
												}
												error={
													props.touched.type && props.errors.type
												}
											>
												<MenuItem value="">
													<em>None</em>
												</MenuItem>
												<MenuItem value="truck">Truck</MenuItem>
												<MenuItem value="heavy truck">
													Heavy Truck
												</MenuItem>
											</CssTextField>
										</Grid>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<CssTextField
												id="outlined-basic"
												label="Driver Name"
												variant="outlined"
												type="text"
												size="small"
												autoComplete="off"
												style={{ width: '100%' }}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
												onChange={props.handleChange('driverName')}
												onBlur={props.handleBlur('driverName')}
												value={props.values.driverName}
												helperText={
													props.touched.driverName &&
													props.errors.driverName
												}
												error={
													props.touched.driverName &&
													props.errors.driverName
												}
											/>
										</Grid>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<CssTextField
												id="outlined-basic"
												label="Phone No."
												variant="outlined"
												type="text"
												size="small"
												autoComplete="off"
												style={{ width: '100%' }}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
												onChange={props.handleChange('phoneNum')}
												onBlur={props.handleBlur('phoneNum')}
												value={props.values.phoneNum}
												helperText={
													props.touched.phoneNum &&
													props.errors.phoneNum
												}
												error={
													props.touched.phoneNum &&
													props.errors.phoneNum
												}
											/>
										</Grid>
									</Grid>
								</Container>
								<Container className={classes.mainContainer}>
									<Grid
										container
										spacing={1}
										style={{ marginTop: 15 }}
									>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<CssTextField
												id="outlined-basic"
												label="CNIC No."
												variant="outlined"
												type="text"
												size="small"
												autoComplete="off"
												style={{ width: '100%' }}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
												onChange={props.handleChange('cnicNum')}
												onBlur={props.handleBlur('cnicNum')}
												value={props.values.cnicNum}
												helperText={
													props.touched.cnicNum &&
													props.errors.cnicNum
												}
												error={
													props.touched.cnicNum &&
													props.errors.cnicNum
												}
											/>
										</Grid>
									</Grid>
									<div>
										<Button
											variant="outlined"
											color="primary"
											text="Add"
											loading={createLoading}
											loaderColor="#333"
											classNames={classes.addButton}
										/>
										{createError && <p>{createError}</p>}
									</div>
								</Container>
							</Form>
						)}
					</Formik>
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
					) : vehicles?.length === 0 ? (
						<p>There is no data found.</p>
					) : (
						<div className={classes.dataTable}>
							<TableContainer className={classes.tableContainer}>
								<div
									className="container-fluid"
									style={{ textAlign: 'left' }}
								>
									<table class="table table-responsive table-hover table-striped table-bordered border-dark text-center mt-3">
										<thead class="bg-dark text-light">
											<tr>
												<th>S.No.</th>
												<th>Vehicle No.</th>
												<th>Vehicle Type</th>
												<th>Driver Name</th>
												<th>Phn No.</th>
												<th>CNIC No.</th>
												<th>Inspected/Un-Inspected</th>
												<th>Action</th>
											</tr>
										</thead>
										<tbody>
											{vehicles.map((el, i) => (
												<tr key={i}>
													<td>{i + 1}</td>
													<td>{el.number}</td>
													<td>{el.type}</td>
													<td>{el.driverName}</td>
													<td>{el.phoneNum}</td>
													<td>{el.cnicNum}</td>
													<td>
														{el?.inspected ? (
															<span className="text-success">
																Inspected
															</span>
														) : (
															<span className="text-danger">
																Un - Inspected
															</span>
														)}
													</td>
													<td>
														<div
															style={{
																display: 'flex',
																flexDirection: 'row',
																alignItems: 'center',
																justifyContent: 'center',
															}}
														>
															<Button
																variant="contained"
																classNames="bg-dark text-light"
																size="small"
																onClick={() => handleOpen(el)}
																text="Edit"
															/>

															<Button
																variant="contained"
																color="secondary"
																size="small"
																onClick={() =>
																	deleteVehicle(el._id)
																}
																style={{ marginLeft: 10 }}
																text="Delete"
															/>
														</div>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</TableContainer>
						</div>
					)}
				</Container>
			</div>
		</Sidenav>
	);
};

export default Vehicles;
