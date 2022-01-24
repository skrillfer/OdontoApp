export const CONST_SEAT_STATES={
    free:'free',
    blocked:'blocked',
    sold:'sold',
    selected:'selected'
}

export const CONST_SPEAKERS_ENUM={
    kim:'KIM',
    kano:'KANO',
    both:'BOTH'
}

export const CONST_SPEAKERS_ORDER={
    KIM:1,
    KANO:2
}

export const CONST_PRICES={
    KIM:{
        'only':{
                LOUNGE:{
                    PRICE: 1800
                },
                VIP: {
                    PRICE:1600
                },
                PROFESIONAL: {
                    PRICE:1450
                },
                ESTUDIANTE: {
                    PRICE:750
                }
        },
        'BOTH':{
            LOUNGE:{
                PRICE: 1400
            },
            VIP: {
                PRICE:1200
            },
            PROFESIONAL: {
                PRICE:1050
            },
            ESTUDIANTE: {
                PRICE:750
            }
        }
    },
    KANO:{
        'only':{
            LOUNGE:{
                PRICE: 1800
            },
            VIP: {
                PRICE:1600
            },
            PROFESIONAL: {
                PRICE:1450
            },
            ESTUDIANTE: {
                PRICE:750
            }
        },
        'BOTH':{
            LOUNGE:{
                PRICE: 1400
            },
            VIP: {
                PRICE:1200
            },
            PROFESIONAL: {
                PRICE:1050
            },
            ESTUDIANTE: {
                PRICE:750
            }
        }
    }
}
export const inputValidMessages = {
    requiredMessage : 'Este campo es requerido',
    invalidEmailMessage : 'Ingrese un correo electronico valido'
};

export const urlBrochures = {
    kano:
    [
        'f786db4c-19f2-4233-b931-1298c13d4551.jpeg',
        '8155a4d5-94c2-47ce-bba0-8be8abcf1365.jpeg',
        '1cccf027-86e6-4451-89ac-838f6fa0ad3f.jpeg',
        '7a9fab8f-4cb0-4f37-a2ab-aa7ae6f9bab8.jpeg',
        '61fa8329-51b8-43bb-9e75-8aa8ca0bffc8.jpeg',
        'd1b9ef80-e511-4077-8446-fcb420f34895.jpeg',
        'de547f00-51cf-4336-b705-e0e3edaa49a5.jpeg',
        'f29347c9-a577-41f0-82bf-e10e64e44e36.jpeg'
    ],
    kim:[
        'b6d80d64-c716-4a7d-ae2b-e66a9f275b5a.jpeg',
        '2312df95-0e69-489f-9401-62d95d63f37d.jpeg',
        '74f3e6d1-48ca-4f50-8aab-22e1098f5823.jpeg',
        '71c77464-07ce-4a15-9e13-fcc10559b828.jpeg',
        'e2c6000f-fdac-46a6-a893-1fa6b5a0cb8b.jpeg',
        '265d2dea-8a17-411a-b70f-cae9dcbca3a9.jpeg'        
    ]
}

export const descriptionSpeakers = {
    conejo:'Este es el mejor momento para incorporarse al mundo digital de la odontología, porque los software son más fáciles de usar que en años anteriores y porque en este momento existe una gran cantidad de materiales cerámicos para restaurar una gran variedad de escenarios clínicos.',
    kano:'Cuando el paciente se le da a elegir un trabajo producido bajo la tecnología digital y uno producido bajo trabajo manual; siempre prefiere lo producido por la tecnología Digital.',
    kim : 'La cirugía endodóntica; aunque es generalmente reconocida como una importante modalidad de tratamiento dentro de la especialidad de endodoncia, no es suficientemente enseñada en los programas de postrado endodónticos ni cubierto adecuadamente en los libros de texto.'
};

export const STRINGS_ALERTS = {
    COURSE_CLOSED:{
        title:'¡Inscripción cerrada!',
        description: 'Si desea inscribirse a este curso hágalo por medio de pago manual o contacte con el organizador del evento, su diploma será enviado digitalmente.'
    },
    DISCONNECT_SOCKET:{
        title:'Lo sentimos',
        description:'¡Oops, no eres tú, somos nosotros! por motivos de seguridad se recargará la pagina.'
    },
    DISCONNECT_SOCKET_NOT_USER_LOGGED:{
        title:'¡Actualizando!',
        description:'Para cargar la información mas reciente, se recargará la pagina.'
    },
}
export const FLAGS_COURSES = {
    COURSE_CLOSED:{
        KIM: false,
        KANO : false
    }
}