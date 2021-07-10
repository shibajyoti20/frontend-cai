import React from 'react';
import './LinkedAccountField.css';

function LinkedAccountField({FieldLabel, FieldContent}){
    return(
        <div className="field-wrapper">
            <div className="field-label">
                {FieldLabel}
            </div>
            <div className="field-content">
                {FieldContent}
            </div>
        </div>
    );
}

export default LinkedAccountField;