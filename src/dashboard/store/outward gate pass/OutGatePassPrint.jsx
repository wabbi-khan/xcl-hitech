import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";
import { makeStyles, withStyles } from "@material-ui/core/styles";
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

const OutGatePassPrint = () => {
  const classes = useStyles();

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
        <div className="mt-2">
          <h4>Hi-Tech Pipe & Engineering Industries</h4>
          <h6 className="mt-3">Plot No X-22, Site Area Kotri</h6>
          <p>Ph-No 022-2116500-01</p>
        </div>
        <h3
          style={{
            marginTop: ".5rem",
            fontWeight: "bold",
            textDecoration: "underline",
          }}
        >
          OUTWARD GATE PASS
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
              "Product Name",
              "Unit",
              "Quantity",
              "Remarks",
            ]}
            keys={["name", "category.name", "subCategory.name", "unit.name"]}
            // firstOptionText="Edit"
            // onFirstOptionClick={handleOpen}
            // secondOptionText="Delete"
            // onSecondOptionClick={deleteOutwardGatePass}
            // thirdOptionText="View"
            // onThirdOptionClick={pushToPrint}
            withSrNo
          />
        </div>
      </div>
      <Grid container spacing={1} style={{ marginTop: 120 }}>
        <Grid item lg={3} md={3} sm={3} xs={3}>
          <hr style={{ borderTop: "3px solid black" }} />
          <p style={{ marginTop: -10, fontSize: 12, fontWeight: "bold" }}>
            Prepared By:
          </p>
          <p style={{ marginTop: -10, fontSize: 12, fontWeight: "bold" }}>
            Admin Department
          </p>
        </Grid>
        <Grid item lg={1} md={1} sm={1} xs={1}></Grid>
        <Grid item lg={3} md={3} sm={3} xs={3}>
          <hr style={{ borderTop: "3px solid black" }} />
          <p style={{ marginTop: -10, fontSize: 12, fontWeight: "bold" }}>
            Reviewed By:
          </p>
          <p style={{ marginTop: -10, fontSize: 12, fontWeight: "bold" }}>
            Management Representative
          </p>
        </Grid>
        <Grid item lg={1} md={1} sm={1} xs={1}></Grid>
        <Grid item lg={3} md={3} sm={3} xs={3}>
          <hr style={{ borderTop: "3px solid black" }} />
          <p style={{ marginTop: -10, fontSize: 12, fontWeight: "bold" }}>
            Approved By:
          </p>
          <p style={{ marginTop: -10, fontSize: 12, fontWeight: "bold" }}>
            CEO / Executive Director
          </p>
        </Grid>
      </Grid>
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

export default OutGatePassPrint;
