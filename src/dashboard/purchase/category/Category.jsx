import React, { useState, useEffect } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '../../../components/utils/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Loader from 'react-loader-spinner';
import {
	getMaterialCategoryAction,
	createMatCategoryAction,
	deleteMatCategoryAction,
} from '../../../services/action/MatCategoryAction';
import EditCategory from './EditCategory';
import { Formik, Form } from 'formik';
import * as yup from 'yup';

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

// function createData(No, name, Action) {
// 	return { No, name, Action };
// }

// const rows = [createData(1, 'Item1')];

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
	name: '',
};

const validationSchema = yup.object({
	name: yup.string().required(),
});

const Category = () => {
	const classes = useStyles();
	const [category, setCategory] = useState({});
	const [loading, setLoading] = React.useState(true);
	const [addLoading, setAddLoading] = React.useState(false);
	const [addError, setAddError] = React.useState('');
	const [deleteLoading, setDeleteLoading] = React.useState(false);
	const [deleteError, setDeleteError] = React.useState(false);
	const [error, setError] = React.useState('');

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(
			getMaterialCategoryAction((err) => {
				if (err) {
					setError(err);
				}
				setLoading(false);
			}),
		);
	}, [dispatch]);

	const { categories } = useSelector((state) => state.categories);

	const onSubmit = async (values, actions) => {
		setAddLoading(true);
		dispatch(
			createMatCategoryAction(values, (err) => {
				if (err) {
					setAddError(err);
					setTimeout(() => {
						setAddError('');
					}, 4000);
				} else {
					actions.resetForm();
				}
				setAddLoading(false);
			}),
		);
	};

	const [open, setOpen] = useState(false);

	const handleClose = (props) => {
		setOpen(props);
	};

	const handleOpen = async (category) => {
		setCategory(category);
		setOpen(true);
	};

	const deleteCategory = async (params) => {
		setDeleteLoading(true);
		dispatch(
			deleteMatCategoryAction(params, (err) => {
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

	return (
		<Sidenav title={'Categories'}>
			<EditCategory show={open} handler={handleClose} category={category} />
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
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={onSubmit}>
						{(props) => (
							<Form autoComplete='off'>
								<CssTextField
									id='outlined-basic'
									label='Category Name*'
									variant='outlined'
									type='text'
									size='small'
									className={classes.inputFieldStyle}
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
										text='Add'
										color='primary'
										classNames={classes.addButton}
										loading={addLoading}
										loaderColor='#333'
									/>
								</div>
								{addError && <p>{addError}</p>}
							</Form>
						)}
					</Formik>
				</Container>
				{loading ? (
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							width: '100%',
							marginTop: '4rem',
						}}>
						<Loader type='TailSpin' />
					</div>
				) : error ? (
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							width: '100%',
							marginTop: '4rem',
						}}>
						<p style={{ fontSize: '3rem', textTransform: 'uppercase' }}>{error}</p>
					</div>
				) : categories?.length === 0 ? (
					<p>There is no data found</p>
				) : (
					<div className={classes.dataTable}>
						<TableContainer className={classes.tableContainer}>
							<Table
								stickyHeader
								className='table table-dark'
								style={{ backgroundColor: '#d0cfcf', border: '1px solid grey' }}>
								<TableHead>
									<TableRow hover role='checkbox'>
										<StyledTableCell align='center'>Sr.No</StyledTableCell>
										<StyledTableCell align='center'>Categories</StyledTableCell>
										<StyledTableCell align='center'>Action</StyledTableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{categories.map((category, i) => (
										<StyledTableRow key={i}>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{i + 1}
											</StyledTableCell>
											<StyledTableCell className='text-dark bg-light' align='center'>
												{category.name}
											</StyledTableCell>
											<StyledTableCell className='text-light bg-light' align='center'>
												<div style={{ display: 'flex', justifyContent: 'center' }}>
													<Button
														variant='contained'
														text='Edit'
														size='small'
														classNames='bg-dark text-light'
														onClick={() => handleOpen(category)}
													/>
													<Button
														variant='contained'
														text='Delete'
														size='small'
														color='secondary'
														onClick={() => deleteCategory(category._id)}
														style={{ marginLeft: '1rem' }}
													/>
												</div>
											</StyledTableCell>
										</StyledTableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</div>
				)}
			</div>
		</Sidenav>
	);
};

export default Category;
