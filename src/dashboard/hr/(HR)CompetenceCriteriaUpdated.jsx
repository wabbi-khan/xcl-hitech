import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { useForm } from 'react-hook-form';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { getEducations } from '../../../services/action/EducationAction';
import { getSkills } from '../../../services/action/SkillsAction';
import { getExperiences } from '../../../services/action/ExperienceAction';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: '25ch',
		},
	},
	mainContainer: {
		marginTop: 20,
		marginLeft: 0,
	},
	addMoreRes: {
		marginTop: 2,
		padding: 6,
		marginLeft: 20,
		backgroundColor: '#22A19A',
		color: 'whitesmoke',
		fontWeight: 'bold',
		'&:hover': {
			color: '#22A19A',
			backgroundColor: 'whitesmoke',
			borderColor: '#22A19A',
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
	resStyle: {
		marginTop: 10,
		marginBottom: 0,
		fontSize: 16,
	},
	deleteResBtn: {
		border: 'none',
	},
	delete: {
		fontSize: 21,
		color: 'red',
		marginTop: -3,
		marginLeft: 10,
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

const CompetenceCriteria = ({ compCriteria, setCompCriteria }) => {
	const dispatch = useDispatch();
	const classes = useStyles();
	const [inputFields, setInputFields] = useState({
		educations: '',
		skills: '',
		experiences: '',
	});

	const {
		formState: { errors },
	} = useForm();

	React.useEffect(() => {
		dispatch(getSkills());
		dispatch(getEducations());
		dispatch(getExperiences());
	}, []);
	const { skills } = useSelector((state) => state.skills);
	const { educations } = useSelector((state) => state.educations);
	const { experiences } = useSelector((state) => state.experiences);

	const getValue = (valueOf) => {
		setCompCriteria({
			...compCriteria,
			[valueOf]: { req: [...compCriteria[valueOf].req, inputFields[valueOf]] },
		});
		setInputFields({ ...inputFields, [valueOf]: '' });
	};
	const removeRes = (index) => {
		// const temp = [...responsibilities];
		// temp.splice(index, 1);
		// setResponsibilities(temp);
	};

	const onChangeHandler = (value, placeholder) => {
		setInputFields({ ...inputFields, [placeholder]: value });
	};

	return (
		<div>
			<div style={{ marginTop: 30, marginBottom: 30 }}>
				<hr />
			</div>
			<Container className={classes.mainContainer}>
				<h4 className='text-left'>Competency Criteria</h4>
				<h6 className='text-left' style={{ margin: '10px 0px' }}>
					Education
				</h6>
				<CssTextField
					id='outlined-basic'
					label='Add Requirements'
					variant='outlined'
					type='text'
					size='small'
					select
					value={inputFields.educations}
					onChange={(e) => onChangeHandler(e.target.value, 'educations')}
					autocomplete='off'
					inputProps={{ style: { fontSize: 14 } }}
					style={{ width: '30%' }}
					InputLabelProps={{ style: { fontSize: 14 } }}>
					{educations &&
						educations.map((education, i) => (
							<MenuItem value={education._id} key={i}>
								{education.name}
							</MenuItem>
						))}
				</CssTextField>
				{errors.name?.type === 'required' && (
					<p className='mt-1 text-danger'>Min Requirements is required</p>
				)}
				<Button
					variant='contained'
					size='small'
					className={classes.addMoreRes}
					onClick={() => getValue('educations')}>
					Add
				</Button>

				{compCriteria.educations.req.map((education, i) => {
					const temp = educations.find((el) => el._id === education);
					return (
						<p className={classes.resStyle}>
							<span style={{ fontSize: 13 }}>{i + 1}. </span>
							{temp.name}
							<DeleteOutlineIcon
								type='button'
								className={classes.delete}
								onClick={() => removeRes(i)}
							/>
						</p>
					);
				})}

				<h6 className='text-left' style={{ margin: '20px 0px 10px 0px' }}>
					Skills
				</h6>
				<CssTextField
					id='outlined-basic'
					label='Select Category'
					variant='outlined'
					type='text'
					autoComplete='off'
					style={{ width: '30%' }}
					size='small'
					select
					value={inputFields.skills}
					onChange={(e) => onChangeHandler(e.target.value, 'skills')}
					inputProps={{ style: { fontSize: 14 } }}
					InputLabelProps={{ style: { fontSize: 14 } }}>
					{skills &&
						skills.map((skill, i) => (
							<MenuItem value={skill._id} key={i}>
								{skill.skill}
							</MenuItem>
						))}
				</CssTextField>
				{errors.name?.type === 'required' && (
					<p className='mt-1 text-danger'>Min Requirements is required</p>
				)}
				<Button
					variant='contained'
					size='small'
					className={classes.addMoreRes}
					onClick={() => getValue('skills')}>
					Add
				</Button>
				{compCriteria.skills.req.map((skill, i) => {
					const temp = skills.find((el) => el._id === skill);

					return (
						<p className={classes.resStyle}>
							<span style={{ fontSize: 13 }}>{i + 1}. </span>
							{temp.skill}
							<DeleteOutlineIcon
								type='button'
								className={classes.delete}
								onClick={() => removeRes(i)}
							/>
						</p>
					);
				})}

				<h6 className='text-left' style={{ margin: '20px 0px 10px 0px' }}>
					Experiences
				</h6>
				<CssTextField
					id='outlined-basic'
					label='Add Requirements'
					variant='outlined'
					type='text'
					size='small'
					autocomplete='off'
					select
					value={inputFields.experiences}
					onChange={(e) => onChangeHandler(e.target.value, 'experiences')}
					inputProps={{ style: { fontSize: 14 } }}
					style={{ width: '30%' }}
					InputLabelProps={{ style: { fontSize: 14 } }}>
					{experiences &&
						experiences.map((experience, i) => (
							<MenuItem value={experience._id} key={i}>
								{experience.name}
							</MenuItem>
						))}
				</CssTextField>
				{errors.name?.type === 'required' && (
					<p className='mt-1 text-danger'>Min Requirements is required</p>
				)}
				<Button
					variant='contained'
					size='small'
					className={classes.addMoreRes}
					onClick={() => getValue('experiences')}>
					Add
				</Button>
				{compCriteria.experiences.req.map((experience, i) => {
					const temp = experiences.find((el) => el._id === experience);
					return (
						<p className={classes.resStyle}>
							<span style={{ fontSize: 13 }}>{i + 1}. </span>
							{temp.name}
							<DeleteOutlineIcon
								type='button'
								className={classes.delete}
								onClick={() => removeRes(i)}
							/>
						</p>
					);
				})}

				{/* {compCriteria.minReq.map((el) => (
					<p>{el}</p>
				))} */}

				{
					// responsibilities.map((res, i) => (
					//     <p className={classes.resStyle}>
					//         <span style={{ fontSize: 30 }}>.</span>
					//         {res}
					//         <DeleteOutlineIcon
					//             type="button"
					//             className={classes.delete}
					//             onClick={() => removeRes(i)}
					//         />
					//         {/* <Button
					//             variant="outlined" size="small"
					//             className={classes.deleteResBtn}
					//         >
					//         </Button> */}
					//     </p>
					// )
					// )
				}
				{/* {
                                !designations || !designations.length ? <p>Data Not Found</p> :
                                    designations.map(designation => (
                                        <MenuItem value={designation._id} key={designation._id}>{designation.name}</MenuItem>
                                    ))
                            } */}
			</Container>
		</div>
	);
};

export default CompetenceCriteria;
