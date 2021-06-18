import React, { useState } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { useForm } from 'react-hook-form';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    mainContainer: {
        marginTop: 20,
        marginLeft: 0
    },
    addMoreRes: {
        marginTop: 2,
        padding: 6,
        marginLeft: 20,
        backgroundColor: '#22A19A',
        color: 'whitesmoke',
        fontWeight: 'bold',
        '&:hover': {
            color: '#22A19A',
            backgroundColor: 'whitesmoke',
            borderColor: '#22A19A',
        },
        // [theme.breakpoints.up('md')]: {
        //     width: '10%',
        // },
        // [theme.breakpoints.down('sm')]: {
        //     // width: '12%',
        // },
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
            // marginLeft: 10,

        },
        [theme.breakpoints.down('sm')]: {
            width: 200,
            marginTop: 10,
        },
    },
    resStyle: {
        marginBottom: -10,
        fontSize: 16

    },
    deleteResBtn: {
        border: 'none',
    },
    delete: {
        fontSize: 22,
        color: 'red',
        marginTop: -3,
        marginLeft: 10
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

const Authorities = () => {
    const classes = useStyles();
    const [resString, setResString] = useState('')
    const [responsibilities, setResponsibilities] = useState([])

    const { register, handleSubmit, formState: { errors } } = useForm()

    const getValue = (e) => {
        setResponsibilities([...responsibilities, resString])
        setResString('')
    }

    const removeRes = (index) => {
        const temp = [...responsibilities];
        temp.splice(index, 1)
        setResponsibilities(temp)
    }

    return (
        <div>
            <div style={{ marginTop: 30, marginBottom: 30, }}>
                <hr />
            </div>
            <Container className={classes.mainContainer}>
                <h4 className="text-left">Authorities</h4>
                <CssTextField id="outlined-basic"
                    label="Authorities"
                    variant="outlined"
                    type="text"
                    autocomplete="off"
                    size="small"
                    value={resString}
                    onChange={(e) => {
                        setResString(e.target.value)
                    }}
                    className={classes.inputFieldStyle}
                    inputProps={{ style: { fontSize: 14 } }}
                    InputLabelProps={{ style: { fontSize: 14 } }}
                />
                {
                    errors.name?.type === 'required' && <p className="mt-1 text-danger">Responsibilities is required</p>
                }
                <Button
                    variant="contained" size="small"
                    className={classes.addMoreRes}
                    onClick={getValue}
                >
                    Add
                </Button>
                {
                    responsibilities.map((res, i) => (
                        <p className={classes.resStyle}>
                            <span style={{ fontSize: 30 }}>.</span>
                            {res}
                            <DeleteOutlineIcon
                                type="button"
                                className={classes.delete}
                                onClick={() => removeRes(i)}
                            />
                            {/* <Button
                                variant="outlined" size="small"
                                className={classes.deleteResBtn}
                            >
                            </Button> */}
                        </p>
                    )
                    )
                }
                {/* {
                                !designations || !designations.length ? <p>Data Not Found</p> :
                                    designations.map(designation => (
                                        <MenuItem value={designation._id} key={designation._id}>{designation.name}</MenuItem>
                                    ))
                            } */}
            </Container>
        </div>
    )
}

export default Authorities
