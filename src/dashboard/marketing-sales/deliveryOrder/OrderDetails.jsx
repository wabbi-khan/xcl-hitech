import React from "react";
import Sidenav from "../../SideNav/Sidenav";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";

import { fetchSinglePurchaseOrderAction } from "../../../services/action/OrdersAction";

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

const OrderDetails = ({ match }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchSinglePurchaseOrderAction(match.params.id));
  }, []);

  const { order } = useSelector((state) => state.orders);

  return (
    <Sidenav title={"Order Details"}>
      <div>
        <Container className={classes.mainContainer}>
          <Grid container spacing={1} style={{ marginTop: 15 }}>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <CssTextField
                id="outlined-basic"
                label="Pr Num"
                variant="outlined"
                type="text"
                size="small"
                autoComplete="off"
                disabled
                value={order.prNum}
                className={classes.inputFieldStyle}
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
                value="26-4-2021"
                className={classes.inputFieldStyle1}
                inputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 14 } }}
              >
                {/* <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Truck</MenuItem>
                                <MenuItem value={10}>Heavy Truck</MenuItem> */}
              </CssTextField>
            </Grid>
          </Grid>
        </Container>
        <Container className={classes.mainContainer}>
          <h4>Company Representative</h4>
          <Grid container spacing={1} style={{ marginTop: 15 }}>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <CssTextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                type="text"
                size="small"
                autoComplete="off"
                disabled
                value="Muhammad Arsalan"
                className={classes.inputFieldStyle}
                inputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 14 } }}
              ></CssTextField>
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <CssTextField
                id="outlined-basic"
                label="Designation"
                variant="outlined"
                type="text"
                size="small"
                autoComplete="off"
                disabled
                value="Head of Department"
                className={classes.inputFieldStyle1}
                inputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 14 } }}
              />
            </Grid>
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
                className={classes.inputFieldStyle1}
                inputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 14 } }}
              />
            </Grid>
          </Grid>
        </Container>
        <Container className={classes.mainContainer}>
          <h4>Customer Information</h4>
          <Grid container spacing={1} style={{ marginTop: 15 }}>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <CssTextField
                id="outlined-basic"
                label="Customer Name"
                variant="outlined"
                type="text"
                size="small"
                autoComplete="off"
                disabled
                value="Kamran Khan"
                className={classes.inputFieldStyle}
                inputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 14 } }}
              ></CssTextField>
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <CssTextField
                id="outlined-basic"
                label="Address"
                variant="outlined"
                type="text"
                size="small"
                autoComplete="off"
                disabled
                value="Qasimabad, Hyderabad"
                className={classes.inputFieldStyle1}
                inputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 14 } }}
              />
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <CssTextField
                id="outlined-basic"
                label="Delivery Site Address"
                variant="outlined"
                type="text"
                size="small"
                autoComplete="off"
                disabled
                value="Zeal Pak, Hyderabad"
                className={classes.inputFieldStyle1}
                inputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 14 } }}
              />
            </Grid>
          </Grid>
        </Container>
        <Container className={classes.mainContainer}>
          <h4>Description of Order</h4>
          <Grid container spacing={1} style={{ marginTop: 15 }}>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <CssTextField
                id="outlined-basic"
                label="Size"
                variant="outlined"
                type="text"
                size="small"
                autoComplete="off"
                disabled
                value="30x23"
                className={classes.inputFieldStyle}
                inputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 14 } }}
              ></CssTextField>
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <CssTextField
                id="outlined-basic"
                label="PE-80/100"
                variant="outlined"
                type="text"
                size="small"
                autoComplete="off"
                disabled
                value="94"
                className={classes.inputFieldStyle}
                inputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 14 } }}
              ></CssTextField>
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <CssTextField
                id="outlined-basic"
                label="PN"
                variant="outlined"
                type="text"
                size="small"
                autoComplete="off"
                disabled
                value="PN"
                className={classes.inputFieldStyle1}
                inputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 14 } }}
              />
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <CssTextField
                id="outlined-basic"
                label="SDR"
                variant="outlined"
                type="text"
                size="small"
                autoComplete="off"
                disabled
                value="SDR"
                className={classes.inputFieldStyle1}
                inputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 14 } }}
              />
            </Grid>
          </Grid>
        </Container>
        <Container className={classes.mainContainer}>
          <Grid container spacing={1} style={{ marginTop: 15 }}>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <CssTextField
                id="outlined-basic"
                label="Length in Meter"
                variant="outlined"
                type="text"
                size="small"
                autoComplete="off"
                disabled
                value="1232m"
                className={classes.inputFieldStyle}
                inputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 14 } }}
              ></CssTextField>
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <CssTextField
                id="outlined-basic"
                label="No. of Pipes/Coils"
                variant="outlined"
                type="text"
                size="small"
                autoComplete="off"
                disabled
                value="32"
                className={classes.inputFieldStyle}
                inputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 14 } }}
              ></CssTextField>
            </Grid>
          </Grid>
        </Container>
        <Container className={classes.mainContainer1}>
          <Grid
            container
            className="text-center"
            spacing={1}
            style={{ marginTop: 15 }}
          >
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <p style={{ display: "inline" }}>Fittings Required</p>
              <Button
                variant="contained"
                className="btn"
                disabled
                style={{
                  backgroundColor: "#00af00",
                  color: "whitesmoke",
                  fontSize: 12,
                  display: "inline",
                  marginLeft: 15,
                }}
              >
                Yes
              </Button>
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <p style={{ display: "inline" }}>Welding Required</p>
              <Button
                variant="contained"
                className="btn"
                disabled
                style={{
                  backgroundColor: "red",
                  color: "whitesmoke",
                  fontSize: 12,
                  display: "inline",
                  marginLeft: 15,
                }}
              >
                No
              </Button>
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <CssTextField
                id="outlined-basic"
                label="Fitting Quantity"
                variant="outlined"
                type="text"
                size="small"
                autoComplete="off"
                disabled
                value="32"
                className={classes.inputFieldStyle}
                inputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 14 } }}
              ></CssTextField>
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <CssTextField
                id="outlined-basic"
                label="Mode of Transportation"
                variant="outlined"
                type="text"
                size="small"
                autoComplete="off"
                disabled
                value="By Road"
                className={classes.inputFieldStyle}
                inputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 14 } }}
              ></CssTextField>
            </Grid>
          </Grid>
        </Container>
        <Container className={classes.mainContainer1}>
          <Grid
            container
            className="text-center"
            spacing={1}
            style={{ marginTop: 15 }}
          >
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <CssTextField
                id="outlined-basic"
                label="Mode of Payment"
                variant="outlined"
                type="text"
                size="small"
                autoComplete="off"
                disabled
                value="Online"
                className={classes.inputFieldStyle}
                inputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 14 } }}
              ></CssTextField>
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <CssTextField
                id="outlined-basic"
                label="Expected Date of Delivery"
                variant="outlined"
                type="text"
                size="small"
                autoComplete="off"
                disabled
                value="2-2-21"
                className={classes.inputFieldStyle}
                inputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 14 } }}
              ></CssTextField>
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <CssTextField
                id="outlined-basic"
                label="Special Req.(If Any)"
                variant="outlined"
                type="text"
                size="small"
                autoComplete="off"
                disabled
                value=""
                className={classes.inputFieldStyle}
                inputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 14 } }}
              ></CssTextField>
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <CssTextField
                id="outlined-basic"
                label="Remarks"
                variant="outlined"
                type="text"
                size="small"
                autoComplete="off"
                disabled
                value="Satisfy"
                className={classes.inputFieldStyle}
                inputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 14 } }}
              ></CssTextField>
            </Grid>
          </Grid>
        </Container>
      </div>
    </Sidenav>
  );
};

export default OrderDetails;
