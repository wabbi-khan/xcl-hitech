import React from "react";
import Sidenav from "../../../SideNav/Sidenav";

const SalaryVoucher = () => {
  return (
    <div className='container mt-5'>
        <h4 style={{ fontWeight: 'bold', textDecoration: 'underline', textAlign: 'center' }}>Salary Voucher</h4>
        <div className='d-flex mt-5' style={{ gap: '.5rem' }}>
            <p>Date: </p>
            <p style={{ textDecoration: 'underline',}}>
                {  }
            </p>
        </div>
        <div className='d-flex' style={{ gap: '.5rem' }}>
            <p>Voucher #:</p>
            <p style={{ textDecoration: 'underline',}}>
                {  }
            </p>
        </div>
        <div className='d-flex' style={{ gap: '.5rem' }}>
            <p>To Account: </p>
            <p style={{ textDecoration: 'underline',}}>
                {  }
            </p>
        </div>
        <div className='d-flex' style={{ gap: '.5rem' }}>
            <p>From Account: </p>
            <p style={{ textDecoration: 'underline',}}>
                {  }
            </p>
        </div>
        <div className='d-flex' style={{ gap: '.5rem' }}>
            <p>Account Head: </p>
            <p style={{ textDecoration: 'underline',}}>
                {  }
            </p>
        </div>
        <div className='d-flex' style={{ gap: '.5rem' }}>
            <p>Narration/Description: </p>
            <p style={{ textDecoration: 'underline',}}>
                {  }
            </p>
        </div>
      <table class="table table-responsive table-hover table-striped table-bordered border-dark text-center mt-1">
        <thead class="thead-inverse">
          <tr>
            <td>Sr. #</td>
            <td>Items</td>
            <td>Details</td>
            <td>Amount</td>
          </tr>
        </thead>
        <tbody>
          {/* {employeesData.map((emp, i) => {
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
              })} */}
          <tr>
            <td colspan="3" style={{ textAlign: "right", fontWeight: "bold" }}>
              Total Amount:
            </td>
            <td>
                {  }
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SalaryVoucher;
