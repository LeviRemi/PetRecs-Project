// PetNavBar.js

import React from 'react'
import { NavLink } from 'react-router-dom';

function PetNavBar(props) {
  
    // console.log("Navbar PetId for links: " + props.value.PetId);

    return (

        <div className="petProfileNavBar">
          <NavLink activeStyle={{color: "black"}} activeClassName="activeNav" exact to={{pathname: `/pets/${props.value.PetId}/about`}}>
            <button className="btn-petprofile-nav">
              About
            </button>
          </NavLink>
          <NavLink activeClassName="activeNav" to={{pathname: `/pets/${props.value.PetId}/records`}}>
            <button className="btn-petprofile-nav">
              Records
            </button>
          </NavLink>
          <NavLink activeClassName="activeNav" to={{pathname: `/pets/${props.value.PetId}/journal`}}>
            <button className="btn-petprofile-nav">
              Journal
            </button>
          </NavLink>
          <NavLink activeClassName="activeNav" to={{pathname: `/pets/${props.value.PetId}/health`}}>
            <button className="btn-petprofile-nav">
              Health
            </button>
          </NavLink>
          <NavLink activeClassName="activeNav" to={{pathname: `/pets/${props.value.PetId}/medications`}}>
            <button className="btn-petprofile-nav">
              Medications
            </button>
          </NavLink>
        </div>

    )
}

export default PetNavBar