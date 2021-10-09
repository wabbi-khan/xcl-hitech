import React, { useState, useEffect } from "react";
import Sidenav from "../../SideNav/Sidenav";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import {
  createOutwardGatePasses,
  getOutwardGatePasses,
} from "../../../services/action/outwardGatePassAction";
import { getPersons } from "../../../services/action/PersonAction";
import { getVehicles } from "../../../services/action/VehiclesAction";
import { getMaterialAction } from "../../../services/action/MaterialDataHandle";
import { Formik, Form, FieldArray, Field } from "formik";
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
    yup.object({
      item: yup.string().required("Item is Required"),
      quantity: yup.string().required("Quantity is Required"),
      remarks: yup.string().required("Remarks is Required"),
      unit: yup.string().required("Unit is Required"),
    })
  ),
});

const OutwardGatePass = ({ history }) => {
  const [fetchLoading, setFetchLoading] = useState(true);
  const [fetchError, setFetchError] = useState(true);
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

    setFetchLoading(true);
		dispatch(
			getOutwardGatePasses(null, (err) => {
				if (err) {
					setFetchError(err);
					setTimeout(() => {
						setFetchError('');
					}, 4000);
				}
				setFetchLoading(false);
			}),
		);
  }, []);

  const onSubmit = (values) => {
    setCreateLoading(true);
		dispatch(
			createOutwardGatePasses(values, (err) => {
				if (err) {
					setCreateError(err);
					setTimeout(() => {
						setCreateError('');
					}, 4000);
				} else {
					setSuccess('Category added successfully');
					setTimeout(() => {
						setSuccess('');
					}, 4000);
				}
				setCreateLoading(false);
			}),
		);
  };

  return (
    <Sidenav title={"Outward Gate Pass (Returnable/Non-Returnable)"}>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          initialTouched={{ items: [{}] }}
          validateOnMount={true}
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
                  <FieldArray name="items">
                    {({ push, remove, form }) => (
                      <>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "20px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <h4>Items</h4>
                            <CustomButton
                              type="button"
                              text="Add More"
                              style={{
                                backgroundColor: "#22A19A",
                                color: "#fff",
                              }}
                              onClick={() => {
                                props.setTouched({
                                  ...props.touched,
                                  items: [...props.touched.items, {}],
                                });
                                push({
                                  item: "",
                                  quantity: "",
                                  unit: "",
                                  remarks: "",
                                });
                              }}
                            />
                          </div>
                          {form.values.items.map((el, i) => (
                            <>
                              <div style={{ display: "flex", gap: "10px" }}>
                                <CustomInput
                                  label="Item"
                                  onChange={(value) => {
                                    form.setFieldValue(`items[${i}].item`, value)
                                    const material = materials.find(mat => mat._id === value)
                                    form.setFieldValue(`items[${i}].unit`, material.unit.name)
                                  }}
                                  onBlur={form.handleBlur(`items[${i}].item`)}
                                  value={el.item}
                                  helperText={
                                    form.errors.items &&
                                    form.touched.items &&
                                    form.touched.items[i] &&
                                    form.errors.items[i] &&
                                    form.touched?.items[i]?.item &&
                                    form.errors?.items[i]?.item
                                  }
                                  error={
                                    form.errors.items &&
                                    form.touched.items &&
                                    form.touched.items[i] &&
                                    form.errors.items[i] &&
                                    form.touched?.items[i]?.item &&
                                    form.errors?.items[i]?.item
                                  }
                                  selectValues={generateOptions(
                                    materials,
                                    "name",
                                    "_id"
                                  )}
                                />
                                <CustomInput
                                  label="Unit"
                                  onChange={form.handleChange(
                                    `items[${i}].unit`
                                  )}
                                  onBlur={form.handleBlur(`items[${i}].unit`)}
                                  value={el.unit}
                                  helperText={
                                    form.errors.items &&
                                    form.touched.items &&
                                    form.touched.items[i] &&
                                    form.errors.items[i] &&
                                    form.touched?.items[i]?.unit &&
                                    form.errors?.items[i]?.unit
                                  }
                                  error={
                                    form.errors.items &&
                                    form.touched.items &&
                                    form.touched.items[i] &&
                                    form.errors.items[i] &&
                                    form.touched?.items[i]?.unit &&
                                    form.errors?.items[i]?.unit
                                  }
                                />
                                <CustomInput
                                  label="Quantity"
                                  onChange={form.handleChange(
                                    `items[${i}].quantity`
                                  )}
                                  onBlur={form.handleBlur(
                                    `items[${i}].quantity`
                                  )}
                                  value={el.quantity}
                                  helperText={
                                    form.errors.items &&
                                    form.touched.items &&
                                    form.touched.items[i] &&
                                    form.errors.items[i] &&
                                    form.touched?.items[i]?.quantity &&
                                    form.errors?.items[i]?.quantity
                                  }
                                  error={
                                    form.errors.items &&
                                    form.touched.items &&
                                    form.touched.items[i] &&
                                    form.errors.items[i] &&
                                    form.touched?.items[i]?.quantity &&
                                    form.errors?.items[i]?.quantity
                                  }
                                />
                                <CustomInput
                                  label="Remarks"
                                  onChange={form.handleChange(
                                    `items[${i}].remarks`
                                  )}
                                  onBlur={form.handleBlur(
                                    `items[${i}].remarks`
                                  )}
                                  value={el.remarks}
                                  helperText={
                                    form.errors.items &&
                                    form.touched.items &&
                                    form.touched.items[i] &&
                                    form.errors.items[i] &&
                                    form.touched?.items[i]?.remarks &&
                                    form.errors?.items[i]?.remarks
                                  }
                                  error={
                                    form.errors.items &&
                                    form.touched.items &&
                                    form.touched.items[i] &&
                                    form.errors.items[i] &&
                                    form.touched?.items[i]?.remarks &&
                                    form.errors?.items[i]?.remarks
                                  }
                                />
                                {i !== 0 && (
                                  <CustomButton
                                    text="Delete"
                                    onClick={() =>
                                      form.values.items.length !== 1 &&
                                      remove(i)
                                    }
                                    size="small"
                                    style={{
                                      backgroundColor: "red",
                                      color: "#fff",
                                    }}
                                    type="button"
                                  />
                                )}
                              </div>
                            </>
                          ))}
                        </div>
                      </>
                    )}
                  </FieldArray>
               
                  <div style={{ marginTop: "40px" }}>
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
          columnHeadings={["Sr.No", "Customer Name", "Vehicle", "status"]}
          keys={[
            "name.name",
            "vehicle.number",
            "status",
          ]}
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
