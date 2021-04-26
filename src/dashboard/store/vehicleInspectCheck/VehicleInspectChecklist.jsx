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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const GreenCheckbox = withStyles({
    root: {
      color: 'black',
      '&$checked': {
        color: 'red',
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

const VehicleInspectChecklist = () => {
    const classes = useStyles();

    return (
        <Sidenav title={'Vehicle Inspection Checklist'}>
            <div>
                <Container className={classes.mainContainer}>
                    <Grid container spacing={1} style={{ marginTop: 15, }} >
                        <Grid item lg={12} md={12} sm={2} xs={2}>
                            <CssTextField id="outlined-basic"
                                label="Select Vehicle"
                                variant="outlined"
                                type="text"
                                size="small"
                                autoComplete="off"
                                required
                                select
                                className={classes.inputFieldStyle}
                                inputProps={{ style: { fontSize: 14 } }}
                                InputLabelProps={{ style: { fontSize: 14 } }}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>ABC-123</MenuItem>
                                <MenuItem value={10}>XYZ-242</MenuItem>
                                <MenuItem value={10}>ASD-442</MenuItem>
                            </CssTextField>
                        </Grid>
                    </Grid>
                </Container>
                <div className={classes.dataTable}>
                    <TableContainer className={classes.tableContainer}>
                        <Table stickyHeader className="table table-dark table-md" style={{ backgroundColor: '#d0cfcf', border: '1px solid grey' }} >
                            <TableHead>
                                <TableRow hover role="checkbox">
                                    <StyledTableCell align="center">Sr.No</StyledTableCell>
                                    <StyledTableCell align="center">Vehicle No.</StyledTableCell>
                                    <StyledTableCell align="center">Driver Name</StyledTableCell>
                                    <StyledTableCell align="center">Fitness Certificate</StyledTableCell>
                                    <StyledTableCell align="center">Reg. Document</StyledTableCell>
                                    <StyledTableCell align="center">Road Tax Paid</StyledTableCell>
                                    <StyledTableCell align="center">Valid Vehicle Ins</StyledTableCell>
                                    <StyledTableCell align="center">Driver's Valid License</StyledTableCell>
                                    <StyledTableCell align="center">Visual Check of Vehicle</StyledTableCell>
                                    <StyledTableCell align="center">Tyre/<br/>Spare</StyledTableCell>
                                    <StyledTableCell align="center">Appropriate Jack</StyledTableCell>
                                    <StyledTableCell align="center">Enough Fuel in the Tank</StyledTableCell>
                                    <StyledTableCell align="center">Sign of Inspector</StyledTableCell>
                                    <StyledTableCell align="center">Action</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody >
                                <StyledTableRow >
                                    <StyledTableCell className="text-dark" align="center">1.</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">ABC-123</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">Arsalan Khan</StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">
                                        <FormControlLabel
                                            style={{ marginTop: -6 }}
                                            label="Yes"
                                            control={<GreenCheckbox
                                                        name="checkedG" 
                                                        // checked={state.checkedG} 
                                                        // onChange={handleChange} 
                                                    />}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">
                                        <FormControlLabel
                                            style={{ marginTop: -6 }}
                                            label="Yes"
                                            control={<GreenCheckbox
                                                        name="checkedG" 
                                                        // checked={state.checkedG} 
                                                        // onChange={handleChange} 
                                                    />}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">
                                        <FormControlLabel
                                            style={{ marginTop: -6 }}
                                            label="Yes"
                                            control={<GreenCheckbox
                                                        name="checkedG" 
                                                        // checked={state.checkedG} 
                                                        // onChange={handleChange} 
                                                    />}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">
                                        <FormControlLabel
                                            style={{ marginTop: -6 }}
                                            label="Yes"
                                            control={<GreenCheckbox
                                                        name="checkedG" 
                                                        // checked={state.checkedG} 
                                                        // onChange={handleChange} 
                                                    />}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">
                                        <FormControlLabel
                                            style={{ marginTop: -6 }}
                                            label="Yes"
                                            control={<GreenCheckbox
                                                        name="checkedG" 
                                                        // checked={state.checkedG} 
                                                        // onChange={handleChange} 
                                                    />}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">
                                        <FormControlLabel
                                            style={{ marginTop: -6 }}
                                            label="Yes"
                                            control={<GreenCheckbox
                                                        name="checkedG" 
                                                        // checked={state.checkedG} 
                                                        // onChange={handleChange} 
                                                    />}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">
                                        <FormControlLabel
                                            style={{ marginTop: -6 }}
                                            label="Yes"
                                            control={<GreenCheckbox
                                                        name="checkedG" 
                                                        // checked={state.checkedG} 
                                                        // onChange={handleChange} 
                                                    />}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">
                                        <FormControlLabel
                                            style={{ marginTop: -6 }}
                                            label="Yes"
                                            control={<GreenCheckbox
                                                        name="checkedG" 
                                                        // checked={state.checkedG} 
                                                        // onChange={handleChange} 
                                                    />}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">
                                        <FormControlLabel
                                            style={{ marginTop: -6 }}
                                            label="Yes"
                                            control={<GreenCheckbox
                                                        name="checkedG" 
                                                        // checked={state.checkedG} 
                                                        // onChange={handleChange} 
                                                    />}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell className="text-dark" align="center">
                                        <FormControlLabel
                                            style={{ marginTop: -6 }}
                                            label="Yes"
                                            control={<GreenCheckbox
                                                        name="checkedG" 
                                                        // checked={state.checkedG} 
                                                        // onChange={handleChange} 
                                                    />}
                                        />
                                    </StyledTableCell>
                                   
                                    <StyledTableCell className="text-light" align="center">
                                        <Button variant="contained" color="secondary" size="small"
                                                onClick={() => {

                                                }}
                                                style={{ marginLeft: 2, marginTop: 2 }}>
                                                Finish
                                        </Button>
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

export default VehicleInspectChecklist
