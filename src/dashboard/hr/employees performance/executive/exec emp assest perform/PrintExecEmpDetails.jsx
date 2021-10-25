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

	// const date = new Date();
	// const currDate = date.getDate();
	// const months = date.getMonth() + 1;
	// const years = date.getFullYear();
	// const fullDate = `${currDate} / ${months} / ${years}`;

	const { execPrereq } = useSelector((state) => state.execPrereq);
	const { execRat } = useSelector((state) => state.execRat);

	React.useEffect(() => {
		if (location?.state?.assessment) {
			setAssessment(location?.state?.assessment);
		}
	}, [location?.state?.assessment]);

	React.useEffect(() => {
		dispatch(getDesignation());
		dispatch(fetchDepartmentsAction());
		dispatch(getExtEmpRatingAction());
		dispatch(getExtEmpRequisitionAction());
	}, []);
	return (
		<div className="text-center">
			<div className="container-fluid">
				<img src="./logo.png" alt="" />
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
								// marginLeft: 'auto',
								// paddingRight: '5px',
								// marginRight: '-3rem'
							}}
						>
							<h6>FM-96</h6>
							<h6>Issue.01</h6>
						</div>
					</div>
				</div>
				{/* <h4>Hi-Tech Pipe & Engineering Industries</h4>
				<h6>Plot No X-22, Site Area Kotri</h6>
				<p>Ph-No 022-3870614-5, Fax: 022-3870606</p> */}
				<h5>HI-TECH PIPE AND ENGINEERING INDUSTRIES</h5>
				<h5 className="mt-1">Employee Performance Assessment</h5>
				<p style={{ textDecoration: 'underline' }}>
					(For Executive Employees)
				</p>
			</div>
			<div className="container-fluid mt-5">
				<div
					class="row"
					style={{
						textAlign: 'left',
						marginLeft: 'auto',
						marginRight: 'auto',
					}}
				>
					<div class="col-3 p-0">
						<p style={{ fontWeight: 'bold' }}>Date of Assessment:</p>
					</div>
					<div class="col-3">
						<p style={{ textDecoration: 'underline' }}>{}</p>
					</div>
					<div class="col-3">
						<p style={{ fontWeight: 'bold' }}>Due Date:</p>
					</div>
					<div class="col-2">
						<p style={{ textDecoration: 'underline' }}>{}</p>
					</div>
					<div class="col-1" id="printBtn">
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
			<div className={classes.table}>
				<div
					class="row"
					style={{
						textAlign: 'left',
						marginLeft: 'auto',
						marginRight: 'auto',
					}}
				>
					<div class="col-3">
						<p style={{ fontWeight: 'bold' }}>Employee Name:</p>
					</div>
					<div class="col-3">
						<p style={{ textDecoration: 'underline' }}>
							{assessment?.employee?.name}
						</p>
					</div>
					<div class="col-3">
						<p style={{ fontWeight: 'bold' }}>Position/Title:</p>
					</div>
					<div class="col-3">
						<p style={{ textDecoration: 'underline' }}>
							{assessment?.employee?.name}
						</p>
					</div>
				</div>
				<div
					class="row"
					style={{
						textAlign: 'left',
						marginLeft: 'auto',
						marginRight: 'auto',
					}}
				>
					<div class="col-3">
						<p style={{ fontWeight: 'bold' }}>Department:</p>
					</div>
					<div class="col-3">
						<p style={{ textDecoration: 'underline' }}>
							{assessment?.employee?.finalDepartment?.name}
						</p>
					</div>
					<div class="col-3">
						<p style={{ fontWeight: 'bold' }}>Date of Employment:</p>
					</div>
					<div class="col-3">
						<p style={{ textDecoration: 'underline' }}>{}</p>
					</div>
				</div>
				<div
					class="row"
					style={{
						textAlign: 'left',
						marginLeft: 'auto',
						marginRight: 'auto',
					}}
				>
					<div class="col-3">
						<p style={{ fontWeight: 'bold' }}>Assessment Period:</p>
					</div>
					<div class="col-3">
						<p style={{ textDecoration: 'underline' }}>{}</p>
					</div>
				</div>
			</div>
			<div style={{ marginTop: 30, marginBottom: 30 }}>
				<hr />
			</div>
			<div className="">
				<h5 style={{ textDecoration: 'underline' }}>
					PERFORMANCE ASSESSMENT
				</h5>
				<p
					className="mt-2"
					style={{ fontWeight: '500', fontSize: '14.5px' }}
				>
					A CHECK MARK HAS BEEN PLACED IN THE BOX WHICH MOST CLOSELY
					INDICATES THE EMPLOYEE'S PERFORMANCE <br /> OF EACH FACTOR.
					FACTOR RATINGS OF "OUTSTANDING" OR "UNSATISFACTORY" HAVE BEEN
					SUBSTANCIATED BY COMMENTS.
				</p>
				<div className="" style={{ marginTop: 30, marginLeft: 'auto' }}>
					{execPrereq &&
						execPrereq?.length > 0 &&
						execPrereq?.map((topEl, i) => (
							<>
								<table class="table table-striped table-inverse table-responsive table-hover">
									{i < 1 && (
										<thead class="thead-inverse">
											<tr>
												<th colspan="6">RATING</th>
											</tr>
										</thead>
									)}
									{i < 1 && (
										<thead class="thead-inverse thead-dark">
											<tr>
												<th>PERFORMANCE FACTORS</th>
												{execRat &&
													execRat?.length > 0 &&
													execRat?.map((el) => (
														<th>{el?.name}</th>
													))}
											</tr>
										</thead>
									)}
									<tbody>
										<tr>
											<td scope="row"></td>
											{execRat &&
												execRat?.length > 0 &&
												execRat?.map((el) => (
													<td>({el?.calculated})</td>
												))}
										</tr>
										{topEl?.points?.map((el, i) => (
											<tr>
												{i === 0 ? (
													<td scope="row">{topEl?.heading}</td>
												) : (
													<td scope="row"></td>
												)}
												<td>
													{el}
													{assessment?.list?.map(
														(el2, i) =>
															el2?.selected === el && (
																<CheckIcon />
															)
													)}
												</td>
											</tr>
										))}
									</tbody>
								</table>
								<Grid
									container
									spacing={1}
									style={{ marginTop: 50, textAlign: 'left' }}
								>
									<Grid item lg={2} md={2} sm={2} xs={2}>
										<p style={{ fontWeight: 'bold' }}>
											Comments/Recommendations
										</p>
									</Grid>
									<Grid item sm={1} xs={1}></Grid>
									<Grid item lg={2} md={2} sm={3} xs={3}>
										<p style={{ textDecoration: 'underline' }}>
											{assessment?.list[i]?.comments}
										</p>
									</Grid>
								</Grid>
							</>
						))}
				</div>

				<div className="text-center mt-5">
					<table class="table table-striped table-inverse table-responsive table-hover">
						<thead class="thead-inverse thead-dark">
							<tr>
								<th colspan="2">RATING CALCULATION:</th>
								<th colspan="4">
									(Each number of ratingschecks, multiply and total)
								</th>
							</tr>
						</thead>

						<tbody>
							{execRat &&
								execRat?.length > 0 &&
								execRat?.map((el) => (
									<tr>
										<td>{el?.name}</td>
										<td>{el?.calculated}</td>
										<td>x</td>
										<td>
											{
												assessment?.list?.filter(
													(tempEl) =>
														tempEl?.calculated === el?.calculated
												).length
											}
										</td>
										<td>=</td>
										<td>
											{assessment?.list?.filter(
												(tempEl) =>
													tempEl?.calculated === el?.calculated
											).length * parseInt(el.calculated)}
										</td>
									</tr>
								))}

							<tr>
								<td colspan="2">TOTAL</td>
								<td colspan="3"></td>
								<td>{assessment?.total}</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className="text-center mt-5">
					<table class="table table-striped table-inverse table-responsive table-hover">
						<thead class="thead-inverse thead-dark">
							<tr>
								<th>RATING TABLE:</th>
								<th colspan="2">MEETINGS OF GOALS</th>
							</tr>
						</thead>

						<tbody>
							{execRat &&
								execRat?.length > 0 &&
								execRat?.map((el) => (
									<tr>
										<td scope="row">{el?.name}</td>
										<td scope="row">
											{el?.min}-{el?.max}
										</td>
										<td className="text-center">
											{assessment.total >= el?.min &&
												assessment.total < el?.max && <CheckIcon />}
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
				<h5 align="left" style={{ marginTop: 60 }}>
					Overall Ratings
				</h5>
				<div className="mt-3">
					{execRat &&
						execRat?.length > 0 &&
						execRat?.map((el) => (
							<>
								<h6 style={{ textDecoration: 'underline' }}>
									{el?.name}
								</h6>
								<p style={{ width: '50%' }}>{el?.description}</p>
							</>
						))}
				</div>
			</div>
			<Grid
				container
				spacing={1}
				style={{ marginTop: 50, textAlign: 'left' }}
			>
				<Grid item lg={2} md={2} sm={2} xs={2}>
					<p style={{ fontWeight: 'bold' }}>Suggestions</p>
				</Grid>
				<Grid item lg={9} md={9} sm={9} xs={9}>
					<p>
						{assessment?.values?.suggestions}
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
			<div className="container" style={{ marginTop: 50 }}>
				<div className="row">
					<div className="col-lg-3 col-md-3 col-sm-3 mt-5">
						<hr style={{ backgroundColor: 'black', paddingTop: 2 }} />
						<p
							style={{
								marginTop: -10,
								fontSize: 12,
								fontWeight: 'bold',
							}}
						>
							Signature
						</p>
					</div>
					<div className="offset-lg-1 offset-md-1 offset-sm-1 col-lg-3 col-md-3 col-sm-3 mt-5">
						<hr style={{ backgroundColor: 'black', paddingTop: 2 }} />
						<p
							style={{
								marginTop: -10,
								fontSize: 12,
								fontWeight: 'bold',
							}}
						>
							Signature
						</p>
					</div>
					<div className="offset-lg-1 offset-md-1 offset-sm-1 col-lg-3 col-md-3 col-sm-3 mt-5">
						<hr style={{ backgroundColor: 'black', paddingTop: 2 }} />
						<p
							style={{
								marginTop: -10,
								fontSize: 12,
								fontWeight: 'bold',
							}}
						>
							Signature
						</p>
					</div>
				</div>
			</div>
			<Grid
				container
				spacing={1}
				style={{ marginTop: 80, textAlign: 'left' }}
			>
				<Grid item lg={2} md={2} sm={2} xs={2}>
					<p style={{ fontWeight: 'bold' }}>Recommendations</p>
				</Grid>
				<Grid item lg={9} md={9} sm={9} xs={9}>
					<p>
						{assessment?.values?.recommendations}
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
			<div className="container" style={{ marginTop: 30 }}>
				<div className="row">
					<div className="offset-lg-9 offset-md-9 offset-sm-9 offset-xs-9 col-lg-3 col-md-3 col-sm-3 mt-5">
						<hr style={{ backgroundColor: 'black', paddingTop: 2 }} />
						<p
							style={{
								marginTop: -10,
								fontSize: 14,
								fontWeight: 'bold',
							}}
						>
							FAKHR-E-ALAM
						</p>
						<p
							style={{
								marginTop: -10,
								fontSize: 12,
								fontWeight: 'bold',
							}}
						>
							Cheif Executive Officer
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default withRouter(PrintExecEmpDetails);
