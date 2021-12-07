import React, { useState, useEffect } from "react";
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
// import MaterialAddRow from './commponent/materialAddRow'

const initialValues = {
  selectPrNo: "",
  selectOrderNo: "",
  rawMaterial: "",
  productionHours: "",
  selectShift: "",
  operator: "",
  weight: "",
  description: "",
  finishedPipe: "",
  finishedWeight: "",
  rcycWeight: "",
  wastageWeight: "",
  totalWeight: "",
  downtime: "",
  remarks: "",
};

const validationSchema = yup.object({
  selectPrNo: yup.string().required("Shift is Required"),
  selectOrderNo: yup.string().required("Order No. is Required"),
  rawMaterial: yup.string().required("Raw Material is Required"),
  productionHours: yup.number().required("Production Hours Required"),
  selectShift: yup.string().required("Shift is Required"),
  operator: yup.string().required("Operator is Required"),
  weight: yup.string().required("Weight is Required"),
  description: yup.string().required("Description is Required"),
  finishedPipe: yup.string().required("Finished Pipe is Required"),
  finishedWeight: yup.string().required("Finished Weight is Required"),
  rcycWeight: yup.string().required("R/Cyc Weight is Required"),
  wastageWeight: yup.string().required("Wastage Weight is Required"),
  totalWeight: yup.string().required("Total Weight is Required"),
  downtime: yup.string().required("Downtime is Required"),
  remarks: yup.string().required("Remarks is Required"),
});

