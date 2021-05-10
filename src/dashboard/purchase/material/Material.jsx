import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
import { getMaterialAction } from '../../../services/action/MaterialDataHandle';
import { getMaterialCategoryAction } from '../../../services/action/MatCategoryAction';
import MaterialError from './MaterialError';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Loading from './Loading';
import EditMaterial from './EditMaterial';


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

const Material = () => {
    // For Add and Delete
    const [MaterialCategory, setMaterialCategory] = useState('')
    const [MaterialName, setMaterialName] = useState('')
    const [IsUpdate, setIsUpdate] = useState(false)
    const [MaterialId, setMaterialId] = useState('')
    const [AddMatError, setAddMatError] = useState(false)
    const [AddMatErrMsg, setAddMatErrMsg] = useState('internal server error')

    const classes = useStyles();
    const { register, handleSubmit, formState: { errors } } = useForm()

    const dispatch = useDispatch()

    const onSubmitDate = async (props) => {
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/material`, props)
            // console.log('try');
            window.location.reload()
            setAddMatError(false)
        }
        catch (error) {
            setAddMatError(true)
            // setAddMatErrMsg(error.error)
            console.log(error);
            // console.log('catch');

        }
    }

    useEffect(async () => {
        await dispatch(getMaterialAction())
        await dispatch(getMaterialCategoryAction())
    }, [dispatch])


    const { loading, materials, error } = useSelector(state => state.materials)
    const fetchMatCategory = useSelector(state => state.categories)
    // console.log(loading);
    // console.log(materials);
    // console.log(error);

    const deleteMaterial = async (params) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/material/${params}`)
            window.location.reload()
        }
        catch (error) {
            console.log(error);
            console.log('catch');
        }

    }

    const [open, setOpen] = useState(false);

    const handleOpen = async (material) => {

        const { _id, name, category } = material
        setMaterialId(_id)
        setMaterialName(name)
        setMaterialCategory(category._id)
        setIsUpdate(true)
        setOpen(true);
    };

    return (
        <Sidenav title={'Material'}>
            <div>
                <Container className={classes.mainContainer}>
                    <form action="" onSubmit={handleSubmit(onSubmitDate)}>
                        <CssTextField id="outlined-basic"
                            label="Select Category"
                            variant="outlined"
                            type="text"
                            autocomplete="off"
                            size="small"
                            select
                            // onChange={(e) =>
                            //     setMaterialCategory(e.target.value)
                            // }
                            className={classes.inputFieldStyle}
                            inputProps={{ style: { fontSize: 14 } }}
                            InputLabelProps={{ style: { fontSize: 14 } }}
                            {...register("category", { required: true })}
                        >
                            {
                                !fetchMatCategory.categories || !fetchMatCategory.categories.length ? <p>Data Not Found</p> :
                                    fetchMatCategory.categories.map(category => (
                                        <MenuItem value={category._id} key={category._id}>{category.name}</MenuItem>
                                    ))
                            }
                        </CssTextField>
                        <CssTextField id="outlined-basic"
                            label="Enter Material Name"
                            variant="outlined"
                            type="text"
                            autocomplete="off"
                            size="small"
                            autoComplete="off"
                            className={classes.inputFieldStyle1}
                            inputProps={{ style: { fontSize: 14 } }}
                            InputLabelProps={{ style: { fontSize: 14 } }}
                            {...register("name", { required: true, minLength: 1, maxLength: 30 })}
                        />
                        <br />
                        {
                            errors.category?.type === 'required' && <p className="mt-3 text-danger">Category must be required</p> 
                        }
                        <br />
                        {
                            errors.name?.type === 'required' && <p className="text-danger">Material name is required</p>
                        }
                        <br />
                        {
                            errors.name?.type === 'maxLength' && <p className="text-danger">Length must be less than 30</p>
                        }
                        {/* {
                            AddMatError ? <p className="mt-3 text-danger"> {AddMatErrMsg}</p>  : null
                        } */}
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
                <EditMaterial show={open} fetchMatCategory={fetchMatCategory} materialId={MaterialId} materialName={MaterialName} materialCategory={MaterialCategory} />
                <div className={classes.dataTable}>
                    <TableContainer className={classes.tableContainer}>
                        <Table stickyHeader className="table table-dark" style={{ backgroundColor: '#d0cfcf', border: '1px solid grey' }} >
                            <TableHead>
                                <TableRow hover role="checkbox">
                                    <StyledTableCell align="center">Sr.No</StyledTableCell>
                                    <StyledTableCell align="center">Category</StyledTableCell>
                                    <StyledTableCell align="center">Material Name</StyledTableCell>
                                    <StyledTableCell align="center">Action</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody >
                                {
                                    loading ? (
                                        <Loading />
                                    ) :
                                        error ? (
                                            <MaterialError />
                                        ) :
                                            (
                                                materials.length ?
                                                    materials.map((material, i) => (
                                                        <StyledTableRow key={i}>
                                                            <StyledTableCell className="text-dark" align="center">{i + 1}</StyledTableCell>
                                                            <StyledTableCell className="text-dark" align="center">{material.category.name}</StyledTableCell>
                                                            <StyledTableCell className="text-dark" align="center">{material.name}</StyledTableCell>
                                                            <StyledTableCell className="text-light" align="center">
                                                                <><Button variant="contained" className="bg-dark text-light" size="small"
                                                                    onClick={() =>
                                                                        handleOpen(material)
                                                                    }
                                                                    style={{ marginTop: 2 }} >
                                                                    Edit
                                                                </Button>
                                                                    <Button variant="contained" color="secondary" size="small"
                                                                        onClick={() => deleteMaterial(material._id)}
                                                                        style={{ marginLeft: 2, marginTop: 2 }}>
                                                                        Delete
                                                                </Button></>
                                                            </StyledTableCell>
                                                        </StyledTableRow>

                                                    ))
                                                    : <h5>not found</h5>
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

export default Material
