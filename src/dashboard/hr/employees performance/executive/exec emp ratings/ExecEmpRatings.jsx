import React, { useEffect } from 'react'
import Sidenav from '../../../../SideNav/Sidenav'
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { useForm } from 'react-hook-form';

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
    mainContainer1: {
        textAlign: 'left',
        marginTop: 20,
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
            // width: '12%',
        },
    },
    addMoreParaBtn: {
        marginTop: 10,
        padding: 7,
        backgroundColor: '#22A19A',
        color: 'whitesmoke',
        '&:hover': {
            border: 'none',
            color: '#22A19A',
        },
    },
    addMoreBtn: {
        marginTop: 15,
        padding: 8,
        marginLeft: -90,
        backgroundColor: '#22A19A',
        color: 'whitesmoke',
        '&:hover': {
            border: 1,
            color: '#22A19A',
            fontWeight: 'bold',
            backgroundColor: 'whitesmoke'
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

const ExecEmpRatings = () => {
    const classes = useStyles();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const dispatch = useDispatch();

    useEffect(async () => {
        // await dispatch(getMaterialAction());
    }, [dispatch]);

    const { loading, materials, error } = useSelector((state) => state.materials);

    const onSubmitData = async (props) => {

    };

    return (
        <Sidenav title={'Executive Employee Ratings'}>
            <div>
                <Container className={classes.mainContainer}>
                    <form onSubmit={handleSubmit(onSubmitData)}>
                        <Grid container spacing={1} style={{ marginTop: 20 }}>
                            {/* <Grid item lg={1} md={1}>
                                            <h5 className={classes.itemHeading}>{no}</h5>
                                        </Grid> */}
                            <Grid item lg={2} md={2} sm={12} xs={12}>
                                <CssTextField
                                    id='outlined-basic'
                                    label='Rating Name'
                                    variant='outlined'
                                    type='text'
                                    autocomplete='off'
                                    size='small'
                                    style={{ width: '125%' }}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register('', { required: true })}
                                />
                                {
                                    errors.category?.type === 'required' && (
                                        <p className='mt-3 text-danger'>Rating Name is required</p>
                                    )
                                }
                            </Grid>
                            <Grid item lg={2} md={2} sm={12} xs={12}>
                                <CssTextField
                                    id='outlined-basic'
                                    label='Description'
                                    variant='outlined'
                                    type='text'
                                    autocomplete='off'
                                    size='small'
                                    style={{ width: '125%', marginLeft: 50 }}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register('', { required: true })}
                                />
                                {
                                    errors.category?.type === 'required' && (
                                        <p className='mt-3 text-danger'>Description is required</p>
                                    )
                                }
                            </Grid>
                            <Grid item lg={2} md={2} sm={12} xs={12}>
                                <CssTextField
                                    id='outlined-basic'
                                    label='Calculated Value'
                                    variant='outlined'
                                    type='number'
                                    autocomplete='off'
                                    size='small'
                                    style={{ width: '125%', marginLeft: 100 }}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register('', { required: true })}
                                />
                                {
                                    errors.category?.type === 'required' && (
                                        <p className='mt-3 text-danger'>Calculate Value required</p>
                                    )
                                }
                            </Grid>
                            <Grid item lg={2} md={2} sm={12} xs={12}>
                                <CssTextField
                                    id='outlined-basic'
                                    label='Min Value'
                                    variant='outlined'
                                    type='number'
                                    autocomplete='off'
                                    size='small'
                                    style={{ width: '125%', marginLeft: 150 }}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register('', { required: true })}
                                />
                                {
                                    errors.category?.type === 'required' && (
                                        <p className='mt-3 text-danger'>Min Value required</p>
                                    )
                                }
                            </Grid>
                            <Grid item lg={2} md={2} sm={12} xs={12}>
                                <CssTextField
                                    id='outlined-basic'
                                    label='Max Value'
                                    variant='outlined'
                                    type='number'
                                    autocomplete='off'
                                    size='small'
                                    style={{ width: '125%', marginLeft: 200 }}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register('', { required: true })}
                                />
                                {
                                    errors.category?.type === 'required' && (
                                        <p className='mt-3 text-danger'>Max Value required</p>
                                    )
                                }
                            </Grid>
                        </Grid>
                        <Grid container spacing={1}>
                            <Grid item lg={2} md={2} sm={12} xs={12}>
                                <Button
                                    variant='contained'
                                    size='small'
                                    className={classes.addMoreBtn}
                                // onClick={() => getValue('educations')}
                                >
                                    Add More
                                </Button>
                            </Grid>
                        </Grid>
                        {/* {AddOrderError ? (
                                <p className='mt-3 text-danger'>
                                {' '}
                                Something Went Wrong. Internal Server Error{' '}
                                </p>
                                ) : null}
                                {AddOrderSuccess ? (
                                    <p className='mt-3 text-success'> Purchase Order Added Successfully</p>
                                ) : null} */}
                        <div>
                            <Button
                                variant="outlined"
                                color="primary"
                                type="submit"
                                className={classes.addButton}
                                onClick={() => {
                                    // history.push('')
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

export default ExecEmpRatings
