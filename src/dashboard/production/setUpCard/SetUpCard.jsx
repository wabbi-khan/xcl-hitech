import React, { useEffect, useState } from "react";
import Sidenav from "../../SideNav/Sidenav";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { Formik, Form } from "formik";
import * as yup from "yup";
import {
  CustomButton,
  CustomInput,
  CustomContainer,
  generateOptions,
  CustomTable,
} from "../../../components";

const initialValues = {
  selectMat: "",
  mcNo: "",
  size: "",
  minValue: "",
  maxValue: "",
  avgValue: "",
  selectSN: "",
  snMinVal: "",
  snMaxVal: "",
  snAvgVal: "",
  wallThickness: "",
  weight: "",
  selectKg: "",
  screwFirstVal: "",
  screwSecondVal: "",
  haulOfSpeedVal: "",
  meltTempFirstVal: "",
  meltTempSecondVal: "",
  meltPressureFirstVal: "",
  meltPressureSecondVal: "",
};

const validationSchema = yup.object({
  selectMat: yup.string().required("Select Materials"),
  mcNo: yup.string().required("M/C No is required"),
  size: yup.string().required("Size is required"),
  minValue: yup.string().required("Min Value is required"),
  maxValue: yup.string().required("Max Value is required"),
  avgValue: yup.string().required("Avg Value is required"),
  selectSN: yup.string().required("SN is required"),
  snMinVal: yup.string().required("SN Min Val is required"),
  snMaxVal: yup.string().required("SN Max Val is required"),
  snAvgVal: yup.string().required("SN Avg Val is required"),
  wallThickness: yup.string().required("Wall Thickness is required"),
  weight: yup.string().required("Weight is required"),
  selectKg: yup.string().required("Kg/M is required"),
  screwFirstVal: yup.string().required("First Value is required"),
  screwSecondVal: yup.string().required("Second Value is required"),
  haulOfSpeedVal: yup.string().required("Haul Off Speed Value is required"),
  meltTempFirstVal: yup.string().required("Melt Temp First Value is required"),
  meltTempSecondVal: yup
    .string()
    .required("Melt Temp Second Value is required"),
  meltPressureFirstVal: yup
    .string()
    .required("Melt Pressure Value is required"),
  meltPressureSecondVal: yup
    .string()
    .required("Melt Pressure Value is required"),
});

