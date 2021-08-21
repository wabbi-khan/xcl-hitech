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
import Button from '@material-ui/core/Button';
import { getVendorAction } from '../../../services/action/VendorAction';
import Loader from 'react-loader-spinner';
import { withRouter } from 'react-router';
import TextField from '@material-ui/core/TextField';

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

const CssTextField = withStyles({
	root: {
		'& label.Mui-focused': {
			color: 'black',
		},
		'& .MuiOutlinedInput-root': {
			'& fieldset': {
				borderColor: 'black',
			},
			'&.Mui-focused fieldset': {
				borderColor: 'black',
			},
		},
	},
})(TextField);

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
	viewBtn: {
		backgroundColor: '#22A19A',
		color: 'whitesmoke',
		borderColor: '#22A19A',
		textTransform: 'capitalize',
		'&:hover': {
			backgroundColor: '#22A19A',
			color: 'whitesmoke',
			opacity: '.9',
		},
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
	const [searchText, setSearchText] = React.useState('');

	React.useEffect(() => {
		if (searchText) {
			setFetchLoading(true);
			dispatch(
				getVendorAction(`verified=true&name[regex]=${searchText}`, (err) => {
					if (err) {
						setFetchError(err);
						setTimeout(() => {
							setFetchError('');
						}, 4000);
					}
					setFetchLoading(false);
				}),
			);
		} else {
			setFetchLoading(true);
			dispatch(
				getVendorAction(`verified=true`, (err) => {
					if (err) {
						setFetchError(err);
						setTimeout(() => {
							setFetchError('');
						}, 4000);
					}
					setFetchLoading(false);
				}),
			);
		}
	}, [searchText]);

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
			<div style={{ marginBottom: '1rem' }}>
				<CssTextField
					id='outlined-basic'
					label='Search By Name...'
					variant='outlined'
					type='text'
					autocomplete='off'
					onChange={(e) => setSearchText(e.target.value)}
					size='small'
					style={{ width: '50%' }}
					inputProps={{ style: { fontSize: 14 } }}
					InputLabelProps={{ style: { fontSize: 14 } }}
				/>
			</div>
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
										<StyledTableCell align='center'>Supplier Name</StyledTableCell>
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
												{!vendor.contactPerson ? null : vendor.contactPerson}
											</StyledTableCell>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{!vendor.materials.length ? (
													<span>Not Found</span>
												) : (
													vendor.materials.map((material, i) => (
														<span key={i}>{material.name}, </span>
													))
												)}
											</StyledTableCell>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{vendor.approveDate}
											</StyledTableCell>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{vendor.sectionB.rating == 3 ? (
													<span>High</span>
												) : vendor.sectionB.rating == 2 ? (
													<span>Medium</span>
												) : vendor.sectionB.rating == 1 ? (
													<span>Low</span>
												) : vendor.sectionB.rating == 0 ? (
													<span>Bad</span>
												) : (
													<span>None of these</span>
												)}
											</StyledTableCell>
											<StyledTableCell className='text-light bg-light' align='center'>
												<Button
													variant='contained'
													className={classes.viewBtn}
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
			<Button
				class='btn bg-dark text-light'
				onClick={() => {
					history.push({
						pathname: '/purchase/print_all_approved_supplier_list',
						state: { vendors },
					});
				}}>
				Print List
			</Button>
		</Sidenav>
	);
};

export default withRouter(AppSupplier);
