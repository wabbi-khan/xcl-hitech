import React, { useState, useEffect } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import LoginImg from '../images/loginBack.jpg';
import Logo from '../images/logo.png';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router';
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
    loginBox: {
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingTop: 20,
        top: '18%',
        position: 'relative',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        [theme.breakpoints.up('md')]: {
            width: '35%',
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    input1: {
        marginTop: 40,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    input2: {
        marginTop: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    loginButtonBox: {
    },
    loginBtn: {
        backgroundColor: '#22A19A',
        margin: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        fontWeight: 'bold',
        color: 'whitesmoke',
        [theme.breakpoints.down('sm')]: {
            width: '50%',
        },
        '&:hover': {
            backgroundColor: '#22A19A',
            opacity: 0.9,
        }
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
            <div style={{ backgroundImage: `url(${LoginImg})`, backgroundAttachment: 'fixed', backgroundSize: 'cover', width: 'auto', height: '815px' }}>
                <div className={classes.loginBox}>
                    {/* <img src={Logo} alt="" width="70" height="70" style={{ marginTop: 40, }} /> */}
                    <h2 style={{ color: 'whitesmoke',}}>HI-TECH</h2>
                    <form className={classes.root} noValidate autoComplete="off">
                        <div className={classes.input1}>
                            <CssTextField
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
                            // onClick={
                                //     () => {
                                    //         history.push('/sidenav')
                            //     }
                            // }
                        >
                                <Link to="/sidenav" exact>
                            Login
                                
                                </Link>
                        </Button>
                        {/* <div className={classes.loginButtonBox}>
                    </div> */}
                    </form>
                </div>
            </div>
        // </Router>
    )
}

export default (Login)