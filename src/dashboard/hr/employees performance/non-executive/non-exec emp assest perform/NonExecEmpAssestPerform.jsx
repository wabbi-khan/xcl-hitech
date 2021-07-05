import React, { useState, useEffect } from 'react'
import Sidenav from '../../../../SideNav/Sidenav'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
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
    inputFieldStyle: {
        // boxShadow: '0.4px 0.4px 0.4px 0.4px grey',
        // borderRadius: 5,
        [theme.breakpoints.up('md')]: {
            width: 250,

        },
        [theme.breakpoints.down('sm')]: {
            width: 200,
        },
    },
    inputFieldStyle1: {
        [theme.breakpoints.up('md')]: {
            width: 250,
            marginLeft: 70
        },
        [theme.breakpoints.down('sm')]: {
            width: 200,
        },
    },
    inputFieldStyle2: {
        [theme.breakpoints.up('md')]: {
            width: 250,
            marginLeft: 140
        },
        [theme.breakpoints.down('sm')]: {
            width: 200,
        },
    },
    inputFieldStyle3: {
        [theme.breakpoints.up('md')]: {
            width: 250,
            marginLeft: 210
        },
        [theme.breakpoints.down('sm')]: {
            width: 200,
        },
    },
    delete: {
        color: 'red',
        fontSize: 38,
        [theme.breakpoints.up('md')]: {
            marginLeft: 50,
            marginTop: -7,
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: -10,
        },
    },
    deleteRowBtn: {
        marginLeft: 220,
        '&:hover': {
            border: 'none',
            background: 'none',
        }
    },
    uploadImgBtn: {
        paddingLeft: 20,
    }
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

