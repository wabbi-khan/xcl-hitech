import React from 'react';
import Sidenav from '../../SideNav/Sidenav';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';

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
		// marginLeft: 0
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
		marginTop: 30,
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

const DeptWiseStoreInventory = () => {
	const classes = useStyles();

	return (
		<Sidenav title={'Depatment Wise Store Inventory'}>
			<div>
				<Container className={classes.mainContainer}>
					<Grid container spacing={1} style={{ marginTop: 15 }}>
						<Grid item lg={12} md={2} sm={4} xs={4}>
							<CssTextField
								id='outlined-basic'
								label='Select Department'
								variant='outlined'
								type='text'
								size='small'
								select
								autoComplete='off'
								style={{ width: '25%' }}
								inputProps={{ style: { fontSize: 14 } }}
								InputLabelProps={{ style: { fontSize: 14 } }}>
								<MenuItem value=''>
									<em>None</em>
								</MenuItem>
								<MenuItem value={10}>Manufacture</MenuItem>
								<MenuItem value={20}>Purchase</MenuItem>
								<MenuItem value={20}>Sales</MenuItem>
							</CssTextField>
						</Grid>
					</Grid>
				</Container>
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
										<th>Allocated Qty.</th>
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

export default DeptWiseStoreInventory;
