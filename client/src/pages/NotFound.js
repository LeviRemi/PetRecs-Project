import React from 'react';
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";

const NotFound = () => (
    <div style={{margin: "30px"}}>
        <h1 className="text-center">404 - Not Found!</h1>
        <div className="text-center" style={{marginTop: "15px"}}>
            <Link to="/">
                <Button variant="secondary">
                    Go Home
                </Button>
            </Link>
        </div>

    </div>
);

export default NotFound;