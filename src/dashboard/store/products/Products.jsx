import React, { useState, useEffect } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import {
	getProducts,
	createProducts,
	deleteProducts,
} from '../../../services/action/ProductsAction';
import EditProducts from './EditProducts';
import { getSubCategories } from '../../../services/action/subCategoryAction';
import { getMaterialCategoryAction } from '../../../services/action/MatCategoryAction';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { MenuItem } from '@material-ui/core';
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
	inputFieldStyle: {
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

const Products = () => {
	const [product, setproduct] = useState('');
	const [fetchLoading, setFetchLoading] = useState(true);
	const [createLoading, setCreateLoading] = useState(false);
	const [createError, setCreateError] = useState('');
	const [deleteLoading, setDeleteLoading] = useState(false);
	const [deleteError, setDeleteError] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('');
	const [initialValuesState, setInitialValuesState] = useState({
		...initialValue,
	});

	let form = null;

	const classes = useStyles();

	const dispatch = useDispatch();

	useEffect(() => {
		setFetchLoading(true);
		dispatch(
			getProducts(null, (err) => {
				setFetchLoading(false);
			})
		);
		dispatch(getSubCategories());
		dispatch(getMaterialCategoryAction());
	}, [dispatch]);

	useEffect(() => {
		if (selectedCategory) {
			dispatch(getSubCategories(`parent=${selectedCategory}`));
			setInitialValuesState({
				...form.values,
				subCategory: '',
			});
		}
	}, [selectedCategory, dispatch, form]);

	const { products } = useSelector((state) => state.products);
	const { categories } = useSelector((state) => state.categories);
	const { subCategories } = useSelector((state) => state.subCategories);

	const onSubmit = async (values) => {
		setCreateLoading(true);
		dispatch(
			createProducts(values, (err) => {
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

	const deleteProduct = async (params) => {
		setDeleteLoading(true);
		dispatch(
			deleteProducts(params, (err) => {
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

	const [open, setOpen] = useState(false);

	const handleClose = (props) => {
		setOpen(props);
	};

	const handleOpen = async (product) => {
		setproduct(product);
		setOpen(true);
	};

	return (
		<Sidenav title={'Products'}>
			<EditProducts show={open} handler={handleClose} product={product} />
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
						validationSchema={validationSchema}
						enableReinitialize
						onSubmit={onSubmit}
					>
						{(props) => {
							form = props;
							return (
								<Form>
									<Grid
										container
										spacing={1}
										style={{ marginTop: 15 }}
									>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<CssTextField
												id="outlined-basic"
												label="Select Category"
												variant="outlined"
												type="email"
												size="small"
												autoComplete="off"
												select
												required
												style={{ width: '100%' }}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
												onChange={props.handleChange('category')}
												onBlur={props.handleBlur('category')}
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
												{!categories || !categories.length ? (
													<p>Data Not Found</p>
												) : (
													categories.map((el) => (
														<MenuItem
															value={el._id}
															key={el._id}
															onClick={() =>
																setSelectedCategory(el._id)
															}
														>
															{el.name}
														</MenuItem>
													))
												)}
											</CssTextField>
										</Grid>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<CssTextField
												id="outlined-basic"
												label="Select Sub-Category"
												variant="outlined"
												type="email"
												size="small"
												autoComplete="off"
												select
												required
												style={{ width: '100%' }}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
												onChange={props.handleChange('subCategory')}
												onBlur={props.handleBlur('subCategory')}
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
												{!subCategories || !subCategories.length ? (
													<p>Data Not Found</p>
												) : (
													subCategories.map((el) => (
														<MenuItem value={el._id} key={el._id}>
															{el.name}
														</MenuItem>
													))
												)}
											</CssTextField>
										</Grid>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<CssTextField
												id="outlined-basic"
												label="Product Name"
												variant="outlined"
												type="text"
												size="small"
												autoComplete="off"
												style={{ width: '100%' }}
												inputProps={{ style: { fontSize: 14 } }}
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
												label="Min. Inventory Level"
												variant="outlined"
												type="text"
												size="small"
												autoComplete="off"
												style={{ width: '100%' }}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
												onChange={props.handleChange(
													'minInventoryLevel'
												)}
												onBlur={props.handleBlur(
													'minInventoryLevel'
												)}
												value={props.values.minInventoryLevel}
												helperText={
													props.touched.minInventoryLevel &&
													props.errors.minInventoryLevel
												}
												error={
													props.touched.minInventoryLevel &&
													props.errors.minInventoryLevel
												}
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
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
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
									<div>
										<Button
											variant="outlined"
											color="primary"
											loading={createLoading}
											loaderColor="#333"
											text="Add"
											classNames={classes.addButton}
										/>
										{createError && <p>{createError}</p>}
									</div>
								</Form>
							);
						}}
					</Formik>
				</Container>
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
				) : products?.length === 0 ? (
					<p>There is no data found.</p>
				) : (
					<div
						className="container-fluid"
						style={{ textAlign: 'left', marginTop: '50px' }}
					>
						<table class="table table-responsive table-hover table-striped table-bordered border-dark text-center mt-3">
							<thead class="bg-dark text-light">
								<tr>
									<th>S.No.</th>
									<th>Product Category</th>
									<th>Product Name</th>
									<th>Product Code</th>
									<th>Min Inventory Level</th>
									<th>Remarks</th>
									<th>Category</th>
									<th>Sub Category</th>
									<th>Action</th>
								</tr>
							</thead>

							<tbody>
								{products.map((el, i) => (
									<tr key={i}>
										<td>{i + 1}</td>
										<td>Finished</td>
										<td>{el?.name}</td>
										<td>{el?.code}</td>
										<td>{el?.minInventoryLevel}</td>
										<td>{el?.remarks}</td>
										<td>{el?.category?.name}</td>
										<td>{el?.subCategory?.name}</td>
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
													onClick={() => deleteProduct(el?._id)}
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
				)}
			</div>
		</Sidenav>
	);
};

export default Products;