const SetUpCard = ({ history }) => {
  const [fetchLoading, setFetchLoading] = useState(false);

  const dispatch = useDispatch();

  //   const { accounts } = useSelector((state) => state.accounts);

  //   useEffect(() => {
  //     dispatch();
  //   }, []);

  const onSubmit = async () => {
    console.log();
  };

  const printSetupCard = () => {
    history.push("/productionDashboard/print_setup_card");
  };

  return (
    <Sidenav title={"Set Up Cards"}>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(props) => (
            <Form>
              <div>
                <CustomContainer>
                  <Grid container spacing={1} style={{ marginTop: "2rem" }}>
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                      <CustomInput
                        label="Select Material"
                        // selectValues={generateOptions(accounts, "name", "_id")}
                        // selectValues={generateOptionsFromIndexes(selectMat)}
                        onChange={props.handleChange("selectMat")}
                        value={props.values.selectMat}
                        onBlur={props.handleBlur("selectMat")}
                        helperText={
                          props.touched.selectMat && props.errors.selectMat
                        }
                        error={
                          props.touched.selectMat && props.errors.selectMat
                        }
                      />
                    </Grid>
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                      <CustomInput
                        label="Enter M/C #"
                        onChange={props.handleChange("mcNo")}
                        value={props.values.mcNo}
                        onBlur={props.handleBlur("mcNo")}
                        helperText={props.touched.mcNo && props.errors.mcNo}
                        error={props.touched.mcNo && props.errors.mcNo}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={1} style={{ marginTop: "1rem" }}>
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                      <CustomInput
                        label="Enter Size"
                        type="number"
                        onChange={props.handleChange("size")}
                        value={props.values.size}
                        onBlur={props.handleBlur("size")}
                        helperText={props.touched.size && props.errors.size}
                        error={props.touched.size && props.errors.size}
                      />
                    </Grid>
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                      <CustomInput
                        label="Enter Min Value"
                        onChange={props.handleChange("minValue")}
                        value={props.values.minValue}
                        onBlur={props.handleBlur("minValue")}
                        helperText={
                          props.touched.minValue && props.errors.minValue
                        }
                        error={props.touched.minValue && props.errors.minValue}
                        type="number"
                      />
                    </Grid>
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                      <CustomInput
                        label="Enter Max Value"
                        onChange={props.handleChange("maxValue")}
                        value={props.values.maxValue}
                        onBlur={props.handleBlur("maxValue")}
                        helperText={
                          props.touched.maxValue && props.errors.maxValue
                        }
                        error={props.touched.maxValue && props.errors.maxValue}
                        type="number"
                      />
                    </Grid>
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                      <CustomInput
                        label="Enter Avg Value"
                        onChange={props.handleChange("avgValue")}
                        value={props.values.avgValue}
                        onBlur={props.handleBlur("avgValue")}
                        helperText={
                          props.touched.avgValue && props.errors.avgValue
                        }
                        error={props.touched.avgValue && props.errors.avgValue}
                        type="number"
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={1} style={{ marginTop: "1rem" }}>
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                      <CustomInput
                        label="Select SN-8/10"
                        // selectValues={generateOptions(accounts, "name", "_id")}
                        // selectValues={generateOptionsFromIndexes(accountTypes)}
                        onChange={props.handleChange("selectSN")}
                        value={props.values.selectSN}
                        onBlur={props.handleBlur("selectSN")}
                        helperText={
                          props.touched.selectSN && props.errors.selectSN
                        }
                        error={props.touched.selectSN && props.errors.selectSN}
                      />
                    </Grid>
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                      <CustomInput
                        label="Enter Min Value"
                        type="number"
                        onChange={props.handleChange("snMinVal")}
                        value={props.values.snMinVal}
                        onBlur={props.handleBlur("snMinVal")}
                        helperText={
                          props.touched.snMinVal && props.errors.snMinVal
                        }
                        error={props.touched.snMinVal && props.errors.snMinVal}
                      />
                    </Grid>
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                      <CustomInput
                        label="Enter Max Value"
                        type="number"
                        onChange={props.handleChange("snMaxVal")}
                        value={props.values.snMaxVal}
                        onBlur={props.handleBlur("snMaxVal")}
                        helperText={
                          props.touched.snMaxVal && props.errors.snMaxVal
                        }
                        error={props.touched.snMaxVal && props.errors.snMaxVal}
                      />
                    </Grid>
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                      <CustomInput
                        label="Enter Avg Value"
                        type="number"
                        onChange={props.handleChange("snAvgVal")}
                        value={props.values.snAvgVal}
                        onBlur={props.handleBlur("snAvgVal")}
                        helperText={
                          props.touched.snAvgVal && props.errors.snAvgVal
                        }
                        error={props.touched.snAvgVal && props.errors.snAvgVal}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={1} style={{ marginTop: "1rem" }}>
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                      <CustomInput
                        label="Enter Wall Thickness(mm)"
                        onChange={props.handleChange("wallThickness")}
                        value={props.values.wallThickness}
                        onBlur={props.handleBlur("wallThickness")}
                        helperText={
                          props.touched.wallThickness &&
                          props.errors.wallThickness
                        }
                        error={
                          props.touched.wallThickness &&
                          props.errors.wallThickness
                        }
                      />
                    </Grid>
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                      <CustomInput
                        label="Enter Weight"
                        onChange={props.handleChange("weight")}
                        value={props.values.weight}
                        onBlur={props.handleBlur("weight")}
                        helperText={props.touched.weight && props.errors.weight}
                        error={props.touched.weight && props.errors.weight}
                      />
                    </Grid>
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                      <CustomInput
                        label="Kg/M"
                        // selectValues={generateOptions(accounts, "name", "_id")}
                        // selectValues={generateOptionsFromIndexes(accountTypes)}
                        onChange={props.handleChange("selectKg")}
                        value={props.values.selectKg}
                        onBlur={props.handleBlur("selectKg")}
                        helperText={
                          props.touched.selectKg && props.errors.selectKg
                        }
                        error={props.touched.selectKg && props.errors.selectKg}
                      />
                    </Grid>
                  </Grid>
                  <h5 style={{ textAlign: "left", marginTop: "1rem" }}>
                    Characteristics
                  </h5>
                  <Grid container spacing={1} style={{ marginTop: "1rem" }}>
                    <Grid item lg={1} md={1} sm={12} xs={12}>
                      <h6 style={{ textAlign: "left" }}>Screw Speed:</h6>
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                      <div style={{ display: "flex", gap: ".5rem" }}>
                        <CustomInput
                          label="First Value"
                          onChange={props.handleChange("screwFirstVal")}
                          value={props.values.screwFirstVal}
                          onBlur={props.handleBlur("screwFirstVal")}
                          helperText={
                            props.touched.screwFirstVal &&
                            props.errors.screwFirstVal
                          }
                          error={
                            props.touched.screwFirstVal &&
                            props.errors.screwFirstVal
                          }
                        />
                        <CustomInput
                          label="Second Value"
                          onChange={props.handleChange("screwSecondVal")}
                          value={props.values.screwSecondVal}
                          onBlur={props.handleBlur("screwSecondVal")}
                          helperText={
                            props.touched.screwSecondVal &&
                            props.errors.screwSecondVal
                          }
                          error={
                            props.touched.screwSecondVal &&
                            props.errors.screwSecondVal
                          }
                        />
                      </div>
                    </Grid>
                    <Grid item lg={1} md={1} sm={1} xs={1}></Grid>
                    <Grid item lg={1} md={1} sm={12} xs={12}>
                      <h6 style={{ textAlign: "left" }}>Haul Off Speed:</h6>
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                      <CustomInput
                        label="Enter Value"
                        onChange={props.handleChange("haulOfSpeedVal")}
                        value={props.values.haulOfSpeedVal}
                        onBlur={props.handleBlur("haulOfSpeedVal")}
                        helperText={
                          props.touched.haulOfSpeedVal &&
                          props.errors.haulOfSpeedVal
                        }
                        error={
                          props.touched.haulOfSpeedVal &&
                          props.errors.haulOfSpeedVal
                        }
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={1} style={{ marginTop: "1rem" }}>
                    <Grid item lg={1} md={1} sm={12} xs={12}>
                      <h6 style={{ textAlign: "left" }}>Melt Temp:</h6>
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                      <div style={{ display: "flex", gap: ".5rem" }}>
                        <CustomInput
                          label="First Value"
                          onChange={props.handleChange("meltTempFirstVal")}
                          value={props.values.meltTempFirstVal}
                          onBlur={props.handleBlur("meltTempFirstVal")}
                          helperText={
                            props.touched.meltTempFirstVal &&
                            props.errors.meltTempFirstVal
                          }
                          error={
                            props.touched.meltTempFirstVal &&
                            props.errors.meltTempFirstVal
                          }
                        />
                        <CustomInput
                          label="Second Value"
                          onChange={props.handleChange("meltTempSecondVal")}
                          value={props.values.meltTempSecondVal}
                          onBlur={props.handleBlur("meltTempSecondVal")}
                          helperText={
                            props.touched.meltTempSecondVal &&
                            props.errors.meltTempSecondVal
                          }
                          error={
                            props.touched.meltTempSecondVal &&
                            props.errors.meltTempSecondVal
                          }
                        />
                      </div>
                    </Grid>
                    <Grid item lg={1} md={1} sm={1} xs={1}></Grid>
                    <Grid item lg={1} md={1} sm={12} xs={12}>
                      <h6 style={{ textAlign: "left" }}>Melt Pressure:</h6>
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                      <div style={{ display: "flex", gap: ".5rem" }}>
                        <CustomInput
                          label="First Value"
                          onChange={props.handleChange("meltPressureFirstVal")}
                          value={props.values.meltPressureFirstVal}
                          onBlur={props.handleBlur("meltPressureFirstVal")}
                          helperText={
                            props.touched.meltPressureFirstVal &&
                            props.errors.meltPressureFirstVal
                          }
                          error={
                            props.touched.meltPressureFirstVal &&
                            props.errors.meltPressureFirstVal
                          }
                        />
                        <CustomInput
                          label="Second Value"
                          onChange={props.handleChange("meltPressureSecondVal")}
                          value={props.values.meltPressureSecondVal}
                          onBlur={props.handleBlur("meltPressureSecondVal")}
                          helperText={
                            props.touched.meltPressureSecondVal &&
                            props.errors.meltPressureSecondVal
                          }
                          error={
                            props.touched.meltPressureSecondVal &&
                            props.errors.meltPressureSecondVal
                          }
                        />
                      </div>
                    </Grid>
                  </Grid>
                </CustomContainer>
                <CustomContainer>
                  <div>
                    <CustomButton
                      text="Submit"
                      variant="outlined"
                      style={{
                        marginTop: "2rem",
                        backgroundColor: "#22A19A",
                        color: "#FFFFFF",
                      }}
                    />
                  </div>
                </CustomContainer>
              </div>
            </Form>
          )}
        </Formik>

        <CustomTable
          fetchLoading={fetchLoading}
          data={[{}]}
          columnHeadings={[
            "Sr.No",
            "M/C No.",
            "Size",
            "SN-8/10",
            "Wall Thickness",
            "Weight",
          ]}
          keys={["", "", "", "", ""]}
          firstOptionText="View"
          onFirstOptionClick={printSetupCard}
          withSrNo
        />
      </div>
    </Sidenav>
  );
};

export default SetUpCard;
