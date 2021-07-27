import React, { useEffect, useState } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '../../../components/utils/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import MenuItem from '@material-ui/core/MenuItem';

import {
	getDesignation,
	deleteDesignation,
	createDesignation,
} from '../../../services/action/DesignationAction';
import Loading from '../../purchase/material/Loading';
import MaterialError from '../../purchase/material/MaterialError';
import EditDesignation from './EditDesignation';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { getEducations } from '../../../services/action/EducationAction';
import { getSkills } from '../../../services/action/SkillsAction';
import { getExperiences } from '../../../services/action/ExperienceAction';

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
	addMoreRes: {
		padding: 6,
		marginLeft: 5,
		backgroundColor: '#22A19A',
		color: 'whitesmoke',
		// textAlign: 'left',
		// width: '70%',
		'&:hover': {
			color: '#22A19A',
			backgroundColor: 'whitesmoke',
			borderColor: '#22A19A',
			fontWeight: 'bold',
		},
		// [theme.breakpoints.up('md')]: {
		//     width: '10%',
		// },
		// [theme.breakpoints.down('sm')]: {
		//     // width: '12%',
		// },
	},
	table: {
		minWidth: 600,
	},
	dataTable: {
		marginTop: 40,
	},
	delete: {
		color: 'red'
	},
	resStyle: {
		marginTop: 10,
	}
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

const responsibilityInitialValues = {
	value: '',
};

const responsibilityValidationSchema = yup.object({
	value: yup.string().required(),
});

const authorityInitialValues = {
	value: '',
};

const authorityValidationSchema = yup.object({
	value: yup.string().required(),
});
const educationInitialValues = {
	value: '',
};

const educationValidationSchema = yup.object({
	value: yup.string().required(),
});
const skillInitialValues = {
	value: '',
};

const skillValidationSchema = yup.object({
	value: yup.string().required(),
});
const experienceInitialValues = {
	value: '',
};

const experienceValidationSchema = yup.object({
	value: yup.string().required(),
});

