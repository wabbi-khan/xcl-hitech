import React, { useEffect, useState } from "react";
import { getEmployees } from "../../../services/action/EmployeesAction";
import { useDispatch, useSelector } from "react-redux";
import { CustomInput, CustomButton, CustomTable } from "../../../components";
import Loader from "react-loader-spinner";
import Sidenav from "../../SideNav/Sidenav";
import Checkbox from "@material-ui/core/Checkbox";
import moment from "moment";

const CreatePayroll = ({ history }) => {
  const [fetchLoading, setFetchLoading] = useState(true);
  const [fetchError, setFetchError] = useState();
  const [employeesData, setEmployeesData] = useState([]);
  const [checkAll, setCheckAll] = useState(false);
  const [totalSal, setTotalSal] = useState(0);
  const [totalDeduction, setTotalDeduction] = useState(0);
  const [finalSal, setFinalSal] = useState(0);

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

  function getAmountOfWeekDaysInMonth(date, weekday) {
    date.date(1);
    var dif = ((7 + (weekday - date.weekday())) % 7) + 1;
    return Math.floor((date.daysInMonth() - dif) / 7) + 1;
  }

  useEffect(() => {
    console.log(employees);
    let totalLeaves = "";
    let totalDaysInCurrMonth = moment().daysInMonth();
    let sundaysInMonth = getAmountOfWeekDaysInMonth(moment(), 0);
    const temp = employees.map((el) => {
      let totalLeaves = 0;
      let totalDeduction = 0;
      let totalSalaryAfterDeduction = el.finalSal;
      let empSalOfSingleDay = el.finalSal / totalDaysInCurrMonth;

      for (let i = 0; i < el.leaves.length; i++) {
        totalLeaves += parseInt(el.leaves[i].days);
      }
      if (totalLeaves > 0) {
        totalDeduction = Math.ceil(empSalOfSingleDay * totalLeaves);
        totalSalaryAfterDeduction -= totalDeduction;
      }

      return {
        ...el,
        checked: false,
        totalLeaves,
        totalDeduction,
        totalSalaryAfterDeduction,
      };
    });

    setEmployeesData([...temp]);
  }, [employees]);

  const check = (index) => {
    setEmployeesData((prevData) => {
      const temp = [...prevData];
      temp[index] = { ...temp[index], checked: !temp[index].checked };
      if (temp[index].checked) {
        setTotalSal((prevSal) => (prevSal += temp[index].finalSal));
        setTotalDeduction((prevSal) => (prevSal += temp[index].totalDeduction));
        setFinalSal(
          (prevSal) => (prevSal += temp[index].totalSalaryAfterDeduction)
        );
      } else {
        setTotalSal((prevSal) => (prevSal -= temp[index].finalSal));
        setTotalDeduction((prevSal) => (prevSal -= temp[index].totalDeduction));
        setFinalSal(
          (prevSal) => (prevSal -= temp[index].totalSalaryAfterDeduction)
        );
      }
      return temp;
    });
  };

  const checkAllFunc = () => {
    setCheckAll((prevData) => {
      if (prevData) {
        setEmployeesData((prevEmpData) =>
          prevEmpData.map((el) => ({ ...el, checked: false }))
        );
      } else {
        setEmployeesData((prevEmpData) =>
          prevEmpData.map((el) => ({ ...el, checked: true }))
        );
      }

      if (prevData) {
        setTotalSal(0);
        setTotalDeduction(0);
        setFinalSal(0);
      } else {
        let tempSal = 0;
        let tempDeduction = 0;
        let tempTotalAfterDed = 0;
        setEmployeesData((prevEmpData) =>
          prevEmpData.map((el) => ({ ...el, checked: true }))
        );

        for (let i = 0; i < employeesData.length; i++) {
          tempSal += employeesData[i].finalSal;
          tempDeduction += employeesData[i].totalDeduction;
          tempTotalAfterDed += employeesData[i].totalSalaryAfterDeduction;
        }
        setTotalSal(tempSal);
        setTotalDeduction(tempDeduction);
        setFinalSal(tempTotalAfterDed);
      }

      return !prevData;
    });
  };

  const setTotalSalFunc = (emp) => {
    let temp = 0;
    emp.forEach((el) => {
      if (el.checked) {
        console.log(el.totalSalaryAfterDeduction);
      }
    });
  };

  const goToVoucherPage = () => {
    history.push("/payroll/salary_voucher");
  };

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
            <p className="mt-3">{checkAll ? "Uncheck All" : "Check All"}</p>
            <Checkbox
              color="default"
              checked={checkAll}
              onChange={checkAllFunc}
            />
          </div>
          <CustomButton text="Pay" classNames="btn btn-sm bg-dark text-light" />
        </div>
        {fetchLoading ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "3rem",
              marginBottom: "3rem",
            }}
          >
            <Loader type="TailSpin" color="#000" width="3rem" height="3rem" />
          </div>
        ) : employeesData?.length === 0 ? (
          <p>There is no data found.</p>
        ) : (
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
              {employeesData.map((emp, i) => {
                //   console.log(emp);
                return (
                  <tr>
                    <td>
                      <Checkbox
                        color="default"
                        size="small"
                        checked={emp.checked}
                        onChange={() => check(i)}
                      />
                    </td>
                    <td>{i + 1}</td>
                    <td>{emp.name}</td>
                    <td>{emp.finalDesignation.name}</td>
                    <td>{emp.finalDepartment.name}</td>
                    <td>{emp.finalSal}</td>
                    <td>{emp.totalLeaves}</td>
                    <td>{emp.totalDeduction}</td>
                    <td>{emp.totalSalaryAfterDeduction}</td>
                  </tr>
                );
              })}
              <tr>
                <td
                  colspan="8"
                  style={{ textAlign: "right", fontWeight: "bold" }}
                >
                  Total Salary Amount:
                </td>
                <td>{totalSal}</td>
              </tr>
              <tr>
                <td
                  colspan="8"
                  style={{ textAlign: "right", fontWeight: "bold" }}
                >
                  Total Deduction Amount:{" "}
                </td>
                <td>{totalDeduction}</td>
              </tr>
              <tr>
                <td
                  colspan="8"
                  style={{ textAlign: "right", fontWeight: "bold" }}
                >
                  Final Salary Amount:{" "}
                </td>
                <td>{finalSal}</td>
              </tr>
            </tbody>
          </table>
        )}
        <div style={{ marginTop: 50, marginBottom: 60 }}>
          <hr />
        </div>
        <div className="row">
          <div className="col-3">
            <CustomInput
              label="Enter Voucher Description"
              style={{ width: "100%" }}
              // onChange={props.handleChange("customer")}
              // value={props.values.customer}
              // onBlur={props.handleBlur("customer")}
              // helperText={props.touched.customer && props.errors.customer}
              // error={props.touched.customer && props.errors.customer}
            />
          </div>
          <div className="col-2">
            <CustomButton
              style={{ textTransform: "capitalize" }}
              text="Create Salary Voucher"
              classNames="btn btn-sm bg-dark text-light"
              onClick={goToVoucherPage}
            />
          </div>
        </div>
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
