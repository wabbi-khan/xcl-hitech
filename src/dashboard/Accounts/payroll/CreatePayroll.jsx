import React, { useEffect, useState } from "react";
import { getEmployees } from "../../../services/action/EmployeesAction";
import { useDispatch, useSelector } from "react-redux";
import { CustomInput, CustomButton, CustomTable } from "../../../components";
import Sidenav from "../../SideNav/Sidenav";
import Checkbox from "@material-ui/core/Checkbox";

const CreatePayroll = () => {
  const [fetchLoading, setFetchLoading] = useState(true);
  const [fetchError, setFetchError] = useState();

  const { employees } = useSelector((state) => state.employees);

  const dispatch = useDispatch();

  useEffect(() => {
    setFetchLoading(true);
    dispatch(
      getEmployees(null, (err) => {
        if (err) {
          setFetchError(err);
          setTimeout(() => {
            setFetchError("");
          }, 4000);
        }
        setFetchLoading(false);
      })
    );
  }, []);

  //   console.log(employees);

  return (
    <Sidenav title="Create Payroll">
      <div>
        <div className="d-flex justify-content-between">
          <div
            style={{
              display: "flex",
              // justifyContent: "center",
              // alignItems: "center",
            }}
          >
            <p className="mt-3">Check All</p>
            <Checkbox color="default" />
          </div>
          <CustomButton text="Pay" classNames="btn btn-sm bg-dark text-light" />
        </div>
        <table class="table table-responsive table-hover table-striped table-bordered border-dark text-center mt-2">
          <thead class="thead-inverse bg-dark text-light">
            <tr>
              <td>Approve</td>
              <td>Sr. #</td>
              <td>Employee Name</td>
              <td>Designation</td>
              <td>Department</td>
              <td>Salary</td>
              <td>Leaves</td>
              <td>Deduction</td>
              <td>Final Salary</td>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, i) => {
              //   console.log(emp);
              return (
                <tr>
                  <td>
                    <Checkbox color="default" size="small" />
                  </td>
                  <td>{i + 1}</td>
                  <td>{emp.name}</td>
                  <td>{emp.finalDesignation.name}</td>
                  <td>{emp.finalDepartment.name}</td>
                  <td>{emp.finalSal}</td>
                  <td>{}-</td>
                  <td>{}-</td>
                  <td>{}-</td>
                </tr>
              );
            })}
            <tr>
              <td colspan="8" style={{ textAlign: 'right', fontWeight: 'bold' }}>Total Salary Amount: </td>
              <td>{}12,12100</td>
            </tr>
            <tr>
              <td colspan="8" style={{ textAlign: 'right', fontWeight: 'bold' }}>Total Deduction Amount: </td>
              <td>{}12,12100</td>
            </tr>
            <tr>
              <td colspan="8" style={{ textAlign: 'right', fontWeight: 'bold' }}>Final Salary Amount: </td>
              <td>{}12,12100</td>
            </tr>
          </tbody>
        </table>
		<CustomButton text="Create Salary Voucher" classNames="btn btn-sm bg-dark text-light" style={{ float: 'right' }} />
        {/* <CustomTable
          fetchLoading={fetchLoading}
          data={employees}
          columnHeadings={[
            "Sr.#",
            "Employee Name",
            "Designation",
            "Department",
            "Salary",
            "Leaves",
            "Deduction",
            "Final Salary",
            "Approve",
          ]}
          keys={[
            "name",
            "finalDesignation.name",
            "finalDepartment.name",
            "finalSal",
            "",
            "",
            "",
            "",
          ]}
          withSrNo
        /> */}
        {/* {employees.map((el) => (
          <div>
            <p>{el.name}</p>
          </div>
        ))} */}
      </div>
    </Sidenav>
  );
};

export default CreatePayroll;
