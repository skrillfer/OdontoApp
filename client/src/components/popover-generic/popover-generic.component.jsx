import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectConexionSocket } from '../../redux/user/user.selectors';
import { setStateSeat } from '../../redux/stage/stage.actions';

import FormInput from '../form-input/form-input.component';

import { CONST_SEAT_STATES } from '../../assets/constants';

import './popover-generic.styles.css';

let initialState = {
    isPopoverOpen:false,
    inputSeat:''
};

class PopoverGeneric extends React.Component{
    constructor(props){
        super(props);
        this.state = { ...initialState };
    }

    handleChange = event => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    };

    handleAceptarButton = () =>{
        const { 
                state:{ inputSeat }, 
                props:{ rowname, column, section, course, conexionSocket, setStateSeat } 
              } = this;
        if(inputSeat.trim() === `${rowname}-${column}`){
            const seatModified = {
                columna : column,
                fila : rowname,
                seccion : section,
                curso: course,
                estado : CONST_SEAT_STATES.free
            };
            conexionSocket.emit(
                'seatModified',
                { ...seatModified, user:localStorage.getItem('user')?{...JSON.parse(localStorage.getItem('user'))}:null  },
                ({ status, message})=>{
                    if(status){
                        setStateSeat({
                            ...seatModified
                        });    
                    }else{
                        alert(message);
                    }
                }
            );    
        }else{
            alert(`El codigo ingresado no es: ${rowname}-${column}`);
        }
        this.setState({ ...initialState });
    }

    render(){
        const { state:{ isPopoverOpen, inputSeat }, 
                props:{ children,rowname,column,section,course,disablePopover } 
              } = this;
        
        return(
            <React.Fragment>
                <div id='overlay-popover' style={{display:!isPopoverOpen?'none':'inline-block'}}>
                    <div id="confirm" >
                        <div id='messagex' className="message">{`Liberar Asiento ${rowname}-${column}`}</div>
                        <p className="message">{`${section}-${course}`}</p>
                        <span className='text-plain'>{`Libera el asiento escribiendo el CODIGO:`}</span>
                        <br/>
                        <span className='text-plain'>{`${rowname}-${column}`}</span>
                        <FormInput
                            name='inputSeat'
                            type='text'
                            value={inputSeat}
                            handleChange={this.handleChange}
                            label=''
                            required
                        />
                        <button id='noxx' className="noxx" onClick={this.handleAceptarButton}>Aceptar</button>
                        <button id='yesx' className="yes" onClick={ ()=> this.setState({ isPopoverOpen: !isPopoverOpen })} >Cancelar</button>
                    </div>
                </div>
                <div onClick={
                    () => {
                            if(!disablePopover){
                                this.setState({ isPopoverOpen: !isPopoverOpen })
                            }
                        }}
                >
                    {children}  
                </div>
            </React.Fragment>
        )
    }
};

const mapStateToProps = createStructuredSelector({
    conexionSocket : selectConexionSocket
});

const mapDispatchToProps = dispatch => ({
    setStateSeat: seat => dispatch(setStateSeat(seat))
});

export default connect(mapStateToProps,mapDispatchToProps)(PopoverGeneric);