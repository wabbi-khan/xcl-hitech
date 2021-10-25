import React, { useEffect } from 'react';
import Sidenav from '../../../../SideNav/Sidenav';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import {
	createNonExtEmpRatAction,
	deleteNonExtEmpRatAction,
	getNonExtEmpRatAction,
} from '../../../../../services/action/NonExecRat';
import EditNonExecRat from './EditNonExecRat';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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
	mainContainer1: {
		textAlign: 'left',
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
			width: '15%',
		},
		[theme.breakpoints.down('sm')]: {
			// width: '12%',
		},
	},
	addMoreParaBtn: {
		marginTop: 10,
		padding: 7,
		backgroundColor: '#22A19A',
		color: 'whitesmoke',
		'&:hover': {
			border: 'none',
			color: '#22A19A',
		},
	},
	addMoreBtn: {
		marginTop: 15,
		backgroundColor: '#22A19A',
		color: 'whitesmoke',
		'&:hover': {
			border: 1,
			color: '#22A19A',
			fontWeight: 'bold',
			backgroundColor: 'whitesmoke',
		},
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
			marginLeft: 5,
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
	description: '',
	min: '',
	max: '',
};

const validationSchema = yup.object({
	name: yup.string().required(),
	description: yup.string().required(),
	min: yup.number().required(),
	max: yup.number().required(),
});

const NonExecEmpRatings = ({ history }) => {
	const classes = useStyles();
	const { nonExecRat } = useSelector((state) => state.nonExecRat);
	const [fetchLoading, setFetchLoading] = React.useState(false);
	const [error, setError] = React.useState('');
	const [success, setSuccess] = React.useState(false);
	const [open, setOpen] = React.useState(false);
	const [rating, setRating] = React.useState({});

	const dispatch = useDispatch();

	useEffect(async () => {
		dispatch(getNonExtEmpRatAction());
	}, [dispatch]);

	const onSubmit = async (values) => {
		dispatch(createNonExtEmpRatAction(values));
	};

	const onDelete = async (id) => {
		dispatch(
			deleteNonExtEmpRatAction(id, () => {
				setSuccess(true);
				setTimeout(() => {
					setSuccess(false);
				}, 4000);
			})
		);
	};

	const handleClose = (props) => {
		setOpen(props);
	};

	const handleOpen = async (rating) => {
		setOpen(true);
		setRating(rating);
	};

	return (
		<Sidenav title={'Non-Executive Emplolyees Ratings'}>
			<div>
				<Container className={classes.mainContainer}>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={onSubmit}
					>
						{(props) => (
							<Form>
								<Grid container spacing={1} style={{ marginTop: 20 }}>
									<Grid item lg={2} md={2} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="Name"
											variant="outlined"
											type="text"
											autocomplete="off"
											size="small"
											style={{ width: '125%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('name')}
											onBlur={props.handleBlur('name')}
											value={props.values.name}
											helperText={
												props.touched.name && props.errors.name
											}
											error={props.touched.name && props.errors.name}
										/>
									</Grid>
									<Grid item lg={2} md={2} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="Description"
											variant="outlined"
											type="text"
											autocomplete="off"
											size="small"
											style={{ width: '125%', marginLeft: 50 }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('description')}
											onBlur={props.handleBlur('description')}
											value={props.values.description}
											helperText={
												props.touched.description &&
												props.errors.description
											}
											error={
												props.touched.description &&
												props.errors.description
											}
										/>
									</Grid>
									<Grid item lg={2} md={2} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="Min Value"
											variant="outlined"
											type="number"
											autocomplete="off"
											size="small"
											style={{ width: '125%', marginLeft: 100 }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('min')}
											onBlur={props.handleBlur('min')}
											value={props.values.min}
											helperText={
												props.touched.min && props.errors.min
											}
											error={props.touched.min && props.errors.min}
										/>
									</Grid>
									<Grid item lg={2} md={2} sm={12} xs={12}>
										<CssTextField
											id="outlined-basic"
											label="Max Value"
											variant="outlined"
											type="number"
											autocomplete="off"
											size="small"
											style={{ width: '125%', marginLeft: 150 }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('max')}
											onBlur={props.handleBlur('max')}
											value={props.values.max}
											helperText={
												props.touched.max && props.errors.max
											}
											error={props.touched.max && props.errors.max}
										/>
									</Grid>
								</Grid>
								<div>
									<Button
										variant="outlined"
										color="primary"
										type="submit"
										className={classes.addButton}
									>
										Add
									</Button>
								</div>
							</Form>
						)}
					</Formik>
				</Container>
				<EditNonExecRat show={open} handler={handleClose} rating={rating} />
				<div className={classes.dataTable} style={{ marginTop: '1rem' }}>
					<TableContainer className={classes.tableContainer}>
						<Table
							stickyHeader
							className="table table-dark"
							style={{
								backgroundColor: '#d0cfcf',
								border: '1px solid grey',
							}}
						>
							<TableHead>
								<TableRow hover role="checkbox">
									<StyledTableCell align="center">
										Sr.No
									</StyledTableCell>
									<StyledTableCell align="center">
										Name
									</StyledTableCell>
									<StyledTableCell align="center">
										Description
									</StyledTableCell>
									<StyledTableCell align="center">Min</StyledTableCell>
									<StyledTableCell align="center">Max</StyledTableCell>
									<StyledTableCell align="center">
										Actions
									</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{fetchLoading ? (
									<h1>Loading</h1>
								) : error ? (
									<h1>Error</h1>
								) : !nonExecRat || !nonExecRat.length ? (
									<p>Not Found</p>
								) : (
									nonExecRat.map((el, i) => (
										<StyledTableRow key={i}>
											<StyledTableCell
												className="text-dark bg-light"
												align="center"
											>
												{i + 1}
											</StyledTableCell>
											<StyledTableCell
												className="text-dark bg-light"
												align="center"
											>
												{el?.name}
											</StyledTableCell>
											<StyledTableCell
												className="text-dark bg-light"
												align="center"
											>
												{el?.description}
											</StyledTableCell>
											<StyledTableCell
												className="text-dark bg-light"
												align="center"
											>
												{el?.min}
											</StyledTableCell>
											<StyledTableCell
												className="text-dark bg-light"
												align="center"
											>
												{el?.max}
											</StyledTableCell>
											<StyledTableCell
												className="text-light bg-light"
												align="center"
											>
												<>
													<Button
														variant="contained"
														className="bg-dark text-light"
														size="small"
														onClick={() => handleOpen(el)}
														style={{ marginTop: 2 }}
													>
														Edit
													</Button>
													<Button
														variant="contained"
														color="secondary"
														size="small"
														onClick={() => onDelete(el._id)}
														style={{
															marginLeft: 2,
															marginTop: 2,
														}}
													>
														Delete
													</Button>
												</>
											</StyledTableCell>
										</StyledTableRow>
									))
								)}
							</TableBody>
						</Table>
					</TableContainer>
				</div>
			</div>
		</Sidenav>
	);
};

export default NonExecEmpRatings;
