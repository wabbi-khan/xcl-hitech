import React from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import PreRequisites from './PreRequisites';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { fetchDepartmentsAction } from '../../../services/action/DepartmentAction';
import { getDesignation } from '../../../services/action/DesignationAction';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: '25ch',
		},
	},
	mainContainer: {
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

const initialValuesForTopForm = {
	department: '',
	designation: '',
};

const validationSchemaForTopForm = yup.object({
	department: '',
	designation: '',
});

const initialValuesForNestedForm = {
	name: '',
	param: '',
};

const validationSchemaForNestedForm = yup.object({
	name: yup.string().required(),
	param: yup.string().required(),
});

const TrainingNeedPreReq = () => {
	const [params, setParams] = React.useState([]);
	const classes = useStyles();
	const { departments } = useSelector((state) => state.departments);
	const { designations } = useSelector((state) => state.designations);

	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(getDesignation());
		dispatch(fetchDepartmentsAction());
	}, []);

	const onSubmit = async (values) => {
		console.log(values);
	};

	const onParamSubmit = (values) => {
		console.log(values);
		setParams([...params, values]);
	};

	return (
		<Sidenav title={'Training Needs Pre-Requestions'}>
			<div>
				<Container className={classes.mainContainer}>
<<<<<<< HEAD
					<form action='' onSubmit={handleSubmit(onSubmitDate)}>
						{/* Material category selector */}
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
							InputLabelProps={{ style: { fontSize: 14 } }}
						// {...register("", { required: true })}
						>
							<MenuItem value='0'>Production</MenuItem>
						</CssTextField>
						{errors.name?.type === 'required' && (
							<p className='mt-1 text-danger'>Department is required</p>
						)}
						<CssTextField
							id='outlined-basic'
							label='Select Designation'
							variant='outlined'
							type='text'
							size='small'
							select
							autocomplete='off'
							className={classes.inputFieldStyle1}
							inputProps={{ style: { fontSize: 14 } }}
							InputLabelProps={{ style: { fontSize: 14 } }}
						// {...register("", { required: true })}
						>
							<MenuItem value='0'>Manager</MenuItem>
						</CssTextField>
						{errors.name?.type === 'required' && (
							<p className='mt-1 text-danger'>Designation is required</p>
=======
					<Formik
						initialValues={initialValuesForTopForm}
						validationSchema={validationSchemaForTopForm}
						onSubmit={onSubmit}>
						{(props) => (
							<>
								<Form>
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
										InputLabelProps={{ style: { fontSize: 14 } }}
										onChange={props.handleChange('department')}
										onBlur={props.handleBlur('department')}
										value={props.values.department}
										helperText={props.touched.department && props.errors.department}
										error={props.touched.department && props.errors.department}>
										{!departments || !departments.length ? (
											<p>Data Not Found</p>
										) : (
											departments.map((department, i) => (
												<MenuItem value={department._id} key={i}>
													{department.name}
												</MenuItem>
											))
										)}
										<MenuItem value='0'>Production</MenuItem>
									</CssTextField>
									<CssTextField
										id='outlined-basic'
										label='Select Designation'
										variant='outlined'
										type='text'
										size='small'
										select
										autocomplete='off'
										className={classes.inputFieldStyle1}
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
											designations.map((designation, i) => (
												<MenuItem value={designation._id} key={i}>
													{designation.name}
												</MenuItem>
											))
										)}
									</CssTextField>
								</Form>
								<Formik
									initialValues={initialValuesForNestedForm}
									validationSchema={validationSchemaForNestedForm}
									onSubmit={onParamSubmit}>
									{(props) => (
										<div>
											<div style={{ marginTop: 30, marginBottom: 30 }}>
												<hr />
											</div>
											<Container className={classes.mainContainer}>
												<h4 className='text-left'>Prerequisites</h4>
												<Form>
													<CssTextField
														id='outlined-basic'
														label='Select Designation'
														variant='outlined'
														type='text'
														size='small'
														autocomplete='off'
														className={classes.inputFieldStyle1}
														inputProps={{ style: { fontSize: 14 } }}
														onChange={props.handleChange('name')}
														onBlur={props.handleBlur('name')}
														value={props.values.name}
														helperText={props.touched.name && props.errors.name}
														error={props.touched.name && props.errors.name}
														InputLabelProps={{ style: { fontSize: 14 } }}></CssTextField>
													<CssTextField
														id='outlined-basic'
														label='Select Designation'
														variant='outlined'
														type='text'
														size='small'
														autocomplete='off'
														className={classes.inputFieldStyle1}
														inputProps={{ style: { fontSize: 14 } }}
														onChange={props.handleChange('param')}
														onBlur={props.handleBlur('param')}
														value={props.values.param}
														helperText={props.touched.param && props.errors.param}
														error={props.touched.param && props.errors.param}
														InputLabelProps={{ style: { fontSize: 14 } }}></CssTextField>
													<Button
														variant='outlined'
														type='submit'
														className={classes.addButton}>
														Add
													</Button>
												</Form>
											</Container>
										</div>
									)}
								</Formik>
								<div>
									<Button variant='outlined' type='submit' className={classes.addButton}>
										Add
									</Button>
								</div>
							</>
>>>>>>> 8826a668d5f9d4da2be274e9c5fcd6aa8abfc603
						)}
					</Formik>
				</Container>
			</div>
		</Sidenav>
	);
};

export default TrainingNeedPreReq;
