import axios from 'axios';

class FilesService {
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

  // POST upload image
  uploadImage = (file) => {
    return this.api.post("/api/upload", file)
  };

  // POST upload many images
  uploadImageMulti = (files, config) => {
    return this.api.post("/api/upload-multi", files, config)
  };
}

// Create one instance of the service
const filesService = new FilesService();

export default filesService;