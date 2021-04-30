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
import MenuItem from '@material-ui/core/MenuItem';
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

const GoodReceived = ( { history } ) => {
    const classes = useStyles();

    return (
        <Sidenav title={'Good Received and Inspection Report'}>
            <div>
                <Container className={classes.mainContainer}>
                    <Grid container spacing={1} style={{ marginTop: 15, }} >
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <CssTextField id="outlined-basic"
                                // label="Product Name"
                                variant="outlined"
                                type="datetime-local"
                                size="small"
                                autoComplete="off"
                                required
                                className={classes.inputFieldStyle}
                                inputProps={{ style: { fontSize: 14 } }}
                                InputLabelProps={{ style: { fontSize: 14 } }}
                            >
                            </CssTextField>
                        </Grid>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <CssTextField id="outlined-basic"
                                label="P.R. No."
                                variant="outlined"
                                type="text"
                                size="small"
                                autoComplete="off"
                                className={classes.inputFieldStyle1}
                                inputProps={{ style: { fontSize: 14 } }}
                                InputLabelProps={{ style: { fontSize: 14 } }}
                            >
                            </CssTextField>
                        </Grid>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <CssTextField id="outlined-basic"
                                label="P.O. No."
                                variant="outlined"
                                type="text"
                                size="small"
                                autoComplete="off"
                                className={classes.inputFieldStyle1}
                                inputProps={{ style: { fontSize: 14 } }}
                                InputLabelProps={{ style: { fontSize: 14 } }}
                            />
                        </Grid>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <CssTextField id="outlined-basic"
                                label="Received From"
                                variant="outlined"
                                type="text"
                                size="small"
                                select
                                autoComplete="off"
                                className={classes.inputFieldStyle1}
                                inputProps={{ style: { fontSize: 14 } }}
                                InputLabelProps={{ style: { fontSize: 14 } }}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Arsalan</MenuItem>
                                <MenuItem value={20}>Sagheer</MenuItem>
                                <MenuItem value={20}>Aneeq</MenuItem>
                            </CssTextField>
                        </Grid>
                    </Grid>
                </Container>
                <Container className={classes.mainContainer}>
                    <Grid container spacing={1} style={{ marginTop: 15, }} >
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <CssTextField id="outlined-basic"
                                label="Description"
                                variant="outlined"
                                type="text"
                                size="small"
                                autoComplete="off"
                                className={classes.inputFieldStyle1}
                                inputProps={{ style: { fontSize: 14 } }}
                                InputLabelProps={{ style: { fontSize: 14 } }}
                            />
                        </Grid>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <CssTextField id="outlined-basic"
                                label="Department"
                                variant="outlined"
                                type="text"
                                size="small"
                                select
                                autoComplete="off"
                                className={classes.inputFieldStyle1}
                                inputProps={{ style: { fontSize: 14 } }}
                                InputLabelProps={{ style: { fontSize: 14 } }}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Purchase</MenuItem>
                                <MenuItem value={20}>Sales</MenuItem>
                            </CssTextField>
                        </Grid>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <CssTextField id="outlined-basic"
                                label="Unit"
                                variant="outlined"
                                type="text"
                                size="small"
                                autoComplete="off"
                                className={classes.inputFieldStyle1}
                                inputProps={{ style: { fontSize: 14 } }}
                                InputLabelProps={{ style: { fontSize: 14 } }}
                            />
                        </Grid>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <CssTextField id="outlined-basic"
                                label="Quantity"
                                variant="outlined"
                                type="text"
                                size="small"
                                autoComplete="off"
                                className={classes.inputFieldStyle1}
                                inputProps={{ style: { fontSize: 14 } }}
                                InputLabelProps={{ style: { fontSize: 14 } }}
                            />
                        </Grid>
                    </Grid>
                </Container>
                <Container className={classes.mainContainer}>
                    <Grid container spacing={1} style={{ marginTop: 15, }} >
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <CssTextField id="outlined-basic"
                                label="Status of Inspection"
                                variant="outlined"
                                type="text"
                                size="small"
                                select
                                autoComplete="off"
                                className={classes.inputFieldStyle1}
                                inputProps={{ style: { fontSize: 14 } }}
                                InputLabelProps={{ style: { fontSize: 14 } }}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Accepted</MenuItem>
                                <MenuItem value={20}>Rejected</MenuItem>
                                <MenuItem value={20}>Signature</MenuItem>
                            </CssTextField>
                        </Grid>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <CssTextField id="outlined-basic"
                                label="Remarks"
                                variant="outlined"
                                type="text"
                                size="small"
                                autoComplete="off"
                                className={classes.inputFieldStyle1}
                                inputProps={{ style: { fontSize: 14 } }}
                                InputLabelProps={{ style: { fontSize: 14 } }}
                            />
                        </Grid>
                    </Grid>
                    <div>
                        <Button variant="outlined" color="primary"
                                className={classes.addButton}
                                onClick={() => {
                                    history.push('/storedashboard/good_received_and_inspection_report/good_rec_inspection_print')
                                }}
                        >
                            Add
                        </Button>
                    </div>
                </Container>
                <div className={classes.dataTable}>
                    <TableContainer className={classes.tableContainer}>
                        <Table stickyHeader className="table table-dark table-md" style={{ backgroundColor: '#d0cfcf', border: '1px solid grey' }} >
                            <TableHead>
                                <TableRow hover role="checkbox">
                                    <StyledTableCell align="center">Sr.No</StyledTableCell>
                                    <StyledTableCell align="center">Date/Time</StyledTableCell>
                                    <StyledTableCell align="center">P.R. No.</StyledTableCell>
                                    <StyledTableCell align="center">P.O. No.</StyledTableCell>
                                    <StyledTableCell align="center">Received From</StyledTableCell>
                                    <StyledTableCell align="center">Description</StyledTableCell>
                                    <StyledTableCell align="center">Department</StyledTableCell>
                                    <StyledTableCell align="center">Unit</StyledTableCell>
                                    <StyledTableCell align="center">Qty</StyledTableCell>
                                    <StyledTableCell align="center">Status of Inspection</StyledTableCell>
                                    <StyledTableCell align="center">Remarks</StyledTableCell>
                                    <StyledTableCell align="center">Action</StyledTableCell>
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
                                    <StyledTableCell className="text-dark" align="center">Purchase</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">23</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">240</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">Accepted</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">Good</StyledTableCell>
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

export default GoodReceived
