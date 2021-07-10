import React from 'react';
import './Button.css';

function CustomButton({buttonText, classname, type}){
    return(
        <div className="btn-wrapper">
            <button className={classname} type={type}>
                {buttonText}
            </button>
        </div>
    );
}

export default CustomButton;