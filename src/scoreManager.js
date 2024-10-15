import axios from 'axios';

export const storePoints = async (wallet, points) => {
    try {
        // Make a POST request to the server
        const response = await axios.post('http://localhost:5001/api/savePoints', {
            wallet,
            points,
        });
        console.log(response.data.message); // Log the server response
    } catch (error) {
        console.error('Error saving points:', error);
    }
};
