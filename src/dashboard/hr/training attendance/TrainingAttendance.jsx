import React, { useEffect } from 'react'
import Sidenav from '../../SideNav/Sidenav'
import { useDispatch } from 'react-redux'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { useForm } from 'react-hook-form';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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
        marginTop: 40,
        textAlign: 'center'
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
            // width: '12%',
        },
    },
    table: {
        minWidth: 600,
    },
    dataTable: {
        marginTop: 70,

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

const TrainingAttendance = ({ history }) => {
    const classes = useStyles();

    const { register, handleSubmit, formState: { errors } } = useForm()

    const dispatch = useDispatch()

    useEffect(async () => {
        // await dispatch(fetchDesignationAction())
    }, [dispatch])

    // const { designations, loading, error } = useSelector(state => state.designations)

    const onSubmitDate = async (props) => {
        // try {
        //     await axios.post(`${process.env.REACT_APP_API_URL}/designation`, props)
        //     window.location.reload()
        //     console.log('submit');
        //     // setAddMatError(false)
        // }
        // catch (error) {
        //     console.log(error);
        //     // setAddMatError(true)

        // }
    }

    return (
        <Sidenav title={'Training Attendance'}>
            <div>
                <Container className={classes.mainContainer}>
                    <form action="" onSubmit={handleSubmit(onSubmitDate)}>
                        {/* Material category selector */}
                        <Grid container spacing={1}>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Select Subject"
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    select
                                    autocomplete="off"
                                    style={{ width: '100%' }}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("asd", { required: true })}
                                >
                                    <MenuItem value="0">Training on Purchase</MenuItem>
                                </CssTextField>
                                {
                                    errors.category?.type === 'required' && (
                                        <p className='mt-3 text-danger'>Training Subject is required</p>
                                    )
                                }
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Tutor"
                                    variant="outlined"
                                    type="text"
                                    autocomplete="off"
                                    size="small"
                                    select
                                    style={{ width: '100%' }}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("asd", { required: true, })}
                                >
                                    <MenuItem>QA/QC Manager</MenuItem>
                                </CssTextField>
                                {
                                    errors.category?.type === 'required' && (
                                        <p className='mt-3 text-danger'>Tutor is required</p>
                                    )
                                }
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    // label="Date"
                                    variant="outlined"
                                    type="date"
                                    autocomplete="off"
                                    size="small"
                                    style={{ width: '100%' }}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("asd", { required: true, })}
                                />
                                {
                                    errors.category?.type === 'required' && (
                                        <p className='mt-3 text-danger'>Date is required</p>
                                    )
                                }
                            </Grid>
                            <Grid item lg={2} md={2} sm={2} xs={2}></Grid>
                            <Grid item lg={1} md={1} sm={1} xs={1}>
                                <Button
                                    variant='contained'
                                    className='bg-dark text-light'
                                    size='small'
                                    onClick={() => 
                                        history.push('/hr/print_training_attendance')
                                    }
                                    style={{ marginTop: 2 }}>
                                    Print
                                </Button>
                            </Grid>
                        </Grid>
                        {/* {
                                !designations || !designations.length ? <p>Data Not Found</p> :
                                    designations.map(designation => (
                                        <MenuItem value={designation._id} key={designation._id}>{designation.name}</MenuItem>
                                    ))
                            } */}
                        {/* <div>
                            <Button
                                variant="outlined"
                                color="primary"
                                type="submit"
                                className={classes.addButton}
                                onClick={() => {
                                    // history.push('/hr/print_training_need_identification')
                                }}
                            >
                                Add Plan
                            </Button>
                        </div> */}
                    </form>
                </Container>

                <div className={classes.dataTable}>
                    <TableContainer className={classes.tableContainer}>
                        <Table
                            stickyHeader
                            className='table table-dark'
                            style={{ backgroundColor: '#d0cfcf', border: '1px solid grey' }}>
                            <TableHead>
                                <TableRow hover role='checkbox'>
                                    <StyledTableCell align='center'>Sr.No</StyledTableCell>
                                    <StyledTableCell align='center'>Name</StyledTableCell>
                                    <StyledTableCell align='center'>Designation</StyledTableCell>
                                    <StyledTableCell align='center'>Department</StyledTableCell>
                                    <StyledTableCell align='center'>Action</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/* {
                                    loading ? (
                                        <Loading />
                                    ) : error ? (
                                        <MaterialError />
                                    ) : trainings.length ? (
                                        trainings.map((training, i) => ( */}
                                <StyledTableRow>
                                    <StyledTableCell className='text-dark bg-light' align='center'>
                                        {1}
                                    </StyledTableCell>
                                    <StyledTableCell className='text-dark bg-light' align='center'>
                                        {/* {training.name} */}name
                                    </StyledTableCell>
                                    <StyledTableCell className='text-dark bg-light' align='center'>
                                        {/* {training.name} */}designation
                                    </StyledTableCell>
                                    <StyledTableCell className='text-dark bg-light' align='center'>
                                        {/* {training.name} */}department
                                    </StyledTableCell>
                                    <StyledTableCell className='text-light bg-light' align='center'>
                                        <>
                                            <Button
                                                variant='contained'
                                                className='bg-success text-light'
                                                size='small'
                                                // onClick={() => handleOpen()}
                                                style={{ marginTop: 2 }}>
                                                Present
                                            </Button>
                                            <Button
                                                variant='contained'
                                                size='small'
                                                className="bg-danger text-light"
                                                // onClick={() => deleteCategory(training._id)}
                                                style={{ marginLeft: 2, marginTop: 2 }}>
                                                Absent
                                            </Button>
                                        </>
                                    </StyledTableCell>
                                </StyledTableRow>
                                {/* //         ))
                                //     ) : (
                                //         <h5>Not Found</h5>
                                //     )
                            // } */}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </Sidenav>
    )
}

export default TrainingAttendance
