import axios from 'axios';

// Request nonce from server
export const requestNonce = async (wallet) => {
    try {
        const response = await axios.post('http://server.thedrop.top/api/generateNonce', { wallet });
        const { nonce } = response.data;
        localStorage.setItem('gameNonce', nonce);  // Store the nonce locally
    } catch (error) {
        console.error('Error generating nonce:', error);
    }
};

export const storePoints = async (wallet) => {
    try {
        const nonce = localStorage.getItem('gameNonce');
        const response = await axios.post('http://server.thedrop.top/api/savePoints', {
            wallet,
            nonce
        });
        console.log('API response:', response.data.message);  // Log the response from backend
    } catch (error) {
        console.error('Error saving points:', error);  // Log any error in the API request
    }
};
