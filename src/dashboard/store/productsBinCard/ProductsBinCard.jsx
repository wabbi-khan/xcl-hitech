import React from 'react';
import Sidenav from '../../SideNav/Sidenav';
import Grid from '@material-ui/core/Grid';
import TableContainer from '@material-ui/core/TableContainer';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Loader from 'react-loader-spinner';
import { getbinCards } from '../../../services/action/binCardAction';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: '25ch',
		},
	},
	mainContainer: {
		textAlign: 'center',
		marginTop: 20,
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
	dataTable: {
		marginTop: 40,
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

const ProductsBinCard = () => {
	const [fetchLoading, setFetchLoading] = React.useState(true);
	const [fetchError, setFetchError] = React.useState('');

	const dispatch = useDispatch();

	React.useEffect(() => {
		setFetchLoading(true);
		dispatch(
			getbinCards(null, (err) => {
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

	const { binCards } = useSelector((state) => state.binCards);
	console.log('binCards', binCards);

	const classes = useStyles();

	return (
		<Sidenav title={'Products Bin Card'}>
			<div>
				<Container className={classes.mainContainer}>
					<Grid container spacing={1} style={{ marginTop: 15 }}>
						<Grid item lg={12} md={12} sm={12} xs={5}>
							<CssTextField
								id='outlined-basic'
								variant='outlined'
								type='date'
								size='small'
								autoComplete='off'
								required
								className={classes.inputFieldStyle}
								inputProps={{ style: { fontSize: 14 } }}
								InputLabelProps={{ style: { fontSize: 14 } }}></CssTextField>
						</Grid>
					</Grid>
				</Container>
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
				) : binCards?.length === 0 ? (
					<p>There is no data found.</p>
				) : (
					<div className={classes.dataTable}>
						<TableContainer className={classes.tableContainer}>
							<div className='container-fluid' style={{ textAlign: 'left' }}>
								<table class='table table-responsive table-hover table-striped table-bordered border-dark text-center mt-3'>
									<thead class='bg-dark text-light'>
										<tr>
											<th>S.No.</th>
											<th>Product Name</th>
											<th>Current Balance</th>
											<th>IN</th>
											<th>OUT</th>
											<th>Balance</th>
											<th>Last Updated on</th>
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
