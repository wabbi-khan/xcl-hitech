import React, { useEffect } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../material/Loading';
import MaterialError from '../material/MaterialError';
import Button from '@material-ui/core/Button';
import { getVendorAction } from '../../../services/action/VendorAction';
import Loader from 'react-loader-spinner';
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

// function createData(No, name, Action) {
// 	return { No, name, Action };
// }

// const rows = [createData(1, 'Item1')];

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: '25ch',
		},
	},
	mainContainer: {
		textAlign: 'center',
	},
	table: {
		minWidth: 600,
	},
	dataTable: {},
}));

const AppSupplier = ({ history }) => {
	const classes = useStyles();
	const [fetchLoading, setFetchLoading] = React.useState(true);
	const [fetchError, setFetchError] = React.useState('');

	const dispatch = useDispatch();

	useEffect(() => {
		setFetchLoading(true);
		dispatch(
			getVendorAction('verified=true', (err) => {
				if (err) {
					setFetchError(err);
					setTimeout(() => {
						setFetchError('');
					}, 4000);
				}
				setFetchLoading(false);
			}),
		);
	}, [dispatch]);

	const { vendors } = useSelector((state) => state.vendors);

	return (
		<Sidenav title={'Approved Supplier List'}>
			<div>
				{fetchLoading ? (
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							marginTop: '3rem',
						}}>
						<Loader type='TailSpin' color='#000' width='3rem' height='3rem' />
					</div>
				) : vendors?.length === 0 ? (
					<p>There are no Approved Vendors</p>
				) : (
					<div className={classes.dataTable}>
						<TableContainer className={classes.tableContainer}>
							<Table
								stickyHeader
								className='table table-dark'
								style={{ backgroundColor: '#d0cfcf', border: '1px solid grey' }}>
								<TableHead>
									<TableRow hover role='checkbox'>
										<StyledTableCell align='center'>Sr.No</StyledTableCell>
										<StyledTableCell align='center'>Vendor Name</StyledTableCell>
										<StyledTableCell align='center'>Contact No.</StyledTableCell>
										<StyledTableCell align='center'>Contact Person</StyledTableCell>
										<StyledTableCell align='center'>Items Supplied</StyledTableCell>
										<StyledTableCell align='center'>Approving Date</StyledTableCell>
										<StyledTableCell align='center'>Rating</StyledTableCell>
										<StyledTableCell align='center'>Action</StyledTableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{vendors.map((vendor, i) => (
										<StyledTableRow key={i}>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{i + 1}
											</StyledTableCell>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{vendor.name}
											</StyledTableCell>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{vendor.phone}
											</StyledTableCell>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{!vendor.contactPerson ? null : vendor.contactPerson.name}
											</StyledTableCell>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{!vendor.materials.length ? (
													<span>Not Found</span>
												) : (
													vendor.material.map((material, i) => (
														<span key={i}>{material.name}, </span>
													))
												)}
											</StyledTableCell>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{vendor.approveDate}
											</StyledTableCell>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{vendor.rating == 3 ? (
													<span>High</span>
												) : vendor.rating == 2 ? (
													<span>Medium</span>
												) : vendor.rating == 1 ? (
													<span>Low</span>
												) : vendor.rating == 0 ? (
													<span>Bad</span>
												) : (
													<span>None of these</span>
												)}
											</StyledTableCell>
											<StyledTableCell className='text-light bg-light' align='center'>
												<Button
													variant='contained'
													className='bg-dark text-light'
													size='small'
													onClick={() =>
														history.push({
															pathname: `/purchase/approved_supplier_list/view_approved_supplier_details/${vendor._id}`,
															state: { vendor },
														})
													}
													style={{ marginTop: 2 }}>
													View
												</Button>
											</StyledTableCell>
										</StyledTableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</div>
				)}
			</div>
		</Sidenav>
	);
};

export default withRouter(AppSupplier);
