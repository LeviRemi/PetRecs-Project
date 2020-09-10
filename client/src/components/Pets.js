// Pets.js

import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../Pets.css'

import Header from './Header.js';
import Footer from './Footer.js';

const PetObject = props => (
    <Link id="PetLink" to="/Pets">
        <div id="PetContainer">
            <div id="ImageCircle">
                <p id="PetText">Add Pet</p>
            </div>
            <div>
                <p id="NameText">{props.petObject.PetName}</p>
            </div>
        </div>
    </Link>
)

export default class Pets extends Component {

    state = { pets: [] }

    componentDidMount() {
        axios.get("http://localhost:5000/api/pets/")
            .then(response=>{
                const pets = response.data;
                this.setState({ pets });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
    return (
        <div>
            <Header />
            { this.state.pets.map(pet => 
                <Link id="PetLink" to="/Pets">
                    <div id="PetContainer">
                        <div id="ImageCircle">
                            <p id="PetText">Add Pet</p>
                        </div>
                        <div>
                            <p id="NameText">{pet.PetName}</p>
                        </div>
                    </div>
                </Link>
            )}
            <br />
            <Link to="/petrecords" className="btn btn-secondary">Pet Records</Link>
            <br/><br/>
            
            <Footer />
        </div>
    )
    }
}

//export default Pets