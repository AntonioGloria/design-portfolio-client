import serviceConfig from "./config.service";

class FilesService {
  constructor(config) {
    this.api = config;
  }

  // POST upload image
  uploadImage = (file, config) => {
    return this.api.post("/api/upload", file, config);
  };

  // POST upload many images
  uploadImageMulti = (files, config) => {
    return this.api.post("/api/upload-multi", files, config);
  };

  // DELETE images from project
  deleteImageMulti = (imgUrls) => {
    return this.api.put("/api/delete-multi/", imgUrls);
  };
}

// Create one instance of the service
const filesService = new FilesService(serviceConfig);
export default filesService;