import React, { useState, useEffect } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import Checkbox from '@material-ui/core/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';

import {
	getVehicles,
	updateVehicles,
} from '../../../services/action/VehiclesAction';
import Button from '../../../components/utils/Button';
import { Formik, Form, Field } from 'formik';
import { MenuItem } from '@material-ui/core';

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
		width: '10%',
		'&:hover': {
			border: 'none',
			backgroundColor: '#22A19A',
			color: 'whitesmoke',
		},
	},
	table: {
		minWidth: 600,
	},
	tableContainer: {
		marginTop: 20,
	},
	dataTable: {
		marginTop: 20,
	},
	Error: {
		color: 'red',
		backgroundColor: '#e8eaf6',
		padding: 8,
		borderRadius: 5,
		marginLeft: 3,
	},
	inputFieldStyle: {
		[theme.breakpoints.up('md')]: {
			width: 250,
		},
		[theme.breakpoints.down('sm')]: {
			width: 200,
		},
	},
	inputFieldStyle1: {
		[theme.breakpoints.up('md')]: {
			width: 250,
		},
		[theme.breakpoints.down('sm')]: {
			width: 200,
			marginTop: 10,
		},
	},
}));

// const initialValues = {
// 	fitnessCert: false,
// 	regDoc: false,
// 	roadTaxPaid: false,
// 	validVehicleInsp: false,
// 	driverValidLins: false,
// 	visualCheckVehicle: false,
// 	spareTyre: false,
// 	appropriateJack: false,
// 	enoughFuel: false,
// 	signOfInspector: false,
// };

const initialValues = {
	choices: [],
};

const checkList = [
	{
		id: '1',
		name: 'Fitness Cert',
		value: 'fitnessCert',
	},
	{
		id: '2',
		name: 'Reg Doc',
		value: 'regDoc',
	},
	{
		id: '3',
		name: 'Road Tax Paid',
		value: 'roadTaxPaid',
	},
	{
		id: '4',
		name: 'Valid Vehicle Inspection',
		value: 'validVehicleInsp',
	},
	{
		id: '5',
		name: 'Driver Valid License',
		value: 'driverValidLins',
	},
	{
		id: '6',
		name: 'Visual Check Vehicle',
		value: 'visualCheckVehicle',
	},
	{
		id: '7',
		name: 'Spare Tyre',
		value: 'spareTyre',
	},
	{
		id: '8',
		name: 'Appropriate Jack',
		value: 'appropriateJack',
	},
	{
		id: '9',
		name: 'Enough Fuel',
		value: 'enoughFuel',
	},
	{
		id: '10',
		name: 'Sign Of Inspector',
		value: 'signOfInspector',
	},
];

const VehicleInspectChecklist = ({ history }) => {
	const [updateLoading, setUpdateLoading] = React.useState(false);
	const [updateError, setUpdateError] = React.useState('');
	const [success, setSuccess] = React.useState('');
	const [initialValuesState, setInitialValues] = React.useState({
		...initialValues,
	});
	const [vehicle, setVehicle] = useState('');
	const [checked, setChecked] = useState(false);

	const classes = useStyles();

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getVehicles('inspected=false'));
	}, [dispatch]);

	const { vehicles } = useSelector((state) => state.vehicles);

	const onSubmit = (values) => {
		if (!vehicle) {
			setUpdateError('Select a vehicle');
			setTimeout(() => {
				setUpdateError('');
			}, 4000);
			return;
		}
		let obj = {};
		values.choices.forEach((value) => {
			obj[value] = true;
		});

		values = {
			...obj,
		};

		setUpdateLoading(true);
		dispatch(
			updateVehicles(vehicle._id, values, (err, data) => {
				if (err) {
					setUpdateError(err);
					setTimeout(() => {
						setUpdateError('');
					}, 4000);
				} else {
					setUpdateLoading(false);
					if (data.inspected) {
						setSuccess(true);
						setTimeout(() => {
							setSuccess(false);
						}, 4000);
					} else {
						setUpdateError(
							'Vehicle is not inspected, Make sure all the boxes are checked'
						);
						setTimeout(() => {
							setUpdateError('');
						}, 4000);
					}
				}
			})
		);
	};

	function checkAll() {
		if (!checked) {
			setChecked(true);
			const checks = [];
			checkList.forEach((el) => checks.push(el?.value));
			setInitialValues({ ...initialValuesState, choices: [...checks] });
		} else {
			setChecked(false);
			setInitialValues({ ...initialValuesState, choices: [] });
		}
	}

	return (
		<Sidenav title={'Vehicle Inspection Checklist'}>
			<div>
				<div className={classes.dataTable}>
					<div>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
							}}
						>
							<div>
								{vehicle && (
									<div
										style={{
											display: 'flex',
											flexDirection: 'column',
										}}
									>
										<span style={{ fontSize: '20px' }}>
											Driver Name: {vehicle?.driverName}
										</span>
										<span style={{ fontSize: '20px' }}>
											Vehicle Number: {vehicle?.number}
										</span>
									</div>
								)}
							</div>
							<div>
								<Button
									type="button"
									size="small"
									text="Print Vehicle List"
									classNames="bg-dark text-light"
									style={{ textTransform: 'capitalize' }}
									onClick={() => {
										history.push(
											'/storedashboard/print_vehicle_inspect_checklist'
										);
									}}
								/>
							</div>
						</div>
						<TableContainer className={classes.tableContainer}>
							<div
								className="container-fluid"
								style={{ textAlign: 'left' }}
							>
								<CssTextField
									id="outlined-basic"
									label="Select Vehicle"
									variant="outlined"
									type="text"
									autocomplete="off"
									size="small"
									style={{ width: '40%', margin: '20px 0px' }}
									select
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
								>
									{!vehicles || !vehicles.length ? (
										<p>Data Not Found</p>
									) : (
										vehicles.map((el) => (
											<MenuItem
												value={el._id}
												key={el._id}
												onClick={() => setVehicle(el)}
											>
												{el.driverName} - {el.number}
											</MenuItem>
										))
									)}
								</CssTextField>

								<div
									style={{
										display: 'flex',
										justifyContent: 'flex-end',
									}}
								>
									<Button
										type="button"
										text={checked ? 'UnCheck All' : 'Check All'}
										classNames="bg-dark text-light"
										onClick={checkAll}
									/>
								</div>

								<Formik
									initialValues={initialValuesState}
									onSubmit={onSubmit}
									enableReinitialize
								>
									{(props) => (
										<Form>
											{checkList.map((el) => (
												<div
													key={el?.id}
													style={{
														display: 'flex',
														alignItems: 'center',
														gap: '20px',
													}}
												>
													<span style={{ fontSize: '20px' }}>
														{el?.name}
													</span>
													<Field
														name="choices"
														type="checkbox"
														value={el?.value}
														as={Checkbox}
													/>
												</div>
											))}
											<Button
												text="add"
												loading={updateLoading}
												loaderColor="#333"
												classNames="btn bg-primary text-light"
											/>
											{updateError && (
												<p
													style={{
														textAlign: 'center',
														fontSize: '20px',
														marginBottom: '20px',
														color: 'red',
													}}
												>
													{updateError}
												</p>
											)}
											{success && (
												<p
													style={{
														textAlign: 'center',
														fontSize: '20px',
														marginBottom: '20px',
														color: 'green',
													}}
												>
													Successfully Inspected
												</p>
											)}
										</Form>
									)}
								</Formik>
							</div>
						</TableContainer>
					</div>
				</div>
			</div>
		</Sidenav>
	);
};

export default VehicleInspectChecklist;
