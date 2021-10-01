import React, { useState, useEffect } from "react";
import Sidenav from "../../../SideNav/Sidenav";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import { CustomButton, CustomTable } from "../../../../components";

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

const AddAccounts = ({ history }) => {
  const [fetchLoading, setFetchLoading] = useState(false);

  const classes = useStyles();

  const handleOpen = () => {};

  const deleteStock = () => {};

  const toAccountHistory = () => {
    history.push("/finance/accounts/ledger");
  };

  return (
    <Sidenav title={"Add Accounts"}>
      <div>
        <div>
          <Container className={classes.mainContainer}>
            <Grid container spacing={1} style={{ marginTop: 15 }}>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <CssTextField
                  id="outlined-basic"
                  label="Select Account Type"
                  variant="outlined"
                  type="text"
                  size="small"
                  select
                  style={{ width: "100%" }}
                  inputProps={{ style: { fontSize: 14 } }}
                  InputLabelProps={{ style: { fontSize: 14 } }}
                >
                  <MenuItem value="asset">Asset</MenuItem>
                  <MenuItem value="liability">Liability</MenuItem>
                  <MenuItem value="capital">Capital</MenuItem>
                  <MenuItem value="expense">Expense</MenuItem>
                  <MenuItem value="revenue">Revenue</MenuItem>
                </CssTextField>
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <CssTextField
                  id="outlined-basic"
                  label="Enter Account Name"
                  variant="outlined"
                  type="text"
                  size="small"
                  style={{ width: "100%" }}
                  inputProps={{ style: { fontSize: 14 } }}
                  InputLabelProps={{ style: { fontSize: 14 } }}
                />
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <CssTextField
                  id="outlined-basic"
                  label="Enter Starting Value"
                  variant="outlined"
                  type="number"
                  size="small"
                  style={{ width: "100%" }}
                  inputProps={{ style: { fontSize: 14 } }}
                  InputLabelProps={{ style: { fontSize: 14 } }}
                />
              </Grid>
            </Grid>
          </Container>
          <Container className={classes.mainContainer}>
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
            columnHeadings={[
              "Sr.No",
              "Account Type",
              "Account Name",
              "Account Current Balance",
            ]}
            keys={["", "", ""]}
            firstOptionText="Edit"
            onFirstOptionClick={handleOpen}
            secondOptionText="Delete"
            onSecondOptionClick={deleteStock}
            thirdOptionText="View History"
            onThirdOptionClick={toAccountHistory}
            withSrNo
          />
        </div>
      </div>
    </Sidenav>
  );
};

export default AddAccounts;
