import React, { useState, useEffect } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
// import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
// import MenuItem from '@material-ui/core/MenuItem';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { fetchCompCriteriaAction } from '../../../services/action/CriteriaAction';
import Loading from '../../purchase/material/Loading';
import MaterialError from '../../purchase/material/MaterialError';
import { getDesignation } from '../../../services/action/DesignationAction';
import { getEducations } from '../../../services/action/EducationAction';
import { getSkills } from '../../../services/action/SkillsAction';
import { getExperiences } from '../../../services/action/ExperienceAction';
import { fetchDepartmentsAction } from '../../../services/action/DepartmentAction';

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
		marginTop: 20,
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

const CompetenceCriteria = ({ history }) => {
	const classes = useStyles();
	const [Criteria, setCriteria] = useState();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchCompCriteriaAction());
		dispatch(getDesignation());
		dispatch(getEducations());
		dispatch(getSkills());
		dispatch(getExperiences());
		dispatch(fetchDepartmentsAction());
	}, [dispatch]);

	const { loading, criteria, error } = useSelector((state) => state.criteria);

	const { departments } = useSelector((state) => state.departments);
	const { designations } = useSelector((state) => state.designations);
	// const { education } = useSelector((state) => state.education);
	const { skills } = useSelector((state) => state.skills);
	// const { experience } = useSelector((state) => state.experience);

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
			await axios.delete(
				`${process.env.REACT_APP_API_URL}/criteria/${params}`
			);
			window.location.reload();
		} catch (error) {}
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
			<div>
				<div className={classes.dataTable}>
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
										Destination
									</StyledTableCell>
									<StyledTableCell align="center">
										Education
									</StyledTableCell>
									<StyledTableCell align="center">
										Experience
									</StyledTableCell>
									<StyledTableCell align="center">
										Skills
									</StyledTableCell>
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
											<StyledTableCell
												className="text-dark"
												align="center"
											>
												{i + 1}
											</StyledTableCell>
											<StyledTableCell
												className="text-dark"
												align="center"
											>
												{!criteria.department
													? null
													: criteria.department.name}
											</StyledTableCell>
											<StyledTableCell
												className="text-dark"
												align="center"
											>
												{!criteria.designation
													? null
													: criteria.designation.name}
											</StyledTableCell>
											<StyledTableCell
												className="text-dark"
												align="center"
											>
												{!criteria.education
													? null
													: criteria.education.name}
											</StyledTableCell>
											<StyledTableCell
												className="text-dark"
												align="center"
											>
												{!criteria.experience
													? null
													: criteria.experience.name}
											</StyledTableCell>
											<StyledTableCell
												className="text-dark"
												align="center"
											>
												{!criteria.skill
													? null
													: criteria.skill.skill}
											</StyledTableCell>
											<StyledTableCell
												className="text-light"
												align="center"
											>
												<>
													<Button
														variant="contained"
														className="bg-dark text-light"
														size="small"
														onClick={() => {
															handleOpen(criteria);
														}}
														style={{ marginTop: 2 }}
													>
														Edit
													</Button>
													<Button
														variant="contained"
														color="secondary"
														size="small"
														onClick={() =>
															deleteCriteria(criteria._id)
														}
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
			<div>
				<Grid container spacing={1}>
					<Grid item lg={5} md={5} sm={12} xs={12}></Grid>
					<Grid item lg={6} md={6} sm={12} xs={12}>
						<Button
							variant="outlined"
							color="primary"
							type="submit"
							className={classes.addButton}
							onClick={() =>
								history.push('/hr/competence_criteria_print')
							}
						>
							Print
						</Button>
					</Grid>
				</Grid>
			</div>
		</Sidenav>
	);
};

export default CompetenceCriteria;
