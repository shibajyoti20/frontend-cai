import React from 'react';
import axios from 'axios';
import Spinner from 'react-activity/dist/Spinner';
import { urls } from '../../components/Request';

import 'react-activity/dist/Spinner.css';
import './AddNewAccount.css';

import CustomButton from '../../components/button/Button';

function AddNewAccount(){

    //Form Field States
    const[businessName, setBusinessName] = React.useState('');
    const[locationID, setLocationID] = React.useState('');
    const[calendarID, setCalendarID] = React.useState('');
    const[email, setEmail] = React.useState('');
    const[apiKey, setApikey] = React.useState('');
    const[dialogFlowAgentID, setDialogFlowAgentID] = React.useState('');
    const[checkboxA, setCheckboxA] = React.useState(false);
    const[checkboxB, setCheckboxB] = React.useState(false);

    const[submissionStatus, setSubmissionStatus] = React.useState('');
    const[activityIndicatorStatus, setActivityIndicatorStatus] = React.useState('none');

    const ClearForm = () => {
        setBusinessName('');
        setLocationID('');
        setCalendarID('');
        setEmail('');
        setApikey('');
        setDialogFlowAgentID('');
        setCheckboxA(false)
        setCheckboxB(false);
    }

    React.useEffect(() => {
        setActivityIndicatorStatus('none');
    }, [])

    const HandleAddNewAccountFormSubmission = async(e) => {
        e.preventDefault();
        if(submissionStatus === 'failed'){
            setSubmissionStatus('');
        }
       
        setActivityIndicatorStatus('progress');
        
        let formData = {
            Location_ID : locationID,
            email : email,
            apiKey : apiKey,
            Business_Name : businessName,
            dialogflow_agent_id : dialogFlowAgentID,
            calendarID : calendarID,
            trainable : checkboxA,
            saveToken: checkboxB
        }
        console.log(formData);
        try{
            let response = await axios.post(urls.addAccount,formData);
            
            if(response.status === 200){
                ClearForm();
                window.top.location.href = response.data.redirect;
            }else{
                throw new Error('400');
            }
        }catch(err){
            setActivityIndicatorStatus('none');
            setSubmissionStatus('failed');
        }
    }

    return(
        <React.Fragment>
        {console.log(activityIndicatorStatus)}
        <div className="form-overlay" 
        style={{display : activityIndicatorStatus === 'none'? 'none' : 'flex'}}>
            <Spinner size={30} color={"#1875ee"}/>
        </div>
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
                    <div className="form-group checkbox-wrapper">
                        <input type="checkbox" 
                        className="checkbox-box"
                        value={checkboxA}
                        onChange={(e) => setCheckboxA(e.target.checked)}
                        /><span className="checkbox-text">track conversations for this account</span>
                    </div>

                    <div className="form-group checkbox-wrapper">
                        <input type="checkbox" 
                        className="checkbox-box"
                        value={checkboxB}
                        onChange={(e) => setCheckboxB(e.target.checked)}
                        /><span className="checkbox-text">use the GHL conversations API (recommended)</span>
                    </div>

                    <div className="form-group">
                        <CustomButton buttonText={"Submit"} 
                        classname={"form-control addnewaccount-submit-btn"} 
                        type={"submit"}/>
                    </div>
                </form>
            }
        </div>
        </React.Fragment>
    )
}

export default AddNewAccount;