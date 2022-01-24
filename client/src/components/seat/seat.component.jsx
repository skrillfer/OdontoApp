import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import { CONST_SEAT_STATES, CONST_SPEAKERS_ENUM } from '../../assets/constants';
import { setStateSeat, setProcesingSeat, setOptionSigninSignup } from '../../redux/stage/stage.actions';
import { addSeatCart, removeSeatCart, updatePriceSeat } from '../../redux/cart/cart.actions';
import { selectConexionSocket, selectCurrentUser }from '../../redux/user/user.selectors';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { selectCurrentCourse,selectSpeaker } from '../../redux/stage/stage.selectors';
import { CONST_PRICES } from '../../assets/constants';
import { getAmountSeatsOfCourse, getSeatsOfCourse, getSeccionName } from '../../redux/cart/cart.utils';
import { addAlert } from '../../redux/alert/alert.actions';
import { STRINGS_ALERTS,FLAGS_COURSES } from '../../assets/constants';
import PopoverGeneric from '../popover-generic/popover-generic.component';

import './seat.styles.css';

const Seat = ({ seatdata, setStateSeat, conexionSocket, cartItems, addSeatCart, removeSeatCart, currentUser, currentCourse, speaker, history, addAlert, updatePriceSeat, setProcesingSeat, setOptionSigninSignup}) =>{
    const { id, colname, state , key , idN, course} = seatdata;
    const disablePopover = currentUser?(currentUser.admin?false:true):true;   
    var properties={
        key:`'span-'${key}${id}${colname}`,
            id:`${key}${id}${colname}`,
            onClick:
                state==='free' || state==='selected'?
                (evt)=>{
                    if(FLAGS_COURSES.COURSE_CLOSED[currentCourse] && currentUser && !currentUser.admin){
                        const { COURSE_CLOSED : { description, title } } = STRINGS_ALERTS;
                        addAlert({text:description,style:'style',title:title});
                        return;
                    }
                    if (!currentUser){  setOptionSigninSignup(true); history.push('/signinsignup'); return; }
                    
                    let amount_KANO = getAmountSeatsOfCourse(cartItems,CONST_SPEAKERS_ENUM.kano);
                    let amount_KIM  = getAmountSeatsOfCourse(cartItems,CONST_SPEAKERS_ENUM.kim);
                    let conditionSeatFree = state==='free';    
                    if(speaker===CONST_SPEAKERS_ENUM.both){
                        if(currentCourse===CONST_SPEAKERS_ENUM.kim){
                            if(amount_KIM===1 && conditionSeatFree){
                                addAlert({text:'No se pueden seleccionar mas asientos.',style:'style',title:'Restriccion'});
                                return;
                            }
                        }else{
                            if(amount_KANO===1 && conditionSeatFree){
                                addAlert({text:'No se pueden seleccionar mas asientos.',style:'style',title:'Restriccion'});
                                return;
                            }
                        }
                    }else{
                        if(!currentUser.admin){
                            if( ((speaker===CONST_SPEAKERS_ENUM.kim && amount_KIM===1) ||
                            (speaker===CONST_SPEAKERS_ENUM.kano && amount_KANO===1)) && conditionSeatFree){
                                addAlert({text:'No se pueden seleccionar mas asientos.',style:'style',title:'Restriccion'});
                                return;
                            }
                        }
                    }
                    const seatModified = {
                        columna : id,
                        fila : colname,
                        seccion : key,
                        curso: course,
                        estado : state==='selected'?CONST_SEAT_STATES.free:CONST_SEAT_STATES.selected
                    };
                    setProcesingSeat();
                    conexionSocket.emit(
                        'seatModified',
                        {   ...seatModified,
                            estado:state==='selected'?CONST_SEAT_STATES.free:CONST_SEAT_STATES.blocked,
                            user:localStorage.getItem('user')?{...JSON.parse(localStorage.getItem('user'))}:null 
                        },
                        ({ status, message})=>{
                            if(status){
                                setStateSeat({
                                    ...seatModified
                                });
                                if(state==='selected'){
                                    if(speaker===CONST_SPEAKERS_ENUM.both){
                                        var seatsByCourse=getSeatsOfCourse(cartItems,currentCourse===CONST_SPEAKERS_ENUM.kim?CONST_SPEAKERS_ENUM.kano:CONST_SPEAKERS_ENUM.kim);
                                        var firstSeat = seatsByCourse.length? {...(seatsByCourse.find(() => true))}:null;
                                        if(firstSeat){
                                            var sectionName = getSeccionName(firstSeat.seccion);
                                            var newPriceSeat = CONST_PRICES[firstSeat.curso]['only'][sectionName.toUpperCase()].PRICE;
                                            updatePriceSeat({...firstSeat,price:newPriceSeat});
                                        }
                                    }
                                    removeSeatCart({...seatModified});
                                }else{
                                    var priceSeat = CONST_PRICES[currentCourse]['only'][idN].PRICE;
                                    if(speaker===CONST_SPEAKERS_ENUM.both){
                                        switch(currentCourse){
                                            case CONST_SPEAKERS_ENUM.kano:
                                                if(amount_KIM>amount_KANO){
                                                    priceSeat = CONST_PRICES[currentCourse][CONST_SPEAKERS_ENUM.both][idN].PRICE;
                                                }
                                                break;
                                            case CONST_SPEAKERS_ENUM.kim:    
                                                if(amount_KANO>amount_KIM){
                                                    priceSeat = CONST_PRICES[currentCourse][CONST_SPEAKERS_ENUM.both][idN].PRICE;
                                                }
                                                break;
                                            default:
                                                break;
                                        }
                                    }
                                    addSeatCart({
                                        ...seatModified,
                                        price: priceSeat
                                    });
                                    
                                }
                            }else{
                                addAlert({text:message,style:'style',title:'Informacion de Asiento'});
                            }
                            setProcesingSeat();
                        }
                    );
                }:()=>{
                    if(FLAGS_COURSES.COURSE_CLOSED[currentCourse] && currentUser && !currentUser.admin){
                        const { COURSE_CLOSED : { description, title } } = STRINGS_ALERTS;
                        addAlert({text:description,style:'style',title:title});
                        return;
                    }
                    if (!currentUser){setOptionSigninSignup(true); history.push('/signinsignup'); return;}
                }
    }
    return (
        state==='free'?
        <span {...properties} >
            <i id={`i${key}${id}${colname}`} className="seat-element">A</i>
        </span>
        :state==='selected'?
        <span {...properties} >
        <i id={`i${key}${id}${colname}`} className="seat-element">A</i>
        </span>
        :state==='blocked'?
        <span {...properties} >
        <i id={`i${key}${id}${colname}`} className="seat-element">A</i>
        </span>:
        <span {...properties} >
            <PopoverGeneric 
                key={`Popover${key}${id}${colname}`} 
                rowname = {colname} 
                column  = {id} 
                section = {key}
                course  = {course}
                disablePopover={disablePopover} >
                <i 
                    key= {`i${key}${id}${colname}`} 
                    id={`i${key}${id}${colname}`} 
                    className={"seat-element"}
                >A
                </i>
            </PopoverGeneric>
        </span>
)};

const mapStateToProps = createStructuredSelector({
    conexionSocket: selectConexionSocket,
    cartItems : selectCartItems,
    currentUser : selectCurrentUser,
    currentCourse: selectCurrentCourse,
    speaker : selectSpeaker
});

const mapDispatchToProps = dispatch => ({
    setStateSeat: seat => dispatch(setStateSeat(seat)),
    addSeatCart:  seat => dispatch(addSeatCart(seat)),
    removeSeatCart:  seat => dispatch(removeSeatCart(seat)),
    addAlert      : _alert => dispatch(addAlert(_alert)),
    updatePriceSeat : seat => dispatch(updatePriceSeat(seat)),
    setProcesingSeat: ()=>dispatch(setProcesingSeat()),
    setOptionSigninSignup : option  => dispatch(setOptionSigninSignup(option))
});

/* <span className="tooltiptext">Tooltip text</span> */
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Seat));