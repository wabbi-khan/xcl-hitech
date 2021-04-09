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
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';


const GreenCheckbox = withStyles({
    root: {
        //   color: black[400],
        '&$checked': {
            // color: green[600],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

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
    ckeckBox: {
        [theme.breakpoints.up('md')]: {
            marginLeft: 25,
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
        },
    },
    inputFieldStyle: {
        [theme.breakpoints.up('md')]: {
            width: 400,

        },
        [theme.breakpoints.down('sm')]: {
            width: 200,

        },
    },
    select: {
        "&:before": {
            borderColor: "red"
        },
        '&:before': {
            borderColor: 'red',
        },
        '&:hover:not(.Mui-disabled):before': {
            borderColor: 'red',
        },
        [theme.breakpoints.up('md')]: {
            width: 400,

        },
        [theme.breakpoints.down('sm')]: {
            width: 200,

        },
    }
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
const select = withStyles({
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

})(Select);

const SupplierEvalForm = () => {
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
        <Sidenav title={'Supplier Evaluation Form'}>
            <div>
                <h4 className="text-center">Section-A (Company Data)</h4>
                <Container className={classes.mainContainer}>
                    <Grid container spacing={1} style={{ marginTop: 15, backgroundColor: 'grey', marginLeft: 'auto', marginRight: 'auto'}}>

                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <CssTextField id="outlined-basic"
                                label="Select Vendor Name"
                                variant="outlined"
                                type="email"
                                className={classes.inputFieldStyle}
                                select
                                required
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Asad</MenuItem>
                                <MenuItem value={20}>Aneeq</MenuItem>
                                <MenuItem value={30}>Sagheer</MenuItem>
                                <MenuItem value={30}>Arsalan</MenuItem>
                            </CssTextField>
                        </Grid>
                        <Grid item lg={1} md={1}></Grid>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <CssTextField id="outlined-basic"
                                label="Email (Optional)"
                                variant="outlined"
                                type="email"
                                className={classes.inputFieldStyle}
                            />
                        </Grid>
                        <Grid item lg={1} md={1}></Grid>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <CssTextField id="outlined-basic"
                                className={classes.inputFieldStyle}
                                label="Phone No."
                                variant="outlined"
                                type="text"
                                required
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} style={{ marginTop: 15 }}>
                        <Grid item lg={1} md={1}></Grid>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <CssTextField id="outlined-basic"
                                className={classes.inputFieldStyle}
                                label="Address"
                                variant="outlined"
                                type="text"
                                required
                            />
                        </Grid>
                        <Grid item lg={1} md={1}></Grid>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <CssTextField id="outlined-basic"
                                className={classes.inputFieldStyle}
                                label="Address"
                                variant="outlined"
                                type="text"
                                required
                            />
                        </Grid>
                    </Grid>
                    <div>
                        <Button variant="outlined" color="primary"
                            className={classes.addButton}
                        >
                            Add Vendor
                        </Button>
                    </div>
                </Container>
            </div>
        </Sidenav>
    )
}

export default SupplierEvalForm
