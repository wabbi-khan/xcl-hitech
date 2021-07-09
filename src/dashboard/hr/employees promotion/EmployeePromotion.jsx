import React, { useEffect } from 'react'
import Sidenav from '../../SideNav/Sidenav'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';

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

const EmployeePromotion = ({ history }) => {
    const classes = useStyles();

    useEffect(async () => {
        // await dispatch(fetchDesignationAction())
    }, [])

    // const { designations, loading, error } = useSelector(state => state.designations)

    const onSubmitDate = async (props) => {

    }

    return (
        <Sidenav title={'Employees Promotion'}>
            <div>
                <Container className={classes.mainContainer}>
                    {/* Material category selector */}
                    <Grid container spacing={1}>
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
                                label="Select Employee"
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
                                label="Promote To"
                                variant="outlined"
                                type="text"
                                size="small"
                                autocomplete="off"
                                style={{ width: '100%' }}
                                inputProps={{ style: { fontSize: 14 } }}
                                InputLabelProps={{ style: { fontSize: 14 } }}
                            />
                        </Grid>
                    </Grid>
                    <div>
                        <Button
                            variant="outlined"
                            color="primary"
                            type="submit"
                            className={classes.addButton}
                            onClick={() =>
                                history.push('/hr/print_emp_competency_evaluation')
                            }
                        >
                            Submit
                        </Button>
                    </div>
                    <div className='container-fluid' style={{ textAlign: 'left', marginTop: '50px' }}>
                        <table class="table table-responsive table-hover table-striped table-bordered border-dark text-center mt-3">
                            <thead class="bg-dark text-light">
                                <tr>
                                    <th>S. No.</th>
                                    <th>Employee Name</th>
                                    <th>Department</th>
                                    <th>Designation</th>
                                    <th>Promote To</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1.</td>
                                    <td>Arsalan</td>
                                    <td>Purchase</td>
                                    <td>Assistant Manager</td>
                                    <td>Manager</td>
                                    <td>
                                        <>
                                            <Button
                                                variant='contained'
                                                className='bg-dark text-light'
                                                size='small'
                                                // onClick={() => handleOpen(edu)}
                                                style={{ marginTop: 2 }}>
                                                Edit
                                            </Button>
                                            <Button
                                                variant='contained'
                                                color='secondary'
                                                size='small'
                                                // onClick={() => deleteCategory(edu._id)}
                                                style={{ marginLeft: 2, marginTop: 2 }}>
                                                Delete
                                            </Button>
                                        </>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Container>
            </div>
        </Sidenav>
    )
}

export default EmployeePromotion
