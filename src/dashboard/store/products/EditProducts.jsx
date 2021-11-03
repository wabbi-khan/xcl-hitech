import React, { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import Button from '../../../components/utils/Button';
import { updateProducts } from '../../../services/action/ProductsAction';
import { useDispatch, useSelector } from 'react-redux';
import { getSubCategories } from '../../../services/action/subCategoryAction';
import { MenuItem } from '@material-ui/core';

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

const initialValue = {
	category: '',
	subCategory: '',
	name: '',
	minInventoryLevel: '',
	remarks: '',
};

const validationSchema = yup.object({
	category: yup.string().required('Category is required'),
	subCategory: yup.string().required('Sub Category is required'),
	name: yup.string().required('Product name is required'),
	minInventoryLevel: yup.string().required('Min. Inventory Level is required'),
	remarks: yup.string().required('Reamrks is required'),
});

const EditProducts = (props) => {
	const [initialValuesState, setInitialValues] = React.useState({
		...initialValue,
	});
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState('');
	const [success, setSuccess] = React.useState('');
	const [open, setOpen] = useState(false);
	const [selectedCategory, setSelectedCategory] = React.useState('');

	const { show, handler, product } = props;

	let form = null;

	const dispatch = useDispatch();

	const { categories } = useSelector((state) => state.categories);
	const { subCategories } = useSelector((state) => state.subCategories);

	useEffect(() => {
		if (product)
			setInitialValues({
				...product,
				category: product?.category?._id,
				subCategory: product?.subCategory?._id,
			});
	}, [product]);

	useEffect(() => {
		if (selectedCategory) {
			dispatch(getSubCategories(`parent=${selectedCategory}`));
			setInitialValues({
				...form.values,
				subCategory: '',
			});
		}
	}, [selectedCategory, dispatch, form]);

	const classes = useStyles();

	useEffect(() => {
		setOpen(show);
	}, [show]);

	const onSubmit = async (values) => {
		setLoading(true);
		dispatch(
			updateProducts(product?._id, values, (err) => {
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

	const handleClose = () => {
		handler(false);
	};

	return (
		<div>
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
							{product ? (
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
													<Grid lg={12} md={12} sm={12}>
														<CssTextField
															id="outlined-basic"
															label="Product Name"
															variant="outlined"
															type="text"
															size="small"
															style={{
																width: '100%',
																marginBottom: '2rem',
															}}
															autoComplete="off"
															defaultValue={product.name}
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
													<Grid lg={12} md={12} sm={12}></Grid>
													<Grid lg={12} md={12} sm={12}>
														<CssTextField
															id="outlined-basic"
															label="Min Inventory Level"
															variant="outlined"
															type="text"
															size="small"
															autoComplete="off"
															defaultValue={
																product.minInventoryLevel
															}
															style={{
																width: '100%',
																marginBottom: '2rem',
															}}
															inputProps={{
																style: { fontSize: 14 },
															}}
															InputLabelProps={{
																style: { fontSize: 14 },
															}}
															onChange={props.handleChange(
																'minInventoryLevel'
															)}
															onBlur={props.handleBlur(
																'minInventoryLevel'
															)}
															value={
																props.values.minInventoryLevel
															}
															helperText={
																props.touched
																	.minInventoryLevel &&
																props.errors.minInventoryLevel
															}
															error={
																props.touched
																	.minInventoryLevel &&
																props.errors.minInventoryLevel
															}
														/>
													</Grid>
													<Grid lg={12} md={12} sm={12}>
														<CssTextField
															id="outlined-basic"
															label="Remarks"
															variant="outlined"
															type="text"
															size="small"
															autoComplete="off"
															style={{
																width: '100%',
																marginBottom: '2rem',
															}}
															defaultValue={product.remarks}
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
														sm={12}
														xs={12}
													>
														<CssTextField
															id="outlined-basic"
															label="Select Category"
															variant="outlined"
															type="email"
															size="small"
															autoComplete="off"
															select
															required
															style={{
																width: '100%',
																marginBottom: '2rem',
															}}
															inputProps={{
																style: { fontSize: 14 },
															}}
															InputLabelProps={{
																style: { fontSize: 14 },
															}}
															onChange={props.handleChange(
																'category'
															)}
															onBlur={props.handleBlur(
																'category'
															)}
															value={props.values.category}
															helperText={
																props.touched.category &&
																props.errors.category
															}
															error={
																props.touched.category &&
																props.errors.category
															}
														>
															{!categories ||
															!categories.length ? (
																<p>Data Not Found</p>
															) : (
																categories.map((el) => (
																	<MenuItem
																		value={el._id}
																		key={el._id}
																		onClick={() =>
																			setSelectedCategory(
																				el._id
																			)
																		}
																	>
																		{el.name}
																	</MenuItem>
																))
															)}
														</CssTextField>
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
															label="Select Sub Category"
															variant="outlined"
															type="email"
															size="small"
															autoComplete="off"
															select
															required
															style={{ width: '100%' }}
															inputProps={{
																style: { fontSize: 14 },
															}}
															InputLabelProps={{
																style: { fontSize: 14 },
															}}
															onChange={props.handleChange(
																'subCategory'
															)}
															onBlur={props.handleBlur(
																'subCategory'
															)}
															value={props.values.subCategory}
															helperText={
																props.touched.subCategory &&
																props.errors.subCategory
															}
															error={
																props.touched.subCategory &&
																props.errors.subCategory
															}
														>
															{!subCategories ||
															!subCategories.length ? (
																<p>Data Not Found</p>
															) : (
																subCategories.map((el) => (
																	<MenuItem
																		value={el._id}
																		key={el._id}
																	>
																		{el.name}
																	</MenuItem>
																))
															)}
														</CssTextField>
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
						</Container>
					</div>
				</Fade>
			</Modal>
		</div>
	);
};

export default EditProducts;
