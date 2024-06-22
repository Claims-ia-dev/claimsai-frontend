// api.js
import axios from 'axios';

const API_URL = 'https://dashboard.xclaims.ai:3003/api';

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  return response.data;
};

export const register = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/signup`, { email, password });
  return response.data;
};

export const getCategoryClaims = async () => {
  const response = await axios.get(`${API_URL}/categoryclaims/categoryclaims`);
  return response.data;
};

export const addCard = async (email, tokenCard) => {
  const response = await axios.post(`${API_URL}/users/addcard`, { email, tokenCard });
  return response.data;
};

export const getMySubscription = async () => {
  const response = await axios.get(`${API_URL}/users/mysubscription`);
  return response.data;
};

export const createEstimate = async (data) => {
  const response = await axios.post(`${API_URL}/estimates/create`, data);
  return response.data;
};

// Example usage for testing:
const testData = {
  email: 'dinorakarla@gmail.com',
  customer_name: 'test customer',
  address: 'veracruz',
  city: 'rto',
  state: 'bc',
  insurance: 'gnp',
  claim_number: '505050',
  phone_number: '7078795990443093',
};

createEstimate(testData).then((response) => console.log(response.data));