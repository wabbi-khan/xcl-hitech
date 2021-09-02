import React, { useState } from "react";
import Sidenav from "../../SideNav/Sidenav";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/utils/Button";
import Loader from "react-loader-spinner";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  mainContainer: {
    textAlign: "center",
    marginTop: 20,
  },
  mainContainer1: {
    marginTop: 20,
  },
  addButton: {
    marginTop: 20,
    color: "#22A19A",
    borderColor: "#22A19A",
    fontWeight: "bold",
    width: "10%",
    "&:hover": {
      border: "none",
      backgroundColor: "#22A19A",
      color: "whitesmoke",
    },
  },
  table: {
    minWidth: 600,
  },
  dataTable: {
    marginTop: 40,
  },
  inputFieldStyle: {
    [theme.breakpoints.up("md")]: {
      width: 250,
    },
    [theme.breakpoints.down("sm")]: {
      width: 200,
    },
  },
  inputFieldStyle1: {
    [theme.breakpoints.up("md")]: {
      width: 250,
    },
    [theme.breakpoints.down("sm")]: {
      width: 200,
      marginTop: 10,
    },
  },
  inputFieldStyle2: {
    // boxShadow: '0.4px 0.4px 0.4px 0.4px grey',
    // borderRadius: 5,
    [theme.breakpoints.up("md")]: {
      width: 200,
    },
    [theme.breakpoints.down("sm")]: {
      width: 200,
    },
  },
  orderDescHeading: {
    [theme.breakpoints.up("md")]: {
      marginLeft: 30,
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: 25,
    },
  },
}));

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "black",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "black",
      },
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
  },
})(TextField);

const initialValues = {
  noOfConsiments: "",
  specification: "",
  product: "",
  productType: "",
  color: "",
  confirmingTo: "",
  vehicle: "",
  orderNo: "",
  deliveryAtSite: "",
  contactNo: "",
  contactPerson: "",
  address: "",
};

const validationSchema = yup.object({
  noOfConsiments: yup.string().required(),
  specification: yup.string().required(),
  product: yup.string().required(),
  productType: yup.string().required(),
  color: yup.string().required(),
  confirmingTo: yup.string().required(),
  vehicle: yup.string().required(),
  orderNo: yup.string().required(),
  deliveryAtSite: yup.string().required(),
  contactNo: yup.string().required(),
  contactPerson: yup.string().required(),
  address: yup.string().required(),
});


