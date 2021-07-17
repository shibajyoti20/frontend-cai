import React from 'react';
import { Link } from "react-router-dom";
import Button from '../../components/button/Button';
import './Landing.css';

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
            </div>
    )
}

export default Landing;