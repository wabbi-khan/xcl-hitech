import React, { useState, useEffect } from "react";
import Sidenav from "../../../SideNav/Sidenav";
import Container from "@material-ui/core/Container";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import {
  CustomButton,
  CustomTable,
  CustomInput,
  CustomContainer,
} from "../../../../components";

const Entries = () => {
  const [fetchLoading, setFetchLoading] = useState(false);

  return (
    <Sidenav title={"Entries"}>
      <div>
        <div>
          <CustomContainer>
            <Grid container spacing={1} style={{ marginTop: "2rem" }}>
              <Grid item lg={3} md={3} sm={12} xs={12}>
                <CustomInput label="Enter Amount" />
              </Grid>
              <Grid item lg={3} md={3} sm={12} xs={12}>
                <CustomInput label="Select From Account" select></CustomInput>
              </Grid>
              <Grid item lg={3} md={3} sm={12} xs={12}>
                <CustomInput label="Select To Account" select></CustomInput>
              </Grid>
              <Grid item lg={3} md={3} sm={12} xs={12}>
                <CustomInput label="Description" />
              </Grid>
            </Grid>
          </CustomContainer>
          <CustomContainer>
            <div>
              <CustomButton
                text="Submit"
                variant="outlined"
                style={{
                  marginTop: "1rem",
                  backgroundColor: "#22A19A",
                  color: "#FFFFFF",
                }}
              />
            </div>
          </CustomContainer>
          {/* <CustomTable
            fetchLoading={fetchLoading}
            data={[{}]}
            columnHeadings={[
              "Sr.No",
              "Account Type",
              "Account Name",
              "Account Current Balance",
            ]}
            keys={["", "", ""]}
            firstOptionText="Edit"
            onFirstOptionClick={handleOpen}
            secondOptionText="Delete"
            onSecondOptionClick={deleteStock}
            withSrNo
          /> */}
        </div>
      </div>
    </Sidenav>
  );
};

export default Entries;
