import React from 'react';
import Sidenav from '../../SideNav/Sidenav';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';

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

const DeptWiseConsReport = () => {
	const classes = useStyles();

	return (
		<Sidenav title={'Department Wise Consumption Report'}>
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
								className={classes.inputFieldStyle1}
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
						<Table
							stickyHeader
							className='table table-dark table-md'
							style={{ backgroundColor: '#d0cfcf', border: '1px solid grey' }}>
							<TableHead>
								<TableRow hover role='checkbox'>
									<StyledTableCell align='center'>Sr.No</StyledTableCell>
									<StyledTableCell align='center'>Item Name</StyledTableCell>
									<StyledTableCell align='center'>Item No.</StyledTableCell>
									<StyledTableCell align='center'>Department</StyledTableCell>
									<StyledTableCell align='center'>Qty Consumed</StyledTableCell>
									<StyledTableCell align='center'>Req. Date</StyledTableCell>
									<StyledTableCell align='center'>Previous Quantity</StyledTableCell>
									<StyledTableCell align='center'>New Quantity</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								<StyledTableRow>
									<StyledTableCell className='text-dark' align='center'>
										1.
									</StyledTableCell>
									<StyledTableCell className='text-dark' align='center'>
										Screw
									</StyledTableCell>
									<StyledTableCell className='text-dark' align='center'>
										23423
									</StyledTableCell>
									<StyledTableCell className='text-dark' align='center'>
										Manufacture
									</StyledTableCell>
									<StyledTableCell className='text-dark' align='center'>
										232342
									</StyledTableCell>
									<StyledTableCell className='text-dark' align='center'>
										2-2-21
									</StyledTableCell>
									<StyledTableCell className='text-dark' align='center'>
										321345
									</StyledTableCell>
									<StyledTableCell className='text-dark' align='center'>
										421122
									</StyledTableCell>
								</StyledTableRow>
								<StyledTableRow>
									<StyledTableCell className='text-dark' align='center'>
										2.
									</StyledTableCell>
									<StyledTableCell className='text-dark' align='center'>
										Cement
									</StyledTableCell>
									<StyledTableCell className='text-dark' align='center'>
										23423
									</StyledTableCell>
									<StyledTableCell className='text-dark' align='center'>
										Manufacture
									</StyledTableCell>
									<StyledTableCell className='text-dark' align='center'>
										232342
									</StyledTableCell>
									<StyledTableCell className='text-dark' align='center'>
										2-2-21
									</StyledTableCell>
									<StyledTableCell className='text-dark' align='center'>
										321345
									</StyledTableCell>
									<StyledTableCell className='text-dark' align='center'>
										421122
									</StyledTableCell>
								</StyledTableRow>
								<StyledTableRow>
									<StyledTableCell className='text-dark' align='center'>
										3.
									</StyledTableCell>
									<StyledTableCell className='text-dark' align='center'>
										Screw
									</StyledTableCell>
									<StyledTableCell className='text-dark' align='center'>
										23423
									</StyledTableCell>
									<StyledTableCell className='text-dark' align='center'>
										Manufacture
									</StyledTableCell>
									<StyledTableCell className='text-dark' align='center'>
										232342
									</StyledTableCell>
									<StyledTableCell className='text-dark' align='center'>
										2-2-21
									</StyledTableCell>
									<StyledTableCell className='text-dark' align='center'>
										321345
									</StyledTableCell>
									<StyledTableCell className='text-dark' align='center'>
										421122
									</StyledTableCell>
								</StyledTableRow>
							</TableBody>
						</Table>
					</TableContainer>
				</div>
			</div>
		</Sidenav>
	);
};

export default DeptWiseConsReport;
