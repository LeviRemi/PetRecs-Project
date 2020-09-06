// Pets.js

import React from 'react'
import { Link } from 'react-router-dom';

import Header from './Header.js';
import Footer from './Footer.js';

function Pets() {

    const petContainerStyle = {
        width: 135,
        height: 170,
        marginTop: 25,
        marginBottom: 25,
        marginLeft: 12.5,
        marginRight: 12.5
    };

    const circleStyle = {
            width: 135,
            height: 135,
            borderRadius: 135/2,
            borderStyle: "solid",
            borderColor: "gray"
    };

    const nameStyle = {
        textAlign: "center",
        fontWeight: 700,
        fontSize: 23
    };

    const addTextStyle = {
        textAlign: "center",
        fontWeight: 700,
        fontSize: 23,
        paddingTop: 45,
        color: "gray"
    };

    const linkStyle = {
        textDecoration: "none",
        color: "gray"
    };

    return (
        
        <div>
            <Header />
            <Link style={linkStyle} to="/Pets">
            <div style={petContainerStyle}>
                <div style={circleStyle}>
                    <p style={addTextStyle}>Add Pet</p>
                </div>
                <div>
                    <p style={nameStyle}>Pet Name</p>
                </div>
            </div>
            </Link>

            <Link to="/petrecords" className="btn btn-secondary">Pet Records</Link>
            
            <br/><br/>
            
            <Footer />
        </div>
    )
}

export default Pets