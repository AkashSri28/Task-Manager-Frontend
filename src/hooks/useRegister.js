import React, { useState } from 'react'
import { useAuthContext } from './useAuthContext';
import axios from 'axios';

function useRegister() {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    // Register function
    const register = async (name, email, password) => {
        try {
            //console.log(name, email, password);
            const response = await axios.post('http://localhost:5000/api/user/register', { name, email, password });
            
            setError(null);
            localStorage.setItem('user', response.data.user);
            localStorage.setItem('token', response.data.token);

            //update the auth context
            dispatch({type:'LOGIN', payload: response.data.user})

            setIsLoading(false);
        } catch (error) {
        setError(error.response.data.message);
        }
    };    

  return {
    register,
    isLoading, 
    error
  }
}

export default useRegister