import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
// import "./login.css";
// import MainButton from "../common/button";
import MainButton from "../common/button";

import axios from "axios";


const SellerLogin = (props) => {


  const navigate = useNavigate();
  const [error, setError] = useState(true);
  const [loginemailerror, setLoginemailerror] = useState(true);
  const [vendorstatus, setvendorstatus] = useState(false);
  // const { state } = useLocation();
  console.log(error)
  const sellersignupshowFunction = () => {
    props.forgetpassword(false)
    props.showsellerlogin(false)
    props.sellersign(true)
    props.sellerChangePsword(false)
  }
  // const vendorResetPasswordShowFunction = () => {
  //   props.forgetpassword(false)
  //   props.showsellerlogin(false)
  //   props.sellersign(false)
  //   props.vendorResetPsword(true)
  //   props.sellerChangePsword(false)
  // }



  const sellerForgetPasswordFunction = () => {
    props.forgetpassword(true)
    props.showsellerlogin(false)
    props.sellersign(false)
  }

  const [credentailval, setcredentailval] = useState({
    email: "",
    password: "",
  });
  const onCredentialChange = (e) => {
    setLoginemailerror(true)
    setError(true);
    setvendorstatus(false);
    setcredentailval({ ...credentailval, [e.target.name]: e.target.value });
  };

  const OnVendorLoginClick = (e) => {
    navigate('/vendorUpdate')
  };

  const onSubmitClick = (e) => {

    e.preventDefault();

    if (
      credentailval.email === "" ||
      credentailval.email === null ||
      credentailval.email === undefined
    ) {
      setLoginemailerror("emailblank");
    } else if (
      credentailval.password === "" ||
      credentailval.password === null ||
      credentailval.password === undefined
    ) {
      setLoginemailerror("passwordblank");
    } else {
      axios
        .post(`http://192.168.29.108:5000/vendor_login`, {
          email: credentailval.email.trim(),
          password: credentailval.password.trim(),
        })
        .then((response) => {

          if (response.data.message === "email not matched") {
            setLoginemailerror("emailnotmatched");
            setError(true);
          } else if (response.data.message === "password not matched") {
            setLoginemailerror("passwordnotmatch");
            setError(true);
          } else if (response.data.status === "incomplete") {
            // navigate('/vendorUpdate')
            // setHide(true);
            setvendorstatus("incomplete");
            localStorage.setItem("vendor_email", credentailval.email.trim())
            localStorage.setItem("vendorid", response.data.id);
            localStorage.setItem("vendor_token", response.data.vendor_token);
            // setError(true);
          }
          else if (response.data.status === "return") {

            setvendorstatus("return");
            localStorage.setItem("vendorid", response.data.id);
            localStorage.setItem("vendor_token", response.data.vendor_token);

          } else if (
            response.data.status === "pending" ||
            response.data.message === undefined
          ) {
            setvendorstatus("pending");
            localStorage.setItem("vendor_email", credentailval.email.trim())
            localStorage.setItem("vendorid", response.data.id);
            localStorage.setItem("vendor_token", response.data.vendor_token);
            // setError(true);
            credentailval.email = ""
            credentailval.password = ""
          } else if (
            response.data.status === "approve" &&
            response.data.message === undefined
          ) {
            localStorage.setItem("vendor_email", credentailval.email.trim())
            localStorage.setItem("vendorid", response.data.id);
            localStorage.setItem("vendor_token", response.data.vendor_token);
            navigate("/");
            //  setError(false);
          }
        })
        .catch((error) => { });
    }
  };
  return (
    <Fragment>



      {/* Seller login start here */}
      <div className="admin_login_form">
        <div className="log-in-box">
          <div className="log-in-title">
            <h4>Log In Your Account</h4>
          </div>
          <div className="input-box">
            <form className="row g-4" onSubmit={vendorstatus === "incomplete"
              ? (e) => { OnVendorLoginClick() }
              : (e) => onSubmitClick(e)}>
              <div className="col-12">
                <div className="form-floating theme-form-floating log-in-form">
                  <input
                    required
                    onChange={(e) => onCredentialChange(e)}
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    value={credentailval.email}
                    placeholder="Email Address..."
                  />

                  <label htmlFor="email">Email Address</label>
                  {loginemailerror === false ? (
                    <p className="mt-1 ms-2 text-danger" type="invalid">
                      Please Sign In First
                    </p>
                  ) : loginemailerror === "emailnotmatched" ? (
                    <p className="mt-1 ms-2 text-danger" type="invalid">
                      Please Fill Correct Email
                    </p>
                  ) : loginemailerror === "emailblank" ? (
                    <p className="mt-1 ms-2 text-danger" type="invalid">
                      Please Fill Email
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="col-12">
                <div className="form-floating theme-form-floating log-in-form">
                  <input
                    required
                    onChange={(e) => onCredentialChange(e)}
                    value={credentailval.password}
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"

                    placeholder="Password"
                  />

                  <label htmlFor="password">Password</label>
                  {loginemailerror === "passwordblank" ? (
                    <p className="mt-1 ms-2 text-danger" type="invalid">
                      Please Fill Password
                    </p>
                  ) : loginemailerror === "passwordnotmatch" ? (
                    <p className="mt-1 ms-2 text-danger" type="invalid">
                      Please Fill Correct Password
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="col-12 py-2">
                <div className="forgot-box d-flex justify-content-between">
                  <div className="form-check ps-0 m-0 remember-box">
                    <input
                      className="checkbox_animated check-box"
                      type="checkbox"
                      id="flexCheckDefault"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                      Remember me
                    </label>
                  </div>
                  <span
                    onClick={sellerForgetPasswordFunction}
                    className="sign-up-box"
                    style={{ cursor: "pointer", color: "blue" }}
                  >
                    Forget password?
                  </span>
                </div>
              </div>
              {vendorstatus === "return" ? <span className="text-denger">Your request is Return please fullfill currect documents </span> : vendorstatus === "pending" ? <span className="text-denger">Your request is Pending please wait for approval </span> : vendorstatus === false ? null : null}
              <div className="col-12">
                <MainButton
                  btntext={vendorstatus === "incomplete" ? "Update Profile" : " Log In"}
                  btnclass={"w-100 btn-success btn"}
                ></MainButton>
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
            <h4>Create New Account?</h4>

            <button
              onClick={sellersignupshowFunction}
              className="btn btn-success my-1"
            >

              Signup
            </button>
            <div className="other-log-in"></div>

            {/* <span className="sign-up-box"  style={{cursor:"pointer" ,color:"red"}} onClick={vendorResetPasswordShowFunction}>
                Reset Password
                    </span> */}

          </div>
        </div>
      </div>
      {/* seller login end here */}

    </Fragment>
  );
};
export default SellerLogin;
