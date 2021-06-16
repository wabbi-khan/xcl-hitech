import React, { useState, useEffect } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRequisitionAction } from '../../../services/action/PurchaseReqAction';
import Loading from '../../purchase/material/Loading';
import MaterialError from '../../purchase/material/MaterialError';
import { Grid } from '@material-ui/core';

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
		// marginLeft: 0
	},
	addButton: {
		marginTop: 20,
		color: '#22A19A',
		borderColor: '#22A19A',
		fontWeight: 'bold',
		width: '10%',
		'&:hover': {
			border: 'none',
			backgroundColor: '#22A19A',
			color: 'whitesmoke',
		},
	},
	tableContainer: {
		marginTop: 15,
	},
	table: {
		minWidth: 600,
	},
	dataTable: {},
	inputFieldStyle: {
		[theme.breakpoints.up('md')]: {
			width: 250,
		},
		[theme.breakpoints.down('sm')]: {
			width: 200,
		},
	},
	inputFieldStyle1: {
		[theme.breakpoints.up('md')]: {
			width: 250,
		},
		[theme.breakpoints.down('sm')]: {
			width: 200,
			marginTop: 10,
		},
	},
}));

const MaterialIssueReq = ({ history }) => {
	const classes = useStyles();
	const [switchButton, setSwitchButton] = useState('Incomplete');

	function handleClick() {
		if (switchButton === 'Incomplete') {
			setSwitchButton('Complete');
		} else {
			setSwitchButton('Incomplete');
		}
	}

	const dispatch = useDispatch();

	useEffect(async () => {
		await dispatch(fetchRequisitionAction(`isComplete=false`));
	}, [dispatch]);

	const { purchaseRequisitions, loading, error } = useSelector(
		(state) => state.purchaseRequisitions,
	);
	console.log(purchaseRequisitions);

	const onSubmitDate = async (props) => {
		console.log(props);
		// try {
		// await axios.post(`${process.env.REACT_APP_API_URL}/material`, props)
		// window.location.reload()
		// setAddMatError(false)
		// }
		// catch (error) {
		// setAddMatError(true)

		// }
	};

	return (
		<Sidenav title={'Material Issue Requisition'}>
			<div>
				<div className={classes.dataTable}>
					<Grid container spacing={1}>
						<Grid item lg={3} md={3} sm={6} xs={6}>
							<h5 className='ml-1 mt-3'>UnComplete Purchase Requisitions</h5>
						</Grid>
						<Grid item lg={3} md={3} sm={6} xs={6}></Grid>
						<Grid item lg={4} md={3} sm={6} xs={6}></Grid>
						<Grid item lg={2} md={3} sm={6} xs={6}>
							<Button
								variant='contained'
								size='small'
								className='bg-dark text-light'
								onClick={() => {
									history.push(
										`/storedashboard/material_issue_requisition/complete_material_issue_requisition`,
									);
								}}>
								View Complete Requisitions
							</Button>
						</Grid>
					</Grid>
					<TableContainer className={classes.tableContainer}>
						<Table
							stickyHeader
							className='table table-dark table-md'
							style={{ backgroundColor: '#d0cfcf', border: '1px solid grey' }}>
							<TableHead>
								<TableRow hover role='checkbox'>
									<StyledTableCell align='center'>Sr.No</StyledTableCell>
									<StyledTableCell align='center'>Department</StyledTableCell>
									<StyledTableCell align='center'>Purpose</StyledTableCell>
									<StyledTableCell align='center'>Req. Date</StyledTableCell>
									<StyledTableCell align='center'>Action</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{loading ? (
									<Loading />
								) : error ? (
									<MaterialError />
								) : purchaseRequisitions.length ? (
									purchaseRequisitions.map((request, i) => (
										<StyledTableRow key={i}>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{i + 1}
											</StyledTableCell>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{!request.department ? null : request.department.name}
											</StyledTableCell>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{request.purpose}
											</StyledTableCell>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{request.reqDate}
											</StyledTableCell>
											<StyledTableCell className='text-dark bg-light' align='center'>
												<Button
													variant='contained'
													size='small'
													onClick={() => {
														history.push(
															`/storedashboard/material_issue_requisition/material_requisition_details/${request._id}`,
														);
													}}
													// style={{ backgroundColor: 'red', color: 'whitesmoke', }}
												>
													View Requisition
													{/* {switchButton} */}
												</Button>
											</StyledTableCell>
										</StyledTableRow>
									))
								) : (
									<h5>Not Found</h5>
								)}
							</TableBody>
						</Table>
					</TableContainer>
				</div>
			</div>
		</Sidenav>
	);
};

export default MaterialIssueReq;
