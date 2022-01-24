import React from "react";
import './speakers.css';

class Speaker extends React.Component {
    
    render() {
        return (
                <div className="content content--tall ">
                <div className="speakercontainer">
                    <blockquote>
                        {this.props.description}
                        <cite>{this.props.name}  <span className="color--accent font-weight--bold space--small">{`//`}</span> {this.props.tag} </cite>
                    </blockquote>
                </div>
                <p className="space-top--large">
                    <img className="avatar space-right--medium" src={this.props.image} alt="Avatar"/>
                </p>
            </div>
        );
    }
}


export default Speaker;