import React from 'react';
import Sidenav from '../../SideNav/Sidenav';
import TableContainer from '@material-ui/core/TableContainer';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Loader from 'react-loader-spinner';
import { getbinCards } from '../../../services/action/binCardAction';
import { useDispatch, useSelector } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '../../../components/utils/Button';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: '25ch',
		},
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
	table: {
		minWidth: 600,
	},
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

const ProductsBinCard = ({ history }) => {
	const [fetchLoading, setFetchLoading] = React.useState(true);

	const dispatch = useDispatch();

	React.useEffect(() => {
		setFetchLoading(true);
		dispatch(
			getbinCards(null, (err) => {
				setFetchLoading(false);
			})
		);
	}, [dispatch]);

	const { binCards } = useSelector((state) => state.binCards);

	const classes = useStyles();

	return (
		<Sidenav title={'Products Bin Card'}>
			<div>
				<div
					style={{
						display: 'flex',
						gap: '.4rem',
						marginLeft: '.7rem',
						marginTop: '.5rem',
					}}
				>
					<CssTextField
						id="outlined-basic"
						variant="outlined"
						label="Search Products"
						type="search"
						size="small"
						autoComplete="off"
						style={{ width: '25%' }}
						inputProps={{ style: { fontSize: 14 } }}
						InputLabelProps={{ style: { fontSize: 14 } }}
					/>
					<CssTextField
						id="outlined-basic"
						variant="outlined"
						label="By Name/Code"
						type="text"
						size="small"
						autoComplete="off"
						select
						style={{ width: '25%' }}
						inputProps={{ style: { fontSize: 14 } }}
						InputLabelProps={{ style: { fontSize: 14 } }}
					>
						<MenuItem value="0">By Name</MenuItem>
						<MenuItem value="0">By Code</MenuItem>
					</CssTextField>
				</div>
				{fetchLoading ? (
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							marginTop: '3rem',
						}}
					>
						<Loader
							type="TailSpin"
							color="#000"
							width="3rem"
							height="3rem"
						/>
					</div>
				) : binCards?.length === 0 ? (
					<p>There is no data found.</p>
				) : (
					<div className={classes.dataTable}>
						<TableContainer className={classes.tableContainer}>
							<div
								className="container-fluid"
								style={{ textAlign: 'left' }}
							>
								<table class="table table-responsive table-hover table-striped table-bordered border-dark text-center mt-3">
									<thead class="bg-dark text-light">
										<tr>
											<th>S.No.</th>
											<th>Product Name</th>
											<th>Current Balance</th>
											<th>IN</th>
											<th>OUT</th>
											<th>Balance</th>
											<th>Last Updated on</th>
											<th>Action</th>
										</tr>
									</thead>
									<tbody>
										{binCards.map((el, i) => (
											<tr>
												<td>{i + 1}</td>
												<td>{el?.product?.name}</td>
												<td>{el?.history[0]?.balance}</td>
												<td>{el?.history[0]?.in}</td>
												<td>{el?.history[0]?.out}</td>
												<td>{el?.history[0]?.balance}</td>
												<td>{el?.history[0]?.date}</td>
												<td>
													<Button
														variant="contained"
														text="View"
														classNames="btn btn-sm bg-dark text-light"
														onClick={() => {
															history.push(
																'/storedashboard/products_bin_card/view_bincard_history'
															);
														}}
													/>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</TableContainer>
					</div>
				)}
			</div>
		</Sidenav>
	);
};

export default ProductsBinCard;
