import React, { useEffect, useState } from 'react'
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

const TrainingRecord = ({ history }) => {
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
        <Sidenav title={'Training Record and Evaluation'}>
            <div>
                <Container className={classes.mainContainer}>
                    <form action="" onSubmit={handleSubmit(onSubmitDate)}>
                        {/* Material category selector */}
                        <Grid container spacing={1}>
                            <Grid item lg={8} md={8} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Select Training"
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
                                        <p className='mt-3 text-danger'>Training Name is required</p>
                                    )
                                }
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Date"
                                    variant="outlined"
                                    type="text"
                                    autocomplete="off"
                                    size="small"
                                    disabled
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
                                    <StyledTableCell align='center'>S.NO</StyledTableCell>
                                    <StyledTableCell align='center'>TRAINEE NAME</StyledTableCell>
                                    <StyledTableCell align='center'>DESIGNATION</StyledTableCell>
                                    <StyledTableCell align='center'>TRAINER</StyledTableCell>
                                    <StyledTableCell align='center'>Evaluation Method</StyledTableCell>
                                    <StyledTableCell align='center'>EVALUATED BY</StyledTableCell>
                                    <StyledTableCell align='center'>TRAINING EVALUATION RESULT</StyledTableCell>
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
                                        {/* {training.name} */}Arsalan
                                    </StyledTableCell>
                                    <StyledTableCell className='text-dark bg-light' align='center'>
                                        {/* {training.name} */}Engineer
                                    </StyledTableCell>
                                    <StyledTableCell className='text-dark bg-light' align='center'>
                                        {/* {training.name} */}MR
                                    </StyledTableCell>
                                    <StyledTableCell className='text-dark bg-light' align='center'>
                                        {/* {training.name} */}
                                        
                                    </StyledTableCell>
                                    <StyledTableCell className='text-dark bg-light' align='center'>
                                        {/* {training.name} */}MR
                                    </StyledTableCell>
                                    <StyledTableCell className='text-dark bg-light' align='center'>
                                        {/* {training.name} */}
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

export default TrainingRecord
