import React from 'react';
import Confetti from 'react-confetti';
import SavePointsButton from './SavePointsButton'; // Import your SavePointsButton component
import { useWindowSize } from 'react-use'; // To get the full viewport dimensions

const ModalWithConfetti = ({ wallet, points, isGameFinished, onClose}) => {
    const { width, height } = useWindowSize(); // Get the full viewport size dynamically

    if (!isGameFinished) return null; // Return nothing if the game is not finished

    const handleCloseModal = () => {
        onClose(); // Trigger the onClose callback when the modal is closed
    };

    return (
        <div className="modal-overlay" onClick={handleCloseModal}>
            <Confetti width={width} height={height} numberOfPieces={300} /> {/* Confetti over entire screen */}
            <div className="modal-box" onClick={(e) => e.stopPropagation()}> {/* Ensures modal content does not close on click */}
                <h2>🎉 Congratulations! 🎉</h2>
                <p>You won 1M 💧 drops for finishing in under 15 seconds!</p>

                {/* Save Points Button */}
                <SavePointsButton 
                    wallet={wallet} 
                    points={points} 
                    isGameFinished={isGameFinished} 
                    onSave={handleCloseModal}
                />

                <button className="close-button" onClick={handleCloseModal}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default ModalWithConfetti;