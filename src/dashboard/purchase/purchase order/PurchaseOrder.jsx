import React from 'react'
import Sidenav from '../../SideNav/Sidenav'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    mainContainer: {
        textAlign: 'center',
        [theme.breakpoints.up('md')]: {
            marginLeft: 0,
            marginTop: 15,
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: -15,
        },
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
        }
    },
    table: {
        minWidth: 600,
    },
    dataTable: {
        marginTop: 40,

    },
    ckeckBox: {
        [theme.breakpoints.up('md')]: {
            marginLeft: 25,
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
        },
    },
    inputFieldStyle: {
        // boxShadow: '0.4px 0.4px 0.4px 0.4px grey',
        // borderRadius: 5,
        [theme.breakpoints.up('md')]: {
            width: 400,

        },
        [theme.breakpoints.down('sm')]: {
            width: 200,

        },
    },
    inputFieldStyle1: {
        [theme.breakpoints.up('md')]: {
            width: 400,
            marginLeft: 50,
        },
        [theme.breakpoints.down('sm')]: {
            width: 200,
        },
    },
    select: {
        "&:before": {
            borderColor: "red"
        },
        '&:before': {
            borderColor: 'red',
        },
        '&:hover:not(.Mui-disabled):before': {
            borderColor: 'red',
        },
        [theme.breakpoints.up('md')]: {
            width: 400,

        },
        [theme.breakpoints.down('sm')]: {
            width: 200,

        },
    }
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

export const PurchaseOrder = () => {
    const classes = useStyles();

    return (
        <Sidenav title={'Purchase Order'}>
            <div>
                <Container className={classes.mainContainer}>
                    <Grid container spacing={1} style={{ marginTop: 15, }} >
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <CssTextField id="outlined-basic"
                                label="Select Vendor Name"
                                variant="outlined"
                                type="email"
                                className={classes.inputFieldStyle}
                                select
                                required
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Asad</MenuItem>
                                <MenuItem value={20}>Aneeq</MenuItem>
                                <MenuItem value={30}>Sagheer</MenuItem>
                                <MenuItem value={30}>Arsalan</MenuItem>
                            </CssTextField>
                        </Grid>
                        <Grid item lg={1} md={1}></Grid>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <CssTextField id="outlined-basic"
                                label="P.O. No."
                                variant="outlined"
                                type="text"
                                className={classes.inputFieldStyle1}
                            />
                        </Grid>
                        <Grid item lg={1}></Grid>
                        <Grid item lg={1} md={1}></Grid>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <CssTextField id="outlined-basic"
                                className={classes.inputFieldStyle}
                                label="Address"
                                variant="outlined"
                                type="text"
                            />
                        </Grid>
                    </Grid>
                </Container>
                <Container className={classes.mainContainer}>
                    <Grid container spacing={1} style={{ marginTop: 15, }} >
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <CssTextField id="outlined-basic"
                                label="Your Reference"
                                variant="outlined"
                                type="text"
                                className={classes.inputFieldStyle}
                            />
                        </Grid>
                        <Grid item lg={1} md={1}></Grid>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <CssTextField id="outlined-basic"
                                label="P.R. No."
                                variant="outlined"
                                type="text"
                                className={classes.inputFieldStyle1}
                            />
                        </Grid>
                        <Grid item lg={1}></Grid>
                        <Grid item lg={1} md={1}></Grid>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <CssTextField id="outlined-basic"
                                className={classes.inputFieldStyle}
                                // label="Select Date"
                                variant="outlined"
                                type="date"
                            />
                        </Grid>
                    </Grid>
                </Container>

            </div>
        </Sidenav>
    )
}
