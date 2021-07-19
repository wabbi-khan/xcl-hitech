import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { Formik, Form } from 'formik'
import * as yup from 'yup';
import axios from 'axios';
import Sidenav from '../../SideNav/Sidenav';
import Button from '../../../components/utils/Button'

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

const initialValue = {
	name: ''
};

const validationSchema = yup.object({
	name: yup.string().required('Authority is required')
});

const Authorities = ({ authorities, setAuthorities }, props) => {
	const classes = useStyles();
	const [resString, setResString] = useState('');

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

	return (
		<Sidenav title={'Authorities'}>
			<div>
				{/* <div style={{ marginTop: 30, marginBottom: 30 }}>
				<hr />
			</div> */}
				<Container className={classes.mainContainer}>
					{/* <h4 className='text-left'>Authorities</h4> */}
					<Formik
						initialValues={initialValue}
						validationSchema={validationSchema}
						onSubmit={onSubmit}
					>
						{
							(props) => (
								<Form>
									<CssTextField
										id='outlined-basic'
										label='Authorities'
										variant='outlined'
										type='text'
										autocomplete='off'
										size='small'
										style={{ width: '50%' }}
										className={classes.inputFieldStyle}
										inputProps={{ style: { fontSize: 14 } }}
										value={props.values.name}
										InputLabelProps={{ style: { fontSize: 14 } }}
										onChange={props.handleChange('name')}
										onBlur={props.handleBlur('name')}
										helperText={props.touched.name && props.errors.name}
										error={props.touched.name && props.errors.name}
									/>
									<div>
										<Button
											variant="outlined"
											classNames={classes.addMoreRes}
											text='Add'
											loading={true}
											loaderColor="#333"
										/>
									</div>
								</Form>
							)
						}
					</Formik>
					{/* {authorities.map((authority, i) => (
					<p className={classes.resStyle}>
						<span style={{ fontSize: 13 }}>{i + 1}. </span>
						{authority}
						<DeleteOutlineIcon
							type='button'
							className={classes.delete}
							onClick={() => removeRes(i)}
						/>
						<Button
                                variant="outlined" size="small"
                                className={classes.deleteResBtn}
                            >
                            </Button>
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
							<th>Authorities</th>
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
								<div style={{ display: 'flex', justifyContent: 'center' }}>
									<Button
										variant='contained'
										text='Edit'
										size='small'
										classNames='bg-dark text-light'
										onClick={() => handleOpen()}
									/>
									<Button
										variant='contained'
										text='Delete'
										size='small'
										color='secondary'
										// onClick={() => delete(category._id)}
										style={{ marginLeft: '5px' }}
									/>
								</div>
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

export default Authorities;
