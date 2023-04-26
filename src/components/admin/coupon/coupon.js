import React, { useEffect, useState, useRef } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import DataTable from "react-data-table-component";
import MainButton from "../common/button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Iconbutton from "../common/iconbutton";
import { Badge } from "react-bootstrap";
import SAlert from "../common/salert";
import axios from "axios";
import moment from "moment";
const Coupon = () => {
  const token = localStorage.getItem("token");
  const formRef = useRef();
  const [validated, setValidated] = useState(false);
  const [searcherror, setsearcherror] = useState(false);
  const [coupondata, setcoupondata] = useState([]);


  const [addcoupondata, setaddcoupondata] = useState({
    campaign_name: "",
    code: "",
    product_type: "",
    start_date: "",
    end_date: "",
    minimum_amount: "",
    percentage: "",
    status: "",
    image: "",
  });

  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [Alert, setAlert] = useState(false);
  const [show, setShow] = useState(false);
  const [apicall, setapicall] = useState(false);
  const [dltapicall, setDltapicall] = useState(false);
  const [cid, setCId] = useState(false);
  const [AddAlert, setAddAlert] = useState(false);
  const [UpdateAlert, setUpdateAlert] = useState(false);
  const [searchcoupon, setsearchCoupon] = useState([]);
  console.log(searchcoupon)
  const [SearchCoup, setSearchCoup] = useState({
    campaign_name: "",
    code: "",
    status: "",
  });

  const handleAlert = (id) => {
    setAlert(true);
    setCId(id);
  };
  const closeAddAlert = () => {
    setAddAlert(false);
    setDltapicall(false)
  };

  const closeUpdateAlert = () => {
    setUpdateAlert(false);
  };

  const hideAlert = () => {
    axios
      .put(
        `${process.env.REACT_APP_BASEURL}/coupons_delete`,
        {
          id: `${cid}`,
          is_active: "0",
        },
        {
          headers: {
            admin_token: token,
          },
        }
      )
      .then((response) => {
        setapicall(true);
        setAlert(false);
      });
  };
  const CancelAlert = () => {
    setAlert(false);
  };
  const handleClose = () => {
    formRef.current.reset();
    // coupondata("")
    setValidated(false);
    setShow(false);
  };

  const handleShow = (e) => {
    if (e === "add") {
      setShow(e);
    }
    if (e !== "add") {
      try {
        axios
          .get(`${process.env.REACT_APP_BASEURL}/coupon?coupon_id=${e}`)
          .then((response) => {
            let data = response.data[0];
            setaddcoupondata(data);
          });
      } catch (err) { }
      setShow(e);
    }
  };

  useEffect(() => {
    function getCouponList() {
      try {
        axios
          .get(`${process.env.REACT_APP_BASEURL}/coupon?coupon_id=all`, {
            headers: {
              admin_token: token,
            },
          })
          .then((response) => {
            let data = response.data.filter((item) => item.is_active === 1);
            setcoupondata(data);

            setaddcoupondata(data);
            setsearchCoupon(data);
            setapicall(false);
          });
      } catch (err) { }
    }

    getCouponList();
  }, [apicall, dltapicall]);

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      width: "80px",
      center: true,
      style: {
        paddingLeft: 0,
      },
    },

    {
      name: "Campaign Name",
      selector: (row) => row.campaign_name,
      sortable: true,
      width: "180px",
    },
    {
      name: "Code",
      selector: (row) => row.code,
      sortable: true,
      width: "130px",
    },
    {
      name: "Product Type",
      selector: (row) => row.product_type,
      sortable: true,
      width: "140px",
    },
    {
      name: "Start Date",
      selector: (row) => moment(row.start_date).format("YYYY-MM-DD"),
      sortable: true,
      width: "120px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
    {
      name: "End Date",
      selector: (row) => moment(row.end_date).format("YYYY-MM-DD"),
      sortable: true,
      width: "120px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
    {
      name: "Mini Amt",
      selector: (row) => row.minimum_amount,
      sortable: true,
      width: "100px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
    {
      name: "Percentage",
      selector: (row) => row.percentage,
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
        <Badge
          bg={
            row.status === "active"
              ? "success"
              : row.status === "expired"
                ? "danger"
                : row.status === "pending"
                  ? "warning"
                  : null
          }
        >
          {row.status}
        </Badge>
      ),
      sortable: true,
      width: "105px",
      // center: true,
    },

    {
      name: "Image",
      width: "100px",
      center: true,
      cell: (row) => (
        <img
          alt={"apna_organic"}
          src={
            row.image === "no image"
              ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
              : row.image
          }
          style={{
            padding: 10,
            textAlign: "right",
            maxHeight: "100px",
            maxWidth: "100px",
          }}
        />
      ),
    },
    {
      name: "Action",
      width: "100px",
      style: {
        paddingRight: "12px",
        paddingLeft: "0px",
      },
      center: true,
      selector: (row) => (
        <div className={"actioncolimn"}>
          <BiEdit
            className=" p-0 m-0  editiconn text-secondary"
            onClick={handleShow.bind(this, row.id)}
          />
          <BsTrash
            className=" p-0 m-0 editiconn text-danger"
            onClick={handleAlert.bind(this, row.id)}
          />
        </div>
      ),
    },
  ];
  const CouponSearch = (e) => {
    setSearchCoup({ ...SearchCoup, [e.target.name]: e.target.value });
    setsearcherror(false);
  };

  const CoupondataSearch = () => {
    if (
      SearchCoup.campaign_name === "" &&
      SearchCoup.code === "" &&
      SearchCoup.status === ""
    ) {
      setsearcherror(true);
    } else {
      axios
        .post(`${process.env.REACT_APP_BASEURL}/coupons_list`, {
          campaign_name: `${SearchCoup.campaign_name}`,
          code: `${SearchCoup.code}`,
          status: `${SearchCoup.status}`,
        })
        .then((response) => {
          let data = response.data.filter((item) => (item.is_active = 1));
          setcoupondata(data);
          // setSearchCoup({
          //   campaign_name: "",
          //   code: "",
          //   status: "",
          // });
          setsearcherror(false);
        });
    }
  };
  /*onclick funtion to Reset the search feild */
  const CoupondataSearchReset = () => {
    setSearchCoup({
      campaign_name: "",
      code: "",
      status: "",
    });
    setapicall(true);
    setsearcherror(false);
  };
  useEffect(() => {
    setcoupondata(coupondata);
  }, []);
  const handleFormChange = (e) => {
    setaddcoupondata({
      ...addcoupondata,
      [e.target.name]: e.target.value,
    });
  };

  const ImgFormChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const AddCouponClick = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      e.preventDefault();
      setValidated(true);
    } else {
      const formData = new FormData();
      formData.append("filename", fileName);
      formData.append("campaign_name", addcoupondata.campaign_name);
      formData.append("code", addcoupondata.code);
      formData.append("product_type", addcoupondata.product_type);
      formData.append(
        "start_date",
        moment(addcoupondata.start_date).format("YYYY-MM-DDThh:mm:00.000")
      );
      formData.append(
        "end_date",
        moment(addcoupondata.end_date).format("YYYY-MM-DDThh:mm:00.000")
      );
      formData.append("minimum_amount", addcoupondata.minimum_amount);
      formData.append("percentage", addcoupondata.percentage);
      formData.append("status", addcoupondata.status);
      formData.append("image", file);
      axios
        .post(`${process.env.REACT_APP_BASEURL_0}/coupons_add`, formData, {
          headers: { admin_token: `${token}` }
        })
        .then((response) => {
          setapicall(true);
          setShow(false);
          setAddAlert(true);
        })
        .catch(function (error) {
          console.log(error);
        });
      formRef.current.reset();
      setValidated(false);
      e.preventDefault();
      formRef.current.reset();
    }
  };

  const UpdateCouponClick = (e) => {
    const formData = new FormData();
    formData.append("filename", fileName);
    formData.append("id", e);
    formData.append("campaign_name", addcoupondata.campaign_name);
    formData.append("code", addcoupondata.code);
    formData.append("product_type", addcoupondata.product_type);
    formData.append(
      "start_date",
      moment(addcoupondata.start_date).format("YYYY-MM-DDThh:mm:00.000")
    );
    formData.append(
      "end_date",
      moment(addcoupondata.end_date).format("YYYY-MM-DDThh:mm:00.000")
    );
    formData.append("minimum_amount", addcoupondata.minimum_amount);
    formData.append("percentage", addcoupondata.percentage);
    formData.append("status", addcoupondata.status);
    formData.append("image", file);

    axios
      .put(`${process.env.REACT_APP_BASEURL_0}/coupon_update`, formData, {
        headers: { admin_token: `${token}` }
      })
      .then((response) => {
        setapicall(true);
        setUpdateAlert(true);
      },
      )
      .catch(function (error) {
        console.log(error);
      });
    formRef.current.reset();
    setValidated(false);
    setaddcoupondata("");
    setShow("");
  };

  let date = moment();
  let currentDate = date.format("YYYY-MM-DD");
  return (
    <div>
      <h2>Coupons</h2>
      {/* search bar */}
      <div className="card mt-3 p-3 ">
        <div className=" row">
          <div className="col-md-3 col-sm-6 aos_input">
            <input
              type={"text"}
              name={"campaign_name"}
              className="form-control"
              onChange={(e) => CouponSearch(e)}
              placeholder={"Search by campaign name"}
              value={SearchCoup.campaign_name}
            />
            {searcherror === true ? (
              <small className="text-danger">please fill the feild</small>
            ) : null}
          </div>
          <div className="col-md-3 col-sm-6 aos_input">
            <input
              type={"text"}
              name={"code"}
              className="form-control"
              onChange={(e) => CouponSearch(e)}
              placeholder={"Search by code name"}
              value={SearchCoup.code}
            />
          </div>
          <div className="col-md-3 col-sm-6 aos_input">
            <Form.Select
              aria-label="Search by category"
              name={"status"}
              onChange={(e) => CouponSearch(e)}
              value={SearchCoup.status}
              className="adminselectbox"
            >
              <option value={""}>Status</option>
              <option value="active">Active</option>
              <option value="expired">Expired</option>
              <option value="pending">Pending</option>
            </Form.Select>
          </div>

          <div className="col-md-3 col-sm-6 aos_input">
            <MainButton
              btntext={"Search"}
              btnclass={"button main_button w-100"}
              onClick={CoupondataSearch}
            />
          </div>
          <div className="col-md-3 col-sm-6 aos_input mt-2">
            <MainButton
              btntext={"Reset"}
              btnclass={"button main_button w-100"}
              onClick={CoupondataSearchReset}
            />
          </div>
        </div>

        {/* upload */}

        <div className="product_page_uploadbox my-4">
          <Iconbutton
            btntext={"Add Coupons"}
            onClick={() => handleShow("add")}
            Iconname={<AiOutlinePlus />}
            btnclass={"button main_button adminmainbutton"}
          />
        </div>

        {/* datatable */}
        <Modal
          show={show}
          onHide={() => handleClose()}
          dialogClassName="addproductmainmodal"
          aria-labelledby="example-custom-modal-styling-title"
          centered
        >
          <Form
            className=""
            validated={validated}
            ref={formRef}
            onSubmit={
              show === "add"
                ? (e) => AddCouponClick(e)
                : (show) => UpdateCouponClick(show)
            }
          >
            <Modal.Header closeButton className="addproductheader">
              <Modal.Title id="example-custom-modal-styling-title">
                {show === "add" ? "Add Coupons" : " Update Coupons"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="addproductbody p-2">
              <div className="row p-3 m-0">
                <div className="col-md-6">
                  <Form.Group
                    className="mb-3 aos_input"
                    controlId="formBasicNamel"
                  >
                    <Form.Label>Campaign Name</Form.Label>
                    <Form.Control
                      onChange={(e) => handleFormChange(e)}
                      name="campaign_name"
                      value={addcoupondata.campaign_name}
                      required
                      type="text"
                      placeholder="campaign_name"
                    />
                    <Form.Control.Feedback type="invalid" className="h6">
                      Please fill name
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group
                    className="mb-3 aos_input"
                    controlId="formBasicCategoryType"
                  >
                    <Form.Label>Category Type</Form.Label>
                    <Form.Select
                      aria-label="Search by category type"
                      required
                      className="adminselectbox"
                      onChange={(e) => handleFormChange(e)}
                      name={"product_type"}
                      value={addcoupondata.product_type}
                    >
                      <option value={""}>Search by category type</option>
                      <option value="Grocery">Grocery</option>
                      <option value="Health">Health</option>
                      <option value="Sports & Accessor">
                        Sports & Accessor
                      </option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid" className="h6">
                      Please fill category type
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group
                    className="mb-3 aos_input"
                    controlId="formBasicCode"
                  >
                    <Form.Label>Coupon Code</Form.Label>
                    <Form.Control
                      onChange={(e) => handleFormChange(e)}
                      name="code"
                      value={addcoupondata.code}
                      required
                      type="text"
                      placeholder="Coupon Code"
                    />
                    <Form.Control.Feedback type="invalid" className="h6">
                      Please fill coupon code
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group
                    className="mb-3 aos_input"
                    controlId="formBasicAmount"
                  >
                    <Form.Label>Minimum Amount</Form.Label>
                    <Form.Control
                      onChange={(e) => handleFormChange(e)}
                      name="minimum_amount"
                      value={addcoupondata.minimum_amount}
                      required
                      type="number"
                      placeholder="Minimum Amount Required"
                    />
                    <Form.Control.Feedback type="invalid" className="h6">
                      Please fill minimum amount
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group
                    className="mb-3 aos_input"
                    controlId="formBasicPercent"
                  >
                    <Form.Label>Discount Percentage</Form.Label>
                    <Form.Control
                      onChange={(e) => handleFormChange(e)}
                      name="percentage"
                      value={addcoupondata.percentage}
                      required
                      type="number"
                      placeholder="Discount Percentage"
                    />
                    <Form.Control.Feedback type="invalid" className="h6">
                      Please fill percentage
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group
                    className="mb-3 aos_input"
                    controlId="formBasicPercent"
                  >
                    <Form.Label>Status</Form.Label>
                    <Form.Select
                      onChange={(e) => handleFormChange(e)}
                      name="status"
                      value={addcoupondata.status}
                    >
                      <option value={""}>Status</option>
                      <option value="active">Active</option>
                      <option value="expired">Expired</option>
                      <option value="pending">Pending</option>
                    </Form.Select>
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group
                    className="mb-3 aos_input"
                    controlId="formBasicStartDate"
                  >
                    <Form.Label>Coupon Start Date</Form.Label>
                    <Form.Control
                      onChange={(e) => handleFormChange(e)}
                      name="start_date"
                      min={currentDate}
                      value={moment(addcoupondata.start_date).format(
                        "YYYY-MM-DD"
                      )}
                      required
                      type="date"
                      placeholder="Coupon Start Date"
                    />
                    <Form.Control.Feedback type="invalid" className="h6">
                      Please fill start date
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>{" "}
                <div className="col-md-6">
                  <Form.Group
                    className="mb-3 aos_input"
                    controlId="formBasicEndDate"
                  >
                    <Form.Label>Coupon End Date</Form.Label>
                    <Form.Control
                      onChange={(e) => handleFormChange(e)}
                      name="end_date"
                      min={moment(addcoupondata.start_date).format(
                        "YYYY-MM-DD"
                      )}
                      value={moment(addcoupondata.end_date).format(
                        "YYYY-MM-DD"
                      )}
                      required
                      type="date"
                      placeholder="Coupon End Date"
                    />
                    <Form.Control.Feedback type="invalid" className="h6">
                      Please fill end date
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group
                    className="mb-3 aos_input"
                    controlId="formBasicEmail"
                  >
                    <Form.Label>Coupon Image</Form.Label>
                    <Form.Control
                      type="file"
                      placeholder="Coupon Image"
                      onChange={(e) => ImgFormChange(e)}
                      name="image"
                    />
                    {addcoupondata.image ? (
                      <img src={addcoupondata.image} alt="" width={"90px"} />
                    ) : null}
                  </Form.Group>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer className="addproductfooter">
              <Iconbutton
                btntext={"Cancel"}
                onClick={() => handleClose()}
                btnclass={"button main_outline_button adminmainbutton px-2"}
              />
              <Iconbutton
                type={"submit"}
                btntext={show === "add" ? "Add Coupons" : "Update Coupons"}
                onClick={
                  show === "add"
                    ? AddCouponClick
                    : () => UpdateCouponClick(show)
                }
                btnclass={"button main_button "}
              />
            </Modal.Footer>
          </Form>
        </Modal>
        <DataTable
          columns={columns}
          data={coupondata}
          pagination
          highlightOnHover
          pointerOnHover
          className={"table_body coupon_table"}
        />
        <SAlert
          show={Alert}
          title="Coupoan"
          text="Are you Sure you want to delete"
          onConfirm={hideAlert}
          showCancelButton={true}
          onCancel={CancelAlert}
        />
        <SAlert
          show={AddAlert}
          title="Added Coupon Successfully "
          onConfirm={closeAddAlert}
        />
        <SAlert
          show={UpdateAlert}
          title="Updated Coupan Successfully "
          onConfirm={closeUpdateAlert}
        />
      </div>
    </div>
  );
};

export default Coupon;
