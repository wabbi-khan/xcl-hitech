import React from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { useSelector, useDispatch } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import {
	getAttendanceAction,
	attendanceToggler,
	createAttendanceAction,
} from '../../../services/action/attendanceAction';
import Loader from 'react-loader-spinner';
import Button from '../../../components/utils/Button';
import { capitalize } from '../../../utils/capitalize';
import moment from 'moment';

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
		width: '100%',
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
			width: '7%',
		},
		[theme.breakpoints.down('sm')]: {
			width: '10%',
		},
	},
	submitBtn: {
		color: '#22A19A',
		borderColor: '#22A19A',
		fontWeight: 'bold',
		marginTop: 20,
		'&:hover': {
			border: 'none',
			backgroundColor: '#22A19A',
			color: 'whitesmoke',
		},
		[theme.breakpoints.up('md')]: {
			width: '30%',
		},
		[theme.breakpoints.down('sm')]: {
			width: '10%',
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

const AddEmpAttendance = () => {
	const [fetchLoading, setFetchLoading] = React.useState(true);
	const [fetchError, setFetchError] = React.useState('');
	const [createLoading, setCreateLoading] = React.useState(false);
	const [createError, setCreateError] = React.useState('');
	const [success, setSuccess] = React.useState('');
	const classes = useStyles();
	const dispatch = useDispatch();

	const { attendances } = useSelector((state) => state.attendances);

	React.useEffect(() => {
		setFetchLoading(true);
		dispatch(
			getAttendanceAction(
				`date=${moment().format('DD-MMM-YYYY')}`,
				(err) => {
					if (err) {
						setFetchError(err);
						setTimeout(() => {
							setFetchError('');
						}, 4000);
					}
					setFetchLoading(false);
				}
			)
		);
	}, [dispatch]);

	const markPresentOrAbsent = (attendance) => {
		dispatch(attendanceToggler(attendance));
	};

	const generateTodaysAttendance = () => {
		setCreateLoading(true);
		dispatch(
			createAttendanceAction(null, (err) => {
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
			})
		);
	};

	return (
		<Sidenav title={'Add Employees Attendance'}>
			<div>
				<Container className={classes.mainContainer}>
					<Button
						variant="contained"
						style={{ backgroundColor: 'lightBlue' }}
						classNames="text-dark"
						onClick={generateTodaysAttendance}
						loading={createLoading}
						loaderColor="#333"
						text="Generate Todays Attendances"
						size="small"
					/>
					{createError && <p>{createError}</p>}
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
					) : attendances?.length === 0 ? (
						<p>There are no Attendances</p>
					) : (
						<div className={classes.dataTable}>
							<TableContainer className={classes.tableContainer}>
								<Table
									stickyHeader
									className="table table-dark"
									style={{
										backgroundColor: '#d0cfcf',
										border: '1px solid black',
										width: '100%',
									}}
								>
									<TableHead>
										<TableRow hover role="checkbox">
											<StyledTableCell align="center">
												Sr.No
											</StyledTableCell>
											<StyledTableCell align="center">
												Employee Name
											</StyledTableCell>
											<StyledTableCell align="center">
												Department
											</StyledTableCell>
											<StyledTableCell align="center">
												Date
											</StyledTableCell>
											<StyledTableCell align="center">
												Present/Absent
											</StyledTableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{!attendances ? (
											<h1>Network Error</h1>
										) : attendances.length > 0 ? (
											attendances.map((el, i) => (
												<StyledTableRow>
													<StyledTableCell
														className="text-dark bg-light"
														align="center"
													>
														<div
															style={{
																display: 'flex',
																alignItems: 'center',
																justifyContent: 'center',
																position: 'relative',
															}}
														>
															{i + 1}
															<div
																style={{
																	width: '.5rem',
																	height: '.5rem',
																	position: 'absolute',
																	top: '-3px',
																	right: '36px',
																	borderRadius: '50%',
																	backgroundColor:
																		el?.isPresent
																			? 'lightGreen'
																			: 'red',
																}}
															></div>
														</div>
													</StyledTableCell>
													<StyledTableCell
														className="text-dark bg-light"
														align="center"
													>
														{capitalize(el?.employee?.name)}
													</StyledTableCell>
													<StyledTableCell
														className="text-dark bg-light"
														align="center"
													>
														{capitalize(
															el?.employee?.finalDepartment?.name
														)}
													</StyledTableCell>
													<StyledTableCell
														className="text-dark bg-light"
														align="center"
													>
														{el?.date}
													</StyledTableCell>

													<StyledTableCell
														className="text-light bg-light"
														align="center"
													>
														<div
															style={{
																display: 'flex',
																alignItems: 'center',
																gap: '1rem',
																justifyContent: 'center',
															}}
														>
															<Button
																variant="contained"
																classNames="text-light"
																style={{
																	backgroundColor:
																		el?.isPresent
																			? '#C81D25'
																			: el?.isLeave
																			? '#333'
																			: '#008BF8',
																}}
																size="small"
																text={
																	el?.isPresent
																		? 'Mark Absent'
																		: el?.isLeave
																		? 'On Leave'
																		: 'Mark Present'
																}
																onClick={() =>
																	markPresentOrAbsent(el)
																}
															/>
														</div>
													</StyledTableCell>
												</StyledTableRow>
											))
										) : (
											<h1>Not Found</h1>
										)}
									</TableBody>
								</Table>
							</TableContainer>
						</div>
					)}
				</Container>
			</div>
		</Sidenav>
	);
};

export default AddEmpAttendance;
