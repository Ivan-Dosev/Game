import React from 'react';
import { storePoints } from '../scoreManager'; 

const SavePointsButton = ({ wallet, isGameFinished, onSave }) => {

    const handleSavePoints = () => {
        console.log('Saving points for wallet:', wallet);  // Debugging wallet
        if (wallet) {
            console.log('Saving points for wallet:', wallet);  // Debugging wallet
            storePoints(wallet);  // Save points
            if (onSave) {
                onSave();
            }
        } else {
            console.error('No wallet found');  // Log an error if no wallet is found
        }
    };

    if ( isGameFinished) {
        return (
            <button className="save-button" onClick={handleSavePoints}>
                Save Points
            </button>
        );
    }
    return null;
};

export default SavePointsButton;