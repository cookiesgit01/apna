import React, { useState } from "react";

// import { useNavigate, useLocation } from "react-router-dom";


import MainButton from "../common/button";

import Logo from '../../../images/logo.png'
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Sellerverifyotp from "./sellerverifyotp";
import SellerLogin from "./sellerlogin";
import SellerForgertPassword from "./sellerforgetpassword";
import SallerChangePassword from "./sellerchangepassword";
import VendorResetPassword from './vendorresetpassword'
const SellerSignupp = () => {

  const [vendorResetpasswordshow, setVendorResetpasswordshow] = useState(false);
  const [sellerLoginshow, setSellerLoginShow] = useState(false);
  const [sellerForgetpasswordshow, setSellerForgetpasswordshow] = useState(false);
  const [sellerChangepasswordshow, setSellerChangepasswordshow] = useState(false);
  const [otpverificationshow, setOtpverificationShow] = useState(false);
  const [sellersignupshow, setSellerSignUpShow] = useState(true)
  const [spinner, setSpinner] = useState(false);
  const [emailVal, setemailVal] = useState("");



  const [emailerror, setemailerror] = useState("");

  const [passval, setpassval] = useState("");


  // const navigate = useNavigate();

  // const { state } = useLocation();

  const [emailvaluebyforget, setEmailvaluebyforget] = useState()

  const getdatafromForgetpassword = (data) => {
    setEmailvaluebyforget(data)


  }


  const sellerloginfunction = () => {
    setSellerLoginShow(true)
    setSellerSignUpShow(false)
  }



  const onEmailChange = (e) => {
    setemailVal(e.target.value);
    setemailerror("")
  }


  const onPasswordChange = (e) => {
    setpassval(e.target.value);
  };


  const SignUpUser = (e) => {

    e.preventDefault();

    // alert("SINGNNN"+email)
    setSpinner("spinner");
    axios
      .post(`${process.env.REACT_APP_BASEURL}/vendor_signup`, {
        email: emailVal,
      })
      .then((response) => {

        setSpinner(false);
        if (response.data.response === false) {
          setemailerror("Already Exist. Please Login");
          setemailVal("")
          // emailVal = "";
        } else if (response.data.message === "invalid address") {
          setemailerror("invalid address");
          setSpinner(false);
        } else {
          setSpinner(false);
          setemailerror("")
          setOtpverificationShow(true)
          setSellerSignUpShow(false)
        }
        return response;
      })
      .catch((error) => { });
  };
  return (
    // <Fragment>
    <>
      <div className="for_scrol">
        <div className="container">
          <div className="row mt-5">
            <div className="col-xl-4 col-lg-6 m-auto">
              <div className="heading_logo text-center">
                <div className="logo">
                  <img src={Logo} alt={"apnaorganic"} />
                </div>
                <div className="heading_line">
                  <h3>Seller Signup On Apna Organic</h3>
                </div>
              </div>

              {/* vendor sign up[  start] */}
              {sellersignupshow === true ? <div className="admin_login_form">
                <div className="log-in-box">
                  <div className="log-in-title">
                    <h4>Sign Up In Your Account</h4>
                  </div>
                  <div className="input-box">
                    <form className="row g-4" onSubmit={SignUpUser}>
                      <div className="col-12">
                        <div className="form-floating theme-form-floating log-in-form">
                          <input
                            required
                            onChange={(e) => { onEmailChange(e) }}
                            type="email"
                            className="form-control"
                            name={"admin_email"}

                            placeholder="Email Address"
                          />
                          {emailerror === "Already Exist. Please Login" ? (
                            <p className="text-danger">
                              {"Vendor Already Exist. Please Login"}
                            </p>
                          ) : emailerror === "invalid address" ? (
                            <p className="mt-1 ms-2 text-danger" type="invalid">
                              Please Enter Correct Email
                            </p>
                          ) : null}
                          <label htmlFor="email">Email Address</label>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="form-floating theme-form-floating log-in-form">
                          <input
                            required
                            onChange={(e) => onPasswordChange(e)}
                            type="password"
                            className="form-control"
                            name={"admin_password"}

                            placeholder="Password"
                          />

                          <label htmlFor="password">Password</label>
                        </div>
                      </div>

                      <div className="col-12 py-2">
                        <div className="forgot-box d-flex justify-content-between">
                          <div className="forgot-box">
                            <div className="form-check ps-0 m-0 remember-box">
                              <input
                                className="checkbox_animated check-box"
                                type="checkbox"
                                id="flexCheckDefault"
                                name="termscheck"
                                required
                              />
                              <label
                                className="form-check-label"
                                htmlFor="flexCheckDefault"
                              >
                                I agree with
                                <span>Terms</span> and <span>Privacy</span>
                              </label>
                            </div>
                          </div>
                          {/* <NavLink to="/forgot" className="forgot">
                            Forgot Password?
                          </NavLink> */}
                          {/* <div
                      onClick={sellerForgetPasswordFunction}
                       className="sign-up-box"

                     > 
                          Forget password?
                     </div>  */}
                        </div>
                      </div>

                      <div className="col-12">
                        {spinner === "spinner" ?
                          <MainButton
                            btntext={<Spinner animation="border" role="status">
                              <span className="visually-hidden">

                                Sign Up
                              </span>
                            </Spinner>}
                            btnclass={"w-100 btn-success btn"}
                          >
                          </MainButton> :
                          <MainButton
                            btntext={"Sign Up"}
                            btnclass={"w-100 btn-success btn"}
                          ></MainButton>}

                      </div>
                    </form>
                  </div>

                  <div className="other-log-in">
                    <h6>OR</h6>
                  </div>

                  <div className="log-in-button">
                    <ul className="p-0">
                      <li>
                        <a
                          href="https://accounts.google.com/v3/signin/identifier?dsh=S335595010%3A1674045400989712&elo=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin&ifkv=AWnogHcsSuHeBcyABLSxgnqLHAmOiTyG0zqs4sEUAkLXL2LxAh8ahBIUYpRtRNWc3u3bPrfW6G7nlg"
                          className="btn google-button w-100"
                        >
                          {" "}
                          <button className="button main_outline_button w-100">
                            Log In with Google
                          </button>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.facebook.com/"
                          className="btn google-button w-100"
                        >
                          <button className="button main_outline_button w-100">
                            Log In with Facebook
                          </button>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="other-log-in"></div>

                  <div className="sign-up-box">
                    <h4>Already have an account?</h4>

                    <button
                      onClick={sellerloginfunction}
                      className="btn btn-success my-1"
                    >

                      Log In
                    </button>

                  </div>
                  <div className="other-log-in"></div>


                </div>
              </div> : sellersignupshow === false ? null : null}


              {/* vendor signup end here */}


              {/* vendor otp verification start here  */}
              {otpverificationshow === true ? <Sellerverifyotp vendorEmail={emailVal} vendorPaasword={passval} /> : null}

              {/* vendor otp verification End here  */}


              {/* seller Login start here */}
              {sellerLoginshow === true ? <SellerLogin forgetpassword={setSellerForgetpasswordshow} showsellerlogin={setSellerLoginShow} sellersign={setSellerSignUpShow} sellerChangePsword={setSellerChangepasswordshow} vendorResetPsword={setVendorResetpasswordshow} /> : sellerLoginshow === false ? null : null}

              {/* seller login end here */}

              {/* seller forget password start here */}
              {sellerForgetpasswordshow === true ? <SellerForgertPassword changePasswordProp={setSellerChangepasswordshow} forgetpassword={setSellerForgetpasswordshow} getdatafromchild={getdatafromForgetpassword} /> : sellerForgetpasswordshow === false ? null : null}
              {/* seller forget password start here */}


              {/* seller change password start here */}
              {sellerChangepasswordshow === true ? <SallerChangePassword sendEmailValue={emailvaluebyforget} forgetpassword={setSellerForgetpasswordshow} showsellerlogin={setSellerLoginShow} sellersign={setSellerSignUpShow} sellerChangePsword={setSellerChangepasswordshow} /> : sellerChangepasswordshow === false ? null : null}

              {/* seller change password end here */}



              {/* vendor reset password start here */}
              {vendorResetpasswordshow === true ? <VendorResetPassword /> : vendorResetpasswordshow === false ? null : null}

              {/* vendor reset password End here */}
            </div>
          </div>
        </div>
      </div>
    </>



  );
};
export default SellerSignupp;
