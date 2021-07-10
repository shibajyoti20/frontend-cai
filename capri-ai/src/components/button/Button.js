import React from 'react';
import './Button.css';
function Button({type, clsname, btnText}){
    return(
        <div className="btn-wrapper">
            <button className={clsname} type={type}>
                {btnText}
            </button>
        </div>
    );
}

export default Button;