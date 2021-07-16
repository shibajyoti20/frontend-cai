import React from 'react';
import './LinkedAccountItem.css';

import ResultField from '../ResultField/ResultField';

function LinkedAccountItem({accountData}){
    return(
        <div className="linked-account-wrapper">

            {/* BusinessName */}
            {
                accountData.businessName !== undefined &&
                <ResultField FieldLabel={"Business Name: "} 
                FieldContent={accountData.businessName}/>
            }

            {/* LocationID */}
            {
                accountData.locationID !== undefined &&
                <ResultField FieldLabel={"Location ID: "} 
                FieldContent={accountData.locationID}/>
            }

            {/* CalendarID */}
            {
                accountData.calendarID !== undefined &&
                <ResultField FieldLabel={"Calendar ID: "} 
                FieldContent={accountData.calendarID}/>
            }
        
            {/* Apikey */}
            {
                accountData.apiKey !== undefined &&
                <ResultField FieldLabel={"ApiKey: "} 
                FieldContent={accountData.apiKey}/>
            }

            {/* ProjectID */}
            {
                accountData.projectID !== undefined &&
                <ResultField FieldLabel={"Project ID: "} 
                FieldContent={accountData.projectID}/>
            }

            {/* ServacEmail */}
            {
                accountData.servacEmail !== undefined &&
                <ResultField FieldLabel={"Servac Email: "} 
                FieldContent={accountData.servacEmail}/>
            }

            {/* Sessions */}
            {
                accountData.Sessions !== undefined &&
                <ResultField FieldLabel={"Sessions: "} 
                FieldContent={accountData.Sessions}/>
            }

        </div>
    );
}

export default LinkedAccountItem;