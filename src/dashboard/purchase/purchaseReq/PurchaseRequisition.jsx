import React, { useState, useEffect } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { getMaterialAction } from '../../../services/action/MaterialDataHandle';
// import axios from 'axios';
import { fetchDepartmentsAction } from '../../../services/action/DepartmentAction';
import { createPurchaseReqAction } from '../../../services/action/PurchaseReqAction';
import Button from '../../../components/utils/Button';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { capitalize } from '../../../utils/capitalize';
import Autocomplete from '../../../components/utils/AutoComplete';
import RefreshButton from '../../../components/utils/RefreshButton';

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
			marginLeft: 170,
			marginTop: -7,
		},
		[theme.breakpoints.down('sm')]: {
			marginTop: -10,
		},
	},
	deleteRowBtn: {
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

const initialValues = {
	department: '',
	purpose: '',
};

const validationSchema = yup.object({
	department: yup.string().required(),
	purpose: yup.string().required(),
});

const initialValuesForItems = {
	material: '',
	quantity: '',
	unitValue: '',
	remarks: '',
};

const validationSchemaForItems = yup.object({
	material: yup.string().required(),
	quantity: yup.number().required(),
	unitValue: yup.string(),
	remarks: yup.string().required(),
});

const PurchaseRequisition = ({ history }) => {
	const classes = useStyles();
	const [items, setItems] = useState([]);
	const [createLoading, setCreateLoading] = React.useState(false);
	const [error, setError] = React.useState('');
	const [success, setSuccess] = React.useState('');
	const [selectedMaterial, setSelectedMaterial] = React.useState('');
	const [isEditMode, setIsEditMode] = React.useState(false);
	const [initialValuesStateForItem, setInitialValuesStateForItem] =
		React.useState({
			...initialValuesForItems,
		});
	const [editIndex, setEditIndex] = React.useState('');
	const [fetchLoading, setFetchLoading] = React.useState(false);

	let form = null;

	React.useEffect(() => {
		if (selectedMaterial) {
			setInitialValuesStateForItem({
				...form?.values,
				unitValue: selectedMaterial?.unit?.name,
			});
		}
	}, [selectedMaterial]);

	const addItems = (values, actions) => {
		setItems([...items, values]);
		actions.resetForm({
			values: { ...initialValuesForItems },
		});
	};

	const onEdit = (i, item) => {
		setIsEditMode(true);
		setEditIndex(i);
		setInitialValuesStateForItem({
			...item,
		});
	};

	const onDelete = (i) => {
		const temp = [...items];
		temp.splice(i, 1);
		setItems(temp);
	};

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getMaterialAction());
		dispatch(fetchDepartmentsAction());
	}, [dispatch]);

	const { materials } = useSelector((state) => state.materials);
	const { departments } = useSelector((state) => state.departments);

	const onSubmit = async (values) => {
		if (items.length > 0) {
			setCreateLoading(true);
			dispatch(
				createPurchaseReqAction({ ...values, materials: items }, (err) => {
					if (err) {
						setError(err);
						setTimeout(() => {
							setError('');
						}, 4000);
					} else {
						setSuccess('Successfully requested');
						setTimeout(() => {
							setSuccess('');
						}, 4000);
					}
					setCreateLoading(false);
				})
			);
		} else {
			setError('Must add atleast one item to the request');
			setTimeout(() => {
				setError('');
			}, 4000);
		}
	};

	const onEditSubmit = (values, actions) => {
		setItems((items) =>
			items.map((el, i) => (i === editIndex ? values : el))
		);
		setIsEditMode(false);
		actions.resetForm({
			values: { ...initialValuesForItems },
		});
	};

	const fetchingMaterials = async () => {
		await dispatch(getMaterialAction());
	};

	const reFetch = async () => {
		setFetchLoading(true);
		fetchingMaterials().then(() => {
			setFetchLoading(false);
		});
	};

	return (
		<Sidenav title={'Purchase Requisition'}>
			<RefreshButton onClick={reFetch} loading={fetchLoading} />
			<div>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={onSubmit}
				>
					{(props) => (
						<>
							<Form autoComplete="off">
								<Container className={classes.mainContainer}>
									<Grid
										container
										spacing={1}
										style={{ marginTop: 15 }}
									>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<Autocomplete
												options={departments}
												label="name"
												onChange={props.handleChange('department')}
												value={
													departments.find(
														(el) =>
															el._id === props.values.department
													)
														? departments.find(
																(el) =>
																	el._id ===
																	props.values.department
														  )
														: ''
												}
												onBlur={props.handleBlur('department')}
												helperText={
													props.touched.department &&
													props.errors.department
												}
												error={
													props.touched.department &&
													props.errors.department
												}
												style={{ width: '100%' }}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
												labelText="Select Department"
											/>
										</Grid>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<CssTextField
												id="outlined-basic"
												label="Purpose"
												variant="outlined"
												type="text"
												size="small"
												style={{ width: '100%' }}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
												onChange={props.handleChange('purpose')}
												onBlur={props.handleBlur('purpose')}
												value={props.values.purpose}
												helperText={
													props.touched.purpose &&
													props.errors.purpose
												}
												error={
													props.touched.purpose &&
													props.errors.purpose
												}
											/>
										</Grid>
									</Grid>
								</Container>
							</Form>
							<div style={{ marginTop: 30, marginBottom: 30 }}>
								<hr />
							</div>

							<Container className={classes.mainContainer}>
								<h4 className="text-left">Items</h4>
								<Formik
									initialValues={initialValuesStateForItem}
									validationSchema={validationSchemaForItems}
									enableReinitialize
									onSubmit={isEditMode ? onEditSubmit : addItems}
								>
									{(props) => {
										form = props;
										return (
											<Form autoComplete="off">
												<Grid
													container
													spacing={1}
													style={{ marginTop: 15 }}
												>
													<Grid item lg={3} md={3} sm={12} xs={12}>
														<Autocomplete
															options={materials}
															label="name"
															label2="code"
															onChange={(e) => {
																const item = materials.find(
																	(el) => el._id === e
																);
																if (item) {
																	setSelectedMaterial(item);
																} else {
																	setSelectedMaterial('');
																}
																props.setFieldValue(
																	'material',
																	e
																);
															}}
															value={
																materials.find(
																	(el) =>
																		el._id ===
																		props.values.material
																)
																	? materials.find(
																			(el) =>
																				el._id ===
																				props.values
																					.material
																	  )
																	: ''
															}
															onBlur={props.handleBlur(
																'material'
															)}
															helperText={
																props.touched.material &&
																props.errors.material
															}
															error={
																props.touched.material &&
																props.errors.material
															}
															style={{ width: '100%' }}
															inputProps={{
																style: { fontSize: 14 },
															}}
															InputLabelProps={{
																style: { fontSize: 14 },
															}}
															labelText="Select Item"
														/>
													</Grid>
													<Grid item lg={3} md={3} sm={12} xs={12}>
														<CssTextField
															id="outlined-basic"
															label="Quantity"
															variant="outlined"
															type="number"
															style={{ width: '100%' }}
															size="small"
															inputProps={{
																style: { fontSize: 14 },
															}}
															InputLabelProps={{
																style: { fontSize: 14 },
															}}
															onChange={props.handleChange(
																'quantity'
															)}
															onBlur={props.handleBlur(
																'quantity'
															)}
															value={props.values.quantity}
															helperText={
																props.touched.quantity &&
																props.errors.quantity
															}
															error={
																props.touched.quantity &&
																props.errors.quantity
															}
														/>
													</Grid>
													<Grid item lg={3} md={3} sm={12} xs={12}>
														<CssTextField
															id="outlined-basic"
															label="Unit Value"
															variant="outlined"
															type="text"
															disabled
															size="small"
															style={{ width: '100%' }}
															inputProps={{
																style: { fontSize: 14 },
															}}
															InputLabelProps={{
																style: { fontSize: 14 },
															}}
															onChange={props.handleChange(
																'unitValue'
															)}
															onBlur={props.handleBlur(
																'unitValue'
															)}
															value={props.values.unitValue}
															helperText={
																props.touched.unitValue &&
																props.errors.unitValue
															}
															error={
																props.touched.unitValue &&
																props.errors.unitValue
															}
														/>
													</Grid>
													<Grid item lg={3} md={3} sm={12} xs={12}>
														<CssTextField
															id="outlined-basic"
															label="Remarks"
															variant="outlined"
															type="text"
															style={{ width: '100%' }}
															size="small"
															inputProps={{
																style: { fontSize: 14 },
															}}
															InputLabelProps={{
																style: { fontSize: 14 },
															}}
															onChange={props.handleChange(
																'remarks'
															)}
															onBlur={props.handleBlur(
																'remarks'
															)}
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
													<Grid
														item
														lg={12}
														md={12}
														sm={10}
														xs={11}
													>
														<Button
															variant="outlined"
															color="primary"
															classNames={classes.addButton}
															text={isEditMode ? 'Edit' : 'Add'}
														/>
													</Grid>
												</Grid>
											</Form>
										);
									}}
								</Formik>
								{items.map((el, i) => (
									<Grid
										key={i}
										container
										spacing={1}
										style={{ marginTop: '2rem' }}
									>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<CssTextField
												id="outlined-basic"
												label="Select Item"
												variant="outlined"
												type="text"
												size="small"
												select
												disabled
												style={{ width: '100%' }}
												value={el?.material}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
											>
												{!materials || !materials.length ? (
													<MenuItem>
														Please Select Vendor Name
													</MenuItem>
												) : (
													materials.map((el) => (
														<MenuItem
															value={el._id}
															key={el._id}
															onClick={() =>
																setSelectedMaterial(el)
															}
														>
															{capitalize(el.name)}
														</MenuItem>
													))
												)}
											</CssTextField>
										</Grid>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<CssTextField
												id="outlined-basic"
												label="Quantity"
												variant="outlined"
												disabled
												type="number"
												style={{ width: '100%' }}
												size="small"
												value={el.quantity}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
											/>
										</Grid>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<CssTextField
												id="outlined-basic"
												label="Unit Value"
												variant="outlined"
												type="text"
												disabled
												size="small"
												style={{ width: '100%' }}
												value={el?.unitValue}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
											/>
										</Grid>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<CssTextField
												id="outlined-basic"
												label="Remarks"
												variant="outlined"
												type="text"
												style={{ width: '100%' }}
												size="small"
												disabled
												value={el.remarks}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
											/>
										</Grid>
										<Grid item lg={12} md={12} sm={12} xs={12}>
											<div
												style={{
													display: 'flex',
													justifyContent: 'center',
												}}
											>
												<Button
													variant="outlined"
													color="primary"
													classNames={classes.addButton}
													text="Edit"
													onClick={() => onEdit(i, el)}
												/>
												<Button
													variant="outlined"
													color="primary"
													classNames={classes.addButton}
													text="Delete"
													onClick={() => onDelete(i)}
												/>
											</div>
										</Grid>
									</Grid>
								))}

								<Form>
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
											{success && <p>{success}</p>}
											{error && <p>{error}</p>}
										</Grid>
									</Grid>
								</Form>
							</Container>
						</>
					)}
				</Formik>
			</div>
		</Sidenav>
	);
};

export default PurchaseRequisition;
