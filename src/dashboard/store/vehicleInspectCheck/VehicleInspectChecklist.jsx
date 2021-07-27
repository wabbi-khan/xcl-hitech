import React, { useState, useEffect } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TableContainer from '@material-ui/core/TableContainer';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUnInspectedVehiclesAction } from '../../../services/action/VehiclesAction';
import Loading from '../../purchase/material/Loading';
import MaterialError from '../../purchase/material/MaterialError';
import axios from 'axios';

const GreenCheckbox = withStyles({
	root: {
		color: 'black',
		'&$checked': {
			color: '#22A19A',
		},
	},
	checked: {},
})((props) => <Checkbox color='default' {...props} />);

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

const VehicleInspectChecklist = () => {
	const [fitnessCert, setFitnessCert] = useState(false);
	const [regDoc, setRegDoc] = useState(false);
	const [RoadTaxPaid, setRoadTaxPaid] = useState(false);
	const [validVehicleInsp, setValidVehicleInsp] = useState(false);
	const [driverValidLins, setDriverValidLins] = useState(false);
	const [visualCheckVehicle, setVisualCheckVehicle] = useState(false);
	const [spareTyre, setSpareTyre] = useState(false);
	const [appropriateJack, setAppropriateJack] = useState(false);
	const [enoughFuel, setEnoughFuel] = useState(false);
	const [signOfInspector, setSignOfInspector] = useState(false);
	const [SubmitError, setSubmitError] = useState('');

	const classes = useStyles();

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchUnInspectedVehiclesAction());
	}, [dispatch]);

	const { loading, vehicles, error } = useSelector((state) => state.vehicles);

	const getCheckedValues = async (_id) => {
		if (
			fitnessCert &&
			regDoc &&
			RoadTaxPaid &&
			validVehicleInsp &&
			driverValidLins &&
			visualCheckVehicle &&
			spareTyre &&
			appropriateJack &&
			enoughFuel &&
			signOfInspector
		) {
			await axios.patch(
				`${process.env.REACT_APP_API_URL}/vehicle/inspection/${_id}`,
				{
					fitnessCert,
					regDoc,
					RoadTaxPaid,
					validVehicleInsp,
					driverValidLins,
					visualCheckVehicle,
					spareTyre,
					appropriateJack,
					enoughFuel,
					signOfInspector,
				},
			);
		} else {
			console.log('error');
			setSubmitError('Internal Server Error');
		}
	};
	return (
		<Sidenav title={'Vehicle Inspection Checklist'}>
			<div>
				<div className={classes.dataTable}>
					{fitnessCert == false ||
					regDoc == false ||
					RoadTaxPaid == false ||
					validVehicleInsp == false ||
					driverValidLins == false ||
					visualCheckVehicle == false ||
					spareTyre == false ||
					appropriateJack == false ||
					enoughFuel == false ||
					signOfInspector == false ? (
						<span className={classes.Error}>Check All The Fields</span>
					) : null}
					<div className={classes.dataTable}>
						<TableContainer className={classes.tableContainer}>
							{/* <h5>Inspected Orders</h5> */}
							<div className='container-fluid' style={{ textAlign: 'left' }}>
								<table class='table table-responsive table-hover table-striped table-bordered border-dark text-center'>
									<thead class='bg-dark text-light'>
										<tr>
											<th>S.No.</th>
											<th>Vehicle No.</th>
											<th>Driver Name</th>
											<th>Fitness Certificate</th>
											<th>Reg. Document</th>
											<th>Road Tax Paid</th>
											<th>Valid Vehicle Ins</th>
											<th>Driver's Valid License</th>
											<th>Visual Check of Vehicle</th>
											<th>
												Tyre/
												<br />
												Spare
											</th>
											<th>Appropriate Jack</th>
											<th>Enough Fuel in the Tank</th>
											<th>Sign of Inspector</th>
											<th>Action</th>
										</tr>
									</thead>
									<tbody>
										{loading ? (
											<Loading />
										) : error ? (
											<MaterialError />
										) : vehicles.length ? (
											vehicles.map((vehicle, i) => (
												<tr key={i}>
													<td>{i + 1}</td>
													<td>{vehicle.number}</td>
													<td>{vehicle.driverName}</td>
													<td>
														<FormControlLabel
															style={{ marginTop: -6 }}
															label='Yes'
															control={
																<GreenCheckbox
																	name='checkedG'
																	onChange={(e) => {
																		if (e.target.checked) {
																			setFitnessCert(true);
																		}
																		if (!e.target.checked) {
																			setFitnessCert(false);
																		}
																	}}
																/>
															}
														/>
													</td>
													<td>
														<FormControlLabel
															style={{ marginTop: -6 }}
															label='Yes'
															control={
																<GreenCheckbox
																	name='checkedG'
																	onChange={(e) => {
																		if (e.target.checked) {
																			setRegDoc(true);
																		}
																		if (!e.target.checked) {
																			setRegDoc(false);
																		}
																	}}
																/>
															}
														/>
													</td>
													<td>
														<FormControlLabel
															style={{ marginTop: -6 }}
															label='Yes'
															control={
																<GreenCheckbox
																	name='checkedG'
																	onChange={(e) => {
																		if (e.target.checked) {
																			setRoadTaxPaid(true);
																		}
																		if (!e.target.checked) {
																			setRoadTaxPaid(false);
																		}
																	}}
																/>
															}
														/>
													</td>
													<td>
														<FormControlLabel
															style={{ marginTop: -6 }}
															label='Yes'
															control={
																<GreenCheckbox
																	name='checkedG'
																	onChange={(e) => {
																		if (e.target.checked) {
																			setValidVehicleInsp(true);
																		}
																		if (!e.target.checked) {
																			setValidVehicleInsp(false);
																		}
																	}}
																/>
															}
														/>
													</td>
													<td>
														<FormControlLabel
															style={{ marginTop: -6 }}
															label='Yes'
															control={
																<GreenCheckbox
																	name='checkedG'
																	onChange={(e) => {
																		if (e.target.checked) {
																			setDriverValidLins(true);
																		}
																		if (!e.target.checked) {
																			setDriverValidLins(false);
																		}
																	}}
																/>
															}
														/>
													</td>
													<td>
														<FormControlLabel
															style={{ marginTop: -6 }}
															label='Yes'
															control={
																<GreenCheckbox
																	name='checkedG'
																	onChange={(e) => {
																		if (e.target.checked) {
																			setVisualCheckVehicle(true);
																		}
																		if (!e.target.checked) {
																			setVisualCheckVehicle(false);
																		}
																	}}
																/>
															}
														/>
													</td>
													<td>
														<FormControlLabel
															style={{ marginTop: -6 }}
															label='Yes'
															control={
																<GreenCheckbox
																	name='checkedG'
																	onChange={(e) => {
																		if (e.target.checked) {
																			setSpareTyre(true);
																		}
																		if (!e.target.checked) {
																			setSpareTyre(false);
																		}
																	}}
																/>
															}
														/>
													</td>
													<td>
														<FormControlLabel
															style={{ marginTop: -6 }}
															label='Yes'
															control={
																<GreenCheckbox
																	name='checkedG'
																	onChange={(e) => {
																		if (e.target.checked) {
																			setAppropriateJack(true);
																		}
																		if (!e.target.checked) {
																			setAppropriateJack(false);
																		}
																	}}
																/>
															}
														/>
													</td>
													<td>
														<FormControlLabel
															style={{ marginTop: -6 }}
															label='Yes'
															control={
																<GreenCheckbox
																	name='checkedG'
																	onChange={(e) => {
																		if (e.target.checked) {
																			setEnoughFuel(true);
																		}
																		if (!e.target.checked) {
																			setEnoughFuel(false);
																		}
																	}}
																/>
															}
														/>
													</td>
													<td>
														<FormControlLabel
															style={{ marginTop: -6 }}
															label='Yes'
															control={
																<GreenCheckbox
																	name='checkedG'
																	onChange={(e) => {
																		if (e.target.checked) {
																			setSignOfInspector(true);
																		}
																		if (!e.target.checked) {
																			setSignOfInspector(false);
																		}
																	}}
																/>
															}
														/>
													</td>
													<td>
														<Button
															variant='contained'
															size='small'
															class='btn btn-sm bg-dark text-light'
															onClick={() => getCheckedValues(vehicle._id)}
															style={{ marginLeft: 2, marginTop: 2 }}>
															Finish
														</Button>
													</td>
												</tr>
											))
										) : (
											<h5>Not Found</h5>
										)}
									</tbody>
								</table>
							</div>
						</TableContainer>
					</div>
				</div>
			</div>
		</Sidenav>
	);
};

export default VehicleInspectChecklist;
