import React, { useState, useEffect } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { useForm } from 'react-hook-form';
import MenuItem from '@material-ui/core/MenuItem';
import PreRequisites from './PreRequisites';

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

const TrainingNeedPreReq = () => {
	const classes = useStyles();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const dispatch = useDispatch();

	useEffect(async () => {
		// await dispatch(fetchDesignationAction())
	}, [dispatch]);

	// const { designations, loading, error } = useSelector(state => state.designations)

	const onSubmitDate = async (props) => {
		// try {
		//     await axios.post(`${process.env.REACT_APP_API_URL}/designation`, props)
		//     window.location.reload()
		//     console.log('submit');
		//     // setAddMatError(false)
		// }
		// catch (error) {
		//     console.log(error);
		//     // setAddMatError(true)
		// }
	};

	return (
		<Sidenav title={'Training Needs Pre-Requestions'}>
			<div>
				<Container className={classes.mainContainer}>
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
						)}
						<PreRequisites />
						{/* {
                                !designations || !designations.length ? <p>Data Not Found</p> :
                                    designations.map(designation => (
                                        <MenuItem value={designation._id} key={designation._id}>{designation.name}</MenuItem>
                                    ))
                            } */}
						<div>
							<Button variant='outlined' type='submit' className={classes.addButton}>
								Add
							</Button>
						</div>
					</form>
				</Container>
			</div>
		</Sidenav>
	);
};

export default TrainingNeedPreReq;
