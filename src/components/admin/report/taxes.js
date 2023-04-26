import React, { useState } from "react";
import Input from "../common/input";
import DataTable from "react-data-table-component";
import MainButton from "../common/button";
import Form from "react-bootstrap/Form";
import { BsBagPlus } from "react-icons/bs";
// import { RiShip2Line } from "react-icons/ri";
import { AiOutlineArrowRight } from "react-icons/ai";
import { GiPayMoney } from "react-icons/gi";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useEffect } from "react";
import axios from "axios";
import moment from "moment/moment";
import Select from "react-select";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { downloadExcel } from "react-export-table-to-excel";

const TaxesReport = () => {
  const token = localStorage.getItem("token");

  const [filterchange, setFilterchange] = useState("");
  const [Taxesreport, setTaxesreport] = useState([]);
  const [TaxesTable, setTaxesTable] = useState([]);
  const [apicall, setapicall] = useState(false);
  const [TaxesError, setTaxesError] = useState("");
  const [fromDate, setFromDate] = useState(moment().format("YYYY-MM-DD"));
  const [toDate, setToDate] = useState(moment().format("YYYY-MM-DD"));
  const [previousStateChange, setpreviousStateChange] = useState(" ");
  const [PrevTaxesreport, setPrevTaxesreport] = useState([]);
  const [prevFromdate, setprevFromdate] = useState(
    moment()
      .subtract(1, "days")
      .startOf("days")
      .format("YYYY-MM-DD")
  );
  const [prevTodate, setprevTodate] = useState(
    moment()
      .subtract(1, "days")
      .startOf("days")
      .format("YYYY-MM-DD")
  );
  const [venderList, setVenderList] = useState([]);
  const [vendorId, setVendorId] = useState("");
  const [category, setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [brand, setBrand] = useState([]);
  const [brandName, setBrandName] = useState([]);
  const [location, setLocation] = useState([]);

  const fetchData = () => {

    axios
      .post(
        `${process.env.REACT_APP_BASEURL}/taxes_report`,
        {
          from_date: fromDate,
          to_date: toDate,
          prev_from_date: prevFromdate,
          prev_to_date: prevTodate,
          vendors_id: vendorId,
          categorys: categoryId,
          user_locations: location,
          brand: brandName,
        },
        {
          headers: {
            admin_token: token,
          },
        }
      )
      .then((response) => {
        if (response.data.message === "No_Data") {
          setTaxesError(response.data.message);
          setTaxesreport([0]);
          setTaxesTable([0]);
        } else {
          setTaxesError("");

          setTaxesreport(response.data[0][0]);
          setTaxesTable(response.data[2]);
          setPrevTaxesreport(response.data[1][0]);
          setapicall(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const VenderData = async () => {
    let result = await axios.post(
      `${process.env.REACT_APP_BASEURL}/vendors`,
      {
        vendor_id: "all",
      },
      {
        headers: {
          admin_token: token,
        },
      }
    );
    if (result.data) {
      setVenderList(result.data);
    }
  };

  const CategoryData = async () => {
    let result = await axios.get(
      `${process.env.REACT_APP_BASEURL}/category?category=all`
    );
    if (result.data) {
      setCategory(result.data);
    }
  };

  const BrandData = async () => {
    let result = await axios.get(`${process.env.REACT_APP_BASEURL}/brand_list`);

    if (result.data) {
      setBrand(result.data);
    }
  };

  useEffect(() => {
    fetchData();
    VenderData();
    CategoryData();
    BrandData();
  }, [apicall]);

  const TimeChange = (e) => {
    setFilterchange(e.target.value);
    let value = Number(e.target.value);
    if (value === 1) {
      let frommDate = moment().format("YYYY-MM-DD");
      setFromDate(frommDate);
      setToDate(moment().format("YYYY-MM-DD"));
      let previousTodate = moment(frommDate)
        .subtract(1, "days")
        .startOf("days")
        .format("YYYY-MM-DD");
      setprevTodate(previousTodate);
      setprevFromdate(previousTodate);

      setpreviousStateChange(1);
    }
    //yesterday------------------------------------------------------------------------
    if (value === 2) {
      let yesterday = moment()
        .subtract(1, "days")
        .startOf("days")
        .format("YYYY-MM-DD");

      setFromDate(yesterday);
      setToDate(moment().format("YYYY-MM-DD"));

      let previousTodatee = moment(yesterday)
        .subtract(1, "days")
        .startOf("days")
        .format("YYYY-MM-DD");
      setprevTodate(previousTodatee);
      setprevFromdate(
        moment(previousTodatee)
          .subtract(1, "days")
          .startOf("days")
          .format("YYYY-MM-DD")
      );
      setpreviousStateChange(2);
    }
    //last week---------------------------------------------------------------
    if (value === 3) {
      let lastweek = moment()
        .subtract(1, "weeks")
        .startOf("weeks")
        .format("YYYY-MM-DD");
      setFromDate(lastweek);

      setToDate(
        moment()
          .subtract(1, "weeks")
          .endOf("weeks")
          .format("YYYY-MM-DD")
      );
      let previouslastweek = moment(lastweek)
        .subtract(1, "days")
        .endOf("days")
        .format("YYYY-MM-DD");
      setprevTodate(previouslastweek);
      setprevFromdate(
        moment(previouslastweek)
          .subtract(1, "weeks")
          .endOf("weeks")
          .format("YYYY-MM-DD")
      );
      setpreviousStateChange(3);
    }
    //last month---------------------------------------------------------------
    if (value === 4) {
      let month = moment()
        .subtract(1, "month")
        .startOf("month")
        .format("YYYY-MM-DD");
      setFromDate(month);
      let lastMonth = moment()
        .subtract(1, "month")
        .endOf("month")
        .format("YYYY-MM-DD");
      setToDate(lastMonth);
      let previouslastmont = moment(lastMonth)
        .subtract(1, "days")
        .startOf("days")
        .format("YYYY-MM-DD");
      setprevTodate(previouslastmont);
      setprevFromdate(
        moment(previouslastmont)
          .subtract(1, "month")
          .startOf("month")
          .format("YYYY-MM-DD")
      );
      setpreviousStateChange(4);
    }
    //  last six month---------------------------------------------------------
    if (value === 5) {
      let sixMonth = moment()
        .subtract(6, "month")
        .startOf("month")
        .format("YYYY-MM-DD");
      setFromDate(sixMonth);
      setToDate(moment().format("YYYY-MM-DD"));
      let lastsixMonth = moment(sixMonth)
        .subtract(1, "month")
        .startOf("month")
        .format("YYYY-MM-DD");
      setprevTodate(lastsixMonth);
      setprevFromdate(
        moment(lastsixMonth)
          .subtract(5, "month")
          .startOf("month")
          .format("YYYY-MM-DD")
      );
      setpreviousStateChange(5);
    }

    //this week-----------------------------------------------------------------------
    if (value === 8) {
      let ThisWeek = moment()
        .startOf("weeks")
        .format("YYYY-MM-DD");
      setFromDate(ThisWeek);
      setToDate(moment().format("YYYY-MM-DD"));
      let previousthisweek = moment(ThisWeek)
        .subtract(1, "days")
        .endOf("days")
        .format("YYYY-MM-DD");
      setprevTodate(previousthisweek);
      setprevFromdate(
        moment(previousthisweek)
          .subtract(1, "weeks")
          .endOf("weeks")
          .format("YYYY-MM-DD")
      );
      setpreviousStateChange(8);
    }
    if (value === 9) {
      let ThisMonth = moment()
        .startOf("month")
        .format("YYYY-MM-DD");
      setFromDate(ThisMonth);
      setToDate(moment().format("YYYY-MM-DD"));
      let previousthismont = moment(ThisMonth)
        .subtract(1, "days")
        .startOf("days")
        .format("YYYY-MM-DD");
      setprevTodate(previousthismont);
      setprevFromdate(
        moment()
          .subtract(1, "month")
          .startOf("month")
          .format("YYYY-MM-DD")
      );
      setpreviousStateChange(9);
    }

    fetchData();
  };

  const submitHandler = () => {
    setapicall(true);
    fetchData();
  };

  const options1 = [
    (brand || []).map((item) => ({ value: `${item.brand}`, label: `${item.brand}` })),
  ];

  let arrr = [];

  const brandHandler = (e) => {
    arrr = [];
    e.map((item) => {
      return (
        arrr.push(item.value)

      )
    });
    setBrandName(arrr);
  };

  const options2 = [
    (venderList || []).map((item) => ({
      value: `${item.id}`,
      label: `${item.shop_name}`,
    })),
  ];

  let vendorArray = [];

  const VendorHandler = (e) => {
    vendorArray = [];
    e.map((item) => {
      return (
        vendorArray.push(item.value)

      )
    });
    setVendorId(vendorArray);
  };

  const options3 = [
    (category || []).map((item) => ({
      value: `${item.id}`,
      label: `${item.category_name}`,
    })),
  ];

  let CategoryArray = [];

  const categoryHandler = (e) => {
    CategoryArray = [];
    e.map((item) => {
      return (
        CategoryArray.push(item.value)

      )
    });
    setCategoryId(CategoryArray);
  };

  const options4 = [
    { value: "indore", label: "Indore" },
    { value: "bhopal", label: "Bhopal" },
    { value: "dhar", label: "Dhar" },
    { value: "khandwa", label: "Khandwa" },
    { value: "khargone", label: "Khargone" },
  ];
  var SearchArray = [];
  const SearchHandler = (e) => {
    SearchArray = [];
    e.map((item) => {
      return (
        SearchArray.push(item.value)

      )
    });
    setLocation(SearchArray);
  };

  var OrderTax = Taxesreport.order_tax;
  var OrderCount = Taxesreport.order_count;

  const options = {
    chart: {
      type: "bar",
      borderRadius: "5",
      borderColor: "#335cad",
    },
    title: {
      text: " Figures",
      style: { color: "green", fontSize: "22px" },
      align: "left",
    },
    series: [
      {
        name: "Order",
        data: [OrderCount],
      },
      {
        name: "Order Tax",
        data: [OrderTax],
      },
    ],
    xAxis: {
      categories: [
        "1",
        "3",
        "5",
        "7",
        "9",
        "11",
        "13",
        "15",
        "17",
        "19",
        "21",
        "23",
      ],
    },
    yAxis: {
      categories: ["0", "200", "400", "600", "800", "1000"],
    },
  };

  //----------------------------------------------------------------- pdf----------------------------------------------------->
  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;

    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Taxes Report";
    const headers = [[" GST", "Order Taxes", "Orders"]];

    const data = TaxesTable.map((elt) => [
      elt.gst,
      elt.order_taxes,
      elt.order_count,
    ]);

    let content = {
      startY: 50,
      head: headers,
      body: data,
    };

    // doc.text(headers, backgroundColor, "pink");
    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("Taxes Report.pdf");
    // doc.setFillColor("Gray" ,100)
  };

  //-------------------------------------------- end pdf----------------------------------------------------------------->

  //----------------------------------------------------+++=++++++ excel--------------------------------------------------->
  const header = [" GST", "Order Taxes", "Orders"];

  function handleDownloadExcel() {
    downloadExcel({
      fileName: "Taxes Report -> downloadExcel method",
      sheet: "Taxes Report",
      tablePayload: {
        header,
        // accept two different data structures
        body: TaxesTable,
      },
    });
  }
  //----------------------------------------------------+++=++++++ excel--------------------------------------------------->

  const columns = [

    {
      name: "Order Date ",
      selector: (row) => moment(row.order_date).format("YYYY-MM-DD"),
      sortable: true,
    },
    {
      name: "Total SGST ",
      selector: (row) => Number(row.total_sgst).toFixed(2),
      sortable: true,
    },
    {
      name: "Total CGST ",
      selector: (row) => Number(row.total_cgst).toFixed(2),
      sortable: true,
    },
    {
      name: "Total  Taxes",
      selector: (row) => Number(row.total_gst).toFixed(2),
      sortable: true,
    },
    {
      name: "Order",
      selector: (row) => row.id,
      sortable: true,
    },
  ];

  // // //-------------Order tax---------------------------
  var getOrderTax = Number(Taxesreport.order_tax);

  var getPreviousOrderTax = Number(PrevTaxesreport.prev_order_tax);

  var resultOrderTax = (
    ((getOrderTax - getPreviousOrderTax) / getPreviousOrderTax) *
    100
  ).toFixed(2);

  resultOrderTax !== "Infinity" ? console.log() : (resultOrderTax = 0);

  // // //-------------Order count---------------------------
  var getOrderCount = Number(Taxesreport.order_count);

  var getPreviousOrderCount = Number(PrevTaxesreport.prev_order_count);

  var resultOrderCount = (
    ((getOrderCount - getPreviousOrderCount) / getPreviousOrderCount) *
    100
  ).toFixed(2);

  resultOrderCount !== "Infinity" ? console.log() : (resultOrderCount = 0);
  return (
    <div>
      <h2>Taxes Report</h2>
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
              <option name="today" value={1}>
                Today
              </option>
              <option name="yesterday" value={2}>
                yesterday
              </option>
              <option name="this_week" value={8}>
                this week
              </option>
              <option name="last_week" value={3}>
                Last week
              </option>
              <option name="this_week" value={9}>
                This month
              </option>
              <option name="last_month" value={4}>
                last month
              </option>
              <option name="last_6_month" value={5}>
                last 6 month
              </option>
              {/* <option name="custom_month" value="6">custom month</option> */}
              <option name="custom_date" value="7">
                custom date
              </option>
            </Form.Select>
          </div>

          <div className="col-md-3 col-sm-6 aos_input">
            <Select
              className=" basic-multi-select"
              placeholder="Search by Vendor"
              onChange={VendorHandler}
              classNamePrefix="select"
              isMulti
              options={options2[0]}
            />
          </div>

          <div className="col-md-3 col-sm-6 aos_input">
            <Select
              className=" basic-multi-select"
              placeholder="Search by Brand"
              onChange={brandHandler}
              classNamePrefix="select"
              isMulti
              options={options1[0]}
            />
          </div>

          <div className="col-md-3 col-sm-6 aos_input">
            <Select
              className=" basic-multi-select"
              placeholder="Search by Category"
              onChange={categoryHandler}
              classNamePrefix="select"
              isMulti
              options={options3[0]}
            />
          </div>

          <div className="col-md-3 col-sm-6 mt-3 aos_input">
            <Select
              className=" basic-multi-select"
              placeholder="Search by Location"
              onChange={SearchHandler}
              classNamePrefix="select"
              isMulti
              options={options4}
            />
          </div>

          {filterchange === "7" ? (
            <div className="col-md-3 d-flex mt-3 col-sm-6 aos_input">
              <div className="col-6 pe-2 aos_input">
                <input
                  type={"date"}
                  placeholder={"Search by date"}
                  onChange={(e) => {
                    setFromDate(e.target.value);
                  }}
                  className={"adminsideinput"}
                  max={moment().format("YYYY-MM-DD")}
                />
              </div>

              <div className="col-6">
                <input
                  type={"date"}
                  placeholder={"Search by date"}
                  onChange={(e) => {
                    setToDate(e.target.value);
                  }}
                  className={"adminsideinput"}
                  max={moment().format("YYYY-MM-DD")}
                />
              </div>
            </div>
          ) : filterchange === "6" ? (
            <div className="col-md-3 col-sm-6 aos_input">
              <Input type={"month"} plchldr={"Search by month"} />
            </div>
          ) : null}

          <div className="col-md-auto col-sm-6 aos_input mt-3">
            <MainButton
              btntext={"Search"}
              btnclass={"button main_button"}
              onClick={submitHandler}
            />
          </div>

          <div className="col-md-auto col-sm-6 aos_input mt-3">
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
            <div className="card p-2 col-3 rounded-left shadow-none">
              <div className=" d-flex mt-0 align-items-end">
                <GiPayMoney className="text-success h1 mb-0 mx-2" />
                <h5 className="text-success">Order Tax </h5>
              </div>
              <div className="row mt-3">
                <div className="col-12">
                  <div className="row  d-flex flex-column align-items-center">
                    <div className="d-flex align-items-baseline justify-content-between">
                      {TaxesError === "No_Data" ||
                        Taxesreport.order_tax === null ||
                        Taxesreport.order_tax === undefined ||
                        Taxesreport.order_tax === "" ? (
                        <h3>₹0</h3>
                      ) : (
                        <h3>₹{Taxesreport.order_tax.toFixed(2)}</h3>
                      )}
                      <div className="d-flex align-items-center justify-content-center">
                        <AiOutlineArrowRight className="h5 mb-0 mx-2" />

                        {resultOrderTax > 0 ? (
                          <p className="mb-0 h5" style={{ color: "green" }}>
                            {" "}
                            {resultOrderTax}%
                          </p>
                        ) : resultOrderTax < 0 ? (
                          <p className="mb-0 h5" style={{ color: "red" }}>
                            {" "}
                            {resultOrderTax}%
                          </p>
                        ) : resultOrderTax === 0 ? (
                          <p className="mb-0 h5" style={{ color: "blue" }}>
                            {" "}
                            {resultOrderTax}%
                          </p>
                        ) : resultOrderTax === "NaN" ? (
                          <p className="mb-0 h5" style={{ color: "grey" }}>
                            {" "}
                            0%
                          </p>
                        ) : (
                          <p className="mb-0 h5" style={{ color: "brown" }}>
                            {" "}
                            {resultOrderTax}%
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      {previousStateChange === 1 ? (
                        <h5>Today :</h5>
                      ) : previousStateChange === 2 ? (
                        <h5>Previous Yesterday :</h5>
                      ) : previousStateChange === 3 ? (
                        <h5>Previous Last week :</h5>
                      ) : previousStateChange === 4 ? (
                        <h5>Previous Last Month :</h5>
                      ) : previousStateChange === 5 ? (
                        <h5>Previous Last 6 Months:</h5>
                      ) : previousStateChange === 8 ? (
                        <h5>Previous week :</h5>
                      ) : previousStateChange === 9 ? (
                        <h5>Previous Month :</h5>
                      ) : (
                        <h5>Today :</h5>
                      )}

                      {TaxesError === "no_data" ||
                        PrevTaxesreport.prev_order_tax === null ||
                        PrevTaxesreport.prev_order_tax === undefined ||
                        PrevTaxesreport.prev_order_tax === "" ? (
                        <p className="h5">₹0</p>
                      ) : (
                        <p className="h5">
                          ₹{PrevTaxesreport.prev_order_tax.toFixed(2)}{" "}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* end */}
            {/* otax */}

            {/* otax end */}
            {/* stax */}

            {/*  */}
            {/* Order */}
            <div className="card p-2 col-3 rounded-right shadow-none">
              <div className=" d-flex mt-0 align-items-end">
                <BsBagPlus className="text-success h1 mb-0 mx-2" />
                <h5 className="text-success">Orders </h5>
              </div>
              <div className="row mt-3">
                <div className="col-12">
                  <div className="row  d-flex flex-column align-items-center">
                    <div className="d-flex align-items-baseline justify-content-between">
                      {TaxesError === "No_Data" ||
                        Taxesreport.order_count === null ||
                        Taxesreport.order_count === undefined ||
                        Taxesreport.order_count === "" ? (
                        <h3>0</h3>
                      ) : (
                        <h3>{Taxesreport.order_count}</h3>
                      )}

                      <div className="d-flex align-items-center justify-content-center">
                        <AiOutlineArrowRight className="h5 mb-0 mx-2" />

                        {resultOrderCount > 0 ? (
                          <p className="mb-0 h5" style={{ color: "green" }}>
                            {" "}
                            {resultOrderCount}%
                          </p>
                        ) : resultOrderCount < 0 ? (
                          <p className="mb-0 h5" style={{ color: "red" }}>
                            {" "}
                            {resultOrderCount}%
                          </p>
                        ) : resultOrderCount === 0 ? (
                          <p className="mb-0 h5" style={{ color: "blue" }}>
                            {" "}
                            {resultOrderCount}%
                          </p>
                        ) : resultOrderCount === "NaN" ? (
                          <p className="mb-0 h5" style={{ color: "grey" }}>
                            {" "}
                            0%
                          </p>
                        ) : (
                          <p className="mb-0 h5" style={{ color: "brown" }}>
                            {" "}
                            {resultOrderCount}%
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      {previousStateChange === 1 ? (
                        <h5>Today :</h5>
                      ) : previousStateChange === 2 ? (
                        <h5>Previous Yesterday :</h5>
                      ) : previousStateChange === 3 ? (
                        <h5>Previous Last week :</h5>
                      ) : previousStateChange === 4 ? (
                        <h5>Previous Last Month :</h5>
                      ) : previousStateChange === 5 ? (
                        <h5>Previous Last 6 Months:</h5>
                      ) : previousStateChange === 8 ? (
                        <h5>Previous week :</h5>
                      ) : previousStateChange === 9 ? (
                        <h5>Previous Month :</h5>
                      ) : (
                        <h5>Today :</h5>
                      )}

                      {TaxesError === "no_data" ||
                        PrevTaxesreport.prev_order_count === null ||
                        PrevTaxesreport.prev_order_count === undefined ||
                        PrevTaxesreport.prev_order_count === "" ? (
                        <p className="h5"> 0</p>
                      ) : (
                        <p className="h5">
                          {PrevTaxesreport.prev_order_count}{" "}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*  */}
            {/*  */}
          </div>
        </div>
        {/*  */}

        {/* graph */}
        {Taxesreport.order_tax ? (
          <HighchartsReact highcharts={Highcharts} options={options} />
        ) : null}

        {/*  */}

        {/* datatable */}

        <DataTable
          columns={columns}
          data={TaxesTable}
          pagination
          highlightOnHover
          pointerOnHover
          className={"table_body taxes_table"}
        />
      </div>
    </div>
  );
};

export default TaxesReport;
