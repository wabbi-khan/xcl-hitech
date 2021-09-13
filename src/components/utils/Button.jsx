import React from "react";
import MuiButton from "@material-ui/core/Button";
import Loader from "react-loader-spinner";

const Button = ({
  variant,
  text,
  classNames,
  type = "submit",
  loading,
  color,
  onClick,
  size,
  style,
  loaderColor = "#fff",
  disabled,
  btnProps,
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <MuiButton
        {...btnProps}
        color={color}
        variant={variant}
        className={classNames}
        type={type}
        size={size}
        disabled={disabled ? true : loading ? true : false}
        style={style}
        onClick={onClick}
      >
        <span {...btnProps} style={{ marginTop: ".1rem" }}>
          {text}
        </span>
        {loading && (
          <Loader
            type="TailSpin"
            width="1rem"
            height="1rem"
            style={{ marginLeft: "1rem" }}
            color={loaderColor}
          />
        )}
      </MuiButton>
    </div>
  );
};

export default Button;
