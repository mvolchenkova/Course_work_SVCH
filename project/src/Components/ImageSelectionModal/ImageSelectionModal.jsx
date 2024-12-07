import React from 'react';
import './ImageSelectionModal.css'; 

const ImageSelectionModal = ({ isOpen, onClose, images, onSelect }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Select an Image</h2>
                <div className="image-selection">
                    {images.map((image) => (
                        <div key={image} className="image-option" onClick={() => onSelect(image)}>
                            <img src={image} alt="Select" style={{ width: '100px', height: '100px', cursor: 'pointer', margin: '5px' }} />
                        </div>
                    ))}
                </div>
                <button type="button" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default ImageSelectionModal;