import React from 'react';
import axios from 'axios';
import './LinkedAccountItem.css';
import {urls} from '../Request';
import { Button, Modal, Form } from 'react-bootstrap';
import Spinner from 'react-activity/dist/Spinner';


function UpdateModal(props) {
    const [projectID, setProjectID] = React.useState(props.accountData.projectID);
    const [locationID, setLocationID] = React.useState(props.accountData.locationID);
    const [calendarID, setCalendarID] = React.useState(props.accountData.calendarID);
    const [businessName, setBusinessName] = React.useState(props.accountData.businessName);
    const [apiKey, setApiKey] = React.useState(props.accountData.apiKey);
    const[activityIndicatorStatus, setActivityIndicatorStatus] = React.useState('none');


    const CloseSpinnerAndModalOnDeletion = () => {

        props.onHide();
  
        setActivityIndicatorStatus('none');

    }

    React.useEffect(() => {

        setActivityIndicatorStatus('none');
        
    }, [])

    const onSubmitHandler = async() => {
        try{
            const body = {
                api_key : apiKey,
                calendarId : calendarID,
                business_name : businessName,
                locationId : locationID,
                password : projectID
            }
            
            let response = await axios.post(urls.updateProjectDetails, body);

            if(response.status === 200){

                CloseSpinnerAndModalOnDeletion();
                
                alert("Updated successfully");

                window.location.reload();
                
            }else{
                
                CloseSpinnerAndModalOnDeletion();

                alert("Cannot be updated");
               
            }
        }catch(err){
            
            CloseSpinnerAndModalOnDeletion();

            if(window.navigator.onLine){

                alert("An unexpected error occured");

            }else{

                alert("You are offline");

            }

        }
    }


    return (

        <React.Fragment>
        
        {/* Spinner */}
        <div className="mdl-overlay" 
        style={{display : activityIndicatorStatus === 'none'? 'none' : 'flex'}}>
            <Spinner size={30} color={"#1875ee"}/>
        </div>


        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Update Project Details
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <p>
                <Form className="modal-form">
                    <Form.Group className="mb-3" controlId="formGroupBusinessName">
                        <Form.Label>Business Name</Form.Label>
                        <Form.Control type="text" value={businessName} 
                        placeholder="Business Name"
                        onChange={(e) => setBusinessName(e.target.value)}/>
                    </Form.Group>
                
                    <Form.Group className="mb-3" controlId="formGroupLocationID">
                        <Form.Label>Location ID</Form.Label>
                        <Form.Control type="text" value={locationID} 
                        placeholder="Location ID"
                        onChange={(e) => setLocationID(e.target.value)}/>
                    </Form.Group>
                
                    <Form.Group className="mb-3" controlId="formGroupCalendarID">
                        <Form.Label>Calendar ID</Form.Label>
                        <Form.Control type="text" value={calendarID} 
                        placeholder="Calendar ID"
                        onChange={(e) => setCalendarID(e.target.value)}/>
                    </Form.Group>
                
                    <Form.Group className="mb-3" controlId="formGroupApiKey">
                        <Form.Label>Api Key</Form.Label>
                        <Form.Control type="text" value={apiKey} 
                        placeholder="Api Key"
                        onChange={(e) => setApiKey(e.target.value)}/>
                    </Form.Group>
                
                    <Form.Group className="mb-3" controlId="formGroupProjectID">
                        <Form.Label>Project ID</Form.Label>
                        <Form.Control type="text" value={projectID} 
                        placeholder="Project ID"
                        onChange={(e) => setProjectID(e.target.value)}/>
                    </Form.Group>
                
                </Form>
            </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" 
                onClick={props.onHide}>
                    Close
                </Button>
                <Button variant="primary" 
                style={{backgroundColor : "#1877f2"}}
                onClick={() => {
                    onSubmitHandler();
                    setActivityIndicatorStatus('show');
                }}>
                    Update
                </Button>
            </Modal.Footer>
        </Modal>
        </React.Fragment>
    );
}


export default UpdateModal;