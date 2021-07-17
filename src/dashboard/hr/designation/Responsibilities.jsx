import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { useForm } from 'react-hook-form';

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
			// marginLeft: 10,
		},
		[theme.breakpoints.down('sm')]: {
			width: 200,
			marginTop: 10,
		},
	},
	resStyle: {
		marginTop: 8,
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

const Responsibilities = ({ responsibilities, setResponsibilities }) => {
	const classes = useStyles();
	const [resString, setResString] = useState('');

	const {
		formState: { errors },
	} = useForm();

	const getValue = (e) => {
		setResponsibilities([...responsibilities, resString]);
		setResString('');
	};

	const removeRes = (index) => {
		const temp = [...responsibilities];
		temp.splice(index, 1);
		// setResponsibilities(temp);
	};

	return (
		<div>
			<div style={{ marginTop: 30, marginBottom: 30 }}>
				<hr />
			</div>
			<Container className={classes.mainContainer}>
				<h4 className='text-left'>Responsibilities</h4>

				{errors.name?.type === 'required' && (
					<p className='mt-1 text-danger'>Responsibilities is required</p>
				)}
			</Container>
		</div>
	);
};

export default Responsibilities;
