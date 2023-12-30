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

  // GET media categories
  getCategoryMedia = async (category, medium) => {
    return this.api.get('/artworks', {
        params: { category: category,
                  medium: medium
                }
      }
    );
  }

  // GET artwork by id
  getOne = async (id) => {
    return this.api.get(`/artworks/${id}`);
  }

  // POST create artwork
  create = (requestBody) => {
    return this.api.post(`/artworks/create`, requestBody);
  }

  editArtwork = (id, requestBody) => {
    return this.api.patch(`/artworks/${id}/edit`, requestBody);
  }

  // DELETE artwork by id
  deleteOne = async (id) => {
    return this.api.delete(`/artworks/${id}/delete`);
  }

  // Verify if artwork belongs to authenticated user
  verifyOwnership = async (artworkId) => {
    return this.api.get(`/artworks/${artworkId}/verifyOwnership`);
  }
}

// Create one instance of the service
const artworkService = new ArtworkService();

export default artworkService;