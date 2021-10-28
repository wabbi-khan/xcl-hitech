import React from "react";
import { CustomTable } from "../../../components";

const PrintCustomerFeedback = () => {
  const date = new Date();
  const currDate = date.getDate();
  const months = date.getMonth() + 1;
  const years = date.getFullYear();
  const fullDate = `${currDate} / ${months} / ${years}`;

  return (
    <div className="">
      <div className="mt-4">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100px",
            border: "1px solid black",
            textAlign: "center",
            float: "right",
            marginRight: ".2rem",
          }}
        >
          <h6>FM-49</h6>
          <h6>Issue.02</h6>
        </div>
        <h4
          style={{
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          CUSTOMER FEEDBACK FORM
        </h4>
      </div>
      <div className="container mt-5" style={{ display: "flex", gap: "1rem" }}>
        <p>M/s: </p>
        <p style={{ textDecoration: "underline" }}>{}</p>
      </div>
      <div className="container" style={{ display: "flex", gap: "1rem" }}>
        <p>Address: </p>
        <p style={{ textDecoration: "underline" }}>{}</p>
      </div>
      <div className="container">
        <p>Dear Sir,</p>
        <p>
          We are thankful for you patronization and using our products, HI TECH
          Management is always very keen to extend best cooperation to
          facilitate our customers, to their best. To further improve, we need
          your cooperation & assistance & therefore, forwarding you a format for
          your comments and advice.
        </p>
        <p>
          We would be much obliged, if you may return us the same with your
          valued advice and comments:
        </p>
        <p>Please tick √ on appropriate Box & return to us.</p>
        <table class="table table-responsive table-hover table-striped table-bordered border-dark text-center mt-4">
          <thead>
            <tr>
              <th>S. No.</th>
              <th>Description</th>
              <th>Excellent</th>
              <th>Good</th>
              <th>Average</th>
              <th>Poor</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1.</td>
              <td>The Quality of Hi Tech Products</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>2.</td>
              <td>Timely response & deliveries.</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>3.</td>
              <td>Technical Feedback and Support.</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>4.</td>
              <td>After Sales, Services.</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>5.</td>
              <td>General Behavior and Customer Services.</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td style={{ fontWeight: "bold" }}>Comments/Any Suggestions:</td>
              <td colspan="5">{}</td>
            </tr>
          </tbody>
        </table>
        <div style={{ fontSize: "14px" }}>
          <p className="mt-4">
            Look forward to have your continued patronization & cooperation, we
            remains
          </p>
          <div className="row pt-3">
            <div className="col-6">
              <p>Your Faithfull,</p>
              <p style={{ marginTop: "-1rem" }}>For & on behalf of</p>
              <p style={{ marginTop: "-1rem" }}>
                Hi Tech Pipe & Engineering Industries
              </p>
              <div style={{ marginTop: '10rem' }}>
                <hr
                  style={{
                    borderTop: "1px solid black",
                    padding: "1px",
                    width: "180px",
                  }}
                />
                <p style={{ marginTop: '-.5rem' }}>Sales/Marketing Manager</p>
              </div>
            </div>
            <div className="col-6">
              <p style={{ fontWeight: "bold" }}>To be filled by the client:</p>
              <div className="row pt-3">
                <div className="col-3">
                  <p>Name:</p>
                </div>
                <div className="col-4">
                  <hr
                    style={{
                      borderTop: "1px solid black",
                      padding: "1px",
                      width: "300px",
                    }}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-3">
                  <p>Designation:</p>
                </div>
                <div className="col-4">
                  <hr
                    style={{
                      borderTop: "1px solid black",
                      padding: "1px",
                      width: "300px",
                    }}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-3">
                  <p>Company Name:</p>
                </div>
                <div className="col-4">
                  <hr
                    style={{
                      borderTop: "1px solid black",
                      padding: "1px",
                      width: "300px",
                    }}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-3">
                  <p>Signature & Stamp:</p>
                </div>
                <div className="col-4">
                  <hr
                    style={{
                      borderTop: "1px solid black",
                      padding: "1px",
                      width: "300px",
                    }}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-3">
                  <p>Date:</p>
                </div>
                <div className="col-4">
                  <hr
                    style={{
                      borderTop: "1px solid black",
                      padding: "1px",
                      width: "300px",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintCustomerFeedback;
