import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router';

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

const PrintEmpCompEval = ({ location }) => {
	const classes = useStyles();
	// const id = props.match.params.id
	// const criteria = location.state.criteria;

	// const date = new Date();
	// const currDate = date.getDate();
	// const months = date.getMonth() + 1;
	// const years = date.getFullYear();
	// const fullDate = `${currDate} / ${months} / ${years}`;

	return (
		<div>
			<div className="text-center">
				<div className="container">
					<img src="./logo.png" alt="" />
					{/* <h4>Hi-Tech Pipe & Engineering Industries</h4>
					<h6>Plot No X-22, Site Area Kotri</h6>
					<p>Ph-No 022-3870614-5, Fax: 022-3870606</p> */}
					<div class="row">
						<div
							class="col-lg-3 col-md-3 col-4"
							style={{ textAlign: 'left' }}
						>
							<img
								src="/images/nameLogo.png"
								width="90%"
								height="80%"
								alt=""
							/>
						</div>
						<div class="offset-lg-7 offset-md-7 offset-7 col-lg-2 col-md-2 col-1">
							<div
								style={{
									display: 'flex',
									// alignItems: 'flex-end',
									flexDirection: 'column',
									border: '2px solid #333',
									width: '100px',
									// marginLeft: 'auto',
									// paddingRight: '5px',
									// marginRight: '-3rem'
								}}
							>
								<h6>FM-97</h6>
								<h6>Issue.01</h6>
							</div>
						</div>
					</div>
					<h5
						className="mt-4"
						style={{ textDecoration: 'underline', fontWeight: 'bold' }}
					>
						EMPLOYEE'S COMPETENCY EVALUATION
					</h5>
				</div>
				<div className="container-fluid">
					<Grid container spacing={1}>
						<Grid item lg={10} md={10} sm={10} xs={10}></Grid>
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
				<div class="row mt-5">
					<div
						class="col-2"
						style={{ fontWeight: 'bold', textAlign: 'left' }}
					>
						<p>Name: </p>
					</div>
					<div class="col-3">
						<p>{}</p>
					</div>
					<div
						class="offset-1 col-2"
						style={{ fontWeight: 'bold', textAlign: 'left' }}
					>
						<p>Designation: </p>
					</div>
					<div class="col-3">
						<p>{}</p>
					</div>
				</div>
				<div class="row">
					<div
						class="col-2"
						style={{ fontWeight: 'bold', textAlign: 'left' }}
					>
						<p>Department: </p>
					</div>
					<div class="col-3">
						<p>{}</p>
					</div>
					<div
						class="offset-1 col-2"
						style={{ fontWeight: 'bold', textAlign: 'left' }}
					>
						<p>CNIC No: </p>
					</div>
					<div class="col-3">
						<p>{}</p>
					</div>
				</div>
				<div className="mt-4">
					<div className="" style={{ marginTop: 30, marginLeft: 'auto' }}>
						<h5
							style={{ textAlign: 'left', textDecoration: 'underline' }}
						>
							Evaluation:
						</h5>
						<table class="table table-responsive table-bordered border-dark text-center mt-3">
							<tbody>
								<tr>
									<th scope="col" colspan="2">
										COMPETENCY REQUIREMENTS
									</th>
									<th rowspan="2">Actual Compatibility</th>
									<th rowspan="2">Remarks</th>
								</tr>
								<tr style={{ fontWeight: 'bold' }}>
									<td style={{ textAlign: 'left' }}>Parameter</td>
									<td>Minimum Required</td>
								</tr>
								{/* {criteria?.educations && (
									<> */}
								<tr>
									<td
										style={{ fontWeight: 'bold', textAlign: 'left' }}
									>
										Educations
									</td>
									<td>
										{/* {criteria?.educations?.names?.map((el, i) => (
													<p style={{ margin: 0, padding: 0 }}>{el}</p>
												))} */}
									</td>
									<td>{/* {criteria?.educations?.capability} */}</td>
									<td>{/* {criteria?.educations?.remarks} */}</td>
								</tr>
								{/* </>
								)} */}
								{/* {criteria?.skills && (
									<> */}
								<tr>
									<td
										style={{ fontWeight: 'bold', textAlign: 'left' }}
									>
										Skills
									</td>
									<td>
										{/* {criteria?.skills?.names?.map((el, i) => (
													<p style={{ margin: 0, padding: 0 }}>{el}</p>
												))} */}
									</td>
									<td>{/* {criteria?.skills?.capability} */}</td>
									<td>{/* {criteria?.skills?.remarks} */}</td>
								</tr>
								{/* </>
								)} */}
								{/* {criteria?.experiences && (
									<> */}
								<tr>
									<td
										style={{ fontWeight: 'bold', textAlign: 'left' }}
									>
										Experience
									</td>
									<td>
										{/* {criteria?.experiences?.names?.map((el, i) => (
													<p style={{ margin: 0, padding: 0 }}>{el}</p>
												))} */}
									</td>
									<td>{/* {criteria?.experiences?.capability} */}</td>
									<td>{/* {criteria?.experiences?.remarks} */}</td>
								</tr>
								<tr>
									<td
										style={{ fontWeight: 'bold', textAlign: 'left' }}
									>
										Training
									</td>
									<td>
										{/* {criteria?.experiences?.names?.map((el, i) => (
													<p style={{ margin: 0, padding: 0 }}>{el}</p>
												))} */}
									</td>
									<td>{/* {criteria?.experiences?.capability} */}</td>
									<td>{/* {criteria?.experiences?.remarks} */}</td>
								</tr>
								{/* </>
								)} */}
							</tbody>
						</table>
						<div style={{ display: 'flex' }}>
							<h6 style={{ fontWeight: 'bold' }}>
								Evaluation Summary:{' '}
							</h6>
							<p
								style={{
									textDecoration: 'underline',
									marginLeft: '1rem',
									marginTop: '-2px',
								}}
							>
								{}
							</p>
						</div>
						<div style={{ marginTop: 30, marginBottom: 30 }}>
							<hr style={{ borderTop: '1px double black' }} />
							{/* <hr /> */}
						</div>
						<div
							style={{
								textAlign: 'left',
								fontWeight: 'bold',
								marginTop: '70px',
								textDecoration: 'underline',
							}}
						>
							<h6>Evaluated By:</h6>
						</div>
						<Grid container spacing={1} style={{ marginTop: '60px' }}>
							<Grid item lg={3} md={3} sm={3} xs={3}>
								<hr style={{ borderTop: '3px double black' }} />
								<p
									style={{
										marginTop: -10,
										fontSize: 12,
										fontWeight: 'bold',
									}}
								>
									Manager
								</p>
								<p
									style={{
										marginTop: -10,
										fontSize: 12,
										fontWeight: 'bold',
									}}
								>
									(Admin)
								</p>
							</Grid>
							<Grid item lg={1} md={1} sm={1} xs={1}></Grid>
							<Grid item lg={3} md={3} sm={3} xs={3}>
								<hr style={{ borderTop: '3px double black' }} />
								<p
									style={{
										marginTop: -10,
										fontSize: 12,
										fontWeight: 'bold',
									}}
								>
									Department
								</p>
								<p
									style={{
										marginTop: -10,
										fontSize: 12,
										fontWeight: 'bold',
									}}
								>
									In-charge
								</p>
							</Grid>
						</Grid>
						<Grid container spacing={1} style={{ marginTop: '50px' }}>
							<Grid item lg={3} md={3} sm={3} xs={3}>
								<hr style={{ borderTop: '3px double black' }} />
								<p
									style={{
										marginTop: -10,
										fontSize: 12,
										fontWeight: 'bold',
									}}
								>
									Cheif Executive Officer
								</p>
							</Grid>
						</Grid>
					</div>
				</div>
			</div>
		</div>
	);
};

export default withRouter(PrintEmpCompEval);
