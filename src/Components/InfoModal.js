import React from 'react';
import { useWindowSize } from 'react-use'; // To get the full viewport dimensions

const InfoModal = ({ rules, onClose }) => {
    const { width, height } = useWindowSize(); // Get the full viewport size dynamically

    const handleCloseModal = () => {
        onClose(); // Trigger the onClose callback when the modal is closed
    };

    return (
        <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}> {/* Ensures modal content does not close on click */}
                <h2>Rules of the Game</h2>
                {rules.map((rule, index) => (
                    <p key={index}>{rule}</p> // Map through rules and render each one in a paragraph
                ))}
                <button className="close-button" onClick={handleCloseModal}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default InfoModal;