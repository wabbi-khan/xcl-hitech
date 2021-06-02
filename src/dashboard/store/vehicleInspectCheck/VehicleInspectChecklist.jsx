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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useDispatch, useSelector } from 'react-redux'
import { fetchUnInspectedVehiclesAction } from '../../../services/action/VehiclesAction';
import Loading from '../../purchase/material/Loading';
import MaterialError from '../../purchase/material/MaterialError';
import axios from 'axios';


const GreenCheckbox = withStyles({
    root: {
        color: 'black',
        '&$checked': {
            color: 'red',
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
    tableContainer: {
        marginTop: 20,
    },
    dataTable: {
        marginTop: 40,
    },
    Error: {
        color: 'red',
        backgroundColor: '#e8eaf6',
        padding: 8,
        borderRadius: 5,
        marginLeft: 3,
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

const VehicleInspectChecklist = () => {
    const [fitnessCert, setFitnessCert] = useState(false)
    const [regDoc, setRegDoc] = useState(false)
    const [RoadTaxPaid, setRoadTaxPaid] = useState(false)
    const [validVehicleInsp, setValidVehicleInsp] = useState(false)
    const [driverValidLins, setDriverValidLins] = useState(false)
    const [visualCheckVehicle, setVisualCheckVehicle] = useState(false)
    const [spareTyre, setSpareTyre] = useState(false)
    const [appropriateJack, setAppropriateJack] = useState(false)
    const [enoughFuel, setEnoughFuel] = useState(false)
    const [signOfInspector, setSignOfInspector] = useState(false)
    const [SubmitError, setSubmitError] = useState('')

    const classes = useStyles();

    const dispatch = useDispatch()

    useEffect(async () => {
        await dispatch(fetchUnInspectedVehiclesAction())
    }, [dispatch])

    const { loading, vehicles, error } = useSelector(state => state.vehicles)

    const getCheckedValues = async (_id) => {
        if (fitnessCert && regDoc && RoadTaxPaid && validVehicleInsp && driverValidLins &&
            visualCheckVehicle && spareTyre && appropriateJack && enoughFuel && signOfInspector) {
            await axios.patch(`${process.env.REACT_APP_API_URL}/vehicle/inspection/${_id}`, {
                fitnessCert,
                regDoc,
                RoadTaxPaid,
                validVehicleInsp,
                driverValidLins,
                visualCheckVehicle,
                spareTyre,
                appropriateJack,
                enoughFuel,
                signOfInspector
            })
        }
        else {
            console.log('error');
            setSubmitError('Internal Server Error')
        }
    }
    return (
        <Sidenav title={'Vehicle Inspection Checklist'}>
            <div>
                <div className={classes.dataTable}>
                {
                    fitnessCert == false || regDoc == false || RoadTaxPaid == false || validVehicleInsp == false || driverValidLins == false ||
                    visualCheckVehicle == false || spareTyre == false || appropriateJack == false || enoughFuel == false || signOfInspector == false ? 
                    <span className={classes.Error}>Check All The Fields</span> : null
                }
                    <TableContainer className={classes.tableContainer}>
                        <Table stickyHeader className="table table-dark table-md" style={{ backgroundColor: '#d0cfcf', border: '1px solid grey' }} >
                            <TableHead>
                                <TableRow hover role="checkbox">
                                    <StyledTableCell align="center">Sr.No</StyledTableCell>
                                    <StyledTableCell align="center">Vehicle No.</StyledTableCell>
                                    <StyledTableCell align="center">Driver Name</StyledTableCell>
                                    <StyledTableCell align="center">Fitness Certificate</StyledTableCell>
                                    <StyledTableCell align="center">Reg. Document</StyledTableCell>
                                    <StyledTableCell align="center">Road Tax Paid</StyledTableCell>
                                    <StyledTableCell align="center">Valid Vehicle Ins</StyledTableCell>
                                    <StyledTableCell align="center">Driver's Valid License</StyledTableCell>
                                    <StyledTableCell align="center">Visual Check of Vehicle</StyledTableCell>
                                    <StyledTableCell align="center">Tyre/<br />Spare</StyledTableCell>
                                    <StyledTableCell align="center">Appropriate Jack</StyledTableCell>
                                    <StyledTableCell align="center">Enough Fuel in the Tank</StyledTableCell>
                                    <StyledTableCell align="center">Sign of Inspector</StyledTableCell>
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
                                                            <StyledTableCell className="text-dark" align="center">{vehicle.driverName}</StyledTableCell>
                                                            <StyledTableCell className="text-dark" align="center">
                                                                <FormControlLabel
                                                                    style={{ marginTop: -6 }}
                                                                    label="Yes"
                                                                    control={
                                                                        <GreenCheckbox
                                                                            name="checkedG"
                                                                            onChange={(e) => {
                                                                                if (e.target.checked) {
                                                                                    setFitnessCert(true)
                                                                                }
                                                                                if (!e.target.checked) {
                                                                                    setFitnessCert(false)
                                                                                }
                                                                            }}
                                                                        />
                                                                    }
                                                                />
                                                            </StyledTableCell>
                                                            <StyledTableCell className="text-dark" align="center">
                                                                <FormControlLabel
                                                                    style={{ marginTop: -6 }}
                                                                    label="Yes"
                                                                    control={
                                                                        <GreenCheckbox
                                                                            name="checkedG"
                                                                            onChange={(e) => {
                                                                                if (e.target.checked) {
                                                                                    setRegDoc(true)
                                                                                }
                                                                                if (!e.target.checked) {
                                                                                    setRegDoc(false)
                                                                                }
                                                                            }}
                                                                        />
                                                                    }
                                                                />
                                                            </StyledTableCell>
                                                            <StyledTableCell className="text-dark" align="center">
                                                                <FormControlLabel
                                                                    style={{ marginTop: -6 }}
                                                                    label="Yes"
                                                                    control={
                                                                        <GreenCheckbox
                                                                            name="checkedG"
                                                                            onChange={(e) => {
                                                                                if (e.target.checked) {
                                                                                    setRoadTaxPaid(true)
                                                                                }
                                                                                if (!e.target.checked) {
                                                                                    setRoadTaxPaid(false)
                                                                                }
                                                                            }}
                                                                        />
                                                                    }
                                                                />
                                                            </StyledTableCell>
                                                            <StyledTableCell className="text-dark" align="center">
                                                                <FormControlLabel
                                                                    style={{ marginTop: -6 }}
                                                                    label="Yes"
                                                                    control={
                                                                        <GreenCheckbox
                                                                            name="checkedG"
                                                                            onChange={(e) => {
                                                                                if (e.target.checked) {
                                                                                    setValidVehicleInsp(true)
                                                                                }
                                                                                if (!e.target.checked) {
                                                                                    setValidVehicleInsp(false)
                                                                                }
                                                                            }}
                                                                        />
                                                                    }
                                                                />
                                                            </StyledTableCell>
                                                            <StyledTableCell className="text-dark" align="center">
                                                                <FormControlLabel
                                                                    style={{ marginTop: -6 }}
                                                                    label="Yes"
                                                                    control={
                                                                        <GreenCheckbox
                                                                            name="checkedG"
                                                                            onChange={(e) => {
                                                                                if (e.target.checked) {
                                                                                    setDriverValidLins(true)
                                                                                }
                                                                                if (!e.target.checked) {
                                                                                    setDriverValidLins(false)
                                                                                }
                                                                            }}
                                                                        />
                                                                    }
                                                                />
                                                            </StyledTableCell>
                                                            <StyledTableCell className="text-dark" align="center">
                                                                <FormControlLabel
                                                                    style={{ marginTop: -6 }}
                                                                    label="Yes"
                                                                    control={
                                                                        <GreenCheckbox
                                                                            name="checkedG"
                                                                            onChange={(e) => {
                                                                                if (e.target.checked) {
                                                                                    setVisualCheckVehicle(true)
                                                                                }
                                                                                if (!e.target.checked) {
                                                                                    setVisualCheckVehicle(false)
                                                                                }
                                                                            }}
                                                                        />
                                                                    }
                                                                />
                                                            </StyledTableCell>
                                                            <StyledTableCell className="text-dark" align="center">
                                                                <FormControlLabel
                                                                    style={{ marginTop: -6 }}
                                                                    label="Yes"
                                                                    control={
                                                                        <GreenCheckbox
                                                                            name="checkedG"
                                                                            onChange={(e) => {
                                                                                if (e.target.checked) {
                                                                                    setSpareTyre(true)
                                                                                }
                                                                                if (!e.target.checked) {
                                                                                    setSpareTyre(false)
                                                                                }
                                                                            }}
                                                                        />
                                                                    }
                                                                />
                                                            </StyledTableCell>
                                                            <StyledTableCell className="text-dark" align="center">
                                                                <FormControlLabel
                                                                    style={{ marginTop: -6 }}
                                                                    label="Yes"
                                                                    control={
                                                                        <GreenCheckbox
                                                                            name="checkedG"
                                                                            onChange={(e) => {
                                                                                if (e.target.checked) {
                                                                                    setAppropriateJack(true)
                                                                                }
                                                                                if (!e.target.checked) {
                                                                                    setAppropriateJack(false)
                                                                                }
                                                                            }}
                                                                        />
                                                                    }
                                                                />
                                                            </StyledTableCell>
                                                            <StyledTableCell className="text-dark" align="center">
                                                                <FormControlLabel
                                                                    style={{ marginTop: -6 }}
                                                                    label="Yes"
                                                                    control={
                                                                        <GreenCheckbox
                                                                            name="checkedG"
                                                                            onChange={(e) => {
                                                                                if (e.target.checked) {
                                                                                    setEnoughFuel(true)
                                                                                }
                                                                                if (!e.target.checked) {
                                                                                    setEnoughFuel(false)
                                                                                }
                                                                            }}
                                                                        />
                                                                    }
                                                                />
                                                            </StyledTableCell>
                                                            <StyledTableCell className="text-dark" align="center">
                                                                <FormControlLabel
                                                                    style={{ marginTop: -6 }}
                                                                    label="Yes"
                                                                    control={
                                                                        <GreenCheckbox
                                                                            name="checkedG"
                                                                            onChange={(e) => {
                                                                                if (e.target.checked) {
                                                                                    setSignOfInspector(true)
                                                                                }
                                                                                if (!e.target.checked) {
                                                                                    setSignOfInspector(false)
                                                                                }
                                                                            }}
                                                                        />
                                                                    }
                                                                />
                                                            </StyledTableCell>

                                                            <StyledTableCell className="text-light" align="center">
                                                                <Button variant="contained" color="secondary" size="small"
                                                                    onClick={() => getCheckedValues(vehicle._id)}
                                                                    style={{ marginLeft: 2, marginTop: 2 }}>
                                                                    Finish
                                                                </Button>
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

export default VehicleInspectChecklist
