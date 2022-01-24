import React from "react";
// import './speakers.css';
import Speaker from './speaker.js'
import './speakers.css';
import {descriptionSpeakers} from '../assets/constants';

var imgKano = require(`../assets/avatar/kanoavatar.jpeg`)
var imgConejo = require(`../assets/avatar/conejoavatar.jpeg`)
var imgKim = require(`../assets/avatar/kimavatar.jpeg`)
class Speakers extends React.Component {
    
    render() {
        return (
            <div className="section text-align--center">
                <h2>Conoce a los speakers <span role="img" aria-label="microphone">🎤</span></h2>
                <div className="content content--tall ">
                <Speaker description = {descriptionSpeakers.kano} image = {imgKano} name ="Dr. Paulo Kano" tag="Desarrollador del Método Cllones."/>
                <Speaker description = {descriptionSpeakers.kim} image = {imgKim} name ="Dr. Syngcuk Kim" tag="PhD en Fisiología MIcrocirculatoria."/>
                <Speaker description = {descriptionSpeakers.conejo} image = {imgConejo} name ="Dr. Julián Conejo" tag="Director Clínico de CAD/CAM de la Universidad de Pennsylvania."/>
            </div>
            </div>
        );
    }
}


export default Speakers;