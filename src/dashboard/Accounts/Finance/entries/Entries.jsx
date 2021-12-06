import React, { useState, useEffect } from "react";
import Sidenav from "../../../SideNav/Sidenav";
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
} from "../../../../components";
import { getAccounts } from "../../../../services/action/accountAction";

const initialValues = {
  amount: "",
  from: "",
  to: "",
  description: "",
};

const validationSchema = yup.object({
  amount: yup.string().required(),
  from: yup.string().required(),
  to: yup.string().required(),
  description: yup.string().required(),
});

const Entries = ({ history }) => {
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState("");
  const [success, setSuccess] = useState("");
  const [fetchLoading, setFetchLoading] = useState(false);

  const dispatch = useDispatch();

  const { accounts } = useSelector((state) => state.accounts);

  useEffect(() => {
    dispatch(getAccounts());
  }, []);

  const onSubmit = (values) => {};

  const printEntries = () => {
    history.push("");
  };

  return (
    <Sidenav title={"Entries"}>
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
                      <CustomInput label="Enter Amount" />
                    </Grid>
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                      <CustomInput
                        label="Select From Account"
                        selectValues={generateOptions(accounts, "name", "_id")}
                      />
                    </Grid>
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                      <CustomInput
                        label="Select To Account"
                        selectValues={generateOptions(accounts, "name", "_id")}
                      />
                    </Grid>
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                      <CustomInput label="Description" />
                    </Grid>
                  </Grid>
                </CustomContainer>
                <CustomContainer>
                  <div>
                    <CustomButton
                      text="Submit"
                      variant="outlined"
                      style={{
                        marginTop: "1rem",
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
            "From Account",
            "To Account",
            "Account Head",
            "Amount",
            "Description",
          ]}
          keys={["", "", "", ""]}
          firstOptionText="View"
          onFirstOptionClick={printEntries}
          withSrNo
        />
      </div>
    </Sidenav>
  );
};

export default Entries;
