import React, { useState, useEffect } from 'react'
import Sidenav from '../../SideNav/Sidenav'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from "react-hook-form";
import axios from 'axios';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    mainContainer: {
        [theme.breakpoints.up('md')]: {
            marginTop: 10,
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: -15,
        },
    },
    innerContainer: {
        textAlign: 'center',
        [theme.breakpoints.up('md')]: {
            marginTop: 10,
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: -15,
        },
    },
    addButton: {
        marginTop: 20,
        marginLeft: 50,
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
            width: 270,
            marginLeft: -20
        },
        [theme.breakpoints.down('sm')]: {
            width: 200,

        },
    },
    inputFieldStyle3: {
        [theme.breakpoints.up('md')]: {
            width: 270,
            marginLeft: -20
        },
        [theme.breakpoints.down('sm')]: {
            width: 200,

        },
    },
    inputFieldStyle4: {
        [theme.breakpoints.up('md')]: {
            width: 270,
            marginLeft: -20
        },
        [theme.breakpoints.down('sm')]: {
            width: 200,

        },
    },
    inputFieldStyle5: {
        [theme.breakpoints.up('md')]: {
            width: 270,
            marginLeft: -20,
        },
        [theme.breakpoints.down('sm')]: {
            width: 200,
        },
    },
    inputFieldStyle6: {
        [theme.breakpoints.up('md')]: {
            width: 270,
            marginLeft: -20,
        },
        [theme.breakpoints.down('sm')]: {
            width: 200,
        },
    },
    inputFieldStyle7: {
        [theme.breakpoints.up('md')]: {
            width: 270,
            marginLeft: -20,
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
        fontSize: 37,
        [theme.breakpoints.up('md')]: {
            // marginLeft: 50,
            marginTop: -7,

        },
        [theme.breakpoints.down('sm')]: {
            marginTop: -10,
        },
    },
    deleteRowBtn: {
        marginTop: 2,
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

const OrderBookingForm = () => {
    const classes = useStyles();
    const dispatch = useDispatch()

    // const [ItemCounter, setItemCounter] = useState([{ id: 'text' }])
    const [ItemCounter, setItemCounter] = useState([{ material: "", quantity: '', unitValue: '', remarks: '' }]);
    const [VendorId, setVendorId] = useState('')
    const [VendorAddress, setVendorAddress] = useState('')
    const [vendorMaterial, setVendorMaterial] = useState([])
    const [orderBody, setOrderBody] = useState({})
    // console.log(vendorMaterial);

    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(async () => {
        // await dispatch(appSuppListAction())
    }, [dispatch])

    // const { verifiedVendors } = useSelector(state => state.verifiedVendors)

    const addMoreFunc = () => {
        setItemCounter([...ItemCounter, { material: '', quantity: '', unitValue: '', remarks: '' }]);
    };

    const deleteItem = (i) => {
        const temp = [...ItemCounter];
        temp.splice(i, 1);
        setItemCounter(temp);
    }

    // const onAdd = async (data) => {
    //     console.log(data);
    // }

    // const onAddMaterial = async data => {
    //     console.log(data);
    // }

    const onChangeHandler = (e, placeholder, index) => {
        console.log(e.target.value)
        const tempFields = ItemCounter.map((item, i) => {
            if (i === index) {
                return { ...item, [placeholder]: e.target.value };
            } else {
                return { ...item };
            }
        });
        setItemCounter(tempFields);
    };

    const onSubmitDate = async (props) => {
        // console.log(ItemCounter);
        // console.log(props);
        // try {
        //     await axios.post(`${process.env.REACT_APP_API_URL}/order`, {
        //         vendor: props.vendor,
        //         poNum: props.poNum,
        //         prNum: props.prNum,
        //         reference: props.reference,
        //         paymentTerm: props.paymentTerm,
        //         paymentSubject: props.paymentSubject,
        //         materials: ItemCounter,

        //     })
        //     window.location.reload()
        //     // setAddMatError(false)
        // }
        // catch (error) {
        //     console.log(error);
        //     // setAddMatError(true)

        // }
    }

    return (
        <Sidenav title={'Order Booking Form'}>
            <div>
                <form action="" onSubmit={handleSubmit(onSubmitDate)}>
                    <Container className={classes.mainContainer}>
                        <div className="mt-2 ml-5">
                            <h5>Company Representative</h5>
                        </div>
                        <Container className={classes.innerContainer}>
                            <Grid container spacing={1} style={{ marginTop: 15, }} >
                                <Grid item lg={3} md={3} sm={12} xs={12}>
                                    <CssTextField id="outlined-basic"
                                        label="Select Designation*"
                                        variant="outlined"
                                        type="email"
                                        size="small"
                                        select
                                        className={classes.inputFieldStyle}
                                        inputProps={{ style: { fontSize: 14 } }}
                                        InputLabelProps={{ style: { fontSize: 14 } }}
                                        {...register("vendor", { required: true })}

                                    >
                                        <MenuItem value="">Manager</MenuItem>
                                        {/* {
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
                                    } */}
                                    </CssTextField>
                                </Grid>
                                <Grid item lg={3} md={3} sm={12} xs={12}>
                                    <CssTextField id="outlined-basic"
                                        label="Select Employee Name"
                                        variant="outlined"
                                        type="text"
                                        size="small"
                                        select
                                        className={classes.inputFieldStyle1}
                                        inputProps={{ style: { fontSize: 14 } }}
                                        InputLabelProps={{ style: { fontSize: 14 } }}
                                        {...register("poNum", { required: true })}
                                    >
                                        <MenuItem value="">Asad</MenuItem>
                                        <MenuItem value="">Arsalan</MenuItem>
                                    </CssTextField>
                                    {
                                        errors.poNum?.type === 'required' && <p className="mt-1 text-danger">P.O. No. is required</p>
                                    }
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
                            </Grid>
                        </Container>
                    </Container>
                    <Container className={classes.mainContainer}>
                        <div className="mt-4 ml-5">
                            <h5>Customer Information</h5>
                        </div>
                        <Container className={classes.innerContainer}>
                            <Grid container spacing={1} style={{ marginTop: 15, }} >
                                <Grid item lg={3} md={3} sm={12} xs={12}>
                                    <CssTextField id="outlined-basic"
                                        label="Enter Customer Name"
                                        variant="outlined"
                                        type="text"
                                        size="small"
                                        autoComplete="off"
                                        className={classes.inputFieldStyle}
                                        inputProps={{ style: { fontSize: 14 } }}
                                        InputLabelProps={{ style: { fontSize: 14 } }}
                                        {...register("vendor", { required: true })}
                                    />
                                    {
                                        errors.poNum?.type === 'required' && <p className="mt-1 text-danger">Customer Name is required</p>
                                    }
                                </Grid>
                                <Grid item lg={3} md={3} sm={12} xs={12}>
                                    <CssTextField id="outlined-basic"
                                        label="Customer Address"
                                        variant="outlined"
                                        type="text"
                                        size="small"
                                        autoComplete="off"
                                        className={classes.inputFieldStyle1}
                                        inputProps={{ style: { fontSize: 14 } }}
                                        InputLabelProps={{ style: { fontSize: 14 } }}
                                        {...register("poNum", { required: true })}
                                    />
                                    {
                                        errors.poNum?.type === 'required' && <p className="mt-1 text-danger">Customer Address is required</p>
                                    }
                                </Grid>
                                <Grid item lg={3} md={3} sm={12} xs={12}>
                                    <CssTextField id="outlined-basic"
                                        label="Delivery Site Address"
                                        variant="outlined"
                                        type="text"
                                        size="small"
                                        autoComplete="off"
                                        className={classes.inputFieldStyle1}
                                        inputProps={{ style: { fontSize: 14 } }}
                                        InputLabelProps={{ style: { fontSize: 14 } }}
                                        {...register("address", { required: true })}
                                    />
                                    {
                                        errors.poNum?.type === 'required' && <p className="mt-1 text-danger">Delivery Site Address is required</p>
                                    }
                                </Grid>
                            </Grid>
                        </Container>
                    </Container>
                    <Container className={classes.mainContainer}>
                        <div className="mt-4 ml-5">
                            <h5>Description of Order</h5>
                        </div>
                        <Container className={classes.innerContainer}>
                            {
                                ItemCounter.map((value, i) => {
                                    const no = i + 1;
                                    return (
                                        <Grid key={i} container spacing={1} style={{ marginTop: 15, }} >
                                            <Grid item lg={1} md={1}>
                                                <h5 className={classes.itemHeading}>{no}.</h5>
                                            </Grid>
                                            <Grid item lg={2} md={2} sm={12} xs={12}>
                                                <CssTextField id="outlined-basic"
                                                    label="Enter Size"
                                                    variant="outlined"
                                                    type="text"
                                                    size="small"
                                                    onChange={(e) => {
                                                        onChangeHandler(e, 'material', i)
                                                    }}
                                                    className={classes.inputFieldStyle2}
                                                    inputProps={{ style: { fontSize: 14 } }}
                                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                                >
                                                    {/* {
                                                    !vendorMaterial.length ? <MenuItem>Please Select Vendor Name</MenuItem> :
                                                        vendorMaterial.map(material => (
                                                            <MenuItem value={material._id} key={material._id}
                                                            // onClick={() => {

                                                            // }}
                                                            >
                                                                {material.name}
                                                            </MenuItem>
                                                        ))
                                                } */}
                                                </CssTextField>
                                            </Grid>
                                            <Grid item lg={1} md={1} sm={12} xs={12}></Grid>
                                            <Grid item lg={2} md={2} sm={12} xs={12}>
                                                <CssTextField id="outlined-basic"
                                                    label="PE-80/100"
                                                    variant="outlined"
                                                    type="number"
                                                    size="small"
                                                    value={value.quantity}
                                                    onChange={(e) => {
                                                        onChangeHandler(e, "quantity", i)
                                                    }}
                                                    className={classes.inputFieldStyle3}
                                                    inputProps={{ style: { fontSize: 14 } }}
                                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                                />
                                            </Grid>
                                            <Grid item lg={1} md={1} sm={12} xs={12}></Grid>
                                            <Grid item lg={2} md={2} sm={12} xs={12}>
                                                <CssTextField id="outlined-basic"
                                                    label="PN"
                                                    variant="outlined"
                                                    type="number"
                                                    size="small"
                                                    value={value.unitValue}
                                                    onChange={(e) => {
                                                        onChangeHandler(e, "unitValue", i)
                                                    }}
                                                    className={classes.inputFieldStyle4}
                                                    inputProps={{ style: { fontSize: 14 } }}
                                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                                />
                                            </Grid>
                                            <Grid item lg={1} md={1} sm={12} xs={12}></Grid>
                                            <Grid item lg={2} md={2} sm={12} xs={12}>
                                                <CssTextField id="outlined-basic"
                                                    label="SDR"
                                                    variant="outlined"
                                                    type="text"
                                                    size="small"
                                                    value={value.remarks}
                                                    onChange={(e) => {
                                                        onChangeHandler(e, "remarks", i)
                                                    }}
                                                    className={classes.inputFieldStyle5}
                                                    inputProps={{ style: { fontSize: 14 } }}
                                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                                />
                                            </Grid>
                                            <Grid item lg={1} md={1} sm={12} xs={12}></Grid>
                                            <Grid item lg={2} md={2} sm={12} xs={12}>
                                                <CssTextField id="outlined-basic"
                                                    label="Length in Meter"
                                                    variant="outlined"
                                                    type="text"
                                                    size="small"
                                                    value={value.remarks}
                                                    onChange={(e) => {
                                                        onChangeHandler(e, "remarks", i)
                                                    }}
                                                    className={classes.inputFieldStyle6}
                                                    inputProps={{ style: { fontSize: 14 } }}
                                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                                />
                                            </Grid>
                                            <Grid item lg={1} md={1} sm={12} xs={12}></Grid>
                                            <Grid item lg={2} md={2} sm={12} xs={12}>
                                                <CssTextField id="outlined-basic"
                                                    label="No. of Pipes/Coils"
                                                    variant="outlined"
                                                    type="text"
                                                    size="small"
                                                    value={value.remarks}
                                                    onChange={(e) => {
                                                        onChangeHandler(e, "remarks", i)
                                                    }}
                                                    className={classes.inputFieldStyle7}
                                                    inputProps={{ style: { fontSize: 14 } }}
                                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                                />
                                            </Grid>
                                            <Grid item lg={2} md={2} sm={12} xs={12}>
                                                <Button onClick={() => deleteItem(i)} className={classes.deleteRowBtn}>
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
                            <div style={{ marginTop: 30, marginBottom: 30, }}>
                                <hr />
                            </div>
                        </Container>
                    </Container>
                    <Container className={classes.mainContainer}>
                        <Container className={classes.innerContainer}>
                            <Grid container spacing={1} style={{ marginTop: 15, }} >
                                <Grid item lg={3} md={3} sm={12} xs={12}>
                                    <CssTextField id="outlined-basic"
                                        label="Fitting Required"
                                        variant="outlined"
                                        type="text"
                                        size="small"
                                        select
                                        className={classes.inputFieldStyle}
                                        inputProps={{ style: { fontSize: 14 } }}
                                        InputLabelProps={{ style: { fontSize: 14 } }}
                                        {...register("vendor", { required: true })}
                                    >
                                        <MenuItem value="">Yes</MenuItem>
                                        <MenuItem value="">No</MenuItem>
                                    </CssTextField>
                                    {
                                        errors.poNum?.type === 'required' && <p className="mt-1 text-danger">Work Order No. is required</p>
                                    }
                                </Grid>
                                <Grid item lg={3} md={3} sm={12} xs={12}>
                                    <CssTextField id="outlined-basic"
                                        label="Fitting Quantity"
                                        variant="outlined"
                                        type="text"
                                        size="small"
                                        className={classes.inputFieldStyle}
                                        inputProps={{ style: { fontSize: 14 } }}
                                        InputLabelProps={{ style: { fontSize: 14 } }}
                                        {...register("vendor", { required: true })}
                                    />
                                    {
                                        errors.poNum?.type === 'required' && <p className="mt-1 text-danger">Work Order No. is required</p>
                                    }
                                </Grid>
                                <Grid item lg={3} md={3} sm={12} xs={12}>
                                    <CssTextField id="outlined-basic"
                                        label="Welding Required"
                                        variant="outlined"
                                        type="text"
                                        size="small"
                                        select
                                        className={classes.inputFieldStyle}
                                        inputProps={{ style: { fontSize: 14 } }}
                                        InputLabelProps={{ style: { fontSize: 14 } }}
                                        {...register("vendor", { required: true })}
                                    >
                                        <MenuItem value="">Yes</MenuItem>
                                        <MenuItem value="">No</MenuItem>
                                    </CssTextField>
                                    {
                                        errors.poNum?.type === 'required' && <p className="mt-1 text-danger">Work Order No. is required</p>
                                    }
                                </Grid>
                                <Grid item lg={3} md={3} sm={12} xs={12}>
                                    <CssTextField id="outlined-basic"
                                        label="Mode of Transportation"
                                        variant="outlined"
                                        type="text"
                                        size="small"
                                        value="By Road"
                                        className={classes.inputFieldStyle}
                                        inputProps={{ style: { fontSize: 14 } }}
                                        InputLabelProps={{ style: { fontSize: 14 } }}
                                        {...register("vendor", { required: true })}
                                    />
                                    {
                                        errors.poNum?.type === 'required' && <p className="mt-1 text-danger">Work Order No. is required</p>
                                    }
                                </Grid>
                            </Grid>
                        </Container>
                    </Container>
                    <Container className={classes.mainContainer}>
                        <Container className={classes.innerContainer}>
                            <Grid container spacing={1} style={{ marginTop: 15, }} >
                                <Grid item lg={3} md={3} sm={12} xs={12}>
                                    <CssTextField id="outlined-basic"
                                        label="Mode of Payment"
                                        variant="outlined"
                                        type="text"
                                        size="small"
                                        select
                                        className={classes.inputFieldStyle}
                                        inputProps={{ style: { fontSize: 14 } }}
                                        InputLabelProps={{ style: { fontSize: 14 } }}
                                        {...register("vendor", { required: true })}
                                    >
                                        <MenuItem value="">Online</MenuItem>
                                        <MenuItem value="">Cash</MenuItem>
                                        <MenuItem value="">Advance</MenuItem>
                                        <MenuItem value="">Half</MenuItem>
                                    </CssTextField>
                                    {
                                        errors.poNum?.type === 'required' && <p className="mt-1 text-danger">Work Order No. is required</p>
                                    }
                                </Grid>
                                <Grid item lg={3} md={3} sm={12} xs={12}>
                                    <CssTextField id="outlined-basic"
                                        // label="Expected Date of Delivery"
                                        variant="outlined"
                                        type="date"
                                        size="small"
                                        className={classes.inputFieldStyle}
                                        inputProps={{ style: { fontSize: 14 } }}
                                        InputLabelProps={{ style: { fontSize: 14 } }}
                                        {...register("vendor", { required: true })}
                                    />
                                    {
                                        errors.poNum?.type === 'required' && <p className="mt-1 text-danger">Work Order No. is required</p>
                                    }
                                </Grid>
                                <Grid item lg={3} md={3} sm={12} xs={12}>
                                    <CssTextField id="outlined-basic"
                                        label="Any Special Requirements"
                                        variant="outlined"
                                        type="text"
                                        size="small"
                                        className={classes.inputFieldStyle}
                                        inputProps={{ style: { fontSize: 14 } }}
                                        InputLabelProps={{ style: { fontSize: 14 } }}
                                        {...register("vendor", { required: true })}
                                    />
                                    {
                                        errors.poNum?.type === 'required' && <p className="mt-1 text-danger">Work Order No. is required</p>
                                    }
                                </Grid>
                                <Grid item lg={3} md={3} sm={12} xs={12}>
                                    <CssTextField id="outlined-basic"
                                        label="Remarks"
                                        variant="outlined"
                                        type="text"
                                        size="small"
                                        className={classes.inputFieldStyle}
                                        inputProps={{ style: { fontSize: 14 } }}
                                        InputLabelProps={{ style: { fontSize: 14 } }}
                                        {...register("vendor", { required: true })}
                                    />
                                    {
                                        errors.poNum?.type === 'required' && <p className="mt-1 text-danger">Work Order No. is required</p>
                                    }
                                </Grid>
                            </Grid>
                        </Container>
                    <Grid container spacing={1} >
                        <Grid item lg={5} md={5} sm={10} xs={11}>
                        </Grid>
                        <Grid item lg={3} md={3} sm={10} xs={11}>
                            <Button
                                variant="outlined" color="primary"
                                type="submit"
                                className={classes.addButton}
                                onClick={() => {
                                    // console.log(ItemCounter)
                                    // history.push('/purchase/purchase_requisition/print_purchase_requisition')
                                }}
                            // style={{ marginLeft: 'auto', marginRight: 'auto' }}
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                    </Container>
                </form>
            </div>
        </Sidenav>
    )
}

export default OrderBookingForm
