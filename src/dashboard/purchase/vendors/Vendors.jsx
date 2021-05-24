import React, { useEffect, useState } from 'react'
import Sidenav from '../../SideNav/Sidenav'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux'
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import MenuItem from '@material-ui/core/MenuItem';
import { getVendorAction } from '../../../services/action/VendorAction';
import MaterialError from '../material/MaterialError';
import Loading from '../material/Loading';
import { getMaterialCategoryAction } from '../../../services/action/MatCategoryAction'
import { getSpecCatMatAction } from '../../../services/action/MaterialDataHandle'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import FormGroup from '@material-ui/core/FormGroup';


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
        },
        [theme.breakpoints.up('md')]: {
            width: '15%',

        },
        [theme.breakpoints.down('sm')]: {
            width: '30%',

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

const Vendors = () => {

    const classes = useStyles();
    const [Materials, setMaterials] = useState([])
    const [addVendorSuccess, setAddVendorSuccess] = useState(false)
    const [addVendorFail, setAddVendorFail] = useState(false)
    const [VendorName, setVendorName] = useState('')
    const [VendorEmail, setVendorEmail] = useState('')
    const [VendorPhone, setVendorPhone] = useState('')
    const [VendorAddress, setVendorAddress] = useState('')
    const [VendorCategory, setVendorCategory] = useState('')
    const [VendorMaterial, setVendorMaterial] = useState('')

    const dispatch = useDispatch()

    const { register, handleSubmit, formState: { errors } } = useForm()

    const fetchMatCategory = useSelector(state => state.categories)

    useEffect(async () => {
        await dispatch(getVendorAction())
        await dispatch(getMaterialCategoryAction())
    }, [dispatch])

    const { loading, vendors, error } = useSelector(state => state.vendors)
    const fetchMaterial = useSelector(state => state.materials)

    const fetchMaterials = async (id) => {
        setMaterials([])
        await dispatch(getSpecCatMatAction(id))
    }


    const getMaterials = async (event) => {
        // console.log(event.target);
        if (event.target.checked) {
            setMaterials([...Materials, event.target.value])
        }
        if (event.target.checked === false) {
            setMaterials(Materials.filter((value) => value !== event.target.value))
        }
    }

    const onSubmitData = async (data) => {
        data.material = Materials
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/vendor`, data)
            setAddVendorSuccess(true)
        } catch (error) {
            setAddVendorFail(true)
        }
        console.log(data);
        //     "name": "aamir",
        // "email": "aamir.dev@gmal.com",
        // "phone": "03123343258",
        // "location": "Hyderabad",
        // "material": [
        //     "60967de642ab87001586f002"
        // ],
        // "category": "6096776fa520c776d2bc8b63"
    }

    const deleteMaterial = async (params) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/vendor/${params}`)
            window.location.reload()
        }
        catch (error) {
            console.log(error);
            console.log('catch');
        }

    }

    useEffect(() => {
        console.log(Materials);

    }, [Materials])

    const [open, setOpen] = useState(false);

    const handleOpen = async (vendor) => {
        const { _id, name, email, phone, location, category, material } = vendor
        setVendorName(_id)
        setVendorEmail(name)
        setVendorEmail(email)
        setVendorPhone(phone)
        setVendorAddress(location)
        setVendorCategory(category)
        setVendorMaterial(material)
        setOpen(true);
    };

    return (
        <Sidenav title={'Vendors'}>
            <div>
                <Container className={classes.mainContainer}>
                    <form onSubmit={handleSubmit(onSubmitData)}>
                        <Grid container spacing={1}>

                            {/* ============Vendor Name======================== */}
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Enter Vendor Name"
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    autocomplete="off"
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("name", { required: true })}
                                />
                            </Grid>

                            {/* ============Vendor email======================== */}
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Email (Optional)"
                                    variant="outlined"
                                    type="email"
                                    autocomplete="off"
                                    size="small"
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("email", { required: true, })}
                                />
                            </Grid>

                            {/* ============Vendor phone======================== */}
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Phone No."
                                    variant="outlined"
                                    type="text"
                                    autocomplete="off"
                                    size="small"
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("phone", { required: true, })}

                                />
                            </Grid>

                            {/* ============Vendor location======================== */}
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Address"
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    autocomplete="off"
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("location", { required: true, })}

                                />
                            </Grid>

                        </Grid>
                        <Grid container spacing={1} style={{ marginTop: 8, }}>

                            {/* ============Vendor category======================== */}
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField
                                    id="outlined-basic"
                                    label="Select Category"
                                    variant="outlined"
                                    type="text"
                                    autoComplete="off"
                                    size="small"
                                    select
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("category", { required: true, })}

                                >
                                    {
                                        !fetchMatCategory.categories || !fetchMatCategory.categories.length ? <p>Data Not Found</p> :
                                            fetchMatCategory.categories.map((category, i) => (
                                                <MenuItem
                                                    value={category._id}
                                                    onClick={(e) => fetchMaterials(category._id)}
                                                    key={i}
                                                >
                                                    {category.name}
                                                </MenuItem>
                                            )
                                            )
                                    }
                                </CssTextField>
                            </Grid>

                            {/* ============Vendor category material======================== */}
                            <Grid item lg={3} md={3} sm={6} xs={6} className={classes.ckeckBox}>
                                <FormGroup row>
                                    {
                                        !fetchMaterial.materials || !fetchMaterial.materials.length ? <p>Not Any Material</p> :
                                            fetchMaterial.materials.map((material, i) => (
                                                <FormControlLabel
                                                    key={i}
                                                    control={
                                                        <Checkbox
                                                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                            checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                            onChange={(e) => getMaterials(e)}
                                                        />
                                                    }
                                                    name={material.name}
                                                    value={material._id}
                                                    label={material.name}
                                                    {...register("material")}

                                                />
                                            ))
                                    }
                                </FormGroup>
                            </Grid>
                        </Grid>

                        {/* ============All msg show here about add vendor succsese / fail========= */}
                        {
                            addVendorSuccess ? <span>Vendor Add Successfully</span> : null
                        }
                        {
                            addVendorFail ? <span>Vendor Add Fail</span> : null
                        }
                        <div>
                            <Button
                                variant="outlined"
                                color="primary"
                                type="submit"
                                className={classes.addButton}
                            >
                                Add Vendor
                            </Button>
                        </div>
                    </form>
                </Container>
                <div className={classes.dataTable}>
                    <TableContainer className={classes.tableContainer}>
                        <Table stickyHeader className="table table-dark" style={{ backgroundColor: '#d0cfcf', border: '1px solid grey' }} >
                            <TableHead>
                                <TableRow hover role="checkbox">
                                    <StyledTableCell align="center">Sr.No</StyledTableCell>
                                    <StyledTableCell align="center">Vendor Name</StyledTableCell>
                                    <StyledTableCell align="center">Phone No.</StyledTableCell>
                                    <StyledTableCell align="center">Address</StyledTableCell>
                                    <StyledTableCell align="center">Category</StyledTableCell>
                                    <StyledTableCell align="center">Items</StyledTableCell>
                                    <StyledTableCell align="center">Action</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody >
                                {
                                    loading ? (
                                        <Loading />
                                    ) :
                                        error ? (
                                            <MaterialError />
                                        ) :
                                            (
                                                !vendors || !vendors.length ? <p>Not Found</p> :
                                                    vendors.map((vendor, i) => (
                                                        <StyledTableRow key={i}>
                                                            <StyledTableCell className="text-dark" align="center">{i + 1}</StyledTableCell>
                                                            <StyledTableCell className="text-dark" align="center">{vendor.name}</StyledTableCell>
                                                            <StyledTableCell className="text-dark" align="center">{vendor.phone}</StyledTableCell>
                                                            <StyledTableCell className="text-dark" align="center">{vendor.location}</StyledTableCell>
                                                            <StyledTableCell className="text-dark" align="center">{vendor.category.name}</StyledTableCell>
                                                            <StyledTableCell className="text-dark" align="center">
                                                                {
                                                                    !vendor.material || !vendor.material.length ? <p>Not Found</p> :
                                                                        vendor.material.map((value, i) => (
                                                                            <span key={i} className="ml-1">{value.name},</span>
                                                                        ))
                                                                }
                                                            </StyledTableCell>
                                                            <StyledTableCell className="text-light" align="center">
                                                                <><Button variant="contained" className="bg-dark text-light" size="small"
                                                                    onClick={() =>
                                                                        handleOpen(vendor)
                                                                    }
                                                                    style={{ marginTop: 2 }} >
                                                                    Edit
                                                                </Button>
                                                                    <Button variant="contained" color="secondary" size="small"
                                                                        onClick={() => deleteMaterial(vendor._id)}
                                                                        style={{ marginLeft: 2, marginTop: 2 }}>
                                                                        Delete
                                                                    </Button></>
                                                            </StyledTableCell>
                                                        </StyledTableRow>
                                                    ))
                                            )
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </Sidenav >
    )
}

export default Vendors
