import React from 'react';
import './LinkedAccountItem.css';
import {IoTrash} from 'react-icons/io5';
import {MdEdit} from 'react-icons/md';

import ResultField from '../ResultField/ResultField';
import DeleteModal from './DeleteModal';
import UpdateModal from './UpdateModal';

function LinkedAccountItem({accountData}){

    const [deleteModalShow, setDeleteModalShow] = React.useState(false);
    const [updateModalShow, setUpdateModalShow] = React.useState(false);
   
    return(
        <React.Fragment>
        
        <div className="result-card-wrapper">
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

            {/* Buttons */}
            <div className="result-cards-btn-wrapper">
                <button className="result-card-btn" id="del-btn" 
                onClick={() => {
                    setDeleteModalShow(true);}
                }>
                    <IoTrash />
                </button>
                <button className="result-card-btn" 
                id="update-btn"
                onClick={() => {
                    setUpdateModalShow(true);
                }}>
                    <MdEdit />
                </button>
            </div>
        </div>


        {/* Delete modal */}

        <DeleteModal show={deleteModalShow}
        style={{opacity:1}}
        onHide={() => setDeleteModalShow(false)} 
        accountData={accountData}/>

        {/* Update modal */}
        <UpdateModal show={updateModalShow}
        style={{opacity:1}}
        onHide={() => setUpdateModalShow(false)} 
        accountData={accountData}/>
        
        </React.Fragment>
    );
}

export default LinkedAccountItem;