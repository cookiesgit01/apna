import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import moment from "moment";

const Invoice = () => {
  let invoice_no = localStorage.getItem("invoice_no");
  let order_number = localStorage.getItem("invoiceid");
  const token = localStorage.getItem("token");

  const [userdetails, setUserdetails] = useState([]);

  const [invoicedetails, setInvoiceDetails] = useState([]);

  const [productorder, setproductOrder] = useState([]);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BASEURL}/invoice_details?invoice_no=${invoice_no}`,
        {
          headers: {
            admin_token: token,
          },
        }
      )
      .then((response) => {
        setInvoiceDetails(response.data);
      });

    oreder_details();
  }, []);

  const oreder_details = () => {
    axios
      .post(
        `${process.env.REACT_APP_BASEURL_0}/order_deteils`,
        {
          id: order_number,
        },
        {
          headers: {
            admin_token: token,
          },
        }
      )
      .then((response) => {
        const UserId = Number(response.data.user_id);
        setproductOrder(response.data.product_types);

        axios
          .post(
            `http://192.168.29.108:5000/user_details`,
            {
              user_id: UserId,
            },
            {
              headers: {
                admin_token: token,
              },
            }
          )
          .then((response) => {
            let data = response.data;
            setUserdetails(data[0]);
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function printDocument() {
    const input = document.getElementById("container1");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const unit = "pt";
      const size = "A2"; // Use A1, A2, A3 or A4
      const orientation = "portrait"; // portrait or landscape
      const pdf = new jsPDF(orientation, unit, size);

      pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.save("Invoice.pdf");
    });
  }
  var totalMrp = 0;
  var total_shipping = 0;
  var total_Product_price = 0;
  var total_sale_price = 0;
  var total = 0;
  var grand_total = 0;
  var total_tax = 0;
  let qty = 0;

  //  let total_tax_with_qty = 0;
  let total_priceWithout_tax = 0;
  return (
    <>
      {/* <Document >
            <Page size="A4" style={''}> */}
      <div className="container" id="container1">
        <div className="invoice">
          <div className="card">
            <div className="card-body">
              <div className="table-responsive-sm p-3">
                <table className="invoice_header w-100">
                  <thead>
                    <tr className="border-bottom">
                      <td className="align-bottom" width={"50%"}>
                        <h2 className="m-0 mt-2">
                          <b>INVOICE</b>
                        </h2>
                      </td>
                      <td className="text-end">
                        <h5 className="text-uppercase m-0">
                          <b>Apna Organic Store</b>
                        </h5>
                        <p className="m-0">
                          Plot No. 45 Universal Tower ,2nd Floor,
                        </p>
                        <p className="m-0">Scheme 54 PU4, Indore, MP 452001</p>
                        <p className="m-0">contact@apnaorganicstore.com</p>
                        <p className="m-0">1234567890</p>
                      </td>
                    </tr>
                  </thead>
                </table>
                <div className="pb-4 pt-4">
                  <table className="invoice_header w-100">
                    <tbody>
                      <tr className="">
                        <td className="">
                          <h5 className="text-uppercase m-0">
                            <b>Order Detail:</b>
                          </h5>
                          <p className="m-0">
                            <b>Invoice No : </b>
                            {invoicedetails.invoice_no}
                          </p>

                          <p className="m-0">
                            <b>Order Id : </b> {invoicedetails.id}
                          </p>

                          <p className="m-0">
                            <b>Order Date : </b>
                            {moment(invoicedetails.order_date).format(
                              "YYYY-MM-DD"
                            )}
                          </p>
                          <p className="m-0">
                            <b>Invoice Date : </b>{" "}
                            {moment(invoicedetails.invoice_date).format(
                              "YYYY-MM-DD"
                            )}
                          </p>
                        </td>
                        <td className="">
                          <h5 className="text-uppercase m-0">
                            <b>Bill to: </b>
                          </h5>
                          <p className="m-0">
                            <b>Name : </b>
                            {userdetails.first_name} &nbsp;
                            {userdetails.last_name} ,
                          </p>
                          <p className="m-0">
                            <b> Home Address : </b>
                            {userdetails.address}
                          </p>
                          <p className="m-0">
                            <b> Office Address : </b>
                            {userdetails.address2}
                          </p>
                          <p className="m-0">
                            <b> Email : </b>
                            {userdetails.email}
                          </p>

                          <p className="m-0">
                            <b> Mobile : </b>
                            {userdetails.phone_no}
                          </p>
                        </td>
                        <td className="">
                          <h5 className="text-uppercase m-0">
                            <b>Ship to: </b>
                          </h5>
                          <p className="m-0">
                            <b>Name : </b>
                            {userdetails.first_name} &nbsp;
                            {userdetails.last_name}
                          </p>
                          <p className="m-0">
                            <b> Home Address : </b>
                            {userdetails.address}
                          </p>
                          <p className="m-0">
                            <b> Office Address : </b>
                            {userdetails.address2}
                          </p>
                          <p className="m-0">
                            <b> Email : </b>
                            {userdetails.email}
                          </p>

                          <p className="m-0">
                            <b> Mobile : </b>
                            {userdetails.phone_no}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <table className="table table-striped border">
                  <thead>
                    <tr>
                      <th className="center">
                        Total Product({invoicedetails.total_quantity})
                      </th>
                      <th> ₹ MRP </th>
                      <th> ₹ Shipping charges </th>
                      <th> ₹ Product Price</th>
                      <th className="center">₹ Taxable Price </th>
                      <th className="center"> ₹ Tax </th>
                      <th className="right">₹ Sale Price </th>
                      <th>Qty</th>

                      <th className="right">₹ Total amount </th>
                    </tr>
                  </thead>

                  <tbody>
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
                      let tax =
                        (Number(orderdata.sale_price) * countAllText) / 100;

                      totalMrp += Number(orderdata.mrp);
                      total_shipping += Number(invoicedetails.shipping_charges);
                      qty = orderdata.order_quantity;

                      let total_price = orderdata.sale_price * qty;

                      // let Total_taxMultiply_qty = tax * qty;
                      total_Product_price += Number(orderdata.product_price);
                      total_sale_price += Number(orderdata.sale_price);
                      let price_without_tax =
                        Number(orderdata.product_price).toFixed(2) - tax;


                      total_priceWithout_tax += Number(price_without_tax);

                      total += Number(total_price);
                      grand_total += Number(total_price + total_shipping);
                      total_tax += Number(tax);

                      return (
                        <tr key={orderdata.id}>
                          <td className="center">
                            <b> {orderdata.product_title_name}</b>
                            <br />
                            {orderdata.unit === "gms" ? (
                              <small>
                                <b>weight:</b> {orderdata.unit_quantity} grm
                              </small>
                            ) : orderdata.unit === "ml" ? (
                              <small>
                                {" "}
                                <b>volume:</b>
                                {orderdata.unit_quantity} ml
                              </small>
                            ) : orderdata.unit === "pcs" ? (
                              <>
                                <small>
                                  <b>color:</b>:{orderdata.colors}
                                </small>
                                <br />
                                <small>
                                  <b>size:</b>
                                  {orderdata.size}
                                </small>
                              </>
                            ) : null}
                          </td>

                          <td className="left">
                            ₹{Number(orderdata.mrp)}
                            <br />
                            <small>
                              {" "}
                              <b>Discount:</b>₹{discont} (
                              {Number(orderdata.discount)}% )
                            </small>
                          </td>
                          <td className="left">
                            ₹ {Number(invoicedetails.shipping_charges)}
                          </td>
                          <td className="left">
                            ₹ {Number(orderdata.product_price).toFixed(2)}{" "}
                          </td>
                          <td className="left">
                            ₹ {price_without_tax.toFixed(2)} <br />
                          </td>
                          <td className="left">
                            ₹ {tax.toFixed(2)} ({countAllText}%)
                            <br />
                          </td>
                          <td className="left">
                            ₹{Number(orderdata.sale_price).toFixed(2)}
                          </td>
                          <td className="">{orderdata.order_quantity}</td>

                          <td className="left">
                            {Number(total_price).toFixed(2)}
                          </td>
                        </tr>
                      );
                    })}
                    <tr>
                      <th className="font-weight-bold">
                        <b>Total</b>
                      </th>
                      <th className="">
                        <b> ₹ {totalMrp.toFixed(2)} </b>
                      </th>
                      <th className="">
                        <b>₹ {total_shipping.toFixed(2)}</b>
                      </th>
                      <th className="">
                        <b> ₹ {total_Product_price.toFixed(2)} </b>
                      </th>
                      <th className="">
                        <b> ₹ {total_priceWithout_tax.toFixed(2)} </b>
                      </th>
                      <th className="">
                        <b> ₹ {total_tax.toFixed(2)}</b>
                      </th>
                      <th className="">
                        <b> ₹{total_sale_price.toFixed(2)}</b>
                      </th>
                      <th className="">
                        <b> </b>
                      </th>
                      <th className="">
                        <b> ₹{total.toFixed(2)} </b>
                      </th>
                    </tr>
                    <tr>
                      <th
                        colSpan={"8"}
                        className="font-weight-bold text-end p-4"
                      >
                        <h5>
                          <b>Grand Total</b>
                        </h5>
                      </th>
                      <th className="pt-4 pb-4">
                        <h5>
                          <b>{grand_total.toFixed(2)} </b>
                        </h5>
                      </th>
                    </tr>
                  </tbody>
                </table>
                <div className="col-md-12 text-end">
                  <h5>Apna Organic Store</h5>
                  <h5>Authorised Signatury</h5>
                </div>
                <div className="col-md-12 border-top p-2">
                  <p>
                    <b>Returns Policy:</b> At Apna Organic we try to deliver
                    perfectly each and every time. But in the off-chance that
                    you need to return the item, please do so with the{" "}
                    <b>
                      original Brand box/price tag, original packing and invoice
                    </b>{" "}
                    without which it will be really difficult for us to act on
                    your request. Please help us in helping you. Terms and
                    conditions apply.
                  </p>
                  <p>
                    The goods sold as are intended for end user consumption and
                    not for re-sale.
                  </p>
                </div>
              </div>
            </div>
            <div className="mb-5 m-auto">
              <button
                onClick={() => printDocument()}
                className="btn btn-outline-success m-auto"
              >
                Print
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
// const MyDoc = () => (
//     <Document >
//         <Page size="A4" style={''}>
//             <div className="container">
//                 <div className="invoice">
//                     <div className="card">
//                         <div className="card-body">
//                             <div className="table-responsive-sm p-3">
//                                 <table className="invoice_header">
//                                     <tr className="border-bottom">
//                                         <td className="align-bottom" width={'50%'}>
//                                             <img src={logo} className="w-25" />
//                                             <h2 className="m-0 mt-2"><b>INVOICE</b></h2>
//                                         </td>
//                                         <td className="text-end">
//                                             <h5 className="text-uppercase m-0"><b>Apna Organic Store</b></h5>
//                                             <p className="m-0">Plot No. 45 Universal Tower ,2nd Floor,</p>
//                                             <p className="m-0">Scheme 54 PU4, Indore, MP 452001</p>
//                                             <p className="m-0">contact@apnaorganicstore.com</p>
//                                             <p className="m-0">1234567890</p>
//                                         </td>
//                                     </tr>
//                                 </table>
//                                 <div className="pb-4 pt-4">
//                                     <table className="invoice_header w-100">
//                                         <tr className="">
//                                             <td className="">
//                                                 <h5 className="text-uppercase m-0"><b>Order Detail:</b></h5>
//                                                 <p className="m-0"><b>Invoice No:</b> #FAJ6EI2300006199</p>
//                                                 <p className="m-0"><b>Order Id:</b> #1212131</p>
//                                                 <p className="m-0"><b>Order Date:</b> 24-09-2022</p>
//                                                 <p className="m-0"><b>Invoice Date:</b> 24-09-2022</p>
//                                                 <p className="m-0"><b>GSTIN:</b> 23AAACX2827R1ZX</p>
//                                             </td>
//                                             <td className="">
//                                                 <h5 className="text-uppercase m-0"><b>Bill to:</b></h5>
//                                                 <p className="m-0">Plot No. 45 Universal Tower ,2nd Floor,</p>
//                                                 <p className="m-0">Scheme 54 PU4, Indore, MP 452001</p>
//                                                 <p className="m-0">contact@apnaorganicstore.com</p>
//                                                 <p className="m-0">1234567890</p>
//                                             </td>
//                                             <td className="">
//                                                 <h5 className="text-uppercase m-0"><b>Ship to:</b></h5>
//                                                 <p className="m-0">Plot No. 45 Universal Tower ,2nd Floor,</p>
//                                                 <p className="m-0">Scheme 54 PU4, Indore, MP 452001</p>
//                                                 <p className="m-0">contact@apnaorganicstore.com</p>
//                                                 <p className="m-0">1234567890</p>
//                                             </td>
//                                         </tr>
//                                     </table>
//                                 </div>
//                                 <table className="table table-striped border">
//                                     <thead>
//                                         <tr>
//                                             <th className="center">Product</th>
//                                             <th>Qty</th>
//                                             <th>Gross Amount ₹</th>

