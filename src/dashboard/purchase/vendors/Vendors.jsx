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
        boxShadow: '0.4px 0.4px 0.4px 0.4px grey',
        borderRadius: 5,
        [theme.breakpoints.up('md')]: {
            width: 400,

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
                            <CssTextField id="outlined-basic"
                                className={classes.inputFieldStyle}
                                label="Enter Vendor Name"
                                variant="outlined"
                                type="text"
                                required
                                />
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
                        <Grid item lg={6} md={6} sm={12} xs={12} className={classes.ckeckBox}>
                            <FormControlLabel
                                control={
                                    <GreenCheckbox checked={state.checkedG} onChange={handleChange} name="checkedG"
                                                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                                    />
                                }
                                label="Material 1"
                            />
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
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                                        name="checkedI"
                                    />
                                }
                                label="Material 3"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                                        name="checkedI"
                                    />
                                }
                                label="Material 4"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                                        name="checkedI"
                                    />
                                }
                                label="Material 5"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                                        name="checkedI"
                                    />
                                }
                                label="Material 1"
                            />
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
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                                        name="checkedI"
                                    />
                                }
                                label="Material 3"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                                        name="checkedI"
                                    />
                                }
                                label="Material 4"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                                        name="checkedI"
                                    />
                                }
                                label="Material 5"
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
                <div className={classes.dataTable}>
                    <TableContainer className={classes.tableContainer}>
                        <Table stickyHeader className="table table-dark" style={{ backgroundColor: '#d0cfcf', border: '1px solid grey' }} >
                            <TableHead>
                                <TableRow hover role="checkbox">
                                    <StyledTableCell align="center">Sr.No</StyledTableCell>
                                    <StyledTableCell align="center">Vendor Name</StyledTableCell>
                                    <StyledTableCell align="center">Phone No.</StyledTableCell>
                                    <StyledTableCell align="center">Address</StyledTableCell>
                                    <StyledTableCell align="center">Items</StyledTableCell>
                                    <StyledTableCell align="center">Action</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody >
                                <StyledTableRow >
                                    <StyledTableCell className="text-dark" align="center">1.</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">Asad</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">0303-3030303</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">Kotri Site Area, Hyderabad.</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">Material 1, Material 3, Material 4</StyledTableCell>
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
                                    <StyledTableCell className="text-dark" align="center">Aneeq</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">0303-3030303</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">Kotri Site Area, Hyderabad.</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">Material 1, Material 2, Material 3</StyledTableCell>
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
                                    <StyledTableCell className="text-dark" align="center">Sagheer</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">0303-3030303</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">Kotri Site Area, Hyderabad.</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">Material 2, Material 3, Material 4</StyledTableCell>
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
                                    <StyledTableCell className="text-dark" align="center">4.</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">Arsalan</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">0303-3030303</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">Kotri Site Area, Hyderabad.</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">Material 1, Material 3, Material 4</StyledTableCell>
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
        </Sidenav >
    )
}

export default Vendors
