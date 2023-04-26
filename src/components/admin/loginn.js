import React, { Fragment } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import useHook from "./useHook";

const Loginn = () => {
  const [logindata, setLogindata] = useState({});

  //Final submit function
  const formLogin = () => {
  };
  // hook call
  const { loginerror, customValidates } = useHook(formLogin);
  const handleSubmit = (e) => {
    console.log("Form Values ", logindata);

    e.preventDefault();
    Object.entries(logindata).forEach(([field, value]) => {
      customValidates(field, value);
    });
  };
  return (
    <Fragment>
      <div className="for_scrol">
        <div className="container">
          <div className="row mt-5">
            <div className="col-xl-4 col-lg-6 m-auto">
              <div className="heading_logo text-center">
                <div className="heading_line">
                  <h3>Sell On Apna Organic</h3>
                </div>
              </div>
              <div className="admin_login_form">
                <div className="log-in-box">
                  <div className="log-in-title">
                    <h4>Log In Your Account</h4>
                  </div>
                  <div className="input-box">
                    <form className="row g-4" onSubmit={handleSubmit}>
                      <div className="col-12">
                        <div className="form-floating theme-form-floating log-in-form">
                          <input
                            onChange={(e) => setLogindata(e.target.value)}
                            type=""
                            className={
                              loginerror.admin_email
                                ? "form-control border-danger"
                                : "form-control"
                            }
                            name={"admin_email"}
                            // value={admin_email}
                            placeholder="Email Address"
                          />

                          <label htmlFor="email">Email Address</label>
                        </div>
                        {loginerror.admin_email && (
                          <h5 className="text-danger">
                            {loginerror.admin_email}
                          </h5>
                        )}
                      </div>

                      <div className="col-12">
                        <div className="form-floating theme-form-floating log-in-form">
                          <input
                            onChange={(e) => setLogindata(e.target.value)}
                            type="password"
                            className={
                              loginerror.admin_password
                                ? "form-control border-danger"
                                : "form-control"
                            }
                            name={"admin_password"}
                            // value={admin_password}
                            placeholder="Password"
                          />

                          <label htmlFor="password">Password</label>
                        </div>
                        {loginerror.admin_password && (
                          <h5 className="text-danger">
                            {loginerror.admin_password}
                          </h5>
                        )}
                      </div>

                      <div className="col-12">
                        <button type="submit">login</button>
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
                    <NavLink to="/change_password">Reset Password</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Loginn;
