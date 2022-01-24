import React,{useState} from 'react';
import FormInput from '../../components/form-input/form-input.component';

import { inputValidMessages } from '../../assets/constants';

import '../../pages/sign-in-sign-up-page/sign-in-sign-up-page.styles.css';
import '../../pages/one-single-payment-page/one-single-payment-page.styles.css';
import './edit-seat.styles.css';

let initialState = {
    columna: 0,
    curso: '',
    estado: '',
    precio: 0,
    seccion: '',
    fila: '',

    name: '',
    no_document: '',
    register_number: '',
    university: ''
};

const EditSeatForm = ({seatData,setPayloadAction}) =>{
    const [inputs,setInputs] = useState({ ...initialState,
                                        email: seatData.email,
                                        precio: seatData.precio, estado: seatData.estado,
                                        name:seatData.name, no_document: seatData.no_document,
                                        register_number: seatData.register_number, 
                                        university: seatData.university,
                                        fila:seatData.fila,
                                        seccion:seatData.seccion_prev,
                                        columna: seatData.columna,
                                        curso: seatData.curso
                                        });
    
    const {    name,no_document,register_number,university,
               fila,seccion,columna,curso} = inputs;
    
    const handleChange = event => {
        const { value, name } = event.target;
        setInputs({ ...inputs, [name]: value });
    };

    const handleSubmit = event => {
        event.preventDefault();
        try {
            consumeApi();
        } catch (error) {}
    };
    
    const consumeApi = () =>{
    
        fetch(process.env.REACT_APP_BASE_URL + "/updateSeatData", {
            method: "post",
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                columna: inputs.columna,
                curso: inputs.curso,
                estado: inputs.estado,
                fila: inputs.fila,
                name: inputs.name,
                no_document: inputs.no_document,
                precio : inputs.precio,
                register_number: inputs.register_number,
                seccion: inputs.seccion,
                university: inputs.university          
            })
        })
        .then( response => {
            try {
                return response.json(); 
            } catch (error) {
                response = { message:'Error al parsear Json', state: false};
                return response;
            }
        })
        .then( response =>{
            const { message } = response;
            alert(message);
            setPayloadAction({payloadDelete:null,payloadEdit:null});
            window.location.reload();
        })
        .catch(err=>{
            console.log('err-');
            console.log(err);
            setPayloadAction({payloadDelete:null,payloadEdit:null});
        });
    }
    
    return(
        <div id="overlay-edit-seat">
            <div className='one-single-payment-page-edit-seat'>
                <div className="container-one-single-payment">  
                    <span className="close-alert-custom-edit-seat" onClick={()=>setPayloadAction({payloadDelete:null,payloadEdit:null})}>X</span>
                    <form id='contact' onSubmit={handleSubmit} className='for-one-single-payment'>
                        <center><h1>Editar Asiento</h1> </center>
                        <hr/>
                        <center><strong>{`${fila}-${columna}`}</strong> </center>
                        <center><strong>{`${seccion}-${curso}`}</strong> </center>
                        <hr/>
                        <FormInput
                            name={`name`}
                            type='text'
                            handleChange={handleChange}
                            value={ name || '' }
                            label='Nombre'
                            onInvalid={
                                evt=>{if(name || "" === '')evt.target.setCustomValidity(inputValidMessages.requiredMessage)}
                                    } 
                            matchMessage = {''}
                            requiredMessage = {inputValidMessages.requiredMessage}
                            required
                            title={`name`}
                        />

                        <FormInput
                            name={`register_number`}
                            type='number'
                            handleChange={handleChange}
                            value={ register_number || ""}
                            label='Colegiado/Carnet'
                            onInvalid={
                                evt=>{if(register_number || "" ==='')evt.target.setCustomValidity(inputValidMessages.requiredMessage)}
                                    } 
                            matchMessage = {''}
                            requiredMessage = {inputValidMessages.requiredMessage}
                            required
                            title={`register_number`}
                        />
                        <FormInput
                            name={`university`}
                            type='text'
                            handleChange={handleChange}
                            value={ university || ""}
                            label='Universidad'
                            className=' detail'
                            onInvalid={
                                evt=>{if(university || "" === '')evt.target.setCustomValidity(inputValidMessages.requiredMessage)}
                                    } 
                            matchMessage = {''}
                            requiredMessage = {inputValidMessages.requiredMessage}
                            required
                            title={`university`}
                        /> 
                        <FormInput
                            name={`no_document`}
                            type='text'
                            handleChange={handleChange}
                            value={ no_document || ""}
                            label='No Boleta'
                            className=' detail'
                            onInvalid={
                                evt=>{if(no_document || "" === '')evt.target.setCustomValidity(inputValidMessages.requiredMessage)}
                                    } 
                            matchMessage = {''}
                            requiredMessage = {inputValidMessages.requiredMessage}
                            required
                            title={`no_document`}
                        />
                                    
                                    <hr/>
                                    <fieldset>           
                                        <button 
                                                type="submit" 
                                                id="contact-submit"
                                            >Editar</button>
                                    </fieldset>
                                        <button className="btn-cancel-edit-seat"
                                                onClick={()=>setPayloadAction({payloadDelete:null,payloadEdit:null})} 
                                            >Cancelar</button>
                                    
                            </form>
                    

                    </div>
                </div>
            </div>
        )
}
export default EditSeatForm;