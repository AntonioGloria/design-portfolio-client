import serviceConfig from "./config.service";

class ArtworkService {
  constructor(config) {
    this.api = config;
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

  // PATCH Add user to artworks' likes
  addToFavs = async (artworkId) => {
    return this.api.patch(`/artworks/${artworkId}/addToFavs`);
  }

  // PATCH Remove user from artworks' likes
  removeFromFavs = async (artworkId) => {
    return this.api.patch(`/artworks/${artworkId}/removeFromFavs`);
  }
}

const artworkService = new ArtworkService(serviceConfig);
export default artworkService;