import checkResponse from "./checkResponse.js";

export function createRequest(baseUrl) {
  return function request(endpoint, options) {
    return fetch(baseUrl + endpoint, options).then(checkResponse);
  };
}
