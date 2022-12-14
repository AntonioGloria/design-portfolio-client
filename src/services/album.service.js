import axios from 'axios';

class AlbumService {
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

  // GET /albums
  getAll = async () => {
    return this.api.get('/albums');
  }

  // GET /:id
  getOne = async (id) => {
    return this.api.get(`/albums/${id}`);
  }
}

// Create one instance of the service
const albumService = new AlbumService();

export default albumService;