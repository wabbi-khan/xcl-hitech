import React, { useEffect, useState } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import FormGroup from '@material-ui/core/FormGroup';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { getDesignation } from '../../../services/action/DesignationAction';

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
		marginTop: 40,
		textAlign: 'center',
	},
	addButton: {
		marginTop: 50,
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
	table: {
		minWidth: 600,
	},
	dataTable: {
		marginTop: 70,
		textAlign: 'center',
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
	training: '',
	method: '',
	result: '',
	evaluatedBy: '',
};

const validationSchema = yup.object({
	training: yup.string().required(),
	method: yup.string().required(),
	result: yup.string().required(),
	evaluatedBy: yup.string().required(),
});

const TrainingRecord = ({ history }) => {
	const classes = useStyles();

	const dispatch = useDispatch();
	const { designations } = useSelector((state) => state.designations);
	console.log(designations);

	useEffect(async () => {
		dispatch(getDesignation());
	}, [dispatch]);

	const onSubmit = async (props) => {};

	return (
		<Sidenav title={'Training Record and Evaluation'}>
			<div>
				<Container className={classes.mainContainer}>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={onSubmit}>
						{(props) => (
							<Form>
								<Grid container spacing={1}>
									<Grid item lg={8} md={8} sm={12} xs={12}>
										<CssTextField
											id='outlined-basic'
											label='Select Training'
											variant='outlined'
											type='text'
											size='small'
											select
											autocomplete='off'
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('training')}
											onBlur={props.handleBlur('training')}
											value={props.values.training}
											helperText={props.touched.training && props.errors.training}
											error={props.touched.training && props.errors.training}
											InputLabelProps={{ style: { fontSize: 14 } }}>
											<MenuItem value='0'>Training on Purchase</MenuItem>
										</CssTextField>
									</Grid>
								</Grid>
								<Grid container spacing={1} style={{ marginTop: 12 }}>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id='outlined-basic'
											label='Evaluation Method'
											variant='outlined'
											type='text'
											autocomplete='off'
											size='small'
											select
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('method')}
											onBlur={props.handleBlur('method')}
											value={props.values.method}
											helperText={props.touched.method && props.errors.method}
											error={props.touched.method && props.errors.method}
											InputLabelProps={{ style: { fontSize: 14 } }}>
											<MenuItem value='0'>Interview</MenuItem>
											<MenuItem value='0'>Written Test</MenuItem>
										</CssTextField>
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id='outlined-basic'
											label='Training Evaluation Result'
											variant='outlined'
											type='text'
											autocomplete='off'
											size='small'
											select
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('result')}
											onBlur={props.handleBlur('result')}
											value={props.values.result}
											helperText={props.touched.result && props.errors.result}
											error={props.touched.result && props.errors.result}
											InputLabelProps={{ style: { fontSize: 14 } }}>
											<MenuItem value='0'>Satisfactory</MenuItem>
											<MenuItem value='0'>Unsatisfactory</MenuItem>
										</CssTextField>
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id='outlined-basic'
											label='Evaluated By'
											variant='outlined'
											type='text'
											autocomplete='off'
											size='small'
											select
											style={{ width: '100%' }}
											inputProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('evaluatedBy')}
											onBlur={props.handleBlur('evaluatedBy')}
											value={props.values.evaluatedBy}
											helperText={props.touched.evaluatedBy && props.errors.evaluatedBy}
											error={props.touched.evaluatedBy && props.errors.evaluatedBy}
											InputLabelProps={{ style: { fontSize: 14 } }}>
											{!designations || !designations.length ? (
												<p>Data Not Found</p>
											) : (
												designations.map((el, i) => (
													<MenuItem value={el._id} key={i}>
														{el.name}
													</MenuItem>
												))
											)}
										</CssTextField>
									</Grid>
								</Grid>
								<div>
									<Button
										variant='outlined'
										color='primary'
										type='submit'
										className={classes.addButton}>
										Submit
									</Button>
								</div>
							</Form>
						)}
					</Formik>
				</Container>
				<div className={classes.dataTable}>
					<TableContainer className={classes.tableContainer}>
						<Table
							stickyHeader
							className='table table-dark'
							style={{ backgroundColor: '#d0cfcf', border: '1px solid grey' }}>
							<TableHead>
								<TableRow hover role='checkbox'>
									<StyledTableCell align='center'>S.NO</StyledTableCell>
									<StyledTableCell align='center'>TRAINEE NAME</StyledTableCell>
									<StyledTableCell align='center'>DESIGNATION</StyledTableCell>
									<StyledTableCell align='center'>TRAINER</StyledTableCell>
									<StyledTableCell align='center'>EVALUATION METHOD</StyledTableCell>
									<StyledTableCell align='center'>EVALUATED BY</StyledTableCell>
									<StyledTableCell align='center'>
										TRAINING EVALUATION RESULT
									</StyledTableCell>
									<StyledTableCell align='center'>ACTION</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{/* {
                                    loading ? (
                                        <Loading />
                                    ) : error ? (
                                        <MaterialError />
                                    ) : trainings.length ? (
                                        trainings.map((training, i) => ( */}
								<StyledTableRow>
									<StyledTableCell className='text-dark bg-light' align='center'>
										{1}
									</StyledTableCell>
									<StyledTableCell className='text-dark bg-light' align='center'>
										{/* {training.name} */}Arsalan
									</StyledTableCell>
									<StyledTableCell className='text-dark bg-light' align='center'>
										{/* {training.name} */}Engineer
									</StyledTableCell>
									<StyledTableCell className='text-dark bg-light' align='center'>
										{/* {training.name} */}MR
									</StyledTableCell>
									<StyledTableCell className='text-dark bg-light' align='center'>
										{/* {training.name} */}Interviewed
									</StyledTableCell>
									<StyledTableCell className='text-dark bg-light' align='center'>
										{/* {training.name} */}MR
									</StyledTableCell>
									<StyledTableCell className='text-dark bg-light' align='center'>
										{/* {training.name} */}Satisfactory
									</StyledTableCell>
									<StyledTableCell className='text-dark bg-light' align='center'>
										<Button
											variant='contained'
											className='bg-dark text-light'
											size='small'
											onClick={() =>
												history.push('/hr/print_training_record_and_evaluation')
											}
											style={{ marginTop: 2 }}>
											View
										</Button>
									</StyledTableCell>
								</StyledTableRow>
								{/* //         ))
                                //     ) : (
                                //         <h5>Not Found</h5>
                                //     )
                            // } */}
							</TableBody>
						</Table>
					</TableContainer>
				</div>
			</div>
		</Sidenav>
	);
};

export default TrainingRecord;
