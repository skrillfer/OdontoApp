import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors';

import './legend-details.styles.css';

const LegendDetails = ({ cartItems, cartTotal }) =>{
    return(
        <React.Fragment>
        {cartTotal?
            <div className='legend-details'>
                <span className='name'>Seleccionados:</span>
                <div className='price'>{cartItems.length}</div>
                <span className='name'>Total:</span>
                <div className='price'>Q{cartTotal}</div>
                
            </div>  
            :null
        }
        </React.Fragment>
    )
};

const mapStateToProps = createStructuredSelector({
    cartItems : selectCartItems,
    cartTotal     : selectCartTotal
});

export default connect(mapStateToProps)(LegendDetails);

