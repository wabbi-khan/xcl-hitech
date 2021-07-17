import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { useForm } from 'react-hook-form';
import Sidenav from '../../SideNav/Sidenav';
import { Formik, Form } from 'formik'
import * as yup from 'yup';
import axios from 'axios';
import EditResponsibility from './EditResponsibility';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: '25ch',
		},
	},
	mainContainer: {
		marginTop: 20,
		textAlign: 'center'
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
	name: ''
};

const validationSchema = yup.object({
	name: yup.string().required('Responsibility is required')
});

const Responsibilities = ({ responsibilities, setResponsibilities }) => {
	const classes = useStyles();
	const [resString, setResString] = useState('');

	const {
		formState: { errors },
	} = useForm();

	const onSubmit = async (props) => {
		// dispatch(createTraining(props));
	};

	const deleteProduct = async (params) => {
		try {
			await axios.delete(`${process.env.REACT_APP_API_URL}/product/${params}`);
			window.location.reload();
		} catch (error) {
			console.log(error);
		}
	};

	const [open, setOpen] = useState(false);

	const handleClose = (props) => {
		setOpen(props);
	};

	const handleOpen = async (product) => {
		// setproduct(product);
		setOpen(true);
	};
	// const getValue = (e) => {
	// 	setResponsibilities([...responsibilities, resString]);
	// 	setResString('');
	// };

	// const removeRes = (index) => {
	// 	const temp = [...responsibilities];
	// 	temp.splice(index, 1);
	// 	setResponsibilities(temp);
	// };

	return (
		<Sidenav title={'Responsibilities'}>
			<EditResponsibility show={open} handler={handleClose}  />
			<div>
				{/* <div style={{ marginTop: 30, marginBottom: 30 }}>
				<hr />
			</div> */}
				<Container className={classes.mainContainer}>
					<Formik
						initialValues={initialValue}
						validationSchema={validationSchema}
						onSubmit={onSubmit}
					>
						{
							(props) => (
								<Form>
									{/* <h4 className='text-left'>Responsibilities</h4> */}
									<CssTextField
										id='outlined-basic'
										label='Add Resposibilities'
										variant='outlined'
										type='text'
										autocomplete='off'
										size='small'
										value={resString}
										onChange={(e) => {
											setResString(e.target.value);
										}}
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
											variant='contained'
											size='small'
											className={classes.addMoreRes}
										// onClick={getValue}
										>
											Add
										</Button>
									</div>
								</Form>
							)
						}
					</Formik>
					{/* {responsibilities.map((res, i) => (
					<p className={classes.resStyle}>
						<span style={{ fontSize: 13 }}>{i + 1}. </span>
						{res}
						<DeleteOutlineIcon
							type='button'
							className={classes.delete}
							onClick={() => removeRes(i)}
						/>
					</p>
				))} */}
					{/* {
                                !designations || !designations.length ? <p>Data Not Found</p> :
                                    designations.map(designation => (
                                        <MenuItem value={designation._id} key={designation._id}>{designation.name}</MenuItem>
                                    ))
                            } */}
				</Container>
			</div>
			<div className='container-fluid' style={{ textAlign: 'left', marginTop: '50px' }}>
				<table class="table table-responsive table-hover table-striped table-bordered border-dark text-center mt-3">
					<thead class="bg-dark text-light">
						<tr>
							<th>S.No.</th>
							<th>Responsibilities</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{/* {
							loading ? (
								<Loading />
							) : error ? (
								<MaterialError />
							) : products.length ? (
								products.map((product, i) => ( */}
						<tr >
							<td>
								{1}
							</td>
							<td>
								{ }
							</td>
							<td>
								<>
									<Button
										variant='contained'
										className='bg-dark text-light'
										size='small'
										onClick={() => handleOpen()}
										style={{ marginTop: 2 }}>
										Edit
									</Button>
									<Button
										variant='contained'
										color='secondary'
										size='small'
										// onClick={() => deleteProduct(product._id)}
										style={{ marginLeft: 2, marginTop: 2 }}>
										Delete
									</Button>
								</>
							</td>
						</tr>
						{/* ))
							) : (
								<h5>Not Found</h5>
							)
						} */}
					</tbody>
				</table>
			</div>
		</Sidenav>
	);
};

export default Responsibilities;
