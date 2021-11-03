import React, { useEffect, useState } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
// import MenuItem from '@material-ui/core/MenuItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { fetchShiftAction } from '../../../services/action/ShiftAction';
import Loading from '../../purchase/material/Loading';
import MaterialError from '../../purchase/material/MaterialError';
import EditShifts from './EditShifts';

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

// function createData(No, name, Action) {
// 	return { No, name, Action };
// }

// const rows = [createData(1, 'Item1')];

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: '25ch',
		},
	},
	mainContainer: {
		textAlign: 'center',
		marginTop: 20,
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
			width: '10%',
		},
		[theme.breakpoints.down('sm')]: {
			// width: '12%',
		},
	},
	table: {
		minWidth: 600,
	},
	dataTable: {
		marginTop: 40,
	},
	inputFieldStyle: {
		[theme.breakpoints.up('md')]: {
			width: 330,
		},
		[theme.breakpoints.down('sm')]: {
			width: 200,
		},
	},
	inputFieldStyle1: {
		[theme.breakpoints.up('md')]: {
			width: 330,
			marginLeft: 10,
		},
		[theme.breakpoints.down('sm')]: {
			width: 200,
			marginTop: 10,
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

const Shifts = () => {
	const classes = useStyles();
	const { handleSubmit } = useForm();

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchShiftAction());
	}, [dispatch]);

	const { shifts, loading, error } = useSelector((state) => state.shifts);

	const [inputFields, setInputFields] = useState({
		name: '',
		startTime: new Date(Date.now()).toLocaleTimeString([], {
			hour: '2-digit',
			minute: '2-digit',
			hour12: false,
			second: '2-digit',
		}),
		endTime: new Date(Date.now()).toLocaleTimeString([], {
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			hour12: false,
		}),
	});

	const onSubmitDate = async () => {
		try {
			await axios({
				method: 'POST',
				url: `${process.env.REACT_APP_API_URL}/shift`,
				headers: {
					'Content-Type': 'application/json',
				},
				data: {
					name: inputFields.name,
					startTime: inputFields.startTime,
					endTime: inputFields.endTime,
				},
			});
			window.location.reload();
		} catch (error) {}
	};

	const [open, setOpen] = useState(false);
	const [shift, setShift] = useState({});

	const onChangeHandler = (e, placeholder) => {
		setInputFields({ ...inputFields, [placeholder]: e.target.value });
	};

	const handleClose = () => {
		setOpen(!open);
	};

	const handleOpen = (shift) => {
		setShift(shift);
		setOpen(true);
	};

	const onUpdateSubmit = async (shift) => {
		setShift({});
		try {
			await axios({
				method: 'PATCH',
				url: `${process.env.REACT_APP_API_URL}/shift/${shift._id}`,
				headers: {
					'Content-Type': 'application/json',
				},
				data: {
					name: shift.name,
					startTime: shift.startTime,
					endTime: shift.endTime,
				},
			});
			window.location.reload();
		} catch (error) {}
	};

	const onDelete = async (id) => {
		try {
			await axios({
				method: 'DELETE',
				url: `${process.env.REACT_APP_API_URL}/shift/${id}`,
			});
			window.location.reload();
		} catch (error) {}
	};

	return (
		<Sidenav title={'Shifts'}>
			<div>
				<Container className={classes.mainContainer}>
					<form action="" onSubmit={handleSubmit(onSubmitDate)}>
						{/* Material category selector */}
						<CssTextField
							id="outlined-basic"
							label="Shift Name"
							variant="outlined"
							type="text"
							autocomplete="off"
							size="small"
							className={classes.inputFieldStyle}
							style={{ marginRight: 20 }}
							inputProps={{ style: { fontSize: 14 } }}
							InputLabelProps={{ style: { fontSize: 14 } }}
							onChange={(e) => onChangeHandler(e, 'name')}
							value={inputFields.name}
						/>
						<CssTextField
							id="outlined-basic"
							variant="outlined"
							type="time"
							label="Enter start time"
							autocomplete="off"
							size="small"
							className={classes.inputFieldStyle}
							style={{ marginRight: 20 }}
							inputProps={{ style: { fontSize: 14 } }}
							InputLabelProps={{ style: { fontSize: 14 } }}
							value={inputFields.startTime}
							onChange={(e) => onChangeHandler(e, 'startTime')}
						/>
						<CssTextField
							id="outlined-basic"
							variant="outlined"
							type="time"
							label="Enter end time"
							autocomplete="off"
							size="small"
							className={classes.inputFieldStyle}
							inputProps={{ style: { fontSize: 14 } }}
							InputLabelProps={{ style: { fontSize: 14 } }}
							value={inputFields.endTime}
							onChange={(e) => onChangeHandler(e, 'endTime')}
						/>
						<div>
							<Button
								variant="outlined"
								color="primary"
								type="submit"
								className={classes.addButton}
							>
								Add
							</Button>
						</div>
					</form>
				</Container>
				<EditShifts
					show={open}
					close={handleClose}
					shift={shift}
					onSubmit={onUpdateSubmit}
				/>
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
										Shift Name
									</StyledTableCell>
									<StyledTableCell align="center">
										Start time
									</StyledTableCell>
									<StyledTableCell align="center">
										End time
									</StyledTableCell>
									<StyledTableCell align="center">
										Action
									</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{loading ? (
									<Loading />
								) : error ? (
									<MaterialError />
								) : shifts.length ? (
									shifts.map((shift, i) => (
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
												{shift.name}
											</StyledTableCell>
											<StyledTableCell
												className="text-dark bg-light"
												align="center"
											>
												{shift.startTime}
											</StyledTableCell>
											<StyledTableCell
												className="text-dark bg-light"
												align="center"
											>
												{shift.endTime}
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
														handleOpen(shift);
													}}
													style={{ marginTop: 2 }}
												>
													Edit
												</Button>
												<Button
													variant="contained"
													color="secondary"
													size="small"
													onClick={() => {
														onDelete(shift._id);
													}}
													style={{ marginLeft: 2, marginTop: 2 }}
												>
													Delete
												</Button>
											</StyledTableCell>
										</StyledTableRow>
									))
								) : (
									<h5>Not Found</h5>
								)}
							</TableBody>
						</Table>
					</TableContainer>
				</div>
			</div>
		</Sidenav>
	);
};

export default Shifts;
