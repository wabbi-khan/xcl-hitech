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
        marginTop: 1,
        marginLeft: 5,
        padding: 6,
        backgroundColor: '#22A19A',
        color: 'whitesmoke',
        '&:hover': {
            border: 'none',
            color: '#22A19A',
        },
    },
    addMoreBtn: {
        marginTop: 15,
        backgroundColor: '#22A19A',
        color: 'whitesmoke',
        '&:hover': {
            border: 1,
            color: '#22A19A',
            fontWeight: 'bold',
            backgroundColor: 'whitesmoke'
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
        [theme.breakpoints.up('md')]: {
            width: 330,
            marginLeft: 5,
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

const ExecPreReq = () => {
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

    const onSubmitDate = async (props) => {

    };

    return (
        <Sidenav title={'Executive Employee Pre-Requisitions'}>
            <div>
            <Container className={classes.mainContainer}>
                    <form action='' onSubmit={handleSubmit(onSubmitDate)}>
                        <Container className={classes.mainContainer1}>
                            <Grid container spacing={1}>
                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <CssTextField
                                        id='outlined-basic'
                                        label='Heading'
                                        variant='outlined'
                                        type='text'
                                        size='small'
                                        // value={inputFields.educations}
                                        // onChange={(e) => onChangeHandler(e.target.value, 'educations')}
                                        autocomplete='off'
                                        inputProps={{ style: { fontSize: 14 } }}
                                        style={{ width: '30%' }}
                                        InputLabelProps={{ style: { fontSize: 14 } }}
                                    />
                                    {
                                        errors.name?.type === 'required' && (
                                            <p className='mt-1 text-danger'>Heading is required</p>
                                        )
                                    }
                                    <CssTextField
                                        id='outlined-basic'
                                        label='Points'
                                        variant='outlined'
                                        type='text'
                                        size='small'
                                        // value={inputFields.educations}
                                        // onChange={(e) => onChangeHandler(e.target.value, 'educations')}
                                        className="ml-2"
                                        autocomplete='off'
                                        inputProps={{ style: { fontSize: 14 } }}
                                        style={{ width: '30%' }}
                                        InputLabelProps={{ style: { fontSize: 14 } }}
                                    />
                                    {
                                        errors.name?.type === 'required' && (
                                            <p className='mt-1 text-danger'>Atleast One Point is required</p>
                                        )
                                    }
                                    <Button
                                        variant='contained'
                                        size='small'
                                        className={classes.addMoreParaBtn}
                                    // onClick={() => getValue('educations')}
                                    >
                                        Add
                                    </Button>
                                </Grid>
                            </Grid>
                            <Button
                                variant='contained'
                                className={classes.addMoreBtn}
                            // onClick={() => getValue('educations')}
                            >
                                Add Another
                            </Button>
                        </Container>
                        {/* {
                            AddMatError ? <p className='mt-3 text-danger'> {AddMatErrMsg} </p> : null
                        } */}
                        <div>
                            <Button
                                variant='outlined'
                                color='primary'
                                type='submit'
                                className={classes.addButton}>
                                Submit
                            </Button>
                        </div>
                    </form>
                </Container>
            </div>
        </Sidenav>
    )
}

export default ExecPreReq
