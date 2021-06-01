import React, { useState, useEffect } from 'react'
import Sidenav from '../../SideNav/Sidenav'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux'
import { fetchRequisitionAction } from '../../../services/action/PurchaseReqAction';
import Loading from '../../purchase/material/Loading';
import MaterialError from '../../purchase/material/MaterialError';
import { Grid } from '@material-ui/core';


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
    tableContainer: {
        marginTop: 15,
    },
    table: {
        minWidth: 600,
    },
    dataTable: {

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

const CompleteMaterialReq = ({ history }) => {
    const classes = useStyles();
    const [switchButton, setSwitchButton] = useState('Incomplete')

    const dispatch = useDispatch()

    useEffect(async () => {
        await dispatch(fetchRequisitionAction(true))
    }, [dispatch])

    const { requests, loading, error } = useSelector(state => state.requests)
    console.log(requests);

    return (
        <Sidenav title={'Completed Material Issue Requisitions'}>
            <div>
                <div className={classes.dataTable}>
                    <TableContainer className={classes.tableContainer}>
                        <Table stickyHeader className="table table-dark table-md" style={{ backgroundColor: '#d0cfcf', border: '1px solid grey' }} >
                            <TableHead>
                                <TableRow hover role="checkbox">
                                    <StyledTableCell align="center">Sr.No</StyledTableCell>
                                    <StyledTableCell align="center">Department</StyledTableCell>
                                    <StyledTableCell align="center">Purpose</StyledTableCell>
                                    <StyledTableCell align="center">Req. Date</StyledTableCell>
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
                                                requests.length ?
                                                    requests.map((request, i) => (
                                                        <StyledTableRow key={i}>
                                                            <StyledTableCell className="text-dark" align="center">{i + 1}</StyledTableCell>
                                                            <StyledTableCell className="text-dark" align="center">
                                                                {
                                                                    !request.department ? null : request.department.name
                                                                }
                                                            </StyledTableCell>
                                                            <StyledTableCell className="text-dark" align="center">{request.purpose}</StyledTableCell>
                                                            <StyledTableCell className="text-dark" align="center">{request.reqDate}</StyledTableCell>
                                                            <StyledTableCell className="text-dark" align="center">
                                                                <Button variant="contained" size="small"
                                                                    onClick={() => {
                                                                        history.push(`/storedashboard/material_issue_requisition/complete_requisition_details/${request._id}`)
                                                                    }}
                                                                // style={{ backgroundColor: 'red', color: 'whitesmoke', }}
                                                                >
                                                                    View Requisition
                                                                {/* {switchButton} */}
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

export default CompleteMaterialReq
