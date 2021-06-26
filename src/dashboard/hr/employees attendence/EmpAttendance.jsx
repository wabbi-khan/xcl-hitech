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
import { useDispatch, useSelector } from 'react-redux';
import { getAttendanceAction } from '../../../services/action/attendanceAction';
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
	addNewBtn: {
		color: '#22A19A',
		borderColor: '#22A19A',
		fontWeight: 'bold',
		'&:hover': {
			border: 'none',
			backgroundColor: '#22A19A',
			color: 'whitesmoke',
		},
		[theme.breakpoints.up('md')]: {
			width: '30%',
			marginLeft: 300,
		},
		[theme.breakpoints.down('sm')]: {
			width: '10%',
		},
	},
	table: {
		minWidth: 600,
	},
	dataTable: {
		marginTop: 20,
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

const EmpAttendance = ({ history }) => {
	const classes = useStyles();
	const [searchText, setSearchText] = React.useState('');

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmitData = () => {
		console.log('data submit');
	};
	const dispatch = useDispatch();
	const { attendances } = useSelector((state) => state.attendances);

	React.useEffect(() => {
		dispatch(getAttendanceAction());
	}, []);

	React.useEffect(() => {
		const date = new Date(searchText);
		const monthNames = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		];
		var month = monthNames[date.getMonth()];
		const year = date.getFullYear();
		const today = date.getDate();
		const completeDate = `${today}-${month}-${year}`;
		dispatch(getAttendanceAction(`date=${completeDate}`));
	}, [searchText]);

	return (
		<Sidenav title={'Employees Attendance'}>
			<div>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}>
					<div
						style={{
							width: '50%',
							display: 'flex',
							flexDirection: 'column',
							rowGap: '1rem',
						}}>
						<span>Search by date</span>
						<CssTextField
							id='outlined-basic'
							variant='outlined'
							type='date'
							autocomplete='off'
							size='small'
							value={searchText}
							style={{ marginRight: 20, width: '50%' }}
							inputProps={{ style: { fontSize: 14 } }}
							InputLabelProps={{ style: { fontSize: 14 } }}
							onChange={(e) => setSearchText(e.target.value)}
						/>
					</div>
					<Button
						variant='contained'
						size='small'
						onClick={() =>
							history.push('/hr/employees_attendance/add_new_attendance')
						}
						style={{ backgroundColor: 'lightBlue' }}>
						Mark Todays Attendance
					</Button>
				</div>
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
									<StyledTableCell align='center'>Designation</StyledTableCell>
									<StyledTableCell align='center'>Department</StyledTableCell>
									<StyledTableCell align='center'>Date</StyledTableCell>
									<StyledTableCell align='center'>Present/Absent</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{!attendances ? (
									<h1>Network Error</h1>
								) : attendances.length > 0 ? (
									attendances.map((el, i) => (
										<StyledTableRow>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{i + 1}
											</StyledTableCell>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{el.employee?.name}
											</StyledTableCell>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{el.employee?.finalDesignation?.name}
											</StyledTableCell>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{el.employee?.finalDepartment?.name}
											</StyledTableCell>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{el.date}
											</StyledTableCell>

											<StyledTableCell className='text-light bg-light' align='center'>
												<Button
													variant='contained'
													className={`text-light ${!el.isPresent ? 'bg-danger' : 'bg-success'}`}
													size='small'
												>
													{el.isPresent ? 'Present' : 'Absent'}
												</Button>
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

export default EmpAttendance;
