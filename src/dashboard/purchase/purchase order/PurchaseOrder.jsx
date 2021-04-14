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
        marginLeft: 15,
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
    inputFieldStyle2: {
        // boxShadow: '0.4px 0.4px 0.4px 0.4px grey',
        // borderRadius: 5,
        [theme.breakpoints.up('md')]: {
            width: 250,

        },
        [theme.breakpoints.down('sm')]: {
            width: 200,

        },
    },
    itemHeading: {
        marginTop: 15,
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
                                label="Payment Terms"
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
                                label="Payment Subject To"
                                variant="outlined"
                                type="text"
                                className={classes.inputFieldStyle}
                            />
                        </Grid>
                        <Grid item lg={1} md={1}></Grid>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <CssTextField id="outlined-basic"
                                // label="Delivery Schedule"
                                variant="outlined"
                                type="date"
                                className={classes.inputFieldStyle1}
                            />
                        </Grid>
                        {/* <Grid item lg={1}></Grid>
                        <Grid item lg={1} md={1}></Grid>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <CssTextField id="outlined-basic"
                                className={classes.inputFieldStyle}
                                // label="Select Date"
                                variant="outlined"
                                type="date"
                            />
                        </Grid> */}
                    </Grid>
                </Container>
                <div style={{ marginTop: 30, marginBottom: 30, }}>
                    <hr />
                </div>
                <Container className={classes.mainContainer}>
                    <h4 className="text-left">Items</h4>
                    <Grid container spacing={1} style={{ marginTop: 15, }} >
                        <Grid item lg={1} md={1}>
                            <h5 className={classes.itemHeading}>1. </h5>
                        </Grid>
                        <Grid item lg={2} md={3} sm={12} xs={12}>
                            <CssTextField id="outlined-basic"
                                label="Select Item"
                                variant="outlined"
                                type="text"
                                select
                                className={classes.inputFieldStyle2}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Material 01</MenuItem>
                                <MenuItem value={20}>Material 02</MenuItem>
                            </CssTextField>

                        </Grid>
                        <Grid item lg={1} md={1}>

                        </Grid>
                        <Grid item lg={2} md={3} sm={12} xs={12}>
                            <CssTextField id="outlined-basic"
                                label="Quantity"
                                variant="outlined"
                                type="text"
                                className={classes.inputFieldStyle2}
                            />
                        </Grid>
                        <Grid item lg={1} md={1}>

                        </Grid>
                        <Grid item lg={2} md={3} sm={12} xs={12}>
                            <CssTextField id="outlined-basic"
                                label="Unit Value"
                                variant="outlined"
                                type="text"
                                className={classes.inputFieldStyle2}
                            />

                        </Grid>
                        <Grid item lg={1} md={1}>

                        </Grid>
                        <Grid item lg={2} md={3} sm={12} xs={12}>
                            <CssTextField id="outlined-basic"
                                label="Remarks"
                                variant="outlined"
                                type="text"
                                className={classes.inputFieldStyle2}
                            />

                        </Grid>
                    </Grid>
                    <Grid container spacing={1} >
                        <Grid item lg={3} md={3} sm={10} xs={11}>
                            <Button variant="outlined" color="primary"
                                className={classes.addButton}
                            // style={{ marginLeft: 'auto', marginRight: 'auto' }}
                            >
                                Add More
                        </Button>

                        </Grid>
                    </Grid>
                </Container>

            </div>
        </Sidenav>
    )
}