//                                             <th className="right">Discounts/Coupons ₹</th>
//                                             <th className="center">Taxable Value ₹</th>
//                                             <th className="center">CGST ₹</th>
//                                             <th className="center">SGST/UTGST ₹</th>
//                                             <th className="right">Total ₹</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         <tr>
//                                             <td className="center"><b>OPPO K10 5G (Ocean Blue, 128 GB)</b><br />
//                                                 <small>CGST: 9.0 %</small><br />
//                                                 <small>SGST/UTGST: 9.0 %</small>
//                                             </td>
//                                             <td className="">1</td>
//                                             <td className="left">15999.00</td>
//                                             <td className="left">-1283.00</td>
//                                             <td className="left">12471.18</td>
//                                             <td className="left">1122.40</td>
//                                             <td className="left">1122.40</td>
//                                             <td className="left">14716.00</td>
//                                         </tr>
//                                         <tr>
//                                             <td className="center"><b>OPPO K10 5G (Ocean Blue, 128 GB)</b><br />
//                                                 <small>CGST: 9.0 %</small><br />
//                                                 <small>SGST/UTGST: 9.0 %</small>
//                                             </td>
//                                             <td className="">1</td>
//                                             <td className="left">15999.00</td>
//                                             <td className="left">-1283.00</td>
//                                             <td className="left">12471.18</td>
//                                             <td className="left">1122.40</td>
//                                             <td className="left">1122.40</td>
//                                             <td className="left">14716.00</td>
//                                         </tr>
//                                         <tr>
//                                             <td className="center"><b>Shipping And Packaging Charges</b>
//                                             </td>
//                                             <td className="">2</td>
//                                             <td className="left">99.00</td>
//                                             <td className="left">-70.00</td>
//                                             <td className="left">24.58</td>
//                                             <td className="left">2.21</td>
//                                             <td className="left">2.21</td>
//                                             <td className="left">29.00</td>
//                                         </tr>
//                                         <tr>
//                                             <th className="font-weight-bold"><b>Total</b></th>
//                                             <th className=""><b>2</b></th>
//                                             <th className=""><b>16098.00</b></th>
//                                             <th className=""><b>-1353.00</b></th>
//                                             <th className=""><b>12495.76</b></th>
//                                             <th className=""><b>1124.61</b></th>
//                                             <th className=""><b>1124.61</b></th>
//                                             <th className=""><b>14745.00</b></th>
//                                         </tr>
//                                         <tr>
//                                             <th colSpan={'7'} className="font-weight-bold text-end p-4"><h5><b>Grand Total</b></h5></th>
//                                             <th className="pt-4 pb-4"><h5><b>14745.00</b></h5></th>
//                                         </tr>
//                                     </tbody>
//                                 </table>
//                                 <div className="col-md-12 text-end">
//                                     <h5>Apna Organic Store</h5>
//                                     <img src={logo} className='w-25 p-4 pt-1 pb-1 px-1' />
//                                     <h5>Authorised Signatury</h5>
//                                 </div>
//                                 <div className="col-md-12 border-top p-2">
//                                     <p><b>Returns Policy:</b> At Apna Organic we try to deliver perfectly each and every time. But in the off-chance that you need to return the item, please do so with the <b>original Brand box/price
//                                         tag, original packing and invoice</b> without which it will be really difficult for us to act on your request. Please help us in helping you. Terms and conditions apply.</p>
//                                     <p>The goods sold as are intended for end user consumption and not for re-sale.</p>

