import React from "react";
import NavBarCustom  from '../components/nav-bar-custom/nav-bar-custom.component';

import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

//import AwesomeSlider from 'react-awesome-slider';
//import AwesomeSliderStyles from 'react-awesome-slider/src/styled/fold-out-animation';

import { urlBrochures }  from '../assets/constants';

import './gallery.css';


  const imagesbyYear = {
    'Dr.Kim': urlBrochures.kim.map(url=>{
        return {
            original: require(`../assets/brochures/kim/${url}`),
            thumbnail: require(`../assets/brochures/kim/${url}`)
        }
    }),
    'Dr.Kano':urlBrochures.kano.map(url=>{
        return {
            original: require(`../assets/brochures/kano/${url}`),
            thumbnail: require(`../assets/brochures/kano/${url}`)
        }
    })
  };
  
  
  
  
const years =[
    {
        label:'Dr.Kim',
    },
    {
        label:'Dr.Kano',
    }
  ];

  
class Gallery extends React.Component {
    state={
        currentYear:'Dr.Kim'
    }
    handleSelectYear = (year)=>{
        this.setState({ currentYear : year });
    }

    render() {
        const  { currentYear } = this.state;
        return (
            <div className="section container">
                <h2>Brochures</h2>
                    <div className='row justify-content-center'>
                        <div className='col-sm-2 col-nav-bar-custom'>
                                <NavBarCustom 
                                    items={years} 
                                    handleSelectYear={this.handleSelectYear}
                                    defaultYear = {currentYear}
                                />
                        </div>    
                        <div className='col-md-10 custom-slider'>
                         {/*   <AwesomeSlider animation="foldOutAnimation" cssModule={AwesomeSliderStyles}>
                                {imagesbyYear[currentYear]}
        </AwesomeSlider>*/}
                            <ImageGallery 
                                items={imagesbyYear[currentYear]}  
                                showBullets={true}
                                thumbnailPosition = {'right'}
                                slideOnThumbnailOver = {true}
                                lazyLoad = {true}
                                showPlayButton = {false}
                            />
                        </div>
                    </div>
            </div>            
        );
    }
}


export default Gallery;

/*<div className="section container mt-3">
                <h2>Galería</h2>
                <div className="container">
                    <AwesomeSlider cssModule={AwsSliderStyles}>
                        <div data-src="/img/header_bg.jpg" />
                        <div data-src="/img/header_bg2.jpg" />
                        <div data-src="/img/header_bg3.jpg" />
                    </AwesomeSlider>
                </div>
</div >*/