import React, { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux'

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        height: 'auto',
        width: 500,
    },
    mainContainer: {
        textAlign: 'center',
        marginTop: 20,
    },
    addButton: {
        marginTop: 20,
        marginRight: 10,
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
    closeButton: {
        marginTop: 20,
        marginRight: 10,
        color: '#e74c3c',
        borderColor: '#e74c3c',
        fontWeight: 'bold',
        '&:hover': {
            border: 'none',
            backgroundColor: '#e74c3c',
            color: 'whitesmoke',
        },
        [theme.breakpoints.up('md')]: {
            width: '15%',
        },
        [theme.breakpoints.down('sm')]: {
            // width: '12%',
        },
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
        marginTop: 10,
        [theme.breakpoints.up('md')]: {
            width: 330,
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

const EditTrainingPlan = (props) => {
    const { show, handler, training } = props;
    const dispatch = useDispatch();

    const classes = useStyles();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [open, setOpen] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        setOpen(show);
    }, [show]);

    const onSubmit = async (data) => {
        // try {
        // 	dispatch(updateTraining(training._id, data));
        // 	setIsUpdate(true);
        // } 
        // catch (error) {
        // 	setIsError(true);
        // }
    };

    const handleClose = () => {
        handler(false);
    };

    return (
        <div>
            <Modal
                aria-labelledby='transition-modal-title'
                aria-describedby='transition-modal-description'
                className={classes.modal}
                open={open}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}>
                <Fade in={open}>
                    <div className={classes.paper}>
                        <h5 className='text-center mt-4'>Edit/Update</h5>
                        <Container className={classes.mainContainer}>
                            {/* Form */}
                            {/* {
                                training ? ( */}
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Grid container spacing={1}>
                                    <Grid lg={12} md={12} sm={12} className="mt-3">
                                        <CssTextField
                                            id='outlined-basic'
                                            label='Training Topic'
                                            variant='outlined'
                                            type='text'
                                            size='small'
                                            select
                                            autoComplete='off'
                                            // defaultValue={training.name}
                                            style={{ width: '80%' }}
                                            inputProps={{ style: { fontSize: 14 } }}
                                            InputLabelProps={{ style: { fontSize: 14 } }}
                                            {...register('name')}
                                        >
                                            <MenuItem value="0">topic 1</MenuItem>
                                            <MenuItem value="0">topic 2</MenuItem>
                                        </CssTextField>
                                        {
                                            errors.name?.type === 'required' && (
                                                <p className='text-danger mt-1'>Training Topic is required</p>
                                            )
                                        }
                                    </Grid>
                                    <Grid lg={12} md={12} sm={12} className="mt-3">
                                        <CssTextField
                                            id='outlined-basic'
                                            label='Training Needs Identified By'
                                            variant='outlined'
                                            type='text'
                                            size='small'
                                            select
                                            autoComplete='off'
                                            // defaultValue={training.name}
                                            style={{ width: '80%' }}
                                            inputProps={{ style: { fontSize: 14 } }}
                                            InputLabelProps={{ style: { fontSize: 14 } }}
                                            {...register('name')}
                                        >
                                            <MenuItem value="0">QA Manager</MenuItem>
                                        </CssTextField>
                                        {
                                            errors.name?.type === 'required' && (
                                                <p className='text-danger mt-1'>Training Needs Identified is required</p>
                                            )
                                        }
                                    </Grid>
                                    <Grid lg={12} md={12} sm={12} className="mt-3">
                                        <CssTextField
                                            id='outlined-basic'
                                            label='Participants'
                                            variant='outlined'
                                            type='text'
                                            size='small'
                                            select
                                            autoComplete='off'
                                            // defaultValue={training.name}
                                            style={{ width: '80%' }}
                                            inputProps={{ style: { fontSize: 14 } }}
                                            InputLabelProps={{ style: { fontSize: 14 } }}
                                            {...register('name')}
                                        >
                                            <MenuItem value="0">All HOD'S</MenuItem>
                                        </CssTextField>
                                        {
                                            errors.name?.type === 'required' && (
                                                <p className='text-danger mt-1'>Participants is required</p>
                                            )
                                        }
                                    </Grid>
                                    <Grid lg={12} md={12} sm={12} className="mt-3">
                                        <CssTextField
                                            id='outlined-basic'
                                            label='Trainer'
                                            variant='outlined'
                                            type='text'
                                            size='small'
                                            select
                                            autoComplete='off'
                                            // defaultValue={training.name}
                                            style={{ width: '80%' }}
                                            inputProps={{ style: { fontSize: 14 } }}
                                            InputLabelProps={{ style: { fontSize: 14 } }}
                                            {...register('name')}
                                        >
                                            <MenuItem value="0">Plant Manager</MenuItem>
                                        </CssTextField>
                                        {
                                            errors.name?.type === 'required' && (
                                                <p className='text-danger mt-1'>Trainer is required</p>
                                            )
                                        }
                                    </Grid>
                                    <Grid lg={12} md={12} sm={12} className="mt-3">
                                        <CssTextField
                                            id='outlined-basic'
                                            // label='Expected Date/Month'
                                            variant='outlined'
                                            type='date'
                                            size='small'
                                            autoComplete='off'
                                            // defaultValue={training.name}
                                            style={{ width: '80%' }}
                                            inputProps={{ style: { fontSize: 14 } }}
                                            InputLabelProps={{ style: { fontSize: 14 } }}
                                            {...register('name')}
                                        />
                                        {
                                            errors.name?.type === 'required' && (
                                                <p className='text-danger mt-1'>Expected Date/Month is required</p>
                                            )
                                        }
                                    </Grid>
                                    <Grid lg={12} md={12} sm={12} className="mt-3">
                                        <CssTextField
                                            id='outlined-basic'
                                            label='Training Venue'
                                            variant='outlined'
                                            type='text'
                                            size='small'
                                            select
                                            autoComplete='off'
                                            // defaultValue={training.name}
                                            style={{ width: '80%' }}
                                            inputProps={{ style: { fontSize: 14 } }}
                                            InputLabelProps={{ style: { fontSize: 14 } }}
                                            {...register('name')}
                                        >
                                            <MenuItem value="0">HiTech Kotri</MenuItem>
                                        </CssTextField>
                                        {
                                            errors.name?.type === 'required' && (
                                                <p className='text-danger mt-1'>Training Venue is required</p>
                                            )
                                        }
                                        {
                                            isUpdate ? (
                                                <p className='text-success mt-2'>Training Plan Update Successfully</p>
                                            ) : isError ? (
                                                <p className='text-danger mt-2'>Training Plan Update Failed </p>
                                            ) : null
                                        }
                                    </Grid>
                                </Grid>
                                <div>
                                    <Button
                                        variant='outlined'
                                        color='primary'
                                        className={classes.addButton}
                                        type='submit'>
                                        Update
                                    </Button>
                                    <Button
                                        variant='outlined'
                                        color='primary'
                                        className={classes.closeButton}
                                        onClick={handleClose}>
                                        close
                                    </Button>
                                </div>
                            </form>
                            {/* ) : null
                            } */}
                        </Container>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default EditTrainingPlan
