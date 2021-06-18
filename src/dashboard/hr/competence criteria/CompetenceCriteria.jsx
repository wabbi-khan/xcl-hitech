import React, { useState, useEffect } from 'react';
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
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { fetchCompCriteriaAction } from '../../../services/action/CriteriaAction';
import Loading from '../../purchase/material/Loading';
import MaterialError from '../../purchase/material/MaterialError';
import { getDesignation } from '../../../services/action/DesignationAction';
import { fetchEducationAction } from '../../../services/action/EducationAction';
import { fetchSkillsAction } from '../../../services/action/SkillsAction';
import { fetchExperienceAction } from '../../../services/action/ExperienceAction';
import { fetchDepartmentsAction } from '../../../services/action/DepartmentAction';
import EditCompCriteria from './EditCompCriteria';

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

const CompetenceCriteria = ({ history }) => {
	const classes = useStyles();
	const [Criteria, setCriteria] = useState();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const dispatch = useDispatch();

	useEffect(async () => {
		await dispatch(fetchCompCriteriaAction());
		await dispatch(getDesignation());
		await dispatch(fetchEducationAction());
		await dispatch(fetchSkillsAction());
		await dispatch(fetchExperienceAction());
		await dispatch(fetchDepartmentsAction());
	}, [dispatch]);

	const { loading, criteria, error } = useSelector((state) => state.criteria);
	console.log(criteria);

	const { departments } = useSelector((state) => state.departments);
	const { designations } = useSelector((state) => state.designations);
	const { education } = useSelector((state) => state.education);
	const { skills } = useSelector((state) => state.skills);
	const { experience } = useSelector((state) => state.experience);

	const onSubmitData = async (props) => {
		// try {
		//     await axios.post(`${process.env.REACT_APP_API_URL}/material`, props)
		//     window.location.reload()
		//     setAddMatError(false)
		// }
		// catch (error) {
		//     setAddMatError(true)
		// }
	};

	const deleteCriteria = async (params) => {
		try {
			await axios.delete(`${process.env.REACT_APP_API_URL}/criteria/${params}`);
			window.location.reload();
		} catch (error) {
			console.log(error);
		}
	};

	const [open, setOpen] = useState(false);

	const handleClose = (props) => {
		setOpen(props);
	};

	const handleOpen = async (criteria) => {
		setCriteria(criteria);
		setOpen(true);
	};

	return (
		<Sidenav title={'Competence Criteria'}>
			{/* ============Edit competence criteria form component */}
			<EditCompCriteria show={open} handler={handleClose} criteria={Criteria} />
			{/* ============Edit competence criteria form component */}
			<div>
				<Container className={classes.mainContainer}>
					<form onSubmit={handleSubmit(onSubmitData)}>
						<Grid container spacing={1}>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='Select Department'
									variant='outlined'
									type='text'
									size='small'
									autocomplete='off'
									select
									className={classes.inputFieldStyle}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
									{...register('name', { required: true })}>
									{!departments || !departments.length ? (
										<p>Data Not Found</p>
									) : (
										departments.map((dept) => (
											<MenuItem value={dept._id} key={dept._id}>
												{dept.name}
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
									size='small'
									autocomplete='off'
									select
									className={classes.inputFieldStyle}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
									{...register('name', { required: true })}>
									{!designations || !designations.length ? (
										<p>Data Not Found</p>
									) : (
										designations.map((designation) => (
											<MenuItem value={designation._id} key={designation._id}>
												{designation.name}
											</MenuItem>
										))
									)}
								</CssTextField>
							</Grid>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='Education'
									variant='outlined'
									type='text'
									autocomplete='off'
									size='small'
									select
									className={classes.inputFieldStyle}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
									{...register('email', { required: true })}>
									{!education || !education.length ? (
										<p>Data Not Found</p>
									) : (
										education.map((edu) => (
											<MenuItem value={edu._id} key={edu._id}>
												{edu.name}
											</MenuItem>
										))
									)}
								</CssTextField>
							</Grid>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='Skills'
									variant='outlined'
									type='text'
									autocomplete='off'
									size='small'
									select
									className={classes.inputFieldStyle}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
									{...register('email', { required: true })}>
									{!skills || !skills.length ? (
										<p>Data Not Found</p>
									) : (
										skills.map((skill) => (
											<MenuItem value={skill._id} key={skill._id}>
												{skill.skill}
											</MenuItem>
										))
									)}
								</CssTextField>
							</Grid>
						</Grid>
						<Grid container spacing={1} className='mt-3'>
							<Grid item lg={3} md={3} sm={12} xs={12}>
								<CssTextField
									id='outlined-basic'
									label='Experience'
									variant='outlined'
									type='email'
									autocomplete='off'
									size='small'
									select
									className={classes.inputFieldStyle}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
									{...register('email', { required: true })}>
									{!experience || !experience.length ? (
										<p>Data Not Found</p>
									) : (
										experience.map((exp) => (
											<MenuItem value={exp._id} key={exp._id}>
												{exp.name}
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
								className={classes.addButton}
								onClick={() => {
									history.push('/hr/competence_criteria_print');
								}}>
								Add
							</Button>
						</div>
					</form>
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
									<StyledTableCell align='center'>Department</StyledTableCell>
									<StyledTableCell align='center'>Destination</StyledTableCell>
									<StyledTableCell align='center'>Education</StyledTableCell>
									<StyledTableCell align='center'>Experience</StyledTableCell>
									<StyledTableCell align='center'>Skills</StyledTableCell>
									<StyledTableCell align='center'>Action</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{loading ? (
									<Loading />
								) : error ? (
									<MaterialError />
								) : criteria.length ? (
									criteria.map((criteria, i) => (
										<StyledTableRow key={i}>
											<StyledTableCell className='text-dark' align='center'>
												{i + 1}
											</StyledTableCell>
											<StyledTableCell className='text-dark' align='center'>
												{!criteria.department ? null : criteria.department.name}
											</StyledTableCell>
											<StyledTableCell className='text-dark' align='center'>
												{!criteria.designation ? null : criteria.designation.name}
											</StyledTableCell>
											<StyledTableCell className='text-dark' align='center'>
												{!criteria.education ? null : criteria.education.name}
											</StyledTableCell>
											<StyledTableCell className='text-dark' align='center'>
												{!criteria.experience ? null : criteria.experience.name}
											</StyledTableCell>
											<StyledTableCell className='text-dark' align='center'>
												{!criteria.skill ? null : criteria.skill.skill}
											</StyledTableCell>
											<StyledTableCell className='text-light' align='center'>
												<>
													<Button
														variant='contained'
														className='bg-dark text-light'
														size='small'
														onClick={() => {
															handleOpen(criteria);
														}}
														style={{ marginTop: 2 }}>
														Edit
													</Button>
													<Button
														variant='contained'
														color='secondary'
														size='small'
														onClick={() => deleteCriteria(criteria._id)}
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
								{/* {
                                    loading ? (
                                        <Loading />
                                    ) :
                                        error ? (
                                            <MaterialError />
                                        ) :
                                            (
                                                !vendors || !vendors.length ? <p>Not Found</p> :
                                                    vendors.map((vendor, i) => (
                                                        <StyledTableRow key={i}>
                                                            <StyledTableCell className="text-dark" align="center">{i + 1}</StyledTableCell>
                                                            <StyledTableCell className="text-dark" align="center">{vendor.name}</StyledTableCell>
                                                            <StyledTableCell className="text-dark" align="center">{vendor.phone}</StyledTableCell>
                                                            <StyledTableCell className="text-dark" align="center">{vendor.location}</StyledTableCell>
                                                            <StyledTableCell className="text-dark" align="center">{vendor.category.name}</StyledTableCell>
                                                            <StyledTableCell className="text-dark" align="center">
                                                                {
                                                                    !vendor.material || !vendor.material.length ? <p>Not Found</p> :
                                                                        vendor.material.map((value, i) => (
                                                                            <span key={i} className="ml-1">{value.name},</span>
                                                                        ))
                                                                }
                                                            </StyledTableCell>
                                                            <StyledTableCell className="text-light" align="center">
                                                                <><Button variant="contained" className="bg-dark text-light" size="small"
                                                                    onClick={() => {

                                                                    }}
                                                                    style={{ marginTop: 2 }} >
                                                                    Edit
                                                                </Button>
                                                                    <Button variant="contained" color="secondary" size="small"
                                                                        onClick={() => deleteMaterial(vendor._id)}
                                                                        style={{ marginLeft: 2, marginTop: 2 }}>
                                                                        Delete
                                                                    </Button></>
                                                            </StyledTableCell>
                                                        </StyledTableRow>
                                                    ))
                                            )
                                } */}
							</TableBody>
						</Table>
					</TableContainer>
				</div>
			</div>
		</Sidenav>
	);
};

export default CompetenceCriteria;
