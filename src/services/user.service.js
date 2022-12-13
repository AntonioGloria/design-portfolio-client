import axios from 'axios';

class UserService {
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

  // GET /users
  getAll = async () => {
    return this.api.get('/users');
  }

  // GET /:username
  getOne = async (username) => {
    return this.api.get(`/users/${username}`);
  }

  // PUT update /:username
  updateOne = async (username, requestBody) => {
    return this.api.put(`/users/${username}/edit-profile`, requestBody);
  }

  // POST upload image
  uploadImage = (file) => {
    return this.api.post("/users/upload", file)
  };

  // DELETE /api/examples/:id
  deleteProject = async (id) => {
    return this.api.delete(`/api/examples/${id}`);
  }

}

// Create one instance of the service
const userService = new UserService();

export default userService;