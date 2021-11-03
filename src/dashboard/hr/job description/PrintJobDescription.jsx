import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import CheckIcon from '@material-ui/icons/Check';
import { withRouter } from 'react-router';
import { capitalize } from '../../../utils/capitalize';

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
	table: {
		marginLeft: 15,
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

const PrintJobDescription = ({ location }) => {
	const classes = useStyles();
	const description = location?.state?.description;

	const date = new Date();
	const currDate = date.getDate();
	const months = date.getMonth() + 1;
	const years = date.getFullYear();
	const fullDate = `${currDate} / ${months} / ${years}`;

	return (
		<div className="text-center">
			<div className="container">
				<img src="./logo.png" alt="" />
				{/* <h4>Hi-Tech Pipe & Engineering Industries</h4>
				<h6>Plot No X-22, Site Area Kotri</h6>
				<p>Ph-No 022-3870614-5, Fax: 022-3870606</p> */}
				<div class="row">
					<div
						class="col-lg-2 col-md-2 col-sm-4"
						style={{ textAlign: 'left' }}
					>
						<img
							src="/images/nameLogo.png"
							width="90%"
							height="80%"
							alt=""
						/>
					</div>
					<div class="offset-lg-7 offset-md-7 offset-sm-7 col-lg-2 col-md-2 col-sm-1">
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
							<h6>FM-56</h6>
							<h6>Issue.01</h6>
						</div>
					</div>
				</div>
				<h5
					className="mt-4"
					style={{
						textDecoration: 'underline',
						fontWeight: 'bold',
						marginBottom: 40,
					}}
				>
					JOB DESCRIPTION
				</h5>
			</div>
			<div className="container-fluid">
				<Grid
					container
					spacing={1}
					style={{ marginTop: 15, textAlign: 'left' }}
				>
					{/* <Grid item lg={4} md={4} sm={4} xs={4}>
						<Grid container spacing={1}>
							<Grid item lg={6} md={6} sm={6} xs={6}>
								<p style={{ fontWeight: 'bold', marginLeft: '10px' }}>Date:</p>
							</Grid>
							<Grid item lg={6} md={6} sm={6} xs={6}>
								<p>
									{fullDate}
									<hr style={{ borderTop: '3px double black' }} />
								</p>
							</Grid>
						</Grid>
					</Grid> */}
					<Grid item lg={10} md={10} sm={10} xs={10}></Grid>
					<Grid item lg={2} md={2} sm={2} xs={2}>
						<Button
							variant="contained"
							size="small"
							id="printBtn"
							className="bg-dark text-light"
							onClick={() => window.print()}
						>
							Print
						</Button>
					</Grid>
				</Grid>
			</div>
			<div className={classes.table}>
				<div className="table ml-auto mr-auto mt-4">
					<Grid
						container
						spacing={1}
						style={{ marginTop: 15, textAlign: 'left' }}
					>
						<Grid item lg={2} md={2} sm={2} xs={2}>
							<p style={{ fontWeight: 'bold' }}>Name:</p>
						</Grid>
						<Grid item lg={2} md={2} sm={2} xs={2}>
							<p style={{ textDecoration: 'underline' }}>
								{description?.employee?.name}
							</p>
							{/* <hr style={{ borderTop: '1px double black', marginTop: '-20px' }} /> */}
						</Grid>
						<Grid item lg={1} md={1} sm={1} xs={1}></Grid>
						<Grid item lg={2} md={2} sm={3} xs={3}>
							<p style={{ fontWeight: 'bold' }}>Designation:</p>
						</Grid>
						<Grid item lg={2} md={2} sm={3} xs={3}>
							<p style={{ textDecoration: 'underline' }}>
								{description?.employee?.finalDesignation?.name}
							</p>
							{/* <hr style={{ borderTop: '1px double black', marginTop: '-20px' }} /> */}
						</Grid>
					</Grid>
					<Grid
						container
						spacing={1}
						style={{ marginTop: 15, textAlign: 'left' }}
					>
						<Grid item lg={2} md={2} sm={2} xs={2}>
							<p style={{ fontWeight: 'bold' }}>Department:</p>
						</Grid>
						<Grid item lg={2} md={2} sm={2} xs={2}>
							<p style={{ textDecoration: 'underline' }}>
								{description?.employee?.finalDepartment?.name}
							</p>
							{/* <hr style={{ borderTop: '1px double black', marginTop: '-20px' }} /> */}
						</Grid>
						<Grid item lg={1} md={1} sm={1} xs={1}></Grid>
						<Grid item lg={2} md={2} sm={3} xs={3}>
							<p style={{ fontWeight: 'bold' }}>Reports To:</p>
						</Grid>
						<Grid item lg={3} md={3} sm={3} xs={3}>
							<p style={{ textDecoration: 'underline' }}>
								{description?.reportTo?.name}
							</p>
							{/* <hr style={{ borderTop: '1px double black', marginTop: '-20px' }} /> */}
						</Grid>
					</Grid>
					<Grid
						container
						spacing={1}
						style={{ marginTop: 15, textAlign: 'left' }}
					>
						<Grid item lg={2} md={2} sm={2} xs={2}>
							<p style={{ fontWeight: 'bold' }}>Interaction With:</p>
						</Grid>
						<Grid item lg={2} md={2} sm={2} xs={2}>
							<p style={{ textDecoration: 'underline' }}>
								{description?.interactionWith?.name}
							</p>
							{/* <hr style={{ borderTop: '1px double black', marginTop: '-20px' }} /> */}
						</Grid>
					</Grid>
					{/* <thead class="thead-dark">
                    <tr>
                    <th>S.No.</th>
                    <td colspan="5">
                    <th>DESCRIPTION</th>
                    </td>
                    <th>Quantity</th>
                    <th>Unit Value</th>
                    <th>Remarks</th>
                    </tr>
                </thead> */}
				</div>
				<div className={classes.mainContainer1}>
					<h5 align="left" style={{ marginTop: 60, fontWeight: 'bold' }}>
						Responsibilities:
					</h5>
					{description?.responsibilities?.map((el) => (
						<li style={{ width: '75%', marginTop: 15 }}>{el?.name}</li>
					))}
				</div>
				<div className={classes.mainContainer1}>
					<h5 align="left" style={{ marginTop: 60, fontWeight: 'bold' }}>
						Authorities:
					</h5>
					{description?.authorities?.map((el) => (
						<li style={{ width: '75%', marginTop: 15 }}>{el?.name}</li>
					))}
				</div>
			</div>
			<Grid container spacing={1} style={{ marginTop: 220 }}>
				<Grid item lg={3} md={3} sm={3} xs={3} style={{ marginLeft: 40 }}>
					<hr style={{ borderTop: '3px double black' }} />
					<p style={{ marginTop: -10, fontSize: 14, fontWeight: 'bold' }}>
						Written & Signed By: <br />
						Factory Manager
					</p>
				</Grid>
				<Grid item lg={1} md={1} sm={1} xs={1}></Grid>
				<Grid item lg={3} md={3} sm={3} xs={3}>
					<hr style={{ borderTop: '3px double black' }} />
					<p style={{ marginTop: -10, fontSize: 14, fontWeight: 'bold' }}>
						Approved & Signed By: <br />
						CEO
					</p>
				</Grid>
				<Grid item lg={1} md={1} sm={1} xs={1}></Grid>
				<Grid item lg={3} md={3} sm={3} xs={3}>
					<hr style={{ borderTop: '3px double black' }} />
					<p style={{ marginTop: -10, fontSize: 14, fontWeight: 'bold' }}>
						Copy To: 1. Employee, <br /> 2. Personal File
					</p>
				</Grid>
			</Grid>
			<div className="container">
				<div className="row">
					<div className="col-lg-3 col-md-3 col-sm-3 mt-5"></div>
					<div className="offset-lg-1 offset-md-1 offset-sm-1 col-lg-3 col-md-3 col-sm-3 mt-5"></div>
					<div className="offset-lg-1 offset-md-1 offset-sm-1 col-lg-3 col-md-3 col-sm-3 mt-5"></div>
				</div>
			</div>
		</div>
	);
};

export default withRouter(PrintJobDescription);
