import React, { useEffect, useState } from "react";
import Input from "../common/input";
import DataTable from "react-data-table-component";
import MainButton from "../common/button";
import Form from "react-bootstrap/Form";
import { AiOutlineArrowRight } from "react-icons/ai";
import { GiStorkDelivery, GiMoneyStack } from "react-icons/gi";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import axios from "axios";
import moment from "moment/moment";
import Select from "react-select";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { downloadExcel } from "react-export-table-to-excel";

const CouponReport = () => {
  const token = localStorage.getItem("token");

  const [filterchange, setFilterchange] = useState("");

  const [getCoupon, setGetCoupon] = useState([]);

  const [fromDate, setFromDate] = useState(moment().format("YYYY-MM-DD"));
  const [toDate, setToDate] = useState(moment().format("YYYY-MM-DD"));

  const [previousStateChange, setpreviousStateChange] = useState(" ");
  const [PrevCouponreport, setPrevCouponreport] = useState([]);
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

  const [apicall, setapicall] = useState(false);
  const [tabledate, setTabledata] = useState([]);
  const [couponError, setCouponError] = useState("");
  const [venderList, setVenderList] = useState([]);
  const [vendorId, setVendorId] = useState("");
  const [category, setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [brand, setBrand] = useState([]);
  const [brandName, setBrandName] = useState([]);
  const [location, setLocation] = useState([]);


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
  const fetchData = () => {
    axios
      .post(
        `${process.env.REACT_APP_BASEURL}/coupons_report`,
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
        if (response.data.message === "no_data") {
          setCouponError(response.data.message);

          setGetCoupon([0]);
          setTabledata([0]);
          setPrevCouponreport([0]);
        } else {
          setCouponError("");
          setapicall(false);
          setGetCoupon(response.data[0]);
          setPrevCouponreport(response.data[1]);
          setTabledata(response.data[2]);
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

  const submitHandler = () => {
    setapicall(true);
    fetchData();
  };

  var OrderCount = getCoupon.orders_count;
  var DiscountAmmount = getCoupon.discount_amount;

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
        name: "Discounted Orders",
        data: [OrderCount],
      },
      {
        name: "Amount",
        data: [DiscountAmmount],
      },
    ],
    xAxis: {
      categories: [],
    },
    yAxis: {
      categories: [],
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

    const title = "Coupon Report";
    const headers = [
      [
        " Discount Coupon",
        "Amount Discounted",
        "Orders",
        "Created",
        "Coupon Code",
      ],
    ];

    const data = (tabledate || []).map((elt) => [
      elt.discount_coupon,
      elt.amount_discounted,
      elt.order_count,
      elt.created_date,
      elt.coupons_code,
    ]);

    let content = {
      startY: 50,
      head: headers,
      body: data,
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("Coupon Report.pdf");
  };

  //-------------------------------------------- end pdf----------------------------------------------------------------->

  //----------------------------------------------------+++=++++++ excel--------------------------------------------------->
  const header = [
    " Discount Coupon",
    "Orders",
    "Coupon Code",
    "Amount Discounted",
    "Created",
  ];

  function handleDownloadExcel() {
    downloadExcel({
      fileName: "Coupon Report -> downloadExcel method",
      sheet: "Coupon Report",
      tablePayload: {
        header,
        // accept two different data structures
        body: tabledate,
      },
    });
  }
  //----------------------------------------------------+++=++++++ excel--------------------------------------------------->
  const columns = [
    {
      name: "Coupon Code",
      selector: (row) => row.coupons_code,
      sortable: true,
      width: "260px",
    },
    {
      name: " Discount Coupon",
      selector: (row) => row.discount_coupon,
      sortable: true,
      width: "260px",
    },
    {
      name: "Amount Discounted",
      selector: (row) => Number(row.amount_discounted).toFixed(2),
      sortable: true,
    },
    {
      name: "Created",
      selector: (row) => row.created_date,
      sortable: true,
    },
    {
      name: "Orders",
      selector: (row) => row.order_count,
      sortable: true,
    },
  ];

  const options1 = [
    (brand || []).map((item) => ({ value: `${item.brand}`, label: `${item.brand}` })),
  ];

  let arrr = [];

  const brandHandler = (e) => {
    arrr = [];
    e.map((item) => {
      return (arrr.push(item.value))

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

  // // //-------------Discount Ammount---------------------------
  var getDiscountAmmount = Number(getCoupon.discount_amount);

  var getPreviousDiscountAmmount = Number(
    PrevCouponreport.prev_discount_amount
  );

  var resultAmmount = (
    ((getDiscountAmmount - getPreviousDiscountAmmount) /
      getPreviousDiscountAmmount) *
    100
  ).toFixed(2);

  resultAmmount !== "Infinity" ? console.log() : (resultAmmount = 0);

  // // // //----------------------Discount Order--------------------------------------------------------
  var getDiscountOrder = Number(getCoupon.orders_count);

  var getPreviousDiscountOrder = Number(PrevCouponreport.prev_orders_count);

  var resultOrder = (
    ((getDiscountOrder - getPreviousDiscountOrder) / getPreviousDiscountOrder) *
    100
  ).toFixed(2);

  resultOrder !== "Infinity" ? console.log() : (resultOrder = 0);

  return (
    <div>
      <h2>Coupon Report</h2>
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
            <div className="col-md-3 col-sm-6 d-flex mt-2 aos_input">
              <div className="col-6 ps-2">
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

              <div className="col-6 ps-2">
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

          <div className="col-md-auto col-sm-6 mt-2  aos_input">
            <MainButton
              btntext={"Search"}
              btnclass={"button main_button"}
              onClick={submitHandler}
            />
          </div>

          <div className="col-md-auto col-sm-6 mt-2 aos_input">
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
            {/* discount order */}
            <div className="card p-2 col-6 rounded-left shadow-none">
              <div className=" d-flex mt-0 align-items-end">
                <GiStorkDelivery className="text-success h1 mb-0 mx-2" />
                <h5 className="text-success">Discounted Orders </h5>
              </div>
              <div className="row mt-3 px-2">
                <div className="col-12">
                  <div className="row  d-flex flex-column align-items-center">
                    <div className="d-flex align-items-baseline justify-content-between">
                      {couponError === "no_data" ||
                        getCoupon.orders_count == null ||
                        getCoupon.orders_count === undefined ? (
                        <h3>0</h3>
                      ) : (
                        <h3>{getCoupon.orders_count}</h3>
                      )}

                      <div className="d-flex align-items-center justify-content-center">
                        <AiOutlineArrowRight className="h5 mb-0 mx-2" />

                        {resultOrder > 0 ? (
                          <p className="mb-0 h5" style={{ color: "green" }}>
                            {" "}
                            {resultOrder}%
                          </p>
                        ) : resultOrder < 0 ? (
                          <p className="mb-0 h5" style={{ color: "red" }}>
                            {" "}
                            {resultOrder}%
                          </p>
                        ) : resultOrder === 0 ? (
                          <p className="mb-0 h5" style={{ color: "blue" }}>
                            {" "}
                            {resultOrder}%
                          </p>
                        ) : resultOrder === "NaN" ? (
                          <p className="mb-0 h5" style={{ color: "grey" }}>
                            {" "}
                            0%
                          </p>
                        ) : (
                          <p className="mb-0 h5" style={{ color: "brown" }}>
                            {" "}
                            {resultOrder}%
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

                      {couponError === "no_data" ||
                        PrevCouponreport.prev_orders_count === null ||
                        PrevCouponreport.prev_orders_count === undefined ||
                        PrevCouponreport.prev_orders_count === "" ? (
                        <p className="h5"> 0</p>
                      ) : (
                        <p className="h5">
                          {PrevCouponreport.prev_orders_count}{" "}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* end */}
            {/* amt */}
            <div className="card p-2 col-6 rounded-right shadow-none">
              <div className=" d-flex mt-0 align-items-center">
                <GiMoneyStack className="text-success h1 mx-2" />
                <h5 className="text-success">Amount </h5>
              </div>
              <div className="row mt-3 px-2">
                <div className="col-12">
                  <div className="row  d-flex flex-column align-items-center">
                    <div className="d-flex align-items-baseline justify-content-between">
                      {couponError === "no_data" ||
                        getCoupon.discount_amount === null ||
                        getCoupon.discount_amount === undefined ||
                        getCoupon.discount_amount === "" ? (
                        <h3>₹0</h3>
                      ) : (
                        <h3>{getCoupon.discount_amount.toFixed(2)}</h3>
                      )}

                      <div className="d-flex align-items-center justify-content-center">
                        <AiOutlineArrowRight className="h5 mb-0 mx-2" />
                        {resultAmmount > 0 ? (
                          <p className="mb-0 h5" style={{ color: "green" }}>
                            {" "}
                            {resultAmmount}%
                          </p>
                        ) : resultAmmount < 0 ? (
                          <p className="mb-0 h5" style={{ color: "red" }}>
                            {" "}
                            {resultAmmount}%
                          </p>
                        ) : resultAmmount === 0 ? (
                          <p className="mb-0 h5" style={{ color: "blue" }}>
                            {" "}
                            {resultAmmount}%
                          </p>
                        ) : resultAmmount === "NaN" ? (
                          <p className="mb-0 h5" style={{ color: "grey" }}>
                            {" "}
                            0%
                          </p>
                        ) : (
                          <p className="mb-0 h5" style={{ color: "brown" }}>
                            {" "}
                            {resultAmmount}%
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

                      {couponError === "no_data" ||
                        PrevCouponreport.prev_discount_amount === null ||
                        PrevCouponreport.prev_discount_amount === undefined ||
                        PrevCouponreport.prev_discount_amount === "" ? (
                        <p className="h5"> ₹0</p>
                      ) : (
                        <p className="h5">
                          ₹{PrevCouponreport.prev_discount_amount.toFixed(2)}{" "}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* amt end */}
          </div>
        </div>
        {/*  */}

        {/* graph */}

        {getCoupon.discount_amount !== undefined ||
          getCoupon.orders_count !== undefined ? (
          <HighchartsReact highcharts={Highcharts} options={options} />
        ) : null}

        {/*  */}

        {/* datatable */}

        {/* datatable */}

        <DataTable
          columns={columns}
          data={tabledate}
          pagination
          highlightOnHover
          pointerOnHover
          className={"table_body couponreport_table"}
        />
      </div>
    </div>
  );
};

export default CouponReport;
