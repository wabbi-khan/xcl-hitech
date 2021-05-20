import React, { useState, useEffect } from 'react'
import Sidenav from '../../SideNav/Sidenav'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import cryptoRandomString from 'crypto-random-string';
import { useDispatch, useSelector } from 'react-redux'
import { appSuppListAction } from '../../../services/action/VendorAction';
import { useForm } from "react-hook-form";
import MaterialAddRow from './commponent/materialAddRow'


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
    deleteRowBtn: {
        '&:hover': {
            border: 'none',
            background: 'none',
        }
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

const PurchaseOrder = ({ history }) => {

    const classes = useStyles();
    const dispatch = useDispatch()

    const [ItemCounter, setItemCounter] = useState([{ id: 'text' }])
    const [VendorId, setVendorId] = useState('')
    const [VendorAddress, setVendorAddress] = useState('')
    const [vendorMaterial, setVendorMaterial] = useState([])

    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(async () => {
        await dispatch(appSuppListAction())
    }, [dispatch])

    const { verifiedVendors } = useSelector(state => state.verifiedVendors)

    const addMoreFunc = () => {
        const randomString = cryptoRandomString({ length: 10 });
        const addNew = [...ItemCounter, { id: randomString }]
        setItemCounter(addNew)
    }

    const deleteItem = (id) => {
        setItemCounter(ItemCounter.filter(item => item.id !== id))
    }

    const onAdd = async (data) => {
        console.log(data);
    }

    const onAddMaterial = async data => {
        console.log(data);
    }


    return (
        <Sidenav title={'Purchase Order'}>
            <div>
                {/* <form onSubmit={handleSubmit(onAdd)}> */}
                    <Container className={classes.mainContainer}>
                        <Grid container spacing={1} style={{ marginTop: 15, }} >
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Select Vendor Name"
                                    variant="outlined"
                                    type="email"
                                    size="small"
                                    select
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("vendorName")}

                                >
                                    {
                                        !verifiedVendors || !verifiedVendors.length ? <p>Data Not Found</p> :
                                            verifiedVendors.map(verifiedVendor => (
                                                <MenuItem value={verifiedVendor._id} key={verifiedVendor._id}
                                                    onClick={() => {
                                                        setVendorId(verifiedVendor._id)
                                                        setVendorAddress(verifiedVendor.location)
                                                        setVendorMaterial(verifiedVendor.material)
                                                    }}
                                                >
                                                    {verifiedVendor.name}
                                                </MenuItem>
                                            ))
                                    }
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
                                    {...register("productNo")}
                                />
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Address"
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    disabled
                                    value={VendorAddress}
                                    className={classes.inputFieldStyle1}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                // {...register("address", { required: true })}
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
                                    {...register("reference")}
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
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("prNo")}
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
                                    {...register("paymentTerms")}
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
                                    {...register("paymentSubject")}
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
                                    {...register("date")}
                                />
                            </Grid>
                        </Grid>
                    </Container>
                    <div style={{ marginTop: 30, marginBottom: 30, }}>
                        <hr />
                    </div>
                    {/* ========================================================== */}
                    <MaterialAddRow 
                        materials={vendorMaterial}
                    />
                    {/* ========================================================== */}
                    <Grid container spacing={1} >
                        <Grid item lg={5} md={5} sm={10} xs={11}>
                        </Grid>
                        <Grid item lg={3} md={3} sm={10} xs={11}>
                            <Button
                                variant="outlined" color="primary"
                                type="submit"
                                className={classes.addButton}
                            // onClick={() => {
                            //     history.push('/purchase/purchase_order/print_order')
                            // }}
                            // style={{ marginLeft: 'auto', marginRight: 'auto' }}
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                {/* </form> */}
            </div>
        </Sidenav>
    )
}

export default PurchaseOrder