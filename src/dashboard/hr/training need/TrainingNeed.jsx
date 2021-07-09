import React from 'react';
import Sidenav from '../../SideNav/Sidenav';
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
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { createTrainingIdentification } from '../../../services/action/TrainingNeedIdentification';
import { getByDepartmentAndDesignation } from '../../../services/action/TrainingPrereq';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDepartmentsAction } from '../../../services/action/DepartmentAction';
import { getDesignation } from '../../../services/action/DesignationAction';
import { List } from '@material-ui/icons';

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
		[theme.breakpoints.up('md')]: {
			marginLeft: 0,
			marginTop: 15,
		},
		[theme.breakpoints.down('sm')]: {
			marginTop: -15,
		},
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
			width: '30%',
		},
	},
	table: {
		minWidth: 600,
	},
	dataTable: {
		marginTop: 40,
	},
	ckeckBox: {
		[theme.breakpoints.up('md')]: {
			marginLeft: 7,
		},
		[theme.breakpoints.down('sm')]: {
			marginLeft: 0,
		},
	},
	inputFieldStyle: {
		// boxShadow: '0.4px 0.4px 0.4px 0.4px grey',
		// borderRadius: 5,
		[theme.breakpoints.up('md')]: {
			width: 250,
		},
		[theme.breakpoints.down('sm')]: {
			width: 200,
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
	department: '',
	designation: '',
	interviewedBy: '',
	recommendation: '',
};

const validationSchema = yup.object({
	department: yup.string().required(),
	designation: yup.string().required(),
	interviewedBy: yup.string().required(),
	recommendation: yup.string().required(),
});

const TrainingNeed = ({ history }) => {
	const [department, setDepartment] = React.useState();
	const [designation, setDesignation] = React.useState();
	const [list, setList] = React.useState();
	const classes = useStyles();
	const dispatch = useDispatch();
	const { departments } = useSelector((state) => state.departments);
	const { designations } = useSelector((state) => state.designations);
	const { requisitions } = useSelector((state) => state.requisitions);

	React.useEffect(() => {
		dispatch(getDesignation());
		dispatch(fetchDepartmentsAction());
	}, []);

	console.log(requisitions);

	React.useEffect(() => {
		if (requisitions) {
			const temp = [];
			for (const el of requisitions) {
				temp.push({ ...el, satisfaction: '', need: '' });
			}
			setList(temp);
		}
	}, [requisitions]);

	React.useEffect(() => {
		if (department && designation) {
			dispatch(getByDepartmentAndDesignation(department, designation));
		}
	}, [department, designation]);

	const onChange = (key, value, index) => {
		const temp = list.map((el, i) =>
			i === index ? { ...el, [key]: value } : el,
		);
		setList(temp);
	};

	const onSubmit = (values) => {
		dispatch(createTrainingIdentification({ ...values, preRequestion: list }));
	};

	return (
		<Sidenav title={'Training Needs Identification'}>
			<div>
				<Container className={classes.mainContainer}>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={onSubmit}>
						{(props) => (
							<Form>
								<Grid container spacing={1}>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id='outlined-basic'
											label='Select Department'
											variant='outlined'
											type='text'
											size='small'
											select
											autocomplete='off'
											className={classes.inputFieldStyle}
											inputProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('department')}
											onBlur={props.handleBlur('department')}
											value={props.values.department}
											helperText={props.touched.department && props.errors.department}
											error={props.touched.department && props.errors.department}
											InputLabelProps={{ style: { fontSize: 14 } }}>
											{!departments || !departments.length ? (
												<p>Data Not Found</p>
											) : (
												departments.map((el, i) => (
													<MenuItem
														value={el._id}
														key={i}
														onClick={() => setDepartment(el._id)}>
														{el.name}
													</MenuItem>
												))
											)}
										</CssTextField>
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id='outlined-basic'
											label='Select Designation'
											variant='outlined'
											type='text'
											autocomplete='off'
											size='small'
											select
											className={classes.inputFieldStyle}
											inputProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('designation')}
											onBlur={props.handleBlur('designation')}
											value={props.values.designation}
											helperText={props.touched.designation && props.errors.designation}
											error={props.touched.designation && props.errors.designation}
											InputLabelProps={{ style: { fontSize: 14 } }}>
											{!designations || !designations.length ? (
												<p>Data Not Found</p>
											) : (
												designations.map((el, i) => (
													<MenuItem
														value={el._id}
														key={i}
														onClick={() => setDesignation(el._id)}>
														{el.name}
													</MenuItem>
												))
											)}
										</CssTextField>
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CssTextField
											id='outlined-basic'
											label='Interviewed By'
											variant='outlined'
											type='text'
											autocomplete='off'
											size='small'
											select
											className={classes.inputFieldStyle}
											inputProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('interviewedBy')}
											onBlur={props.handleBlur('interviewedBy')}
											value={props.values.interviewedBy}
											helperText={
												props.touched.interviewedBy && props.errors.interviewedBy
											}
											error={props.touched.interviewedBy && props.errors.interviewedBy}
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
								<div style={{ marginTop: 30, marginBottom: 30 }}>
									<hr />
								</div>
								<Container>
									<h4 style={{ textAlign: 'left' }}>Training</h4>

									{list &&
										list?.length > 0 &&
										list?.map((el, i) => (
											<Grid container spacing={1} style={{ marginTop: 35 }}>
												<Grid item lg={1} md={1}>
													<h5 className={classes.itemHeading}>{i + 1}</h5>
												</Grid>
												<Grid item lg={5} md={5} sm={12} xs={12}>
													<div style={{ textAlign: 'left' }}>
														<h5 style={{ marginBottom: 15 }}>{el?.name}</h5>
														{el?.preRequisition?.map((el, i) => (
															<p>{el}</p>
														))}
													</div>
												</Grid>
												<Grid item lg={3} md={3} sm={12} xs={12}>
													<CssTextField
														id='outlined-basic'
														label='Select Satisfaction'
														variant='outlined'
														type='text'
														size='small'
														name='yearOfPassing'
														select
														value={el?.satisfaction}
														onChange={(e) => onChange('satisfaction', e.target.value, i)}
														style={{ width: '75%' }}
														inputProps={{ style: { fontSize: 14 } }}
														InputLabelProps={{ style: { fontSize: 14 } }}>
														<MenuItem value='excellent'>Excellent</MenuItem>
														<MenuItem value='good'>Good</MenuItem>
														<MenuItem value='satisfactory'>Satisfactory</MenuItem>
														<MenuItem value='poor'>Poor</MenuItem>
													</CssTextField>
												</Grid>
												<Grid item lg={3} md={3} sm={12} xs={12}>
													<CssTextField
														id='outlined-basic'
														label='Training Need'
														variant='outlined'
														type='text'
														size='small'
														name='yearOfPassing'
														select
														value={el?.need}
														onChange={(e) => onChange('need', e.target.value, i)}
														style={{ width: '75%' }}
														inputProps={{ style: { fontSize: 14 } }}
														InputLabelProps={{ style: { fontSize: 14 } }}>
														<MenuItem value='yes'>Yes</MenuItem>
														<MenuItem value='no'>No</MenuItem>
													</CssTextField>
												</Grid>
											</Grid>
										))}
								</Container>
								<Container>
									<Grid container spacing={1} style={{ marginTop: 60 }}>
										<Grid item lg={4} md={3} sm={12} xs={12}>
											<CssTextField
												id='outlined-basic'
												label='Recommendations'
												variant='outlined'
												type='text'
												size='small'
												style={{ width: '100%' }}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
												onChange={props.handleChange('recommendation')}
												onBlur={props.handleBlur('recommendation')}
												value={props.values.recommendation}
												helperText={
													props.touched.recommendation && props.errors.recommendation
												}
												error={props.touched.recommendation && props.errors.recommendation}
											/>
										</Grid>
									</Grid>
								</Container>
								<div>
									<Button
										variant='outlined'
										color='primary'
										type='submit'
										className={classes.addButton}
										// onClick={() => {
										// 	history.push('/hr/print_training_need_identification');
										// }}
									>
										Add
									</Button>
								</div>
							</Form>
						)}
					</Formik>
				</Container>
			</div>
		</Sidenav>
	);
};

export default TrainingNeed;
