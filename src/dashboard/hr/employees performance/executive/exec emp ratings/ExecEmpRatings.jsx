import React, { useEffect } from 'react';
import Sidenav from '../../../../SideNav/Sidenav';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Formik, Form } from 'formik';
import * as yup from 'yup';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: '25ch',
		},
	},
	mainContainer: {
		textAlign: 'center',
		marginTop: 20,
	},
	mainContainer1: {
		textAlign: 'left',
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
			width: '15%',
		},
		[theme.breakpoints.down('sm')]: {
			// width: '12%',
		},
	},
	addMoreParaBtn: {
		marginTop: 10,
		padding: 7,
		backgroundColor: '#22A19A',
		color: 'whitesmoke',
		'&:hover': {
			border: 'none',
			color: '#22A19A',
		},
	},
	addMoreBtn: {
		marginTop: 15,
		padding: 8,
		marginLeft: -90,
		backgroundColor: '#22A19A',
		color: 'whitesmoke',
		'&:hover': {
			border: 1,
			color: '#22A19A',
			fontWeight: 'bold',
			backgroundColor: 'whitesmoke',
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
	name: '',
	description: '',
	min: '',
	max: '',
	calculated: '',
};

const validationSchema = yup.object({
	name: yup.string().required(),
	description: yup.string().required(),
	min: yup.number().required(),
	max: yup.number().required(),
	calculated: yup.number().required(),
});

const ExecEmpRatings = () => {
	const classes = useStyles();

	const dispatch = useDispatch();

	useEffect(async () => {
		// await dispatch(getMaterialAction());
	}, [dispatch]);

	const onSubmit = async (values) => {
		console.log(values);
	};

	return (
		<Sidenav title={'Executive Employee Ratings'}>
			<div>
				<Container className={classes.mainContainer}>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={onSubmit}>
						{(props) => (
							<Form>
								<Grid container spacing={1} style={{ marginTop: 20 }}>
									<Grid item lg={2} md={2} sm={12} xs={12}>
										<CssTextField
											id='outlined-basic'
											label='Rating Name'
											variant='outlined'
											type='text'
											autocomplete='off'
											size='small'
											style={{ width: '125%' }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('name')}
											onBlur={props.handleBlur('name')}
											value={props.values.name}
											helperText={props.touched.name && props.errors.name}
											error={props.touched.name && props.errors.name}
										/>
									</Grid>
									<Grid item lg={2} md={2} sm={12} xs={12}>
										<CssTextField
											id='outlined-basic'
											label='Description'
											variant='outlined'
											type='text'
											autocomplete='off'
											size='small'
											style={{ width: '125%', marginLeft: 50 }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('description')}
											onBlur={props.handleBlur('description')}
											value={props.values.description}
											helperText={props.touched.description && props.errors.description}
											error={props.touched.description && props.errors.description}
										/>
									</Grid>
									<Grid item lg={2} md={2} sm={12} xs={12}>
										<CssTextField
											id='outlined-basic'
											label='Calculated Value'
											variant='outlined'
											type='number'
											autocomplete='off'
											size='small'
											style={{ width: '125%', marginLeft: 100 }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('calculated')}
											onBlur={props.handleBlur('calculated')}
											value={props.values.calculated}
											helperText={props.touched.calculated && props.errors.calculated}
											error={props.touched.calculated && props.errors.calculated}
										/>
									</Grid>
									<Grid item lg={2} md={2} sm={12} xs={12}>
										<CssTextField
											id='outlined-basic'
											label='Min Value'
											variant='outlined'
											type='number'
											autocomplete='off'
											size='small'
											style={{ width: '125%', marginLeft: 150 }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('min')}
											onBlur={props.handleBlur('min')}
											value={props.values.min}
											helperText={props.touched.min && props.errors.min}
											error={props.touched.min && props.errors.min}
										/>
									</Grid>
									<Grid item lg={2} md={2} sm={12} xs={12}>
										<CssTextField
											id='outlined-basic'
											label='Max Value'
											variant='outlined'
											type='number'
											autocomplete='off'
											size='small'
											style={{ width: '125%', marginLeft: 200 }}
											inputProps={{ style: { fontSize: 14 } }}
											InputLabelProps={{ style: { fontSize: 14 } }}
											onChange={props.handleChange('max')}
											onBlur={props.handleBlur('max')}
											value={props.values.max}
											helperText={props.touched.max && props.errors.max}
											error={props.touched.max && props.errors.max}
										/>
									</Grid>
								</Grid>
								<div>
									<Button
										variant='outlined'
										color='primary'
										type='submit'
										className={classes.addButton}
										onClick={() => {
											// history.push('')
										}}>
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

export default ExecEmpRatings;
