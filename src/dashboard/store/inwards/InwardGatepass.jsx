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
import Container from '@material-ui/core/Container';
import {
	createInwardGatePasses,
	getInwardGatePasses,
	deleteInwardGatePasses,
} from '../../../services/action/inwardGatePassAction';

import Loader from 'react-loader-spinner';
import Autocomplete from '../../../components/utils/AutoComplete';
import { getMaterialAction } from '../../../services/action/MaterialDataHandle';

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
	addMoreBtn: {
		backgroundColor: '#22A19A',
		color: 'whitesmoke',
		borderColor: '#22A19A',
		marginTop: '-2px',
		// padding: '1rem',
		'&:hover': {
			backgroundColor: '#22A19A',
			color: 'whitesmoke',
			borderColor: 'whitesmoke',
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

const initialValues = {
	inwardType: '',
	vehicleNo: '',
	through: '',
	dcNo: '',
	billNo: '',
	remarks: '',
};

const validationSchema = yup.object({
	inwardType: yup.string().required(),
	vehicleNo: yup.string().required(),
	through: yup.string().required(),
	dcNo: yup.string().required(),
	billNo: yup.string().required(),
	remarks: yup.string().required(),
});

const inwardTypes = [
	{
		name: 'Head Office',
		value: 'headOffice',
	},
];

const InwardGatepass = ({ history }) => {
	const [createLoading, setCreateLoading] = useState(false);
	const [createError, setCreateError] = useState(false);
	const [success, setSuccess] = useState(false);
	const [fetchLoading, setFetchLoading] = useState(true);
	const [fetchError, setFetchError] = useState('');
	const [open, setOpen] = useState(false);
	const [items, setItems] = useState([]);

	const classes = useStyles();

	const dispatch = useDispatch();

	const { inwardGatePasses } = useSelector((state) => state.inwardGatePasses);
	const { materials } = useSelector((state) => state.materials);

	useEffect(() => {
		dispatch(getMaterialAction());
		setFetchLoading(true);
		dispatch(
			getInwardGatePasses(null, (err) => {
				if (err) {
					setFetchError(err);
					setTimeout(() => {
						setFetchError('');
					}, 4000);
				}
				setFetchLoading(false);
			})
		);
	}, [dispatch]);

	const onSubmit = async (values) => {
		const tempItems = items.map((el) => el._id);
		values = {
			...values,
			items: tempItems,
		};
		setCreateLoading(true);
		dispatch(
			createInwardGatePasses(values, (err) => {
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
	};

	const handleClose = (props) => {};

	const handleOpen = async (product) => {
		setOpen(true);
	};

	const onDelete = (e) =>
		setItems(items.filter((el) => el._id !== e.target.dataset.my_id));

	return (
		<Sidenav title={'Inward Gate Pass'}>
			<div>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={onSubmit}
				>
					{(props) => (
						<>
							<Form>
								<Grid container spacing={1} style={{ marginTop: 15 }}>
									<Grid item lg={4} md={4} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="Inward Type"
											variant="outlined"
											type="text"
											size="small"
											select
											autoComplete="off"
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('inwardType')}
											onBlur={props.handleBlur('inwardType')}
											value={props.values.inwardType}
											helperText={
												props.touched.inwardType &&
												props.errors.inwardType
											}
											error={
												props.touched.inwardType &&
												props.errors.inwardType
											}
										>
											{inwardTypes?.map((el) => (
												<MenuItem key={el?.value} value={el?.value}>
													{el?.name}
												</MenuItem>
											))}
										</CssTextField>
									</Grid>
								</Grid>
								<Grid container spacing={1} style={{ marginTop: 15 }}>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="Vehicle No"
											variant="outlined"
											type="text"
											size="small"
											autoComplete="off"
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('vehicleNo')}
											onBlur={props.handleBlur('vehicleNo')}
											value={props.values.vehicleNo}
											helperText={
												props.touched.vehicleNo &&
												props.errors.vehicleNo
											}
											error={
												props.touched.vehicleNo &&
												props.errors.vehicleNo
											}
										/>
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="Through"
											variant="outlined"
											type="text"
											size="small"
											autoComplete="off"
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('through')}
											onBlur={props.handleBlur('through')}
											value={props.values.through}
											helperText={
												props.touched.through &&
												props.errors.through
											}
											error={
												props.touched.through &&
												props.errors.through
											}
										/>
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="Dc No"
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
											label="Bill No"
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
								</Grid>
							</Form>

							<Grid container spacing={1} style={{ marginTop: 15 }}>
								<Grid item lg={6} md={6} sm={12} xs={12}>
									<h6 class="mt-2">Enter Received Items:</h6>
									<Grid
										container
										spacing={1}
										style={{ marginTop: 15 }}
									>
										<Grid item lg={7} md={7} sm={12} xs={12}>
											<Autocomplete
												options={materials}
												label="name"
												onChange={(e) => {
													if (e) {
														const existedMaterial = items.find(
															(el) => el._id === e
														);
														if (!existedMaterial) {
															const material = materials.find(
																(el) => el._id === e
															);
															setItems([material, ...items]);
														}
													}
												}}
												style={{ width: '100%' }}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
												labelText="Select Item"
											/>
										</Grid>
									</Grid>
									{items?.map((el) => (
										<Grid
											container
											spacing={1}
											style={{ marginTop: '2rem' }}
										>
											<Grid item lg={6} md={6} sm={12} xs={12}>
												<CssTextField
													id="outlined-basic"
													label="Item"
													variant="outlined"
													disabled
													type="text"
													style={{ width: '100%' }}
													size="small"
													value={el.name}
													inputProps={{ style: { fontSize: 14 } }}
													InputLabelProps={{
														style: { fontSize: 14 },
													}}
												/>
											</Grid>
											<Grid item lg={6} md={6} sm={6} xs={6}>
												<Button
													variant="outlined"
													color="primary"
													style={{ marginLeft: '3px' }}
													classNames={classes.addMoreBtn}
													text="Delete"
													onClick={onDelete}
													btnProps={{
														[`data-my_id`]: el._id,
													}}
												/>
											</Grid>
										</Grid>
									))}
								</Grid>
							</Grid>
							<Form>
								<Grid
									container
									spacing={1}
									style={{ marginTop: '4rem' }}
								>
									<Grid item lg={4} md={4} sm={10} xs={11}>
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
								<Grid
									container
									spacing={1}
									style={{ marginTop: '4rem' }}
								>
									<Grid item lg={12} md={12} sm={10} xs={11}>
										<Button
											variant="outlined"
											color="primary"
											classNames={classes.addButton}
											loading={createLoading}
											loaderColor="#333"
											text="Submit"
										/>
										{createError && <p>{createError}</p>}
									</Grid>
								</Grid>
							</Form>
						</>
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
				) : inwardGatePasses?.length === 0 ? (
					<p>There is no data found.</p>
				) : (
					<table class="table table-responsive table-striped table-bordered border-dark text-center mt-3">
						<thead class="bg-dark text-light">
							<tr>
								<th>IGP No.</th>
								<th>Description</th>
								<th>Unit</th>
								<th>Qty</th>
								<th>Remarks</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{inwardGatePasses?.map((el) => (
								<tr>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td>
										<Button
											variant="contained"
											text="View"
											size="small"
											classNames="btn bg-dark text-light"
											onClick={() => {
												history.push(
													'/storedashboard/inwards/item_inward/print_inward_gatepass'
												);
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

export default InwardGatepass;