const NonExecEmpAssestPerform = ({ history }) => {
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
        <Sidenav title={'Assest Employees Performance (Non-Executive)'}>
            <div>
                <Container className={classes.mainContainer}>
                    <form onSubmit={handleSubmit(onSubmitData)}>
                        {/* employee ? ( */}
                        <Grid container spacing={1}>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    // label="Period"
                                    variant="outlined"
                                    type="date"
                                    size="small"
                                    autocomplete="off"
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("asd", { required: true })}
                                />
                                {
                                    errors.category?.type === 'required' && (
                                        <p className='mt-3 text-danger'>Period Date is required</p>
                                    )
                                }
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Select Department"
                                    variant="outlined"
                                    type="text"
                                    autocomplete="off"
                                    size="small"
                                    select
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("asd", { required: true, })}
                                >
                                    <MenuItem>Production</MenuItem>
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
                                    autocomplete="off"
                                    size="small"
                                    select
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("asd", { required: true, })}
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
                                    label="Select Employee"
                                    variant="outlined"
                                    type="text"
                                    autocomplete="off"
                                    size="small"
                                    select
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("asd", { required: true, })}
                                >
                                    <MenuItem>Ali</MenuItem>
                                </CssTextField>
                                {
                                    errors.category?.type === 'required' && (
                                        <p className='mt-3 text-danger'>Employee Name is required</p>
                                    )
                                }
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} className="mt-3">
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Employee No."
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    disabled
                                    autocomplete="off"
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("asd", { required: true })}
                                />
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="DOB"
                                    variant="outlined"
                                    type="text"
                                    autocomplete="off"
                                    size="small"
                                    disabled
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("asd", { required: true, })}
                                />
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Age"
                                    variant="outlined"
                                    type="number"
                                    autocomplete="off"
                                    size="small"
                                    disabled
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("asd", { required: true, })}
                                >
                                </CssTextField>
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Present Basic Pay"
                                    variant="outlined"
                                    type="text"
                                    autocomplete="off"
                                    size="small"
                                    disabled
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("asd", { required: true, })}
                                />
                                {
                                    errors.category?.type === 'required' && (
                                        <p className='mt-3 text-danger'>Basic Pay is required</p>
                                    )
                                }
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} className="mt-3">
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Date of Joining"
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    disabled
                                    autocomplete="off"
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("asd", { required: true })}
                                />
                            </Grid>
                        </Grid>
                        <div style={{ marginTop: 30, marginBottom: 30 }}>
                            <hr />
                        </div>
                        <Container className={classes.mainContainer}>
                            <h5 className="text-left">Disciplines</h5>
                            <Grid container spacing={1} style={{ marginTop: 15, }} >
                                <Grid item lg={1} md={1} className="mt-2">
                                    <h5 className={classes.itemHeading}>1.</h5>
                                </Grid>
                                <Grid item lg={2} md={2} sm={12} xs={12} className="mt-2">
                                    <h6>Quality of Work</h6>
                                </Grid>
                                <Grid item lg={2} md={2} sm={12} xs={12}>
                                    <CssTextField id="outlined-basic"
                                        label="Marks Allocated"
                                        variant="outlined"
                                        type="number"
                                        size="small"
                                        autocomplete="off"
                                        disabled
                                        // value={value.quantity}
                                        // onChange={(e) => {
                                        //     setNextToKin({
                                        //         relation: e.target.value
                                        //     })
                                        // }}
                                        className={classes.inputFieldStyle1}
                                        inputProps={{ style: { fontSize: 14 } }}
                                        InputLabelProps={{ style: { fontSize: 14 } }}
                                    />
                                </Grid>
                                <Grid item lg={2} md={2} sm={12} xs={12}>
                                    <CssTextField id="outlined-basic"
                                        label="Marks Awarded"
                                        variant="outlined"
                                        type="number"
                                        size="small"
                                        autocomplete="off"
                                        // value={ItemCounter[i].unitValue}
                                        // onChange={(e) => {
                                        //     setNextToKin({
                                        //         contact: e.target.value
                                        //     })
                                        // }}
                                        className={classes.inputFieldStyle2}
                                        inputProps={{ style: { fontSize: 14 } }}
                                        InputLabelProps={{ style: { fontSize: 14 } }}
                                    />
                                    {
                                        errors.category?.type === 'required' && (
                                            <p className='mt-3 text-danger'>Ararded Marks is required</p>
                                        )
                                    }
                                </Grid>
                            </Grid>
                        </Container>
                        <div style={{ marginTop: 30, marginBottom: 30 }}>
                            <hr />
                        </div>
                        <Container className={classes.mainContainer1}>
                            <h5 className="text-left">Ratings Table</h5>
                            <Grid container spacing={1} style={{ marginTop: 15, paddingRight: 120 }} >
                                <Grid item lg={3} md={3} sm={12} xs={12}>
                                    <h6>Outstanding</h6>
                                </Grid>
                                <Grid item lg={2} md={2} sm={12} xs={12}>
                                    <h6>90-100</h6>
                                </Grid>
                            </Grid>
                        </Container>
                        <Container className={classes.mainContainer}>
                            <h5 className="text-left mt-5">Overall Ratings</h5>
                            <Grid container spacing={1} style={{ marginTop: 15, }} >
                                {/* <Grid item lg={1} md={1} className="mt-2">
                                    <h5 className={classes.itemHeading}>1.</h5>
                                </Grid> */}
                                <Grid item lg={2} md={2} sm={12} xs={12}>
                                    <h6 style={{ textDecoration: 'underline' }}>OUTSTANDING</h6>
                                </Grid>
                            </Grid>
                            <Grid container spacing={1}>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <p>description of outstanding here</p>
                                </Grid>
                            </Grid>
                        </Container>
                        <div style={{ marginTop: 30, marginBottom: 30 }}>
                            <hr />
                        </div>
                        <Container style={{ textAlign: 'left' }}>
                            <h5 className="text-left">General Remarks</h5>
                            <CssTextField id="outlined-basic"
                                label="Remarks (If Any)"
                                variant="outlined"
                                type="text"
                                size="small"
                                disabled
                                autocomplete="off"
                                style={{ width: '50%' }}
                                inputProps={{ style: { fontSize: 14 } }}
                                InputLabelProps={{ style: { fontSize: 14 } }}
                                {...register("asd", { required: true })}
                            />
                        </Container>
                        <div>
                            <Button
                                variant="outlined"
                                color="primary"
                                type="submit"
                                className={classes.addButton}
                                onClick={() => history.push('/hr/performance_assessment/print_non_executive_emp_performance')}
                            >
                                Submit
                            </Button>
                        </div>
                    </form>
                </Container>
            </div>
        </Sidenav>
    )
}

export default NonExecEmpAssestPerform
