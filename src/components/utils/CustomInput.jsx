import React from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";

export const generateOptions = (data, nameKey, valueKey) => {
  const options = [];

  for (const d of data) {
    options.push({ name: d[nameKey], value: d[valueKey] });
  }

  return options;
};

export const generateOptionsFromIndexes = (data) => {
  const options = [];
  for (let i = 0; i < data.length; i++) {
    options.push({ value: `${i}`, name: data[i] });
  }

  return options;
};

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
<<<<<<< HEAD
      style={{ width: "100%", fontSize: '12px' }}
=======
      style={{ width: "100%" }}
      inputProps={{ style: { fontSize: 14 } }}
      InputLabelProps={{ style: { fontSize: 14 } }}
>>>>>>> 85a1066bb7be56c8cf59524c81bc0e6004f04162
      onChange={handleChange}
      onBlur={onBlur}
      value={value}
      helperText={helperText}
      error={error}
      inputProps={{ style: { fontSize: 14 } }}
      InputLabelProps={{ style: { fontSize: 14 } }}
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
