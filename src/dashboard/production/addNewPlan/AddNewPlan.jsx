import React, { useEffect, useState } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMachineAction } from '../../../services/action/MachineAction';
import axios from 'axios';

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

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	addButton: {
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
	day: {
		borderColor: '#333333',
		borderStyle: 'solid',
		padding: 10,
		borderWidth: 0.5,
		marginTop: -5,
		textAlign: 'center',
	},
}));

const AddNewPlan = (props) => {
	const classes = useStyles();

	const dispatch = useDispatch();

	useEffect(async () => {
		await dispatch(fetchMachineAction());
	}, [dispatch]);

	const { machines, loading, error } = useSelector((state) => state.machines);

	const [inputFields, setInputFields] = useState([
		{
			mgrDate: '',
			orderNo: '',
			machine1: null,
			machine2: null,
			machine3: null,
		},
		{
			mgrDate: '',
			orderNo: '',
			machine1: null,
			machine2: null,
			machine3: null,
		},
		{
			mgrDate: '',
			orderNo: '',
			machine1: null,
			machine2: null,
			machine3: null,
		},
		{
			mgrDate: '',
			orderNo: '',
			machine1: null,
			machine2: null,
			machine3: null,
		},
		{
			mgrDate: '',
			orderNo: '',
			machine1: null,
			machine2: null,
			machine3: null,
		},
		{
			mgrDate: '',
			orderNo: '',
			machine1: null,
			machine2: null,
			machine3: null,
		},
		{
			mgrDate: '',
			orderNo: '',
			machine1: null,
			machine2: null,
			machine3: null,
		},
	]);

	const onChangeHandler = (value, placeholder, index) => {
		setInputFields(
			inputFields.map((el, i) => {
				if (i === index) {
					return { ...el, [placeholder]: value };
				} else {
					return el;
				}
			})
		);
	};

	const onSubmit = async () => {
		try {
			await axios({
				method: 'POST',
				url: `${process.env.REACT_APP_API_URL}/plan`,
				headers: {
					'Content-Type': 'application/json',
				},
				data: {
					plan: [...inputFields],
				},
			});
			window.location.pathname =
				'productionDashboard/weekly-production-plan';
		} catch (error) {}
	};

	return (
		<Sidenav title={'Add New Plan'}>
			<div className={classes.root}>
				{[
					'Monday',
					'Tuesday',
					'Wednesday',
					'Thursday',
					'Friday',
					'Saturday',
					'Sunday',
				].map((day, i) => (
					<div>
						<Grid container spacing={1} style={{ marginTop: 15 }}>
							<Grid item lg={2} md={2} sm={12} xs={12}>
								<p className={classes.day}>{day}</p>
							</Grid>
							<Grid item lg={2} md={2} sm={12} xs={12}>
								<CssTextField
									id="outlined-basic"
									variant="outlined"
									type="date"
									size="small"
									autoComplete="off"
									placeholder="Mgr. Date"
									style={{ width: '100%' }}
									value={inputFields.mgrDate}
									onChange={(e) =>
										onChangeHandler(e.target.value, 'mgrDate', i)
									}
									required
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
								></CssTextField>
							</Grid>
							<Grid item lg={2} md={2} sm={12} xs={12}>
								<CssTextField
									id="outlined-basic"
									// label="Product Name"
									variant="outlined"
									type="text"
									size="small"
									autoComplete="off"
									placeholder="Order No:"
									required
									value={inputFields.orderNo}
									onChange={(e) =>
										onChangeHandler(e.target.value, 'orderNo', i)
									}
									style={{ width: '100%' }}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
								></CssTextField>
							</Grid>
							<Grid item lg={2} md={2} sm={12} xs={12}>
								<CssTextField
									id="outlined-basic"
									label="Select Machine 1"
									variant="outlined"
									type="text"
									autoComplete="off"
									size="small"
									select
									value={inputFields.machine1}
									onChange={(e) =>
										onChangeHandler(e.target.value, 'machine1', i)
									}
									className={classes.inputFieldStyle}
									inputProps={{ style: { fontSize: 14 } }}
									style={{ width: '100%' }}
									InputLabelProps={{ style: { fontSize: 14 } }}
								>
									{!machines || !machines.length ? (
										<p>Data Not Found</p>
									) : (
										machines.map((machine, i) => (
											<MenuItem value={machine._id} key={i}>
												{machine.name}
											</MenuItem>
										))
									)}
								</CssTextField>
							</Grid>
							<Grid item lg={2} md={2} sm={12} xs={12}>
								<CssTextField
									id="outlined-basic"
									label="Select Machine 2"
									variant="outlined"
									type="text"
									autoComplete="off"
									size="small"
									select
									value={inputFields.machine2}
									onChange={(e) =>
										onChangeHandler(e.target.value, 'machine2', i)
									}
									className={classes.inputFieldStyle}
									inputProps={{ style: { fontSize: 14 } }}
									style={{ width: '100%' }}
									InputLabelProps={{ style: { fontSize: 14 } }}
								>
									{!machines || !machines.length ? (
										<p>Data Not Found</p>
									) : (
										machines.map((machine, i) => (
											<MenuItem value={machine._id} key={i}>
												{machine.name}
											</MenuItem>
										))
									)}
								</CssTextField>
							</Grid>
							<Grid item lg={2} md={2} sm={12} xs={12}>
								<CssTextField
									id="outlined-basic"
									label="Select Machine 3"
									variant="outlined"
									type="text"
									autoComplete="off"
									size="small"
									select
									value={inputFields.machine3}
									onChange={(e) =>
										onChangeHandler(e.target.value, 'machine3', i)
									}
									className={classes.inputFieldStyle}
									inputProps={{ style: { fontSize: 14 } }}
									style={{ width: '100%' }}
									InputLabelProps={{ style: { fontSize: 14 } }}
								>
									{!machines || !machines.length ? (
										<p>Data Not Found</p>
									) : (
										machines.map((machine, i) => (
											<MenuItem value={machine._id} key={i}>
												{machine.name}
											</MenuItem>
										))
									)}
								</CssTextField>
							</Grid>
						</Grid>
					</div>
				))}
				<div
					style={{
						width: '100%',
						display: 'flex',
						justifyContent: 'center',
						marginTop: 20,
					}}
				>
					<Button
						variant="outlined"
						color="primary"
						onClick={onSubmit}
						className={classes.addButton}
					>
						Add
					</Button>
				</div>
			</div>
		</Sidenav>
	);
};

export default AddNewPlan;