const DeliveryChalan = () => {
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState("");
  const [success, setSuccess] = useState("");

  const classes = useStyles();

  return (
    <Sidenav title={"Delivery Chalan"}>
      <div>
        <Container className={classes.mainContainer}>
          <Grid container spacing={1} style={{ marginTop: 15 }}>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <CssTextField
                id="outlined-basic"
                label="No. of Consignment"
                variant="outlined"
                type="text"
                size="small"
                autoComplete="off"
                disabled
                value=""
                style={{ width: "100%" }}
                inputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 14 } }}
              ></CssTextField>
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <CssTextField
                id="outlined-basic"
                label="Specification"
                variant="outlined"
                type="text"
                size="small"
                autoComplete="off"
                disabled
                value="Deliver according to requirements"
                style={{ width: "100%" }}
                inputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 14 } }}
              ></CssTextField>
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <CssTextField
                id="outlined-basic"
                label="Date"
                variant="outlined"
                type="text"
                size="small"
                autoComplete="off"
                disabled
                value="24-2-21"
                style={{ width: "100%" }}
                inputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 14 } }}
              ></CssTextField>
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <CssTextField
                id="outlined-basic"
                label="DC No."
                variant="outlined"
                type="text"
                size="small"
                autoComplete="off"
                disabled
                value="26"
                style={{ width: "100%" }}
                inputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 14 } }}
              ></CssTextField>
            </Grid>
          </Grid>
        </Container>
        <Container className={classes.mainContainer}>
          <Grid container spacing={1} style={{ marginTop: 15 }}>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <CssTextField
                id="outlined-basic"
                label="Vehicle No."
                variant="outlined"
                type="text"
                size="small"
                autoComplete="off"
                disabled
                value="ABC-123"
                style={{ width: "100%" }}
                inputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 14 } }}
              ></CssTextField>
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <CssTextField
                id="outlined-basic"
                label="Order By"
                variant="outlined"
                type="text"
                size="small"
                autoComplete="off"
                disabled
                value=""
                style={{ width: "100%" }}
                inputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 14 } }}
              ></CssTextField>
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <CssTextField
                id="outlined-basic"
                label="Bill To"
                variant="outlined"
                type="text"
                size="small"
                autoComplete="off"
                disabled
                value=""
                style={{ width: "100%" }}
                inputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 14 } }}
              ></CssTextField>
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <CssTextField
                id="outlined-basic"
                label="Delivery at Site"
                variant="outlined"
                type="text"
                size="small"
                autoComplete="off"
                disabled
                value=""
                style={{ width: "100%" }}
                inputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 14 } }}
              ></CssTextField>
            </Grid>
          </Grid>
        </Container>
        <Container className={classes.mainContainer}>
          <Grid container spacing={1} style={{ marginTop: 15 }}>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <CssTextField
                id="outlined-basic"
                label="Address"
                variant="outlined"
                type="text"
                size="small"
                autoComplete="off"
                disabled
                value="Kotri Site Area, Hyderabad"
                style={{ width: "100%" }}
                inputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 14 } }}
              ></CssTextField>
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <CssTextField
                id="outlined-basic"
                label="Contact No."
                variant="outlined"
                type="text"
                size="small"
                autoComplete="off"
                disabled
                value="0303-3030303"
                style={{ width: "100%" }}
                inputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 14 } }}
              ></CssTextField>
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <CssTextField
                id="outlined-basic"
                label="Contact Person"
                variant="outlined"
                type="text"
                size="small"
                autoComplete="off"
                disabled
                value="Muhammad Ali"
                style={{ width: "100%" }}
                inputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 14 } }}
              ></CssTextField>
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <CssTextField
                id="outlined-basic"
                label="Contact No."
                variant="outlined"
                type="text"
                size="small"
                autoComplete="off"
                disabled
                value="0330-2020202"
                style={{ width: "100%" }}
                inputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 14 } }}
              ></CssTextField>
            </Grid>
          </Grid>
        </Container>
        <div style={{ marginTop: 30, marginBottom: 30 }}>
          <hr />
        </div>
        <Container className={classes.mainContainer}>
          {/* <h4 className="text-left">Items</h4> */}
          {/* {ItemCounter.map((value, i) => {
            const no = i + 1;
            return (
              <Grid key={i} container spacing={1} style={{ marginTop: 15 }}>
                <Grid item lg={1} md={1}>
                  <h5 className={classes.itemHeading}>{no}</h5>
                </Grid>
                <Grid item lg={2} md={3} sm={12} xs={12}>
                  <CssTextField
                    id="outlined-basic"
                    label="Description"
                    variant="outlined"
                    type="text"
                    size="small"
                    disabled
                    value="delivery will be on time"
                    style={{ width: "100%" }}
                    inputProps={{ style: { fontSize: 14 } }}
                    InputLabelProps={{ style: { fontSize: 14 } }}
                  ></CssTextField>
                </Grid>
                <Grid item lg={2} md={3} sm={12} xs={12}>
                  <CssTextField
                    id="outlined-basic"
                    label="PN/SN"
                    variant="outlined"
                    type="text"
                    size="small"
                    disabled
                    value=""
                    style={{ width: "100%" }}
                    inputProps={{ style: { fontSize: 14 } }}
                    InputLabelProps={{ style: { fontSize: 14 } }}
                  />
                </Grid>
                <Grid item lg={2} md={3} sm={12} xs={12}>
                  <CssTextField
                    id="outlined-basic"
                    label="Quantity(In Meter)"
                    variant="outlined"
                    type="text"
                    size="small"
                    disabled
                    value="1234"
                    style={{ width: "100%" }}
                    inputProps={{ style: { fontSize: 14 } }}
                    InputLabelProps={{ style: { fontSize: 14 } }}
                  />
                </Grid>
                <Grid item lg={2} md={3} sm={12} xs={12}>
                  <CssTextField
                    id="outlined-basic"
                    label="No. of Pipes"
                    variant="outlined"
                    type="text"
                    size="small"
                    disabled
                    value=""
                    style={{ width: "100%" }}
                    inputProps={{ style: { fontSize: 14 } }}
                    InputLabelProps={{ style: { fontSize: 14 } }}
                  />
                </Grid>
                <Grid item lg={2} md={3} sm={12} xs={12}>
                  <CssTextField
                    id="outlined-basic"
                    label="Balance Quantity"
                    variant="outlined"
                    type="text"
                    size="small"
                    disabled
                    value="230"
                    style={{ width: "100%" }}
                    inputProps={{ style: { fontSize: 14 } }}
                    InputLabelProps={{ style: { fontSize: 14 } }}
                  />
                </Grid>
              </Grid>
            );
          })} */}
          {/* <Grid container spacing={1} >
                        <Grid item lg={3} md={3} sm={10} xs={11}>
                            <Button variant="outlined" color="primary"
                                className={classes.addButton}
                                onClick={addMoreFunc}
                            // style={{ marginLeft: 'auto', marginRight: 'auto' }}
                            >
                                Add More
                            </Button>
                        </Grid>
                    </Grid> */}
          {/* <Grid container spacing={1} >
                        <Grid item lg={5} md={5} sm={10} xs={11}>
                        </Grid>
                        <Grid item lg={3} md={3} sm={10} xs={11}>
                            <Button variant="outlined" color="primary"
                                className={classes.addButton}
                            // onClick={addMoreFunc}
                            // style={{ marginLeft: 'auto', marginRight: 'auto' }}
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid> */}
        </Container>
      </div>
    </Sidenav>
  );
};

export default DeliveryChalan;