//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </Page>
//     </Document>
// );
// const Invoice = () => (
//     <div>
//         {/* <div className="container p-0">
//                 <div className="invoice">
//                     <div className="card">
//                         <div className="card-body">
//                             <div className="table-responsive-sm p-3">
//                                 <table className="invoice_header">
//                                     <tr className="border-bottom">
//                                         <td className="align-bottom" width={'50%'}>
//                                             <img src={logo} className="w-25" />
//                                             <h2 className="m-0 mt-2"><b>INVOICE</b></h2>
//                                         </td>
//                                         <td className="text-end">
//                                             <h5 className="text-uppercase m-0"><b>Apna Organic Store</b></h5>
//                                             <p className="m-0">Plot No. 45 Universal Tower ,2nd Floor,</p>
//                                             <p className="m-0">Scheme 54 PU4, Indore, MP 452001</p>
//                                             <p className="m-0">contact@apnaorganicstore.com</p>
//                                             <p className="m-0">1234567890</p>
//                                         </td>
//                                     </tr>
//                                 </table>
//                                 <div className="pb-4 pt-4">
//                                     <table className="invoice_header w-100">
//                                         <tr className="">
//                                             <td className="">
//                                                 <h5 className="text-uppercase m-0"><b>Order Detail:</b></h5>
//                                                 <p className="m-0"><b>Invoice No:</b> #FAJ6EI2300006199</p>
//                                                 <p className="m-0"><b>Order Id:</b> #1212131</p>
//                                                 <p className="m-0"><b>Order Date:</b> 24-09-2022</p>
//                                                 <p className="m-0"><b>Invoice Date:</b> 24-09-2022</p>
//                                                 <p className="m-0"><b>GSTIN:</b> 23AAACX2827R1ZX</p>
//                                             </td>
//                                             <td className="">
//                                                 <h5 className="text-uppercase m-0"><b>Bill to:</b></h5>
//                                                 <p className="m-0">Plot No. 45 Universal Tower ,2nd Floor,</p>
//                                                 <p className="m-0">Scheme 54 PU4, Indore, MP 452001</p>
//                                                 <p className="m-0">contact@apnaorganicstore.com</p>
//                                                 <p className="m-0">1234567890</p>
//                                             </td>
//                                             <td className="">
//                                                 <h5 className="text-uppercase m-0"><b>Ship to:</b></h5>
//                                                 <p className="m-0">Plot No. 45 Universal Tower ,2nd Floor,</p>
//                                                 <p className="m-0">Scheme 54 PU4, Indore, MP 452001</p>
//                                                 <p className="m-0">contact@apnaorganicstore.com</p>
//                                                 <p className="m-0">1234567890</p>
//                                             </td>
//                                         </tr>
//                                     </table>
//                                 </div>
//                                 <table className="table table-striped border">
//                                     <thead>
//                                         <tr>
//                                             <th className="center">Product</th>
//                                             <th>Qty</th>
//                                             <th>Gross Amount ₹</th>

