import React from 'react'
import Sidenav from '../../SideNav/Sidenav'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import { useForm } from 'react-hook-form';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';


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
        marginTop: 50,
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

const TrainingNeed = ({ history }) => {
    const classes = useStyles();

    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmitData = () => {
        console.log('data submit');
    }

    return (
        <Sidenav title={'Training Needs Identification'}>
            <div>
                <Container className={classes.mainContainer}>
                    <form onSubmit={handleSubmit(onSubmitData)}>
                        <Grid container spacing={1}>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Select Department"
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    select
                                    autocomplete="off"
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("name", { required: true })}
                                >
                                    <MenuItem
                                        value={0}
                                    // onClick={(e) => fetchMaterials(category._id)}
                                    // key={i}
                                    >
                                        HR
                                    </MenuItem>
                                </CssTextField>
                                {
                                    errors.name?.type === 'required' && (
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
                                    {...register("name", { required: true, })}
                                >
                                    <MenuItem
                                        value={0}
                                    // onClick={(e) => fetchMaterials(category._id)}
                                    // key={i}
                                    >
                                        Assistant Manager
                                    </MenuItem>
                                </CssTextField>
                                {
                                    errors.name?.type === 'required' && (
                                        <p className='mt-3 text-danger'>Designation is required</p>
                                    )
                                }
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Interviewed By"
                                    variant="outlined"
                                    type="text"
                                    autocomplete="off"
                                    size="small"
                                    select
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("name", { required: true, })}
                                >
                                    <MenuItem
                                        value={0}
                                    // onClick={(e) => fetchMaterials(category._id)}
                                    // key={i}
                                    >
                                        QC Manager
                                    </MenuItem>
                                </CssTextField>
                                {
                                    errors.name?.type === 'required' && (
                                        <p className='mt-3 text-danger'>Interviewed By required</p>
                                    )
                                }
                            </Grid>
                        </Grid>
                        <div style={{ marginTop: 30, marginBottom: 30 }}>
                            <hr />
                        </div>
                        <Container>
                            <h4 style={{ textAlign: 'left' }}>Training</h4>
                            {/* {
                                academicQualification.map((value, i) => {
                                    const no = i + 1;
                                    return ( */}
                            <Grid container spacing={1} style={{ marginTop: 35 }}>
                                <Grid item lg={1} md={1}>
                                    <h5 className={classes.itemHeading}>1.</h5>
                                </Grid>
                                <Grid item lg={5} md={5} sm={12} xs={12}>
                                    <div style={{ textAlign: 'left' }}>
                                        <h5 style={{ marginBottom: 15 }}>
                                            Quality Management System
                                        </h5>
                                        <p>
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        </p>
                                        <p>
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        </p>
                                    </div>
                                </Grid>
                                <Grid item lg={3} md={3} sm={12} xs={12}>
                                    <CssTextField
                                        id='outlined-basic'
                                        label='Select Satisfaction'
                                        variant='outlined'
                                        type='text'
                                        size='small'
                                        name='yearOfPassing'
                                        select
                                        // value={value.yearOfPassing}
                                        // onChange={(e) => {
                                        //     onChangeAcademicQualification(e, i);
                                        // }}
                                        style={{ width: '75%' }}
                                        inputProps={{ style: { fontSize: 14 } }}
                                        InputLabelProps={{ style: { fontSize: 14 } }}
                                    >
                                        <MenuItem value="0">Excellent</MenuItem>
                                        <MenuItem value="0">Good</MenuItem>
                                        <MenuItem value="0">Satisfactory</MenuItem>
                                        <MenuItem value="0">Poor</MenuItem>
                                    </CssTextField>
                                </Grid>
                                <Grid item lg={3} md={3} sm={12} xs={12}>
                                    <CssTextField
                                        id='outlined-basic'
                                        label='Training Need'
                                        variant='outlined'
                                        type='text'
                                        size='small'
                                        name='yearOfPassing'
                                        select
                                        // value={value.yearOfPassing}
                                        // onChange={(e) => {
                                        //     onChangeAcademicQualification(e, i);
                                        // }}
                                        style={{ width: '75%' }}
                                        inputProps={{ style: { fontSize: 14 } }}
                                        InputLabelProps={{ style: { fontSize: 14 } }}
                                    >
                                        <MenuItem value="">Yes</MenuItem>
                                        <MenuItem value="">No</MenuItem>
                                    </CssTextField>
                                </Grid>
                            </Grid>
                            {/* );
                                })
                            } */}
                            {/* {
                                AddOrderError ? <p className="mt-3 text-danger"> Something Went Wrong. Internal Server Error </p> : null
                            }
                            {
                                AddOrderSuccess ? <p className="mt-3 text-success"> Purchase Order Added Successfully</p> : null
                            } */}
                        </Container>
                        <Container>
                            <Grid container spacing={1} style={{ marginTop: 60 }}>
                                <Grid item lg={4} md={3} sm={12} xs={12}>
                                    <CssTextField
                                        id='outlined-basic'
                                        label='Recommendations'
                                        variant='outlined'
                                        type='text'
                                        size='small'
                                        // value={value.yearOfPassing}
                                        // onChange={(e) => {
                                        //     onChangeAcademicQualification(e, i);
                                        // }}
                                        style={{ width: '100%' }}
                                        inputProps={{ style: { fontSize: 14 } }}
                                        InputLabelProps={{ style: { fontSize: 14 } }}
                                    />
                                </Grid>
                            </Grid>
                        </Container>
                        <div>
                            <Button
                                variant="outlined"
                                color="primary"
                                type="submit"
                                className={classes.addButton}
                                onClick={() => {
                                    history.push('/hr/print_training_need_identification')
                                }}
                            >
                                Add
                            </Button>
                        </div>
                    </form>
                </Container>
            </div>
        </Sidenav>
    )
}

export default TrainingNeed
