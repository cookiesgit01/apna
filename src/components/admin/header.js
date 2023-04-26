import Button from "react-bootstrap/Button";
import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { Bell, Search } from "react-bootstrap-icons";
import profile from "../../images/user.jpg";
import { BsBox, BsShopWindow } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";

import { AiOutlineSetting } from "react-icons/ai";
import { BiTransfer } from "react-icons/bi";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import SweetAlert from "sweetalert-react";
import "sweetalert/dist/sweetalert.css";
import { useNavigate } from "react-router-dom";

function AdminHeader() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  const [UpdateAlert, setUpdateAlert] = useState(false);
  const [newpassword, setnewPassword] = useState("");
  const [errornewpassword, seterrornewpassword] = useState("");
  const [erroroldpassword, seterroroldpassword] = useState("");
  let loginid = localStorage.getItem("encryptloginid");
  let pass = localStorage.getItem("encryptpassword");
  let vendoremail = localStorage.getItem("vendor_email");
  let vendorToken = localStorage.getItem("vendor_token");
  let token = localStorage.getItem("token");


  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const newPass = (e, id) => {
    setnewPassword(e.target.value);
    seterrornewpassword("");
  };

  const closeUpdateAlert = () => {
    setUpdateAlert(false);
    seterroroldpassword("");
  };

  const LoginForm = (e) => {
    e.preventDefault();
    if (password.trim() === "") {
      seterroroldpassword("Password is required");
    } else if (
      !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(
        password
      )
    ) {
      seterroroldpassword(
        "Password must contain digit, one uppercase letter, one special character, no space, and it must be 8-16 characters long"
      );
    } else if (newpassword.trim() === "") {
      seterrornewpassword("Password is required");
    } else if (
      !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(
        newpassword
      )
    ) {
      seterrornewpassword(
        "Password must contain digit, one uppercase letter, one special character, no space, and it must be 8-16 characters long"
      );
    } else if (vendorToken !== null && errornewpassword === "") {
      axios
        .post(
          `${process.env.REACT_APP_BASEURL}/change_vendor_password`,
          {
            headers: {
              vendor_token: vendorToken,
            },
          },
          {
            email: vendoremail,
            password: pass,
            new_password: newpassword,
          }
        )
        .then((response) => {
          setShow(false);
          setUpdateAlert(true);
          setPassword("");
          setnewPassword("");
          seterrornewpassword("");
          seterroroldpassword("");
        })
        .catch((err) => {
          console.log(err);
        });
      e.preventDefault();
    } else {
      axios
        .put(
          `${process.env.REACT_APP_BASEURL_0}/update_password`,
          {
            admin_email: loginid,
            admin_password: password,
            new_admin_password: newpassword,
          },
          {
            headers: { admin_token: `${token}` },
          }
        )
        .then((response) => {
          if (response.data.response === "password not matched") {
            seterroroldpassword("Old password is incorrect");
            setShow(true);
            setUpdateAlert(false);
          } else {
            setShow(false);
            setUpdateAlert(true);
            setPassword("");
            setnewPassword("");
            seterrornewpassword("");
            seterroroldpassword("");
          }
        })
        .catch((err) => {
          console.log(err);
        });
      e.preventDefault();
    }
  };

  const handleClose = () => {

    setShow(false);
    seterrornewpassword("");
    seterroroldpassword("");
  };
  const handleShow = () => setShow(true);
  const OnLogoutClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("vendor_token");
    localStorage.removeItem("encryptloginid");
    localStorage.removeItem("encryptpassword");
    localStorage.removeItem("encryptadminid");
    localStorage.removeItem("vendor_email");
    navigate("/");
  };
  return (
    <div className="container content_top_container">
      <div className="row content_top_row ">
        <div className="search_bar left_side col-md-6">
          <InputGroup className="">
            <Form.Control
              placeholder="Seach"
              aria-label="Seach"
              aria-describedby="basic-addon2"
              variant="outline-success"
            />
            <Button variant="outline-success" id="button-addon2">
              <Search />
            </Button>
          </InputGroup>
        </div>
        <div className="search_bar right_side col-md-6">
          <Dropdown className="notification_div">
            <Dropdown.Toggle
              className="btn-lg btn"
              variant="outline-success"
              id="dropdown-basic"
            >
              <div className="notification_alart">
                <span className="bg-danger">3</span>
              </div>
              <Bell />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <div className="d-flex justify-content-between p-2 notification_heading">
                <div>
                  <h5>Notifications</h5>
                </div>
                <div>
                  {" "}
                  <span className="badges bg-danger">New</span>
                </div>
              </div>
              <Dropdown.Item href="#/action-1" className="notification_box">
                <div className="d-flex">
                  <BsShopWindow className="icon" />
                  <div>
                    <h6 className="d-inline notification_name">
                      New Vendor Listed
                    </h6>
                    <p className="notification_text">
                      Lorem ipsum dolor sit amet, consectetuer elit.
                    </p>
                    <span className="lead notification_time">
                      30 minutes ago
                    </span>
                  </div>
                </div>
              </Dropdown.Item>
              <Dropdown.Item href="#/action-1" className="notification_box">
                <div className="d-flex">
                  <BiTransfer className="icon" />
                  <div>
                    <h6 className="d-inline notification_name">
                      New Transactions
                    </h6>
                    <p className="notification_text">
                      Lorem ipsum dolor sit amet, consectetuer elit.
                    </p>
                    <span className="lead notification_time">
                      30 minutes ago
                    </span>
                  </div>
                </div>
              </Dropdown.Item>
              <Dropdown.Item href="#/action-1" className="notification_box">
                <div className="d-flex">
                  <BsBox className="icon" />
                  <div>
                    <h6 className="d-inline notification_name">
                      Order Completed
                    </h6>
                    <p className="notification_text">
                      Lorem ipsum dolor sit amet, consectetuer elit.
                    </p>
                    <span className="lead notification_time">
                      30 minutes ago
                    </span>
                  </div>
                </div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="profile_div">
            <Dropdown.Toggle
              className="btn-lg p-0"
              variant=""
              id="dropdown-basic"
            >
              <img src={profile} className="profile" alt="Apna Organic Store" />
              <span className="px-2">Gourav</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {/* <Dropdown.Item href="#/action-1" className="profile_list py-2">
                <CgProfile />
                profile
              </Dropdown.Item> */}
              <Dropdown.Item
                href="#/action-2"
                className="profile_list py-2"
                onClick={handleShow}
              >
                <AiOutlineSetting />
                Setting
              </Dropdown.Item>
              <Dropdown.Item
                className="profile_list py-2"
                onClick={() => OnLogoutClick()}
              >
                <FiLogOut />
                LogOut
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Change password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={LoginForm}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    required
                    name={"admin_email"}
                    value={loginid ? loginid : vendoremail ? vendoremail : null}
                    type="email"
                    disabled
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Old Password</Form.Label>
                  <Form.Control
                    required
                    onChange={(e) => onPasswordChange(e)}
                    value={password}
                    name={"admin_password"}
                    type="password"
                    placeholder="Password"
                  />
                  <small className="text-danger">{erroroldpassword}</small>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Update Password</Form.Label>
                  <Form.Control
                    type="password"
                    name={"new_admin_password"}
                    defaultValue={newpassword}
                    onChange={(e) => newPass(e)}
                    placeholder="Password"
                    required
                  />
                  <small className="text-danger"> {errornewpassword}</small>
                </Form.Group>
                <button
                  type={"button"}
                  className="btn btn-outline-primary "
                  onClick={() => handleClose()}
                >
                  Cancel
                </button>
                <Button variant="primary" type="submit" className="mx-4">
                  Submit
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
          <SweetAlert
            show={UpdateAlert}
            title="Updated Password Successfully "
            onConfirm={closeUpdateAlert}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminHeader;
