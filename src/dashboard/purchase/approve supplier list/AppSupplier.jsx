import React, { useEffect } from 'react'
import Sidenav from '../../SideNav/Sidenav'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useDispatch, useSelector } from 'react-redux'
import { appSuppListAction } from '../../../services/action/VendorAction';
import Loading from '../material/Loading';
import MaterialError from '../material/MaterialError';
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
    },
    table: {
        minWidth: 600,
    },
    dataTable: {

    },
}));

const AppSupplier = ({ history }) => {
    const classes = useStyles();

    const dispatch = useDispatch()

    useEffect(async () => {
        await dispatch(appSuppListAction())
    }, [dispatch])

    const { loading, verifiedVendors, error } = useSelector(state => state.verifiedVendors)

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
                                                !verifiedVendors || !verifiedVendors.length ? <h5>Not Found</h5> :
                                                    verifiedVendors.map((verifiedVendor, i) => (
                                                        <StyledTableRow key={i}>
                                                            <StyledTableCell className="text-dark" align="center">{i + 1}</StyledTableCell>
                                                            <StyledTableCell className="text-dark" align="center">{verifiedVendor.name}</StyledTableCell>
                                                            <StyledTableCell className="text-dark" align="center">{verifiedVendor.phone}</StyledTableCell>
                                                            <StyledTableCell className="text-dark" align="center">
                                                                {verifiedVendor.contactPerson.name}
                                                            </StyledTableCell>
                                                            <StyledTableCell className="text-dark" align="center">
                                                                {
                                                                    !verifiedVendor.material.length ? <span>Not Found</span> : 
                                                                    (
                                                                        verifiedVendor.material.map((material, i) => (
                                                                            <span key={i} >{material.name}, </span>
                                                                        ))
                                                                    )
                                                                }
                                                            </StyledTableCell>
                                                            <StyledTableCell className="text-dark" align="center">
                                                                {
                                                                    verifiedVendor.approveDate
                                                                }
                                                            </StyledTableCell>
                                                            <StyledTableCell className="text-dark" align="center">
                                                                {
                                                                    verifiedVendor.rating == 3 ? <span>High</span> : 
                                                                    verifiedVendor.rating == 2 ? <span>Medium</span> :
                                                                    verifiedVendor.rating == 1 ? <span>Low</span> :
                                                                    verifiedVendor.rating == 0 ? <span>Bad</span> :
                                                                    <span>None of these</span>
                                                                }
                                                            </StyledTableCell>
                                                            <StyledTableCell className="text-light" align="center">
                                                                <Button variant="contained" className="bg-dark text-light" size="small"
                                                                    onClick={() =>
                                                                        history.push(`/purchase/approved_supplier_list/view_approved_supplier_details/${verifiedVendor._id}`)
                                                                    }
                                                                    style={{ marginTop: 2 }} >
                                                                    View
                                                                </Button>
                                                            </StyledTableCell>
                                                        </StyledTableRow>
                                                    ))
                                                   
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


export default AppSupplier
