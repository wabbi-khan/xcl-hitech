import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidenav from '../../SideNav/Sidenav';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import {
	getMaterialAction,
	createMaterialAction,
	deleteMaterialAction,
} from '../../../services/action/MaterialDataHandle';
import { getMaterialCategoryAction } from '../../../services/action/MatCategoryAction';
import { getSubCategories } from '../../../services/action/subCategoryAction';
import { getUnits } from '../../../services/action/unitAction';
import MaterialError from './MaterialError';
import EditMaterial from './EditMaterial';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import Button from '../../../components/utils/Button';
import Loader from 'react-loader-spinner';

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
		marginTop: 20,
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
	table: {
		minWidth: 600,
	},
	dataTable: {
		marginTop: 40,
	},
	tableContainer: {
		marginTop: 10,
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
		[theme.breakpoints.up('md')]: {
			width: 330,
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
	category: '',
	subCategory: '',
	unit: '',
};

const validationSchema = yup.object({
	name: yup.string().required(),
	category: yup.string().required(),
	subCategory: yup.string(),
	unit: yup.string().required(),
});

const searchOptions = ['code', 'name'];

const Material = () => {
	const [fetchLoading, setFetchLoading] = React.useState(true);
	const [fetchError, setFetchError] = React.useState('');
	const [createLoading, setCreateLoading] = React.useState(false);
	const [createError, setCreateError] = React.useState('');
	const [success, setSuccess] = React.useState('');
	const [selectedCategory, setSelectedCategory] = useState('');
	const [material, setMaterial] = useState();
	const [open, setOpen] = useState(false);
	const [deleteLoading, setDeleteLoading] = React.useState(false);
	const [deleteError, setDeleteError] = React.useState('');
	const [searchText, setSearchText] = React.useState('');
	const [searchBy, setSearchBy] = React.useState('code');
	const [initialValuesState, setInitialValuesState] = React.useState({
		...initialValues,
	});

	const classes = useStyles();

	const dispatch = useDispatch();

	const { materials } = useSelector((state) => state.materials);
	const { categories } = useSelector((state) => state.categories);
	const { units } = useSelector((state) => state.units);
	const { subCategories } = useSelector((state) => state.subCategories);

	console.log(materials);

	React.useEffect(() => {
		if (searchText) {
			setFetchLoading(true);
			dispatch(
				getMaterialAction(`${searchBy}[regex]=${searchText}`, (err) => {
					if (err) {
						setFetchError(err);
						setTimeout(() => {
							setFetchError('');
						}, 4000);
					}
					setFetchLoading(false);
				}),
			);
		} else {
			setFetchLoading(true);
			dispatch(
				getMaterialAction(null, (err) => {
					if (err) {
						setFetchError(err);
						setTimeout(() => {
							setFetchError('');
						}, 4000);
					}
					setFetchLoading(false);
				}),
			);
		}
	}, [searchText]);

	React.useEffect(() => {
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
		setFetchLoading(true);
		dispatch(
			getMaterialAction(null, (err) => {
				if (err) {
					setFetchError(err);
					setTimeout(() => {
						setFetchError('');
					}, 4000);
				}
				setFetchLoading(false);
			}),
		);
		dispatch(getMaterialCategoryAction());
		dispatch(getUnits());
	}, [dispatch]);

	const onSubmit = async (values) => {
		setCreateLoading(true);
		dispatch(
			createMaterialAction(values, (err) => {
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
			}),
		);
	};

	const deleteMaterial = async (params) => {
		setDeleteLoading(true);
		dispatch(
			deleteMaterialAction(params, (err) => {
				if (err) {
					setDeleteError(err);
					setTimeout(() => {
						setDeleteError('');
					}, 4000);
				}
				setDeleteLoading(false);
			}),
		);
	};

	const handleClose = (props) => {
		setOpen(props);
	};

	const handleOpen = async (material) => {
		setMaterial(material);
		setOpen(true);
	};

	return (
		<Sidenav title={'Material'}>
			<EditMaterial show={open} handler={handleClose} material={material} />
			{deleteLoading && (
				<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
					<Loader type='TailSpin' width='2rem' height='2rem' />
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
						onSubmit={onSubmit}>
						{(props) => (
							<Form>
								<Grid container spacing={1}>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id='outlined-basic'
											label='Select Category'
											variant='outlined'
											type='text'
											autocomplete='off'
											size='small'
											style={{ width: '100%' }}
											select
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('category')}
											onBlur={props.handleBlur('category')}
											value={props.values.category}
											helperText={props.touched.category && props.errors.category}
											error={props.touched.category && props.errors.category}>
											{!categories || !categories.length ? (
												<p>Data Not Found</p>
											) : (
												categories.map((el) => (
													<MenuItem
														value={el._id}
														key={el._id}
														onClick={() => setSelectedCategory(el._id)}>
														{el.name}
													</MenuItem>
												))
											)}
										</CssTextField>
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id='outlined-basic'
											label='Select Sub Category'
											variant='outlined'
											type='text'
											style={{ width: '100%' }}
											autocomplete='off'
											size='small'
											select
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('subCategory')}
											onBlur={props.handleBlur('subCategory')}
											value={props.values.subCategory}
											helperText={props.touched.subCategory && props.errors.subCategory}
											error={props.touched.subCategory && props.errors.subCategory}>
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
											id='outlined-basic'
											label='Enter Material Name'
											variant='outlined'
											type='text'
											autocomplete='off'
											size='small'
											style={{ width: '100%' }}
											autoComplete='off'
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('name')}
											onBlur={props.handleBlur('name')}
											value={props.values.name}
											helperText={props.touched.name && props.errors.name}
											error={props.touched.name && props.errors.name}
										/>
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id='outlined-basic'
											label='Select Unit'
											variant='outlined'
											type='text'
											autocomplete='off'
											size='small'
											select
											autoComplete='off'
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('unit')}
											onBlur={props.handleBlur('unit')}
											value={props.values.unit}
											helperText={props.touched.unit && props.errors.unit}
											error={props.touched.unit && props.errors.unit}>
											{!units || !units.length ? (
												<p>Data Not Found</p>
											) : (
												units.map((el) => (
													<MenuItem value={el._id} key={el._id}>
														{el.name}
													</MenuItem>
												))
											)}
										</CssTextField>
									</Grid>
								</Grid>
								<div>
									<Button
										variant='outlined'
										color='primary'
										text='Add'
										classNames={classes.addButton}
										loading={createLoading}
										loaderColor='#333'
									/>
									{createError && <p>{createError}</p>}
								</div>
							</Form>
						)}
					</Formik>
				</Container>

				<div style={{ marginTop: '3rem' }}></div>

				<CssTextField
					id='outlined-basic'
					label='Search Materials'
					variant='outlined'
					type='search'
					size='small'
					autoComplete='off'
					style={{ width: '20%', marginRight: 20 }}
					inputProps={{ style: { fontSize: 14 } }}
					InputLabelProps={{ style: { fontSize: 14 } }}
					onChange={(e) => setSearchText(e.target.value)}
				/>
				<CssTextField
					id='outlined-basic'
					label='Search By'
					variant='outlined'
					type='search'
					size='small'
					select
					style={{ width: '20%' }}
					onChange={(e) => setSearchBy(e.target.value)}
					autoComplete='off'
					value={searchBy}
					inputProps={{ style: { fontSize: 14 } }}
					InputLabelProps={{ style: { fontSize: 14 } }}>
					{!searchOptions || !searchOptions.length ? (
						<p>Data Not Found</p>
					) : (
						searchOptions.map((el) => (
							<MenuItem value={el} key={el} style={{ textTransform: 'capitalize' }}>
								{el}
							</MenuItem>
						))
					)}
				</CssTextField>
				{fetchLoading ? (
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							marginTop: '3rem',
						}}>
						<Loader type='TailSpin' color='#000' width='3rem' height='3rem' />
					</div>
				) : materials?.length === 0 ? (
					<p>There are no Responsibilities</p>
				) : (
					<div className={classes.dataTable}>
						<TableContainer className={classes.tableContainer}>
							<Table
								stickyHeader
								className='table table-dark'
								style={{ backgroundColor: '#d0cfcf', border: '1px solid grey' }}>
								<TableHead>
									<TableRow hover role='checkbox'>
										<StyledTableCell align='center'>Sr.No</StyledTableCell>
										<StyledTableCell align='center'>Material Name</StyledTableCell>
										<StyledTableCell align='center'>Category</StyledTableCell>
										<StyledTableCell align='center'>Sub Category</StyledTableCell>
										<StyledTableCell align='center'>Unit</StyledTableCell>
										<StyledTableCell align='center'>Code</StyledTableCell>
										<StyledTableCell align='center'>Action</StyledTableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{materials.map((material, i) => (
										<StyledTableRow key={i}>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{i + 1}
											</StyledTableCell>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{material?.name}
											</StyledTableCell>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{material?.category?.name}
											</StyledTableCell>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{material?.subCategory?.name
													? material?.subCategory?.name
													: '------'}
											</StyledTableCell>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{material?.unit?.name}
											</StyledTableCell>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{material?.code}
											</StyledTableCell>
											<StyledTableCell className='text-light bg-light' align='center'>
												<div
													style={{
														display: 'flex',
														alignItems: 'center',
														justifyContent: 'center',
													}}>
													<Button
														variant='contained'
														classNames='bg-dark text-light'
														size='small'
														onClick={() => handleOpen(material)}
														text='Edit'
														style={{ marginTop: 2 }}
													/>

													<Button
														variant='contained'
														color='secondary'
														size='small'
														onClick={() => deleteMaterial(material._id)}
														text='Delete'
														style={{ marginLeft: 2, marginTop: 2 }}
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

export default Material;
