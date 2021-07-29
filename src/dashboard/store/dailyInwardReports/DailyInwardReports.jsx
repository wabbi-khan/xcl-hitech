import React from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { makeStyles } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';

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

const DailyInwardReports = () => {
	const classes = useStyles();

	return (
		<Sidenav title={'Daily Inwards Report'}>
			<div>
				<div className={classes.dataTable}>
					<TableContainer className={classes.tableContainer}>
						{/* <h5>Inspected Orders</h5> */}
						<div className='container-fluid' style={{ textAlign: 'left' }}>
							<table class='table table-responsive table-hover table-striped table-bordered border-dark text-center mt-1'>
								<thead class='bg-dark text-light'>
									<tr>
										<th>S.No.</th>
										<th>Item Code</th>
										<th>Current Balance</th>
										<th>Inwards Quantity</th>
										<th>New Balance</th>
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
										<td>{1}</td>
										<td>{/* {vehicle.number} */}</td>
										<td>{/* {vehicle.type} */}</td>
										<td>{/* {vehicle.driverName} */}</td>
										<td>{/* {vehicle.phoneNum} */}</td>
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
