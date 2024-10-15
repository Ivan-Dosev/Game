// src/Components/FooterButtons.js
import React, { useState } from 'react';
import InfoModal from './InfoModal'; // Import the InfoModal

const FooterButtons = () => {
    const [showModal, setShowModal] = useState(false); // State to control modal visibility

    const openTwitter = () => {
        window.open('https://twitter.com/yourprofile', '_blank'); // Replace with your Twitter profile link
    };

    const showInfo = () => {
        setShowModal(true); // Show the info modal
    };

    const handleCloseModal = () => {
        setShowModal(false); // Hide the modal
    };

    const rules = [
        '1. Connect your wallet first',
        '2. Get ready to test your memory and speed',
        '3. Click any block to reveal a hidden emoji',
        '4. Match all emojis by choosing two blocks at a time',
        '5. Timer starts with the click of your first block',
        '6. Beat the time to get special drops',
        '7. Follow our Twitter to get more bonuses and drops'

    ]; // Customize the rules as necessary

    return (
        <div className="footer-buttons">
            <button className="twitter-button" onClick={openTwitter}>
                Twitter
            </button>
            <button className="info-button" onClick={showInfo}>
                Info
            </button>
            {showModal && <InfoModal rules={rules} onClose={handleCloseModal} />} {/* Show InfoModal if showModal is true */}
        </div>
    );
};

export default FooterButtons;