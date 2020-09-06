// Pets.js

import React from 'react'
import { Link } from 'react-router-dom';

import Header from './Header.js';
import Footer from './Footer.js';

function Pets() {
    return (
        
        <div>
            <Header />
            <p>This is the Pets Page.</p>
            <br/><br/>
            
            <Footer />
        </div>
    )
}

export default Pets