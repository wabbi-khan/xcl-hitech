import React, { useState } from "react";
import Sidenav from "../../SideNav/Sidenav";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import cryptoRandomString from "crypto-random-string";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import {
  createOutwardGatePasses,
  deleteOutwardGatePasses,
  updateOutwardGatePasses,
  getOutwardGatePasses,
} from "../../../services/action/outwardGatePassAction";
import { getPersons } from "../../../services/action/PersonAction";
import { CustomButton, CustomInput, CustomTable } from "../../../components";

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
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  mainContainer: {
    textAlign: "center",
    [theme.breakpoints.up("md")]: {
      marginLeft: 0,
      marginTop: 15,
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: -15,
    },
  },
  addButton: {
    marginTop: 10,
    marginLeft: 15,
    color: "#22A19A",
    borderColor: "#22A19A",
    "&:hover": {
      borderColor: "#22A19A",
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
  ckeckBox: {
    [theme.breakpoints.up("md")]: {
      marginLeft: 25,
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
    },
  },
  itemHeading: {
    marginTop: 7,
  },
  select: {
    "&:before": {
      borderColor: "red",
    },
    "&:hover:not(.Mui-disabled):before": {
      borderColor: "red",
    },
    [theme.breakpoints.up("md")]: {
      width: 400,
    },
    [theme.breakpoints.down("sm")]: {
      width: 200,
    },
  },
  delete: {
    color: "red",
    fontSize: 38,
    [theme.breakpoints.up("md")]: {
      // marginLeft: 50,
      marginTop: -7,
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: -10,
    },
  },
  deleteRowBtn: {
    "&:hover": {
      border: "none",
      background: "none",
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

const OutwardGatePass = ({ history }) => {
  const classes = useStyles();

  const [ItemCounter, setItemCounter] = useState([{ id: "text" }]);

  const addMoreFunc = () => {
    const randomString = cryptoRandomString({ length: 10 });
    const addNew = [...ItemCounter, { id: randomString }];
    setItemCounter(addNew);
  };

  const deleteItem = (index) => {
    setItemCounter(ItemCounter.filter((item) => item.id !== index));
  };

  const handleOpen = () => {}

  const deleteOutwardGatePass = () => {}

  const pushToPrint = () => {
	  history.push('/storedashboard/outward_gatepass/print_outward_gatepass')
  }

  return (
    <Sidenav title={"Outward Gate Pass (Returnable/Non-Returnable)"}>
      <div>
        <Container className={classes.mainContainer}>
          <Grid container spacing={1} style={{ marginTop: 15 }}>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <CustomInput
                label="Select Name"
                selectValues={[
                  {
                    name: "Asad",
                    value: "asad",
                  },
                ]}
              />
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Asad</MenuItem>
              <MenuItem value={20}>Aneeq</MenuItem>
              <MenuItem value={30}>Sagheer</MenuItem>
              <MenuItem value={30}>Arsalan</MenuItem>
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <CssTextField
                id="outlined-basic"
                label="Select Vehicle"
                variant="outlined"
                type="text"
                size="small"
                select
                required
                style={{ width: "100%" }}
                inputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 14 } }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>ABC-123</MenuItem>
                <MenuItem value={30}>XYZ-222</MenuItem>
                <MenuItem value={20}>ASD-323</MenuItem>
              </CssTextField>
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <CssTextField
                id="outlined-basic"
                label="Returnable/Non-Returnable"
                variant="outlined"
                type="text"
                size="small"
                select
                style={{ width: "100%" }}
                inputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 14 } }}
              >
                <MenuItem value="">Returnable</MenuItem>
                <MenuItem value="">Non-Returnable</MenuItem>
              </CssTextField>
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <CssTextField
                id="outlined-basic"
                // label="Select Date"
                variant="outlined"
                type="date"
                size="small"
                style={{ width: "100%" }}
                inputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 14 } }}
              />
            </Grid>
          </Grid>
        </Container>
        <div style={{ marginTop: 30, marginBottom: 30 }}>
          <hr />
        </div>
        <Container className={classes.mainContainer}>
          <h4 className="text-left">Items</h4>
          {ItemCounter.map((value, i) => {
            const no = i + 1;
            return (
              <Grid key={i} container spacing={1} style={{ marginTop: 15 }}>
                <Grid item lg={1} md={1} sm={1} xs={1}>
                  <h5 className={classes.itemHeading}>{no}.</h5>
                </Grid>
                <Grid item lg={2} md={3} sm={12} xs={12}>
                  <CssTextField
                    id="outlined-basic"
                    label="Select Item"
                    variant="outlined"
                    type="text"
                    size="small"
                    select
                    style={{ width: "100%" }}
                    inputProps={{ style: { fontSize: 14 } }}
                    InputLabelProps={{ style: { fontSize: 14 } }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Material 01</MenuItem>
                    <MenuItem value={20}>Material 02</MenuItem>
                  </CssTextField>
                </Grid>
                <Grid item lg={2} md={3} sm={12} xs={12}>
                  <CssTextField
                    id="outlined-basic"
                    label="Unit"
                    variant="outlined"
                    type="text"
                    size="small"
                    style={{ width: "100%" }}
                    inputProps={{ style: { fontSize: 14 } }}
                    InputLabelProps={{ style: { fontSize: 14 } }}
                  />
                </Grid>
                <Grid item lg={2} md={3} sm={12} xs={12}>
                  <CssTextField
                    id="outlined-basic"
                    label="Quantity"
                    variant="outlined"
                    type="text"
                    size="small"
                    style={{ width: "100%" }}
                    inputProps={{ style: { fontSize: 14 } }}
                    InputLabelProps={{ style: { fontSize: 14 } }}
                  />
                </Grid>
                <Grid item lg={2} md={3} sm={12} xs={12}>
                  <CssTextField
                    id="outlined-basic"
                    label="Remarks"
                    variant="outlined"
                    type="text"
                    size="small"
                    style={{ width: "100%" }}
                    inputProps={{ style: { fontSize: 14 } }}
                    InputLabelProps={{ style: { fontSize: 14 } }}
                  />
                </Grid>
                <Grid item lg={1} md={1} sm={1} xs={1}>
                  <CustomButton
                    onClick={() => deleteItem(value.id)}
                    className={classes.deleteRowBtn}
                  >
                    <DeleteOutlineIcon className={classes.delete} />
                  </CustomButton>
                </Grid>
              </Grid>
            );
          })}
          <Grid container spacing={1}>
            <Grid item lg={3} md={3} sm={10} xs={11}>
              <CustomButton
                text="Add More"
                variant="outlined"
                classNames={classes.addButton}
                onClick={addMoreFunc}
                // style={{ marginLeft: 'auto', marginRight: 'auto' }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item lg={5} md={5} sm={10} xs={11}></Grid>
            <Grid item lg={3} md={3} sm={10} xs={11}>
              <CustomButton
                text="Submit"
                variant="outlined"
                classNames={classes.addButton}
                onClick={() => {
                  history.push(
                    "/storedashboard/outward_gatepass/print_outward_gatepass"
                  );
                }}
                // style={{ marginLeft: 'auto', marginRight: 'auto' }}
              />
            </Grid>
          </Grid>
        </Container>

        <CustomTable
          //   fetchLoading={fetchLoading}
          data={[{  }]}
          columnHeadings={[
            "Sr.No",
            "Product Name",
            "Unit",
            "Quantity",
            "Remarks",
          ]}
          keys={[
            "name",
            "category.name",
            "subCategory.name",
            "unit.name",
          ]}
          firstOptionText="Edit"
            onFirstOptionClick={handleOpen}
          secondOptionText="Delete"
          onSecondOptionClick={deleteOutwardGatePass}
          thirdOptionText="View"
          onThirdOptionClick={pushToPrint}
          withSrNo
        />
      </div>
    </Sidenav>
  );
};

export default OutwardGatePass;
