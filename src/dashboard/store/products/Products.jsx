import React, { useState, useEffect } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsAction } from '../../../services/action/ProductsAction';
import Loading from '../../purchase/material/Loading';
import MaterialError from '../../purchase/material/MaterialError';
import axios from 'axios';
import EditProducts from './EditProducts';
import { getStoreCategory } from '../../../services/action/StoreCategoryAction';
import { Form, Formik } from 'formik';
import * as yup from 'yup';

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
	name: '',
	code: '',
	minInventoryLevel: '',
	remarks: '',
};

const validationSchema = yup.object({
	category: yup.string().required('Category is required'),
	name: yup.string().required('Product name is required'),
	code: yup.string().required('Product code is required'),
	minInventoryLevel: yup.string().required('Min. Inventory Level is required'),
	remarks: yup.string().required('Reamrks is required'),
});

const Products = () => {
	const [product, setproduct] = useState('');

	const classes = useStyles();

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchProductsAction());
		dispatch(getStoreCategory());
	}, [dispatch]);

	const { loading, products, error } = useSelector((state) => state.products);

	const onSubmit = async (props) => {
		// dispatch(createTraining(props));
	};

	const deleteProduct = async (params) => {
		try {
			await axios.delete(`${process.env.REACT_APP_API_URL}/product/${params}`);
			window.location.reload();
		} catch (error) {
			console.log(error);
		}
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
			{/* ============products form component */}
			<EditProducts show={open} handler={handleClose} product={product} />
			{/* ============products form component */}
			<div>
				<Container className={classes.mainContainer}>
					<Formik
						initialValues={initialValue}
						validationSchema={validationSchema}
						onSubmit={onSubmit}>
						{(props) => (
							<Form>
								<Grid container spacing={1} style={{ marginTop: 15 }}>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id='outlined-basic'
											label='Select Category'
											variant='outlined'
											type='email'
											size='small'
											autoComplete='off'
											select
											required
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('category')}
											onBlur={props.handleBlur('category')}
											value={props.values.category}
											helperText={props.touched.category && props.errors.category}
											error={props.touched.category && props.errors.category}>
											{/* {
										!categories || !categories.length ? (
											<p>Data Not Found</p>
										) : (
											categories.map((cat) => (
												<MenuItem
													value={cat._id}
													key={cat._id}
												// onClick={() => setCodeCategory(cat.name) }
												>
													{cat.name}
												</MenuItem>
											))
										)
									} */}
										</CssTextField>
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id='outlined-basic'
											label='Product Name'
											variant='outlined'
											type='text'
											size='small'
											autoComplete='off'
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('name')}
											onBlur={props.handleBlur('name')}
											value={props.values.name}
											helperText={props.touched.name && props.errors.name}
											error={props.touched.name && props.errors.name}
										/>
										{/* {
								errors.name?.type === 'required' && (
									<p className='mt-1 text-danger'>Product Name is required</p>
								)
								} */}
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id='outlined-basic'
											label='Product Code'
											variant='outlined'
											type='text'
											size='small'
											autoComplete='off'
											// value={`${CodeCategory}-${CodeName}-${CodeRandom}`}
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('code')}
											onBlur={props.handleBlur('code')}
											value={props.values.code}
											helperText={props.touched.code && props.errors.code}
											error={props.touched.code && props.errors.code}
										/>
										{/* {
									errors.name?.type === 'required' && (
										<p className='mt-1 text-danger'>Product Name is required</p>
									)
									} */}
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id='outlined-basic'
											label='Min. Inventory Level'
											variant='outlined'
											type='text'
											size='small'
											autoComplete='off'
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('minInventoryLevel')}
											onBlur={props.handleBlur('minInventoryLevel')}
											value={props.values.minInventoryLevel}
											helperText={
												props.touched.minInventoryLevel && props.errors.minInventoryLevel
											}
											error={
												props.touched.minInventoryLevel && props.errors.minInventoryLevel
											}
										/>
										{/* {
									errors.minInventoryLevel?.type === 'required' && (
										<p className='mt-1 text-danger'>Min Inventory Level is required</p>
									)
								} */}
									</Grid>
								</Grid>
								<Grid container spacing={1} style={{ marginTop: 15 }}>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id='outlined-basic'
											label='Remarks'
											variant='outlined'
											type='text'
											size='small'
											autoComplete='off'
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('remarks')}
											onBlur={props.handleBlur('remarks')}
											value={props.values.remarks}
											helperText={props.touched.remarks && props.errors.remarks}
											error={props.touched.remarks && props.errors.remarks}
										/>
										{/* {
									errors.remarks?.type === 'required' && (
										<p className='mt-1 text-danger'>Remarks is required</p>
										)
									} */}
									</Grid>
								</Grid>
								<div>
									<Button
										variant='outlined'
										color='primary'
										type='submit'
										className={classes.addButton}>
										Add
									</Button>
								</div>
							</Form>
						)}
					</Formik>
				</Container>
				<div
					className='container-fluid'
					style={{ textAlign: 'left', marginTop: '50px' }}>
					<table class='table table-responsive table-hover table-striped table-bordered border-dark text-center mt-3'>
						<thead class='bg-dark text-light'>
							<tr>
								<th>S.No.</th>
								<th>Product Category</th>
								<th>Product Name</th>
								<th>Product Code</th>
								<th>Min Inventory Level</th>
								<th>Remarks</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{loading ? (
								<Loading />
							) : error ? (
								<MaterialError />
							) : products.length ? (
								products.map((product, i) => (
									<tr key={i}>
										<td>{i + 1}</td>
										<td>Finished</td>
										<td>{product.name}</td>
										<td>{product.productCode}</td>
										<td>{product.minInventoryLevel}</td>
										<td>{product.remarks}</td>
										<td>
											<>
												<Button
													variant='contained'
													className='bg-dark text-light'
													size='small'
													onClick={() => handleOpen(product)}
													style={{ marginTop: 2 }}>
													Edit
												</Button>
												<Button
													variant='contained'
													color='secondary'
													size='small'
													onClick={() => deleteProduct(product._id)}
													style={{ marginLeft: 2, marginTop: 2 }}>
													Delete
												</Button>
											</>
										</td>
									</tr>
								))
							) : (
								<h5>Not Found</h5>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</Sidenav>
	);
};

export default Products;
