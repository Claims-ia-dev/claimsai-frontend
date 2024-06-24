// api.js
const API_URL = 'https://dashboard.xclaims.ai:3003/api';

export const login = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};

export const register = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};

export const getCategoryClaims = async () => {
  const response = await fetch(`${API_URL}/categoryclaims/categoryclaims`);
  return response.json();
};

export const addCard = async (email, tokenCard) => {
  const response = await fetch(`${API_URL}/users/addcard`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, tokenCard }),
  });
  return response.json();
};

export const getMySubscription = async () => {
  const response = await fetch(`${API_URL}/users/mysubscription`);
  return response.json();
};

export const createEstimate = async (data) => {
  const response = await fetch(`${API_URL}/estimates/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
};

// Example usage for testing:
const testData = {
  email: 'dinorakarla@gmail.com',
  customer_name: 'test customer',
  address: 'eracruz',
  city: 'rto',
  state: 'bc',
  insurance: 'gnp',
  claim_number: '505050',
  phone_number: '7078795990443093',
};

createEstimate(testData).then((response) => console.log(response));