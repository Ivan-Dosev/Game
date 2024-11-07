import axios from 'axios';

// Request nonce from server
// export const requestNonce = async (wallet) => {
//     try {
//         //const response = await axios.post('https://server.thedrop.top/api/generateNonce', { wallet });
//         const response = await axios.post('http://localhost:5001/api/generateNonce', { wallet });
//         const { nonce } = response.data;
//         localStorage.setItem('gameNonce', nonce);  // Store the nonce locally
//     } catch (error) {
//         console.error('Error generating nonce:', error);
//     }
// };

export const requestNonce = async (wallet) => {
    try {
        if (!wallet) {
            console.error('Wallet address is missing');
            return;
        }
        console.log('Requesting nonce for wallet:', wallet);
        const response = await axios.post('http://localhost:5001/api/generateNonce', { wallet });
        const { nonce } = response.data;
        localStorage.setItem('gameNonce', nonce);
    } catch (error) {
        console.error('Error generating nonce:', error);
    }
};


export const storePoints = async (wallet) => {
    try {
        const nonce = localStorage.getItem('gameNonce');
       // const response = await axios.post('https://server.thedrop.top/api/savePoints', {
        const response = await axios.post('http://localhost:5001/api/savePoints', {
            wallet,
            nonce
        });
        console.log('API response:', response.data.message);  // Log the response from backend
    } catch (error) {
        console.error('Error saving points:', error);  // Log any error in the API request
    }
};
