import React, { useEffect, useState } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
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
import { getEmployees } from '../../../services/action/EmployeesAction';
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
	dataTable: {},
}));

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
	}, [dispatch]);

	const { employees, loading, error } = useSelector((state) => state.employees);

	return (
		<Sidenav title={'Employee Details'}>
			<div className={classes.dataTable}>
				<h5>Un-Hired</h5>
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
								employees.map((emp, i) => (
									<StyledTableRow>
										<StyledTableCell className='text-dark bg-light' align='center'>
											{i + 1}
										</StyledTableCell>
										<StyledTableCell className='text-dark bg-light' align='center'>
											{emp.name}
										</StyledTableCell>
										<StyledTableCell className='text-dark bg-light' align='center'>
											{/* {
                                                                    !emp.department ? null : emp.department.name
                                                                } */}
										</StyledTableCell>
										<StyledTableCell className='text-dark bg-light' align='center'>
											{/* {
                                                                    !vendor.material || !vendor.material.length ? <p>Not Found</p> :
                                                                    vendor.material.map((value, i) => (
                                                                        <span key={i} className="ml-1">{value.name},</span>
                                                                        ))
                                                                    } */}
										</StyledTableCell>
										<StyledTableCell className='text-light bg-light' align='center'>
											<StyledTableCell>
												<Button
													variant='contained'
													className='bg-dark text-light'
													size='small'
													onClick={() => {
														history.push(`/hr/employees/print_emp_details`);
													}}>
													View Details
												</Button>
												<Link to='/hr/employees/hired_employee_details'>
													<Button
														variant='contained'
														className='bg-success text-light ml-1'
														size='small'>
														Hired
													</Button>
												</Link>
											</StyledTableCell>
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
			<div className={classes.dataTable}>
				<h5>Hired</h5>
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
							) : (
								// !employee || !employee.length ?
								//     employee.map((emp, i) => (
								<StyledTableRow>
									<StyledTableCell className='text-dark bg-light' align='center'>
										{1}
									</StyledTableCell>
									<StyledTableCell className='text-dark bg-light' align='center'>
										{}
									</StyledTableCell>
									<StyledTableCell className='text-dark bg-light' align='center'>
										{/* {
                                                                    !emp.department ? null : emp.department.name
                                                                } */}
									</StyledTableCell>
									<StyledTableCell className='text-dark bg-light' align='center'>
										{/* {
                                                                    !vendor.material || !vendor.material.length ? <p>Not Found</p> :
                                                                        vendor.material.map((value, i) => (
                                                                            <span key={i} className="ml-1">{value.name},</span>
                                                                        ))
                                                                } */}
									</StyledTableCell>
									<StyledTableCell className='text-light bg-light' align='center'>
										<Button
											variant='contained'
											className='bg-dark text-light'
											size='small'
											onClick={() => {
												history.push(``);
											}}>
											View Report
										</Button>
									</StyledTableCell>
								</StyledTableRow>
								// ))
								// : <h5>Not Found</h5>
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		</Sidenav>
	);
};

export default ViewEmpDetails;
