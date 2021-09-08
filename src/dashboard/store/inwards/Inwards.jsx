import React from "react";
import Sidenav from "../../SideNav/Sidenav";
import { makeStyles } from "@material-ui/core/styles";
import Button from "../../../components/utils/Button";

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
    marginTop: 70,
    color: "#22A19A",
    borderColor: "#22A19A",
    fontWeight: "bold",
    "&:hover": {
      border: "none",
      backgroundColor: "#22A19A",
      color: "whitesmoke",
    },
    [theme.breakpoints.up("md")]: {
      width: "15%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "30%",
    },
  },
  mainBtn: {
    borderColor: "#22A19A",
    backgroundColor: "#22A19A",
    color: "whitesmoke",
    fontWeight: 500,
    fontSize: "13.5px",
    border: "1px solid #22A19A",
    "&:hover": {
      border: "1px solid #22A19A",
      color: "#22A19A",
    },
    // [theme.breakpoints.up('md')]: {
    //     width: '15%',
    // },
    // [theme.breakpoints.down('sm')]: {
    //     width: '30%',
    // },
  },
  table: {
    minWidth: 600,
  },
  dataTable: {
    marginTop: 40,
  },
  ckeckBox: {
    [theme.breakpoints.up("md")]: {
      marginLeft: 7,
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
    },
  },
}));

const Inwards = ({ history }) => {
  const classes = useStyles();

  return (
    <Sidenav title={"Inwards"}>
      <div>
        <div class="container mt-5">
          <div
            style={{ display: "flex", justifyContent: "center", gap: "12rem" }}
          >
            <Button
              text="Item Inward"
              size="large"
              variant="contained"
              classNames={classes.mainBtn}
              onClick={() => {
                history.push("/storedashboard/inwards/item_inward");
              }}
            />
            <Button
              text="Inward Approval"
              size="large"
              variant="contained"
              classNames={classes.mainBtn}
              onClick={() => {
                history.push("/storedashboard/inwards/inward_approval");
              }}
            />
            <Button
              text="Inward Gatepass"
              size="large"
              variant="contained"
              classNames={classes.mainBtn}
              onClick={() => {
                history.push("/storedashboard/inwards/inward_gatepass");
              }}
            />
          </div>
        </div>
      </div>
    </Sidenav>
  );
};

export default Inwards;
