import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "../../../components/utils/Button";
import { CustomTable } from "../../../components";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  mainContainer: {
    textAlign: "center",
  },
  table: {
    marginBottom: 300,
  },
}));

const PrintStockAssesment = () => {
  const date = new Date();
  const currDate = date.getDate();
  const months = date.getMonth() + 1;
  const years = date.getFullYear();
  const fullDate = `${currDate} / ${months} / ${years}`;

  return (
    <div className="text-center">
      <div class="row mt-2">
        <div class="col-3 col-lg-3 col-md-3">
          <img src="/images/nameLogo.png" width="250px" height="90px" alt="" />
        </div>
        <div class="offset-7 col-2 mt-3">
          <div
            style={{
              display: "flex",
              // alignItems: 'flex-end',
              flexDirection: "column",
              border: "2px solid #333",
              width: "100px",
              // marginLeft: 'auto',
              // paddingRight: '5px',
              // marginRight: '-3rem'
            }}
          >
            <h6>FM-66</h6>
            <h6>Issue.02</h6>
          </div>
        </div>
        <h4
          style={{
            marginTop: ".5rem",
            fontWeight: "bold",
            textDecoration: "underline",
          }}
        >
          STOCK ASSESSMENT REPORT
        </h4>
      </div>
      <div class="container" id="printBtn">
        <Button
          size="small"
          text="Print"
          variant="contained"
          classNames="btn bg-dark text-light"
          onClick={() => window.print()}
          style={{ marginLeft: "auto" }}
        />
      </div>
      <div className="container-fluid">
        <div
          style={{
            marginTop: 70,
            textAlign: "left",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <p style={{ fontWeight: "bold" }}>To,</p>
          <div style={{ display: "flex", gap: "1rem" }}>
            <p style={{ fontWeight: "bold" }}>Date: </p>
            <p style={{ textDecoration: "underline" }}>{fullDate}</p>
          </div>
        </div>
        <div
          style={{
            textAlign: "left",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: "1rem" }}>
            <p style={{ fontWeight: "bold" }}>M/S </p>
            <p style={{ textDecoration: "underline" }}>{}</p>
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <p style={{ fontWeight: "bold" }}>Vehicle No. </p>
            <p style={{ textDecoration: "underline" }}>{}</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className="" style={{ marginTop: 30, marginLeft: "auto" }}>
          <CustomTable
            //   fetchLoading={fetchLoading}
            data={[{}]}
            columnHeadings={[
              "Sr.No",
              "Particulars",
              "Returnable/Non-Returnable",
              "Unit",
              "Qty",
              "Remarks",
            ]}
            keys={[
              "name",
              "category.name",
              "subCategory.name",
              "unit.name",
              "subCategory.name",
            ]}
            // firstOptionText="Edit"
            // onFirstOptionClick={handleOpen}
            // secondOptionText="Delete"
            // onSecondOptionClick={deleteOutwardGatePass}
            // thirdOptionText="View"
            // onThirdOptionClick={pushToPrint}
            withSrNo
            tablePrint
          />
        </div>
      </div>
      <div className="row" style={{ marginTop: "6rem" }}>
        <div className="col-3">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <hr style={{ borderTop: "3px solid black", width: "200px" }} />
            <p style={{ marginTop: -10, fontSize: 12, fontWeight: "bold" }}>
              Store Manager
            </p>
          </div>
        </div>
        <div className="col-3">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <hr style={{ borderTop: "3px solid black", width: "200px" }} />
            <p style={{ marginTop: -10, fontSize: 12, fontWeight: "bold" }}>
              Factory Manager
            </p>
          </div>
        </div>
        <div className="col-3">
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <div style={{ display: "flex", gap: ".5rem" }}>
              <p style={{ fontSize: 12, fontWeight: "bold" }}>Checked by:</p>
              <hr style={{ borderTop: "3px solid black", width: "200px" }} />
            </div>
            <div style={{ display: "flex", gap: ".5rem" }}>
              <p style={{ fontSize: 12, fontWeight: "bold" }}>Name:</p>
              <hr style={{ borderTop: "2px solid black", width: "200px" }} />
            </div>
            <div style={{ display: "flex", gap: ".5rem" }}>
              <p style={{ fontSize: 12, fontWeight: "bold" }}>Signature:</p>
              <hr style={{ borderTop: "3px solid black", width: "200px" }} />
            </div>
          </div>
        </div>
        <div className="col-3">
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <div style={{ display: "flex", gap: ".5rem" }}>
              <p style={{ fontSize: 12, fontWeight: "bold" }}>Received by:</p>
              <hr style={{ borderTop: "3px solid black", width: "200px" }} />
            </div>
            <div style={{ display: "flex", gap: ".5rem" }}>
              <p style={{ fontSize: 12, fontWeight: "bold" }}>Name:</p>
              <hr style={{ borderTop: "2px solid black", width: "200px" }} />
            </div>
            <div style={{ display: "flex", gap: ".5rem" }}>
              <p style={{ fontSize: 12, fontWeight: "bold" }}>CNIC No:</p>
              <hr style={{ borderTop: "3px solid black", width: "200px" }} />
            </div>
            <div style={{ display: "flex", gap: ".5rem" }}>
              <p style={{ fontSize: 12, fontWeight: "bold" }}>Mobile No:</p>
              <hr style={{ borderTop: "3px solid black", width: "200px" }} />
            </div>
          </div>
        </div>
      </div>
      {/* <div className="container" style={{ marginTop: 30 }}>
                  <div className="row">
                      <div className="offset-lg-9 offset-md-9 offset-sm-9 offset-xs-9 col-lg-3 col-md-3 col-sm-3 mt-5">
                          <hr style={{ backgroundColor: 'black', paddingTop: 2 }} />
                          <p style={{ marginTop: -10, fontSize: 14, fontWeight: 'bold' }}>FAKHR-E-ALAM</p>
                          <p style={{ marginTop: -10, fontSize: 12, fontWeight: 'bold' }}>Cheif Executive Officer</p>
                      </div>
                  </div>
              </div> */}
    </div>
  );
};

export default PrintStockAssesment;
