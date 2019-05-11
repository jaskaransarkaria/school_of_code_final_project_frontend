const API_URL = process.env.REACT_APP_API_URL || "";
const FIREBASE_KEY =
  process.env.FIREBASE_API_KEY || "AIzaSyBEjVPCQzoKZxg-YCv3Pno_X4Ek1MtOqQw";
const FIREBASE_AUTH_DOMAIN =
  process.FIREBASE_AUTH_DOMAIN || "what-did-i-miss-88f32.firebaseapp.com";
// AIzaSyBEjVPCQzoKZxg-YCv3Pno_X4Ek1MtOqQw
//what-did-i-miss-88f32.firebaseapp.com

export const api = {
  //api routes
  register: `${API_URL}/register`,
  login: `${API_URL}/login`,
  firebase_key: `${FIREBASE_KEY}`,
  firebase_auth_domain: `${FIREBASE_AUTH_DOMAIN}`
};
