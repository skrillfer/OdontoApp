import React from 'react';
import { useDispatch} from "react-redux";

import {removeAlert} from '../../redux/alert/alert.actions';

import './alert-custom.styles.css';
const AlertCustom = ({title,text,id}) =>{
    const dispatch = useDispatch();
    return(
        <div id='overlay-alert' style={{display:'inline-block'}} onDrag={()=>alert('draged')}>
            <div className='container-alert-custom bounceInDown'>
                <span className="close-alert-custom" onClick={()=>dispatch(removeAlert({id}))}>×</span>
                <span className='span-alert-custom'><strong>{title}</strong></span>
                <div className='hr-alert-custom'></div>
                <div className='content-alert-custom'>
                    {text}
                </div>
            </div>
        </div>    
    );
}
export default AlertCustom;