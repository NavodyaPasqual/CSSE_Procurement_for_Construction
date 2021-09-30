import axios from "axios";

const API_URL = "http://localhost:8081/api/auth/";

const register = (username, email, password, number, roles) => {
  console.log("dfsf "+roles);
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
    number,
    roles : [roles]
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
