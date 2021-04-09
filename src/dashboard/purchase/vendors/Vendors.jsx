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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';


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
        }
    },
    table: {
        minWidth: 600,
    },
    dataTable: {
        marginTop: 40,

    },
}));

const Vendors = () => {
    const classes = useStyles();
    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
        checkedF: true,
        checkedG: true,
      });
    
      const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
      };


    return (
        <Sidenav title={'Vendors'}>
            <div>
                <Container className={classes.mainContainer}>
                    <Grid container spacing={1}>
                        <Grid item lg={1} md={1}></Grid>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <TextField id="outlined-basic"
                                label="Enter Vendor Name"
                                variant="outlined"
                                type="text"
                            />
                        </Grid>
                        <Grid item lg={1} md={1}></Grid>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <TextField id="outlined-basic"
                                label="Email (Optional)"
                                variant="outlined"
                                type="text"
                            />
                        </Grid>
                        <Grid item lg={1} md={1}></Grid>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <TextField id="outlined-basic"
                                label="Phone No."
                                variant="outlined"
                                type="text"
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} style={{ marginTop: 15 }}>
                        <Grid item lg={1} md={1}></Grid>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <TextField id="outlined-basic"
                                label="Address"
                                variant="outlined"
                                type="text"
                            />
                        </Grid>
                        <Grid item lg={1} md={1}></Grid>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <FormControlLabel disabled 
                                              control={
                                                <Checkbox checked name="checkedE" />
                                              } 
                                              label="Material 1" />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                                        name="checkedI"
                                    />
                                }
                                label="Material 2"
                            />
                        </Grid>
                        <Grid item lg={1} md={1}></Grid>
                        <Grid item lg={3} md={3} sm={12} xs={12}>

                        </Grid>
                    </Grid>
                    <div>
                        <Button variant="outlined" color="primary"
                            className={classes.addButton}
                        >
                            Add
                        </Button>
                    </div>
                </Container>
            </div>
        </Sidenav >
    )
}

export default Vendors
