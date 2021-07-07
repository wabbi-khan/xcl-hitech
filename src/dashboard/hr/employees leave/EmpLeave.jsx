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
import { Form, Formik } from 'formik'
import * as yup from 'yup';
import { getDesignation } from '../../../services/action/DesignationAction';
import { fetchDepartmentsAction } from '../../../services/action/DepartmentAction';
import {
	createLeavesAction,
	getLeavesAction,
} from '../../../services/action/LeaveActions';
import { getEmployeeByDesignationAndDepartment } from '../../../services/action/EmployeesAction';
import { useDispatch, useSelector } from 'react-redux';

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

const EmpLeave = () => {
	const classes = useStyles();
	const [selectedDepartment, setSelectedDepartment] = React.useState('');
	const [selectedDesignation, setSelectedDesignation] = React.useState('');
	const dispatch = useDispatch();
	const { departments } = useSelector((state) => state.departments);
	const { designations } = useSelector((state) => state.designations);
	const { employees } = useSelector((state) => state.employees);
	const { leaves, error } = useSelector((state) => state.leaves);

	React.useEffect(() => {
		dispatch(getDesignation());
		dispatch(fetchDepartmentsAction());
		dispatch(getLeavesAction());
	}, []);

	console.log(leaves);

	const onSubmitData = (values) => {
		console.log('object');
		dispatch(createLeavesAction(values));
	};

	React.useEffect(() => {
		console.log('object');
		dispatch(
			getEmployeeByDesignationAndDepartment(
				selectedDesignation,
				selectedDepartment,
			),
		);
	}, [selectedDepartment, selectedDesignation]);

	return (
		<Sidenav title={'Employees Leave'}>
			<div>
				<Container className={classes.mainContainer}>
					{error && <p>{error}</p>}
					<Formik
						initialValues={initialValues}
						onSubmit={onSubmitData}
						validationSchema={validationSchema}>
						{(props) => (
							<Form>
								<Grid container spacing={1}>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id='outlined-basic'
											label='Select Department'
											variant='outlined'
											type='text'
											size='small'
											autocomplete='off'
											select
											onBlur={props.handleBlur('department')}
											value={props.values.department}
											onChange={(e) => {
												// props.handleChange('department');
												props.setFieldValue('department', e.target.value);
												setSelectedDepartment(e.target.value);
											}}
											className={classes.inputFieldStyle}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}>
											{departments &&
												departments.map((el) => (
													<MenuItem value={el._id} key={el._id}>
														{el.name}
													</MenuItem>
												))}
										</CssTextField>
										{props.touched.department && (
											<p className='text-danger'>{props.errors.department}</p>
										)}
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id='outlined-basic'
											label='Designation'
											variant='outlined'
											type='text'
											autocomplete='off'
											size='small'
											onBlur={props.handleBlur('designation')}
											value={props.values.designation}
											onChange={(e) => {
												props.setFieldValue('designation', e.target.value);
												setSelectedDesignation(e.target.value);
											}}
											select
											className={classes.inputFieldStyle}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}>
											{designations &&
												designations.map((el) => (
													<MenuItem value={el._id} key={el._id}>
														{el.name}
													</MenuItem>
												))}
										</CssTextField>
										{props.touched.designation && (
											<p className='text-danger'>{props.errors.designation}</p>
										)}
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id='outlined-basic'
											label='Emp Name'
											variant='outlined'
											type='text'
											autocomplete='off'
											onBlur={props.handleBlur('employee')}
											value={props.values.employee}
											onChange={props.handleChange('employee')}
											size='small'
											select
											className={classes.inputFieldStyle}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}>
											{selectedDesignation === '' && selectedDepartment === '' ? (
												<span>select department and designation first</span>
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
											<p className='text-danger'>{props.errors.employee}</p>
										)}
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id='outlined-basic'
											label='Purpose'
											variant='outlined'
											type='text'
											autocomplete='off'
											size='small'
											onBlur={props.handleBlur('purpose')}
											value={props.values.purpose}
											onChange={props.handleChange('purpose')}
											className={classes.inputFieldStyle}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}></CssTextField>
										{props.touched.purpose && (
											<p className='text-danger'>{props.errors.purpose}</p>
										)}
									</Grid>
								</Grid>
								<Grid container spacing={1} className='mt-3'>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id='outlined-basic'
											label='Paid/Un-Paid'
											variant='outlined'
											type='text'
											autocomplete='off'
											size='small'
											select
											onBlur={props.handleBlur('isPaid')}
											value={props.values.isPaid}
											onChange={props.handleChange('isPaid')}
											className={classes.inputFieldStyle}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}>
											<MenuItem value='true'>Paid</MenuItem>
											<MenuItem value='false'>Un-Paid</MenuItem>
										</CssTextField>
										{props.touched.isPaid && (
											<p className='text-danger'>{props.errors.isPaid}</p>
										)}
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id='outlined-basic'
											// label="From Date"
											variant='outlined'
											type='date'
											size='small'
											autocomplete='off'
											onBlur={props.handleBlur('from')}
											value={props.values.from}
											onChange={props.handleChange('from')}
											className={classes.inputFieldStyle}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}></CssTextField>
										{props.touched.from && (
											<p className='text-danger'>{props.errors.from}</p>
										)}
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id='outlined-basic'
											// label="To Date"
											variant='outlined'
											type='date'
											autocomplete='off'
											onBlur={props.handleBlur('to')}
											value={props.values.to}
											onChange={props.handleChange('to')}
											size='small'
											className={classes.inputFieldStyle}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}></CssTextField>
										{props.touched.to && <p className='text-danger'>{props.errors.to}</p>}
									</Grid>
								</Grid>
								<div>
									<Button
										variant='outlined'
										color='primary'
										type='submit'
										className={classes.addButton}
										onClick={() => {
											// history.push('')
										}}>
										Add
									</Button>
								</div>
							</Form>
						)}
					</Formik>
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
									<StyledTableCell align='center'>Employee Name</StyledTableCell>
									<StyledTableCell align='center'>Department</StyledTableCell>
									<StyledTableCell align='center'>Designation</StyledTableCell>
									<StyledTableCell align='center'>Purpose</StyledTableCell>
									<StyledTableCell align='center'>From Date</StyledTableCell>
									<StyledTableCell align='center'>To Date</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{leaves && leaves.length > 0 ? (
									leaves.map((el, i) => (
										<StyledTableRow>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{i + 1}
											</StyledTableCell>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{el?.employee?.name}
											</StyledTableCell>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{el?.employee?.finalDepartment?.name}
											</StyledTableCell>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{el?.employee?.finalDesignation?.name}
											</StyledTableCell>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{el?.purpose}
											</StyledTableCell>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{el?.from}
											</StyledTableCell>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{el?.to}
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
			</div>
		</Sidenav>
	);
};

export default EmpLeave;
