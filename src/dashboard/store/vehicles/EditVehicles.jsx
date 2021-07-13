import React, { useState, useEffect } from 'react'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';


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
        width: 500
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
        textTransform: 'capitalize',
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
        textTransform: 'capitalize',
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

const EditVehicles = (props) => {
    const { show, handler, vehicle } = props

    const classes = useStyles();

    const { register, handleSubmit, formState: { errors } } = useForm()

    const [open, setOpen] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        setOpen(show)
    }, [show])


    const onSubmit = async (data) => {
        try {
            await axios.patch(`${process.env.REACT_APP_API_URL}/vehicle/${vehicle._id}`, data)
            setIsUpdate(true)
        }
        catch (error) {
            setIsError(true)
        }
    }

    const handleClose = () => {
        handler(false)
    }
    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <h5 className="text-center mt-4">Update</h5>
                        <Container className={classes.mainContainer}>
                            {/* Form */}
                            {
                                vehicle ? (
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <Grid container spacing={1}>
                                            <Grid lg={12} md={12} sm={12}>
                                                <CssTextField id="outlined-basic"
                                                    label="Vehicle No."
                                                    variant="outlined"
                                                    type="text"
                                                    size="small"
                                                    autoComplete="off"
                                                    defaultValue={vehicle.number}
                                                    className={classes.inputFieldStyle1}
                                                    inputProps={{ style: { fontSize: 14 } }}
                                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                                    {...register("number", { required: true, maxLength: 30 })}
                                                />
                                                {
                                                    errors.number?.type === 'required' && <p className="text-warning">Vehicle No. is required</p>
                                                }
                                                {/* <br />
                                                {
                                                    errors.number?.type === 'maxLength' && <p className="text-danger">Length must be less than 30</p>
                                                } */}
                                            </Grid>
                                            <Grid lg={12} md={12} sm={12}>
                                                <CssTextField id="outlined-basic"
                                                    label="Vehicle Type"
                                                    variant="outlined"
                                                    type="text"
                                                    size="small"
                                                    autoComplete="off"
                                                    select
                                                    defaultValue={vehicle.type}
                                                    className={classes.inputFieldStyle1}
                                                    inputProps={{ style: { fontSize: 14 } }}
                                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                                    {...register("type", { required: true, maxLength: 30 })}
                                                >
                                                    <MenuItem value="truck">truck</MenuItem>
                                                    <MenuItem value="heavy truck">heavy truck</MenuItem>
                                                </CssTextField>
                                                {
                                                    errors.type?.type === 'required' && <p className="text-warning">Vehicle Type is required</p>
                                                }
                                                {/* <br />
                                                    {
                                                        errors.type?.type === 'maxLength' && <p className="text-danger">Length must be less than 30</p>
                                                    } */}
                                            </Grid>
                                            <Grid lg={12} md={12} sm={12}>
                                                <CssTextField id="outlined-basic"
                                                    label="Driver Name"
                                                    variant="outlined"
                                                    type="text"
                                                    size="small"
                                                    autoComplete="off"
                                                    defaultValue={vehicle.driverName}
                                                    className={classes.inputFieldStyle1}
                                                    inputProps={{ style: { fontSize: 14 } }}
                                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                                    {...register("driverName", { required: true, maxLength: 20 })}
                                                />
                                                {
                                                    errors.driverName?.type === 'required' && <p className="text-warning">Driver Name is required</p>
                                                }
                                                {/* <br />
                                                    {
                                                        errors.driverName?.type === 'maxLength' && <p className="text-danger">Length must be less than 20</p>
                                                    } */}
                                            </Grid>
                                            <Grid lg={12} md={12} sm={12}>
                                                <CssTextField id="outlined-basic"
                                                    label="Phone No."
                                                    variant="outlined"
                                                    type="text"
                                                    size="small"
                                                    autoComplete="off"
                                                    defaultValue={vehicle.phoneNum}
                                                    className={classes.inputFieldStyle1}
                                                    inputProps={{ style: { fontSize: 14 } }}
                                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                                    {...register("phoneNum", { required: true, maxLength: 40 })}
                                                />
                                                {
                                                    errors.phoneNum?.type === 'required' && <p className="text-warning">Phone No. is required</p>
                                                }
                                                {/* <br />
                                                    {
                                                        errors.phoneNum?.type === 'maxLength' && <p className="text-danger">Length must be less than 40</p>
                                                    } */}

                                            </Grid>
                                            <Grid lg={12} md={12} sm={12}>
                                                <CssTextField id="outlined-basic"
                                                    label="CNIC No."
                                                    variant="outlined"
                                                    type="text"
                                                    size="small"
                                                    autoComplete="off"
                                                    defaultValue={vehicle.cnicNum}
                                                    className={classes.inputFieldStyle1}
                                                    inputProps={{ style: { fontSize: 14 } }}
                                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                                    {...register("cnicNum", { required: true, maxLength: 30 })}
                                                />
                                                {
                                                    errors.cnicNum?.type === 'required' && <p className="text-warning">CNIC No. is required</p>
                                                }
                                                {/* <br />
                                                    {
                                                        errors.cnicNo?.type === 'maxLength' && <p className="text-danger">Length must be less than 30</p>
                                                    } */}
                                                {
                                                    isUpdate ? <p className="text-success">Product Update Success</p> : (
                                                        isError ? <p className="text-danger">Product Update Failed </p> : null
                                                    )
                                                }
                                            </Grid>
                                        </Grid>
                                        <div>
                                            <Button variant="outlined" color="primary"
                                                className={classes.addButton}
                                                type="submit"
                                            >
                                                Update
                                            </Button>
                                            <Button variant="outlined" color="primary"
                                                className={classes.closeButton}
                                                onClick={handleClose}
                                            >
                                                close
                                            </Button>
                                        </div>
                                    </form>
                                ) : null
                            }
                        </Container>
                    </div>
                </Fade>
            </Modal>

        </div>
    )
}

export default EditVehicles
