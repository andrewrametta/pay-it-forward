import config from "../config";
import jwtDecode from "jwt-decode";

const TokenService = {
  // create auth token
  saveAuthToken(token) {
    window.localStorage.setItem(config.TOKEN_KEY, token);
  },
  // confirm auth token
  hasAuthToken() {
    return window.localStorage.getItem(config.TOKEN_KEY);
  },
  clearAuthToken() {
    return window.localStorage.removeItem(config.TOKEN_KEY);
  },
  parseJwt(jwt) {
    return jwtDecode(jwt);
  },
  readJwtToken() {
    return TokenService.parseJwt(TokenService.hasAuthToken());
  },
};

export default TokenService;
