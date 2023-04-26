import React, { useState } from "react";
import Input from "../common/input";
import DataTable from "react-data-table-component";
import MainButton from "../common/button";
import Form from "react-bootstrap/Form";
import { BsBagPlus } from "react-icons/bs";
import { AiOutlineArrowRight } from "react-icons/ai";
import { GiTakeMyMoney, GiSellCard } from "react-icons/gi";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import moment from "moment/moment";
import Select from "react-select";
import axios from "axios";
import { useEffect } from "react";

import jsPDF from "jspdf";
import "jspdf-autotable";
import { downloadExcel } from "react-export-table-to-excel";

const CategoryReport = () => {
  const token = localStorage.getItem("token");

  const [filterchange, setFilterchange] = useState("");
  const [Categoryreport, setCategoryreport] = useState([]);
  const [tableCategory, setGetTableCategory] = useState([]);
  const [apicall, setapicall] = useState(false);
  const [CategoryError, setCategoryError] = useState("");

  const [PrevCategoryreport, setPrevCategoryreport] = useState([]);

  const [previousStateChange, setpreviousStateChange] = useState(" ");
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
  const [fromDate, setFromDate] = useState(moment().format("YYYY-MM-DD"));
  const [toDate, setToDate] = useState(moment().format("YYYY-MM-DD"));
  const [venderList, setVenderList] = useState([]);
  const [brand, setBrand] = useState([]);
  const [category, setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [vendorId, setVendorId] = useState("");
  const [brandName, setBrandName] = useState([]);
  const [location, setLocation] = useState([]);

  const fetchData = () => {
    axios
      .post(
        `${process.env.REACT_APP_BASEURL}/categories_report`,
        {
          from_date: fromDate,
          to_date: toDate,
          prev_from_date: prevFromdate,
          prev_to_date: prevTodate,
          parent_category: categoryId,
          vendors_id: vendorId,

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
        if (response.data.message === "no_data") {
          setCategoryError(response.data.message);
          setCategoryreport([0]);
          setGetTableCategory([0]);
          setPrevCategoryreport([0]);
        } else {
          setCategoryError("");

          setCategoryreport(response.data[0][0]);
          setPrevCategoryreport(response.data[1][0]);
          setGetTableCategory(response.data[2]);
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

  const BrandData = async () => {
    let result = await axios.get(`${process.env.REACT_APP_BASEURL}/brand_list`);
    if (result.data) {
      setBrand(result.data);
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

  useEffect(() => {
    fetchData();
    VenderData();
    BrandData();
    CategoryData();
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
  var itemSold = Categoryreport.total_sold_product_count;
  var NetSales = Categoryreport.total_sold_product_amount;
  var order = Categoryreport.order_count;

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
        name: "Item Sold",
        data: [itemSold],
      },
      {
        name: "Net Sales",
        data: [NetSales],
      },
      {
        name: "Orders",
        data: [order],
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
  const columns = [
    {
      name: "Category",
      selector: (row) => (row.cat_name == null ? "No Record" : row.cat_name),
      sortable: true,
      width: "260px",
    },
    {
      name: "Item Sold",
      selector: (row) =>
        row.product_count == null ? "No Record" : row.product_count,
      sortable: true,
      center: true,
    },
    {
      name: "Net Revenue",
      selector: (row) =>
        row.total_sales == null
          ? "No Record"
          : Number(row.total_sales).toFixed(2),
      sortable: true,
    },

    {
      name: "Orders",
      selector: (row) =>
        row.order_count == null ? "No Record" : row.order_count,
      sortable: true,
    },
  ];
  //----------------------------------------------------------------- pdf----------------------------------------------------->
  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;

    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Category Report";
    const headers = [["Category", "Item sold", "Net Revenue", "Orders"]];

    const data = tableCategory.map((elt) => [
      elt.cat_name,
      elt.product_count,
      elt.total_sales,
      elt.order_count,
    ]);

    let content = {
      startY: 50,
      head: headers,
      body: data,
      blankrows: "No Record",
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("Category Report.pdf");
  };

  //-------------------------------------------- end pdf----------------------------------------------------------------->

  //  //----------------------------------------------------+++=++++++ excel--------------------------------------------------->
  const header = ["Category", "Item sold", "Orders", "Net Revenue"];

  function handleDownloadExcel() {
    downloadExcel({
      fileName: "Category Report -> downloadExcel method",
      sheet: "Category Report",
      tablePayload: {
        header,
        body: tableCategory,
        blankrows: "No Record",
      },
    });
  }

  // // // //-------------Item sold product ammount---------------------------
  var getSoldProductAmmount = Number(Categoryreport.total_sold_product_amount);

  var getPreviousSoldProductAmmount = Number(
    PrevCategoryreport.prev_total_sold_product_amount
  );

  var resultProductAmmount = (
    ((getSoldProductAmmount - getPreviousSoldProductAmmount) /
      getPreviousSoldProductAmmount) *
    100
  ).toFixed(2);

  resultProductAmmount !== "Infinity"
    ? console.log()
    : (resultProductAmmount = 0);

  // // // //----------------------sold product count--------------------------------------------------------
  var getSoldProductCount = Number(Categoryreport.total_sold_product_count);

  var getPreviousSoldProductCount = Number(
    PrevCategoryreport.prev_total_sold_product_count
  );

  var resultProductCount = (
    ((getSoldProductCount - getPreviousSoldProductCount) /
      getPreviousSoldProductCount) *
    100
  ).toFixed(2);

  resultProductCount !== "Infinity" ? console.log() : (resultProductCount = 0);

  // // // //-----------------------order count---------------------------------------
  var getSoldorder = Number(Categoryreport.order_count);

  var getPreviousSoldorder = Number(PrevCategoryreport.prev_order_count);

  var resultorder = (
    ((getSoldorder - getPreviousSoldorder) / getPreviousSoldorder) *
    100
  ).toFixed(2);

  resultorder !== "Infinity" ? console.log() : (resultorder = 0);
  return (
    <div>
      <h2>Category Report</h2>
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

          <div className="col-md-3 col-sm-6 mt-2 aos_input">
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
            <div className="col-md-3 col-sm-6 aos_input d-flex">
              <div className="col-6 aos_input pe-2">
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

          <div className="col-md-auto mt-2 col-sm-6 aos_input">
            <MainButton
              btntext={"Search"}
              btnclass={"button main_button"}
              onClick={submitHandler}
            />
          </div>

          <div className="col-md-auto mt-2 col-sm-6 aos_input">
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
            {/* item sold */}
            <div className="card py-2 px-4 col-4 rounded-left shadow-none">
              <div className=" d-flex mt-0 align-items-center">
                <GiSellCard className="text-success h1 mb-0 mx-2" />
                <h5 className="text-success">Item Sold</h5>
              </div>
              <div className="row mt-3">
                <div className="col-12">
                  <div className="row  d-flex flex-column align-items-center">
                    <div className="d-flex align-items-baseline justify-content-between">
                      {CategoryError === "no_data" ||
                        Categoryreport.total_sold_product_count === null ||
                        Categoryreport.total_sold_product_count === undefined ||
                        Categoryreport.total_sold_product_count === "" ? (
                        <h3>0</h3>
                      ) : (
                        <h3>{Categoryreport.total_sold_product_count}</h3>
                      )}

                      <div className="d-flex align-items-center justify-content-center">
                        <AiOutlineArrowRight className="h5 mb-0 mx-2" />

                        {resultProductCount > 0 ? (
                          <p className="mb-0 h5" style={{ color: "green" }}>
                            {" "}
                            {resultProductCount}%
                          </p>
                        ) : resultProductCount < 0 ? (
                          <p className="mb-0 h5" style={{ color: "red" }}>
                            {" "}
                            {resultProductCount}%
                          </p>
                        ) : resultProductCount === 0 ? (
                          <p className="mb-0 h5" style={{ color: "blue" }}>
                            {" "}
                            {resultProductCount}%
                          </p>
                        ) : resultProductCount === "NaN" ? (
                          <p className="mb-0 h5" style={{ color: "grey" }}>
                            {" "}
                            0%
                          </p>
                        ) : (
                          <p className="mb-0 h5" style={{ color: "brown" }}>
                            {" "}
                            {resultProductCount}%
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

                      {CategoryError === "no_data" ||
                        PrevCategoryreport.prev_total_sold_product_count ===
                        null ||
                        PrevCategoryreport.prev_total_sold_product_count ===
                        undefined ||
                        PrevCategoryreport.prev_total_sold_product_count === "" ? (
                        <p className="h5"> 0</p>
                      ) : (
                        <p className="h5">
                          {PrevCategoryreport.prev_total_sold_product_count}{" "}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* end */}
            {/* net */}
            <div className="card py-2 px-4 col-4 rounded-0 shadow-none">
              <div className=" d-flex mt-0 align-items-center">
                <GiTakeMyMoney className="text-success h1 mx-2" />
                <h5 className="text-success">Net Sales </h5>
              </div>
              <div className="row mt-3">
                <div className="col-12">
                  <div className="row  d-flex flex-column align-items-center">
                    <div className="d-flex align-items-baseline justify-content-between">
                      {CategoryError === "no_data" ||
                        Categoryreport.total_sold_product_amount === null ||
                        Categoryreport.total_sold_product_amount === undefined ||
                        Categoryreport.total_sold_product_amount === "" ? (
                        <h3>₹0</h3>
                      ) : (
                        <h3>
                          ₹{Categoryreport.total_sold_product_amount.toFixed(2)}
                        </h3>
                      )}
                      <div className="d-flex align-items-center justify-content-center">
                        <AiOutlineArrowRight className="h5 mb-0 mx-2" />
                        {resultProductAmmount > 0 ? (
                          <p className="mb-0 h5" style={{ color: "green" }}>
                            {" "}
                            {resultProductAmmount}%
                          </p>
                        ) : resultProductAmmount < 0 ? (
                          <p className="mb-0 h5" style={{ color: "red" }}>
                            {" "}
                            {resultProductAmmount}%
                          </p>
                        ) : resultProductAmmount === 0 ? (
                          <p className="mb-0 h5" style={{ color: "blue" }}>
                            {" "}
                            {resultProductAmmount}%
                          </p>
                        ) : resultProductAmmount === "NaN" ? (
                          <p className="mb-0 h5" style={{ color: "grey" }}>
                            {" "}
                            0%
                          </p>
                        ) : (
                          <p className="mb-0 h5" style={{ color: "brown" }}>
                            {" "}
                            {resultProductAmmount}%
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

                      {CategoryError === "no_data" ||
                        PrevCategoryreport.prev_total_sold_product_amount ===
                        null ||
                        PrevCategoryreport.prev_total_sold_product_amount ===
                        undefined ||
                        PrevCategoryreport.prev_total_sold_product_amount ===
                        "" ? (
                        <p className="h5"> ₹0</p>
                      ) : (
                        <p className="h5">
                          ₹
                          {PrevCategoryreport.prev_total_sold_product_amount.toFixed(
                            2
                          )}{" "}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* net end */}
            {/* order */}
            <div className="card py-2 px-4 col-4 rounded-right shadow-none">
              <div className=" d-flex mt-0 align-items-end">
                <BsBagPlus className="text-success h1 mb-0 mx-2" />
                <h5 className="text-success">Orders </h5>
              </div>
              <div className="row mt-3">
                <div className="col-12">
                  <div className="row  d-flex flex-column align-items-center">
                    <div className="d-flex align-items-baseline justify-content-between">
                      {CategoryError === "no_data" ||
                        Categoryreport.order_count === null ||
                        Categoryreport.order_count === undefined ||
                        Categoryreport.order_count === "" ? (
                        <h3>0</h3>
                      ) : (
                        <h3>{Categoryreport.order_count}</h3>
                      )}

                      <div className="d-flex align-items-center justify-content-center">
                        <AiOutlineArrowRight className="h5 mb-0 mx-2" />

                        {resultorder > 0 ? (
                          <p className="mb-0 h5" style={{ color: "green" }}>
                            {" "}
                            {resultorder}%
                          </p>
                        ) : resultorder < 0 ? (
                          <p className="mb-0 h5" style={{ color: "red" }}>
                            {" "}
                            {resultorder}%
                          </p>
                        ) : resultorder === 0 ? (
                          <p className="mb-0 h5" style={{ color: "blue" }}>
                            {" "}
                            {resultorder}%
                          </p>
                        ) : resultorder === "NaN" ? (
                          <p className="mb-0 h5" style={{ color: "grey" }}>
                            {" "}
                            0%
                          </p>
                        ) : (
                          <p className="mb-0 h5" style={{ color: "brown" }}>
                            {" "}
                            {resultorder}%
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

                      {CategoryError === "no_data" ||
                        PrevCategoryreport.prev_order_count === null ||
                        PrevCategoryreport.prev_order_count === undefined ||
                        PrevCategoryreport.prev_order_count === "" ? (
                        <p className="h5"> 0</p>
                      ) : (
                        <p className="h5">
                          {PrevCategoryreport.prev_order_count}{" "}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/*  */}
          </div>
        </div>
        {/*  */}

        {/* graph */}
        {Categoryreport.total_sold_product_count ||
          Categoryreport.total_sold_product_amount ||
          Categoryreport.order_count ? (
          <HighchartsReact highcharts={Highcharts} options={options} />
        ) : null}

        {/*  */}

        {/* datatable */}

        <DataTable
          columns={columns}
          data={tableCategory}
          pagination
          highlightOnHover
          pointerOnHover
          className={"table_body categoryreport_table"}
        />
      </div>
    </div>
  );
};

export default CategoryReport;
