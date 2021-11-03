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
      <div style={{ marginTop: "4rem", border: "1px solid black" }}>
        <div className="row mt-3">
          <div className="col-1">
            <p style={{ fontWeight: "bold", fontSize: "12px" }}>
              Customer Type:
            </p>
          </div>
          <div className="col-11">
            <div className="row">
              <div className="col">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    // marginTop: "1rem",
                  }}
                >
                  {/* <p style={{ fontWeight: "bold", fontSize: "12px" }}>
                    Inquirer:
                  </p> */}
                  <div style={{ display: "flex", gap: ".5rem" }}>
                    <p
                      style={{ border: "1px solid black", padding: ".6rem" }}
                    ></p>
                    <p style={{ marginTop: ".3rem", fontSize: "11px" }}>
                      Public Sector
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: ".5rem" }}>
                    <p
                      style={{ border: "1px solid black", padding: ".6rem" }}
                    ></p>
                    <p style={{ marginTop: ".3rem", fontSize: "11px" }}>
                      Private Sector
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: ".5rem" }}>
                    <p
                      style={{ border: "1px solid black", padding: ".6rem" }}
                    ></p>
                    <p style={{ marginTop: ".3rem", fontSize: "11px" }}>
                      Industrial Sector
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: ".5rem" }}>
                    <p
                      style={{ border: "1px solid black", padding: ".6rem" }}
                    ></p>
                    <p style={{ marginTop: ".3rem", fontSize: "11px" }}>
                      Armed Forces
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-2" style={{ borderBottom: "1px solid black" }}>
          <div className="col-1">
            <p style={{ fontWeight: "bold", fontSize: "12px" }}>Inquirer:</p>
          </div>
          <div className="col-11">
            <div className="row">
              <div className="col">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    // marginTop: "1rem",
                  }}
                >
                  {/* <p style={{ fontWeight: "bold", fontSize: "12px" }}>
                    Inquirer:
                  </p> */}
                  <div style={{ display: "flex", gap: ".5rem" }}>
                    <p
                      style={{ border: "1px solid black", padding: ".6rem" }}
                    ></p>
                    <p style={{ marginTop: ".3rem", fontSize: "11px" }}>
                      Dealer/Distributor
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: ".5rem" }}>
                    <p
                      style={{ border: "1px solid black", padding: ".6rem" }}
                    ></p>
                    <p style={{ marginTop: ".3rem", fontSize: "11px" }}>
                      Project/Reidence Owner
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: ".5rem" }}>
                    <p
                      style={{ border: "1px solid black", padding: ".6rem" }}
                    ></p>
                    <p style={{ marginTop: ".3rem", fontSize: "11px" }}>
                      Architect/Consultant
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: ".5rem" }}>
                    <p
                      style={{ border: "1px solid black", padding: ".6rem" }}
                    ></p>
                    <p style={{ marginTop: ".3rem", fontSize: "11px" }}>
                      Contractor/Builder
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    // marginTop: "1rem",
                  }}
                >
                  <div style={{ display: "flex", gap: ".5rem" }}>
                    <p
                      style={{ border: "1px solid black", padding: ".6rem" }}
                    ></p>
                    <p style={{ marginTop: ".3rem", fontSize: "11px" }}>
                      End User
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: ".5rem" }}>
                    <p
                      style={{ border: "1px solid black", padding: ".6rem" }}
                    ></p>
                    <p style={{ marginTop: ".3rem", fontSize: "11px" }}>
                      Other
                    </p>
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
          </div>
        </div>
        <div style={{ border: "1px solid black" }}>
          <div
            style={{
              display: "flex",
              gap: ".5rem",
              marginTop: "1rem",
              marginLeft: ".2rem",
              fontSize: "12px",
            }}
          >
            <p style={{ fontWeight: "bold" }}>CUSTOMER NAME:</p>
            <p style={{ textDecoration: "underline" }}>Mr Arsalan Ahmed Khan</p>
          </div>
          <div
            style={{
              display: "flex",
              gap: ".5rem",
              marginLeft: ".2rem",
              fontSize: "12px",
            }}
          >
            <p style={{ fontWeight: "bold" }}>CONTACT PERSON:</p>
            <p style={{ textDecoration: "underline" }}>Mr Arsalan Ahmed Khan</p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div
              style={{
                display: "flex",
                gap: ".5rem",
                marginLeft: ".2rem",
                fontSize: "12px",
              }}
            >
              <p style={{ fontWeight: "bold" }}>ADDRESS:</p>
              <p style={{ textDecoration: "underline" }}>
                Mr Arsalan Ahmed Khan
              </p>
            </div>
            <div
              style={{
                display: "flex",
                gap: ".5rem",
                marginLeft: ".2rem",
                fontSize: "12px",
              }}
            >
              <p style={{ fontWeight: "bold" }}>PHONE NO:</p>
              <p style={{ textDecoration: "underline" }}>
                234234203423423402304230422342342342354235
              </p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: ".5rem",
              marginLeft: ".2rem",
              fontSize: "12px",
            }}
          >
            <p style={{ fontWeight: "bold" }}>SUPPLIED THROUGH:</p>
            <p style={{ textDecoration: "underline" }}>Mr Arsalan Ahmed Khan</p>
          </div>
          <div
            style={{
              display: "flex",
              gap: ".5rem",
              marginLeft: ".2rem",
              fontSize: "12px",
            }}
          >
            <p style={{ fontWeight: "bold" }}>
              PROJECT(Mention Name & Address of Site):
            </p>
            <p style={{ textDecoration: "underline" }}>Mr Arsalan Ahmed Khan</p>
          </div>
        </div>
        <div style={{ marginTop: "1rem" }}>
          <div style={{ display: "flex", gap: "1rem" }}>
            <div
              style={{
                display: "flex",
                gap: ".5rem",
                marginLeft: ".2rem",
                fontSize: "12px",
              }}
            >
              <p style={{ fontWeight: "bold" }}>COMPLAINT RECEIVING DATE:</p>
              <p style={{ textDecoration: "underline" }}>
                Mr Arsalan Ahmed Khan
              </p>
            </div>
            <p style={{ fontSize: "11px" }}>
              (attatch letter of customer, where applicable)
            </p>
          </div>
          <div
            style={{
              display: "flex",
              gap: ".5rem",
              marginLeft: ".2rem",
              fontSize: "12px",
            }}
          >
            <p style={{ fontWeight: "bold" }}>PRODUCT:</p>
            <p style={{ textDecoration: "underline" }}>Mr Arsalan Ahmed Khan</p>
          </div>
          <div
            style={{
              display: "flex",
              gap: ".5rem",
              marginLeft: ".2rem",
              fontSize: "12px",
            }}
          >
            <p style={{ fontWeight: "bold" }}>STAMPING:</p>
            <div style={{ display: "flex", gap: ".3rem" }}>
              <p style={{ border: "1px solid black", padding: ".6rem" }}></p>
              <p>No</p>
            </div>
            <div style={{ display: "flex", gap: ".3rem" }}>
              <p style={{ border: "1px solid black", padding: ".6rem" }}></p>
              <p>Yes(give details)</p>
            </div>
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
