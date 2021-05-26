import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { getSpecCatMatAction } from '../../../services/action/MaterialDataHandle';



const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        height: 'auto',
        width: '80%'
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
    inputFieldStyle: {
        [theme.breakpoints.up('md')]: {
            width: 330,
        },
        [theme.breakpoints.down('sm')]: {
            width: 200,
        },
    },
    inputFieldStyle1: {
        marginTop: 10,
        [theme.breakpoints.up('md')]: {
            width: 330,

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

const EditVendor = (props) => {

    const classes = useStyles();
    const dispatch = useDispatch()

    const { show, handler, vendor, categories } = props

    const [open, setOpen] = useState(false);
    const [materialsSelect, setMaterialsSelect] = useState([])

    const { register, handleSubmit, formState: { errors } } = useForm()

    const { materials } = useSelector(state => state.materials)

    useEffect(() => {
        setOpen(show)
        console.log(materialsSelect);
    }, [show, materialsSelect])

    const handleClose = () => {
        handler(false)
    }

    const onSubmitData = (data) => {
        console.log("onSubmit");
        console.log(data);
    }

    const fetchMaterials = async (id) => {
        setMaterialsSelect([])
        await dispatch(getSpecCatMatAction(id))
    }

    const getMaterials = async (event) => {
        // console.log(event.target);
        if (event.target.checked) {
            setMaterialsSelect([...materialsSelect, event.target.value])
        }
        if (event.target.checked === false) {
            setMaterialsSelect(materialsSelect.filter((value) => value !== event.target.value))
        }
    }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <h5 className="text-center mt-4">Edit Vendor</h5>
                        <Container className={classes.mainContainer}>
                            {/* ========================================= */}
                            {
                                vendor ? (
                                    <form onSubmit={handleSubmit(onSubmitData)}>
                                        <Grid container spacing={1}>
                                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                                <CssTextField id="outlined-basic"
                                                    label="Enter Vendor Name"
                                                    variant="outlined"
                                                    type="text"
                                                    size="small"
                                                    autocomplete="off"
                                                    className={classes.inputFieldStyle}
                                                    defaultValue={vendor.name}
                                                    inputProps={{ style: { fontSize: 14 } }}
                                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                                    {...register("name", { required: true, maxLength: 22 })}
                                                />
                                            </Grid>

                                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                                <CssTextField id="outlined-basic"
                                                    label="Email (Optional)"
                                                    variant="outlined"
                                                    autocomplete="off"
                                                    size="small"
                                                    className={classes.inputFieldStyle}
                                                    defaultValue={vendor.email}
                                                    inputProps={{ style: { fontSize: 14 } }}
                                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                                    {...register("email", {
                                                        required: "email is required",
                                                        pattern: {
                                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                                            message: "Enter a valid e-mail address",
                                                        },
                                                    })}
                                                />
                                            </Grid>

                                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                                <CssTextField id="outlined-basic"
                                                    label="Phone No."
                                                    variant="outlined"
                                                    type="text"
                                                    autocomplete="off"
                                                    size="small"
                                                    className={classes.inputFieldStyle}
                                                    inputProps={{ style: { fontSize: 14 } }}
                                                    defaultValue={vendor.phone}
                                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                                    {...register("phone", { required: true, maxLength: 24 })}

                                                />
                                            </Grid>

                                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                                <CssTextField id="outlined-basic"
                                                    label="Address"
                                                    variant="outlined"
                                                    type="text"
                                                    size="small"
                                                    autocomplete="off"
                                                    className={classes.inputFieldStyle}
                                                    defaultValue={vendor.location}
                                                    inputProps={{ style: { fontSize: 14 } }}
                                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                                    {...register("location", { required: true, maxLength: 70 })}

                                                />
                                            </Grid>

                                        </Grid>
                                        <Grid container spacing={1} style={{ marginTop: 8, }}>
                                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                                <CssTextField
                                                    id="outlined-basic"
                                                    label="Select Category"
                                                    variant="outlined"
                                                    type="text"
                                                    autoComplete="off"
                                                    size="small"
                                                    select
                                                    defaultValue={vendor.category._id}
                                                    className={classes.inputFieldStyle}
                                                    inputProps={{ style: { fontSize: 14 } }}
                                                    InputLabelProps={{ style: { fontSize: 14 } }}
                                                    {...register("category", { required: true, })}

                                                >
                                                    {
                                                        !categories || !categories.length ? <p>Data Not Found</p> :
                                                            categories.map((category, i) => (
                                                                <MenuItem
                                                                    value={category._id}
                                                                    onClick={(e) => fetchMaterials(category._id)}
                                                                    key={i}
                                                                >
                                                                    {category.name}
                                                                </MenuItem>
                                                            )
                                                            )
                                                    }
                                                </CssTextField>
                                            </Grid>
                                            <Grid item lg={3} md={3} sm={6} xs={6} className={classes.ckeckBox}>
                                                <FormGroup row>
                                                    {
                                                        !materials || !materials.length ? <p>Not Any Material</p> :
                                                            materials.map((material, i) => (
                                                                <FormControlLabel
                                                                    key={i}
                                                                    control={
                                                                        <Checkbox
                                                                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                                            checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                                            onChange={(e) => getMaterials(e)}
                                                                        />
                                                                    }
                                                                    name={material.name}
                                                                    value={material._id}
                                                                    label={material.name}
                                                                    {...register("material")}

                                                                />
                                                            ))
                                                    }
                                                </FormGroup>
                                            </Grid>
                                        </Grid>
                                        {/* ============================================================= */}
                                        {
                                            errors?.email && <span className="text-danger" >{errors.email.message}</span>
                                        }
                                        {/* ============================================================= */}
                                        <div>
                                            <Button
                                                className="bg-warning text-light"
                                                type="submit"
                                            >
                                                Update
                                            </Button>
                                            <Button
                                                className="bg-danger text-light ml-1"
                                                onClick={handleClose}
                                            >
                                                Close
                                            </Button>
                                        </div>
                                    </form>
                                ) : null
                            }
                            <br />
                            {
                                errors.category?.type === 'required' && <p className="mt-3 text-danger">Category must be required</p>
                            }
                            <br />
                            {/* {
                                errors.name?.type === 'required' && <p className="text-danger">Material name is required</p>
                            } */}
                            <br />
                            {/* {
                                errors.name?.type === 'maxLength' && <p className="text-danger">Length must be less than 30</p>
                            } */}
                            {/* {
                                isUpdate ? <p className="text-success">Material Edit Success</p> : (
                                    isError ? <p className="text-danger">Material Edit Fail Internal Server Error</p> : null
                                )
                            } */}



                        </Container>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default EditVendor
