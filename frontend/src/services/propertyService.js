import axios from 'axios';

const API_URL = '/api/properties';

export const getProperties = async (searchParams) => {
  try {
    const response = await axios.get(`${API_URL}/search`, { params: searchParams });
    return response.data;
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw error;
  }
};

export const searchProperties = async (searchTerm) => {
  try {
    const response = await axios.get(`${API_URL}/search?q=${encodeURIComponent(searchTerm)}`);
    return response.data;
  } catch (error) {
    console.error('Error searching properties:', error);
    throw error;
  }
};

export const addProperty = async (propertyData, token) => {
  try {
    const response = await axios.post(API_URL, propertyData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Update the existing deleteProperty function instead of declaring a new one
export const deleteProperty = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Add other CRUD operations as needed

export const updateProperty = async (id, propertyData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, propertyData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};