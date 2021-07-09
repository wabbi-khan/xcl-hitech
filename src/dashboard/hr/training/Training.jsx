import React, { useEffect, useState } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {
	getTrainings,
	createTraining,
	updateTraining,
	deleteTraining,
} from '../../../services/action/TrainingAction';
import Loading from '../../purchase/material/Loading';
import MaterialError from '../../purchase/material/MaterialError';
import EditTraining from './EditTraining';
import { Formik, Form } from 'formik';
import * as yup from 'yup';

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

const initialValue = {
	name: '',
};

const validationSchema = yup.object({
	name: yup.string().required(),
});

const Training = () => {
	const classes = useStyles();

	const dispatch = useDispatch();

	useEffect(async () => {
		await dispatch(getTrainings());
	}, [dispatch]);

	const { trainings, loading, error } = useSelector((state) => state.trainings);

	const onSubmit = async (props) => {
		dispatch(createTraining(props));
	};

	const deleteCategory = async (params) => {
		dispatch(deleteTraining(params));
	};
	const [training, setTraining] = useState({});

	const [open, setOpen] = useState(false);

	const handleClose = (props) => {
		setOpen(props);
	};

	const handleOpen = async (training) => {
		setTraining(training);
		setOpen(true);
	};

	return (
		<Sidenav title={'Training'}>
			<div>
				<Container className={classes.mainContainer}>
					<Formik
						initialValues={initialValue}
						validationSchema={validationSchema}
						onSubmit={onSubmit}>
						{(props) => (
							<Form>
								<CssTextField
									id='outlined-basic'
									label='Training Name'
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
										type='submit'
										className={classes.addButton}>
										Add
									</Button>
								</div>
							</Form>
						)}
					</Formik>
					{error && <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>}
				</Container>

				<EditTraining show={open} handler={handleClose} training={training} />

				<div className={classes.dataTable}>
					<TableContainer className={classes.tableContainer}>
						<Table
							stickyHeader
							className='table table-dark'
							style={{ backgroundColor: '#d0cfcf', border: '1px solid grey' }}>
							<TableHead>
								<TableRow hover role='checkbox'>
									<StyledTableCell align='center'>Sr.No</StyledTableCell>
									<StyledTableCell align='center'>Trainings</StyledTableCell>
									<StyledTableCell align='center'>Action</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{loading ? (
									<Loading />
								) : error ? (
									<MaterialError />
								) : trainings.length ? (
									trainings.map((training, i) => (
										<StyledTableRow>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{i + 1}
											</StyledTableCell>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{training.name}
											</StyledTableCell>
											<StyledTableCell className='text-light bg-light' align='center'>
												<>
													<Button
														variant='contained'
														className='bg-dark text-light'
														size='small'
														onClick={() => handleOpen(training)}
														style={{ marginTop: 2 }}>
														Edit
													</Button>
													<Button
														variant='contained'
														color='secondary'
														size='small'
														onClick={() => deleteCategory(training._id)}
														style={{ marginLeft: 2, marginTop: 2 }}>
														Delete
													</Button>
												</>
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

export default Training;
