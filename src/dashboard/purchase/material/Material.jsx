import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidenav from "../../SideNav/Sidenav";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import {
  getMaterialAction,
  createMaterialAction,
  deleteMaterialAction,
} from "../../../services/action/MaterialDataHandle";
import { getMaterialCategoryAction } from "../../../services/action/MatCategoryAction";
import { getSubCategories } from "../../../services/action/subCategoryAction";
import { getUnits } from "../../../services/action/unitAction";
import EditMaterial from "./EditMaterial";
import { Formik, Form } from "formik";
import * as yup from "yup";
import Loader from "react-loader-spinner";

import {
  CustomTable,
  CustomAutoComplete,
  CustomButton,
  CustomInput,
} from "../../../components";

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
    marginTop: 20,
    color: "#22A19A",
    borderColor: "#22A19A",
    fontWeight: "bold",
    "&:hover": {
      border: "none",
      backgroundColor: "#22A19A",
      color: "whitesmoke",
    },
    [theme.breakpoints.up("md")]: {
      width: "15%",
    },
    [theme.breakpoints.down("sm")]: {
      // width: '12%',
    },
  },
  inputFieldStyle: {
    [theme.breakpoints.up("md")]: {
      width: 330,
    },
    [theme.breakpoints.down("sm")]: {
      width: 200,
    },
  },
  inputFieldStyle1: {
    [theme.breakpoints.up("md")]: {
      width: 330,
      marginLeft: 5,
    },
    [theme.breakpoints.down("sm")]: {
      width: 200,
      marginTop: 10,
    },
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

const initialValues = {
  name: "",
  category: "",
  subCategory: "",
  unit: "",
  price: "",
};

const validationSchema = yup.object({
  name: yup.string().required(),
  category: yup.string().required(),
  subCategory: yup.string(),
  unit: yup.string().required(),
  price: yup.string().required(),
});

const searchOptions = ["code", "name"];

const transportOptions = [
  { name: "Road", value: "road" },
  { name: "saad", value: "asd" },
];

const Material = () => {
  const [fetchLoading, setFetchLoading] = React.useState(true);
  const [fetchError, setFetchError] = React.useState("");
  const [createLoading, setCreateLoading] = React.useState(false);
  const [createError, setCreateError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [material, setMaterial] = useState();
  const [open, setOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = React.useState(false);
  const [deleteError, setDeleteError] = React.useState("");
  const [searchText, setSearchText] = React.useState("");
  const [searchBy, setSearchBy] = React.useState("code");
  const [initialValuesState, setInitialValuesState] = React.useState({
    ...initialValues,
  });

  let form = null;

  const classes = useStyles();

  const dispatch = useDispatch();

  const { materials } = useSelector((state) => state.materials);
  const { categories } = useSelector((state) => state.categories);
  const { units } = useSelector((state) => state.units);
  const { subCategories } = useSelector((state) => state.subCategories);

  React.useEffect(() => {
    if (searchText) {
      setFetchLoading(true);
      dispatch(
        getMaterialAction(`${searchBy}[regex]=${searchText}`, (err) => {
          if (err) {
            setFetchError(err);
            setTimeout(() => {
              setFetchError("");
            }, 4000);
          }
          setFetchLoading(false);
        })
      );
    } else {
      setFetchLoading(true);
      dispatch(
        getMaterialAction(null, (err) => {
          if (err) {
            setFetchError(err);
            setTimeout(() => {
              setFetchError("");
            }, 4000);
          }
          setFetchLoading(false);
        })
      );
    }
  }, [searchText]);

  React.useEffect(() => {
    if (selectedCategory) {
      dispatch(getSubCategories(`parent=${selectedCategory}`));
      setInitialValuesState((prev) => {
        return {
          ...form.values,
          category: selectedCategory,
          subCategory: undefined,
        };
      });
    }
  }, [selectedCategory]);

  useEffect(() => {
    setFetchLoading(true);
    dispatch(
      getMaterialAction(null, (err) => {
        if (err) {
          setFetchError(err);
          setTimeout(() => {
            setFetchError("");
          }, 4000);
        }
        setFetchLoading(false);
      })
    );
    dispatch(getMaterialCategoryAction());
    dispatch(getUnits());
  }, [dispatch]);

  const onSubmit = async (values) => {
    setCreateLoading(true);
    dispatch(
      createMaterialAction(values, (err) => {
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

  const deleteMaterial = async (material) => {
    setDeleteLoading(true);
    dispatch(
      deleteMaterialAction(material._id, (err) => {
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

  const handleClose = (props) => {
    setOpen(props);
  };

  const handleOpen = async (material) => {
    setMaterial(material);
    setOpen(true);
  };

  return (
    <Sidenav title={"Material"}>
      <EditMaterial show={open} handler={handleClose} material={material} />
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
        <Container className={classes.mainContainer}>
          <Formik
            initialValues={initialValuesState}
            validationSchema={validationSchema}
            enableReinitialize
            onSubmit={onSubmit}
          >
            {(props) => {
              form = props;
              return (
                <Form autoComplete="off">
                  <Grid container spacing={1}>
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                      <CustomAutoComplete
                        options={categories}
                        label="name"
                        onChange={(e) => {
                          props.resetForm({
                            values: {
                              ...form.values,
                              subCategory: "",
                            },
                          });
                          setSelectedCategory(e);
                          props.handleChange("category");
                        }}
                        value={categories.find(
                          (el) => el._id === props.values.category
                        )}
                        onBlur={props.handleBlur("category")}
                        helperText={
                          props.touched.category && props.errors.category
                        }
                        error={props.touched.category && props.errors.category}
                        style={{ width: "100%" }}
                        inputProps={{ style: { fontSize: 14 } }}
                        InputLabelProps={{
                          style: { fontSize: 14 },
                        }}
                        labelText="Select Category"
                      />
                    </Grid>
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                      <CustomAutoComplete
                        options={subCategories}
                        label="name"
                        onChange={props.handleChange("subCategory")}
                        value={
                          subCategories.find(
                            (el) => el._id === props.values.subCategory
                          )
                            ? subCategories.find(
                                (el) => el._id === props.values.subCategory
                              )
                            : ""
                        }
                        onBlur={props.handleBlur("subCategory")}
                        helperText={
                          props.touched.subCategory && props.errors.subCategory
                        }
                        error={
                          props.touched.subCategory && props.errors.subCategory
                        }
                        style={{ width: "100%" }}
                        inputProps={{ style: { fontSize: 14 } }}
                        InputLabelProps={{
                          style: { fontSize: 14 },
                        }}
                        labelText="Select Sub Category"
                      />
                    </Grid>
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                      <CustomInput
                        label="Enter Material Name"
                        onChange={props.handleChange("name")}
                        value={props.values.name}
                        onBlur={props.handleBlur("name")}
                        helperText={props.touched.name && props.errors.name}
                        error={props.touched.name && props.errors.name}
                        selectValues={transportOptions}
                      />
                    </Grid>
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                      <CustomAutoComplete
                        options={units}
                        label="name"
                        onChange={props.handleChange("unit")}
                        value={units.find((el) => el._id === props.values.unit)}
                        onBlur={props.handleBlur("unit")}
                        helperText={props.touched.unit && props.errors.unit}
                        error={props.touched.unit && props.errors.unit}
                        style={{ width: "100%" }}
                        inputProps={{ style: { fontSize: 14 } }}
                        InputLabelProps={{
                          style: { fontSize: 14 },
                        }}
                        labelText="Select Unit"
                      />
                    </Grid>
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                      <CustomInput
                        label="Select Price Per Unit"
                        onChange={props.handleChange("price")}
                        value={props.values.price}
                        onBlur={props.handleBlur("price")}
                        helperText={props.touched.price && props.errors.price}
                        error={props.touched.price && props.errors.price}
                      />
                    </Grid>
                  </Grid>
                  <div>
                    <CustomButton
                      variant="outlined"
                      color="primary"
                      text="Add"
                      classNames={classes.addButton}
                      loading={createLoading}
                      loaderColor="#333"
                    />
                    {createError && <p>{createError}</p>}
                  </div>
                </Form>
              );
            }}
          </Formik>
        </Container>

        <div style={{ marginTop: "3rem" }}></div>

        <CssTextField
          id="outlined-basic"
          label="Search Materials"
          variant="outlined"
          type="search"
          size="small"
          autoComplete="off"
          style={{ width: "20%", marginRight: 20 }}
          inputProps={{ style: { fontSize: 14 } }}
          InputLabelProps={{ style: { fontSize: 14 } }}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <CssTextField
          id="outlined-basic"
          label="Search By"
          variant="outlined"
          type="search"
          size="small"
          select
          style={{ width: "20%" }}
          onChange={(e) => setSearchBy(e.target.value)}
          autoComplete="off"
          value={searchBy}
          inputProps={{ style: { fontSize: 14 } }}
          InputLabelProps={{ style: { fontSize: 14 } }}
        >
          {!searchOptions || !searchOptions.length ? (
            <p>Data Not Found</p>
          ) : (
            searchOptions.map((el) => (
              <MenuItem
                value={el}
                key={el}
                style={{ textTransform: "capitalize" }}
              >
                {el}
              </MenuItem>
            ))
          )}
        </CssTextField>
        <CustomTable
          fetchLoading={fetchLoading}
          data={materials}
          heading="Materials"
          columnHeadings={[
            "Sr.No",
            "Material Name",
            "Category",
            "Sub Category",
            "Unit",
            "Code",
            "Price",
          ]}
          keys={[
            "name",
            "category.name",
            "subCategory.name",
            "unit.name",
            "code",
            "price",
          ]}
          firstOptionText="Edit"
          onFirstOptionClick={handleOpen}
          secondOptionText="Delete"
          onSecondOptionClick={deleteMaterial}
          withSrNo
        />
      </div>
    </Sidenav>
  );
};

export default Material;
