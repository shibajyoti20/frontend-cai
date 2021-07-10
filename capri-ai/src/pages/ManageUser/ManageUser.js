import React from 'react';
import Button from '../../components/button/Button';
import './ManageUser.css';

function ManageUser(){
    const[agentid, setAgentid] = React.useState('');

    return(
        <div className="manage-user-wrapper">
            <div className="manage-user-left-wrapper">
                <div className="form-wrapper">
                    <form className="agentid-form">
                        <div className="form-group">
                            <input type="text" placeholder="Agent-ID"
                            className="form-control" 
                            value={agentid} 
                            onChange={(e) => setAgentid(e.target.value)}
                            required/>
                        </div>
                        <div className="form-group">
                            <Button type={"submit"} clsname={"form-control agentid-btn"}
                            btnText={"Search"}/>
                        </div>
                    </form>
                </div>
            </div>
            <div className="manage-user-right-wrapper">
                <div className="connected-account-list-wrapper">
                   
                </div>
            </div>
        </div>
    )
}

export default ManageUser;