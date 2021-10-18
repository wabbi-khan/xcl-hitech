import React from "react";
import { CustomButton, CustomTable } from "../../../components";

const PrintSalesContract = () => {
  const date = new Date();
  const currDate = date.getDate();
  const months = date.getMonth() + 1;
  const years = date.getFullYear();
  const fullDate = `${currDate} / ${months} / ${years}`;

  return (
    <div className="text-center">
      <div class="row mt-2">
        <div class="col-3 col-lg-3 col-md-3" style={{ marginTop: "6rem" }}>
          <img src="/images/nameLogo.png" width="220px" height="75px" alt="" />
        </div>
        <div class="col-9 mt-3">
          <div
            style={{
              textAlign: "end",
              paddingRight: "4rem",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                //   border: "2px solid #333",
                //   width: "100px",
              }}
            >
              <h6>FM-36</h6>
              <h6>Issue.01</h6>
            </div>
            <h5
              style={{
                fontWeight: "bold",
                marginTop: "1rem",
              }}
            >
              HI-TECH PIPE & ENGINEERING INDUSTRIES
            </h5>
            <h6
              style={{
                fontWeight: "bold",
              }}
            >
              Ph: 022-2116500-01 Fax: 022-2116509
            </h6>
            <p>Email: sales.kar@hitechpipe.com</p>
            <p style={{ marginTop: -15, fontSize: 13 }}>
              <a href="#">www.hitechpipe.com</a>
            </p>
          </div>
        </div>
        <h4
          style={{
            marginTop: "3rem",
            fontWeight: "bold",
          }}
        >
          SALES CONTRACT
        </h4>
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
        <div
          className="d-flex justify-content-between"
          style={{ fontSize: "13px" }}
        >
          <div className="d-flex">
            <p style={{ padding: ".5rem" }}>Sale Contract #</p>
            <p style={{ border: "1px solid black", padding: ".5rem" }}>{}</p>
          </div>
          <div className="d-flex">
            <p style={{ padding: ".5rem" }}>Dated: </p>
            <p style={{ border: "1px solid black", padding: ".5rem" }}>{}</p>
          </div>
        </div>
        <div className="row" style={{ fontSize: "12px", textAlign: "left" }}>
          <div className="col-4">
            <p>1. Registered Name of Company/ Buyers: </p>
          </div>
          <div className="col-8">
            <p style={{ fontWeight: "bold" }}>
              Registered Name of Company/ Buyers Registered Name of Company/
              Buyers Registered Name of Company/ Buyers
            </p>
          </div>
        </div>
        <div className="row" style={{ fontSize: "12px", textAlign: "left" }}>
          <div className="col-4">
            <p>Contractor: </p>
          </div>
          <div className="col-8">
            <p style={{ fontWeight: "bold" }}>Registered Name of Company</p>
          </div>
        </div>
        <div className="row" style={{ fontSize: "12px", textAlign: "left" }}>
          <div className="col-4">
            <p>Telephone: </p>
          </div>
          <div className="col-8">
            <p style={{ fontWeight: "bold", textDecoration: "underline" }}>
              23234234234234
            </p>
          </div>
        </div>
        <div className="row" style={{ fontSize: "12px", textAlign: "left" }}>
          <div className="col-4">
            <p>Fax: </p>
          </div>
          <div className="col-8">
            <p style={{ fontWeight: "bold", textDecoration: "underline" }}>
              23234234234234
            </p>
          </div>
        </div>
        <div className="row" style={{ fontSize: "12px", textAlign: "left" }}>
          <div className="col-4">
            <p>Email: </p>
          </div>
          <div className="col-8">
            <p style={{ fontWeight: "bold", textDecoration: "underline" }}>
              asd@gmail.com
            </p>
          </div>
        </div>
        <div
          className="row mt-3"
          style={{ fontSize: "12px", textAlign: "left" }}
        >
          <div className="col-4">
            <p>2. Business Address: </p>
          </div>
          <div className="col-8">
            <p style={{ fontWeight: "bold", textDecoration: "underline" }}>
              Registered Name of Company/ Buyers Registered Name of Company/
              Buyers Registered Name of Company/ Buyers
            </p>
          </div>
        </div>
        <div className="row" style={{ fontSize: "12px", textAlign: "left" }}>
          <div className="col-4">
            <p>Telephone: </p>
          </div>
          <div className="col-8">
            <p style={{ fontWeight: "bold", textDecoration: "underline" }}>
              Registered Name of Company
            </p>
          </div>
        </div>
        <div className="row" style={{ fontSize: "12px", textAlign: "left" }}>
          <div className="col-4">
            <p>Fax: </p>
          </div>
          <div className="col-8">
            <p style={{ fontWeight: "bold", textDecoration: "underline" }}>
              23234234234234
            </p>
          </div>
        </div>
        <div className="row" style={{ fontSize: "12px", textAlign: "left" }}>
          <div className="col-4">
            <p>Email: </p>
          </div>
          <div className="col-8">
            <p style={{ fontWeight: "bold", textDecoration: "underline" }}>
              asd@gmail.com
            </p>
          </div>
        </div>
        <div
          className="row mt-3"
          style={{ fontSize: "12px", textAlign: "left" }}
        >
          <div className="col-4">
            <p>3. Delivery Address: </p>
          </div>
          <div className="col-8">
            <p style={{ fontWeight: "bold", textDecoration: "underline" }}>
              Registered Name of Company/ Buyers Registered Name of Company/
              Buyers Registered Name of Company/ Buyers
            </p>
          </div>
        </div>
        <div className="row" style={{ fontSize: "12px", textAlign: "left" }}>
          <div className="col-4">
            <p>Contact Person: </p>
          </div>
          <div className="col-8">
            <p style={{ fontWeight: "bold", textDecoration: "underline" }}>
              Registered Name of Company
            </p>
          </div>
        </div>
        <div className="row" style={{ fontSize: "12px", textAlign: "left" }}>
          <div className="col-4">
            <p>Designation: </p>
          </div>
          <div className="col-8">
            <p style={{ fontWeight: "bold", textDecoration: "underline" }}>
              23234234234234
            </p>
          </div>
        </div>
        <div className="row" style={{ fontSize: "12px", textAlign: "left" }}>
          <div className="col-4">
            <p>Cell # </p>
          </div>
          <div className="col-8">
            <p style={{ fontWeight: "bold", textDecoration: "underline" }}>
              asd@gmail.com
            </p>
          </div>
        </div>
        <div
          className="row mt-3"
          style={{ fontSize: "12px", textAlign: "left" }}
        >
          <div className="col-4">
            <p>4. Nationality of Company/Buyer/Contractor: </p>
          </div>
          <div className="col-8">
            <p style={{ fontWeight: "bold", textDecoration: "underline" }}>
              asdasdasd
            </p>
          </div>
        </div>
        <div
          className="row mt-3"
          style={{ fontSize: "12px", textAlign: "left" }}
        >
          <div className="col-4">
            <p>5. Name Company/Buyer Owner/Chairman/M.D/Proprioter: </p>
          </div>
          <div className="col-8">
            <p style={{ fontWeight: "bold", textDecoration: "underline" }}>
              asdasdasd
            </p>
          </div>
        </div>
        <div
          className="row mt-3"
          style={{ fontSize: "12px", textAlign: "left" }}
        >
          <div className="col-4">
            <p>6. Orders: </p>
          </div>
        </div>
        <div className="">
          <CustomTable
            //   fetchLoading={fetchLoading}
            data={[{}]}
            columnHeadings={[
              "S.No",
              "Size/Diameter",
              "SN/PN",
              "Unit",
              "Qty.",
              "Unit Price",
              "Total Price(Rs.)",
              "Remarks",
            ]}
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
      <div
        className="row mt-3"
        style={{ fontSize: "13px", textAlign: "left", fontWeight: "bold" }}
      >
        <div className="col-4">
          <p>7. Pricing & Discount: </p>
        </div>
        <div
          className="d-flex justify-content-between"
          style={{ fontSize: "13px" }}
        >
          <div className="d-flex">
            <p style={{ padding: ".5rem" }}>Actual</p>
            <p style={{ border: "1px solid black", padding: ".5rem" }}>
              {}123,23,222
            </p>
          </div>
          <div className="d-flex">
            <p style={{ padding: ".5rem" }}>Discount(%): </p>
            <p style={{ border: "1px solid black", padding: ".5rem" }}>
              10{"%"}
            </p>
          </div>
          <div className="d-flex">
            <p style={{ padding: ".5rem" }}>Contract Price: </p>
            <p style={{ border: "1px solid black", padding: ".5rem" }}>
              {"Rs."}123,23,12,12,222
            </p>
          </div>
        </div>
      </div>
      <div
        style={{
          textAlign: "left",
          fontSize: "12px",
          border: "1px solid black",
          padding: "1rem",
          display: "flex",
          gap: ".2rem",
        }}
      >
        <p>Other Conditions: (If any) Total material price Rs.</p>
        <p>{}6,139,520.56</p>
        <p>Cartage of Rs. </p>
        <p>{}0.00</p>
        <p>Grand Total Rs. </p>
        <p>{}6,139,520.56</p>
      </div>
      <div className="row mt-3" style={{ fontSize: "12px", textAlign: "left" }}>
        <div className="d-flex">
          <p>
            8. HI-TECH PIPE & ENGINEERING INDUSTRIES hereafter referred to as
            the "seller" on the one party,
            <span style={{ fontWeight: "bold" }}>
              {} M/s BUILDING WONDER PVT LTD
            </span>{" "}
            , and hereafter referred to as the "Buyer" on the party have
            concluded the present contract as the following.
          </p>
        </div>
      </div>
      <div className="row mt-3" style={{ fontSize: "12px", textAlign: "left" }}>
        <p style={{ fontWeight: "bold" }}>
          9. Price & total amount of contract
        </p>
        <div style={{ display: "flex", gap: ".2rem" }}>
          <p>
            The total amount of this contract is RS:
            <span style={{ fontWeight: "bold" }}>
              {}(SIX MILLION ONE HUNDRED HUNDRED THIRTY NINE THOUSAND FIVE
              HUNDRED TWNETY & PAISAS FIFTY SIX ONLY)
            </span>
            for HDPE pipe Orders Pressure PN (As mentioned in Sr # 6) prices are
            firm for the duration of contract.
          </p>
        </div>
      </div>
      <div className="row mt-3" style={{ fontSize: "12px", textAlign: "left" }}>
        <p style={{ fontWeight: "bold" }}>10. Time & Term of Delivery</p>
        <div style={{ display: "flex", gap: ".2rem" }}>
          <p>Delivery made after the receipt of Payment with in </p>
          <p>{} 07 days (Min.)</p>
        </div>
      </div>
      <div className="row mt-3" style={{ fontSize: "12px", textAlign: "left" }}>
        <p style={{ fontWeight: "bold" }}>11. Term of Payments</p>
        <div style={{ display: "flex", gap: ".2rem" }}>
          <p>Payment must be made by </p>
          <p>{} 100% (advance)</p>
        </div>
      </div>
      <div className="row mt-3" style={{ fontSize: "12px", textAlign: "left" }}>
        <p style={{ fontWeight: "bold" }}>12. Transportation</p>
        <div style={{ display: "flex", gap: ".2rem" }}>
          <p>Transportation charges to paid by "buyer"</p>
        </div>
      </div>
      <div className="row mt-3" style={{ fontSize: "12px", textAlign: "left" }}>
        <p style={{ fontWeight: "bold" }}>13. Other conditions</p>
        <p style={{ fontWeight: "bold" }}>Arbitration</p>
        <p>
          All disputes & differences ,which one can arise to or in connection
          with the present contract , should be decided by negotiation between
          Seller & the buyer
        </p>
      </div>
      <div
        className="d-flex justify-content-between"
        style={{ fontSize: "13px" }}
      >
        <div className="">
          <p style={{ border: "1px solid black", padding: "1.5rem", width: '200px' }}>{}</p>
        </div>
        <div className="">
          <p style={{ border: "1px solid black", padding: "1.5rem", width: '300px' }}>{}</p>
          <p style={{ marginTop: '-.8rem' }}> For & on behalf of the Buyer </p>
        </div>
      </div>
      <p className='endOfContract'>End of Contract</p>
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
              Prepared By
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <hr style={{ borderTop: "3px solid black", width: "200px" }} />
            <p style={{ marginTop: -10, fontSize: 12, fontWeight: "bold" }}>
              Approved By
            </p>
          </div>
        </div>
        <div className="offset-6 col-3">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <p style={{ marginTop: -10, fontSize: 12, fontWeight: "bold" }}>
              Date:
            </p>
            <p
              style={{
                marginTop: -10,
                fontSize: 12,
                textDecoration: "underline",
              }}
            >
              {}
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

export default PrintSalesContract;
