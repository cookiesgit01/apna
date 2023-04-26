import React, { useEffect, useState } from "react";
import "./order_detail.css";
import Profile from "../../../images/user.jpg";
// import { AiOutlineFileText } from "react-icons/ai";
import { BsTelephoneFill, BsFillEnvelopeFill } from "react-icons/bs";
import Form from "react-bootstrap/Form";
import axios from "axios";
import moment from "moment";
import Loader from "../common/loader";

const OrderDetail = () => {
  // let totalorder = 0;
  let orderid = localStorage.getItem("orderid");
  let userid = localStorage.getItem("userid");
  const token = localStorage.getItem("token");

  const [order, setOrder] = useState([]);
  const [productorder, setproductOrder] = useState([]);
  // const [amt, setAmt] = useState("");
  const [user, setUser] = useState([]);
  let [loading, setloading] = useState(false);
  let [apicall, setApicall] = useState(false);

  // const [searchdataa, setsearchDataa] = useState({
  //   status: "",
  //   created_on: "",
  // });

  // const OnSearchChangee = (e) => {
  //   setsearchDataa({ ...searchdataa, [e.target.name]: e.target.value });
  // };

  // Function to change the status:-
  const onStatusChangee = (e) => {

    // setloading(true);

    axios
      .put(
        `${process.env.REACT_APP_BASEURL_0}/order_status_change`,
        {
          status_change: e.target.value,
          id: orderid,
          user_id: userid,
        },
        {
          headers: {
            admin_token: token,
          },
        }
      )
      .then((response) => {
        setloading(false);
        setApicall(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // To get the data of the order details:-
  useEffect(() => {
    setloading(true);
    axios
      .post(
        `${process.env.REACT_APP_BASEURL_0}/order_deteils`,
        {
          id: orderid,
        },
        {
          headers: {
            admin_token: token,
          },
        }
      )
      .then((response) => {
        setloading(false);
        setOrder(response.data);
        setproductOrder(response.data.product_types);

        setApicall(false);
        UserData();
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [apicall]);

  // To get the data of the user details :-
  const UserData = () => {
    axios
      .post(
        `http://192.168.29.108:5000/user_details`,
        {
          user_id: userid,
        },
        {
          headers: {
            admin_token: token,
          },
        }
      )
      .then((response) => {
        let data = response.data;
        setUser(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  var total = 0;
  var sub_total = 0;
  var total_tax = 0;
  let qty = 0;
  let total_tax_with_qty = 0;
  let total_priceWithout_tax = 0;
  console.log(total, total_tax)

  return (
    <>
      {loading === true ? <Loader /> : null}

      <div className="order_detail_page">
        <div className="order_detail">
          <h2>Orders Detail</h2>
          <div className="row">
            <div className="col-lg-8">
              <div className="left_side">
                <div className="top_bar d-flex justify-content-between text-center">
                  <div className="order_id d-flex flex-column">
                    <div className="order_info_heading">
                      <span>#</span>Order Id
                    </div>
                    <div>
                      <span>{order.id}</span>
                    </div>
                  </div>
                  <div className="d-flex flex-column text-center">
                    <div className="order_info_heading">Payment</div>
                    <div className="badge bg-success">{order.payment_mode}</div>
                  </div>
                  <div className="d-flex flex-column text-center">
                    <div className="order_info_heading">Order Status</div>

                    <Form.Select
                      aria-label="Floating label select example"
                      onChange={onStatusChangee}
                      name="status"
                      value={order.status}
                    >
                      <option>Select Order Status</option>
                      <option
                        value="placed"
                      // selected={order.status ==== "placed" ? true : false}
                      >
                        Placed
                      </option>
                      <option
                        value="shipped"
                      // selected={order.status === "shipped" ? true : false}
                      >
                        Shipped
                      </option>
                      <option
                        value="delivered"
                      // selected={order.status === "delivered" ? true : false}
                      >
                        Delivered
                      </option>
                      <option
                        value="pending"
                      // selected={order.status === "pending" ? true : false}
                      >
                        Pending
                      </option>
                      <option
                        value="approved"
                      // selected={order.status === "approved" ? true : false}
                      >
                        Approved
                      </option>
                      <option
                        value="packed"
                      // selected={order.status === "packed" ? true : false}
                      >
                        Packed
                      </option>
                      <option
                        value="return"
                      // selected={order.status === "return" ? true : false}
                      >
                        Return
                      </option>
                      <option
                        value="cancel"
                      // selected={order.status === "cancel" ? true : false}
                      >
                        Cancel
                      </option>
                    </Form.Select>
                  </div>
                  <div className="d-flex flex-column text-center">
                    <div className="order_info_heading">Order Date & Time</div>
                    <div className="date_time">
                      {moment(order.order_date).format("YYYY-MM-DD")}
                    </div>
                  </div>

                  <div className="d-flex flex-column text-center">
                    <div className="order_info_heading">Delivery Date</div>
                    <div className="date_time">{order.delivery_date}</div>
                  </div>
                </div>
              </div>

              <div className="product_img_price">
                <div className="product_image_price"></div>

                {(productorder || []).map((orderdata) => {
                  orderdata.gst === "null" ||
                    orderdata.gst === "undefined" ||
                    orderdata.gst === ""
                    ? (orderdata.gst = "0")
                    : Number(orderdata.gst);
                  orderdata.sgst === "null" ||
                    orderdata.sgst === "undefined" ||
                    orderdata.sgst === ""
                    ? (orderdata.sgst = "0")
                    : Number(orderdata.sgst);
                  orderdata.cgst === "null" ||
                    orderdata.cgst === "undefined" ||
                    orderdata.cgst === ""
                    ? (orderdata.cgst = "0")
                    : Number(orderdata.cgst);
                  orderdata.mrp === "undefined" ||
                    orderdata.mrp === "null" ||
                    orderdata.mrp === ""
                    ? (orderdata.mrp = "0")
                    : Number(orderdata.mrp);
                  let countAllText =
                    Number(orderdata.gst) +
                    Number(orderdata.wholesale_sales_tax) +
                    Number(orderdata.manufacturers_sales_tax) +
                    Number(orderdata.retails_sales_tax) +
                    Number(orderdata.value_added_tax);
                  let discont = (orderdata.mrp * orderdata.discount) / 100;
                  let tax = (Number(orderdata.sale_price) * countAllText) / 100;

                  qty = orderdata.order_quantity;

                  let total_price = orderdata.sale_price * qty;

                  let Total_taxMultiply_qty = tax * qty;
                  total_tax_with_qty += Number(Total_taxMultiply_qty);
                  let price_without_tax =
                    Number(orderdata.product_price).toFixed(2) - tax;

                  let pricewithout_tax_with_qty = price_without_tax * qty;

                  total_priceWithout_tax += Number(pricewithout_tax_with_qty);

                  total += Number(total_price);
                  sub_total += Number(orderdata.sale_price);
                  total_tax += Number(tax);

                  return (
                    <div
                      className="d-flex justify-content-between mb-3 align-items-center"
                      key={orderdata.id}
                    >
                      <div className="product_img d-flex">
                        <img
                          src={
                            orderdata.all_images
                              ? orderdata.all_images
                              : orderdata.all_images === "null"
                                ? "https://t3.ftcdn.net/jpg/05/37/73/58/360_F_537735846_kufBp10E8L4iV7OLw1Kn3LpeNnOIWbvf.jpg"
                                : null
                          }
                          alt="apnaorganic"
                        />
                        <div className="product_name_detial ps-3">
                          <h6> Name: {orderdata.product_title_name}</h6>
                          {orderdata.unit === "gms" ? (
                            <p>weight:{orderdata.unit_quantity} grm</p>
                          ) : orderdata.unit === "ml" ? (
                            <p>Volume:{orderdata.unit_quantity} ml</p>
                          ) : orderdata.unit === "pcs" ? (
                            <>
                              <p>color:{orderdata.colors}</p>
                              <p>size:{orderdata.size}</p>
                            </>
                          ) : null}
                        </div>
                      </div>

                      <div className="product_price">
                        {" "}
                        MRP-₹{orderdata.mrp} ({Number(orderdata.discount)}% )
                        <br /> Discount- ₹{Number(discont).toFixed(2)}
                        <br />
                        Product Price- ₹
                        {Number(orderdata.product_price).toFixed(2)}
                      </div>

                      <div className="product_quantity">
                        Price without tax- <br />₹{price_without_tax.toFixed(2)}
                        <br /> Tax -₹{tax.toFixed(2)}
                      </div>

                      <div className="product_quantity">
                        Sale Price-
                        <br />₹{Number(orderdata.sale_price).toFixed(2)}
                      </div>

                      <div className="product_quantity">
                        QTY-{orderdata.order_quantity}
                      </div>
                      <div className="total_amount">
                        {" "}
                        Total Price- <br />₹{Number(total_price).toFixed(2)}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="delivery_charges">
                <h5 className="pb-3">Delivery</h5>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="delivery_img d-flex ">
                    <img
                      src="https://media.istockphoto.com/vectors/express-delivery-symbol-vector-id1175078000?b=1&k=20&m=1175078000&s=612x612&w=0&h=2Y5FLXleVSLyaEfZztp2Mhf2pVV6BbqNYkXYs1KHpik="
                      alt="apnaorganic"
                    />
                    <div className="delivery_componay ps-3">
                      <h6>E-Kart</h6>
                      <p>Speed post package</p>
                    </div>
                  </div>
                  <div className="delivery_payment">00</div>
                </div>
              </div>
              <div className="payment_summary">
                <h5 className="pb-3">Payment Summary</h5>
                <div className="payment_summary_total d-flex justify-content-between align-items-center">
                  <div className="Subtotal">
                    <p>Total Price(Excluding Tax)</p>
                  </div>
                  <div className="">
                    ₹{total_priceWithout_tax.toFixed(2)}
                    {/* <span className=""> = {total_tax.toFixed(2) * qty}</span> */}
                  </div>
                </div>

                <div className="payment_summary_total d-flex justify-content-between align-items-center">
                  <div className="Subtotal">
                    <p> Total Tax (Tax x Qty) </p>
                  </div>
                  <div className="">
                    {/* {total_tax.toFixed(2)} x {total_qty} Qty */}
                    <span className=""> ₹ {total_tax_with_qty.toFixed(2)}</span>
                  </div>
                </div>
                <div className="payment_summary_total d-flex justify-content-between align-items-center">
                  <div className="Subtotal">
                    <p>
                      Subtotal
                      <span>
                        ({order.total_quantity} items)(Include all Taxes)
                      </span>
                    </p>
                  </div>
                  <div className="">₹{sub_total.toFixed(2)}</div>
                </div>
                <div className="payment_summary_total d-flex justify-content-between align-items-center">
                  <div className="Subtotal">
                    <p>Delivery Charges</p>
                  </div>
                  <div className="">₹{order.shipping_charges}</div>
                </div>

                <div className="payment_summary_total d-flex justify-content-between align-items-center">
                  <div className="Subtotal">
                    <p> Discont Coupon Ammount </p>
                  </div>
                  <div className="">
                    ₹{Number(order.discount_coupon_value).toFixed(2)}
                  </div>
                </div>
                <div className="payment_summary_total d-flex justify-content-between align-items-center">
                  <div className="Subtotal">
                    <p>
                      <strong>
                        Total paid by customer ( SubTotal - Coupon Discount)
                      </strong>
                    </p>
                  </div>
                  <div className="">
                    <strong>₹{Number(order.total_amount).toFixed(2)}</strong>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="right_side">
                {(user || []).map((userdata) => {
                  return (
                    <div
                      className="customer_name_address"
                      key={userdata.user_id}
                    >
                      <div className="customer_info">
                        <div className="customer">Customer</div>

                        <div className="customer_name_img d-flex py-3">
                          <img src={Profile} alt={"apnaorganic"} />
                          <div className="customer_name ps-4 my-auto">
                            {userdata.first_name} {userdata.last_name}
                          </div>
                        </div>
                        {/* <div className="customer_orders d-flex py-3">
                        <AiOutlineFileText className="order_icon p-1" />

                        <div className="customer_orders_no ps-4 my-auto">
                          {order.total_quantity}
                        </div>
                      </div> */}
                      </div>
                      <div className="contact py-3">
                        <div className="contact_heading pb-3">
                          <h5>Contact Info</h5>
                        </div>
                        <div className="email py-2">
                          <BsFillEnvelopeFill />
                          <span>{userdata.email}</span>
                        </div>
                        <div className="number py-2">
                          <BsTelephoneFill />
                          <span>{userdata.phone_no}</span>
                        </div>
                      </div>
                      <div className="ship_Address py-3">
                        <h5>Ship Address</h5>
                        <div className="address">
                          <p>
                            {" "}
                            {userdata.first_name} {userdata.last_name}
                          </p>
                          <p>{userdata.gender}</p>
                          <p>{userdata.date_of_birth}</p>
                          <p>{userdata.address}</p>
                          <p>{userdata.address2}</p>
                          <p>Indore Madhya Pradesh</p>
                          <p>Pin:452001</p>
                          <p>{userdata.phone_no}</p>
                        </div>
                      </div>
                      <div className="bill_Address py-3">
                        <h5>Bill Address</h5>
                        <div className="address">
                          <p>
                            {userdata.first_name} {userdata.last_name}
                          </p>
                          <p>{userdata.gender}</p>
                          <p>{userdata.date_of_birth}</p>
                          <p>{userdata.address}</p>
                          <p>{userdata.address2}</p>
                          <p>Indore Madhya Pradesh</p>
                          <p>Pin:452001</p>
                          <p>{userdata.phone_no}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default OrderDetail;
