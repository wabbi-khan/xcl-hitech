import React from "react";

const PrintCustomerComplaintForm = () => {
  return (
    <div>
      <div className="mt-4">
        <div class="col-3 col-lg-3 col-md-3">
          <img src="/images/nameLogo.png" width="180px" height="60px" alt="" />
        </div>
        <h5
          style={{
            textAlign: "center",
            fontWeight: "bold",
            marginTop: "1rem",
          }}
        >
          CUSTOMER COMPLAINT & MATERIAL INSPECTION REPORT
        </h5>
      </div>
      <div className="mt-5">
        <div className="d-flex justify-content-between">
          <div style={{ display: "flex", gap: "1rem" }}>
            <p style={{ fontWeight: "bold" }}>To: </p>
            <p style={{ textDecoration: "underline" }}>Sales Department</p>
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <p style={{ fontWeight: "bold" }}>
              Complaint No.
              <span style={{ fontSize: "10px", fontWeight: "normal" }}>
                (To be filled by SO)
              </span>
            </p>
            <p style={{ textDecoration: "underline" }}>2S34Q34</p>
          </div>
        </div>
        <div style={{ display: "flex", gap: "1rem", float: "right" }}>
          <p style={{ fontWeight: "bold" }}>Date: </p>
          <p style={{ textDecoration: "underline" }}>{}12-12-12</p>
        </div>
      </div>
      <div style={{ marginTop: "4rem", borderTop: "1px solid black" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            marginTop: "1rem",
          }}
        >
          <p style={{ fontWeight: "bold" }}>Customer Type:</p>
          <div style={{ display: "flex", gap: ".5rem" }}>
            <p style={{ border: "1px solid black", padding: ".6rem" }}></p>
            <p style={{ marginTop: ".3rem", fontSize: "12px" }}>
              Public Sector
            </p>
          </div>
          <div style={{ display: "flex", gap: ".5rem" }}>
            <p style={{ border: "1px solid black", padding: ".6rem" }}></p>
            <p style={{ marginTop: ".3rem", fontSize: "12px" }}>
              Private Sector
            </p>
          </div>
          <div style={{ display: "flex", gap: ".5rem" }}>
            <p style={{ border: "1px solid black", padding: ".6rem" }}></p>
            <p style={{ marginTop: ".3rem", fontSize: "12px" }}>
              Industrial Sector
            </p>
          </div>
          <div style={{ display: "flex", gap: ".5rem" }}>
            <p style={{ border: "1px solid black", padding: ".6rem" }}></p>
            <p style={{ marginTop: ".3rem", fontSize: "12px" }}>Armed Forces</p>
          </div>
        </div>
        <div className="row">
          <div className="col-2">
            <p style={{ fontWeight: "bold" }}>Inquirer:</p>
          </div>
          <div className="col-2">
              
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            marginTop: "1rem",
          }}
        >
          <p style={{ fontWeight: "bold" }}>Inquirer:</p>
          <div style={{ display: "flex", gap: ".5rem" }}>
            <p style={{ border: "1px solid black", padding: ".6rem" }}></p>
            <p style={{ marginTop: ".3rem", fontSize: "12px" }}>
              Dealer/Distributor
            </p>
          </div>
          <div style={{ display: "flex", gap: ".5rem" }}>
            <p style={{ border: "1px solid black", padding: ".6rem" }}></p>
            <p style={{ marginTop: ".3rem", fontSize: "12px" }}>
              Project/Reidence Owner
            </p>
          </div>
          <div style={{ display: "flex", gap: ".5rem" }}>
            <p style={{ border: "1px solid black", padding: ".6rem" }}></p>
            <p style={{ marginTop: ".3rem", fontSize: "12px" }}>
              Architect/Consultant
            </p>
          </div>
          <div style={{ display: "flex", gap: ".5rem" }}>
            <p style={{ border: "1px solid black", padding: ".6rem" }}></p>
            <p style={{ marginTop: ".3rem", fontSize: "12px" }}>
              Contractor/Builder
            </p>
          </div>
          <div style={{ display: "flex", gap: ".5rem" }}>
            <p style={{ border: "1px solid black", padding: ".6rem" }}></p>
            <p style={{ marginTop: ".3rem", fontSize: "12px" }}>End User</p>
          </div>
          <div style={{ display: "flex", gap: ".5rem" }}>
            <p style={{ border: "1px solid black", padding: ".6rem" }}></p>
            <p style={{ marginTop: ".3rem", fontSize: "12px" }}>Other</p>
            <hr
              style={{
                borderTop: "1px solid black",
                padding: "1px",
                width: "200px",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintCustomerComplaintForm;
