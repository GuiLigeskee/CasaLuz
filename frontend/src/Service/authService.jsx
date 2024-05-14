import { api, requestConfig } from "../utils/config";

// Register a user
// Register a user
const register = async (formData, token) => {
  const config = requestConfig("POST", formData, token, false);

  try {
    const res = await fetch(api + "/admin/register", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// Logout a admin
const logout = () => {
  localStorage.removeItem("admin");
};

// Sign in a admin
const login = async (data) => {
  const config = requestConfig("POST", data);

  try {
    const res = await fetch(api + "/admin/login", config)
      .then((res) => res.json())
      .catch((err) => err);

    if (res) {
      localStorage.setItem("admin", JSON.stringify(res));
    }

    return res;
  } catch (error) {
    console.log(error);
  }
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
