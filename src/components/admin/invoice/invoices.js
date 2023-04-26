import React, { useState, useMemo, useEffect } from "react";
// import Input from "../common/input";
// import { BsTrash } from "react-icons/bs";
// import { BiEdit } from "react-icons/bi";
import DataTable from "react-data-table-component";
import MainButton from "../common/button";
// import SweetAlert from "sweetalert-react";
import "sweetalert/dist/sweetalert.css";
import FilterComponent from "../common/FilterComponent";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const InvoiceList = () => {
  const navigate = useNavigate();
  // const handleAlert = () => setAlert(true);
  // const hideAlert = () => setAlert(false);
  // const [Alert, setAlert] = useState(false);
  const [invoice, setInvoice] = useState([]);
  let [searcherror, setsearcherror] = useState(false);
  let [apicall, setapicall] = useState(false);
  const [SearchInvo, setSearchInvo] = useState({
    search: "",
    from_date: "",
    to_date: "",
  });
  let token = localStorage.getItem("token");

  const InvoiceCheck = (id) => {
    localStorage.setItem("invoiceid", id[1]);
    localStorage.setItem("invoice_no", id[0]);
    if (id[0] === undefined || id[0] === "" || id[0] === null) {
    } else {
      navigate("/invoice_detail");
    }
  };

  useEffect(() => {
    function getInvoiceList() {
      try {
        axios
          .get(`${process.env.REACT_APP_BASEURL}/invoice_list`, {
            headers: {
              admin_token: token,
            },
          })
          .then((response) => {
            let data = response.data;

            setInvoice(data);
            setapicall(false);
          });
      } catch (err) {
        console.log(err);
      }
    }

    getInvoiceList();
  }, [apicall]);

  const onValueChange = (e) => {
    setSearchInvo({ ...SearchInvo, [e.target.name]: e.target.value });
    setsearcherror(false);
  };
  const onDateChange = (e) => {
    let mdate = moment(e.target.value).format("YYYY-MM-DD");
    setSearchInvo({
      ...SearchInvo,
      [e.target.name]: mdate,
    });
    setsearcherror(false);
  };
  const SearchInvoices = () => {
    if (
      SearchInvo.search === "" &&
      SearchInvo.from_date === "" &&
      SearchInvo.to_date === ""
    ) {
      setsearcherror(true);
    } else {
      axios
        .post(
          `${process.env.REACT_APP_BASEURL_0}/invoice_search`,
          {
            search: "",
            from_date: `${SearchInvo.from_date}`,
            to_date: `${SearchInvo.to_date}`,
          },
          {
            headers: { admin_token: `${token}` },
          }
        )
        .then((response) => {
          setInvoice(response.data);
          setSearchInvo({
            search: "",
            from_date: "",
            to_date: "",
          });
          setsearcherror(false);
        });
    }
  };
  const columns = [
    {
      name: "Order No.",
      selector: (row) => row.id,
      sortable: true,
      width: "75px",
    },
    {
      name: "Invoice Number",
      selector: (row) => (
        <p onClick={InvoiceCheck.bind(this, [row.invoice_no, row.id])}>
          {row.invoice_no}
        </p>
      ),
      sortable: true,
      width: "150px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
    {
      name: "Vendor Id",
      selector: (row) => <p>{row.vendor_id}</p>,
      sortable: true,
      width: "150px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
    {
      name: "Invoice Date",
      selector: (row) => moment(row._date).format("YYYY-MM-DD"),
      sortable: true,
      width: "150px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },

    {
      name: "Order Date",
      selector: (row) => moment(row.order_date).format("YYYY-MM-DD"),
      sortable: true,
      width: "140px",
      center: true,
      style: {
        paddingLeft: "0px",
      },
    },
    {
      name: "Stock",
      selector: (row) => row.payment_mode,
      sortable: true,
      width: "100px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
    {
      name: "Quantity",
      selector: (row) => row.total_quantity,
      sortable: true,
      width: "100px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
    {
      name: "Tax",
      selector: (row) => Number(row.total_gst).toFixed(2),
      sortable: true,
      width: "90px",
      center: true,
      style: {
        paddingLeft: "0px",
      },
    },

    {
      name: "Taxable Value",
      selector: (row) => Number(row.taxable_value).toFixed(2),
      sortable: true,
      width: "90px",
      center: true,
      style: {
        paddingLeft: "0px",
      },
    },
    {
      name: "Discount/Coupon",
      selector: (row) => Number(row.discount_coupon_value).toFixed(2),
      sortable: true,
      width: "120px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
    {
      name: "Total",
      selector: (row) => Number(row.total_amount).toFixed(2),
      sortable: true,
      width: "100px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
  ];
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    false
  );
  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };
    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);
  //

  /*<---Function to reset Search--->*/
  const OnReset = () => {
    setSearchInvo({ search: "", from_date: "", to_date: "" });

    setapicall(true);
    setsearcherror(false);
  };
  let date = moment();
  let currentDate = date.format("YYYY-MM-DD");
  return (
    <div className="App productlist_maindiv">
      <h2>Invoice</h2>

      {/* search bar */}
      <div className="card mt-3 p-3 ">
        <div className="row pb-3">
          <div className="col-md-3 col-sm-6 aos_input mb-2 ">
            <input
              className="adminsideinput"
              type={"text"}
              placeholder="Search by order no.and vendor id"
              value={SearchInvo.search}
              name={"search"}
              onChange={(e) => onValueChange(e)}
            />
            {searcherror === true ? (
              <small className="text-danger">please fill the feild</small>
            ) : null}
          </div>
          <div className="col-md-3 col-sm-6 aos_input mb-2">
            <input
              type={"date"}
              placeholder={"Search by Order Date"}
              onChange={(e) => onDateChange(e)}
              value={SearchInvo.from_date}
              name={"from_date"}
              className={"adminsideinput"}
              max={currentDate}
            />
          </div>
          <div className="col-md-3 col-sm-6 aos_input mb-2">
            <input
              type={"date"}
              min={SearchInvo.from_date}
              placeholder={"Search by Order End_Date"}
              onChange={(e) => onDateChange(e)}
              value={SearchInvo.to_date}
              name={"to_date"}
              className={"adminsideinput"}
            />
          </div>
          <div className="col-md-3 col-sm-6 aos_input mb-2">
            <MainButton
              btntext={"Search"}
              btnclass={"button main_button w-100"}
              type="search"
              onClick={() => SearchInvoices()}
            >
              Search
            </MainButton>
          </div>
          <div className="col-md-3 col-sm-6 aos_input mb-2 mb-2 ">
            <MainButton
              btntext={"Reset"}
              btnclass={"button main_button w-100"}
              type="reset"
              onClick={OnReset}
            />
          </div>
        </div>

        {/* upload */}

        {/* datatable */}

        <DataTable
          columns={columns}
          data={invoice}
          pagination
          highlightOnHover
          pointerOnHover
          className={"table_body invoic_table"}
          subHeader
          subHeaderComponent={subHeaderComponent}
        />
      </div>
    </div>
  );
};
export default InvoiceList;
