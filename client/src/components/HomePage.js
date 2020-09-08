// HomePage.js

import React from 'react'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div className="fullPageContainer">
            <div className="homePageHeader">
                <div className="homePageHeaderItem">
                <h1>PetRecs</h1>
                </div>

                <div className="homePageHeaderItem push-right">
                    <Link to="/login">
                        <button className="btn-homepage-header">
                            Login
                        </button>
                    </Link>

                    <Link to="/register">
                        <button className="btn-homepage-header">
                            Register
                        </button>
                    </Link>
                </div>
            </div>
            
            <p>This is where the description of the website will go.</p>
            
        </div>
    )
}

export default HomePage