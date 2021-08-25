import React, { useState, useEffect } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import {
	createTrainingVenue,
	deleteTrainingVenue,
	getTrainingVenues,
} from '../../../services/action/TrainingVenue';
import EditTrainingVenue from './EditTrainingVenue';
import Button from '../../../components/utils/Button';
import Loader from 'react-loader-spinner';

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
		marginTop: 20,
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
			width: '10%',
		},
		[theme.breakpoints.down('sm')]: {
			// width: '12%',
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
			width: 330,
		},
		[theme.breakpoints.down('sm')]: {
			width: 200,
		},
	},
	inputFieldStyle1: {
		[theme.breakpoints.up('md')]: {
			width: 330,
			marginLeft: 10,
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
const initialValues = {
	name: '',
};

const validationSchema = yup.object({
	name: yup.string().required(),
});

const TrainingVenue = () => {
	const [createLoading, setCreateLoading] = React.useState(false);
	const [createError, setCreateError] = React.useState('');
	const [deleteLoading, setDeleteLoading] = React.useState(false);
	const [deleteError, setDeleteError] = React.useState('');
	const [fetchLoading, setFetchLoading] = React.useState('');
	const [fetchError, setFetchError] = React.useState('');
	const [success, setSuccess] = React.useState('');
	const [venue, setVenue] = useState({});
	const [open, setOpen] = useState(false);

	const classes = useStyles();

	const dispatch = useDispatch();

	const { venues } = useSelector((state) => state.venues);

	useEffect(async () => {
		setFetchLoading(true);
		dispatch(
			getTrainingVenues(null, (err) => {
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

	const onSubmit = async (values) => {
		setCreateLoading(true);
		dispatch(
			createTrainingVenue(values, (err) => {
				if (err) {
					setCreateError(err);
					setTimeout(() => {
						setCreateError('');
					}, 4000);
				} else {
					setSuccess('Category added successfully');
					setTimeout(() => {
						setSuccess('');
					}, 4000);
				}
				setCreateLoading(false);
			}),
		);
	};

	const deleteVenue = (params) => {
		setDeleteLoading(true);
		dispatch(
			deleteTrainingVenue(params, (err) => {
				if (err) {
					setDeleteError(err);
					setTimeout(() => {
						setDeleteError('');
					}, 4000);
				}
				setDeleteLoading(false);
			}),
		);
	};

	const handleClose = (props) => {
		setOpen(props);
	};

	const handleOpen = async (venue) => {
		setVenue(venue);
		setOpen(true);
	};

	return (
		<Sidenav title={'Training Venue'}>
			{deleteLoading && (
				<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
					<Loader type='TailSpin' width='2rem' height='2rem' />
				</div>
			)}
			{deleteError && (
				<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
					<span>{deleteError}</span>
				</div>
			)}
			<div>
				<Container className={classes.mainContainer}>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={onSubmit}>
						{(props) => (
							<Form>
								<CssTextField
									id='outlined-basic'
									label='Training Venue'
									variant='outlined'
									type='text'
									autocomplete='off'
									size='small'
									className={classes.inputFieldStyle}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
									onChange={props.handleChange('name')}
									onBlur={props.handleBlur('name')}
									value={props.values.name}
									helperText={props.touched.name && props.errors.name}
									error={props.touched.name && props.errors.name}
								/>
								<div>
									<Button
										variant='outlined'
										color='primary'
										text='Submit'
										loading={createLoading}
										loaderColor='#333'
										classNames={classes.addButton}
									/>
								</div>
							</Form>
						)}
					</Formik>
				</Container>

				<EditTrainingVenue show={open} handler={handleClose} venue={venue} />

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
				) : venues?.length === 0 ? (
					<p>There is no data found.</p>
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
										<StyledTableCell align='center'>Venue</StyledTableCell>
										<StyledTableCell align='center'>Action</StyledTableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{venues.map((el, i) => (
										<StyledTableRow>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{i + 1}
											</StyledTableCell>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{el.name}
											</StyledTableCell>
											<StyledTableCell className='text-light bg-light' align='center'>
												<div
													style={{
														display: 'flex',
														flexDirection: 'row',
														alignItems: 'center',
														justifyContent: 'center',
													}}>
													<Button
														variant='contained'
														className='bg-dark text-light'
														size='small'
														onClick={() => handleOpen(el)}
														text='Edit'
													/>

													<Button
														variant='contained'
														color='secondary'
														size='small'
														onClick={() => deleteVenue(el._id)}
														style={{ marginLeft: 10 }}
														text='Delete'
													/>
												</div>
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

export default TrainingVenue;
