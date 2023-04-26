import React from "react";
import "./invoice.css";
const Invoice = () => {

  return (
    <div className="container">
      <div className="invoice">
        <div className="card">
          <div className="card-header heading">
            INVOICE
            <span className="float-right"></span>
          </div>
          <div className="card-body">
            <div className="row mb-4">
              <div className="col-sm-6">
                <h6 className="mb-3">From:</h6>
                <div>
                  <strong>Gourav Choudhary</strong>
                </div>
                <div>74, C21 Mall</div>
                <div>Indore MP</div>
                <div>Email: info@webz.com.pl</div>
                <div>Phone: +91 985 686 9865</div>
              </div>

              <div className="col-sm-6">
                <h6 className="mb-3">To:</h6>
                <div>
                  <strong>Shivani</strong>
                </div>
                <div>Attn: Daniel Marek</div>
                <div>MR9 Indore MP</div>
                <div>Email: marek@daniel.com</div>
                <div>Phone: +91 568 568 56</div>
              </div>
            </div>

            <div className="table-responsive-sm">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th className="center">#</th>
                    <th>Item</th>
                    <th>Description</th>

                    <th className="right">Price</th>
                    <th className="center">Qty</th>
                    <th className="right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="center">1</td>
                    <td className="left strong">Hunny</td>
                    <td className="left">Sweet Hunny</td>

                    <td className="right">$15</td>
                    <td className="center">1</td>
                    <td className="right">$15</td>
                  </tr>
                  <tr>
                    <td className="center">2</td>
                    <td className="left strong">shoes</td>
                    <td className="left">Runing shoes</td>

                    <td className="right">$20</td>
                    <td className="center">2</td>
                    <td className="right">$40</td>
                  </tr>
                  <tr>
                    <td className="center">3</td>
                    <td className="left strong">T-Shirt</td>
                    <td className="left">100% cotton</td>

                    <td className="right">$10</td>
                    <td className="center">3</td>
                    <td className="right">$30</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="row">
              <div className="col-lg-4 col-sm-5"></div>

              <div className="col-lg-4 col-sm-5 ml-auto">
                <table className="table table-clear">
                  <tbody>
                    <tr>
                      <td className="left">
                        <strong>Total Amount</strong>
                      </td>
                      <td className="right">
                        <strong>$85</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Invoice;
