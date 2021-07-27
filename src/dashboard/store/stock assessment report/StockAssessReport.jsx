import React from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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
		[theme.breakpoints.up('md')]: {
			marginLeft: 0,
			marginTop: 15,
		},
		[theme.breakpoints.down('sm')]: {
			marginTop: -15,
		},
	},
	addButton: {
		marginTop: 50,
		marginLeft: 15,
		color: '#22A19A',
		borderColor: '#22A19A',
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
	ckeckBox: {
		[theme.breakpoints.up('md')]: {
			marginLeft: 25,
		},
		[theme.breakpoints.down('sm')]: {
			marginLeft: 0,
		},
	},
	inputFieldStyle: {
		// boxShadow: '0.4px 0.4px 0.4px 0.4px grey',
		// borderRadius: 5,
		[theme.breakpoints.up('md')]: {
			width: 270,
		},
		[theme.breakpoints.down('sm')]: {
			width: 200,
		},
	},
	inputFieldStyle1: {
		[theme.breakpoints.up('md')]: {
			width: 270,
		},
		[theme.breakpoints.down('sm')]: {
			width: 200,
		},
	},
	inputFieldStyle2: {
		// boxShadow: '0.4px 0.4px 0.4px 0.4px grey',
		// borderRadius: 5,
		[theme.breakpoints.up('md')]: {
			width: 250,
		},
		[theme.breakpoints.down('sm')]: {
			width: 200,
		},
	},
	inputFieldStyle3: {
		[theme.breakpoints.up('md')]: {
			width: 250,
			marginLeft: 70,
		},
		[theme.breakpoints.down('sm')]: {
			width: 200,
		},
	},
	inputFieldStyle4: {
		[theme.breakpoints.up('md')]: {
			width: 250,
			marginLeft: 140,
		},
		[theme.breakpoints.down('sm')]: {
			width: 200,
		},
	},
	inputFieldStyle5: {
		[theme.breakpoints.up('md')]: {
			width: 250,
			marginLeft: 210,
		},
		[theme.breakpoints.down('sm')]: {
			width: 200,
		},
	},
	itemHeading: {
		marginTop: 7,
	},
	select: {
		'&:before': {
			borderColor: 'red',
		},
		'&:hover:not(.Mui-disabled):before': {
			borderColor: 'red',
		},
		[theme.breakpoints.up('md')]: {
			width: 400,
		},
		[theme.breakpoints.down('sm')]: {
			width: 200,
		},
	},
	delete: {
		color: 'red',
		fontSize: 38,
		[theme.breakpoints.up('md')]: {
			marginLeft: 50,
			marginTop: -7,
		},
		[theme.breakpoints.down('sm')]: {
			marginTop: -10,
		},
	},
	deleteRowBtn: {
		'&:hover': {
			border: 'none',
			background: 'none',
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

const StockAssessReport = () => {
	const classes = useStyles();

	return (
		<Sidenav title={'Stock Assessment Report'}>
			<div>
				<Container className={classes.mainContainer}>
					<Grid container spacing={1} style={{ marginTop: 15 }}>
						<Grid item lg={3} md={3} sm={12} xs={12}>
							<CssTextField
								id='outlined-basic'
								label='Select Item'
								variant='outlined'
								type='text'
								size='small'
								select
								required
								className={classes.inputFieldStyle}
								inputProps={{ style: { fontSize: 14 } }}
								InputLabelProps={{ style: { fontSize: 14 } }}>
								<MenuItem value=''>
									<em>None</em>
								</MenuItem>
								<MenuItem value={10}>Screw</MenuItem>
								<MenuItem value={20}>Cement</MenuItem>
							</CssTextField>
						</Grid>
						<Grid item lg={3} md={3} sm={12} xs={12}>
							<CssTextField
								id='outlined-basic'
								label='Quantity Examined'
								variant='outlined'
								type='text'
								size='small'
								required
								className={classes.inputFieldStyle}
								inputProps={{ style: { fontSize: 14 } }}
								InputLabelProps={{ style: { fontSize: 14 } }}
							/>
						</Grid>
						<Grid item lg={3} md={3} sm={12} xs={12}>
							<CssTextField
								id='outlined-basic'
								label='Item Retained'
								variant='outlined'
								type='text'
								size='small'
								required
								className={classes.inputFieldStyle}
								inputProps={{ style: { fontSize: 14 } }}
								InputLabelProps={{ style: { fontSize: 14 } }}
							/>
						</Grid>
						<Grid item lg={3} md={3} sm={12} xs={12}>
							<CssTextField
								id='outlined-basic'
								label='Ok/Rejection'
								variant='outlined'
								type='text'
								size='small'
								select
								required
								className={classes.inputFieldStyle}
								inputProps={{ style: { fontSize: 14 } }}
								InputLabelProps={{ style: { fontSize: 14 } }}>
								<MenuItem value=''>
									<em>None</em>
								</MenuItem>
								<MenuItem value={10}>Ok</MenuItem>
								<MenuItem value={20}>Rejection</MenuItem>
							</CssTextField>
						</Grid>
					</Grid>
				</Container>
				<Container className={classes.mainContainer}>
					<Grid container spacing={1} style={{ marginTop: 15 }}>
						<Grid item lg={3} md={3} sm={12} xs={12}>
							<CssTextField
								id='outlined-basic'
								label='Reason For Rejection'
								variant='outlined'
								type='text'
								size='small'
								className={classes.inputFieldStyle}
								inputProps={{ style: { fontSize: 14 } }}
								InputLabelProps={{ style: { fontSize: 14 } }}
							/>
						</Grid>
						<Grid item lg={3} md={3} sm={12} xs={12}>
							<CssTextField
								id='outlined-basic'
								label='Remarks'
								variant='outlined'
								type='text'
								size='small'
								className={classes.inputFieldStyle}
								inputProps={{ style: { fontSize: 14 } }}
								InputLabelProps={{ style: { fontSize: 14 } }}
							/>
						</Grid>
					</Grid>
					<div>
						<Button variant='outlined' color='primary' className={classes.addButton}>
							Go
						</Button>
					</div>
				</Container>
				{/* <div style={{ marginTop: 30, marginBottom: 30, }}>
                    <hr />
                </div> */}
				<div className={classes.dataTable}>
					<TableContainer className={classes.tableContainer}>
						<Table
							stickyHeader
							className='table table-dark'
							style={{ backgroundColor: '#d0cfcf', border: '1px solid grey' }}>
							<TableHead>
								<TableRow hover role='checkbox'>
									<StyledTableCell align='center'>Sr.No</StyledTableCell>
									<StyledTableCell align='center'>Item</StyledTableCell>
									<StyledTableCell align='center'>Quantity Examined</StyledTableCell>
									<StyledTableCell align='center'>
										Item Retains Its Properties
									</StyledTableCell>
									<StyledTableCell align='center'>OK for Further Use</StyledTableCell>
									<StyledTableCell align='center'>
										Rejected/To Be Discarded
									</StyledTableCell>
									<StyledTableCell align='center'>Reason For Rejection</StyledTableCell>
									<StyledTableCell align='center'>Remarks</StyledTableCell>
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
										230
									</StyledTableCell>
									<StyledTableCell className='text-dark' align='center'>
										34
									</StyledTableCell>
									<StyledTableCell className='text-dark' align='center'>
										OK
									</StyledTableCell>
									<StyledTableCell className='text-dark' align='center'>
										OK
									</StyledTableCell>
									<StyledTableCell className='text-dark' align='center'>
										Not Good
									</StyledTableCell>
									<StyledTableCell className='text-dark' align='center'>
										Good
									</StyledTableCell>
								</StyledTableRow>
								<StyledTableRow>
									<StyledTableCell className='text-dark' align='center'>
										2.
									</StyledTableCell>
									<StyledTableCell className='text-dark' align='center'>
										Screw
									</StyledTableCell>
									<StyledTableCell className='text-dark' align='center'>
										230
									</StyledTableCell>
									<StyledTableCell className='text-dark' align='center'>
										34
									</StyledTableCell>
									<StyledTableCell className='text-dark' align='center'>
										OK
									</StyledTableCell>
									<StyledTableCell className='text-dark' align='center'>
										OK
									</StyledTableCell>
									<StyledTableCell className='text-dark' align='center'>
										Not Good
									</StyledTableCell>
									<StyledTableCell className='text-dark' align='center'>
										Good
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

export default StockAssessReport;
