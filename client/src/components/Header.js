// Header.js

import React from 'react'
import { Link } from 'react-router-dom';

function Header() {
    return (
        <div className="mainPageHeader">
            <div className="mainPageHeaderItem">
                <img src={require(`../pet-recs-logo_low-qual.png`)} alt='PetRecs Dogument Logo' width='48' height='55' />
                    PetRecs
            </div>                
            <div className="mainPageHeaderItem push-right">
                <Link to="/pets">
                    <button className="btn-mainpage-header">
                        Pets
                    </button>
                </Link>
                <Link to="/account">
                    <button className="btn-mainpage-header">
                        Account
                    </button>
                </Link>
                <Link to="/logout">
                    <button className="btn-mainpage-header">
                        Log Out
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Header