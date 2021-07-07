// import React, { useState } from 'react';
// import { makeStyles, withStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
// import Container from '@material-ui/core/Container';
// import Button from '@material-ui/core/Button';
// import { useForm } from 'react-hook-form';
// import MenuItem from '@material-ui/core/MenuItem';
// import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

// const useStyles = makeStyles((theme) => ({
// 	root: {
// 		'& > *': {
// 			margin: theme.spacing(1),
// 			width: '25ch',
// 		},
// 	},
// 	mainContainer: {
// 		marginTop: 20,
// 		marginLeft: 0,
// 	},
// 	addMoreRes: {
// 		marginTop: 2,
// 		padding: 6,
// 		marginLeft: 20,
// 		backgroundColor: '#22A19A',
// 		color: 'whitesmoke',
// 		fontWeight: 'bold',
// 		'&:hover': {
// 			color: '#22A19A',
// 			backgroundColor: 'whitesmoke',
// 			borderColor: '#22A19A',
// 		},
// 		// [theme.breakpoints.up('md')]: {
// 		//     width: '10%',
// 		// },
// 		// [theme.breakpoints.down('sm')]: {
// 		//     // width: '12%',
// 		// },
// 	},
// 	table: {
// 		minWidth: 600,
// 	},
// 	dataTable: {
// 		marginTop: 40,
// 	},
// 	inputFieldStyle: {
// 		[theme.breakpoints.up('md')]: {
// 			width: 330,
// 		},
// 		[theme.breakpoints.down('sm')]: {
// 			width: 200,
// 		},
// 	},
// 	inputFieldStyle1: {
// 		[theme.breakpoints.up('md')]: {
// 			width: 330,
// 			marginLeft: 10,
// 		},
// 		[theme.breakpoints.down('sm')]: {
// 			width: 200,
// 			marginTop: 10,
// 		},
// 	},
// 	resStyle: {
// 		marginTop: 10,
// 		marginBottom: 0,
// 		fontSize: 16,
// 	},
// 	deleteResBtn: {
// 		border: 'none',
// 	},
// 	delete: {
// 		fontSize: 21,
// 		color: 'red',
// 		marginTop: -3,
// 		marginLeft: 10,
// 	},
// }));

// const CssTextField = withStyles({
// 	root: {
// 		'& label.Mui-focused': {
// 			color: 'black',
// 		},
// 		'& .MuiOutlinedInput-root': {
// 			'& fieldset': {
// 				borderColor: 'black',
// 			},
// 			'&.Mui-focused fieldset': {
// 				borderColor: 'black',
// 			},
// 		},
// 	},
// })(TextField);

// const PreRequisites = () => {
// 	const classes = useStyles();
// 	const [compCriterias, setCompCriterias] = useState([
// 		{
// 			parameter: '',
// 			minReq: [],
// 			minReqString: '',
// 		},
// 	]);
// 	const [responsibilities, setResponsibilities] = useState([]);

// 	const {
// 		register,
// 		handleSubmit,
// 		formState: { errors },
// 	} = useForm();

// 	const getValue = (i) => {
// 		const temp = [...compCriterias];
// 		temp[i].minReq = [...temp[i].minReq, temp[i].minReqString];
// 		setCompCriterias([...temp]);
// 		// setResponsibilities([...responsibilities, paramString])
// 		// setParamString('')
// 		// setMinReqString('')
// 	};

// 	const removeRes = (index) => {
// 		const temp = [...responsibilities];
// 		temp.splice(index, 1);
// 		setResponsibilities(temp);
// 	};

// 	return (
// 		<div>
// 			<div style={{ marginTop: 30, marginBottom: 30 }}>
// 				<hr />
// 			</div>
// 			<Container className={classes.mainContainer}>
// 				<h4 className='text-left'>Prerequisites</h4>
// 				<CssTextField
// 					id='outlined-basic'
// 					label='Name'
// 					variant='outlined'
// 					type='text'
// 					size='small'
// 					autocomplete='off'
// 					value={compCriteria.parameter}
// 					className={classes.inputFieldStyle}
// 					inputProps={{ style: { fontSize: 14 } }}
// 					InputLabelProps={{ style: { fontSize: 14 } }}
// 				/>

// 				<CssTextField
// 					id='outlined-basic'
// 					label='Add Parameters'
// 					variant='outlined'
// 					type='text'
// 					size='small'
// 					autocomplete='off'
// 					value={compCriteria.minReqString}
// 					className={classes.inputFieldStyle1}
// 					inputProps={{ style: { fontSize: 14 } }}
// 					InputLabelProps={{ style: { fontSize: 14 } }}
// 				/>
// 			</Container>
// 		</div>
// 	);
// };

// export default PreRequisites;
