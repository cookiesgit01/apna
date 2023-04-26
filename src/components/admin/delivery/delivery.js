import React, { useState, useRef } from "react";
import Input from "../common/input";
import ListGroup from "react-bootstrap/ListGroup";
import Iconbutton from "../common/iconbutton";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import {
  AiOutlineEye,
  AiOutlineUser,
  AiOutlineGift,
  AiOutlineCheck,
} from "react-icons/ai";
import { BsArrowLeftCircle } from "react-icons/bs";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { GoPrimitiveDot } from "react-icons/go";
import DataTable from "react-data-table-component";
import MainButton from "../common/button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Badge } from "react-bootstrap";
import "sweetalert/dist/sweetalert.css";
import { TbShip } from "react-icons/tb";
import { CgTrack } from "react-icons/cg";

const Delivery = () => {
  const formRef = useRef();

  const [show, setShow] = useState(false);
  const [showtrack, setShowtrack] = useState(false);
  const handleClose = () => {
    formRef.current.reset();
    setShow(false);
    setShowtrack(false);
  };
  const handleTrackShow = () => {
    setShowtrack(true);
  };

  const handleShow = () => {
    setShow(true);
  };

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      width: "70px",
      center: true,
      style: {
        paddingLeft: 0,
      },
    },

    {
      name: "Product Name",
      selector: (row) => row.cname,
      sortable: true,
      width: "140px",
      center: true,
    },
    {
      name: "Order Date",
      selector: (row) => row.odate,
      sortable: true,
      width: "120px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
    {
      name: "Shipping Date",
      selector: (row) => row.sdate,
      sortable: true,
      width: "130px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
    {
      name: "Delivery Date",
      selector: (row) => row.edate,
      sortable: true,
      width: "140px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },

    {
      name: "Instruction",
      selector: (row) => row.instruction,
      sortable: true,
      width: "190px",
      style: {
        paddingRight: "22px",
        paddingLeft: "0px",
      },
    },
    {
      name: "Note",
      selector: (row) => row.info,
      sortable: true,
      width: "160px",
      style: {
        paddingRight: "12px",
        paddingLeft: "0px",
      },
    },
    {
      name: "Status",
      selector: (row) => (
        <Badge
          bg={
            row.status === "Delivered"
              ? "success"
              : row.status === "Late"
                ? "danger"
                : row.status === "Ontime"
                  ? "primary"
                  : row.status === "Return"
                    ? "info"
                    : row.status === "Cancelled"
                      ? "warning"
                      : null
          }
        >
          {row.status}
        </Badge>
      ),
      sortable: true,
      width: "100px",
      // center: true,
    },
    {
      name: "Action",
      width: "120px",
      style: {
        paddingRight: "12px",
        paddingLeft: "0px",
      },
      center: true,
      selector: (row) => (
        <div className={"actioncolimn"}>
          <BiEdit
            className=" p-0 m-0  editiconn text-secondary"
            onClick={handleShow}
          />
          <AiOutlineEye
            className=" p-0 m-0  editiconn text-primary"
            onClick={handleTrackShow}
          />
        </div>
      ),
    },
  ];

  const data = [
    {
      id: 1,
      ctype: "Grocery",
      cname: "October Gift Voucher",
      odate: "Sep 26, 2022",
      sdate: "Sep 26, 2022",
      edate: "Jan 2, 2022",
      instruction: (
        <p className="reviewdesc">
          delivery between 9:00 to 5:00 or delivery between 9:00 to 5:0,delivery
          between 9:00 to 5:00 or delivery between 9:00 to 5:0
        </p>
      ),
      info: (
        <p className="reviewdesc">
          delivery between 9:00 to 5:00 or delivery between 9:00 to 5:0
        </p>
      ),
      status: "Delivered",
    },
    {
      id: 2,
      ctype: "Health & Care",
      cname: "Winter Gift Voucher",
      odate: "Sep 26, 2022",
      sdate: "Sep 26, 2022",
      edate: "Jan 2, 2022",
      info: <p className="reviewdesc">jhdsj sadjab asdbjasbd sdjasb</p>,
      instruction: <p className="reviewdesc">delivery between 9:00 to 5:00</p>,
      status: "Late",
    },
    {
      id: 2,
      ctype: "Health & Care",
      cname: "Winter Gift Voucher",
      odate: "Sep 26, 2022",
      sdate: "Sep 26, 2022",
      edate: "Jan 2, 2022",
      info: <p className="reviewdesc">jhdsj sadjab asdbjasbd sdjasb</p>,
      instruction: <p className="reviewdesc">delivery between 9:00 to 5:00</p>,
      status: "Ontime",
    },
    {
      id: 2,
      ctype: "Health & Care",
      cname: "Winter Gift Voucher",
      odate: "Sep 26, 2022",
      sdate: "Sep 26, 2022",
      edate: "Jan 2, 2022",
      info: <p className="reviewdesc">jhdsj sadjab asdbjasbd sdjasb</p>,
      instruction: <p className="reviewdesc">delivery between 9:00 to 5:00</p>,
      status: "Return",
    },
    {
      id: 2,
      ctype: "Health & Care",
      cname: "Winter Gift Voucher",
      odate: "Sep 26, 2022",
      sdate: "Sep 26, 2022",
      edate: "Jan 2, 2022",
      info: <p className="reviewdesc">jhdsj sadjab asdbjasbd sdjasb</p>,
      instruction: <p className="reviewdesc">delivery between 9:00 to 5:00</p>,
      status: "Cancelled",
    },
  ];

  return (
    <div className="deliveryreport_pagee">
      <h2>Delivery</h2>

      {/* search bar */}
      <div className="card mt-3 p-3 ">
        <div className=" row">
          <div className="col-md-3 col-sm-6 aos_input">
            <Input type={"text"} plchldr={"Search by Product name"} />
          </div>
          <div className="col-md-3 col-sm-6 aos_input">
            <Input type={"date"} plchldr={"Search by order date"} />
          </div>
          <div className="col-md-3 col-sm-6 aos_input">
            <Form.Select
              aria-label="Search by category type"
              className="adminselectbox"
            >
              <option>Search by status</option>
              <option value="1">Delivered</option>
              <option value="2">Late</option>
              <option value="3">Ontime</option>
              <option value="4">Return</option>
            </Form.Select>
          </div>

          <div className="col-md-3 col-sm-6 aos_input">
            <MainButton
              btntext={"Search"}
              btnclass={"button main_button w-100"}
            />
          </div>
        </div>

        {/* upload */}

        <div className="product_page_uploadbox my-4"></div>

        {/* datatable */}
        <Modal size="md" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Delivery Info</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row p-3 m-0">
              <div className="col-md-3">
                <Form.Group
                  className="mb-3 aos_input flex-column d-flex"
                  controlId="formBasicEmail"
                >
                  <Form.Label className="mb-0">Order Id</Form.Label>
                  <Form.Text className="mt-0">124532</Form.Text>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group
                  className="mb-3 aos_input flex-column d-flex"
                  controlId="formBasicEmail"
                >
                  <Form.Label className="mb-0">Product Name</Form.Label>
                  <Form.Text className="mt-0">Green Leaf</Form.Text>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group
                  className="mb-3 aos_input flex-column d-flex"
                  controlId="formBasicEmail"
                >
                  <Form.Label className="mb-0">Order Date</Form.Label>
                  <Form.Text className="mt-0">12 Sep,2022</Form.Text>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group
                  className="mb-3 aos_input flex-column d-flex"
                  controlId="formBasicEmail"
                >
                  <Form.Label className="mb-0">Delivery Date</Form.Label>
                  <Form.Text className="mt-0">15 Sep,2023</Form.Text>
                </Form.Group>
              </div>
              <div className="col-md-12">
                <Form.Group
                  className="mb-3 aos_input flex-column d-flex"
                  controlId="formBasicEmail"
                >
                  <Form.Label className="mb-0">Instruction</Form.Label>
                  <Form.Text className="mt-0">
                    {" "}
                    My phone is locked due to overdue payment But i have
                    allreday paid the remaining amount of 5400 on 29.07.2022
                    time 15.40.54 Transaction no - EXTLINK[protected]_1
                  </Form.Text>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group
                  className="mb-3 aos_input flex-column d-flex"
                  controlId="formBasicEmail"
                >
                  <Form.Label className="mb-0">Status</Form.Label>

                  <Form.Text className="mt-0">
                    <Badge bg="danger">Late</Badge>
                  </Form.Text>
                </Form.Group>
              </div>
              <div className="col-md-12">
                <Form.Group
                  className="mb-3 aos_input"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Note</Form.Label>
                  <Form.Control as="textarea" rows={3} placeholder="Note" />
                </Form.Group>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="button main_outline_button"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button className="button main_button" onClick={handleClose}>
              Update
            </button>
          </Modal.Footer>
        </Modal>
        <Modal size="lg" show={showtrack} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Product Tracking Info</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row d-flex justify-content-between px-3 top">
              <div className="card-body orderdetail_box">
                <div className="d-flex justify-content-between align-items-center">
                  <h6 className="text-primary">Order ID: OD45345345435</h6>
                  <h6 className="text-primary">Tracking ID: BD045903594059</h6>
                </div>
                {/* user */}
                <article className="card orderdetail">
                  <div className="card-body row">
                    <div className="col">
                      {" "}
                      <strong>UserName:</strong> <br />
                      Nicolas Johnson{" "}
                    </div>
                    <div className="col">
                      {" "}
                      <strong>Phone No:</strong> <br /> 025145, |{" "}
                      <i className="fa fa-phone"></i> +15986759860{" "}
                    </div>
                    <div className="col">
                      {" "}
                      <strong>Email:</strong> <br /> Nicholaskjn23@gmail.com{" "}
                    </div>
                    <div className="col">
                      {" "}
                      <strong>Address:</strong> <br />
                      4059 bhind uhtkn dg near tilsk nagar indore mp{" "}
                    </div>
                  </div>
                </article>
                {/* end */}
                {/* track */}
                <div className="track orderstatus_box">
                  <div className="step active">
                    {" "}
                    <span className="icon">
                      <AiOutlineCheck className={" orderstatus_icon h4 "} />{" "}
                    </span>{" "}
                    <span className="text">Shipped</span>{" "}
                  </div>
                  <div className="step active">
                    {" "}
                    <span className="icon">
                      {" "}
                      <AiOutlineUser
                        className={" orderstatus_icon h4 "}
                      />{" "}
                    </span>{" "}
                    <span className="text"> Picked by courier</span>{" "}
                  </div>
                  <div className="step ">
                    {" "}
                    <span className="icon">
                      {" "}
                      <MdOutlineDeliveryDining
                        className={" orderstatus_icon h4 "}
                      />{" "}
                    </span>{" "}
                    <span className="text"> On the way </span>{" "}
                  </div>
                  <div className="step ">
                    {" "}
                    <span className="icon">
                      {" "}
                      <AiOutlineGift className={" orderstatus_icon h4 "} />
                    </span>{" "}
                    <span className="text">Delivered</span>{" "}
                  </div>
                </div>
                <hr />
                {/* end */}
                <div className="row">
                  {/* left */}
                  <article className="card orderdetail col-md-6 col-sm-12">
                    <div className="d-flex align-items-center">
                      <b>
                        {" "}
                        <h5 className={"px-0 py-2 text-dark mb-0 border-0"}>
                          Shipping Info
                        </h5>
                      </b>
                      <TbShip className="text-dark mx-2 h5 mb-0" />
                    </div>
                    <ListGroup className="border-0">
                      <ListGroup.Item className="d-flex justify-content-between align-items-start border-0 flex-wrap-wrap row shipping_infoo py-2">
                        <strong className={"col-md-6"}>
                          Order Date:
                        </strong>

                        <div bg="primary" pill className={"col-md-6"}>
                          29 nov 2019
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex justify-content-between align-items-start border-0 flex-wrap-wrap row shipping_infoo py-2">
                        <strong className={"col-md-6"}>
                          Delivery Date:
                        </strong>

                        <div bg="primary" pill className={"col-md-6"}>
                          29 nov 2019
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex justify-content-between align-items-start border-0 flex-wrap-wrap row shipping_infoo py-2">
                        <strong className={"col-md-6"}>
                          Estimated Delivery time:
                        </strong>

                        <div bg="primary" pill className={"col-md-6"}>
                          29 nov 2019
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex justify-content-between align-items-start border-0 flex-wrap-wrap row shipping_infoo py-2">
                        <strong className={"col-md-6"}>Shipping BY:</strong>
                        <div bg="primary" pill className={"col-md-6"}>
                          BLUEDART, | <i className="fa fa-phone"></i> +1598675986
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex justify-content-between align-items-start border-0 flex-wrap-wrap row shipping_infoo py-2">
                        <strong className={"col-md-6"}>
                          Status:
                        </strong>

                        <div bg="primary" pill className={"col-md-6"}>
                          <Badge bg="danger">Late</Badge>
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex justify-content-between align-items-start border-0 flex-wrap-wrap row shipping_infoo py-2">
                        <strong className={"col-md-6"}>Status: </strong>
                        <div bg="primary" pill className={"col-md-6"}>
                          Picked by the courier
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex justify-content-between align-items-start border-0 flex-wrap-wrap row shipping_infoo py-2">
                        <strong className={"col-md-6"}>
                          Tracking Last Status On:
                        </strong>
                        <div bg="primary" pill className={"col-md-6"}>
                          11:30pm, Today <p>New Delhi</p>
                        </div>
                      </ListGroup.Item>
                    </ListGroup>
                  </article>
                  {/* end */}
                  {/* right */}
                  <article className="card orderdetail trackrecord_box col-md-6 col-sm-12">
                    <div className="d-flex align-items-center">
                      <b>
                        {" "}
                        <h5 className={"px-0 py-2 text-dark mb-0 border-0"}>
                          Tracking History
                        </h5>
                      </b>
                      <CgTrack className={"mb-0 text-dark h5 mx-2"} />
                    </div>
                    <div className="trackrecord">
                      <ListGroup className="border-0 trackinghistory">
                        <DropdownButton
                          id="dropdown"
                          variant="light w-100 dropdownnbtn_track rounded-0 "
                          title="Thur, 23 Sep, 2022"
                          className="dropdownnbtn_track"
                        >
                          <Dropdown.Item className="py-1" href="#/action-1">
                            <ListGroup.Item className="shipping_infoo d-flex justify-content-between align-items-start border-0 flex-wrap-wrap row  py-0">
                              <strong className={"col-md-3"}>11:00 AM</strong>
                              <div bg="primary" pill className={"col-md-6 shippimgaddress"}>
                                CITY OF MYSORE departurej defs
                              </div>
                            </ListGroup.Item>
                          </Dropdown.Item>
                          <Dropdown.Item className="py-1" href="#/action-2">
                            <ListGroup.Item className="shipping_infoo py-0 d-flex justify-content-between align-items-start border-0 flex-wrap-wrap row">
                              <strong className={"col-md-3"}>1:00 PM</strong>
                              <div bg="primary" pill className={"col-md-6 shippimgaddress"}>
                                BLUEDART, | <i className="fa fa-phone"></i>{" "}
                                +1598675986
                              </div>
                            </ListGroup.Item>
                          </Dropdown.Item>
                          <Dropdown.Item className="py-1" href="#/action-3">
                            <ListGroup.Item className="shipping_infoo py-0 d-flex justify-content-between align-items-start border-0 flex-wrap-wrap row">
                              <strong className={"col-md-3"}>5:00 PM</strong>
                              <div bg="primary" pill className={"col-md-6 shippimgaddress"}>
                                Picked by the courier
                              </div>
                            </ListGroup.Item>
                          </Dropdown.Item>
                          <Dropdown.Item className="py-0" href="#/action-3">
                            {" "}
                            <ListGroup.Item className="shipping_infoo py-0 d-flex justify-content-between align-items-start border-0 flex-wrap-wrap row">
                              <strong className={"col-md-3"}>9:00 PM</strong>
                              <div bg="primary" pill className={"col-md-6 shippimgaddress"}>
                                11:30pm, Today <p>New Delhi</p>
                              </div>
                            </ListGroup.Item>
                          </Dropdown.Item>
                        </DropdownButton>
                      </ListGroup>
                      <ListGroup className="border-0 trackinghistory">
                        <DropdownButton
                          id="dropdown"
                          variant="light w-100 dropdownnbtn_track  rounded-0 "
                          title="Thur, 23 Sep, 2022"
                        >
                          <Dropdown.Item className="py-1" href="#/action-1">
                            <ListGroup.Item className="d-flex justify-content-between align-items-start border-0 flex-wrap-wrap row py-0 shipping_infoo">
                              <strong className={"col-md-3"}>11:00 AM</strong>
                              <div bg="primary" pill className={"col-md-6 shippimgaddress"}>
                                CITY OF MYSORE departurej defs
                              </div>
                            </ListGroup.Item>
                          </Dropdown.Item>
                          <Dropdown.Item className="py-1" href="#/action-2">
                            <ListGroup.Item className="py-0 d-flex justify-content-between align-items-start border-0 flex-wrap-wrap row shipping_infoo">
                              <strong className={"col-md-3"}>1:00 PM</strong>
                              <div bg="primary" pill className={"col-md-6 shippimgaddress"}>
                                BLUEDART, | <i className="fa fa-phone"></i>{" "}
                                +1598675986
                              </div>
                            </ListGroup.Item>
                          </Dropdown.Item>
                          <Dropdown.Item className="py-1" href="#/action-3">
                            <ListGroup.Item className="py-0 d-flex justify-content-between align-items-start border-0 flex-wrap-wrap row shipping_infoo">
                              <strong className={"col-md-3"}>5:00 PM</strong>
                              <div bg="primary" pill className={"col-md-6 shippimgaddress"}>
                                Picked by the courier
                              </div>
                            </ListGroup.Item>
                          </Dropdown.Item>
                          <Dropdown.Item className="py-0" href="#/action-3">
                            {" "}
                            <ListGroup.Item className="py-0 d-flex justify-content-between align-items-start border-0 flex-wrap-wrap row shipping_infoo">
                              <strong className={"col-md-3"}>9:00 PM</strong>
                              <div bg="primary" pill className={"col-md-6 shippimgaddress"}>
                                11:30pm, Today <p>New Delhi</p>
                              </div>
                            </ListGroup.Item>
                          </Dropdown.Item>
                        </DropdownButton>
                      </ListGroup>

                      <div className="d-flex align-items-center ">
                        <GoPrimitiveDot className='text-success mx-2 h5' />
                        <h6 className="dropdownnbtn_track  text-success rounded-0">Thur, 23 Sep, 2022</h6>
                      </div>

                      <ListGroup className="border-0 trackinghistory">
                        <ListGroup.Item className="d-flex justify-content-between align-items-start border-0 flex-wrap-wrap row py-2 shipping_infoo">
                          <strong className={"col-md-3"}>11:00 AM</strong>
                          <div bg="primary" pill className={"col-md-6 shippimgaddress"}>
                            CITY OF MYSORE departurej defs
                          </div>
                        </ListGroup.Item>

                        <ListGroup.Item className="py-2 d-flex justify-content-between align-items-start border-0 flex-wrap-wrap row shipping_infoo">
                          <strong className={"col-md-3"}>1:00 PM</strong>
                          <div bg="primary" pill className={"col-md-6 shippimgaddress"}>
                            BLUEDART, | <i className="fa fa-phone"></i>{" "}
                            +1598675986
                          </div>
                        </ListGroup.Item>

                        <ListGroup.Item className="shipping_infoo py-2 d-flex justify-content-between align-items-start border-0 flex-wrap-wrap row">
                          <strong className={"col-md-3"}>5:00 PM</strong>
                          <div bg="primary" pill className={"col-md-6 shippimgaddress"}>
                            Picked by the courier
                          </div>
                        </ListGroup.Item>
                        {" "}
                        <ListGroup.Item className="py-2  d-flex justify-content-between align-items-start border-0 flex-wrap-wrap row shipping_infoo">
                          <strong className={"col-md-3 text-success"}>9:00 PM</strong>
                          <div bg="primary" pill className={"col-md-6 shippimgaddress text-success"}>
                            11:30pm, Today <p>New Delhi</p>
                          </div>
                        </ListGroup.Item>
                      </ListGroup>



                    </div>
                  </article>
                </div>
                <hr />
                <Iconbutton
                  btntext={"Back"}
                  onClick={handleClose}
                  Iconname={<BsArrowLeftCircle className="mx-2" />}
                  btnclass={"button main_button "}
                />
              </div>
            </div>
            {/* end */}
          </Modal.Body>
        </Modal>
        <DataTable
          columns={columns}
          data={data}
          pagination
          highlightOnHover
          pointerOnHover
          className={"table_body delivery_table"}
        />
      </div>
    </div>
  );
};

export default Delivery;
