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

const Employees = () => {
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
                                    label="Select Designation"
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
                                    <MenuItem value="0"
                                    // value={category._id}
                                    // onClick={(e) => fetchMaterials(category._id)}
                                    // key={i}
                                    >
                                        Manager
                                    </MenuItem>
                                    <MenuItem value="1" >
                                        Assistant Manager
                                    </MenuItem>
                                    <MenuItem value="2" >
                                        Head of Department
                                    </MenuItem>
                                </CssTextField>
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Education"
                                    variant="outlined"
                                    type="text"
                                    autocomplete="off"
                                    size="small"
                                    select
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("email", { required: true, })}
                                >
                                    <MenuItem value="0">
                                        PHD
                                    </MenuItem>
                                    <MenuItem value="1">
                                        Masters
                                    </MenuItem>
                                    <MenuItem value="2">
                                        Bachelors
                                    </MenuItem>
                                    <MenuItem value="3">
                                        Diploma
                                    </MenuItem>
                                </CssTextField>
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Skills"
                                    variant="outlined"
                                    type="text"
                                    autocomplete="off"
                                    size="small"
                                    select
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("email", { required: true, })}
                                >
                                    <MenuItem value="0">
                                        Accounting
                                    </MenuItem>
                                    <MenuItem value="1">
                                        Sales Expert
                                    </MenuItem>
                                </CssTextField>
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Experience"
                                    variant="outlined"
                                    type="email"
                                    autocomplete="off"
                                    size="small"
                                    select
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("email", { required: true, })}
                                >
                                    <MenuItem value="0">
                                        Fresher
                                    </MenuItem>
                                    <MenuItem value="1">
                                        0-2 years
                                    </MenuItem>
                                    <MenuItem value="2">
                                        2-4 years
                                    </MenuItem>
                                    <MenuItem value="3">
                                        4-6 years
                                    </MenuItem>
                                    <MenuItem value="4">
                                        6-8 years
                                    </MenuItem>
                                    <MenuItem value="5">
                                        8-10 years
                                    </MenuItem>
                                </CssTextField>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} style={{ marginTop: 8, }}>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <CssTextField id="outlined-basic"
                                    label="Training (Optional)"
                                    variant="outlined"
                                    type="text"
                                    autocomplete="off"
                                    size="small"
                                    select
                                    className={classes.inputFieldStyle}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                    {...register("email", { required: true, })}
                                >
                                    <MenuItem value="0">
                                        Training 01
                                    </MenuItem>
                                    <MenuItem value="1" >
                                        Training 02
                                    </MenuItem>
                                    <MenuItem value="2" >
                                        Training 03
                                    </MenuItem>
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
            </div>
        </Sidenav>
    )
}

export default Employees
