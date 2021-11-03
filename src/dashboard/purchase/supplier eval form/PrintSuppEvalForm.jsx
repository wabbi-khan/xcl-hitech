import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '../../../components/utils/Button';
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

const PrintSuppEvalForm = () => {
	const classes = useStyles();
	// const description = location.state.description;

	const date = new Date();
	const currDate = date.getDate();
	const months = date.getMonth() + 1;
	const years = date.getFullYear();
	const fullDate = `${currDate} / ${months} / ${years}`;

	return (
		<div className="">
			<div className="container text-center" style={{ marginTop: '2rem' }}>
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
								// marginLeft: 'auto',
								// paddingRight: '5px',
								// marginRight: '-3rem'
							}}
						>
							<h6>FM-21</h6>
							<h6>Issue.02</h6>
						</div>
					</div>
				</div>
				<h4
					className="mt-4"
					style={{
						textDecoration: 'underline',
						fontWeight: 'bold',
						marginBottom: 40,
					}}
				>
					Supplier Evaluation Form
				</h4>
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
							text="Print"
							variant="contained"
							size="small"
							id="printBtn"
							classNames="bg-dark text-light"
							onClick={() => window.print()}
						/>
					</Grid>
				</Grid>
			</div>
			<div
				className="container-fluid text-center mt-3"
				style={{ border: '1px solid black' }}
			>
				<h4>Section - A (COMPANY DATA)</h4>
				<h6>To be completed by the Purchasing Department</h6>
				<div class="row mt-4">
					<div class="offset-4 col-3 col-lg-3 col-md-3">
						<p style={{ fontWeight: 'bold', textAlign: 'left' }}>
							Vendor's Name
						</p>
					</div>
					<div class="col-3 col-lg-3 col-md-3">
						<p style={{ textDecoration: 'underline', textAlign: 'left' }}>
							{}
						</p>
					</div>
				</div>
				<div class="row">
					<div class="offset-4 col-3 col-lg-3 col-md-3">
						<p style={{ fontWeight: 'bold', textAlign: 'left' }}>
							Address
						</p>
					</div>
					<div class="col-3 col-lg-3 col-md-3">
						<p style={{ textDecoration: 'underline', textAlign: 'left' }}>
							{}
						</p>
					</div>
				</div>
				<div class="row">
					<div class="offset-4 col-3 col-lg-3 col-md-3">
						<p style={{ fontWeight: 'bold', textAlign: 'left' }}>
							Contact No.
						</p>
					</div>
					<div class="col-3 col-lg-3 col-md-3">
						<p style={{ textDecoration: 'underline', textAlign: 'left' }}>
							{}
						</p>
					</div>
				</div>
				<div class="row">
					<div class="offset-4 col-3 col-lg-3 col-md-3">
						<p style={{ fontWeight: 'bold', textAlign: 'left' }}>
							Contact Person
						</p>
					</div>
					<div class="col-3 col-lg-3 col-md-3">
						<p style={{ textDecoration: 'underline', textAlign: 'left' }}>
							{}
						</p>
					</div>
				</div>
				<div class="row">
					<div class="offset-4 col-3 col-lg-3 col-md-3">
						<p style={{ fontWeight: 'bold', textAlign: 'left' }}>
							Product / Services
						</p>
					</div>
					<div class="col-3 col-lg-3 col-md-3">
						<p style={{ textDecoration: 'underline', textAlign: 'left' }}>
							{}
						</p>
					</div>
				</div>
				<div class="row">
					<div class="offset-4 col-3 col-lg-3 col-md-3">
						<p style={{ fontWeight: 'bold', textAlign: 'left' }}>
							Supplier Status
						</p>
					</div>
					<div class="col-3 col-lg-3 col-md-3">
						<p style={{ textDecoration: 'underline', textAlign: 'left' }}>
							{}
						</p>
					</div>
				</div>
			</div>
			<div className="container-fluid text-center mt-4" style={{}}>
				<h4>Section - B (QUALITY SYSTEM)</h4>
				<h6 style={{ textDecoration: 'underline' }}>
					Information to be provided by the supplier
				</h6>
				<div class="row mt-5">
					<div class="offset-1 col-6">
						<p style={{ textAlign: 'left', fontSize: '13px' }}>
							1. Are you registered to ISO 9000/API? <br /> If so, please
							supply photocopy of your certificate. No further
							evaluation. <br />
							If the answer to (1) is "No", please answer following
							questions
						</p>
					</div>
					<div class="offset-2 col-3 mt-2">
						<div style={{ display: 'flex' }}>
							<Button
								variant="outlined"
								// color='primary'
								text="Yes"
								size="small"
								classNames="btn yesBtn btn-outline-dark"
							/>
							<Button
								variant="outlined"
								// color='primary'
								text="No"
								size="small"
								classNames="btn yesBtn btn-outline-dark"
								style={{ marginLeft: '0.5rem' }}
							/>
						</div>
					</div>
				</div>
				<div class="row mt-2">
					<div class="offset-1 col-6">
						<p style={{ textAlign: 'left', fontSize: '13px' }}>
							2. Do you have Quality Management / Quality Assurance
							System?
						</p>
					</div>
					<div class="offset-2 col-3">
						<div style={{ display: 'flex' }}>
							<Button
								variant="outlined"
								// color='primary'
								text="Yes"
								size="small"
								classNames="btn yesBtn btn-outline-dark"
							/>
							<Button
								variant="outlined"
								// color='primary'
								text="No"
								size="small"
								classNames="btn yesBtn btn-outline-dark"
								style={{ marginLeft: '0.5rem' }}
							/>
						</div>
					</div>
				</div>
				<div class="row mt-1">
					<div class="offset-1 col-6">
						<p style={{ textAlign: 'left', fontSize: '13px' }}>
							3. Do you perform inspection and testing at:
						</p>
					</div>
					{/* <div class='offset-2 col-3'>
                        <div style={{ display: 'flex', }}>
                            <Button
                                variant='outlined'
                                // color='primary'
                                text='Yes'
                                size='small'
                                classNames='btn yesBtn btn-outline-dark'
                            />
                            <Button
                                variant='outlined'
                                // color='primary'
                                text='No'
                                size='small'
                                classNames='btn yesBtn btn-outline-dark'
                                style={{ marginLeft: '0.5rem' }}
                            />
                        </div>
                    </div> */}
				</div>
				<div class="row" style={{ marginLeft: '0.5rem' }}>
					<div class="offset-1 col-6">
						<p style={{ textAlign: 'left', fontSize: '13px' }}>
							a. Incoming stage?
						</p>
					</div>
					<div class="offset-2 col-3">
						<div style={{ display: 'flex' }}>
							<Button
								variant="outlined"
								// color='primary'
								text="Yes"
								size="small"
								classNames="btn yesBtn btn-outline-dark"
							/>
							<Button
								variant="outlined"
								// color='primary'
								text="No"
								size="small"
								classNames="btn yesBtn btn-outline-dark"
								style={{ marginLeft: '0.5rem' }}
							/>
						</div>
					</div>
				</div>
				<div
					class="row"
					style={{ marginLeft: '0.5rem', marginTop: '0.4rem' }}
				>
					<div class="offset-1 col-6">
						<p style={{ textAlign: 'left', fontSize: '13px' }}>
							b. In process state?
						</p>
					</div>
					<div class="offset-2 col-3">
						<div style={{ display: 'flex' }}>
							<Button
								variant="outlined"
								// color='primary'
								text="Yes"
								size="small"
								classNames="btn yesBtn btn-outline-dark"
							/>
							<Button
								variant="outlined"
								// color='primary'
								text="No"
								size="small"
								classNames="btn yesBtn btn-outline-dark"
								style={{ marginLeft: '0.5rem' }}
							/>
						</div>
					</div>
				</div>
				<div
					class="row"
					style={{ marginLeft: '0.5rem', marginTop: '0.4rem' }}
				>
					<div class="offset-1 col-6">
						<p style={{ textAlign: 'left', fontSize: '13px' }}>
							c. Final state?
						</p>
					</div>
					<div class="offset-2 col-3">
						<div style={{ display: 'flex' }}>
							<Button
								variant="outlined"
								// color='primary'
								text="Yes"
								size="small"
								classNames="btn yesBtn btn-outline-dark"
							/>
							<Button
								variant="outlined"
								// color='primary'
								text="No"
								size="small"
								classNames="btn yesBtn btn-outline-dark"
								style={{ marginLeft: '0.5rem' }}
							/>
						</div>
					</div>
				</div>
				<div class="row mt-4">
					<div class="offset-1 col-6">
						<p style={{ textAlign: 'left', fontSize: '13px' }}>
							4. How do you control Non-Conforming products?
						</p>
					</div>
				</div>
				<div class="row">
					<div class="offset-1 col-9">
						<p
							style={{
								textAlign: 'left',
								fontSize: '13px',
								textDecoration: 'underline',
							}}
						>
							{}
						</p>
					</div>
				</div>
				<div class="row mt-3">
					<div class="offset-1 col-6">
						<p style={{ textAlign: 'left', fontSize: '13px' }}>
							5. How do you rate the skills and training of your
							personnel?
						</p>
					</div>
					<div class="offset-1 col-3">
						<div
							style={{ display: 'flex', justifyContent: 'space-evenly' }}
						>
							<Button
								variant="outlined"
								// color='primary'
								text="Low"
								size="small"
								classNames="btn yesBtn btn-outline-dark"
							/>
							<Button
								variant="outlined"
								// color='primary'
								text="Medium"
								size="small"
								style={{ marginLeft: '0.3rem' }}
								classNames="btn yesBtn btn-outline-dark"
							/>
							<Button
								variant="outlined"
								// color='primary'
								text="High"
								size="small"
								classNames="btn yesBtn btn-outline-dark"
								style={{ marginLeft: '0.3rem' }}
							/>
						</div>
					</div>
				</div>
				<div class="row mt-3">
					<div class="offset-1 col-6">
						<p style={{ textAlign: 'left', fontSize: '13px' }}>
							6. Do you have a customer complaint system?
						</p>
					</div>
					<div class="offset-2 col-3">
						<div style={{ display: 'flex' }}>
							<Button
								variant="outlined"
								// color='primary'
								text="Yes"
								size="small"
								classNames="btn yesBtn btn-outline-dark"
							/>
							<Button
								variant="outlined"
								// color='primary'
								text="No"
								size="small"
								classNames="btn yesBtn btn-outline-dark"
								style={{ marginLeft: '0.5rem' }}
							/>
						</div>
					</div>
				</div>
				<div class="row mt-1">
					<div class="offset-1 col-6">
						<p style={{ textAlign: 'left', fontSize: '13px' }}>
							7. Who are your major customers?
						</p>
					</div>
				</div>
				<div class="row">
					<div class="offset-1 col-9">
						<p
							style={{
								textAlign: 'left',
								fontSize: '13px',
								textDecoration: 'underline',
							}}
						>
							{}
						</p>
					</div>
				</div>
				<div class="row mt-1">
					<div class="offset-1 col-6">
						<p style={{ textAlign: 'left', fontSize: '13px' }}>
							8. Information provided by:
						</p>
					</div>
				</div>
				<div class="row mt-1 " style={{ textAlign: 'center' }}>
					<div class="offset-4 col-3">
						<p
							style={{
								textAlign: 'left',
								fontSize: '14px',
								textDecoration: 'underline',
							}}
						>
							<span
								style={{ fontWeight: 'bold', textDecoration: 'none' }}
							>
								Name:
							</span>{' '}
							{}
							{/* <span style={{ fontWeight: 'bold', marginLeft: '12rem' }}>Position:</span> { } Manager */}
							{/* <br /> <span style={{ textDecoration: 'none !important', marginLeft: '2rem' }}>Name</span> */}
						</p>
						{/* <p>Name</p> */}
					</div>
					<div class="col-3">
						<p
							style={{
								textAlign: 'left',
								fontSize: '14px',
								textDecoration: 'underline',
							}}
						>
							<span style={{ fontWeight: 'bold' }}>Position:</span> {}
						</p>
					</div>
				</div>
				{/* <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        marginTop: '1rem',
                        // flexDirection: 'column',
                        // border: '2px solid #333',
                        // width: '100px',
                        // marginLeft: 'auto',
                        // paddingRight: '5px',
                        // marginRight: '-3rem'
                    }}>
                    <p style={{ textAlign: 'left', fontSize: '12px' }}>
                        4. Do you have Quality Management / Quality Assurance System?
                    </p>
                    <div style={{ display: 'flex', marginLeft: '7rem', marginTop: '-1.5rem' }}>
                        <Button
                            variant='outlined'
                            // color='primary'
                            text='Yes'
                            size='small'
                            classNames='btn yesBtn btn-outline-dark'
                        />
                        <Button
                            variant='outlined'
                            // color='primary'
                            text='No'
                            size='small'
                            classNames='btn yesBtn btn-outline-dark'
                            style={{ marginLeft: '0.5rem' }}
                        />
                    </div>
                </div> */}
			</div>
			<div
				className="container-fluid text-center"
				style={{ marginTop: '10rem' }}
			>
				<h4>Section - C</h4>
				<h3>PAST PERFORMANCE</h3>
				<h6>To be completed by the Purchasing Department</h6>
				<div class="row" style={{ marginTop: '1rem' }}>
					<div class="offset-1 col-6">
						<p style={{ textAlign: 'left', fontSize: '13px' }}>
							1. For how long has the supplier been providing
							goods/services to the company?
						</p>
					</div>
				</div>
				<div class="row">
					<div class="offset-1 col-9">
						<p
							style={{
								textAlign: 'left',
								fontSize: '13px',
								textDecoration: 'underline',
							}}
						>
							{}
						</p>
					</div>
				</div>
				<div class="row mt-2">
					<div class="offset-1 col-6">
						<p style={{ textAlign: 'left', fontSize: '13px' }}>
							2. Has the vendor regularly met his commitment to the
							company with respect to:
						</p>
					</div>
				</div>
				<div class="row" style={{ marginLeft: '0.5rem' }}>
					<div class="offset-1 col-6">
						<p style={{ textAlign: 'left', fontSize: '13px' }}>
							a. Quality requirements?
						</p>
					</div>
					<div class="offset-2 col-3">
						<div style={{ display: 'flex' }}>
							<Button
								variant="outlined"
								// color='primary'
								text="Yes"
								size="small"
								classNames="btn yesBtn btn-outline-dark"
							/>
							<Button
								variant="outlined"
								// color='primary'
								text="No"
								size="small"
								classNames="btn yesBtn btn-outline-dark"
								style={{ marginLeft: '0.5rem' }}
							/>
						</div>
					</div>
				</div>
				<div
					class="row"
					style={{ marginLeft: '0.5rem', marginTop: '0.4rem' }}
				>
					<div class="offset-1 col-6">
						<p style={{ textAlign: 'left', fontSize: '13px' }}>
							b. On time delivery?
						</p>
					</div>
					<div class="offset-2 col-3">
						<div style={{ display: 'flex' }}>
							<Button
								variant="outlined"
								// color='primary'
								text="Yes"
								size="small"
								classNames="btn yesBtn btn-outline-dark"
							/>
							<Button
								variant="outlined"
								// color='primary'
								text="No"
								size="small"
								classNames="btn yesBtn btn-outline-dark"
								style={{ marginLeft: '0.5rem' }}
							/>
						</div>
					</div>
				</div>
				<div
					class="row"
					style={{ marginLeft: '0.5rem', marginTop: '0.4rem' }}
				>
					<div class="offset-1 col-6">
						<p style={{ textAlign: 'left', fontSize: '13px' }}>
							c. After sales services?
						</p>
					</div>
					<div class="offset-2 col-3">
						<div style={{ display: 'flex' }}>
							<Button
								variant="outlined"
								// color='primary'
								text="Yes"
								size="small"
								classNames="btn yesBtn btn-outline-dark"
							/>
							<Button
								variant="outlined"
								// color='primary'
								text="No"
								size="small"
								classNames="btn yesBtn btn-outline-dark"
								style={{ marginLeft: '0.5rem' }}
							/>
						</div>
					</div>
				</div>
				<div class="row mt-3">
					<div class="offset-1 col-6">
						<p style={{ textAlign: 'left', fontSize: '13px' }}>
							3. Is the supplier prompt in reply to enquiries?
						</p>
					</div>
					<div class="offset-2 col-3">
						<div style={{ display: 'flex' }}>
							<Button
								variant="outlined"
								// color='primary'
								text="Yes"
								size="small"
								classNames="btn yesBtn btn-outline-dark"
							/>
							<Button
								variant="outlined"
								// color='primary'
								text="No"
								size="small"
								classNames="btn yesBtn btn-outline-dark"
								style={{ marginLeft: '0.5rem' }}
							/>
						</div>
					</div>
				</div>
				<div class="row mt-2">
					<div class="offset-1 col-6">
						<p style={{ textAlign: 'left', fontSize: '13px' }}>
							4. Does the vendor enjoy good market reputation?
						</p>
					</div>
					<div class="offset-2 col-3">
						<div style={{ display: 'flex' }}>
							<Button
								variant="outlined"
								// color='primary'
								text="Yes"
								size="small"
								classNames="btn yesBtn btn-outline-dark"
							/>
							<Button
								variant="outlined"
								// color='primary'
								text="No"
								size="small"
								classNames="btn yesBtn btn-outline-dark"
								style={{ marginLeft: '0.5rem' }}
							/>
						</div>
					</div>
				</div>
			</div>
			<div
				className="container-fluid text-center"
				style={{ marginTop: '7rem' }}
			>
				<h4>Section - D</h4>
				<h4>ON-SITE SURVEY</h4>
				<h6>To be completed by Auditor/Representative</h6>
				<div class="row mt-4">
					<div class="offset-1 col-6">
						<p style={{ textAlign: 'left', fontSize: '13px' }}>
							1. Does the supplier follow set procedures for performing
							work?
						</p>
					</div>
					<div class="offset-2 col-3">
						<div style={{ display: 'flex' }}>
							<Button
								variant="outlined"
								// color='primary'
								text="Yes"
								size="small"
								classNames="btn yesBtn btn-outline-dark"
							/>
							<Button
								variant="outlined"
								// color='primary'
								text="No"
								size="small"
								classNames="btn yesBtn btn-outline-dark"
								style={{ marginLeft: '0.5rem' }}
							/>
						</div>
					</div>
				</div>
				<div class="row mt-2">
					<div class="offset-1 col-6">
						<p style={{ textAlign: 'left', fontSize: '13px' }}>
							2. Are machines sufficient / adequate to produce required
							quality product?
						</p>
					</div>
					<div class="offset-2 col-3">
						<div style={{ display: 'flex' }}>
							<Button
								variant="outlined"
								// color='primary'
								text="Yes"
								size="small"
								classNames="btn yesBtn btn-outline-dark"
							/>
							<Button
								variant="outlined"
								// color='primary'
								text="No"
								size="small"
								classNames="btn yesBtn btn-outline-dark"
								style={{ marginLeft: '0.5rem' }}
							/>
						</div>
					</div>
				</div>
				<div class="row mt-2">
					<div class="offset-1 col-6">
						<p style={{ textAlign: 'left', fontSize: '13px' }}>
							3. Are storage areas / conditions adequate to safeguard the
							product against deterioration?
						</p>
					</div>
					<div class="offset-2 col-3">
						<div style={{ display: 'flex' }}>
							<Button
								variant="outlined"
								// color='primary'
								text="Yes"
								size="small"
								classNames="btn yesBtn btn-outline-dark"
							/>
							<Button
								variant="outlined"
								// color='primary'
								text="No"
								size="small"
								classNames="btn yesBtn btn-outline-dark"
								style={{ marginLeft: '0.5rem' }}
							/>
						</div>
					</div>
				</div>
				<div class="row mt-2">
					<div class="offset-1 col-6">
						<p style={{ textAlign: 'left', fontSize: '13px' }}>
							4. Are the management and workers committed to quality?
						</p>
					</div>
					<div class="offset-2 col-3">
						<div style={{ display: 'flex' }}>
							<Button
								variant="outlined"
								// color='primary'
								text="Yes"
								size="small"
								classNames="btn yesBtn btn-outline-dark"
							/>
							<Button
								variant="outlined"
								// color='primary'
								text="No"
								size="small"
								classNames="btn yesBtn btn-outline-dark"
								style={{ marginLeft: '0.5rem' }}
							/>
						</div>
					</div>
				</div>
				<div class="row mt-2">
					<div class="offset-1 col-6">
						<p style={{ textAlign: 'left', fontSize: '13px' }}>
							5. Does the supplier follow written specifications /
							standards?
						</p>
					</div>
					<div class="offset-2 col-3">
						<div style={{ display: 'flex' }}>
							<Button
								variant="outlined"
								// color='primary'
								text="Yes"
								size="small"
								classNames="btn yesBtn btn-outline-dark"
							/>
							<Button
								variant="outlined"
								// color='primary'
								text="No"
								size="small"
								classNames="btn yesBtn btn-outline-dark"
								style={{ marginLeft: '0.5rem' }}
							/>
						</div>
					</div>
				</div>
				<div class="row mt-1">
					<div class="offset-1 col-6">
						<p style={{ textAlign: 'left', fontSize: '13px' }}>
							6. Visit conducted by:
						</p>
					</div>
				</div>
				<div class="row mt-1 " style={{ textAlign: 'center' }}>
					<div class="offset-4 col-3">
						<p
							style={{
								textAlign: 'left',
								fontSize: '14px',
								textDecoration: 'underline',
							}}
						>
							<span
								style={{ fontWeight: 'bold', textDecoration: 'none' }}
							>
								Name:
							</span>{' '}
							{}
							{/* <span style={{ fontWeight: 'bold', marginLeft: '12rem' }}>Position:</span> { } Manager */}
							{/* <br /> <span style={{ textDecoration: 'none !important', marginLeft: '2rem' }}>Name</span> */}
						</p>
						{/* <p>Name</p> */}
					</div>
					<div class="col-3">
						<p
							style={{
								textAlign: 'left',
								fontSize: '14px',
								textDecoration: 'underline',
							}}
						>
							<span style={{ fontWeight: 'bold' }}>Date:</span> {}
						</p>
					</div>
				</div>
			</div>
			<div
				className="container-fluid text-center"
				style={{ marginTop: '2.5rem' }}
			>
				<h4>Section - E</h4>
				<h5>SAMPLE APPROVAL</h5>
				<h5>(TO BE FILLED BY QUALITY ASSURANCE DEPARTMENT)</h5>
				<div class="row" style={{ marginTop: '1rem' }}>
					<div class="offset-1 col-3">
						<p style={{ textAlign: 'left', fontSize: '13px' }}>
							1. No. of Samples Provided:
						</p>
					</div>
					<div class="offset-4 col-4">
						<p
							style={{
								textAlign: 'left',
								fontSize: '13px',
								textDecoration: 'underline',
							}}
						>
							{}
						</p>
					</div>
				</div>
				<div class="row" style={{ marginTop: '1rem' }}>
					<div class="offset-1 col-6">
						<p style={{ textAlign: 'left', fontSize: '13px' }}>
							2. Results of Testing / Inspection:
						</p>
					</div>
				</div>
				<div class="row">
					<div class="offset-1 col-9">
						<p
							style={{
								textAlign: 'left',
								fontSize: '13px',
								textDecoration: 'underline',
							}}
						>
							{}
						</p>
					</div>
				</div>
				<div class="row">
					<div class="offset-1 col-3">
						<p style={{ textAlign: 'left', fontSize: '13px' }}>
							3. Report Reference No:
						</p>
					</div>
					<div class="offset-4 col-4">
						<p
							style={{
								textAlign: 'left',
								fontSize: '13px',
								textDecoration: 'underline',
							}}
						>
							{}
						</p>
					</div>
				</div>
				<div class="row">
					<div class="offset-1 col-3">
						<p style={{ textAlign: 'left', fontSize: '13px' }}>
							4. Inspection By:
						</p>
					</div>
					<div class="offset-4 col-4">
						<p
							style={{
								textAlign: 'left',
								fontSize: '13px',
								textDecoration: 'underline',
							}}
						>
							{}
						</p>
					</div>
				</div>
				<div class="row">
					<div class="offset-1 col-3">
						<p style={{ textAlign: 'left', fontSize: '13px' }}>
							5. Date:
						</p>
					</div>
					<div class="offset-4 col-4">
						<p
							style={{
								textAlign: 'left',
								fontSize: '13px',
								textDecoration: 'underline',
							}}
						>
							{}
						</p>
					</div>
				</div>
				<div class="row">
					<div class="offset-1 col-3">
						<p style={{ textAlign: 'left', fontSize: '13px' }}>
							6. Vendor Rating Method:
						</p>
					</div>
				</div>
				<div class="row">
					<div class="offset-2 col-5">
						<p style={{ textAlign: 'left', fontSize: '13px' }}>
							6.1 Quality: (Total lots passes / Total lots supplied + Qty
							Passes / Qty Supplied) / 2x60 =
						</p>
					</div>
					<div class="offset-1 col-4">
						<p style={{ textAlign: 'left', fontSize: '13px' }}>{}60</p>
					</div>
				</div>
				<div class="row">
					<div class="offset-2 col-5">
						<p style={{ textAlign: 'left', fontSize: '13px' }}>
							6.2 On Time Delivery: Marks Deducted @ 3 Marks Per Day Late
							Delivery =
						</p>
					</div>
					<div class="offset-1 col-4">
						<p style={{ textAlign: 'left', fontSize: '13px' }}>{}30</p>
					</div>
				</div>
				<div class="row">
					<div class="offset-2 col-5">
						<p style={{ textAlign: 'left', fontSize: '13px' }}>
							6.3 Price: Maximum Marks (i.e. 10) / (Unit price / lowest
							unit price) =
						</p>
					</div>
					<div class="offset-1 col-4">
						<p style={{ textAlign: 'left', fontSize: '13px' }}>{}10</p>
					</div>
				</div>
			</div>
			<div
				className="container-fluid text-center"
				style={{ marginTop: '2.5rem' }}
			>
				<h4>Section - F</h4>
				<h5>
					DECISION(To be completed by Director Finanace, Procurement and
					Admin)
				</h5>
				<div class="row" style={{ border: '1px solid black' }}>
					<div class="col-6" style={{ borderRight: '1px solid black' }}>
						<h6 style={{ marginTop: '0.7rem', fontWeight: 'bold' }}>
							Decision
						</h6>
					</div>
					<div class="col-6">
						<p style={{ marginTop: '0.7rem' }}>{}</p>
					</div>
				</div>
				<div
					class="row"
					style={{ border: '1px solid black', borderTop: 'none' }}
				>
					<div class="col-6" style={{ borderRight: '1px solid black' }}>
						<h6 style={{ marginTop: '0.7rem', fontWeight: 'bold' }}>
							Basis For Approval
						</h6>
					</div>
					<div class="col-6">
						<p style={{ marginTop: '0.7rem' }}></p>
					</div>
				</div>
				<div
					class="row"
					style={{ border: '1px solid black', borderTop: 'none' }}
				>
					<div class="col-6" style={{ borderRight: '1px solid black' }}>
						<h6 style={{ marginTop: '0.7rem', fontWeight: 'bold' }}>
							Approved By & Date
						</h6>
					</div>
					<div class="col-6">
						<p style={{ marginTop: '0.7rem' }}></p>
					</div>
				</div>
				<div
					class="row"
					style={{ border: '1px solid black', borderTop: 'none' }}
				>
					<div class="col-6" style={{ borderRight: '1px solid black' }}>
						<h6 style={{ marginTop: '0.7rem', fontWeight: 'bold' }}>
							Next Review
						</h6>
					</div>
					<div class="col-6">
						<p style={{ marginTop: '0.7rem' }}></p>
					</div>
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

export default withRouter(PrintSuppEvalForm);
