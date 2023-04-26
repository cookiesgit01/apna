import React from "react";
import AdminLayout from "./components/admin/layout";
import ReactDOM from "react-dom";
import Error from "./components/admin/error_404/error";

const Portal = () => {
  const modalRoot = document.getElementById("error");

  return ReactDOM.createPortal(<Error />, modalRoot);
};
// const Loader_page = () => {
//   const modalRoot = document.getElementById("loader");

//   return ReactDOM.createPortal(<Loader />, modalRoot);
// };

function App() {
  return (
    <div>
      {" "}
      <AdminLayout />
      <Portal />
      {/* <Loader_page /> */}
    </div>
  );
}

export default App;
