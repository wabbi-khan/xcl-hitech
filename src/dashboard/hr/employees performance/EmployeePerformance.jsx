import React from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { makeStyles, withStyles } from '@material-ui/core/styles';
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
import MenuItem from '@material-ui/core/MenuItem';
import { useForm } from 'react-hook-form';

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
		marginTop: 70,
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
	mainBtn: {
		borderColor: '#22A19A',
		backgroundColor: '#22A19A',
		color: 'whitesmoke',
		fontWeight: 500,
		fontSize: '13.5px',
		textTransform: 'capitalize',
		'&:hover': {
			border: 'none',
			color: '#22A19A',
		},
		// [theme.breakpoints.up('md')]: {
		//     width: '15%',
		// },
		// [theme.breakpoints.down('sm')]: {
		//     width: '30%',
		// },
	},
	table: {
		minWidth: 600,
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
}));

const EmployeePerformance = ({ history }) => {
	const classes = useStyles();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmitData = () => {};

	return (
		<Sidenav title={'Employees Performance Assessment'}>
			<div>
				<Container className={classes.mainContainer}>
					<form onSubmit={handleSubmit(onSubmitData)}>
						<Container className={classes.mainContainer}>
							<h4 className="text-left">Non-Executive</h4>
							<Grid container spacing={1} style={{ marginTop: 20 }}>
								{/* <Grid item lg={1} md={1}>
                                            <h5 className={classes.itemHeading}>{no}</h5>
                                        </Grid> */}
								<Grid item lg={3} md={3} sm={12} xs={12}>
									<Button
										variant="contained"
										className={classes.mainBtn}
										onClick={() => {
											history.push(
												'/hr/performance_assessment/non_executive_emp_prerequisites'
											);
										}}
									>
										Performance Assessment Prerequisites
									</Button>
								</Grid>
								<Grid item lg={3} md={3} sm={12} xs={12}>
									<Button
										variant="contained"
										className={classes.mainBtn}
										onClick={() => {
											history.push(
												'/hr/performance_assessment/non_executive_emp_ratings'
											);
										}}
									>
										Employee Performance Ratings
									</Button>
								</Grid>
								<Grid item lg={3} md={3} sm={12} xs={12}>
									<Button
										variant="contained"
										className={classes.mainBtn}
										onClick={() => {
											history.push(
												'/hr/performance_assessment/non_executive_emp_assest_performance'
											);
										}}
									>
										Assest Employees Performance
									</Button>
								</Grid>
								<Grid item lg={3} md={3} sm={12} xs={12}>
									<Button
										variant="contained"
										className={classes.mainBtn}
										onClick={() => {
											history.push(
												'/hr/performance_assessment/view_non_executive_emp_assest'
											);
										}}
									>
										View Assessments
									</Button>
								</Grid>
							</Grid>
							<div style={{ marginTop: 30, marginBottom: 30 }}>
								<hr />
							</div>
							<h4 className="text-left">Executive</h4>
							<Grid container spacing={1} style={{ marginTop: 20 }}>
								{/* <Grid item lg={1} md={1}>
                                            <h5 className={classes.itemHeading}>{no}</h5>
                                        </Grid> */}
								<Grid item lg={3} md={3} sm={12} xs={12}>
									<Button
										variant="contained"
										className={classes.mainBtn}
										onClick={() => {
											history.push(
												'/hr/performance_assessment/executive_emp_prerequisites'
											);
										}}
									>
										Performance Assessment Prerequisites
									</Button>
								</Grid>
								<Grid item lg={3} md={3} sm={12} xs={12}>
									<Button
										variant="contained"
										className={classes.mainBtn}
										onClick={() => {
											history.push(
												'/hr/performance_assessment/executive_emp_ratings'
											);
										}}
									>
										Employee Performance Ratings
									</Button>
								</Grid>
								<Grid item lg={3} md={3} sm={12} xs={12}>
									<Button
										variant="contained"
										className={classes.mainBtn}
										onClick={() => {
											history.push(
												'/hr/performance_assessment/executive_emp_assest_performance'
											);
										}}
									>
										Assest Employees Performance
									</Button>
								</Grid>
								<Grid item lg={3} md={3} sm={12} xs={12}>
									<Button
										variant="contained"
										className={classes.mainBtn}
										onClick={() => {
											history.push(
												'/hr/performance_assessment/view_executive_emp_assest'
											);
										}}
									>
										View Assessments
									</Button>
								</Grid>
							</Grid>
							{/* {AddOrderError ? (
                                <p className='mt-3 text-danger'>
                                {' '}
                                Something Went Wrong. Internal Server Error{' '}
                                </p>
                                ) : null}
                                {AddOrderSuccess ? (
                                    <p className='mt-3 text-success'> Purchase Order Added Successfully</p>
                                ) : null} */}
						</Container>
					</form>
				</Container>

				{/* <div className={classes.dataTable}>
                    <TableContainer className={classes.tableContainer}>
                        <Table stickyHeader className="table table-dark" style={{ backgroundColor: '#d0cfcf', border: '1px solid grey' }} >
                            <TableHead>
                                <TableRow hover role="checkbox">
                                    <StyledTableCell align="center">Sr.No</StyledTableCell>
                                    <StyledTableCell align="center">Employee Name</StyledTableCell>
                                    <StyledTableCell align="center">Department</StyledTableCell>
                                    <StyledTableCell align="center">Designation</StyledTableCell>
                                    <StyledTableCell align="center">Attendance Percentage</StyledTableCell>
                                    <StyledTableCell align="center">Rating/Year (Out of 5)</StyledTableCell>
                                    <StyledTableCell align="center">Date</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody >
                                <StyledTableRow >
                                    <StyledTableCell className="text-dark" align="center">1</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">Arsalan</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">Sales</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">Assistant Manager</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">78%</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">4</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">20-12-20</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">
                                        {
                                            !vendor.material || !vendor.material.length ? <p>Not Found</p> :
                                                vendor.material.map((value, i) => (
                                                    <span key={i} className="ml-1">{value.name},</span>
                                                ))
                                        }
                                    </StyledTableCell>
                                </StyledTableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div> */}
			</div>
		</Sidenav>
	);
};

export default EmployeePerformance;
