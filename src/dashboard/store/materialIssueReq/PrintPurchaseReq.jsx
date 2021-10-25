import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
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
}));

const PrintPurchaseReq = (props) => {
	const classes = useStyles();
	const id = props.match.params.id;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchSingleRequisitionAction(id));
	}, [dispatch, id]);

	const { purchaseRequisition } = useSelector(
		(state) => state.purchaseRequisitions
	);

	const date = new Date();
	const currDate = date.getDate();
	const months = date.getMonth() + 1;
	const years = date.getFullYear();
	const fullDate = `${currDate} / ${months} / ${years}`;

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
							<h6>FM-18</h6>
							<h6>Issue.01</h6>
						</div>
					</div>
				</div>
				<h4>Hi-Tech Pipe & Engineering Industries</h4>
				<h6>Plot No X-22, Site Area Kotri</h6>
				<p>Ph-No 022-3870614-5, Fax: 022-3870606</p>
				<h4
					className="pt-3"
					style={{ textDecorationLine: 'underline', fontWeight: 'bold' }}
				>
					PURCHASE REQUISITION
					<br />
					<span style={{ fontSize: '14px' }}>
						{purchaseRequisition?.code}
					</span>
				</h4>
			</div>
			<div class="container-fluid mt-5">
				<div class="row">
					<div
						class="col-lg-4 col-md-4 col-sm-4"
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: '.5rem',
						}}
					>
						<p style={{ fontWeight: 'bold' }}>Department:</p>
						<p
							style={{ fontWeight: 'bold', textDecoration: 'underline' }}
						>
							{purchaseRequisition?.department?.name}
						</p>
					</div>
					<div
						class="offset-lg-4 offset-md-4 offset-sm-4 col-lg-4 col-md-4 col-sm-4"
						style={{ display: 'flex', alignItems: 'center' }}
					>
						<p style={{ fontWeight: 'bold' }}>Date:</p>
						<div style={{ marginLeft: '1rem' }}>
							<p style={{ textDecoration: 'underline' }}>{fullDate}</p>
						</div>
					</div>
				</div>
			</div>
			<div className={classes.dataTable}>
				<table class="table table-bordered border-dark table-responsive table-hover text-center">
					<thead class="thead-inverse">
						<tr>
							<th>S.No.</th>
							<th>Material</th>
							<th>Unit</th>
							<th>Quantity</th>
							<th>Remarks</th>
						</tr>
					</thead>
					<tbody>
						{/* {
							!vendors ? (
								<span>Data Not Found</span>
							) : (
								vendors?.map((el, i) => ( */}
						{purchaseRequisition?.materials?.map((el, i) => (
							<tr>
								<td>{i + 1}</td>
								<td>{el?.material?.name}</td>
								<td>{el?.material?.unit?.name}</td>
								<td>{el?.quantity}</td>
								{/* <td>{el.name}</td> */}
								{/* <td>{el.name}</td> */}
								{/* <td>{!el.contactPerson ? null : el.contactPerson}</td> */}
								{/* <td>
											{el.materials?.map((el) => (
                        <p style={{ margin: 0, padding: 0 }}>{el?.name}</p>
											))}
										</td> */}
								<td>{el?.remarks}</td>
							</tr>
						))}
						{/* 		)) */}
						{/* 	) */}
						{/* } */}
					</tbody>
				</table>
			</div>
			<div className="container-fluid text-center mt-5">
				<div className="row">
					<div className="col-lg-3 col-md-3 col-sm-3 mt-4">
						{/* {purchaseRequisition?.department?.name} */}
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
				<div className="row">
					<div className="col-lg-3 col-md-3 col-sm-3 mt-4">
						<hr
							style={{
								border: '1px solid green',
								borderColor: 'black',
								marginTop: 0,
							}}
						/>
						<p style={{ marginTop: -10 }}>Department Head</p>
					</div>
					<div className="offset-lg-6 offset-md-6 offset-sm-6 col-lg-3 col-md-3 col-sm-3 mt-4">
						<hr
							style={{
								border: '1px solid green',
								borderColor: 'black',
								marginTop: 0,
							}}
						/>
						{/* <hr style={{ backgroundColor: 'black', paddingTop: 2 }} /> */}
						<p style={{ marginTop: -10 }}>Approved By</p>
					</div>
				</div>
			</div>
		</div>
	);
};
//         </div>
//     )
// }

export default PrintPurchaseReq;
