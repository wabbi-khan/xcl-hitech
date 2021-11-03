import React from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { fetchDepartmentsAction } from '../../../services/action/DepartmentAction';
import { getDesignation } from '../../../services/action/DesignationAction';
import { MdCancel } from 'react-icons/md';
import {
	createTrainingPrereq,
	deleteTrainingPrereq,
	getTrainingsPrereq,
} from '../../../services/action/TrainingPrereq';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EditTrainingPrereq from './EditTrainingPrereq';
import Loader from 'react-loader-spinner';
import Button from '../../../components/utils/Button';

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
	addMoreButton: {
		padding: '7.5px',
		marginTop: '-0.2rem',
		marginLeft: '0.5rem',
		color: '#22A19A',
		borderColor: '#22A19A',
		fontWeight: 'bold',
		'&:hover': {
			border: 'none',
			backgroundColor: '#22A19A',
			color: 'whitesmoke',
		},
	},
	addButton: {
		padding: '7.5px',
		marginTop: '2rem',
		width: '10%',
		color: '#22A19A',
		borderColor: '#22A19A',
		fontWeight: 'bold',
		'&:hover': {
			border: 'none',
			backgroundColor: '#22A19A',
			color: 'whitesmoke',
		},
	},
	table: {
		minWidth: 600,
	},
	dataTable: {
		marginTop: 40,
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

const initialValuesForTopForm = {
	department: '',
	designation: '',
	name: '',
};

const validationSchemaForTopForm = yup.object({
	department: yup.string().required(),
	designation: yup.string().required(),
	name: yup.string().required(),
});

const initialValuesForNestedForm = {
	param: '',
};

const validationSchemaForNestedForm = yup.object({
	param: yup.string().required(),
});

const TrainingNeedPreReq = () => {
	const [createLoading, setCreateLoading] = React.useState(false);
	const [createError, setCreateError] = React.useState('');
	const [deleteLoading, setDeleteLoading] = React.useState(false);
	const [deleteError, setDeleteError] = React.useState('');
	const [fetchLoading, setFetchLoading] = React.useState(true);
	const [fetchError, setFetchError] = React.useState('');
	const [success, setSuccess] = React.useState('');
	const [params, setParams] = React.useState([]);
	const [open, setOpen] = React.useState(false);
	const [requisition, setRequisition] = React.useState();
	const classes = useStyles();
	const { departments } = useSelector((state) => state.departments);
	const { designations } = useSelector((state) => state.designations);
	const { requisitions } = useSelector((state) => state.requisitions);

	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(getDesignation());
		dispatch(fetchDepartmentsAction());
		setFetchLoading(true);
		dispatch(
			getTrainingsPrereq(null, (err) => {
				if (err) {
					setFetchError(err);
					setTimeout(() => {
						setFetchError('');
					}, 4000);
				}
				setFetchLoading(false);
			})
		);
	}, []);

	const onSubmit = async (values) => {
		values = {
			...values,
			preRequisition: params,
		};
		setCreateLoading(true);
		dispatch(
			createTrainingPrereq(values, (err) => {
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
			})
		);
	};

	const onDelete = (params) => {
		setDeleteLoading(true);
		dispatch(
			deleteTrainingPrereq(params, (err) => {
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

	const onParamSubmit = (values) => {
		setParams([...params, values.param]);
	};

	const onRemoveParam = (e) => {
		const index = e.target.dataset.index;
		const temp = [...params];
		setParams(temp.filter((el, i) => i != index));
	};

	const handleClose = (props) => {
		setOpen(props);
	};

	const handleOpen = async (requisition) => {
		setOpen(true);
		setRequisition(requisition);
	};

	return (
		<Sidenav title={'Training Needs Pre-Requestions'}>
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
						initialValues={initialValuesForTopForm}
						validationSchema={validationSchemaForTopForm}
						onSubmit={onSubmit}
					>
						{(props) => (
							<>
								<Form>
									<CssTextField
										id="outlined-basic"
										label="Select Department"
										variant="outlined"
										type="text"
										size="small"
										select
										autocomplete="off"
										style={{ width: '25%' }}
										inputProps={{
											style: {
												fontSize: 14,
											},
										}}
										InputLabelProps={{
											style: {
												fontSize: 14,
											},
										}}
										onChange={props.handleChange('department')}
										onBlur={props.handleBlur('department')}
										value={props.values.department}
										helperText={
											props.touched.department &&
											props.errors.department
										}
										error={
											props.touched.department &&
											props.errors.department
										}
									>
										{!departments || !departments.length ? (
											<p>Data Not Found</p>
										) : (
											departments.map((el, i) => (
												<MenuItem value={el._id} key={i}>
													{el.name}
												</MenuItem>
											))
										)}
									</CssTextField>
									<CssTextField
										id="outlined-basic"
										label="Select Designation"
										variant="outlined"
										type="text"
										size="small"
										select
										autocomplete="off"
										style={{ width: '25%', marginLeft: '0.5rem' }}
										inputProps={{
											style: {
												fontSize: 14,
											},
										}}
										onChange={props.handleChange('designation')}
										onBlur={props.handleBlur('designation')}
										value={props.values.designation}
										helperText={
											props.touched.designation &&
											props.errors.designation
										}
										error={
											props.touched.designation &&
											props.errors.designation
										}
										InputLabelProps={{
											style: {
												fontSize: 14,
											},
										}}
									>
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
									<CssTextField
										id="outlined-basic"
										label="Pre-Requisition Name"
										variant="outlined"
										type="text"
										size="small"
										autocomplete="off"
										style={{ width: '25%', marginLeft: '0.5rem' }}
										inputProps={{
											style: {
												fontSize: 14,
											},
										}}
										onChange={props.handleChange('name')}
										onBlur={props.handleBlur('name')}
										value={props.values.name}
										helperText={
											props.touched.name && props.errors.name
										}
										error={props.touched.name && props.errors.name}
										InputLabelProps={{
											style: {
												fontSize: 14,
											},
										}}
									></CssTextField>
								</Form>
								<Formik
									initialValues={initialValuesForNestedForm}
									validationSchema={validationSchemaForNestedForm}
									onSubmit={onParamSubmit}
								>
									{(props) => (
										<div>
											<div
												style={{
													marginTop: 30,
													marginBottom: 30,
												}}
											>
												<hr />
											</div>
											<Container className={classes.mainContainer}>
												<h4 className="text-left">Prerequisites</h4>
												<Form>
													<CssTextField
														id="outlined-basic"
														label="Point"
														variant="outlined"
														type="text"
														size="small"
														autocomplete="off"
														style={{ width: '25%' }}
														inputProps={{
															style: {
																fontSize: 14,
															},
														}}
														onChange={props.handleChange('param')}
														onBlur={props.handleBlur('param')}
														value={props.values.param}
														helperText={
															props.touched.param &&
															props.errors.param
														}
														error={
															props.touched.param &&
															props.errors.param
														}
														InputLabelProps={{
															style: {
																fontSize: 14,
															},
														}}
													></CssTextField>
													<Button
														variant="outlined"
														size="small"
														text="Add More"
														classNames={classes.addMoreButton}
													/>
												</Form>
											</Container>
										</div>
									)}
								</Formik>
								{params.map((el, i) => (
									<div
										style={{
											display: 'flex',
											columnGap: '1rem',
											alignItems: 'center',
											marginBottom: '1rem',
										}}
									>
										<p
											style={{
												padding: 0,
												margin: 0,
											}}
										>
											{el}
										</p>
										<div data-index={i} onClick={onRemoveParam}>
											<MdCancel
												size="20"
												style={{
													cursor: 'pointer',
													pointerEvents: 'none',
												}}
											/>
										</div>
									</div>
								))}
								<Form>
									<div>
										<Button
											variant="outlined"
											text="Submit"
											loading={createLoading}
											loaderColor="#333"
											classNames={classes.addButton}
										/>
									</div>
								</Form>
							</>
						)}
					</Formik>
				</Container>
				<EditTrainingPrereq
					show={open}
					handler={handleClose}
					requisition={requisition}
				/>
				{fetchLoading ? (
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							marginTop: '3rem',
						}}
					>
						<Loader
							type="TailSpin"
							color="#000"
							width="3rem"
							height="3rem"
						/>
					</div>
				) : requisitions?.length === 0 ? (
					<p>There is no data found.</p>
				) : (
					<div className={classes.dataTable} style={{ marginTop: '1rem' }}>
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
											Headings
										</StyledTableCell>
										<StyledTableCell align="center">
											Department
										</StyledTableCell>
										<StyledTableCell align="center">
											Designation
										</StyledTableCell>
										<StyledTableCell align="center">
											Params
										</StyledTableCell>
										<StyledTableCell align="center">
											Action
										</StyledTableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{requisitions.map((el, i) => (
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
												{el?.name}
											</StyledTableCell>
											<StyledTableCell
												className="text-dark bg-light"
												align="center"
											>
												{el?.department?.name}
											</StyledTableCell>
											<StyledTableCell
												className="text-dark bg-light"
												align="center"
											>
												{el?.designation?.name}
											</StyledTableCell>
											<StyledTableCell
												className="text-dark bg-light"
												align="center"
											>
												{el?.preRequisition?.map((el) => (
													<div
														style={{
															display: 'flex',
															columnGap: '4rem',
															textAlign: 'center',
															alignItems: 'center',
															justifyContent: 'center',
														}}
													>
														<span>{el}</span>
													</div>
												))}
											</StyledTableCell>
											<StyledTableCell
												className="text-light bg-light"
												align="center"
											>
												<div
													style={{
														display: 'flex',
														flexDirection: 'row',
														alignItems: 'center',
														justifyContent: 'center',
													}}
												>
													<Button
														variant="contained"
														className="bg-dark text-light"
														size="small"
														onClick={() => handleOpen(el)}
														text="Edit"
													/>

													<Button
														variant="contained"
														color="secondary"
														size="small"
														onClick={() => onDelete(el._id)}
														style={{ marginLeft: 10 }}
														text="Delete"
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

export default TrainingNeedPreReq;
