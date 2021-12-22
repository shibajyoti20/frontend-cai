import './Landing.css';

import Button from '../../components/button/Button';
import { Link } from "react-router-dom";
import React from 'react';

function Landing()
{
    return(
            <div className="landing-btn-wrapper">
                <div className="btn-inside">

                    {/* Manage Button */}
                    <Link to="/manage">

                        <Button buttonText={"Manage Accounts"} 
                        classname={"user-btn"} 
                        type={"button"}/>

                    </Link>
                    
                    {/* Add User */}
                    <Link to="/addnewaccount">

                        <Button buttonText={"Add New Account"} 
                        classname={"user-btn"} 
                        type={"button"}/>

                    </Link>
                  
                </div>
                <div className="btn-inside">

                    {/* Manage Subscription */}
                    <a href="https://connect.capriai.us/customerportal">

                        <Button buttonText={"Manage Subscriptions"} 
                        classname={"user-btn"} 
                        type={"button"}/>

                    </a>
                  
                </div>
            </div>
    )
}

export default Landing;