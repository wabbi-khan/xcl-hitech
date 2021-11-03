import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import LoginImg from '../images/loginBack.jpg';
import { withRouter } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { loginUser } from '../services/action/UserAction';
import { useDispatch } from 'react-redux';
import Button from '../components/utils/Button';

const useStyles = makeStyles((theme) => ({
	cssLabel: {
		color: 'whitesmoke',
	},
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: '25ch',
		},
	},
	backImg: {
		width: 'auto',
		height: '100vh',
		// [theme.breakpoints.up('md')]: {
		// 	height: 800,
		// },
		// [theme.breakpoints.down('sm')]: {
		// 	height: 820,
		// },
	},
	loginBox: {
		marginLeft: 'auto',
		marginRight: 'auto',
		top: '20%',
		position: 'relative',
		backgroundColor: 'rgba(0, 0, 0, 0.6)',
		[theme.breakpoints.up('md')]: {
			width: '35%',
		},
		[theme.breakpoints.down('sm')]: {
			width: '90%',
		},
	},
	input1: {
		marginTop: 40,
	},
	input2: {
		marginTop: 20,
	},
	loginButtonBox: {},
	loginBtn: {
		backgroundColor: '#22A19A',
		margin: 20,
		fontWeight: 'bold',
		color: 'whitesmoke',

		'&:hover': {
			backgroundColor: '#22A19A',
			opacity: 0.9,
		},
	},
	inputField: {
		width: 350,
		[theme.breakpoints.down('sm')]: {
			width: '90%',
		},
	},
}));

const CssTextField = withStyles({
	root: {
		'& label.Mui-focused': {
			color: 'white',
		},
		'& .MuiOutlinedInput-root': {
			'& fieldset': {
				borderColor: 'white',
			},
			'&.Mui-focused fieldset': {
				borderColor: 'white',
			},
		},
	},
})(TextField);

const initialValues = {
	username: '',
	password: '',
};

const validationSchema = yup.object({
	username: yup.string().required(),
	password: yup.string().required(),
});

const Login = (props) => {
	const classes = useStyles();
	const { history } = props;
	const dispatch = useDispatch();
	const [error, setError] = React.useState('');
	const [loading, setLoading] = React.useState(false);

	const onSubmit = (values) => {
		setLoading(true);
		dispatch(
			loginUser(values, (err) => {
				if (err) {
					setError(err);
				} else {
					history.push('/dashboard');
				}
				setLoading(false);
			})
		);
	};

	return (
		<div
			style={{
				backgroundImage: `url(${LoginImg} )`,
				backgroundAttachment: 'fixed',
				backgroundSize: 'cover',
			}}
			className={classes.backImg}
		>
			<div className={classes.loginBox}>
				<h3
					style={{
						color: 'whitesmoke',
						textAlign: 'center',
						paddingTop: 30,
						fontWeight: 'bold',
					}}
				>
					HI-TECH
				</h3>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={onSubmit}
				>
					{(props) => (
						<Form>
							<div className="text-center mt-5">
								<CssTextField
									className={classes.inputField}
									id="outlined-basic"
									label="Enter Username"
									variant="outlined"
									autoComplete="off"
									type="text"
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{
										style: {
											color: '#fff',
											fontSize: 14,
										},
									}}
									InputProps={{
										classes: {
											root: classes.cssLabel,
										},
									}}
									onChange={props.handleChange('username')}
									onBlur={props.handleBlur('username')}
									value={props.values.username}
									helperText={
										props.touched.username && props.errors.username
									}
									error={
										props.touched.username && props.errors.username
									}
								/>
							</div>
							<div className="text-center mt-3">
								<CssTextField
									className={classes.inputField}
									id="outlined-basic"
									label="Enter Password"
									variant="outlined"
									autoComplete="off"
									type="password"
									InputLabelProps={{
										style: { color: '#fff' },
									}}
									InputProps={{
										classes: {
											root: classes.cssLabel,
										},
									}}
									onChange={props.handleChange('password')}
									onBlur={props.handleBlur('password')}
									value={props.values.password}
									helperText={
										props.touched.password && props.errors.password
									}
									error={
										props.touched.password && props.errors.password
									}
								/>
							</div>
							<div className="text-center mt-2">
								<Button
									variant="outlined"
									classNames={classes.loginBtn}
									type="submit"
									text="Login"
									loading={loading}
								/>
								{error && <p style={{ color: 'red' }}>{error}</p>}
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default withRouter(Login);
