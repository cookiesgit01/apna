import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import MainButton from "../common/button";
import Form from "react-bootstrap/Form";
import SweetAlert from "sweetalert-react";
import "sweetalert/dist/sweetalert.css";
import axios from "axios";
import BrandJson from "./../json/BrandJson";
import moment from "moment";
import Loader from "../common/loader";

const Expiredproduct = () => {
  const handleClick = () => { };
  const hideAlert = () => setAlert(false);
  const [Alert, setAlert] = useState(false);
  const [loading, setloading] = useState(false);
  const [apicall, setapicall] = useState(false);
  let [searcherror, setsearcherror] = useState(false);
  const [expiredata, setexpiredata] = useState([]);
  const currentdate = moment().format("YYYY-MM-DD");
  const [filtervategory, setfiltercategory] = useState([]);
  const [vendorid, setVendorId] = useState([]);
  const [searchdata, setsearchData] = useState({
    product_title_name: "",
    manufacturing_date: "",
    category: "",
    vendor: "",
    brand: "",
  });
  let token = localStorage.getItem("token");
  // 'category:',searchdata.category,
  // 'vendot:',searchdata.vendor,
  // 'brand:',searchdata.brand,
  // 'error:',searcherror);
  const OnSearchChange = (e) => {
    setsearchData({ ...searchdata, [e.target.name]: e.target.value });
    setsearcherror(false);
  };

  /*<---Category list api---> */
  const getCategorydatafilter = () => {
    try {
      axios
        .get(`${process.env.REACT_APP_BASEURL_0}/category?category=all`)
        .then((response) => {
          let cgory = response.data;
          setfiltercategory(cgory);
        });
    } catch (err) { }
  };
  /*<---Category list api---> */
  const getVendorData = () => {
    try {
      axios
        .post(
          `${process.env.REACT_APP_BASEURL_0}/vendors`,
          { vendor_id: "all" },
          {
            headers: { admin_token: `${token}` },
          }
        )
        .then((response) => {
          let cgory = response.data;

          const result = cgory.filter(
            (thing, index, self) =>
              index === self.findIndex((t) => t.shop_name === thing.shop_name)
          );
          const result1 = result.filter(
            (item) => item.status === "approved" || item.status === "active"
          );
          setVendorId(result1);
        });
    } catch (err) {
      console.log(err);
    }
  };
  // const OnDateChange = (e) => {
  //   let mdate = moment(e.target.value).format("YYYY-MM-DD");
  //   setsearchData({ ...searchdata, manufacturing_date: mdate });
  // };
  useEffect(() => {
    let productArry = [];
    setloading(true);
    axios
      .post(`${process.env.REACT_APP_BASEURL_0}/home?page=0&per_page=400`, {
        product_search: {
          search: [`${searchdata.product_title_name}`],
          price_from: "",
          price_to: "",
          id: "",
          product_title_name_asc_desc: "",
          sale_price: "",
          short_by_updated_on: "",
          // product_title_name: ,
          manufacturing_date: [`${searchdata.manufacturing_date}`],
          category: [`${searchdata.category}`],
          brand: [`${searchdata.brand}`],
          shop: [`${searchdata.vendor}`],
          // expire_date: [`${currentdate}`],
        },
      })
      .then((response) => {
        // let data = response.data.results;
        let v = response.data.results;
        v.forEach(function (item, index) {
          // console.log(item.category)
          // console.log(response.data.category_name[item.category])
          let catname = response.data.category_name[item.category]
          // console.log(catname)
          // console.log(item)
          item.category = catname;
          // console.log("item"+JSON.stringify(item))

          productArry.push(item)
        })
        let response_data = {};
        response_data["results"] = productArry;
        if (v === "" || v === null || v === undefined) {
        } else {
          let data_Array = v.filter((arr) => {
            if (arr.expire_date < currentdate) {
            }
            return arr;

          });
          setexpiredata(data_Array);
          setapicall(false);
          setsearcherror(false);
          setloading(false);
        }
      });
    getCategorydatafilter();
    getVendorData();
  }, [apicall]);
  const columns = [
    {
      name: "#",
      width: "100px",
      center: true,
      cell: (row) => (
        <img
          alt={"apna_organic"}
          src={
            row.all_images
              ? row.all_images
              : "https://t3.ftcdn.net/jpg/05/37/73/58/360_F_537735846_kufBp10E8L4iV7OLw1Kn3LpeNnOIWbvf.jpg"
          }
          style={{
            padding: 10,
            textAlign: "right",
            maxHeight: "100px",
            maxWidth: "100px",
          }}
          onClick={() => handleClick()}
        />
      ),
    },
    {
      name: "Product Name",
      selector: (row) => (
        <div>
          <p className="mb-1">
            <b>
              {row.product_title_name}
              <br />
            </b>
            {/* Product ID: {row.product_id} <br /> */}
            <span className="d-flex flex-column ">
              {row.is_featured === 1 ? (
                <span className={"badge bg-warning mt-1"}>
                  {"featured product"}
                </span>
              ) : null}
              {row.is_special_offer === 1 ? (
                <span className={"badge bg-info mt-1"}>{"special offer"}</span>
              ) : null}
            </span>
          </p>
        </div>
      ),
      sortable: true,
      width: "200px",
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
      width: "90px",
    },
    {
      name: "Vendor",
      selector: (row) => row.shop,
      sortable: true,
      width: "90px",
    },
    {
      name: "Product Type",
      selector: (row) => row.product_type,
      sortable: true,
      width: "90px",
    },
    {
      name: "Brand",
      selector: (row) => row.brand,
      sortable: true,
      width: "100px",
    },
    {
      name: "Mrp",
      selector: (row) => (
        <p className="m-0">
          <b>MRP :</b>₹ {Number(row.mrp).toFixed(2)} <br />
          <b>Discount : </b>
          {Number(row.discount).toFixed(2)}%
          {/* {row.discount === "0" ? null : row.discount + "%"}{" "} */}
          <br />
          <b>Product Price:</b>₹ {Number(row.product_price).toFixed(2)} <br />
          <b>Sale Price:</b>₹ {Number(row.sale_price).toFixed(2)} <br />
        </p>
      ),
      sortable: true,
      width: "130px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },

    {
      name: "Tax",
      selector: (row) => (
        <div className="d-flex flex-column">
          <b>
            Total:
            {Number(row.gst) +
              Number(row.cgst) +
              Number(row.sgst) +
              Number(row.wholesale_sales_tax) +
              Number(row.retails_sales_tax) +
              Number(row.manufacturers_sales_tax) +
              Number(row.value_added_tax) +
              "%"}{" "}
          </b>{" "}
          <div className="d-flex">
            <b>Gst :</b>₹ {Number(row.gst).toFixed(2)}%<b>Cgst : </b>
            {Number(row.cgst).toFixed(2)}%
            {/* {row.discount === "0" ? null : row.discount + "%"}{" "} */}
            <b>Sgst:</b> {Number(row.sgst).toFixed(2)}%
          </div>
          <div className="d-flex flex-column">
            <b>
              wholesale_sales_tax:{Number(row.wholesale_sales_tax).toFixed(2)}%
            </b>{" "}
            <b>retails_sales_tax:{Number(row.retails_sales_tax).toFixed(2)}%</b>{" "}
            <b>value_added_tax:{Number(row.value_added_tax).toFixed(2)}% </b>
            <b>
              manufacturers_sales_tax:{" "}
              {Number(row.manufacturers_sales_tax).toFixed(2)}%
            </b>{" "}
          </div>
        </div>
      ),

      sortable: true,
      width: "200px",
      center: true,
      style: {
        paddingLeft: "0px",
      },
    },
    {
      name: "SP",
      selector: (row) => row.sale_price.toFixed(2),
      sortable: true,
      width: "100px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
    {
      name: "Qty",
      selector: (row) => row.quantity,
      sortable: true,
      width: "120px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },

    {
      name: "MDate",
      selector: (row) => moment(row.manufacturing_date).format("DD-MM-YYYY"),
      sortable: true,
      width: "150px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
    {
      name: "EDate",
      selector: (row) => moment(row.expire_date).format("DD-MM-YYYY"),
      sortable: true,
      width: "150px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
  ];
  const onSearchClick = () => {
    if (
      searchdata.product_title_name === "" &&
      searchdata.category === "" &&
      searchdata.manufacturing_date === "" &&
      searchdata.brand === "" &&
      searchdata.vendor === ""
    ) {
      setsearcherror(true);
    } else {
      setsearcherror(false);
      setapicall(true);
    }
  };

  const OnReset = () => {
    setsearchData({
      product_title_name: "",
      manufacturing_date: "",
      vendor: "",
      brand: "",
      category: "",
    });
    setapicall(true);
    setsearcherror(false);
  };
  return (
    <>
      {loading === true ? <Loader /> : null}
      <div>
        <h2>Expired Products</h2>

        {/* search bar */}
        <div className="card mt-3 p-3 ">
          <div className="row pb-3">
            <div className="col-md-3 col-sm-6 aos_input">
              <input
                type={"text"}
                placeholder={"Search by product name"}
                onChange={OnSearchChange}
                name="product_title_name"
                value={searchdata.product_title_name}
                className={"form-control"}
              />{" "}
              {searcherror === true ? (
                <small className="text-danger">please fill the feild</small>
              ) : null}
            </div>
            <div className="col-md-2 col-sm-6 aos_input">
              <Form.Select
                aria-label="Search by status"
                className="adminselectbox"
                placeholder="Search by category"
                onChange={OnSearchChange}
                name="category"
                value={String(searchdata.category)}
              >
                <option value={""}>Select Category</option>
                {(filtervategory || []).map((data, i) => {
                  return (
                    <option value={data.id} key={i}>
                      {" "}
                      {data.category_name}
                    </option>
                  );
                })}
              </Form.Select>
            </div>
            <div className="col-md-2 col-sm-6 aos_input">
              <Form.Select
                aria-label="Search by status"
                className="adminselectbox"
                placeholder="Search by vendor"
                onChange={OnSearchChange}
                name="vendor"
                value={String(searchdata.vendor)}
              >
                <option value={""}>Select Vendor</option>
                {(vendorid || []).map((data, i) => {
                  return (
                    <option value={data.shop_name} key={i}>
                      {" "}
                      {data.shop_name}
                    </option>
                  );
                })}
              </Form.Select>
            </div>
            <div className="col-md-2 col-sm-6 aos_input">
              <Form.Select
                aria-label="Search by brand"
                className="adminselectbox"
                placeholder="Search by brand"
                onChange={OnSearchChange}
                name="brand"
                value={String(searchdata.brand)}
              >
                <option value={""}>Select Brand</option>
                {(BrandJson.BrandJson || []).map((data, i) => {
                  return (
                    <option value={data} key={i}>
                      {" "}
                      {data}
                    </option>
                  );
                })}
              </Form.Select>
            </div>
            <div className="col-md-3 col-sm-6 aos_input ">
              <MainButton
                onClick={onSearchClick}
                btntext={"Search"}
                btnclass={"button main_button w-100"}
              />
            </div>
            <div className="col-md-3 col-sm-6 aos_input mt-2">
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
            data={expiredata}
            pagination
            highlightOnHover
            pointerOnHover
            className={"table_body expired_product_table"}
          />
          <SweetAlert
            show={Alert}
            title="Product Name"
            text="Are you Sure you want to delete"
            onConfirm={hideAlert}
            showCancelButton={true}
            onCancel={hideAlert}
          />
        </div>
      </div>
    </>
  );
};

export default Expiredproduct;
