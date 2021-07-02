import React, { useState, useEffect } from 'react'
import Sidenav from '../../SideNav/Sidenav'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    mainContainer: {
        textAlign: 'center',
        [theme.breakpoints.up('md')]: {
            marginLeft: 0,
            marginTop: 15,
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: -15,
        },
    },
    addButton: {
        marginTop: 70,
        color: '#22A19A',
        borderColor: '#22A19A',
        fontWeight: 'bold',
        '&:hover': {
            border: 'none',
            backgroundColor: '#22A19A',
            color: 'whitesmoke',
        },
        [theme.breakpoints.up('md')]: {
            width: '15%',

        },
        [theme.breakpoints.down('sm')]: {
            width: '30%',

        },
    },
    addMoreButton: {
        backgroundColor: '#22A19A',
        color: 'whitesmoke',
        marginLeft: 20,
        marginTop: 5,
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
    ckeckBox: {
        [theme.breakpoints.up('md')]: {
            marginLeft: 7,
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
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

const JobDescription = ({ history }) => {
    const classes = useStyles();

    const { register, handleSubmit, formState: { errors } } = useForm()

    const dispatch = useDispatch()

    useEffect(async () => {
        // await dispatch(fetchEmployeesAction())
    }, [dispatch])

    // const { employee, loading, error } = useSelector(state => state.employee)

    const onSubmitData = () => {
        console.log('submit');
    }

    return (
        <Sidenav title={'Job Description'}>
            <div>
                <div className="text-center">
                    <form onSubmit={handleSubmit(onSubmitData)}>
                        {/* employee ? ( */}
                        <Grid container spacing={1}>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Select Department"
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    select
                                    autocomplete="off"
                                    style={{ width: '75%' }}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("asd", { required: true })}
                                >
                                    <MenuItem>Purchase</MenuItem>
                                </CssTextField>
                                {
                                    errors.category?.type === 'required' && (
                                        <p className='mt-3 text-danger'>Department is required</p>
                                    )
                                }
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Select Designation"
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    select
                                    autocomplete="off"
                                    style={{ width: '75%' }}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("asd", { required: true })}
                                >
                                    <MenuItem>Manager</MenuItem>
                                </CssTextField>
                                {
                                    errors.category?.type === 'required' && (
                                        <p className='mt-3 text-danger'>Designation is required</p>
                                    )
                                }
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Select Empployee Name"
                                    variant="outlined"
                                    type="text"
                                    autocomplete="off"
                                    size="small"
                                    select
                                    style={{ width: '75%' }}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("asd", { required: true, })}
                                >
                                    <MenuItem>Arsalan</MenuItem>
                                </CssTextField>
                                {
                                    errors.category?.type === 'required' && (
                                        <p className='mt-3 text-danger'>Position is required</p>
                                    )
                                }
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Reports To"
                                    variant="outlined"
                                    type="text"
                                    autocomplete="off"
                                    size="small"
                                    select
                                    style={{ width: '75%' }}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("asd", { required: true, })}
                                >
                                    <MenuItem>Factory Manager</MenuItem>
                                </CssTextField>
                                {
                                    errors.category?.type === 'required' && (
                                        <p className='mt-3 text-danger'>Reports to is required</p>
                                    )
                                }
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} className="mt-3">
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Interaction With"
                                    variant="outlined"
                                    type="date"
                                    size="small"
                                    select
                                    autocomplete="off"
                                    style={{ width: '75%' }}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("asd", { required: true })}
                                >
                                    <MenuItem value="0">Store In-Charege</MenuItem>
                                </CssTextField>
                                {
                                    errors.category?.type === 'required' && (
                                        <p className='mt-3 text-danger'>Interaction With is required</p>
                                    )
                                }
                            </Grid>
                        </Grid>
                        <div className="container mt-5" style={{ textAlign: 'left' }}>
                            <h5 style={{ textDecoration: 'underline', fontWeight: 'bold' }}>Responsibilities</h5>
                            <p>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto, eaque cupiditate magnam repellendus
                            </p>
                            <p>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto, eaque cupiditate magnam repellendus
                            </p>
                            <div style={{ marginTop: 30, marginBottom: 30 }}>
                                <hr />
                            </div>
                        </div>
                        <div className="container mt-5" style={{ textAlign: 'left' }}>
                            <h5 style={{ textDecoration: 'underline', fontWeight: 'bold' }}>Authorities</h5>
                            <p>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto, eaque cupiditate magnam repellendus
                            </p>
                            <p>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto, eaque cupiditate magnam repellendus
                            </p>
                            <div style={{ marginTop: 30, marginBottom: 30 }}>
                                <hr />
                            </div>
                        </div>
                        <div>
                            <Button
                                variant="outlined"
                                color="primary"
                                type="submit"
                                className={classes.addButton}
                                onClick={() => history.push('/hr/print_job_description')}
                            >
                                Print
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </Sidenav>
    )
}

export default JobDescription
