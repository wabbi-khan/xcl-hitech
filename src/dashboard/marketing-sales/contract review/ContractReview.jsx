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
import {
  createContractReview,
  getContractReview,
} from "../../../services/action/contractReviewAction";
import { getSalesContract } from "../../../services/action/salesContractAction";
import { Formik, Form, FieldArray } from "formik";
import * as yup from "yup";

const options = [
  {
    name: "Yes",
    value: "true",
  },
  {
    name: "No",
    value: "false",
  },
];

const initialValues = {
  refNo: "",
  customer: "",
  q1: "",
  q2: "",
  q3: "",
  q4: "",
  q5: "",
  q6: "",
};

const validationSchema = yup.object({
  refNo: yup.string().required("Reference no is required"),
  customer: yup.string().required("Customer Name is required"),
  q1: yup.string().required(),
  q2: yup.string().required(),
  q3: yup.string().required(),
  q4: yup.string().required(),
  q5: yup.string().required(),
  q6: yup.string().required(),
});

const ContractReview = ({ history }) => {
  const [fetchLoading, setFetchLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedSalesContract, setSelectedSalesContract] = useState({});

  const dispatch = useDispatch();

  const { salesContracts } = useSelector((state) => state.salesContracts);
  const { contractReviews } = useSelector((state) => state.contractReviews);

  useEffect(() => {
    setFetchLoading(true);
    dispatch(
      getContractReview(null, (err) => {
        if (err) {
          setFetchError(err);
          setTimeout(() => {
            setFetchError("");
          }, 4000);
        }
        setFetchLoading(false);
      })
    );
    dispatch(getSalesContract());
  }, []);

  const printContract = (e) => {
    history.push({
      pathname: "/marketing_dashboard/print_contract_review",
      state: { contractReview: e },
    });
  };

  const onSubmit = (values) => {
    setCreateLoading(true);
    dispatch(
      createContractReview(values, (err) => {
        if (err) {
          setCreateError(err);
          setTimeout(() => {
            setCreateError("");
          }, 4000);
        } else {
          setSuccess("Contract Review added successfully");
          setTimeout(() => {
            setSuccess("");
          }, 4000);
        }
        setCreateLoading(false);
      })
    );
  };

  return (
    <Sidenav title="Contract Review">
      <CustomContainer>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(props) => (
            <Form>
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                }}
              >
                <CustomInput
                  label="Select Ref No."
                  style={{ width: "25%" }}
                  selectValues={generateOptions(salesContracts, "code", "_id")}
                  onChange={(e) => {
                    props.setFieldValue("refNo", e);
                    const salesContract = salesContracts.find(
                      (el) => el._id === e
                    );
                    if (salesContract) {
                      setSelectedSalesContract(salesContract);
                    }
                    props.setFieldValue(
                      "customer",
                      salesContract.conpanyRegName
                    );
                  }}
                  value={props.values.refNo}
                  onBlur={props.handleBlur("refNo")}
                  helperText={props.touched.refNo && props.errors.refNo}
                  error={props.touched.refNo && props.errors.refNo}
                />
                <CustomInput
                  label="Customer Name"
                  style={{ width: "25%" }}
                  onChange={props.handleChange("customer")}
                  value={props.values.customer}
                  onBlur={props.handleBlur("customer")}
                  helperText={props.touched.customer && props.errors.customer}
                  error={props.touched.customer && props.errors.customer}
                />
              </div>

              <CustomTable
                fetchLoading={false}
                data={selectedSalesContract.orders}
                columnHeadings={["Sr. No", "Size/Dia", "SN/PN", "Unit", "Qty"]}
                keys={["size", "snPn", "unit", "qty"]}
                withSrNo
              />

              <div style={{ marginTop: "2rem" }}>
                <h4 style={{ textAlign: "left", marginBottom: "1rem" }}>
                  Contract Review:
                </h4>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "sapce-between",
                      alignItems: "center",
                      width: "30%",
                      gap: "1rem",
                    }}
                  >
                    <span style={{ flex: 1, textAlign: "left" }}>
                      1. Customer Requirements are defined:
                    </span>
                    <CustomInput
                      label="Yes/No"
                      selectValues={options}
                      width="100px"
                      onChange={props.handleChange("q1")}
                      value={props.values.q1}
                      onBlur={props.handleBlur("q1")}
                      error={props.touched.q1 && props.errors.q1}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "sapce-between",
                      alignItems: "center",
                      width: "30%",
                      gap: "1rem",
                    }}
                  >
                    <span style={{ flex: 2, textAlign: "left" }}>
                      2. Production capability is available:
                    </span>
                    <CustomInput
                      label="Yes/No"
                      selectValues={options}
                      width="100px"
                      onChange={props.handleChange("q2")}
                      value={props.values.q2}
                      onBlur={props.handleBlur("q2")}
                      error={props.touched.q2 && props.errors.q2}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "sapce-between",
                      alignItems: "center",
                      width: "30%",
                      gap: "1rem",
                    }}
                  >
                    <span style={{ flex: 2, textAlign: "left" }}>
                      3. Delivery time is achievable:
                    </span>
                    <CustomInput
                      label="Yes/No"
                      selectValues={options}
                      width="100px"
                      onChange={props.handleChange("q3")}
                      value={props.values.q3}
                      onBlur={props.handleBlur("q3")}
                      error={props.touched.q3 && props.errors.q3}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "sapce-between",
                      alignItems: "center",
                      width: "30%",
                      gap: "1rem",
                    }}
                  >
                    <span style={{ flex: 2, textAlign: "left" }}>
                      4. Raw material is available:
                    </span>
                    <CustomInput
                      label="Yes/No"
                      selectValues={options}
                      width="100px"
                      onChange={props.handleChange("q4")}
                      value={props.values.q4}
                      onBlur={props.handleBlur("q4")}
                      error={props.touched.q4 && props.errors.q4}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "sapce-between",
                      alignItems: "center",
                      width: "30%",
                      gap: "1rem",
                    }}
                  >
                    <span style={{ flex: 2, textAlign: "left" }}>
                      5. Any regulatory requirements:
                    </span>
                    <CustomInput
                      label="Yes/No"
                      selectValues={options}
                      width="100px"
                      onChange={props.handleChange("q5")}
                      value={props.values.q5}
                      onBlur={props.handleBlur("q5")}
                      error={props.touched.q5 && props.errors.q5}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "sapce-between",
                      alignItems: "center",
                      width: "30%",
                      gap: "1rem",
                    }}
                  >
                    <span style={{ flex: 2, textAlign: "left" }}>
                      6. Previous difference resolve (if any):
                    </span>
                    <CustomInput
                      label="Yes/No"
                      selectValues={options}
                      width="100px"
                      onChange={props.handleChange("q6")}
                      value={props.values.q6}
                      onBlur={props.handleBlur("q6")}
                      error={props.touched.q6 && props.errors.q6}
                    />
                  </div>
                </div>
              </div>
              <div style={{ marginTop: "1rem" }}>
                <CustomButton
                  text="Submit"
                  style={{ backgroundColor: "#22A19A", color: "#fff" }}
                  loading={createLoading}
                  loaderColor="#fff"
                />
                <p>{success}</p>
              </div>
            </Form>
          )}
        </Formik>
      </CustomContainer>
      <CustomTable
        fetchLoading={fetchLoading}
        data={contractReviews}
        columnHeadings={["Sr.No", "Ref No.", "Customer Name"]}
        keys={["refNo.code", "refNo.conpanyRegName"]}
        firstOptionText="View"
        onFirstOptionClick={printContract}
        withSrNo
      />
    </Sidenav>
  );
};

export default ContractReview;
