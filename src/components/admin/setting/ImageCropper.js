import React, { useState } from "react";
import Cropper from "react-easy-crop";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FileInput from "./FileInput";
import RangeSlider from "react-bootstrap-range-slider"
function ImageCropper({ image, imageName, modalShow, onCropDone, onCropCancel, handleClose }) {

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);
  const [aspectRatio, setAspectRatio] = useState(2 / 3);
  const [show, setShow] = useState(modalShow);
  let [count, setCount] = useState(1);
  function incrementCount() {
    if (zoom === count) {
      setZoom(20);

    } else {
      count = count + 1;
      setCount(count);
      setZoom(20);
    }
  }
  /*<-----Decrement Functionality----> */
  const decrementCount = () => {
    if (count > 1) {
      setCount((count) => count - 1);
      setZoom(20);
    }
  };


  // const [ value, setValue ] = React.useState(50);



  const modalClose = () => {
    const show = setShow(false)
    handleClose({ "show": show })
  }


  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  const onAspectRatioChange = (event) => {
    setAspectRatio(event.target.value);
  };


  return (
    <>

      <Modal show={show} onHide={handleClose} size="lg" className="h-100"  >
        <Modal.Header closeButton>
          <Modal.Title>Crop Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="cropper ">
            <div className="container">
              <Cropper
                image={image}
                imageNamee={imageName}
                aspect={aspectRatio}
                crop={crop}
                zoom={zoom}
                onCropChange={setCrop}
                onClick={setZoom}
                onCropComplete={onCropComplete}
                style={{
                  containerStyle: {
                    width: "100%",
                    height: "100%",
                    marginTop: "10px",
                    // marginLeft:"190px",
                    backgroundColor: "#fff",
                  },
                }}
              />


            </div>
          </div>


        </Modal.Body>
        <Modal.Footer>
          {window.location.pathname === "/product" ? ""
            : <>
              <div className="action-btns" >

                <div className="aspect-ratios" onChange={onAspectRatioChange}>
                  <Form.Check inline type="radio" value={1 / 1} name="ratio" label="1:1" />
                  <Form.Check inline type="radio" value={1 / 2} name="ratio" label="1:2" />
                  <Form.Check inline type="radio" value={1 / 3} name="ratio" label="1:3" />
                  <Form.Check inline type="radio" value={1 / 4} name="ratio" label="1:4" />
                </div>
              </div>
            </>}

          <RangeSlider
            value={zoom}

            onChange={e => setZoom(e.target.value)}
          />
          <Button variant="info" type="range" onClick={incrementCount} >+</Button>&nbsp;
          <Button variant="info" onClick={decrementCount} >-</Button>
          <Button variant="secondary" onClick={() => { modalClose() }}>
            Close
          </Button>
          <Button variant="primary" onClick={() => {
            onCropDone(croppedArea);
          }}>
            Done
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="imgprivew_box">
        {window.location.pathname === "/product" ?
          <>
            <img
              src={
                "https://i2.wp.com/asvs.in/wp-content/uploads/2017/08/dummy.png?fit=399%2C275&ssl=1"
              }
              alt="apna_organic"
              width={100}
              height={"100%"}
            />

            <span className="plus_icon"><FileInput /></span>

          </>
          : <FileInput />}
      </div>

      {/* <div style={{marginTop:"30px"}}>
      <Button variant="primary"  onClick={handleShow}>
        Crop Image
        
      </Button>
      </div> */}

    </>
  );
}

export default ImageCropper;