import React, { useState, useEffect } from 'react'
import Sidenav from '../../SideNav/Sidenav'
import { useDispatch, useSelector } from 'react-redux'
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
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Loading from '../material/Loading';
import MaterialError from '../material/MaterialError';
import { getMaterialCategoryAction } from '../../../services/action/MatCategoryAction';
import { createDepartmentAction, deleteDepartmentAction, fetchDepartmentsAction } from '../../../services/action/DepartmentAction';
import EditDepartment from './EditDepartment';


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
        },
        [theme.breakpoints.up('md')]: {
            width: '10%',
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

const Department = () => {
    const classes = useStyles();
    const [dept, setDept] = useState()

    const { register, handleSubmit, formState: { errors } } = useForm()

    const dispatch = useDispatch()

    useEffect(async () => {
        await dispatch(fetchDepartmentsAction())
    }, [dispatch])

    const { departments, loading, error } = useSelector(state => state.departments)

    const onSubmitDate = async (props) => {
        dispatch(createDepartmentAction(props))
        // try {
        //     await axios.post(`${process.env.REACT_APP_API_URL}/department`, props)
        //     window.location.reload()
        //     console.log('submit');
        //     // setAddMatError(false)
        // }
        // catch (error) {
        //     console.log(error);
        //     // setAddMatError(true)
        // }
    }

    const [open, setOpen] = useState(false);

    const handleClose = (props) => {
        setOpen(props);
    }

    const handleOpen = async (department) => {
        setDept(department);
        setOpen(true);
    }

    const deleteDept = async (params) => {
        dispatch(deleteDepartmentAction(params))
        // try {
        //     await axios.delete(`${process.env.REACT_APP_API_URL}/department/${params}`)
        //     window.location.reload()
        // }
        // catch (error) {
        //     console.log(error);
        //     console.log('catch');
        // }
    }

    return (
        <Sidenav title={'Departments'}>
            {/* ============Edit Category form component */}
            <EditDepartment
                show={open}
                handler={handleClose}
                // categories={categories}
                department={dept}
            />
            {/* ============Edit category form component */}
            <div>
                <Container className={classes.mainContainer}>
                    <form action="" onSubmit={handleSubmit(onSubmitDate)}>
                        {/* Material category selector */}
                        <CssTextField id="outlined-basic"
                            label="Department Name*"
                            variant="outlined"
                            type="text"
                            size="small"
                            autocomplete="off"
                            className={classes.inputFieldStyle}
                            inputProps={{ style: { fontSize: 14 } }}
                            InputLabelProps={{ style: { fontSize: 14 } }}
                            {...register("name", { required: true })}
                        />
                        {/* {
                                !categories || !categories.length ? <p>Data Not Found</p> :
                                    categories.map(category => (
                                        <MenuItem value={category._id} key={category._id}>{category.name}</MenuItem>
                                    ))
                            } */}
                        {
                            errors.name?.type === 'required' && <p className='mt-3 text-danger'>Department Name must be required</p>
                        }
                        <div>
                            <Button variant="outlined" color="primary"
                                type="submit"
                                className={classes.addButton}
                            >
                                Add
                            </Button>
                        </div>
                    </form>
                </Container>
                {
                    error && <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>
                }
                <div className={classes.dataTable}>
                    <TableContainer className={classes.tableContainer}>
                        <Table stickyHeader className="table table-dark" style={{ backgroundColor: '#d0cfcf', border: '1px solid grey' }} >
                            <TableHead>
                                <TableRow hover role="checkbox">
                                    <StyledTableCell align="center">Sr.No</StyledTableCell>
                                    <StyledTableCell align="center">Departments</StyledTableCell>
                                    <StyledTableCell align="center">Action</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody >
                                {
                                    loading ? (
                                        <Loading />
                                    ) :
                                        (
                                            departments &&
                                                departments.length ?
                                                departments.map((department, i) => (
                                                    <StyledTableRow key={i}>
                                                        <StyledTableCell className="text-dark" align="center">{i + 1}</StyledTableCell>
                                                        <StyledTableCell className="text-dark" align="center">{department.name}</StyledTableCell>
                                                        <StyledTableCell className="text-light" align="center">
                                                            <><Button variant="contained" className="bg-dark text-light" size="small"
                                                                onClick={() =>
                                                                    handleOpen(department)
                                                                }
                                                                style={{ marginTop: 2 }} >
                                                                Edit
                                                            </Button>
                                                                <Button variant="contained" color="secondary" size="small"
                                                                    onClick={() => deleteDept(department._id)}
                                                                    style={{ marginLeft: 2, marginTop: 2 }}>
                                                                    Delete
                                                                </Button></>
                                                        </StyledTableCell>
                                                    </StyledTableRow>
                                                ))
                                                : <h5>Not Found</h5>
                                        )
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </Sidenav>
    )
}

export default Department
