import React, { useState, useEffect } from 'react'
import Sidenav from '../../SideNav/Sidenav'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import avatar from '../assests/user.svg'
import { fetchEmployeesAction } from '../../../services/action/EmployeesAction';
import AcademicQualification from './AcademicQualification';
import ProfessionalQualification from './ProfessionalQualification';
import Experience from './Experience';
import Reference from './Reference';
import OfficeUse from './OfficeUse';


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
    const [NextToKin, setNextToKin] = useState({ name: "", relation: '', contact: '', address: '' });
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

    const { employee, loading, error } = useSelector( state => state.employee)
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
                                    {...register("status", { required: true })}
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
                                    // views={["day", "month", "year"]}
                                    // format="DD-MM-YYYY"
                                    // onClick={(e) => {
                                    //     console.log(e.target.value);
                                    // }}
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("dateOfBirth", { required: true, })}
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
                                    {...register("placeOfBirth", { required: true, })}
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
                        </Grid>
                        <Grid container spacing={1} className="mt-5">
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
                        <div style={{ marginTop: 30, marginBottom: 30, }}>
                            <hr />
                        </div>
                        <Container className={classes.mainContainer}>
                            <h5 className="text-left">Next To Kin</h5>
                            <Grid container spacing={1} style={{ marginTop: 15, }} >
                                <Grid item lg={1} md={1}>
                                    {/* <h5 className={classes.itemHeading}>1.</h5> */}
                                </Grid>
                                <Grid item lg={2} md={2} sm={12} xs={12}>
                                    <CssTextField id="outlined-basic"
                                        label="Name"
                                        variant="outlined"
                                        type="text"
                                        size="small"
                                        autocomplete="off"
                                        onChange={(e) => {
                                            setNextToKin({
                                                name: e.target.value
                                            })
                                        }}
                                        className={classes.inputFieldStyle}
                                        inputProps={{ style: { fontSize: 14 } }}
                                        InputLabelProps={{ style: { fontSize: 14 } }}
                                    />
                                </Grid>
                                <Grid item lg={2} md={2} sm={12} xs={12}>
                                    <CssTextField id="outlined-basic"
                                        label="Relationship"
                                        variant="outlined"
                                        type="text"
                                        size="small"
                                        autocomplete="off"
                                        // value={value.quantity}
                                        onChange={(e) => {
                                            setNextToKin({
                                                relation: e.target.value
                                            })
                                        }}
                                        className={classes.inputFieldStyle1}
                                        inputProps={{ style: { fontSize: 14 } }}
                                        InputLabelProps={{ style: { fontSize: 14 } }}
                                    />
                                </Grid>
                                <Grid item lg={2} md={2} sm={12} xs={12}>
                                    <CssTextField id="outlined-basic"
                                        label="Address"
                                        variant="outlined"
                                        type="text"
                                        size="small"
                                        autocomplete="off"
                                        // value={ItemCounter[i].unitValue}
                                        onChange={(e) => {
                                            setNextToKin({
                                                contact: e.target.value
                                            })
                                        }}
                                        className={classes.inputFieldStyle2}
                                        inputProps={{ style: { fontSize: 14 } }}
                                        InputLabelProps={{ style: { fontSize: 14 } }}
                                    />
                                </Grid>
                                <Grid item lg={2} md={2} sm={12} xs={12}>
                                    <CssTextField id="outlined-basic"
                                        label="Contact No."
                                        variant="outlined"
                                        type="number"
                                        size="small"
                                        autocomplete="off"
                                        // value={ItemCounter[i].unitValue}
                                        onChange={(e) => {
                                            setNextToKin({
                                                address: e.target.value
                                            })
                                        }}
                                        className={classes.inputFieldStyle3}
                                        inputProps={{ style: { fontSize: 14 } }}
                                        InputLabelProps={{ style: { fontSize: 14 } }}
                                    />
                                </Grid>
                            </Grid>
                        </Container>
                        {/* ) : null */}
                        <div style={{ marginTop: 30, marginBottom: 30, }}>
                            <hr />
                        </div>
                        <AcademicQualification />
                        <ProfessionalQualification />
                        <div style={{ marginTop: 30, marginBottom: 30, }}>
                            <hr />
                        </div>
                        <Experience />
                        <div style={{ marginTop: 30, marginBottom: 30, }}>
                            <hr />
                        </div>
                        <Reference />
                        <div style={{ marginTop: 30, marginBottom: 30, }}>
                            <hr />
                        </div>
                        <OfficeUse />
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
            </div>
        </Sidenav >
    )
}

export default Employees
