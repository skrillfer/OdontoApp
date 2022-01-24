import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectClockTime } from '../../redux/stage/stage.selectors';

import './clock.styles.css';
const Clock = ({time}) =>(
    <div className='clock-time'>
        <span className='label-message'><strong>Tiempo Restante: </strong></span>
        <span className='time'><strong>{`${separateTime(time)}`}</strong></span>
    </div>
);

const separateTime = (time)=>{
    if(time>60){
        time = time-60;
        let minutes = Math.floor(time / 60);
        let seconds = time - minutes * 60;
    
        let timeConverted =`${minutes<10?'0':''}${minutes}:${seconds<10?'0':''}${seconds}`;
        return `00:${timeConverted}`;
    }else{
        return `Tiempo de Salvación`;
    }
}
const mapStateToProps = createStructuredSelector({
    time: selectClockTime
});

export default connect(mapStateToProps)(Clock);