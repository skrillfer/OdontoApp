import React from 'react';


import './legend-croquis.styles.css';

const LegendCroquis = () =>(
    <div className="row-legends-croquis" >
        <div className='circle-croquis free'>
            Libre
        </div>
        <div className='circle-croquis sold'>
            Vendido
        </div>
        <div className='circle-croquis blocked'>
            Bloqueado
        </div>
    </div>
);

export default LegendCroquis;