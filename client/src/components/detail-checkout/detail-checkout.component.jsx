import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import { selectCartItems, selectCartTotal }  from '../../redux/cart/cart.selectors';
import { selectCurrentUser, selectConexionSocket } from '../../redux/user/user.selectors';

import { clearItemsCart } from '../../redux/cart/cart.actions';

import FormInput from '../form-input/form-input.component';
import IframeComponent from '../iframe-component/iframe.component';

import Clock from '../clock/clock.component';
import  { inputValidMessages } from '../../assets/constants';
import './detail-checkout.styles.css';

// var enviroment = "marlin";
var enviroment = "ecm";

var initialState = {
    rowsInput : {},
    processing : false,
    showIframePayment : false,
    iframeUrl:'',
    orderNumberGenerated : ''
};

class DetailCheckout extends React.Component{
    state = { ...initialState };
    handleChange = event => {
        const { value, name, title } = event.target;
        const { state: { rowsInput }, props: { currentUser } } = this;
        
        var newrowsInput = {  ...rowsInput ,[name]: value};
        if(!currentUser.admin){
            Object.keys(rowsInput).forEach((key)=>{
                if(key.includes(title)){
                    newrowsInput = {...newrowsInput ,[key]: value}
                }
            });
        }
        this.setState({ rowsInput : newrowsInput });    
        
    };

    handleSubmit = event => {
        event.preventDefault();
        try {
          this.handleClickGoToPay();
        } catch (error) {
          console.log(error);
        }
    };

    handleClickGoToPay = () =>{
        const { props:{ currentUser, cartItems, clearItemsCart, conexionSocket, history, cartTotal }, 
                state: { rowsInput} } = this;
        var arrayDetail = [];
        if(currentUser.admin){
            this.setState({ processing : true });
            arrayDetail=cartItems.map(({fila,columna,seccion,curso,price,key})=>{
                return{
                    fila:fila,
                    columna:columna,
                    seccion: seccion,
                    curso: curso,
                    precio: price,
                    name: rowsInput[`name${key}`],
                    register_number: rowsInput[`register_number${key}`],
                    university: rowsInput[`university${key}`],
                    no_document:rowsInput[`no_document${key}`]
                };
            });
            fetch(process.env.REACT_APP_BASE_URL + "/save_order", {
                method: "post",
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'seats': arrayDetail ,
                    'user': JSON.parse(localStorage.getItem('user'))
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
            .then( response => { 
                const { status, message } = response;
                alert(message);
                if(status){
                    localStorage.removeItem('cartItems');
                    this.setState({ ...initialState });
                    conexionSocket.removeAllListeners('countdownStart');
                    conexionSocket.emit('close-timer',{ user:localStorage.getItem('user')?{...JSON.parse(localStorage.getItem('user'))}:null });
                    clearItemsCart();
                    history.push('/reservation');
                    console.log(response);
                }
            })
            .catch(error => {
                this.setState({ processing : false });
                console.error(error);
                alert('Error de Servidor:\n'+error);
            });
        }else{
            
            arrayDetail=cartItems.map(({fila,columna,seccion,curso,price,key})=>{
                return{
                    fila:fila,
                    columna:columna,
                    seccion: seccion,
                    curso: curso,
                    precio: price,
                    name: rowsInput[`name${key}`],
                    register_number: rowsInput[`register_number${key}`],
                    university: rowsInput[`university${key}`],
                    no_document: rowsInput[`no_document${key}`]
                };
            });
            var self = this;
            fetch(process.env.REACT_APP_BASE_URL + "/get-payment-form", {
                method: "post",
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cartTotal: cartTotal.toString(),
                    user: JSON.parse(localStorage.getItem('user')),
                    seats: arrayDetail 
                })
            })
            .then( response => {
                try {
                    return response.json(); 
                } catch (error) {
                    console.log('Formato invalido de respuesta');
                    response = { securityToken:''};
                    return response;
                }
            })
            .then( response =>{
                const { securityToken, order_id } = response;
                if(securityToken){
                    console.log(securityToken);
                    const iframe = `https://${enviroment}.firstatlanticcommerce.com/MerchantPages/PaymentUnbiased/PaySelective/${securityToken}`; 
                    self.setState({ orderNumberGenerated : order_id ,processing : true, showIframePayment : true, iframeUrl: iframe });
                }                
            })
            .catch(err=>{
                console.log(err);
            });
        }
        /* 
        NOTA: al primer asiento llenarle de forma automatica 
        los campos requeridos para el diploma */
    }
    componentWillMount(){
        const {  props :{ cartItems, currentUser }, state : { rowsInput } } = this;        
        if(!currentUser.admin){
            cartItems.forEach(({key})=>{
                rowsInput[`register_number${key}`] = `${currentUser.register_number}`; 
                rowsInput[`university${key}`] = `${currentUser.university}`; 
                rowsInput[`name${key}`]=`${currentUser.firstname} ${currentUser.lastname}`;
            });
        }
        
    }
    componentDidMount(){
        const { props : { clearItemsCart,history,conexionSocket, currentUser:{ id } } } = this;
        conexionSocket.removeAllListeners(`payment.result.${id}`);
        conexionSocket.on(`payment.result.${id}`,async (response)=>{
            console.log('socket: payment.result.id');
            console.log(response);
            const {reason, status} = response;
            await localStorage.removeItem('cartItems');
            console.log('items removed from localStorage');
            await clearItemsCart();
            console.log('clear Items Cart');
            //this.setState({ ...initialState });
            conexionSocket.removeAllListeners('countdownStart');
            conexionSocket.emit('close-timer',{ user:localStorage.getItem('user')?{...JSON.parse(localStorage.getItem('user'))}:null });
            console.log('history push');  
            history.push(`/paymentresult/${status}/${reason}`);
            //1:exitoso 2:denegado 3:error
        });
    }

