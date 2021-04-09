import React, { useState, useEffect } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import LoginImg from '../images/loginBack.jpg';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { BrowserRouter as Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    cssLabel: {
        color: 'whitesmoke'
    },
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    backImg: {
        width: 'auto',
        [theme.breakpoints.up('md')]: {
            height: 800,
        },
        [theme.breakpoints.down('sm')]: {
            height: 820,
        },
    },
    loginBox: {
        marginLeft: 'auto',
        marginRight: 'auto',
        top: '20%',
        position: 'relative',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        [theme.breakpoints.up('md')]: {
            width: '35%',
        },
        [theme.breakpoints.down('sm')]: {
            width: '90%',
        },
    },
    input1: {
        marginTop: 40,

    },
    input2: {
        marginTop: 20,
    },
    loginButtonBox: {
    },
    loginBtn: {
        backgroundColor: '#22A19A',
        margin: 20,
        fontWeight: 'bold',
        color: 'whitesmoke',
        
        '&:hover': {
            backgroundColor: '#22A19A',
            opacity: 0.9,
        }
    },
    inputField: {
        width: 350,
        [theme.breakpoints.down('sm')]: {
            width: '90%',
        },
    },

}));

const CssTextField = withStyles({
    root: {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'white',
            },
        },
    },

})(TextField);

const Login = (props) => {
    const classes = useStyles();
    const { history } = props;
    const [Username, setUsername] = useState()
    const [Password, setPassword] = useState()


    return (
        // <Router>
        <div style={{ backgroundImage: `url(${LoginImg} )`, backgroundAttachment: 'fixed', backgroundSize: 'cover' }} className={classes.backImg}>
            <div className={classes.loginBox}>
                <h3 style={{ color: 'whitesmoke', textAlign: 'center', paddingTop: 30, fontWeight: 'bold', }}>HI-TECH</h3>
                <div className="text-center mt-5">
                    <CssTextField
                        className={classes.inputField}
                        id="outlined-basic" label="Enter Username" variant="outlined"
                        autoComplete="off"
                        type="text"
                        InputLabelProps={{
                            style: { color: '#fff' },
                        }}
                        InputProps={{
                            classes: {
                                root: classes.cssLabel,
                            },
                        }}
                        onChange={(e) => {
                            setUsername(e.target.value)
                        }}
                    />
                </div>
                <div className="text-center mt-3">
                    <CssTextField
                        className={classes.inputField}
                        id="outlined-basic" label="Enter Password" variant="outlined"
                        autoComplete="off" type="password"
                        InputLabelProps={{
                            style: { color: '#fff' },
                        }}
                        InputProps={{
                            classes: {
                                root: classes.cssLabel,
                            },
                        }}
                    />
                </div>
                <div className="text-center mt-2">
                    <Button variant="outlined" className={classes.loginBtn}
                        onClick={
                            () => {
                                history.push('/dashboard')
                            }
                        }
                    >
                        Login
                    </Button>
                </div>
            </div>
            {/* <div className={classes.loginBox}>
                    <img src={Logo} alt="" width="70" height="70" style={{ marginTop: 40, }} />
                    <h2 style={{ color: 'whitesmoke', textAlign: 'center' }}>HI-TECH</h2>
                    <form className={classes.root} noValidate autoComplete="off">
                        <div className="ml-auto mr-auto">
                        <div className={classes.input1} >
                            <CssTextField
                                className={classes.inputField}
                                id="outlined-basic" label="Enter Username" variant="outlined"
                                autoComplete="off"
                                type="text"
                                InputLabelProps={{
                                    style: { color: '#fff' },
                                }}
                                InputProps={{
                                    classes: {
                                        root: classes.cssLabel,
                                    },
                                }}
                                onChange={(e) => {
                                    setUsername(e.target.value)
                                }}
                            />
                        </div>
                        <div className={classes.input2}>
                            <CssTextField
                                className={classes.inputField}
                                id="outlined-basic" label="Enter Password" variant="outlined"
                                autoComplete="off" type="password"
                                InputLabelProps={{
                                    style: { color: '#fff' },
                                }}
                                InputProps={{
                                    classes: {
                                        root: classes.cssLabel,
                                    },
                                }}
                            />
                        </div>
                        <Button variant="outlined" className={classes.loginBtn}
                            onClick={
                                    () => {
                                            history.push('/dashboard')
                                }
                            }
                        >
                            Login
                        </Button>
                        {/* <div className={classes.loginButtonBox}>
                    </div> */}
            {/* </div>
                    </form>
                </div> */}
        </div>
        // </Router>
    )
}

export default withRouter(Login)