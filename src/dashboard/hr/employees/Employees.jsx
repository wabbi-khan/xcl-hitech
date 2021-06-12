import React, { useState, useEffect } from 'react'
import Sidenav from '../../SideNav/Sidenav'
import { makeStyles, withStyles } from '@material-ui/core/styles';
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
import MenuItem from '@material-ui/core/MenuItem';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import avatar from '../assests/user.svg'
import { fetchEmployeesAction } from '../../../services/action/EmployeesAction';
import Loading from '../../purchase/material/Loading';
import MaterialError from '../../purchase/material/MaterialError';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';


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
    addMoreButton: {
        backgroundColor: '#22A19A',
        color: 'whitesmoke',
        marginLeft: 20,
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
        marginLeft: 220,
        '&:hover': {
            border: 'none',
            background: 'none',
        }
    },
    uploadImgBtn: {
        paddingLeft: 20,
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


const Employees = ({ history }) => {
    const classes = useStyles();
    const [image, setImage] = useState({ path: avatar })
    const [ItemCounter, setItemCounter] = useState([{ material: "", quantity: '', unitValue: '', remarks: '' }]);
    const [vendorMaterial, setVendorMaterial] = useState([])

    const { register, handleSubmit, formState: { errors } } = useForm()

    const picUploadFunc = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage({
                path: URL.createObjectURL(event.target.files[0])
            })
        }
    }

    const dispatch = useDispatch()

    useEffect(async () => {
        await dispatch(fetchEmployeesAction())
    }, [dispatch])

    const { employee, loading, error } = useSelector(state => state.employee)
    console.log(employee);

    const addMoreFunc = () => {
        setItemCounter([...ItemCounter, { material: '', quantity: '', unitValue: '', remarks: '' }]);
    };

    const deleteItem = (i) => {
        const temp = [...ItemCounter];
        temp.splice(i, 1);
        setItemCounter(temp);
    }

    const onChangeHandler = (value, placeholder, index) => {
        console.log(value)
        const tempFields = ItemCounter.map((item, i) => {
            if (i === index) {
                return { ...item, [placeholder]: value };
            } else {
                return { ...item };
            }
        });
        console.log(tempFields)
        setItemCounter([...tempFields]);
    };

    const onSubmitData = () => {
        // console.log('data submit');
    }


    return (
        <Sidenav title={'Employees'}>
            <div>
                <Container className={classes.mainContainer}>
                    <form onSubmit={handleSubmit(onSubmitData)}>
                        {/* employee ? ( */}
                        <Grid container spacing={1}>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Name"
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    autocomplete="off"
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("name", { required: true })}
                                >
                                </CssTextField>
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Father's Name/Husband Name"
                                    variant="outlined"
                                    type="text"
                                    autocomplete="off"
                                    size="small"
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("fatherName", { required: true, })}
                                >
                                </CssTextField>
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Job Applied For"
                                    variant="outlined"
                                    type="text"
                                    autocomplete="off"
                                    size="small"
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("jobAppliedFor", { required: true, })}
                                >
                                </CssTextField>
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Present Address"
                                    variant="outlined"
                                    type="text"
                                    autocomplete="off"
                                    size="small"
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("presentAddress", { required: true, })}
                                >
                                </CssTextField>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} className="mt-3">
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Permanent Address"
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    autocomplete="off"
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("permanentAddress", { required: true })}
                                >
                                </CssTextField>
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Telephone No."
                                    variant="outlined"
                                    type="number"
                                    autocomplete="off"
                                    size="small"
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("telephoneNo", { required: true, })}
                                >
                                </CssTextField>
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Mobile No."
                                    variant="outlined"
                                    type="number"
                                    autocomplete="off"
                                    size="small"
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("mobileNo", { required: true, })}
                                >
                                </CssTextField>
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Gender"
                                    variant="outlined"
                                    type="text"
                                    autocomplete="off"
                                    size="small"
                                    select
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("gender", { required: true, })}
                                >
                                    <MenuItem>Male</MenuItem>
                                    <MenuItem>Female</MenuItem>
                                </CssTextField>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} className="mt-3">
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Marital Status"
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    select
                                    autocomplete="off"
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("relation", { required: true })}
                                >
                                    <MenuItem>Single</MenuItem>
                                    <MenuItem>Married</MenuItem>
                                </CssTextField>
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Age"
                                    variant="outlined"
                                    type="number"
                                    autocomplete="off"
                                    size="small"
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("age", { required: true, })}
                                >
                                </CssTextField>
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="DOB"
                                    variant="outlined"
                                    type="date"
                                    autocomplete="off"
                                    size="small"
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("", { required: true, })}
                                >
                                </CssTextField>
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Place of Birth"
                                    variant="outlined"
                                    type="text"
                                    autocomplete="off"
                                    size="small"
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("dateOfBirth", { required: true, })}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} className="mt-3">
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Email"
                                    variant="outlined"
                                    type="email"
                                    size="small"
                                    autocomplete="off"
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("email", { required: true })}
                                />
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="CNIC No."
                                    variant="outlined"
                                    type="number"
                                    autocomplete="off"
                                    size="small"
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("cnic", { required: true, })}
                                >
                                </CssTextField>
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Date & Place of Issue"
                                    variant="outlined"
                                    type="text"
                                    placeholder="12-2-20, Hyderabad"
                                    autocomplete="off"
                                    size="small"
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("DatePlaceOfIssue", { required: true, })}
                                >
                                </CssTextField>
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Nationality"
                                    variant="outlined"
                                    type="text"
                                    autocomplete="off"
                                    size="small"
                                    select
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("nationality", { required: true, })}
                                >
                                    <MenuItem>Pakistan</MenuItem>
                                </CssTextField>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} className="mt-3">
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Bank Account No."
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    autocomplete="off"
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("bankAccount", { required: true })}
                                />
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Bank Name & Branch"
                                    variant="outlined"
                                    type="text"
                                    autocomplete="off"
                                    size="small"
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("bankNameAndBranch", { required: true, })}
                                >
                                </CssTextField>
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Next To Kin"
                                    variant="outlined"
                                    type="text"
                                    placeholder="12-2-20, Hyderabad"
                                    autocomplete="off"
                                    size="small"
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("nextToKin", { required: true, })}
                                >
                                </CssTextField>
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Relationship"
                                    variant="outlined"
                                    type="text"
                                    autocomplete="off"
                                    size="small"
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("relation", { required: true, })}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} className="mt-3">
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
                                    {...register("", { required: true })}
                                />
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Contact No."
                                    variant="outlined"
                                    type="text"
                                    autocomplete="off"
                                    size="small"
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("", { required: true, })}
                                >
                                </CssTextField>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} className="mt-3">
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Skills"
                                    variant="outlined"
                                    type="text"
                                    autocomplete="off"
                                    size="small"
                                    select
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("email", { required: true, })}
                                >
                                    <MenuItem>Sales</MenuItem>
                                    <MenuItem>Marketing</MenuItem>
                                </CssTextField>
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Experience"
                                    variant="outlined"
                                    type="email"
                                    autocomplete="off"
                                    size="small"
                                    select
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("email", { required: true, })}
                                >
                                    <MenuItem>Fresher</MenuItem>
                                    <MenuItem>0-2 years</MenuItem>
                                </CssTextField>
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Department"
                                    variant="outlined"
                                    type="text"
                                    autocomplete="off"
                                    size="small"
                                    select
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("email", { required: true, })}
                                >
                                    <MenuItem>Purchase</MenuItem>
                                    <MenuItem>Store</MenuItem>
                                </CssTextField>
                                {/* {
                                            !fetchMatCategory.categories || !fetchMatCategory.categories.length ? <p>Data Not Found</p> :
                                                fetchMatCategory.categories.map((category, i) => (
                                                    <MenuItem
                                                        value={category._id}
                                                        onClick={(e) => fetchMaterials(category._id)}
                                                        key={i}
                                                    >
                                                        {category.name}
                                                    </MenuItem>
                                                ))
                                        } */}
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Designation"
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    autocomplete="off"
                                    select
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("name", { required: true })}
                                >
                                    <MenuItem>Manager</MenuItem>
                                    <MenuItem>Assistant Manager</MenuItem>
                                </CssTextField>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} className="mt-3">
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <input
                                    type="file"
                                    className={classes.uploadImgBtn}
                                    onChange={(event) => picUploadFunc(event)}
                                // {...register("name", { required: true })}
                                >
                                </input>
                                <img src={image.path} alt="Employee Picture" width="150" height="150" className="mt-4 ml-3" align="left" />
                            </Grid>
                        </Grid>
                        {/* ) : null */}
                        <div style={{ marginTop: 30, marginBottom: 30, }}>
                            <hr />
                        </div>
                        <Container className={classes.mainContainer}>
                            <h5 className="text-left">Academic Qualification</h5>
                            {
                                ItemCounter.map((value, i) => {
                                    const no = i + 1;
                                    return (
                                        <Grid key={i} container spacing={1} style={{ marginTop: 15, }} >
                                            <Grid item lg={1} md={1}>
                                                <h5 className={classes.itemHeading}>{no}</h5>
                                            </Grid>
                                            <Grid item lg={2} md={2} sm={12} xs={12}>
                                                <CssTextField id="outlined-basic"
                                                    label="Degree/Certification"
                                                    variant="outlined"
                                                    type="text"
                                                    size="small"
                                                    select
                                                    onChange={(e) => {
                                                        onChangeHandler(e.target.value, 'material', i)
                                                        const material = vendorMaterial.find(el => el._id === e.target.value)
                                                        const tempFields = ItemCounter.map((item, myI) => {
                                                            if (myI === i) {
                                                                return { ...item, 'material': e.target.value, 'unitValue': material.unit };
                                                            } else {
                                                                return { ...item };
                                                            }
                                                        });
                                                        setItemCounter([...tempFields]);
                                                    }}
                                                    className={classes.inputFieldStyle}
                                                    inputProps={{ style: { fontSize: 14 } }}
                                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                                >
                                                    {
                                                        !vendorMaterial.length ? <MenuItem>Please Select Vendor Name</MenuItem> :
                                                            vendorMaterial.map(material => (
                                                                <MenuItem value={material._id} key={material._id}>
                                                                    {material.name}
                                                                </MenuItem>
                                                            ))
                                                    }
                                                </CssTextField>
                                            </Grid>
                                            <Grid item lg={2} md={2} sm={12} xs={12}>
                                                <CssTextField id="outlined-basic"
                                                    label="Board/University"
                                                    variant="outlined"
                                                    type="number"
                                                    size="small"
                                                    value={value.quantity}
                                                    onChange={(e) => {
                                                        onChangeHandler(e.target.value, "quantity", i)
                                                    }}
                                                    className={classes.inputFieldStyle1}
                                                    inputProps={{ style: { fontSize: 14 } }}
                                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                                />
                                            </Grid>
                                            <Grid item lg={2} md={2} sm={12} xs={12}>
                                                <CssTextField id="outlined-basic"
                                                    label="Year of Passing"
                                                    variant="outlined"
                                                    type="number"
                                                    size="small"
                                                    value={ItemCounter[i].unitValue}
                                                    className={classes.inputFieldStyle2}
                                                    inputProps={{ style: { fontSize: 14 } }}
                                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                                />
                                            </Grid>
                                            <Grid item lg={2} md={2} sm={12} xs={12}>
                                                <CssTextField id="outlined-basic"
                                                    label="Division"
                                                    variant="outlined"
                                                    type="text"
                                                    size="small"
                                                    value={value.remarks}
                                                    onChange={(e) => {
                                                        onChangeHandler(e.target.value, "remarks", i)
                                                    }}
                                                    className={classes.inputFieldStyle3}
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
                                        className={classes.addMoreButton}
                                        onClick={addMoreFunc}
                                    // style={{ marginLeft: 'auto', marginRight: 'auto' }}
                                    >
                                        Add More
                                    </Button>
                                </Grid>
                            </Grid>
                            {/* {
                                AddOrderError ? <p className="mt-3 text-danger"> Something Went Wrong. Internal Server Error </p> : null
                            }
                            {
                                AddOrderSuccess ? <p className="mt-3 text-success"> Purchase Order Added Successfully</p> : null
                            } */}
                        </Container>
                        <div>
                            <Button
                                variant="outlined"
                                color="primary"
                                type="submit"
                                className={classes.addButton}
                                onClick={() => {
                                    // history.push('')
                                }}
                            >
                                Add
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
                                    <StyledTableCell align="center">Employee Name</StyledTableCell>
                                    <StyledTableCell align="center">Department</StyledTableCell>
                                    <StyledTableCell align="center">Designation</StyledTableCell>
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
                                                employee.length ?
                                                    employee.map((emp, i) => (
                                                        <StyledTableRow key={i}>
                                                            <StyledTableCell className="text-dark" align="center">{i + 1}</StyledTableCell>
                                                            <StyledTableCell className="text-dark" align="center">{emp.name}</StyledTableCell>
                                                            <StyledTableCell className="text-dark" align="center">
                                                                {
                                                                    !emp.department ? null : emp.department.name
                                                                }
                                                            </StyledTableCell>
                                                            <StyledTableCell className="text-dark" align="center">
                                                                {
                                                                    !emp.designation ? null : emp.designation.name
                                                                }
                                                            </StyledTableCell>
                                                            {/* <StyledTableCell className="text-dark" align="center">
                                                                {
                                                                    !vendor.material || !vendor.material.length ? <p>Not Found</p> :
                                                                        vendor.material.map((value, i) => (
                                                                            <span key={i} className="ml-1">{value.name},</span>
                                                                        ))
                                                                }
                                                            </StyledTableCell> */}
                                                            <StyledTableCell className="text-light" align="center">
                                                                <Button variant="contained" className="bg-dark text-light" size="small"
                                                                    onClick={() => {
                                                                        history.push(`/hr/employees/view_emp_details/${emp._id}`)
                                                                    }}
                                                                >
                                                                    View Report
                                                                </Button>
                                                            </StyledTableCell>
                                                        </StyledTableRow>
                                                    ))
                                                    : <h5>Not Found</h5>
                                            )
                                }
                                {/* {
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
                                                                    onClick={() => {

                                                                    }}
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
                                } */}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </Sidenav >
    )
}

export default Employees
