import React, { useState, useEffect } from "react";
import Sidenav from "../../SideNav/Sidenav";
import { CustomButton, CustomTable } from "../../../components";

const OrderLogSheet = ({ history }) => {
  const [fetchLoading, setFetchLoading] = useState(false);

  const printLogSheet = () => {
    history.push('/marketing_dashboard/print_order_log_sheet')
  }

  return (
    <Sidenav title={"Order Log Sheet"}>
      <CustomTable
        fetchLoading={fetchLoading}
        data={[{}]}
        heading="orderLogSheet"
        columnHeadings={[
          "Sr.No",
          "Req. Date",
          "Order No",
          "Customer's Details",
          "Contant Person",
          "Address",
          "Contact No.",
          "Request Received Vide",
          "Request Received For",
          "HiTech Response Vide",
          "Order Approved/Not Approved",
        ]}
        keys={["", "", "", "", "", "", "", "", "", ""]}
        firstOptionText="Print"
        onFirstOptionClick={printLogSheet}
        withSrNo
      />
    </Sidenav>
  );
};

export default OrderLogSheet;
