import React from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";

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

const CustomInput = ({
  label,
  type = "text",
  selectValues,
  onChange,
  onBlur,
  value,
  helperText,
  error,
}) => {
  function handleChange(e) {
    onChange(e.target.value);
  }
  return (
    <CssTextField
      id="outlined-basic"
      label={label}
      variant="outlined"
      type={type}
      size="small"
      select={selectValues ? true : false}
      style={{ width: "100%" }}
      onChange={handleChange}
      onBlur={onBlur}
      value={value}
      helperText={helperText}
      error={error}
    >
      {selectValues && selectValues.length === 0 ? (
        <MenuItem>Data Not Found</MenuItem>
      ) : (
        selectValues?.map((el) => (
          <MenuItem value={el.value}>{el.name}</MenuItem>
        ))
      )}
    </CssTextField>
  );
};

export default CustomInput;
