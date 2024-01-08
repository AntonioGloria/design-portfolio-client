import serviceConfig from "./config.service";

class AuthService {
  constructor(config) {
    this.api = config;
  }

  login = (requestBody) => {
    return this.api.post("/auth/login", requestBody);
  };

  signup = (requestBody) => {
    return this.api.post("/auth/signup", requestBody);
  };

  verify = () => {
    return this.api.get("/auth/verify");
  };
}

const authService = new AuthService(serviceConfig);
export default authService;