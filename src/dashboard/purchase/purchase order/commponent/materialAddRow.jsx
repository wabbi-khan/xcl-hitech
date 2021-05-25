import React, { useState } from 'react'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

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
        marginTop: 10,
        marginLeft: 15,
        color: '#22A19A',
        borderColor: '#22A19A',
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
        // boxShadow: '0.4px 0.4px 0.4px 0.4px grey',
        // borderRadius: 5,
        [theme.breakpoints.up('md')]: {
            width: 270,

        },
        [theme.breakpoints.down('sm')]: {
            width: 200,

        },
    },
    inputFieldStyle1: {
        [theme.breakpoints.up('md')]: {
            width: 270,
        },
        [theme.breakpoints.down('sm')]: {
            width: 200,
        },
    },
    inputFieldStyle2: {
        // boxShadow: '0.4px 0.4px 0.4px 0.4px grey',
        // borderRadius: 5,
        [theme.breakpoints.up('md')]: {
            width: 250,

        },
        [theme.breakpoints.down('sm')]: {
            width: 200,

        },
    },
    inputFieldStyle3: {
        [theme.breakpoints.up('md')]: {
            width: 250,
            marginLeft: 70,
        },
        [theme.breakpoints.down('sm')]: {
            width: 200,

        },
    },
    inputFieldStyle4: {
        [theme.breakpoints.up('md')]: {
            width: 250,
            marginLeft: 140,
        },
        [theme.breakpoints.down('sm')]: {
            width: 200,

        },
    },
    inputFieldStyle5: {
        [theme.breakpoints.up('md')]: {
            width: 250,
            marginLeft: 210,
        },
        [theme.breakpoints.down('sm')]: {
            width: 200,

        },
    },
    itemHeading: {
        marginTop: 7,
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
    },
    delete: {
        color: 'red',
        fontSize: 38,
        [theme.breakpoints.up('md')]: {
            marginLeft: 50,
            marginTop: -7,

        },
        [theme.breakpoints.down('sm')]: {
            marginTop: -10,
        },
    },
    deleteRowBtn: {
        '&:hover': {
            border: 'none',
            background: 'none',
        }
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

const MaterialAddRow = ({ materials }) => {

    const [materialId, setMaterialId] = useState('')
    const [quantity, setQuantity] = useState('')
    const [unitValue, setUnitValue] = useState('')
    const [remark, setRemark] = useState('')

    const [vendorMaterials, setVendorMaterials] = useState([])
    const [materialList, setMaterialList] = useState(1)


    const classes = useStyles();

    const onAddMaterial = event => {
        event.preventDefault()
        setVendorMaterials([
            ...vendorMaterials,
            {
                materialId,
                quantity,
                unitValue,
                remark
            }
        ])
        setMaterialList( materialList+1 )
    }

    const rows = []
    let i;
    for (i = 0; i < materialList; i++) {
        rows.push(
            <Grid container spacing={1} style={{ marginTop: 15, }} >
                {/* ==================Material Index============================================================= */}
                <Grid item lg={1} md={1}>
                    <h5 className={classes.itemHeading}>1</h5>
                </Grid>
                {/* ==================Select Material============================================================= */}
                <Grid item lg={2} md={3} sm={12} xs={12}>
                    <CssTextField id="outlined-basic"
                        label="Select Item"
                        variant="outlined"
                        type="text"
                        size="small"
                        select
                        className={classes.inputFieldStyle2}
                        inputProps={{ style: { fontSize: 14 } }}
                        InputLabelProps={{ style: { fontSize: 14 } }}
                        onClick={e => setMaterialId(e.target.value)}
                    >
                        {
                            !materials || !materials.length ? <p>Select vendor</p> : (
                                materials.map((material, i) => (
                                    <MenuItem
                                        key={i}
                                        value={material.name}
                                    >
                                        {material.name}
                                    </MenuItem>
                                ))
                            )
                        }
                    </CssTextField>

                </Grid>
                {/* ===================Material Quantity============================================================ */}
                <Grid item lg={2} md={3} sm={12} xs={12}>
                    <CssTextField id="outlined-basic"
                        label="Quantity"
                        variant="outlined"
                        type="text"
                        size="small"
                        onChange={e => setQuantity(e.target.value)}
                        className={classes.inputFieldStyle3}
                        inputProps={{ style: { fontSize: 14 } }}
                        InputLabelProps={{ style: { fontSize: 14 } }}
                    />
                </Grid>
                {/* ===================Material Unit Value========================================= */}
                <Grid item lg={2} md={3} sm={12} xs={12}>
                    <CssTextField id="outlined-basic"
                        label="Unit Value"
                        variant="outlined"
                        type="text"
                        size="small"
                        onChange={e => setUnitValue(e.target.value)}
                        className={classes.inputFieldStyle4}
                        inputProps={{ style: { fontSize: 14 } }}
                        InputLabelProps={{ style: { fontSize: 14 } }}
                    />

                </Grid>
                {/* ===================Material Remarks============================================ */}
                <Grid item lg={2} md={3} sm={12} xs={12}>
                    <CssTextField id="outlined-basic"
                        label="Remarks"
                        variant="outlined"
                        type="text"
                        size="small"
                        onChange={e => setRemark(e.target.value)}
                        className={classes.inputFieldStyle5}
                        inputProps={{ style: { fontSize: 14 } }}
                        InputLabelProps={{ style: { fontSize: 14 } }}
                    />
                </Grid>
                {/* ===================BLANK======================================================= */}
                <Grid item lg={2} md={3} sm={12} xs={12}></Grid>
                {/* ====================Delete Material============================================ */}
                <Grid item lg={1} md={3} sm={12} xs={12}>
                    {/* <Button onClick={() => deleteItem(value.id)} className={classes.deleteRowBtn}> */}
                    <Button className={classes.deleteRowBtn}>
                        <DeleteOutlineIcon className={classes.delete} />
                    </Button>
                </Grid>
                {/* =============================================================================== */}
            </Grid>
        )
    }


    return (
        <Container className={classes.mainContainer}>
            <h4 className="text-left">Items</h4>
            <form onSubmit={onAddMaterial} >
                {rows}
                <Grid container spacing={1} >
                    <Grid item lg={3} md={3} sm={10} xs={11}>
                        <Button variant="outlined" color="primary"
                            className={classes.addButton}
                            type="submit"
                        // onClick={addMoreFunc}
                        // style={{ marginLeft: 'auto', marginRight: 'auto' }}
                        >
                            Add More
                            </Button>
                    </Grid>
                </Grid>
            </form>

        </Container>
    )
}

export default MaterialAddRow
