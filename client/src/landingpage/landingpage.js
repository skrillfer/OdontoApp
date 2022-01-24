import React from "react";
import { Suspense, lazy } from 'react';
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


import Header from "./header";
import Video from "./video";
import Speakers from "./speakers"
import Coursesinfo from "./courses-info";
//import MissionVision from "./mission-vision";
import Separator from './separator';
import Contact from "./contact";

const Gallery = lazy(() => import('./gallery'));

class LandingPage extends React.Component {
    render() {
        return (
            <main role="main" className="landingpage">
                <Header></Header>
                <Video  title={`Dr. Paulo Kano`} 
                        src={`https://www.youtube.com/embed/kBsj8C7bGs8`}
                        description={`Este es la primera visita de Paulo Kano a Guatemala. Hemos convertido nuestra conferencia anual en un curso demostrativo. Con dos pacientes Paulo Kano en vivo demostratrá usted puede transferir la información facial de su paciente para que junto con un modelo digital (ya se al escanerar un modelo o escanerar directamente a su paciente en boca) usted pueda obtener todas las ventajas del mundo de la odontología digital: Encerado digital, diseños de sonrisa e impresión de Mock Ups en impresoras 3D. El mundo de la Odontología Digital ya está acá, solo debe saber como entrar a el.`}
                />
                <Video  title={`Syngkuc Kim`} 
                        src={`https://www.youtube.com/embed/qLKxEykBMWQ`}
                        description={`Este es la primera visita de Syngkuc Kim a Guatemala. Hemos convertido nuestra conferencia anual en un curso demostrativo. Con dos pacientes Paulo Kano en vivo demostratrá usted puede transferir la información facial de su paciente para que junto con un modelo digital (ya se al escanerar un modelo o escanerar directamente a su paciente en boca) usted pueda obtener todas las ventajas del mundo de la odontología digital: Encerado digital, diseños de sonrisa e impresión de Mock Ups en impresoras 3D. El mundo de la Odontología Digital ya está acá, solo debe saber como entrar a el.`}
                />
                <Separator/>
                <Coursesinfo></Coursesinfo>
                <Separator/>
                <Speakers></Speakers>
               <Suspense 
                    fallback={
                        <div style={{width:'100%', /*marginTop:'20%',*/ alignSelf:'center'}}>
                            <Loader
                                type="Grid"
                                color="#00BFFF"
                                height={150}
                                width={150}
                            />
                        </div>}
                    >
                <Gallery/>
                </Suspense>
                <Separator/>
                <Contact></Contact>
            </main>
        );
    }
}


export default LandingPage;