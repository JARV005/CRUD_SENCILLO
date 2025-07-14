const API = "http://localhost:3000";

function saveUserSession(user) {
  sessionStorage.setItem("user", JSON.stringify(user));
}

function getUserSession() {
  return JSON.parse(sessionStorage.getItem("user"));
}

function logout() {
  sessionStorage.removeItem("user");
  location.hash = "login";
}
