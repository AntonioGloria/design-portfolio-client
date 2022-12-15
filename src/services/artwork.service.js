import axios from 'axios';

class ArtworkService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005"
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  // GET all artworks
  getAll = async () => {
    return this.api.get('/artworks');
  }

  // GET artwork by id
  getOne = async (id) => {
    return this.api.get(`/artworks/${id}`);
  }
}

// Create one instance of the service
const artworkService = new ArtworkService();

export default artworkService;