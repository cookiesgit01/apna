import React from "react";
// import Input from "../common/input";
import DataTable from "react-data-table-component";
import MainButton from "../common/button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import "../../../style/order.css";
import axios from "axios";
function Transactions() {
  const token = localStorage.getItem("token");
  const [apicall, setapicall] = useState(false);
  const [transectiondata, setTransectionData] = useState([]);
  console.log("TRANSECTION")
  console.log(transectiondata)

  const [SearchTransection, setSearchTransection] = useState({
    order_id: "",
    method: "",
    status: "",
  });

  // To render the data of the transaction list :-
  useEffect(() => {
    axios
      .post(
        `${process.env.REACT_APP_BASEURL}/transaction_list`,
        {
          order_id: SearchTransection.order_id,
          method: SearchTransection.method,
          status: SearchTransection.status,
        },
        {
          headers: {
            admin_token: token,
          },
        }
      )
      .then((response) => {
        let data = response.data;
        setTransectionData(data);
        setapicall(false);
      })
      .catch((err) => { });
  }, [apicall]);

  // const TransectionSearch = () => {
  //   axios
  //     .post(`${process.env.REACT_APP_BASEURL}/transaction_list`, {
  //       order_id: `${SearchTransection.order_id}`,
  //       method: `${SearchTransection.method}`,
  //       status: `${SearchTransection.status}`,
  //     })
  //     .then((response) => {
  //       setTransectionData(response.data);
  //       setSearchTransection("");
  //     });
  // };

  //Function to search the data on feild :-
  const TranSearch = (e) => {
    setSearchTransection({
      ...SearchTransection,
      [e.target.name]: e.target.value,
    });
  };

  //Onclick search function:-
  const onSearchClick = () => {
    setapicall(true);
  };

  //To reset the search feild :-
  const OnReset = () => {
    setSearchTransection({ order_id: "", method: "", status: "" });
    setapicall(true);
  };
  //To get the data in the table :-
  const columns = [
    {
      name: "Id",
      selector: (row) => <Link to="/transactions_detail">{row.id}</Link>,
      sortable: true,
    },
    {
      name: "Order Id",
      selector: (row) => row.order_id,
      sortable: true,
    },
    {
      name: "Invoice No.",
      selector: (row) => row.invoice_no,
      sortable: true,
    },

    {
      name: "Transactions Date",
      selector: (row) => row.transaction_date,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
      sortable: true,
    },

    {
      name: "Method",
      selector: (row) =>
        row.method === 1
          ? "UPI"
          : row.method === 2
            ? "Card"
            : row.method === 3
              ? "COD"
              : row.method === 4
                ? "Netbanking"
                : row.method === 5
                  ? "Wallet"
                  : "Other",
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => (
        <span
          className={
            row.status === 1
              ? "badge bg-primary"
              : row.status === 2
                ? "badge bg-success"
                : row.status === 3
                  ? "badge bg-danger"
                  : "badge bg-dark"
          }
        >
          {row.status === 1
            ? "Processing"
            : row.status === 2
              ? "Success"
              : row.status === 3
                ? "Failed"
                : "Refund"}
        </span>
      ),
      sortable: true,
    },
  ];

  return (
    <div className="App">
      <h2>Transactions</h2>
      <div className="card mt-3 px-3 ">
        <div className="product_page_searchbox bg-gray my-4">
          <div className="row">
            <div className="col-md-3 col-sm-6">
              <input
                type={"text"}
                className="adminsideinput"
                placeholder={"Search by order id"}
                onChange={(e) => TranSearch(e)}
                name={"order_id"}
                value={SearchTransection.order_id}
              />
            </div>
            <div className="col-md-3 col-sm-6">
              <Form.Select
                aria-label="Search by status"
                className="adminselectbox"
                name={"status"}
                onChange={(e) => TranSearch(e)}
                value={SearchTransection.status}
              >
                <option>Select Status</option>
                <option value="0">Status</option>
                <option value="1">Processing</option>
                <option value="2">Success</option>
                <option value="3">Failed</option>
                <option value="4">Refund</option>
              </Form.Select>
            </div>
            <div className="col-md-3 col-sm-6">
              <Form.Select
                aria-label="Search by method"
                className="adminselectbox"
                name={"method"}
                onChange={(e) => TranSearch(e)}
                value={SearchTransection.method}
              >
                <option>Select Pyament Mode</option>
                <option value="0">Pyament Method</option>
                <option value="1">Card</option>
                <option value="2">UPI</option>
                <option value="3">Cash on delivery</option>
                <option value="4">Wallet</option>
                <option value="5">Other</option>
              </Form.Select>
            </div>
            <div className="col-md-3 col-sm-6">
              <MainButton
                btnclass={"button main_button w-100"}
                btntext={"Search"}
                onClick={onSearchClick}
              />
            </div>
            <div className="col-md-3 col-sm-6 mt-2">
              <MainButton
                btnclass={"button main_button w-100"}
                btntext={"Reset"}
                onClick={OnReset}
              />
            </div>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={transectiondata}
          pagination
          highlightOnHover
          pointerOnHover
          className={"table_body transactions_table"}
        />
      </div>
    </div>
  );
}

export default Transactions;
