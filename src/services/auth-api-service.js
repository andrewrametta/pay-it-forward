import config from "../config";
import TokenService from "./token-service";

export default {
  // used to register user
  postUser(user) {
    return fetch(`${config.API_ENDPOINT}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  // used to login user by matching user in database
  loginUser(user) {
    return fetch(`${config.API_ENDPOINT}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  uploadImg(img) {
    return fetch(`${config.API_ENDPOINT}/api/uploads`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      //body: JSON.stringify(img),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  getImg(img) {
    return fetch(`${config.API_ENDPOINT}/api/img/:id`, {
      method: "GET",
      headers: {
        Content_type: "multipart/form-data",
      },
      body: JSON.stringify(img),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
};
