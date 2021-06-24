import React, { useState } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form';

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
            marginTop: 25,
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
        },
        [theme.breakpoints.up('md')]: {
            width: '15%',

        },
        [theme.breakpoints.down('sm')]: {
            width: '30%',

        },
    },
    addMoreButton: {
        backgroundColor: '#22A19A',
        color: 'whitesmoke',
        marginLeft: 20,
        marginTop: 5,
        '&:hover': {
            color: '#22A19A',
            borderColor: '#22A19A',
        },
    },
    table: {
        minWidth: 600,
    },
    dataTable: {
        marginTop: 40,

    },
    ckeckBox: {
        [theme.breakpoints.up('md')]: {
            marginLeft: 7,
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
        },
    },
    inputFieldStyle: {
        // boxShadow: '0.4px 0.4px 0.4px 0.4px grey',
        // borderRadius: 5,
        [theme.breakpoints.up('md')]: {
            width: 250,

        },
        [theme.breakpoints.down('sm')]: {
            width: 200,
        },
    },
    inputFieldStyle1: {
        [theme.breakpoints.up('md')]: {
            width: 250,
            marginLeft: 70
        },
        [theme.breakpoints.down('sm')]: {
            width: 200,
        },
    },
    inputFieldStyle2: {
        [theme.breakpoints.up('md')]: {
            width: 250,
            marginLeft: 140
        },
        [theme.breakpoints.down('sm')]: {
            width: 200,
        },
    },
    inputFieldStyle3: {
        [theme.breakpoints.up('md')]: {
            width: 250,
            marginLeft: 210
        },
        [theme.breakpoints.down('sm')]: {
            width: 200,
        },
    },
    inputFieldStyle4: {
        [theme.breakpoints.up('md')]: {
            width: 250,
            marginLeft: -25
        },
        [theme.breakpoints.down('sm')]: {
            width: 200,
        },
    },
    inputFieldStyle5: {
        [theme.breakpoints.up('md')]: {
            width: 250,
            marginLeft: 2
        },
        [theme.breakpoints.down('sm')]: {
            width: 200,
        },
    },
    delete: {
        color: 'red',
        fontSize: 38,
        [theme.breakpoints.up('md')]: {
            marginTop: -7,
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: -10,
        },
    },
    deleteRowBtn: {
        marginLeft: 30,
        '&:hover': {
            border: 'none',
            background: 'none',
        }
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

const OfficeUse = () => {
    const classes = useStyles();

    return (
        <div>
            <Container className={classes.mainContainer}>
                <h5 className="text-left">For Office Use Only</h5>
                <Grid container spacing={1} style={{ marginTop: 15, }} >
                    <Grid item lg={1} md={1}>
                        {/* <h5 className={classes.itemHeading}>1.</h5> */}
                    </Grid>
                    <Grid item lg={2} md={2} sm={12} xs={12}>
                        <CssTextField id="outlined-basic"
                            // label="Date of Interviewed"
                            variant="outlined"
                            type="date"
                            size="small"
                            autocomplete="off"
                            // onChange={(e) => {
                            // }}
                            className={classes.inputFieldStyle}
                            inputProps={{ style: { fontSize: 14 } }}
                            InputLabelProps={{ style: { fontSize: 14 } }}
                        />
                    </Grid>
                    <Grid item lg={2} md={2} sm={12} xs={12}>
                        <CssTextField id="outlined-basic"
                            label="Remarks"
                            variant="outlined"
                            type="text"
                            size="small"
                            autocomplete="off"
                            // value={value.quantity}
                            // onChange={(e) => {
                            // }}
                            className={classes.inputFieldStyle1}
                            inputProps={{ style: { fontSize: 14 } }}
                            InputLabelProps={{ style: { fontSize: 14 } }}
                        />
                    </Grid>
                    <Grid item lg={2} md={2} sm={12} xs={12}>
                        <CssTextField id="outlined-basic"
                            label="Recommend For Employment"
                            variant="outlined"
                            type="number"
                            size="small"
                            select
                            autocomplete="off"
                            // value={ItemCounter[i].unitValue}
                            className={classes.inputFieldStyle2}
                            inputProps={{ style: { fontSize: 14 } }}
                            InputLabelProps={{ style: { fontSize: 14 } }}
                        >
                            <MenuItem value="">Yes</MenuItem>
                            <MenuItem value="">No</MenuItem>
                        </CssTextField>
                    </Grid>
                    <Grid item lg={2} md={2} sm={12} xs={12}>
                        <CssTextField id="outlined-basic"
                            label="Job Title"
                            variant="outlined"
                            type="text"
                            size="small"
                            select
                            autocomplete="off"
                            // value={ItemCounter[i].unitValue}
                            className={classes.inputFieldStyle3}
                            inputProps={{ style: { fontSize: 14 } }}
                            InputLabelProps={{ style: { fontSize: 14 } }}
                        >
                            <MenuItem value="0">Manager</MenuItem>
                            </CssTextField>
                    </Grid>
                </Grid>
                <Grid container spacing={1} style={{ marginTop: 15, }} >
                    <Grid item lg={1} md={1}>
                        {/* <h5 className={classes.itemHeading}>1.</h5> */}
                    </Grid>
                    
                    <Grid item lg={2} md={2} sm={12} xs={12}>
                        <CssTextField id="outlined-basic"
                            label="Recommended Salary"
                            variant="outlined"
                            type="number"
                            size="small"
                            autocomplete="off"
                            // onChange={(e) => {
                            // }}
                            className={classes.inputFieldStyle1}
                            inputProps={{ style: { fontSize: 14 } }}
                            InputLabelProps={{ style: { fontSize: 14 } }}
                        />
                    </Grid>
                    <Grid item lg={2} md={2} sm={12} xs={12}>
                        <CssTextField id="outlined-basic"
                            label="Recommendations Approved"
                            variant="outlined"
                            type="text"
                            size="small"
                            select
                            autocomplete="off"
                            // value={value.quantity}
                            // onChange={(e) => {
                            // }}
                            className={classes.inputFieldStyle2}
                            inputProps={{ style: { fontSize: 14 } }}
                            InputLabelProps={{ style: { fontSize: 14 } }}
                        >
                            <MenuItem value="">Yes</MenuItem>
                            <MenuItem value="">No</MenuItem>
                        </CssTextField>
                    </Grid>
                </Grid>
            </Container>

            {/* {
                                AddOrderError ? <p className="mt-3 text-danger"> Something Went Wrong. Internal Server Error </p> : null
                            }
                            {
                                AddOrderSuccess ? <p className="mt-3 text-success"> Purchase Order Added Successfully</p> : null
                            } */}
        </div>
    )
}

export default OfficeUse
