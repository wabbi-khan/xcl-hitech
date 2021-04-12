import React from 'react'
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
    table: {
        minWidth: 600,
    },
    dataTable: {

    },
}));

const AppSupplier = () => {
    const classes = useStyles();

    return (
        <Sidenav title={'Approved Supplier List'}>
            <div>
                <div className={classes.dataTable}>
                    <TableContainer className={classes.tableContainer}>
                        <Table stickyHeader className="table table-dark" style={{ backgroundColor: '#d0cfcf', border: '1px solid grey' }} >
                            <TableHead>
                                <TableRow hover role="checkbox">
                                    <StyledTableCell align="center">Sr.No</StyledTableCell>
                                    <StyledTableCell align="center">Vendor Name</StyledTableCell>
                                    <StyledTableCell align="center">Contact No.</StyledTableCell>
                                    <StyledTableCell align="center">Contact Person</StyledTableCell>
                                    <StyledTableCell align="center">Items Supplied</StyledTableCell>
                                    <StyledTableCell align="center">Approving Date</StyledTableCell>
                                    <StyledTableCell align="center">Remarks</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody >
                                <StyledTableRow >
                                    <StyledTableCell className="text-dark" align="center">1.</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">M. Ali</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">0303-2020202</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">M. Rizwan</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">Itm1, Item2</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">2-1-2020</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">Good</StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow >
                                    <StyledTableCell className="text-dark" align="center">2.</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">M. Rizwan</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">0303-2020202</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">M. Ali</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">Itm1, Item2, Item3</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">2-1-2020</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">Excellent</StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow >
                                    <StyledTableCell className="text-dark" align="center">3.</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">Osama Khan</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">0303-2020202</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">Sagheer</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">Itm1, Item2</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">2-1-2020</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">Good</StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow >
                                    <StyledTableCell className="text-dark" align="center">4.</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">Aneeq</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">0303-2020202</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">Kamran</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">Itm1, Item2</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">2-1-2020</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">Good</StyledTableCell>
                                </StyledTableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>

        </Sidenav>
    )
}


export default AppSupplier
