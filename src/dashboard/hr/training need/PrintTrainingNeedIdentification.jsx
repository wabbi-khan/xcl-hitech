import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import CheckIcon from '@material-ui/icons/Check';

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

const PrintTrainingNeedIdentification = () => {
    const classes = useStyles();
    // const id = props.match.params.id

    const date = new Date()
    const currDate = date.getDate()
    const months = date.getMonth() + 1
    const years = date.getFullYear()
    const fullDate = `${currDate} / ${months} / ${years}`

    return (
        <div className="text-center">
            <div className="container">
                <img src="./logo.png" alt="" />
                <h4>Hi-Tech Pipe & Engineering Industries</h4>
                <h6>Plot No X-22, Site Area Kotri</h6>
                <p>Ph-No 022-3870614-5, Fax: 022-3870606</p>
                <h5 className="mt-4" style={{ textDecoration: 'underline', fontWeight: 'bold', marginBottom: 40 }}>Training Needs Identification</h5>
            </div>
            <div className="container-fluid" >
                <div className="row " style={{ marginTop: 15, textAlign: 'left' }}>
                    <div className="col-lg-4 col-md-4 col-sm-6 mt-4">
                        <div className="row no-gutters mt-2">
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <p>Date</p>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <p>
                                    {fullDate}
                                    <hr style={{ backgroundColor: 'black', paddingTop: 1 }} />
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="offset-lg-6 col-lg-2 col-md-2 mt-4" id="printBtn">
                        <Button variant="contained" size="small"
                            className="bg-dark text-light"
                            onClick={() => window.print()}
                        >
                            Print
                        </Button>
                    </div>
                </div>
            </div>
            <div className={classes.table}>
                <div className="table ml-auto mr-auto mt-4">
                    <Grid container spacing={1} style={{ marginTop: 15, textAlign: 'left' }} >
                        <Grid item lg={2} md={2} sm={2} xs={2}>
                            <p style={{ fontWeight: 'bold', }}>
                                Department:
                            </p>
                        </Grid>
                        <Grid item lg={2} md={2} sm={2} xs={2}>
                            <p>Purchase</p>
                            <hr
                                style={{ paddingBottom: 4, borderColor: 'black', width: '100%', marginTop: -12 }}
                            />
                        </Grid>
                        <Grid item lg={1} md={1} sm={1} xs={1}></Grid>
                        <Grid item lg={2} md={2} sm={3} xs={3}>
                            <p style={{ fontWeight: 'bold', }}>
                                Designation:
                            </p>
                        </Grid>
                        <Grid item lg={2} md={2} sm={3} xs={3}>
                            <p>Manager</p>
                            <hr
                                style={{ paddingBottom: 3, borderColor: 'black', width: '100%', marginTop: -12 }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} style={{ marginTop: 15, textAlign: 'left' }} >
                        <Grid item lg={2} md={2} sm={2} xs={2}>
                            <p style={{ fontWeight: 'bold', }}>
                                Interviewed By:
                            </p>
                        </Grid>
                        <Grid item lg={2} md={2} sm={2} xs={2}>
                            <p>QA Manager</p>
                            <hr
                                style={{ paddingBottom: 4, borderColor: 'black', width: '100%', marginTop: -12 }}
                            />
                        </Grid>
                    </Grid>
                    {/* <thead class="thead-dark">
                    <tr>
                    <th>S.No.</th>
                    <td colspan="5">
                    <th>DESCRIPTION</th>
                    </td>
                    <th>Quantity</th>
                    <th>Unit Value</th>
                    <th>Remarks</th>
                    </tr>
                </thead> */}
                </div>
                <div className="" >
                    <div className="" style={{ marginTop: 30, marginLeft: 'auto', }}>
                        <table class="table table-striped table-inverse table-responsive table-hover">
                            <thead class="thead-inverse">
                                <tr>
                                    <th colspan="4"></th>
                                </tr>
                            </thead>
                            <thead class="thead-inverse thead-dark">
                                <tr>
                                    <th>No.</th>
                                    <th style={{ fontWeight: 'bold', textAlign: 'left' }}>Training</th>
                                    <th>Criteria</th>
                                    <th>Training Need</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td scope="row">1.</td>
                                    <td style={{ fontWeight: 'bold', textAlign: 'left' }}>
                                        Quality Management System
                                    </td>
                                    <td>
                                        Excellent
                                    </td>
                                    <td>No</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td scope="row">
                                        <p style={{ fontSize: 14, textAlign: 'left' }}>
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        </p>
                                        <p style={{ fontSize: 14, textAlign: 'left' }}>
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td scope="row">
                                        <p style={{ fontWeight: 'bold', }}>
                                            Recommendations
                                        </p>
                                    </td>
                                    <td colspan="3">
                                        <p style={{ textAlign: 'left', fontWeight: 'bold' }}>
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* <div className="container" style={{ marginTop: 100 }}>
                <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-3 mt-5">
                        <hr style={{ backgroundColor: 'black', paddingTop: 2 }} />
                        <p style={{ marginTop: -10, fontSize: 14, fontWeight: 'bold' }}>Written & Signed By: <br />Factory Manager</p>
                    </div>
                    <div className="offset-lg-6 offset-md-6 offset-sm-6 col-lg-3 col-md-3 col-sm-3 mt-5">
                        <hr style={{ backgroundColor: 'black', paddingTop: 2 }} />
                        <p style={{ marginTop: -10, fontSize: 14, fontWeight: 'bold' }}>Copy To: 1. Employee, <br /> 2. Personal File</p>
                    </div>
                </div>
            </div> */}
            <Grid container spacing={1} style={{ marginTop: 100, }} >
                <Grid item lg={2} md={2} sm={3} xs={3}>
                    <hr style={{ backgroundColor: 'black', paddingTop: 2 }} />
                    <p style={{ marginTop: -10, fontSize: 14, fontWeight: 'bold' }}>Training Identified By: <br />(QA/QC Manager)</p>
                </Grid>
                <Grid item lg={8} md={8} sm={7} xs={7}></Grid>
                <Grid item lg={2} md={2} sm={2} xs={2}>
                    <hr style={{ backgroundColor: 'black', paddingTop: 2 }} />
                    <p style={{ marginTop: -10, fontSize: 14, fontWeight: 'bold' }}>Signature: <br />(Plant Manager)</p>
                </Grid>
            </Grid>
        </div>
    )
}

export default PrintTrainingNeedIdentification
