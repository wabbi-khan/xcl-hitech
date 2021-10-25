import React, { useState, useEffect } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '../../../components/utils/Button';
import {
	getStoreCategory,
	createStoreCategory,
	deleteStoreCategory,
} from '../../../services/action/StoreCategoryAction';
import EditCategories from './EditCategories';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import Loader from 'react-loader-spinner';

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

const initialValue = {
	name: '',
};

const validationSchema = yup.object({
	name: yup.string().required('Category name is required'),
});

const Categories = () => {
	const [error, setError] = React.useState('');
	const [loading, setLoading] = React.useState(false);
	const [addLoading, setAddLoading] = React.useState(false);
	const classes = useStyles();
	const [cat, setCat] = useState();
	const { storeCategories } = useSelector((state) => state.storeCategories);

	const dispatch = useDispatch();

	useEffect(() => {
		setLoading(true);
		dispatch(
			getStoreCategory(null, (err) => {
				if (err) {
					setError(err);
					setTimeout(() => {
						setError('');
					}, 4000);
				}
				setLoading(false);
			})
		);
	}, [dispatch]);

	const onSubmit = async (props) => {
		setAddLoading(true);
		dispatch(
			createStoreCategory(props, (err) => {
				if (err) {
					setError(err);
					setTimeout(() => {
						setError('');
					}, 4000);
				}
				setAddLoading(false);
			})
		);
	};

	const [open, setOpen] = useState(false);

	const handleClose = (props) => {
		setOpen(props);
	};

	const handleOpen = async (cat) => {
		setCat(cat);
		setOpen(true);
	};

	const deleteCategory = async (params) => {
		dispatch(deleteStoreCategory(params));
	};

	return (
		<Sidenav title={'Store Categories'}>
			<EditCategories show={open} handler={handleClose} cat={cat} />
			<div>
				<Container className={classes.mainContainer}>
					<Formik
						initialValues={initialValue}
						validationSchema={validationSchema}
						onSubmit={onSubmit}
					>
						{(props) => (
							<Form>
								<CssTextField
									id="outlined-basic"
									label="Category Name*"
									variant="outlined"
									type="text"
									size="small"
									autocomplete="off"
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
										text="Add"
										variant="outlined"
										classNames={classes.addButton}
										color="primary"
										loading={addLoading}
									/>

									{error && <p>{error}</p>}
								</div>
							</Form>
						)}
					</Formik>
				</Container>

				<div
					className="container-fluid"
					style={{ textAlign: 'left', marginTop: '50px' }}
				>
					{loading ? (
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
					) : storeCategories?.length === 0 ? (
						<p>There are no categories</p>
					) : (
						storeCategories?.map((el, i) => (
							<table class="table table-responsive table-hover table-striped table-bordered border-dark text-center mt-3">
								{i === 0 && (
									<thead class="bg-dark text-light">
										<tr>
											<th>S.No.</th>
											<th>Categories</th>
											<th>Action</th>
										</tr>
									</thead>
								)}
								<tbody>
									<tr>
										<td>{i + 1}</td>
										<td>{el?.name}</td>
										<td>
											<>
												<Button
													variant="contained"
													className="bg-dark text-light"
													size="small"
													onClick={() => handleOpen(el)}
													style={{ marginTop: 2 }}
												>
													Edit
												</Button>
												<Button
													variant="contained"
													color="secondary"
													size="small"
													onClick={() => deleteCategory(el._id)}
													style={{ marginLeft: 2, marginTop: 2 }}
												>
													Delete
												</Button>
											</>
										</td>
									</tr>
								</tbody>
							</table>
						))
					)}
				</div>
			</div>
		</Sidenav>
	);
};

export default Categories;
