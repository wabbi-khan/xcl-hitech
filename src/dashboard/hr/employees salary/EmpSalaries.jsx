import React, { useState } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '../../../components/utils/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {
	getSalariesAction,
	createSalariesAction,
	paidSalaryAction,
	unpaidSalaryAction,
} from '../../../services/action/SalaryAction';
import { useDispatch, useSelector } from 'react-redux';
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
	dataTable: {
		marginTop: 40,
	},
	paidBtn: {
		backgroundColor: 'red',
		color: 'whitesmoke',
		'&:hover': {
			backgroundColor: 'red',
			color: 'whitesmoke',
		},
	},
	paidBtn1: {
		backgroundColor: 'green',
		color: 'whitesmoke',
		'&:hover': {
			backgroundColor: 'green',
			color: 'whitesmoke',
		},
	},
}));

const EmpSalaries = () => {
	const classes = useStyles();
	const [IsPaid, setIsPaid] = useState(false);
	const [createLoading, setCreateLoading] = useState(false);
	const [createError, setCreateError] = useState('');
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState('');

	const dispatch = useDispatch();
	const { salaries } = useSelector((state) => state.salaries);

	React.useEffect(() => {
		dispatch(getSalariesAction());
	}, []);

	const createSalaries = () => {
		setCreateLoading(true);
		dispatch(
			createSalariesAction((err) => {
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

	const paySal = (el) => {
		setLoading(true);
		dispatch(
			paidSalaryAction(el, () => {
				setLoading(false);
			})
		);
	};
	const unPaySal = (el) => {
		setLoading(true);
		dispatch(
			unpaidSalaryAction(el, () => {
				setLoading(false);
			})
		);
	};

	return (
		<Sidenav title={'Employees Salaries'}>
			<div>
				<div className={classes.dataTable}>
					<div
						style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
					>
						<Button
							variant="contained"
							style={{
								marginBottom: '1rem',
								backgroundColor: 'lightBlue',
							}}
							size="small"
							text="Create Salaries"
							onClick={createSalaries}
							loading={createLoading}
						/>

						{createError && (
							<p style={{ color: 'red', fontWeight: 'bold' }}>
								{createError}
							</p>
						)}
					</div>
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
										Salary
									</StyledTableCell>
									<StyledTableCell align="center">
										Salary Status
									</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{salaries && !salaries.length ? (
									<h1>Not found</h1>
								) : (
									salaries.map((el, i) => (
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
												{capitalize(el.employee?.name)}
											</StyledTableCell>
											<StyledTableCell
												className="text-dark bg-light"
												align="center"
											>
												{capitalize(
													el.employee?.finalDesignation?.name
												)}
											</StyledTableCell>
											<StyledTableCell
												className="text-dark bg-light"
												align="center"
											>
												{capitalize(
													el.employee?.finalDepartment?.name
												)}
											</StyledTableCell>
											<StyledTableCell
												className="text-dark bg-light"
												align="center"
											>
												{el.employee?.finalSal}
											</StyledTableCell>

											<StyledTableCell
												className="text-light bg-light"
												align="center"
											>
												<Button
													variant="contained"
													size="small"
													classNames={
														el.isPaid
															? `${classes.paidBtn1}`
															: `${classes.paidBtn}`
													}
													onClick={() => {
														el.isPaid ? unPaySal(el) : paySal(el);
													}}
													text={el.isPaid ? 'Is paid' : 'pay'}
													loading={loading}
													loaderColor="#fff"
												/>
											</StyledTableCell>
										</StyledTableRow>
									))
								)}
							</TableBody>
						</Table>
					</TableContainer>
				</div>
			</div>
		</Sidenav>
	);
};

export default EmpSalaries;
