import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '../../../components/utils/Button';
import Sidenav from '../../SideNav/Sidenav';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import EditResponsibility from './EditResponsibility';
import {
	createResponsibilities,
	deleteResponsibilities,
	getResponsibilities,
} from '../../../services/action/responsibilityAction';
import Loader from 'react-loader-spinner';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: '25ch',
		},
	},
	mainContainer: {
		marginTop: 20,
		textAlign: 'center',
	},
	addMoreRes: {
		marginTop: 20,
		padding: 6,
		marginLeft: 20,
		width: '10%',
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
	resStyle: {
		marginTop: 8,
		marginBottom: 0,
		fontSize: 16,
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

const initialValue = {
	name: '',
};

const validationSchema = yup.object({
	name: yup.string().required('Responsibility is required'),
});

const Responsibilities = () => {
	const classes = useStyles();

	const dispatch = useDispatch();

	const [open, setOpen] = useState(false);
	const [createLoading, setCreateLoading] = React.useState(false);
	const [createError, setCreateError] = React.useState('');
	const [deleteLoading, setDeleteLoading] = React.useState(false);
	const [deleteError, setDeleteError] = React.useState('');
	const [fetchLoading, setFetchLoading] = React.useState('');
	const [fetchError, setFetchError] = React.useState('');
	const [success, setSuccess] = React.useState('');
	const [responsibility, setResponsibility] = React.useState({});
	const { responsibilities } = useSelector((state) => state.responsibilities);

	React.useEffect(() => {
		setFetchLoading(true);
		dispatch(
			getResponsibilities(null, (err) => {
				if (err) {
					setFetchError(err);
					setTimeout(() => {
						setFetchError('');
					}, 4000);
				}
				setFetchLoading(false);
			}),
		);
	}, [dispatch]);

	const onSubmit = async (values) => {
		setCreateLoading(true);
		dispatch(
			createResponsibilities(values, (err) => {
				if (err) {
					setCreateError(err);
					setTimeout(() => {
						setCreateError('');
					}, 4000);
				} else {
					setSuccess('Category added successfully');
					setTimeout(() => {
						setSuccess('');
					}, 4000);
				}
				setCreateLoading(false);
			}),
		);
	};

	const deleteResponsibility = async (params) => {
		setDeleteLoading(true);
		dispatch(
			deleteResponsibilities(params, (err) => {
				if (err) {
					setDeleteError(err);
					setTimeout(() => {
						setDeleteError('');
					}, 4000);
				}
				setDeleteLoading(false);
			}),
		);
	};

	const handleClose = (props) => {
		setOpen(props);
	};

	const handleOpen = async (responsibility) => {
		setResponsibility(responsibility);
		setOpen(true);
	};

	return (
		<Sidenav title={'Responsibilities'}>
			<EditResponsibility
				show={open}
				handler={handleClose}
				responsibility={responsibility}
			/>
			{deleteLoading && (
				<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
					<Loader type='TailSpin' width='2rem' height='2rem' />
				</div>
			)}
			{deleteError && (
				<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
					<span>{deleteError}</span>
				</div>
			)}
			<div>
				<Container className={classes.mainContainer}>
					<Formik
						initialValues={initialValue}
						validationSchema={validationSchema}
						onSubmit={onSubmit}>
						{(props) => (
							<Form>
								<CssTextField
									id='outlined-basic'
									label='Add Resposibilities'
									variant='outlined'
									type='text'
									autocomplete='off'
									size='small'
									style={{ width: '50%' }}
									inputProps={{ style: { fontSize: 14 } }}
									InputLabelProps={{ style: { fontSize: 14 } }}
									onChange={props.handleChange('name')}
									onBlur={props.handleBlur('name')}
									value={props.values.name}
									helperText={props.touched.name && props.errors.name}
									error={props.touched.name && props.errors.name}
								/>
								<div>
									<Button
										variant='outlined'
										classNames={classes.addMoreRes}
										text='Add'
										loading={createLoading}
										loaderColor='#333'
									/>
									{createError && <p>{createError}</p>}
								</div>
							</Form>
						)}
					</Formik>
				</Container>
				<div
					className='container-fluid'
					style={{ textAlign: 'left', marginTop: '50px' }}>
					{fetchLoading ? (
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								marginTop: '3rem',
							}}>
							<Loader type='TailSpin' color='#000' width='3rem' height='3rem' />
						</div>
					) : responsibilities?.length === 0 ? (
						<p>There are no Responsibilities</p>
					) : (
						<table class='table table-responsive table-hover table-striped table-bordered border-dark text-center mt-3'>
							{responsibilities?.map((el, i) => (
								<>
									{i === 0 && (
										<thead class='bg-dark text-light'>
											<tr>
												<th>S.No.</th>
												<th>Name</th>
												<th>Action</th>
											</tr>
										</thead>
									)}
									<tbody>
										<tr>
											<td>{i + 1}</td>
											<td>{el?.name}</td>
											<td>
												<div
													style={{
														display: 'flex',
														flexDirection: 'row',
														alignItems: 'center',
														justifyContent: 'center',
													}}>
													<Button
														variant='contained'
														className='bg-dark text-light'
														size='small'
														onClick={() => handleOpen(el)}
														text='Edit'
													/>

													<Button
														variant='contained'
														color='secondary'
														size='small'
														onClick={() => deleteResponsibility(el._id)}
														style={{ marginLeft: 10 }}
														text='Delete'
													/>
												</div>
											</td>
										</tr>
									</tbody>
								</>
							))}
						</table>
					)}
				</div>
			</div>
		</Sidenav>
	);
};

export default Responsibilities;
