import React, { useState, useEffect } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Loading from '../../purchase/material/Loading';
import MaterialError from '../../purchase/material/MaterialError';
import { fetchShiftAction } from '../../../services/action/ShiftAction';
import { fetchProductionReport } from '../../../services/action/ProductionReportAction';

// import MaterialAddRow from './commponent/materialAddRow'

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
		marginTop: 10,
		marginLeft: 15,
		color: '#22A19A',
		borderColor: '#22A19A',
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
	ckeckBox: {
		[theme.breakpoints.up('md')]: {
			marginLeft: 25,
		},
		[theme.breakpoints.down('sm')]: {
			marginLeft: 0,
		},
	},
	inputFieldStyle: {
		// boxShadow: '0.4px 0.4px 0.4px 0.4px grey',
		// borderRadius: 5,
		[theme.breakpoints.up('md')]: {
			width: 270,
		},
		[theme.breakpoints.down('sm')]: {
			width: 200,
		},
	},
	inputFieldStyle1: {
		[theme.breakpoints.up('md')]: {
			width: 270,
		},
		[theme.breakpoints.down('sm')]: {
			width: 200,
		},
	},
	inputFieldStyle2: {
		// boxShadow: '0.4px 0.4px 0.4px 0.4px grey',
		// borderRadius: 5,
		[theme.breakpoints.up('md')]: {
			width: 250,
		},
		[theme.breakpoints.down('sm')]: {
			width: 200,
		},
	},
	inputFieldStyle3: {
		[theme.breakpoints.up('md')]: {
			width: 250,
			marginLeft: -30,
		},
		[theme.breakpoints.down('sm')]: {
			width: 200,
		},
	},
	inputFieldStyle4: {
		[theme.breakpoints.up('md')]: {
			width: 250,
			marginLeft: 40,
		},
		[theme.breakpoints.down('sm')]: {
			width: 200,
		},
	},
	inputFieldStyle5: {
		[theme.breakpoints.up('md')]: {
			width: 250,
			marginLeft: 110,
		},
		[theme.breakpoints.down('sm')]: {
			width: 200,
		},
	},
	itemHeading: {
		marginTop: 7,
	},
	select: {
		'&:before': {
			borderColor: 'red',
		},
		'&:before': {
			borderColor: 'red',
		},
		'&:hover:not(.Mui-disabled):before': {
			borderColor: 'red',
		},
		[theme.breakpoints.up('md')]: {
			width: 400,
		},
		[theme.breakpoints.down('sm')]: {
			width: 200,
		},
	},
	delete: {
		color: 'red',
		fontSize: 38,
		[theme.breakpoints.up('md')]: {
			marginLeft: 50,
			marginTop: -7,
		},
		[theme.breakpoints.down('sm')]: {
			marginTop: -10,
		},
	},
	deleteRowBtn: {
		marginLeft: 120,
		'&:hover': {
			border: 'none',
			background: 'none',
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

const PurchaseReport = ({ history }) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	// const [ItemCounter, setItemCounter] = useState([{ id: 'text' }])
	const [ItemCounter, setItemCounter] = useState([
		{
			item: '',
			nameOfOperator: '',
			weight: '',
			desc: '',
			finishedPipe: '',
			finishedWt: '',
			rcyc: '',
			wastage: '',
			totalWeight: '',
			downTime: '',
		},
	]);
	const [VendorId, setVendorId] = useState('');
	const [VendorAddress, setVendorAddress] = useState('');
	const [vendorMaterial, setVendorMaterial] = useState([]);
	const [orderBody, setOrderBody] = useState({});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	useEffect(async () => {
		await dispatch(fetchShiftAction());
		await dispatch(fetchProductionReport());
	}, [dispatch]);

	const { shifts } = useSelector((state) => state.shifts);
	const { productionReports, loading, error } = useSelector(
		(state) => state.productionReports
	);

	const addMoreFunc = () => {
		setItemCounter([
			...ItemCounter,
			{
				item: '',
				nameOfOperator: '',
				weight: '',
				desc: '',
				finishedPipe: '',
				finishedWt: '',
				rcyc: '',
				wastage: '',
				totalWeight: '',
				downTime: '',
			},
		]);
	};

	const deleteItem = (i) => {
		const temp = [...ItemCounter];
		temp.splice(i, 1);
		setItemCounter(temp);
	};

	// const onAdd = async (data) => {
	// }

	// const onAddMaterial = async data => {
	// }

	const onChangeHandler = (placeholder, value, index) => {
		const tempFields = ItemCounter.map((item, i) => {
			if (i === index) {
				return { ...item, [placeholder]: value };
			} else {
				return { ...item };
			}
		});
		setItemCounter(tempFields);
	};

	const onSubmitDate = async (props) => {
		try {
			await axios.post(`${process.env.REACT_APP_API_URL}/productionReport`, {
				prNo: props.prNo,
				hi: props.hi,
				machineNo: props.machineNo,
				date: props.date,
				orderNo: props.orderNo,
				rawMaterial: props.rawMaterial,
				productionHours: props.productionHours,
				shift: props.shift,
				items: ItemCounter,
			});
			window.location.reload();
			// setAddMatError(false)
		} catch (error) {
			// setAddMatError(true)
		}
	};

	return (
		<Sidenav title={'Purchase Order'}>
			<div>
				{/* <form onSubmit={handleSubmit(onAdd)}> */}
				<form action="" onSubmit={handleSubmit(onSubmitDate)}>
					<Container className={classes.mainContainer}>
						<Grid container spacing={1} style={{ marginTop: 15 }}>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id="outlined-basic"
									label="P.R. No."
									variant="outlined"
									type="text"
									size="small"
									className={classes.inputFieldStyle1}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
									{...register('prNo', { required: true })}
								/>
								{errors.poNum?.type === 'required' && (
									<p className="mt-1 text-danger">
										P.O. No. is required
									</p>
								)}
							</Grid>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id="outlined-basic"
									label="HPEI/786/"
									variant="outlined"
									type="text"
									size="small"
									className={classes.inputFieldStyle1}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
									{...register('hpei', { required: true })}
								/>
							</Grid>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id="outlined-basic"
									variant="outlined"
									type="date"
									size="small"
									className={classes.inputFieldStyle1}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
									{...register('date', { required: true })}
								/>
								{errors.reference?.type === 'required' && (
									<p className="mt-1 text-danger">
										Reference is required
									</p>
								)}
							</Grid>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id="outlined-basic"
									label="Machine No."
									variant="outlined"
									type="text"
									size="small"
									className={classes.inputFieldStyle1}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
									{...register('machineNo', { required: true })}
								/>
								{errors.reference?.type === 'required' && (
									<p className="mt-1 text-danger">
										Reference is required
									</p>
								)}
							</Grid>
						</Grid>
					</Container>
					<Container className={classes.mainContainer}>
						<Grid container spacing={1} style={{ marginTop: 15 }}>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id="outlined-basic"
									label="Order No."
									variant="outlined"
									type="text"
									size="small"
									className={classes.inputFieldStyle1}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
									{...register('orderNo', { required: true })}
								/>
								{errors.paymentTerm?.type === 'required' && (
									<p className="mt-1 text-danger">
										Payment Terms required
									</p>
								)}
							</Grid>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id="outlined-basic"
									label="Raw Material"
									variant="outlined"
									type="text"
									size="small"
									className={classes.inputFieldStyle1}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
									{...register('rawMaterial', { required: true })}
								/>
								{errors.paymentSubject?.type === 'required' && (
									<p className="mt-1 text-danger">
										Payment Subject is required
									</p>
								)}
							</Grid>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id="outlined-basic"
									label="Production Hours"
									variant="outlined"
									type="text"
									size="small"
									className={classes.inputFieldStyle1}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
									{...register('productionHours', { required: true })}
								/>
								{errors.paymentSubject?.type === 'required' && (
									<p className="mt-1 text-danger">
										Payment Subject is required
									</p>
								)}
							</Grid>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id="outlined-basic"
									label="Select Shift"
									variant="outlined"
									type="email"
									size="small"
									select
									className={classes.inputFieldStyle}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
									{...register('shift', { required: true })}
								>
									{!shifts || !shifts.length ? (
										<p>Data Not Found</p>
									) : (
										shifts.map((verifiedVendor) => (
											<MenuItem
												value={verifiedVendor._id}
												key={verifiedVendor._id}
												onClick={() => {
													setVendorId(verifiedVendor._id);
													setVendorAddress(
														verifiedVendor.location
													);
													setVendorMaterial(
														verifiedVendor.material
													);
												}}
											>
												{verifiedVendor.name}
											</MenuItem>
										))
									)}
								</CssTextField>
							</Grid>
						</Grid>
					</Container>
					<div style={{ marginTop: 30, marginBottom: 30 }}>
						<hr />
					</div>
					<Container className={classes.mainContainer}>
						<h4 className="text-left">Items</h4>
						{ItemCounter.map((value, i) => {
							const no = i + 1;
							return (
								<>
									<Grid
										container
										spacing={1}
										style={{ marginTop: 15 }}
									>
										<Grid item lg={1} md={1} sm={12} xs={12}>
											{no}
										</Grid>
										<Grid item lg={2} md={2} sm={12} xs={12}>
											<CssTextField
												id="outlined-basic"
												label="Select Item"
												variant="outlined"
												type="email"
												size="small"
												select
												value={ItemCounter[i].item}
												onChange={(e) =>
													onChangeHandler(
														'item',
														e.target.value,
														i
													)
												}
												className={classes.inputFieldStyle}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
											>
												{!shifts || !shifts.length ? (
													<p>Data Not Found</p>
												) : (
													shifts.map((verifiedVendor) => (
														<MenuItem
															value={verifiedVendor._id}
															key={verifiedVendor._id}
															onClick={() => {
																setVendorId(verifiedVendor._id);
																setVendorAddress(
																	verifiedVendor.location
																);
																setVendorMaterial(
																	verifiedVendor.material
																);
															}}
														>
															{verifiedVendor.name}
														</MenuItem>
													))
												)}
											</CssTextField>
										</Grid>
										<Grid item lg={1} md={1} sm={12} xs={12}></Grid>
										<Grid item lg={2} md={2} sm={12} xs={12}>
											<CssTextField
												id="outlined-basic"
												label="Name Of Operator"
												variant="outlined"
												type="text"
												size="small"
												value={ItemCounter[i].nameOfOperator}
												onChange={(e) =>
													onChangeHandler(
														'nameOfOperator',
														e.target.value,
														i
													)
												}
												className={classes.inputFieldStyle1}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
											/>
											{errors.paymentSubject?.type ===
												'required' && (
												<p className="mt-1 text-danger">
													Payment Subject is required
												</p>
											)}
										</Grid>
										<Grid item lg={1} md={1} sm={12} xs={12}></Grid>

										<Grid item lg={2} md={2} sm={12} xs={12}>
											<CssTextField
												id="outlined-basic"
												label="Weight/m (kg)"
												variant="outlined"
												type="text"
												size="small"
												value={ItemCounter[i].weight}
												onChange={(e) =>
													onChangeHandler(
														'weight',
														e.target.value,
														i
													)
												}
												className={classes.inputFieldStyle1}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
											/>
											{errors.paymentSubject?.type ===
												'required' && (
												<p className="mt-1 text-danger">
													Payment Subject is required
												</p>
											)}
										</Grid>
										<Grid item lg={1} md={1} sm={12} xs={12}></Grid>

										<Grid item lg={2} md={2} sm={12} xs={12}>
											<CssTextField
												id="outlined-basic"
												label="Desc(Dia/Standard)"
												variant="outlined"
												type="text"
												onChange={(e) =>
													onChangeHandler(
														'desc',
														e.target.value,
														i
													)
												}
												size="small"
												value={ItemCounter[i].desc}
												className={classes.inputFieldStyle1}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
											/>
											{errors.paymentSubject?.type ===
												'required' && (
												<p className="mt-1 text-danger">
													Payment Subject is required
												</p>
											)}
										</Grid>
									</Grid>
									<Grid
										container
										spacing={1}
										style={{ marginTop: 15 }}
									>
										<Grid item lg={1} md={1} sm={12} xs={12}></Grid>

										<Grid item lg={2} md={2} sm={12} xs={12}>
											<CssTextField
												id="outlined-basic"
												label="Finished Pipe"
												variant="outlined"
												type="text"
												onChange={(e) =>
													onChangeHandler(
														'finishedPipe',
														e.target.value,
														i
													)
												}
												size="small"
												value={ItemCounter[i].finishedPipe}
												className={classes.inputFieldStyle1}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
											/>
											{errors.paymentSubject?.type ===
												'required' && (
												<p className="mt-1 text-danger">
													Payment Subject is required
												</p>
											)}
										</Grid>
										<Grid item lg={1} md={1} sm={12} xs={12}></Grid>

										<Grid item lg={2} md={2} sm={12} xs={12}>
											<CssTextField
												id="outlined-basic"
												label="Finished wt (kg)"
												variant="outlined"
												type="text"
												size="small"
												onChange={(e) =>
													onChangeHandler(
														'finishedWt',
														e.target.value,
														i
													)
												}
												value={ItemCounter[i].finishedWt}
												className={classes.inputFieldStyle1}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
											/>
											{errors.paymentSubject?.type ===
												'required' && (
												<p className="mt-1 text-danger">
													Payment Subject is required
												</p>
											)}
										</Grid>
										<Grid item lg={1} md={1} sm={12} xs={12}></Grid>

										<Grid item lg={2} md={2} sm={12} xs={12}>
											<CssTextField
												id="outlined-basic"
												label="R/Cyc Wt (kg)"
												variant="outlined"
												type="text"
												onChange={(e) =>
													onChangeHandler(
														'rcyc',
														e.target.value,
														i
													)
												}
												size="small"
												value={ItemCounter[i].rcyc}
												className={classes.inputFieldStyle1}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
											/>
											{errors.paymentSubject?.type ===
												'required' && (
												<p className="mt-1 text-danger">
													Payment Subject is required
												</p>
											)}
										</Grid>
										<Grid item lg={1} md={1} sm={12} xs={12}></Grid>

										<Grid item lg={2} md={2} sm={12} xs={12}>
											<CssTextField
												id="outlined-basic"
												label="Wastage Wt (kg)"
												variant="outlined"
												type="text"
												onChange={(e) =>
													onChangeHandler(
														'wastage',
														e.target.value,
														i
													)
												}
												size="small"
												value={ItemCounter[i].wastage}
												className={classes.inputFieldStyle1}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
											/>
											{errors.paymentSubject?.type ===
												'required' && (
												<p className="mt-1 text-danger">
													Payment Subject is required
												</p>
											)}
										</Grid>
									</Grid>
									<Grid
										container
										spacing={1}
										style={{ marginTop: 15 }}
									>
										<Grid item lg={1} md={1} sm={12} xs={12}></Grid>

										<Grid item lg={2} md={2} sm={12} xs={12}>
											<CssTextField
												id="outlined-basic"
												label="Total Weight(kg)"
												variant="outlined"
												onChange={(e) =>
													onChangeHandler(
														'totalWeight',
														e.target.value,
														i
													)
												}
												type="text"
												size="small"
												value={ItemCounter[i].totalWeight}
												className={classes.inputFieldStyle1}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
											/>
											{errors.paymentSubject?.type ===
												'required' && (
												<p className="mt-1 text-danger">
													Payment Subject is required
												</p>
											)}
										</Grid>
										<Grid item lg={1} md={1} sm={12} xs={12}></Grid>

										<Grid item lg={2} md={2} sm={12} xs={12}>
											<CssTextField
												id="outlined-basic"
												label="DownTime"
												variant="outlined"
												type="text"
												size="small"
												onChange={(e) =>
													onChangeHandler(
														'downTime',
														e.target.value,
														i
													)
												}
												value={ItemCounter[i].downTime}
												className={classes.inputFieldStyle1}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
											/>
											{errors.paymentSubject?.type ===
												'required' && (
												<p className="mt-1 text-danger">
													Payment Subject is required
												</p>
											)}
										</Grid>
										<Grid item lg={1} md={1} sm={12} xs={12}></Grid>
									</Grid>
								</>
							);
						})}
						<Grid container spacing={1}>
							<Grid item lg={3} md={3} sm={10} xs={11}>
								<Button
									variant="outlined"
									color="primary"
									className={classes.addButton}
									onClick={addMoreFunc}
									// style={{ marginLeft: 'auto', marginRight: 'auto' }}
								>
									Add More
								</Button>
							</Grid>
						</Grid>
						<Grid container spacing={1}>
							<Grid item lg={5} md={5} sm={10} xs={11}></Grid>
							<Grid item lg={3} md={3} sm={10} xs={11}>
								<Button
									variant="outlined"
									color="primary"
									type="submit"
									className={classes.addButton}
									onClick={() => {
										// history.push('/purchase/purchase_requisition/print_purchase_requisition')
									}}
									// style={{ marginLeft: 'auto', marginRight: 'auto' }}
								>
									Submit
								</Button>
							</Grid>
						</Grid>
					</Container>
				</form>
				{/* </form> */}
			</div>
			<div className={classes.dataTable}>
				<TableContainer className={classes.tableContainer}>
					<Table
						stickyHeader
						className="table table-dark"
						style={{
							backgroundColor: '#d0cfcf',
							border: '1px solid grey',
						}}
					>
						<TableHead>
							<TableRow hover role="checkbox">
								<StyledTableCell align="center">Sr.No</StyledTableCell>
								<StyledTableCell align="center">
									Machine Name
								</StyledTableCell>
								<StyledTableCell align="center">Code</StyledTableCell>
								<StyledTableCell align="center">Action</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{loading ? (
								<Loading />
							) : error ? (
								<MaterialError />
							) : productionReports.length ? (
								productionReports.map((productionReport, i) => (
									<StyledTableRow>
										<StyledTableCell
											className="text-dark bg-light"
											align="center"
										>
											{i + 1}
										</StyledTableCell>
										<StyledTableCell
											className="text-dark bg-light"
											align="center"
										>
											{productionReport.prNo}
										</StyledTableCell>
										<StyledTableCell
											className="text-dark bg-light"
											align="center"
										>
											{productionReport.date}
										</StyledTableCell>
										<StyledTableCell
											className="text-light bg-light"
											align="center"
										>
											<Button
												variant="contained"
												className="bg-dark text-light"
												size="small"
												// onClick={() => {
												// 	handleOpen(machine);
												// }}
												style={{ marginTop: 2 }}
											>
												Edit
											</Button>
											<Button
												variant="contained"
												color="secondary"
												size="small"
												// onClick={() => {
												// 	onDelete(machine._id);
												// }}
												style={{ marginLeft: 2, marginTop: 2 }}
											>
												Delete
											</Button>
										</StyledTableCell>
									</StyledTableRow>
								))
							) : (
								<h5>Not Found</h5>
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		</Sidenav>
	);
};

export default PurchaseReport;
