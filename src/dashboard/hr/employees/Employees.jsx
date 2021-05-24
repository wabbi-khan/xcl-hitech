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

const Employees = ({ history }) => {
    const classes = useStyles();

    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmitData = () => {
        console.log('data submit');
    }

    return (
        <Sidenav title={'Employees'}>
            <div>
                <Container className={classes.mainContainer}>
                    <form onSubmit={handleSubmit(onSubmitData)}>
                        <Grid container spacing={1}>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Name"
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    autocomplete="off"
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("name", { required: true })}
                                >
                                </CssTextField>
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Father Name"
                                    variant="outlined"
                                    type="text"
                                    autocomplete="off"
                                    size="small"
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("fatherName", { required: true, })}
                                >
                                </CssTextField>
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Phone No."
                                    variant="outlined"
                                    type="text"
                                    autocomplete="off"
                                    size="small"
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("phoneNo", { required: true, })}
                                >
                                </CssTextField>
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="CNIC No."
                                    variant="outlined"
                                    type="email"
                                    autocomplete="off"
                                    size="small"
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("cnicNo", { required: true, })}
                                >
                                </CssTextField>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} className="mt-3">
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Email"
                                    variant="outlined"
                                    type="email"
                                    size="small"
                                    autocomplete="off"
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("email", { required: true })}
                                >
                                </CssTextField>
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Address"
                                    variant="outlined"
                                    type="text"
                                    autocomplete="off"
                                    size="small"
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("address", { required: true, })}
                                >
                                </CssTextField>
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Salary"
                                    variant="outlined"
                                    type="text"
                                    autocomplete="off"
                                    size="small"
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("salary", { required: true, })}
                                >
                                </CssTextField>
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    // label="Hiring Date"
                                    variant="outlined"
                                    type="date"
                                    autocomplete="off"
                                    size="small"
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("date", { required: true, })}
                                >
                                </CssTextField>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} className="mt-3">
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Education"
                                    variant="outlined"
                                    type="text"
                                    autocomplete="off"
                                    size="small"
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("email", { required: true, })}
                                >
                                </CssTextField>
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Skills"
                                    variant="outlined"
                                    type="text"
                                    autocomplete="off"
                                    size="small"
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("email", { required: true, })}
                                >
                                </CssTextField>
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Experience"
                                    variant="outlined"
                                    type="email"
                                    autocomplete="off"
                                    size="small"
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("email", { required: true, })}
                                >
                                </CssTextField>
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Department"
                                    variant="outlined"
                                    type="text"
                                    autocomplete="off"
                                    size="small"
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("email", { required: true, })}
                                >
                                </CssTextField>
                                {/* {
                                        !fetchMatCategory.categories || !fetchMatCategory.categories.length ? <p>Data Not Found</p> :
                                            fetchMatCategory.categories.map((category, i) => (
                                                <MenuItem
                                                    value={category._id}
                                                    onClick={(e) => fetchMaterials(category._id)}
                                                    key={i}
                                                >
                                                    {category.name}
                                                </MenuItem>
                                            ))
                                    } */}
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} className="mt-3">
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Designation"
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    autocomplete="off"
                                    select
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("name", { required: true })}
                                >
                                </CssTextField>
                            </Grid>

                            <Grid item lg={3} md={3} sm={6} xs={6} className={classes.ckeckBox}>

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
                                Add
                        </Button>
                        </div>
                    </form>
                </Container>
                <div className={classes.dataTable}>
                    <TableContainer className={classes.tableContainer}>
                        <Table stickyHeader className="table table-dark" style={{ backgroundColor: '#d0cfcf', border: '1px solid grey' }} >
                            <TableHead>
                                <TableRow hover role="checkbox">
                                    <StyledTableCell align="center">Sr.No</StyledTableCell>
                                    <StyledTableCell align="center">Employee Name</StyledTableCell>
                                    <StyledTableCell align="center">Department</StyledTableCell>
                                    <StyledTableCell align="center">Designation</StyledTableCell>
                                    <StyledTableCell align="center">Action</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody >
                                <StyledTableRow >
                                    <StyledTableCell className="text-dark" align="center">1</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">Arsalan</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">Sales</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">Assistant Manager</StyledTableCell>
                                    {/* <StyledTableCell className="text-dark" align="center">
                                        {
                                            !vendor.material || !vendor.material.length ? <p>Not Found</p> :
                                                vendor.material.map((value, i) => (
                                                    <span key={i} className="ml-1">{value.name},</span>
                                                ))
                                        }
                                    </StyledTableCell> */}
                                    <StyledTableCell className="text-light" align="center">
                                        <Button variant="contained" className="bg-dark text-light" size="small"
                                            onClick={() => {
                                                history.push('/hr/employees/view_emp_details')
                                            }}
                                        >
                                            View Report
                                        </Button>
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
            </div>
        </Sidenav>
    )
}

export default Employees
