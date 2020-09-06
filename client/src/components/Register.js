// Register.js

import React from 'react'
import { Link } from 'react-router-dom';

function Register() {
    return (
        
        <div>
            <div>
                <h1>Register</h1>
            </div>
            <p>This is the Register Page.</p>
            <Link to="/" className="btn btn-secondary">Register</Link>
        </div>
    )
}

export default Register