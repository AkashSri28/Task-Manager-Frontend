import React from 'react'

function useRegister() {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    // Register function
    const register = async (name, email, password) => {
        try {
        const response = await axios.post('/api/register', { name, email, password });
        //setUser(response.data.user);
        //setToken(response.data.token);
        setError(null);
        localStorage.setItem('user', response.data.user);
        localStorage.setItem('token', response.data.token);
        } catch (error) {
        setError(error.response.data.message);
        }
    };    

  return (
    <div>useRegister</div>
  )
}

export default useRegister