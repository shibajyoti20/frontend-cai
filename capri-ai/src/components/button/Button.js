import React from 'react';
import './Button.css';
;
function Button({type}){
    return(
        <div className="btn-wrapper">
            <button className="btn">
                {type}
            </button>
        </div>
    );
}

export default Button;