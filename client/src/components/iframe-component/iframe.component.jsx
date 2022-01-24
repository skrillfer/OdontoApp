import React from 'react';

import './iframe.styles.css';
import Spinner from 'react-spinkit';
export default class IframeComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = { loading: true }
    }
    hideSpinner = (evt) => {
        this.setState({
          loading: false
        });
    }
    render() {
        const { props: { src, height, width }, state: { loading } } = this;
        return (
        <div className='container iframe-container'>   
                {loading?<div className='iframe-loader'><Spinner 
                            name='folding-cube' 
                            color="black"
                            fadeIn="none"
                        /></div>
                    :
                    null
                }
                <iframe   
                    
                    onChange={()=>{console.log('URL changed')}}
                    key='iframe-FAC-Unbiased'
                    id='iframe-FAC' 
                    title="FAC Payment"
                    src={src} 
                    height={height} 
                    width={width}  
                    className='iframe-payment'
                    onLoad={this.hideSpinner}
                    frameBorder="0"
                    sandbox={`allow-popups allow-forms allow-scripts allow-same-origin`}
                />
         </div>
        )
  }
}
