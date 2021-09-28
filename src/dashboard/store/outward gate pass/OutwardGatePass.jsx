import React, { useState, useEffect,useRef } from "react";
import Sidenav from "../../SideNav/Sidenav";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import cryptoRandomString from "crypto-random-string";
import {
  createOutwardGatePasses,
  deleteOutwardGatePasses,
  updateOutwardGatePasses,
  getOutwardGatePasses,
} from "../../../services/action/outwardGatePassAction";
import { getPersons } from "../../../services/action/PersonAction";
import { getVehicles } from "../../../services/action/VehiclesAction";
import { getMaterialAction } from "../../../services/action/MaterialDataHandle";

import {
  CustomButton,
  CustomInput,
  CustomTable,
  generateOptions,
  CustomFieldArray,
} from "../../../components";

const useStyles = makeStyles((theme) => ({
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
  itemHeading: {
    marginTop: 7,
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
}));

const returnableOptions = [
  {
    name: "Returnable",
    value: "returnable",
  },
  {
    name: "Non-Returnable",
    value: "non-returnable",
  },
];

const OutwardGatePass = ({ history }) => {
  const [fetchLoading, setFetchLoading] = useState(false);

  const { persons } = useSelector((state) => state.persons);
  const { vehicles } = useSelector((state) => state.vehicles);
  const { materials } = useSelector((state) => state.materials);
  const { outwardGatePasses } = useSelector((state) => state.outwardGatePasses);

  const form = React.createRef()

  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPersons());
    dispatch(getVehicles());
    dispatch(getMaterialAction());

    dispatch(getOutwardGatePasses());
  }, []);

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
                selectValues={generateOptions(persons, "name", "_id")}
              />
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <CustomInput
                label="Select Vehicle"
                selectValues={generateOptions(vehicles, "number", "_id")}
              />
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <CustomInput
                label="Returnable/Non-Returnable"
                selectValues={returnableOptions}
              />
            </Grid>
          </Grid>
        </Container>
        <div style={{ marginTop: 30, marginBottom: 30 }}>
          <hr />
        </div>
        <Container className={classes.mainContainer}>
          <h4 className="text-left">Items</h4>

          <CustomFieldArray
            fields={[
              {
                name: "item",
                label: "Select Item",
                selectValues: generateOptions(materials, "name", "_id"),
                onChangeEffectOn: [{from: 'unit.name', to: 'unit'}], 
                fetchFrom: materials
              },
              {
                name: "unit",
                label: "Unit",
              },
              {
                name: "quantity",
                label: "Quantity",
              },
              {
                name: "remarks",
                label: "Remarks",
              },
            ]}
            ref={form}
          />
        
      
          <Grid container spacing={1}>
            <Grid item lg={5} md={5} sm={10} xs={11}></Grid>
            <Grid item lg={3} md={3} sm={10} xs={11}>
              <CustomButton
                text="Submit"
                variant="outlined"
                classNames={classes.addButton}
                onClick={() => console.log(form.current.getValues())}
              />
            </Grid>
          </Grid>
        </Container>

        <CustomTable
          fetchLoading={fetchLoading}
          data={outwardGatePasses}
          heading="Materials"
          columnHeadings={["Sr.No", "Product Name", "Unit", "Quantity"]}
          // keys={[
          //   "name",
          //   "category.name",
          //   "subCategory.name",
          //   "unit.name",
          //   "code",
          // ]}
          firstOptionText="Edit"
          // onFirstOptionClick={handleOpen}
          secondOptionText="Delete"
          // onSecondOptionClick={deleteMaterial}
          withSrNo
        />
      </div>
    </Sidenav>
  );
};

export default OutwardGatePass;
