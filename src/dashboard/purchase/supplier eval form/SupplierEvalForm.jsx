import React, { useState, useEffect } from 'react'
import Sidenav from '../../SideNav/Sidenav'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from "react-hook-form";
import { getVendorAction } from '../../../services/action/VendorAction';
import { fetchPersonAction } from '../../../services/action/PersonAction';


const GreenCheckbox = withStyles({
    root: {
        //   color: black[400],
        '&$checked': {
            // color: green[600],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

function createData(No, name, Action) {
    return { No, name, Action };
}

const rows = [
    createData(1, 'Item1'),

];

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    mainContainer: {
        // textAlign: 'center',
        [theme.breakpoints.up('md')]: {
            marginLeft: 0,
            marginTop: 15,
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: -5,
        },
    },
    submitButton: {
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
            width: '25%',
        },
        // [theme.breakpoints.down('sm')]: {
        //     width: '40%',
        // },
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
        [theme.breakpoints.up('md')]: {
            width: 250,
        },
        [theme.breakpoints.down('sm')]: {
            width: 200,
            marginLeft: 15,
        },
    },
    inputFieldStyle1: {
        [theme.breakpoints.up('md')]: {
            width: 250,
        },
        [theme.breakpoints.down('sm')]: {
            width: 200,
            marginLeft: 15,
        },
    },
    inputFieldStyle2: {
        [theme.breakpoints.up('md')]: {
            width: 100,
            marginLeft: -70,
        },
        [theme.breakpoints.down('sm')]: {
            width: 200,
            marginLeft: 10,
        },
    },
    questinOne: {
        [theme.breakpoints.up('md')]: {
            marginLeft: 30,
            marginTop: 15,
        },
        [theme.breakpoints.down('sm')]: {

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
const select = withStyles({
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

})(Select);

const SupplierEvalForm = () => {
    const classes = useStyles();
    const [VendorId, setVendorId] = useState('')
    const [VendorContact, setVendorContact] = useState('')
    const [VendorAddress, setVendorAddress] = useState('')
    const [VendorMaterials, setVendorMaterials] = useState('')

    const { register, handleSubmit, formState: { errors } } = useForm();

    const dispatch = useDispatch()

    useEffect(async () => {
        await dispatch(getVendorAction())
        await dispatch(fetchPersonAction())
    }, [dispatch])

    const { loading, vendors, error } = useSelector(state => state.vendors)
    const personsData = useSelector(state => state.persons)


    return (
        <Sidenav title={'Supplier Evaluation Form'}>
            <div>
                <h5 className="text-center">Section-A (Company Data)</h5>
                <form action="">
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
                                    {
                                        !vendors || !vendors.length ? <p>Data Not Found</p> :
                                            vendors.map(vendor => (
                                                <MenuItem value={vendor._id} key={vendor._id}
                                                    onClick={() => {
                                                        setVendorId(vendor._id)
                                                        setVendorContact(vendor.phone)
                                                        setVendorAddress(vendor.location)
                                                        setVendorMaterials(vendor.material)
                                                    }}
                                                >
                                                    {vendor.name}
                                                </MenuItem>
                                            ))
                                    }
                                </CssTextField>
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Contact No."
                                    variant="outlined"
                                    type="email"
                                    size="small"
                                    disabled
                                    value={VendorContact}
                                    className={classes.inputFieldStyle1}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                />
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Contact Person"
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    select
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                >
                                    {
                                        !personsData.persons || !personsData.persons.length ? <p>Data Not Found</p> :
                                            personsData.persons.map(person => (
                                                <MenuItem value={person._id} key={person._id}

                                                >
                                                    {person.name}
                                                </MenuItem>
                                            ))
                                    }
                                </CssTextField>
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Address"
                                    variant="outlined"
                                    type="email"
                                    size="small"
                                    disabled
                                    value={VendorAddress}
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                />
                            </Grid>
                        </Grid>
                    </Container>
                    <Container className={classes.mainContainer}>
                        <Grid container spacing={1} >
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                {
                                    !VendorMaterials || !VendorMaterials.length ? <p>Data Not Found</p> : (
                                        VendorMaterials.map(vendorMat => (
                                            <FormControlLabel
                                                disabled label={vendorMat.name}
                                                control={
                                                    <Checkbox checked name="checkedE" />
                                                }
                                            />
                                        ))
                                    )
                                }
                            </Grid>
                        </Grid>
                    </Container>
                    <h5 className="text-center mt-5">Section-B (Quality System)</h5>
                    <Container className={classes.mainContainer}>
                        <Grid container spacing={1} style={{ marginTop: 15, }} >
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                            </Grid>
                            <Grid item lg={7} md={3} sm={12} xs={12}>
                                <h6 className={classes.questinOne}>1. Are you registered to ISO 9001/ API?</h6>
                            </Grid>
                            <Grid item lg={2} md={3} sm={12} xs={12}>
                                <CssTextField
                                    id="outlined-basic"
                                    label="Ans"
                                    variant="outlined"
                                    type="email"
                                    size="small"
                                    select
                                    required
                                    className={classes.inputFieldStyle2}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Yes</MenuItem>
                                    <MenuItem value={20}>No</MenuItem>
                                </CssTextField>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} style={{ marginTop: 15, }} >
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                            </Grid>
                            <Grid item lg={7} md={7} sm={12} xs={12}>
                                <h6 className={classes.questinOne}>2. Do you have Quality Management / Quality Assurance System?</h6>
                            </Grid>
                            <Grid item lg={2} md={2} sm={12} xs={12}>
                                <CssTextField
                                    id="outlined-basic"
                                    label="Ans"
                                    variant="outlined"
                                    type="email"
                                    size="small"
                                    select
                                    required
                                    className={classes.inputFieldStyle2}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Yes</MenuItem>
                                    <MenuItem value={20}>No</MenuItem>
                                </CssTextField>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} style={{ marginTop: 15, }} >
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                            </Grid>
                            <Grid item lg={7} md={3} sm={12} xs={12}>
                                <h6 className={classes.questinOne}>3. Do you perform inspection and testing it?</h6>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} >
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                            </Grid>
                            <Grid item lg={7} md={3} sm={12} xs={12}>
                                <h6 className={classes.questinOne}>a. Incoming stage?</h6>
                            </Grid>
                            <Grid item lg={2} md={3} sm={12} xs={12}>
                                <CssTextField
                                    id="outlined-basic"
                                    label="Ans"
                                    variant="outlined"
                                    type="email"
                                    size="small"
                                    select
                                    required
                                    className={classes.inputFieldStyle2}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Yes</MenuItem>
                                    <MenuItem value={20}>No</MenuItem>
                                </CssTextField>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} >
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                            </Grid>
                            <Grid item lg={7} md={3} sm={12} xs={12}>
                                <h6 className={classes.questinOne}>b. In process state?</h6>
                            </Grid>
                            <Grid item lg={2} md={3} sm={12} xs={12}>
                                <CssTextField
                                    id="outlined-basic"
                                    label="Ans"
                                    variant="outlined"
                                    type="email"
                                    size="small"
                                    select
                                    required
                                    className={classes.inputFieldStyle2}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Yes</MenuItem>
                                    <MenuItem value={20}>No</MenuItem>
                                </CssTextField>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} >
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                            </Grid>
                            <Grid item lg={7} md={3} sm={12} xs={12}>
                                <h6 className={classes.questinOne}>c. Final state?</h6>
                            </Grid>
                            <Grid item lg={2} md={3} sm={12} xs={12}>
                                <CssTextField
                                    id="outlined-basic"
                                    label="Ans"
                                    variant="outlined"
                                    type="email"
                                    size="small"
                                    select
                                    required
                                    className={classes.inputFieldStyle2}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Yes</MenuItem>
                                    <MenuItem value={20}>No</MenuItem>
                                </CssTextField>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} style={{ marginTop: 15, }} >
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                            </Grid>
                            <Grid item lg={7} md={3} sm={12} xs={12}>
                                <h6 className={classes.questinOne}>4. How do you control Non-Confirming products?</h6>
                            </Grid>
                            <Grid item lg={2} md={3} sm={12} xs={12}>
                                <CssTextField
                                    id="outlined-basic"
                                    label="Ans"
                                    variant="outlined"
                                    type="email"
                                    size="small"
                                    required
                                    className={classes.inputFieldStyle2}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                >
                                </CssTextField>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} style={{ marginTop: 15, }} >
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                            </Grid>
                            <Grid item lg={7} md={3} sm={12} xs={12}>
                                <h6 className={classes.questinOne}>5. How do you rate the skills and training of your personnel?</h6>
                            </Grid>
                            <Grid item lg={2} md={3} sm={12} xs={12}>
                                <CssTextField
                                    id="outlined-basic"
                                    label="Ans"
                                    variant="outlined"
                                    type="email"
                                    size="small"
                                    select
                                    required
                                    className={classes.inputFieldStyle2}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Low</MenuItem>
                                    <MenuItem value={20}>Medium</MenuItem>
                                    <MenuItem value={20}>High</MenuItem>
                                </CssTextField>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} style={{ marginTop: 15, }} >
                            <Grid item lg={6} md={3} sm={4} xs={4}>
                            </Grid>
                            <Grid item lg={6} md={3} sm={3} xs={3}>
                                <Button variant="outlined" color="primary"
                                    className={classes.submitButton}
                                // style={{ marginLeft: 'auto', marginRight: 'auto' }}
                                >
                                    Submit
                        </Button>

                            </Grid>
                        </Grid>
                    </Container>
                </form>
            </div>
        </Sidenav >
    )
}

export default SupplierEvalForm
