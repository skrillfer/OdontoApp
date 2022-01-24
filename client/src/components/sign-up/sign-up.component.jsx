import React from 'react';
import FormInput from '../form-input/form-input.component';
import  { inputValidMessages } from '../../assets/constants';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

import { addAlert }  from  '../../redux/alert/alert.actions';
import { setCurrentUser } from '../../redux/user/user.actions';

let initialState ={
    firstname:'',
    lastname:'',
    telephone:'',//number
    email: '',
    comment: '',
    register_number: '',//number
    university: ''
};
class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...initialState };
    }

    handleSubmit =  event => {
        event.preventDefault();
    
        const { state:{
                    firstname, lastname, telephone, email,
                    comment, register_number, university
                },
                props:{
                    addAlert,
                    history, 
                    setCurrentUser
                }
              } = this;
            
        fetch(process.env.REACT_APP_BASE_URL + "/register", {
            method: "post",
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstname:firstname.trim(),
                lastname:lastname.trim(),
                telephone:parseInt(telephone.trim()),
                email:email.trim(),
                comment:comment,
                register_number:parseInt(register_number.trim()),
                university:university.trim()
            })
        })
        .then( response => {
            try {
                return response.json(); 
            } catch (error) {
                response = { state:false, message: 'Formato invalido de respuesta'};
                return response;
            }
        })
        .then( response =>{
            const { state, message, user } = response;
            if(state){     
                this.setState({ ...initialState });
                setCurrentUser(user);
                localStorage.setItem('user',JSON.stringify(user));
                history.push('/select');
            }else{
                addAlert({text:message,style:'style',title:'Error en el registro'});
            }
        })
        .catch(err=>{
            addAlert({text:err.toString(),style:'style',title:'Error de servidor'});
        });
    };
    
    handleChange = event => {
        const { name, value } = event.target;
        
        this.setState({ [name]: value });
    };
    
    render(){
        const { firstname, lastname, telephone, email,
            comment, register_number, university
          } = this.state;

        return (            
            <form onSubmit={this.handleSubmit}>
                <div className="sign-up-htm">
                    <FormInput
                        type='text'
                        name='firstname'
                        value={firstname}
                        onChange={this.handleChange}
                        label='Nombre'
                        onInvalid={
                            evt=>{if(firstname==='')evt.target.setCustomValidity(inputValidMessages.requiredMessage)}
                                } 
                        matchMessage = {''}
                        requiredMessage = {inputValidMessages.requiredMessage}
                        required
                    />
                    <FormInput
                        type='text'
                        name='lastname'
                        value={lastname}
                        onChange={this.handleChange}
                        label='Apellido'
                        onInvalid={
                            evt=>{if(lastname==='')evt.target.setCustomValidity(inputValidMessages.requiredMessage)}
                                } 
                        matchMessage = {''}
                        requiredMessage = {inputValidMessages.requiredMessage}
                        required
                    />
                    <FormInput
                        type='number'
                        name='telephone'
                        value={telephone}
                        onChange={this.handleChange}
                        label='Telefono'
                        onInvalid={
                            evt=>{if(telephone==='')evt.target.setCustomValidity(inputValidMessages.requiredMessage)}
                                } 
                        matchMessage = {''}
                        requiredMessage = {inputValidMessages.requiredMessage}
                        required
                    />
                    <FormInput
                        type='email'
                        name='email'
                        value={email}
                        onChange={this.handleChange}
                        label='Correo Electronico'
                        onInvalid={
                            evt=>{if(email==='')evt.target.setCustomValidity(inputValidMessages.requiredMessage)}
                                } 
                        matchMessage = {inputValidMessages.invalidEmailMessage}
                        requiredMessage = {inputValidMessages.requiredMessage}
                        required
                    />
                    <FormInput
                        type='number'
                        name='register_number'
                        value={register_number}
                        onChange={this.handleChange}
                        label='Numero Colegiado o Carnet'
                        onInvalid={
                            evt=>{if(register_number==='')evt.target.setCustomValidity(inputValidMessages.requiredMessage)}
                                } 
                        matchMessage = {''}
                        requiredMessage = {inputValidMessages.requiredMessage}
                        required
                    />
                    <FormInput
                        type='text'
                        name='university'
                        value={university}
                        onChange={this.handleChange}
                        label='Universidad'
                        onInvalid={
                            evt=>{if(university==='')evt.target.setCustomValidity(inputValidMessages.requiredMessage)}
                                } 
                        matchMessage = {''}
                        requiredMessage = {inputValidMessages.requiredMessage}
                        required
                    />
                    <FormInput
                        type='text'
                        name='comment'
                        value={comment}
                        onChange={this.handleChange}
                        label='Comentario'  
                    />
                    <div className="group">
                        <input type="submit" className="button" value="Inscribirse"/>
                    </div>
                    <div className="foot-lnk">
                        <label htmlFor="tab-1">¿Ya eres miembro?</label>
                    </div>
                </div>
            </form>
        )
    }
}

const mapDispatchToProps = dispatch =>({
    setCurrentUser: user => dispatch(setCurrentUser(user)),
    addAlert      : _alert =>dispatch(addAlert(_alert))
});

export default withRouter(connect(null,mapDispatchToProps)(SignUp));