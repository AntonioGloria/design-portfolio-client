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

  // GET /:username/albums/:albumType
  getUserAlbums = async (username, albumType) => {
    return this.api.get(`/users/${username}/albums/${albumType}`);
  }

  // GET /:username/artworks
  getUserArtworks = async (username) => {
    return this.api.get(`/users/${username}/artworks/`);
  }

  // GET /:username/favorites
  getUserFavorites = async (username) => {
    return this.api.get(`/users/${username}/favorites/`);
  }

  // PUT update /:username
  updateOne = async (requestBody) => {
    return this.api.put(`/users/edit-profile`, requestBody);
  }
}

const userService = new UserService(serviceConfig);
export default userService;