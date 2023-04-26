import React, { useState, useRef } from "react";
import DataTable from "react-data-table-component";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { BsTrash } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import Iconbutton from "../common/iconbutton";
import { useEffect } from "react";
import axios from "axios";
import NotificationType from "../json/NotificationType";
import NotificationStatus from "../json/NotificationStatus";
// import { Alert } from "bootstrap";
import SAlert from "../common/salert";

const Notification = () => {
  // Declaration of States or valiables :-
  const token = localStorage.getItem("token");

  const [Notificationdata, setNotificationdata] = useState({
    notification_type: "",
    notification_text: "",
    type: "",
    status: "",
    notification_name: "",
  });
  const [AddAlert, setAddAlert] = useState(false);
  const [UpdateAlert, setUpdateAlert] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [id, setId] = useState();
  const [getNotificationdata, setGetNotificationdata] = useState([]);
  const [apicall, setapicall] = useState(false);
  const [getNotificationType, setNotificationType] = useState("");
  const [getusertype, setGetUserType] = useState("");
  const [getNotificationStatus, setGetNotificationStatus] = useState("");
  const [changstatus, setchangstatus] = useState("");
  const formRef = useRef();
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);

  //To close sweetalert after Added notification :-

  const closeAddAlert = () => {
    setAddAlert(false);
  };

  //To close sweetalert after update :-

  const closeUpdateAlert = () => {
    setUpdateAlert(false);
  };

  //To show or open the modal to add or update notification :-

  const handleShow = (e, id) => {
    if (e === "add") {
      setShow(e);
    }
    if (e !== "add") {
      try {
        axios
          .get(
            `${process.env.REACT_APP_BASEURL}/notification_template_get?id=${e}`,
            {
              headers: {
                admin_token: token,
              },
            }
          )
          .then((response) => {
            setNotificationdata(response.data[0]);
            setId(id);
          });
      } catch (err) { }
    }

    setShow(e);
  };

  //To close the Model or On click on cancel :-

  const handleClose = () => {
    setNotificationdata({});
    setValidated(false);
    setShow(false);
  };

  //To show the  Data in the table :-

  const columns = [
    {
      name: "Notofication Type",
      width: "130px",
      selector: (row) => row.notification_type,
      sortable: true,
    },
    {
      name: "User Type",
      width: "120px",
      selector: (row) => row.type,
      sortable: true,
    },

    {
      name: "Title",
      width: "100px",

      selector: (row) => row.notification_name,
      sortable: true,
    },
    {
      name: "Notification Text",
      width: "500px",

      selector: (row) => row.notification_text,
      sortable: true,
    },

    {
      name: "Status",

      selector: (row) => (
        <span
          className={
            row.status === "active"
              ? "badge bg-success"
              : row.status === "pending"
                ? "badge bg-primary"
                : row.status === "hold"
                  ? "badge bg-danger"
                  : "badge bg-dark"
          }
        >
          {row.status === "pending"
            ? "Pending"
            : row.status === "active"
              ? "Active"
              : row.status === "hold"
                ? "Hold"
                : "No status"}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Change Status",
      selector: (row) => (
        <Form.Select
          aria-label="Search By status"
          size="sm"
          className="w-100"
          onChange={(e) => onStatusChange(e, row.id)}
          name="status"
        >
          <option
            value="pending"
            selected={row.status === "pending" ? true : false}
          >
            Pending
          </option>
          <option
            value="active"
            selected={row.status === "active" ? true : false}
          >
            Active
          </option>
          <option value="hold" selected={row.status === "hold" ? true : false}>
            Hold
          </option>
        </Form.Select>
      ),
      sortable: true,
    },

    {
      name: "ACTION",
      center: true,
      selector: (row) => (
        <div className={"actioncolimn"}>
          <BiEdit
            className=" p-0 m-0  editiconn text-secondary"
            onClick={handleShow.bind(this, row.id)}
          />
          <BsTrash
            className=" p-0 m-0 editiconn text-danger"
            onClick={ShowDeleteAlert.bind(this, row.id)}
          />
        </div>
      ),
    },
  ];

  // OnCahnge function of the input feilds :-

  const valueHandler = (e) => {
    setNotificationdata({
      ...Notificationdata,
      [e.target.name]: e.target.value,
    });
  };

  //ToAdd the Notification :-

  const NotificationSubmitHandler = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();

      setValidated(true);
      setapicall(true);
    } else {
      e.preventDefault();
      axios
        .post(
          `${process.env.REACT_APP_BASEURL}/add_notification_template`,
          {
            type: Notificationdata.type,
            notification_type: Notificationdata.notification_type,
            notification_name: Notificationdata.notification_name,
            notification_text: Notificationdata.notification_text,
            status: Notificationdata.status,
          },
          {
            headers: {
              admin_token: token,
            },
          }
        )
        .then((response) => {
          setAddAlert(true);
        })
        .catch(function (error) {
          console.log(error);
        });

      formRef.current.reset();
      setValidated(false);
      setNotificationdata({});
      setapicall(true);
      setShow(false);
    }
  };

  // To update the notification:-

  const UpdateNotificationHandler = (e) => {
    e.preventDefault();
    axios
      .put(
        `${process.env.REACT_APP_BASEURL}/update_notification_template`,
        {
          id: Notificationdata.id,
          type: Notificationdata.type,
          notification_type: Notificationdata.notification_type,
          notification_name: Notificationdata.notification_name,
          notification_text: Notificationdata.notification_text,
          status: Notificationdata.status,
        },
        {
          headers: {
            admin_token: token,
          },
        }
      )
      .then((response) => {
        setUpdateAlert(true);
      })
      .catch(function (error) {
        console.log(error);
      });

    formRef.current.reset();
    setValidated(false);
    setNotificationdata({});
    setapicall(true);
    setShow(false);
  };

  //To get the data in the list :-

  const fetchNotificationData = () => {
    axios
      .post(
        `${process.env.REACT_APP_BASEURL}/notification_template_list`,
        {
          type: getusertype,
          notification_type: getNotificationType,
          status: getNotificationStatus,
        },
        {
          headers: {
            admin_token: token,
          },
        }
      )
      .then((response) => {

        let data = response.data.filter((item) => item.is_deleted === 1);
        setGetNotificationdata(data);
        setapicall(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //To change the status :-

  const onStatusChange = (e, id) => {
    setchangstatus(e.target.value);
    axios
      .put(
        `${process.env.REACT_APP_BASEURL}/notification_template_status`,
        {
          status: e.target.value,
          id: `${id}`,
        },
        {
          headers: {
            admin_token: token,
          },
        }
      )
      .then((response) => {
        setapicall(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //To delete the Notification :-

  const deleteNotification = (id) => {
    axios
      .put(
        `${process.env.REACT_APP_BASEURL}/notification_template_remove`,
        {
          is_deleted: 0,
          id: `${id}`,
        },
        {
          headers: {
            admin_token: token,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setDeleteAlert(false);
        setapicall(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //To mshow alert delete box :-

  const ShowDeleteAlert = (id) => {
    setId(id);
    setDeleteAlert(true);
  };

  //Tocancel the delete alert box :-

  const CancelDelete = () => {
    setDeleteAlert(false);
  };

  //To render the page :-

  useEffect(() => {
    fetchNotificationData();
  }, [apicall, changstatus]);

  //To search the Notification :-

  const SearchHandler = () => {
    setapicall(true);
    fetchNotificationData();
  };
  const OnReset = () => {
    setNotificationType("");
    setGetNotificationStatus("");
    setGetUserType("");
    setapicall(true);
  };
  return (
    <div>
      <h2>Notification</h2>

      {/* search bar */}
      <div className="card p-3">
        <div className="row page_searchbox">
          <div className="col-md-3 col-sm-6 aos_input">
            <Form.Select
              aria-label="Email Type"
              className="adminselectbox"
              name="category"
              onChange={(e) => {
                setNotificationType(e.target.value);
              }}
            >
              {" "}
              <option value={""}>Notification Type</option>
              {(NotificationType.NotificationType || []).map((item) => {
                return <option value={item}>{item}</option>;
              })}
            </Form.Select>
          </div>

          <div className="col-md-3 col-sm-6 aos_input">
            <Form.Select
              aria-label="Search by Store Type"
              className="adminselectbox"
              name="User Type"
              onChange={(e) => {
                setGetUserType(e.target.value);
              }}
            >
              <option value={""}>User Type</option>
              <option value={"admin"}>Admin</option>
              <option value={"vendor"}>Vendor</option>
              <option value={"user"}>User</option>
            </Form.Select>
          </div>

          <div className="col-md-3 col-sm-6 aos_input">
            <Form.Select
              aria-label="Search by Store Type"
              className="adminselectbox"
              name="Status"
              onChange={(e) => {
                setGetNotificationStatus(e.target.value);
              }}
            >
              <option value={""}>Status</option>
              {(NotificationStatus.NotificationStatus || []).map((item) => {
                return <option value={item}>{item}</option>;
              })}
            </Form.Select>
          </div>

          <div className="col-md-3 col-sm-6 aos_input">
            <button
              className="button main_button w-100"
              onClick={SearchHandler}
            >
              Search
            </button>
          </div>
          <div className="col-md-3 col-sm-6 mt-2 aos_input">
            <button className="button main_button w-100" onClick={OnReset}>
              Reset
            </button>
          </div>
        </div>

        <div className="product_page_uploadbox my-4">
          <button
            className="button main_button ml-auto"
            onClick={() => handleShow("add")}
          >
            Add Notification
          </button>
        </div>

        <DataTable
          columns={columns}
          className="main_data_table"
          data={getNotificationdata}
          pagination
          highlightOnHover
          pointerOnHover
        />
      </div>
      <Modal size="lg" show={show} onHide={() => handleClose()}>
        <Form
          className=""
          noValidate
          validated={validated}
          ref={formRef}
          onSubmit={
            show === "add"
              ? (e) => NotificationSubmitHandler(e)
              : (show) => UpdateNotificationHandler(show)
          }
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {show === "add"
                ? "Add New Notification "
                : " Update Notification"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row p-3 m-0">
              <div className="col-md-6">
                <Form.Group
                  className="mb-3 aos_input"
                  controlId="validationCustom06"
                >
                  <Form.Label>Notification Type</Form.Label>
                  <Form.Select
                    size="sm"
                    aria-label=""
                    value={Notificationdata.notification_type}
                    name={"notification_type"}
                    onChange={(e) => {
                      valueHandler(e);
                    }}
                    required
                  >
                    <option value={""}>Notification Type</option>
                    {(NotificationType.NotificationType || []).map((item) => {
                      return <option value={item}>{item}</option>;
                    })}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid" className="h6">
                    Please fill
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group
                  className="mb-3 aos_input"
                  controlId="validationCustom06"
                >
                  <Form.Label>User Type</Form.Label>
                  <Form.Select
                    size="sm"
                    aria-label=""
                    name={"type"}
                    onChange={(e) => {
                      valueHandler(e);
                    }}
                    value={Notificationdata.type}
                    required
                  >
                    <option value={""}>User Type</option>
                    <option value={"admin"}>Admin</option>
                    <option value={"vendor"}>Vendor</option>
                    <option value={"user"}>User</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid" className="h6">
                    Please fill category
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group
                  className="mb-3 aos_input"
                  controlId="validationCustom06"
                >
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    size="sm"
                    aria-label=""
                    value={Notificationdata.status}
                    name={"status"}
                    onChange={(e) => {
                      valueHandler(e);
                    }}
                    required
                  >
                    <option value={""}>Status</option>
                    {NotificationStatus.NotificationStatus.map((item) => {
                      return <option value={item}>{item}</option>;
                    })}
                  </Form.Select>

                  <Form.Control.Feedback type="invalid" className="h6">
                    Please fill category
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-sm-6 aos_input">
                <Form.Label>Notification Title</Form.Label>
                <br />
                <input
                  type={"text"}
                  placeholder={"Notification Title"}
                  className={"adminsideinput"}
                  value={Notificationdata.notification_name}
                  name={"notification_name"}
                  onChange={(e) => {
                    valueHandler(e);
                  }}
                  required
                />
              </div>
              <div className="col-sm-6 aos_input mt-2">
                <Form.Label>Notification Text</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder={"Notification Text"}
                  value={Notificationdata.notification_text}
                  name={"notification_text"}
                  cols={25}
                  onChange={(e) => {
                    valueHandler(e);
                  }}
                  required
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              type={"button"}
              className="button main_outline_button"
              onClick={() => handleClose()}
            >
              Cancel
            </button>
            <Iconbutton
              type={"submit"}
              btntext={
                show === "add" ? "Add Notification" : "Update Notification"
              }
              btnclass={"button main_button "}
            />
          </Modal.Footer>
        </Form>
      </Modal>
      <SAlert
        show={AddAlert}
        title="Added Notification Successfully "
        onConfirm={closeAddAlert}
      />
      <SAlert
        show={UpdateAlert}
        title="Updated Notification Successfully "
        onConfirm={closeUpdateAlert}
      />
      <SAlert
        show={deleteAlert}
        title="Notification"
        text="Are you Sure you want to delete "
        onConfirm={() => deleteNotification(id)}
        showCancelButton={true}
        onCancel={CancelDelete}
      />
    </div>
  );
};

export default Notification;
