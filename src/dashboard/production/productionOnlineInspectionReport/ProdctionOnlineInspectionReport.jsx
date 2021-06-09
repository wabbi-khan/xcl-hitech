import React, { useEffect, useState } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { fetchMachineAction } from '../../../services/action/MachineAction';
import Loading from '../../purchase/material/Loading';
import MaterialError from '../../purchase/material/MaterialError';
import Grid from '@material-ui/core/Grid';

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
			width: '10%',
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
			marginLeft: 10,
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

const ProductionOnlineInspectionReport = () => {
	const classes = useStyles();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const dispatch = useDispatch();

	useEffect(async () => {
		await dispatch(fetchMachineAction());
	}, [dispatch]);

	const { machines, loading, error } = useSelector((state) => state.machines);

	const onSubmitDate = async () => {
		try {
			await axios({
				method: 'POST',
				url: `${process.env.REACT_APP_API_URL}/machine`,
				headers: {
					'Content-Type': 'application/json',
				},
				data: {
					name: inputFields.name,
					code: inputFields.code,
					date: inputFields.date,
				},
			});
			window.location.reload();
		} catch (error) {
			console.log(error);
		}
	};

	const todaysDate = new Date(Date.now());
	const sortedDate = `${todaysDate.getDate()}/${todaysDate.getMonth()}/${todaysDate.getFullYear()}`;

	const [open, setOpen] = useState(false);
	const [machine, setMachine] = useState({});
	const [inputFields, setInputFields] = useState({
		name: '',
		code: '',
		date: sortedDate,
	});

	const onChangeHandler = (e, placeholder) => {
		console.log(placeholder);
		if (placeholder !== 'date')
			setInputFields({ ...inputFields, [placeholder]: e.target.value });
	};

	const handleClose = () => {
		setOpen(!open);
	};

	const handleOpen = (machine) => {
		console.log(machine);
		setMachine(machine);
		setOpen(true);
	};

	const onUpdateSubmit = async (machine) => {
		setMachine({});
		try {
			await axios({
				method: 'PATCH',
				url: `${process.env.REACT_APP_API_URL}/machine/${machine._id}`,
				headers: {
					'Content-Type': 'application/json',
				},
				data: {
					name: machine.name,
					code: machine.code,
					date: machine.date,
				},
			});
			window.location.reload();
		} catch (error) {
			console.log(error);
		}
	};

	const onDelete = async (id) => {
		try {
			await axios({
				method: 'DELETE',
				url: `${process.env.REACT_APP_API_URL}/machine/${id}`,
			});
			window.location.reload();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Sidenav title={'Machine'}>
			<div>
				<Container className={classes.mainContainer}>
					<form action='' onSubmit={handleSubmit(onSubmitDate)}>
						{/* Material category selector */}
						<Grid container spacing={1} style={{ marginTop: 15 }}>
							<Grid item lg={4} md={4} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='P.R. No.'
									variant='outlined'
									type='text'
									size='small'
									style={{ width: '100%' }}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
									{...register('poNum', { required: true })}
								/>
								{errors.poNum?.type === 'required' && (
									<p className='mt-1 text-danger'>P.O. No. is required</p>
								)}
							</Grid>
							<Grid item lg={4} md={4} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='P.R. No.'
									variant='outlined'
									type='text'
									size='small'
									style={{ width: '100%' }}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
									{...register('poNum', { required: true })}
								/>
								{errors.poNum?.type === 'required' && (
									<p className='mt-1 text-danger'>P.O. No. is required</p>
								)}
							</Grid>
							<Grid item lg={4} md={4} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='P.R. No.'
									variant='outlined'
									type='text'
									size='small'
									style={{ width: '100%' }}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
									{...register('poNum', { required: true })}
								/>
								{errors.poNum?.type === 'required' && (
									<p className='mt-1 text-danger'>P.O. No. is required</p>
								)}
							</Grid>
						</Grid>
						<Grid container spacing={1} style={{ marginTop: 15 }}>
							<Grid item lg={4} md={4} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='P.R. No.'
									variant='outlined'
									type='text'
									size='small'
									style={{ width: '100%' }}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
									{...register('poNum', { required: true })}
								/>
								{errors.poNum?.type === 'required' && (
									<p className='mt-1 text-danger'>P.O. No. is required</p>
								)}
							</Grid>
							<Grid item lg={4} md={4} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='P.R. No.'
									variant='outlined'
									type='text'
									size='small'
									style={{ width: '100%' }}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
									{...register('poNum', { required: true })}
								/>
								{errors.poNum?.type === 'required' && (
									<p className='mt-1 text-danger'>P.O. No. is required</p>
								)}
							</Grid>
							<Grid item lg={4} md={4} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='P.R. No.'
									variant='outlined'
									type='text'
									size='small'
									style={{ width: '100%' }}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
									{...register('poNum', { required: true })}
								/>
								{errors.poNum?.type === 'required' && (
									<p className='mt-1 text-danger'>P.O. No. is required</p>
								)}
							</Grid>
						</Grid>
						<Grid container spacing={1} style={{ marginTop: 15 }}>
							<Grid item lg={4} md={4} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='P.R. No.'
									variant='outlined'
									type='text'
									size='small'
									style={{ width: '100%' }}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
									{...register('poNum', { required: true })}
								/>
								{errors.poNum?.type === 'required' && (
									<p className='mt-1 text-danger'>P.O. No. is required</p>
								)}
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
					</form>
				</Container>

				<div className={classes.dataTable}>
					<TableContainer className={classes.tableContainer}>
						<Table
							stickyHeader
							className='table table-dark'
							style={{ backgroundColor: '#d0cfcf', border: '1px solid grey' }}>
							<TableHead>
								<TableRow hover role='checkbox'>
									<StyledTableCell align='center'>Sr.No</StyledTableCell>
									<StyledTableCell align='center'>Machine Name</StyledTableCell>
									<StyledTableCell align='center'>Code</StyledTableCell>
									<StyledTableCell align='center'>Action</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{loading ? (
									<Loading />
								) : error ? (
									<MaterialError />
								) : machines.length ? (
									machines.map((machine, i) => (
										<StyledTableRow>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{i + 1}
											</StyledTableCell>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{machine.name}
											</StyledTableCell>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{machine.code}
											</StyledTableCell>
											<StyledTableCell className='text-light bg-light' align='center'>
												<Button
													variant='contained'
													className='bg-dark text-light'
													size='small'
													onClick={() => {
														handleOpen(machine);
													}}
													style={{ marginTop: 2 }}>
													Edit
												</Button>
												<Button
													variant='contained'
													color='secondary'
													size='small'
													onClick={() => {
														onDelete(machine._id);
													}}
													style={{ marginLeft: 2, marginTop: 2 }}>
													Delete
												</Button>
											</StyledTableCell>
										</StyledTableRow>
									))
								) : (
									<h5>Not Found</h5>
								)}
							</TableBody>
						</Table>
					</TableContainer>
				</div>
			</div>
		</Sidenav>
	);
};

export default ProductionOnlineInspectionReport;
