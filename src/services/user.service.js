import serviceConfig from './config.service';

class UserService {
  constructor(config) {
    this.api = config;
  }

  // GET /users
  getAll = async () => {
    return this.api.get('/users');
  }

  // GET /:username
  getOne = async (username) => {
    return this.api.get(`/users/${username}`);
  }

  // GET /:username/albums
  getUserAlbums = async (username) => {
    return this.api.get(`/users/${username}/albums`);
  }

  // PUT update /:username
  updateOne = async (requestBody) => {
    return this.api.put(`/users/edit-profile`, requestBody);
  }
}

const userService = new UserService(serviceConfig);
export default userService;