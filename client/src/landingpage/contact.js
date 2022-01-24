import React from "react";

import FormInput from '../components/form-input/form-input.component';

var mailOptions = {
    from: 'no-reply@server.com',
    to: 'erickimpladent@gmail.com',
    subject: 'PeticionSoporteUNbiased',
    html: ''
};

let initialState = {
    email: '',
    fullname: '',
    message:''
};

class Contact extends React.Component {
    state = { ...initialState };

    handleSubmit = event => {
        const { fullname, email, message } = this.state;
        event.preventDefault();
        try {
            
            mailOptions['html'] = `<h1>${fullname}</h1><h3>${email}</h3><p>${message}</p>`;
            fetch((process.env.REACT_APP_BASE_URL) + "/sendEmail", {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                   mailOptions
                })
            })
            .then( response => response.json())
            .then( response =>{
                console.log(response);
                this.setState({ ...initialState });
            })
            .catch(err=>{
                console.log(err);
                this.setState({ ...initialState });
            });
        } catch (error) {
            console.log(error);
        }
    };
    handleChange = event => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    };

    render() {
        const  {email, fullname, message} = this.state;
        return (
            <div className="contact section">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h2>Contactenos</h2>
                            <form onSubmit={this.handleSubmit}>
                                <FormInput
                                    name='fullname'
                                    type='text'
                                    value={fullname}
                                    handleChange={this.handleChange}
                                    label='Nombre'
                                    required
                                    classNameInput={'form-control'}
                                />
                                <FormInput
                                    name='email'
                                    type='text'
                                    value={email}
                                    handleChange={this.handleChange}
                                    label='Email'
                                    required
                                    classNameInput={'form-control'}
                                />
                                <FormInput
                                    name='message'
                                    type='text'
                                    value={message}
                                    handleChange={this.handleChange}
                                    label='Mensaje'
                                    required
                                    classNameInput={'form-control'}
                                />
                                <button type="submit" className="btn btn-orange">Enviar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Contact;