import React, { useState, useEffect } from "react";
import Sidenav from "../../SideNav/Sidenav";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import {
  CustomContainer,
  CustomButton,
  CustomInput,
  generateOptions,
  CustomTable,
} from "../../../components";
import { createCustomerFeedback } from "../../../services/action/customerFeedbackAction";
import { Formik, Form, FieldArray } from "formik";
import * as yup from "yup";

const options = [
  {
    value: "1",
    name: "1",
  },
  {
    value: "2",
    name: "2",
  },
  {
    value: "3",
    name: "3",
  },
  {
    value: "4",
    name: "4",
  },
  {
    value: "5",
    name: "5",
  },
];

const initialValues = {
  customerName: "",
  address: "",
  question1: "",
  question2: "",
  question3: "",
  question4: "",
  question5: "",
  question6: "",
  comments: "",
};

const validationSchema = yup.object({
  customerName: yup.string().required("Customer Name is required"),
  address: yup.string().required("Address is required"),
  question1: yup.string().required(),
  question2: yup.string().required(),
  question3: yup.string().required(),
  question4: yup.string().required(),
  question5: yup.string().required(),
  question6: yup.string().required(),
  comments: yup.string().required("Comments are required"),
});

const CustomerFeedback = ({ history }) => {
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState("");
  const [success, setSuccess] = useState("");
  const [fetchLoading, setFetchLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    // setFetchLoading(true);
    // dispatch(
    // 	getContractReview(null, (err) => {
    // 		if (err) {
    // 			setFetchError(err);
    // 			setTimeout(() => {
    // 				setFetchError('');
    // 			}, 4000);
    // 		}
    // 		setFetchLoading(false);
    // 	})
    // );
    // dispatch(getSalesContract());
  }, []);

  const onSubmit = (values) => {
    setCreateLoading(true);
    dispatch(
      createCustomerFeedback(values, (err) => {
        if (err) {
          setCreateError(err);
          setTimeout(() => {
            setCreateError("");
          }, 4000);
        } else {
          setSuccess("Customer Feedback added successfully");
          setTimeout(() => {
            setSuccess("");
          }, 4000);
        }
        setCreateLoading(false);
      })
    );
  };

  const printFeedback = () => {
    history.push("/marketing_dashboard/print_customer_feedback");
  };

  return (
    <Sidenav title="Customer Feedback">
      <CustomContainer>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(props) => (
            <Form>
              <div style={{ display: "flex", gap: "1rem" }}>
                <CustomInput
                  label="Customer Name"
                  onChange={props.handleChange("customerName")}
                  value={props.values.customerName}
                  onBlur={props.handleBlur("customerName")}
                  helperText={
                    props.touched.customerName && props.errors.customerName
                  }
                  error={
                    props.touched.customerName && props.errors.customerName
                  }
                />
                <CustomInput
                  label="Address"
                  onChange={props.handleChange("address")}
                  value={props.values.address}
                  onBlur={props.handleBlur("address")}
                  helperText={props.touched.address && props.errors.address}
                  error={props.touched.address && props.errors.address}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ".4rem",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  textAlign: "left",
                  marginTop: "1rem",
                }}
              >
                <h6 style={{ fontWeight: "bold" }}>Dear Sir,</h6>
                <div>
                  <p>
                    We are thankful for your patronaization and using our
                    products, HI TECH Management is always very keen to extend
                    best cooperation to facilitate our customers, to their best.
                    To further improve, we need your cooperation & assistance &
                    therefore, forwarding you a format for yout comments and
                    advice.
                  </p>
                  <p>
                    We would be much obliged, if you may return us the same with
                    your valued advice and comments
                  </p>
                </div>

                <div
                  style={{
                    marginTop: "1rem",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <div>
                      <h6 style={{ fontWeight: "bold" }}>Description</h6>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "2rem",
                          marginTop: "1rem",
                        }}
                      >
                        <div style={{ display: "flex", gap: "1rem" }}>
                          <span>1.</span>
                          <span>Customer Requirements are defined:</span>
                        </div>
                        <div style={{ display: "flex", gap: "1rem" }}>
                          <span>2.</span>
                          <span>Production Capability is available:</span>
                        </div>
                        <div style={{ display: "flex", gap: "1rem" }}>
                          <span>3.</span>
                          <span>Delivery time is achivevable:</span>
                        </div>
                        <div style={{ display: "flex", gap: "1rem" }}>
                          <span>4.</span>
                          <span>Raw material is available:</span>
                        </div>
                        <div style={{ display: "flex", gap: "1rem" }}>
                          <span>5.</span>
                          <span>Any regulatory requirement: </span>
                        </div>
                        <div style={{ display: "flex", gap: "1rem" }}>
                          <span>6.</span>
                          <span>Previous difference resolve (if any)</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h6 style={{ fontWeight: "bold" }}>Rating: 5</h6>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: ".9rem",
                        }}
                      >
                        <CustomInput
                          label="Rating"
                          selectValues={options}
                          width="200px"
                          onChange={props.handleChange("question1")}
                          value={props.values.question1}
                          onBlur={props.handleBlur("question1")}
                          helperText={
                            props.touched.question1 && props.errors.question1
                          }
                          error={
                            props.touched.question1 && props.errors.question1
                          }
                        />
                        <CustomInput
                          width="200px"
                          label="Rating"
                          selectValues={options}
                          onChange={props.handleChange("question2")}
                          value={props.values.question2}
                          onBlur={props.handleBlur("question2")}
                          helperText={
                            props.touched.question2 && props.errors.question2
                          }
                          error={
                            props.touched.question2 && props.errors.question2
                          }
                        />
                        <CustomInput
                          width="200px"
                          label="Rating"
                          selectValues={options}
                          onChange={props.handleChange("question3")}
                          value={props.values.question3}
                          onBlur={props.handleBlur("question3")}
                          helperText={
                            props.touched.question3 && props.errors.question3
                          }
                          error={
                            props.touched.question3 && props.errors.question3
                          }
                        />
                        <CustomInput
                          width="200px"
                          label="Rating"
                          selectValues={options}
                          onChange={props.handleChange("question4")}
                          value={props.values.question4}
                          onBlur={props.handleBlur("question4")}
                          helperText={
                            props.touched.question4 && props.errors.question4
                          }
                          error={
                            props.touched.question4 && props.errors.question4
                          }
                        />
                        <CustomInput
                          width="200px"
                          label="Rating"
                          selectValues={options}
                          onChange={props.handleChange("question5")}
                          value={props.values.question5}
                          onBlur={props.handleBlur("question5")}
                          helperText={
                            props.touched.question5 && props.errors.question5
                          }
                          error={
                            props.touched.question5 && props.errors.question5
                          }
                        />
                        <CustomInput
                          width="200px"
                          label="Rating"
                          selectValues={options}
                          onChange={props.handleChange("question6")}
                          value={props.values.question6}
                          onBlur={props.handleBlur("question6")}
                          helperText={
                            props.touched.question6 && props.errors.question6
                          }
                          error={
                            props.touched.question6 && props.errors.question6
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div style={{ marginTop: "3rem" }}>
                    <CustomInput
                      label="Comments/Any Suggestions"
                      width="70%"
                      onChange={props.handleChange("comments")}
                      value={props.values.comments}
                      onBlur={props.handleBlur("comments")}
                      helperText={
                        props.touched.comments && props.errors.comments
                      }
                      error={props.touched.comments && props.errors.comments}
                    />
                  </div>
                  <p style={{ marginTop: "1rem" }}>
                    Look forward to have your continued patronization &
                    cooperation, we remains
                  </p>
                </div>
              </div>
              <CustomButton
                text="Submit"
                style={{
                  marginTop: "2rem",
                  backgroundColor: "#22A19A",
                  color: "#fff",
                }}
                loading={createLoading}
                loaderColor="#fff"
              />
              <p>{success}</p>
            </Form>
          )}
        </Formik>
      </CustomContainer>

      <CustomTable
        fetchLoading={fetchLoading}
        data={[{}]}
        columnHeadings={["Sr.No", "Customer Name", "Customer Address"]}
        keys={["refNo.code", "refNo.conpanyRegName"]}
        firstOptionText="View"
        onFirstOptionClick={printFeedback}
        withSrNo
      />
    </Sidenav>
  );
};

export default CustomerFeedback;
