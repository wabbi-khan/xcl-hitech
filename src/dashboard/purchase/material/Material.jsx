import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux' 
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
import MenuItem from '@material-ui/core/MenuItem';
import { getMaterialAction } from '../../../services/action/MaterialDataHandle';

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
            width: 330,

        },
        [theme.breakpoints.down('sm')]: {
            width: 200,

        },
    },
    inputFieldStyle1: {
        [theme.breakpoints.up('md')]: {
            width: 330,
            marginLeft: 10,

        },
        [theme.breakpoints.down('sm')]: {
            width: 200,
            marginTop: 10,
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

const Material = () => {
    const classes = useStyles();

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getMaterialAction())
    }, [])

    return (
        <Sidenav title={'Material'}>
            <div>
                <Container className={classes.mainContainer}>
                    <CssTextField id="outlined-basic"
                        label="Select Category"
                        variant="outlined"
                        type="text"
                        autocomplete="off"
                        size="small"
                        select
                        className={classes.inputFieldStyle}
                        inputProps={{ style: { fontSize: 14 } }}
                        InputLabelProps={{ style: { fontSize: 14 } }}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Inventory</MenuItem>
                        <MenuItem value={20}>Raw Material</MenuItem>
                    </CssTextField>
                    <CssTextField id="outlined-basic"
                        label="Enter Material Name"
                        variant="outlined"
                        type="text"
                        autocomplete="off"
                        size="small"
                        className={classes.inputFieldStyle1}
                        inputProps={{ style: { fontSize: 14 } }}
                        InputLabelProps={{ style: { fontSize: 14 } }}
                    />
                    <div>
                        <Button variant="outlined" color="primary"
                            className={classes.addButton}
                        >
                            Add
                        </Button>
                    </div>
                </Container>
                <div className={classes.dataTable}>
                    <TableContainer className={classes.tableContainer}>
                        <Table stickyHeader className="table table-dark" style={{ backgroundColor: '#d0cfcf', border: '1px solid grey' }} >
                            <TableHead>
                                <TableRow hover role="checkbox">
                                    <StyledTableCell align="center">Sr.No</StyledTableCell>
                                    <StyledTableCell align="center">Category</StyledTableCell>
                                    <StyledTableCell align="center">Material Name</StyledTableCell>
                                    <StyledTableCell align="center">Action</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody >
                                <StyledTableRow >
                                    <StyledTableCell className="text-dark" align="center">1.</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">Inventory</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">Item 1</StyledTableCell>
                                    <StyledTableCell className="text-light" align="center">
                                        <><Button variant="contained" className="bg-dark text-light" size="small"
                                            onClick={() => {

                                            }}
                                            style={{ marginTop: 2 }} >
                                            Edit
                                                        </Button>
                                            <Button variant="contained" color="secondary" size="small"
                                                onClick={() => {

                                                }}
                                                style={{ marginLeft: 2, marginTop: 2 }}>
                                                Delete
                                            </Button></>
                                    </StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow >
                                    <StyledTableCell className="text-dark" align="center">2.</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">Purchase</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">Item 2</StyledTableCell>
                                    <StyledTableCell className="text-light" align="center">
                                        <><Button variant="contained" className="bg-dark text-light" size="small"
                                            onClick={() => {

                                            }}
                                            style={{ marginTop: 2 }} >
                                            Edit
                                                        </Button>
                                            <Button variant="contained" color="secondary" size="small"
                                                onClick={() => {

                                                }}
                                                style={{ marginLeft: 2, marginTop: 2 }}>
                                                Delete
                                            </Button></>
                                    </StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow >
                                    <StyledTableCell className="text-dark" align="center">3.</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">Inventory</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">Item 3</StyledTableCell>
                                    <StyledTableCell className="text-light" align="center">
                                        <><Button variant="contained" className="bg-dark text-light" size="small"
                                            onClick={() => {

                                            }}
                                            style={{ marginTop: 2 }} >
                                            Edit
                                                        </Button>
                                            <Button variant="contained" color="secondary" size="small"
                                                onClick={() => {

                                                }}
                                                style={{ marginLeft: 2, marginTop: 2 }}>
                                                Delete
                                            </Button></>
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

export default Material
