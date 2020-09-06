// Login.js

import React from 'react'
import { Link } from 'react-router-dom';

function Login() {
    return (
        
        <div>
            <div>
                <h1>Login</h1>
            </div>
            <p>This is the Login Page.</p>
            <Link to="/Pets" className="btn btn-secondary">Login</Link>
        </div>
    )
}

export default Login