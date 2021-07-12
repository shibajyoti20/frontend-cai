import React from 'react';
import { Link } from "react-router-dom";
import Button from '../components/button/Button';
import './landing.css';

function Landing()
{
    return(
            <div className="landing-btn-wrapper">
                <div className="btn-inside">

                    {/* Manage Button */}
                    <Link to="/manage">

                        <Button buttonText={"Manage User"} 
                        classname={"user-btn"} 
                        type={"button"}/>

                    </Link>
                    
                    {/* Add User */}
                    <div className="btn-wrapper">
                        <button className="user-btn" 
                        onClick={() => window.location.replace("https://marketplace.gohighlevel.com/oauth/chooselocation?response_type=code&redirect_uri=h[…]rsations/message.readonly%20conversations/message.write")}>
                            Add User
                        </button>
                    </div>
                  
                </div>
            </div>
    )
}

export default Landing;