import React from 'react';

import LegendCroquis from '../legend-croquis/legend-croquis.component';
import LegendDetails  from '../legend-details/legend-details.component';
import LegendPrices from '../legend-prices/legend-prices.component';

import './legends-container.styles.css';
const LegendsContainer = () => (
    <div className="flexbox-container">
        <div className="flexbox-item flexbox-item-1">
            <LegendDetails/>
        </div>
        <div className="flexbox-item flexbox-item-2">
            <LegendCroquis/>
        </div>
        <div className="flexbox-item flexbox-item-3">
            <LegendPrices/>
        </div>
    </div>

);

export default LegendsContainer;