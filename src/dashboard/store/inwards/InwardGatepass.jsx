import React, { useState, useEffect } from 'react'
import Sidenav from '../../SideNav/Sidenav'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { MenuItem } from '@material-ui/core';
import Button from '../../../components/utils/Button';
import Container from '@material-ui/core/Container';

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
    addMoreBtn: {
        backgroundColor: '#22A19A',
        color: 'whitesmoke',
        borderColor: '#22A19A',
        marginTop: '-2px',
        // padding: '1rem',
        '&:hover': {
            backgroundColor: '#22A19A',
            color: 'whitesmoke',
            borderColor: 'whitesmoke',
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

const InwardGatepass = ({ history }) => {
    const classes = useStyles();
    const [createLoading, setCreateLoading] = React.useState(false);

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
        <Sidenav title={'Inward Gate Pass'}>
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
                                    label='Enter IGP No.'
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
                                    label='Inward Type'
                                    variant='outlined'
                                    type='text'
                                    size='small'
                                    select
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
                                    <MenuItem value=''>Head Office</MenuItem>
                                </CssTextField>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} style={{ marginTop: 15 }}>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <h6 class='mt-2'>Enter Received Items:</h6>
                                <Formik
                                    // initialValues={initialValuesStateForItem}
                                    // validationSchema={validationSchemaForItems}
                                    enableReinitialize
                                // onSubmit={isEditMode ? onEditSubmit : addItems}
                                >
                                    {(props) => {
                                        // form = props;
                                        return (
                                            <Form autoComplete="off">
                                                <Grid container spacing={1} style={{ marginTop: 15 }}>
                                                    <Grid item lg={4} md={3} sm={12} xs={12}>
                                                        <CssTextField
                                                            id="outlined-basic"
                                                            label="Enter Items"
                                                            variant="outlined"
                                                            type="text"
                                                            style={{ width: "100%" }}
                                                            size="small"
                                                            inputProps={{ style: { fontSize: 14 } }}
                                                            InputLabelProps={{ style: { fontSize: 14 } }}
                                                            onChange={props.handleChange("quantity")}
                                                            onBlur={props.handleBlur("quantity")}
                                                        // value={props.values.quantity}
                                                        // helperText={
                                                        //     props.touched.quantity && props.errors.quantity
                                                        // }
                                                        // error={
                                                        //     props.touched.quantity && props.errors.quantity
                                                        // }
                                                        />
                                                    </Grid>
                                                    <Grid item lg={3} md={3} sm={12} xs={12}>
                                                        <Button
                                                            variant="outlined"
                                                            color="primary"
                                                            classNames={classes.addMoreBtn}
                                                            text="Add More"
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Form>
                                        );
                                    }}
                                </Formik>
                                {/* {items.map((el, i) => ( */}
                                <Grid
                                    // key={i}
                                    container
                                    spacing={1}
                                    style={{ marginTop: "2rem" }}
                                >
                                    <Grid item lg={4} md={4} sm={12} xs={12}>
                                        <CssTextField
                                            id="outlined-basic"
                                            label="Item"
                                            variant="outlined"
                                            disabled
                                            type="text"
                                            style={{ width: "100%" }}
                                            size="small"
                                            // value={el.quantity}
                                            inputProps={{ style: { fontSize: 14 } }}
                                            InputLabelProps={{ style: { fontSize: 14 } }}
                                        />
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={6} xs={6}>
                                        <div
                                            style={{ display: "flex", justifyContent: "center" }}
                                        >
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                classNames={classes.addMoreBtn}
                                                text="Edit"
                                            // onClick={() => onEdit(i, el)}
                                            />
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                style={{ marginLeft: '3px' }}
                                                classNames={classes.addMoreBtn}
                                                text="Delete"
                                            // onClick={() => onDelete(i)}
                                            />
                                        </div>
                                    </Grid>
                                </Grid>
                                {/* ))} */}
                            </Grid>
                            <Grid item lg={2} md={2} sm={12} xs={12}>
                                <h6 class='mt-2'>From</h6>
                                <CssTextField
                                    id='outlined-basic'
                                    label='Enter Party Name'
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
                        </Grid>
                        <Form>
                            <Grid container spacing={1} style={{ marginTop: "4rem" }}>
                                <Grid item lg={12} md={12} sm={10} xs={11}>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        classNames={classes.addButton}
                                        loading={createLoading}
                                        loaderColor="#333"
                                        text="Submit"
                                    />
                                    {/* {success && <p>{success}</p>}
                                                {error && <p>{error}</p>} */}
                                </Grid>
                            </Grid>
                        </Form>
                    </Form>
                </Formik>

                <table class='table table-responsive table-striped table-bordered border-dark text-center mt-3'>
                    <thead class='bg-dark text-light'>
                        <tr>
                            <th>IGP No.</th>
                            <th>Description</th>
                            <th>Unit</th>
                            <th>Qty</th>
                            <th>Remarks</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {
                                binCards.map((el, i) => ( */}
                        <tr>
                            {/* <td>{i + 1}</td> */}

                            <td>
                                {/* {el?.product?.name} */}
                            </td>
                            <td>
                                {/* {el?.history[0]?.balance} */}
                            </td>
                            <td>
                                {/* {el?.history[0]?.in} */}
                            </td>
                            <td>
                                {/* {el?.history[0]?.out} */}
                            </td>
                            <td>
                                {/* {el?.history[0]?.balance} */}
                            </td>
                            <td>
                                <Button
                                    variant='contained'
                                    text='View'
                                    size='small'
                                    classNames='btn bg-dark text-light'
                                    onClick={() => {
                                        history.push('/storedashboard/inwards/item_inward/print_inward_gatepass')
                                    }}
                                />
                            </td>
                        </tr>
                        {/* ))
                            } */}
                    </tbody>
                </table>
            </div>
        </Sidenav>
    )
}

export default InwardGatepass
