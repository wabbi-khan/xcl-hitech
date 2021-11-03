import React, { useState, useEffect } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { MenuItem } from '@material-ui/core';
import Button from '../../../components/utils/Button';
import Autocomplete from '../../../components/utils/AutoComplete';
import {
	createInwards,
	getInwards,
	deleteInwards,
} from '../../../services/action/inwardAction';
import { getMaterialAction } from '../../../services/action/MaterialDataHandle';
import { fetchDepartmentsAction } from '../../../services/action/DepartmentAction';
import { fetchRequisitionAction } from '../../../services/action/PurchaseReqAction';
import Loader from 'react-loader-spinner';
import { withRouter } from 'react-router-dom';

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
	section: '',
	grNo: '',
	IGPNo: '',
	billNo: '',
	dcNo: '',
	pdNo: '',
};

const initialValues2 = {
	itemCode: '',
	itemName: '',
	partyName: '',
	minInv: '',
	isIndent: 'no',
	indentNo: '',
	inwardForDept: '',
	recQty: '',
	rate: '',
	amount: '',
	unit: '',
	remarks: '',
};

const validationSchema = yup.object({
	status: yup.string().required('Please provide status'),
	receivedFrom: yup.string().required('Please provide received from'),
	section: yup.string().required('Please provide section'),
	grNo: yup.string().required('Please provide GR No'),
	IGPNo: yup.string().required('Please provide IGP No'),
	billNo: yup.string().required('Please provide Bill no'),
	dcNo: yup.string().required('Please provide DC No'),
	pdNo: yup.string().required('Please provide PD No'),
});

const validationSchema2 = yup.object({
	itemCode: yup.string().required('Please provide Item Code'),
	partyName: yup.string().required('Please provide Party Name'),
	minInv: yup.string().required('Please provide Minimum Inventory Level'),
	isIndent: yup.string().required('Please provide indent'),
	indentNo: yup.string(),
	inwardForDept: yup.string().required('Please provide Inward For Dept'),
	unit: yup.string(),
	recQty: yup.string().required('Please provide Rec qty'),
	rate: yup.string().required('Please provide Rate'),
	amount: yup.string().required('Please provide amount'),
	remarks: yup.string().required('Please provide Remarks'),
});

