import axios from "axios";

const API_URL = "/api/users/";

const register = async (userData) => {
  console.log("In register authController");
  console.log(
    `userData: ${userData.name} ${userData.password} ${userData.email}`
  );
  const response = await axios.post(API_URL, userData);

  console.log("In register authController2");
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
    console.log("In if(data) register authController");
  }

  console.log("In register authController");
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
