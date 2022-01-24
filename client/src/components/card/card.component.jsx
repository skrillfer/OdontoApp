import React from 'react';
import { Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { CONST_SPEAKERS_ENUM } from '../../assets/constants';
import { setSpeaker, setCourse } from '../../redux/stage/stage.actions';

import { ROUTES_APP } from "../../assets/routes.constants";


import './card.styles.css';

const ImgLazy = lazy(() => import('../../components/img-lazy/img-lazy.component'));

const Card = ({ imgURL, title, paragraph, speaker, setSpeaker, setCourse, history, children}) =>(
    <React.Fragment>
        <div className="blog-container"
            onClick={()=>{
                localStorage.setItem('speaker',JSON.stringify({'speaker':speaker}));
                setSpeaker(speaker)
                setCourse(
                    speaker===CONST_SPEAKERS_ENUM.both?
                    CONST_SPEAKERS_ENUM.kim
                    :speaker)
                history.push(ROUTES_APP.RESERVATION)
                }}
        >
  
        <div className="blog-header">
            <Suspense 
                fallback={
                    <div style={{width:'100%', marginTop:'20%', alignSelf:'center'}}>
                        <Loader
                            type="Grid"
                            color="#00BFFF"
                            height={50}
                            width={50}
                        />
                    </div>}
                >
                    <ImgLazy imgURL={imgURL} className={'blog-cover'}/>
            </Suspense>
        </div>

        <div className="blog-body">
            <div className="blog-title">
            <h1><span>{title}</span></h1>
            </div>
            <div className="blog-summary">
            <p>
                {paragraph}
            </p>
            </div>
            <div className="blog-tags">
            <ul>
                <li><div>
                        Inscribirse al curso
                    </div>
                </li>
            </ul>
            </div>
        </div>
  
    <div className="blog-footer">
        <ul>
            {children}
        </ul>
    </div>

    </div>

    </React.Fragment>
);

const mapDispatchToProps = dispatch =>({
    setSpeaker: speaker => dispatch(setSpeaker(speaker)),
    setCourse: course => dispatch(setCourse(course))
});

export default withRouter(connect(null,mapDispatchToProps)(Card));