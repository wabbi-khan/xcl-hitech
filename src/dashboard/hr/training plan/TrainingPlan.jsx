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
import EditTrainingPlan from './EditTrainingPlan';

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
        marginTop: 20,
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
        marginTop: 40,

    },
    inputFieldStyle: {
        [theme.breakpoints.up('md')]: {
            width: 330,
        },
        [theme.breakpoints.down('sm')]: {
            width: 200,
        },
    },
    inputFieldStyle1: {
        [theme.breakpoints.up('md')]: {
            width: 330,
            marginLeft: 10,

        },
        [theme.breakpoints.down('sm')]: {
            width: 200,
            marginTop: 10,
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

const TrainingPlan = () => {
    const classes = useStyles();

    const { register, handleSubmit, formState: { errors } } = useForm()

    const dispatch = useDispatch()

    const openEvalPage = () => {
        const url = '/dashboard';
        window.open(url, '_blank');
    }

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

    const deleteCategory = async (params) => {
		// dispatch(deleteTraining(params));
	};
	// const [training, setTraining] = useState({});

	const [open, setOpen] = useState(false);

	const handleClose = (props) => {
		setOpen(props);
	};

	const handleOpen = async (training) => {
		// setTraining(training);
		setOpen(true);
	};

    return (
        <Sidenav title={'Training Plan'}>
            <div>
                <Container className={classes.mainContainer}>
                    <form action="" onSubmit={handleSubmit(onSubmitDate)}>
                        {/* Material category selector */}
                        <Grid container spacing={1}>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Select Topic"
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    select
                                    autocomplete="off"
                                    style={{ width: '80%' }}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("asd", { required: true })}
                                >
                                    <MenuItem value="0">Training on Purchase</MenuItem>
                                </CssTextField>
                                {
                                    errors.category?.type === 'required' && (
                                        <p className='mt-3 text-danger'>Training Topic is required</p>
                                    )
                                }
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Training Needs Identified By"
                                    variant="outlined"
                                    type="text"
                                    autocomplete="off"
                                    size="small"
                                    select
                                    style={{ width: '80%' }}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("asd", { required: true, })}
                                >
                                    <MenuItem>Production</MenuItem>
                                </CssTextField>
                                {
                                    errors.category?.type === 'required' && (
                                        <p className='mt-3 text-danger'>Training Need Identified is required</p>
                                    )
                                }
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Participants"
                                    variant="outlined"
                                    type="text"
                                    autocomplete="off"
                                    size="small"
                                    select
                                    style={{ width: '80%' }}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("asd", { required: true, })}
                                >
                                    <MenuItem>All HOD's</MenuItem>
                                </CssTextField>
                                {
                                    errors.category?.type === 'required' && (
                                        <p className='mt-3 text-danger'>Participants is required</p>
                                    )
                                }
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Trainer"
                                    variant="outlined"
                                    type="text"
                                    autocomplete="off"
                                    size="small"
                                    select
                                    style={{ width: '80%' }}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("asd", { required: true, })}
                                >
                                    <MenuItem>Plant Manager</MenuItem>
                                </CssTextField>
                                {
                                    errors.category?.type === 'required' && (
                                        <p className='mt-3 text-danger'>Trainer is required</p>
                                    )
                                }
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} className="mt-4">
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    // label="Expected Date/Month"
                                    variant="outlined"
                                    type="date"
                                    size="small"
                                    autocomplete="off"
                                    style={{ width: '80%' }}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("asd", { required: true })}
                                />
                                {
                                    errors.category?.type === 'required' && (
                                        <p className='mt-3 text-danger'>Training Topic is required</p>
                                    )
                                }
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Training Venue"
                                    variant="outlined"
                                    type="text"
                                    autocomplete="off"
                                    size="small"
                                    select
                                    style={{ width: '80%' }}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("asd", { required: true, })}
                                >
                                    <MenuItem>HiTech Factory</MenuItem>
                                </CssTextField>
                                {
                                    errors.category?.type === 'required' && (
                                        <p className='mt-3 text-danger'>Training Venue is required</p>
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
                        <div>
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
                        </div>
                    </form>
                </Container>
				<EditTrainingPlan show={open} handler={handleClose}  />

                <div className={classes.dataTable}>
                    <TableContainer className={classes.tableContainer}>
                        <Table
                            stickyHeader
                            className='table table-dark'
                            style={{ backgroundColor: '#d0cfcf', border: '1px solid grey' }}>
                            <TableHead>
                                <TableRow hover role='checkbox'>
                                    <StyledTableCell align='center'>Sr.No</StyledTableCell>
                                    <StyledTableCell align='center'>Topic</StyledTableCell>
                                    <StyledTableCell align='center'>Training Need Identified By</StyledTableCell>
                                    <StyledTableCell align='center'>Participants</StyledTableCell>
                                    <StyledTableCell align='center'>Trainer</StyledTableCell>
                                    <StyledTableCell align='center'>Expected Date/Month</StyledTableCell>
                                    <StyledTableCell align='center'>Training Venue</StyledTableCell>
                                    <StyledTableCell align='center'>Training Status</StyledTableCell>
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
                                        {/* {training.name} */}topic
                                    </StyledTableCell>
                                    <StyledTableCell className='text-dark bg-light' align='center'>
                                        {/* {training.name} */}training identified by
                                    </StyledTableCell>
                                    <StyledTableCell className='text-dark bg-light' align='center'>
                                        {/* {training.name} */}participants`
                                    </StyledTableCell>
                                    <StyledTableCell className='text-dark bg-light' align='center'>
                                        {/* {training.name} */}trainer
                                    </StyledTableCell>
                                    <StyledTableCell className='text-dark bg-light' align='center'>
                                        {/* {training.name} */}expect date/month
                                    </StyledTableCell>
                                    <StyledTableCell className='text-dark bg-light' align='center'>
                                        {/* {training.name} */}training venue
                                    </StyledTableCell>
                                    <StyledTableCell className='text-dark bg-light' align='center'>
                                        {/* {training.name} */}training status
                                    </StyledTableCell>
                                    <StyledTableCell className='text-light bg-light' align='center'>
                                        <>
                                            <Button
                                                variant='contained'
                                                className='bg-dark text-light'
                                                size='small'
                                                onClick={() => handleOpen()}
                                                style={{ marginTop: 2 }}>
                                                Edit
                                            </Button>
                                            <Button
                                                variant='contained'
                                                color='secondary'
                                                size='small'
                                                // onClick={() => deleteCategory(training._id)}
                                                style={{ marginLeft: 2, marginTop: 2 }}>
                                                Delete
                                            </Button>
                                            <Button
                                                variant='contained'
                                                color='secondary'
                                                size='small'
                                                className="bg-primary"
                                                // onClick={() => handleOpen(training)}
                                                style={{ marginLeft: 3, marginTop: 2 }}>
                                                Start
                                            </Button>
                                            <Button
                                                variant='contained'
                                                className='text-light'
                                                size='small'
                                                onClick={() => openEvalPage()}
                                                style={{ marginLeft: 2, marginTop: 2, backgroundColor: 'rgb(34, 161, 154)' }}>
                                                Evaluate
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

export default TrainingPlan
