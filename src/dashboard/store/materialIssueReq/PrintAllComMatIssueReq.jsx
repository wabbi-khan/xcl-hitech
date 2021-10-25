import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { fetchSingleRequisitionAction } from '../../../services/action/PurchaseReqAction';

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
	table: {
		minWidth: 600,
	},
	dataTable: {
		marginTop: 20,
	},
	ckeckBox: {
		[theme.breakpoints.up('md')]: {
			marginLeft: 7,
		},
		[theme.breakpoints.down('sm')]: {
			marginLeft: 0,
		},
	},
}));

const PrintAllComMatIssueReq = (props) => {
	const classes = useStyles();
	const id = props.match.params.id;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchSingleRequisitionAction(id));
	}, [dispatch, id]);

	return (
		<div>
			<div className="container-fluid text-center">
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
								marginTop: '1rem',
								// marginLeft: 'auto',
								// paddingRight: '5px',
								// marginRight: '-3rem'
							}}
						>
							<h6>FM-38</h6>
							<h6>Issue.02</h6>
						</div>
					</div>
				</div>
				{/* <h4>Hi-Tech Pipe & Engineering Industries</h4>
                <h6>Plot No X-22, Site Area Kotri</h6>
                <p>Ph-No 022-3870614-5, Fax: 022-3870606</p> */}
				<h5
					className=""
					style={{ textDecorationLine: 'underline', fontWeight: 'bold' }}
				>
					MATERIAL ISSUE REQUISITION
				</h5>
			</div>
			<div class="container-fluid mt-5">
				<div class="row">
					<div
						class="col-lg-4 col-md-4 col-sm-4"
						style={{ display: 'flex', alignItems: 'center' }}
					>
						<p style={{ fontWeight: 'bold' }}>MIR No.</p>
						<div style={{ marginLeft: '1rem' }}>
							<p>
								{}
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
					{/* <div class='offset-lg-4 offset-md-4 offset-sm-4 col-lg-4 col-md-4 col-sm-4' style={{ display: 'flex', alignItems: 'center' }}>
                        <p style={{ fontWeight: 'bold', }}>Date:</p>
                        <div style={{ marginLeft: '1rem', }}>
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
                    </div> */}
				</div>
			</div>
			<div className={classes.dataTable}>
				<table class="table table-bordered border-dark table-responsive table-hover text-center">
					<thead class="thead-inverse">
						<tr style={{ textAlign: 'left' }}>
							<th colspan="2">Date: </th>
							<th colspan="3">Department: </th>
							<th colspan="5">Purpose(Place of use)</th>
						</tr>
						<tr>
							<th rowspan="2">S/No.</th>
							<th rowspan="2">Item Code</th>
							<th rowspan="2">Cost Centre</th>
							<th rowspan="2">Description of Material</th>
							<th rowspan="2">Unit</th>
							<th colspan="4">Quality</th>
							<th rowspan="2">Remarks</th>
						</tr>
						<tr>
							<th>Required</th>
							<th>Issued</th>
							<th>Return</th>
							<th>Phy. Balance</th>
						</tr>
					</thead>
					<tbody>
						{/* First Row */}
						{/* {
							!vendors ? (
								<span>Data Not Found</span>
							) : (
								vendors?.map((el, i) => ( */}
						<tr>
							<td>{}</td>
							<td>{}</td>
							<td>{}</td>
							<td>{}</td>
							<td>{}</td>
							<td>{}</td>
							<td>{}</td>
							<td>{}</td>
							<td>{}</td>
							<td>{}</td>
							{/* <td>{el.name}</td> */}
							{/* <td>{el.name}</td> */}
							{/* <td>{!el.contactPerson ? null : el.contactPerson}</td> */}
							{/* <td>
											{el.materials?.map((el) => (
												<p style={{ margin: 0, padding: 0 }}>{el?.name}</p>
											))}
										</td> */}
						</tr>
						{/* 		)) */}
						{/* 	) */}
						{/* } */}
						<tr>
							<th rowspan="2">Sign</th>
							<th>Requested By</th>
							<th>Authorized By</th>
							<th>Received By / Employee Number</th>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td></td>
							<td></td>
							<td></td>
							<th colspan="3">Issued By</th>
							<th colspan="2">Posted By</th>
							<th colspan="2">Manager Store</th>
						</tr>
						<tr>
							<th>Date:</th>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td colspan="2"></td>
							<td colspan="2"></td>
							<td colspan="2"></td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="container-fluid ">
				<div class="row">
					<div class="col-lg-8 col-md-8 col-sm-8">
						<p style={{ fontSize: '12px', fontWeight: 'bold' }}>
							INSTRUCTION:
						</p>
						<p
							style={{
								fontSize: '11px',
								fontWeight: 'bold',
								marginTop: '-12px',
							}}
						>
							1. Hi Tech Item Code. Cost Centre Number, Quantities /
							Required / Return & Replacement Status must be stated
							clearly.
						</p>
						<p
							style={{
								fontSize: '11px',
								fontWeight: 'bold',
								marginTop: '-12px',
							}}
						>
							2. There must not be any alternation or overwriting to any
							word of the figure of an MIR, except where the unit in
							which the stock records are maintained in such cases
							quantities and unit be changed by Store Officer.
						</p>
						<div class="d-flex align-items-center">
							<h6>DISTRIBUTION: </h6>
							<div style={{ marginLeft: '2rem' }}>
								<p style={{ marginTop: 10 }}>White = "Main Store"</p>
								<p style={{ marginTop: -10 }}>Yellow = "Originator"</p>
							</div>
						</div>
					</div>
					<div class="col-lg-4 col-md-4 col-sm-4">
						<div
							class="text-center "
							style={{ border: '1px solid black' }}
						>
							<h6
								style={{
									borderBottom: '1px solid black',
									padding: '0.7rem',
								}}
							>
								RULES
							</h6>
							{/* <div style={{ display: 'flex', gap: '.5rem', marginLeft: '.5rem',  }}>
                                <p>Received: </p>
                                <input type="checkbox" style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '7px' }} />
                            </div> */}
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
								}}
							>
								<div
									style={{
										display: 'flex',
										gap: '.5rem',
										marginLeft: '.5rem',
									}}
								>
									<p>Received: </p>
									<input
										type="checkbox"
										style={{
											marginLeft: 'auto',
											marginRight: 'auto',
											marginTop: '7px',
										}}
									/>
								</div>
								<p
									style={{ marginRight: '.5rem', fontWeight: '600' }}
								></p>
							</div>
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
								}}
							>
								<div
									style={{
										display: 'flex',
										gap: '.5rem',
										marginLeft: '.5rem',
									}}
								>
									<p>Consumable: </p>
									<input
										type="checkbox"
										style={{
											marginLeft: 'auto',
											marginRight: 'auto',
											marginTop: '7px',
										}}
									/>
								</div>
								<p style={{ marginRight: '.5rem', fontWeight: '600' }}>
									(Not Received)
								</p>
							</div>
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
								}}
							>
								<div
									style={{
										display: 'flex',
										gap: '.5rem',
										marginLeft: '.5rem',
									}}
								>
									<p>Pending: </p>
									<input
										type="checkbox"
										style={{
											marginLeft: 'auto',
											marginRight: 'auto',
											marginTop: '7px',
										}}
									/>
								</div>
								<p style={{ marginRight: '.5rem', fontWeight: '600' }}>
									(Not Received)
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* <div className='container-fluid text-center mt-5'>
                <div className='row'>
                    <div className='col-lg-3 col-md-3 col-sm-3 mt-4'>
                        <hr
                            style={{
                                border: '1px solid green',
                                borderColor: 'black',
                                marginTop: 0,
                            }}
                        />
                        <p style={{ marginTop: -10 }}>Initiated By</p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-lg-3 col-md-3 col-sm-3 mt-4'>
                        <hr
                            style={{
                                border: '1px solid green',
                                borderColor: 'black',
                                marginTop: 0,
                            }}
                        />
                        <p style={{ marginTop: -10 }}>Department Head</p>
                    </div>
                    <div className='offset-lg-6 offset-md-6 offset-sm-6 col-lg-3 col-md-3 col-sm-3 mt-4'>
                        <hr
                            style={{
                                border: '1px solid green',
                                borderColor: 'black',
                                marginTop: 0,
                            }}
                            />
                            <p style={{ marginTop: -10 }}>Approved By</p>
                            </div>
                            </div>
                        </div> */}
			<hr
				style={{
					border: '1px solid green',
					borderColor: 'black',
				}}
			/>
			<div class="text-center">
				<h6>X-22, Extention Area, S.I.T.E., Kotri.</h6>
			</div>
		</div>
	);
};

export default PrintAllComMatIssueReq;
