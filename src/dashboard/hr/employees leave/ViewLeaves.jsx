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
import { getLeavesAction } from '../../../services/action/LeaveActions';
import moment from 'moment';
import Button from '../../../components/utils/Button';
import Loader from 'react-loader-spinner';

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
	const [fetchLoading, setFetchLoading] = React.useState(true);
	const [fetchError, setFetchError] = React.useState('');
	const [searchText, setSearchText] = React.useState('');
	const classes = useStyles();
	const dispatch = useDispatch();

	const { leaves } = useSelector((state) => state.leaves);

	React.useEffect(() => {
		setFetchLoading(true);
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
	}, [dispatch]);

	React.useEffect(() => {
		if (searchText) {
			setFetchLoading(true);
			dispatch(
				getLeavesAction(`empCode[regex]=${searchText}`, (err) => {
					if (err) {
						setFetchError(err);
						setTimeout(() => {
							setFetchError('');
						}, 4000);
					}
					setFetchLoading(false);
				})
			);
		} else {
			setFetchLoading(true);
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
		}
	}, [searchText]);

	return (
		<Sidenav title="Leaves">
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<span style={{ marginBottom: 5 }}>Search By Employee Id</span>
				<CssTextField
					id="outlined-basic"
					label="Search"
					variant="outlined"
					type="text"
					size="small"
					style={{ width: '40%' }}
					autocomplete="off"
					onChange={(e) => setSearchText(e.target.value)}
					value={searchText}
					inputProps={{ style: { fontSize: 14 } }}
					InputLabelProps={{ style: { fontSize: 14 } }}
				/>
			</div>

			<div>
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
					<p>There are no Attendances</p>
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
											Employee Id
										</StyledTableCell>
										<StyledTableCell align="center">
											Leave Purpose
										</StyledTableCell>
										<StyledTableCell align="center">
											is Paid
										</StyledTableCell>
										<StyledTableCell align="center">
											From
										</StyledTableCell>
										<StyledTableCell align="center">
											To
										</StyledTableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{leaves &&
										leaves.length > 0 &&
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
													{el?.employee?.code}
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
													{el?.isPaid ? 'Paid' : 'Not Paid'}
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
