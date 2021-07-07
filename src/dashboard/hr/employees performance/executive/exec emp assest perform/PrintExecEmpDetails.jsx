import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import CheckIcon from '@material-ui/icons/Check';
import { getDesignation } from '../../../../../services/action/DesignationAction';
import { fetchDepartmentsAction } from '../../../../../services/action/DepartmentAction';
import { getExtEmpRatingAction } from '../../../../../services/action/ExecRating';
import { getExtEmpRequisitionAction } from '../../../../../services/action/ExecPrereq';
import { useDispatch, useSelector } from 'react-redux';
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

const PrintExecEmpDetails = ({ location }) => {
	const [assessment, setAssessment] = React.useState([]);
	const classes = useStyles();
	// const id = props.match.params.id
	const dispatch = useDispatch();

	const date = new Date();
	const currDate = date.getDate();
	const months = date.getMonth() + 1;
	const years = date.getFullYear();
	const fullDate = `${currDate} / ${months} / ${years}`;
	const { execPrereq } = useSelector((state) => state.execPrereq);
	const { execRat } = useSelector((state) => state.execRat);

	React.useEffect(() => {
		if (location?.state?.assessment) {
			setAssessment(location?.state?.assessment);
		}
	}, [location?.state?.assessment]);

	console.log(assessment);

	React.useEffect(() => {
		dispatch(getDesignation());
		dispatch(fetchDepartmentsAction());
		dispatch(getExtEmpRatingAction());
		dispatch(getExtEmpRequisitionAction());
	}, []);
	return (
		<div className='text-center'>
			<div className='container'>
				<img src='./logo.png' alt='' />
				<h4>Hi-Tech Pipe & Engineering Industries</h4>
				<h6>Plot No X-22, Site Area Kotri</h6>
				<p>Ph-No 022-3870614-5, Fax: 022-3870606</p>
				<h5
					className='mt-4'
					style={{ textDecoration: 'underline', marginBottom: -45 }}>
					Employee Performance Assessment
				</h5>
				<h5 className='mt-5' style={{ textDecoration: 'underline' }}>
					(For Executive Employees)
				</h5>
			</div>
			<div className='container-fluid'>
				<div className='row ' style={{ marginTop: 15, textAlign: 'left' }}>
					<div className='col-lg-4 col-md-4 col-sm-6 mt-4'>
						<div className='row no-gutters mt-2'>
							<div className='col-lg-6 col-md-6 col-sm-6'>
								<p>Date of Assessment</p>
							</div>
							<div className='col-lg-6 col-md-6 col-sm-6'>
								<p>
									{fullDate}
									<hr style={{ backgroundColor: 'black', paddingTop: 1 }} />
								</p>
							</div>
						</div>
					</div>
					<div className='offset-lg-1 offset-md-1 col-lg-4 col-md-4 col-sm-6 mt-4'>
						<div className='row no-gutters mt-2'>
							<div className='col-lg-6 col-md-6 col-sm-6'>
								<p style={{ fontWeight: 'bold' }}>Due Date</p>
							</div>
							<div className='col-lg-6 col-md-6 col-sm-6'>
								<p>
									Dec 2021
									<hr style={{ backgroundColor: 'black', paddingTop: 1 }} />
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
							<p style={{ fontWeight: 'bold' }}>Employee Name</p>
						</Grid>
						<Grid item lg={2} md={2} sm={2} xs={2}>
							<p>Arsalan Khan</p>
							<hr
								style={{
									paddingBottom: 4,
									borderColor: 'black',
									width: '100%',
									marginTop: -12,
								}}
							/>
						</Grid>
						<Grid item lg={1} md={1} sm={1} xs={1}></Grid>
						<Grid item lg={2} md={2} sm={3} xs={3}>
							<p style={{ fontWeight: 'bold' }}>Position/Title</p>
						</Grid>
						<Grid item lg={2} md={2} sm={3} xs={3}>
							<p>Manager</p>
							<hr
								style={{
									paddingBottom: 3,
									borderColor: 'black',
									width: '100%',
									marginTop: -12,
								}}
							/>
						</Grid>
					</Grid>
					<Grid container spacing={1} style={{ marginTop: 15, textAlign: 'left' }}>
						<Grid item lg={2} md={2} sm={2} xs={2}>
							<p style={{ fontWeight: 'bold' }}>Department</p>
						</Grid>
						<Grid item lg={2} md={2} sm={2} xs={2}>
							<p>Purchase</p>
							<hr
								style={{
									paddingBottom: 4,
									borderColor: 'black',
									width: '100%',
									marginTop: -12,
								}}
							/>
						</Grid>
						<Grid item lg={1} md={1} sm={1} xs={1}></Grid>
						<Grid item lg={2} md={2} sm={3} xs={3}>
							<p style={{ fontWeight: 'bold' }}>Date of Employeement</p>
						</Grid>
						<Grid item lg={2} md={2} sm={2} xs={2}>
							<p>2-2-18</p>
							<hr
								style={{
									paddingBottom: 3,
									borderColor: 'black',
									width: '100%',
									marginTop: -12,
								}}
							/>
						</Grid>
					</Grid>
					<Grid container spacing={1} style={{ marginTop: 15, textAlign: 'left' }}>
						<Grid item lg={2} md={2} sm={2} xs={2}>
							<p style={{ fontWeight: 'bold' }}>Assessment Period</p>
						</Grid>
						<Grid item lg={2} md={2} sm={2} xs={2}>
							<p>6-Months</p>
							<hr
								style={{
									paddingBottom: 4,
									borderColor: 'black',
									width: '100%',
									marginTop: -12,
								}}
							/>
						</Grid>
					</Grid>
				</div>
			</div>
			<div style={{ marginTop: 30, marginBottom: 30 }}>
				<hr />
			</div>
			<div className=''>
				<h5 style={{ textDecoration: 'underline' }}>PERFORMANCE ASSESSMENT</h5>
				<h6 className='mt-3'>
					A CHECK MARK HAS BEEN PLACED IN THE BOX WHICH MOST CLOSELY INDICATES THE
					EMPLOYEE'S PERFORMANCE <br /> OF EACH FACTOR. FACTOR RATINGS OF
					"OUTSTANDING" OR "UNSATISFACTORY" HAVE BEEN SUBSTANCIATED BY COMMENTS.
				</h6>
				<div className='' style={{ marginTop: 30, marginLeft: 'auto' }}>
					{execPrereq &&
						execPrereq?.length > 0 &&
						execPrereq?.map((topEl, i) => (
							<>
								<table class='table table-striped table-inverse table-responsive table-hover'>
									{i < 1 && (
										<thead class='thead-inverse'>
											<tr>
												<th colspan='6'>RATING</th>
											</tr>
										</thead>
									)}
									{i < 1 && (
										<thead class='thead-inverse thead-dark'>
											<tr>
												<th>PERFORMANCE FACTORS</th>
												{execRat &&
													execRat?.length > 0 &&
													execRat?.map((el) => <th>{el?.name}</th>)}
											</tr>
										</thead>
									)}
									<tbody>
										<tr>
											<td scope='row'></td>
											{execRat &&
												execRat?.length > 0 &&
												execRat?.map((el) => <td>({el?.calculated})</td>)}
										</tr>
										{topEl?.points?.map((el) => (
											<tr>
												<td scope='row'>{topEl?.heading}</td>
												<td>{el}</td>
											</tr>
										))}
										<tr>
											<td scope='row'></td>
											<td className='text-center'>
												<CheckIcon />
											</td>
											<td className='text-center'>
												<CheckIcon />
											</td>
											<td className='text-center'>
												<CheckIcon />
											</td>
											<td className='text-center'>
												<CheckIcon />
											</td>
											<td className='text-center'>
												<CheckIcon />
											</td>
										</tr>
									</tbody>
								</table>
								<Grid
									container
									spacing={1}
									style={{ marginTop: 50, textAlign: 'left' }}>
									<Grid item lg={2} md={2} sm={2} xs={2}>
										<p style={{ fontWeight: 'bold' }}>Comments/Recommendations</p>
									</Grid>
									<Grid item sm={1} xs={1}></Grid>
									<Grid item lg={2} md={2} sm={3} xs={3}>
										<p>overall good</p>
										<hr
											style={{
												paddingBottom: 4,
												borderColor: 'black',
												width: '100%',
												marginTop: -12,
											}}
										/>
									</Grid>
								</Grid>
							</>
						))}
				</div>

				<div className='text-center mt-5'>
					<table
						class='table table-striped table-inverse table-responsive table-hover'
						style={{ marginLeft: 60 }}>
						<thead class='thead-inverse thead-dark'>
							<tr>
								<th colspan='2'>RATING CALCULATION:</th>
								<th colspan='4'>(Each number of ratingschecks, multiply and total)</th>
							</tr>
						</thead>

						<tbody>
							{execRat &&
								execRat?.length > 0 &&
								execRat?.map((el) => (
									<tr>
										<td scope='row'>{el?.name}</td>
										<td scope='row'>{el?.calculated}</td>
										<td scope='row'>x</td>
										<td scope='row'>6</td>
										<td scope='row'>=</td>
										<td scope='row'>30</td>
									</tr>
								))}

							<tr>
								<td colspan='2'>TOTAL</td>
								<td colspan='3'></td>
								<td>46</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className='text-center mt-5'>
					<table
						class='table table-striped table-inverse table-responsive table-hover'
						style={{ marginLeft: 60 }}>
						<thead class='thead-inverse thead-dark'>
							<tr>
								<th>RATING TABLE:</th>
								<th colspan='2'>MEETINGS OF GOALS</th>
							</tr>
						</thead>

						<tbody>
							{execRat &&
								execRat?.length > 0 &&
								execRat?.map((el) => (
									<tr>
										<td scope='row'>{el?.name}</td>
										<td scope='row'>
											{el?.min}-{el?.max}
										</td>
										<td className='text-center'>
											<CheckIcon />
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
				<div style={{ marginTop: 30, marginBottom: 30 }}>
					<hr />
				</div>
			</div>
			<div className={classes.mainContainer1}>
				<h5 align='left' style={{ marginTop: 60 }}>
					Overall Ratings
				</h5>
				<div className='mt-3'>
					{execRat &&
						execRat?.length > 0 &&
						execRat?.map((el) => (
							<>
								<h6 style={{ textDecoration: 'underline' }}>{el?.name}</h6>
								<p style={{ width: '50%' }}>{el?.description}</p>
							</>
						))}
				</div>
			</div>
			<Grid container spacing={1} style={{ marginTop: 50, textAlign: 'left' }}>
				<Grid item lg={2} md={2} sm={2} xs={2}>
					<p style={{ fontWeight: 'bold' }}>Suggestions</p>
				</Grid>
				<Grid item lg={9} md={9} sm={9} xs={9}>
					<p>
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. voluptatum
						possimus porro voluptatem totam rerum eligendi modi mollitia consequuntur
						quia eum. Eligendi laboriosam repudiandae ea odit.
						<hr
							style={{
								paddingBottom: 4,
								borderColor: 'black',
								width: '100%',
								marginTop: -2,
							}}
						/>
					</p>
				</Grid>
			</Grid>
			<div className='container' style={{ marginTop: 50 }}>
				<div className='row'>
					<div className='col-lg-3 col-md-3 col-sm-3 mt-5'>
						<hr style={{ backgroundColor: 'black', paddingTop: 2 }} />
						<p style={{ marginTop: -10, fontSize: 12, fontWeight: 'bold' }}>
							Signature
						</p>
					</div>
					<div className='offset-lg-1 offset-md-1 offset-sm-1 col-lg-3 col-md-3 col-sm-3 mt-5'>
						<hr style={{ backgroundColor: 'black', paddingTop: 2 }} />
						<p style={{ marginTop: -10, fontSize: 12, fontWeight: 'bold' }}>
							Signature
						</p>
					</div>
					<div className='offset-lg-1 offset-md-1 offset-sm-1 col-lg-3 col-md-3 col-sm-3 mt-5'>
						<hr style={{ backgroundColor: 'black', paddingTop: 2 }} />
						<p style={{ marginTop: -10, fontSize: 12, fontWeight: 'bold' }}>
							Signature
						</p>
					</div>
				</div>
			</div>
			<Grid container spacing={1} style={{ marginTop: 80, textAlign: 'left' }}>
				<Grid item lg={2} md={2} sm={2} xs={2}>
					<p style={{ fontWeight: 'bold' }}>Recommendations</p>
				</Grid>
				<Grid item lg={9} md={9} sm={9} xs={9}>
					<p>
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam,
						veniam ex illum totam rerum eligendi modi mollitia consequuntur quia eum.
						Eligendi laboriosam repudiandae ea odit.
						<hr
							style={{
								paddingBottom: 4,
								borderColor: 'black',
								width: '100%',
								marginTop: -2,
							}}
						/>
					</p>
				</Grid>
			</Grid>
			<div className='container' style={{ marginTop: 30 }}>
				<div className='row'>
					<div className='offset-lg-9 offset-md-9 offset-sm-9 offset-xs-9 col-lg-3 col-md-3 col-sm-3 mt-5'>
						<hr style={{ backgroundColor: 'black', paddingTop: 2 }} />
						<p style={{ marginTop: -10, fontSize: 14, fontWeight: 'bold' }}>
							FAKHR-E-ALAM
						</p>
						<p style={{ marginTop: -10, fontSize: 12, fontWeight: 'bold' }}>
							Cheif Executive Officer
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default withRouter(PrintExecEmpDetails);
