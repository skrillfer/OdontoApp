import React from 'react';
import {withRouter} from 'react-router-dom';
import { ReactComponent as Icon} from '../../assets/success.svg';

const TransactionResultPage = ({match}) => {    
    const { params: { status, reason } }  = match;
    let result = parseInt(status);
    return(
        <div className='container-fluid' style={{marginTop:'200px', textAlign:'center' }}>
            {result===1?
                <>
                <Icon width={50} height={50} ></Icon>    
                <h1>Bienvenido a Unbiased 2020</h1>
                <span>Hemos enviado a tu correo la informacion de tu compra.</span>            
                </>
                :
                <>
                <div  style={{color:'#721c24',marginTop:'10%'}} role="alert">
                    <h1>Error al realizar el pago</h1>
                </div>
                <span>Intenta de nuevo, de persistir el error contacta con el organizador del evento.</span>
                <br/>
                <span>{reason}</span>
                </>
            }
        </div>
    );
};
export default withRouter(TransactionResultPage);