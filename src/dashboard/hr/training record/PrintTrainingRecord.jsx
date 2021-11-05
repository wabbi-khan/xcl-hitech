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

	const date = new Date();
	const currDate = date.getDate();
	const months = date.getMonth() + 1;
	const years = date.getFullYear();
	const fullDate = `${currDate} / ${months} / ${years}`;

	console.log(evaluation);
	return (
		<div>
			<div className="text-center">
				<div className="container-fluid">
					<img src="./logo.png" alt="" />
					{/* <h4>Hi-Tech Pipe & Engineering Industries</h4>
					<h6>Plot No X-22, Site Area Kotri</h6>
					<p>Ph-No 022-3870614-5, Fax: 022-3870606</p> */}
					<div class="row">
						<div class="col-lg-3 col-md-3 col-sm-4">
							<img
								src="/images/nameLogo.png"
								width="90%"
								height="80%"
								alt=""
							/>
						</div>
						<div class="offset-lg-7 offset-md-7 offset-sm-6 col-lg-2 col-md-2 col-sm-2">
							<div
								style={{
									display: 'flex',
									// alignItems: 'flex-end',
									flexDirection: 'column',
									border: '2px solid #333',
									width: '100px',
									marginTop: '1rem',
									// marginLeft: 'auto',
									// paddingRight: '5px',
									// marginRight: '-3rem'
								}}
							>
								<h6>FM-39</h6>
								<h6>Issue.01</h6>
							</div>
						</div>
					</div>
					<h5
						className="mt-4"
						style={{ textDecoration: 'underline', fontWeight: 'bold' }}
					>
						TRAINING RECORD AND EVALUATION
					</h5>
				</div>
				<div
					className="container-fluid"
					style={{ textAlign: 'left', marginTop: 70 }}
				>
					<Grid container spacing={1}>
						<Grid item lg={2} md={2} sm={2} xs={2}>
							<div className="col-lg-6 col-md-6 col-sm-6">
								<p style={{ fontWeight: 'bold', marginLeft: '12px' }}>
									Training Date:
								</p>
							</div>
						</Grid>
						<Grid item lg={2} md={2} sm={2} xs={2}>
							<p style={{ textDecoration: 'underline' }}>{fullDate}</p>
						</Grid>
						<Grid item lg={6} md={6} sm={6} xs={6}></Grid>
						<Grid item lg={2} md={2} sm={2} xs={2} id="printBtn">
							<Button
								variant="contained"
								size="small"
								className="bg-dark text-light"
								onClick={() => window.print()}
							>
								Print
							</Button>
						</Grid>
					</Grid>
				</div>
				<table class="table table-striped table-inverse table-bordered table-responsive table-hover">
					<tr style={{ textAlign: 'left', border: '1px solid black' }}>
						<div style={{ display: 'flex' }}>
							<h6>TRAINING: </h6>
							<h6>{}Importance of Criteteria</h6>
						</div>
					</tr>
				</table>
				<div>
					<div className="" style={{ marginTop: 30, marginLeft: 'auto' }}>
						<table class="table table-striped table-inverse table-bordered table-responsive table-hover">
							<thead class="thead-inverse">
								<tr>
									<th>TRAINEE NAME</th>
									<th>DESIGNATION</th>
									<th>TRAINER</th>
									<th colspan="2">EVALUATION METHOD</th>
									<th>EVALUATED BY</th>
									<th colspan="2">TRAINING EVALUATION RESULT</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>{evaluation?.training?.trainerName?.name}</td>
									<td>
										{evaluation?.training?.trainerDesignation?.name}
									</td>
									<td>{evaluation?.training?.trainerName?.name}</td>
									<td>Interview</td>
									<td>Written Test</td>
									<td>{evaluation?.evaluatedByEmployee?.name}</td>
									<td>SATISFACTORY</td>
									<td>UNSATISFACTORY</td>
								</tr>
								<tr>
									<td>{}</td>
									<td>{}</td>
									<td>{}</td>
									<td>{evaluation?.method === 'interview' && '✔'}</td>
									<td>{evaluation?.method === 'written' && '✔'}</td>
									<td></td>
									<td>
										{evaluation?.result === 'satisfactory' && '✔'}
									</td>
									<td>
										{evaluation?.result === 'unsatisfactory' && '✔'}
									</td>
									<td></td>
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
