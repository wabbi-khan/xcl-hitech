import React from 'react';
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
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { getDesignation } from '../../../services/action/DesignationAction';
import { fetchDepartmentsAction } from '../../../services/action/DepartmentAction';
import {
	createLeavesAction,
	getLeavesAction,
} from '../../../services/action/LeaveActions';
import { getEmployeeByDesignationAndDepartment } from '../../../services/action/EmployeesAction';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Loader from 'react-loader-spinner';
import Button from '../../../components/utils/Button';

const initialValues = {
	department: '',
	designation: '',
	employee: '',
	purpose: '',
	from: '',
	to: '',
	isPaid: false,
};

const validationSchema = yup.object({
	department: yup.string().required(),
	designation: yup.string().required(),
	employee: yup.string().required(),
	purpose: yup.string().required(),
	from: yup.string().required(),
	to: yup.string().required(),
	isPaid: yup.bool(),
});

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
			borderColor: '#22A19A',
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
	viewAllBtn: {
		marginTop: 10,
		backgroundColor: '#22A19A',
		color: 'whitesmoke',
		borderColor: '#22A19A',
		'&:hover': {
			borderColor: '#22A19A',
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

const EmpLeave = ({ history }) => {
	const [fetchLoading, setFetchLoading] = React.useState(true);
	const [fetchError, setFetchError] = React.useState('');
	const [createLoading, setCreateLoading] = React.useState(false);
	const [success, setSuccess] = React.useState('');

	const [createError, setCreateError] = React.useState('');
	const classes = useStyles();
	const [selectedDepartment, setSelectedDepartment] = React.useState('');
	const [selectedDesignation, setSelectedDesignation] = React.useState('');
	const dispatch = useDispatch();
	const { departments } = useSelector((state) => state.departments);
	const { designations } = useSelector((state) => state.designations);
	const { employees } = useSelector((state) => state.employees);
	const { leaves } = useSelector((state) => state.leaves);

	React.useEffect(() => {
		dispatch(getDesignation());
		dispatch(fetchDepartmentsAction());
		dispatch(
			getLeavesAction(null, (err) => {
				if (err) {
					setFetchError(err);
					setTimeout(() => {
						setFetchError('');
					}, 4000);
				}
				setFetchLoading(false);
			})
		);
	}, []);

	const onSubmitData = (values) => {
		setCreateLoading(true);
		dispatch(
			createLeavesAction(values, (err) => {
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

	React.useEffect(() => {
		dispatch(
			getEmployeeByDesignationAndDepartment(
				selectedDesignation,
				selectedDepartment
			)
		);
	}, [selectedDepartment, selectedDesignation]);

	return (
		<Sidenav title={'Employees Leave'}>
			<div>
				<Button
					variant="outlined"
					color="primary"
					text="View All Leaves"
					classNames={classes.viewAllBtn}
					onClick={() => {
						history.push('/hr/employees_leave/view');
					}}
				/>
				<Container className={classes.mainContainer}>
					<Formik
						initialValues={initialValues}
						onSubmit={onSubmitData}
						validationSchema={validationSchema}
					>
						{(props) => (
							<Form>
								<Grid container spacing={1}>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="Select Department"
											variant="outlined"
											type="text"
											size="small"
											style={{ width: '100%' }}
											autocomplete="off"
											select
											onBlur={props.handleBlur('department')}
											value={props.values.department}
											onChange={(e) => {
												// props.handleChange('department');
												props.setFieldValue(
													'department',
													e.target.value
												);
												setSelectedDepartment(e.target.value);
											}}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
										>
											{departments &&
												departments.map((el) => (
													<MenuItem value={el._id} key={el._id}>
														{el.name}
													</MenuItem>
												))}
										</CssTextField>
										{props.touched.department && (
											<p className="text-danger">
												{props.errors.department}
											</p>
										)}
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="Designation"
											variant="outlined"
											type="text"
											autocomplete="off"
											size="small"
											style={{ width: '100%' }}
											onBlur={props.handleBlur('designation')}
											value={props.values.designation}
											onChange={(e) => {
												props.setFieldValue(
													'designation',
													e.target.value
												);
												setSelectedDesignation(e.target.value);
											}}
											select
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
										>
											{designations &&
												designations.map((el) => (
													<MenuItem value={el._id} key={el._id}>
														{el.name}
													</MenuItem>
												))}
										</CssTextField>
										{props.touched.designation && (
											<p className="text-danger">
												{props.errors.designation}
											</p>
										)}
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="Emp Name"
											variant="outlined"
											type="text"
											style={{ width: '100%' }}
											autocomplete="off"
											onBlur={props.handleBlur('employee')}
											value={props.values.employee}
											onChange={props.handleChange('employee')}
											size="small"
											select
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
										>
											{selectedDesignation === '' &&
											selectedDepartment === '' ? (
												<span>
													select department and designation first
												</span>
											) : employees && employees.length > 0 ? (
												employees.map((el) => (
													<MenuItem key={el._id} value={el._id}>
														{el.name}
													</MenuItem>
												))
											) : (
												<span>Not found</span>
											)}
										</CssTextField>
										{props.touched.employee && (
											<p className="text-danger">
												{props.errors.employee}
											</p>
										)}
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="Purpose"
											variant="outlined"
											type="text"
											autocomplete="off"
											size="small"
											style={{ width: '100%' }}
											onBlur={props.handleBlur('purpose')}
											value={props.values.purpose}
											onChange={props.handleChange('purpose')}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
										></CssTextField>
										{props.touched.purpose && (
											<p className="text-danger">
												{props.errors.purpose}
											</p>
										)}
									</Grid>
								</Grid>
								<Grid container spacing={1} className="mt-3">
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="Paid/Un-Paid"
											variant="outlined"
											type="text"
											autocomplete="off"
											size="small"
											select
											onBlur={props.handleBlur('isPaid')}
											value={props.values.isPaid}
											style={{ width: '100%' }}
											onChange={props.handleChange('isPaid')}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
										>
											<MenuItem value="true">Paid</MenuItem>
											<MenuItem value="false">Un-Paid</MenuItem>
										</CssTextField>
										{props.touched.isPaid && (
											<p className="text-danger">
												{props.errors.isPaid}
											</p>
										)}
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<div
											style={{
												display: 'flex',
												flexDirection: 'column',
												alignItems: 'center',
											}}
										>
											<CssTextField
												id="outlined-basic"
												variant="outlined"
												type="date"
												size="small"
												autocomplete="off"
												style={{ width: '100%' }}
												onBlur={props.handleBlur('from')}
												value={props.values.from}
												onChange={props.handleChange('from')}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
											></CssTextField>
											{props.touched.from && (
												<p className="text-danger">
													{props.errors.from}
												</p>
											)}
											<span
												style={{
													alignSelf: 'flex-start',
													marginLeft: '0.3rem',
												}}
											>
												From
											</span>
										</div>
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<div
											style={{
												display: 'flex',
												flexDirection: 'column',
												alignItems: 'center',
											}}
										>
											<CssTextField
												id="outlined-basic"
												variant="outlined"
												style={{ width: '100%' }}
												type="date"
												autocomplete="off"
												onBlur={props.handleBlur('to')}
												value={props.values.to}
												onChange={props.handleChange('to')}
												size="small"
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
											></CssTextField>
											{props.touched.to && (
												<p className="text-danger">
													{props.errors.to}
												</p>
											)}
											<span
												style={{
													alignSelf: 'flex-start',
													marginLeft: '0.3rem',
													marginTop: '0.1rem',
												}}
											>
												To
											</span>
										</div>
									</Grid>
								</Grid>
								<div>
									<Button
										variant="outlined"
										color="primary"
										classNames={classes.addButton}
										text="Add"
										loading={createLoading}
										loaderColor="#333"
									/>
								</div>
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
				) : leaves?.length === 0 ? (
					<p>There are no Leaves</p>
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
											Employee Name
										</StyledTableCell>
										<StyledTableCell align="center">
											Department
										</StyledTableCell>
										<StyledTableCell align="center">
											Designation
										</StyledTableCell>
										<StyledTableCell align="center">
											Purpose
										</StyledTableCell>
										<StyledTableCell align="center">
											From Date
										</StyledTableCell>
										<StyledTableCell align="center">
											To Date
										</StyledTableCell>
										<StyledTableCell align="center">
											Days
										</StyledTableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{leaves && leaves.length > 0 ? (
										leaves.map((el, i) => (
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
													{el?.employee?.name}
												</StyledTableCell>
												<StyledTableCell
													className="text-dark bg-light"
													align="center"
												>
													{el?.employee?.finalDepartment?.name}
												</StyledTableCell>
												<StyledTableCell
													className="text-dark bg-light"
													align="center"
												>
													{el?.employee?.finalDesignation?.name}
												</StyledTableCell>
												<StyledTableCell
													className="text-dark bg-light"
													align="center"
												>
													{el?.purpose}
												</StyledTableCell>
												<StyledTableCell
													className="text-dark bg-light"
													align="center"
												>
													{moment(el?.from).format(
														'Do - MMMM - YYYY'
													)}
												</StyledTableCell>
												<StyledTableCell
													className="text-dark bg-light"
													align="center"
												>
													{moment(el?.to).format(
														'Do - MMMM - YYYY'
													)}
												</StyledTableCell>
												<StyledTableCell
													className="text-dark bg-light"
													align="center"
												>
													{el?.days}
												</StyledTableCell>
											</StyledTableRow>
										))
									) : (
										<h1>Not found</h1>
									)}
								</TableBody>
							</Table>
						</TableContainer>
					</div>
				)}
			</div>
		</Sidenav>
	);
};

export default EmpLeave;
