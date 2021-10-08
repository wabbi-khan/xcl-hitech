import React, { useState } from "react";
import Sidenav from "../../SideNav/Sidenav";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { Formik, Form, FieldArray } from "formik";
import * as yup from "yup";
import { CustomContainer, CustomInput } from "../../../components";

const itemsInitialState = {
  size: "",
  pe: "",
  pn: "",
  sdr: "",
  lengthInMeters: "",
  noOfPipes: "",
};

const initialValues = {
  ntnNo: "",
  strnNo: "",
  regNameOfCom: "",
  contractor: "",
  ContractorphoneNo: "",
  contractorFax: "",
  contractorEmail: "",
  businessAddress: "",
  businessphoneNo: "",
  businessFax: "",
  businessEmail: "",
  fittingQuantity: "",
  modeOfTransportation: "",
  modeOfPayment: "",
  expectedDateOfDelivery: "",
  requirements: "",
  remarks: "",
  items: [
    {
      ...itemsInitialState,
    },
  ],
};

const validationSchema = yup.object({
  ntnNo: yup.string().required(),
  strnNo: yup.string().required(),
  address: yup.string().required(),
  contractor: yup.string().required(),
  ContractorphoneNo: yup.string().required(),
  contractorFax: yup.string().required(),
  contractorEmail: yup.string().required(),
  businessAddress: yup.string().required(),
  businessphoneNo: yup.string().required(),
  businessFax: yup.string().required(),
  businessEmail: yup.string().required(),
  fittingQuantity: yup.string().required(),
  modeOfTransportation: yup.string().required(),
  modeOfPayment: yup.string().required(),
  expectedDateOfDelivery: yup.string().required(),
  requirements: yup.string().required(),
  remarks: yup.string().required(),
  items: yup.array().of(
    yup.object().shape({
      size: yup.string().required("Size is required"),
      pe: yup.string().required("PE is required"),
      pn: yup.string().required("PN is required"),
      sdr: yup.string().required("SDR is required"),
      lengthInMeters: yup.string().required("Length in meters is required"),
      noOfPipes: yup.string().required("No of pipes is required"),
    })
  ),
});

