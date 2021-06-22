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
    mainContainer1: {
        textAlign: 'left',
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

const PrintNonExecEmpDetails = () => {
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
                <h5 className="mt-4" style={{ textDecoration: 'underline', marginBottom: -45 }}>Employee Performance Assessment</h5>
                <h5 className="mt-5" style={{ textDecoration: 'underline' }}>(For Non-Executive Employees)</h5>
            </div>
            <div className="container-fluid" >
                <div className="row " style={{ marginTop: 15, textAlign: 'left' }}>
                    <div className="col-lg-4 col-md-4 col-sm-6 mt-4">
                        <div className="row no-gutters mt-2">
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <p>Date of Assessment</p>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <p>
                                    {fullDate}
                                    <hr style={{ backgroundColor: 'black', paddingTop: 1 }} />
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="offset-lg-1 offset-md-1 col-lg-4 col-md-4 col-sm-6 mt-4">
                        <div className="row no-gutters mt-2">
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <p style={{ fontWeight: 'bold', }}>Period</p>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <p>
                                    Dec 2020
                                    <hr style={{ backgroundColor: 'black', paddingTop: 1 }} />
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="offset-lg-1 col-lg-2 col-md-2 mt-4" id="printBtn">
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
                                Name
                            </p>
                        </Grid>
                        <Grid item lg={2} md={2} sm={2} xs={2}>
                            <p>Arsalan Khan</p>
                            <hr
                                style={{ paddingBottom: 4, borderColor: 'black', width: '100%', marginTop: -12 }}
                            />
                        </Grid>
                        <Grid item lg={1} md={1} sm={1} xs={1}></Grid>
                        <Grid item lg={2} md={2} sm={3} xs={3}>
                            <p style={{ fontWeight: 'bold', }}>
                                Employee No-
                            </p>
                        </Grid>
                        <Grid item lg={2} md={2} sm={3} xs={3}>
                            <p>Muhammad Ali</p>
                            <hr
                                style={{ paddingBottom: 3, borderColor: 'black', width: '100%', marginTop: -12 }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} style={{ marginTop: 15, textAlign: 'left' }} >
                        <Grid item lg={2} md={2} sm={2} xs={2}>
                            <p style={{ fontWeight: 'bold', }}>
                                Department
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
                                Designation
                            </p>
                        </Grid>
                        <Grid item lg={4} md={4} sm={4} xs={4}>
                            <p>HR Manager</p>
                            <hr
                                style={{ paddingBottom: 3, borderColor: 'black', width: '100%', marginTop: -12 }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} style={{ marginTop: 15, textAlign: 'left' }} >
                        <Grid item lg={2} md={2} sm={2} xs={2}>
                            <p style={{ fontWeight: 'bold', }}>
                                Date Of Birth
                            </p>
                        </Grid>
                        <Grid item lg={2} md={2} sm={2} xs={2}>
                            <p>1-1-89</p>
                            <hr
                                style={{ paddingBottom: 4, borderColor: 'black', width: '100%', marginTop: -12 }}
                            />
                        </Grid>
                        <Grid item lg={1} md={1} sm={1} xs={1}></Grid>
                        <Grid item lg={2} md={2} sm={3} xs={3}>
                            <p style={{ fontWeight: 'bold', }}>
                                Age
                            </p>
                        </Grid>
                        <Grid item lg={4} md={4} sm={4} xs={4}>
                            <p>32</p>
                            <hr
                                style={{ paddingBottom: 3, borderColor: 'black', width: '100%', marginTop: -12 }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} style={{ marginTop: 15, textAlign: 'left' }} >
                        <Grid item lg={2} md={2} sm={2} xs={2}>
                            <p style={{ fontWeight: 'bold', }}>
                                Present Basic Pay Rs.
                            </p>
                        </Grid>
                        <Grid item lg={2} md={2} sm={2} xs={2}>
                            <p>30000</p>
                            <hr
                                style={{ paddingBottom: 4, borderColor: 'black', width: '100%', marginTop: -12 }}
                            />
                        </Grid>
                        <Grid item lg={1} md={1} sm={1} xs={1}></Grid>
                        <Grid item lg={2} md={2} sm={3} xs={3}>
                            <p style={{ fontWeight: 'bold', }}>
                                Date of Joining
                            </p>
                        </Grid>
                        <Grid item lg={4} md={4} sm={4} xs={4}>
                            <p>1-1-2019</p>
                            <hr
                                style={{ paddingBottom: 3, borderColor: 'black', width: '100%', marginTop: -12 }}
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
            </div>
            <div className={classes.table1}>
                <div className="table ml-auto mr-auto mt-4">
                    {/* <h6>Purchase Inspection Materials</h6> */}
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow hover role="checkbox">
                                    <StyledTableCell className="text-dark bg-light" align="center" style={{ fontWeight: 'bold', }}>Sr.No</StyledTableCell>
                                    <StyledTableCell className="text-dark bg-light" align="center" style={{ fontWeight: 'bold', }}>Heading</StyledTableCell>
                                    <StyledTableCell className="text-dark bg-light" align="center" style={{ fontWeight: 'bold', }}>Marks Allocated</StyledTableCell>
                                    <StyledTableCell className="text-dark bg-light" align="center" style={{ fontWeight: 'bold', }}>Marks Obtained</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody >
                                {
                                    // !vendor.material || !vendor.material.length ? <span>Not Found</span> :
                                    //     vendor.material.map((mat, i) => (
                                    <StyledTableRow >
                                        <StyledTableCell className="text-dark" align="center" style={{ fontWeight: 'bold' }}>1</StyledTableCell>
                                        <StyledTableCell className="text-dark" align="center">
                                            <h6 style={{ fontWeight: 'bold' }}>Quality Of Work</h6>
                                            <p>a. Intelligence</p>
                                        </StyledTableCell>
                                        <StyledTableCell className="text-dark" align="center" style={{ fontWeight: 'bold', paddingTop: 35 }}>
                                            10
                                        </StyledTableCell>
                                        <StyledTableCell className="text-dark" align="center" style={{ fontWeight: 'bold', paddingTop: 35 }}>5</StyledTableCell>
                                    </StyledTableRow>
                                    // ))
                                }
                                <StyledTableRow >
                                    <StyledTableCell className="text-dark" align="center" style={{ fontWeight: 'bold' }}></StyledTableCell>
                                    <StyledTableCell className="text-dark" align="right" style={{ fontWeight: 'bold' }}>TOTAL</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center" style={{ fontWeight: 'bold', }}>100</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center" style={{ fontWeight: 'bold', }}>82</StyledTableCell>
                                </StyledTableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
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
            </div>
            <div className={classes.mainContainer1}>
                <h5 align="left" style={{ marginTop: 30 }}>Rating</h5>
                <div className="mt-3">
                    <h6 style={{ display: 'inline' }}>Outstanding </h6>
                    <h6 style={{ display: 'inline', marginLeft: 0 }}>80-90</h6>
                </div>
            </div>
            <div className={classes.mainContainer1}>
                <h5 align="left" style={{ marginTop: 30 }}>Overall Rating</h5>
                <div className="mt-3">
                    <h6 style={{ textDecoration: 'underline' }}>Outstanding</h6>
                    <p style={{ width: '50%' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit illum iure voluptatibus laboriosam, aut cumque sint eius error. Aut voluptates aspernatur fugiat enim tenetur ullam repellendus eaque accusantium suscipit nobis.</p>
                    <h6 style={{ textDecoration: 'underline' }}>Outstanding</h6>
                    <p style={{ width: '50%' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit illum iure voluptatibus laboriosam, aut cumque sint eius error. Aut voluptates aspernatur fugiat enim tenetur ullam repellendus eaque accusantium suscipit nobis.</p>
                </div>
            </div>
            <Grid container spacing={1} style={{ marginTop: 50, textAlign: 'left' }} >
                <Grid item lg={2} md={2} sm={2} xs={2}>
                    <p style={{ fontWeight: 'bold', }}>
                        General Remarks:
                    </p>
                </Grid>
                <Grid item lg={2} md={2} sm={2} xs={2}>
                    <p>good</p>
                    <hr
                        style={{ paddingBottom: 4, borderColor: 'black', width: '100%', marginTop: -12 }}
                    />
                </Grid>
            </Grid>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-3 mt-5">
                        <hr style={{ backgroundColor: 'black', paddingTop: 2 }} />
                        <p style={{ marginTop: -10, fontSize: 12, fontWeight: 'bold' }}>Head Of Department</p>
                    </div>
                    <div className="offset-lg-1 offset-md-1 offset-sm-1 col-lg-3 col-md-3 col-sm-3 mt-5">
                        <hr style={{ backgroundColor: 'black', paddingTop: 2 }} />
                        <p style={{ marginTop: -10, fontSize: 12, fontWeight: 'bold' }}>Name</p>
                    </div>
                    <div className="offset-lg-1 offset-md-1 offset-sm-1 col-lg-3 col-md-3 col-sm-3 mt-5">
                        <hr style={{ backgroundColor: 'black', paddingTop: 2 }} />
                        <p style={{ marginTop: -10, fontSize: 12, fontWeight: 'bold' }}>Signature</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PrintNonExecEmpDetails
