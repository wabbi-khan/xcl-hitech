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
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../purchase/material/Loading';
import { getSingleEmployee } from '../../../services/action/EmployeesAction';
import logo from '../../../images/logo.png'

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

const PrintEmpDetails = (props) => {
	const { match } = props;
	const classes = useStyles();
	const id = props.match.params.id;
	const dispatch = useDispatch();

	const { employee, error, loading } = useSelector((state) => state.employees);

	console.log(employee);
	React.useEffect(() => {
		dispatch(getSingleEmployee(match.params.id));
	}, []);

	const {
		name,
		fatherName_husbandName,
		jobAppliedFor,
		presentAddress,
		gender,
		permanentAddress,
		mobileNo,
		telephoneNo,
		status,
		age,
		dateOfBirth,
		placeOfBirth,
		email,
		cnic,
		DatePlaceOfIssue,
		nationality,
		bankAccount,
		bankNameAndBranch,
		nextToKin,
		academicQualification,
		professionalQualification,
		experience,
		officeUse,
	} = employee;

	// const { address, contact, name: kinName, relation } = employee.nextToKin;

	const date = new Date();
	const currDate = date.getDate();
	const months = date.getMonth() + 1;
	const years = date.getFullYear();
	const fullDate = `${currDate} / ${months} / ${years}`;

	return loading ? (
		<Loading />
	) : error ? (
		<p>{error}</p>
	) : (
		<div className='text-center mt-4'>
			<div className='container'>
				{/* <img src={logo} alt='' /> */}
				<h4 class='mt-3'>Hi-Tech Pipe & Engineering Industries</h4>
				<h6>Plot No X-22, Site Area Kotri</h6>
				<p>Ph-No 022-3870614-5, Fax: 022-3870606</p>
				<h5 className='mt-5' style={{ textDecoration: 'underline' }}>Employment Form</h5>
			</div>
			<div className='container-fluid'>
					<div className='row ' style={{ marginTop: 70, textAlign: 'left' }}>
						<div className='col-lg-4 col-md-4 col-sm-6 mt-4'>
							<div className='row no-gutters mt-2'>
								<div className='col-lg-6 col-md-6 col-sm-6'>
									<p style={{ fontWeight: 'bold' }}>Date</p>
								</div>
								<div className='col-lg-6 col-md-6 col-sm-6'>
									<p>
										{fullDate}
										<hr style={{ backgroundColor: 'black', paddingTop: 1 }} />
									</p>
								</div>
							</div>
						</div>
						<div className='offset-lg-6 col-lg-2 col-md-2 mt-4' id='printBtn'>
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
			<div className='container-fluid' style={{ marginTop: '50px' }}>
				<table class="table table-responsive table-bordered border-dark mt-3" style={{ textAlign: 'left' }}>
					<tbody>
						{/* {
							loading ? (
								<Loading />
							) : error ? (
								<MaterialError />
							) : products.length ? (
								products.map((product, i) => ( */}
						<tr >
							<td style={{ fontWeight: 'bold' }}>
								Name
							</td>
							<td colspan='3'>
								{name}
							</td>
							<td colspan='3' style={{ fontWeight: 'bold' }}>
								Father/Husband Name
							</td>
							<td colspan='3'>
								{fatherName_husbandName}
							</td>
						</tr>
						<tr >
							<td style={{ fontWeight: 'bold' }}>
								Job Applied For
							</td>
							<td colspan='3'>
								{jobAppliedFor}
							</td>
							<td colspan='3' style={{ fontWeight: 'bold' }}>
								Present Address
							</td>
							<td colspan='3'>
								{presentAddress}
							</td>
						</tr>
						<tr >
							<td style={{ fontWeight: 'bold' }}>
								Gender
							</td>
							<td colspan='3'>
								{gender}
							</td>
							<td colspan='3' style={{ fontWeight: 'bold' }}>
								Permanent Address
							</td>
							<td colspan='3'>
								{permanentAddress}
							</td>
						</tr>
						<tr >
							<td style={{ fontWeight: 'bold' }}>
								Mobile No.
							</td>
							<td colspan='3'>
								{mobileNo}
							</td>
							<td colspan='3' style={{ fontWeight: 'bold' }}>
								Telephone No.
							</td>
							<td colspan='3'>
								{telephoneNo}
							</td>
						</tr>
						<tr >
							<td style={{ fontWeight: 'bold' }}>
								Merital Status
							</td>
							<td colspan='3'>
								{status}
							</td>
							<td style={{ fontWeight: 'bold' }}>
								Age
							</td>
							<td colspan='3'>
								{age}
							</td>
							<td style={{ fontWeight: 'bold' }}>
								DOB
							</td>
							<td colspan='3'>
								{dateOfBirth}
							</td>
						</tr>
						<tr >
							<td style={{ fontWeight: 'bold' }}>
								Place of Birth
							</td>
							<td colspan='3'>
								{placeOfBirth}
							</td>
							<td colspan='3' style={{ fontWeight: 'bold' }}>
								Email Address
							</td>
							<td colspan='3'>
								{email}
							</td>
						</tr>
						<tr >
							<td style={{ fontWeight: 'bold' }}>
								CNIC No.
							</td>
							<td colspan='3'>
								{cnic}
							</td>
							<td colspan='3' style={{ fontWeight: 'bold' }}>
								Date & Place of Issue
							</td>
							<td colspan='3'>
								{DatePlaceOfIssue}
							</td>
						</tr>
						<tr >
							<td style={{ fontWeight: 'bold' }}>
								Nationality
							</td>
							<td colspan='3'>
								{nationality}
							</td>
							<td colspan='3' style={{ fontWeight: 'bold' }}>
								Bank Account No.
							</td>
							<td colspan='3'>
								{bankAccount}
							</td>
						</tr>
						<tr >
							<td style={{ fontWeight: 'bold' }}>
								Account Name & Branch
							</td>
							<td colspan="5">
								{bankNameAndBranch}
							</td>
						</tr>
						<tr >
							<td style={{ fontWeight: 'bold' }}>
								Next to Kin(Name)
							</td>
							<td colspan='3'>
								{nextToKin?.name}
							</td>
							<td colspan='3' style={{ fontWeight: 'bold' }}>
								Relationship
							</td>
							<td colspan='3'>
								{nextToKin?.relation}
							</td>
						</tr>
						<tr >
							<td style={{ fontWeight: 'bold' }}>
								Contact No.
							</td>
							<td colspan='3'>
								{nextToKin?.contact}
							</td>
							<td colspan='3' style={{ fontWeight: 'bold' }}>
								Address
							</td>
							<td colspan='3'>
								{nextToKin?.address}
							</td>
						</tr>
						{/* ))
							) : (
								<h5>Not Found</h5>
							)
						} */}
					</tbody>
				</table>
			</div>
			{/* <div className={classes.table}>
				<div className='ml-auto mr-auto mt-4'>
					<Grid container spacing={1} style={{ marginTop: 15, textAlign: 'left' }}>
						<Grid item lg={2} md={2} sm={2} xs={2}>
							<p style={{ fontWeight: 'bold' }}>Name</p>
						</Grid>
						<Grid item lg={2} md={2} sm={2} xs={2}>
							<p>{name}</p>
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
							<p style={{ fontWeight: 'bold' }}>Father/Husband Name</p>
						</Grid>
						<Grid item lg={2} md={2} sm={3} xs={3}>
							<p>{fatherName_husbandName}</p>
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
							<p style={{ fontWeight: 'bold' }}>Job Applied For</p>
						</Grid>
						<Grid item lg={2} md={2} sm={2} xs={2}>
							<p>{jobAppliedFor}</p>
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
							<p style={{ fontWeight: 'bold' }}>Present Address</p>
						</Grid>
						<Grid item lg={4} md={4} sm={4} xs={4}>
							<p>{presentAddress}</p>
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
						<Grid item lg={1} md={1} sm={1} xs={1}>
							<p style={{ fontWeight: 'bold' }}>Gender</p>
						</Grid>
						<Grid item lg={1} md={1} sm={1} xs={1}>
							<p>{gender}</p>
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
							<p style={{ fontWeight: 'bold' }}>Permanent Address</p>
						</Grid>
						<Grid item lg={5} md={5} sm={5} xs={5}>
							<p>{permanentAddress}</p>
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
							<p style={{ fontWeight: 'bold' }}>Mobile No.</p>
						</Grid>
						<Grid item lg={2} md={2} sm={2} xs={2}>
							<p>{mobileNo}</p>
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
							<p style={{ fontWeight: 'bold' }}>Telephone No.</p>
						</Grid>
						<Grid item lg={2} md={2} sm={2} xs={2}>
							<p>{telephoneNo}</p>
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
							<p style={{ fontWeight: 'bold' }}>Marital Status</p>
						</Grid>
						<Grid item lg={1} md={1} sm={1} xs={1}>
							<p>{status}</p>
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
						<Grid item lg={1} md={1} sm={1} xs={1}>
							<p style={{ fontWeight: 'bold' }}>Age</p>
						</Grid>
						<Grid item lg={1} md={1} sm={1} xs={1}>
							<p>{age}</p>
							<hr
								style={{
									paddingBottom: 3,
									borderColor: 'black',
									width: '100%',
									marginTop: -12,
								}}
							/>
						</Grid>
						<Grid item lg={1} md={1} sm={1} xs={1}></Grid>
						<Grid item lg={1} md={1} sm={1} xs={1}>
							<p style={{ fontWeight: 'bold' }}>DOB</p>
						</Grid>
						<Grid item lg={2} md={2} sm={2} xs={2}>
							<p>{dateOfBirth}</p>
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
							<p style={{ fontWeight: 'bold' }}>Place of Birth</p>
						</Grid>
						<Grid item lg={3} md={3} sm={3} xs={3}>
							<p>{placeOfBirth}</p>
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
							<p style={{ fontWeight: 'bold' }}>Email Address</p>
						</Grid>
						<Grid item lg={2} md={2} sm={2} xs={2}>
							<p>{email}</p>
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
							<p style={{ fontWeight: 'bold' }}>CNIC No.</p>
						</Grid>
						<Grid item lg={2} md={2} sm={2} xs={2}>
							<p>{cnic}</p>
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
							<p style={{ fontWeight: 'bold' }}>Date & Place of Issue</p>
						</Grid>
						<Grid item lg={4} md={4} sm={4} xs={4}>
							<p>{DatePlaceOfIssue}</p>
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
							<p style={{ fontWeight: 'bold' }}>Nationality</p>
						</Grid>
						<Grid item lg={2} md={2} sm={2} xs={2}>
							<p>{nationality}</p>
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
						<Grid item lg={2} md={2} sm={2} xs={2}>
							<p style={{ fontWeight: 'bold' }}>Bank Acc No.</p>
						</Grid>
						<Grid item lg={3} md={3} sm={3} xs={3}>
							<p>{bankAccount}</p>
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
						<Grid item lg={3} md={3} sm={3} xs={3}>
							<p style={{ fontWeight: 'bold' }}>Account Name & Branch</p>
						</Grid>
						<Grid item lg={6} md={6} sm={6} xs={6}>
							<p>{bankNameAndBranch}</p>
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
					<Grid container spacing={1} style={{ marginTop: 15, textAlign: 'left' }}>
						<Grid item lg={2} md={2} sm={2} xs={2}>
							<p style={{ fontWeight: 'bold' }}>Next To Kin (Name)</p>
						</Grid>
						<Grid item lg={2} md={2} sm={2} xs={2}>
							<p>{nextToKin?.name}</p>
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
						<Grid item lg={2} md={2} sm={2} xs={2}>
							<p style={{ fontWeight: 'bold' }}>Relationship</p>
						</Grid>
						<Grid item lg={3} md={3} sm={3} xs={3}>
							<p>{nextToKin?.relation}</p>
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
						<Grid item lg={1} md={1} sm={1} xs={1}>
							<p style={{ fontWeight: 'bold' }}>Address</p>
						</Grid>
						<Grid item lg={4} md={4} sm={4} xs={4}>
							<p>{nextToKin?.address}</p>
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
						<Grid item lg={2} md={2} sm={2} xs={2}>
							<p style={{ fontWeight: 'bold' }}>Contact No.</p>
						</Grid>
						<Grid item lg={3} md={3} sm={3} xs={3}>
							<p>{nextToKin?.contact}</p>
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
				</div>
			</div> */}
			<div className={classes.table1}>
				<h5 align='left' style={{ marginTop: 30, textDecoration: 'underline' }}>
					Academic Qualification
				</h5>
				<div className='table ml-auto mr-auto mt-4'>
					{/* <h6>Purchase Inspection Materials</h6> */}
					<TableContainer>
						<Table>
							<TableHead>
								<TableRow hover role='checkbox'>
									<StyledTableCell className='text-dark bg-light' align='center'>
										Sr.No
									</StyledTableCell>
									<StyledTableCell className='text-dark bg-light' align='center'>
										Certificate/Degree
									</StyledTableCell>
									<StyledTableCell className='text-dark bg-light' align='center'>
										Board/University
									</StyledTableCell>
									<StyledTableCell className='text-dark bg-light' align='center'>
										Year of Passing
									</StyledTableCell>
									<StyledTableCell className='text-dark bg-light' align='center'>
										Division
									</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{!academicQualification || !academicQualification.length ? (
									<span>Not Found</span>
								) : (
									academicQualification.map((el, i) => (
										<StyledTableRow>
											<StyledTableCell className='text-dark' align='center'>
												{i + 1}
											</StyledTableCell>
											<StyledTableCell className='text-dark' align='center'>
												{el.degree}
											</StyledTableCell>
											<StyledTableCell className='text-dark' align='center'>
												{el.university}
											</StyledTableCell>
											<StyledTableCell className='text-dark' align='center'>
												{el.yearOfPassing}
											</StyledTableCell>
											<StyledTableCell className='text-dark' align='center'>
												{el.division}
											</StyledTableCell>
										</StyledTableRow>
									))
								)}
							</TableBody>
						</Table>
					</TableContainer>
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
			</div>
			<div className={classes.table1}>
				<h5 align='left' style={{ marginTop: 30, textDecoration: 'underline' }}>
					Professional Qualification
				</h5>
				<div className='table ml-auto mr-auto mt-4'>
					{/* <h6>Purchase Inspection Materials</h6> */}
					<TableContainer>
						<Table>
							<TableHead>
								<TableRow hover role='checkbox'>
									<StyledTableCell className='text-dark bg-light' align='center'>
										Sr.No
									</StyledTableCell>
									<StyledTableCell className='text-dark bg-light' align='center'>
										Certificate/Degree
									</StyledTableCell>
									<StyledTableCell className='text-dark bg-light' align='center'>
										Board/University
									</StyledTableCell>
									<StyledTableCell className='text-dark bg-light' align='center'>
										Year of Passing
									</StyledTableCell>
									<StyledTableCell className='text-dark bg-light' align='center'>
										Division
									</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{!professionalQualification || !professionalQualification.length ? (
									<span>Not Found</span>
								) : (
									professionalQualification.map((el, i) => (
										<StyledTableRow>
											<StyledTableCell className='text-dark' align='center'>
												{i + 1}
											</StyledTableCell>
											<StyledTableCell className='text-dark' align='center'>
												{el.degree}
											</StyledTableCell>
											<StyledTableCell className='text-dark' align='center'>
												{el.university}
											</StyledTableCell>
											<StyledTableCell className='text-dark' align='center'>
												{el.yearOfPassing}
											</StyledTableCell>
											<StyledTableCell className='text-dark' align='center'>
												{el.division}
											</StyledTableCell>
										</StyledTableRow>
									))
								)}
							</TableBody>
						</Table>
					</TableContainer>
				</div>
			</div>
			<div className={classes.table1}>
				<h5 align='left' style={{ marginTop: 30, textDecoration: 'underline' }}>
					Experience: (Recent First)
				</h5>
				<div className='table ml-auto mr-auto mt-4'>
					{/* <h6>Purchase Inspection Materials</h6> */}
					<TableContainer>
						<Table>
							<TableHead>
								<TableRow hover role='checkbox'>
									<StyledTableCell className='text-dark bg-light' align='center'>
										Sr.No
									</StyledTableCell>
									<StyledTableCell className='text-dark bg-light' align='center'>
										Company Name
									</StyledTableCell>
									<StyledTableCell className='text-dark bg-light' align='center'>
										Company Address
									</StyledTableCell>
									<StyledTableCell className='text-dark bg-light' align='center'>
										Last Salary
									</StyledTableCell>
									<StyledTableCell className='text-dark bg-light' align='center'>
										Reason To Left
									</StyledTableCell>
									<StyledTableCell className='text-dark bg-light' align='center'>
										From
									</StyledTableCell>
									<StyledTableCell className='text-dark bg-light' align='center'>
										To
									</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{!experience || !experience.length ? (
									<span>Not Found</span>
								) : (
									experience.map((el, i) => (
										<StyledTableRow>
											<StyledTableCell className='text-dark' align='center'>
												{i + 1}
											</StyledTableCell>
											<StyledTableCell className='text-dark' align='center'>
												{el.companyName}
											</StyledTableCell>
											<StyledTableCell className='text-dark' align='center'>
												{el.companyAddress}
											</StyledTableCell>
											<StyledTableCell className='text-dark' align='center'>
												{el.lastSalary}
											</StyledTableCell>
											<StyledTableCell className='text-dark' align='center'>
												{el.reasonOfLeft}
											</StyledTableCell>
											<StyledTableCell className='text-dark' align='center'>
												{el.from}
											</StyledTableCell>
											<StyledTableCell className='text-dark' align='center'>
												{el.to}
											</StyledTableCell>
										</StyledTableRow>
									))
								)}
							</TableBody>
						</Table>
					</TableContainer>
				</div>
			</div>
			<hr style={{ backgroundColor: 'black', paddingTop: 1 }} />
			<div className={classes.table1}>
				<h5 align='left' style={{ marginTop: 30, textDecoration: 'underline' }}>
					For Office Use Only
				</h5>
				<Grid container spacing={1} style={{ marginTop: 15, textAlign: 'left' }}>
					<Grid item lg={2} md={2} sm={2} xs={2}>
						<p style={{ fontWeight: 'bold' }}>Date Of Interviewed</p>
					</Grid>
					<Grid item lg={1} md={1} sm={1} xs={1}>
						<p>{officeUse?.dateOfInterviewed}</p>
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
					<Grid item lg={2} md={2} sm={2} xs={2}>
						<p style={{ fontWeight: 'bold' }}>Remarks</p>
					</Grid>
					<Grid item lg={3} md={3} sm={3} xs={3}>
						<p>{officeUse?.remarks}</p>
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
					<Grid item lg={3} md={3} sm={3} xs={3}>
						<p style={{ fontWeight: 'bold' }}>Recommended For Employment</p>
					</Grid>
					<Grid item lg={1} md={1} sm={1} xs={1}>
						<p>{officeUse?.recommended}</p>
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
					<Grid item lg={2} md={2} sm={2} xs={2}>
						<p style={{ fontWeight: 'bold' }}>Job Title</p>
					</Grid>
					<Grid item lg={3} md={3} sm={3} xs={3}>
						<p>{officeUse?.jobTitle}</p>
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
					<Grid item lg={3} md={3} sm={3} xs={3}>
						<p style={{ fontWeight: 'bold' }}>Recommended Salary</p>
					</Grid>
					<Grid item lg={2} md={2} sm={2} xs={2}>
						<p>{officeUse?.recommendedSalary}</p>
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
					<Grid item lg={3} md={3} sm={3} xs={3}>
						<p style={{ fontWeight: 'bold' }}>Recommendations Approved</p>
					</Grid>
					<Grid item lg={2} md={2} sm={2} xs={2}>
						<p>{officeUse?.approved}</p>
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
			</div>
			<Grid container spacing={1} style={{ marginTop: 150, }} >
				<Grid item lg={2} md={2} sm={2} xs={2}>
					<hr style={{ backgroundColor: 'black', paddingTop: 2 }} />
					<p style={{ marginTop: -10, fontSize: 11, fontWeight: 'bold' }}>
						Applicant Signature
					</p>
				</Grid>
				<Grid item lg={1} md={1} sm={1} xs={1}></Grid>
				<Grid item lg={2} md={2} sm={2} xs={2}>
					<hr style={{ backgroundColor: 'black', paddingTop: 2 }} />
					<p style={{ marginTop: -10, fontSize: 11, fontWeight: 'bold' }}>
						Interviewer Signature
					</p>
				</Grid>
				<Grid item lg={1} md={1} sm={1} xs={1}></Grid>
				<Grid item lg={2} md={2} sm={2} xs={2}>
					<hr style={{ backgroundColor: 'black', paddingTop: 2 }} />
					<p style={{ marginTop: -10, fontSize: 11, fontWeight: 'bold' }}>
						Approved By
					</p>
				</Grid>
				<Grid item lg={1} md={1} sm={1} xs={1}></Grid>
				<Grid item lg={2} md={2} sm={2} xs={2}>
					<hr style={{ backgroundColor: 'black', paddingTop: 2 }} />
					<p style={{ marginTop: -10, fontSize: 11, fontWeight: 'bold' }}>
						Date of Approval
					</p>
				</Grid>
			</Grid>
		</div>
	);
};

export default PrintEmpDetails;
