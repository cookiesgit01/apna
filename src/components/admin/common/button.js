import React from "react";

const MainButton = (props) => {
  return (
    <div>
      <button
        type={props.type}
        name={props.name}
        value={props.value}
        onClick={props.onClick}
        className={props.btnclass}
      >
        {props.btntext}
      </button>
    </div>
  );
};

export default MainButton;
MainButton.defaultProps = {
  btnclass: "button main_button",
  name: "",
  // onClick: "",
  type: "",
  value: "",
  plchldr: "",
  btntext: "",
};
