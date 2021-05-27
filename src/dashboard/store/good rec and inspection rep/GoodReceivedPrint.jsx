import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import './style.css'

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
    },
    table1: {
        marginBottom: 300
    },
    

}));

const GoodReceivedPrint = () => {
    const classes = useStyles();

    return (
        <div className="text-center">
            <div className="container">
                <img src="./logo.png" alt="" />
                <h4>Hi-Tech Pipe & Engineering Industries</h4>
                <h6>Plot No X-22, Site Area Kotri</h6>
                <p>Ph-No 022-3870614-5, Fax: 022-3870606</p>
                <h5 className="mt-5">Goods Received and Inspection Report</h5>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-6 col-md-6 mt-4">
                        <div className="row no-gutters mt-2">
                            <div className="col-lg-4 col-md-4" align="right">
                                <p>Date</p>
                            </div>
                            <div className="col-lg-4 col-md-4 ml-3">
                                <p>26-4-21</p>
                                <hr style={{ backgroundColor: 'black', paddingTop: 1 }} />
                            </div>
                        </div>
                    </div>
                    <div className="offset-lg-4 offset-md-4 col-lg-2 col-md-2 mt-4" id="printBtn">
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
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow hover role="checkbox">
                                    <StyledTableCell className="text-dark bg-light" align="center">Sr.No</StyledTableCell>
                                    <StyledTableCell className="text-dark bg-light" align="center">Date/Time</StyledTableCell>
                                    <StyledTableCell className="text-dark bg-light" align="center">P.R. No.</StyledTableCell>
                                    <StyledTableCell className="text-dark bg-light" align="center">P.O. No.</StyledTableCell>
                                    <StyledTableCell className="text-dark bg-light" align="center">Received From</StyledTableCell>
                                    <StyledTableCell className="text-dark bg-light" align="center">Description</StyledTableCell>
                                    <StyledTableCell className="text-dark bg-light" align="center">Signature of Inspection</StyledTableCell>
                                    <StyledTableCell className="text-dark bg-light" align="center">Justification/Remarks</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody >
                                <StyledTableRow >
                                    <StyledTableCell className="text-dark" align="center">1.</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">2-2-2021</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">23423</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">30232</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">Arsalan</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis modi atque dolorem</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">Accepted</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">Good</StyledTableCell>
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
            <div className={classes.table1}>
                <div className="table ml-auto mr-auto mt-4">
                    <h6>Purchase Inspection Materials</h6>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow hover role="checkbox">
                                    <StyledTableCell className="text-dark bg-light" align="center">Sr.No</StyledTableCell>
                                    <StyledTableCell className="text-dark bg-light" align="center">Material Name</StyledTableCell>
                                    <StyledTableCell className="text-dark bg-light" align="center">Quantity</StyledTableCell>
                                    <StyledTableCell className="text-dark bg-light" align="center">Unit Value</StyledTableCell>
                                    <StyledTableCell className="text-dark bg-light" align="center">Remarks</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody >
                                <StyledTableRow >
                                    <StyledTableCell className="text-dark" align="center">1.</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">New Screw</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">15</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">12</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">good</StyledTableCell>
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
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-3">
                        <hr style={{ backgroundColor: 'black', paddingTop: 2 }} />
                        <p style={{ marginTop: -10 }}>Store Incharge</p>
                    </div>
                    <div className="offset-lg-6 offset-md-6 col-lg-3 col-md-3">
                        <hr style={{ backgroundColor: 'black', paddingTop: 2 }} />
                        <p style={{ marginTop: -10 }}>Q.A Dept</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GoodReceivedPrint
