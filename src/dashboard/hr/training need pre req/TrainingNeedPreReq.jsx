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

const initialValues = {
	department: '',
	designation: '',
};

const validationSchema = yup.object({
	department: '',
	designation: '',
});

const TrainingNeedPreReq = () => {
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

	return (
		<Sidenav title={'Training Needs Pre-Requestions'}>
			<div>
				<Container className={classes.mainContainer}>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={onSubmit}>
						{(props) => (
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
								<PreRequisites />
								<div>
									<Button variant='outlined' type='submit' className={classes.addButton}>
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

export default TrainingNeedPreReq;
