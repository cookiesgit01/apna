import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
// import "./login.css";
import MainButton from "../common/button"

import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

const Sellerverifyotp = (props) => {


  const [spinner, setSpinner] = useState(false);
  const [otp, setotp] = useState(0);

  const [otperror, setOtperror] = useState(false);

  const navigate = useNavigate();

  const OnOTpChange = (e) => {
    setOtperror(false);
    setotp(e.target.value);
  };



  const VerifyOTP = (e) => {

    e.preventDefault();
    if (otp === "null" || otp === null || otp === undefined || otp === "") {
      setOtperror("otpblank");
    } else {

      setSpinner("spinner");
      axios
        .post(`${process.env.REACT_APP_BASEURL}/vendor_otp_verify`, {
          email: props.vendorEmail,
          otp: Number(otp),
          password: props.vendorPaasword,
        })
        .then((response) => {
          setSpinner(false);

          if (response.data.message === "otp not matched") {
            setOtperror("invalid otp");
          } else {
            var { vendor_token } = response.data;
            navigate("/vendorUpdate")


            localStorage.setItem("vendorid", response.insertId);
            localStorage.setItem("vendor_token", vendor_token);

          }
        })
        .catch((error) => { });
    }
  }


  return (
    <Fragment>


      <div className="admin_login_form">
        <div className="log-in-box">
          <div className="log-in-title">
            <h4>Otp verification</h4>
          </div>

          <div className="input-box">
            <form className="row g-4">
              <div className="col-12">
                <div className="form-floating theme-form-floating log-in-form">
                  <input
                    type="number"
                    className="form-control"
                    id="otp"
                    onChange={(e) => OnOTpChange(e)}

                    name="otpinput"
                    placeholder="Email Otp"
                  />
                  <label for="email">Enter OTP</label>
                </div>

                {otperror === "invalid otp" ? (
                  <p className="text-danger">Invalid Otp</p>
                ) : otperror === "otpblank" ? (
                  <p className="mt-1 ms-2 text-danger" type="invalid">
                    Please Enter Otp First
                  </p>
                ) : null}
              </div>

              <div className="col-12">
                {spinner === "spinner" ? <MainButton
                  btntext={<Spinner animation="border" role="status">
                    <span className="visually-hidden">

                      Sign Up
                    </span>
                  </Spinner>}
                  btnclass={"w-100 btn-success btn"}
                  onClick={VerifyOTP}
                /> : <MainButton
                  btntext={"Verify Otp"}
                  btnclass={"w-100 btn-success btn"}
                  onClick={VerifyOTP}
                />}


              </div>
            </form>
          </div>
        </div>
      </div>

    </Fragment>
  );
};
export default Sellerverifyotp;
