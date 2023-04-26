import React from 'react';

const Input = (props) => {
    return (
        <div>
            <input type={props.type} placeholder={props.plchldr} name={props.name} value={props.value} className={props.inputclass} />
        </div>
    );
}

export default Input;
Input.defaultProps = {
    inputclass: 'adminsideinput',
    name: '',
    onChange: {},
    type: '',
    value: '',
    plchldr: ''
};
