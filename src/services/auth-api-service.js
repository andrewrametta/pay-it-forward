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
  uploadImg(base64EncodedImage) {
    return fetch(`${config.API_ENDPOINT}/api/uploads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: base64EncodedImage }),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  getItems(item) {
    return fetch(`${config.API_ENDPOINT}/api/items`, {
      method: "GET",
      headers: {
        Content_type: "application/json",
      },
      body: JSON.stringify(item),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  postItem(item) {
    const token = "bearer " + TokenService.hasAuthToken();
    return fetch(`${config.API_ENDPOINT}/api/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(item),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
};
