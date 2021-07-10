import React from 'react';
import { Link } from "react-router-dom";
import Button from '../components/button/Button';
import './landing.css';

function Landing()
{
    return(
            <div className="btn-wrapper">
                <div className="btn-inside">
                    <Link to="/manage">
                        <Button buttonText={"Manage User"} classname={"user-btn"} type={"button"}/>
                    </Link>
                    <Link to="https://marketplace.gohighlevel.com/oauth/chooselocation?response_type=code&redirect_uri=h[…]rsations/message.readonly%20conversations/message.write">
                        <Button buttonText={"Add User"} classname={"user-btn"} type={"button"}/>
                    </Link>
                </div>
            </div>
    )
}

export default Landing;