const ItemInward = ({ history }) => {
	const [fetchLoading, setFetchLoading] = useState(true);
	const [fetchError, setFetchError] = useState('');
	const [createLoading, setCreateLoading] = useState(false);
	const [createError, setCreateError] = useState('');
	const [success, setSuccess] = useState('');
	const [deleteLoading, setDeleteLoading] = useState(false);
	const [deleteError, setDeleteError] = useState(false);
	const [open, setOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState({});
	const [selectedRequisition, setSelectedRequisition] = useState({});
	const [items, setItems] = useState();

	const classes = useStyles();

	const dispatch = useDispatch();

	let form1 = null;
	let form2 = null;

	const { inwards } = useSelector((state) => state.inwards);
	const { materials } = useSelector((state) => state.materials);
	const { purchaseRequisitions } = useSelector(
		(state) => state.purchaseRequisitions
	);
	const { departments } = useSelector((state) => state.departments);

	useEffect(() => {
		dispatch(fetchDepartmentsAction());
		dispatch(getMaterialAction());
		dispatch(fetchRequisitionAction());
		setFetchLoading(true);
		dispatch(
			getInwards(null, (err) => {
				if (err) {
					setFetchError(err);
					setTimeout(() => {
						setFetchError('');
					}, 4000);
				}
				setFetchLoading(false);
			})
		);
	}, []);

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
			dispatch(
				createInwards(values, (err) => {
					if (err) {
						setCreateError(err);
						setTimeout(() => {
							setCreateError('');
						}, 4000);
					} else {
						setSuccess('Category added successfully');
						setTimeout(() => {
							setSuccess('');
						}, 4000);
					}
					setCreateLoading(false);
				})
			);
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
		<Sidenav title={'Item Inward'}>
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
											label="Recieved From"
											variant="outlined"
											type="text"
											size="small"
											autoComplete="off"
											select
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('receivedFrom')}
											onBlur={props.handleBlur('receivedFrom')}
											value={props.values.receivedFrom}
											helperText={
												props.touched.receivedFrom &&
												props.errors.receivedFrom
											}
											error={
												props.touched.receivedFrom &&
												props.errors.receivedFrom
											}
										>
											<MenuItem value="local">Local</MenuItem>
										</CssTextField>
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="Section"
											variant="outlined"
											type="text"
											size="small"
											autoComplete="off"
											select
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('section')}
											onBlur={props.handleBlur('section')}
											value={props.values.section}
											helperText={
												props.touched.section &&
												props.errors.section
											}
											error={
												props.touched.section &&
												props.errors.section
											}
										>
											<MenuItem value="ring side">
												Ring Side
											</MenuItem>
										</CssTextField>
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="G.R.No."
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
											label="IGP No."
											variant="outlined"
											type="text"
											size="small"
											autoComplete="off"
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('IGPNo')}
											onBlur={props.handleBlur('IGPNo')}
											value={props.values.IGPNo}
											helperText={
												props.touched.IGPNo && props.errors.IGPNo
											}
											error={
												props.touched.IGPNo && props.errors.IGPNo
											}
										/>
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="Bill No."
											variant="outlined"
											type="text"
											size="small"
											autoComplete="off"
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('billNo')}
											onBlur={props.handleBlur('billNo')}
											value={props.values.billNo}
											helperText={
												props.touched.billNo && props.errors.billNo
											}
											error={
												props.touched.billNo && props.errors.billNo
											}
										/>
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="D.C No."
											variant="outlined"
											type="text"
											size="small"
											autoComplete="off"
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('dcNo')}
											onBlur={props.handleBlur('dcNo')}
											value={props.values.dcNo}
											helperText={
												props.touched.dcNo && props.errors.dcNo
											}
											error={props.touched.dcNo && props.errors.dcNo}
										/>
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="P.D. No."
											variant="outlined"
											type="text"
											size="small"
											autoComplete="off"
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('pdNo')}
											onBlur={props.handleBlur('pdNo')}
											value={props.values.pdNo}
											helperText={
												props.touched.pdNo && props.errors.pdNo
											}
											error={props.touched.pdNo && props.errors.pdNo}
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
								<Grid container spacing={1} style={{ marginTop: 15 }}>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<Autocomplete
											options={materials}
											label="name"
											onChange={(el) => {
												const material = materials.find(
													(el2) => el === el2._id
												);
												if (material) {
													setSelectedItem(material);
													props.setFieldValue('itemCode', el);
													props.setFieldValue(
														'itemName',
														material?.name
													);
													props.setFieldValue(
														'unit',
														material?.unit?.name
													);
												} else {
													setSelectedItem({});
													props.setFieldValue('itemCode', '');
													props.setFieldValue('itemName', '');
												}
											}}
											value={materials.find(
												(el) => el._id === props.values.itemCode
											)}
											onBlur={props.handleBlur('itemCode')}
											helperText={
												props.touched.itemCode &&
												props.errors.itemCode
											}
											error={
												props.touched.itemCode &&
												props.errors.itemCode
											}
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											labelText="Select Item"
										/>
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="Item Name"
											variant="outlined"
											type="text"
											size="small"
											disabled
											defaultValue=""
											autoComplete="off"
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('itemName')}
											value={props.values.itemName}
										/>
									</Grid>
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
											label="Min. Level"
											variant="outlined"
											type="number"
											size="small"
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
											label="Indent"
											variant="outlined"
											type="text"
											size="small"
											autoComplete="off"
											select
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('isIndent')}
											onBlur={props.handleBlur('isIndent')}
											value={props.values.isIndent}
											helperText={
												props.touched.isIndent &&
												props.errors.isIndent
											}
											error={
												props.touched.isIndent &&
												props.errors.isIndent
											}
										>
											<MenuItem value="yes">Yes</MenuItem>
											<MenuItem value="no">No</MenuItem>
										</CssTextField>
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<Autocomplete
											options={purchaseRequisitions}
											label="code"
											onChange={(el) => {
												const item = purchaseRequisitions.find(
													(el2) => el === el2._id
												);
												setSelectedRequisition(item);
												props.setFieldValue('indentNo', el);
											}}
											capitalized={false}
											value={purchaseRequisitions.find(
												(el) => el._id === props.values.indentNo
											)}
											onBlur={props.handleBlur('indentNo')}
											helperText={
												props.touched.indentNo &&
												props.errors.indentNo
											}
											disabled={
												props.values.isIndent === 'yes'
													? false
													: true
											}
											error={
												props.touched.indentNo &&
												props.errors.indentNo
											}
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											labelText="Select Indent No"
										/>
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<Autocomplete
											options={departments}
											label="name"
											onChange={props.handleChange('inwardForDept')}
											value={departments.find(
												(el) =>
													el._id === props.values.inwardForDept
											)}
											onBlur={props.handleBlur('inwardForDept')}
											helperText={
												props.touched.inwardForDept &&
												props.errors.inwardForDept
											}
											error={
												props.touched.inwardForDept &&
												props.errors.inwardForDept
											}
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											labelText="Select Inward Department"
										/>
									</Grid>
								</Grid>
								<div style={{ marginTop: 30, marginBottom: 30 }}>
									<hr />
								</div>

								<Grid container spacing={1} style={{ marginTop: 15 }}>
									<Grid item lg={2} md={2} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="Unit"
											variant="outlined"
											type="text"
											size="small"
											disabled
											defaultValue=""
											autoComplete="off"
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('unit')}
											onBlur={props.handleBlur('unit')}
											value={props.values.unit}
											helperText={
												props.touched.unit && props.errors.unit
											}
											error={props.touched.unit && props.errors.unit}
										/>
									</Grid>
									<Grid item lg={2} md={2} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="Rec. Qty."
											variant="outlined"
											type="number"
											size="small"
											autoComplete="off"
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={(e) => {
												props.setFieldValue(
													'recQty',
													e.target.value
												);
												props.setFieldValue(
													'amount',
													+e.target.value * +props.values.rate
												);
											}}
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
									<Grid item lg={2} md={2} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="Rate"
											variant="outlined"
											type="number"
											size="small"
											autoComplete="off"
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={(e) => {
												props.setFieldValue('rate', e.target.value);
												props.setFieldValue(
													'amount',
													+e.target.value * +props.values.recQty
												);
											}}
											onBlur={props.handleBlur('rate')}
											value={props.values.rate}
											helperText={
												props.touched.rate && props.errors.rate
											}
											error={props.touched.rate && props.errors.rate}
										/>
									</Grid>
									<Grid item lg={2} md={2} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="Amount"
											variant="outlined"
											type="number"
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
									<Grid item lg={2} md={2} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="Current Balance"
											variant="outlined"
											type="number"
											size="small"
											autoComplete="off"
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
										/>
									</Grid>
								</Grid>
								<div style={{ marginTop: 30, marginBottom: 30 }}>
									<hr />
								</div>

								<Grid container spacing={1} style={{ marginTop: 15 }}>
									<Grid item lg={4} md={3} sm={12} xs={12}>
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
				) : inwards?.length === 0 ? (
					<p>There is no data found.</p>
				) : (
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
							{inwards?.map((el, i) => (
								<tr>
									<td>{i + 1}</td>
									<td>{el?.itemCode?.code}</td>
									<td>{el?.itemCode?.name}</td>
									<td>{el?.billNo}</td>
									<td>{el?.dcNo}</td>
									<td>{el?.IGPNo}</td>
									<td>{el?.itemCode?.unit?.name}</td>
									<td>{el?.rate}</td>
									<td>{el?.recQty}</td>
									<td>{el?.partyName}</td>
									<td>{el?.inwardForDept?.name}</td>
									<td>{el?.amount}</td>
									<td>0</td>
									<td>{el?.remarks}</td>
									<td>
										<Button
											variant="contained"
											text="View"
											size="small"
											classNames="btn bg-dark text-light"
											onClick={() => {
												history.push({
													pathname:
														'/storedashboard/inwards/item_inward/print_inward_item',
													state: { inward: el },
												});
											}}
										/>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		</Sidenav>
	);
};

export default withRouter(ItemInward);