const Designation = ({ history }) => {
	const classes = useStyles();
	const [designation, setDesignation] = useState();
	const [responsibilities, setResponsibilities] = useState([]);
	const [authorities, setAuthorities] = useState([]);
	const [educationsState, setEducations] = useState([]);
	const [skillsState, setSkills] = useState([]);
	const [experiencesState, setExperiences] = useState([]);
	const { skills } = useSelector((state) => state.skills);
	const { educations } = useSelector((state) => state.educations);
	const { experiences } = useSelector((state) => state.experiences);

	const dispatch = useDispatch();

	useEffect(async () => {
		dispatch(getDesignation());
		dispatch(getSkills());
		dispatch(getEducations());
		dispatch(getExperiences());
	}, [dispatch]);

	const { designations, loading, error } = useSelector(
		(state) => state.designations,
	);

	const handleDeleteDesignation = async (params) => {
		dispatch(deleteDesignation(params));
	};

	const [open, setOpen] = useState(false);

	const handleClose = (props) => {
		setOpen(props);
	};

	const handleOpen = async (designation) => {
		setDesignation(designation);
		setOpen(true);
	};

	function addRes(value) {
		setResponsibilities((prev) => [...prev, value.value]);
	}
	function addAuth(value) {
		setAuthorities((prev) => [...prev, value.value]);
	}
	function addEdu(value) {
		setAuthorities((prev) => [...prev, value.value]);
	}
	function addSkill(value) {
		setAuthorities((prev) => [...prev, value.value]);
	}
	function addExp(value) {
		setAuthorities((prev) => [...prev, value.value]);
	}

	function removeRes(index) {
		setResponsibilities((prev) => {
			prev.splice(index, 1);
			console.log(prev);
			return [...prev];
		});
	}
	function removeAuth(index) {
		setAuthorities((prev) => {
			prev.splice(index, 1);
			console.log(prev);
			return [...prev];
		});
	}
	function removeEdu(index) {
		setEducations((prev) => {
			prev.splice(index, 1);
			console.log(prev);
			return [...prev];
		});
	}
	function removeSkill(index) {
		setSkills((prev) => {
			prev.splice(index, 1);
			console.log(prev);
			return [...prev];
		});
	}
	function removeExp(index) {
		setExperiences((prev) => {
			prev.splice(index, 1);
			console.log(prev);
			return [...prev];
		});
	}

	const onSubmit = async (props) => {
		dispatch(
			createDesignation({
				...props,
				responsibilities: [...responsibilities],
				authorities: [...authorities],
				criteria: { educationsState, skillsState, experiencesState },
			}),
		);
	};

	return (
		<Sidenav title={'Designation'}>
			{/* ============products form component */}
			<EditDesignation
				show={open}
				handler={handleClose}
				designation={designation}
			/>
			{/* ============products form component */}
			<div>
				<Container className={classes.mainContainer}>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={onSubmit}>
						{(props) => (
							<>
								<Form>
									<CssTextField
										id='outlined-basic'
										label='Designation Name'
										variant='outlined'
										type='text'
										autocomplete='off'
										size='small'
										style={{ width: '25%' }}
										inputProps={{ style: { fontSize: 14 } }}
										InputLabelProps={{ style: { fontSize: 14 } }}
										onChange={props.handleChange('name')}
										onBlur={props.handleBlur('name')}
										value={props.values.name}
										helperText={props.touched.name && props.errors.name}
										error={props.touched.name && props.errors.name}
									/>
								</Form>
								<div style={{ margin: '3rem 0rem 2rem 0rem', textDecoration: 'underline' }}>
									<h4>Competence Criteria</h4>
								</div>
								<Formik
									initialValues={educationInitialValues}
									validationSchema={educationValidationSchema}
									onSubmit={addEdu}>
									{
										(props) => (
											<Form>
												<h5>Educations</h5>
												<div style={{ display: 'flex', }}>
													<CssTextField
														id='outlined-basic'
														label='Education'
														variant='outlined'
														type='text'
														autocomplete='off'
														size='small'
														select
														style={{ width: '25%' }}
														inputProps={{ style: { fontSize: 14 } }}
														InputLabelProps={{ style: { fontSize: 14 } }}
														onChange={props.handleChange('value')}
														onBlur={props.handleBlur('value')}
														value={props.values.value}
														helperText={props.touched.value && props.errors.value}
														error={props.touched.value && props.errors.value}>
														{
															educations &&
															educations.map((education, i) => (
																<MenuItem value={education._id} key={i}>
																	{education.name}
																</MenuItem>
															))
														}
													</CssTextField>
													{/* <div style={{ margin: '0rem 1rem', display: 'inline-block' }}></div> */}
													<Button
														variant="outlined"
														classNames={classes.addMoreRes}
														text='Add'
														// loading={true}
														loaderColor="#333"
													/>

												</div>
												{
													authorities.map((res, i) => (
														<p className={classes.resStyle}>
															<span style={{ fontSize: 13 }}>{i + 1}. </span>
															{res}
															<DeleteOutlineIcon
																type='button'
																className={classes.delete}
																onClick={() => removeRes(i)}
															/>
														</p>
													))
												}
											</Form>
										)
									}
								</Formik>
								<div style={{ margin: '2rem 0rem' }}></div>

								<Formik
									initialValues={authorityInitialValues}
									validationSchema={authorityValidationSchema}
									onSubmit={addAuth}>
									{
										(props) => (
											<Form>
												<h5>Skills</h5>
												<div style={{ display: 'flex', }}>
													<CssTextField
														id='outlined-basic'
														label='Skills'
														variant='outlined'
														type='text'
														autocomplete='off'
														size='small'
														select
														style={{ width: '25%' }}
														inputProps={{ style: { fontSize: 14 } }}
														InputLabelProps={{ style: { fontSize: 14 } }}
														onChange={props.handleChange('value')}
														onBlur={props.handleBlur('value')}
														value={props.values.value}
														helperText={props.touched.value && props.errors.value}
														error={props.touched.value && props.errors.value}>
														{
															skills &&
															skills.map((skill, i) => (
																<MenuItem value={skill._id} key={i}>
																	{skill.skill}
																</MenuItem>
															))
														}
													</CssTextField>
													<Button
														variant="outlined"
														text='Add'
														loaderColor="#333"
														// loading={true}
														classNames={classes.addMoreRes}
													/>
												</div>
												{
													authorities.map((res, i) => (
														<p className={classes.resStyle}>
															<span style={{ fontSize: 13 }}>{i + 1}. </span>
															{res}
															<DeleteOutlineIcon
																type='button'
																className={classes.delete}
																onClick={() => removeRes(i)}
															/>
														</p>
													))
												}
											</Form>
										)
									}
								</Formik>
								<div style={{ margin: '2rem 0rem' }}></div>
								<Formik
									initialValues={authorityInitialValues}
									validationSchema={authorityValidationSchema}
									onSubmit={addAuth}>
									{
										(props) => (
											<Form>
												<h5>Experiences</h5>
												<div style={{ display: 'flex', }}>
													<CssTextField
														id='outlined-basic'
														label='Experience'
														variant='outlined'
														type='text'
														autocomplete='off'
														size='small'
														select
														style={{ width: '25%' }}
														inputProps={{ style: { fontSize: 14 } }}
														InputLabelProps={{ style: { fontSize: 14 } }}
														onChange={props.handleChange('value')}
														onBlur={props.handleBlur('value')}
														value={props.values.value}
														helperText={props.touched.value && props.errors.value}
														error={props.touched.value && props.errors.value}>
														{
															experiences &&
															experiences.map((skill, i) => (
																<MenuItem value={skill._id} key={i}>
																	{skill.name}
																</MenuItem>
															))
														}
													</CssTextField>
													<Button
														variant="outlined"
														text='Add'
														loaderColor="#333"
														// loading={true}
														classNames={classes.addMoreRes}
													/>
												</div>
												{
													authorities.map((res, i) => (
														<p className={classes.resStyle}>
															<span style={{ fontSize: 13 }}>{i + 1}. </span>
															{res}
															<DeleteOutlineIcon
																type='button'
																className={classes.delete}
																onClick={() => removeRes(i)}
															/>
														</p>
													))
												}
											</Form>
										)
									}
								</Formik>
								<Form>
									<div>
										<Button
											variant="outlined"
											classNames={classes.addButton}
											text='Add'
											loading={true}
											loaderColor="#22A19A"
										/>
									</div>
								</Form>
							</>
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
									<StyledTableCell align='center'>Sr.No</StyledTableCell>
									<StyledTableCell align='center'>Designation</StyledTableCell>
									<StyledTableCell align='center'>Action</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{
									loading ? (
										<Loading />
									) : error ? (
										<MaterialError />
									) : designations.length ? (
										designations.map((designation, i) => (
											<StyledTableRow>
												<StyledTableCell className='text-dark bg-light' align='center'>
													{i + 1}
												</StyledTableCell>
												<StyledTableCell className='text-dark bg-light' align='center'>
													{designation.name}
												</StyledTableCell>
												<StyledTableCell className='text-light bg-light' align='center'>
													<div style={{ display: 'flex', justifyContent: 'center' }}>
														<Button
															variant='contained'
															size='small'
															text='View'
															classNames='btn btn-sm bg-dark text-light'
															style={{ marginTop: 2 }}
															onClick={() =>
																history.push({
																	pathname: '/hr/competence_criteria_print',
																	state: { designation },
																})
															}
															/>
														<Button
															variant='contained'
															classNames='bg-dark text-light'
															size='small'
															text='Edit'
															style={{ marginTop: 2, marginLeft: 2 }}
															onClick={() => 
																handleOpen(designation)
															}
															/>
														<Button
															variant='contained'
															color='secondary'
															size='small'
															text='Delete'
															classNames='bg-danger text-light'
															style={{ marginLeft: 2, marginTop: 2 }}
															onClick={() => 
																handleDeleteDesignation(designation._id)
															}
														/>
													</div>
												</StyledTableCell>
											</StyledTableRow>
										))
									) : (
										<h5>Not Found</h5>
									)
								}
							</TableBody>
						</Table>
					</TableContainer>
				</div>
			</div>
		</Sidenav>
	);
};

export default Designation;
