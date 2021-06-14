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

const EditMaterial = (props) => {
    const { show, handler, categories, material } = props
    // const { _id, name, category } = material

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
            await axios.patch(`${process.env.REACT_APP_API_URL}/material/${material._id}`, data)
            setIsUpdate(true)
        }
        catch (error) {
            setIsError(true)
        }
    }

    const handleClose = () => {
        handler(false)
        window.location.reload()
    }

    return (
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
                            material ? (
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <Grid container spacing={1}>
                                        <Grid lg={12} md={12} sm={12}>
                                            <CssTextField id="outlined-basic"
                                                label="Select Category"
                                                variant="outlined"
                                                type="text"
                                                autocomplete="off"
                                                size="small"
                                                select
                                                value={material.category._id}
                                                className={classes.inputFieldStyle}
                                                inputProps={{ style: { fontSize: 14 } }}
                                                InputLabelProps={{ style: { fontSize: 14 } }}
                                                // defaultValue={material.category._id}
                                                {...register("category", { required: true })}
                                            >
                                                {
                                                    !categories || !categories.length ? <p>Data Not Found</p> :
                                                        categories.map(category => (
                                                            <MenuItem value={category._id} key={category._id}>{category.name}</MenuItem>
                                                        ))
                                                }
                                            </CssTextField>
                                            {
                                                errors.category?.type === 'required' && <p className="mt-3 text-danger">Category must be required</p>
                                            }
                                        </Grid>
                                        <Grid lg={12} md={12} sm={12}>
                                            <CssTextField id="outlined-basic"
                                                label="Enter Material Name"
                                                variant="outlined"
                                                type="text"
                                                autocomplete="off"
                                                size="small"
                                                autoComplete="off"
                                                defaultValue={material.name}
                                                className={classes.inputFieldStyle1}
                                                inputProps={{ style: { fontSize: 14 } }}
                                                InputLabelProps={{ style: { fontSize: 14 } }}
                                                {...register("name", { required: true, maxLength: 30 })}
                                            />
                                           
                                            <br />
                                            {
                                                errors.name?.type === 'required' && <p className="text-danger">Material name is required</p>
                                            }
                                            <br />
                                            {
                                                errors.name?.type === 'maxLength' && <p className="text-danger">Length must be less than 30</p>
                                            }
                                            <CssTextField id="outlined-basic"
                                                label="Enter Unit"
                                                variant="outlined"
                                                type="text"
                                                autocomplete="off"
                                                size="small"
                                                autoComplete="off"
                                                defaultValue={material.unit}
                                                className={classes.inputFieldStyle1}
                                                inputProps={{ style: { fontSize: 14 } }}
                                                InputLabelProps={{ style: { fontSize: 14 } }}
                                                {...register("unit", { required: true, maxLength: 30 })}
                                            />
                                           
                                            <br />
                                            {
                                                errors.unit?.type === 'required' && <p className="text-danger">Unit is required</p>
                                            }
                                            <br />
                                            {
                                                errors.unit?.type === 'maxLength' && <p className="text-danger">Length must be less than 15</p>
                                            }
                                            {
                                                isUpdate ? <p className="text-success">Material Edit Success</p> : (
                                                    isError ? <p className="text-danger">Material Edit Fail Internal Server Error</p> : null
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
    )
}

export default EditMaterial
