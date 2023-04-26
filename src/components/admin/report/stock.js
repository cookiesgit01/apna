import React, { useEffect, useState } from "react";
import Input from "../common/input";
import DataTable from "react-data-table-component";
import MainButton from "../common/button";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { downloadExcel } from "react-export-table-to-excel";

const StockReport = () => {
  //----------------------------------------------------------------- pdf----------------------------------------------------->
  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;

    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Stock Report";
    const headers = [["Product Name", "Status", "Stock"]];

    const data = (getTableStock || []).map((elt) => [
      elt.product_title_name,
      elt.product_status,
      elt.quantity,
    ]);

    let content = {
      startY: 50,
      head: headers,
      body: data,
    };

    // doc.text(headers, backgroundColor, "pink");
    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("Stock Report.pdf");
    // doc.setFillColor("Gray" ,100)
  };

  //-------------------------------------------- end pdf----------------------------------------------------------------->

  //----------------------------------------------------+++=++++++ excel--------------------------------------------------->
  const header = ["Product Name", "Status", "Stock"];

  function handleDownloadExcel() {
    downloadExcel({
      fileName: "Stock Report -> downloadExcel method",
      sheet: "Stock Report",
      tablePayload: {
        header,
        // accept two different data structures
        body: getTableStock,
      },
    });
  }
  //----------------------------------------------------+++=++++++ excel--------------------------------------------------->
  const columns = [
    {
      name: "Product Name",
      selector: (row) => row.product_title_name,
      sortable: true,
      width: "260px",
    },

    {
      name: "Status",
      selector: (row) => row.product_status,
      sortable: true,
    },
    {
      name: "Stock",
      selector: (row) => row.quantity,
      sortable: true,
    },
  ];
  const token = localStorage.getItem("token");
  const [filterchange, setFilterchange] = useState("");
  const [getTableStock, setGetTableStock] = useState([]);
  const [apicall, setapicall] = useState(false);
  const [StockStatus, setStockStatus] = useState("");

  const TimeChange = (e) => {
    setFilterchange(e.target.value);
    const value = e.target.value;
    if (value === "") {
      setStockStatus("");
    }
    if (value === "in stock") {
      setStockStatus("in stock");
    }
    if (value === "low stock") {
      setStockStatus("low stock");
    }
    if (value === "out of stock") {
      setStockStatus("out of stock");
    }
  };

  const fetchData = () => {
    axios
      .post(
        `${process.env.REACT_APP_BASEURL}/stock_report`,
        {
          values: StockStatus,
        },
        {
          headers: {
            admin_token: token,
          },
        }
      )
      .then((response) => {
        if (response.data.message === "No_Data") {
          setGetTableStock([]);
        } else {
          setGetTableStock(response.data);
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
    fetchData();
  };

  return (
    <div>
      <h2>Stock Report</h2>
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
              <option value="">Our Stock Status</option>
              <option value="">All Product</option>
              <option value="in stock">In Stock</option>
              <option value="low stock">Low Stock</option>
              <option value="out of stock">Out of Stock</option>
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
            <MainButton
              btntext={"Search"}
              btnclass={"button main_button"}
              onClick={submitHandler}
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

        {/* upload */}

        {/*  */}
        {/* box */}
        <div className="col-12 px-3">
          {/* card */}
          <div className=" row main_dashboard_row1 d-flex mb-3 ">
            {/* totltax */}
            {/* <div className="card p-2 col-3 rounded-left shadow-none">
              <div className=" d-flex mt-0 align-items-end">
                <MdOutlineMoney className="text-success h1 mb-0 mx-2" />
                <h5 className="text-success">Total Tax </h5>
              </div>
              <div className="row mt-3">
                <div className="col-12">
                  <div className="row  d-flex flex-column align-items-center">
                  <div className="d-flex align-items-baseline justify-content-between">
                    <h3>2,356</h3>
                    <div className="d-flex align-items-center justify-content-center">
                     <AiOutlineArrowRight className="h5 mb-0 mx-2"/>
                     <p className="mb-0 h5">0%</p>
                    </div>
                    </div>
                    <div>
                        <h5>Previous Year:</h5>
                        <p className="h5">$0.00</p>
                    </div>
                  </div>
                </div>

                
              </div>
            </div> */}
            {/* end */}
            {/* otax */}
            {/* <div className="card p-2 col-3 rounded-0 shadow-none">
              <div className=" d-flex mt-0 align-items-center">
                <BsBagDash className="text-success h1 mx-2" />
                <h5 className="text-success">Order Tax </h5>
              </div>
              <div className="row mt-3">
                <div className="col-12">
                  <div className="row  d-flex flex-column align-items-center">
                  <div className="d-flex align-items-baseline justify-content-between">
                    <h3>2,356</h3>
                    <div className="d-flex align-items-center justify-content-center">
                     <AiOutlineArrowRight className="h5 mb-0 mx-2"/>
                     <p className="mb-0 h5">0%</p>
                    </div>
                    </div>
                    <div>
                        <h5>Previous Year:</h5>
                        <p className="h5">$0.00</p>
                    </div>
                  </div>
                </div>

                
              </div>
            </div> */}
            {/* otax end */}
            {/* stax */}
            {/* <div className="card p-2 col-3 rounded-0 shadow-none">
              <div className=" d-flex mt-0 align-items-end">
                <RiShip2Line className="text-success h1 mb-0 mx-2" />
                <h5 className="text-success">Shipping Tax </h5>
              </div>
              <div className="row mt-3">
                <div className="col-12">
                  <div className="row  d-flex flex-column align-items-center">
                  <div className="d-flex align-items-baseline justify-content-between">
                    <h3>2,356</h3>
                    <div className="d-flex align-items-center justify-content-center">
                     <AiOutlineArrowRight className="h5 mb-0 mx-2"/>
                     <p className="mb-0 h5">0%</p>
                    </div>
                    </div>
                    <div>
                        <h5>Previous Year:</h5>
                        <p className="h5">$0.00</p>
                    </div>
                  </div>
                </div>

                
              </div>
            </div> */}
            {/*  */}
            {/* Order */}
            {/* <div className="card p-2 col-3 rounded-right shadow-none">
              <div className=" d-flex mt-0 align-items-end">
                <BsBagPlus className="text-success h1 mb-0 mx-2" />
                <h5 className="text-success">Orders </h5>
              </div>
              <div className="row mt-3">
                <div className="col-12">
                  <div className="row  d-flex flex-column align-items-center">
                  <div className="d-flex align-items-baseline justify-content-between">
                    <h3>2,356</h3>
                    <div className="d-flex align-items-center justify-content-center">
                     <AiOutlineArrowRight className="h5 mb-0 mx-2"/>
                     <p className="mb-0 h5">0%</p>
                    </div>
                    </div>
                    <div>
                        <h5>Previous Year:</h5>
                        <p className="h5">$0.00</p>
                    </div>
                  </div>
                </div>

                
              </div>
            </div> */}
            {/*  */}
            {/*  */}
          </div>
        </div>
        {/*  */}

        {/* graph */}
        {/* <HighchartsReact highcharts={Highcharts} options={options}  /> */}

        {/*  */}

        {/* datatable */}

        <DataTable
          columns={columns}
          data={getTableStock}
          pagination
          highlightOnHover
          pointerOnHover
          className={"table_body stock_table"}
        />
      </div>
    </div>
  );
};

export default StockReport;
