import React, { useState, useeffect }from 'react'
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

const EditVendor = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    // const { show } = props
    console.log(props);

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
    return (
        <div>

            
        </div>
    )
}

export default EditVendor
