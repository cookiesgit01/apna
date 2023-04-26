import React, { useState } from "react";
import Input from "../common/input";
import DataTable from "react-data-table-component";
import MainButton from "../common/button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";

const StoreReport = () => {
  const columns = [
    {
      name: "Store Name",
      selector: (row) => row.sname,
      sortable: true,
      width: "270px",
    },
    {
      name: "Total Product",
      selector: (row) => row.tpro,
      sortable: true,
      width: "200px",
    },

    {
      name: "Stock",
      selector: (row) => row.stock,
      sortable: true,
      width: "150px",
    },
    {
      name: "Revenue",
      selector: (row) => row.revenue,
      sortable: true,
      width: "150px",
    },
    {
      name: "N Revenue",
      selector: (row) => row.net,
      sortable: true,
      width: "210px",
    },
    {
      name: "Total Orders",
      selector: (row) => row.torder,
      sortable: true,
      width: "130px",
    },
  ];

  const data = [
    {
      id: 1,
      sname: "Nicolas Edison",
      revenue: "$250",
      stock: "241",
      tpro: "2025",
      torder: "25",
      net: "$250.2",
    },
    {
      id: 1,
      sname: "Nicolas Edison",
      revenue: "$250",
      stock: "241",
      tpro: "2025",
      torder: "25",
      net: "$250.2",
    },
    {
      id: 1,
      sname: "Nicolas Edison",
      revenue: "$250",
      stock: "241",
      tpro: "2025",
      torder: "25",
      net: "$250.2",
    },
    {
      id: 1,
      sname: "Nicolas Edison",
      revenue: "$250",
      stock: "241",
      tpro: "2025",
      torder: "25",
      net: "$250.2",
    },
    {
      id: 1,
      sname: "Nicolas Edison",
      revenue: "$250",
      stock: "241",
      tpro: "2025",
      torder: "25",
      net: "$250.2",
    },
    {
      id: 1,
      sname: "Nicolas Edison",
      revenue: "$250",
      stock: "241",
      tpro: "2025",
      torder: "25",
      net: "$250.2",
    },
    {
      id: 1,
      sname: "Nicolas Edison",
      revenue: "$250",
      stock: "241",
      tpro: "2025",
      torder: "25",
      net: "$250.2",
    },
    {
      id: 1,
      sname: "Nicolas Edison",
      revenue: "$250",
      stock: "241",
      tpro: "2025",
      torder: "25",
      net: "$250.2",
    },
    {
      id: 1,
      sname: "Nicolas Edison",
      revenue: "$250",
      stock: "241",
      tpro: "2025",
      torder: "25",
      net: "$250.2",
    },
    {
      id: 1,
      sname: "Nicolas Edison",
      revenue: "$250",
      stock: "241",
      tpro: "2025",
      torder: "25",
      net: "$250.2",
    },
    {
      id: 1,
      sname: "Nicolas Edison",
      revenue: "$250",
      stock: "241",
      tpro: "2025",
      torder: "25",
      net: "$250.2",
    },
  ];
  const [filterchange, setFilterchange] = useState("");
  const TimeChange = (e) => {
    setFilterchange(e.target.value);
  };
  return (
    <div>
      <h2>Customer Report</h2>
      {/* search bar */}
      <div className="card mt-3 p-3 ">
        <div className="row pb-3">
          <div className="col-md-3 col-sm-6 aos_input">
            <Form.Select
              aria-label="Search by category"
              className="adminselectbox"
              placeholder="Search by category"
              onChange={TimeChange}
            >
              <option>Search by Dates</option>
              <option value="1">1 day</option>
              <option value="2">1 week</option>
              <option value="3">current month</option>
              <option value="4">last month</option>
              <option value="5">last 6 month</option>
              <option value="6">custom month</option>
              <option value="7">custom date</option>
            </Form.Select>
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
            <MainButton btntext={"Search"} btnclass={"button main_button"} />
          </div>
          <div className="col-md-auto col-sm-6 aos_input">
            <DropdownButton
              id="dropdown-variant-success"
              title="Download"
              variant="button main_button"
            >
              <Dropdown.Item href="#/action-1">Excel</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Pdf</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
        {/* datatable */}

        <DataTable
          columns={columns}
          data={data}
          pagination
          highlightOnHover
          pointerOnHover
          className={"table_body store_table"}
        />
      </div>
    </div>
  );
};

export default StoreReport;
