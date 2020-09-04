// Header.js

import React from 'react'
import Breadcrumb from 'react-bootstrap/Breadcrumb';

function Header() {
    return (
        <div>
            <h1>PetRecs</h1>
            <Breadcrumb>
                <Breadcrumb.Item as="h5">Pets</Breadcrumb.Item>
                <Breadcrumb.Item as="h2" href="#">My Account</Breadcrumb.Item>
            </Breadcrumb>
        </div>
    )
}

export default Header