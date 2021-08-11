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
import Loader from 'react-loader-spinner';
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
		color: 'red',
	},
	resStyle: {
		marginTop: 10,
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
	const [designation, setDesignation] = useState();
	const [educationsState, setEducations] = useState([]);
	const [skillsState, setSkills] = useState([]);
	const [experiencesState, setExperiences] = useState([]);
	const [createLoading, setCreateLoading] = useState(false);
	const [createError, setCreateError] = useState('');
	const [success, setSuccess] = useState('');
	const [fetchLoading, setFetchLoading] = useState(true);
	const [fetchError, setFetchError] = useState('');
	const [deleteLoading, setDeleteLoading] = useState(false);
	const [deleteError, setDeleteError] = useState('');
	const [pageError, setPageError] = useState('');
	const [open, setOpen] = useState(false);

	const { skills } = useSelector((state) => state.skills);
	const { educations } = useSelector((state) => state.educations);
	const { experiences } = useSelector((state) => state.experiences);
	const { designations } = useSelector((state) => state.designations);

	const classes = useStyles();

	const dispatch = useDispatch();

	useEffect(async () => {
		setFetchLoading(true);
		dispatch(
			getDesignation(null, (err) => {
				if (err) {
					setFetchError(err);
					setTimeout(() => {
						setFetchError('');
					}, 4000);
				}
				setFetchLoading(false);
			}),
		);
		dispatch(getSkills());
		dispatch(getEducations());
		dispatch(getExperiences());
	}, [dispatch]);

	const handleClose = (props) => {
		setOpen(props);
	};

	const handleOpen = async (designation) => {
		setDesignation(designation);
		setOpen(true);
	};

	const setError = (error) => {
		setPageError(error);
		setTimeout(() => {
			setPageError('');
		}, 4000);
	};

	function addEdu(el) {
		const index = educationsState.indexOf(el);
		if (index === -1) {
			setEducations((prev) => [...prev, el]);
		} else {
			setError(`${el?.name} is already added in the Educations`);
		}
	}

	function addSkill(el) {
		const index = skillsState.indexOf(el);
		if (index === -1) {
			setSkills((prev) => [...prev, el]);
		} else {
			setError(`${el?.skill} is already added in the Skills`);
		}
	}

	function addExp(el) {
		const index = experiencesState.indexOf(el);

		if (index === -1) {
			setExperiences((prev) => [...prev, el]);
		} else {
			setError(`${el?.name} is already added in the Experiences`);
		}
	}

	function removeEdu(el) {
		setEducations((prev) => prev.filter((value) => value._id !== el?._id));
	}

	function removeSkill(el) {
		setSkills((prev) => prev.filter((value) => value._id !== el?._id));
	}

	function removeExp(el) {
		setExperiences((prev) => prev.filter((value) => value._id !== el?._id));
	}

	const onSubmit = async (values) => {
		values = {
			...values,
			educations: educationsState,
			skills: skillsState,
			experiences: experiencesState,
		};
		setCreateLoading(true);
		dispatch(
			createDesignation(values, (err) => {
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

	const handleDeleteDesignation = async (params) => {
		setDeleteLoading(true);
		dispatch(
			deleteDesignation(params, (err) => {
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

	return (
		<Sidenav title={'Designation'}>
			<EditDesignation
				show={open}
				handler={handleClose}
				designation={designation}
			/>
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
				{pageError && <p>{pageError}</p>}
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
								<div
									style={{ margin: '3rem 0rem 2rem 0rem', textDecoration: 'underline' }}>
									<h4>Competence Criteria</h4>
								</div>
								<Formik
									initialValues={educationInitialValues}
									validationSchema={educationValidationSchema}
									onSubmit={addEdu}>
									{(props) => (
										<Form>
											<h5>Educations</h5>
											<div style={{ display: 'flex' }}>
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
													{educations &&
														educations.map((education, i) => (
															<MenuItem
																value={education._id}
																key={i}
																onClick={() => addEdu(education)}>
																{education.name}
															</MenuItem>
														))}
												</CssTextField>
											</div>
											{educationsState.map((el, i) => (
												<p className={classes.resStyle}>
													<span style={{ fontSize: 13 }}>{i + 1}. </span>
													{el?.name}
													<DeleteOutlineIcon
														type='button'
														className={classes.delete}
														onClick={() => removeEdu(el)}
													/>
												</p>
											))}
										</Form>
									)}
								</Formik>
								<div style={{ margin: '2rem 0rem' }}></div>

								<Formik
									initialValues={skillInitialValues}
									validationSchema={skillValidationSchema}
									onSubmit={addSkill}>
									{(props) => (
										<Form>
											<h5>Skills</h5>
											<div style={{ display: 'flex' }}>
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
													{skills &&
														skills.map((el, i) => (
															<MenuItem value={el._id} key={i} onClick={() => addSkill(el)}>
																{el.skill}
															</MenuItem>
														))}
												</CssTextField>
											</div>
											{skillsState.map((el, i) => (
												<p className={classes.resStyle}>
													<span style={{ fontSize: 13 }}>{i + 1}. </span>
													{el?.skill}
													<DeleteOutlineIcon
														type='button'
														className={classes.delete}
														onClick={() => removeSkill(el)}
													/>
												</p>
											))}
										</Form>
									)}
								</Formik>
								<div style={{ margin: '2rem 0rem' }}></div>
								<Formik
									initialValues={experienceInitialValues}
									validationSchema={experienceValidationSchema}
									onSubmit={addExp}>
									{(props) => (
										<Form>
											<h5>Experiences</h5>
											<div style={{ display: 'flex' }}>
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
													{experiences &&
														experiences.map((el, i) => (
															<MenuItem value={el._id} key={i} onClick={() => addExp(el)}>
																{el.name}
															</MenuItem>
														))}
												</CssTextField>
											</div>
											{experiencesState.map((el, i) => (
												<p className={classes.resStyle}>
													<span style={{ fontSize: 13 }}>{i + 1}. </span>
													{el?.name}
													<DeleteOutlineIcon
														type='button'
														className={classes.delete}
														onClick={() => removeExp(el)}
													/>
												</p>
											))}
										</Form>
									)}
								</Formik>
								<Form>
									<div>
										<Button
											variant='outlined'
											classNames={classes.addButton}
											text='Add'
											loading={createLoading}
											loaderColor='#22A19A'
										/>
									</div>
									{createError && <p>{createError}</p>}
								</Form>
							</>
						)}
					</Formik>
				</Container>

				{fetchError && <p>{fetchError}</p>}
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
				) : designations?.length === 0 ? (
					<p>There are no Designation</p>
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
										<StyledTableCell align='center'>Designation</StyledTableCell>
										<StyledTableCell align='center'>Educations</StyledTableCell>
										<StyledTableCell align='center'>Skills</StyledTableCell>
										<StyledTableCell align='center'>Experiences</StyledTableCell>
										<StyledTableCell align='center'>Action</StyledTableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{designations.map((el, i) => (
										<StyledTableRow>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{i + 1}
											</StyledTableCell>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{el.name}
											</StyledTableCell>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{el?.educations?.map((bottomEl, i) => (
													<>
														<p style={{ margin: '0', padding: '0' }}>
															{bottomEl?.name}
															{el?.educations?.length - 1 > i && <span>/</span>}
														</p>
													</>
												))}
											</StyledTableCell>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{el?.skills?.map((el) => (
													<p style={{ margin: '0', padding: '0' }}>{el?.skill}</p>
												))}
											</StyledTableCell>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{el?.experiences?.map((el) => (
													<p style={{ margin: '0', padding: '0' }}>{el?.name}</p>
												))}
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
																state: { designation: el },
															})
														}
													/>
													<Button
														variant='contained'
														classNames='bg-dark text-light'
														size='small'
														text='Edit'
														style={{ marginTop: 2, marginLeft: 2 }}
														onClick={() => handleOpen(el)}
													/>
													<Button
														variant='contained'
														color='secondary'
														size='small'
														text='Delete'
														classNames='bg-danger text-light'
														style={{ marginLeft: 2, marginTop: 2 }}
														onClick={() => handleDeleteDesignation(el._id)}
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

export default Designation;
