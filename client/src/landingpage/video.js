import React from "react";
const  Video = ({title,src,description}) =>(
        <div className="section text-align--center">  
            <div className="card" style={{marginLeft:'5%',marginRight:'5%'}} >
            <div className="embed-responsive embed-responsive-16by9">
            <iframe 
                title={title}//'Dr. Paulo Kano' 
                className="embed-responsive-item" 
                width="560" 
                height="315" 
                src={src}//"https://www.youtube.com/embed/kBsj8C7bGs8" 
                frameBorder="0" 
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen></iframe>
            </div>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text" style={{textAlign:'justify'}} >{description}</p>
            </div>
            </div>
        </div>
);
export default Video;


