import React, { useState, useEffect } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { getMaterialAction } from '../../../services/action/MaterialDataHandle';
// import axios from 'axios';
import { fetchDepartmentsAction } from '../../../services/action/DepartmentAction';
import { createPurchaseReqAction } from '../../../services/action/PurchaseReqAction';
import MyButton from '../../../components/utils/Button';

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

const PurchaseRequisition = ({ history }) => {
	const classes = useStyles();
	const [ItemCounter, setItemCounter] = useState([
		{ material: '', quantity: '', unitValue: '', remarks: '' },
	]);
	const [createLoading, setCreateLoading] = React.useState(false);
	const [error, setError] = React.useState('');
	const [success, setSuccess] = React.useState('');

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const addMoreFunc = () => {
		setItemCounter([
			...ItemCounter,
			{ material: '', quantity: '', unitValue: '', remarks: '' },
		]);
	};

	const deleteItem = (i) => {
		const temp = [...ItemCounter];
		temp.splice(i, 1);
		setItemCounter(temp);
	};

	const onChangeHandler = (e, placeholder, index) => {
		const tempFields = ItemCounter.map((item, i) => {
			if (i === index) {
				return { ...item, [placeholder]: e.target.value };
			} else {
				return { ...item };
			}
		});
		setItemCounter(tempFields);
	};

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getMaterialAction());
		dispatch(fetchDepartmentsAction());
	}, [dispatch]);

	const { materials } = useSelector((state) => state.materials);
	const { departments } = useSelector((state) => state.departments);

	const onSubmitDate = async (props) => {
		console.log({ ...props, materials: ItemCounter });
		setCreateLoading(true);
		dispatch(
			createPurchaseReqAction({ ...props, materials: ItemCounter }, (err) => {
				if (err) {
					setError(err);
				} else {
					setSuccess('Successfully requested');
				}
				setCreateLoading(false);
			}),
		);
	};

	return (
		<Sidenav title={'Purchase Requisition'}>
			<div>
				<form action='' onSubmit={handleSubmit(onSubmitDate)}>
					<Container className={classes.mainContainer}>
						<Grid container spacing={1} style={{ marginTop: 15 }}>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='Select Department*'
									variant='outlined'
									type='select'
									size='small'
									select
									className={classes.inputFieldStyle}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
									{...register('department', { required: true })}>
									{!departments || !departments.length ? (
										<MenuItem>Not Found</MenuItem>
									) : (
										departments.map((department) => (
											<MenuItem value={department._id} key={department._id}>
												{department.name}
											</MenuItem>
										))
									)}
								</CssTextField>
							</Grid>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='Purpose'
									variant='outlined'
									type='text'
									size='small'
									className={classes.inputFieldStyle}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
									{...register('purpose', { required: true })}
								/>
								{errors.purpose?.type === 'required' && (
									<p className='mt-1 text-danger'>Purpose is required</p>
								)}
							</Grid>
						</Grid>
					</Container>
					<div style={{ marginTop: 30, marginBottom: 30 }}>
						<hr />
					</div>
					<Container className={classes.mainContainer}>
						<h4 className='text-left'>Items</h4>
						{ItemCounter.map((value, i) => {
							const no = i + 1;
							return (
								<Grid key={i} container spacing={1} style={{ marginTop: 15 }}>
									<Grid item lg={1} md={1}>
										<h5 className={classes.itemHeading}>{no}</h5>
									</Grid>
									<Grid item lg={2} md={2} sm={12} xs={12}>
										<CssTextField
											id='outlined-basic'
											label='Select Item'
											variant='outlined'
											type='text'
											size='small'
											select
											onChange={(e) => {
												onChangeHandler(e, 'material', i);
											}}
											className={classes.inputFieldStyle2}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}>
											{!materials || !materials.length ? (
												<MenuItem>Please Select Vendor Name</MenuItem>
											) : (
												materials.map((material) => (
													<MenuItem value={material._id} key={material._id}>
														{material.name}
													</MenuItem>
												))
											)}
										</CssTextField>
									</Grid>
									<Grid item lg={1} md={1} sm={12} xs={12}></Grid>
									<Grid item lg={2} md={2} sm={12} xs={12}>
										<CssTextField
											id='outlined-basic'
											label='Quantity'
											variant='outlined'
											type='number'
											size='small'
											value={value.quantity}
											onChange={(e) => {
												onChangeHandler(e, 'quantity', i);
											}}
											className={classes.inputFieldStyle3}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
										/>
									</Grid>
									<Grid item lg={2} md={2} sm={12} xs={12}>
										<CssTextField
											id='outlined-basic'
											label='Unit Value'
											variant='outlined'
											type='number'
											size='small'
											value={value.unitValue}
											onChange={(e) => {
												onChangeHandler(e, 'unitValue', i);
											}}
											className={classes.inputFieldStyle4}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
										/>
									</Grid>
									<Grid item lg={2} md={2} sm={12} xs={12}>
										<CssTextField
											id='outlined-basic'
											label='Remarks'
											variant='outlined'
											type='text'
											size='small'
											value={value.remarks}
											onChange={(e) => {
												onChangeHandler(e, 'remarks', i);
											}}
											className={classes.inputFieldStyle5}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
										/>
									</Grid>
									<Grid item lg={2} md={2} sm={12} xs={12}>
										<Button
											onClick={() => deleteItem(i)}
											className={classes.deleteRowBtn}>
											<DeleteOutlineIcon className={classes.delete} />
										</Button>
									</Grid>
								</Grid>
							);
						})}
						<Grid container spacing={1}>
							<Grid item lg={3} md={3} sm={10} xs={11}>
								<Button
									variant='outlined'
									color='primary'
									className={classes.addButton}
									onClick={addMoreFunc}>
									Add More
								</Button>
							</Grid>
						</Grid>
						<Grid container spacing={1}>
							<Grid item lg={5} md={5} sm={10} xs={11}></Grid>
							<Grid item lg={3} md={3} sm={10} xs={11}>
								<MyButton
									variant='outlined'
									color='primary'
									classNames={classes.addButton}
									loading={createLoading}
									loaderColor='#333'
									text='Submit'
								/>
								{success && <p>{success}</p>}
							</Grid>
						</Grid>
					</Container>
				</form>
			</div>
		</Sidenav>
	);
};

export default PurchaseRequisition;
