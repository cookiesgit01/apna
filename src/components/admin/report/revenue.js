import React, { useEffect, useState } from "react";
import Input from "../common/input";
import DataTable from "react-data-table-component";
import MainButton from "../common/button";
import axios from "axios";
import Form from "react-bootstrap/Form";
import moment from "moment/moment";
import { BsCashCoin } from "react-icons/bs";
import { HiOutlineGift } from "react-icons/hi";
import { AiOutlineArrowRight } from "react-icons/ai";
import { GiPayMoney } from "react-icons/gi";
import { MdOutlineLocalShipping } from "react-icons/md";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import Select from "react-select";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { downloadExcel } from "react-export-table-to-excel";

const RevenueReport = () => {
  const token = localStorage.getItem("token");

  const [filterchange, setFilterchange] = useState("");
  const [previousStateChange, setpreviousStateChange] = useState(" ");

  const [getRevenue, setGetRevenue] = useState([]);

  const [fromDate, setFromDate] = useState(moment().format("YYYY-MM-DD"));
  const [toDate, setToDate] = useState(moment().format("YYYY-MM-DD"));
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
  const [RevenueError, setRevenueError] = useState("");
  const [venderList, setVenderList] = useState([]);
  const [vendorId, setVendorId] = useState("");
  const [category, setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [brand, setBrand] = useState([]);
  const [brandName, setBrandName] = useState([]);
  const [location, setLocation] = useState([]);

  var GrossAmmount = [];
  var totalSales = [];
  var totalGSt = [];
  var TotalShipping = [];
  var NetSales = [];
  var Discount = [];

  // pdf
  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;

    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Revenue Report";
    const headers = [
      [
        "Date",
        "Gross Revenue",
        "Total GST",
        "Discount",
        "shipping",
        "Net Revenue",
        "Total Revenue",
      ],
    ];

    const data = (tabledate || []).map((elt) => [
      elt.uniquedates,
      elt.gross_amount,
      elt.total_gst,
      elt.discount,
      elt.total_shipping_charges,
      elt.net_sales,
      elt.total_sales,
    ]);

    let content = {
      startY: 50,
      head: headers,
      body: data,
    };

    // doc.text(headers, backgroundColor, "pink");
    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("Revenue Report.pdf");
    // doc.setFillColor("Gray" ,100)
  };

  // end pdf

  //----------------------------------------------------+++=++++++ excel--------------------------------------------------->
  const header = [
    "Date",
    "Gross Revenue",
    "Total GST",
    "Discount",
    "shipping",
    "Net Revenue",
    "Total Revenue",
  ];

  function handleDownloadExcel() {
    downloadExcel({
      fileName: "Revenue Report -> downloadExcel method",
      sheet: "Revenue Report",
      tablePayload: {
        header,
        // accept two different data structures
        body: tabledate,
      },
    });
  }

  //----------------------------------------------------+++=++++++ excel-  end-------------------------------------------------->

  // var Refund=[]

  // const [fromDate, setFrom]

  // const [option,setOption]=useState(
  //   {

  //   chart: {
  //     height: 350,
  //     type: 'line',
  //     stacked: false,
  //   },
  //   stroke: {
  //     width: [0, 2, 5],
  //     curve: 'smooth'
  //   },
  //   plotOptions: {
  //     bar: {
  //       columnWidth: '50%'
  //     }
  //   },

  //   fill: {
  //     opacity: [0.85, 0.25, 1],
  //     gradient: {
  //       inverseColors: false,
  //       shade: 'light',
  //       type: "vertical",
  //       opacityFrom: 0.85,
  //       opacityTo: 0.55,
  //       stops: [0, 100, 100, 100]
  //     }
  //   },
  //   labels: []  ,
  //   markers: {
  //     size: 0
  //   },
  //   xaxis: {
  //     type: ''
  //   },
  //   yaxis: {
  //     title: {
  //       text: 'Points',
  //     },
  //     min: 0
  //   },
  //   tooltip: {
  //     shared: true,
  //     intersect: false,
  //     y: {
  //       formatter: function (y) {
  //         if (typeof y !== "undefined") {
  //           return y.toFixed(0) + " points";
  //         }
  //         return y;

  //       }
  //     }
  //   }
  // }
  // )

  //   const [series,setSeries]=useState([

  //    {
  //     name: 'TEAM B',
  //     type: 'area',
  //     data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
  //   },
  //   {
  //     name: 'TEAM C',
  //     type: 'line',
  //     data: [30, 25, 36, 30, 70, 35, 64, 52, 45, 36, 39]
  //   },

  //   {
  //     name: 'TEAM D',
  //     type: 'line',
  //     data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
  //   }

  // ])

  // setSeries([

  //   {
  //    name: 'TEAM B',
  //    type: 'area',
  //    data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
  //  },
  //  {
  //    name: 'TEAM C',
  //    type: 'line',
  //    data: GrossAmmount
  //  },

  //  {
  //    name: 'TEAM D',
  //    type: 'line',
  //    data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
  //  }

  // ])

  // setOption( {

  //   chart: {
  //     height: 350,
  //     type: 'line',
  //     stacked: false,
  //   },
  //   stroke: {
  //     width: [0, 2, 5],
  //     curve: 'smooth'
  //   },
  //   plotOptions: {
  //     bar: {
  //       columnWidth: '50%'
  //     }
  //   },

  //   fill: {
  //     opacity: [0.85, 0.25, 1],
  //     gradient: {
  //       inverseColors: false,
  //       shade: 'light',
  //       type: "vertical",
  //       opacityFrom: 0.85,
  //       opacityTo: 0.55,
  //       stops: [0, 100, 100, 100]
  //     }
  //   },
  //   labels: GrossAmmount,
  //   markers: {
  //     size: 0
  //   },
  //   xaxis: {
  //     type: 'value'
  //   },
  //   yaxis: {
  //     title: {
  //       text: 'Points',
  //     },
  //     min: 0
  //   },
  //   tooltip: {
  //     shared: true,
  //     intersect: false,
  //     y: {
  //       formatter: function (y) {
  //         if (typeof y !== "undefined") {
  //           return y.toFixed(0) + " points";
  //         }
  //         return y;

  //       }
  //     }
  //   }
  // })



  const options = {
    chart: {
      type: "spline",
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
        name: "Gross Revenue",
        data: GrossAmmount,
      },

      {
        name: "Discount",
        data: Discount,
      },
      {
        name: "Total GST",
        data: totalGSt,
      },
      {
        name: "Net Revenue",
        data: NetSales,
      },
      {
        name: "shipping",
        data: TotalShipping,
      },
    ],
    xAxis: {
      categories: GrossAmmount,
    },
    yAxis: {
      categories: totalSales,
    },
  };

  /////////////////////////////////////////////////New Apexchart //////////////////////////////////////////////

  // var  Chartoptions = {
  //   series: [
  //   {
  //     name: "High - 2013",
  //     data: [28, 29, 33, 36, 32, 32, 33]
  //   },
  //   {
  //     name: "Low - 2013",
  //     data: [12, 11, 14, 18, 17, 13, 13]
  //   }
  // ],
  //   chart: {
  //   height: 350,
  //   type: 'line',
  //   dropShadow: {
  //     enabled: true,
  //     color: '#000',
  //     top: 18,
  //     left: 7,
  //     blur: 10,
  //     opacity: 0.2
  //   },
  //   toolbar: {
  //     show: false
  //   }
  // },
  // colors: ['#77B6EA', '#545454'],
  // dataLabels: {
  //   enabled: true,
  // },
  // stroke: {
  //   curve: 'smooth'
  // },
  // title: {
  //   text: 'Average High & Low Temperature',
  //   align: 'left'
  // },
  // grid: {
  //   borderColor: '#e7e7e7',
  //   row: {
  //     colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
  //     opacity: 0.5
  //   },
  // },
  // markers: {
  //   size: 1
  // },
  // xaxis: {
  //   categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  //   title: {
  //     text: 'Month'
  //   }
  // },
  // yaxis: {
  //   title: {
  //     text: 'Temperature'
  //   },
  //   min: 5,
  //   max: 40
  // },
  // legend: {
  //   position: 'top',
  //   horizontalAlign: 'right',
  //   floating: true,
  //   offsetY: -25,
  //   offsetX: -5
  // }
  // };

  const optionss = {
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
        name: " Total Revenue",
        data: [getRevenue.gross_total_amount],
      },

      {
        name: "Discount Ammont",
        data: [getRevenue.discount_amount],
      },

      {
        name: "Total GST",
        data: [getRevenue.total_gst],
      },

      {
        name: "Total Shopping Charge",
        data: [getRevenue.total_shipping_charges],
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
      name: "Date",
      selector: (row) => moment(row.uniquedates).format("YYYY-MM-DD"),
      sortable: true,
      width: "170px",
      center: true,
    },
    {
      name: "Gross Revenue",
      selector: (row) => Number(row.gross_amount).toFixed(2),
      sortable: true,
      width: "150px",
    },
    {
      name: "Total GST",
      selector: (row) => Number(row.total_gst).toFixed(2),
      sortable: true,
      width: "150px",
    },
    {
      name: "Discount",
      selector: (row) => Number(row.discount).toFixed(2),
      sortable: true,
      width: "150px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },

    {
      name: "Shipping",
      selector: (row) => Number(row.total_shipping_charges).toFixed(2),
      sortable: true,
      width: "160px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
    {
      name: "Net Revenue",
      selector: (row) => Number(row.net_sales).toFixed(2),
      sortable: true,
      width: "150px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },

    {
      name: "Total Revenue",
      selector: (row) => Number(row.total_sales).toFixed(2),
      sortable: true,
      width: "150px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
  ];

  const TimeChange = (e) => {
    setFilterchange(e.target.value);

    let value = Number(e.target.value);
    //today---------------------------------------------------------------------------
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
      // setPrevDate(moment(month).subtract(1, 'month').startOf('month').format('YYYY-MM-DD'))

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
      // setPrevDate(moment(sixMonth).subtract(6, 'month').startOf('month').format('YYYY-MM-DD'))

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
      // setPrevDate(moment(ThisWeek).subtract(1, 'weeks').endOf('weeks').format('YYYY-MM-DD'))
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
        `${process.env.REACT_APP_BASEURL}/revenue`,
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
          setRevenueError(response.data.message);

          setGetRevenue([0]);
          setTabledata([]);
        } else {
          setRevenueError("");

          setGetRevenue(response.data[0]);
          setTabledata(response.data[0].ravenue_date_data);

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
      const filterUnwanted = (arr) => {
        const required = arr.filter((el) => {
          return el.shop_name;
        });
        return required;
      };

      setVenderList(filterUnwanted(result.data));
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

  const OnReset = () => {
    setFilterchange("");
    setpreviousStateChange("");
    setFromDate(moment().format("YYYY-MM-DD"));
    setToDate(moment().format("YYYY-MM-DD"));
    setprevFromdate(
      moment()
        .subtract(1, "days")
        .startOf("days")
        .format("YYYY-MM-DD")
    );
    setprevTodate(
      moment()
        .subtract(1, "days")
        .startOf("days")
        .format("YYYY-MM-DD")
    );
    setBrandName([]);
    setLocation([]);
    setCategoryId("");
    setVendorId("");
    fetchData();
    setapicall(true);
  };

  (tabledate || []).map((item) => {
    return (
      GrossAmmount.push(item.gross_amount),
      totalSales.push(item.total_sales),
      totalGSt.push(item.total_gst),
      TotalShipping.push(item.total_shipping_charges),
      NetSales.push(item.net_sales),
      Discount.push(item.discount)
    )

  });

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

  //-------------gross amount comparission---------------------------
  var getgrossAmmount = Number(getRevenue.gross_total_amount);
  var getPreviousGrossAmmount = Number(getRevenue.prev_gross_total_amount);
  var resultAmmount = (
    ((getgrossAmmount - getPreviousGrossAmmount) / getPreviousGrossAmmount) *
    100
  ).toFixed(2);
  resultAmmount !== "Infinity" ? console.log() : (resultAmmount = 0);
  //-----------------------return total comparission--------------------------------------------------------
  var Getreturntotal = Number(getRevenue.return_total);
  var getPreviousreturnTotal = Number(getRevenue.prev_return_total);
  var resultReturn = (
    ((Getreturntotal - getPreviousreturnTotal) / getPreviousreturnTotal) *
    100
  ).toFixed(2);
  resultReturn !== "Infinity" ? console.log() : (resultReturn = 0);
  //--------------------total gst------------------------------------------

  var GetTotalGST = Number(getRevenue.total_gst);
  var getPreviousTotalGST = Number(getRevenue.prev_total_gst);
  var resultGST = (
    ((GetTotalGST - getPreviousTotalGST) / getPreviousTotalGST) *
    100
  ).toFixed(2);
  resultGST !== "Infinity" ? console.log() : (resultGST = 0);
  //--------------------total shipping------------------------------------------

  var GetTotalSHipping = Number(getRevenue.total_shipping_charges);
  var getPreviousTotalShipping = Number(getRevenue.prev_total_shipping_charges);
  var resultShipping = (
    ((GetTotalSHipping - getPreviousTotalShipping) / getPreviousTotalShipping) *
    100
  ).toFixed(2);
  resultShipping !== "Infinity" ? console.log() : (resultShipping = 0);
  return (
    <div>
      <h2>Revenue Report</h2>
      {/* search bar */}
      <div className="card mt-3 p-3 ">
        <div className="row pb-3">
          <div className="col-md-3 col-sm-6   aos_input">
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

          <div className="col-md-3 col-sm-6 aos_input mt-3">
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
            <div className="col-md-3 col-sm-6 d-flex mt-3  aos_input">
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

              <div className="col-6 aos_input">
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
            <div className="col-md-3 mt-2 col-sm-6 aos_input">
              <Input type={"month"} plchldr={"Search by month"} />
            </div>
          ) : null}

          <div className="col-md-auto col-sm-6 mt-3  aos_input">
            <MainButton
              btntext={"Search"}
              btnclass={"button main_button"}
              onClick={submitHandler}
            />
          </div>

          <div className="col-md-auto col-sm-6 mt-3 aos_input">
            <MainButton
              btntext={"Reset"}
              btnclass={"button main_button"}
              type="reset"
              onClick={OnReset}
            />
          </div>

          <div className="col-md-auto col-sm-6 mt-3 aos_input">
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
            {/* revenue */}
            <div className="card p-2 col-2 rounded-left shadow-none">
              <div className=" d-flex mt-0 align-items-center">
                <BsCashCoin className="text-success h1 mb-0 mx-2" />
                <h5 className="text-success">Gross Revenue </h5>
              </div>
              <div className="row mt-3">
                <div className="col-12">
                  <div className="row  d-flex flex-column align-items-center">
                    <div className="d-flex align-items-baseline justify-content-between">
                      {RevenueError === "no_data" ||
                        getRevenue.gross_total_amount === null ||
                        getRevenue.gross_total_amount === undefined ||
                        getRevenue.gross_total_amount === "" ? (
                        <h3>₹0</h3>
                      ) : (
                        <h3>
                          ₹{Number(getRevenue.gross_total_amount).toFixed(2)}
                        </h3>
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

                      {RevenueError === "no_data" ||
                        getRevenue.prev_gross_total_amount === null ||
                        getRevenue.prev_gross_total_amount === undefined ||
                        getRevenue.prev_gross_total_amount === "" ? (
                        <p className="h5"> ₹0</p>
                      ) : (
                        <p className="h5">
                          ₹
                          {Number(getRevenue.prev_gross_total_amount).toFixed(
                            2
                          )}{" "}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* end */}
            {/* Refund */}
            {/* <div className="card p-2 col-2 rounded-0 shadow-none">
              <div className=" d-flex mt-0 align-items-center">
                <HiOutlineReceiptRefund className="text-success h1 mx-2" />
                <h5 className="text-success">Discount Ammount </h5>
              </div>
              <div className="row mt-3">
                <div className="col-12">
                  <div className="row  d-flex flex-column align-items-center">
                  <div className="d-flex align-items-baseline justify-content-between">
                  { (RevenueError)=="no_data"||(getRevenue.discount_amount)==null||(getRevenue.discount_amount)==undefined||(getRevenue.discount_amount)==""? <h3>No Record</h3>:  <h3>{getRevenue.discount_amount}</h3> }  
                    <div className="d-flex align-items-center justify-content-center">
                     <AiOutlineArrowRight className="h5 mb-0 mx-2"/>
                     <p className="mb-0 h5">0%</p>
                    </div>
                    </div>
                    <div>
                        <h5>Previous Year:</h5>
                    { (RevenueError)=="no_data"||(getRevenue.prev_gross_total_amount)==null||(getRevenue.prev_gross_total_amount)==undefined||(getRevenue.prev_gross_total_amount)==""? <p className="h5"> ₹0</p>:  <p className="h5">₹{getRevenue.prev_gross_total_amount} </p>} 
                    </div>
                  </div>
                </div>

                
              </div>
            </div> */}
            {/* refund end */}
            {/* coupon */}
            <div className="card p-2 col-2 rounded-0 shadow-none">
              <div className=" d-flex mt-0 align-items-end">
                <HiOutlineGift className="text-success h1 mb-0 mx-2" />
                <h5 className="text-success">Return Total</h5>
              </div>
              <div className="row mt-3">
                <div className="col-12">
                  <div className="row  d-flex flex-column align-items-center">
                    <div className="d-flex align-items-baseline justify-content-between">
                      {RevenueError === "no_data" ||
                        getRevenue.return_total === null ||
                        getRevenue.return_total === undefined ||
                        getRevenue.return_total === "" ? (
                        <h3>₹0</h3>
                      ) : (
                        <h3>₹{Number(getRevenue.return_total).toFixed(2)}</h3>
                      )}
                      <div className="d-flex align-items-center justify-content-center">
                        <AiOutlineArrowRight className="h5 mb-0 mx-2" />

                        {resultReturn > 0 ? (
                          <p className="mb-0 h5" style={{ color: "green" }}>
                            {" "}
                            {resultReturn}%
                          </p>
                        ) : resultReturn < 0 ? (
                          <p className="mb-0 h5" style={{ color: "red" }}>
                            {" "}
                            {resultReturn}%
                          </p>
                        ) : resultReturn === 0 ? (
                          <p className="mb-0 h5" style={{ color: "blue" }}>
                            {" "}
                            {resultReturn}%
                          </p>
                        ) : resultReturn === "NaN" ? (
                          <p className="mb-0 h5" style={{ color: "grey" }}>
                            {" "}
                            0%
                          </p>
                        ) : (
                          <p className="mb-0 h5" style={{ color: "brown" }}>
                            {" "}
                            {resultReturn}%
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
                      {RevenueError === "no_data" ||
                        getRevenue.prev_return_total === null ||
                        getRevenue.prev_return_total === undefined ||
                        getRevenue.prev_return_total === "" ? (
                        <p className="h5"> ₹0</p>
                      ) : (
                        <p className="h5">
                          ₹{Number(getRevenue.prev_return_total).toFixed(2)}{" "}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*  */}
            {/* tax */}
            <div className="card p-2 col-2 rounded-0 shadow-none">
              <div className=" d-flex mt-0 align-items-end">
                <GiPayMoney className="text-success h1 mb-0 mx-2" />
                <h5 className="text-success">Taxes </h5>
              </div>
              <div className="row mt-3">
                <div className="col-12">
                  <div className="row  d-flex flex-column align-items-center">
                    <div className="d-flex align-items-baseline justify-content-between">
                      {RevenueError === "no_data" ||
                        getRevenue.total_gst === null ||
                        getRevenue.total_gst === undefined ||
                        getRevenue.total_gst === "" ? (
                        <h3>₹0</h3>
                      ) : (
                        <h3>₹{Number(getRevenue.total_gst).toFixed(2)}</h3>
                      )}
                      <div className="d-flex align-items-center justify-content-center">
                        <AiOutlineArrowRight className="h5 mb-0 mx-2" />

                        {resultGST > 0 ? (
                          <p className="mb-0 h5" style={{ color: "green" }}>
                            {" "}
                            {resultGST}%
                          </p>
                        ) : resultGST < 0 ? (
                          <p className="mb-0 h5" style={{ color: "red" }}>
                            {" "}
                            {resultGST}%
                          </p>
                        ) : resultGST === 0 ? (
                          <p className="mb-0 h5" style={{ color: "blue" }}>
                            {" "}
                            {resultGST}%
                          </p>
                        ) : resultGST === "NaN" ? (
                          <p className="mb-0 h5" style={{ color: "grey" }}>
                            {" "}
                            0%
                          </p>
                        ) : (
                          <p className="mb-0 h5" style={{ color: "brown" }}>
                            {" "}
                            {resultGST}%
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
                      {RevenueError === "no_data" ||
                        getRevenue.prev_total_gst === null ||
                        getRevenue.prev_total_gst === undefined ||
                        getRevenue.prev_total_gst === "" ? (
                        <p className="h5"> ₹0</p>
                      ) : (
                        <p className="h5">
                          ₹{Number(getRevenue.prev_total_gst).toFixed(2)}{" "}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*  */}
            {/* shipping */}
            <div className="card p-2 col-2 rounded-0 shadow-none">
              <div className=" d-flex mt-0 align-items-end">
                <MdOutlineLocalShipping className="text-success h1 mb-0 mx-2" />
                <h5 className="text-success">Shipping </h5>
              </div>
              <div className="row mt-3">
                <div className="col-12">
                  <div className="row  d-flex flex-column align-items-center">
                    <div className="d-flex align-items-baseline justify-content-between">
                      {RevenueError === "no_data" ||
                        getRevenue.total_shipping_charges === null ||
                        getRevenue.total_shipping_charges === undefined ||
                        getRevenue.total_shipping_charges === "" ? (
                        <h3>₹0</h3>
                      ) : (
                        <h3>
                          {Number(getRevenue.total_shipping_charges).toFixed(2)}
                        </h3>
                      )}
                      <div className="d-flex align-items-center justify-content-center">
                        <AiOutlineArrowRight className="h5 mb-0 mx-2" />

                        {resultShipping > 0 ? (
                          <p className="mb-0 h5" style={{ color: "green" }}>
                            {" "}
                            {resultShipping}%
                          </p>
                        ) : resultShipping < 0 ? (
                          <p className="mb-0 h5" style={{ color: "red" }}>
                            {" "}
                            {resultShipping}%
                          </p>
                        ) : resultShipping === 0 ? (
                          <p className="mb-0 h5" style={{ color: "blue" }}>
                            {" "}
                            {resultShipping}%
                          </p>
                        ) : resultShipping === "NaN" ? (
                          <p className="mb-0 h5" style={{ color: "grey" }}>
                            {" "}
                            0%
                          </p>
                        ) : (
                          <p className="mb-0 h5" style={{ color: "brown" }}>
                            {" "}
                            {resultShipping}%
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
                      {RevenueError === "no_data" ||
                        getRevenue.prev_total_shipping_charges === null ||
                        getRevenue.prev_total_shipping_charges === undefined ||
                        getRevenue.prev_total_shipping_charges === "" ? (
                        <p className="h5"> ₹0</p>
                      ) : (
                        <p className="h5">
                          ₹
                          {Number(
                            getRevenue.prev_total_shipping_charges
                          ).toFixed(2)}{" "}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* net */}

            {/*  */}
          </div>
        </div>
        {/*  */}

        {/* graph */}
        {getRevenue.gross_total_amount ||
          getRevenue.discount_amount ||
          getRevenue.return_total ||
          getRevenue.total_gst ? (
          <HighchartsReact highcharts={Highcharts} options={optionss} />
        ) : null}

        {getRevenue.gross_total_amount ||
          getRevenue.discount_amount ||
          getRevenue.return_total ||
          getRevenue.total_gst ? (
          <HighchartsReact highcharts={Highcharts} options={options} />
        ) : null}
        {/* <div id="chart">
  <ReactApexChart options={option} series={series} type="line" height={350} />
</div> */}

        {/*  */}

        {/* datatable */}

        <DataTable
          columns={columns}
          data={tabledate}
          pagination
          highlightOnHover
          pointerOnHover
          className={"table_body revenue_table"}
        />
      </div>
    </div>
  );
};

export default RevenueReport;
