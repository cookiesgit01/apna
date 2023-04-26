import React from 'react';
import Form from 'react-bootstrap/Form';
function AdminComponents() {
    return (
        <div className='component_page'>
            <h2>Components</h2>
            <div className='row page_row'>
                <div className='card p-5 mt-3'>
                    <h4>Buttons</h4>
                    <div className='button_list myflex mt-3 '>
                        <button className='button'>Button</button>
                        <button className='button main_button'>Main button</button>
                        <button className='button main_outline_button'>Main button outline</button>
                    </div>
                    <div className='code_box mt-3 p-3 bg-dark'>
                        <pre className='notranslate htmlHigh'>
                            &lt;button className='button'&gt;Button&lt;/button&gt;<br />
                            &lt;button className='button main_button'&gt;Main button&lt;/button&gt;<br />
                            &lt;button className='button main_outline_button'&gt;Main button outline&lt;/button&gt;<br />
                        </pre>
                    </div>
                </div>
                <div className='card p-5 mt-3'>
                    <h4>Input</h4>
                    <div className='input_list  mt-3 '>
                        <Form.Group className="mb-3 aos_input" controlId="formBasicEmail">
                            <Form.Label>Input label</Form.Label>
                            <Form.Control type="email" placeholder="Placeholder text" />
                        </Form.Group>
                        <Form.Group className="mb-3 aos_input" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Example textarea</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder='Placeholder text' />
                        </Form.Group>
                    </div>
                    <div className='code_box mt-3 p-3 bg-dark'>
                        <pre className='notranslate htmlHigh'>
                            &lt;Form.Group className="mb-3 aos_input" controlId="formBasicEmail"&gt;<br />
                            &nbsp;&nbsp;&nbsp;&lt;Form.Label&gt;Email address&lt;/Form.Label&gt;<br />
                            &nbsp;&nbsp;&nbsp;&lt;Form.Control type="email" placeholder="Enter email" /&gt;<br />
                            &lt;/Form.Group&gt;
                            <br /><br />
                            &lt;Form.Group className="mb-3 aos_input" controlId="exampleForm.ControlTextarea1"&gt;<br />
                            &nbsp;&nbsp;&nbsp;&lt;Form.Label&gt;Example textarea&lt;/Form.Label&gt;<br />
                            &nbsp;&nbsp;&nbsp;&lt;Form.Control as="textarea" rows={3} placeholder='Placeholder text' /&gt;<br />
                            &lt;/Form.Group&gt;
                        </pre>
                    </div>
                </div>
                <div className='card p-5 mt-3'>
                    <h4>Select</h4>
                    <div className='input_list  mt-3 '>
                        <Form.Group className="mb-3 aos_input" controlId="formBasicEmail">
                            <Form.Label>Input label</Form.Label>
                            <Form.Select aria-label="Default select example">
                                <option>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </Form.Group>
                    </div>
                    <div className='code_box mt-3 p-3 bg-dark'>
                        <pre className='notranslate htmlHigh'>
                            &lt;Form.Group className="mb-3 aos_input" controlId="formBasicEmail"&gt;<br />
                            &nbsp;&nbsp;&nbsp;&lt;Form.Label&gt;Input label&lt;/Form.Label&gt;<br />
                            &nbsp;&nbsp;&nbsp;&lt;Form.Select aria-label="Default select example"&gt;<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;option&gt;Open this select menu&lt;/option&gt;<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;option value="1"&gt;One&lt;/option&gt;<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;option value="2"&gt;Two&lt;/option&gt;<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;option value="3"&gt;Three&lt;/option&gt;<br />
                            &nbsp;&nbsp;&nbsp;&lt;/Form.Select&gt;<br />
                            &lt;/Form.Group&gt;<br />
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminComponents;
