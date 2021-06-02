import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { getSpecCatMatAction } from '../../../services/action/MaterialDataHandle';



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
        width: '80%'
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

const EditMachine = (props) => {

    const classes = useStyles();
    const dispatch = useDispatch()

    const { show, close, machine, onSubmit } = props

    const [open, setOpen] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm()
    const [inputFields, setInputFields] = useState(machine)


    useEffect(() => {
        setOpen(show)
    }, [show])
    useEffect(() => {
      setInputFields(machine)
  }, [machine])
    const onChangeHandler = (e, placeholder) => {
      console.log(placeholder)
      if (placeholder !== 'date')
      setInputFields({...inputFields, [placeholder]: e.target.value})
    }
    

    const onSubmitData = () => {
      onSubmit(inputFields)
    }

    const handleClose = () => {
      setOpen(false)
      close()
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
                        <h5 className="text-center mt-4">Edit Machine</h5>
                        <Container className={classes.mainContainer}>
                            {/* ========================================= */}
                            {
                                machine ? (
                                    <form onSubmit={handleSubmit(onSubmitData)}>
                                        <Grid container spacing={1}>
                                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                                <CssTextField id="outlined-basic"
                                                    label="Enter Machine Name"
                                                    variant="outlined"
                                                    type="text"
                                                    size="small"
                                                    autocomplete="off"
                                                    className={classes.inputFieldStyle}
                                                    inputProps={{ style: { fontSize: 14 } }}
                                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                                    style={{marginBottom: 10}}
                                                    value={inputFields.name}
                                                    onChange={(e)=> onChangeHandler(e, 'name')}
                                                />
                                            </Grid>

                                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                                <CssTextField id="outlined-basic"
                                                    label="Machine Code"
                                                    variant="outlined"
                                                    autocomplete="off"
                                                    size="small"
                                                    className={classes.inputFieldStyle}
                                                    inputProps={{ style: { fontSize: 14 } }}
                                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                                    onChange={(e)=> onChangeHandler(e, 'code')}
                                                    value={inputFields.code}
                                                    style={{marginBottom: 10}}

                                                />
                                            </Grid>

                                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                                <CssTextField id="outlined-basic"
                                                    label="Phone No."
                                                    variant="outlined"
                                                    type="text"
                                                    autocomplete="off"
                                                    size="small"
                                                    className={classes.inputFieldStyle}
                                                    style={{marginBottom: 20}}

                                                    inputProps={{ style: { fontSize: 14 } }}
                                                    InputLabelProps={{ style: { fontSize: 14 } }}
                            onChange={(e)=> onChangeHandler(e, 'date')}
                            value={inputFields.date}
                                                />
                                            </Grid>
                                        </Grid>
                                        <div>
                                            <Button
                                                className="bg-warning text-light"
                                                type="submit"
                                                style={{marginRight: 10}}
                                            >
                                                Update
                                            </Button>
                                            <Button
                                                className="bg-danger text-light ml-1"
                                                onClick={handleClose}
                                            >
                                                Close
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

export default EditMachine
