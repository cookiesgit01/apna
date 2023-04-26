import React, { useState, useRef, useEffect } from "react";
// import { BsTrash } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import DataTable from "react-data-table-component";
import MainButton from "../common/button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import moment from "moment";
import SAlert from "../common/salert";

const Complaint = () => {
  const formRef = useRef();
  const [validated, setValidated] = useState(false);
  const [complaintdata, setcomplaintdata] = useState([]);
  console.log("DATA--")
  console.log(complaintdata)

  const [UpdateAlert, setUpdateAlert] = useState(false);
  const [editcomplaintdata, seteditcomplaintdata] = useState([]);

  const [complaintdatadetail, setcomplaintdatadetail] = useState({
    id: 1,
    assigned_to: "",
    resolve_date: "",
    status_: "",
    resolve_description: "",
  });
  const [show, setShow] = useState("");
  const [apicall, setapicall] = useState(false);
  let [searcherror, setsearcherror] = useState(false);
  const token = localStorage.getItem("token");

  const handleClose = () => {
    formRef.current.reset();
    setValidated(false);
    setShow(false);
  };

  const closeUpdateAlert = () => {
    setUpdateAlert(false);
  };

  const handleShow = (e) => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/complaint_details?id=${e}`)
      .then((response) => {
        seteditcomplaintdata({
          ...editcomplaintdata,
          id: response.data[0].id,
          assigned_to: response.data[0].assigned_to,
          resolve_date: response.data[0].resolve_date,
          status_: response.data[0].status_,
          resolve_description: response.data[0].resolve_description,
        });
        setcomplaintdatadetail(response.data[0]);
        setapicall(false);
      })
      .catch(function (error) {
        console.log(error);
      });
    setShow(e);
  };
  const [searchdata, setSearchData] = useState({
    id: "",
    status_: "",
    ticket_date: "",
  });

  const OnSearchChange = (e) => {
    setSearchData({ ...searchdata, [e.target.name]: e.target.value });
    setsearcherror(false);
  };

  const onSearchClick = () => {
    if (
      searchdata.id === "" &&
      searchdata.ticket_date === "" &&
      searchdata.status_ === ""
    ) {
      setsearcherror(true);
    } else {
      axios
        .post(
          `${process.env.REACT_APP_BASEURL}/complaint_search`,
          {
            id: `${searchdata.id}`,
            status_: `${searchdata.status_}`,
            ticket_date: `${searchdata.ticket_date}`,
          },
          {
            headers: {
              admin_token: token,
            },
          }
        )
        .then((response) => {
          setcomplaintdata(response.data);
          setapicall(false);
          setsearcherror(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  /*Function to reset thre search feilds */
  const onReset = () => {
    setSearchData({
      id: "",
      status_: "",
      ticket_date: "",
    });
    setapicall(true);
    setsearcherror(false);
  };
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/complaint_details?id=all`)
      .then((response) => {
        setcomplaintdata(response.data);
        setapicall(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [apicall]);

  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
      width: "75px",
    },
    {
      name: "Order Id",
      selector: (row) => row.order_id,
      sortable: true,
      width: "150px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },

    {
      name: "Subject",
      selector: (row) => row.subject,
      sortable: true,
      width: "180px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
    {
      name: "Description",
      selector: (row) => (
        <div className="complaintdescbox">
          <p className="complaintdesc">{row.description}</p>
        </div>
      ),
      sortable: true,
      width: "200px",
    },

    {
      name: "Ticket Date",
      selector: (row) => moment(row.ticket_date).format("DD-MM-YYYY"),
      sortable: true,
      width: "140px",
      center: true,
      style: {
        paddingLeft: "0px",
      },
    },

    {
      name: "Assigned To",
      selector: (row) => row.assigned_to,
      sortable: true,
      width: "150px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
    {
      name: "Resolved at",
      selector: (row) => moment(row.resolve_date).format("YYYY-MM-DD"),
      sortable: true,
      width: "140px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
    {
      name: "status_",
      selector: (row) => (
        <span
          className={
            row.status_ === "solved"
              ? "badge bg-success"
              : row.status_ === "failed"
                ? "badge bg-danger"
                : row.status_ === "pending"
                  ? "badge bg-warning"
                  : row.status_ === "proccess"
                    ? "badge bg-info"
                    : null
          }
        >
          {/* {row.status_} */}
          {row.status_ === "solved"
            ? "Solved"
            : row.status_ === "pending"
              ? "pending"
              : row.status_ === "proccess"
                ? "Processing"
                : row.status_ === "failed"
                  ? "Failed"
                  : null}
        </span>
      ),
      sortable: true,
      width: "115px",
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
        </div>
      ),
    },
  ];

  /*Onchange Functoion to update complaint */
  const handleFormChange = (e) => {
    seteditcomplaintdata({
      ...editcomplaintdata,
      [e.target.name]: e.target.value,
    });
  };

  /*Onclik Functoion to update complaint */
  const UpdateCategoryClick = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
    } else {
      e.preventDefault();
      axios
        .put(
          `${process.env.REACT_APP_BASEURL}/complaint_update`,
          editcomplaintdata,
          {
            headers: {
              admin_token: token,
            },
          }
        )
        .then((response) => {
          setShow(false);
          setapicall(true);
          setUpdateAlert(true);
        })
        .catch(function (error) {
          console.log(error);
        });
      setValidated(false);
    }
  };

  return (
    <div className="App productlist_maindiv">
      <h2>Complaint/Support</h2>

      {/* search bar */}
      <div className="card mt-3 p-3">
        <div className="row pb-3">
          <div className="col-md-3 col-sm-6 aos_input">
            <Form.Control
              type={"number"}
              placeholder={"Search by Id"}
              name={"id"}
              onChange={(e) => OnSearchChange(e)}
              value={searchdata.id}
            />
            {searcherror === true ? (
              <small className="text-danger">please fill the feild</small>
            ) : null}
          </div>

          <div className="col-md-3 col-sm-6 aos_input">
            <input
              type={"date"}
              placeholder={"Search by Order Date"}
              onChange={(e) => OnSearchChange(e)}
              value={searchdata.ticket_date}
              name={"ticket_date"}
              className={"form-control"}
            />
          </div>
          <div className="col-md-3 col-sm-6 aos_input">
            <Form.Select
              aria-label="Search by category"
              className="adminselectbox"
              onChange={(e) => OnSearchChange(e)}
              name={"status_"}
              value={searchdata.status_}
            >
              <option value={""}>status</option>
              <option value="pending">Pending</option>
              <option value="solved">Solved</option>
              <option value="failed">Failed</option>
              <option value="proccess">Processing</option>
            </Form.Select>
          </div>

          <div className="col-md-3 col-sm-6 aos_input">
            <MainButton
              btntext={"Search"}
              btnclass={"button main_button w-100"}
              onClick={() => onSearchClick()}
            />
          </div>
          <div className="col-md-3 col-sm-6 aos_input mt-2">
            <MainButton
              btntext={"Reset"}
              btnclass={"button main_button w-100"}
              onClick={() => onReset()}
            />
          </div>
        </div>

        {/* upload */}

        {/* datatable */}

        <DataTable
          columns={columns}
          data={complaintdata}
          pagination
          highlightOnHover
          pointerOnHover
          className={"table_body complaint_table"}
        />
        <Modal size="md" show={show} onHide={() => handleClose()}>
          <Form
            className=""
            validated={validated}
            ref={formRef}
            onSubmit={(e) => UpdateCategoryClick(e)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Update Complaint Info</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <div className="row p-3 m-0">
                <div className="col-md-6">
                  <Form.Group
                    className="mb-3 aos_input flex-column d-flex"
                    controlId="formBasicEmail"
                  >
                    <Form.Label className="mb-0">Ticket Id</Form.Label>
                    <Form.Text className="mt-0" name={"id"}>
                      {complaintdatadetail.id}
                    </Form.Text>
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group
                    className="mb-3 aos_input flex-column d-flex"
                    controlId="formBasicEmail"
                  >
                    <Form.Label className="mb-0">Order Id</Form.Label>
                    <Form.Text className="mt-0">
                      {complaintdatadetail.order_id}
                    </Form.Text>
                  </Form.Group>
                </div>
                <div className="col-md-12">
                  <Form.Group
                    className="mb-3 aos_input flex-column d-flex"
                    controlId="formBasicEmail"
                  >
                    <Form.Label className="mb-0">Description</Form.Label>
                    <Form.Text className="mt-0">
                      {" "}
                      {complaintdatadetail.description}
                    </Form.Text>
                  </Form.Group>
                </div>
                <div className="col-md-12">
                  <Form.Group
                    className="mb-3 aos_input"
                    controlId="formBasicEmail"
                  >
                    <Form.Label>Resolved Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Resolve Description"
                      onChange={(e) => handleFormChange(e)}
                      name={"resolve_description"}
                      value={editcomplaintdata.resolve_description}
                    />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group
                    className="mb-3 aos_input"
                    controlId="formBasicEmail"
                  >
                    <Form.Label>Assigned To</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Assigned To"
                      onChange={(e) => handleFormChange(e)}
                      name={"assigned_to"}
                      required
                      value={editcomplaintdata.assigned_to}
                    />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group
                    className="mb-3 aos_input"
                    controlId="formBasicEmail"
                  >
                    <Form.Label>Resolved Date</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="Resolved Date"
                      onChange={(e) => handleFormChange(e)}
                      name={"resolve_date"}
                      value={moment(editcomplaintdata.resolve_date).format(
                        "YYYY-MM-DD"
                      )}
                    />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group
                    className="mb-3 aos_input"
                    controlId="formBasicEmail"
                  >
                    <Form.Label>status</Form.Label>
                    <Form.Select
                      aria-label="status_"
                      className="adminselectbox"
                      placeholder="status"
                      onChange={(e) => handleFormChange(e)}
                      name={"status_"}
                      value={editcomplaintdata.status_}
                    >
                      <option value={""}>status_</option>
                      <option value="solved">Solved</option>
                      <option value="pending">Pending</option>
                      <option value="proccess">Processing</option>
                      <option value="failed">Failed</option>
                    </Form.Select>
                  </Form.Group>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button
                className="button main_outline_button"
                onClick={() => handleClose()}
              >
                Cancel
              </button>
              <button className="button main_button" type="submit">
                Update
              </button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
      <SAlert
        show={UpdateAlert}
        title="Updated Complaint Successfully "
        onConfirm={closeUpdateAlert}
      />
    </div>
  );
};

export default Complaint;
