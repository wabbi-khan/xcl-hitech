import React from 'react';
import Sidenav from '../../SideNav/Sidenav';
import Grid from '@material-ui/core/Grid';
import TableContainer from '@material-ui/core/TableContainer';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';

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
		marginTop: 40,
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

const ProductsBinCard = () => {
	const classes = useStyles();

	return (
		<Sidenav title={'Products Bin Card'}>
			<div>
				<Container className={classes.mainContainer}>
					<Grid container spacing={1} style={{ marginTop: 15 }}>
						<Grid item lg={12} md={12} sm={12} xs={5}>
							<CssTextField
								id='outlined-basic'
								// label="Product Name"
								variant='outlined'
								type='date'
								size='small'
								autoComplete='off'
								required
								className={classes.inputFieldStyle}
								inputProps={{ style: { fontSize: 14 } }}
								InputLabelProps={{ style: { fontSize: 14 } }}></CssTextField>
						</Grid>
					</Grid>
				</Container>
				<div className={classes.dataTable}>
					<TableContainer className={classes.tableContainer}>
						{/* <h5>Inspected Orders</h5> */}
						<div className='container-fluid' style={{ textAlign: 'left' }}>
							<table class='table table-responsive table-hover table-striped table-bordered border-dark text-center mt-3'>
								<thead class='bg-dark text-light'>
									<tr>
										<th>S.No.</th>
										<th>Product Name</th>
										<th>Current Balance</th>
										<th>IN</th>
										<th>OUT</th>
										<th>Balance</th>
										<th>Date</th>
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
										<td>{/* {vehicle.cnicNum} */}</td>
										<td>{/* {vehicle.cnicNum} */}</td>
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

export default ProductsBinCard;
