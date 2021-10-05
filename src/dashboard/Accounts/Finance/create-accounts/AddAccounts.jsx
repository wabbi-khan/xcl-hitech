import React, { useState, useEffect } from "react";
import Sidenav from "../../../SideNav/Sidenav";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { accountTypes } from "../../../../constants/accountTypes";
import {
  createAccounts,
  deleteAccounts,
  getAccounts,
  updateAccounts,
} from "../../../../services/action/accountAction";
import {
  CustomButton,
  CustomTable,
  CustomContainer,
  CustomInput,
  generateOptionsFromIndexes,
} from "../../../../components";
import Loader from "react-loader-spinner";
import EditAccounts from "./EditAccounts";

const initialValues = {
  accountType: "",
  name: "",
  startingBalance: "",
};

const validationSchema = yup.object({
  accountType: yup.string().required(),
  name: yup.string().required(),
  startingBalance: yup.string().required(),
});

const AddAccounts = ({ history }) => {
  const [fetchLoading, setFetchLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [createLoading, setCreateLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [createError, setCreateError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [account, setAccount] = useState();
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const { accounts } = useSelector((state) => state.accounts);

  useEffect(() => {
    setFetchLoading(true);
    dispatch(
      getAccounts(null, (err) => {
        if (err) {
          setFetchError(err);
          setTimeout(() => {
            setFetchError("");
          }, 4000);
        }
        setFetchLoading(false);
      })
    );
  }, []);

  const onSubmit = (values) => {
    setCreateLoading(true);
    dispatch(
      createAccounts(values, (err) => {
        if (err) {
          setCreateError(err);
          setTimeout(() => {
            setCreateError("");
          }, 4000);
        } else {
          setSuccess("Category added successfully");
          setTimeout(() => {
            setSuccess("");
          }, 4000);
        }
        setCreateLoading(false);
      })
    );
  };

  const handleOpen = (account) => {
    setAccount(account);
    setOpen(true);
  };

  const handleClose = (props) => {
    setOpen(props);
  };

  const onDelete = (params) => {
    setDeleteLoading(true);
    dispatch(
      deleteAccounts(params._id, (err) => {
        if (err) {
          setDeleteError(err);
          setTimeout(() => {
            setDeleteError("");
          }, 4000);
        }
        setDeleteLoading(false);
      })
    );
  };

  const toLedger = () => {
    history.push("/finance/accounts/ledger");
  };

  return (
    <Sidenav title={"Add Accounts"}>
      <EditAccounts show={open} handler={handleClose} account={account} />
      {deleteLoading && (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Loader type="TailSpin" width="2rem" height="2rem" />
        </div>
      )}
      {deleteError && (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <span>{deleteError}</span>
        </div>
      )}
      <div>
        <div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(props) => (
              <Form>
                <CustomContainer>
                  <Grid container spacing={1} style={{ marginTop: 15 }}>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                      <CustomInput
                        label="Select Account Type"
                        selectValues={generateOptionsFromIndexes(accountTypes)}
                        onChange={props.handleChange("accountType")}
                        value={props.values.accountType}
                        onBlur={props.handleBlur("accountType")}
                        helperText={
                          props.touched.accountType && props.errors.accountType
                        }
                        error={
                          props.touched.accountType && props.errors.accountType
                        }
                      />
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                      <CustomInput
                        label="Enter Account Name"
                        onChange={props.handleChange("name")}
                        value={props.values.name}
                        onBlur={props.handleBlur("name")}
                        helperText={props.touched.name && props.errors.name}
                        error={props.touched.name && props.errors.name}
                      />
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                      <CustomInput
                        label="Enter Starting Value"
                        onChange={props.handleChange("startingBalance")}
                        value={props.values.startingBalance}
                        onBlur={props.handleBlur("startingBalance")}
                        helperText={
                          props.touched.startingBalance &&
                          props.errors.startingBalance
                        }
                        error={
                          props.touched.startingBalance &&
                          props.errors.startingBalance
                        }
                        type="number"
                      />
                    </Grid>
                  </Grid>
                </CustomContainer>
                <CustomContainer>
                  <div>
                    <CustomButton
                      text="Submit"
                      variant="outlined"
                      classNames="text-light"
                      style={{ backgroundColor: "#22A19A" }}
                      loading={createLoading}
                      loaderColor="#fff"
                    />
                    {createError && <p>{createError}</p>}
                  </div>
                </CustomContainer>
              </Form>
            )}
          </Formik>

          <CustomTable
            fetchLoading={fetchLoading}
            data={accounts}
            columnHeadings={[
              "Sr.No",
              "Account Id",
              "Account Type",
              "Account Name",
              "Account Current Balance",
            ]}
            keys={[
              "id",
              { indexFrom: accountTypes, keyName: "accountType" },
              "name",
              "currentBalance",
            ]}
            firstOptionText="Edit"
            onFirstOptionClick={handleOpen}
            secondOptionText="Delete"
            onSecondOptionClick={onDelete}
            thirdOptionText="View Ledger"
            onThirdOptionClick={toLedger}
            withSrNo
          />
        </div>
      </div>
    </Sidenav>
  );
};

export default AddAccounts;
