import React, { useEffect, useRef, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import DataTable from "react-data-table-component";
import MainButton from "../common/button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Badge } from "react-bootstrap";
import axios from "axios";
import moment from "moment";
import SAlert from "../common/salert";

const Review = () => {
  const formRef = useRef();
  const [validated, setValidated] = useState(false);
  const [apicall, setapicall] = useState(false);
  const [reviewdata, setreviewdata] = useState([]);
  const [addreviewdata, setaddreviewdata] = useState([]);
  const [UpdateAlert, setUpdateAlert] = useState(false);
  const [editreviewdata, seteditreviewdata] = useState({
    id: "",
    status: "",
    note: "",
  });
  let [searcherror, setsearcherror] = useState(false);
  const token = localStorage.getItem("token");
  const handleAlert = () => setAlert(true);
  const hideAlert = () => setAlert(false);
  const [Alert, setAlert] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const closeUpdateAlert = () => {
    setUpdateAlert(false);
  };

  const handleShow = (e) => {
    axios
      .post(
        `${process.env.REACT_APP_BASEURL}/review_list`,
        {
          id: `${e}`,
        },
        {
          headers: {
            admin_token: token,
          },
        }
      )

      .then((response) => {
        setaddreviewdata(response.data[0]);

        seteditreviewdata({
          ...editreviewdata,
          id: response.data[0].id,
          status: response.data[0].status,
          note: response.data[0].note,
        });

        setapicall(false);
      })
      .catch(function (error) {
        console.log(error);
      });
    setShow(true);
  };
  const [searchdata, setsearchData] = useState({
    product_name: "",
    category_type: "",
    status: "",
  });

  const OnSearchChange = (e) => {
    setsearchData({ ...searchdata, [e.target.name]: e.target.value });
    setsearcherror(false);
  };

  const onSearchClick = () => {
    if (
      searchdata.product_name === "" &&
      searchdata.category_type === "" &&
      searchdata.status === ""
    ) {
      setsearcherror(true);
    } else {
      axios
        .post(
          `${process.env.REACT_APP_BASEURL}/review_list`,
          {
            product_name: `${searchdata.product_name}`,
            category_type: `${searchdata.category_type}`,
            status: `${searchdata.status}`,
          },
          {
            headers: {
              admin_token: token,
            },
          }
        )
        .then((response) => {
          setreviewdata(response.data);
          setapicall(false);
          setsearcherror(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  /*onclick funtion to Reset the search feild */
  const onReset = () => {
    setsearchData({
      product_name: "",
      category_type: "",
      status: "",
    });
    setapicall(true);
    setsearcherror(false);
  };

  const handleFormChange = (e) => {
    seteditreviewdata({
      ...editreviewdata,
      [e.target.name]: e.target.value,
    });
  };

  const UpdateCategoryClick = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
    } else {
      e.preventDefault();
      axios
        .put(`${process.env.REACT_APP_BASEURL}/review_approved`, editreviewdata)
        .then(
          (response) => {
            setShow(false);
            setapicall(true);
            setUpdateAlert(true);
          },
          {
            headers: {
              admin_token: token,
            },
          }
        )
        .catch(function (error) {
          console.log(error);
        });
      setValidated(false);
    }
  };
  useEffect(() => {
    axios
      .post(
        `${process.env.REACT_APP_BASEURL}/review_list`,
        {
          product_name: "",
          category_type: "",
          status: "",
        },
        {
          headers: {
            admin_token: token,
          },
        }
      )
      .then((response) => {
        setreviewdata(response.data);
        setapicall(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [apicall]);

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      width: "150px",
      center: true,
      style: {
        paddingLeft: 0,
      },
    },

    {
      name: "Product Name",
      selector: (row) => row.product_name,
      sortable: true,
      width: "180px",
    },
    {
      name: "Review Date",
      selector: (row) => moment(row.review_date).format("YYYY-MM-DD"),
      sortable: true,
      width: "150px",
      style: {
        paddingRight: "12px",
        paddingLeft: "0px",
      },
      center: true,
    },
    {
      name: "Comment",
      selector: (row) => row.comment,
      sortable: true,
      width: "150px",

      style: {
        paddingRight: "12px",
        paddingLeft: "12px",
      },
      center: true,
    },
    {
      name: "Status",
      selector: (row) => (
        <Badge
          bg={
            row.status === "approve"
              ? "success"
              : row.status === "reject"
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
      width: "120px",
      // center: true,
    },
    {
      name: "Action",
      width: "150px",
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
            onClick={handleAlert}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <h2>Review</h2>

      {/* search bar */}
      <div className="card mt-3 p-3 ">
        <div className=" row">
          <div className="col-md-3 col-sm-6 aos_input">
            <input
              type={"text"}
              placeholder={"Search by product name"}
              name={"product_name"}
              onChange={(e) => OnSearchChange(e)}
              value={searchdata.product_name}
              className={"adminsideinput"}
            />
            {searcherror === true ? (
              <small className="text-danger">please fill the feild</small>
            ) : null}
          </div>
          <div className="col-md-3 col-sm-6 aos_input">
            <Form.Select
              aria-label="Search by status"
              className="adminselectbox"
              onChange={(e) => OnSearchChange(e)}
              name={"status"}
              value={searchdata.status}
            >
              <option value={""}>Search by status</option>
              <option value="approve">Approve</option>
              <option value="reject">Reject</option>
              <option value="pending">Pending</option>
            </Form.Select>
          </div>

          <div className="col-md-3 col-sm-6 aos_input">
            <MainButton
              btntext={"Search"}
              btnclass={"button main_button w-100"}
              onClick={() => onSearchClick()}
            />
          </div>
          <div className="col-md-3 col-sm-6 aos_input">
            <MainButton
              btntext={"Reset"}
              btnclass={"button main_button w-100"}
              onClick={() => onReset()}
            />
          </div>
        </div>

        {/* upload */}

        <div className="product_page_uploadbox my-4"></div>

        {/* datatable */}
        <Modal size="md" show={show} onHide={handleClose}>
          <Form
            className=""
            validated={validated}
            ref={formRef}
            onSubmit={(e) => UpdateCategoryClick(e)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Update Review Info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row p-3 m-0">
                <div className="col-md-6">
                  <Form.Group
                    className="mb-3 aos_input flex-column d-flex"
                    controlId="formBasicEmail"
                  >
                    <Form.Label className="mb-0">Order Id</Form.Label>
                    <Form.Text className="mt-0">{addreviewdata.id}</Form.Text>
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group
                    className="mb-3 aos_input flex-column d-flex"
                    controlId="formBasicEmail"
                  >
                    <Form.Label className="mb-0">Product Name</Form.Label>
                    <Form.Text className="mt-0">
                      {addreviewdata.product_name}
                    </Form.Text>
                  </Form.Group>
                </div>
                <div className="col-md-12">
                  <Form.Group
                    className="mb-3 aos_input flex-column d-flex"
                    controlId="formBasicEmail"
                  >
                    <Form.Label className="mb-0">Review</Form.Label>
                    <Form.Text className="mt-0">
                      {addreviewdata.comment}
                    </Form.Text>
                  </Form.Group>
                </div>
                <div className="col-md-12">
                  <Form.Group
                    className="mb-3 aos_input flex-column d-flex"
                    controlId="formBasicEmail"
                  >
                    <div className="col-md-6">
                      <Form.Group
                        className="mb-3 aos_input"
                        controlId="formBasicEmail"
                      >
                        <Form.Label>Status</Form.Label>
                        <Form.Select
                          aria-label="Status"
                          className="adminselectbox"
                          placeholder="Status"
                          name="status"
                          value={editreviewdata.status}
                          onChange={(e) => handleFormChange(e)}
                        >
                          <option value={""}>Status</option>
                          <option value="reject">Reject</option>
                          <option value="pending">Pending</option>
                          <option value="approve">Approve</option>
                        </Form.Select>
                      </Form.Group>
                    </div>
                    <Form.Label className="mb-0">Note</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      className="mt-0"
                      name="note"
                      value={editreviewdata.note}
                      onChange={(e) => handleFormChange(e)}
                    >
                      {" "}
                    </Form.Control>
                  </Form.Group>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                className="button main_outline_button"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button className="button main_button" type="submit">
                Update
              </button>
            </Modal.Footer>
          </Form>
        </Modal>
        <DataTable
          columns={columns}
          data={reviewdata}
          pagination
          highlightOnHover
          pointerOnHover
          className={"table_body review_table"}
        />
        <SAlert
          show={Alert}
          title="Review"
          text="Are you Sure you want to delete"
          onConfirm={hideAlert}
          showCancelButton={true}
          onCancel={hideAlert}
        />
        <SAlert
          show={UpdateAlert}
          title="Updated Review Successfully "
          onConfirm={closeUpdateAlert}
        />
      </div>
    </div>
  );
};

export default Review;
