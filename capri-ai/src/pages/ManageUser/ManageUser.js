import React from 'react';
import axios from 'axios';

import './ManageUser.css';
import data from '../../components/SampleData';

import CustomButton from '../../components/button/Button';
import LinkedAccountItem from '../../components/LinkedAccountItem/LinkedAccountItem';

function ManageUser(){
    const[agentid, setAgentid] = React.useState('');
    const[LinkedAccounts, setLinkedAccounts] = React.useState([]);


    let SubmitHandler = async(e) => {
        e.preventDefault();
        let listarea = document.getElementById("account-list-area");


        let requestUrl = `https://systems.capriai.us/listAllAccounts?agentID=${agentid}`
        try{
            listarea.innerText = "Loading..."
            const response  = await axios.get(requestUrl);
            console.log(response.data);
        }
        catch (err){
            console.error(err);
            setLinkedAccounts(data);
            if(LinkedAccounts.length === 0){
                listarea.innerText = "No Matching Results"
            }
        }
    }

    return(
        <div className="manage-user-wrapper">
            <div className="manage-user-left-wrapper">
                <div className="form-wrapper">
                    <h2 id="manageUser-form-header">Search with AgentID</h2>
                    <form className="agentid-form" onSubmit={(e) => SubmitHandler(e)}>
                        <div className="form-group">
                            <input type="text" placeholder="Agent-ID"
                            className="form-control agentid-formfield" 
                            value={agentid} 
                            onChange={(e) => setAgentid(e.target.value)}
                            required/>
                        </div>
                        <div className="form-group">
                            <CustomButton type={"submit"} classname={"form-control agentid-btn"}
                            buttonText={"Search"}/>
                        </div>
                    </form>
                </div>
            </div>
            <div className="manage-user-right-wrapper">
                <div className="connected-account-list-wrapper">
                    {LinkedAccounts.length === 0 ? 
                    
                    <div className="status-text">
                        <h4 id="account-list-area">No Results</h4>
                    </div>
                    :
                    LinkedAccounts.map((item) => (
                        <LinkedAccountItem accountData={item}/>
                    ))
                    
                    }
                </div>
            </div>
        </div>
    )
}

export default ManageUser;