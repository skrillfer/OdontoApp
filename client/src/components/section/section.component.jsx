import React from 'react';

import './section.styles.css';

import Seat from '../seat/seat.component';

const Section = ({section}) =>{
    const { key, name, seats_by_rows, course, idN } = section;
    const colsNames = seats_by_rows.map( ({row_name}) => row_name);
    const rowsSeats = seats_by_rows.map( ({seats}) => seats);
    const sizes = rowsSeats.map(row=> row.length);
    const headers = Array.from({length: Math.max.apply(Math,sizes)}, (v, i) => i+1);
    const arrayGreaterSize = getHeaderGreaterSize(rowsSeats,headers.length);
    return (
        <div >
            <h3 className='h3-croquis'>{name}</h3>    
            <table id={`table${key}`}>             
                <thead>
                    <tr className='tr-croquis' >
                        <td className='td-croquis'></td>
                        {headers.map(head=>(
                                <td className='td-croquis col-number' key={`${name}'-'${head}`}>{getNumberSeat(arrayGreaterSize,(head-1))}</td>      
                        ))}      
                    </tr>
                </thead>
                <tbody>
                {colsNames.map((colname,index)=>(
                            <tr className='tr-croquis' key={`${colname}'tr'${index}`}>
                                <td className='td-croquis col-letter' key={`${colname}${index}`}>{colname}</td>
                                {(rowsSeats[index]).map(({id,state})=>
                                    <td className='td-croquis' key={`${colname}'-'${id}'-'${index}`}>
                                        <div className={'seat-croquis seat-'+state} >
                                            <Seat seatdata = {{id, idN ,colname,state,key,course}}/>                     
                                        </div>
                                    </td>
                                )}    
                            </tr>
                        ))                
                    }
                </tbody>
            </table>
        </div>
    )
};

const getHeaderGreaterSize = (rowsSeats,headersSize) =>{
    var result=rowsSeats.find(row=> row.length===headersSize);
    return result?result:[];
}
const getNumberSeat = (seats,position) =>{
    return position<=(seats.length-1)?seats[position].id:''
}

export default Section;

