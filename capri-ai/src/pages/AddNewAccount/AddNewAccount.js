import React from 'react';
import axios from 'axios';
import { urls } from '../../components/Request';

import './AddNewAccount.css';

import Button from '../../components/button/Button';

function AddNewAccount(){

    //Form Field States
    const[businessName, setBusinessName] = React.useState('');
    const[locationID, setLocationID] = React.useState('');
    const[calendarID, setCalendarID] = React.useState('');
    const[email, setEmail] = React.useState('');
    const[apiKey, setApikey] = React.useState('');
    const[dialogFlowAgentID, setDialogFlowAgentID] = React.useState('');

    const[submissionStatus, setSubmissionStatus] = React.useState('')

    const ClearForm = () => {
        setBusinessName('');
        setLocationID('');
        setCalendarID('');
        setEmail('');
        setApikey('');
        setDialogFlowAgentID('');
    }

    const HandleAddNewAccountFormSubmission = async(e) => {
        e.preventDefault();
        if(submissionStatus === 'failed'){
            setSubmissionStatus('');
        }
        let formData = {
            Location_ID : locationID,
            email : email,
            apiKey : apiKey,
            Business_Name : businessName,
            dialogflow_agent_id : dialogFlowAgentID,
            calendarID : calendarID
        }

        try{
            let response = await axios.post(urls.addAccount,formData);

            if(response.status === 200){
                ClearForm();
                window.location.href = response.data.redirect;
            }else{
                throw new Error('400');
            }
        }catch(err){
            setSubmissionStatus('failed');
        }
    }

    return(
        <div className="addnewaccount-form-wrapper">
            {
                submissionStatus === 'failed' ?
                <div className="form-error-wrapper">
                    <div className="error-header">
                        <h1><b>Oops!</b></h1>
                    </div>
                    <div className="error-content">
                        <h2><b>500</b></h2>
                        <h3>Form Cannot Be Submitted</h3>
                    </div>
                </div>
                :
                <form className="addnewaccount-form"
                onSubmit={(e) => HandleAddNewAccountFormSubmission(e)}>
                    <div className="form-group">
                        <h2><b>Add New Account</b></h2>
                    </div>
                    <div className="form-group">
                        <input type="text" 
                        className="form-control"
                        required
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="Business Name"/>
                    </div>

                    <div className="form-group">
                        <input type="text" 
                        className="form-control"
                        required
                        value={locationID}
                        onChange={(e) => setLocationID(e.target.value)}
                        placeholder="Location ID"/>
                    </div>

                    <div className="form-group">
                        <input type="text" 
                        className="form-control"
                        required
                        value={calendarID}
                        onChange={(e) => setCalendarID(e.target.value)}
                        placeholder="Calendar ID"/>
                    </div>

                    <div className="form-group">
                        <input type="email" 
                        className="form-control"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"/>
                    </div>

                    <div className="form-group">
                        <input type="text" 
                        className="form-control"
                        required
                        value={apiKey}
                        onChange={(e) => setApikey(e.target.value)}
                        placeholder="ApiKey"/>
                    </div>

                    <div className="form-group">
                        <input type="text" 
                        className="form-control"
                        required
                        value={dialogFlowAgentID}
                        onChange={(e) => setDialogFlowAgentID(e.target.value)}
                        placeholder="DialogFlow Agent ID"/>
                    </div>

                    <div className="form-group">
                        <Button buttonText={"Submit"} 
                        classname={"form-control addnewaccount-submit-btn"} 
                        type={"submit"}/>
                    </div>
                </form>
            }
        </div>
    )
}

export default AddNewAccount;