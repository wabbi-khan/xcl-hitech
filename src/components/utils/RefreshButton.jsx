import React from "react";
import RefreshIcon from "@material-ui/icons/Refresh";
import Loader from "react-loader-spinner";

const RefreshButton = ({ loading, onClick }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: "10px",
      }}
    >
      {!loading ? (
        <div
          onClick={onClick}
          style={{
            backgroundColor: "#eee",
            borderRadius: "5px",
            border: ".5px solid #bbb",
            cursor: "pointer",
            width: "50px",
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <RefreshIcon
            style={{
              width: "25px",
              height: "25px",
            }}
          />
        </div>
      ) : (
        <Loader
          type="TailSpin"
          style={{
            backgroundColor: "#eee",
            borderRadius: "5px",
            border: ".5px solid #bbb",
            cursor: "pointer",
            width: "50px",
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          color="#000"
          width="25px"
          height="25px"
        />
      )}
    </div>
  );
};

export default RefreshButton;
