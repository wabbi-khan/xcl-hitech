import React from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { makeStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
// import Container from '@material-ui/core/Container';
// import Button from '@material-ui/core/Button';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import MenuItem from '@material-ui/core/MenuItem';
// import Grid from '@material-ui/core/Grid';

// const StyledTableCell = withStyles((theme) => ({
//     head: {
//         backgroundColor: theme.palette.common.black,
//         color: theme.palette.common.white,
//     },
//     body: {
//         fontSize: 14,
//     },
// }))(TableCell);

// const StyledTableRow = withStyles((theme) => ({
//     root: {
//         '&:nth-of-type(odd)': {
//             backgroundColor: theme.palette.action.hover,
//         },
//     },
// }))(TableRow);

// function createData(No, name, Action) {
//     return { No, name, Action };
// }

// const rows = [
//     createData(1, 'Item1'),

// ];

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

const DailyConsumptionReport = () => {
	const classes = useStyles();

	return (
		<Sidenav title={'Daily Consumption Report'}>
			<div className={classes.dataTable}>
				<TableContainer className={classes.tableContainer}>
					{/* <h5>Inspected Orders</h5> */}
					<div className='container-fluid' style={{ textAlign: 'left' }}>
						<table class='table table-responsive table-hover table-striped table-bordered border-dark text-center mt-1'>
							<thead class='bg-dark text-light'>
								<tr>
									<th>S.No.</th>
									<th>Item Name</th>
									<th>Item No.</th>
									<th>Department</th>
									<th>Qty Consumed</th>
									<th>Req. Date</th>
									<th>Previous Quantity</th>
									<th>New Quantity</th>
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
									<td>{/* {vehicle.phoneNum} */}</td>
									<td>{/* {vehicle.phoneNum} */}</td>
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
		</Sidenav>
	);
};

export default DailyConsumptionReport;
