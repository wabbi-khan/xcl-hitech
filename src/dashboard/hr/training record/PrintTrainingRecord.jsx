import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';

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
	mainContainer1: {
		textAlign: 'left',
		[theme.breakpoints.up('md')]: {
			marginLeft: 0,
			marginTop: 15,
		},
		[theme.breakpoints.down('sm')]: {
			marginTop: -15,
		},
	},
	addButton: {
		marginTop: 20,
		color: '#22A19A',
		borderColor: '#22A19A',
		fontWeight: 'bold',
		'&:hover': {
			border: 'none',
			backgroundColor: '#22A19A',
			color: 'whitesmoke',
		},
		[theme.breakpoints.up('md')]: {
			width: '15%',
		},
		[theme.breakpoints.down('sm')]: {
			width: '30%',
		},
	},
	table1: {
		// minWidth: 600,
		backgroundColor: 'red',
		marginTop: 60,
	},
	dataTable: {
		marginTop: 40,
	},
}));

const PrintTrainingRecord = ({ location }) => {
	const classes = useStyles();
	// const id = props.match.params.id
	const { evaluation } = location.state;
	console.log(evaluation);

	const date = new Date();
	const currDate = date.getDate();
	const months = date.getMonth() + 1;
	const years = date.getFullYear();
	const fullDate = `${currDate} / ${months} / ${years}`;

	return (
		<div>
			<div className='text-center'>
				<div className='container'>
					<img src='./logo.png' alt='' />
					<h4>Hi-Tech Pipe & Engineering Industries</h4>
					<h6>Plot No X-22, Site Area Kotri</h6>
					<p>Ph-No 022-3870614-5, Fax: 022-3870606</p>
					<h5
						className='mt-4'
						style={{ textDecoration: 'underline', fontWeight: 'bold' }}>
						Training Record and Evaluation
					</h5>
				</div>
				<div
					className='container-fluid'
					style={{ textAlign: 'left', marginTop: 70 }}>
					<Grid container spacing={1}>
						<Grid item lg={2} md={2} sm={2} xs={2}>
							<div className='col-lg-6 col-md-6 col-sm-6'>
								<p style={{ fontWeight: 'bold', marginLeft: '12px' }}>Date:</p>
							</div>
						</Grid>
						<Grid item lg={2} md={2} sm={2} xs={2}>
							<p>
								{fullDate}
								<hr style={{ borderTop: '3px double black' }} />
							</p>
						</Grid>
						<Grid item lg={6} md={6} sm={6} xs={6}></Grid>
						<Grid item lg={2} md={2} sm={2} xs={2} id='printBtn'>
							<Button
								variant='contained'
								size='small'
								className='bg-dark text-light'
								onClick={() => window.print()}>
								Print
							</Button>
						</Grid>
					</Grid>
				</div>
				<div className='mt-4'>
					<div className='' style={{ marginTop: 30, marginLeft: 'auto' }}>
						<table class='table table-striped table-inverse table-bordered table-responsive table-hover'>
							<thead class='thead-inverse'>
								<tr>
									<th>S.No.</th>
									<th>Training</th>
									<th>Evaluated By</th>
									<th>Method</th>
									<th>Result</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td scope='row'>1</td>
									<td>{evaluation?.training?.topic?.name}</td>
									<td>
										{evaluation?.evaluatedByEmployee?.name}
										<p style={{ fontSize: 10 }}>({evaluation?.evaluatedBy?.name})</p>
									</td>
									<td>{evaluation.method}</td>
									<td>{evaluation.result}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				{/* <Grid container spacing={1} style={{ marginTop: 120 }} >
                    <Grid item lg={3} md={3} sm={3} xs={3}>
                        <hr style={{ borderTop: '3px double black' }} />
                        <p style={{ marginTop: -10, fontSize: 12, fontWeight: 'bold' }}>Prepared By:</p>
                        <p style={{ marginTop: -10, fontSize: 12, fontWeight: 'bold' }}>Admin Department</p>
                    </Grid>
                    <Grid item lg={1} md={1} sm={1} xs={1}></Grid>
                    <Grid item lg={3} md={3} sm={3} xs={3}>
                        <hr style={{ borderTop: '3px double black' }} />
                        <p style={{ marginTop: -10, fontSize: 12, fontWeight: 'bold' }}>Reviewed By:</p>
                        <p style={{ marginTop: -10, fontSize: 12, fontWeight: 'bold' }}>Management Representative</p>
                    </Grid>
                    <Grid item lg={1} md={1} sm={1} xs={1}></Grid>
                    <Grid item lg={3} md={3} sm={3} xs={3}>
                        <hr style={{ borderTop: '3px double black' }} />
                        <p style={{ marginTop: -10, fontSize: 12, fontWeight: 'bold' }}>Approved By:</p>
                        <p style={{ marginTop: -10, fontSize: 12, fontWeight: 'bold' }}>CEO / Executive Director</p>
                    </Grid>
                </Grid> */}
			</div>
		</div>
	);
};

export default PrintTrainingRecord;
