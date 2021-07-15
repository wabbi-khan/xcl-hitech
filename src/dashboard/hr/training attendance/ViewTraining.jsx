import React, { useEffect } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
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
import { getTrainings } from '../../../services/action/TrainingAction';
import {
	createTrainingAttendance,
	getTrainingsAttendance,
	markAsAbsent,
} from '../../../services/action/TrainingAttedance';
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
	const classes = useStyles();
	const dispatch = useDispatch();
	const [trainingPlan, setTrainingPlan] = React.useState();

	console.log(location?.params);

	React.useEffect(() => {
		setTrainingPlan(location?.params);
	}, [location?.params]);

	const { attendance } = useSelector((state) => state.trainingAttendance);

	React.useEffect(() => {
		dispatch(getTrainings());
		dispatch(getTrainingsAttendance(`training=${trainingPlan}`));
	}, [trainingPlan]);

	return (
		<Sidenav title={'Training Attendance'}>
			<div>
				<div className={classes.dataTable}>
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
									<StyledTableCell align='center'>Date</StyledTableCell>
									<StyledTableCell align='center'>Status</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{attendance &&
									attendance.length > 0 &&
									attendance.map((el, i) => (
										<StyledTableRow>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{i + 1}
											</StyledTableCell>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{el?.training?.topic?.name}
											</StyledTableCell>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{el?.training?.participants?.name}
											</StyledTableCell>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{el?.training?.trainer?.name}
											</StyledTableCell>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{el?.date}
											</StyledTableCell>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{el?.isPresent ? 'Absent' : 'Present'}
											</StyledTableCell>
										</StyledTableRow>
									))}
							</TableBody>
						</Table>
					</TableContainer>
				</div>
			</div>
		</Sidenav>
	);
};

export default withRouter(TrainingAttendance);
