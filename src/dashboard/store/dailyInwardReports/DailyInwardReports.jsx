import React from 'react'
import Sidenav from '../../SideNav/Sidenav'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableContainer from '@material-ui/core/TableContainer';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';


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

const DailyInwardReports = () => {
    const classes = useStyles();

    return (
        <Sidenav title={'Daily Inwards Report'}>
            <div>
                <div className={classes.dataTable}>
                    <TableContainer className={classes.tableContainer}>
                        <Table stickyHeader className="table table-dark table-md" style={{ backgroundColor: '#d0cfcf', border: '1px solid grey' }} >
                            <TableHead>
                                <TableRow hover role="checkbox">
                                    <StyledTableCell align="center">Sr.No</StyledTableCell>
                                    <StyledTableCell align="center">Item Code</StyledTableCell>
                                    <StyledTableCell align="center">Current Balance</StyledTableCell>
                                    <StyledTableCell align="center">Inwards Quantity</StyledTableCell>
                                    <StyledTableCell align="center">New Balance</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody >
                                <StyledTableRow >
                                    <StyledTableCell className="text-dark" align="center">1.</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">23D3W4</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">1247</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">1340</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">3023</StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow >
                                    <StyledTableCell className="text-dark" align="center">2.</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">23D3W4</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">1247</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">1340</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">3023</StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow >
                                    <StyledTableCell className="text-dark" align="center">3.</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">23D3W4</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">1247</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">1340</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">3023</StyledTableCell>
                                </StyledTableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </Sidenav>
    )
}

export default DailyInwardReports
