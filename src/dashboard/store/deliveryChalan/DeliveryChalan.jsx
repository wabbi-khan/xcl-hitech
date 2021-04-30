import React, { useState } from 'react'
import Sidenav from '../../SideNav/Sidenav'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import cryptoRandomString from 'crypto-random-string';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    mainContainer: {
        textAlign: 'center',
        marginTop: 20,
    },
    mainContainer1: {
        marginTop: 20,
    },
    addButton: {
        marginTop: 20,
        color: '#22A19A',
        borderColor: '#22A19A',
        fontWeight: 'bold',
        width: '10%',
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
    inputFieldStyle: {
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

        },
        [theme.breakpoints.down('sm')]: {
            width: 200,
            marginTop: 10,
        },
    },
    inputFieldStyle2: {
        // boxShadow: '0.4px 0.4px 0.4px 0.4px grey',
        // borderRadius: 5,
        [theme.breakpoints.up('md')]: {
            width: 200,

        },
        [theme.breakpoints.down('sm')]: {
            width: 200,

        },
    },
    orderDescHeading: {
        [theme.breakpoints.up('md')]: {
            marginLeft: 30,
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: 25,

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

const DeliveryChalan = () => {
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
        <Sidenav title={'Delivery Chalan'}>
            <div>
                <Container className={classes.mainContainer}>
                    <Grid container spacing={1} style={{ marginTop: 15, }} >
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <CssTextField id="outlined-basic"
                                label="No. of Consignment"
                                variant="outlined"
                                type="text"
                                size="small"
                                autoComplete="off"
                                disabled
                                value=""
                                className={classes.inputFieldStyle}
                                inputProps={{ style: { fontSize: 14 } }}
                                InputLabelProps={{ style: { fontSize: 14 } }}
                            >
                            </CssTextField>
                        </Grid>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <CssTextField id="outlined-basic"
                                label="Specification"
                                variant="outlined"
                                type="text"
                                size="small"
                                autoComplete="off"
                                disabled
                                value="Deliver according to requirements"
                                className={classes.inputFieldStyle1}
                                inputProps={{ style: { fontSize: 14 } }}
                                InputLabelProps={{ style: { fontSize: 14 } }}
                            >
                            </CssTextField>
                        </Grid>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <CssTextField id="outlined-basic"
                                label="Date"
                                variant="outlined"
                                type="text"
                                size="small"
                                autoComplete="off"
                                disabled
                                value="24-2-21"
                                className={classes.inputFieldStyle}
                                inputProps={{ style: { fontSize: 14 } }}
                                InputLabelProps={{ style: { fontSize: 14 } }}
                            >
                            </CssTextField>
                        </Grid>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <CssTextField id="outlined-basic"
                                label="DC No."
                                variant="outlined"
                                type="text"
                                size="small"
                                autoComplete="off"
                                disabled
                                value="26"
                                className={classes.inputFieldStyle1}
                                inputProps={{ style: { fontSize: 14 } }}
                                InputLabelProps={{ style: { fontSize: 14 } }}
                            >
                            </CssTextField>
                        </Grid>
                    </Grid>
                </Container>
                <Container className={classes.mainContainer}>
                    <Grid container spacing={1} style={{ marginTop: 15, }} >
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <CssTextField id="outlined-basic"
                                label="Vehicle No."
                                variant="outlined"
                                type="text"
                                size="small"
                                autoComplete="off"
                                disabled
                                value="ABC-123"
                                className={classes.inputFieldStyle}
                                inputProps={{ style: { fontSize: 14 } }}
                                InputLabelProps={{ style: { fontSize: 14 } }}
                            >
                            </CssTextField>
                        </Grid>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <CssTextField id="outlined-basic"
                                label="Order By"
                                variant="outlined"
                                type="text"
                                size="small"
                                autoComplete="off"
                                disabled
                                value=""
                                className={classes.inputFieldStyle1}
                                inputProps={{ style: { fontSize: 14 } }}
                                InputLabelProps={{ style: { fontSize: 14 } }}
                            >
                            </CssTextField>
                        </Grid>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <CssTextField id="outlined-basic"
                                label="Bill To"
                                variant="outlined"
                                type="text"
                                size="small"
                                autoComplete="off"
                                disabled
                                value=""
                                className={classes.inputFieldStyle}
                                inputProps={{ style: { fontSize: 14 } }}
                                InputLabelProps={{ style: { fontSize: 14 } }}
                            >
                            </CssTextField>
                        </Grid>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <CssTextField id="outlined-basic"
                                label="Delivery at Site"
                                variant="outlined"
                                type="text"
                                size="small"
                                autoComplete="off"
                                disabled
                                value=""
                                className={classes.inputFieldStyle1}
                                inputProps={{ style: { fontSize: 14 } }}
                                InputLabelProps={{ style: { fontSize: 14 } }}
                            >
                            </CssTextField>
                        </Grid>
                    </Grid>
                </Container>
                <Container className={classes.mainContainer}>
                    <Grid container spacing={1} style={{ marginTop: 15, }} >
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <CssTextField id="outlined-basic"
                                label="Address"
                                variant="outlined"
                                type="text"
                                size="small"
                                autoComplete="off"
                                disabled
                                value="Kotri Site Area, Hyderabad"
                                className={classes.inputFieldStyle}
                                inputProps={{ style: { fontSize: 14 } }}
                                InputLabelProps={{ style: { fontSize: 14 } }}
                            >
                            </CssTextField>
                        </Grid>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <CssTextField id="outlined-basic"
                                label="Contact No."
                                variant="outlined"
                                type="text"
                                size="small"
                                autoComplete="off"
                                disabled
                                value="0303-3030303"
                                className={classes.inputFieldStyle1}
                                inputProps={{ style: { fontSize: 14 } }}
                                InputLabelProps={{ style: { fontSize: 14 } }}
                            >
                            </CssTextField>
                        </Grid>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <CssTextField id="outlined-basic"
                                label="Contact Person"
                                variant="outlined"
                                type="text"
                                size="small"
                                autoComplete="off"
                                disabled
                                value="Muhammad Ali"
                                className={classes.inputFieldStyle}
                                inputProps={{ style: { fontSize: 14 } }}
                                InputLabelProps={{ style: { fontSize: 14 } }}
                            >
                            </CssTextField>
                        </Grid>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <CssTextField id="outlined-basic"
                                label="Contact No."
                                variant="outlined"
                                type="text"
                                size="small"
                                autoComplete="off"
                                disabled
                                value="0330-2020202"
                                className={classes.inputFieldStyle1}
                                inputProps={{ style: { fontSize: 14 } }}
                                InputLabelProps={{ style: { fontSize: 14 } }}
                            >
                            </CssTextField>
                        </Grid>
                    </Grid>
                </Container>
                <div style={{ marginTop: 30, marginBottom: 30, }}>
                    <hr />
                </div>
                <Container className={classes.mainContainer}>
                    {/* <h4 className="text-left">Items</h4> */}
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
                                            label="Description"
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                            disabled
                                            value="delivery will be on time"
                                            className={classes.inputFieldStyle2}
                                            inputProps={{ style: { fontSize: 14 } }}
                                            InputLabelProps={{ style: { fontSize: 14 } }}
                                        >
                                        </CssTextField>

                                    </Grid>
                                    <Grid item lg={2} md={3} sm={12} xs={12}>
                                        <CssTextField id="outlined-basic"
                                            label="PN/SN"
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                            disabled
                                            value=""
                                            className={classes.inputFieldStyle3}
                                            inputProps={{ style: { fontSize: 14 } }}
                                            InputLabelProps={{ style: { fontSize: 14 } }}
                                        />
                                    </Grid>
                                    <Grid item lg={2} md={3} sm={12} xs={12}>
                                        <CssTextField id="outlined-basic"
                                            label="Quantity(In Meter)"
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                            disabled
                                            value="1234"
                                            className={classes.inputFieldStyle4}
                                            inputProps={{ style: { fontSize: 14 } }}
                                            InputLabelProps={{ style: { fontSize: 14 } }}
                                        />

                                    </Grid>
                                    <Grid item lg={2} md={3} sm={12} xs={12}>
                                        <CssTextField id="outlined-basic"
                                            label="No. of Pipes"
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                            disabled
                                            value=""
                                            className={classes.inputFieldStyle5}
                                            inputProps={{ style: { fontSize: 14 } }}
                                            InputLabelProps={{ style: { fontSize: 14 } }}
                                        />
                                    </Grid>
                                    <Grid item lg={2} md={3} sm={12} xs={12}>
                                        <CssTextField id="outlined-basic"
                                            label="Balance Quantity"
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                            disabled
                                            value="230"
                                            className={classes.inputFieldStyle5}
                                            inputProps={{ style: { fontSize: 14 } }}
                                            InputLabelProps={{ style: { fontSize: 14 } }}
                                        />
                                    </Grid>
                                    
                                </Grid>

                            )

                        }
                        )
                    }
                    {/* <Grid container spacing={1} >
                        <Grid item lg={3} md={3} sm={10} xs={11}>
                            <Button variant="outlined" color="primary"
                                className={classes.addButton}
                                onClick={addMoreFunc}
                            // style={{ marginLeft: 'auto', marginRight: 'auto' }}
                            >
                                Add More
                            </Button>
                        </Grid>
                    </Grid> */}
                    {/* <Grid container spacing={1} >
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
                    </Grid> */}
                </Container>
            </div>
        </Sidenav>
    )
}

export default DeliveryChalan