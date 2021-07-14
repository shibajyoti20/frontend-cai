import React from 'react';
import './ResultField.css';

function ResultField({FieldLabel, FieldContent}){
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

export default ResultField;