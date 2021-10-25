import React, { useEffect } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {
	createDepartmentAction,
	deleteDepartmentAction,
	fetchDepartmentsAction,
} from '../../../services/action/DepartmentAction';
import EditDepartment from './EditDepartment';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import Button from '../../../components/utils/Button';
import Loader from 'react-loader-spinner';

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
	name: yup.string().required('Please enter a name for Department'),
});

const Department = () => {
	const classes = useStyles();
	const [addLoading, setAddLoading] = React.useState(false);
	const [loading, setLoading] = React.useState(true);
	const [addError, setAddError] = React.useState('');
	const [error, setError] = React.useState('');
	const [deleteLoading, setDeleteLoading] = React.useState(false);
	const [deleteError, setDeleteError] = React.useState('');
	const [dept, setDept] = React.useState({});
	const [open, setOpen] = React.useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(
			fetchDepartmentsAction((err) => {
				if (err) {
					setError(err);
				}
				setLoading(false);
			})
		);
	}, [dispatch]);

	const { departments } = useSelector((state) => state.departments);

	const onSubmit = (values, actions) => {
		setAddLoading(true);
		dispatch(
			createDepartmentAction(values, (err) => {
				if (err) {
					setAddError(err);
					setTimeout(() => {
						setAddError('');
					}, 4000);
				} else {
					actions.resetForm();
				}
				setAddLoading(false);
			})
		);
	};

	const handleClose = (props) => {
		setOpen(props);
	};

	const handleOpen = async (department) => {
		setDept(department);
		setOpen(true);
	};

	const deleteDept = (params) => {
		setDeleteLoading(true);
		dispatch(
			deleteDepartmentAction(params, (err) => {
				if (err) {
					setDeleteError(err);
					setTimeout(() => {
						setDeleteError('');
					}, 4000);
				}
				setDeleteLoading(false);
			})
		);
	};

	return (
		<Sidenav title={'Departments'}>
			<EditDepartment show={open} handler={handleClose} department={dept} />
			{deleteLoading && (
				<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
					<Loader type="TailSpin" width="2rem" height="2rem" />
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
						onSubmit={onSubmit}
					>
						{(props) => (
							<Form autoComplete="off">
								<CssTextField
									id="outlined-basic"
									label="Department Name*"
									variant="outlined"
									type="text"
									size="small"
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
										variant="outlined"
										color="primary"
										classNames={classes.addButton}
										text="Add"
										loading={addLoading}
										loaderColor="#333"
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
						}}
					>
						<Loader type="TailSpin" />
					</div>
				) : error ? (
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							width: '100%',
							marginTop: '4rem',
						}}
					>
						<p style={{ fontSize: '3rem', textTransform: 'uppercase' }}>
							{error}
						</p>
					</div>
				) : departments?.length === 0 ? (
					<p>There is no data found</p>
				) : (
					<div className={classes.dataTable}>
						<TableContainer className={classes.tableContainer}>
							<Table
								stickyHeader
								className="table table-dark"
								style={{
									backgroundColor: '#d0cfcf',
									border: '1px solid grey',
								}}
							>
								<TableHead>
									<TableRow hover role="checkbox">
										<StyledTableCell align="center">
											Sr.No
										</StyledTableCell>
										<StyledTableCell align="center">
											Departments
										</StyledTableCell>
										<StyledTableCell align="center">
											Action
										</StyledTableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{departments.map((el, i) => (
										<StyledTableRow key={i}>
											<StyledTableCell
												className="text-dark bg-light"
												align="center"
											>
												{i + 1}
											</StyledTableCell>
											<StyledTableCell
												className="text-dark bg-light"
												align="center"
											>
												{el.name}
											</StyledTableCell>
											<StyledTableCell
												className="text-light bg-light"
												align="center"
											>
												<div
													style={{
														display: 'flex',
														justifyContent: 'center',
													}}
												>
													<Button
														variant="contained"
														text="Edit"
														size="small"
														classNames="bg-dark text-light"
														onClick={() => handleOpen(el)}
													/>
													<Button
														variant="contained"
														text="Delete"
														size="small"
														color="secondary"
														onClick={() => deleteDept(el._id)}
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

export default Department;
