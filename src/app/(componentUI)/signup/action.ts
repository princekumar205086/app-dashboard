import axios from 'axios';

const API_URL = '/api/register';

export async function registerUser(username: string, email: string, password: string) {
  try {
    const response = await axios.post(API_URL, {
      username,
      email,
      password,
    });

    if (response.status === 200) {
      console.log('User created successfully:', response.data);
      return response.data;
    } else {
      console.error('Error creating user:', response.data);
      return { error: response.data.error };
    }
  } catch (error: any) {
    console.error('Error creating user:', error.message);
    return { error: error.message };
  }
}

export async function fetchUsers() {
  try {
    const response = await axios.get(API_URL);

    if (response.status === 200) {
      console.log('Users fetched successfully:', response.data);
      return response.data;
    } else {
      console.error('Error fetching users:', response.data);
      return { error: response.data.error };
    }
  } catch (error: any) {
    console.error('Error fetching users:', error.message);
    return { error: error.message };
  }
}