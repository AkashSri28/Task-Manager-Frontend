import React, { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from './useAuthContext';

function useLogin() {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    // Login function
    const login = async (email, password) => {
        try {
            setIsLoading(true);
            const response = await axios.post('http://localhost:5000/api/user/login', { email, password });

            setError(null);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('token', response.data.token);

            // Update the auth context
            dispatch({ type: 'LOGIN', payload: response.data.user });

            setIsLoading(false);
        } catch (error) {
            setError(error.response.data.message);
            setIsLoading(false);
        }
    };

    return {
        login,
        isLoading,
        error
    };
}

export default useLogin;
