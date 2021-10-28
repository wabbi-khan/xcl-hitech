import React, { useState } from "react";
import Loader from "react-loader-spinner";
import Button from "./Button";
import moment from "moment";
import { capitalize } from "../../utils/capitalize";

function generateRow(data, keys) {
  const values = [];
  for (const key of keys) {
    let value = { ...data };
    if (typeof key === "object") {
      if (key.indexFrom) {
        value = key.indexFrom[value[key.keyName]];
        values.push(value);
      } else if (key.dateFrom) {
        value = moment(value[key.dateFrom]).format("DD MMMM YYYY");
        values.push(value);
      }
    } else {
      const keyArr = key.toString().split(".");
      for (const el of keyArr) {
        if (value[el]) value = value[el];
        else value = "";
      }
      values.push(capitalize(value));
    }
  }
  return values;
}

const CustomTable = ({
  tableStyle,
  heading,
  columnHeadings,
  data = [],
  keys,
  onFirstOptionClick,
  firstOptionText,
  onSecondOptionClick,
  secondOptionText,
  withSrNo,
  fetchLoading,
  thirdOptionText,
  onThirdOptionClick,
  tablePrint,
}) => {
  function onClick(e) {
    const index = e.target.dataset.option;
    switch (index) {
      case "0":
        onFirstOptionClick(JSON.parse(e.target.dataset.element));
        return;
      case "1":
        onSecondOptionClick(JSON.parse(e.target.dataset.element));
        return;
      case "2":
        onThirdOptionClick(JSON.parse(e.target.dataset.element));
        return;
      default:
        return;
    }
  }

  return fetchLoading ? (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "3rem",
      }}
    >
      <Loader type="TailSpin" color="#000" width="3rem" height="3rem" />
    </div>
  ) : data.length === 0 ? (
    <p>There is no data found.</p>
  ) : (
    <>
      <table class="table table-responsive table-hover table-striped table-bordered border-dark text-center mt-4">
        <thead
          class={`${tablePrint ? "" : "bg-dark"} ${
            tablePrint ? "text-dark" : "text-light"
          }`}
        >
          <tr>
            {columnHeadings.map((el) => (
              <th align="center">{el}</th>
            ))}
            {(onFirstOptionClick ||
              onSecondOptionClick ||
              onThirdOptionClick) && <th align="center">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((el, i) => (
            <tr>
              {withSrNo && (
                <td className="text-dark bg-light" align="center">
                  {i + 1}
                </td>
              )}
              {generateRow(el, keys).map((el) => (
                <td className="text-dark bg-light" align="center">
                  {el ? el : "Not found"}
                </td>
              ))}
              {(onFirstOptionClick ||
                onSecondOptionClick ||
                onThirdOptionClick) && (
                <td className="text-dark bg-light" align="center">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {onFirstOptionClick && (
                      <Button
                        variant="contained"
                        classNames="bg-dark text-light"
                        size="small"
                        onClick={onClick}
                        text={firstOptionText}
                        style={{ marginTop: 2 }}
                        btnProps={{
                          "data-element": JSON.stringify(el),
                          "data-option": "0",
                        }}
                      />
                    )}

                    {onSecondOptionClick && (
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        text={secondOptionText}
                        style={{ marginLeft: 2, marginTop: 2 }}
                        btnProps={{
                          "data-element": JSON.stringify(el),
                          "data-option": "1",
                        }}
                        onClick={onClick}
                      />
                    )}

                    {onThirdOptionClick && (
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        classNames="bg-dark text-light"
                        text={thirdOptionText}
                        style={{ marginLeft: 2, marginTop: 2 }}
                        btnProps={{
                          "data-element": JSON.stringify(el),
                          "data-option": "2",
                        }}
                        onClick={onClick}
                      />
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CustomTable;
