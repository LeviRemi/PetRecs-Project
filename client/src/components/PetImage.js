import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

// Style
import '../pages/PostLogin/Pets/Pets.css'

function PetImage(props) {
    return (
        <div id="PetProfileContainer">
            <div id="PetCircle">
                <img id={"ImageId" + props.PetId} src={props.ProfileUrl} className="PetImage"></img>
            </div>
        </div>
    )
}

export default PetImage;