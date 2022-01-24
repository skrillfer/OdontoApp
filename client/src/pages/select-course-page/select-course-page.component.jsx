import React from 'react';

import Card from '../../components/card/card.component';


import { CONST_SPEAKERS_ENUM } from '../../assets/constants';
import './select-course-page.styles.css';

const SelectCoursePage = ()=>(
    <div className='select-course'>        
            <div className="row row justify-content-center" style={{ margin:'auto', minWidth:'340px'}}>
                <div className="col-auto">   
                    
                        <Card 
                            title ={`Dr. Syngkuc Kim`} 
                            imgURL={require(`../../assets/speakers/kim_picture.jpeg`)}
                            speaker  ={CONST_SPEAKERS_ENUM.kim} 
                            //paragraph = {PARAGRAPH_STRINGS.kim.card}
                        >
                            <li className="published-date lounge">SALA LOUNGE: Q1,800</li>
                            <li className="published-date">SALA VIP: Q1,600</li>        
                            <li className="published-date">PROFESIONALES: Q1,450</li>
                            <li className="published-date">ESTUDIANTES: Q750</li>
                        </Card>
                    
                </div>
                <div className="col-auto">   
                        <Card 
                            title={`Dr. Paulo Kano`} 
                            imgURL={require(`../../assets/speakers/kano_picture.jpeg`)}
                            speaker  ={CONST_SPEAKERS_ENUM.kano}
                            //paragraph = {PARAGRAPH_STRINGS.kano.card}
                        >
                            <li className="published-date lounge">SALA LOUNGE: Q1,800</li>
                            <li className="published-date">SALA VIP: Q1,600</li>        
                            <li className="published-date">PROFESIONALES: Q1,450</li>
                            <li className="published-date">ESTUDIANTES: Q750</li>
                        </Card>
                </div>
                <div className="col-auto">   
                    
                        <Card 
                            title={`Ambos Cursos`} 
                            imgURL={require(`../../assets/speakers/ambos_picture.jpeg`)}
                            paragraph = {'Recibe un DESCUENTO en el segundo curso del Dr. Paulo Kano al inscribirte en ambos cursos, mientras duren existencias.'}
                            speaker  ={CONST_SPEAKERS_ENUM.both}
                        >
                            <li className="published-date">SALA LOUNGE: <span className='published-date tached'>Q3600</span> Q3200</li>
                            <li className="published-date">SALA VIP: <span className='published-date tached'>Q3200</span> Q2800</li>        
                            <li className="published-date">PROFESIONALES: <span className='published-date tached'>Q2900</span> Q2500</li>
                            <li className="published-date">ESTUDIANTES: <strong style={{color:'#333'}}>No aplica descuento</strong></li>
                        </Card>
                    
                </div>
            </div>
    </div>
);

export default SelectCoursePage