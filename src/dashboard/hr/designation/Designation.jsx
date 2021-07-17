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
import { useForm } from 'react-hook-form';
import axios from 'axios';
import {
	getDesignation,
	deleteDesignation,
	createDesignation,
} from '../../../services/action/DesignationAction';
// import { getEducations } from '../../../services/action/EducationAction';
// import { getSkills } from '../../../services/action/SkillsAction';
// import { getExperiences } from '../../../services/action/ExperienceAction';
import Loading from '../../purchase/material/Loading';
import MaterialError from '../../purchase/material/MaterialError';
import EditDesignation from './EditDesignation';
import Responsibilities from '../responsibilities/Responsibilities';
import Authorities from '../authorities/Authorities';
import CompetenceCriteria from './CompetenceCriteria';

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

const Designation = ({ history }) => {
	const classes = useStyles();
	const [designation, setDesignation] = useState();
	const [responsibilities, setResponsibilities] = useState([]);
	const [authorities, setAuthorities] = useState([]);
	const [compCriteria, setCompCriteria] = useState({
		educations: {
			req: [],
		},
		skills: {
			req: [],
		},
		experiences: {
			req: [],
		},
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const dispatch = useDispatch();

	useEffect(async () => {
		dispatch(getDesignation());
		// dispatch(getSkills());
		// dispatch(getEducations());
		// dispatch(getExperiences());
	}, [dispatch]);

	const { designations, loading, error } = useSelector(
		(state) => state.designations,
	);
	// const { skills } = useSelector((state) => state.skills);
	// const { experiences } = useSelector((state) => state.experiences);
	// const { educations } = useSelector((state) => state.educations);

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

	const onSubmitData = async (props) => {
		dispatch(
			createDesignation({
				...props,
				responsibilities: [...responsibilities],
				authorities: [...authorities],
				criteria: { ...compCriteria },
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
					<form onSubmit={handleSubmit(onSubmitData)}>
						{/* Material category selector */}
						<CssTextField
							id='outlined-basic'
							label='Designation Name'
							variant='outlined'
							type='text'
							autocomplete='off'
							size='small'
							className={classes.inputFieldStyle}
							inputProps={{ style: { fontSize: 14 } }}
							InputLabelProps={{ style: { fontSize: 14 } }}
							{...register('name', { required: true })}
						/>
						{errors.name?.type === 'required' && (
							<p className='mt-1 text-danger'>Designation Name is required</p>
						)}
						{/* <Responsibilities
							responsibilities={responsibilities}
							setResponsibilities={setResponsibilities}
						/>
						<Authorities authorities={authorities} setAuthorities={setAuthorities} /> */}
						<CompetenceCriteria
							compCriteria={compCriteria}
							setCompCriteria={setCompCriteria}
						/>
						<div>
							<Button variant='outlined' type='submit' className={classes.addButton}>
								Add
							</Button>
						</div>
					</form>
					{error && <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>}
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
								{loading ? (
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
												<>
													<Button
														variant='contained'
														size='small'
														className='btn btn-sm bg-dark text-light'
														onClick={() =>
															history.push({
																pathname: '/hr/competence_criteria_print',
																state: { designation },
															})
														}
														style={{ marginTop: 2 }}>
														View
													</Button>
													{/* <Button
														variant='contained'
														className='bg-dark text-light'
														size='small'
														onClick={() => handleOpen(designation)}
														style={{ marginTop: 2, marginLeft: 2 }}>
														Edit
													</Button> */}
													<Button
														variant='contained'
														color='secondary'
														size='small'
														onClick={() => handleDeleteDesignation(designation._id)}
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

export default Designation;
