import React, { useEffect, useState } from "react";
import Input from "../common/input";
import DataTable from "react-data-table-component";
import MainButton from "../common/button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { downloadExcel } from "react-export-table-to-excel";
import moment from "moment";

const CustomerReport = () => {
  //----------------------------------------------------------------- pdf----------------------------------------------------->
  const exportPDF = () => {
    const unit = "pt";
    const size = "A3"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;

    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);
    doc.setLineWidth(10);

    const title = "Customer Report";
    const headers = [
      [
        "First Name",
        "Last Name",
        "UserID",
        "Email",
        "Address",
        "Order",
        "Total Ammount",
        "Average Ammount",
      ],
    ];

    const data = (tableCoustomer || []).map((elt) => [
      elt.first_name,
      elt.last_name,
      elt.user_id,
      elt.email,
      elt.address,
      elt.order_count,
      elt.total_amount,
      elt.avg_value,
    ]);

    let content = {
      startY: 50,
      head: headers,
      body: data,
    };

    doc.text(title, marginLeft, 40);

    doc.autoTable(content);
    doc.save("Customer Report.pdf");
  };

  //-------------------------------------------- end pdf----------------------------------------------------------------->

  //----------------------------------------------------+++=++++++ excel--------------------------------------------------->
  const header = [
    "First Name",
    "Last Name",
    " User ID",
    "Email",
    "Address",
    "Order",
    "Total Ammount",
    " Average Ammount",
    "Created On",
  ];

  function handleDownloadExcel() {
    downloadExcel({
      fileName: "Customer Report -> downloadExcel method",
      sheet: "Customer Report",
      tablePayload: {
        header,
        // accept two different data structures
        body: tableCoustomer,
      },
    });
  }
  //----------------------------------------------------+++=++++++ excel--------------------------------------------------->

  const columns = [
    {
      name: "ID",
      selector: (row) => row.user_id,
      sortable: true,
      width: "70px",
    },
    {
      name: "First Name",
      selector: (row) => row.first_name,
      sortable: true,
      width: "170px",
    },
    {
      name: "Last Name",
      selector: (row) => row.last_name,
      sortable: true,
      width: "150px",
    },

    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      width: "170px",
    },
    {
      name: "Order",
      selector: (row) => row.order_count,
      sortable: true,
      width: "100px",
    },
    {
      name: "Created On",
      selector: (row) => moment(row.created_on).format("YYYY-MM-DD"),
      sortable: true,
      width: "150px",
    },
    {
      name: "Total Ammount",
      selector: (row) => row.total_amount,
      sortable: true,
      width: "130px",
    },

    {
      name: " Average Ammount",
      selector: (row) => row.avg_value,
      sortable: true,
      width: "130px",
    },
    {
      name: "Address",
      selector: (row) => row.address,
      sortable: true,
      width: "400px",
    },
  ];

  const token = localStorage.getItem("token");
  const [filterchange, setFilterchange] = useState("");

  const [tableCoustomer, setGetTableCoustomer] = useState([]);
  const [user, setUser] = useState([]);
  const [apicall, setapicall] = useState(false);
  const [CustomerError, setCustomerError] = useState("");
  console.log("---" + CustomerError)
  const TimeChange = (e) => {
    setFilterchange(e.target.value);
    setUser(e.target.value);
  };

  const fetchData = () => {
    axios
      .post(
        `${process.env.REACT_APP_BASEURL}/customers_report`,
        {
          user_search: user,
        },
        {
          headers: {
            admin_token: token,
          },
        }
      )
      .then((response) => {
        if (response.data.message === "No_Data") {
          setCustomerError(response.data.message);
          setGetTableCoustomer([]);
          setapicall(false);
        } else {
          setCustomerError("");
          setGetTableCoustomer(response.data);
          setapicall(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, [apicall]);

  const submitHandler = () => {
    setapicall(true);
  };

  const OnReset = () => {
    setUser("");
    setapicall(true);
  };

  return (
    <div>
      <h2>Customer Report</h2>
      {/* search bar */}
      <div className="card mt-3 p-3 ">
        <div className="row pb-3">
          <div className="col-md-3 col-sm-6 aos_input">
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Search by name"
                onChange={TimeChange}
                value={user}
              />
            </Form.Group>
          </div>
          {filterchange === "7" ? (
            <>
              <div className="col-md-3 col-sm-6 aos_input">
                <Input type={"date"} plchldr={"Search by date"} />
              </div>

              <div className="col-md-3 col-sm-6 aos_input">
                <Input type={"date"} plchldr={"Search by date"} />
              </div>
            </>
          ) : filterchange === "6" ? (
            <div className="col-md-3 col-sm-6 aos_input">
              <Input type={"month"} plchldr={"Search by month"} />
            </div>
          ) : null}

          <div className="col-md-auto col-sm-6 aos_input">
            <MainButton
              btntext={"Search"}
              btnclass={"button main_button"}
              onClick={submitHandler}
            />
          </div>

          <div className="col-md-auto col-sm-6 aos_input">
            <MainButton
              btntext={"Reset"}
              btnclass={"button main_button"}
              type="reset"
              onClick={OnReset}
            />
          </div>

          <div className="col-md-auto col-sm-6 aos_input">
            <DropdownButton
              id="dropdown-variant-success"
              title="Download"
              variant="button main_button"
            >
              <Dropdown.Item onClick={handleDownloadExcel}>Excel</Dropdown.Item>
              <Dropdown.Item onClick={() => exportPDF()}>Pdf</Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
        {/* datatable */}

        <DataTable
          columns={columns}
          data={tableCoustomer}
          pagination
          highlightOnHover
          pointerOnHover
          className={"table_body customerreport_table"}
        />
      </div>
    </div>
  );
};

export default CustomerReport;
