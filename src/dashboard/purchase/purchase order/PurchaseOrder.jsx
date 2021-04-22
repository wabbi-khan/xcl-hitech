import React, { useState } from 'react'
import Sidenav from '../../SideNav/Sidenav'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
// import id from 'crypto-random-string'
import cryptoRandomString from 'crypto-random-string';


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
        marginTop: 10,
        marginLeft: 15,
        color: '#22A19A',
        borderColor: '#22A19A',
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
            width: 270,

        },
        [theme.breakpoints.down('sm')]: {
            width: 200,

        },
    },
    inputFieldStyle1: {
        [theme.breakpoints.up('md')]: {
            width: 270,
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
    inputFieldStyle3: {
        [theme.breakpoints.up('md')]: {
            width: 250,
            marginLeft: 70,
        },
        [theme.breakpoints.down('sm')]: {
            width: 200,

        },
    },
    inputFieldStyle4: {
        [theme.breakpoints.up('md')]: {
            width: 250,
            marginLeft: 140,
        },
        [theme.breakpoints.down('sm')]: {
            width: 200,

        },
    },
    inputFieldStyle5: {
        [theme.breakpoints.up('md')]: {
            width: 250,
            marginLeft: 210,
        },
        [theme.breakpoints.down('sm')]: {
            width: 200,

        },
    },
    itemHeading: {
        marginTop: 7,
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
    },
    delete: {
        color: 'red',
        fontSize: 38,
        [theme.breakpoints.up('md')]: {
            marginLeft: 50,
            marginTop: -7,

        },
        [theme.breakpoints.down('sm')]: {
            marginTop: -10,
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

export const PurchaseOrder = () => {
    const classes = useStyles();
    const [ItemCounter, setItemCounter] = useState([{ id: 'text' }])

    const addMoreFunc = () => {
        const randomString = cryptoRandomString({ length: 10 });
        const addNew = [...ItemCounter, { id: randomString }]
        setItemCounter(addNew)
        // console.log('working');
        // setItemCounter(['1.', '2.'])
    }

    const deleteItem = (index) => {
        // const deleteRow = ItemCounter.splice(index, 1)
        setItemCounter(ItemCounter.filter(item => item.id !== index))
        // console.log(index);
    }

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
                                size="small"
                                select
                                required
                                className={classes.inputFieldStyle}
                                inputProps={{ style: { fontSize: 14 } }}
                                InputLabelProps={{ style: { fontSize: 14 } }}
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
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <CssTextField id="outlined-basic"
                                label="P.O. No."
                                variant="outlined"
                                type="text"
                                size="small"
                                className={classes.inputFieldStyle1}
                                inputProps={{ style: { fontSize: 14 } }}
                                InputLabelProps={{ style: { fontSize: 14 } }}
                            />
                        </Grid>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <CssTextField id="outlined-basic"
                                label="Address"
                                variant="outlined"
                                type="text"
                                size="small"
                                className={classes.inputFieldStyle1}
                                inputProps={{ style: { fontSize: 14 } }}
                                InputLabelProps={{ style: { fontSize: 14 } }}
                            />
                        </Grid>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <CssTextField id="outlined-basic"
                                label="Your Reference"
                                variant="outlined"
                                type="text"
                                size="small"
                                className={classes.inputFieldStyle1}
                                inputProps={{ style: { fontSize: 14 } }}
                                InputLabelProps={{ style: { fontSize: 14 } }}
                            />
                        </Grid>

                    </Grid>
                </Container>
                <Container className={classes.mainContainer}>
                    <Grid container spacing={1} style={{ marginTop: 15, }} >
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <CssTextField id="outlined-basic"
                                label="P.R.No."
                                variant="outlined"
                                type="text"
                                size="small"
                                required
                                className={classes.inputFieldStyle}
                                inputProps={{ style: { fontSize: 14 } }}
                                InputLabelProps={{ style: { fontSize: 14 } }}
                            >
                            </CssTextField>
                        </Grid>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <CssTextField id="outlined-basic"
                                label="Payment Terms"
                                variant="outlined"
                                type="text"
                                size="small"
                                className={classes.inputFieldStyle1}
                                inputProps={{ style: { fontSize: 14 } }}
                                InputLabelProps={{ style: { fontSize: 14 } }}
                            />
                        </Grid>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <CssTextField id="outlined-basic"
                                label="Payment Subject To"
                                variant="outlined"
                                type="text"
                                size="small"
                                className={classes.inputFieldStyle1}
                                inputProps={{ style: { fontSize: 14 } }}
                                InputLabelProps={{ style: { fontSize: 14 } }}
                            />
                        </Grid>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <CssTextField id="outlined-basic"
                                // label="Your Reference"
                                variant="outlined"
                                type="date"
                                size="small"
                                className={classes.inputFieldStyle1}
                                inputProps={{ style: { fontSize: 14 } }}
                                InputLabelProps={{ style: { fontSize: 14 } }}
                            />
                        </Grid>

                    </Grid>
                </Container>
                <div style={{ marginTop: 30, marginBottom: 30, }}>
                    <hr />
                </div>
                <Container className={classes.mainContainer}>
                    <h4 className="text-left">Items</h4>
                    {
                        ItemCounter.map((value, i) => {
                            const no = i + 1;
                            return (
                                <Grid key={i} container spacing={1} style={{ marginTop: 15, }} >
                                    <Grid item lg={1} md={1}>
                                        <h5 className={classes.itemHeading}>{no}</h5>
                                    </Grid>
                                    <Grid item lg={2} md={3} sm={12} xs={12}>
                                        <CssTextField id="outlined-basic"
                                            label="Select Item"
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                            select
                                            className={classes.inputFieldStyle2}
                                            inputProps={{ style: { fontSize: 14 } }}
                                            InputLabelProps={{ style: { fontSize: 14 } }}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={10}>Material 01</MenuItem>
                                            <MenuItem value={20}>Material 02</MenuItem>
                                        </CssTextField>

                                    </Grid>

                                    <Grid item lg={2} md={3} sm={12} xs={12}>
                                        <CssTextField id="outlined-basic"
                                            label="Quantity"
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                            className={classes.inputFieldStyle3}
                                            inputProps={{ style: { fontSize: 14 } }}
                                            InputLabelProps={{ style: { fontSize: 14 } }}
                                        />
                                    </Grid>

                                    <Grid item lg={2} md={3} sm={12} xs={12}>
                                        <CssTextField id="outlined-basic"
                                            label="Unit Value"
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                            className={classes.inputFieldStyle4}
                                            inputProps={{ style: { fontSize: 14 } }}
                                            InputLabelProps={{ style: { fontSize: 14 } }}
                                        />

                                    </Grid>

                                    <Grid item lg={2} md={3} sm={12} xs={12}>
                                        <CssTextField id="outlined-basic"
                                            label="Remarks"
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                            className={classes.inputFieldStyle5}
                                            inputProps={{ style: { fontSize: 14 } }}
                                            InputLabelProps={{ style: { fontSize: 14 } }}
                                        />

                                    </Grid>
                                    <Grid item lg={2} md={3} sm={12} xs={12}>
                                    </Grid>
                                    <Grid item lg={1} md={3} sm={12} xs={12}>
                                        <Button onClick={() => deleteItem(value.id)}>
                                            <DeleteOutlineIcon className={classes.delete} />
                                        </Button>
                                    </Grid>
                                </Grid>

                            )

                        }
                        )
                    }
                    <Grid container spacing={1} >
                        <Grid item lg={3} md={3} sm={10} xs={11}>
                            <Button variant="outlined" color="primary"
                                className={classes.addButton}
                                onClick={addMoreFunc}
                            // style={{ marginLeft: 'auto', marginRight: 'auto' }}
                            >
                                Add More
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} >
                        <Grid item lg={5} md={5} sm={10} xs={11}>
                        </Grid>
                        <Grid item lg={3} md={3} sm={10} xs={11}>
                            <Button variant="outlined" color="primary"
                                className={classes.addButton}
                                // onClick={addMoreFunc}
                            // style={{ marginLeft: 'auto', marginRight: 'auto' }}
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Container>

            </div>
        </Sidenav>
    )
}
