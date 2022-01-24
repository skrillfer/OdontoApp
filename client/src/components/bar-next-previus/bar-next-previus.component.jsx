import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { setCourse } from '../../redux/stage/stage.actions';
import { selectCurrentCourse }  from '../../redux/stage/stage.selectors';

import { CONST_SPEAKERS_ORDER } from '../../assets/constants';

import './bar-next-previus.styles.css';

const NextPrevius = ({ currenCourse, setCourse }) => {
    
return(    
    <div className='bar-next-previus'>
        <div className='previus' 
            style={{display:getPreviusCourse(currenCourse)===currenCourse?'none':'inline-block'}}
            onClick={()=>
                setCourse(getPreviusCourse(currenCourse))}
        >
                <p>Anterior curso &#8617;</p>
        </div>
        <div className='separator-bar-next-previus'></div>
        <div className='next'
             style={{display:getNextCourse(currenCourse)===currenCourse?'none':'block'}}
             onClick={()=>
                setCourse(getNextCourse(currenCourse))}
        >
                <p>&#8618; Siguiente curso</p>
        </div>
    </div>
)}

const getNextCourse = (current_course) =>{
    var order=CONST_SPEAKERS_ORDER[current_course]||0;
    order++;
    var finded=Object.entries(CONST_SPEAKERS_ORDER).find(item=>item[1]===order);
    if(finded){
        return finded[0];
    }else{
        return current_course;
    }
}

const getPreviusCourse = (current_course) =>{
    var order=CONST_SPEAKERS_ORDER[current_course]||0;
    order--;
    var finded=Object.entries(CONST_SPEAKERS_ORDER).find(item=>item[1]===order);
    if(finded){
        return finded[0];
    }else{
        return current_course;
    }
}
const mapStateToProps = createStructuredSelector({
    currenCourse : selectCurrentCourse
});
const mapDispatchToProps = dispatch => ({
    setCourse: course => dispatch(setCourse(course))
});

export default connect(mapStateToProps,mapDispatchToProps)(NextPrevius);