import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import LoginBack from '../images/loginBack.jpg';
import Logo from '../images/logo.png';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

const Login = () => {
    const classes = useStyles();

    return (
        <div style={{ backgroundImage: `url(${LoginBack})`, backgroundAttachment: 'fixed', padding: 50}}>
            <div className="" style={{ backgroundColor: 'black', width: '50%', marginLeft: 'auto', marginRight: 'auto'}}>
                <img src={Logo} alt="" width="70" height="70" style={{ marginTop: 40, }} />
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="Enter Username" variant="outlined" style={{ marginTop: 50 }}/><br/>
                    <TextField id="outlined-basic" label="Enter Password" variant="outlined" />
                </form>
            </div>
        </div>
    )
}

export default Login
