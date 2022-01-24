import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Section from '../section/section.component';
import LegendCroquis from '../legend-croquis/legend-croquis.component';
import LegendDetails  from '../legend-details/legend-details.component';
import LegendPrices from '../legend-prices/legend-prices.component';
import Clock from '../clock/clock.component';
import NextPrevius from '../bar-next-previus/bar-next-previus.component';

import { CONST_SPEAKERS_ENUM } from '../../assets/constants';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectMainStage, selectCurrentCourse, selectSpeaker,selectProcesingSeat } from '../../redux/stage/stage.selectors';

import { ReactComponent as StageX } from '../../assets/stage.svg';
import { ReactComponent as DentistX } from '../../assets/dentist.svg';
import { ReactComponent as ShootingX } from '../../assets/shooting_room.svg';

import './croquis.styles.css';

const Croquis = ({ mainStage, currentUser, currentCourse, speaker, procesingSeat }) =>{
    const {
            [currentCourse]:{SL1,SL2,VIP1,VIP2,PF1,PF2,PF3,PF4,E1,E2,E3,E4}
          } = mainStage;
    return (
        <>
        <div id='procesing_overlay' style={{display:!procesingSeat?'none':'inline-block'}}>
            <div className='procesing_content'>
                <div className="sk-circle">
                    <div className="sk-circle1 sk-child"></div>
                    <div className="sk-circle2 sk-child"></div>
                    <div className="sk-circle3 sk-child"></div>
                    <div className="sk-circle4 sk-child"></div>
                    <div className="sk-circle5 sk-child"></div>
                    <div className="sk-circle6 sk-child"></div>
                    <div className="sk-circle7 sk-child"></div>
                    <div className="sk-circle8 sk-child"></div>
                    <div className="sk-circle9 sk-child"></div>
                    <div className="sk-circle10 sk-child"></div>
                    <div className="sk-circle11 sk-child"></div>
                    <div className="sk-circle12 sk-child"></div>
                </div>
            </div>
        </div>    
        <div className="container-croquis">
        
            <div className="box-croquis">
                {speaker===CONST_SPEAKERS_ENUM.both?
                    <NextPrevius/>:null
                }
                <div className="grid-row-croquis vip">
                    
                    <h3><strong>Curso de { currentCourse }</strong> </h3>
                </div>
                {currentUser?!currentUser.admin?
                    (<div className="grid-row-croquis vip">
                        <Clock/>
                    </div>):null:null
                }
                <div className="grid-row-croquis legends">
                    <LegendDetails/>
                    <hr/>
                    <LegendCroquis/>
                    <hr/>
                    <LegendPrices/>
                </div>
                <div className="grid-row-croquis vip" >
                    <StageX className='img-stage-croquis'/>            
                </div>
                <div className="grid-row-croquis vip" >
                    <DentistX className='img-dentis-croquis'/>            
                </div>
                <div className="grid-row-croquis vip" >
                    {currentCourse===CONST_SPEAKERS_ENUM.kano?<ShootingX className='img-shooting-croquis'/>:null}
                </div>

                <div className={`grid-row-croquis lounge ${currentCourse}`}>
                    <Section key={'SL1'}  section = { {...SL1, course:currentCourse } }/>
                    <hr/>
                    <Section key={'SL2'} section = { {...SL2, course:currentCourse} }/>
                </div>
                <hr/>
                <div className={`grid-row-croquis vip ${currentCourse}`}>
                    <Section key={'VIP1'} section = { {...VIP1, course:currentCourse} }/>
                    <hr/>
                    <Section key={'VIP2'} section = { {...VIP2, course:currentCourse} }/>
                </div>
                <hr/>
                <div className={`grid-row-croquis profesionales ${currentCourse}`}>
                    <Section key={'P1'} section = { {...PF1, course:currentCourse} }/>
                    <hr/>
                    <Section key={'P2'} section = { { ...PF2,course:currentCourse } }/>
                    
                    {currentCourse===CONST_SPEAKERS_ENUM.kano?<React.Fragment><hr/><hr/>
                    <Section key={'P3'} section = { {...PF3, course:currentCourse} }/>
                    <hr/>
                    <Section key={'P4'} section = { {...PF4, course:currentCourse} }/>
                    </React.Fragment>:null}
                </div>
                {currentCourse===CONST_SPEAKERS_ENUM.kano?<React.Fragment><hr/>
                <div className="grid-row-croquis">
                    <Section key={'E1'} section = { {...E1, course:currentCourse} }/>
                    <hr/>
                    <Section key={'E2'} section = { {...E2, course:currentCourse} }/>

                    <hr/><hr/>
                    <Section key={'E3'} section = { {...E3,course:currentCourse} }/>
                    <hr/>
                    <Section key={'E4'} section = { {...E4, course:currentCourse} }/>
                </div></React.Fragment>:currentCourse===CONST_SPEAKERS_ENUM.kim?
                <React.Fragment><hr/>
                <div className={`grid-row-croquis estudiantes ${currentCourse}`}>
                    <Section key={'E1'} section = { {...E1, course:currentCourse} }/>
                    <hr/><hr/><hr/><hr/>
                    <Section key={'E2'} section = { {...E2, course:currentCourse} }/>
                    <hr/>
                </div></React.Fragment>:null
                }
            </div>
        </div>
        </>
    )
};


const mapStateToProps = createStructuredSelector({
    mainStage: selectMainStage,
    currentUser: selectCurrentUser,
    currentCourse: selectCurrentCourse,
    speaker : selectSpeaker,
    procesingSeat : selectProcesingSeat
});

export default connect(mapStateToProps)(Croquis);
