import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { FastField, Field, Form } from 'formik';

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
	addMoreButton: {
		backgroundColor: '#22A19A',
		color: 'whitesmoke',
		marginLeft: 20,
		marginTop: 5,
		'&:hover': {
			color: '#22A19A',
			borderColor: '#22A19A',
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
	inputFieldStyle1: {
		[theme.breakpoints.up('md')]: {
			width: 250,
			marginLeft: 70,
		},
		[theme.breakpoints.down('sm')]: {
			width: 200,
		},
	},
	inputFieldStyle2: {
		[theme.breakpoints.up('md')]: {
			width: 250,
			marginLeft: 140,
		},
		[theme.breakpoints.down('sm')]: {
			width: 200,
		},
	},
	inputFieldStyle3: {
		[theme.breakpoints.up('md')]: {
			width: 250,
			marginLeft: 210,
		},
		[theme.breakpoints.down('sm')]: {
			width: 200,
		},
	},
	delete: {
		color: 'red',
		fontSize: 38,
		[theme.breakpoints.up('md')]: {
			marginLeft: 50,
			marginTop: -7,
		},
		[theme.breakpoints.down('sm')]: {
			marginTop: -10,
		},
	},
	deleteRowBtn: {
		marginLeft: 220,
		'&:hover': {
			border: 'none',
			background: 'none',
		},
	},
	uploadImgBtn: {
		paddingLeft: 20,
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

const NextToKin = ({ isHiring }) => {
	const classes = useStyles();

	return (
		<Container className={classes.mainContainer}>
			<h5 className='text-left'>Next To Kin</h5>
			<Grid container spacing={1} style={{ marginTop: 15 }}>
				<Grid item lg={3} md={3} sm={12} xs={12}>
					<FastField name='name'>
						{({ meta, field }) => (
							<CssTextField
								id='outlined-basic'
								label='Name'
								variant='outlined'
								type='text'
								disabled={isHiring ? true : false}
								style={{ width: '100%' }}
								size='small'
								autocomplete='off'
								inputProps={{ style: { fontSize: 14 } }}
								InputLabelProps={{ style: { fontSize: 14 } }}
								{...field}
								helperText={meta.touched && meta.error}
								error={meta.touched && meta.error}
							/>
						)}
					</FastField>
				</Grid>
				<Grid item lg={3} md={3} sm={12} xs={12}>
					<FastField name='relation'>
						{(props) => {
							const { field, meta } = props;
							return (
								<CssTextField
									id='outlined-basic'
									style={{ width: '100%' }}
									label='Relation'
									variant='outlined'
									disabled={isHiring ? true : false}
									type='text'
									size='small'
									autocomplete='off'
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
									{...field}
									helperText={meta.touched && meta.error}
									error={meta.touched && meta.error}
								/>
							);
						}}
					</FastField>
				</Grid>
				<Grid item lg={3} md={3} sm={12} xs={12}>
					<FastField name='address'>
						{(props) => {
							const { field, meta } = props;
							return (
								<CssTextField
									id='outlined-basic'
									label='Address'
									disabled={isHiring ? true : false}
									style={{ width: '100%' }}
									variant='outlined'
									type='text'
									size='small'
									autocomplete='off'
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
									{...field}
									helperText={meta.touched && meta.error}
									error={meta.touched && meta.error}
								/>
							);
						}}
					</FastField>
				</Grid>
				<Grid item lg={3} md={3} sm={12} xs={12}>
					<FastField name='contact'>
						{(props) => {
							const { field, meta } = props;
							return (
								<CssTextField
									id='outlined-basic'
									label='Contact No'
									disabled={isHiring ? true : false}
									variant='outlined'
									type='number'
									size='small'
									style={{ width: '100%' }}
									autocomplete='off'
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
									{...field}
									helperText={meta.touched && meta.error}
									error={meta.touched && meta.error}
								/>
							);
						}}
					</FastField>
				</Grid>
			</Grid>
		</Container>
	);
};

export default NextToKin;
