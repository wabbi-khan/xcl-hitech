import React from "react";
import { CustomTable, CustomButton } from "../../../components";

const PrintSetupCard = () => {
  return (
    <div className="text-center">
      <div class="row mt-2 container">
        <div class="col-3 col-lg-3 col-md-3">
          <img src="/images/nameLogo.png" width="220px" height="75px" alt="" />
        </div>
        <div class="offset-2 col-7 mt-3">
          {/* <div
            style={{
              display: "flex",
              flexDirection: "column",
              border: "2px solid #333",
              width: "100px",
            }}
          >
            <h6>FM-36</h6>
            <h6>Issue.01</h6>
          </div> */}
          <div style={{ textAlign: "right" }}>
            <h5>HI-TECH PIPE & ENGINEERING INDUSTRIES</h5>
            <p style={{ marginTop: "-10px" }}>
              X-22, Extension Area, S.I.T.E., Kotri
            </p>
            <p style={{ marginTop: "-15px" }}>
              Ph: +92-22-3870614 -15, Fax: +92-22-3870606
            </p>
            <p style={{ marginTop: "-15px" }}>Email: hitech_pipes@yahoo.com</p>
          </div>
        </div>
        <h5
          style={{
            marginTop: "1.2rem",
            fontWeight: "bold",
            textDecoration: "underline",
          }}
        >
          SETUP CARD
        </h5>
      </div>
      <div class="container" id="printBtn">
        <CustomButton
          text="Print"
          classNames="btn bg-dark text-light"
          onClick={() => window.print()}
          style={{ marginLeft: "auto" }}
        />
      </div>
      <div className="mt-4">
        <div className="" style={{ marginTop: 30, marginLeft: "auto" }}>
          <CustomTable
            //   fetchLoading={fetchLoading}
            data={[{}]}
            columnHeadings={["S.No", "", "", "", ""]}
            keys={[
              "item.name",
              "quantityExamined",
              "properties",
              "ok",
              "ok",
              "reasonForRejection",
              "remarks",
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
            <p
              style={{
                marginTop: -10,
                fontSize: 12,
                fontWeight: "bold",
              }}
            >
              Prepared By
            </p>
          </div>
        </div>
        <div className="offset-6 col-3">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <hr style={{ borderTop: "3px solid black", width: "200px" }} />
            <p
              style={{
                marginTop: -10,
                fontSize: 12,
                fontWeight: "bold",
              }}
            >
              Approved By
            </p>
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

export default PrintSetupCard;
