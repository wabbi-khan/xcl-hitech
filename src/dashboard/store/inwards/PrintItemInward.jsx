import React from "react";
import Button from "../../../components/utils/Button";

const PrintItemInward = () => {
  return (
    <div>
      <div class="text-center">
        <div class="row mt-2">
          <div class="col-lg-3 col-md-3 col-sm-4">
            <img src="/images/nameLogo.png" width="90%" height="80%" alt="" />
          </div>
          <div class="offset-lg-7 offset-md-7 offset-sm-6 col-lg-2 col-md-2 col-sm-2 mt-2">
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
              <h6>FM-27</h6>
              <h6>Issue.02</h6>
            </div>
          </div>
          <h4>Hi-Tech Pipe & Engineering Industries</h4>
          <h6>Plot No X-22, Site Area Kotri</h6>
          <p>Ph-No 022-3870614-5, Fax: 022-3870606</p>
          <h3
            style={{
              marginTop: "1rem",
              fontWeight: "bold",
              textDecoration: "underline",
            }}
          >
            BIN CARD
          </h3>
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
        <div className="container-fluid mt-5"></div>
      </div>
    </div>
  );
};

export default PrintItemInward;
