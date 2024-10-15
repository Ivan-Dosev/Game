import React from 'react';
import { storePoints } from '../scoreManager'; 

const SavePointsButton = ({ wallet, points, isGameFinished, onSave}) => {

    const handleSavePoints = () => {
        if (wallet) {
            storePoints(wallet, points); // Save points to the JSON file
            if (onSave) {
                onSave();
            }
        }
    };

    if (wallet && isGameFinished) {
    return (
        <button className="save-button" onClick={handleSavePoints} disabled={!wallet}>
            Save Points
        </button>
    );
   }
};

export default SavePointsButton;