    render(){
        const { props:{cartItems, cartTotal, currentUser}, state:{ orderNumberGenerated, rowsInput, processing, showIframePayment, iframeUrl } } = this;

        return (
            <div className='container'>
                <div className="row justify-content-center" style={{ marginTop:'130px', minWidth:'220px'}}>
                    
                    <div className="col">
                        {!showIframePayment?
                        <div>
                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>¡AVISO!</strong> Asegurese de que los datos estan correctos, estos serán tomados para la generación de los diplomas.
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div></div>:null
                        }
                        {currentUser?!currentUser.admin?
                            (<div className="row">
                                <div className="col">
                                    <Clock/>
                                </div>
                            </div>):null:null
                        }
                        {!showIframePayment?
                            <>
                            <h2>Detalle de Compra</h2>
                            <form onSubmit={this.handleSubmit}>
                                <table className="table table-hover">
                                    <thead >
                                        <tr className='thead-details-checkout'>
                                            <th cope="col">Fila</th>
                                            <th cope="col">Silla</th>
                                            <th cope="col">Seccion</th>
                                            <th cope="col">Precio</th>
                                            <th cope="col">Nombre Asistente</th>
                                            <th cope="col">Carnet/Colegiado Asistente</th>
                                            <th cope="col">Universidad Asistente</th>
                                            {currentUser.admin?<th cope="col">Numero de Boleta</th>:null}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            cartItems.map( ({fila,columna,seccion,price,key},index)=>(
                                                <tr key={key}>
                                                    <td key={`${fila}${key}`}>{fila}</td>
                                                    <td key={`${columna}${key}`}>{columna}</td>
                                                    <td key={`${seccion}${key}`}>{seccion}</td>
                                                    <td key={`${price}${key}`}>{price}</td>
                                                    <td key={`name${key}`}>
                                                        <FormInput
                                                            name={`name${key}`}
                                                            type='text'
                                                            handleChange={this.handleChange}
                                                            value={ rowsInput[`name${key}`] || '' }
                                                            label=''
                                                            onInvalid={
                                                                evt=>{if(rowsInput[`name${key}`]||""==='')evt.target.setCustomValidity(inputValidMessages.requiredMessage)}
                                                                    } 
                                                            matchMessage = {''}
                                                            requiredMessage = {inputValidMessages.requiredMessage}
                                                            required
                                                            disabled={(index>0 && !currentUser.admin)?true:false}
                                                            title={`name`}
                                                        />
                                                    </td>
                                                    <td key={`register_number${key}`}>
                                                        <FormInput
                                                            name={`register_number${key}`}
                                                            type='number'
                                                            handleChange={this.handleChange}
                                                            value={ rowsInput[`register_number${key}`]||""}
                                                            label=''
                                                            onInvalid={
                                                                evt=>{if(rowsInput[`register_number${key}`]||""==='')evt.target.setCustomValidity(inputValidMessages.requiredMessage)}
                                                                    } 
                                                            matchMessage = {''}
                                                            requiredMessage = {inputValidMessages.requiredMessage}
                                                            required
                                                            disabled={(index>0 && !currentUser.admin)?true:false}
                                                            title={`register_number`}
                                                        />
                                                    </td>
                                                    <td key={`university${key}`}>
                                                        <FormInput
                                                            name={`university${key}`}
                                                            type='text'
                                                            handleChange={this.handleChange}
                                                            value={ rowsInput[`university${key}`]||""}
                                                            label=''
                                                            className=' detail'
                                                            onInvalid={
                                                                evt=>{if(rowsInput[`university${key}`]||""==='')evt.target.setCustomValidity(inputValidMessages.requiredMessage)}
                                                                    } 
                                                            matchMessage = {''}
                                                            requiredMessage = {inputValidMessages.requiredMessage}
                                                            required
                                                            disabled={(index>0 && !currentUser.admin)?true:false}
                                                            title={`university`}
                                                        />
                                                    </td>
                                                    {currentUser.admin?
                                                        <td key={`no_document${key}`}>
                                                        <FormInput
                                                            name={`no_document${key}`}
                                                            type='text'
                                                            handleChange={this.handleChange}
                                                            value={ rowsInput[`no_document${key}`]||""}
                                                            label=''
                                                            className=' detail'
                                                            onInvalid={
                                                                evt=>{if(rowsInput[`no_document${key}`]||""==='')evt.target.setCustomValidity(inputValidMessages.requiredMessage)}
                                                                    } 
                                                            matchMessage = {''}
                                                            requiredMessage = {inputValidMessages.requiredMessage}
                                                            required
                                                            disabled={(index>0 && !currentUser.admin)?true:false}
                                                            title={`no_document`}
                                                        />
                                                        </td>:null
                                                    }
                                                </tr>
                                            ))
                                        }
                                        <tr>
                                            <td colSpan="4">
                                                  <h4 className=''>{`Total ${currentUser.admin?"":"a pagar"}: ${cartTotal}`}</h4>    
                                            </td>
                                            <td colSpan="3" bgcolor="white" height="5">&nbsp;</td> 
                                        </tr>
                                        <tr>
                                            <td colSpan="4" >
                                                <input 
                                                    disabled={ processing }
                                                    type="submit" 
                                                    className="button" 
                                                    style={{backgroundColor:'#f74819', color:'white'}}
                                                    value={currentUser.admin?"Guardar":"Realizar Pago"} 
                                                />
                                            </td>
                                            <td colSpan="3" bgcolor="white" height="5">&nbsp;</td> 
                                        </tr>
                                    </tbody>
                                </table>
                            </form>
                            </>
                            :null
                        }
                    </div>
                    
                </div>
                {showIframePayment?
                        <>
                        <div className="row justify-content-center">
                            <div className="col">
                                <div className="alert alert-primary alert-dismissible fade show" role="alert">
                                    ¡Atención! Es importante que guardes este código <strong>{orderNumberGenerated}</strong> en caso de que suceda algún error y tu dinero sea debitado, solo con este código podrás reclamar tu entrada.
                                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                            </div> 
                        </div> 
                        <div className="row justify-content-center">
                            
                            <div className='col centering'>
                                <IframeComponent src={iframeUrl} height="650px" width="100%"/>            
                            </div>    
                        </div>   
                        </>
                    :null
                }
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    cartItems : selectCartItems,
    cartTotal : selectCartTotal,
    currentUser: selectCurrentUser,
    conexionSocket : selectConexionSocket
});

const mapDispatchToProps = dispatch =>({
    clearItemsCart: () => dispatch(clearItemsCart())
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(DetailCheckout));