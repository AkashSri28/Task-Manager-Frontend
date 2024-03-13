import React, { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from './useAuthContext';

function useLogout() {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    // Logout function
    const logout = async () => {
        try {
            setIsLoading(true);
            // Perform logout operation, e.g., sending a request to invalidate the token
            // For example, you can send a POST request to your logout endpoint
            //await axios.post('http://localhost:5000/api/user/logout');
            
            // Clear local storage
            localStorage.removeItem('user');
            localStorage.removeItem('token');

            // Update the auth context
            dispatch({ type: 'LOGOUT' });

            setIsLoading(false);
        } catch (error) {
            setError(error.response.data.message);
            setIsLoading(false);
        }
    };

    return {
        logout,
        isLoading,
        error
    };
}

export default useLogout;
