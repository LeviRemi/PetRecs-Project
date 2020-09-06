// PetRecords.js

import React from 'react'
import { Link } from 'react-router-dom';

import Header from './Header.js';
import Footer from './Footer.js';

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

function PetRecords() {
    return (
      <div>
          <Header />

          <ButtonGroup vertical>
            <Button>Records</Button>
            <Button>Health</Button>
            <Button>Events</Button>
            <Button>Reminders</Button>
          </ButtonGroup>

          <h3> need to figure out here whether we will use multiple pages<br />
          or if this should be a component that renders in when needed</h3>
          <Footer />
      </div>
    )
}

export default PetRecords