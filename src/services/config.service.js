import axios from 'axios';

const serviceConfig = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005"
});

// Automatically set JWT token in the headers for every request
serviceConfig.interceptors.request.use((req) => {
  // Retrieve the JWT token from the local storage
  const storedToken = localStorage.getItem("authToken");

  if (storedToken) {
    req.headers = { Authorization: `Bearer ${storedToken}` };
  }

  return req;
});

export default serviceConfig;