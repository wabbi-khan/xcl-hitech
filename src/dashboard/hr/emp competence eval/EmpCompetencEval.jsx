import React, { useEffect } from 'react'
import Sidenav from '../../SideNav/Sidenav'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Loading from '../../purchase/material/Loading';
import MaterialError from '../../purchase/material/MaterialError';

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
        marginTop: 20,
        textAlign: 'center'
    },
    addButton: {
        marginTop: 50,
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
            // width: '12%',
        },
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

const EmpCompetencEval = ({ history }) => {
    const classes = useStyles();

    useEffect(async () => {
        // await dispatch(fetchDesignationAction())
    }, [])

    // const { designations, loading, error } = useSelector(state => state.designations)

    const onSubmitDate = async (props) => {

    }

    return (
        <Sidenav title={"Employee's Competency Evaluation"}>
            <div>
                <Container className={classes.mainContainer}>
                    {/* Material category selector */}
                    <Grid container spacing={1}>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <CssTextField id="outlined-basic"
                                label="Select Employee Name"
                                variant="outlined"
                                type="text"
                                size="small"
                                select
                                autocomplete="off"
                                style={{ width: '100%' }}
                                inputProps={{ style: { fontSize: 14 } }}
                                InputLabelProps={{ style: { fontSize: 14 } }}
                            >
                                <MenuItem value="0">Arsalan</MenuItem>
                            </CssTextField>
                        </Grid>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <CssTextField id="outlined-basic"
                                label="Select Department"
                                variant="outlined"
                                type="text"
                                autocomplete="off"
                                size="small"
                                select
                                style={{ width: '100%' }}
                                inputProps={{ style: { fontSize: 14 } }}
                                InputLabelProps={{ style: { fontSize: 14 } }}
                            >
                                <MenuItem>Production</MenuItem>
                            </CssTextField>
                        </Grid>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <CssTextField id="outlined-basic"
                                label="Designation"
                                variant="outlined"
                                type="text"
                                autocomplete="off"
                                size="small"
                                select
                                style={{ width: '100%' }}
                                inputProps={{ style: { fontSize: 14 } }}
                                InputLabelProps={{ style: { fontSize: 14 } }}
                            >
                                <MenuItem>Manager</MenuItem>
                            </CssTextField>
                        </Grid>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <CssTextField id="outlined-basic"
                                label="CNIC No."
                                variant="outlined"
                                type="text"
                                autocomplete="off"
                                size="small"
                                disabled
                                style={{ width: '100%' }}
                                inputProps={{ style: { fontSize: 14 } }}
                                InputLabelProps={{ style: { fontSize: 14 } }}
                            />
                        </Grid>
                    </Grid>
                    <div className='container-fluid' style={{ textAlign: 'left', marginTop: '50px' }}>
                        <h5 style={{ textDecoration: 'underline' }}>Evaluation:</h5>
                        <div className={classes.dataTable}>
                            <TableContainer className={classes.tableContainer}>
                                <Table
                                    stickyHeader
                                    className='table table-dark'
                                    style={{ backgroundColor: '#d0cfcf', border: '1px solid grey' }}>
                                    <TableHead>
                                        <TableRow hover role='checkbox'>
                                            <StyledTableCell align='center'>Sr.No</StyledTableCell>
                                            <StyledTableCell align='center'>Topic</StyledTableCell>
                                            <StyledTableCell align='center'>Topic</StyledTableCell>
                                            <StyledTableCell align='center'>Participants</StyledTableCell>
                                            <StyledTableCell align='center'>Action</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {/* {
                                    loading ? (
                                        <Loading />
                                    ) : error ? (
                                        <MaterialError />
                                    ) : trainings.length ? (
                                        trainings.map((training, i) => ( */}
                                        <StyledTableRow>
                                            <StyledTableCell className='text-dark bg-light' align='center'>
                                                {1}
                                            </StyledTableCell>
                                            <StyledTableCell className='text-dark bg-light' align='center'>
                                                {/* {training.name} */}topic
                                            </StyledTableCell>
                                            <StyledTableCell className='text-dark bg-light' align='center'>
                                                {/* {training.name} */}training venue
                                            </StyledTableCell>
                                            <StyledTableCell className='text-dark bg-light' align='center'>
                                                {/* {training.name} */}training status
                                            </StyledTableCell>
                                            <StyledTableCell className='text-light bg-light' align='center'>
                                                <Button
                                                    variant='contained'
                                                    className='bg-dark text-light'
                                                    size='small'
                                                    onClick={() =>
                                                        history.push('/hr/print_training_plan')
                                                    }
                                                    style={{ marginTop: 2 }}>
                                                    View
                                                </Button>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                        {/* //         ))
                                //     ) : (
                                //         <h5>Not Found</h5>
                                //     )
                            // } */}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </div>
                </Container>
            </div>
        </Sidenav>
    )
}

export default EmpCompetencEval
