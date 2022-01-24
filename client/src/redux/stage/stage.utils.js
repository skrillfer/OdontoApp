export const setStateToSeat = (mainStage,seatToSet) =>{
    var refCurso=mainStage[seatToSet.curso];
    if (!refCurso) return mainStage;
    var refSeccion = refCurso[seatToSet.seccion];
    if (!refSeccion) return mainStage;
    return{
        ...mainStage,
        [seatToSet.curso]:{
            ...refCurso,
            [seatToSet.seccion]:
            {
                ...refSeccion,
                seats_by_rows:refSeccion.seats_by_rows.map(row=>{
                    if(row.row_name!==seatToSet.fila){
                        return row;
                    }else{
                        return {
                            ...row,
                            seats: row.seats.map(seat=>
                                seat.id!==seatToSet.columna?seat:(
                                                                  seat.state==='selected' && seatToSet.estado==='blocked'?
                                                                    seat:{id:seatToSet.columna,state:seatToSet.estado})
                                                )
                        }
                    }
                })
            }
        }
    }
}
