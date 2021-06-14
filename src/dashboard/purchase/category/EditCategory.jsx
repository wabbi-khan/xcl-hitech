import React, { useState, useEffect } from 'react'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { updateMatCategoryAction } from '../../../services/action/MatCategoryAction';
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


const EditCategory = (props) => {
    const dispatch = useDispatch()
    const { show, handler, category } = props

    const classes = useStyles();
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [inputFields, setInputFields] = useState({ name: '' })

    const [open, setOpen] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        setOpen(show)
        setIsUpdate(false)
    }, [show])

    useEffect(() => {
        if (category)
            setInputFields({ name: category.name })
    }, [category])

    const onChangeHandler = (value, placeholder) => {
        setInputFields({ ...inputFields, [placeholder]: value })
    }


    const onSubmit = async () => {
        dispatch(updateMatCategoryAction(category._id, inputFields))
        try {
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
                            category ? (
                                <form onSubmit={handleSubmit(onSubmit)} >
                                    <Grid container spacing={1}>
                                        {/* <Grid lg={12} md={12} sm={12}>
                                            <CssTextField id="outlined-basic"
                                                label="Select Category"
                                                variant="outlined"
                                                type="text"
                                                autocomplete="off"
                                                size="small"
                                                select
                                                className={classes.inputFieldStyle}
                                                inputProps={{ style: { fontSize: 14 } }}
                                                InputLabelProps={{ style: { fontSize: 14 } }}
                                                defaultValue={category._id}
                                                {...register("category", { required: true })}
                                            >
                                                {
                                                    !category || !category.length ? <p>Data Not Found</p> :
                                                    categories.map(category => (
                                                            <MenuItem value={category._id} key={category._id}>{category.name}</MenuItem>
                                                        ))
                                                }
                                            </CssTextField>
                                        </Grid> */}
                                        <Grid lg={12} md={12} sm={12}>
                                            <CssTextField id="outlined-basic"
                                                label="Enter Category Name"
                                                variant="outlined"
                                                type="text"
                                                autocomplete="off"
                                                size="small"
                                                value={inputFields.name}
                                                autoComplete="off"
                                                className={classes.inputFieldStyle1}
                                                inputProps={{ style: { fontSize: 14 } }}
                                                InputLabelProps={{ style: { fontSize: 14 } }}
                                                onChange={(e) => onChangeHandler(e.target.value, 'name')}
                                            // {...register("name", { required: true, maxLength: 30 })}
                                            />
                                            {
                                                errors.name?.type === 'required' && <p className="text-danger">Category name is required</p>
                                            }
                                            {/* <br />
                                            {
                                                errors.name?.type === 'maxLength' && <p className="text-danger">Length must be less than 30</p>
                                            } */}
                                            {
                                                isUpdate ? <p className="text-success">Category Edit Success</p> : (
                                                    isError ? <p className="text-danger">Category Edit Failed! Internal Server Error</p> : null
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

export default EditCategory
