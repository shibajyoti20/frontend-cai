import React from 'react';
import './FormField.css';

function CustomFormField({placeholder, inputType})
{
    return(
        <div className="form-group">
            <input type={inputType} 
            className="form-control"
            placeholder={placeholder}/>
        </div>
    )
}

export default CustomFormField;