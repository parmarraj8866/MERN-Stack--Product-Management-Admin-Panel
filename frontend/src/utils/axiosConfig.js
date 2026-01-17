import axios from 'axios';

// Create an axios instance with withCredentials enabled globally
const axiosInstance = axios.create({
    withCredentials: true, // This ensures cookies are sent with every request
});

export default axiosInstance;
