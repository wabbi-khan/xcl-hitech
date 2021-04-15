import React from 'react'
import Sidenav from '../../SideNav/Sidenav'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

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
        minWidth: 700,
        border: '1px solid grey',
      },
    
}));

export const PurchaseOrderList = () => {
    const classes = useStyles();

    return (
        <Sidenav title={'Purchase Order List'}>
            <div>
                <div className={classes.dataTable}>
                    <TableContainer className={classes.tableContainer} >
                        <Table stickyHeader className={classes.table} style={{ backgroundColor: '#d0cfcf', border: '1px solid grey' }} >
                            <TableHead>
                                <TableRow hover role="checkbox">
                                    <StyledTableCell align="center">Sr.No</StyledTableCell>
                                    <StyledTableCell align="center">Order#</StyledTableCell>
                                    <StyledTableCell align="center">Vendor Name</StyledTableCell>
                                    <StyledTableCell align="center">Items</StyledTableCell>
                                    <StyledTableCell align="center">Qty</StyledTableCell>
                                    <StyledTableCell align="center">Date</StyledTableCell>
                                    <StyledTableCell align="center">View Details</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody >
                                <StyledTableRow >
                                    <StyledTableCell className="text-dark" align="center">1.</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">232312</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">M. Rizwan</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">Material1, Material2</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">20</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">2-1-2020</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">
                                        <Button className="btn bg-dark text-light">
                                            View Details
                                        </Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow >
                                    <StyledTableCell className="text-dark" align="center">1.</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">232312</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">M. Rizwan</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">Material1, Material2</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">20</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">2-1-2020</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">
                                        <Button className="btn bg-dark text-light">
                                            View Details
                                        </Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow >
                                    <StyledTableCell className="text-dark" align="center">1.</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">232312</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">M. Rizwan</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">Material1, Material2</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">20</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">2-1-2020</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">
                                        <Button className="btn bg-dark text-light">
                                            View Details
                                        </Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow >
                                    <StyledTableCell className="text-dark" align="center">1.</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">232312</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">M. Rizwan</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">Material1, Material2</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">20</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">2-1-2020</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">
                                        <Button className="btn bg-dark text-light">
                                            View Details
                                        </Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                                
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </Sidenav>
    )
}
