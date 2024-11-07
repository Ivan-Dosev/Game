import React, { useState } from 'react';

const Rankingbutton = () => {
    const [topWallets, setTopWallets] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleConnectWallet = async () => {
        try {
            const response = await fetch('https://server.thedrop.top/api/top10');
            //const response = await fetch('http://localhost:5001/api/top10');
            const data = await response.json();
            console.log('API response:', data); // Check if the data is an array or an object
            setTopWallets(Array.isArray(data) ? data : []); // Make sure data is an array
            setIsModalOpen(true);
        } catch (error) {
            console.error('Error fetching top 10 results:', error);
        }
    };
    /* const handleConnectWallet = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/top10');
            const data = await response.json();
            setTopWallets(data);
            setIsModalOpen(true); // Open the modal when data is fetched
        } catch (error) {
            console.error('Error fetching top 10 results:', error);
        }
    }; */
    const handleCloseModal = () => {
        setIsModalOpen(false); // Close the modal when clicked outside or on close
    };

    // Function to get medal based on ranking
    const getMedal = (rank) => {
        if (rank === 1) return '🥇'; // Gold medal for 1st place
        if (rank === 2) return '🥈'; // Silver medal for 2nd place
        if (rank === 3) return '🥉'; // Bronze medal for 3rd place
        return null;
    };

    // Function to truncate wallet address
    const truncateAddress = (address) => {
        return `${address.slice(0, 4)}...${address.slice(-4)}`;
    };

    return (
        <div>
            <button type="button" className="ranking-button" onClick={handleConnectWallet}>
                Ranking
            </button>

            {isModalOpen && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                        <h2>Top 10 Rankings</h2>
                        <button className="close-button" onClick={handleCloseModal}>Close</button>
                        <ul>
                            {topWallets.map(({wallet, points}, index) => (
                                <li key={wallet}>
                                    <div>
                                        {getMedal(index + 1)} {/* Display medal for top 3 */}
                                        {truncateAddress(wallet)} {/* Truncated wallet address */}
                                    </div>
                                    <div>{points} 💧 drops</div> {/* Display points below the address */}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Rankingbutton;