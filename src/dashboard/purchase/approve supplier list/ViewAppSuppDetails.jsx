import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { withRouter } from 'react-router';
import Grid from '@material-ui/core/Grid';

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
	table: {
		minWidth: 600,
	},
	dataTable: {
		marginTop: 40,
	},
	ckeckBox: {
		[theme.breakpoints.up('md')]: {
			marginLeft: 7,
		},
		[theme.breakpoints.down('sm')]: {
			marginLeft: 0,
		},
	},
	inputFieldStyle: {
		// boxShadow: '0.4px 0.4px 0.4px 0.4px grey',
		// borderRadius: 5,
		[theme.breakpoints.up('md')]: {
			width: 250,
		},
		[theme.breakpoints.down('sm')]: {
			width: 200,
		},
	},
}));

const ViewAppSuppDetails = (props) => {
	const vendor = props?.location?.state?.vendor;

	const classes = useStyles();

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
				<h5
					className="mt-5"
					style={{ textDecorationLine: 'underline', fontWeight: 'bold' }}
				>
					Vendor Details
				</h5>
			</div>
			<div className="container mt-5">
				<div class="dateContainer">
					<div class="dateContainer">
						<p style={{ fontWeight: 'bold' }}>Date:</p>
						<div style={{ marginLeft: '1rem' }}>
							<p>
								{fullDate}
								<hr
									style={{
										border: '1px solid green',
										borderColor: 'black',
										width: '100px',
										marginTop: 0,
									}}
								/>
							</p>
						</div>
					</div>
					<div id="printBtn" style={{ marginLeft: 'auto' }}>
						<Button
							variant="contained"
							size="small"
							className="bg-dark text-light"
							onClick={() => window.print()}
						>
							Print
						</Button>
					</div>
				</div>
			</div>
			<div className="" style={{ marginTop: 30, marginLeft: 'auto' }}>
				<table class="table table-bordered border-dark table-responsive table-hover">
					<thead class="thead-inverse">
						<tr>
							<th>S.No.</th>
							<th>Vendor Name</th>
							<th>Contact No.</th>
							<th>Contact Person</th>
							<th>Approving Date</th>
							<th>Rating</th>
							<th>Categories</th>
							<th>Sub Categories</th>
						</tr>
					</thead>
					<tbody>
						{!vendor ? (
							<span>Data Not Found</span>
						) : (
							<tr>
								<td scope="row">1</td>
								<td>{vendor.name}</td>
								<td>{vendor.phone}</td>
								<td>{vendor.contactPerson}</td>
								<td>{vendor.approveDate}</td>
								<td>
									{vendor.sectionB.rating == 3 ? (
										<span>High</span>
									) : vendor.sectionB.rating == 2 ? (
										<span>Medium</span>
									) : vendor.sectionB.rating == 1 ? (
										<span>Low</span>
									) : vendor.sectionB.rating == 0 ? (
										<span>Bad</span>
									) : (
										<span>None of these</span>
									)}
								</td>
								<td>
									{vendor.categories?.map((el) => (
										<p style={{ margin: 0, padding: 0 }}>
											{el?.name}
										</p>
									))}
								</td>
								<td>
									{vendor.subCategories?.map((el) => (
										<p style={{ margin: 0, padding: 0 }}>
											{el?.name}
										</p>
									))}
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			<div className="" style={{ marginTop: 30, marginLeft: 'auto' }}>
				<table class="table table-bordered border-dark table-responsive table-hover">
					<thead class="thead-inverse">
						<tr>
							<th>S.No.</th>
							<th>Material Name</th>
							<th>Unit</th>
						</tr>
					</thead>
					<tbody>
						{!vendor?.materials || !vendor?.materials.length ? (
							<span>Not Found</span>
						) : (
							vendor?.materials.map((mat, i) => (
								<tr key={i}>
									<td scope="row">{i + 1}</td>
									<td>{mat.name}</td>
									<td>{mat?.unit?.name}</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
			<Grid container spacing={1} style={{ marginTop: 120 }}>
				<Grid item lg={3} md={3} sm={3} xs={3}>
					{/* <hr style={{ backgroundColor: 'black', paddingTop: 2 }} /> */}
					<hr
						style={{ border: '1px solid green', borderColor: 'black' }}
					/>
					<p style={{ marginTop: -10, fontSize: 12, fontWeight: 'bold' }}>
						Store Incharge
					</p>
				</Grid>
				<Grid item lg={6} md={6} sm={6} xs={6}></Grid>
				<Grid item lg={3} md={3} sm={3} xs={3}>
					<hr
						style={{ border: '1px solid green', borderColor: 'black' }}
					/>
					<p style={{ marginTop: -10, fontSize: 12, fontWeight: 'bold' }}>
						Q.A Dept
					</p>
				</Grid>
			</Grid>
		</div>
	);
};

export default withRouter(ViewAppSuppDetails);
