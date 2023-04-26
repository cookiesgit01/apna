import React from "react";
import SweetAlert from "sweetalert-react";
import "sweetalert/dist/sweetalert.css";

const SAlert = (props) => {
  return (
    <div>
      <SweetAlert
        show={props.show}
        title={props.title}
        text={props.text}
        onConfirm={props.onConfirm}
        showCancelButton={props.showCancelButton}
        onCancel={props.onCancel}
      />
    </div>
  );
};
export default SAlert;