const PurchaseReport = ({ history }) => {
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
    <Sidenav title={"Production Report"}>
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
                  <Grid container spacing={1}>
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                      <CustomInput
                        label="Select P.R. No."
                        // selectValues={generateOptions(accounts, "name", "_id")}
                        // selectValues={generateOptionsFromIndexes(selectMat)}
                        onChange={props.handleChange("selectPrNo")}
                        value={props.values.selectPrNo}
                        onBlur={props.handleBlur("selectPrNo")}
                        helperText={
                          props.touched.selectPrNo && props.errors.selectPrNo
                        }
                        error={
                          props.touched.selectPrNo && props.errors.selectPrNo
                        }
                      />
                    </Grid>
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                      <CustomInput
                        label="Machine No."
                        disabled
                        onChange={props.handleChange("machineNo")}
                        value={props.values.machineNo}
                        onBlur={props.handleBlur("machineNo")}
                        helperText={
                          props.touched.machineNo && props.errors.machineNo
                        }
                        error={
                          props.touched.machineNo && props.errors.machineNo
                        }
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={1} style={{ marginTop: "1rem" }}>
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                      <CustomInput
                        label="Select Order No."
                        // selectValues={generateOptions(accounts, "name", "_id")}
                        // selectValues={generateOptionsFromIndexes(selectMat)}
                        onChange={props.handleChange("selectOrderNo")}
                        value={props.values.selectOrderNo}
                        onBlur={props.handleBlur("selectOrderNo")}
                        helperText={
                          props.touched.selectOrderNo &&
                          props.errors.selectOrderNo
                        }
                        error={
                          props.touched.selectOrderNo &&
                          props.errors.selectOrderNo
                        }
                      />
                    </Grid>
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                      <CustomInput
                        label="Raw Material"
                        onChange={props.handleChange("rawMaterial")}
                        value={props.values.rawMaterial}
                        onBlur={props.handleBlur("rawMaterial")}
                        helperText={
                          props.touched.rawMaterial && props.errors.rawMaterial
                        }
                        error={
                          props.touched.rawMaterial && props.errors.rawMaterial
                        }
                      />
                    </Grid>
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                      <CustomInput
                        label="Production Hours"
                        type="number"
                        onChange={props.handleChange("productionHours")}
                        value={props.values.productionHours}
                        onBlur={props.handleBlur("productionHours")}
                        helperText={
                          props.touched.productionHours &&
                          props.errors.productionHours
                        }
                        error={
                          props.touched.productionHours &&
                          props.errors.productionHours
                        }
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={1} style={{ marginTop: "1rem" }}>
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                      <CustomInput
                        label="Select Shift"
                        // selectValues={generateOptions(accounts, "name", "_id")}
                        // selectValues={generateOptionsFromIndexes(selectMat)}
                        onChange={props.handleChange("selectShift")}
                        value={props.values.selectShift}
                        onBlur={props.handleBlur("selectShift")}
                        helperText={
                          props.touched.selectShift && props.errors.selectShift
                        }
                        error={
                          props.touched.selectShift && props.errors.selectShift
                        }
                      />
                    </Grid>
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                      <CustomInput
                        label="Name of Operator"
                        onChange={props.handleChange("operator")}
                        value={props.values.operator}
                        onBlur={props.handleBlur("operator")}
                        helperText={
                          props.touched.operator && props.errors.operator
                        }
                        error={props.touched.operator && props.errors.operator}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={1} style={{ marginTop: "1rem" }}>
                    <Grid item lg={1} md={1} sm={1} xs={1}>
                      <h5 style={{ marginTop: ".4rem" }}>1.</h5>
                    </Grid>
                    <Grid item lg={2} md={2} sm={12} xs={12}>
                      <CustomInput
                        label="Weight/m (Kg)"
                        onChange={props.handleChange("weight")}
                        value={props.values.weight}
                        onBlur={props.handleBlur("weight")}
                        helperText={props.touched.weight && props.errors.weight}
                        error={props.touched.weight && props.errors.weight}
                      />
                    </Grid>
                    <Grid item lg={2} md={2} sm={12} xs={12}>
                      <CustomInput
                        label="Description(Dia/Standard)"
                        onChange={props.handleChange("description")}
                        value={props.values.description}
                        onBlur={props.handleBlur("description")}
                        helperText={
                          props.touched.description && props.errors.description
                        }
                        error={
                          props.touched.description && props.errors.description
                        }
                      />
                    </Grid>
                    <Grid item lg={2} md={2} sm={12} xs={12}>
                      <CustomInput
                        label="Finished Pipe"
                        onChange={props.handleChange("finishedPipe")}
                        value={props.values.finishedPipe}
                        onBlur={props.handleBlur("finishedPipe")}
                        helperText={
                          props.touched.finishedPipe &&
                          props.errors.finishedPipe
                        }
                        error={
                          props.touched.finishedPipe &&
                          props.errors.finishedPipe
                        }
                      />
                    </Grid>
                    <Grid item lg={2} md={2} sm={12} xs={12}>
                      <CustomInput
                        label="Finished Weight(kg)"
                        onChange={props.handleChange("finishedWeight")}
                        value={props.values.finishedWeight}
                        onBlur={props.handleBlur("finishedWeight")}
                        helperText={
                          props.touched.finishedWeight &&
                          props.errors.finishedWeight
                        }
                        error={
                          props.touched.finishedWeight &&
                          props.errors.finishedWeight
                        }
                      />
                    </Grid>
                    <Grid item lg={2} md={2} sm={12} xs={12}>
                      <CustomInput
                        label="R/Cyc Wt (kg)"
                        onChange={props.handleChange("rcycWeight")}
                        value={props.values.rcycWeight}
                        onBlur={props.handleBlur("rcycWeight")}
                        helperText={
                          props.touched.rcycWeight && props.errors.rcycWeight
                        }
                        error={
                          props.touched.rcycWeight && props.errors.rcycWeight
                        }
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={1} style={{ marginTop: "1rem" }}>
                    <Grid item lg={1} md={1} sm={1} xs={1}></Grid>
                    <Grid item lg={2} md={2} sm={12} xs={12}>
                      <CustomInput
                        label="Wastage Weight (Kg)"
                        onChange={props.handleChange("wastageWeight")}
                        value={props.values.wastageWeight}
                        onBlur={props.handleBlur("wastageWeight")}
                        helperText={
                          props.touched.wastageWeight &&
                          props.errors.wastageWeight
                        }
                        error={
                          props.touched.wastageWeight &&
                          props.errors.wastageWeight
                        }
                      />
                    </Grid>
                    <Grid item lg={2} md={2} sm={12} xs={12}>
                      <CustomInput
                        label="Total Weight (kg)"
                        onChange={props.handleChange("totalWeight")}
                        value={props.values.totalWeight}
                        onBlur={props.handleBlur("totalWeight")}
                        helperText={
                          props.touched.totalWeight && props.errors.totalWeight
                        }
                        error={
                          props.touched.totalWeight && props.errors.totalWeight
                        }
                      />
                    </Grid>
                    <Grid item lg={2} md={2} sm={12} xs={12}>
                      <CustomInput
                        label="Downtime (Hours/Min)"
                        onChange={props.handleChange("downtime")}
                        value={props.values.downtime}
                        onBlur={props.handleBlur("downtime")}
                        helperText={
                          props.touched.downtime && props.errors.downtime
                        }
                        error={props.touched.downtime && props.errors.downtime}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={1} style={{ marginTop: "4rem" }}>
                    <Grid item lg={1} md={1} sm={1} xs={1}></Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                      <CustomInput
                        label="Remarks"
                        onChange={props.handleChange("remarks")}
                        value={props.values.remarks}
                        onBlur={props.handleBlur("remarks")}
                        helperText={
                          props.touched.remarks && props.errors.remarks
                        }
                        error={props.touched.remarks && props.errors.remarks}
                      />
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

export default PurchaseReport;
