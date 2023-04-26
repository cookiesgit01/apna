import React, { useState, useRef } from "react";
import ShowMoreText from "react-show-more-text";
import Col from "react-bootstrap/Col";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import axios from "axios";
import { useEffect } from "react";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import FileInput from "../setting/FileInput";

import VariationJson from "../json/variation";
// import { MdOutlineEdit } from "react-icons/md";
import { Button } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import SAlert from "../../admin/common/salert";
import moment from "moment/moment";
import InputGroup from "react-bootstrap/InputGroup";
import Loader from "../common/loader";
import { BsTrash } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { RiImageAddLine } from "react-icons/ri";
import ImageCropper from "../setting/ImageCropper";
let encoded;
let ImgObj = [];

const Productdetail = () => {
  const navigate = useNavigate();
  let vid = localStorage.getItem("variantid");
  let pid = localStorage.getItem("productid");

  const [open, setOpen] = useState(false);
  const [hideallData, setHideAlldata] = useState(false);
  const [variantremove, setVariantRemove] = useState([]);
  const [totaltax, settotaltax] = useState("");
  const [VerityAlert, setVerityAlert] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [productdata, setProductData] = useState([]);
  const [taxdata, settaxdata] = useState([]);
  const [validated, setValidated] = useState(false);
  const [vdata, setvdata] = useState([]);
  const [loading, setloading] = useState(false);

  const [variantapicall, setvariantapicall] = useState(false);
  const [ProductAlert, setProductAlert] = useState(false);
  const [UpdatetAlert, setUpdatetAlert] = useState(false);
  const [viewImage, setViewImage] = useState("view");
  console.log(viewImage)
  const veriantData = {
    product_status: "1",
    product_id: pid,
    unit: "",
    colors: "",
    unit_quantity: null,
    size: "",
    product_price: "",
    mrp: "",
    sale_price: "",
    discount: "0",
    special_offer: false,
    featured_product: false,
    manufacturing_date: "",
    expire_date: "",
    quantity: "",
  };
  const [variantmainarray, setvariantmainarray] = useState([]);

  const [variantarray, setvariantarray] = useState(veriantData);
  const [customvalidated, setcustomValidated] = useState(false);
  const [unitValidated, setunitValidated] = useState(false);
  console.log(unitValidated)
  const [varietyUnitvalidation, setVarietyUnitvalidation] = useState("");
  const formRef = useRef();
  const [newImageUrls, setnewImageUrls] = useState([]);
  const [variantdetail, setVariantdetail] = useState([]);
  const [editbutton, setEditButton] = useState(false);
  console.log(editbutton)

  const [changeUnitproperty, setChangeUnitProperty] = useState(false);
  const [image, setImage] = useState("");
  const [imageName, setimageName] = useState("");
  const [currentPage, setCurrentPage] = useState("choose-img");
  const [show, setShow] = useState(false);
  console.log(show);
  var varietyy = VariationJson;
  // PRODUCT DETAIL API
  useEffect(() => {
    function getProductDetails() {
      // setloading(true);
      try {
        axios
          .get(`${process.env.REACT_APP_BASEURL}/product_details?id=${pid}`)

          .then((response) => {
            let data = response.data;
            if (data === "error") {
              navigate("/product");
            }
            if (data === undefined || data === "" || data === null) { } else {
              setProductData(data);
              settaxdata(data);
              setVariantdetail(data.product_verient);
              onImgView(vid, pid);
              // setvariantarray({
              //   ...variantarray,
              //   unit: data.product_verient[0].unit,
              //   product_id: pid,
              // });
              console.log("-----")
              console.log(data)

              // setloading(false);
            }

            setvariantapicall(false);
          });
      } catch (err) {
        console.log(err);
        // setloading(false);
      }
    }

    getProductDetails();
  }, [variantapicall]);
  console.log("variantarray")
  console.log(variantarray)

  useEffect(() => {
    // setloading(true)
    getCategorydata();
  }, [productdata.category]);
  //  END PRODUCT DETAIL API

  // api call for category details
  const getCategorydata = () => {
    setloading(true);
    axios
      .get(
        `${process.env.REACT_APP_BASEURL_0}/category_details?id=${productdata.id}`
      )

      .then((response) => {
        let data = response.data;
        setCategoryName(data[0].category_name);
        setloading(false);
      })
      .catch(function (error) {
        console.log(error);
        setloading(false);
      });
  };

  // End of api call for category details

  // IMAGE SECTION END
  // const convertToBase64 = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const fileReader = new FileReader();
  //     const { name } = file;
  //     fileReader.addEventListener("load", () => {
  //       resolve({ name: name, base64: fileReader.result });
  //     });
  //     fileReader.readAsDataURL(file);
  //     fileReader.onerror = (error) => {
  //       reject(error);
  //     };
  //   });
  // };
  const onImageSelected = (event) => {
    if (event.target.files[0].name && event.target.files.length > 0) {
      const reader = new FileReader();
      const image_name = event.target.files[0].name;
      reader.readAsDataURL(event.target.files[0]);

      reader.onload = function () {
        console.log("stage1 ")
        setImage(reader.result);
        setimageName(image_name)
        // onImageSelected({ "dataurl": reader.result, "imageName": image_name });
      };


      setCurrentPage("crop-img");
      // setShow(true)
      console.log("stage2 ---------" + reader.result + "image_name==========" + image_name)
    }
  };
  const onCropDone = (imgCroppedArea, product_id, id, vendor_id) => {

    const canvasEle = document.createElement("canvas");
    canvasEle.width = imgCroppedArea.width;

    canvasEle.height = imgCroppedArea.height;
    const context = canvasEle.getContext("2d");
    let imageObj1 = new Image();
    imageObj1.src = image;
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
      imguploadchange(dataURL, product_id, id, vendor_id)
      onImgView(product_id, id)
      setCurrentPage("img-cropped");
    };
  };
  const onCropCancel = () => {
    setCurrentPage("choose-img");
    setImage("");
  };
  const handleClose = () => {

    setShow(false)
    setCurrentPage("choose-img");

  };
  const imguploadchange = async (dataURL, product_id, id, vendor_id) => {
    setcustomValidated("");
    onImgView(product_id, id);
    let i
    let coverimg;

    for (i = 0; i < imageName.length; i++) {

      if ((newImageUrls.length === 0 || newImageUrls.length === 1) && i === 0) {
        coverimg = "cover";
      } else {
        coverimg = `cover${i}`;

      }
    }
    //   encoded = await convertToBase64(e.target.files[i]);
    encoded = dataURL;
    const [first, ...rest] = encoded.split(",");
    let imgvalidation = first.split("/").pop();
    if (
      imgvalidation === "jpeg;base64" ||
      imgvalidation === "jpg;base64" ||
      imgvalidation === "png;base64"
    ) {
      const productimg = rest.join("-");
      let imar = {
        product_id: `${product_id}`,
        product_verient_id: `${id}`,
        vendor_id: `${vendor_id}`,
        product_image_name: `${imageName}${i}${id}`,
        image_position: `${coverimg}`,
        img_64: productimg,
      };
      ImgObj.push(imar);
      axios
        .post(`${process.env.REACT_APP_BASEURL}/product_images`, ImgObj)
        .then((response) => {

          ImgObj = [];
          onImgView(id, product_id);
          setcustomValidated("");

        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      setcustomValidated("imgformat");

    }
    setProductAlert(true);

  };
  // const imguploadchange = async (e, product_id, id, vendor_id) => {
  //   setcustomValidated("");
  //   for (let i = 0; i < e.target.files.length; i++) {
  //     let coverimg;
  //     if (newImageUrls.length === 0 && i === 0) {
  //       coverimg = "cover";
  //     } else {
  //       coverimg = `cover${i}`;
  //     }
  //     encoded = await convertToBase64(e.target.files[i]);
  //     const [first, ...rest] = encoded.base64.split(",");
  //     const productimg = rest.join("-");
  //     let imar = {
  //       product_id: `${product_id}`,
  //       product_verient_id: `${id}`,
  //       vendor_id: `${vendor_id}`,
  //       product_image_name: `${encoded.name}${i}${id}`,
  //       image_position: coverimg,
  //       img_64: productimg,
  //     };
  //     ImgObj.push(imar);
  //   }
  //   // image
  //   // setloading(true)
  //   axios
  //     .post(`${process.env.REACT_APP_BASEURL}/product_images`, ImgObj)
  //     .then((response) => {
  //       onImgView(id, product_id);

  //       // setloading(false)
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //       // setloading(false)
  //     });
  // };

  const onImgRemove = (id, name, vendor_id, product_id, product_verient_id) => {
    // setloading(true)
    axios
      .put(`${process.env.REACT_APP_BASEURL}/product_image_delete`, {
        product_image_id: `${id}`,
        product_image_name: `${name}`,
        vendor_id: `${vendor_id}`,
      })
      .then((response) => {
        onImgView(product_verient_id, product_id);
        // setloading(false)
      })
      .catch(function (error) {
        console.log(error);
        // setloading(false)
      });
  };
  const [imageboxid, setimageboxid] = useState(0);
  const onImgView = (id, productid) => {
    setOpen(true);
    setEditButton(false);
    setimageboxid(id);
    setViewImage("notview");
    localStorage.setItem("variantid", id);
    localStorage.setItem("productid", productid);
    setEditButton(false);
    // setloading(true)
    axios
      .get(
        `${process.env.REACT_APP_BASEURL}/product_images_get_singal_veriant?product_id=${productid}&product_verient_id=${id}`
      )
      .then((response) => {
        setnewImageUrls(response.data);
        // setloading(false)
      })
      .catch(function (error) {
        console.log(error);
        // setloading(false)
      });
  };
  const onImgCoverEditClick = (imgid, productid, productvariantid) => {
    // setloading(true)
    axios
      .put(`${process.env.REACT_APP_BASEURL}/change_porduct_cover_image`, {
        product_image_id: `${imgid}`,
        product_id: `${productid}`,
        product_verient_id: `${productvariantid}`,
      })
      .then((response) => {
        onImgView(productvariantid, productid);
        // setloading(false)
      })
      .catch(function (error) {
        console.log(error);
        // setloading(false)
      });
  };
  // IMAGE SECTION END

  // ONCHANGE OF VARIETY
  const onVariantChange = (e) => {
    setVarietyUnitvalidation("");
    // setValidated(true);

    setcustomValidated(false);
    setvariantapicall(true);
    setunitValidated(false);
    setvariantarray({
      ...variantarray,
      [e.target.name]: e.target.value,
    });
  };
  // END ONCHANGE OF VARIETY

  // SALE RICE CALCULATION
  useEffect(() => {
    let discountt = (variantarray.mrp * variantarray.discount) / 100;
    let saleprice = variantarray.mrp - discountt;
    let totaltaxpercent =
      Number(taxdata.gst) +
      Number(taxdata.wholesale_sales_tax) +
      Number(taxdata.retails_sales_tax) +
      Number(taxdata.manufacturers_sales_tax) +
      Number(taxdata.value_added_tax);
    let totaltaxx = (saleprice * totaltaxpercent) / 100;
    settotaltax(totaltaxx);
    let product_price = saleprice - totaltaxx;
    setvariantarray({
      ...variantarray,
      product_status: "pending",
      product_price: `${product_price}`,
      sale_price: `${saleprice}`,
    });
  }, [variantarray.mrp, variantarray.discount, productdata, variantapicall]);
  // const handleInputcheckboxChange = (e) => {
  //   const target = e.target;
  //   const value = target.type === "checkbox" ? target.checked : target.value;
  //   setvariantarray({
  //     ...variantarray,
  //     [e.target.name]: value,
  //   });
  // };
  //  END SALEPRICE CALCULATION

  // ADD VARIETY
  const onVariantaddclick = (id, pid) => {
    if (id === "" || id === null || id === undefined) {
      if (
        variantarray.unit === "" ||
        variantarray.unit === undefined ||
        variantarray.unit === null ||
        variantarray.unit === "Select" ||
        variantarray.product_price === "" ||
        variantarray.mrp === "" ||
        variantarray.sale_price === "" ||
        variantarray.manufacturing_date === "" ||
        variantarray.expire_date === "" ||
        variantarray.quantity === ""
      ) {
        setcustomValidated(true);
        setValidated(true);
      } else if (variantarray.quantity === 0 || variantarray.quantity < 1) {
        setVarietyUnitvalidation("QwanityValidation");
      } else if (variantarray.manufacturing_date > variantarray.expire_date) {
        setVarietyUnitvalidation("ExpireDateValidation");
      } else if (
        productdata.product_type !== "Cloths" &&
        variantarray.unit === "pcs" &&
        variantarray.colors === "" &&
        (variantarray.size === null || variantarray.size === "")
      ) {
        setVarietyUnitvalidation("fillUnit&color");
      } else if (
        productdata.product_type === "Cloths" &&
        variantarray.unit === "pcs" &&
        (variantarray.colors === "" ||
          variantarray.size === null ||
          variantarray.size === "")
      ) {
        setVarietyUnitvalidation("fillUnit&size&color");
      } else if (
        variantarray.unit !== "pcs" &&
        (variantarray.unit_quantity === "" ||
          variantarray.unit_quantity === "null" ||
          variantarray.unit_quantity === null)
      ) {
        setunitValidated(true);
        setVarietyUnitvalidation("unitQwanity&size&color");
      } else if (Number(variantarray.discount) > 100) {
        setVarietyUnitvalidation("discountmore");
      } else if (
        Number(variantarray.mrp) > 50000 ||
        Number(variantarray.mrp) <= 0
      ) {
        setVarietyUnitvalidation("mrpmore");
      }
      else {
        axios
          .post(
            `${process.env.REACT_APP_BASEURL}/products_varient_add`,
            variantarray
          )
          .then((response) => {
            if ((response.affectedRows = "1")) {
              setProductAlert(true);
              setValidated(false);
              setvariantmainarray((variantmainarray) => [
                ...variantmainarray,
                variantarray,]);
              setvariantarray({
                product_status: "",
                // unit: "",
                colors: "",
                unit_quantity: "",
                size: "",
                product_price: "",
                mrp: "",
                sale_price: "",
                discount: "0",
                special_offer: false,
                featured_product: false,
                manufacturing_date: "",
                expire_date: "",
                quantity: "",
                product_id: "",
              });
              setvariantapicall(true);
              setcustomValidated(false);
              setVarietyUnitvalidation("");
            } else if (response.errno === 1064) {
              alert("Error in add product");
              setProductAlert(false);
            } else {
              setProductAlert(false);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    } else {
      if (id) {
        if (
          variantarray.unit === "" ||
          variantarray.unit === undefined ||
          variantarray.unit === null ||
          variantarray.unit === "Select" ||
          variantarray.product_price === "" ||
          variantarray.mrp === "" ||
          variantarray.sale_price === "" ||
          variantarray.manufacturing_date === "" ||
          variantarray.expire_date === "" ||
          variantarray.quantity === ""
        ) {
          setcustomValidated(true);
        } else if (variantarray.quantity === 0 || variantarray.quantity < 1) {
          setVarietyUnitvalidation("QwanityValidation");
        } else if (variantarray.manufacturing_date > variantarray.expire_date) {
          setVarietyUnitvalidation("ExpireDateValidation");
        } else if (
          productdata.product_type !== "Cloths" &&
          variantarray.unit === "pcs" &&
          variantarray.colors === "" &&
          (variantarray.size === null || variantarray.size === "")
        ) {
          setVarietyUnitvalidation("fillUnit&color");
        } else if (
          productdata.product_type === "Cloths" &&
          variantarray.unit === "pcs" &&
          (variantarray.colors === "" ||
            variantarray.size === null ||
            variantarray.size === "")
        ) {
          setVarietyUnitvalidation("fillUnit&size&color");
        } else if (
          variantarray.unit !== "pcs" &&
          (variantarray.unit_quantity === "" ||
            variantarray.unit_quantity === "null" ||
            variantarray.unit_quantity === null ||
            variantarray.unit_quantity === undefined)
        ) {
          setunitValidated(true);
          setVarietyUnitvalidation("unitQwanity&size&color");
        } else if (Number(variantarray.discount) > 100) {
          setVarietyUnitvalidation("discountmore");
        } else if (
          Number(variantarray.mrp) > 50000 ||
          Number(variantarray.mrp) <= 0
        ) {
          setVarietyUnitvalidation("mrpmore");
        } else {
          axios
            .put(
              `${process.env.REACT_APP_BASEURL}/products_varient_update`,
              variantarray
            )
            .then((response) => {
              if ((response.affectedRows = "1")) {
                setUpdatetAlert(true);

                // setvariantarray(response.data);

                setvariantarray({
                  product_status: "",
                  // unit: "",
                  colors: "",
                  unit_quantity: "",
                  size: "",
                  product_price: "",
                  mrp: "",
                  sale_price: "",
                  discount: "0",
                  special_offer: false,
                  featured_product: false,
                  manufacturing_date: "",
                  expire_date: "",
                  quantity: "",
                  product_id: "",
                });
                setvariantapicall(true);
                setcustomValidated(false);
                setVarietyUnitvalidation("");
              } else if (response.errno === 1064) {
                alert("Error in Update product");
                setUpdatetAlert(false);
              } else {
                setUpdatetAlert(false);
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      } else {
        alert("Id not provide");
      }
    }
  };
  // END VARIETY

  // REMOVE VARIETY
  const VariantRemoveClick = (e, id, productid) => {
    setVerityAlert(true);
    setvariantmainarray(variantmainarray.filter((item) => item !== e));
    setVariantRemove((variantremove) => {
      return { ...variantremove, id: id, productid: productid };
    });
  };

  const closeAlert = () => {
    setVerityAlert(false);
    setProductAlert(false);
    setUpdatetAlert(false);
  };

  const deleteProductVeriant = () => {
    if (variantdetail.length === 0) {
      setHideAlldata(true);
      setVerityAlert(false);
    }
    if (variantdetail.length === 2) {
      setChangeUnitProperty("editvariety");
    }
    // setloading(true)
    axios
      .put(`${process.env.REACT_APP_BASEURL}/products_delete_remove`, {
        varient_id: variantremove.id,
        product_id: variantremove.productid,
        is_delete: "0",
      })
      .then((response) => {
        // let data=response.data
        setvariantapicall(true)
        // if (data !== undefined || data !== "" || data !== null){
        // setvariantapicall(true);
        //   navigate("/product");
        // }
        // setloading(false)
      })
      .catch(function (error) {
        console.log(error);
        // setloading(false)
      });
    setvdata(vdata.filter((item) => item !== variantremove.id));
    setVerityAlert(false);
  };
  // END REMOVE VARIETY

  // EDIT VARIETY
  const VariantEditClick = (id, productid) => {
    if (variantdetail.length === 1) {
      setChangeUnitProperty(true);
    }
    // setloading(true)
    axios
      .get(
        `${process.env.REACT_APP_BASEURL}/products_pricing?id=${id}&product_id=${productid}&user_id`
      )
      .then((response) => {
        setvariantarray({
          ...variantarray,
          unit: response.data[0].unit,
          product_id: id,
        })
        // setloading(false)
      })
      .catch(function (error) {
        console.log(error);
        // setloading(false)
      });
  };
  // useEffect((id, productid)=>{
  //   VariantEditClick(id, productid)
  // },[])
  return (
    <>
      {loading === true ? (
        <Loader />
      ) : (
        <div>
          {" "}
          {hideallData === false ? (
            <>
              <h2 className="productname mb-0">
                {productdata.product_title_name}
              </h2>
              <div className="row mt-3">
                <div className="productimg_box col-8">
                  {newImageUrls.length === 0 ? (
                    <img
                      alt=""
                      src="https://t3.ftcdn.net/jpg/05/37/73/58/360_F_537735846_kufBp10E8L4iV7OLw1Kn3LpeNnOIWbvf.jpg"
                      className="w-100 h-50"
                    />
                  ) : (
                    <Carousel
                      autoPlay
                      interval="3000"
                      transitionTime="3000"
                      infiniteLoop
                      showIndicators={false}
                      className={"productimg_carousel"}
                      showStatus={false}
                    >
                      {newImageUrls
                        ? (newImageUrls || []).map((data, i) => {
                          return data.product_verient_id === vid &&
                            data.product_id === pid ? (
                            <div className="w-100 h-50" key={i}>
                              <img
                                src={
                                  newImageUrls.length === 0
                                    ? "https://t3.ftcdn.net/jpg/05/37/73/58/360_F_537735846_kufBp10E8L4iV7OLw1Kn3LpeNnOIWbvf.jpg"
                                    : data.product_image_path
                                      ? data.product_image_path
                                      : null
                                }
                                alt={data.product_image_name}
                              />
                            </div>
                          ) : (
                            <img
                              src={
                                "https://t3.ftcdn.net/jpg/05/37/73/58/360_F_537735846_kufBp10E8L4iV7OLw1Kn3LpeNnOIWbvf.jpg"
                              }
                              alt={""}
                            />
                          );
                        })
                        : null}
                    </Carousel>
                  )}
                </div>

                <div className="product_detail_box col-4 mt-4 ">
                  <div className="product_upper_section row">
                    <div className="col-6">
                      <b>
                        <h5 className="statuslabeltext text-success">
                          {productdata.product_title_name}
                        </h5>
                      </b>

                      {/* price */}

                      <div className="product_upper_section ">
                        {variantdetail
                          ? (variantdetail || []).map((data, i) => {
                            return data.id === vid &&
                              data.product_id === pid ? (
                              <div
                                className="product_mid_section product_variety_section"
                                key={i}
                              >
                                <h3 className="mb-0">
                                  {" "}
                                  Price:{data.sale_price.toFixed(2)}
                                </h3>
                                <div className="priceboxx">
                                  <b>
                                    <p className="text-success mb-0">
                                      {data.discount}% off
                                    </p>
                                  </b>
                                  <p className="mrprate text-danger">
                                    ({data.mrp.toFixed(2)})
                                  </p>
                                </div>
                                <div className="priceboxx">
                                  <b>
                                    {" "}
                                    <p className="text-secondary">
                                      Product Price: {data.product_price}{" "}
                                    </p>
                                  </b>
                                </div>
                              </div>
                            ) : null;
                          })
                          : null}

                        {/* store */}
                        <div className="product_lower_section product_upper_section">
                          <div className="productquantity productstatus">
                            <h5 className=" mb-0">Store:</h5>
                            <p className="statuslabeltext mb-0 text-primary">
                              {productdata.store_name}
                            </p>
                          </div>
                        </div>
                        {/*  */}
                        {/*description  */}
                        <div>
                          <h5 className="mb-1">Product Description:</h5>
                          <ShowMoreText
                            /* Default options */
                            lines={5}
                            more="Show more"
                            less="...Show less"
                            anchorclassName="oooeeer"
                            expanded={false}
                            width={500}
                            className={"detailproduct"}
                          >
                            <div
                              className="detailproduct statuslabeltext editor"
                              dangerouslySetInnerHTML={{
                                __html: productdata.product_description,
                              }}
                            ></div>
                          </ShowMoreText>
                        </div>
                        {/*  */}

                        {/* other instarusction */}
                        <div>
                          <h5 className="mb-1">Other Instruction:</h5>
                          <ShowMoreText
                            /* Default options */
                            lines={5}
                            more="Show more"
                            less="...Show less"
                            anchorclassName="oooeeer"
                            expanded={false}
                            width={500}
                          >
                            <div
                              className="detailproduct statuslabeltext"
                              dangerouslySetInnerHTML={{
                                __html: productdata.other_introduction,
                              }}
                            ></div>
                          </ShowMoreText>
                        </div>
                      </div>
                    </div>
                    {/* category */}
                    <div className="col-6">
                      <div className="product_lower_section product_upper_section">
                        <div className="productquantity productstatus">
                          <h5 className="mb-0">
                            Product type: <b>{productdata.product_type}</b>{" "}
                          </h5>
                        </div>
                        <div className="productquantity productstatus">
                          <h5 className="mb-0">
                            Category: <b>{categoryName}</b>{" "}
                          </h5>
                        </div>
                      </div>
                      {/* tax */}
                      <div className="product_mid_section product_variety_section">
                        <h5 className="mb-0">Tax:</h5>
                        <div className="productstatus">
                          <div className="d-flex align-items-center">
                            <h5 className="statuslabeltext">
                              Gst:{" "}
                              <b>
                                {productdata.gst === "undefined"
                                  ? 0
                                  : productdata.gst}{" "}
                              </b>{" "}
                            </h5>
                            <b></b>
                          </div>
                          <div className="d-flex align-items-center">
                            <h5 className="statuslabeltext">
                              Cgst:{" "}
                              <b>
                                {productdata.cgst === "undefined"
                                  ? 0
                                  : productdata.cgst}{" "}
                              </b>{" "}
                            </h5>
                          </div>
                          <div className="d-flex align-items-center">
                            <h5 className="statuslabeltext">
                              Sgst:{" "}
                              <b>
                                {productdata.sgst === "undefined"
                                  ? 0
                                  : productdata.sgst}{" "}
                              </b>
                            </h5>
                          </div>
                          <div className="d-flex">
                            <h5 className="statuslabeltext">
                              Wholesale sales tax:{" "}
                              <b>
                                {productdata.wholesale_sales_tax === "" ||
                                  productdata.wholesale_sales_tax === "undefined"
                                  ? 0
                                  : productdata.wholesale_sales_tax}
                              </b>
                            </h5>
                          </div>
                        </div>
                        <div className="d-flex align-items-center">
                          <h5 className="statuslabeltext">
                            Manufacturers sales tax:{" "}
                            <b>
                              {productdata.manufacturers_sales_tax === "" ||
                                productdata.manufacturers_sales_tax ===
                                "undefined"
                                ? 0
                                : productdata.manufacturers_sales_tax}
                            </b>
                          </h5>
                        </div>
                        <div className="d-flex align-items-center">
                          <h5 className="statuslabeltext">
                            Retails sales tax:{" "}
                            <b>
                              {productdata.retails_sales_tax === "" ||
                                productdata.retails_sales_tax === "undefined"
                                ? 0
                                : productdata.retails_sales_tax}
                            </b>
                          </h5>
                        </div>
                      </div>
                    </div>
                    {/*  */}
                  </div>
                </div>

                <div className="variety_section_box col-12">
                  <Form ref={formRef} validated={validated}>
                    <Form.Group className="">
                      <div className="variation_box my-2">
                        <div className="row">
                          <div className="col-md-3 col-sm-4 p-2 text-center">
                            <div className="addvariety_inputbox">
                              <Form.Group
                                className="mx-3"
                                controlId="validationCustom01"
                              >
                                <Form.Label
                                  className="text-start inputlabelheading"
                                  sm="12"
                                >
                                  Variety
                                  <span className="text-danger">*</span>
                                </Form.Label>
                                <Col sm="12">
                                  <InputGroup className="">
                                    <Form.Select
                                      aria-label="Default select example"
                                      name="unit"
                                      required
                                      value={variantarray.unit}
                                      onChange={(e) =>
                                        onVariantChange(e)
                                      }
                                      disabled={
                                        variantarray.unit &&
                                          changeUnitproperty === false
                                          ? true
                                          : variantarray.unit ||
                                            changeUnitproperty === true
                                            ? false
                                            : true
                                      }
                                    // className={
                                    //   customvalidated === true
                                    //     ? "border-danger"
                                    //     : null
                                    // }
                                    >
                                      <option >
                                        Select
                                      </option>
                                      {(varietyy.variety || []).map(
                                        (vari, i) => {
                                          console.log("unittttttt=======" + vari)
                                          return changeUnitproperty ===
                                            true ? (
                                            <option
                                              value={
                                                vari === "color"
                                                  ? "pcs"
                                                  : vari ===
                                                    "weight"
                                                    ? "gms"
                                                    : vari ===
                                                      "volume"
                                                      ? "ml"
                                                      : vari === "piece"
                                                        ? "piece"
                                                        : ""
                                              }
                                              key={i}
                                            >
                                              {vari}
                                            </option>
                                          ) : productdata.product_type ===
                                            "Cloths" ||
                                            productdata.product_type ===
                                            "Fashion" ? (
                                            vari === "weight" ||
                                              vari ===
                                              "volume" ? null : (
                                              <option
                                                value={
                                                  vari === "piece"
                                                    ? "piece"
                                                    : vari ===
                                                      "color"
                                                      ? "pcs"
                                                      : ""
                                                }
                                                key={i}
                                              >
                                                {vari}
                                              </option>
                                            )
                                          ) : vari ===
                                            "color" ? null : (
                                            <option
                                              value={
                                                vari === "weight"
                                                  ? "gms"
                                                  : vari ===
                                                    "volume"
                                                    ? "ml"
                                                    : vari === "piece"
                                                      ? "piece"
                                                      : ""
                                              }
                                              key={i}
                                            >
                                              {vari}
                                            </option>
                                          );
                                        }
                                      )}
                                    </Form.Select>
                                  </InputGroup>
                                </Col>
                              </Form.Group>
                            </div>
                          </div>

                          <div className="col-md-3 col-sm-4 p-2 text-center">
                            <div className="addvariety_inputbox">
                              <Form.Group
                                className="mx-3"
                                controlId="validationCustom01"
                              >
                                <Form.Label
                                  className="text-start inputlabelheading"
                                  sm="12"
                                >
                                  Color
                                  <span className="text-danger">*</span>
                                </Form.Label>
                                <Col sm="12">
                                  <InputGroup className="">
                                    <Form.Select
                                      aria-label="Default select example"
                                      name="colors"
                                      value={variantarray.colors}
                                      onChange={(e) => onVariantChange(e)}
                                      disabled={
                                        variantarray.unit !== "pcs" &&
                                          variantarray.unit !== ""
                                          ? true
                                          : variantarray.unit === ""
                                            ? false
                                            : false
                                      }
                                      required
                                    >
                                      {" "}
                                      <option value={""}> Select Color</option>
                                      {(varietyy.color || []).map((vari, i) => {
                                        return (
                                          <option
                                            value={vari}
                                            key={i}
                                            selected={productdata.color}
                                          >
                                            {vari}
                                          </option>
                                        );
                                      })}
                                    </Form.Select>
                                  </InputGroup>
                                </Col>
                              </Form.Group>
                            </div>
                          </div>

                          <div className="col-md-3 col-sm-4 p-2 text-center">
                            <div className="addvariety_inputbox">
                              <Form.Group
                                className="mx-3"
                                controlId="validationCustom01"
                              >
                                <Form.Label
                                  className="text-start inputlabelheading"
                                  sm="12"
                                >
                                  Weight/Piece/Volume
                                  <span className="text-danger">*</span>
                                </Form.Label>
                                <Col sm="12">
                                  <InputGroup className="" size="sm">
                                    <Form.Control
                                      type="number"
                                      sm="9"
                                      value={variantarray.unit_quantity}
                                      disabled={
                                        variantarray.unit === "pcs"
                                          ? true
                                          : false
                                      }
                                      onChange={(e) => onVariantChange(e)}
                                      name={"unit_quantity"}
                                      required
                                    />
                                  </InputGroup>
                                </Col>
                              </Form.Group>
                            </div>
                          </div>
                          <div className="col-md-3 col-sm-4 p-2 text-center">
                            <div className="addvariety_inputbox">
                              <Form.Group
                                className="mx-3"
                                controlId="validationCustom01"
                              >
                                <Form.Label
                                  className="text-start inputlabelheading"
                                  sm="12"
                                >
                                  Size
                                  <span className="text-danger">*</span>
                                </Form.Label>
                                <Col sm="12">
                                  <InputGroup className="">
                                    <Form.Select
                                      aria-label="Default select example"
                                      required
                                      sm="9"
                                      name="size"
                                      value={variantarray.size}
                                      onChange={(e) => onVariantChange(e)}
                                      disabled={
                                        variantarray.unit !== "pcs" &&
                                          variantarray.unit !== ""
                                          ? true
                                          : variantarray.unit === ""
                                            ? false
                                            : false
                                      }
                                    >
                                      <option value={""}>Select</option>
                                      {(varietyy.size || []).map((vari, i) => {
                                        return (
                                          <option value={vari} key={i}>
                                            {vari}
                                          </option>
                                        );
                                      })}
                                    </Form.Select>
                                  </InputGroup>
                                </Col>
                              </Form.Group>
                            </div>
                          </div>

                          <div className="col-md-3 col-sm-4 p-2 text-center">
                            <div className="addvariety_inputbox">
                              <Form.Group
                                className="mx-3"
                                controlId="validationCustom01"
                              >
                                <Form.Label
                                  className="text-start inputlabelheading"
                                  sm="12"
                                >
                                  Mrp
                                  <span className="text-danger">*</span>
                                </Form.Label>
                                <Col sm="12">
                                  <InputGroup className="" size="sm">
                                    <Form.Control
                                      type="number"
                                      sm="9"
                                      maxLength={"5"}
                                      minLength={"1"}
                                      min="1"
                                      max="50000"
                                      // className={
                                      //   customvalidated === true
                                      //     ? "border-danger"
                                      //     : null
                                      // }
                                      name="mrp"
                                      value={variantarray.mrp}
                                      onChange={(e) => onVariantChange(e)}
                                      required
                                    />
                                  </InputGroup>
                                </Col>
                              </Form.Group>
                            </div>
                          </div>
                          <div className="col-md-3 col-sm-4 p-2 text-center">
                            <div className="addvariety_inputbox">
                              <Form.Group
                                className="mx-3"
                                controlId="validationCustom01"
                              >
                                <Form.Label
                                  className="text-start inputlabelheading"
                                  sm="12"
                                >
                                  Discount
                                </Form.Label>
                                <Col sm="12">
                                  <InputGroup className="">
                                    <Form.Control
                                      type="number"
                                      sm="9"
                                      min={"1"}
                                      max={"100"}
                                      onChange={(e) => onVariantChange(e)}
                                      name={"discount"}
                                      value={variantarray.discount}
                                    />
                                  </InputGroup>
                                </Col>
                              </Form.Group>
                            </div>
                          </div>
                          <div className="col-md-3 col-sm-4 p-2 text-center">
                            <div className="addvariety_inputbox">
                              <Form.Group
                                className="mx-3"
                                controlId="validationCustom01"
                              >
                                <Form.Label
                                  className="text-start inputlabelheading"
                                  sm="12"
                                >
                                  Original Price
                                  <span className="text-danger">*</span>
                                </Form.Label>
                                <Col sm="12">
                                  <InputGroup className="">
                                    <Form.Control
                                      min={1}
                                      step={0.01}
                                      type="number"
                                      sm="9"
                                      name={"product_price"}
                                      value={Number(
                                        variantarray.product_price
                                      ).toFixed(2)}
                                    />
                                  </InputGroup>
                                </Col>
                              </Form.Group>
                            </div>
                          </div>

                          <div className="col-md-3 col-sm-4 p-2 text-center">
                            <div className="addvariety_inputbox">
                              <Form.Group
                                className="mx-3"
                                controlId="validationCustom01"
                              >
                                <Form.Label
                                  className="text-start inputlabelheading"
                                  sm="12"
                                >
                                  Tax
                                  <span className="text-danger">*</span>
                                </Form.Label>
                                <Col sm="12">
                                  <InputGroup className="">
                                    <Form.Control
                                      step={0.01}
                                      type="number"
                                      sm="9"
                                      min={1}
                                      name={"totaltax"}
                                      value={Number(totaltax).toFixed(2)}
                                    />
                                  </InputGroup>
                                </Col>
                              </Form.Group>
                            </div>
                          </div>

                          <div className="col-md-3 col-sm-4 p-2 text-center">
                            <div className="addvariety_inputbox">
                              <Form.Group
                                className="mx-3"
                                controlId="validationCustom01"
                              >
                                <Form.Label
                                  className="text-start inputlabelheading"
                                  sm="12"
                                >
                                  Sale Price
                                  <span className="text-danger">*</span>
                                </Form.Label>
                                <Col sm="12">
                                  <InputGroup className="">
                                    <Form.Control
                                      min={1}
                                      step={0.01}
                                      type="number"
                                      sm="9"
                                      name={"sale_price"}
                                      value={Number(variantarray.sale_price)}
                                    />
                                  </InputGroup>
                                </Col>
                              </Form.Group>
                            </div>
                          </div>

                          <div className="col-md-3 col-sm-4 p-2 text-center">
                            <div className="manufacture_date addvariety_inputbox">
                              <Form.Group
                                className="mx-3"
                                controlId="validationCustom01"
                              >
                                <Form.Label
                                  className="text-start inputlabelheading"
                                  sm="12"
                                >
                                  Manufacturing Date
                                  <span className="text-danger">*</span>
                                </Form.Label>
                                <Col sm="12">
                                  <InputGroup className="" size="sm">
                                    <Form.Control
                                      type="date"
                                      sm="9"
                                      required
                                      min={moment().format("YYYY-MM-DD")}
                                      // className={
                                      //   customvalidated === true
                                      //     ? "border-danger"
                                      //     : null
                                      // }
                                      onChange={(e) => onVariantChange(e)}
                                      name={"manufacturing_date"}
                                      value={variantarray.manufacturing_date}
                                    />
                                  </InputGroup>
                                </Col>
                              </Form.Group>
                            </div>
                          </div>
                          <div className="col-md-3 col-sm-4 p-2 text-center">
                            <div className="manufacture_date addvariety_inputbox">
                              <Form.Group
                                className="mx-3"
                                controlId="validationCustom01"
                              >
                                <Form.Label
                                  className="text-start inputlabelheading"
                                  sm="12"
                                >
                                  Expire Date
                                  <span className="text-danger">*</span>
                                </Form.Label>
                                <Col sm="12">
                                  <InputGroup className="">
                                    <Form.Control
                                      required

                                      type="date"
                                      sm="9"
                                      min={moment(
                                        variantarray.manufacturing_date
                                      ).format("YYYY-MM-DD")}
                                      disabled={
                                        variantarray.manufacturing_date
                                          ? false
                                          : true
                                      }
                                      onChange={(e) => onVariantChange(e)}
                                      name={"expire_date"}
                                      value={moment(
                                        variantarray.expire_date
                                      ).format("YYYY-MM-DD")}
                                    />
                                  </InputGroup>
                                </Col>
                              </Form.Group>
                            </div>
                          </div>
                          <div className="col-md-3 col-sm-4 p-2">
                            <div className="manufacture_date addvariety_inputbox">
                              <Form.Group
                                className="mx-3"
                                controlId="validationCustom01"
                              >
                                <Form.Label
                                  className="text-start inputlabelheading"
                                  sm="12"
                                >
                                  Quantity
                                  <span className="text-danger">*</span>
                                </Form.Label>
                                <Col sm="12">
                                  <InputGroup className="">
                                    <Form.Control
                                      name={"quantity"}
                                      type="number"
                                      value={variantarray.quantity}
                                      sm="9"
                                      min={"1"}
                                      onChange={(e) => onVariantChange(e)}
                                      onKeyUp={(event) => {
                                        if (event.key === "Enter") {
                                          onVariantaddclick();
                                        }
                                      }}
                                    />
                                  </InputGroup>
                                </Col>
                              </Form.Group>
                            </div>
                          </div>
                          {/* <div className="col-md-3 col-sm-4 p-2">
                            <div className="manufacture_date addvariety_inputbox">
                              <Form.Group
                                className="mx-3"
                                controlId="validationCustom01"
                              >
                                <Form.Label
                                  className="text-start inputlabelheading"
                                  sm="12"
                                >
                                  Quantity
                                  <span className="text-danger">*</span>
                                </Form.Label>
                                <Col sm="12">
                                  <InputGroup className="" size="sm">
                                    <Form.Control
                                      type="number"
                                      sm="9"
                                      value={variantarray.quantity}
                                      onChange={(e) => onVariantChange(e)}
                                      name={"quantity"}
                                      onKeyPress={(event) => {
                                        if (event.key === "Enter") {
                                          onVariantaddclick();
                                        }
                                      }}
                                      required
                                    />
                                  </InputGroup>
                                  {/* <InputGroup className="">
                                    <Form.Control
                                      name={"quantity"}
                                      type="number"
                                      value={variantarray.quantity}
                                      sm="9"
                                      min={"1"}
                                      onChange={(e) => onVariantChange(e)}
                                      onKeyUp={(event) => {
                                        if (event.key === "Enter") {
                                          onVariantaddclick();
                                        }
                                      }}
                                    />
                                  </InputGroup> 
                                </Col>
                              </Form.Group>
                            </div>
                          </div> */}
                          <div className="col-md-3 col-sm-4 p-2 text-center">
                            <div className="manufacture_date addvariety_inputbox">
                              <Button
                                variant="outline-success"
                                className="addcategoryicon w-100"
                                // type="submit"
                                onClick={() =>
                                  onVariantaddclick(
                                    variantarray.id,
                                    variantarray.product_id
                                  )
                                }
                              >
                                Save Variety
                              </Button>
                            </div>
                          </div>
                          <div className="col-md-3 col-sm-4 p-2 text-center">
                            {varietyUnitvalidation ===
                              "ExpireDateValidation" ? (
                              <tr>
                                <p
                                  className="mt-1 ms-2 text-danger"
                                  type="invalid"
                                >
                                  Please Expire date should be greater than
                                  Manufacturing date
                                </p>
                              </tr>
                            ) : null}
                            <tr>
                              {customvalidated === true ? (
                                <p
                                  className="mt-1 ms-2 text-danger"
                                  type="invalid"
                                >
                                  Please fill Required fields
                                </p>
                              ) : null}

                              {varietyUnitvalidation ===
                                "fillUnit&size&color" ? (
                                <p
                                  className="mt-1 ms-2 text-danger"
                                  type="invalid"
                                >
                                  Please Fill size and colors
                                </p>
                              ) : varietyUnitvalidation === "fillUnit&color" ? (
                                <p
                                  className="mt-1 ms-2 text-danger my-3"
                                  type="invalid"
                                >
                                  Please fill color
                                </p>
                              ) : varietyUnitvalidation ===
                                "unitQwanity&size&color" ? (
                                <p
                                  className="mt-1 ms-2 text-danger my-3"
                                  type="invalid"
                                >
                                  Please fill weight/volume/piece
                                </p>
                              ) : varietyUnitvalidation === "discountmore" ? (
                                <p
                                  className="mt-1 ms-2 text-danger my-3"
                                  type="invalid"
                                >
                                  Discount should be less then 100
                                </p>
                              ) : varietyUnitvalidation ===
                                "QwanityValidation" ? (
                                <p
                                  className="mt-1 ms-2 text-danger my-3"
                                  type="invalid"
                                >
                                  Quantity must be greater than 0
                                </p>
                              ) : varietyUnitvalidation === "mrpmore" ? (
                                <p
                                  className="mt-1 ms-2 text-danger my-3"
                                  type="invalid"
                                >
                                  Mrp must be lesser than 50000 and greater than
                                  0
                                </p>
                              ) : varietyUnitvalidation === "" ? null : null}
                            </tr>
                          </div>

                          <div className="col-auto">
                            <div className="col-12">
                              <Table bordered className="align-middle my-2">
                                <thead className="align-middle">
                                  <tr>
                                    <th>
                                      Variety{" "}
                                      <span className="text-danger">*</span>
                                    </th>

                                    <th>Color</th>
                                    <th>Weight/piece/Volume </th>
                                    <th>Size </th>
                                    <th>
                                      Mrp <span className="text-danger">*</span>
                                    </th>
                                    <th>Discount</th>
                                    <th>
                                      Price
                                      <span className="text-danger">*</span>
                                    </th>
                                    <th>
                                      Total Tax
                                      <span className="text-danger">*</span>
                                    </th>
                                    <th>
                                      Sale Price
                                      <span className="text-danger">*</span>
                                    </th>
                                    <th className="manufacture_date">
                                      Mdate{" "}
                                      <span className="text-danger">*</span>
                                    </th>
                                    <th className="manufacture_date">
                                      Edate{" "}
                                      <span className="text-danger">*</span>
                                    </th>
                                    <th className="manufacture_date">
                                      Quantity
                                      <span className="text-danger">*</span>
                                    </th>
                                    <th className="manufacture_date">Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {productdata.product_verient === "" ||
                                    productdata.product_verient === null ||
                                    productdata.product_verient === undefined
                                    ? null
                                    : (productdata.product_verient || []).map(
                                      (variantdata, i) => {
                                        return variantdata.is_delete ===
                                          "0" ? null : (
                                          <>
                                            <tr
                                              className="add_variety_list_box"
                                              key={i}
                                            >
                                              <td className="p-0 py-3 text-center ">
                                                {variantdata.unit === "pcs"
                                                  ? "color"
                                                  : variantdata.unit ===
                                                    "piece"
                                                    ? "piece"
                                                    : variantdata.unit === "gms"
                                                      ? "weight"
                                                      : variantdata.unit === "ml"
                                                        ? "volume"
                                                        : ""}
                                              </td>
                                              <td className="p-0 py-3 text-center ">
                                                {variantdata.colors}
                                              </td>
                                              <td className="p-0 py-3 text-center ">
                                                {variantdata.unit === "gms"
                                                  ? variantdata.unit_quantity
                                                  : variantdata.unit === "ml"
                                                    ? variantdata.unit_quantity
                                                    : variantdata.unit ===
                                                      "piece"
                                                      ? variantdata.unit_quantity
                                                      : ""}
                                              </td>
                                              <td className="p-0 py-3 text-center ">
                                                {variantdata.size}
                                              </td>
                                              <td className="p-0 py-3 text-center ">
                                                {Number(
                                                  variantdata.mrp
                                                ).toFixed(2)}
                                              </td>
                                              <td className="p-0 py-3 text-center ">
                                                {Number(
                                                  variantdata.discount
                                                ).toFixed(2)}
                                              </td>

                                              <td className="p-0 py-3 text-center ">
                                                {Number(
                                                  variantdata.product_price
                                                ).toFixed(2)}
                                              </td>
                                              <td className="p-0 py-3 text-center ">
                                                {Number(
                                                  (variantdata.sale_price *
                                                    (Number(taxdata.gst) +
                                                      Number(
                                                        taxdata.wholesale_sales_tax
                                                      ) +
                                                      Number(
                                                        taxdata.retails_sales_tax
                                                      ) +
                                                      Number(
                                                        taxdata.manufacturers_sales_tax
                                                      ) +
                                                      Number(
                                                        taxdata.value_added_tax
                                                      ))) /
                                                  100
                                                ).toFixed(2)}
                                              </td>
                                              <td className="p-0 py-3 text-center ">
                                                {variantdata.sale_price.toFixed(
                                                  2
                                                )}
                                              </td>
                                              <td className="p-0 py-3 text-center ">
                                                {moment(
                                                  variantdata.manufacturing_date
                                                ).format("YYYY-MM-DD")}
                                              </td>
                                              <td className="p-0 py-3 text-center ">
                                                {moment(
                                                  variantdata.expire_date
                                                ).format("YYYY-MM-DD")}
                                              </td>
                                              <td className="p-0 py-3 text-center manufacture_date">
                                                {variantdata.quantity}
                                              </td>

                                              <td className="p-0 py-3 text-center action_btn_box">
                                                <RiImageAddLine
                                                  type="file"
                                                  className="variety_edit_action_btn  text-success"
                                                  eventKey={i}
                                                  onClick={(_id) =>
                                                    onImgView(
                                                      variantdata.id,
                                                      variantdata.product_id
                                                    )
                                                  }
                                                  aria-controls={
                                                    "variantimgbox" +
                                                    variantdata.id
                                                  }
                                                  aria-expanded={open}
                                                />
                                                <BiEdit
                                                  className="variety_edit_action_btn text-primary mx-2"
                                                  onClick={(id) =>
                                                    VariantEditClick(
                                                      variantdata.id,
                                                      variantdata.product_id
                                                    )
                                                  }
                                                />
                                                <BsTrash
                                                  className="variety_edit_action_btn text-danger"
                                                  onClick={(id, e) =>
                                                    VariantRemoveClick(e,
                                                      variantdata.id,
                                                      variantdata.product_id
                                                    )
                                                  }
                                                />
                                              </td>
                                            </tr>
                                            {newImageUrls ? (
                                              <tr
                                                className={
                                                  variantdata.id === imageboxid
                                                    ? "img_preview_boxx show"
                                                    : "img_preview_boxx hide"
                                                }
                                                id={"variantimgbox" + variantdata.id}
                                              >
                                                <td colSpan="13">
                                                  <div className="image_box">
                                                    {(newImageUrls || []).map((imgg, i) => {
                                                      return `${variantdata.id}` ===
                                                        imgg.product_verient_id ? (
                                                        <div
                                                          className="imgprivew_box"
                                                          key={i}
                                                        >
                                                          {imgg.image_position ===
                                                            "cover" ? (
                                                            <span className="cover_img">
                                                              Cover
                                                            </span>
                                                          ) : null}
                                                          <img
                                                            src={
                                                              imgg.product_image_path
                                                            }
                                                            key={i}
                                                            alt="apna_organic"
                                                            height={120}
                                                          />
                                                          <span
                                                            className="cover_icon"
                                                            onClick={(id) =>
                                                              onImgCoverEditClick(
                                                                imgg.product_image_id,
                                                                imgg.product_id,
                                                                imgg.product_verient_id
                                                              )
                                                            }
                                                          >
                                                            Set Cover
                                                          </span>
                                                          <button
                                                            className="cross_icon"
                                                            onClick={() =>
                                                              onImgRemove(
                                                                imgg.product_image_id,
                                                                imgg.product_image_name,
                                                                imgg.vendor_id,
                                                                imgg.product_id,
                                                                imgg.product_verient_id
                                                              )
                                                            }
                                                          >
                                                            &times;
                                                          </button>
                                                        </div>
                                                      ) : null;
                                                    })}
                                                    <div className="imgprivew_box">
                                                      {currentPage === "choose-img" ? (

                                                        <FileInput setImage={setImage} onImageSelected={onImageSelected} setimageName={setimageName} />
                                                      ) : currentPage === "crop-img" ? (
                                                        <ImageCropper
                                                          handleClose={handleClose}
                                                          // show={show}
                                                          image={image}
                                                          imageNamee={imageName}
                                                          modalShow={true}
                                                          onCropDone={(imgCroppedArea) => onCropDone(
                                                            imgCroppedArea,
                                                            variantdata.product_id,
                                                            variantdata.id,
                                                            variantdata.vendor_id,

                                                          )
                                                          }
                                                          onCropCancel={onCropCancel}
                                                        />
                                                      ) : (
                                                        <div>
                                                          <div>
                                                            <FileInput setImage={setImage} onImageSelected={onImageSelected} setimageName={setimageName} />
                                                          </div>
                                                          {/* {<FileInput/> === <ImageCropper /> ? (
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
                                                    ) : ""} */}
                                                        </div>
                                                      )}





                                                      {/* <Form.Control
                                                  multiple
                                                  type="file"
                                                  sm="9"
                                                  className={"img_add_button"}
                                                  onChange={(e) =>
                                                    imguploadchange(
                                                      e,
                                                      variantdata.product_id,
                                                      variantdata.id,
                                                      variantdata.vendor_id
                                                    )
                                                  }
                                                  name={"img_64"}
                                                /> */}
                                                      {/* <span className="plus_icon">
                                                  +
                                                </span> */}
                                                    </div>
                                                  </div>
                                                </td>
                                              </tr>
                                            ) : null}
                                          </>
                                        );
                                      }
                                    )}
                                  {changeUnitproperty === "editvariety" ? (
                                    <tr className="text-primary text-center mx-5">
                                      Now You can edit vareity type
                                    </tr>
                                  ) : customvalidated === "imgformat" ? (
                                    <tr>
                                      <td colSpan={"12"}>
                                        (
                                        <span
                                          className="mt-2   text-center fs-6 text-danger"
                                          type="invalid"
                                        >
                                          Image Format should be in jpg, jpeg or
                                          png
                                        </span>
                                        )
                                      </td>
                                    </tr>
                                  ) : null}
                                </tbody>
                              </Table>
                              {/* </Accordion> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Form.Group>
                  </Form>
                </div>
              </div>

              <SAlert
                show={VerityAlert}
                title={"Product"}
                text="Are you Sure you want to delete"
                onConfirm={deleteProductVeriant}
                showCancelButton={true}
                onCancel={closeAlert}
              />

              <SAlert
                show={ProductAlert}
                title="Added Successfully"
                text=" Product Added"
                onConfirm={closeAlert}
              />

              <SAlert
                show={UpdatetAlert}
                title="Updated Successfully "
                text=" Product Updated"
                onConfirm={closeAlert}
              />
            </>
          ) : hideallData === true ? (
            <h1>No Record Found</h1>
          ) : null}
        </div>
      )}
    </>
  );
};

export default Productdetail;
