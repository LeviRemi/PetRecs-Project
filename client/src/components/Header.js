// Header.js

import React from 'react'
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function Header() {
    return (
        <div className="mainPageHeaderBar">
            <div className="mainPageHeader">
            <Row>
                <Col sm="auto">
                    <span className="mainPageHeaderTitle box">
                        <img src={require('../icon_xsm.png')} alt='PetRecs Dogument Logo' width='33' height='36' />
                        <Link to="/pets"><span className="petTitle">Pet</span><span className="recsTitle">Recs</span></Link>
                    </span>
                </Col>
                <Col>
                </Col>
                <Col md="auto">
                    <span className="mainPageHeaderItem">
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
                    </span>
                </Col>
            </Row>
        </div>
        </div>
    )
}

export default Header