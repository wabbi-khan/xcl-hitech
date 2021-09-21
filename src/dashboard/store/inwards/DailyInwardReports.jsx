import React from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import TextField from '@material-ui/core/TextField';
import Button from '../../../components/utils/Button';

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
	dataTable: {
		marginTop: 10,
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

const DailyInwardReports = (props) => {
	const classes = useStyles();

	const history = props

	return (
		<Sidenav title={'Daily Inwards Report'}>
			<div>
				<div className={classes.dataTable}>
					<TableContainer className={classes.tableContainer}>
						{/* <h5>Inspected Orders</h5> */}
						<div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
							<CssTextField
								id='outlined-basic'
								// label='Search by Date'
								variant='outlined'
								type='date'
								size='small'
								autoComplete='off'
								style={{ width: '25%', marginLeft: '1rem' }}
								inputProps={{ style: { fontSize: 14 } }}
								InputLabelProps={{ style: { fontSize: 14 } }}
							// onChange={props.handleChange('remarks')}
							// onBlur={props.handleBlur('remarks')}
							// value={props.values.remarks}
							// helperText={props.touched.remarks && props.errors.remarks}
							// error={props.touched.remarks && props.errors.remarks}
							/>
							<Button
								text='View Report'
								classNames="btn bg-dark text-light"
								style={{
									
								}}
							/>
						</div>
						<div className='container-fluid mt-3' style={{ textAlign: 'left' }}>
							<table class='table table-responsive table-hover table-striped table-bordered border-dark text-center mt-1'>
								<thead class='bg-dark text-light'>
									<tr>
										<th>S.No.</th>
										<th>Item Code</th>
										<th>Item Name</th>
										<th>Department</th>
										<th>Current Balance</th>
										<th>Inwards Quantity</th>
										<th>New Balance</th>
										<th>New Rate</th>
										<th>Current Rate</th>
										<th>Current Amount</th>
									</tr>
								</thead>
								<tbody>
									{/* {
                                        loading ? (
                                            <Loading />
                                        ) :
                                            error ? (
                                                <MaterialError />
                                            ) :
                                                (
                                                    vehicles.length ?
                                                        vehicles.map((vehicle, i) => ( */}
									<tr>
										<td>
											{ }.
										</td>
										<td>
											{ }
										</td>
										<td>
											{ }
										</td>
										<td>
											{ }
										</td>
										<td>
											{ }
										</td>
										<td>
											{ }
										</td>
										<td>
											{ }
										</td>
										<td>
											{ }
										</td>
										<td>
											{ }
										</td>
										<td>
											{ }
										</td>
									</tr>
									{/* ))
                                                        : <h5>Not Found</h5>
                                                )
                                    } */}
								</tbody>
							</table>
						</div>
					</TableContainer>
				</div>
			</div>
		</Sidenav>
	);
};

export default DailyInwardReports;
