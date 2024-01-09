import serviceConfig from "./config.service";

class AlbumService {
  constructor(config) {
    this.api = config;
  }

  // GET all albums
  getAll = async () => {
    return this.api.get("/albums");
  }

  // GET album by :id
  getOne = async (id) => {
    return this.api.get(`/albums/${id}`);
  }

  // Create album
  create = async (requestBody) => {
    return this.api.post("/albums/create", requestBody);
  }

  // Rename album
  renameOne = async (albumId, requestBody) => {
    return this.api.patch(`/albums/${albumId}/rename`, requestBody);
  }

  // Delete album
  deleteAlbum = async (id) => {
    return this.api.delete(`/albums/${id}/delete`);
  }
}

const albumService = new AlbumService(serviceConfig);
export default albumService;