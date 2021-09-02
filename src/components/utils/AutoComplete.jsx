import React from "react";
import AutoComplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { capitalize } from "../../utils/capitalize";

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

const AutoCompleteSearch = ({
  options,
  label,
  label2,
  onChange,
  value,
  error,
  helperText,
  onBlur,
  style,
  labelText,
}) => {
  const selected = (e, op) => {
    console.log(op?._id);
    if (op) {
      onChange(op?._id);
    } else {
      onChange("");
    }
  };

  return (
    <>
      <AutoComplete
        id="asd"
        freeSolo
        value={value}
        onChange={selected}
        options={options}
        getOptionLabel={(option) => {
          let str1 = option[label] ? capitalize(option[label]) : "";
          let str2 = "";
          label2
            ? option[label2]
              ? (str2 = option[label2])
              : (str2 = "")
            : (str2 = "");
          let text = str2 ? `${str1} - ${str2}` : str1;

          return text;
        }}
        renderInput={(params) => (
          <CssTextField
            {...params}
            label={labelText}
            variant="outlined"
            error={error}
            onBlur={onBlur}
            size="small"
            helperText={helperText}
            style={{ ...style }}
          />
        )}
      />
    </>
  );
};

export default AutoCompleteSearch;
