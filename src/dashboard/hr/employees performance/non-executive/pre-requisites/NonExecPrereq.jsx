import React, { useState, useEffect } from 'react';
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
	createNonExtEmpAssesAction,
	getNonExtEmpAssesAction,
	deleteNonExtEmpAssesAction,
} from '../../../../../services/action/NonExecPrereqActions';
import { MdCancel } from 'react-icons/md';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EditNonExecPrereq from './EditNonExecPrereq';

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
		marginTop: '-0.2rem',
		marginLeft: 5,
		padding: 8,
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
	heading: '',
};
const initialValues2 = {
	value: '',
	marks: undefined,
};

const validationSchema = yup.object({
	heading: yup.string().required(),
});
const validationSchema2 = yup.object({
	value: yup.string().required(),
	marks: yup.number().required(),
});

const NonExecPrereq = () => {
	const classes = useStyles();
	const [params, setParams] = React.useState([]);
	const [error, setError] = React.useState('');
	const [fetchLoading, setFetchLoading] = useState(false);
	const { nonExecPrereq } = useSelector((state) => state.nonExecPrereq);
	const [open, setOpen] = React.useState(false);
	const [assessment, setAssessment] = React.useState({});
	const [success, setSuccess] = React.useState(false);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getNonExtEmpAssesAction());
	}, [dispatch]);

	const onDelete = (id) => {
		dispatch(
			deleteNonExtEmpAssesAction(id, () => {
				setSuccess(true);
				setTimeout(() => {
					setSuccess(false);
				}, 4000);
			}),
		);
	};

	const onSubmit = async (values) => {
		if (params?.length > 0) {
			dispatch(createNonExtEmpAssesAction({ ...values, list: [...params] }));
		} else {
			setError('Add single parameter to submit');
			setTimeout(() => {
				setError('');
			}, 3000);
		}
	};

	const onParamSubmit = (values) => {
		setParams([...params, values]);
	};

	const onRemoveParam = (e) => {
		const index = e.target.dataset.index;
		const temp = [...params];
		setParams(temp.filter((el, i) => i != index));
	};

	const handleClose = (props) => {
		setOpen(props);
	};

	const handleOpen = async (assessment) => {
		setOpen(true);
		setAssessment(assessment);
	};

	return (
		<Sidenav title={'Non-Executive Employees Prerequisitions'}>
			<div>
				<Container className={classes.mainContainer}>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={onSubmit}>
						{(props) => (
							<>
								<Form>
									<Grid container spacing={1}>
										<Grid item lg={3} md={3} sm={12} xs={12}>
											<CssTextField
												id='outlined-basic'
												label='Add Heading Name'
												variant='outlined'
												type='text'
												autocomplete='off'
												size='small'
												style={{ width: '100%', }}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
												onChange={props.handleChange('heading')}
												onBlur={props.handleBlur('heading')}
												value={props.values.heading}
												helperText={props.touched.heading && props.errors.heading}
												error={props.touched.heading && props.errors.heading}
											/>
										</Grid>
									</Grid>
								</Form>

								<div style={{ marginTop: 30, marginBottom: 30 }}>
									<hr />
								</div>
								<Container className={classes.mainContainer1}>
									<Grid spacing={1}>
										<Formik
											initialValues={initialValues2}
											validationSchema={validationSchema2}
											onSubmit={onParamSubmit}>
											{(props) => (
												<Form>
													<Grid item lg={12} md={12} sm={12} xs={12}>
														<CssTextField
															id='outlined-basic'
															label='Add Parameter'
															variant='outlined'
															type='text'
															size='small'
															autocomplete='off'
															inputProps={{ style: { fontSize: 14 } }}
															style={{ width: '30%' }}
															InputLabelProps={{ style: { fontSize: 14 } }}
															onChange={props.handleChange('value')}
															onBlur={props.handleBlur('value')}
															value={props.values.value}
															helperText={props.touched.value && props.errors.value}
															error={props.touched.value && props.errors.value}
														/>
														<CssTextField
															id='outlined-basic'
															label='Add Total No.'
															variant='outlined'
															type='number'
															size='small'
															className='ml-2'
															autocomplete='off'
															inputProps={{ style: { fontSize: 14 } }}
															style={{ width: '30%', marginLeft: '0.5rem' }}
															InputLabelProps={{ style: { fontSize: 14 } }}
															onChange={props.handleChange('marks')}
															onBlur={props.handleBlur('marks')}
															value={props.values.marks}
															error={props.touched.marks && props.errors.marks}
															helperText={props.touched.marks && props.errors.marks}
														/>
														<Button
															variant='contained'
															size='small'
															className={classes.addMoreParaBtn}
															type='submit'>
															Add
														</Button>
													</Grid>
												</Form>
											)}
										</Formik>
									</Grid>
									{params.map((el, i) => (
										<div
											style={{
												display: 'flex',
												columnGap: '1rem',
												alignItems: 'center',
												marginBottom: '1rem',
											}}>
											<p style={{ padding: 0, margin: 0 }}>{el.value}</p>
											<div data-index={i} onClick={onRemoveParam}>
												<MdCancel
													size='20'
													style={{ cursor: 'pointer', pointerEvents: 'none' }}
												/>
											</div>
										</div>
									))}
								</Container>
								<div>
									<Form>
										<Button
											variant='outlined'
											color='primary'
											type='submit'
											className={classes.addButton}>
											Submit
										</Button>
										{success && <p>Successfully Deleted</p>}
										{error && <p>{error}</p>}
									</Form>
								</div>
							</>
						)}
					</Formik>
				</Container>
				<EditNonExecPrereq
					show={open}
					handler={handleClose}
					assessment={assessment}
				/>
				<div className={classes.dataTable} style={{ marginTop: '1rem' }}>
					<TableContainer className={classes.tableContainer}>
						<Table
							stickyHeader
							className='table table-dark'
							style={{ backgroundColor: '#d0cfcf', border: '1px solid grey' }}>
							<TableHead>
								<TableRow hover role='checkbox'>
									<StyledTableCell align='center'>Sr.No</StyledTableCell>
									<StyledTableCell align='center'>Headings</StyledTableCell>
									<StyledTableCell align='center'>Params</StyledTableCell>
									<StyledTableCell align='center'>Action</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{fetchLoading ? (
									<h1>Loading</h1>
								) : error ? (
									<h1>Error</h1>
								) : !nonExecPrereq || !nonExecPrereq.length ? (
									<p>Not Found</p>
								) : (
									nonExecPrereq.map((el, i) => (
										<StyledTableRow key={i}>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{i + 1}
											</StyledTableCell>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{el?.heading}
											</StyledTableCell>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{el?.list?.map((el) => (
													<div
														style={{
															display: 'flex',
															columnGap: '4rem',
															textAlign: 'center',
															alignItems: 'center',
															justifyContent: 'center',
														}}>
														<span>{el?.value}</span>
														<span>{el?.marks}</span>
													</div>
												))}
											</StyledTableCell>
											<StyledTableCell className='text-light bg-light' align='center'>
												<>
													<Button
														variant='contained'
														className='bg-dark text-light'
														size='small'
														onClick={() => handleOpen(el)}
														style={{ marginTop: 2 }}>
														Edit
													</Button>
													<Button
														variant='contained'
														color='secondary'
														size='small'
														onClick={() => onDelete(el._id)}
														style={{ marginLeft: 2, marginTop: 2 }}>
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

export default NonExecPrereq;
