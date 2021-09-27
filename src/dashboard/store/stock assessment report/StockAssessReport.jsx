import React, { useState, useEffect } from "react";
import Sidenav from "../../SideNav/Sidenav";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { CustomButton, CustomTable } from "../../../components";

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
    marginTop: 50,
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
      marginLeft: 50,
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

const StockAssessReport = ({ history }) => {
  const [fetchLoading, setFetchLoading] = useState(false);

  const { outwardGatePasses } = useSelector((state) => state.outwardGatePasses);

  const classes = useStyles();

  const handleOpen = () => {};

  const deleteStock = () => {};

  const pushToPrint = () => {
    history.push(
      "/storedashboard/stock_assessment_report/print_stock_assesment_report"
    );
  };

  return (
    <Sidenav title={"Stock Assessment Report"}>
      <div>
        <Container className={classes.mainContainer}>
          <Grid container spacing={1} style={{ marginTop: 15 }}>
            <Grid item lg={3} md={3} sm={12} xs={12}>
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
                <MenuItem value="">{}</MenuItem>
              </CssTextField>
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <CssTextField
                id="outlined-basic"
                label="Quantity Examined"
                variant="outlined"
                type="text"
                size="small"
                style={{ width: "100%" }}
                inputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 14 } }}
              />
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <CssTextField
                id="outlined-basic"
                label="Item Retains/Item Properties"
                variant="outlined"
                type="text"
                size="small"
                style={{ width: "100%" }}
                inputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 14 } }}
              />
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <CssTextField
                id="outlined-basic"
                label="Ok For Further Use"
                variant="outlined"
                type="text"
                size="small"
                select
                style={{ width: "100%" }}
                inputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 14 } }}
              >
                <MenuItem value={20}>Rejection</MenuItem>
              </CssTextField>
            </Grid>
          </Grid>
        </Container>
        <Container className={classes.mainContainer}>
          <Grid container spacing={1} style={{ marginTop: 15 }}>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <CssTextField
                id="outlined-basic"
                label="Reason For Rejection"
                variant="outlined"
                type="text"
                size="small"
                style={{ width: "100%" }}
                inputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 14 } }}
              />
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
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
          </Grid>
          <div>
            <CustomButton
              text="Submit"
              variant="outlined"
              classNames={classes.addButton}
              // style={{ marginLeft: 'auto', marginRight: 'auto' }}
            />
          </div>
        </Container>

        <CustomTable
          fetchLoading={fetchLoading}
          data={[{}]}
          heading="Materials"
          columnHeadings={[
            "Sr.No",
            "Item",
            "Qty Examined",
            "Items Retains/Items Properties",
            "Remarks",
          ]}
          keys={["", "", "", ""]}
          firstOptionText="Edit"
          onFirstOptionClick={handleOpen}
          secondOptionText="Delete"
          onSecondOptionClick={deleteStock}
          thirdOptionText="View"
          onThirdOptionClick={pushToPrint}
          withSrNo
        />
      </div>
    </Sidenav>
  );
};

export default StockAssessReport;
