// HomePage.js

import React from 'react'
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        
        <div>
            <div>
                <h1>HomePage</h1>
            </div>
            <p>This is the Home Page.</p>
            <Link to="/login" className="btn btn-secondary">Login</Link>
            <Link to="/register" className="btn btn-secondary">Register</Link>
        </div>
    )
}

export default HomePage