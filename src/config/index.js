const API_URL = "http://localhost:5000"; //process.env.REACT_APP_API_URL ||
const FIREBASE_KEY = process.env.REACT_APP_FIREBASE_API_KEY || "";
const FIREBASE_AUTH_DOMAIN = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "";
const AWS_KEY_ID = process.env.REACT_APP_AWS_ACCESS_KEY_ID || "";
const AWS_SECRET_KEY = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY || "";

export const api = {
  //api routes
  register: `${API_URL}/register`,
  users: `${API_URL}/users`,
  schedule: `${API_URL}/schedule`,
  topics: `${API_URL}/topics`,
  applications: `${API_URL}/applications`,
  firebase_key: FIREBASE_KEY,
  firebase_auth_domain: FIREBASE_AUTH_DOMAIN
};

export const aws = {
  // key id and secret access key
  key_id: AWS_KEY_ID,
  secret_key: AWS_SECRET_KEY
};
