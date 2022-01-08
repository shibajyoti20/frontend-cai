import './LinkedAccountItem.css';

import { Button, Form, Modal } from 'react-bootstrap';

import React from 'react';
import Spinner from 'react-activity/dist/Spinner';
import axios from 'axios';
import {urls} from '../Request';

function DeleteModal(props) {
    const [projectID, setProjectID] = React.useState('');
    const[activityIndicatorStatus, setActivityIndicatorStatus] = React.useState('none');

    const resetStateCloseSpinnerOnDeletion = () => {

        props.onHide();

        setProjectID('');

        setActivityIndicatorStatus('none');

    }

    React.useEffect(() => {

      setActivityIndicatorStatus('none');
      
    }, [])

    const onSubmitHandler = async() => {
        try{
            const body = {
                locationId : props.accountData.locationID,
                password : projectID
            }
            
            let response = await axios.post(urls.deleteByProjectID, body);

            if(response.status === 200){

              resetStateCloseSpinnerOnDeletion();
              
              alert("Deleted successfully");

              window.location.reload();

            }else{

              resetStateCloseSpinnerOnDeletion();

              alert("Cannot be deleted");

            }
        }catch(err){

            resetStateCloseSpinnerOnDeletion();

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
              Are you absolutely sure?
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* <h4>To </h4> */}
            <p>
              This action cannot be undone. This will permanently 
              delete the details related to <b>location ID {props.accountData.locationID}</b>.
            </p>
            <p>
              Please type <b>project ID</b> to confirm.
            </p>
            <p>
              <Form className="modal-form">
                  <Form.Control type="text" value={projectID} 
                  onChange={(e) => setProjectID(e.target.value)}/>
              </Form>
            </p>
          </Modal.Body>
          <Modal.Footer>
              <Button variant="secondary" 
              onClick={props.onHide}>
                  Close
              </Button>
              <Button variant="primary" 
              style={{ 
                backgroundColor : projectID === props.accountData.projectID ? "#1877f2" : "#1877f28f",
                borderColor: projectID === props.accountData.projectID ? "#1877f2" : "transparent"
              }}
              onClick={() => {
                  if(projectID === props.accountData.projectID){

                      onSubmitHandler();

                      setActivityIndicatorStatus('show');

                  }
              }}>
                  Confirm
              </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
}


export default DeleteModal;