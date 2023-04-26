import React from 'react';

const Iconbutton = (props) => {
    return (
        <div className='iconbtnbox'>
            <button type={props.type} name={props.name} value={props.value} onClick={props.onClick} className={props.btnclass}>
                {props.Iconname}
                {props.btntext}</button>
        </div>
    );
}

export default Iconbutton;
Iconbutton.defaultProps = {
    btnclass: 'button main_outline_button',
    name: '',
    onClick: {},
    type: '',
    value: '',
    plchldr: '',
    btntext: '',

};