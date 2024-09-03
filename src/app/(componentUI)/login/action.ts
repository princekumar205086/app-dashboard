import axios from 'axios';
import { toast } from 'react-toastify';

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post('/api/signin', { email, password });

    if (response.data.token) {
      // Store the token in localStorage or any other storage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role); // Store the role

      // Display success toast
      toast.success('Login successful!');
    } else {
      // Display error toast if token is not present in response
      toast.error('Login failed. Please try again.');
    }
  } catch (error: any) {
    // Display error toast with error message
    toast.error(error.response?.data?.error || 'An error occurred. Please try again.');
  }
};