import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router';
import moment from 'moment';
import { getNonExtEmpRatAction } from '../../../../../services/action/NonExecRat';
import { useDispatch, useSelector } from 'react-redux';
import CheckIcon from '@material-ui/icons/Check';

import { getNonExtEmpAssesAction } from '../../../../../services/action/NonExecPrereqActions';

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

const PrintNonExecEmpDetails = ({ location }) => {
	const classes = useStyles();
	const [fromTotal, setFromTotal] = React.useState(0);
	const dispatch = useDispatch();

	// const assessment = location.state.assessment;
	// console.log(assessment);

	// const date = new Date();
	// const currDate = date.getDate();
	// const months = date.getMonth() + 1;
	// const years = date.getFullYear();
	// const fullDate = `${currDate} / ${months} / ${years}`;
	// const { nonExecRat } = useSelector((state) => state.nonExecRat);
	// const { nonExecPrereq } = useSelector((state) => state.nonExecPrereq);

	// React.useEffect(() => {
	// 	dispatch(getNonExtEmpRatAction());
	// 	dispatch(getNonExtEmpAssesAction());
	// }, []);

	// React.useEffect(() => {
	// 	let tempTotal = 0;
	// 	assessment?.data?.map((el, i) => {
	// 		el?.list?.map((el) => {
	// 			tempTotal += el.marks;
	// 		});
	// 	});
	// 	setFromTotal(tempTotal);
	// }, []);

	return (
		<div className='text-center'>
			<div className='container-fluid'>
				<img src='./logo.png' alt='' />
				<div class='row'>
					<div class='col-lg-3 col-md-3 col-sm-4'>
						<img src='/images/nameLogo.png' width='90%' height='80%' alt='' />
					</div>
					<div class='offset-lg-7 offset-md-7 offset-sm-6 col-lg-2 col-md-2 col-sm-2'>
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
							}}>
							<h6>FM-96a</h6>
							<h6>Issue.01</h6>
						</div>
					</div>
				</div>
				{/* <h4>Hi-Tech Pipe & Engineering Industries</h4>
				<h6>Plot No X-22, Site Area Kotri</h6>
				<p>Ph-No 022-3870614-5, Fax: 022-3870606</p> */}
				<h5
					className='mt-4'
					style={{ textDecoration: 'underline', marginBottom: -45 }}>
					Employee Performance Assessment
				</h5>
				<h6 className='mt-5' style={{ textDecoration: 'underline' }}>
					(For Non-Executive Employees)
				</h6>
			</div>
			<div className='container-fluid'>
				<div className='row ' style={{ marginTop: 15, textAlign: 'left' }}>
					<div className='col-lg-4 col-md-4 col-sm-6 mt-4'>
						<div className='row no-gutters mt-2'>
							<div className='col-lg-6 col-md-6 col-sm-6'>
								<p style={{ fontWeight: 'bold' }}>Date of Assessment:</p>
							</div>
							<div className='col-lg-6 col-md-6 col-sm-6'>
								<p style={{ textDecoration: 'underline' }}>
									{ }
								</p>
							</div>
						</div>
					</div>
					<div className='offset-lg-1 offset-md-1 col-lg-4 col-md-4 col-sm-6 mt-4'>
						<div className='row no-gutters mt-2'>
							<div className='col-lg-6 col-md-6 col-sm-6'>
								<p style={{ fontWeight: 'bold' }}>Period:</p>
							</div>
							<div className='col-lg-6 col-md-6 col-sm-6'>
								<p style={{ textDecoration: 'underline' }}>
									{ }
								</p>
							</div>
						</div>
					</div>
					<div className='offset-lg-1 col-lg-2 col-md-2 mt-4' id='printBtn'>
						<Button
							variant='contained'
							size='small'
							className='bg-dark text-light'
							onClick={() => window.print()}>
							Print
						</Button>
					</div>
				</div>
			</div>
			<div className={classes.table}>
				<div className='table ml-auto mr-auto mt-4'>
					<Grid container spacing={1} style={{ marginTop: 15, textAlign: 'left' }}>
						<Grid item lg={2} md={2} sm={2} xs={2}>
							<p style={{ fontWeight: 'bold' }}>Name:</p>
						</Grid>
						<Grid item lg={2} md={2} sm={2} xs={2}>
							{/* <p style={{ textDecoration: 'underline' }}>{assessment?.values?.name}</p> */}

						</Grid>
						<Grid item lg={1} md={1} sm={1} xs={1}></Grid>
						<Grid item lg={2} md={2} sm={3} xs={3}>
							<p style={{ fontWeight: 'bold' }}>Employee's No:</p>
						</Grid>
						<Grid item lg={2} md={2} sm={3} xs={3}>
							{/* <p style={{ textDecoration: 'underline' }}>{assessment?.values?._id}</p> */}

						</Grid>
					</Grid>
					<Grid container spacing={1} style={{ marginTop: 15, textAlign: 'left' }}>
						<Grid item lg={2} md={2} sm={2} xs={2}>
							<p style={{ fontWeight: 'bold' }}>Department:</p>
						</Grid>
						<Grid item lg={2} md={2} sm={2} xs={2}>
							{/* <p style={{ textDecoration: 'underline' }}>{assessment?.values?.finalDepartment?.name}</p> */}

						</Grid>
						<Grid item lg={1} md={1} sm={1} xs={1}></Grid>
						<Grid item lg={2} md={2} sm={3} xs={3}>
							<p style={{ fontWeight: 'bold' }}>Designation:</p>
						</Grid>
						<Grid item lg={4} md={4} sm={4} xs={4}>
							{/* <p style={{ textDecoration: 'underline' }}>{assessment?.values?.finalDesignation?.name}</p> */}

						</Grid>
					</Grid>
					<Grid container spacing={1} style={{ marginTop: 15, textAlign: 'left' }}>
						<Grid item lg={2} md={2} sm={2} xs={2}>
							<p style={{ fontWeight: 'bold' }}>Date Of Birth:</p>
						</Grid>
						<Grid item lg={2} md={2} sm={2} xs={2}>
							{/* <p style={{ textDecoration: 'underline' }}>{assessment?.values?.dateOfBirth}</p> */}

						</Grid>
						<Grid item lg={1} md={1} sm={1} xs={1}></Grid>
						<Grid item lg={2} md={2} sm={3} xs={3}>
							<p style={{ fontWeight: 'bold' }}>Age:</p>
						</Grid>
						<Grid item lg={4} md={4} sm={4} xs={4}>
							{/* <p style={{ textDecoration: 'underline' }}>{assessment?.values?.age}</p> */}

						</Grid>
					</Grid>
					<Grid container spacing={1} style={{ marginTop: 15, textAlign: 'left' }}>
						<Grid item lg={2} md={2} sm={2} xs={2}>
							<p style={{ fontWeight: 'bold' }}>Present Basic Pay Rs.</p>
						</Grid>
						<Grid item lg={2} md={2} sm={2} xs={2}>
							{/* <p style={{ textDecoration: 'underline' }}>{assessment?.values?.finalSal}</p> */}

						</Grid>
						<Grid item lg={1} md={1} sm={1} xs={1}></Grid>
						<Grid item lg={2} md={2} sm={3} xs={3}>
							<p style={{ fontWeight: 'bold' }}>Date of Joining:</p>
						</Grid>
						<Grid item lg={4} md={4} sm={4} xs={4}>
							{/* <p style={{ textDecoration: 'underline' }}>{moment(assessment?.values?.createdAt).format('Do MMM YYYY')}</p> */}

						</Grid>
					</Grid>
				</div>
			</div>
			<table class='table table-bordered border-dark table-responsive text-center mt-5'>
				<thead class='thead-inverse'>
					<tr>
						<th>Sr.No.</th>
						<th>Heading</th>
						<th>Marks Allocated</th>
						<th>Marks Obtained</th>
					</tr>
				</thead>
				<tbody>
					{/* {
							assessment?.data?.map((el, i) => ( */}
					<tr>
						<td >{/* {i + 1} */}</td>
						<td >
							{/* <h6 style={{ fontWeight: 'bold' }}>{el?.heading}</h6> */}
							{/* {el?.list?.map((el, i) => (
								<p>{el?.value}</p>
							))} */}
						</td>
						<td>
							{/* {el?.list.map((el) => (
								<p>{el?.marks}</p>
							))} */}
						</td>
						<td>
							{/* {el?.list.map((el) => (
								<p>{el?.obtain}</p>
							))} */}
						</td>
					</tr>
					{/* ))
								} */}
					<tr>
						<td></td>
						<td>
							TOTAL
						</td>
						<td>
							{fromTotal}
						</td>
						<td>
							{/* {assessment.total} */}
						</td>
					</tr>
				</tbody>
			</table>
			<div className={classes.mainContainer1}>
				<h5 align='left' style={{ marginTop: 30 }}>
					Rating
				</h5>
				{
					// nonExecRat?.map((el) => (
					<div className='mt-3'>
						{/* <h6 style={{ display: 'inline', marginRight: '2rem' }}>{el?.name} </h6> */}
						<h6 style={{ display: 'inline', marginLeft: 0 }}>
							{/* {el?.min}-{el?.max} */}
						</h6>
						{/* {assessment.total >= el?.min && assessment.total < el?.max && (
								<CheckIcon />
							)} */}
					</div>
					// ))
				}
			</div>
			<div className={classes.mainContainer1}>
				<h5 align='left' style={{ marginTop: 30 }}>
					Overall Rating:
				</h5>
				{
					// nonExecRat?.map((el) => (
					<div className='mt-3'>
						<h6 style={{ textDecoration: 'underline' }}>
							{/* {el?.name}
							{assessment.total >= el?.min && assessment.total < el?.max && (
								<CheckIcon />
							)} */}
						</h6>
						{/* <p style={{ width: '50%' }}>{el?.description}</p> */}
					</div>
					// ))
				}
			</div>
			<Grid container spacing={1} style={{ marginTop: 50, textAlign: 'left' }}>
				<Grid item lg={2} md={2} sm={2} xs={2}>
					<p style={{ fontWeight: 'bold' }}>General Remarks:</p>
				</Grid>
				<Grid item lg={2} md={2} sm={2} xs={2}>
					{/* <p style={{ textDecoration: 'underline' }}>{assessment?.values?.remarks}</p> */}

				</Grid>
			</Grid>
			<div className='container mt-5'>
				<div className='row'>
					<div className='col-lg-3 col-md-3 col-sm-3 mt-5'>
						<p style={{ textDecoration: 'underline' }}>
							{ }
						</p>
						<p style={{ fontSize: 12, fontWeight: 'bold' }}>
							Head Of Department
						</p>
					</div>
					<div className='offset-lg-1 offset-md-1 offset-sm-1 col-lg-3 col-md-3 col-sm-3 mt-5'>
						<p style={{ textDecoration: 'underline' }}>
							{ }
						</p>
						<p style={{ fontSize: 12, fontWeight: 'bold' }}>Name</p>
					</div>
					<div className='offset-lg-1 offset-md-1 offset-sm-1 col-lg-3 col-md-3 col-sm-3 mt-5'>
						<p style={{ textDecoration: 'underline' }}>
							{ }
						</p>
						<p style={{ fontSize: 12, fontWeight: 'bold' }}>
							Signature
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default withRouter(PrintNonExecEmpDetails);
