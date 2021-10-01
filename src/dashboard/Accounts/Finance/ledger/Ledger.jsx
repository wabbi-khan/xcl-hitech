import React, { useState, useEffect } from "react";
import { CustomTable } from "../../../../components";
import Sidenav from "../../../SideNav/Sidenav";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "../../../../components/utils/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  table: {
    minWidth: 600,
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

const Ledger = ({ history }) => {
  const [fetchLoading, setFetchLoading] = useState(false);

  const classes = useStyles();

  return (
    <Sidenav title={"Ledger"}>
      <div className={classes.mainContainer}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <CssTextField
            id="outlined-basic"
            // label="Date"
            variant="outlined"
            type="date"
            size="small"
            style={{ width: "25%" }}
            inputProps={{ style: { fontSize: 14 } }}
            InputLabelProps={{ style: { fontSize: 14 } }}
          />
          <Button
            size="small"
            text="Print Ledger"
            variant="contained"
            classNames="btn bg-dark text-light"
            onClick={() =>
              history.push("/finance/accounts/ledger/print_ledger")
            }
            style={{ marginLeft: "auto" }}
          />
        </div>
        <CustomTable
          fetchLoading={fetchLoading}
          data={[{}]}
          columnHeadings={[
            "Sr.No",
            "Date",
            "Account Type",
            "Account Name",
            "From (Account Name)",
            "To (Account Name)",
            "Balance",
          ]}
          keys={["", "", "", "", "", ""]}
          withSrNo
        />
      </div>
    </Sidenav>
  );
};

export default Ledger;
