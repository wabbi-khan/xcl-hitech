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
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import { useForm } from 'react-hook-form';


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
            width: '7%',
        },
        [theme.breakpoints.down('sm')]: {
            width: '10%',
        },
    },
    submitBtn: {
        color: '#22A19A',
        borderColor: '#22A19A',
        fontWeight: 'bold',
        marginTop: 20,
        '&:hover': {
            border: 'none',
            backgroundColor: '#22A19A',
            color: 'whitesmoke',
        },
        [theme.breakpoints.up('md')]: {
            width: '30%',
        },
        [theme.breakpoints.down('sm')]: {
            width: '10%',
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

const AddEmpAttendance = () => {
    const classes = useStyles();

    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmitData = () => {
        console.log('data submit');
    }

    return (
        <Sidenav title={'Add Employees Attendance'}>
            <div>
                <Container className={classes.mainContainer}>
                    <form onSubmit={handleSubmit(onSubmitData)}>
                        <Grid container spacing={1}>
                            <Grid item lg={4} md={4} sm={12} xs={12}></Grid>
                            <Grid item lg={4} md={4} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    // label="Select Date"
                                    variant="outlined"
                                    type="date"
                                    size="small"
                                    autocomplete="off"
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("name", { required: true })}
                                >
                                </CssTextField>
                            </Grid>
                        </Grid>
                        <div>
                            <Button
                                variant="outlined"
                                color="primary"
                                type="submit"
                                className={classes.addButton}
                                onClick={() => {
                                    // history.push('')
                                }}
                            >
                                Go
                            </Button>
                        </div>
                        <div className={classes.dataTable}>
                            <TableContainer className={classes.tableContainer}>
                                <Table stickyHeader className="table table-dark" style={{ backgroundColor: '#d0cfcf', border: '1px solid grey' }} >
                                    <TableHead>
                                        <TableRow hover role="checkbox">
                                            <StyledTableCell align="center">Sr.No</StyledTableCell>
                                            <StyledTableCell align="center">Employee Name</StyledTableCell>
                                            <StyledTableCell align="center">Date</StyledTableCell>
                                            <StyledTableCell align="center">Present/Absent</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody >
                                        <StyledTableRow >
                                            <StyledTableCell className="text-dark" align="center">1</StyledTableCell>
                                            <StyledTableCell className="text-dark" align="center">Arsalan</StyledTableCell>
                                            <StyledTableCell className="text-dark" align="center">24-5-21</StyledTableCell>
                                            {/* <StyledTableCell className="text-dark" align="center">
                                        {
                                            !vendor.material || !vendor.material.length ? <p>Not Found</p> :
                                                vendor.material.map((value, i) => (
                                                    <span key={i} className="ml-1">{value.name},</span>
                                                ))
                                        }
                                    </StyledTableCell> */}
                                            <StyledTableCell className="text-light" align="center">
                                                <><Button 
                                                    variant="contained" 
                                                    className="bg-danger text-light" size="small"
                                                    onClick={() => {

                                                    }}
                                                >
                                                    Present
                                                </Button>
                                                <Button 
                                                    variant="contained" 
                                                    className="bg-light text-dark ml-1" size="small"
                                                    onClick={() => {

                                                    }}
                                                >
                                                    Absent
                                                </Button></>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                        {/* {
                                    loading ? (
                                        <Loading />
                                    ) :
                                        error ? (
                                            <MaterialError />
                                        ) :
                                            (
                                                !vendors || !vendors.length ? <p>Not Found</p> :
                                                    vendors.map((vendor, i) => (
                                                        <StyledTableRow key={i}>
                                                            <StyledTableCell className="text-dark" align="center">{i + 1}</StyledTableCell>
                                                            <StyledTableCell className="text-dark" align="center">{vendor.name}</StyledTableCell>
                                                            <StyledTableCell className="text-dark" align="center">{vendor.phone}</StyledTableCell>
                                                            <StyledTableCell className="text-dark" align="center">{vendor.location}</StyledTableCell>
                                                            <StyledTableCell className="text-dark" align="center">{vendor.category.name}</StyledTableCell>
                                                            <StyledTableCell className="text-dark" align="center">
                                                                {
                                                                    !vendor.material || !vendor.material.length ? <p>Not Found</p> :
                                                                        vendor.material.map((value, i) => (
                                                                            <span key={i} className="ml-1">{value.name},</span>
                                                                        ))
                                                                }
                                                            </StyledTableCell>
                                                            <StyledTableCell className="text-light" align="center">
                                                                <><Button variant="contained" className="bg-dark text-light" size="small"
                                                                    onClick={() => {

                                                                    }}
                                                                    style={{ marginTop: 2 }} >
                                                                    Edit
                                                                </Button>
                                                                    <Button variant="contained" color="secondary" size="small"
                                                                        onClick={() => deleteMaterial(vendor._id)}
                                                                        style={{ marginLeft: 2, marginTop: 2 }}>
                                                                        Delete
                                                                    </Button></>
                                                            </StyledTableCell>
                                                        </StyledTableRow>
                                                    ))
                                            )
                                } */}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                        <Grid container spacing={1}>
                            <Grid item lg={4} md={4} sm={12} xs={12}></Grid>
                            <Grid item lg={4} md={4} sm={12} xs={12}>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    type="submit"
                                    className={classes.submitBtn}
                                    onClick={() => {
                                        
                                    }}
                                >
                                    Finished
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </div>
        </Sidenav>
    )
}

export default AddEmpAttendance
