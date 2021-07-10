import React from 'react';
import './Button.css';

function Button({buttonText, classname, type}){
    return(
        <div className="btn-wrapper">
            <button className={classname} type={type}>
                {buttonText}
            </button>
        </div>
    );
}

export default Button;