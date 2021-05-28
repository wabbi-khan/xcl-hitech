import React, { useState, useEffect } from 'react'
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
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsAction } from '../../../services/action/ProductsAction';
import Loading from '../../purchase/material/Loading';
import MaterialError from '../../purchase/material/MaterialError';
import axios from 'axios';
import EditProducts from './EditProducts';
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

const Products = () => {
    const [product, setproduct] = useState('')

    const classes = useStyles();

    const { register, handleSubmit, formState: { errors } } = useForm()

    const dispatch = useDispatch()

    useEffect(async () => {
        await dispatch(fetchProductsAction())
    }, [dispatch])

    const { loading, products, error } = useSelector(state => state.products)

    const onSubmitDate = async (props) => {
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/product`, props)
            window.location.reload()
            console.log('submit');
        }
        catch (error) {
            console.log(error);
        }
    }

    const deleteProduct = async (params) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/product/${params}`)
            window.location.reload()
        }
        catch (error) {
            console.log(error);
        }

    }

    const [open, setOpen] = useState(false);

    const handleClose = (props) => {
        setOpen(props);
    }

    const handleOpen = async (product) => {
        setproduct(product)
        setOpen(true);
    }

    return (
        <Sidenav title={'Products'}>
            {/* ============products form component */}
            <EditProducts
                show={open}
                handler={handleClose}
                product={product}
            />
            {/* ============products form component */}
            <div>
                <form action="" onSubmit={handleSubmit(onSubmitDate)}>
                    <Container className={classes.mainContainer}>
                        <Grid container spacing={1} style={{ marginTop: 15, }} >
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Category"
                                    variant="outlined"
                                    type="email"
                                    size="small"
                                    autoComplete="off"
                                    value="Finished"
                                    disabled
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                />
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Product Name"
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    autoComplete="off"
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("name", { required: true })}

                                />
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Product Code"
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    autoComplete="off"
                                    className={classes.inputFieldStyle1}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("productCode", { required: true })}

                                />
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Min. Inventory Level"
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    autoComplete="off"
                                    className={classes.inputFieldStyle1}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("minInventoryLevel", { required: true })}

                                />
                            </Grid>
                        </Grid>
                    </Container>
                    <Container className={classes.mainContainer}>
                        <Grid container spacing={1} style={{ marginTop: 15, }} >
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Remarks"
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    autoComplete="off"
                                    className={classes.inputFieldStyle1}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("remarks", { required: true })}

                                />
                            </Grid>

                        </Grid>
                        <div>
                            <Button variant="outlined" color="primary"
                                type="submit"
                                className={classes.addButton}
                            >
                                Add
                        </Button>
                        </div>
                    </Container>
                </form>
                <div className={classes.dataTable}>
                    <TableContainer className={classes.tableContainer}>
                        <Table stickyHeader className="table table-dark table-md" style={{ backgroundColor: '#d0cfcf', border: '1px solid grey' }} >
                            <TableHead>
                                <TableRow hover role="checkbox">
                                    <StyledTableCell align="center">Sr.No</StyledTableCell>
                                    <StyledTableCell align="center">Product Category</StyledTableCell>
                                    <StyledTableCell align="center">Product Name</StyledTableCell>
                                    <StyledTableCell align="center">Product Code</StyledTableCell>
                                    <StyledTableCell align="center">Min Inventory Level</StyledTableCell>
                                    <StyledTableCell align="center">Remarks</StyledTableCell>
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
                                                products.length ?
                                                    products.map((product, i) => (
                                                        <StyledTableRow key={i}>
                                                            <StyledTableCell className="text-dark" align="center">{i + 1}</StyledTableCell>
                                                            <StyledTableCell className="text-dark" align="center">
                                                                Finished
                                                            </StyledTableCell>
                                                            <StyledTableCell className="text-dark" align="center">{product.name}</StyledTableCell>
                                                            <StyledTableCell className="text-dark" align="center">{product.productCode}</StyledTableCell>
                                                            <StyledTableCell className="text-dark" align="center">{product.minInventoryLevel}</StyledTableCell>
                                                            <StyledTableCell className="text-dark" align="center">{product.remarks}</StyledTableCell>
                                                            <StyledTableCell className="text-light" align="center">
                                                                <><Button variant="contained" className="bg-dark text-light" size="small"
                                                                    onClick={() =>
                                                                        handleOpen(product)
                                                                    }
                                                                    style={{ marginTop: 2 }} >
                                                                    Edit
                                                                </Button>
                                                                    <Button variant="contained" color="secondary" size="small"
                                                                        onClick={() =>
                                                                            deleteProduct(product._id)
                                                                        }
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

export default Products
