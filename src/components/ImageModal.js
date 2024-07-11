import React, { useState } from 'react';
import './ImageModal.css';

const ImageModal = ({ image, alt, onClose }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  return isOpen ? (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" onClick={handleClose}>
          &times;
        </span>
        <img src={image} alt={alt} className="modal-image" />
      </div>
    </div>
  ) : null;
};

export default ImageModal;
