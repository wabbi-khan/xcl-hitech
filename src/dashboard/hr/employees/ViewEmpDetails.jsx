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
import {
	getEmployees,
	getUnHiredEmployees,
	deleteEmployee,
} from '../../../services/action/EmployeesAction';
import { getDesignation } from '../../../services/action/DesignationAction';
import { fetchDepartmentsAction } from '../../../services/action/DepartmentAction';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { capitalize } from '../../../utils/capitalize';

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
		marginTop: '10px',
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
	const [unHiredSearchBy, setUnHiredSearchBy] = React.useState('code');
	const [hiredSearchBy, setHiredSearchBy] = React.useState('code');
	const [unHiredLoading, setUnHiredLoading] = React.useState(true);
	const [hiredLoading, setHiredLoading] = React.useState(true);
	const [deleteLoading, setDeleteLoading] = React.useState(false);
	const [deleteError, setDeleteError] = React.useState('');
	const { history } = props;
	const id = props.match.params.id;

	const classes = useStyles();
	const dispatch = useDispatch();

	useEffect(async () => {
		setHiredLoading(true);
		dispatch(
			getEmployees(null, () => {
				setHiredLoading(false);
			})
		);
		setUnHiredLoading(true);
		dispatch(
			getUnHiredEmployees(null, () => {
				setUnHiredLoading(false);
			})
		);
		dispatch(getDesignation());
		dispatch(fetchDepartmentsAction());
	}, [dispatch]);

	const { employees, unHiredEmployees } = useSelector(
		(state) => state.employees
	);

	const searchUnHired = (value) => {
		setUnHiredLoading(true);
		if (value.length > 0) {
			dispatch(
				getUnHiredEmployees(`${unHiredSearchBy}[regex]=${value}`, () => {
					setUnHiredLoading(false);
				})
			);
		} else {
			dispatch(
				getUnHiredEmployees(null, () => {
					setUnHiredLoading(false);
				})
			);
		}
	};

	const searchHired = (value) => {
		setHiredLoading(true);
		if (value.length > 0) {
			dispatch(
				getEmployees(`${hiredSearchBy}[regex]=${value}`, () => {
					setHiredLoading(false);
				})
			);
		} else {
			dispatch(
				getEmployees(null, () => {
					setHiredLoading(false);
				})
			);
		}
	};

	const deleteEmp = (id) => {
		setDeleteLoading(true);
		dispatch(
			deleteEmployee(id, (err) => {
				if (err) {
					setDeleteError(err);
					setTimeout(() => {
						setDeleteError('');
					}, 4000);
				} else {
					setUnHiredLoading(true);
					dispatch(
						getUnHiredEmployees(null, () => {
							setUnHiredLoading(false);
						})
					);
				}
				setDeleteLoading(false);
			})
		);
	};

	return (
		<Sidenav title={'Employee Details'}>
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
			<div className={classes.dataTable}>
				<div style={{ display: 'flex' }}>
					<CssTextField
						id="outlined-basic"
						label="Search Un-Hired Employees"
						variant="outlined"
						type="search"
						size="small"
						autoComplete="off"
						onChange={(e) => searchUnHired(e.target.value)}
						style={{ width: '25%', marginTop: '5px' }}
						inputProps={{ style: { fontSize: 14 } }}
						InputLabelProps={{ style: { fontSize: 14 } }}
					/>
					<CssTextField
						id="outlined-basic"
						label="Search By"
						variant="outlined"
						type="text"
						size="small"
						select
						value={unHiredSearchBy}
						autoComplete="off"
						onChange={(e) => setUnHiredSearchBy(e.target.value)}
						style={{ width: '15%', marginTop: '5px', marginLeft: '3px' }}
						inputProps={{ style: { fontSize: 14 } }}
						InputLabelProps={{ style: { fontSize: 14 } }}
					>
						<MenuItem value="code">By Code</MenuItem>
						<MenuItem value="name">By Name</MenuItem>
					</CssTextField>
				</div>
				{unHiredLoading ? (
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
				) : unHiredEmployees?.length === 0 ? (
					<p>There are no Un Hired Employees</p>
				) : (
					<TableContainer className={classes.tableContainer}>
						<Table
							stickyHeader
							className="table table-dark"
							style={{
								backgroundColor: '#d0cfcf',
								border: '1px solid grey',
							}}
						>
							<TableHead>
								<TableRow hover role="checkbox">
									<StyledTableCell align="center">
										Sr.No
									</StyledTableCell>
									<StyledTableCell align="center">
										Name
									</StyledTableCell>
									<StyledTableCell align="center">
										Job Applied For
									</StyledTableCell>
									<StyledTableCell align="center">
										Department
									</StyledTableCell>
									<StyledTableCell align="center">
										Action
									</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{unHiredEmployees.map((el, i) => (
									<StyledTableRow>
										<StyledTableCell
											className="text-dark bg-light"
											align="center"
										>
											{i + 1}
										</StyledTableCell>
										<StyledTableCell
											className="text-dark bg-light"
											align="center"
											style={{ textTransform: 'capitalize' }}
										>
											{capitalize(el?.name)}
										</StyledTableCell>
										<StyledTableCell
											className="text-dark bg-light"
											align="center"
										>
											{capitalize(el?.jobAppliedFor?.name)}
										</StyledTableCell>
										<StyledTableCell
											className="text-dark bg-light"
											align="center"
										>
											{capitalize(el?.officeUse?.department?.name)}
										</StyledTableCell>
										<StyledTableCell
											className="text-light bg-light"
											align="center"
										>
											<Button
												variant="contained"
												className="bg-dark text-light"
												size="small"
												onClick={() => {
													history.push({
														pathname: `/hr/employees/print_emp_details/${el._id}`,
														state: { employee: el },
													});
												}}
											>
												Print
											</Button>
											<Button
												variant="contained"
												className="bg-dark text-light"
												size="small"
												style={{ marginLeft: 3 }}
												onClick={() => {
													history.push({
														pathname: `/hr/employees`,
														state: { user: el, toUpdate: true },
													});
												}}
											>
												Edit
											</Button>
											<Button
												variant="contained"
												className="bg-dark text-light"
												size="small"
												style={{ marginLeft: 3 }}
												onClick={() => {
													history.push({
														pathname: `/hr/employees/print_emp_details/${el._id}`,
														state: { employee: el },
													});
												}}
											>
												View Details
											</Button>
											<Link
												to={{
													pathname: `/hr/employees`,
													state: {
														user: el,
														toUpdate: true,
														isHiring: true,
													},
												}}
											>
												<Button
													variant="contained"
													className="bg-success text-light"
													size="small"
													style={{ marginLeft: 3 }}
												>
													Hire Now
												</Button>
											</Link>
											<Button
												variant="contained"
												className="bg-danger text-light"
												size="small"
												style={{ marginLeft: 3 }}
												onClick={() => deleteEmp(el._id)}
											>
												Delete
											</Button>
										</StyledTableCell>
									</StyledTableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				)}
			</div>
			<div className={classes.dataTable}>
				<div style={{ display: 'flex' }}>
					<CssTextField
						id="outlined-basic"
						label="Search Hired Employees"
						variant="outlined"
						type="search"
						size="small"
						autoComplete="off"
						onChange={(e) => searchHired(e.target.value)}
						style={{ width: '25%', marginTop: '30px' }}
						inputProps={{ style: { fontSize: 14 } }}
						InputLabelProps={{ style: { fontSize: 14 } }}
					/>
					<CssTextField
						id="outlined-basic"
						label="Search By"
						variant="outlined"
						type="text"
						size="small"
						select
						autoComplete="off"
						value={hiredSearchBy}
						onChange={(e) => setHiredSearchBy(e.target.value)}
						style={{ width: '15%', marginTop: '30px', marginLeft: '3px' }}
						inputProps={{ style: { fontSize: 14 } }}
						InputLabelProps={{ style: { fontSize: 14 } }}
					>
						<MenuItem value="code">By Code</MenuItem>
						<MenuItem value="name">By Name</MenuItem>
					</CssTextField>
				</div>
				{hiredLoading ? (
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
				) : employees.length === 0 ? (
					<p>There are no Employees</p>
				) : (
					<TableContainer className={classes.tableContainer}>
						<Table
							stickyHeader
							className="table table-dark"
							style={{
								backgroundColor: '#d0cfcf',
								border: '1px solid grey',
							}}
						>
							<TableHead>
								<TableRow hover role="checkbox">
									<StyledTableCell align="center">
										Sr.No
									</StyledTableCell>
									<StyledTableCell align="center">
										Name
									</StyledTableCell>
									<StyledTableCell align="center">
										Code
									</StyledTableCell>
									<StyledTableCell align="center">
										Designation
									</StyledTableCell>
									<StyledTableCell align="center">
										Department
									</StyledTableCell>
									<StyledTableCell align="center">
										Action
									</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{!employees || !employees.length ? (
									<h5>Not Found</h5>
								) : (
									employees.map((el, i) => (
										<StyledTableRow>
											<StyledTableCell
												className="text-dark bg-light"
												align="center"
											>
												{i + 1}
											</StyledTableCell>
											<StyledTableCell
												className="text-dark bg-light"
												align="center"
											>
												{capitalize(el?.name)}
											</StyledTableCell>
											<StyledTableCell
												className="text-dark bg-light"
												align="center"
											>
												{el?.code}
											</StyledTableCell>
											<StyledTableCell
												className="text-dark bg-light"
												align="center"
											>
												{capitalize(el?.finalDesignation?.name)}
											</StyledTableCell>
											<StyledTableCell
												className="text-dark bg-light"
												align="center"
											>
												{capitalize(el?.finalDepartment?.name)}
											</StyledTableCell>
											<StyledTableCell
												className="text-light bg-light"
												align="center"
											>
												<Button
													variant="contained"
													className="bg-dark text-light"
													size="small"
													onClick={() => {
														history.push({
															pathname: `/hr/employees/print_emp_details/${el._id}`,
															state: { employee: el },
														});
													}}
												>
													View Report
												</Button>
												<Button
													variant="contained"
													className="bg-dark text-light"
													size="small"
													style={{ marginLeft: 3 }}
													onClick={() => {
														history.push({
															pathname: `/hr/employees`,
															state: {
																user: el,
																toUpdate: true,
															},
														});
													}}
												>
													Edit
												</Button>
												<Button
													variant="contained"
													className="bg-danger text-light"
													size="small"
													style={{ marginLeft: 3 }}
													onClick={() => deleteEmp(el._id)}
												>
													Delete
												</Button>
											</StyledTableCell>
										</StyledTableRow>
									))
								)}
							</TableBody>
						</Table>
					</TableContainer>
				)}
			</div>
		</Sidenav>
	);
};

export default ViewEmpDetails;
