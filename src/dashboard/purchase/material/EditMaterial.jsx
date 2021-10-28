import React, { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@material-ui/core/Container';
import Button from '../../../components/utils/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import { updateMaterialAction } from '../../../services/action/MaterialDataHandle';
import { getSubCategories } from '../../../services/action/subCategoryAction';
import { getMaterialCategoryAction } from '../../../services/action/MatCategoryAction';
import { getUnits } from '../../../services/action/unitAction';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { CustomInput, CustomAutoComplete } from '../../../components';

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		height: 'auto',
		width: 500,
	},
	mainContainer: {
		textAlign: 'center',
		marginTop: 20,
	},
	addButton: {
		marginTop: 20,
		marginRight: 10,
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
	closeButton: {
		marginTop: 20,
		marginRight: 10,
		color: '#e74c3c',
		borderColor: '#e74c3c',
		fontWeight: 'bold',
		'&:hover': {
			border: 'none',
			backgroundColor: '#e74c3c',
			color: 'whitesmoke',
		},
		[theme.breakpoints.up('md')]: {
			width: '15%',
		},
		[theme.breakpoints.down('sm')]: {
			// width: '12%',
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
	category: '',
	subCategory: '',
	unit: '',
	price: '',
};

const validationSchema = yup.object({
	name: yup.string().required(),
	category: yup.string().required(),
	subCategory: yup.string(),
	unit: yup.string().required(),
	price: yup.string().required(),
});

const EditMaterial = (props) => {
	const { show, handler, material } = props;
	const [initialValuesState, setInitialValuesState] = React.useState({
		...initialValues,
	});
	const [updateLoading, setUpdateLoading] = React.useState(false);
	const [updateError, setUpdateError] = React.useState('');
	const [selectedCategory, setSelectedCategory] = React.useState('');
	const [success, setSuccess] = React.useState('');
	const [open, setOpen] = useState(false);

	const dispatch = useDispatch();

	const classes = useStyles();

	const { subCategories } = useSelector((state) => state.subCategories);
	const { categories } = useSelector((state) => state.categories);
	const { units } = useSelector((state) => state.units);

	useEffect(() => {
		if (selectedCategory) {
			dispatch(getSubCategories(`parent=${selectedCategory}`));
			setInitialValuesState((prev) => {
				return {
					...prev,
					category: selectedCategory,
					subCategory: undefined,
				};
			});
		}
	}, [selectedCategory]);

	useEffect(() => {
		dispatch(getSubCategories());
		dispatch(getMaterialCategoryAction());
		dispatch(getUnits());
	}, [dispatch]);

	useEffect(() => {
		if (material) {
			setInitialValuesState({
				...material,
				category: material?.category?._id,
				subCategory: material?.subCategory?._id,
				unit: material?.unit?._id,
			});
		}
	}, [material]);

	useEffect(() => {
		setOpen(show);
	}, [show]);

	const onSubmit = async (values) => {
		setUpdateLoading(true);
		dispatch(
			updateMaterialAction(material._id, values, (err) => {
				if (err) {
					setUpdateError(err);
					setTimeout(() => {
						setUpdateError('');
					}, 4000);
				} else {
					setSuccess(true);
					setTimeout(() => {
						setSuccess(false);
					}, 4000);
				}
				setUpdateLoading(false);
			})
		);
	};

	const handleClose = () => {
		handler(false);
	};

	return (
		<Modal
			aria-labelledby="transition-modal-title"
			aria-describedby="transition-modal-description"
			className={classes.modal}
			open={open}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}
		>
			<Fade in={open}>
				<div className={classes.paper}>
					<h5 className="text-center mt-4">Update</h5>
					<Container className={classes.mainContainer}>
						{material ? (
							<Formik
								initialValues={initialValuesState}
								validationSchema={validationSchema}
								enableReinitialize
								onSubmit={onSubmit}
							>
								{(props) => (
									<Form>
										<Grid container spacing={1}>
											<Grid lg={12} md={12} sm={12}>
												<CssTextField
													id="outlined-basic"
													label="Enter Material Name"
													variant="outlined"
													type="text"
													autocomplete="off"
													onChange={props.handleChange('name')}
													onBlur={props.handleBlur('name')}
													value={props.values.name}
													style={{ width: '100%', marginTop: 20 }}
													helperText={
														props.touched.name &&
														props.errors.name
													}
													error={
														props.touched.name &&
														props.errors.name
													}
													size="small"
													autoComplete="off"
													inputProps={{ style: { fontSize: 14 } }}
													InputLabelProps={{
														style: { fontSize: 14 },
													}}
												/>
											</Grid>
											<Grid lg={12} md={12} sm={12}>
												<CustomAutoComplete
													options={categories}
													label="name"
													onChange={(e) => {
														props.resetForm({
															values: {
																...props.values,
																subCategory: '',
															},
														});
														setSelectedCategory(e);
														props.handleChange('category');
													}}
													value={categories.find(
														(el) =>
															el._id === props.values.category
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
													style={{ width: '100%', marginTop: 20 }}
													inputProps={{ style: { fontSize: 14 } }}
													InputLabelProps={{
														style: { fontSize: 14 },
													}}
													labelText="Select Category"
												/>
											</Grid>

											<Grid lg={12} md={12} sm={12}>
												<CustomAutoComplete
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
													style={{ width: '100%', marginTop: 20 }}
													inputProps={{ style: { fontSize: 14 } }}
													InputLabelProps={{
														style: { fontSize: 14 },
													}}
													labelText="Select Sub Category"
												/>
											</Grid>
											<Grid lg={12} md={12} sm={12}>
												<CustomAutoComplete
													options={units}
													label="name"
													onChange={props.handleChange('unit')}
													value={units.find(
														(el) => el._id === props.values.unit
													)}
													onBlur={props.handleBlur('unit')}
													helperText={
														props.touched.unit &&
														props.errors.unit
													}
													error={
														props.touched.unit &&
														props.errors.unit
													}
													style={{ width: '100%', marginTop: 20 }}
													inputProps={{ style: { fontSize: 14 } }}
													InputLabelProps={{
														style: { fontSize: 14 },
													}}
													labelText="Select Unnit"
												/>
											</Grid>
											<Grid item lg={12} md={12} sm={12} xs={12}>
												<CustomInput
													label="Select Price Per Unit"
													onChange={props.handleChange('price')}
													value={props.values.price}
													onBlur={props.handleBlur('price')}
													helperText={
														props.touched.price &&
														props.errors.price
													}
													error={
														props.touched.price &&
														props.errors.price
													}
													width="100%"
													style={{ marginTop: '10px' }}
												/>
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
												loading={updateLoading}
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
										{success && <p>Successfully Updated</p>}
										{updateError && <p>{updateError}</p>}
									</Form>
								)}
							</Formik>
						) : null}
					</Container>
				</div>
			</Fade>
		</Modal>
	);
};

export default EditMaterial;
