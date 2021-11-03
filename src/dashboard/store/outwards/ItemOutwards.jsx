import React, { useState } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { useDispatch } from 'react-redux';
import { MenuItem } from '@material-ui/core';
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
		marginTop: 20,
	},
	addButton: {
		marginTop: 40,
		backgroundColor: '#22A19A',
		color: 'whitesmoke',
		borderColor: '#22A19A',
		fontWeight: 'bold',
		width: '10%',
		'&:hover': {
			color: '#22A19A',
			borderColor: '#22A19A',
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

const statusOptions = [
	{
		value: 'receive',
		name: 'Receive',
	},
	{
		value: 'notReceive',
		name: 'Not Receive',
	},
];

const initialValues = {
	status: 'receive',
	receivedFrom: 'local',
	issueSide: '',
	grNo: '',
	DSR: '',
	dept: '',
	itemName: '',
	itemCode: '',
	partyName: '',
	minInv: '',
};

const initialValues2 = {
	unit: '',
	issueQty: '',
	rate: '',
	amount: '',
	balance: 'no',
	reply: '',
	recQty: '',
	mcName: '',
	mcNo: '',
	remarks: '',
};

const validationSchema = yup.object({
	status: yup.string().required('Please provide status'),
	receivedFrom: yup.string().required('Please provide received from'),
	issueSide: yup.string().required('Please provide issueSide'),
	grNo: yup.string().required('Please provide GR No'),
	DSR: yup.string().required('Please provide D.S.R'),
	dept: yup.string().required('Please select department'),
	itemName: yup.string().required('Please provide Item Name'),
	itemCode: yup.string().required('Please provide Item Code'),
	partyName: yup.string().required('Please provide Party Name'),
	minInv: yup.string().required('Please provide Minimum Inventory Level'),
});

const validationSchema2 = yup.object({
	unit: yup.string(),
	issueQty: yup.string().required('Please provide Issue Qty'),
	rate: yup.string().required('Please provide Rate'),
	amount: yup.string().required('Please provide Amount'),
	balance: yup.string().required('Please provide Balance'),
	reply: yup.string().required('Please provide Reply'),
	recQty: yup.string().required('Please provide Reply qty'),
	mcName: yup.string().required('Please provide M/C Name'),
	mcNo: yup.string().required('Please provide M/C No.'),
	remarks: yup.string().required('Please provide Remarks'),
});

const ItemOutwards = ({ history }) => {
	const [createLoading, setCreateLoading] = useState(false);
	const [createError, setCreateError] = useState('');
	const [open, setOpen] = useState(false);

	const classes = useStyles();

	const dispatch = useDispatch();

	let form1 = null;
	let form2 = null;

	function isEmpty(obj) {
		for (var x in obj) {
			if (obj.hasOwnProperty(x)) return false;
		}
		return true;
	}

	const onSubmit = async (values) => {
		const form1Errors = await form1.validateForm();
		form1.setTouched(form1Errors);
		const form2Errors = await form2.validateForm();
		form2.setTouched(form2Errors);

		values = {
			...form1.values,
			...form2.values,
		};
		if (isEmpty(form1Errors) && isEmpty(form2Errors)) {
			setCreateLoading(true);
			dispatch();
			// createInwards(values, (err) => {
			//     if (err) {
			//         setCreateError(err);
			//         setTimeout(() => {
			//             setCreateError("");
			//         }, 4000);
			//     } else {
			//         setSuccess("Outward Item added successfully");
			//         setTimeout(() => {
			//             setSuccess("");
			//         }, 4000);
			//     }
			//     setCreateLoading(false);
			// })
		}
	};

	const handleClose = (props) => {
		// setOpen(props);
	};

	const handleOpen = async (product) => {
		// setproduct(product);
		setOpen(true);
	};

	return (
		<Sidenav title={'Outward Item'}>
			<div>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
				>
					{(props) => {
						form1 = props;
						return (
							<Form>
								<Grid container spacing={1} style={{ marginTop: 15 }}>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="Status"
											variant="outlined"
											type="text"
											size="small"
											autoComplete="off"
											select
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('status')}
											onBlur={props.handleBlur('status')}
											value={props.values.status}
											helperText={
												props.touched.status && props.errors.status
											}
											error={
												props.touched.status && props.errors.status
											}
										>
											{statusOptions.map((el) => (
												<MenuItem key={el.value} value={el.value}>
													{el.name}
												</MenuItem>
											))}
										</CssTextField>
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="G.R.No.  "
											variant="outlined"
											type="text"
											size="small"
											autoComplete="off"
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('grNo')}
											onBlur={props.handleBlur('grNo')}
											value={props.values.grNo}
											helperText={
												props.touched.grNo && props.errors.grNo
											}
											error={props.touched.grNo && props.errors.grNo}
										/>
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											// label="Date"
											variant="outlined"
											type="date"
											size="small"
											autoComplete="off"
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											// InputLabelProps={{ style: { fontSize: 14 } }}
											// onChange={props.handleChange("receivedFrom")}
											// onBlur={props.handleBlur("receivedFrom")}
											// value={props.values.receivedFrom}
											// helperText={
											//     props.touched.receivedFrom && props.errors.receivedFrom
											// }
											// error={
											//     props.touched.receivedFrom && props.errors.receivedFrom
											// }
										/>
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="Issue Side"
											variant="outlined"
											type="text"
											size="small"
											autoComplete="off"
											select
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('issueSide')}
											onBlur={props.handleBlur('issueSide')}
											value={props.values.issueSide}
											helperText={
												props.touched.issueSide &&
												props.errors.issueSide
											}
											error={
												props.touched.issueSide &&
												props.errors.issueSide
											}
										>
											<MenuItem value="">Yes</MenuItem>
										</CssTextField>
									</Grid>
								</Grid>
								<Grid container spacing={1} style={{ marginTop: 10 }}>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="D.S.R."
											variant="outlined"
											type="text"
											size="small"
											autoComplete="off"
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('DSR')}
											onBlur={props.handleBlur('DSR')}
											value={props.values.DSR}
											helperText={
												props.touched.DSR && props.errors.DSR
											}
											error={props.touched.DSR && props.errors.DSR}
										/>
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="Department"
											variant="outlined"
											type="text"
											size="small"
											select
											autoComplete="off"
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('dept')}
											onBlur={props.handleBlur('dept')}
											value={props.values.dept}
											helperText={
												props.touched.dept && props.errors.dept
											}
											error={props.touched.dept && props.errors.dept}
										>
											<MenuItem value=""></MenuItem>
										</CssTextField>
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="Item Name"
											variant="outlined"
											type="text"
											size="small"
											select
											autoComplete="off"
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('itemName')}
											onBlur={props.handleBlur('itemName')}
											value={props.values.itemName}
											helperText={
												props.touched.itemName &&
												props.errors.itemName
											}
											error={
												props.touched.itemName &&
												props.errors.itemName
											}
										>
											<MenuItem value=""></MenuItem>
										</CssTextField>
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="Item Code"
											variant="outlined"
											type="text"
											size="small"
											disabled
											autoComplete="off"
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('itemCode')}
											onBlur={props.handleBlur('itemCode')}
											value={props.values.itemCode}
											helperText={
												props.touched.itemCode &&
												props.errors.itemCode
											}
											error={
												props.touched.itemCode &&
												props.errors.itemCode
											}
										/>
									</Grid>
								</Grid>
								<Grid container spacing={1} style={{ marginTop: 10 }}>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="Party Name"
											variant="outlined"
											type="text"
											size="small"
											autoComplete="off"
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('partyName')}
											onBlur={props.handleBlur('partyName')}
											value={props.values.partyName}
											helperText={
												props.touched.partyName &&
												props.errors.partyName
											}
											error={
												props.touched.partyName &&
												props.errors.partyName
											}
										/>
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="Min Inventory Level"
											variant="outlined"
											type="text"
											size="small"
											disabled
											autoComplete="off"
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('minInv')}
											onBlur={props.handleBlur('minInv')}
											value={props.values.minInv}
											helperText={
												props.touched.minInv && props.errors.minInv
											}
											error={
												props.touched.minInv && props.errors.minInv
											}
										/>
									</Grid>
								</Grid>
							</Form>
						);
					}}
				</Formik>

				<Formik
					initialValues={initialValues2}
					validationSchema={validationSchema2}
				>
					{(props) => {
						form2 = props;
						return (
							<Form>
								<Grid container spacing={1} style={{ marginTop: 10 }}>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="Unit"
											variant="outlined"
											type="text"
											size="small"
											disabled
											autoComplete="off"
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('minInv')}
											onBlur={props.handleBlur('minInv')}
											value={props.values.minInv}
											helperText={
												props.touched.minInv && props.errors.minInv
											}
											error={
												props.touched.minInv && props.errors.minInv
											}
										/>
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="Issue Quantity"
											variant="outlined"
											type="text"
											size="small"
											autoComplete="off"
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('issueQty')}
											onBlur={props.handleBlur('issueQty')}
											value={props.values.issueQty}
											helperText={
												props.touched.issueQty &&
												props.errors.issueQty
											}
											error={
												props.touched.issueQty &&
												props.errors.issueQty
											}
										/>
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="Rate"
											variant="outlined"
											type="text"
											size="small"
											autoComplete="off"
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('rate')}
											onBlur={props.handleBlur('rate')}
											value={props.values.rate}
											helperText={
												props.touched.rate && props.errors.rate
											}
											error={props.touched.rate && props.errors.rate}
										/>
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="Amount"
											variant="outlined"
											type="text"
											size="small"
											autoComplete="off"
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('amount')}
											onBlur={props.handleBlur('amount')}
											value={props.values.amount}
											helperText={
												props.touched.amount && props.errors.amount
											}
											error={
												props.touched.amount && props.errors.amount
											}
										/>
									</Grid>
								</Grid>
								<Grid container spacing={1} style={{ marginTop: 10 }}>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="Balance"
											variant="outlined"
											type="text"
											size="small"
											autoComplete="off"
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('balance')}
											onBlur={props.handleBlur('balance')}
											value={props.values.balance}
											helperText={
												props.touched.balance &&
												props.errors.balance
											}
											error={
												props.touched.balance &&
												props.errors.balance
											}
										/>
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="Reply"
											variant="outlined"
											type="text"
											size="small"
											select
											autoComplete="off"
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('reply')}
											onBlur={props.handleBlur('reply')}
											value={props.values.reply}
											helperText={
												props.touched.reply && props.errors.reply
											}
											error={
												props.touched.reply && props.errors.reply
											}
										>
											<MenuItem value="">Yes</MenuItem>
											<MenuItem value="">No</MenuItem>
										</CssTextField>
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="Reply Qty"
											variant="outlined"
											type="text"
											size="small"
											autoComplete="off"
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('recQty')}
											onBlur={props.handleBlur('recQty')}
											value={props.values.recQty}
											helperText={
												props.touched.recQty && props.errors.recQty
											}
											error={
												props.touched.recQty && props.errors.recQty
											}
										/>
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="M/C Name"
											variant="outlined"
											type="text"
											size="small"
											autoComplete="off"
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('mcName')}
											onBlur={props.handleBlur('mcName')}
											value={props.values.mcName}
											helperText={
												props.touched.mcName && props.errors.mcName
											}
											error={
												props.touched.mcName && props.errors.mcName
											}
										/>
									</Grid>
								</Grid>
								<Grid container spacing={1} style={{ marginTop: 10 }}>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="M/C No."
											variant="outlined"
											type="text"
											size="small"
											autoComplete="off"
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('mcNo')}
											onBlur={props.handleBlur('mcNo')}
											value={props.values.mcNo}
											helperText={
												props.touched.mcNo && props.errors.mcNo
											}
											error={props.touched.mcNo && props.errors.mcNo}
										/>
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
											onChange={props.handleChange('remarks')}
											onBlur={props.handleBlur('remarks')}
											value={props.values.remarks}
											helperText={
												props.touched.remarks &&
												props.errors.remarks
											}
											error={
												props.touched.remarks &&
												props.errors.remarks
											}
										/>
									</Grid>
								</Grid>
							</Form>
						);
					}}
				</Formik>

				<div>
					<Button
						variant="outlined"
						color="primary"
						loading={createLoading}
						loaderColor="#333"
						text="Add"
						classNames={classes.addButton}
						onClick={onSubmit}
					/>
					{createError && <p>{createError}</p>}
				</div>

				{/* {
                    fetchLoading ? (
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginTop: "3rem",
                            }}
                        >
                            <Loader type="TailSpin" color="#000" width="3rem" height="3rem" />
                        </div>
                    ) : inwards?.length === 0 ? (
                        <p>No Data Found.</p>
                    ) : ( */}
				<table class="table table-responsive table-striped table-bordered border-dark text-center mt-3">
					<thead class="bg-dark text-light">
						<tr>
							<th>S.No.</th>
							<th>Item Code</th>
							<th>Item Name</th>
							<th>BILL NO</th>
							<th>DC NO</th>
							<th>IGP NO</th>
							<th>Unit</th>
							<th>Rate</th>
							<th>Qty</th>
							<th>Received From</th>
							<th>Dept.</th>
							<th>Amount</th>
							<th>Balance</th>
							<th>Remarks</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{/* {inwards?.map((el, i) => ( */}
						<tr>
							<td>{/* {i + 1} */}</td>
							<td>{/* {el?.itemCode?.code} */}</td>
							<td>{/* {el?.itemCode?.name} */}</td>
							<td>{/* {el?.billNo} */}</td>
							<td>{/* {el?.dcNo} */}</td>
							<td>{/* {el?.IGPNo} */}</td>
							<td>{/* {el?.itemCode?.unit?.name} */}</td>
							<td>{/* {el?.rate} */}</td>
							<td>{/* {el?.recQty} */}</td>
							<td>{/* {el?.partyName} */}</td>
							<td>{/* {el?.inwardForDept?.name} */}</td>
							<td>{/* {el?.amount} */}</td>
							<td>{/* 0 */}</td>
							<td>{/* {el?.remarks} */}</td>
							<td>
								<Button
									variant="contained"
									text="View"
									size="small"
									classNames="btn bg-dark text-light"
									onClick={() => {
										history.push(
											'/storedashboard/inwards/item_inward/print_inward_item'
										);
									}}
								/>
							</td>
						</tr>
						))
					</tbody>
				</table>
				{/* )
                } */}
			</div>
		</Sidenav>
	);
};

export default ItemOutwards;
