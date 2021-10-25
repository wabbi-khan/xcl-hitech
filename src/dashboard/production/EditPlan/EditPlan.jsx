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

const EditPlan = (props) => {
	const classes = useStyles();

	const { history } = props;

	const dispatch = useDispatch();

	useEffect(async () => {
		await dispatch(fetchMachineAction());
	}, [dispatch]);

	const { machines, loading, error } = useSelector((state) => state.machines);

	const [inputFields, setInputFields] = useState([]);

	useEffect(() => {
		setInputFields(history.location.state.plans);
	}, [history.location.state.plans]);

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

	const onUpdate = async () => {
		try {
			await axios({
				method: 'PATCH',
				url: `${process.env.REACT_APP_API_URL}/plan/${history.location.state.planId}`,
				headers: {
					'Content-Type': 'application/json',
				},
				data: {
					plan: [...inputFields],
				},
			});
			window.location.pathname = `productionDashboard/weekly-production-plan/${history.location.state.planId}`;
		} catch (error) {}
	};

	const days = [
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
		'Sunday',
	];

	return (
		<Sidenav title={'Add New Plan'}>
			<div className={classes.root}>
				{inputFields.map((inputField, i) => (
					<div>
						<Grid container spacing={1} style={{ marginTop: 15 }}>
							<Grid item lg={2} md={2} sm={12} xs={12}>
								<p className={classes.day}>{days[i]}</p>
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
									value={inputField.mgrDate}
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
									value={inputField.orderNo}
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
									value={inputField.machine1}
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
									value={inputField.machine2}
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
									value={inputField.machine3}
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
						style={{ marginRight: 20 }}
						onClick={onUpdate}
						className={classes.addButton}
					>
						Done
					</Button>
					<Button
						variant="outlined"
						color="primary"
						type="submit"
						style={{ borderWidth: 0 }}
						onClick={() => history.goBack()}
						className={`${classes.addButton} bg-danger text-light`}
					>
						Cancel
					</Button>
				</div>
			</div>
		</Sidenav>
	);
};

export default EditPlan;
