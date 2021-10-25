import React, { useEffect } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { withRouter } from 'react-router';
import {
	createTrainingAttendance,
	getTrainingsAttendance,
	markAsAbsent,
} from '../../../services/action/TrainingAttedance';
import moment from 'moment';
import Loader from 'react-loader-spinner';
import Button from '../../../components/utils/Button';

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
		marginTop: 40,
		textAlign: 'center',
	},
	addButton: {
		marginTop: 50,
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
		marginTop: 70,
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

const TrainingAttendance = ({ history, match, location }) => {
	const [createLoading, setCreateLoading] = React.useState(false);
	const [createError, setCreateError] = React.useState('');
	const [success, setSuccess] = React.useState('');
	const [fetchLoading, setFetchLoading] = React.useState(true);
	const [fetchError, setFetchError] = React.useState('');
	const [updateLoading, setUpdateLoading] = React.useState(false);
	const classes = useStyles();
	const dispatch = useDispatch();
	const [initialValueState, setInitialValueState] = React.useState(
		location?.state
	);

	const { attendance } = useSelector((state) => state.trainingAttendance);

	React.useEffect(() => {
		setFetchLoading(true);
		dispatch(
			getTrainingsAttendance(
				`date=${moment().format('MMM Do YY')}&training=${
					location?.state._id
				}`,
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
		// dispatch(getTrainingsAttendance(``));
	}, [dispatch]);

	React.useEffect(() => {
		setInitialValueState(location.state);
	}, [location?.state]);

	const onSubmit = async (values) => {
		setCreateLoading(true);
		values = {
			participants: values?.participants?._id,
			trainingPlan: values._id,
		};
		dispatch(
			createTrainingAttendance(values, (err) => {
				if (err) {
					setCreateError(err);
					setTimeout(() => {
						setCreateError('');
					}, 4000);
				} else {
					setSuccess('Attendance generated successfully');
					setTimeout(() => {
						setSuccess('');
					}, 4000);
				}
				setCreateLoading(false);
			})
		);
	};

	const toggleAbsentFunc = (id) => {
		setUpdateLoading(true);
		dispatch(
			markAsAbsent(id, null, (err) => {
				if (!err) {
					setUpdateLoading(false);
				}
			})
		);
	};

	return (
		<Sidenav title={'Training Attendance'}>
			<div>
				<Button
					variant="contained"
					size="small"
					onClick={() => {
						history.push({
							pathname: '/hr/training_attendance/view',
							params: initialValueState._id,
						});
					}}
					classNames="bg-primary text-light"
					text="View All Attendance"
					style={{ marginLeft: 2, marginTop: 2 }}
				/>

				<Container className={classes.mainContainer}>
					<Formik
						initialValues={initialValueState}
						onSubmit={onSubmit}
						enableReinitialize
					>
						{(props) => (
							<Form>
								<Grid container spacing={1}>
									<Grid item lg={8} md={8} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="Select Subject"
											variant="outlined"
											type="text"
											disabled
											size="small"
											autocomplete="off"
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											value={props?.values?.topic?.name}
										></CssTextField>
									</Grid>
								</Grid>
								<Grid container spacing={1} style={{ marginTop: 10 }}>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="Tutor"
											variant="outlined"
											type="text"
											autocomplete="off"
											size="small"
											style={{ width: '100%' }}
											disabled
											inputProps={{ style: { fontSize: 14 } }}
											value={props?.values?.trainerName?.name}
											InputLabelProps={{ style: { fontSize: 14 } }}
										></CssTextField>
									</Grid>
								</Grid>
								<Button
									variant="contained"
									size="small"
									classNames="bg-primary text-light"
									text="Generate Attendance"
									loading={createLoading}
								/>
								{createError && <p>{createError}</p>}
							</Form>
						)}
					</Formik>
				</Container>

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
				) : attendance?.length === 0 ? (
					<p>There is no data found</p>
				) : (
					<div className={classes.dataTable}>
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
											Training Name
										</StyledTableCell>
										<StyledTableCell align="center">
											Trainee Name
										</StyledTableCell>
										<StyledTableCell align="center">
											Trainee Designation
										</StyledTableCell>
										<StyledTableCell align="center">
											Trainer
										</StyledTableCell>
										<StyledTableCell align="center">
											Venue
										</StyledTableCell>
										<StyledTableCell align="center">
											Action
										</StyledTableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{attendance &&
										attendance.length > 0 &&
										attendance.map((el, i) => (
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
													{el?.training?.topic?.name}
												</StyledTableCell>
												<StyledTableCell
													className="text-dark bg-light"
													align="center"
												>
													{el?.employee?.name}
												</StyledTableCell>
												<StyledTableCell
													className="text-dark bg-light"
													align="center"
												>
													{el?.training?.participants?.name}
												</StyledTableCell>
												<StyledTableCell
													className="text-dark bg-light"
													align="center"
												>
													{el?.training?.trainerName?.name}
													<p style={{ fontSize: 10 }}>
														(
														{
															el?.training?.trainerDesignation
																?.name
														}
														)
													</p>
												</StyledTableCell>
												<StyledTableCell
													className="text-dark bg-light"
													align="center"
												>
													{el?.training?.venue?.name}
												</StyledTableCell>
												<StyledTableCell
													className="text-light bg-light"
													align="center"
												>
													<Button
														variant="contained"
														size="small"
														classNames={`${
															el?.isPresent
																? 'bg-danger'
																: 'bg-success'
														} text-light`}
														onClick={() => {
															toggleAbsentFunc(el._id);
														}}
														text={
															el?.isPresent
																? 'Mark as Absent'
																: 'Mark as Present'
														}
														style={{
															marginLeft: 2,
															marginTop: 2,
														}}
														loading={updateLoading}
														loaderColor="#fff"
													/>
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

export default withRouter(TrainingAttendance);
