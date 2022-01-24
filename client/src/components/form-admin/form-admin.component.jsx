import React from 'react';

import FormInput from '../form-input/form-input.component';

import './form-admin.styles.css';
class FormAdmin extends React.Component {
    constructor() {
        super();
    
        this.state = {
          nombre: '',
          email: '',
          cui: '',
          colegiado: '',
          carnet: '',
          noBoleta:''
        };
        
    }

    handleSubmit = async event => {
        event.preventDefault();
    
        try {
      
          this.setState({
            nombre: '',
            email: '',
            cui: '',
            colegiado: '',
            carnet: '',
            noBoleta:''
          });
        } catch (error) {
          console.error(error);
        }
    };
    
    handleChange = event => {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    };

    render(){
        const { nombre, email, cui, colegiado, carnet, noBoleta } = this.props;
        return(
            <div>
                <FormInput
                    type='text'
                    name='nombre'
                    value={nombre}
                    onChange={this.handleChange}
                    label='Nombre'
                    required
                />
                <FormInput
                    type='email'
                    name='email'
                    value={email}
                    onChange={this.handleChange}
                    label='Correo Electronico'
                    required
                />
                <FormInput
                    type='text'
                    name='cui'
                    value={cui}
                    onChange={this.handleChange}
                    label='CUI/DPI'
                    required
                />
                <FormInput
                    type='text'
                    name='colegiado'
                    value={colegiado}
                    onChange={this.handleChange}
                    label='Colegiado'
                />
                <FormInput
                    type='text'
                    name='carnet'
                    value={carnet}
                    onChange={this.handleChange}
                    label='Carnet'
                />
                <FormInput
                    type='text'
                    name='noBoleta'
                    value={noBoleta}
                    onChange={this.handleChange}
                    label='Numero Boleta'
                />
                <input type="submit" className="button" value="Aceptar"/>
            </div>
        )
    }
}
    
export default FormAdmin;