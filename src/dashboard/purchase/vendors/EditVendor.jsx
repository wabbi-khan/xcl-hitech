import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { getMaterialAction } from '../../../services/action/MaterialDataHandle';
import { updateVendorAction } from '../../../services/action/VendorAction';
import { getMaterialCategoryAction } from '../../../services/action/MatCategoryAction';
import { getSubCategories } from '../../../services/action/subCategoryAction';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import Button from '../../../components/utils/Button';
import Autocomplete from '../../../components/utils/AutoComplete';

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		justifyContent: 'center',
	},
	paper: {
		height: 'auto',
		width: '60%',
	},
	mainContainer: {
		textAlign: 'center',
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
			// width: '12%',
		},
	},
	inputFieldStyle: {
		[theme.breakpoints.up('md')]: {
			width: 330,
		},
		[theme.breakpoints.down('sm')]: {
			width: 200,
		},
	},
	inputFieldStyle1: {
		marginTop: 10,
		[theme.breakpoints.up('md')]: {
			width: 330,
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
};

const validationSchema = yup.object({
	name: yup.string().required(),
	email: yup.string().required().email(),
	phone: yup.string().required(),
	location: yup.string().required(),
	category: yup.string(),
	subCategory: yup.string(),
});

const EditVendor = (props) => {
	const [initialValuesState, setInitialValuesState] = React.useState({
		...initialValues,
	});
	const [open, setOpen] = useState(false);
	const [selectedMaterials, setSelectedMaterials] = useState([]);
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState('');
	const [success, setSuccess] = React.useState('');
	const [selectedCategory, setSelectedCategory] = React.useState('');
	const [selectedSubCategory, setSelectedSubCategory] = React.useState('');

	const { materials } = useSelector((state) => state.materials);
	const { categories } = useSelector((state) => state.categories);
	const { subCategories } = useSelector((state) => state.subCategories);
	const dispatch = useDispatch();
	const classes = useStyles();

	let form = null;

	const { show, handler, vendor } = props;

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
		dispatch(getMaterialCategoryAction());
	}, [dispatch]);

	useEffect(() => {
		if (selectedCategory) {
			dispatch(getSubCategories(`parent=${selectedCategory}`));
			if (form) {
				setInitialValuesState((prev) => {
					return {
						...form.values,
						category: selectedCategory,
						subCategory: undefined,
					};
				});
				setSelectedSubCategory('');
			}
		}
	}, [selectedCategory]);

	useEffect(() => {
		setInitialValuesState({
			...vendor,
		});

		if (vendor) {
			setSelectedMaterials([...vendor.materials]);
		}
	}, [vendor]);

	useEffect(() => {
		setOpen(show);
	}, [show]);

	const handleClose = () => {
		handler(false);
		setSelectedCategory('');
		setSelectedSubCategory('');
	};

	const onSubmit = (values) => {
		setLoading(true);
		values.materials = selectedMaterials;
		dispatch(
			updateVendorAction(vendor._id, values, (err) => {
				if (err) {
					setError(err);
					setTimeout(() => {
						setError('');
					}, 4000);
				} else {
					setLoading(false);
					setSuccess(true);
					setTimeout(() => {
						setSuccess(false);
					}, 4000);
				}
			})
		);
		setLoading(true);
	};

	const getMaterials = async (event, material) => {
		if (event.target.checked) {
			setSelectedMaterials([...selectedMaterials, material]);
		}
		if (event.target.checked === false) {
			setSelectedMaterials(
				selectedMaterials.filter((value) => value._id !== material._id)
			);
		}
	};

	return (
		<Modal
			aria-labelledby="transition-modal-title"
			aria-describedby="transition-modal-description"
			className={classes.modal}
			open={open}
			style={{ overflowY: 'scroll' }}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}
		>
			<Fade in={open}>
				<div className={classes.paper}>
					<Container className={classes.mainContainer}>
						<div
							style={{
								backgroundColor: '#fff',
								border: '2px solid #000',
								padding: '10px 30px 10px 30px',
								marginTop: '10px',
								marginBottom: '10px',
							}}
						>
							<h5 className="text-center mt-4">Edit Vendor</h5>
							{vendor ? (
								<Formik
									initialValues={initialValuesState}
									validationSchema={validationSchema}
									onSubmit={onSubmit}
									enableReinitialize
								>
									{(props) => {
										form = props;
										return (
											<Form>
												<Grid container spacing={1}>
													<Grid
														item
														lg={12}
														md={12}
														sm={12}
														xs={12}
													>
														<CssTextField
															id="outlined-basic"
															label="Enter Vendor Name"
															variant="outlined"
															type="text"
															size="small"
															style={{
																width: '100%',
																marginTop: 20,
															}}
															autocomplete="off"
															inputProps={{
																style: { fontSize: 14 },
															}}
															InputLabelProps={{
																style: { fontSize: 14 },
															}}
															onChange={props.handleChange(
																'name'
															)}
															onBlur={props.handleBlur('name')}
															value={props.values.name}
															helperText={
																props.touched.name &&
																props.errors.name
															}
															error={
																props.touched.name &&
																props.errors.name
															}
														/>
													</Grid>
													<Grid
														item
														lg={12}
														md={12}
														sm={12}
														xs={12}
													>
														<CssTextField
															id="outlined-basic"
															label="Email"
															style={{
																width: '100%',
																marginTop: 20,
															}}
															variant="outlined"
															autocomplete="off"
															size="small"
															inputProps={{
																style: { fontSize: 14 },
															}}
															InputLabelProps={{
																style: { fontSize: 14 },
															}}
															onChange={props.handleChange(
																'email'
															)}
															onBlur={props.handleBlur('email')}
															value={props.values.email}
															helperText={
																props.touched.email &&
																props.errors.email
															}
															error={
																props.touched.email &&
																props.errors.email
															}
														/>
													</Grid>
													<Grid
														item
														lg={12}
														md={12}
														sm={12}
														xs={12}
													>
														<CssTextField
															id="outlined-basic"
															label="Phone No."
															variant="outlined"
															style={{
																width: '100%',
																marginTop: 20,
															}}
															type="text"
															autocomplete="off"
															size="small"
															inputProps={{
																style: { fontSize: 14 },
															}}
															InputLabelProps={{
																style: { fontSize: 14 },
															}}
															onChange={props.handleChange(
																'phone'
															)}
															onBlur={props.handleBlur('phone')}
															value={props.values.phone}
															helperText={
																props.touched.phone &&
																props.errors.phone
															}
															error={
																props.touched.phone &&
																props.errors.phone
															}
														/>
													</Grid>
													<Grid
														item
														lg={12}
														md={12}
														sm={12}
														xs={12}
													>
														<CssTextField
															id="outlined-basic"
															label="Address"
															variant="outlined"
															type="text"
															style={{
																width: '100%',
																marginTop: 20,
															}}
															size="small"
															autocomplete="off"
															inputProps={{
																style: { fontSize: 14 },
															}}
															InputLabelProps={{
																style: { fontSize: 14 },
															}}
															onChange={props.handleChange(
																'location'
															)}
															onBlur={props.handleBlur(
																'location'
															)}
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
													<Grid
														item
														lg={12}
														md={12}
														sm={12}
														xs={12}
													>
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
																(el) =>
																	el._id ===
																	props.values.category
															)}
															onBlur={props.handleBlur(
																'category'
															)}
															helperText={
																props.touched.category &&
																props.errors.category
															}
															error={
																props.touched.category &&
																props.errors.category
															}
															style={{
																width: '100%',
																marginTop: 20,
															}}
															inputProps={{
																style: { fontSize: 14 },
															}}
															InputLabelProps={{
																style: { fontSize: 14 },
															}}
															labelText="Select Category"
														/>
													</Grid>
													<Grid
														item
														lg={12}
														md={12}
														sm={12}
														xs={12}
													>
														<Autocomplete
															options={subCategories}
															label="name"
															onChange={props.handleChange(
																'subCategory'
															)}
															value={
																subCategories.find(
																	(el) =>
																		el._id ===
																		props.values.subCategory
																)
																	? subCategories.find(
																			(el) =>
																				el._id ===
																				props.values
																					.subCategory
																	  )
																	: ''
															}
															onBlur={props.handleBlur(
																'subCategory'
															)}
															helperText={
																props.touched.subCategory &&
																props.errors.subCategory
															}
															error={
																props.touched.subCategory &&
																props.errors.subCategory
															}
															style={{
																width: '100%',
																marginTop: 20,
															}}
															inputProps={{
																style: { fontSize: 14 },
															}}
															InputLabelProps={{
																style: { fontSize: 14 },
															}}
															labelText="Select Sub Category"
														/>
													</Grid>
													<Grid
														item
														lg={12}
														md={12}
														sm={6}
														xs={6}
														className={classes.ckeckBox}
													>
														<FormGroup row>
															{(selectedCategory ||
																selectedSubCategory) &&
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
																					getMaterials(
																						e,
																						el
																					)
																				}
																				checked={
																					selectedMaterials.find(
																						(
																							selectedMaterial
																						) =>
																							selectedMaterial._id ===
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
														{selectedMaterials?.map((el) => (
															<div
																style={{
																	textAlign: 'left',
																	paddingBottom: 10,
																	paddingTop: 10,
																	borderBottom:
																		'1px solid #333',
																}}
															>
																<p
																	style={{
																		margin: 0,
																		padding: 0,
																	}}
																>
																	{el?.name}
																</p>
															</div>
														))}
													</Grid>
												</Grid>
												<div
													style={{
														marginTop: '2rem',
														display: 'flex',
														alignItems: 'center',
														justifyContent: 'center',
													}}
												>
													<Button
														variant="contained"
														color="primary"
														text="Update"
														style={{ marginRight: '1rem' }}
														loading={loading}
													/>
													<Button
														variant="outlined"
														color="dark"
														onClick={handleClose}
														text="Close"
														type="button"
														classNames="bg-danger text-light"
													/>
												</div>
												{error && <p>{error}</p>}
												{success && <p>Successfully Updated</p>}
											</Form>
										);
									}}
								</Formik>
							) : null}
						</div>
					</Container>
				</div>
			</Fade>
		</Modal>
	);
};

export default EditVendor;
