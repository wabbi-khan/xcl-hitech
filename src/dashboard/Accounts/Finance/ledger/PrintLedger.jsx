import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CustomTable } from "../../../../components";
import Button from "../../../../components/utils/Button";

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

const PrintLedger = () => {
  const date = new Date();
  const currDate = date.getDate();
  const months = date.getMonth() + 1;
  const years = date.getFullYear();
  const fullDate = `${currDate} / ${months} / ${years}`;

  return (
    <div className="text-center">
      <div class="row mt-2">
        <div class="col-3 col-lg-3 col-md-3">
          <img src="/images/nameLogo.png" width="220px" height="75px" alt="" />
        </div>
        {/* <div class="offset-7 col-2 mt-3">
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
            <h6>FM-36</h6>
            <h6>Issue.01</h6>
          </div>
        </div> */}
        <h4
          style={{
            marginTop: ".5rem",
            fontWeight: "bold",
            textDecoration: "underline",
          }}
        >
          LEDGER
        </h4>
      </div>
      <div className="container d-flex justify-content-between mt-4" >
        <div style={{ display: 'flex', gap: '1rem' }}>
            <p style={{ fontWeight: "bold" }}>
                Date:
            </p>
            <p>
                {  }
            </p>
        </div>
        <Button
          size="small"
          text="Print"
          id="printBtn"
          variant="contained"
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
            columnHeadings={[
              "Sr.No",
              "Date",
              "Account Type",
              "Account Name",
              "From (Account Name)",
              "To (Account Name)",
              "Balance",
            ]}
            keys={["", "", "", "", "", ""]}
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
            {/* <p style={{ marginTop: -10, fontSize: 12, fontWeight: "bold" }}>
              Prepared By
            </p> */}
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

export default PrintLedger;
