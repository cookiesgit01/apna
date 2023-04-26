import React, { useState, useRef } from "react";
import DataTable from "react-data-table-component";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import SweetAlert from "sweetalert-react";
import "sweetalert/dist/sweetalert.css";
import { BsTrash } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { useEffect } from "react";
import Iconbutton from "../common/iconbutton";
import axios from "axios";
import FileInput from "./FileInput";
import ImageCropper from "./ImageCropper";

function Banner() {
  let encoded;
  let token = localStorage.getItem("token");
  const formRef = useRef();
  const [error, setError] = useState(true);
  const [show, setShow] = useState(false);
  console.log(show)
  const [bannershow, setBannerShow] = useState("");
  const [Alert, setAlert] = useState(false);
  const [validated, setValidated] = useState(false);
  const [banner, setBanner] = useState([]);
  // const [imageBanner, setImageBanner] = useState([]);
  const [apicall, setapicall] = useState([]);
  const [bannerId, setBannerId] = useState("");
  const [Imgarray, setImgArray] = useState([]);
  console.log(Imgarray)
  // const [file, setFile] = useState();
  const [AddAlert, setAddAlert] = useState(false);
  const [UpdateAlert, setUpdateAlert] = useState(false);
  // const [fileName, setFileName] = useState("");
  const [addBanner, setAddBanner] = useState({
    imgBase64: "",
    title: "",
    description: "",
    size: "",
    banner_url: "",
    banner_location: "",
  });

  const columns = [
    {
      name: "Banner_id",
      selector: (row) => row.banner_id,
      sortable: true,
    },
    {
      name: "Logo",
      width: "250px",
      center: true,
      cell: (row) => (
        <>
          <img
            alt={"apna_organic"}
            src={
              row.image
                ? row.image
                : "https://t3.ftcdn.net/jpg/05/37/73/58/360_F_537735846_kufBp10E8L4iV7OLw1Kn3LpeNnOIWbvf.jpg"
            }
            style={{
              padding: 10,
              textAlign: "right",
              maxHeight: "100px",
              maxWidth: "100px",
            }}
          />
          {/* <img
            height="90px"
            width="75px"
            alt={row.title}
            src={row.image.replace("public", "")}
            style={{
              borderRadius: 10,
              paddingTop: 10,
              paddingBottom: 10,
              textAlign: "right",
            }}
            onClick={() => handleClick()}
          /> */}
        </>
      ),
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Size",
      selector: (row) => row.size,
      sortable: true,
    },
    {
      name: "Banner_url",
      selector: (row) => row.banner_url,
      sortable: true,
      center: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Banner_location",
      selector: (row) => row.banner_location,
      sortable: true,
      center: true,
    },
    {
      name: "ACTION",
      center: true,
      selector: (row) => (
        <div className={"actioncolimn"}>
          <BiEdit
            className=" p-0 m-0  editiconn text-secondary"
            onClick={handleShow.bind(
              this,
              row.banner_id,
              row.title,
              row.description,
              row.imgBase64,
              row.banner_url,
              row.banner_location,
              row.size
            )}
          />
          <BsTrash
            className=" p-0 m-0 editiconn text-danger"
            onClick={handleAlert.bind(this, row.banner_id)}
          />
        </div>
      ),
    },
  ];
  const closeAddAlert = () => {
    setAddAlert(false);
  };

  const closeUpdateAlert = () => {
    setUpdateAlert(false);
  };

  // let logo = `${process.env.REACT_APP_BASEURL}/${addBanner.image}`;
  // let docsdata = `${process.env.REACT_APP_BASEURL}/${Imgarray}`;
  // var Newlogo = logo.replace("/public", "");
  const handleAlert = (banner_id) => {
    setBannerId(banner_id);
    setAlert(true);
  };

  // const handleClick = () => {};

  const hideAlert = () => {
    axios.put(`${process.env.REACT_APP_BASEURL_0}/banner_delete`, {
      banner_id: `${bannerId}`,
      is_deleted: 0,
    }, {
      headers: { admin_token: `${token}` },
    }).then((response) => {
      setAlert(false);
    });
    setapicall(true);

  };
  const CancelAlert = () => {
    setAlert(false);
  };

  const handleShow = (e, banner_id) => {
    if (e === "add") {
      setBannerShow(e);
    } else {
      function getBanner() {
        try {
          axios
            .post(`${process.env.REACT_APP_BASEURL_0}/banner_list`, {
              banner_id: e,
              title: "",
              banner_location: "",
            }, {
              headers: { admin_token: `${token}` },
            })
            .then((response) => {
              let data = response.data;
              setBanner(data);
              setAddBanner(response.data[0]);
              setBannerId(banner_id);
              setImgArray(response.data[0].image);
            });
        } catch (err) { }
      }
      getBanner();
      setBannerShow(true);
    }
  };
  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_BASEURL_0}/banner_list`, {
        banner_id: "",
        title: "",
        banner_location: "",
      }, {
        headers: { admin_token: `${token}` },
      })
      .then((response) => {
        // let data = response.data;
        setBanner(response.data);
        setAddBanner(response.data);
      });
  }, [apicall]);
  const [currentPage, setCurrentPage] = useState("choose-img");
  const [imgAfterCrop, setImgAfterCrop] = useState("");
  const [image, setImage] = useState("");
  const [imageName, setimageName] = useState("");
  const onImageSelected = (event) => {
    if (event.target.files[0].name && event.target.files.length > 0) {
      const reader = new FileReader();
      const image_name = event.target.files[0].name;
      reader.readAsDataURL(event.target.files[0]);

      reader.onload = function () {
        console.log("stage1 ")
        setImage(reader.result);
        setimageName(image_name)
        console.log(reader.result)
        console.log(image_name)

        // onImageSelected({ "dataurl": reader.result, "imageName": image_name });
      };


      setCurrentPage("crop-img");
      // setShow(true)

    }
  };
  // const onImageSelected = (selectedImg) => {
  //   setImage(selectedImg.dataurl);
  //   setimageName(selectedImg.imageName)
  //   setCurrentPage("crop-img");

  // };
  // console.log("IMAGW"+image)
  // console.log("setFileName---"+imageName)

  const onCropDone = (imgCroppedArea) => {
    const canvasEle = document.createElement("canvas");
    canvasEle.width = imgCroppedArea.width;

    canvasEle.height = imgCroppedArea.height;
    const context = canvasEle.getContext("2d");
    console.log("context" + context)

    let imageObj1 = new Image();
    imageObj1.src = image;
    // console.log("===++++"+image)
    imageObj1.onload = function () {
      context.drawImage(
        imageObj1,
        imgCroppedArea.x,
        imgCroppedArea.y,
        imgCroppedArea.width,
        imgCroppedArea.height,
        0,
        0,
        imgCroppedArea.width,
        imgCroppedArea.height
      );

      const dataURL = canvasEle.toDataURL("image/jpeg");
      // console.log("DATAURL"+dataURL)
      //  setAddBanner(dataURL)
      //  console.log("CHECK---"+dataURL+"----ee---------"+addBanner)

      // console.log("dataURL----------------------"+dataURL)
      setImgAfterCrop(dataURL)
      setCurrentPage("img-cropped");
    };
  };
  const onCropCancel = () => {
    setCurrentPage("choose-img");
    setImage("");
  };
  // const ImgFormChange = (e) => {
  //   setFile(e.target.files[0]);
  //   setFileName(e.target.files[0].name);
  // };


  const handleFormChange = (e) => {
    setAddBanner({ ...addBanner, [e.target.name]: e.target.value });
  };
  // const handleBannerChange = (e) => {
  //   setImageBanner({ ...imageBanner, [e.target.name]: e.target.value });
  // };
  const modalClose = () => {
    setBannerShow(false);
    setValidated(false);

  }
  const handleClose = () => {
    setShow(false)
    // formRef.current.reset();
    setAddBanner("")
    setValidated(false);
    setBannerShow(true);
    setCurrentPage("choose-img");

  };

  const AddBanner = (e) => {

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      e.preventDefault();
      setValidated(true);
    }
    if (form.checkValidity() === true) {
      e.preventDefault();
      encoded = imgAfterCrop
      const [first, ...rest] = encoded.split(",");

      let imgvalidation = first.split("/").pop();
      if (
        imgvalidation === "jpeg;base64" ||
        imgvalidation === "jpg;base64" ||
        imgvalidation === "png;base64"
      ) {
        const productimg = rest.join("-");
        let imar = {
          title: addBanner.title,
          banner_url: addBanner.banner_url,
          description: addBanner.description,
          size: addBanner.size,
          banner_location: addBanner.banner_location,
          imgBase64: productimg,
        };
        axios
          .post(`${process.env.REACT_APP_BASEURL_0}/add_banner`, imar, {
            headers: { admin_token: `${token}` },
          })
          .then((response) => {
            if (response.data.code === "ER_DUP_ENTRY") {
              setError(false);
            } else {
              setBannerShow(false);
              setapicall(true);
              setAddAlert(true);
            }
            // let data = response.data;
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      else {
        setValidated(false);
      }
    }
  }
  const UpdateBanner = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      e.preventDefault();
      setValidated(true);
    }
    if (form.checkValidity() === true) {
      e.preventDefault();
      encoded = imgAfterCrop
      const [first, ...rest] = encoded.split(",");

      let imgvalidation = first.split("/").pop();
      if (
        imgvalidation === "jpeg;base64" ||
        imgvalidation === "jpg;base64" ||
        imgvalidation === "png;base64"
      ) {
        const productimg = rest.join("-");
        let imar = {
          title: addBanner.title,
          banner_url: addBanner.banner_url,
          description: addBanner.description,
          size: addBanner.size,
          banner_location: addBanner.banner_location,
          imgBase64: productimg,
          banner_id: addBanner.banner_id
        };
        axios
          .put(`${process.env.REACT_APP_BASEURL_0}/update_banner`, imar, {
            headers: { admin_token: `${token}` },
          })
          .then((response) => {
            // let data = response.data;
            setBannerShow(false);
            setapicall(true);
            setUpdateAlert(true);
          });
        formRef.current.reset();
        setValidated(false);
      };
    }
  }

  return (
    <div>
      <h2>Banner Manager</h2>
      {/* search bar */}
      <div className="card p-3">
        <div className="product_page_uploadbox my-4">
          <button
            className="button main_button ml-auto"
            onClick={() => handleShow("add")}
          >
            Add Banner
          </button>
        </div>
        <DataTable
          columns={columns}
          className="main_data_table"
          data={banner}
          pagination
          highlightOnHover
          pointerOnHover
        />
        <SweetAlert
          show={Alert}
          title="Banner"
          text="Are you Sure you want to delete"
          onConfirm={hideAlert}
          showCancelButton={true}
          onCancel={CancelAlert}
        />
      </div>
      <Modal size="lg" show={bannershow} onHide={() => modalClose()}>
        <Form
          className=""
          noValidate
          validated={validated}
          ref={formRef}
          onSubmit={
            bannershow === "add" ? (e) => AddBanner(e) : (e) => UpdateBanner(e)
          }
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {bannershow === "add" ? "Add New Banner " : " Update Banner "}
            </Modal.Title>
          </Modal.Header>
          {error === false ? (
            <p
              className="mt-2 ms-2 text-danger text-center fs-6"
              type="invalid"
            >
              Already Added!!!
            </p>
          ) : null}
          <Modal.Body>
            <div className="row p-3 m-0">
              <div className="col-md-6">
                <Form.Group
                  className="mb-3 aos_input"
                  controlId="validationCustom01"
                >
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    required
                    value={addBanner.title}
                    type="text"
                    placeholder="Add Title"
                    name={"title"}
                    onChange={(e) => handleFormChange(e)}
                  />
                  <Form.Control.Feedback type="invalid" className="h6">
                    Please fill title
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group
                  className="mb-3 aos_input"
                  controlId="validationCustom01"
                >
                  <Form.Label>Banner_url</Form.Label>
                  <Form.Control
                    required
                    value={addBanner.banner_url}
                    type="text"
                    placeholder="Enter url"
                    name={"banner_url"}
                    onChange={(e) => handleFormChange(e)}
                  />
                  <Form.Control.Feedback type="invalid" className="h6">
                    Please fill this field
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-4">
                <Form.Group
                  className="mb-3 aos_input"
                  controlId="validationCustom01"
                >
                  <Form.Label>Size</Form.Label>
                  <Form.Control
                    required
                    value={addBanner.size}
                    type="text"
                    placeholder="Add Size"
                    name={"size"}
                    onChange={(e) => handleFormChange(e)}
                  />
                  <Form.Control.Feedback type="invalid" className="h6">
                    Please fill Size
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-4">
                <Form.Label>Banner_location</Form.Label>
                {bannershow === "add" ? (
                  <>
                    <Form.Select
                      aria-label="Search by location"
                      className="mb-3 aos_input"
                      controlId="validationCustom01"
                      onChange={(e) => handleFormChange(e)}
                      placeholder="Add banner_location"
                      name={"banner_location"}
                    >
                      <option>Select location</option>

                      <option value="home_page_left_side">
                        home_page_left_side
                      </option>
                      <option value="home_page_left_side(1)">
                        home_page_left_side(1)
                      </option>
                      <option value="home_page_right_side(1)">
                        home_page_right_side(1)
                      </option>
                      <option value="home_page_right_side(2)">
                        home_page_right_side(2)
                      </option>
                    </Form.Select>

                    {addBanner.banner_location === "home_page_left_side" ? (
                      <p
                        className="mt-2 ms-2 text-danger text-center fs-6"
                        type="invalid"
                      >
                        Select Image This (2/3)
                      </p>
                    ) : addBanner.banner_location ===
                      "home_page_left_side(1)" ? (
                      <p
                        className="mt-2 ms-2 text-danger text-center fs-6"
                        type="invalid"
                      >
                        Select Image This (1/2)
                      </p>
                    ) : addBanner.banner_location ===
                      "home_page_right_side(1)" ? (
                      <p
                        className="mt-2 ms-2 text-danger text-center fs-6"
                        type="invalid"
                      >
                        Select Image This (1/1)
                      </p>
                    ) : addBanner.banner_location ===
                      "home_page_right_side(2)" ? (
                      <p
                        className="mt-2 ms-2 text-danger text-center fs-6"
                        type="invalid"
                      >
                        Select Image This(1/1)
                      </p>
                    ) : null}
                  </>
                ) : (
                  <Form.Select
                    aria-label="Search by location"
                    className="mb-3 aos_input"
                    controlId="validationCustom01"
                    placeholder="Add banner_location"
                    name={"banner_location"}
                  >
                    <option>Select location</option>

                    <option disabled value="home_page_left_side">
                      home_page_left_side
                    </option>
                    <option disabled value="home_page_left_side(1)">
                      home_page_left_side(1)
                    </option>
                    <option disabled value="home_page_right_side(1)">
                      home_page_right_side(1)
                    </option>
                    <option disabled value="home_page_right_side(2)">
                      home_page_right_side(2)
                    </option>
                  </Form.Select>
                )}
              </div>

              {/* <Form.Group
                  className="mb-3 aos_input"
                  controlId="validationCustom08"
                >
                  <Form.Label>Blog Image</Form.Label>
                  <Form.Control
                    onChange={(e) => ImgFormChange(e)}
                    type="file"
                    placeholder="Shop_logo"
                    name={"image"}
                  />
                  {addBanner.image ? (
                    <img src={Newlogo} alt="newimg" width={"50px"} />
                  ) : null}
                  <Form.Control.Feedback type="invalid" className="h6">
                    Please upload image
                  </Form.Control.Feedback>
                </Form.Group> */}
              <div className="col-md-4">

                {currentPage === "choose-img" ? (

                  <FileInput setImage={setImage} onImageSelected={onImageSelected} setimageName={setimageName} />
                ) : currentPage === "crop-img" ? (
                  <div className="container-fluid">
                    <ImageCropper
                      handleClose={handleClose}
                      image={image}
                      imageNamee={imageName}
                      modalShow={true}
                      onCropDone={(imgCroppedArea) => onCropDone(imgCroppedArea)} onCropCancel={onCropCancel}
                    />

                  </div>

                ) : (
                  //   <div>
                  //      <div>
                  //   <FileInput setImage={setImage} onImageSelected={onImageSelected} setimageName={setimageName} />
                  // </div>
                  //   </div>

                  <div>
                    <div>
                      <div>
                        <img className="cropped-img w-50 h-50"
                          src={imgAfterCrop}

                          // key={i}
                          alt=""
                        // height={120}
                        />
                      </div>
                    </div>
                    {/* { <FileInput setImage={setImage} onImageSelected={onImageSelected} setimageName={setimageName} />  === <ImageCropper/>  ? (
           <FileInput setImage={setImage} onImageSelected={onImageSelected} setimageName={setimageName} />): */}
                    <>
                      <button
                        onClick={() => {
                          setCurrentPage("crop-img");
                        }}
                        className="btn"
                      >
                        Crop
                      </button>

                      <button
                        onClick={() => {
                          setCurrentPage("choose-img");
                          setImage("");
                        }}
                        className="btn"
                      >
                        New Image
                      </button>
                    </>

                    {/* } */}
                  </div>

                )}
              </div>
              {/* <div className="col-md-4">
                <Form.Group
                  className="mb-3 aos_input"
                  controlId="validationCustom08"
                >
                  <Form.Label>Blog Image</Form.Label>
                 
                  {/* <Form.Control
                    onChange={(e) => ImgFormChange(e)}
                    type="file"
                    placeholder="Shop_logo"
                    name={"image"}
                  /> 
                  {addBanner.image ? (
                    <img src={Newlogo} alt="newimg" width={"50px"} />
                  ) : null}
                  <Form.Control.Feedback type="invalid" className="h6">
                    Please upload image
                  </Form.Control.Feedback>
                </Form.Group>
              </div> */}

              <div className="col-md-12">
                <Form.Group
                  className="mb-3 aos_input"
                  controlId="validationCustom05"
                >
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    className="vendor_address"
                    as="textarea"
                    rows={3}
                    placeholder="write here..."
                    name={"description"}
                    required
                    value={addBanner.description}
                    onChange={(e) => handleFormChange(e)}
                  />
                  <Form.Control.Feedback type="invalid" className="h6">
                    Please fill description
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="button main_outline_button"
              onClick={() => modalClose()}
            >
              Cancel
            </button>
            <Iconbutton
              type={"submit"}
              btntext={bannershow === "add" ? "Add Banner" : "Update Banner"}
              btnclass={"button main_button "}
            />
          </Modal.Footer>
        </Form>
      </Modal>
      <SweetAlert
        show={AddAlert}
        title="Added Banner Successfully "
        onConfirm={closeAddAlert}
      />
      <SweetAlert
        show={UpdateAlert}
        title="Updated Banner Successfully "
        onConfirm={closeUpdateAlert}
      />
    </div>
  );
}
export default Banner;
