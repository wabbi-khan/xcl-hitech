import React, { useEffect, useState } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import MenuItem from '@material-ui/core/MenuItem';
import {
	getVendorAction,
	createVendorAction,
	deleteVendorAction,
} from '../../../services/action/VendorAction';
import { getMaterialCategoryAction } from '../../../services/action/MatCategoryAction';
import { getMaterialAction } from '../../../services/action/MaterialDataHandle';
import { getSubCategories } from '../../../services/action/subCategoryAction';
import FormGroup from '@material-ui/core/FormGroup';
import EditVendor from './EditVendor';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import Button from '../../../components/utils/Button';
import Loader from 'react-loader-spinner';
import { capitalize } from '../../../utils/capitalize';
import Autocomplete from '../../../components/utils/AutoComplete';

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
		marginTop: 20,
		color: '#22A19A',
		borderColor: '#22A19A',
		fontWeight: 'bold',
		'&:hover': {
			border: 'none',
			backgroundColor: '#22A19A',
			color: 'whitesmoke',
		},
		[theme.breakpoints.up('md')]: {
			width: '15%',
		},
		[theme.breakpoints.down('sm')]: {
			width: '30%',
		},
	},
	table: {
		minWidth: 600,
	},
	tableContainer: {
		marginTop: 10,
	},
	dataTable: {
		marginTop: 40,
	},
	ckeckBox: {
		[theme.breakpoints.up('md')]: {
			marginLeft: 7,
		},
		[theme.breakpoints.down('sm')]: {
			marginLeft: 0,
		},
	},
	inputFieldStyle: {
		// boxShadow: '0.4px 0.4px 0.4px 0.4px grey',
		// borderRadius: 5,
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
			marginLeft: 5,
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

const initialValues = {
	name: '',
	email: '',
	phone: '',
	location: '',
	category: '',
	subCategory: '',
	contactPerson: '',
};

const validationSchema = yup.object({
	name: yup.string().required(),
	email: yup.string().required().email(),
	phone: yup.string().required(),
	location: yup.string().required(),
	category: yup.string().required(),
	subCategory: yup.string(),
	contactPerson: yup.string().required(),
});

const Vendors = () => {
	const [materialsState, setMaterialsState] = useState([]);
	const [vendor, setVendor] = useState();
	const [selectedCategory, setSelectedCategory] = useState('');
	const [selectedSubCategory, setSelectedSubCategory] = useState('');
	const [open, setOpen] = useState(false);
	const [fetchLoading, setFetchLoading] = React.useState(true);
	const [fetchError, setFetchError] = React.useState('');
	const [createLoading, setCreateLoading] = React.useState(false);
	const [createError, setCreateError] = React.useState('');
	const [success, setSuccess] = React.useState('');
	const [deleteLoading, setDeleteLoading] = React.useState(false);
	const [deleteError, setDeleteError] = React.useState('');
	const [initialValuesState, setInitialValuesState] = React.useState({
		...initialValues,
	});

	let form = null;

	const { vendors } = useSelector((state) => state.vendors);
	const { categories } = useSelector((state) => state.categories);
	const { materials } = useSelector((state) => state.materials);
	const { subCategories } = useSelector((state) => state.subCategories);

	const classes = useStyles();

	const dispatch = useDispatch();

	useEffect(() => {
		if (selectedCategory) {
			dispatch(getSubCategories(`parent=${selectedCategory}`));
			setInitialValuesState((prev) => {
				return {
					...form.values,
					category: selectedCategory,
					subCategory: undefined,
				};
			});
			setSelectedSubCategory('');
		}
	}, [selectedCategory]);

	useEffect(() => {
		dispatch(
			getMaterialAction(
				`${selectedCategory ? `category=${selectedCategory}` : ''}${
					selectedSubCategory ? `&subCategory=${selectedSubCategory}` : ''
				}`
			)
		);
	}, [selectedCategory, selectedSubCategory]);

	useEffect(() => {
		setFetchLoading(true);
		dispatch(
			getVendorAction(null, (err) => {
				if (err) {
					setFetchError(err);
					setTimeout(() => {
						setFetchError('');
					}, 4000);
				}
				setFetchLoading(false);
			})
		);
		dispatch(getMaterialCategoryAction());
	}, [dispatch]);

	const getMaterials = async (event, material) => {
		if (event.target.checked) {
			setMaterialsState([...materialsState, material]);
		}
		if (event.target.checked === false) {
			setMaterialsState(
				materialsState.filter((value) => value._id !== material._id)
			);
		}
	};

	const onSubmit = (values) => {
		values.materials = materialsState;
		setCreateLoading(true);
		dispatch(
			createVendorAction(values, (err) => {
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
					form.resetForm({
						values: {
							...initialValues,
						},
					});
					setMaterialsState([]);
					setSelectedCategory('');
					setSelectedSubCategory('');
				}
				setCreateLoading(false);
			})
		);
	};

	const deleteVendor = (params) => {
		setDeleteLoading(true);
		dispatch(
			deleteVendorAction(params, (err) => {
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

	const handleClose = (props) => {
		setOpen(props);
	};

	const handleOpen = (vendor) => {
		setOpen(true);
		setVendor(vendor);
	};

	return (
		<Sidenav title={'Vendors'}>
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
						initialValues={initialValuesState}
						enableReinitialize
						validationSchema={validationSchema}
						onSubmit={onSubmit}
					>
						{(props) => {
							form = props;
							return (
								<Form autocomplete="off">
									<Grid container spacing={1}>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<CssTextField
												id="outlined-basic"
												label="Enter Vendor Name"
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
												onChange={props.handleChange('name')}
												onBlur={props.handleBlur('name')}
												value={props.values.name}
												helperText={
													props.touched.name && props.errors.name
												}
												error={
													props.touched.name && props.errors.name
												}
											/>
										</Grid>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<CssTextField
												id="outlined-basic"
												label="Email"
												variant="outlined"
												type="email"
												autoComplete="new-password"
												style={{ width: '100%' }}
												size="small"
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
												onChange={props.handleChange('email')}
												onBlur={props.handleBlur('email')}
												value={props.values.email}
												helperText={
													props.touched.email && props.errors.email
												}
												error={
													props.touched.email && props.errors.email
												}
											/>
										</Grid>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<CssTextField
												id="outlined-basic"
												label="Phone No."
												variant="outlined"
												type="number"
												size="small"
												autoComplete="new-password"
												style={{ width: '100%' }}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
												onChange={props.handleChange('phone')}
												onBlur={props.handleBlur('phone')}
												value={props.values.phone}
												helperText={
													props.touched.phone && props.errors.phone
												}
												error={
													props.touched.phone && props.errors.phone
												}
											/>
										</Grid>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<CssTextField
												id="outlined-basic"
												label="Address"
												style={{ width: '100%' }}
												variant="outlined"
												type="text"
												size="small"
												autoComplete="new-password"
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
												onChange={props.handleChange('location')}
												onBlur={props.handleBlur('location')}
												value={props.values.location}
												helperText={
													props.touched.location &&
													props.errors.location
												}
												error={
													props.touched.location &&
													props.errors.location
												}
											/>
										</Grid>
									</Grid>
									<Grid
										container
										spacing={1}
										style={{ marginTop: 10 }}
									>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<CssTextField
												id="outlined-basic"
												label="Contact Person"
												variant="outlined"
												type="text"
												autoComplete="new-password"
												size="small"
												style={{ width: '100%' }}
												inputProps={{ style: { fontSize: 14 } }}
												onChange={props.handleChange(
													'contactPerson'
												)}
												onBlur={props.handleBlur('contactPerson')}
												value={props.values.contactPerson}
												helperText={
													props.touched.contactPerson &&
													props.errors.contactPerson
												}
												error={
													props.touched.contactPerson &&
													props.errors.contactPerson
												}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
											></CssTextField>
										</Grid>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<Autocomplete
												options={categories}
												label="name"
												onChange={(e) => {
													props.resetForm({
														values: {
															...form.values,
															subCategory: '',
														},
													});
													setSelectedCategory(e);
													props.handleChange('category');
												}}
												value={categories.find(
													(el) => el._id === props.values.category
												)}
												onBlur={props.handleBlur('category')}
												helperText={
													props.touched.category &&
													props.errors.category
												}
												error={
													props.touched.category &&
													props.errors.category
												}
												style={{ width: '100%' }}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
												labelText="Select Category"
											/>
										</Grid>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<Autocomplete
												options={subCategories}
												label="name"
												onChange={props.handleChange('subCategory')}
												value={
													subCategories.find(
														(el) =>
															el._id === props.values.subCategory
													)
														? subCategories.find(
																(el) =>
																	el._id ===
																	props.values.subCategory
														  )
														: ''
												}
												onBlur={props.handleBlur('subCategory')}
												helperText={
													props.touched.subCategory &&
													props.errors.subCategory
												}
												error={
													props.touched.subCategory &&
													props.errors.subCategory
												}
												style={{ width: '100%' }}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
												labelText="Select Sub Category"
											/>
										</Grid>
									</Grid>
									<Grid
										item
										lg={3}
										md={3}
										sm={6}
										xs={6}
										className={classes.ckeckBox}
									>
										<FormGroup row>
											{(selectedCategory || selectedSubCategory) &&
												materials.map((el, i) => (
													<FormControlLabel
														key={i}
														control={
															<Checkbox
																icon={
																	<CheckBoxOutlineBlankIcon fontSize="small" />
																}
																checkedIcon={
																	<CheckBoxIcon fontSize="small" />
																}
																onChange={(e) =>
																	getMaterials(e, el)
																}
																checked={
																	materialsState.find(
																		(selectedMaterials) =>
																			selectedMaterials._id ===
																			el._id
																				? el
																				: null
																	)
																		? true
																		: false
																}
															/>
														}
														name={el.name}
														value={el._id}
														label={el.name}
													/>
												))}
										</FormGroup>
									</Grid>
									<Grid
										item
										lg={12}
										md={12}
										sm={6}
										xs={6}
										style={{
											marginTop: 30,
										}}
									>
										{materialsState?.map((el) => (
											<div
												style={{
													textAlign: 'left',
													paddingBottom: 10,
													paddingTop: 10,
													borderBottom: '1px solid #333',
												}}
											>
												<p style={{ margin: 0, padding: 0 }}>
													Material Name: {el?.name}
												</p>
												<p style={{ margin: 0, padding: 0 }}>
													Category: {el?.category?.name}
												</p>
												<p style={{ margin: 0, padding: 0 }}>
													Sub Category: {el?.subCategory?.name}
												</p>
											</div>
										))}
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
									</div>
									{createError && <p>{createError}</p>}
								</Form>
							);
						}}
					</Formik>
				</Container>
				<EditVendor
					show={open}
					handler={handleClose}
					vendor={vendor}
					categories={categories}
					materials={materials}
				/>
				<CssTextField
					id="outlined-basic"
					label="Search Vendors"
					variant="outlined"
					type="search"
					size="small"
					autoComplete="new-password"
					className={classes.inputFieldStyle1}
					inputProps={{ style: { fontSize: 14 } }}
					InputLabelProps={{ style: { fontSize: 14 } }}
				/>

				{fetchError && <p>{fetchError}</p>}
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
				) : vendors?.length === 0 ? (
					<p>There is no data found.</p>
				) : (
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
										<StyledTableCell align="center">
											Sr.No
										</StyledTableCell>
										<StyledTableCell align="center">
											Vendor Name
										</StyledTableCell>
										<StyledTableCell align="center">
											Phone No.
										</StyledTableCell>
										<StyledTableCell align="center">
											Address
										</StyledTableCell>
										<StyledTableCell align="center">
											Items
										</StyledTableCell>
										<StyledTableCell align="center">
											Action
										</StyledTableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{vendors?.map((el, i) => (
										<StyledTableRow key={i}>
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
												{capitalize(el.name)}
											</StyledTableCell>
											<StyledTableCell
												className="text-dark bg-light"
												align="center"
											>
												{el.phone}
											</StyledTableCell>
											<StyledTableCell
												className="text-dark bg-light"
												align="center"
											>
												{capitalize(el.location)}
											</StyledTableCell>
											<StyledTableCell
												className="text-dark bg-light"
												align="center"
											>
												{!el.materials || !el.materials.length ? (
													<p>Not Found</p>
												) : (
													el.materials.map((el, i) => (
														<div
															style={{
																textAlign: 'center',
																paddingTop: '2px',
																paddingBottom: '2px',
															}}
														>
															<p
																key={i}
																style={{
																	margin: 0,
																	padding: 0,
																}}
																className="ml-1"
															>
																{el?.name}
															</p>
														</div>
													))
												)}
											</StyledTableCell>
											<StyledTableCell
												className="text-light bg-light"
												align="center"
											>
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
														text="Update"
														size="small"
														onClick={() => handleOpen(el)}
														style={{ marginTop: 2 }}
													/>

													<Button
														variant="contained"
														color="secondary"
														size="small"
														text="Delete"
														onClick={() => deleteVendor(el._id)}
														style={{
															marginLeft: 2,
															marginTop: 2,
														}}
													/>
												</div>
											</StyledTableCell>
										</StyledTableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</div>
				)}
			</div>
		</Sidenav>
	);
};

export default Vendors;
