import React, { useState, useEffect, useRef } from "react";
import Sidenav from "../../SideNav/Sidenav";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import {
  createOutwardGatePasses,
  deleteOutwardGatePasses,
  updateOutwardGatePasses,
  getOutwardGatePasses,
} from "../../../services/action/outwardGatePassAction";
import { getPersons } from "../../../services/action/PersonAction";
import { getVehicles } from "../../../services/action/VehiclesAction";
import { getMaterialAction } from "../../../services/action/MaterialDataHandle";
import { Formik, Form, FieldArray } from "formik";
import * as yup from "yup";

import {
  CustomButton,
  CustomInput,
  CustomTable,
  generateOptions,
  CustomContainer,
} from "../../../components";

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

const initialValues = {
  name: "",
  vehicle: "",
  status: "",
  items: [{ item: "", quantity: "", unit: "", remarks: "" }],
};

const validationSchema = yup.object().shape({
  name: yup.string().required(),
  vehicle: yup.string().required(),
  status: yup.string().required(),
  items: yup.array().of(
    yup.object().shape({
      item: yup.string().required(),
      quantity: yup.string().required(),
      remarks: yup.string().required(),
      unit: yup.string().required(),
    })
  ),
});

const OutwardGatePass = ({ history }) => {
  const [fetchLoading, setFetchLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState("");
  const [success, setSuccess] = useState("");

  const { persons } = useSelector((state) => state.persons);
  const { vehicles } = useSelector((state) => state.vehicles);
  const { materials } = useSelector((state) => state.materials);
  const { outwardGatePasses } = useSelector((state) => state.outwardGatePasses);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPersons());
    dispatch(getVehicles());
    dispatch(getMaterialAction());
    dispatch(getOutwardGatePasses());
  }, []);

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Sidenav title={"Outward Gate Pass (Returnable/Non-Returnable)"}>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(props) => (
            <>
              <Form>
                <CustomContainer>
                  <Grid container spacing={1} style={{ marginTop: 15 }}>
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                      <CustomInput
                        label="Select Name"
                        selectValues={generateOptions(persons, "name", "_id")}
                        value={props.values.name}
                        onChange={props.handleChange("name")}
                        onBlur={props.handleBlur("name")}
                        helperText={props.touched.name && props.errors.name}
                        error={props.touched.name && props.errors.name}
                      />
                    </Grid>
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                      <CustomInput
                        label="Select Vehicle"
                        selectValues={generateOptions(
                          vehicles,
                          "number",
                          "_id"
                        )}
                        value={props.values.vehicle}
                        onChange={props.handleChange("vehicle")}
                        onBlur={props.handleBlur("vehicle")}
                        helperText={
                          props.touched.vehicle && props.errors.vehicle
                        }
                        error={props.touched.vehicle && props.errors.vehicle}
                      />
                    </Grid>
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                      <CustomInput
                        label="Returnable/Non-Returnable"
                        selectValues={returnableOptions}
                        value={props.values.status}
                        onChange={props.handleChange("status")}
                        onBlur={props.handleBlur("status")}
                        helperText={props.touched.status && props.errors.status}
                        error={props.touched.status && props.errors.status}
                      />
                    </Grid>
                  </Grid>
                </CustomContainer>
                <div style={{ marginTop: 30, marginBottom: 30 }}>
                  <hr />
                </div>
                <CustomContainer>
                  <h4 className="text-left">Items</h4>
                  {/* <FieldArray name="items">
                    {(props2) => {
                      // console.log(props2);
                      return props.values.items.map((item, i) => {
                        console.log(item);
                        return (
                          <>
                            <div style={{ display: "flex", gap: "5px" }}>
                              <CustomInput
                                label="Item"
                                selectValues={materials}
                                value={props.values.items[i].item}
                                onChange={props.handleChange(`items[${i}].item`)}
                                onBlur={props.handleBlur(`items[${i}].item`)}
                                helperText={
                                  props.touched.items[i].item && props.errors.items[i].item  && props.errors.items[i].item 
                                }
                                error={
                                  props.touched.items[i].item && props.errors.items[i].item  && props.errors.items[i].item
                                }
                              />
                              <CustomInput
                                label="Quantity"
                                value={props.values.items[i].item}
                                onChange={props.handleChange(`items[${i}].item`)}
                                onBlur={props.handleBlur(`items[${i}].item`)}
                                helperText={
                                  props.touched.items[i].item && props.errors.items.length > 0 && props.errors.items[i].name 
                                }
                                error={
                                  props.touched.items[i].item && props.errors.items.length > 0 && props.errors.items[i].name
                                }
                              />
                              <CustomInput
                                label="Unit"
                                value={props.values.items[i].item}
                                onChange={props.handleChange(`items[${i}].item`)}
                                onBlur={props.handleBlur(`items[${i}].item`)}
                                helperText={
                                  props.touched.items[i].item && props.errors.items.length > 0 && props.errors.items[i].name 
                                }
                                error={
                                  props.touched.items[i].item && props.errors.items.length > 0 && props.errors.items[i].name
                                }
                              />
                              <CustomInput
                                label="Remarks"
                                value={props.values.items[i].item}
                                onChange={props.handleChange(`items[${i}].item`)}
                                onBlur={props.handleBlur(`items[${i}].item`)}
                                helperText={
                                  props.touched.items[i].item && props.errors.items.length > 0 && props.errors.items[i].name 
                                }
                                error={
                                  props.touched.items[i].item && props.errors.items.length > 0 && props.errors.items[i].name
                                }
                              />
                            </div>
                          </>
                        );
                      });
                    }}
                  </FieldArray> */}
                  <div>
                    <CustomButton
                      text="Submit"
                      variant="outlined"
                      style={{ backgroundColor: "#22A19A" }}
                      classNames="text-light"
                      loading={createLoading}
                      loaderColor="#fff"
                    />
                    <p style={{ textAlign: "center", color: "red" }}>
                      {createError}
                    </p>
                  </div>
                </CustomContainer>
              </Form>
            </>
          )}
        </Formik>

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