//                                             <th className="right">Discounts/Coupons ₹</th>
//                                             <th className="center">Taxable Value ₹</th>
//                                             <th className="center">CGST ₹</th>
//                                             <th className="center">SGST/UTGST ₹</th>
//                                             <th className="right">Total ₹</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         <tr>
//                                             <td className="center"><b>OPPO K10 5G (Ocean Blue, 128 GB)</b><br />
//                                                 <small>CGST: 9.0 %</small><br />
//                                                 <small>SGST/UTGST: 9.0 %</small>
//                                             </td>
//                                             <td className="">1</td>
//                                             <td className="left">15999.00</td>
//                                             <td className="left">-1283.00</td>
//                                             <td className="left">12471.18</td>
//                                             <td className="left">1122.40</td>
//                                             <td className="left">1122.40</td>
//                                             <td className="left">14716.00</td>
//                                         </tr>
//                                         <tr>
//                                             <td className="center"><b>OPPO K10 5G (Ocean Blue, 128 GB)</b><br />
//                                                 <small>CGST: 9.0 %</small><br />
//                                                 <small>SGST/UTGST: 9.0 %</small>
//                                             </td>
//                                             <td className="">1</td>
//                                             <td className="left">15999.00</td>
//                                             <td className="left">-1283.00</td>
//                                             <td className="left">12471.18</td>
//                                             <td className="left">1122.40</td>
//                                             <td className="left">1122.40</td>
//                                             <td className="left">14716.00</td>
//                                         </tr>
//                                         <tr>
//                                             <td className="center"><b>Shipping And Packaging Charges</b>
//                                             </td>
//                                             <td className="">2</td>
//                                             <td className="left">99.00</td>
//                                             <td className="left">-70.00</td>
//                                             <td className="left">24.58</td>
//                                             <td className="left">2.21</td>
//                                             <td className="left">2.21</td>
//                                             <td className="left">29.00</td>
//                                         </tr>
//                                         <tr>
//                                             <th className="font-weight-bold"><b>Total</b></th>
//                                             <th className=""><b>2</b></th>
//                                             <th className=""><b>16098.00</b></th>
//                                             <th className=""><b>-1353.00</b></th>
//                                             <th className=""><b>12495.76</b></th>
//                                             <th className=""><b>1124.61</b></th>
//                                             <th className=""><b>1124.61</b></th>
//                                             <th className=""><b>14745.00</b></th>
//                                         </tr>
//                                         <tr>
//                                             <th colSpan={'7'} className="font-weight-bold text-end p-4"><h5><b>Grand Total</b></h5></th>
//                                             <th className="pt-4 pb-4"><h5><b>14745.00</b></h5></th>
//                                         </tr>
//                                     </tbody>
//                                 </table>
//                                 <div className="col-md-12 text-end">
//                                     <h5>Apna Organic Store</h5>
//                                     <img src={logo} className='w-25 p-4 pt-1 pb-1 px-1' />
//                                     <h5>Authorised Signatury</h5>
//                                 </div>
//                                 <div className="col-md-12 border-top p-2">
//                                     <p><b>Returns Policy:</b> At Apna Organic we try to deliver perfectly each and every time. But in the off-chance that you need to return the item, please do so with the <b>original Brand box/price
//                                         tag, original packing and invoice</b> without which it will be really difficult for us to act on your request. Please help us in helping you. Terms and conditions apply.</p>
//                                     <p>The goods sold as are intended for end user consumption and not for re-sale.</p>

//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         <PDFDownloadLink document={<MyDoc />} fileName="somename.pdf">
//             {({blob, url, loading, error }) =>
//                 loading ? 'Loading document...' : 'Download now!'
//             }
//         </PDFDownloadLink> */}
//     </div>
// );
// const blob = pdf(MyDoc).toBlob();
export default Invoice;
