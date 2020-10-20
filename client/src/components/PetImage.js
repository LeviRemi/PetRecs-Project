import React from 'react';

// Style
import '../pages/PostLogin/Pets/Pets.css'

function PetImage(props) {
    return (
        <div id="PetProfileContainer">
            <div id="PetCircle">
                <img alt="pet profile" id={"ImageId" + props.PetId} src={props.ProfileUrl} className="PetImage"></img>
            </div>
        </div>
    )
}

export function PetCardImage(props) {
    return (
        <div id="PetCardProfileContainer">
            <img alt="pet card" id={"ImageId" + props.PetId} src={props.ProfileUrl} className="PetCardImage FadeIn"></img>
        </div>
    ) 
}

export function PetProfileImage(props) {
    return (
        <div id="PetAboutContainer">
            <div id="PetProfileCircle">
                <img alt="pet profile" id={"ImageId" + props.PetId} src={props.ProfileUrl} className="PetImage"></img>
            </div>
        </div>
        
    )
}

export default PetImage;
