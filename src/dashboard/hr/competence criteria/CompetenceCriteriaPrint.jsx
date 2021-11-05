import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router';

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

function createData(No, name, Action) {
	return { No, name, Action };
}

const rows = [createData(1, 'Item1')];

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: '25ch',
		},
	},
	mainContainer: {
		textAlign: 'center',
	},
	table: {
		marginBottom: 300,
	},
}));

const CompetenceCriteriaPrint = ({ location }) => {
	const classes = useStyles();

	const designation = location?.state?.designation;

	const date = new Date();
	const currDate = date.getDate();
	const months = date.getMonth() + 1;
	const years = date.getFullYear();
	const fullDate = `${currDate} / ${months} / ${years}`;

	return (
		<div className="text-center">
			<div className="container">
				<img src="./logo.png" alt="" />
				<h4>Hi-Tech Pipe & Engineering Industries</h4>
				<h6>Plot No X-22, Site Area Kotri</h6>
				<p>Ph-No 022-3870614-5, Fax: 022-3870606</p>
				<h5 className="mt-4" style={{ textDecorationLine: 'underline' }}>
					DESIGNATION
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
								Date:
							</p>
						</div>
					</Grid>
					<Grid item lg={2} md={2} sm={2} xs={2}>
						<p>
							{fullDate}
							<hr style={{ borderTop: '3px double black' }} />
						</p>
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
			<div className="mt-4">
				<div className="" style={{ marginTop: 30, marginLeft: 'auto' }}>
					<table class="table table-striped table-inverse table-bordered table-responsive table-hover">
						<thead class="thead-inverse">
							<tr>
								<th rowspan="2">Designation</th>
								<th colspan="4">CRITERIAS</th>
							</tr>
							<tr
								style={{
									backgroundColor: 'black',
									color: 'whitesmoke',
								}}
							>
								<th>Education</th>
								<th>Experience</th>
								<th>Skills</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>{designation?.name}</td>
								<td>
									{designation?.educations?.map((el, i) => (
										<span>
											{el?.name}{' '}
											{designation?.educations?.length - 1 !== i &&
												' / '}
										</span>
									))}
								</td>
								<td>
									{designation?.experiences?.map((el, i) => (
										<span>
											{el?.name}
											{designation?.experiences?.length - 1 !== i &&
												' / '}
										</span>
									))}
								</td>
								<td>
									{designation?.skills?.map((el, i) => (
										<span>
											{el?.skill}
											{designation?.skills?.length - 1 !== i &&
												' / '}
										</span>
									))}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<Grid container spacing={1} style={{ marginTop: 120 }}>
				<Grid item lg={3} md={3} sm={3} xs={3}>
					<hr style={{ borderTop: '3px double black' }} />
					<p style={{ marginTop: -10, fontSize: 12, fontWeight: 'bold' }}>
						Prepared By:
					</p>
					<p style={{ marginTop: -10, fontSize: 12, fontWeight: 'bold' }}>
						Admin In-Charge
					</p>
				</Grid>
				<Grid item lg={1} md={1} sm={1} xs={1}></Grid>
				<Grid item lg={3} md={3} sm={3} xs={3}>
					<hr style={{ borderTop: '3px double black' }} />
					<p style={{ marginTop: -10, fontSize: 12, fontWeight: 'bold' }}>
						Reviewed By:
					</p>
					<p style={{ marginTop: -10, fontSize: 12, fontWeight: 'bold' }}>
						Management Representative
					</p>
				</Grid>
				<Grid item lg={1} md={1} sm={1} xs={1}></Grid>
				<Grid item lg={3} md={3} sm={3} xs={3}>
					<hr style={{ borderTop: '3px double black' }} />
					<p style={{ marginTop: -10, fontSize: 12, fontWeight: 'bold' }}>
						Approved By:
					</p>
					<p style={{ marginTop: -10, fontSize: 12, fontWeight: 'bold' }}>
						CEO
					</p>
				</Grid>
			</Grid>
		</div>
	);
};

export default withRouter(CompetenceCriteriaPrint);
