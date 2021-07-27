import React, { useEffect, useState } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { useForm } from 'react-hook-form';
import Loading from '../../purchase/material/Loading';
import MaterialError from '../../purchase/material/MaterialError';
import {
	getEmployees,
	getUnHiredEmployees,
} from '../../../services/action/EmployeesAction';
import { Link } from 'react-router-dom';

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
		marginTop: '10px'
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

const ViewEmpDetails = (props) => {
	const { history } = props;
	const id = props.match.params.id;

	const classes = useStyles();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const dispatch = useDispatch();

	useEffect(async () => {
		dispatch(getEmployees());
		dispatch(getUnHiredEmployees());
	}, [dispatch]);

	const { employees, unHiredEmployees, loading, error } = useSelector(
		(state) => state.employees,
	);

	console.log(employees);
	return (
		<Sidenav title={'Employee Details'}>
			<div className={classes.dataTable}>
				{/* <h5>Un-Hired</h5> */}
				<div style={{ display: 'flex', }}>
					<CssTextField
						id='outlined-basic'
						label='Search Un-Hired Employees'
						variant='outlined'
						type='search'
						size='small'
						autoComplete='off'
						// onChange={handleChange}
						style={{ width: '25%', marginTop: '5px' }}
						inputProps={{ style: { fontSize: 14 } }}
						InputLabelProps={{ style: { fontSize: 14 } }}
					/>
					<CssTextField
						id='outlined-basic'
						label='Search By Category'
						variant='outlined'
						type='text'
						size='small'
						select
						autoComplete='off'
						// onChange={handleChange}
						style={{ width: '15%', marginTop: '5px', marginLeft: '3px' }}
						inputProps={{ style: { fontSize: 14 } }}
						InputLabelProps={{ style: { fontSize: 14 } }}
					>
						<MenuItem value="0">By Id</MenuItem>
						<MenuItem value="0">By Name</MenuItem>
					</CssTextField>
				</div>
				<TableContainer className={classes.tableContainer}>
					<Table
						stickyHeader
						className='table table-dark'
						style={{ backgroundColor: '#d0cfcf', border: '1px solid grey' }}>
						<TableHead>
							<TableRow hover role='checkbox'>
								<StyledTableCell align='center'>Sr.No</StyledTableCell>
								<StyledTableCell align='center'>Name</StyledTableCell>
								<StyledTableCell align='center'>Designation</StyledTableCell>
								<StyledTableCell align='center'>Department</StyledTableCell>
								<StyledTableCell align='center'>Action</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{
								loading ? (
									<Loading />
								) : error ? (
									<MaterialError />
								) : !unHiredEmployees || !unHiredEmployees.length ? (
									<h5>Not Found</h5>
								) : (
									unHiredEmployees.map((unHiredEmployee, i) => (
										<StyledTableRow>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{i + 1}
											</StyledTableCell>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{unHiredEmployee?.name}
											</StyledTableCell>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{unHiredEmployee?.officeUse?.jobTitle}
											</StyledTableCell>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{unHiredEmployee?.officeUse?.department?.name}
											</StyledTableCell>
											<StyledTableCell className='text-light bg-light' align='center'>
												<StyledTableCell
													style={{
														alignItems: 'center',
														justifyContent: 'center',
														display: 'flex',
													}}>
													<Button
														variant='contained'
														className='bg-dark text-light'
														size='small'
														onClick={() => {
															history.push(
																// `/hr/edit_emp_details/${unHiredEmployee._id}`,
																`/hr/edit_emp_details`,
															);
														}}>
														Edit
													</Button>
													<Button
														variant='contained'
														className='bg-dark text-light'
														size='small'
														style={{ marginLeft: 3 }}
														onClick={() => {
															history.push(
																`/hr/employees/print_emp_details/${unHiredEmployee._id}`,
															);
														}}
														>
														View Details
													</Button>
													<Link
														to={`/hr/employees/hired_employee_details/${unHiredEmployee._id}`}>
														<Button
															variant='contained'
															className='bg-success text-light'
															size='small'
															style={{ marginLeft: 3 }}>
															Hired
														</Button>
													</Link>
												</StyledTableCell>
											</StyledTableCell>
										</StyledTableRow>
									))
								)
							}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
			<div className={classes.dataTable}>
				{/* <h5>Hired</h5> */}
				<div style={{ display: 'flex', }}>
					<CssTextField
						id='outlined-basic'
						label='Search Hired Employees'
						variant='outlined'
						type='search'
						size='small'
						autoComplete='off'
						// onChange={handleChange}
						style={{ width: '25%', marginTop: '30px' }}
						inputProps={{ style: { fontSize: 14 } }}
						InputLabelProps={{ style: { fontSize: 14 } }}
					/>
					<CssTextField
						id='outlined-basic'
						label='Search By Category'
						variant='outlined'
						type='text'
						size='small'
						select
						autoComplete='off'
						// onChange={handleChange}
						style={{ width: '15%', marginTop: '30px', marginLeft: '3px' }}
						inputProps={{ style: { fontSize: 14 } }}
						InputLabelProps={{ style: { fontSize: 14 } }}
					>
						<MenuItem value="0">By Id</MenuItem>
						<MenuItem value="0">By Name</MenuItem>
					</CssTextField>
				</div>
				<TableContainer className={classes.tableContainer}>
					<Table
						stickyHeader
						className='table table-dark'
						style={{ backgroundColor: '#d0cfcf', border: '1px solid grey' }}>
						<TableHead>
							<TableRow hover role='checkbox'>
								<StyledTableCell align='center'>Sr.No</StyledTableCell>
								<StyledTableCell align='center'>Name</StyledTableCell>
								<StyledTableCell align='center'>Designation</StyledTableCell>
								<StyledTableCell align='center'>Department</StyledTableCell>
								<StyledTableCell align='center'>Action</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{loading ? (
								<Loading />
							) : error ? (
								<MaterialError />
							) : !employees || !employees.length ? (
								<h5>Not Found</h5>
							) : (
								employees.map((employee, i) => (
									<StyledTableRow>
										<StyledTableCell className='text-dark bg-light' align='center'>
											{i + 1}
										</StyledTableCell>
										<StyledTableCell className='text-dark bg-light' align='center'>
											{employee?.name}
										</StyledTableCell>
										<StyledTableCell className='text-dark bg-light' align='center'>
											{employee?.finalDesignation?.name}
										</StyledTableCell>
										<StyledTableCell className='text-dark bg-light' align='center'>
											{employee?.officeUse?.department?.name}
										</StyledTableCell>
										<StyledTableCell className='text-light bg-light' align='center'>
											<Button
												variant='contained'
												className='bg-dark text-light'
												size='small'
												onClick={() => {
													history.push(`/hr/employees/print_emp_details/${employee._id}`);
												}}>
												View Report
											</Button>
										</StyledTableCell>
									</StyledTableRow>
								))
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		</Sidenav>
	);
};

export default ViewEmpDetails;