const SalesContract = () => {
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState("");
  const [success, setSuccess] = useState("");
  const dispatch = useDispatch();

  const onSubmit = (values) => {
    // console.log(values);
    setCreateLoading(true);
    dispatch();
    //   createOrderBooking(values, (err) => {
    //     if (err) {
    //       setCreateError(err);
    //       setTimeout(() => {
    //         setCreateError("");
    //       }, 4000);
    //     } else {
    //       setSuccess("Order successfully created");
    //       setTimeout(() => {
    //         setSuccess("");
    //       }, 4000);
    //     }
    //     setCreateLoading(false);
    //   })
  };

  return (
    <Sidenav title={"Sales Contract"}>
      <CustomContainer>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(props) => (
            <Form>
              <Grid container spacing={1} style={{ marginTop: 15 }}>
                <Grid item lg={2} md={2} sm={12} xs={12}>
                  <CustomInput
                    label="Enter NTN No."
                    onChange={props.handleChange("ntnNo")}
                    value={props.values.ntnNo}
                    onBlur={props.handleBlur("ntnNo")}
                    helperText={props.touched.ntnNo && props.errors.ntnNo}
                    error={props.touched.ntnNo && props.errors.ntnNo}
                  />
                </Grid>
                <Grid item lg={2} md={2} sm={12} xs={12}>
                  <CustomInput
                    label="Enter STRN No."
                    onChange={props.handleChange("strnNo")}
                    value={props.values.strnNo}
                    onBlur={props.handleBlur("strnNo")}
                    helperText={props.touched.strnNo && props.errors.strnNo}
                    error={props.touched.strnNo && props.errors.strnNo}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1} style={{ marginTop: 10 }}>
                <Grid item lg={2} md={2} sm={12} xs={12}>
                  <CustomInput
                    label="Reg. Name of Company"
                    onChange={props.handleChange("regNameOfCom")}
                    value={props.values.regNameOfCom}
                    onBlur={props.handleBlur("regNameOfCom")}
                    helperText={
                      props.touched.regNameOfCom && props.errors.regNameOfCom
                    }
                    error={
                      props.touched.regNameOfCom && props.errors.regNameOfCom
                    }
                  />
                </Grid>
                <Grid item lg={2} md={2} sm={12} xs={12}>
                  <CustomInput
                    label="Contractor"
                    onChange={props.handleChange("contractor")}
                    value={props.values.contractor}
                    onBlur={props.handleBlur("contractor")}
                    helperText={
                      props.touched.contractor && props.errors.contractor
                    }
                    error={props.touched.contractor && props.errors.contractor}
                  />
                </Grid>
                <Grid item lg={2} md={2} sm={12} xs={12}>
                  <CustomInput
                    label="Telephone No."
                    onChange={props.handleChange("ContractorphoneNo")}
                    value={props.values.ContractorphoneNo}
                    onBlur={props.handleBlur("ContractorphoneNo")}
                    helperText={
                      props.touched.ContractorphoneNo &&
                      props.errors.ContractorphoneNo
                    }
                    error={
                      props.touched.ContractorphoneNo &&
                      props.errors.ContractorphoneNo
                    }
                  />
                </Grid>
                <Grid item lg={2} md={2} sm={12} xs={12}>
                  <CustomInput
                    label="Fax"
                    onChange={props.handleChange("contractorFax")}
                    value={props.values.contractorFax}
                    onBlur={props.handleBlur("contractorFax")}
                    helperText={
                      props.touched.contractorFax && props.errors.contractorFax
                    }
                    error={
                      props.touched.contractorFax && props.errors.contractorFax
                    }
                  />
                </Grid>
                <Grid item lg={2} md={2} sm={12} xs={12}>
                  <CustomInput
                    label="Email"
                    onChange={props.handleChange("contractorEmail")}
                    value={props.values.contractorEmail}
                    onBlur={props.handleBlur("contractorEmail")}
                    helperText={
                      props.touched.contractorEmail &&
                      props.errors.contractorEmail
                    }
                    error={
                      props.touched.contractorEmail &&
                      props.errors.contractorEmail
                    }
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1} style={{ marginTop: 10 }}>
                <Grid item lg={2} md={2} sm={12} xs={12}>
                  <CustomInput
                    label="Business Address"
                    onChange={props.handleChange("businessAddress")}
                    value={props.values.businessAddress}
                    onBlur={props.handleBlur("businessAddress")}
                    helperText={
                      props.touched.businessAddress &&
                      props.errors.businessAddress
                    }
                    error={
                      props.touched.businessAddress &&
                      props.errors.businessAddress
                    }
                  />
                </Grid>
                <Grid item lg={2} md={2} sm={12} xs={12}>
                  <CustomInput
                    label="Telephone No."
                    onChange={props.handleChange("businessphoneNo")}
                    value={props.values.businessphoneNo}
                    onBlur={props.handleBlur("businessphoneNo")}
                    helperText={
                      props.touched.businessphoneNo &&
                      props.errors.businessphoneNo
                    }
                    error={
                      props.touched.businessphoneNo &&
                      props.errors.businessphoneNo
                    }
                  />
                </Grid>
                <Grid item lg={2} md={2} sm={12} xs={12}>
                  <CustomInput
                    label="Fax"
                    onChange={props.handleChange("businessFax")}
                    value={props.values.businessFax}
                    onBlur={props.handleBlur("businessFax")}
                    helperText={
                      props.touched.businessFax && props.errors.businessFax
                    }
                    error={
                      props.touched.businessFax && props.errors.businessFax
                    }
                  />
                </Grid>
                <Grid item lg={2} md={2} sm={12} xs={12}>
                  <CustomInput
                    label="Email"
                    onChange={props.handleChange("businessEmail")}
                    value={props.values.businessEmail}
                    onBlur={props.handleBlur("businessEmail")}
                    helperText={
                      props.touched.businessEmail && props.errors.businessEmail
                    }
                    error={
                      props.touched.businessEmail && props.errors.businessEmail
                    }
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1} style={{ marginTop: 10 }}>
                <Grid item lg={2} md={2} sm={12} xs={12}>
                  <CustomInput
                    label="Delivery Address"
                    onChange={props.handleChange("businessAddress")}
                    value={props.values.businessAddress}
                    onBlur={props.handleBlur("businessAddress")}
                    helperText={
                      props.touched.businessAddress &&
                      props.errors.businessAddress
                    }
                    error={
                      props.touched.businessAddress &&
                      props.errors.businessAddress
                    }
                  />
                </Grid>
                <Grid item lg={2} md={2} sm={12} xs={12}>
                  <CustomInput
                    label="Telephone No."
                    onChange={props.handleChange("businessphoneNo")}
                    value={props.values.businessphoneNo}
                    onBlur={props.handleBlur("businessphoneNo")}
                    helperText={
                      props.touched.businessphoneNo &&
                      props.errors.businessphoneNo
                    }
                    error={
                      props.touched.businessphoneNo &&
                      props.errors.businessphoneNo
                    }
                  />
                </Grid>
                <Grid item lg={2} md={2} sm={12} xs={12}>
                  <CustomInput
                    label="Fax"
                    onChange={props.handleChange("businessFax")}
                    value={props.values.businessFax}
                    onBlur={props.handleBlur("businessFax")}
                    helperText={
                      props.touched.businessFax && props.errors.businessFax
                    }
                    error={
                      props.touched.businessFax && props.errors.businessFax
                    }
                  />
                </Grid>
                <Grid item lg={2} md={2} sm={12} xs={12}>
                  <CustomInput
                    label="Email"
                    onChange={props.handleChange("businessEmail")}
                    value={props.values.businessEmail}
                    onBlur={props.handleBlur("businessEmail")}
                    helperText={
                      props.touched.businessEmail && props.errors.businessEmail
                    }
                    error={
                      props.touched.businessEmail && props.errors.businessEmail
                    }
                  />
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </CustomContainer>
    </Sidenav>
  );
};

export default SalesContract;
