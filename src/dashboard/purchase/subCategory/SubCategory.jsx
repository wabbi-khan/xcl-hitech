import React, { useState, useEffect } from 'react';
import Sidenav from '../../SideNav/Sidenav'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { Formik, Form } from 'formik'
import * as yup from 'yup';
import axios from 'axios';
import Button from '../../../components/utils/Button'
import {
    // createUnit,
    // deleteUnit,
    // getUnits,
} from '../../../services/action/unitAction';
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
    name: yup.string().required('Sub-Category is required')
});

const SubCategory = () => {
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
    const [unit, setUnit] = React.useState({});
    const { units } = useSelector((state) => state.units);
    console.log(units);

    // React.useEffect(() => {
    //     setFetchLoading(true);
    //     dispatch(
    //         getUnits(null, (err) => {
    //             if (err) {
    //                 setFetchError(err);
    //                 setTimeout(() => {
    //                     setFetchError('');
    //                 }, 4000);
    //             }
    //             setFetchLoading(false);
    //         }),
    //     );
    // }, [dispatch]);

    const onSubmit = async (values) => {
        // setCreateLoading(true);
        // dispatch(
        //     createUnit(values, (err) => {
        //         if (err) {
        //             setCreateError(err);
        //             setTimeout(() => {
        //                 setCreateError('');
        //             }, 4000);
        //         }
        //         else {
        //             setSuccess('Unit added successfully');
        //             setTimeout(() => {
        //                 setSuccess('');
        //             }, 4000);
        //         }
        //         setCreateLoading(false);
        //     }),
        // );
    };

    const deleteUnitFunc = async (params) => {
        // setDeleteLoading(true);
        // dispatch(
        //     deleteUnit(params, (err) => {
        //         if (err) {
        //             setDeleteError(err);
        //             setTimeout(() => {
        //                 setDeleteError('');
        //             }, 4000);
        //         }
        //         setDeleteLoading(false);
        //     }),
        // );
    };

    const handleClose = (props) => {
        setOpen(props);
    };

    const handleOpen = async (unit) => {
        setUnit(unit);
        setOpen(true);
    };

    return (
        <Sidenav title={'Sub Categories'}>
            {/* <EditUnit
                show={open}
                handler={handleClose}
                unit={unit}
            />
            {
                deleteLoading && (
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Loader type='TailSpin' width='2rem' height='2rem' />
                    </div>
                )
            }
            {
                deleteError && (
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <span>{deleteError}</span>
                    </div>
                )
            } */}
            <div>
                <Container className={classes.mainContainer}>
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
                                        label='Sub Categories'
                                        variant='outlined'
                                        type='text'
                                        autocomplete='off'
                                        size='small'
                                        style={{ width: '50%' }}
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
                                            loading={createLoading}
                                            loaderColor="#333"
                                        />
                                        {
                                            createError && <p>{createError}</p>
                                        }
                                    </div>
                                </Form>
                            )
                        }
                    </Formik>
                </Container>
            </div>
            <div
                className='container-fluid'
                style={{ textAlign: 'left', marginTop: '50px' }}
            >
                {/* {
                    fetchLoading ? (
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: '3rem',
                            }}>
                            <Loader type='TailSpin' color='#000' width='3rem' height='3rem' />
                        </div>
                    ) : units?.length === 0 ? (
                        <p>There are no sub categories found</p>
                    ) : ( */}
                <table class="table table-responsive table-hover table-striped table-bordered border-dark text-center mt-3">
                    {/* {
                                units?.map((el, i) => (
                                    <>
                                        {
                                            i === 0 && ( */}
                    <thead class="bg-dark text-light">
                        <tr>
                            <th>S.No.</th>
                            <th>Units</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {/* )
                                        } */}
                    <tbody>
                        <tr >
                            <td>
                                {/* {i + 1} */}
                            </td>
                            <td>
                                {/* {el.name} */}
                            </td>
                            <td>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button
                                        variant='contained'
                                        text='Edit'
                                        size='small'
                                        classNames='bg-dark text-light'
                                    // onClick={() => handleOpen(el)}
                                    />
                                    <Button
                                        variant='contained'
                                        text='Delete'
                                        size='small'
                                        color='secondary'
                                        // onClick={() => deleteUnitFunc(el._id)}
                                        style={{ marginLeft: '5px' }}
                                    />
                                </div>
                            </td>
                        </tr>

                    </tbody>
                    {/* </>
                                ))
                            } */}
                </table>
                {/* )
                } */}
            </div>
        </Sidenav>
    )
}

export default SubCategory
