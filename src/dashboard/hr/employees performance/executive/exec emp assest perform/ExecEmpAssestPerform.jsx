import React, { useEffect } from 'react'
import Sidenav from '../../../../SideNav/Sidenav';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import FormGroup from '@material-ui/core/FormGroup';
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

const ExecEmpAssestPerform = ({ history }) => {
    const classes = useStyles();

    const { register, handleSubmit, formState: { errors } } = useForm()

    const dispatch = useDispatch()

    useEffect(async () => {
        // await dispatch(fetchEmployeesAction())
    }, [dispatch])

    const { employee, loading, error } = useSelector(state => state.employee)

    const onSubmitData = () => {
        console.log('submit');
    }

    return (
        <Sidenav title={'Employees Performance Assessment (Executive)'}>
            <div>
                <Container className={classes.mainContainer}>
                    <form onSubmit={handleSubmit(onSubmitData)}>
                        {/* employee ? ( */}
                        <Grid container spacing={1}>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    // label="Dua Date"
                                    variant="outlined"
                                    type="date"
                                    size="small"
                                    autocomplete="off"
                                    style={{ width: '75%' }}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("", { required: true })}
                                    />
                                {
                                    errors.category?.type === 'required' && (
                                        <p className='mt-3 text-danger'>Due Date is required</p>
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
                                    style={{ width: '75%' }}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("", { required: true, })}
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
                                    label="Select Position/Title"
                                    variant="outlined"
                                    type="text"
                                    autocomplete="off"
                                    size="small"
                                    select
                                    style={{ width: '75%' }}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("", { required: true, })}
                                    >
                                    <MenuItem>Manager</MenuItem>
                                </CssTextField>
                                {
                                    errors.category?.type === 'required' && (
                                        <p className='mt-3 text-danger'>Position is required</p>
                                    )
                                }
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Employee Name"
                                    variant="outlined"
                                    type="text"
                                    autocomplete="off"
                                    size="small"
                                    select
                                    style={{ width: '75%' }}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("", { required: true, })}
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
                                    // label="Date of Employment"
                                    variant="outlined"
                                    type="date"
                                    size="small"
                                    disabled
                                    autocomplete="off"
                                    style={{ width: '75%' }}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("", { required: true })}
                                />
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Select End of Probation"
                                    variant="outlined"
                                    type="text"
                                    autocomplete="off"
                                    size="small"
                                    select
                                    style={{ width: '75%' }}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("", { required: true, })}
                                >
                                    <MenuItem>6-Months</MenuItem>
                                    <MenuItem>1-Year</MenuItem>
                                </CssTextField>
                                {
                                    errors.category?.type === 'required' && (
                                        <p className='mt-3 text-danger'>Select Any End of Probation</p>
                                    )
                                }
                            </Grid>
                        </Grid>
                        <div style={{ marginTop: 30, marginBottom: 30 }}>
                            <hr />
                        </div>
                        <div className="text-center" >
                            <h5 style={{ textDecoration: 'underline' }}>PERFORMANCE ASSESSMENT</h5>
                            <h6 className="mt-3">
                                A CHECK MARK HAS BEEN PLACED IN THE BOX WHICH MOST CLOSELY INDICATES THE EMPLOYEE'S PERFORMANCE <br /> OF EACH FACTOR.
                                FACTOR RATINGS OF "OUTSTANDING" OR "UNSATISFACTORY" HAVE BEEN SUBSTANCIATED BY COMMENTS.
                            </h6>
                            <div className="text-center mt-4">
                                <table class="table table-striped table-inverse table-responsive table-bordered table-hover" style={{ marginLeft: 60 }}>
                                    <thead class="thead-inverse">
                                        <tr>
                                            <th colspan="6">RATING</th>
                                        </tr>
                                    </thead>
                                    <thead class="thead-inverse thead-dark">
                                        <tr>
                                            <th>PERFORMANCE FACTORS</th>
                                            <th>OUTSTANDING</th>
                                            <th>EXCEEDS EXPECTATIONS</th>
                                            <th>MEETS EXPECTATIONS</th>
                                            <th>BELOW EXPECTATIONS</th>
                                            <th>UNSATISFACTORY</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td scope="row"></td>
                                            <td>(5)</td>
                                            <td>(4)</td>
                                            <td>(3)</td>
                                            <td>(2)</td>
                                            <td>(1)</td>
                                        </tr>
                                        <tr>
                                            <td scope="row">QUALITY OF WORK</td>
                                            <td>Work exceptional, <br /> rarely makes errors</td>
                                            <td>Work exceptional, <br /> rarely makes errors</td>
                                            <td>Work exceptional, <br /> rarely makes errors</td>
                                            <td>Work exceptional, <br /> rarely makes errors</td>
                                            <td>Work exceptional, <br /> rarely makes errors</td>
                                        </tr>
                                        <tr>
                                            <td scope="row"></td>
                                            <td className="text-center">
                                                <FormGroup row className="ml-5">
                                                    <FormControlLabel
                                                        // key={i}
                                                        control={
                                                            <Checkbox
                                                                style={{ color: '#22A19A' }}
                                                                color="default"
                                                                icon={<CheckBoxOutlineBlankIcon fontSize='small' />}
                                                                checkedIcon={<CheckBoxIcon fontSize='small' />}
                                                            // onChange={(e) => getMaterials(e)}
                                                            />
                                                        }
                                                        // name={material.name}
                                                        // value={material._id}
                                                        // label={material.name}
                                                        {...register('material')}
                                                    />
                                                </FormGroup>
                                            </td>
                                            <td className="text-center">
                                                <FormGroup row style={{ marginLeft: 80 }}>
                                                    <FormControlLabel
                                                        // key={i}
                                                        control={
                                                            <Checkbox
                                                                style={{ color: '#22A19A' }}
                                                                color="default"
                                                                icon={<CheckBoxOutlineBlankIcon fontSize='small' />}
                                                                checkedIcon={<CheckBoxIcon fontSize='small' />}
                                                            // onChange={(e) => getMaterials(e)}
                                                            />
                                                        }
                                                        // name={material.name}
                                                        // value={material._id}
                                                        // label={material.name}
                                                        {...register('material')}
                                                    />
                                                </FormGroup>
                                            </td>
                                            <td className="text-center">
                                                <FormGroup row style={{ marginLeft: 80 }}>
                                                    <FormControlLabel
                                                        // key={i}
                                                        control={
                                                            <Checkbox
                                                                style={{ color: '#22A19A' }}
                                                                color="default"
                                                                icon={<CheckBoxOutlineBlankIcon fontSize='small' />}
                                                                checkedIcon={<CheckBoxIcon fontSize='small' />}
                                                            // onChange={(e) => getMaterials(e)}
                                                            />
                                                        }
                                                        // name={material.name}
                                                        // value={material._id}
                                                        // label={material.name}
                                                        {...register('material')}
                                                    />
                                                </FormGroup>
                                            </td>
                                            <td className="text-center">
                                                <FormGroup row style={{ marginLeft: 80 }}>
                                                    <FormControlLabel
                                                        // key={i}
                                                        control={
                                                            <Checkbox
                                                                style={{ color: '#22A19A' }}
                                                                color="default"
                                                                icon={<CheckBoxOutlineBlankIcon fontSize='small' />}
                                                                checkedIcon={<CheckBoxIcon fontSize='small' />}
                                                            // onChange={(e) => getMaterials(e)}
                                                            />
                                                        }
                                                        // name={material.name}
                                                        // value={material._id}
                                                        // label={material.name}
                                                        {...register('material')}
                                                    />
                                                </FormGroup>
                                            </td>
                                            <td className="text-center">
                                                <FormGroup row className="ml-5">
                                                    <FormControlLabel
                                                        // key={i}
                                                        control={
                                                            <Checkbox
                                                                style={{ color: '#22A19A' }}
                                                                color="default"
                                                                icon={<CheckBoxOutlineBlankIcon fontSize='small' />}
                                                                checkedIcon={<CheckBoxIcon fontSize='small' />}
                                                            // onChange={(e) => getMaterials(e)}
                                                            />
                                                        }
                                                        // name={material.name}
                                                        // value={material._id}
                                                        // label={material.name}
                                                        {...register('material')}
                                                    />
                                                </FormGroup>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="text-left mt-4">
                                <CssTextField id="outlined-basic"
                                    label="Comments/Recommendations"
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    autocomplete="off"
                                    // value={value.quantity}
                                    // onChange={(e) => {
                                    //     setNextToKin({
                                    //         relation: e.target.value
                                    //     })
                                    // }}
                                    style={{ width: '50%', marginLeft: 60 }}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                />
                            </div>
                            <div className="text-center mt-5">
                                <table class="table table-striped table-inverse table-responsive table-bordered table-hover" style={{ marginLeft: 60 }}>
                                    <thead class="thead-inverse thead-dark">
                                        <tr>
                                            <th>PERFORMANCE FACTORS</th>
                                            <th>OUTSTANDING</th>
                                            <th>EXCEEDS EXPECTATIONS</th>
                                            <th>MEETS EXPECTATIONS</th>
                                            <th>BELOW EXPECTATIONS</th>
                                            <th>UNSATISFACTORY</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td scope="row"></td>
                                            <td>(5)</td>
                                            <td>(4)</td>
                                            <td>(3)</td>
                                            <td>(2)</td>
                                            <td>(1)</td>
                                        </tr>
                                        <tr>
                                            <td scope="row">QUALITY OF WORK</td>
                                            <td>Work exceptional, <br /> rarely makes errors</td>
                                            <td>Work exceptional, <br /> rarely makes errors</td>
                                            <td>Work exceptional, <br /> rarely makes errors</td>
                                            <td>Work exceptional, <br /> rarely makes errors</td>
                                            <td>Work exceptional, <br /> rarely makes errors</td>
                                        </tr>
                                        <tr>
                                            <td scope="row"></td>
                                            <td className="text-center">
                                                <FormGroup row className="ml-5">
                                                    <FormControlLabel
                                                        // key={i}
                                                        control={
                                                            <Checkbox
                                                                style={{ color: '#22A19A' }}
                                                                color="default"
                                                                icon={<CheckBoxOutlineBlankIcon fontSize='small' />}
                                                                checkedIcon={<CheckBoxIcon fontSize='small' />}
                                                            // onChange={(e) => getMaterials(e)}
                                                            />
                                                        }
                                                        // name={material.name}
                                                        // value={material._id}
                                                        // label={material.name}
                                                        {...register('material')}
                                                    />
                                                </FormGroup>
                                            </td>
                                            <td className="text-center">
                                                <FormGroup row style={{ marginLeft: 80 }}>
                                                    <FormControlLabel
                                                        // key={i}
                                                        control={
                                                            <Checkbox
                                                                style={{ color: '#22A19A' }}
                                                                color="default"
                                                                icon={<CheckBoxOutlineBlankIcon fontSize='small' />}
                                                                checkedIcon={<CheckBoxIcon fontSize='small' />}
                                                            // onChange={(e) => getMaterials(e)}
                                                            />
                                                        }
                                                        // name={material.name}
                                                        // value={material._id}
                                                        // label={material.name}
                                                        {...register('material')}
                                                    />
                                                </FormGroup>
                                            </td>
                                            <td className="text-center">
                                                <FormGroup row style={{ marginLeft: 80 }}>
                                                    <FormControlLabel
                                                        // key={i}
                                                        control={
                                                            <Checkbox
                                                                style={{ color: '#22A19A' }}
                                                                color="default"
                                                                icon={<CheckBoxOutlineBlankIcon fontSize='small' />}
                                                                checkedIcon={<CheckBoxIcon fontSize='small' />}
                                                            // onChange={(e) => getMaterials(e)}
                                                            />
                                                        }
                                                        // name={material.name}
                                                        // value={material._id}
                                                        // label={material.name}
                                                        {...register('material')}
                                                    />
                                                </FormGroup>
                                            </td>
                                            <td className="text-center">
                                                <FormGroup row style={{ marginLeft: 80 }}>
                                                    <FormControlLabel
                                                        // key={i}
                                                        control={
                                                            <Checkbox
                                                                style={{ color: '#22A19A' }}
                                                                color="default"
                                                                icon={<CheckBoxOutlineBlankIcon fontSize='small' />}
                                                                checkedIcon={<CheckBoxIcon fontSize='small' />}
                                                            // onChange={(e) => getMaterials(e)}
                                                            />
                                                        }
                                                        // name={material.name}
                                                        // value={material._id}
                                                        // label={material.name}
                                                        {...register('material')}
                                                    />
                                                </FormGroup>
                                            </td>
                                            <td className="text-center">
                                                <FormGroup row className="ml-5">
                                                    <FormControlLabel
                                                        // key={i}
                                                        control={
                                                            <Checkbox
                                                                style={{ color: '#22A19A' }}
                                                                color="default"
                                                                icon={<CheckBoxOutlineBlankIcon fontSize='small' />}
                                                                checkedIcon={<CheckBoxIcon fontSize='small' />}
                                                            // onChange={(e) => getMaterials(e)}
                                                            />
                                                        }
                                                        // name={material.name}
                                                        // value={material._id}
                                                        // label={material.name}
                                                        {...register('material')}
                                                    />
                                                </FormGroup>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="text-left mt-4">
                                <CssTextField id="outlined-basic"
                                    label="Comments/Recommendations"
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    autocomplete="off"
                                    // value={value.quantity}
                                    // onChange={(e) => {
                                    //     setNextToKin({
                                    //         relation: e.target.value
                                    //     })
                                    // }}
                                    style={{ width: '50%', marginLeft: 60 }}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                />
                            </div>
                        </div>
                        <div className="text-center mt-5" >
                            <table class="table table-striped table-inverse table-responsive table-hover" style={{ marginLeft: 60 }}>
                                <thead class="thead-inverse thead-dark">
                                    <tr>
                                        <th colspan="2">RATING CALCULATION:</th>
                                        <th colspan="4">(Each number of ratingschecks, multiply and total)</th>
                                    </tr>
                                </thead>
                                {/* <thead class="thead-inverse thead-dark">
                                    <tr>
                                        <th>Outstanding</th>
                                        <th>Exceeds Expectations</th>
                                        <th>Meets Expectations</th>
                                        <th>Below Expectations</th>
                                        <th>Unsatisfactory</th>
                                    </tr>
                                </thead> */}
                                <tbody>
                                    <tr>
                                        <td scope="row">Outstanding</td>
                                        <td scope="row">5</td>
                                        <td scope="row">x</td>
                                        <td scope="row">6</td>
                                        <td scope="row">=</td>
                                        <td scope="row">30</td>
                                    </tr>
                                    <tr>
                                        <td scope="row">Exceeds Expectations</td>
                                        <td scope="row">4</td>
                                        <td scope="row">x</td>
                                        <td scope="row">6</td>
                                        <td scope="row">=</td>
                                        <td scope="row">30</td>
                                    </tr>
                                    <tr>
                                        <td scope="row">Meets Expectations</td>
                                        <td scope="row">3</td>
                                        <td scope="row">x</td>
                                        <td scope="row">6</td>
                                        <td scope="row">=</td>
                                        <td scope="row">30</td>
                                    </tr>
                                    <tr>
                                        <td scope="row">Below Expectations</td>
                                        <td scope="row">2</td>
                                        <td scope="row">x</td>
                                        <td scope="row">6</td>
                                        <td scope="row">=</td>
                                        <td scope="row">30</td>
                                    </tr>
                                    <tr>
                                        <td scope="row">Unsatisfactory</td>
                                        <td scope="row">1</td>
                                        <td scope="row">x</td>
                                        <td scope="row">6</td>
                                        <td scope="row">=</td>
                                        <td scope="row">30</td>
                                    </tr>
                                    <tr>
                                        <td colspan="2">TOTAL</td>
                                        <td colspan="3"></td>
                                        <td>46</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="text-center mt-5" >
                            <table class="table table-striped table-inverse table-responsive table-hover" style={{ marginLeft: 60 }}>
                                <thead class="thead-inverse thead-dark">
                                    <tr>
                                        <th>RATING TABLE:</th>
                                        <th colspan="2">MEETINGS OF GOALS</th>
                                    </tr>
                                </thead>
                                {/* <thead class="thead-inverse thead-dark">
                                    <tr>
                                        <th>Outstanding</th>
                                        <th>Exceeds Expectations</th>
                                        <th>Meets Expectations</th>
                                        <th>Below Expectations</th>
                                        <th>Unsatisfactory</th>
                                    </tr>
                                </thead> */}
                                <tbody>
                                    <tr>
                                        <td scope="row">Outstanding</td>
                                        <td scope="row">45-50</td>
                                        <td className="text-center">
                                            <FormGroup row style={{ marginLeft: 30, marginTop: -7 }}>
                                                <FormControlLabel
                                                    // key={i}
                                                    control={
                                                        <Checkbox
                                                            style={{ color: 'black', }}
                                                            color="default"
                                                            icon={<CheckBoxOutlineBlankIcon fontSize='small' />}
                                                            checkedIcon={<CheckBoxIcon fontSize='small' />}
                                                        // onChange={(e) => getMaterials(e)}
                                                        />
                                                    }
                                                    // name={material.name}
                                                    // value={material._id}
                                                    // label={material.name}
                                                    {...register('material')}
                                                />
                                            </FormGroup>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td scope="row">Exceeds Expectations</td>
                                        <td scope="row">35-44</td>
                                        <td className="text-center">
                                            <FormGroup row style={{ marginLeft: 30, marginTop: -7 }}>
                                                <FormControlLabel
                                                    // key={i}
                                                    control={
                                                        <Checkbox
                                                            style={{ color: 'black', }}
                                                            color="default"
                                                            icon={<CheckBoxOutlineBlankIcon fontSize='small' />}
                                                            checkedIcon={<CheckBoxIcon fontSize='small' />}
                                                        // onChange={(e) => getMaterials(e)}
                                                        />
                                                    }
                                                    // name={material.name}
                                                    // value={material._id}
                                                    // label={material.name}
                                                    {...register('material')}
                                                />
                                            </FormGroup>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td scope="row">Meets Expectations</td>
                                        <td scope="row">25-34</td>
                                        <td className="text-center">
                                            <FormGroup row style={{ marginLeft: 30, marginTop: -7 }}>
                                                <FormControlLabel
                                                    // key={i}
                                                    control={
                                                        <Checkbox
                                                            style={{ color: 'black', }}
                                                            color="default"
                                                            icon={<CheckBoxOutlineBlankIcon fontSize='small' />}
                                                            checkedIcon={<CheckBoxIcon fontSize='small' />}
                                                        // onChange={(e) => getMaterials(e)}
                                                        />
                                                    }
                                                    // name={material.name}
                                                    // value={material._id}
                                                    // label={material.name}
                                                    {...register('material')}
                                                />
                                            </FormGroup>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td scope="row">Below Expectations</td>
                                        <td scope="row">15-24</td>
                                        <td className="text-center">
                                            <FormGroup row style={{ marginLeft: 30, marginTop: -7 }}>
                                                <FormControlLabel
                                                    // key={i}
                                                    control={
                                                        <Checkbox
                                                            style={{ color: 'black', }}
                                                            color="default"
                                                            icon={<CheckBoxOutlineBlankIcon fontSize='small' />}
                                                            checkedIcon={<CheckBoxIcon fontSize='small' />}
                                                        // onChange={(e) => getMaterials(e)}
                                                        />
                                                    }
                                                    // name={material.name}
                                                    // value={material._id}
                                                    // label={material.name}
                                                    {...register('material')}
                                                />
                                            </FormGroup>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td scope="row">Unsatisfactory</td>
                                        <td scope="row">10-14</td>
                                        <td className="text-center">
                                            <FormGroup row style={{ marginLeft: 30, marginTop: -7 }}>
                                                <FormControlLabel
                                                    // key={i}
                                                    control={
                                                        <Checkbox
                                                            style={{ color: 'black', }}
                                                            color="default"
                                                            icon={<CheckBoxOutlineBlankIcon fontSize='small' />}
                                                            checkedIcon={<CheckBoxIcon fontSize='small' />}
                                                        // onChange={(e) => getMaterials(e)}
                                                        />
                                                    }
                                                    // name={material.name}
                                                    // value={material._id}
                                                    // label={material.name}
                                                    {...register('material')}
                                                />
                                            </FormGroup>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div style={{ marginTop: 30, marginBottom: 30 }}>
                            <hr />
                        </div>
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
                            <Grid container spacing={1} style={{ marginTop: 15, }} >
                                {/* <Grid item lg={1} md={1} className="mt-2">
                                    <h5 className={classes.itemHeading}>1.</h5>
                                </Grid> */}
                                <Grid item lg={3} md={4} sm={12} xs={12}>
                                    <h6 style={{ textDecoration: 'underline' }}>EXCEEDS EXPECCTTIONS</h6>
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
                        <div className="text-left mt-4">
                            <CssTextField id="outlined-basic"
                                label="Suggestions"
                                variant="outlined"
                                type="text"
                                size="small"
                                autocomplete="off"
                                // value={value.quantity}
                                // onChange={(e) => {
                                //     setNextToKin({
                                //         relation: e.target.value
                                //     })
                                // }}
                                style={{ width: '50%', marginLeft: 60 }}
                                inputProps={{ style: { fontSize: 14 } }}
                                InputLabelProps={{ style: { fontSize: 14 } }}
                            />
                        </div>
                        <div className="text-left mt-4">
                            <CssTextField id="outlined-basic"
                                label="Recommendations"
                                variant="outlined"
                                type="text"
                                size="small"
                                autocomplete="off"
                                // value={value.quantity}
                                // onChange={(e) => {
                                //     setNextToKin({
                                //         relation: e.target.value
                                //     })
                                // }}
                                style={{ width: '50%', marginLeft: 60 }}
                                inputProps={{ style: { fontSize: 14 } }}
                                InputLabelProps={{ style: { fontSize: 14 } }}
                            />
                        </div>
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

export default ExecEmpAssestPerform
