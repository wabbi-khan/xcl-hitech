import React, { useState, useEffect } from 'react'
import Sidenav from '../../SideNav/Sidenav'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TableContainer from '@material-ui/core/TableContainer';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { fetchVehiclesAction } from '../../../services/action/VehiclesAction';
import Loading from '../../purchase/material/Loading';
import MaterialError from '../../purchase/material/MaterialError';
import EditVehicles from './EditVehicles';
import { Form, Formik } from 'formik'
import * as yup from 'yup';



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

const initialValue = {
    vehicleNo: '',
    vehicleType: '',
    driverName: '',
    phnNo: '',
    cnicNo: '',
};

const validationSchema = yup.object({
    vehicleNo: yup.string().required('Vehicle No. is required'),
    vehicleType: yup.string().required('Vehicle Type is required'),
    driverName: yup.string().required('Driver name is required'),
    phnNo: yup.string().required('Phone No. is required'),
    cnicNo: yup.string().required('CNIC No. is required'),
});

const Vehicles = () => {
    const [vehicle, setvehicle] = useState('')

    const classes = useStyles();



    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchVehiclesAction())
    }, [dispatch])

    const { loading, vehicles, error } = useSelector(state => state.vehicles)

    const onSubmit = async (props) => {
        // dispatch(createTraining(props));
    };

    const [open, setOpen] = useState(false);

    const handleClose = (props) => {
        setOpen(props);
    }

    const handleOpen = async (vehicle) => {
        setvehicle(vehicle)
        setOpen(true)
    }

    const deleteVehicle = async (params) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/vehicle/${params}`)
            window.location.reload()
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <Sidenav title={'Vehicles'}>
            {/* ============vehicles form component */}
            <EditVehicles
                show={open}
                handler={handleClose}
                vehicle={vehicle}
            />
            {/* ============vehicles form component */}
            <div>
                <Container className={classes.mainContainer}>
                    <Formik
                        initialValues={initialValue}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {
                            (props) => (
                                <Form>
                                    <Container>
                                        <Grid container spacing={1} style={{ marginTop: 15, }} >
                                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                                <CssTextField id="outlined-basic"
                                                    label="Vehicle No."
                                                    variant="outlined"
                                                    type="text"
                                                    size="small"
                                                    autoComplete="off"
                                                    style={{ width: '100%' }}
                                                    inputProps={{ style: { fontSize: 14 } }}
                                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                                    onChange={props.handleChange('vehicleNo')}
                                                    onBlur={props.handleBlur('vehicleNo')}
                                                    value={props.values.vehicleNo}
                                                    helperText={props.touched.vehicleNo && props.errors.vehicleNo}
                                                    error={props.touched.vehicleNo && props.errors.vehicleNo}
                                                />
                                            </Grid>
                                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                                <CssTextField id="outlined-basic"
                                                    label="Vehicle Type"
                                                    variant="outlined"
                                                    type="text"
                                                    size="small"
                                                    autoComplete="off"
                                                    select
                                                    style={{ width: '100%' }}
                                                    inputProps={{ style: { fontSize: 14 } }}
                                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                                    onChange={props.handleChange('vehicleType')}
                                                    onBlur={props.handleBlur('vehicleType')}
                                                    value={props.values.vehicleType}
                                                    helperText={props.touched.vehicleType && props.errors.vehicleType}
                                                    error={props.touched.vehicleType && props.errors.vehicleType}
                                                >
                                                    <MenuItem value="">
                                                        <em>None</em>
                                                    </MenuItem>
                                                    <MenuItem value="truck">Truck</MenuItem>
                                                    <MenuItem value="heavy truck">Heavy Truck</MenuItem>
                                                </CssTextField>
                                            </Grid>
                                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                                <CssTextField id="outlined-basic"
                                                    label="Driver Name"
                                                    variant="outlined"
                                                    type="text"
                                                    size="small"
                                                    autoComplete="off"
                                                    style={{ width: '100%' }}
                                                    inputProps={{ style: { fontSize: 14 } }}
                                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                                    onChange={props.handleChange('driverName')}
                                                    onBlur={props.handleBlur('driverName')}
                                                    value={props.values.driverName}
                                                    helperText={props.touched.driverName && props.errors.driverName}
                                                    error={props.touched.driverName && props.errors.driverName}
                                                />
                                            </Grid>
                                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                                <CssTextField id="outlined-basic"
                                                    label="Phone No."
                                                    variant="outlined"
                                                    type="text"
                                                    size="small"
                                                    autoComplete="off"
                                                    style={{ width: '100%' }}
                                                    inputProps={{ style: { fontSize: 14 } }}
                                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                                    onChange={props.handleChange('phnNo')}
                                                    onBlur={props.handleBlur('phnNo')}
                                                    value={props.values.phnNo}
                                                    helperText={props.touched.phnNo && props.errors.phnNo}
                                                    error={props.touched.phnNo && props.errors.phnNo}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Container>
                                    <Container className={classes.mainContainer}>
                                        <Grid container spacing={1} style={{ marginTop: 15, }} >
                                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                                <CssTextField id="outlined-basic"
                                                    label="CNIC No."
                                                    variant="outlined"
                                                    type="text"
                                                    size="small"
                                                    autoComplete="off"
                                                    style={{ width: '100%' }}
                                                    inputProps={{ style: { fontSize: 14 } }}
                                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                                    onChange={props.handleChange('cnicNo')}
                                                    onBlur={props.handleBlur('cnicNo')}
                                                    value={props.values.cnicNo}
                                                    helperText={props.touched.cnicNo && props.errors.cnicNo}
                                                    error={props.touched.cnicNo && props.errors.cnicNo}
                                                />
                                                {/* {
                                                    isUpdate ? <p className="text-success mt-2">Vehicle Added Successfully</p> : (
                                                        isError ? <p className="text-danger mt-1">Vehicle Add Failed </p> : null
                                                    )
                                                } */}
                                            </Grid>
                                        </Grid>
                                        <div>
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                type="submit"
                                                className={classes.addButton}
                                            >
                                                Add
                                            </Button>
                                        </div>
                                    </Container>
                                </Form>
                            )
                        }
                    </Formik>
                    <div className={classes.dataTable}>
                        <TableContainer className={classes.tableContainer}>
                            {/* <h5>Inspected Orders</h5> */}
                            <div className='container-fluid' style={{ textAlign: 'left', }}>
                                <table class="table table-responsive table-hover table-striped table-bordered border-dark text-center mt-3">
                                    <thead class="bg-dark text-light">
                                        <tr>
                                            <th>S.No.</th>
                                            <th>Vehicle No.</th>
                                            <th>Vehicle Type</th>
                                            <th>Driver Name</th>
                                            <th>Phn No.</th>
                                            <th>CNIC No.</th>
                                            <th>Inspected/Un-Inspected</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            loading ? (
                                                <Loading />
                                            ) :
                                                error ? (
                                                    <MaterialError />
                                                ) :
                                                    (
                                                        vehicles.length ?
                                                            vehicles.map((vehicle, i) => (
                                                                <tr key={i}>
                                                                    <td>
                                                                        {i + 1}
                                                                    </td>
                                                                    <td>
                                                                        {vehicle.number}
                                                                    </td>
                                                                    <td>
                                                                        {vehicle.type}
                                                                    </td>
                                                                    <td>
                                                                        {vehicle.driverName}
                                                                    </td>
                                                                    <td>
                                                                        {vehicle.phoneNum}
                                                                    </td>
                                                                    <td>
                                                                        {vehicle.cnicNum}
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            vehicle.RoadTaxPaid && vehicle.appropriateJack && vehicle.driverValidLins &&
                                                                                vehicle.enoughFuel && vehicle.fitnessCert && vehicle.regDoc && vehicle.signOfInspector &&
                                                                                vehicle.spareTyre && vehicle.validVehicleInsp && vehicle.visualCheckVehicle ?
                                                                                <span className="text-success">Inspected</span> :
                                                                                <span className="text-danger">Un-Inspected</span>
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        <><Button variant="contained" className="bg-dark text-light" size="small"
                                                                            onClick={() =>
                                                                                handleOpen(vehicle)
                                                                            }
                                                                            style={{ marginTop: 2 }} >
                                                                            Edit
                                                                        </Button>
                                                                            <Button variant="contained" color="secondary" size="small"
                                                                                onClick={() =>
                                                                                    deleteVehicle(vehicle._id)
                                                                                }
                                                                                style={{ marginLeft: 2, marginTop: 2 }}>
                                                                                Delete
                                                                            </Button></>
                                                                    </td>
                                                                </tr>
                                                            ))
                                                            : <h5>Not Found</h5>
                                                    )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </TableContainer>
                    </div>
                </Container>
            </div>
        </Sidenav>
    )
}

export default Vehicles
