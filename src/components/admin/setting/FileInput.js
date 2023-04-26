import React, { useRef } from "react";
import { Form } from "react-bootstrap";
function FileInput({ onImageSelected }) {
  const inputRef = useRef();

  return (
    <div className="mt-100">
      <div>
        {window.location.pathname === "/product" || window.location.pathname === "/productdetail" ? "" :
          <Form.Label>Image</Form.Label>}

        <Form.Control
          multiple
          className="img_add_button"
          onChange={onImageSelected}
          type="file"
          placeholder="Shop_logo"
          name={"img_64"}
          ref={inputRef}
          accept="image/png,image/jpeg,image/jpg,document/pdf"

        />
        <div className="imgprivew_box">
          {window.location.pathname === "/product" || window.location.pathname === "/productdetail" ?
            <>
              <img
                src={
                  "https://i2.wp.com/asvs.in/wp-content/uploads/2017/08/dummy.png?fit=399%2C275&ssl=1"
                }
                alt="apna_organic"
                width={100}
                height={"100%"}
              />

              <span className="plus_icon"> + </span>
            </>
            : null}
        </div>


      </div>
    </div>

  );
}

export default FileInput;