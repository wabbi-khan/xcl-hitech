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
        // marginLeft: 0
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

const MaterialIssueReq = () => {
    const classes = useStyles();

    return (
        <Sidenav title={'Material Issue Requisition'}>
            <div>
                <div className={classes.dataTable}>
                    <TableContainer className={classes.tableContainer}>
                        <Table stickyHeader className="table table-dark table-md" style={{ backgroundColor: '#d0cfcf', border: '1px solid grey' }} >
                            <TableHead>
                                <TableRow hover role="checkbox">
                                    <StyledTableCell align="center">Sr.No</StyledTableCell>
                                    <StyledTableCell align="center">Items</StyledTableCell>
                                    <StyledTableCell align="center">Department</StyledTableCell>
                                    <StyledTableCell align="center">Purpose</StyledTableCell>
                                    <StyledTableCell align="center">Req. Date</StyledTableCell>
                                    <StyledTableCell align="center">Unit Value</StyledTableCell>
                                    <StyledTableCell align="center">Remarks</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody >
                                <StyledTableRow >
                                    <StyledTableCell className="text-dark" align="center">1.</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">Item1, Item2</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">Purchase</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">Manufacturing</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">3-3-21</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">20</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">Good</StyledTableCell>
                                    {/* <StyledTableCell className="text-dark" align="center">
                                        <Button variant="contained" size="small"
                                                onClick={() => {

                                                }}
                                                style={{ backgroundColor: '#239690', color: 'whitesmoke',}} >
                                            View Requisition
                                        </Button>
                                    </StyledTableCell> */}
                                </StyledTableRow>
                                <StyledTableRow >
                                    <StyledTableCell className="text-dark" align="center">2.</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">Item1, Item2, Item3</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">Purchase</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">Manufacturing</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">3-3-21</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">30</StyledTableCell>
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

export default MaterialIssueReq
