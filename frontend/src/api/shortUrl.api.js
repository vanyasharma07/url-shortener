import axios from 'axios'

export const createShortUrl = async (url) => {
    try {
        const { data } = await axios.post(
            'http://localhost:3000/api/create',
            { url }
        );

        return data; // backend sends full URL string
    } catch (error) {
        console.error('Error creating short URL:', error);
        throw error;
    }
}