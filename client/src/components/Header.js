// Header.js

import React from 'react'
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Header() {
    return (
        <div className="mainPageHeader">
            <div className="mainPageHeaderItem">
                <img src={require('../pet-recs-logo_low-qual.png')} width='48' height='55' />
                    PetRecs
            </div>
            <div className="mainPageHeaderItem push-right">
                <Link to="/pets">
                    <button className="btn-homepage-header">
                        Pets
                    </button>
                </Link>
            </div>

            <div className="mainPageHeaderItem push-right">
                <Link to="/account">
                    <button className="btn-homepage-header">
                        Account
                    </button>
                </Link>
                <Link to="/logout">
                    <button className="btn-homepage-header">
                        Log Out
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Header