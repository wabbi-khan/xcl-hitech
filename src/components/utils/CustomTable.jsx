import React from "react";
import Loader from "react-loader-spinner";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Button from "./Button";
import { makeStyles, withStyles } from "@material-ui/core/styles";

function generateRow(data, keys) {
  const values = [];
  for (const key of keys) {
    let value = { ...data };
    const keyArr = key.split(".");
    for (const el of keyArr) {
      if (value[el]) value = value[el];
      else value = "";
    }
    values.push(value);
  }
  return values;
}

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  mainContainer: {
    textAlign: "center",
    marginTop: 20,
  },
  addButton: {
    marginTop: 20,
    color: "#22A19A",
    borderColor: "#22A19A",
    fontWeight: "bold",
    "&:hover": {
      border: "none",
      backgroundColor: "#22A19A",
      color: "whitesmoke",
    },
    [theme.breakpoints.up("md")]: {
      width: "15%",
    },
    [theme.breakpoints.down("sm")]: {
      // width: '12%',
    },
  },
  table: {
    minWidth: 600,
  },
  dataTable: {
    marginTop: 40,
  },
  tableContainer: {
    marginTop: 10,
  },
  inputFieldStyle: {
    [theme.breakpoints.up("md")]: {
      width: 330,
    },
    [theme.breakpoints.down("sm")]: {
      width: 200,
    },
  },
  inputFieldStyle1: {
    [theme.breakpoints.up("md")]: {
      width: 330,
      marginLeft: 5,
    },
    [theme.breakpoints.down("sm")]: {
      width: 200,
      marginTop: 10,
    },
  },
}));

const CustomTable = ({
  heading,
  columnHeadings,
  data,
  keys,
  onFirstOptionClick,
  firstOptionText,
  onSecondOptionClick,
  secondOptionText,
  withSrNo,
  fetchLoading,
}) => {
  const classes = useStyles();

  function onClick(e) {
    const index = e.target.dataset.option;
    index === "0"
      ? onFirstOptionClick(JSON.parse(e.target.dataset.element))
      : onSecondOptionClick(JSON.parse(e.target.dataset.element));
  }

  console.log(fetchLoading);

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
      <div className={classes.dataTable}>
        <TableContainer className={classes.tableContainer}>
          <Table
            stickyHeader
            className="table table-dark"
            style={{ backgroundColor: "#d0cfcf", border: "1px solid grey" }}
          >
            <TableHead>
              <TableRow>
                {columnHeadings.map((el) => (
                  <StyledTableCell align="center">{el}</StyledTableCell>
                ))}
                {onFirstOptionClick && (
                  <StyledTableCell align="center">Actions</StyledTableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((el, i) => (
                <StyledTableRow>
                  {withSrNo && (
                    <StyledTableCell
                      className="text-dark bg-light"
                      align="center"
                    >
                      {i + 1}
                    </StyledTableCell>
                  )}
                  {generateRow(el, keys).map((el) => (
                    <StyledTableCell
                      className="text-dark bg-light"
                      align="center"
                    >
                      {el ? el : "Not found"}
                    </StyledTableCell>
                  ))}
                  {onFirstOptionClick && (
                    <StyledTableCell
                      className="text-dark bg-light"
                      align="center"
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
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
                      </div>
                    </StyledTableCell>
                  )}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default CustomTable;
