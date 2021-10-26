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
        <p style={{ textDecoration: "underline" }}>asd</p>
      </div>
      <div className="container" style={{ display: "flex", gap: "1rem" }}>
        <p>Address: </p>
        <p style={{ textDecoration: "underline" }}>asd</p>
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
              <td>Comments/Any Suggestions:</td>
              <td colspan="5">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque
                sapiente adipisci beatae itaque minima, rem error architecto nam
                sed reprehenderit illo autem ullam iure labore, perspiciatis
                mollitia corrupti voluptas explicabo!
              </td>
            </tr>
          </tbody>
        </table>
        <p className="mt-4">
          Look forward to have your continued patronization & cooperation, we
          remains
        </p>
      </div>
    </div>
  );
};

export default PrintCustomerFeedback;
