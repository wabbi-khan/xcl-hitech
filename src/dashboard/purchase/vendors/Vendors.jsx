import React, { useEffect, useState } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
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
import MaterialError from '../material/MaterialError';
import Loading from '../material/Loading';
import { getMaterialCategoryAction } from '../../../services/action/MatCategoryAction';
import { getMaterialAction } from '../../../services/action/MaterialDataHandle';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import FormGroup from '@material-ui/core/FormGroup';
import EditVendor from './EditVendor';

const GreenCheckbox = withStyles({
	root: {
		//   color: black[400],
		'&$checked': {
			// color: green[600],
		},
	},
	checked: {},
})((props) => <Checkbox color='default' {...props} />);

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

function createData(No, name, Action) {
	return { No, name, Action };
}

const rows = [createData(1, 'Item1')];

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

const Vendors = () => {
	const classes = useStyles();
	const [Materials, setMaterials] = useState([]);
	const [addVendorSuccess, setAddVendorSuccess] = useState(false);
	const [addVendorFail, setAddVendorFail] = useState(false);
	const [vendor, setVendor] = useState();

	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm();

	useEffect(async () => {
		dispatch(getVendorAction());
		dispatch(getMaterialCategoryAction());
	}, [dispatch]);

	const { loading, vendors, error } = useSelector((state) => state.vendors);
	const fetchMatCategory = useSelector((state) => state.categories);
	const { materials } = useSelector((state) => state.materials);

	const fetchMaterials = async (id) => {
		setMaterials([]);
		console.log('object');
		dispatch(getMaterialAction(`category=${id}`));
	};

	const getMaterials = async (event) => {
		// console.log(event.target);
		if (event.target.checked) {
			setMaterials([...Materials, event.target.value]);
		}
		if (event.target.checked === false) {
			setMaterials(Materials.filter((value) => value !== event.target.value));
		}
	};

	const onSubmitData = async (data) => {
		data.material = Materials;
		try {
			dispatch(createVendorAction(data));
			setAddVendorSuccess(true);
		} catch (error) {
			setAddVendorFail(true);
		}
	};

	const deleteVendor = async (params) => {
		dispatch(deleteVendorAction(params));
	};

	const [open, setOpen] = useState(false);

	const handleClose = (props) => {
		setOpen(props);
	};

	const handleOpen = async (vendor) => {
		setOpen(true);
		setVendor(vendor);
	};

	const handleChange = async (e) => {
		e.preventDefault();
		dispatch(getVendorAction(`name[regex]=${e.target.value}`));
	};

	return (
		<Sidenav title={'Vendors'}>
			<div>
				<Container className={classes.mainContainer}>
					<form onSubmit={handleSubmit(onSubmitData)}>
						<Grid container spacing={1}>
							{/* ============Vendor Name======================== */}
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='Enter Vendor Name'
									variant='outlined'
									type='text'
									size='small'
									autocomplete='off'
									className={classes.inputFieldStyle}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
									{...register('name', { required: true })}
								/>
								<br />
								{errors.name?.type === 'required' && (
									<p className='text-danger mt-2'>Vendor name is required</p>
								)}
							</Grid>

							{/* ============Vendor email======================== */}
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='Email'
									variant='outlined'
									type='email'
									autocomplete='off'
									size='small'
									className={classes.inputFieldStyle}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
									{...register('email', {
										required: true,
										pattern: {
											value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
											message: 'Enter a valid Email Address',
										},
									})}
								/>
								<br />
								{errors?.email && (
									<span className='text-danger mt-2'>{errors.email.message}</span>
								)}
								<br />
								{errors.email?.type === 'required' && (
									<p className='text-danger'>Vendor email is required</p>
								)}
							</Grid>

							{/* ============Vendor phone======================== */}
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='Phone No.'
									variant='outlined'
									type='text'
									autocomplete='off'
									size='small'
									className={classes.inputFieldStyle}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
									{...register('phone', { required: true })}
								/>
								<br />
								{errors.phone?.type === 'required' && (
									<p className='text-danger mt-2'>Phone No is required</p>
								)}
							</Grid>

							{/* ============Vendor location======================== */}
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='Address'
									variant='outlined'
									type='text'
									size='small'
									autocomplete='off'
									className={classes.inputFieldStyle}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
									{...register('location', { required: true })}
								/>
								<br />
								{errors.location?.type === 'required' && (
									<p className='text-danger mt-2'>Address is required</p>
								)}
							</Grid>
						</Grid>
						<Grid container spacing={1} style={{ marginTop: 8 }}>
							{/* ============Vendor category======================== */}
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='Select Category'
									variant='outlined'
									type='text'
									autoComplete='off'
									size='small'
									select
									className={classes.inputFieldStyle}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
									{...register('category', { required: true })}>
									{!fetchMatCategory.categories ||
										!fetchMatCategory.categories.length ? (
										<p>Data Not Found</p>
									) : (
										fetchMatCategory.categories.map((category, i) => (
											<MenuItem
												value={category._id}
												onClick={(e) => fetchMaterials(category._id)}
												key={i}>
												{category.name}
											</MenuItem>
										))
									)}
								</CssTextField>
								{errors.category?.type === 'required' && (
									<p className='text-danger mt-2'>Please select category</p>
								)}
							</Grid>

							{/* ============Vendor category material======================== */}
							<Grid item lg={3} md={3} sm={6} xs={6} className={classes.ckeckBox}>
								<FormGroup row>
									{!getValues('category') ? (
										<p className='mt-2 ml-4'>Please Select Any Category</p>
									) : !materials || !materials.length ? (
										<p className='mt-2 ml-4'>
											No Materials found for the selected Category
										</p>
									) : (
										materials.map((material, i) => (
											<FormControlLabel
												key={i}
												control={
													<Checkbox
														icon={<CheckBoxOutlineBlankIcon fontSize='small' />}
														checkedIcon={<CheckBoxIcon fontSize='small' />}
														onChange={(e) => getMaterials(e)}
													/>
												}
												name={material.name}
												value={material._id}
												label={material.name}
												{...register('material')}
											/>
										))
									)}
								</FormGroup>
							</Grid>
						</Grid>

						{/* ============All msg show here about add vendor succsese / fail========= */}
						{
							addVendorSuccess ? <span>Vendor Added Successfully</span> : null
						}
						{
							addVendorFail ? <span>Vendor Added Failed</span> : null
						}
						<div>
							<Button
								variant='outlined'
								color='primary'
								type='submit'
								className={classes.addButton}>
								Add Vendor
							</Button>
						</div>
					</form>
				</Container>
				{/* ============edit vendor form component */}
				<EditVendor
					show={open}
					handler={handleClose}
					vendor={vendor}
					categories={fetchMatCategory.categories}
					materials={materials}
				/>
				{/* ============edit vendor form component */}
				<div className={classes.dataTable}>
					<CssTextField
						id='outlined-basic'
						label='Search Vendors'
						variant='outlined'
						type='search'
						size='small'
						autoComplete='off'
						// value={input}
						onChange={handleChange}
						className={classes.inputFieldStyle1}
						inputProps={{ style: { fontSize: 14 } }}
						InputLabelProps={{ style: { fontSize: 14 } }}
					/>
					<TableContainer className={classes.tableContainer}>
						<Table
							stickyHeader
							className='table table-dark'
							style={{ backgroundColor: '#d0cfcf', border: '1px solid grey' }}>
							<TableHead>
								<TableRow hover role='checkbox'>
									<StyledTableCell align='center'>Sr.No</StyledTableCell>
									<StyledTableCell align='center'>Vendor Name</StyledTableCell>
									<StyledTableCell align='center'>Phone No.</StyledTableCell>
									<StyledTableCell align='center'>Address</StyledTableCell>
									<StyledTableCell align='center'>Category</StyledTableCell>
									<StyledTableCell align='center'>Items</StyledTableCell>
									<StyledTableCell align='center'>Action</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{loading ? (
									<Loading />
								) : error ? (
									<MaterialError />
								) : !vendors || !vendors.length ? (
									<p>Not Found</p>
								) : (
									vendors.map((vendor, i) => (
										<StyledTableRow key={i}>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{i + 1}
											</StyledTableCell>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{vendor.name}
											</StyledTableCell>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{vendor.phone}
											</StyledTableCell>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{vendor.location}
											</StyledTableCell>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{!vendor.category ? null : vendor.category.name}
											</StyledTableCell>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{!vendor.material || !vendor.material.length ? (
													<p>Not Found</p>
												) : (
													vendor.material.map(
														(value, i) =>
															i < 3 && (
																<span key={i} className='ml-1'>
																	{value.name},
																</span>
															),
													)
												)}
											</StyledTableCell>
											<StyledTableCell className='text-light bg-light' align='center'>
												<>
													<Button
														variant='contained'
														className='bg-dark text-light'
														size='small'
														onClick={() => handleOpen(vendor)}
														style={{ marginTop: 2 }}>
														Edit
													</Button>
													<Button
														variant='contained'
														color='secondary'
														size='small'
														onClick={() => deleteVendor(vendor._id)}
														style={{ marginLeft: 2, marginTop: 2 }}>
														Delete
													</Button>
												</>
											</StyledTableCell>
										</StyledTableRow>
									))
								)}
							</TableBody>
						</Table>
					</TableContainer>
				</div>
			</div>
		</Sidenav>
	);
};

export default Vendors;
