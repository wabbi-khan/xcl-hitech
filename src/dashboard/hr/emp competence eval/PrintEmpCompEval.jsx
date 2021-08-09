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
	const criteria = location.state.criteria;
	console.log(criteria);

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
						Employee's Competency Evaluation
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
						<table class='table table-responsive table-bordered border-dark text-center mt-3'>
							<tbody>
								<tr>
									<th scope='col' colspan='2'>
										Competency Requirements
									</th>
									<th rowspan='2'>Actual Compatibility</th>
									<th rowspan='2'>Remarks</th>
								</tr>
								<tr style={{ fontWeight: 'bold' }}>
									<td>Parameter</td>
									<td>Minimum Required</td>
								</tr>
								{criteria?.educations && (
									<>
										<tr>
											<td style={{ fontWeight: 'bold' }}>Educations</td>
											<td>
												{criteria?.educations?.names?.map((el, i) => (
													<p style={{ margin: 0, padding: 0 }}>{el}</p>
												))}
											</td>
											<td>{criteria?.educations?.capability}</td>
											<td>{criteria?.educations?.remarks}</td>
										</tr>
										<tr>
											<td style={{ fontWeight: 'bold' }}>Evaluation Summary:</td>
											<td colspan='3' style={{ textAlign: 'left', fontWeight: 'bold' }}>
												{criteria?.educations?.summary}
											</td>
										</tr>
									</>
								)}
								{criteria?.skills && (
									<>
										<tr>
											<td style={{ fontWeight: 'bold' }}>Skills</td>
											<td>
												{criteria?.skills?.names?.map((el, i) => (
													<p style={{ margin: 0, padding: 0 }}>{el}</p>
												))}
											</td>
											<td>{criteria?.skills?.capability}</td>
											<td>{criteria?.skills?.remarks}</td>
										</tr>
										<tr>
											<td style={{ fontWeight: 'bold' }}>Evaluation Summary:</td>
											<td colspan='3' style={{ textAlign: 'left', fontWeight: 'bold' }}>
												{criteria?.skills?.summary}
											</td>
										</tr>
									</>
								)}
								{criteria?.experiences && (
									<>
										<tr>
											<td style={{ fontWeight: 'bold' }}>Skills</td>
											<td>
												{criteria?.experiences?.names?.map((el, i) => (
													<p style={{ margin: 0, padding: 0 }}>{el}</p>
												))}
											</td>
											<td>{criteria?.experiences?.capability}</td>
											<td>{criteria?.experiences?.remarks}</td>
										</tr>
										<tr>
											<td style={{ fontWeight: 'bold' }}>Evaluation Summary:</td>
											<td colspan='3' style={{ textAlign: 'left', fontWeight: 'bold' }}>
												{criteria?.experiences?.summary}
											</td>
										</tr>
									</>
								)}
							</tbody>
						</table>
						<div
							style={{
								textAlign: 'left',
								fontWeight: 'bold',
								marginTop: '70px',
								textDecoration: 'underline',
							}}>
							<h6>Evaluated By:</h6>
						</div>
						<Grid container spacing={1} style={{ marginTop: '60px' }}>
							<Grid item lg={3} md={3} sm={3} xs={3}>
								<hr style={{ borderTop: '3px double black' }} />
								<p style={{ marginTop: -10, fontSize: 12, fontWeight: 'bold' }}>
									Manager
								</p>
								<p style={{ marginTop: -10, fontSize: 12, fontWeight: 'bold' }}>
									(Admin)
								</p>
							</Grid>
							<Grid item lg={1} md={1} sm={1} xs={1}></Grid>
							<Grid item lg={3} md={3} sm={3} xs={3}>
								<hr style={{ borderTop: '3px double black' }} />
								<p style={{ marginTop: -10, fontSize: 12, fontWeight: 'bold' }}>
									Department
								</p>
								<p style={{ marginTop: -10, fontSize: 12, fontWeight: 'bold' }}>
									In-charge
								</p>
							</Grid>
						</Grid>
						<div style={{ marginTop: 30, marginBottom: 30 }}>
							<hr style={{ borderTop: '1px double black' }} />
							{/* <hr /> */}
						</div>
						<Grid container spacing={1} style={{ marginTop: '50px' }}>
							<Grid item lg={3} md={3} sm={3} xs={3}>
								<hr style={{ borderTop: '3px double black' }} />
								<p style={{ marginTop: -10, fontSize: 12, fontWeight: 'bold' }}>
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
