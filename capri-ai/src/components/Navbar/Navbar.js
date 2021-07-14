import React from 'react';
import Logo from '../../static/assets/1.png';

function Navbar(){
    return(
        <div className="navbar-wrapper">
            <div className="navbar-brand-wrapper">
                <img src={Logo} alt="capri-ai" style={{"width" : "150px","objectFit": "contain"}}/>
            </div>
        </div>
    );
}

export default Navbar;