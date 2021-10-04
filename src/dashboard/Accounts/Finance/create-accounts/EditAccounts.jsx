import React, { useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  CustomContainer,
  CustomInput,
  generateOptionsFromIndexes,
} from "../../../../components";
import Button from "../../../../components/utils/Button";
import { accountTypes } from "../../../../constants/accountTypes";
import { updateAccounts } from "../../../../services/action/accountAction";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    height: "auto",
    width: 500,
  },
  mainContainer: {
    textAlign: "center",
    marginTop: 20,
  },
}));

const initialValues = {
  accountType: "",
  name: "",
};

const validationSchema = yup.object({
  accountType: yup.string().required(),
  name: yup.string().required(),
});

const EditAccounts = (props) => {
  const { account } = props;

  const classes = useStyles();

  const { show, handler } = props;
  const [initialValuesState, setInitialValuesState] = useState({
    ...initialValues,
  });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    setOpen(show);
  }, [show]);

  const onSubmit = async (values) => {
    setLoading(true);
    dispatch(
      updateAccounts(account._id, values, (err) => {
        if (err) {
          setError(err);
          setTimeout(() => {
            setError("");
          }, 4000);
        } else {
          setLoading(false);
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
          }, 4000);
        }
        setLoading(false);
      })
    );
  };

  const handleClose = () => {
    handler(false);
  };

  useEffect(() => {
    if (account) {
      setInitialValuesState({
        ...account,
        account: account._id,
      });
    }
  }, [account]);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <h5 className="text-center mt-4">Update</h5>
          <CustomContainer>
            {account ? (
              <Formik
                initialValues={initialValuesState}
                validationSchema={validationSchema}
                enableReinitialize
                onSubmit={onSubmit}
              >
                {(props) => (
                  <Form>
                    <Grid container spacing={1}>
                      <Grid lg={12} md={12} sm={12} className="mt-3">
                        <CustomInput
                          label="Select Account Type"
                          selectValues={generateOptionsFromIndexes(
                            accountTypes
                          )}
                          onChange={props.handleChange("accountType")}
                          value={props.values.accountType}
                          onBlur={props.handleBlur("accountType")}
                          helperText={
                            props.touched.accountType &&
                            props.errors.accountType
                          }
                          error={
                            props.touched.accountType &&
                            props.errors.accountType
                          }
                        />
                      </Grid>
                      <Grid lg={12} md={12} sm={12} className="mt-3">
                        <CustomInput
                          label="Enter Account Name"
                          onChange={props.handleChange("name")}
                          value={props.values.name}
                          onBlur={props.handleBlur("name")}
                          helperText={props.touched.name && props.errors.name}
                          error={props.touched.name && props.errors.name}
                        />
                      </Grid>
                    </Grid>
                    <div
                      style={{
                        marginTop: "2rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        text="Update"
                        style={{ marginRight: "1rem" }}
                        loading={loading}
                      />
                      <Button
                        variant="outlined"
                        color="dark"
                        onClick={handleClose}
                        text="Close"
                        type="button"
                        classNames="bg-danger text-light"
                      />
                    </div>
                    {success && <p>Successfully Updated</p>}
                    {error && <p>{error}</p>}
                  </Form>
                )}
              </Formik>
            ) : null}
          </CustomContainer>
        </div>
      </Fade>
    </Modal>
  );
};

export default EditAccounts;
