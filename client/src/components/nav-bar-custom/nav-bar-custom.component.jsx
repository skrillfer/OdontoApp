import React,  { useState }  from 'react';
import './nav-bar-custom.styles.css';
const NavBarCustom = ({items, handleSelectYear , defaultYear}) =>{
    const [labelClass, setClass] = useState(defaultYear);
    return(
        
        <div className='nav-bar-custom'>
            <ul>
                {items.map(
                    (item,ii)=>
                    <li 
                        key={`nv-br-cstm-${ii}`}
                        className={labelClass===`${item.label}`?'nav-bar-li-active':''}
                        onClick={() => {setClass(`${item.label}`);handleSelectYear(item.label)}}>
                        <span >{item.label}
                        </span>
                    </li>
                )}
            </ul>
        </div>
    )
}
export default NavBarCustom;