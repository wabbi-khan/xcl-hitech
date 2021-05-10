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
        height: 300,
        width: 500
    },
    mainContainer: {
        textAlign: 'center',
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

const EditMaterial = (props) => {
    const { show, fetchMatCategory, materialId, materialName, materialCategory } = props
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm()

    useEffect(() => {
        setOpen(show)
    }, [show])


    const handleClose = () => {
        setOpen(false);
    };

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

    const onSubmit = async (data) => {

        try {
            await axios.patch(`${process.env.REACT_APP_API_URL}/material/${materialId}`, data)
            window.location.reload()
        }
        catch (error) {
            console.log(error);
            console.log('catch');
        }
    }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
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
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Grid container spacing={1}>
                                    <Grid lg={12} md={12} sm={12}>
                                        <CssTextField id="outlined-basic"
                                            label="Select Category"
                                            variant="outlined"
                                            type="text"
                                            autocomplete="off"
                                            size="small"
                                            defaultValue={materialCategory}
                                            select
                                            className={classes.inputFieldStyle}
                                            inputProps={{ style: { fontSize: 14 } }}
                                            InputLabelProps={{ style: { fontSize: 14 } }}
                                            {...register("category")}
                                        >
                                            {
                                                !fetchMatCategory.categories || !fetchMatCategory.categories.length ? <p>Data Not Found</p> :
                                                    fetchMatCategory.categories.map(category => (
                                                        <MenuItem value={category._id} key={category._id}>{category.name}</MenuItem>
                                                    ))
                                            }
                                        </CssTextField>
                                    </Grid>
                                    <Grid lg={12} md={12} sm={12}>
                                        <CssTextField id="outlined-basic"
                                            label="Enter Material Name"
                                            variant="outlined"
                                            type="text"
                                            autocomplete="off"
                                            size="small"
                                            autoComplete="off"
                                            defaultValue={materialName}
                                            className={classes.inputFieldStyle1}
                                            inputProps={{ style: { fontSize: 14 } }}
                                            InputLabelProps={{ style: { fontSize: 14 } }}
                                            {...register("name", { minLength: 1, maxLength: 30 })}
                                        />
                                        {
                                            errors.category?.type === 'required' && <p className="mt-3 text-danger">Category must be required</p>
                                        }
                                        <br />
                                        {
                                            errors.name?.type === 'required' && <p className="text-danger">Material name is required</p>
                                        }
                                        <br />
                                        {
                                            errors.name?.type === 'maxLength' && <p className="text-danger">Length must be less than 30</p>
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
                                </div>
                            </form>
                        </Container>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default EditMaterial
