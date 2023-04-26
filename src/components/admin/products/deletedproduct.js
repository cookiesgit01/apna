import React, { useEffect, useState } from "react";
import { MdOutlineRestore } from "react-icons/md";
import DataTable from "react-data-table-component";
import MainButton from "../common/button";
import Form from "react-bootstrap/Form";
import Iconbutton from "../common/iconbutton";
import SweetAlert from "sweetalert-react";
import "sweetalert/dist/sweetalert.css";
import axios from "axios";
import BrandJson from "./../json/BrandJson";
import Loader from "../common/loader";

const Deletedproduct = () => {
  const [id, setId] = useState();
  const [productid, setProductId] = useState();
  let [searcherror, setsearcherror] = useState(false);
  const [RestoreAlert, setRestoreAlert] = useState(false);
  const [filtervategory, setfiltercategory] = useState([]);
  const [vendorid, setVendorId] = useState([]);
  const [loading, setloading] = useState(false);
  const [apicall, setapicall] = useState(false);

  const [deletedata, setdeletedata] = useState([]);
  const [searchdata, setsearchData] = useState({
    product_title_name: "",
    manufacturing_date: "",
    category: "",
    vendor: "",
    brand: "",
  });

  const hideAlert = () => setRestoreAlert(false);
  let token = localStorage.getItem("token");
  const closeRestoreAlert = () => {
    axios
      .put(
        `${process.env.REACT_APP_BASEURL_0}/products_delete_remove`,
        {
          varient_id: id,
          product_id: productid,
          is_delete: "1",
        },
        {
          headers: { admin_token: `${token}` },
        }
      )
      .then((response) => {
        // let data = response.data;
        setapicall(true);
        setRestoreAlert(false);
      });
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
  /*<---vendor list api---> */
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
  const OnSearchChange = (e) => {
    setsearchData({ ...searchdata, [e.target.name]: e.target.value });
    setsearcherror(false);
  };
  const onSearchClick = () => {
    if (
      searchdata.product_title_name === "" &&
      searchdata.manufacturing_date === "" &&
      searchdata.brand === "" &&
      searchdata.category === "" &&
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
      brand: "",
      category: "",
      vendor: "",
    });
    setapicall(true);
    setsearcherror(false);
  };
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
          category: [`${searchdata.category}`],
          brand: [`${searchdata.brand}`],
          shop: [`${searchdata.vendor}`],
          is_delete: ["0"],
          manufacturing_date: [`${searchdata.manufacturing_date}`],
        },
      })
      .then((response) => {
        let v = response.data.results;
        v.forEach(function (item, index) {
          let catname = response.data.category_name[item.category]
          item.category = catname;
          productArry.push(item)

        })
        let response_data = {};
        response_data["results"] = productArry;
        setdeletedata(response_data);
        setapicall(false);
        setsearcherror(false);
        setloading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
    getVendorData();
    getCategorydatafilter();
  }, [apicall]);
  const columns = [
    {
      name: "#",
      width: "150px",
      center: true,
      cell: (row) => (
        <img
          height="90px"
          width="70px"
          alt={row.product_title_name}
          src={
            row.all_images
              ? row.all_images
              : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
          }
          style={{
            borderRadius: 10,
            paddingTop: 10,
            paddingBottom: 10,
            textAlign: "right",
          }}
          onClick={handleClick}
        />
      ),
    },
    {
      name: "Product Name",
      selector: (row) => row.product_title_name,
      sortable: true,
      width: "200px",
    },
    {
      name: "Category",
      //     selector: (row) =>{
      //       // console.log(row.cat_catname)
      //       // console.log(row.category)
      //       console.log(cat_catname[row.category])
      //  return(
      //   <>
      //   {row.cat_catname === undefined ? "null":  cat_catname[row.category]}
      //   </>
      //  )

      //     },
      selector: (row) => row.category,
      sortable: true,
      width: "150px",
    },
    {
      name: "Category Id",
      selector: (row) => row.id,
      sortable: true,
      width: "150px",
    },
    {
      name: "Vendor",
      selector: (row) => row.shop,
      sortable: true,
      width: "90px",
    },
    {
      name: "Seo_Tag",
      selector: (row) => row.seo_tag,
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
              Number(row.wholesale_sales_tax) +
              Number(row.retails_sales_tax) +
              Number(row.manufacturers_sales_tax) +
              Number(row.value_added_tax) +
              "%"}{" "}
          </b>{" "}
          <div className="d-flex">
            {row.gst === "0" ? null : (
              <p className="mb-0">
                <b>Gst :</b>
                {Number(row.gst).toFixed(1)}%
              </p>
            )}
            {row.cgst === "0" ? null : (
              <p className="mb-0 mx-1">
                <b>Cgst : </b> {Number(row.cgst).toFixed(1)}%{" "}
              </p>
            )}
            {row.sgst === "0" ? null : (
              <p className="mb-0">
                <b>Sgst:</b> {Number(row.sgst).toFixed(1)}%
              </p>
            )}
          </div>
          <div className="d-flex flex-column">
            {row.wholesale_sales_tax === "0" ? null : (
              <p className="mb-0">
                <b>
                  wholesale_sales_tax:
                  {Number(row.wholesale_sales_tax).toFixed(1)}%
                </b>{" "}
              </p>
            )}
            {row.retails_sales_tax === "0" ? null : (
              <p className="mb-0">
                <b>
                  retails_sales_tax:{Number(row.retails_sales_tax).toFixed(1)}%
                </b>{" "}
              </p>
            )}
            {row.value_added_tax === "0" ? null : (
              <p className="mb-0">
                <b>
                  value_added_tax:{Number(row.value_added_tax).toFixed(1)}%{" "}
                </b>
              </p>
            )}
            {row.manufacturers_sales_tax === "0" ? null : (
              <p className="mb-0">
                <b>
                  manufacturers_sales_tax:{" "}
                  {Number(row.manufacturers_sales_tax).toFixed(1)}%
                </b>{" "}
              </p>
            )}
          </div>
        </div>
      ),

      sortable: true,
      width: "250px",
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
      selector: (row) =>
        row.quantity === "0" || row.quantity === 0 ? (
          <span className="text-danger">Out Of Stock</span>
        ) : (
          row.quantity
        ),
      sortable: true,
      width: "100px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
    {
      name: "Status",
      selector: (row) => (
        <span
          className={
            row.product_status === "pending" || row.product_status === "1"
              ? "badge bg-warning"
              : row.product_status === "approved"
                ? "badge bg-success"
                : // ? "badge bg-info"
                row.product_status === "draft"
                  ? "badge bg-secondary"
                  : "badge bg-secondary"
          }
        >
          {row.product_status === "pending" || row.product_status === "1"
            ? "Pending"
            : row.product_status === "approved"
              ? "Approved"
              : // : row.product_status === ""
              // ? "Status"
              row.product_status === "draft"
                ? "Draft"
                : "Draft"}
        </span>
      ),
      sortable: true,
      width: "115px",
      // center: true,
    },
    // {
    //   name: "Change Status",
    //   selector: (row) => (
    //     <Form.Select
    //       aria-label="Search by delivery"
    //       size="sm"
    //       className="w-100"
    //       onChange={(e) => onProductStatusChange(e, row.id, row.product_id)}
    //       value={row.product_status}
    //     >
    //       {/* <option value={""}>Status</option> */}
    //       {(productstatus.productstatus || []).map((data, i) => {

    //         return (
    //           <option value={data} key={i}>
    //             {" "}
    //             {data}
    //           </option>
    //         );
    //       })}
    //     </Form.Select>
    //   ),
    //   sortable: true,
    // },

    {
      name: "Action",
      width: "120px",
      style: {
        paddingRight: "12px",
        paddingLeft: "0px",
      },
      selector: (row) => (
        <Iconbutton
          onClick={(e) => OnProductRestore(e, row.id, row.product_id)}
          btntext={"Restore"}
          btnclass={"button bg-warning"}
          Iconname={<MdOutlineRestore className="mx-1" />}
        />
      ),
    },
  ];
  // const columns = [
  //   {
  //     name: "#",
  //     width: "150px",
  //     center: true,
  //     cell: (row) => (
  //       <img
  //         height="90px"
  //         width="70px"
  //         alt={row.product_title_name}
  //         src={
  //           row.all_images
  //             ? row.all_images
  //             : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
  //         }
  //         style={{
  //           borderRadius: 10,
  //           paddingTop: 10,
  //           paddingBottom: 10,
  //           textAlign: "right",
  //         }}
  //         onClick={handleClick}
  //       />
  //     ),
  //   },
  //   {
  //     name: "Product Name",
  //     selector: (row) => row.product_title_name,
  //     sortable: true,
  //     width: "200px",
  //   },
  //   {
  //     name: "Category",
  //     selector: (row) => row.category,
  //     sortable: true,
  //     width: "100px",
  //   },
  //   {
  //     name: "Vendor",
  //     selector: (row) => row.shop,
  //     sortable: true,
  //     width: "90px",
  //   },
  //   {
  //     name: "Brand",
  //     selector: (row) => row.brand,
  //     sortable: true,
  //     width: "100px",
  //   },
  //   {
  //     name: "Mrp",
  //     selector: (row) => row.mrp.toFixed(2),
  //     sortable: true,
  //     width: "90px",
  //     center: true,
  //     style: {
  //       paddingRight: "32px",
  //       paddingLeft: "0px",
  //     },
  //   },
  //   {
  //     name: "Dis(%)",
  //     selector: (row) => row.discount + "%",
  //     sortable: true,
  //     width: "90px",
  //     center: true,
  //     style: {
  //       paddingRight: "32px",
  //       paddingLeft: "0px",
  //     },
  //   },
  //   {
  //     name: "Price",
  //     selector: (row) => row.product_price.toFixed(2),
  //     sortable: true,
  //     width: "100px",
  //     center: true,
  //     style: {
  //       paddingRight: "32px",
  //       paddingLeft: "0px",
  //     },
  //   },

  //   {
  //     name: "Tax",
  //     selector: (row) =>
  //       Number(row.gst) +
  //       Number(row.cgst) +
  //       Number(row.sgst) +
  //       Number(row.wholesale_sales_tax) +
  //       Number(row.retails_sales_tax) +
  //       Number(row.manufacturers_sales_tax) +
  //       Number(row.value_added_tax) +
  //       "%",
  //     sortable: true,
  //     width: "90px",
  //     center: true,
  //     style: {
  //       paddingLeft: "0px",
  //     },
  //   },
  //   {
  //     name: "SP",
  //     selector: (row) => row.sale_price.toFixed(2),
  //     sortable: true,
  //     width: "100px",
  //     center: true,
  //     style: {
  //       paddingRight: "32px",
  //       paddingLeft: "0px",
  //     },
  //   },

  //   {
  //     name: "MDate",
  //     selector: (row) => moment(row.manufacturing_date).format("yyyy-MM-DD"),
  //     sortable: true,
  //     width: "150px",
  //     center: true,
  //     style: {
  //       paddingRight: "32px",
  //       paddingLeft: "0px",
  //     },
  //   },
  //   {
  //     name: "EDate",
  //     selector: (row) => moment(row.expire_date).format("yyyy-MM-DD"),
  //     sortable: true,
  //     width: "150px",
  //     center: true,
  //     style: {
  //       paddingRight: "32px",
  //       paddingLeft: "0px",
  //     },
  //   },
  //   {
  //     name: "Action",
  //     width: "120px",
  //     style: {
  //       paddingRight: "12px",
  //       paddingLeft: "0px",
  //     },
  //     selector: (row) => (
  //       <Iconbutton
  //         onClick={(e) => OnProductRestore(e, row.id, row.product_id)}
  //         btntext={"Restore"}
  //         btnclass={"button bg-warning"}
  //         Iconname={<MdOutlineRestore className="mx-1" />}
  //       />
  //     ),
  //   },
  // ];
  const OnProductRestore = (e, id, productid) => {
    setRestoreAlert(true);
    setId(id);
    setProductId(productid);
  };

  const handleClick = () => { };
  return (
    <>
      {loading === true ? <Loader /> : null}
      <div>
        <h2>Deleted Products</h2>

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
            <div className="col-md-3 col-sm-6 aos_input">
              <input
                type={"date"}
                value={searchdata.manufacturing_date}
                placeholder={"Search by date"}
                className={"adminsideinput"}
                onChange={OnSearchChange}
                name="manufacturing_date"
              />
            </div>
            <div className="col-md-3 col-sm-6 aos_input mt-2">
              <MainButton
                btntext={"Search"}
                onClick={onSearchClick}
                btnclass={"button main_button w-100"}
              />
            </div>
            <div className="col-md-2 col-sm-6 aos_input mt-2">
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
            data={deletedata.results}
            pagination
            highlightOnHover
            pointerOnHover
            className={"table_body deletedproduct_tabel"}
          />
          <SweetAlert
            show={RestoreAlert}
            title="Restor Successfully "
            onConfirm={closeRestoreAlert}
            onCancel={hideAlert}
            showCancelButton={true}
          />
        </div>
      </div>
    </>
  );
};

export default Deletedproduct;
