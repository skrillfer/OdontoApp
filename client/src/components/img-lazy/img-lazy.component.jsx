import React from 'react';

const ImgLazy = ({ imgURL, className }) =>(
    <div className={className} style={{ backgroundImage: `url(${imgURL})`}}></div>
);

export default ImgLazy;