import React, { useState, useEffect } from "react";
import Sidenav from "../../SideNav/Sidenav";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Form, Formik } from "formik";
import * as yup from "yup";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { useDispatch, useSelector } from "react-redux";
import { MenuItem } from "@material-ui/core";
import Button from "../../../components/utils/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  mainContainer: {
    textAlign: "center",
    marginTop: 20,
  },
  addButton: {
    marginTop: 40,
    backgroundColor: "#22A19A",
    color: "whitesmoke",
    borderColor: "#22A19A",
    fontWeight: "bold",
    width: "10%",
    "&:hover": {
      color: "#22A19A",
      borderColor: "#22A19A",
    },
  },
  table: {
    minWidth: 600,
  },
  dataTable: {
    marginTop: 40,
  },
}));

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "black",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "black",
      },
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
  },
})(TextField);

const initialValue = {
  name: "",
};

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
});

const ItemInward = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    // setCreateLoading(true);
    // dispatch(
    // 	createProducts(values, (err) => {
    // 		if (err) {
    // 			setCreateError(err);
    // 			setTimeout(() => {
    // 				setCreateError('');
    // 			}, 4000);
    // 		} else {
    // 			setSuccess('Category added successfully');
    // 			setTimeout(() => {
    // 				setSuccess('');
    // 			}, 4000);
    // 		}
    // 		setCreateLoading(false);
    // 	}),
    // );
  };

  const deleteProduct = async (params) => {
    // setDeleteLoading(true);
    // dispatch(
    // 	deleteProducts(params, (err) => {
    // 		if (err) {
    // 			setDeleteError(err);
    // 			setTimeout(() => {
    // 				setDeleteError('');
    // 			}, 4000);
    // 		}
    // 		setDeleteLoading(false);
    // 	}),
    // );
  };

  const [open, setOpen] = useState(false);

  const handleClose = (props) => {
    // setOpen(props);
  };

  const handleOpen = async (product) => {
    // setproduct(product);
    setOpen(true);
  };

  return (
    <Sidenav title={"Item Inward"}>
      <div>
        <Formik
          // initialValues={initialValuesState}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={onSubmit}
        >
          <Form>
            <Grid container spacing={1} style={{ marginTop: 15 }}>
              <Grid item lg={2} md={2} sm={12} xs={12}>
                <CssTextField
                  id="outlined-basic"
                  label="Status"
                  variant="outlined"
                  type="text"
                  size="small"
                  autoComplete="off"
                  select
                  style={{ width: "100%" }}
                  inputProps={{ style: { fontSize: 14 } }}
                  InputLabelProps={{ style: { fontSize: 14 } }}
                  // onChange={props.handleChange('category')}
                  // onBlur={props.handleBlur('category')}
                  // value={props.values.category}
                  // helperText={props.touched.category && props.errors.category}
                  // error={props.touched.category && props.errors.category}
                >
                  <MenuItem value="">Received</MenuItem>
                  <MenuItem value="">Not Received</MenuItem>
                </CssTextField>
              </Grid>
              <Grid item lg={2} md={2} sm={12} xs={12}>
                <CssTextField
                  id="outlined-basic"
                  label="Recieved From"
                  variant="outlined"
                  type="text"
                  size="small"
                  autoComplete="off"
                  select
                  style={{ width: "100%" }}
                  inputProps={{ style: { fontSize: 14 } }}
                  InputLabelProps={{ style: { fontSize: 14 } }}
                  // onChange={props.handleChange('category')}
                  // onBlur={props.handleBlur('category')}
                  // value={props.values.category}
                  // helperText={props.touched.category && props.errors.category}
                  // error={props.touched.category && props.errors.category}
                >
                  <MenuItem value="">Local</MenuItem>
                </CssTextField>
              </Grid>
              <Grid item lg={2} md={2} sm={12} xs={12}>
                <CssTextField
                  id="outlined-basic"
                  label="Section"
                  variant="outlined"
                  type="text"
                  size="small"
                  autoComplete="off"
                  select
                  style={{ width: "100%" }}
                  inputProps={{ style: { fontSize: 14 } }}
                  InputLabelProps={{ style: { fontSize: 14 } }}
                  // onChange={props.handleChange('category')}
                  // onBlur={props.handleBlur('category')}
                  // value={props.values.category}
                  // helperText={props.touched.category && props.errors.category}
                  // error={props.touched.category && props.errors.category}
                >
                  <MenuItem value="">Ring Side</MenuItem>
                </CssTextField>
              </Grid>
              <Grid item lg={2} md={2} sm={12} xs={12}>
                <CssTextField
                  id="outlined-basic"
                  label="G.R.No."
                  variant="outlined"
                  type="text"
                  size="small"
                  autoComplete="off"
                  style={{ width: "100%" }}
                  inputProps={{ style: { fontSize: 14 } }}
                  InputLabelProps={{ style: { fontSize: 14 } }}
                  // onChange={props.handleChange('category')}
                  // onBlur={props.handleBlur('category')}
                  // value={props.values.category}
                  // helperText={props.touched.category && props.errors.category}
                  // error={props.touched.category && props.errors.category}
                />
              </Grid>
              <Grid item lg={2} md={2} sm={12} xs={12}>
                <CssTextField
                  id="outlined-basic"
                  // label='Date'
                  variant="outlined"
                  type="date"
                  size="small"
                  autoComplete="off"
                  style={{ width: "100%" }}
                  inputProps={{ style: { fontSize: 14 } }}
                  InputLabelProps={{ style: { fontSize: 14 } }}
                  // onChange={props.handleChange('category')}
                  // onBlur={props.handleBlur('category')}
                  // value={props.values.category}
                  // helperText={props.touched.category && props.errors.category}
                  // error={props.touched.category && props.errors.category}
                />
              </Grid>
              <Grid item lg={2} md={2} sm={12} xs={12}>
                <CssTextField
                  id="outlined-basic"
                  label="IGP No."
                  variant="outlined"
                  type="text"
                  size="small"
                  autoComplete="off"
                  style={{ width: "100%" }}
                  inputProps={{ style: { fontSize: 14 } }}
                  InputLabelProps={{ style: { fontSize: 14 } }}
                  // onChange={props.handleChange('category')}
                  // onBlur={props.handleBlur('category')}
                  // value={props.values.category}
                  // helperText={props.touched.category && props.errors.category}
                  // error={props.touched.category && props.errors.category}
                />
              </Grid>
            </Grid>
            <Grid container spacing={1} style={{ marginTop: 15 }}>
              <Grid item lg={2} md={2} sm={12} xs={12}>
                <CssTextField
                  id="outlined-basic"
                  label="Bill No."
                  variant="outlined"
                  type="text"
                  size="small"
                  autoComplete="off"
                  style={{ width: "100%" }}
                  inputProps={{ style: { fontSize: 14 } }}
                  InputLabelProps={{ style: { fontSize: 14 } }}
                  // onChange={props.handleChange('category')}
                  // onBlur={props.handleBlur('category')}
                  // value={props.values.category}
                  // helperText={props.touched.category && props.errors.category}
                  // error={props.touched.category && props.errors.category}
                />
              </Grid>
              <Grid item lg={2} md={2} sm={12} xs={12}>
                <CssTextField
                  id="outlined-basic"
                  label="D.C No."
                  variant="outlined"
                  type="text"
                  size="small"
                  autoComplete="off"
                  style={{ width: "100%" }}
                  inputProps={{ style: { fontSize: 14 } }}
                  InputLabelProps={{ style: { fontSize: 14 } }}
                  // onChange={props.handleChange('category')}
                  // onBlur={props.handleBlur('category')}
                  // value={props.values.category}
                  // helperText={props.touched.category && props.errors.category}
                  // error={props.touched.category && props.errors.category}
                />
              </Grid>
              <Grid item lg={2} md={2} sm={12} xs={12}>
                <CssTextField
                  id="outlined-basic"
                  label="P.D. No."
                  variant="outlined"
                  type="text"
                  size="small"
                  autoComplete="off"
                  style={{ width: "100%" }}
                  inputProps={{ style: { fontSize: 14 } }}
                  InputLabelProps={{ style: { fontSize: 14 } }}
                  // onChange={props.handleChange('category')}
                  // onBlur={props.handleBlur('category')}
                  // value={props.values.category}
                  // helperText={props.touched.category && props.errors.category}
                  // error={props.touched.category && props.errors.category}
                />
              </Grid>
              <Grid item lg={2} md={2} sm={12} xs={12}>
                <CssTextField
                  id="outlined-basic"
                  label="Item Code"
                  variant="outlined"
                  type="text"
                  size="small"
                  autoComplete="off"
                  select
                  style={{ width: "100%" }}
                  inputProps={{ style: { fontSize: 14 } }}
                  InputLabelProps={{ style: { fontSize: 14 } }}
                  // onChange={props.handleChange('category')}
                  // onBlur={props.handleBlur('category')}
                  // value={props.values.category}
                  // helperText={props.touched.category && props.errors.category}
                  // error={props.touched.category && props.errors.category}
                >
                  <MenuItem value=""></MenuItem>
                </CssTextField>
              </Grid>
              <Grid item lg={2} md={2} sm={12} xs={12}>
                <CssTextField
                  id="outlined-basic"
                  label="Item Name"
                  variant="outlined"
                  type="text"
                  size="small"
                  disabled
                  defaultValue=""
                  autoComplete="off"
                  style={{ width: "100%" }}
                  inputProps={{ style: { fontSize: 14 } }}
                  InputLabelProps={{ style: { fontSize: 14 } }}
                  // onChange={props.handleChange('category')}
                  // onBlur={props.handleBlur('category')}
                  // value={props.values.category}
                  // helperText={props.touched.category && props.errors.category}
                  // error={props.touched.category && props.errors.category}
                />
              </Grid>
              <Grid item lg={2} md={2} sm={12} xs={12}>
                <CssTextField
                  id="outlined-basic"
                  label="Party Name"
                  variant="outlined"
                  type="text"
                  size="small"
                  autoComplete="off"
                  select
                  style={{ width: "100%" }}
                  inputProps={{ style: { fontSize: 14 } }}
                  InputLabelProps={{ style: { fontSize: 14 } }}
                  // onChange={props.handleChange('category')}
                  // onBlur={props.handleBlur('category')}
                  // value={props.values.category}
                  // helperText={props.touched.category && props.errors.category}
                  // error={props.touched.category && props.errors.category}
                >
                  <MenuItem value=""></MenuItem>
                </CssTextField>
              </Grid>
            </Grid>
            <Grid container spacing={1} style={{ marginTop: 15 }}>
              <Grid item lg={2} md={2} sm={12} xs={12}>
                <CssTextField
                  id="outlined-basic"
                  label="Min. Level"
                  variant="outlined"
                  type="text"
                  size="small"
                  autoComplete="off"
                  style={{ width: "100%" }}
                  inputProps={{ style: { fontSize: 14 } }}
                  InputLabelProps={{ style: { fontSize: 14 } }}
                  // onChange={props.handleChange('category')}
                  // onBlur={props.handleBlur('category')}
                  // value={props.values.category}
                  // helperText={props.touched.category && props.errors.category}
                  // error={props.touched.category && props.errors.category}
                />
              </Grid>
              <Grid item lg={2} md={2} sm={12} xs={12}>
                <CssTextField
                  id="outlined-basic"
                  label="Indent"
                  variant="outlined"
                  type="text"
                  size="small"
                  autoComplete="off"
                  select
                  style={{ width: "100%" }}
                  inputProps={{ style: { fontSize: 14 } }}
                  InputLabelProps={{ style: { fontSize: 14 } }}
                  // onChange={props.handleChange('category')}
                  // onBlur={props.handleBlur('category')}
                  // value={props.values.category}
                  // helperText={props.touched.category && props.errors.category}
                  // error={props.touched.category && props.errors.category}
                >
                  <MenuItem value="">Yes</MenuItem>
                  <MenuItem value="">Yes</MenuItem>
                </CssTextField>
              </Grid>
              <Grid item lg={2} md={2} sm={12} xs={12}>
                <CssTextField
                  id="outlined-basic"
                  label="Indent No."
                  variant="outlined"
                  type="text"
                  size="small"
                  autoComplete="off"
                  select
                  style={{ width: "100%" }}
                  inputProps={{ style: { fontSize: 14 } }}
                  InputLabelProps={{ style: { fontSize: 14 } }}
                  // onChange={props.handleChange('category')}
                  // onBlur={props.handleBlur('category')}
                  // value={props.values.category}
                  // helperText={props.touched.category && props.errors.category}
                  // error={props.touched.category && props.errors.category}
                >
                  <MenuItem value=""></MenuItem>
                </CssTextField>
              </Grid>
              <Grid item lg={2} md={2} sm={12} xs={12}>
                <CssTextField
                  id="outlined-basic"
                  label="Indent Item Code"
                  variant="outlined"
                  type="text"
                  size="small"
                  autoComplete="off"
                  style={{ width: "100%" }}
                  inputProps={{ style: { fontSize: 14 } }}
                  InputLabelProps={{ style: { fontSize: 14 } }}
                  // onChange={props.handleChange('category')}
                  // onBlur={props.handleBlur('category')}
                  // value={props.values.category}
                  // helperText={props.touched.category && props.errors.category}
                  // error={props.touched.category && props.errors.category}
                />
              </Grid>
              <Grid item lg={2} md={2} sm={12} xs={12}>
                <CssTextField
                  id="outlined-basic"
                  label="Inward for Deptartment"
                  variant="outlined"
                  type="text"
                  size="small"
                  autoComplete="off"
                  select
                  style={{ width: "100%" }}
                  inputProps={{ style: { fontSize: 14 } }}
                  InputLabelProps={{ style: { fontSize: 14 } }}
                  // onChange={props.handleChange('category')}
                  // onBlur={props.handleBlur('category')}
                  // value={props.values.category}
                  // helperText={props.touched.category && props.errors.category}
                  // error={props.touched.category && props.errors.category}
                >
                  <MenuItem value=""></MenuItem>
                </CssTextField>
              </Grid>
            </Grid>

            <div style={{ marginTop: 30, marginBottom: 30 }}>
              <hr />
            </div>

            <Grid container spacing={1} style={{ marginTop: 15 }}>
              <Grid item lg={2} md={2} sm={12} xs={12}>
                <CssTextField
                  id="outlined-basic"
                  label="Unit"
                  variant="outlined"
                  type="text"
                  size="small"
                  disabled
                  defaultValue=""
                  autoComplete="off"
                  style={{ width: "100%" }}
                  inputProps={{ style: { fontSize: 14 } }}
                  InputLabelProps={{ style: { fontSize: 14 } }}
                  // onChange={props.handleChange('category')}
                  // onBlur={props.handleBlur('category')}
                  // value={props.values.category}
                  // helperText={props.touched.category && props.errors.category}
                  // error={props.touched.category && props.errors.category}
                />
              </Grid>
              <Grid item lg={2} md={2} sm={12} xs={12}>
                <CssTextField
                  id="outlined-basic"
                  label="Rec. Qty."
                  variant="outlined"
                  type="number"
                  size="small"
                  autoComplete="off"
                  style={{ width: "100%" }}
                  inputProps={{ style: { fontSize: 14 } }}
                  InputLabelProps={{ style: { fontSize: 14 } }}
                  // onChange={props.handleChange('category')}
                  // onBlur={props.handleBlur('category')}
                  // value={props.values.category}
                  // helperText={props.touched.category && props.errors.category}
                  // error={props.touched.category && props.errors.category}
                />
              </Grid>
              <Grid item lg={2} md={2} sm={12} xs={12}>
                <CssTextField
                  id="outlined-basic"
                  label="@"
                  variant="outlined"
                  type="text"
                  size="small"
                  autoComplete="off"
                  style={{ width: "100%" }}
                  inputProps={{ style: { fontSize: 14 } }}
                  InputLabelProps={{ style: { fontSize: 14 } }}
                  // onChange={props.handleChange('category')}
                  // onBlur={props.handleBlur('category')}
                  // value={props.values.category}
                  // helperText={props.touched.category && props.errors.category}
                  // error={props.touched.category && props.errors.category}
                />
              </Grid>
              <Grid item lg={2} md={2} sm={12} xs={12}>
                <CssTextField
                  id="outlined-basic"
                  label="Amount"
                  variant="outlined"
                  type="number"
                  size="small"
                  autoComplete="off"
                  style={{ width: "100%" }}
                  inputProps={{ style: { fontSize: 14 } }}
                  InputLabelProps={{ style: { fontSize: 14 } }}
                  // onChange={props.handleChange('category')}
                  // onBlur={props.handleBlur('category')}
                  // value={props.values.category}
                  // helperText={props.touched.category && props.errors.category}
                  // error={props.touched.category && props.errors.category}
                />
              </Grid>
              <Grid item lg={2} md={2} sm={12} xs={12}>
                <CssTextField
                  id="outlined-basic"
                  label="Current Balance"
                  variant="outlined"
                  type="number"
                  size="small"
                  disabled
                  autoComplete="off"
                  style={{ width: "100%" }}
                  inputProps={{ style: { fontSize: 14 } }}
                  InputLabelProps={{ style: { fontSize: 14 } }}
                  // onChange={props.handleChange('category')}
                  // onBlur={props.handleBlur('category')}
                  // value={props.values.category}
                  // helperText={props.touched.category && props.errors.category}
                  // error={props.touched.category && props.errors.category}
                />
              </Grid>
            </Grid>

            <div style={{ marginTop: 30, marginBottom: 30 }}>
              <hr />
            </div>

            <Grid container spacing={1} style={{ marginTop: 15 }}>
              <Grid item lg={4} md={3} sm={12} xs={12}>
                <CssTextField
                  id="outlined-basic"
                  label="Remarks"
                  variant="outlined"
                  type="text"
                  size="small"
                  autoComplete="off"
                  style={{ width: "100%" }}
                  inputProps={{ style: { fontSize: 14 } }}
                  InputLabelProps={{ style: { fontSize: 14 } }}
                  // onChange={props.handleChange('category')}
                  // onBlur={props.handleBlur('category')}
                  // value={props.values.category}
                  // helperText={props.touched.category && props.errors.category}
                  // error={props.touched.category && props.errors.category}
                />
              </Grid>
            </Grid>

            <div>
              <Button
                variant="outlined"
                color="primary"
                // loading={createLoading}
                loaderColor="#333"
                text="Add"
                classNames={classes.addButton}
              />
              {/* {createError && <p>{createError}</p>} */}
            </div>
          </Form>
        </Formik>

        <table class="table table-responsive table-striped table-bordered border-dark text-center mt-3">
          <thead class="bg-dark text-light">
            <tr>
              <th>S.No.</th>
              <th>Item Code</th>
              <th>Item Name</th>
              <th>BILL NO</th>
              <th>DC NO</th>
              <th>IGP NO</th>
              <th>Unit</th>
              <th>Rate</th>
              <th>Qty</th>
              <th>Received From</th>
              <th>Dept.</th>
              <th>Amount</th>
              <th>Balance</th>
              <th>Remarks</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* {
                                binCards.map((el, i) => ( */}
            <tr>
              {/* <td>{i + 1}</td> */}

              <td>{/* {el?.product?.name} */}</td>
              <td>{/* {el?.history[0]?.balance} */}</td>
              <td>{/* {el?.history[0]?.in} */}</td>
              <td>{/* {el?.history[0]?.out} */}</td>
              <td>{/* {el?.history[0]?.balance} */}</td>
              <td>{/* {el?.history[0]?.out} */}</td>
              <td>{/* {el?.history[0]?.balance} */}</td>
              <td>{/* {el?.history[0]?.out} */}</td>
              <td>{/* {el?.history[0]?.balance} */}</td>
              <td>{/* {el?.history[0]?.out} */}</td>
              <td>{/* {el?.history[0]?.balance} */}</td>
              <td>{/* {el?.history[0]?.out} */}</td>
              <td>{/* {el?.history[0]?.balance} */}</td>
              <td>{/* {el?.history[0]?.date} */}</td>
              <td>
                <Button
                  variant="contained"
                  text="View"
                  size="small"
                  classNames="btn bg-dark text-light"
                  // onClick={() => {
                  //     history.push('/storedashboard/inwards/item_inward/print_inward_item')
                  // }}
                />
              </td>
            </tr>
            {/* ))
                            } */}
          </tbody>
        </table>
      </div>
    </Sidenav>
  );
};

export default ItemInward;
