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
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { fetchVehiclesAction } from '../../../services/action/VehiclesAction';
import Loading from '../../purchase/material/Loading';
import MaterialError from '../../purchase/material/MaterialError';
import EditVehicles from './EditVehicles';
import { useForm } from 'react-hook-form';


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

const Vehicles = () => {
    const [vehicle, setvehicle] = useState('')
    const [isUpdate, setIsUpdate] = useState(false)
    const [isError, setIsError] = useState(false)

    const classes = useStyles();

    const { register, handleSubmit, formState: { errors } } = useForm()

    const dispatch = useDispatch()

    useEffect(async () => {
        await dispatch(fetchVehiclesAction())
    }, [dispatch])

    const { loading, vehicles, error } = useSelector(state => state.vehicles)

    const onSubmitDate = async (props) => {
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/vehicle`, props)
            window.location.reload()
            setIsUpdate(true)
        }
        catch (error) {
            setIsError(true)
            console.log(error);
        }
    }

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
                <form action="" onSubmit={handleSubmit(onSubmitDate)}>
                    <Container className={classes.mainContainer}>
                        <Grid container spacing={1} style={{ marginTop: 15, }} >
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Vehicle No."
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    autoComplete="off"
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("number", { required: true })}
                                />
                                {
                                    errors.number?.type === 'required' && <p className="text-warning">Vehicle No. is required</p>
                                }
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Vehicle Type"
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    autoComplete="off"
                                    select
                                    className={classes.inputFieldStyle1}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("type", { required: true })}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="truck">Truck</MenuItem>
                                    <MenuItem value="heavy truck">Heavy Truck</MenuItem>
                                </CssTextField>
                                {
                                    errors.type?.type === 'required' && <p className="text-warning">Vehicle Type is required</p>
                                }
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Driver Name"
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    autoComplete="off"
                                    className={classes.inputFieldStyle1}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("driverName", { required: true, maxLength: 20 })}
                                />
                                {
                                    errors.driverName?.type === 'required' && <p className="text-warning">Driver Name is required</p>
                                }
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Phone No."
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    autoComplete="off"
                                    className={classes.inputFieldStyle1}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("phoneNum", { required: true, maxLength: 40 })}
                                />
                                {
                                    errors.phoneNum?.type === 'required' && <p className="text-warning">Phone No. is required</p>
                                }
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
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("cnicNum", { required: true, maxLength: 30 })}
                                />
                                {
                                    errors.cnicNum?.type === 'required' && <p className="text-warning">CNIC No. is required</p>
                                }
                                {
                                    isUpdate ? <p className="text-success mt-2">Vehicle Added Successfully</p> : (
                                        isError ? <p className="text-danger mt-1">Vehicle Add Failed </p> : null
                                    )
                                }
                            </Grid>
                        </Grid>
                        <div>
                            <Button variant="outlined" color="primary"
                                type="submit"
                                className={classes.addButton}
                            >
                                Add
                        </Button>
                        </div>
                    </Container>
                </form>
                <div className={classes.dataTable}>
                    <TableContainer className={classes.tableContainer}>
                        <Table stickyHeader className="table table-dark table-md" style={{ backgroundColor: '#d0cfcf', border: '1px solid grey' }} >
                            <TableHead>
                                <TableRow hover role="checkbox">
                                    <StyledTableCell align="center">Sr.No</StyledTableCell>
                                    <StyledTableCell align="center">Vehicle No.</StyledTableCell>
                                    <StyledTableCell align="center">Vehicle Type</StyledTableCell>
                                    <StyledTableCell align="center">Driver Name</StyledTableCell>
                                    <StyledTableCell align="center">Phn No.</StyledTableCell>
                                    <StyledTableCell align="center">CNIC No.</StyledTableCell>
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
                                                vehicles.length ?
                                                    vehicles.map((vehicle, i) => (
                                                        <StyledTableRow key={i}>
                                                            <StyledTableCell className="text-dark" align="center">{i + 1}</StyledTableCell>
                                                            <StyledTableCell className="text-dark" align="center">{vehicle.number}</StyledTableCell>
                                                            <StyledTableCell className="text-dark" align="center">{vehicle.type}</StyledTableCell>
                                                            <StyledTableCell className="text-dark" align="center">{vehicle.driverName}</StyledTableCell>
                                                            <StyledTableCell className="text-dark" align="center">{vehicle.phoneNum}</StyledTableCell>
                                                            <StyledTableCell className="text-dark" align="center">{vehicle.cnicNum}</StyledTableCell>
                                                            <StyledTableCell className="text-light" align="center">
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
                                                            </StyledTableCell>
                                                        </StyledTableRow>
                                                    ))
                                                    : <h5>Not Found</h5>
                                            )
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </Sidenav>
    )
}

export default Vehicles
