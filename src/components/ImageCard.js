import React from 'react';

const ImageCard = ({ image, alt }) => {
  return (
    <div className="ImageCard">
      <div>
        <img src={image} alt={alt} />
      </div>
    </div>
  )
}

export default ImageCard;