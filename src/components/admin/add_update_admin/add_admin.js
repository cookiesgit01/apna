import React from "react";
import Form from "react-bootstrap/Form";
const AddAdmin = () => {
  return (
    <div>
      {/* form */}

      <div className="d-flex justify-content-center align-items-center p-0 m-0">
        <Form className="">
          <div className="">
            <div className="">
              <div className="row px-3">
                <div className="col-12">
                  <Form.Group className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label className="" column sm="12">
                      Name
                    </Form.Label>

                    <Form.Control type="text" placeholder="Name" />
                  </Form.Group>
                </div>
                <div className="col-12">
                  <Form.Group
                    className="mb-3"
                    controlId="formPlaintextPassword"
                  >
                    <Form.Label className="" column sm="12">
                      Email
                    </Form.Label>

                    <Form.Control type="text" placeholder="Email" />
                  </Form.Group>
                </div>
                <div className="col-12">
                  <Form.Group
                    className="mb-3"
                    controlId="formPlaintextPassword"
                  >
                    <Form.Label className="" column sm="12">
                      Mobile
                    </Form.Label>

                    <Form.Control type="text" placeholder="Mobile Number" />
                  </Form.Group>
                </div>
                <div className="col-12">
                  <Form.Group
                    className="mb-3"
                    controlId="formPlaintextPassword"
                  >
                    <Form.Label className="" column sm="12">
                      Password
                    </Form.Label>

                    <Form.Control type="text" placeholder="Password" />
                  </Form.Group>
                </div>
                <div className="col-12">
                  <Form.Group
                    className="mb-3"
                    controlId="formPlaintextPassword"
                  >
                    <Form.Label className="" column sm="12">
                      Admin Type
                    </Form.Label>

                    <Form.Select aria-label="Default select example">
                      <option>Super Admin</option>
                      <option value="1">Admin</option>
                      <option value="2">Editor</option>
                    </Form.Select>
                  </Form.Group>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddAdmin;
