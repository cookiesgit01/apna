import React, { Fragment, useState } from "react";
// import { useNavigate } from "react-router-dom";

import MainButton from "../common/button";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";

const SellerForgertPassword = (props) => {
  const [spinner, setSpinner] = useState(false);

  const [forgotemail, setforgotemail] = useState("");

  const [emailerror, setemailerror] = useState("");


  // const { state } = useLocation();

  const handlefORGOTFormChange = (e) => {
    setemailerror("");
    setforgotemail(e.target.value);
  };

  const forgotPassword = (e) => {
    // var regex = /^([a-zA-Z0-9_.+-])+(([a-zA-Z0-9-])+\.)+([a-zA-Z]{2,4})+$/;
    var rst = /\S+@\S+\.\S+/.test(forgotemail);
    if (rst === false) {
      setemailerror("ForgetEmailEmpty");
    } else {
      setSpinner("spinner");
      e.preventDefault();
      axios
        .post(`http://192.168.29.108:5000/vendor_forgot_password`, {
          email: `${forgotemail}`,
        })
        .then((response) => {
          if (response.data.message === "User Not Exist") {
            setSpinner(false);
            setemailerror("usernotFound");
          } else if (
            response.data.message === "Send otp in Gmail Succesfully"
          ) {
            setSpinner(false);
            props.changePasswordProp(true);
            props.forgetpassword(false);
            setemailerror("otpsend");
            props.getdatafromchild(forgotemail, "otpsend");
          } else {
          }
        });
    }
  };

  return (
    <Fragment>
      <div className="admin_login_form">
        <div className="log-in-box">
          <div className="log-in-title">
            <h4>Forgot your password</h4>
          </div>

          <div className="input-box">
            <form className="row g-4">
              <div className="col-12">
                <div className="form-floating theme-form-floating log-in-form">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    onChange={(e) => handlefORGOTFormChange(e)}
                    value={forgotemail}
                    name={"email"}
                    placeholder="Email Address"
                  />
                  <label for="email">Email Address</label>
                </div>

                {emailerror === "ForgetEmailEmpty" ? (
                  <p className="mt-1 ms-2 text-danger" type="invalid">
                    Please Enter Correct Email
                  </p>
                ) : emailerror === "usernotFound" ? (
                  <p className="mt-1 ms-2 text-danger" type="invalid">
                    Email Address not Found
                  </p>
                ) : null}
              </div>

              <div className="col-12">
                {spinner === "spinner" ? (
                  <MainButton
                    btntext={
                      <Spinner animation="border" role="status">
                        <span className="visually-hidden">Forgot password</span>
                      </Spinner>
                    }
                    onClick={(e) => {
                      forgotPassword(e);
                    }}
                    btnclass={"w-100 btn-success btn"}
                  ></MainButton>
                ) : (
                  <MainButton
                    btntext={" Forgot password"}
                    btnclass={"w-100 btn-success btn"}
                    onClick={(e) => {
                      forgotPassword(e);
                    }}
                  ></MainButton>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default SellerForgertPassword;
