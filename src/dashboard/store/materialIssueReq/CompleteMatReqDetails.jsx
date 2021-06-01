import React, { useEffect } from 'react'
import Sidenav from '../../SideNav/Sidenav'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../purchase/material/Loading';
import MaterialError from '../../purchase/material/MaterialError';
import { fetchSingleRequisitionAction } from '../../../services/action/PurchaseReqAction';


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

const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: 'black',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'black',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'black',
            },
        },
    },

})(TextField);

const CompleteMatReqDetails = (props) => {
    const classes = useStyles();
    const id = props.match.params.id

    const dispatch = useDispatch()

    useEffect(async () => {
        await dispatch(fetchSingleRequisitionAction(id))
    }, [dispatch])

    const { request, loading, error } = useSelector(state => state.request)
    console.log(request);

    return (
        <Sidenav title={'Completed Material Issue Requisition Details'}>
            <div className={classes.dataTable}>
                <TableContainer className={classes.tableContainer}>
                    <Table stickyHeader className="table table-dark" style={{ backgroundColor: '#d0cfcf', border: '1px solid grey' }} >
                        <TableHead>
                            <TableRow hover role="checkbox">
                                <StyledTableCell align="center">Sr.No</StyledTableCell>
                                <StyledTableCell align="center">Department</StyledTableCell>
                                <StyledTableCell align="center">Purpose</StyledTableCell>
                                <StyledTableCell align="center">Req. Date</StyledTableCell>
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
                                            request ?
                                                <StyledTableRow>
                                                    <StyledTableCell className="text-dark" align="center">1</StyledTableCell>
                                                    <StyledTableCell className="text-dark" align="center">
                                                        {
                                                            !request.department ? null : request.department.name
                                                        }
                                                    </StyledTableCell>
                                                    <StyledTableCell className="text-dark" align="center">{request.purpose}</StyledTableCell>
                                                    <StyledTableCell className="text-dark" align="center">{request.reqDate}</StyledTableCell>
                                                </StyledTableRow>
                                                : <h5>Not Found</h5>
                                        )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div className={classes.dataTable}>
                <TableContainer className={classes.tableContainer}>
                    <Table stickyHeader className="table table-dark" style={{ backgroundColor: '#d0cfcf', border: '1px solid grey' }} >
                        <TableHead>
                            <TableRow hover role="checkbox">
                                <StyledTableCell align="center">Sr.No</StyledTableCell>
                                <StyledTableCell align="center">Material Name</StyledTableCell>
                                <StyledTableCell align="center">Quantity</StyledTableCell>
                                <StyledTableCell align="center">Unit Value</StyledTableCell>
                                <StyledTableCell align="center">Remarks</StyledTableCell>
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
                                            !request.materials || !request.materials.length ? <h5>Not Found</h5> :
                                                request.materials.map((material, i) => (
                                                    <StyledTableRow key={i}>
                                                        <StyledTableCell className="text-dark" align="center">{i + 1}</StyledTableCell>
                                                        <StyledTableCell className="text-dark" align="center">
                                                            {
                                                                !material.material ? <span>asd</span> : material.material.name
                                                            }
                                                        </StyledTableCell>
                                                        <StyledTableCell className="text-dark" align="center">{material.quantity}</StyledTableCell>
                                                        <StyledTableCell className="text-dark" align="center">{material.unitValue}</StyledTableCell>
                                                        <StyledTableCell className="text-dark" align="center">{material.remarks}</StyledTableCell>
                                                    </StyledTableRow>
                                                ))

                                        )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </Sidenav>
    )
}

export default CompleteMatReqDetails
