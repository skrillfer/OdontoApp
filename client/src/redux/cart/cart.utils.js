export const removeSeatFromCart = (items,seatToRemove)=>{
    const {fila,columna,seccion,curso} = seatToRemove;
    return items.filter(seat=> seat.key !== Object.values({fila,columna,seccion,curso}).join(""))
};

export const addSeatToCart = (items,seatToAdd)=>{
    const {fila,columna,seccion,curso} = seatToAdd;
    localStorage.setItem('cartItems',JSON.stringify([...items,{...seatToAdd,key:Object.values({fila,columna,seccion,curso}).join("")}]));
    return [...items,{...seatToAdd,key:Object.values({fila,columna,seccion,curso}).join("")}]
}

export const getAmountSeatsOfCourse = (items, courseName) =>{
    return items.reduce((acc,cur) => cur.curso===courseName ? ++acc : acc, 0);
}

export const getSeat = (items, seatToFind) =>{
    const {fila,columna,seccion,curso} = seatToFind;
    return items.find(seat=> seat.key === Object.values({fila,columna,seccion,curso}).join(""));
}
export const getSeatsOfCourse = (items, courseName) =>{
    return items.filter((seat) => seat.curso===courseName);
}

export const updatePriceSeat = (items, seatToUpdate) =>{
    if(!seatToUpdate) return items;
    const {fila,columna,seccion,curso} = seatToUpdate;
    var seatFound= getSeat(items,seatToUpdate);
    var newItems = items.filter(seat=> seat.key !== Object.values({fila,columna,seccion,curso}).join(""));
    if(seatFound){
        return [...newItems,{...seatFound,price:seatToUpdate.price}];
    }
    return items;
}

export const getSeccionName = (section) =>{
    return section.includes('PF')?'Profesional':
    section.includes('E')?'Estudiante':
    section.includes('SL')?'Lounge':
    section.includes('VIP')?'VIP': section
}  