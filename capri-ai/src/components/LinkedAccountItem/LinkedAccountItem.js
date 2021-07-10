import React from 'react';
import './LinkedAccountItem.css';

import LinkedAccountField from '../LinkedAccountField/LinkedAccountField';

function LinkedAccountItem({accountData}){
    return(
        <div className="linked-account-wrapper">

            {/* LocationID */}
            <LinkedAccountField FieldLabel={"Location ID: "} 
            FieldContent={accountData.locationID}/>

            {/* CalendarID */}
            <LinkedAccountField FieldLabel={"Calendar ID: "} 
            FieldContent={accountData.calendarID}/>
        
            {/* Apikey */}
            <LinkedAccountField FieldLabel={"ApiKey: "} 
            FieldContent={accountData.apiKey}/>

            {/* ProjectID */}
            <LinkedAccountField FieldLabel={"Project ID: "} 
            FieldContent={accountData.projectID}/>

            {/* ServacEmail */}
            <LinkedAccountField FieldLabel={"Servac Email: "} 
            FieldContent={accountData.servacEmail}/>

        </div>
    );
}

export default LinkedAccountItem;