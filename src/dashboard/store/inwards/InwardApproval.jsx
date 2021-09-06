import React, { useState, useEffect } from 'react'
import Sidenav from '../../SideNav/Sidenav'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { MenuItem } from '@material-ui/core';

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
        marginTop: 40,
        backgroundColor: '#22A19A',
        color: 'whitesmoke',
        borderColor: '#22A19A',
        fontWeight: 'bold',
        width: '10%',
        '&:hover': {
            color: '#22A19A',
            borderColor: '#22A19A',
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

const InwardApproval = () => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const onSubmit = async (values) => {
        // setCreateLoading(true);
        // dispatch(
        // 	createProducts(values, (err) => {
        // 		if (err) {
        // 			setCreateError(err);
        // 			setTimeout(() => {
        // 				setCreateError('');
        // 			}, 4000);
        // 		} else {
        // 			setSuccess('Category added successfully');
        // 			setTimeout(() => {
        // 				setSuccess('');
        // 			}, 4000);
        // 		}
        // 		setCreateLoading(false);
        // 	}),
        // );
    };

    const deleteProduct = async (params) => {
        // setDeleteLoading(true);
        // dispatch(
        // 	deleteProducts(params, (err) => {
        // 		if (err) {
        // 			setDeleteError(err);
        // 			setTimeout(() => {
        // 				setDeleteError('');
        // 			}, 4000);
        // 		}
        // 		setDeleteLoading(false);
        // 	}),
        // );
    };

    const [open, setOpen] = useState(false);

    const handleClose = (props) => {
        // setOpen(props);
    };

    const handleOpen = async (product) => {
        // setproduct(product);
        setOpen(true);
    };

    return (
        <Sidenav title={'Inward Approval'}>
            <div>
                <Formik
                    // initialValues={initialValuesState}
                    // validationSchema={validationSchema}
                    enableReinitialize
                    onSubmit={onSubmit}>
                    <Form>
                        <Grid container spacing={1} style={{ marginTop: 15 }}>
                            <Grid item lg={2} md={2} sm={12} xs={12}>
                                <CssTextField
                                    id='outlined-basic'
                                    label='Select IGP No.'
                                    variant='outlined'
                                    type='text'
                                    size='small'
                                    autoComplete='off'
                                    select
                                    style={{ width: '100%' }}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                // onChange={props.handleChange('category')}
                                // onBlur={props.handleBlur('category')}
                                // value={props.values.category}
                                // helperText={props.touched.category && props.errors.category}
                                // error={props.touched.category && props.errors.category}
                                >
                                    <MenuItem value=''></MenuItem>
                                </CssTextField>
                            </Grid>
                            <Grid item lg={2} md={2} sm={12} xs={12}>
                                <CssTextField
                                    id='outlined-basic'
                                    // label='Date'
                                    variant='outlined'
                                    type='date'
                                    size='small'
                                    disabled
                                    autoComplete='off'
                                    style={{ width: '100%' }}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                // onChange={props.handleChange('category')}
                                // onBlur={props.handleBlur('category')}
                                // value={props.values.category}
                                // helperText={props.touched.category && props.errors.category}
                                // error={props.touched.category && props.errors.category}
                                >
                                    <MenuItem value=''></MenuItem>
                                </CssTextField>
                            </Grid>
                            <Grid item lg={2} md={2} sm={12} xs={12}>
                                <CssTextField
                                    id='outlined-basic'
                                    label='Enter Vehicle No.'
                                    variant='outlined'
                                    type='text'
                                    size='small'
                                    autoComplete='off'
                                    style={{ width: '100%' }}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                // onChange={props.handleChange('category')}
                                // onBlur={props.handleBlur('category')}
                                // value={props.values.category}
                                // helperText={props.touched.category && props.errors.category}
                                // error={props.touched.category && props.errors.category}
                                />
                            </Grid>
                            <Grid item lg={2} md={2} sm={12} xs={12}>
                                <CssTextField
                                    id='outlined-basic'
                                    label='DC No.'
                                    variant='outlined'
                                    type='text'
                                    size='small'
                                    disabled
                                    autoComplete='off'
                                    style={{ width: '100%' }}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                // onChange={props.handleChange('category')}
                                // onBlur={props.handleBlur('category')}
                                // value={props.values.category}
                                // helperText={props.touched.category && props.errors.category}
                                // error={props.touched.category && props.errors.category}
                                />
                            </Grid>
                            <Grid item lg={2} md={2} sm={12} xs={12}>
                                <CssTextField
                                    id='outlined-basic'
                                    label='Bill No'
                                    variant='outlined'
                                    type='text'
                                    size='small'
                                    disabled
                                    autoComplete='off'
                                    style={{ width: '100%' }}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                // onChange={props.handleChange('category')}
                                // onBlur={props.handleBlur('category')}
                                // value={props.values.category}
                                // helperText={props.touched.category && props.errors.category}
                                // error={props.touched.category && props.errors.category}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} style={{ marginTop: 15 }}>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <h6 class='mt-2'>We Have Received the Following Items:</h6>
                                <ul>
                                    <li>
                                        {  }
                                    </li>
                                </ul>
                            </Grid>
                            <Grid item lg={2} md={2} sm={12} xs={12}>
                                <h6 class='mt-2'>From</h6>
                                <CssTextField
                                    id='outlined-basic'
                                    label='Party Name'
                                    variant='outlined'
                                    type='text'
                                    size='small'
                                    autoComplete='off'
                                    select
                                    style={{ width: '100%' }}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                // onChange={props.handleChange('category')}
                                // onBlur={props.handleBlur('category')}
                                // value={props.values.category}
                                // helperText={props.touched.category && props.errors.category}
                                // error={props.touched.category && props.errors.category}
                                >
                                    <MenuItem value=''></MenuItem>
                                </CssTextField>
                            </Grid>
                        </Grid>
                    </Form>
                </Formik>
            </div>
        </Sidenav>
    )
}

export default InwardApproval
