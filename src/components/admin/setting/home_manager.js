import React from "react";
import Form from "react-bootstrap/Form";
import "./setting.css";

function Home() {

  return (
    <div className="main_body">
      <h2>Home Manager</h2>
      <div className="w-100 d-flex justify-content-between flex-row card my-2">
        <div className="banner_switch p-3">
          <p className="contant_location m-0">
            Location:- <span>Header</span>
          </p>
          <span className="location_path lead">(Header fist left side)</span>
        </div>
        <div className="hide_show d-flex p-3">
          <h5 className="m-auto lead">Hide</h5>
          <Form.Switch
            name="group1"
            isValid="true"
            defaultChecked
            className="mx-2 mt-2"
          />
          <h5 className="m-auto lead">show</h5>
        </div>
      </div>
      <div className="w-100 d-flex justify-content-between flex-row card my-2">
        <div className="banner_switch p-3">
          <p className="contant_location m-0">
            Location:- <span>Header</span>
          </p>
          <span className="location_path lead">(Header fist right side)</span>
        </div>
        <div className="hide_show d-flex p-3">
          <h5 className="m-auto lead">Hide</h5>
          <Form.Switch
            name="group1"
            isValid="true"
            defaultChecked
            className="mx-2 mt-2"
          />
          <h5 className="m-auto lead">show</h5>
        </div>
      </div>
      <div className="w-100 d-flex justify-content-between flex-row card my-2">
        <div className="banner_switch p-3">
          <p className="contant_location m-0">
            Location:- <span>Header</span>
          </p>
          <span className="location_path lead">(Header center side)</span>
        </div>
        <div className="hide_show d-flex p-3">
          <h5 className="m-auto lead">Hide</h5>
          <Form.Switch name="group1" isValid="true" className="mx-2 mt-2" />
          <h5 className="m-auto lead">show</h5>
        </div>
      </div>
      <div className="w-100 d-flex justify-content-between flex-row card my-2">
        <div className="banner_switch p-3">
          <p className="contant_location m-0">
            Location:- <span>Footer</span>
          </p>
          <span className="location_path lead">(Header fist left side)</span>
        </div>
        <div className="hide_show d-flex p-3">
          <h5 className="m-auto lead">Hide</h5>
          <Form.Switch name="group1" className="mx-2 mt-2" isValid="true" />
          <h5 className="m-auto lead">show</h5>
        </div>
      </div>
    </div>
  );
}
export default Home;
