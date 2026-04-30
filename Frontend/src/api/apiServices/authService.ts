
import axiosInstance from "../axiosInstance";
import { toast } from "react-toastify";

// LOGIN
export const login = async (email: string, password: string) => {
  try {
    const res = await axiosInstance.post("/auth/login", {
      email,
      password
    });

    localStorage.setItem("token", res.data.token);


    toast.success(res.data.statusText || "Login successful");

    return res.data;

  } catch (error: any) {
    const message =
      error.response?.data?.statusText ||
      error.response?.data?.msg ||
      "Login failed";

    toast.error(message);

    throw message;
  }
};

// SIGNUP
export const register = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const res = await axiosInstance.post("/auth/signup", {
      name,
      email,
      password
    });

    toast.success(res.data.msg);

    return res.data;

  } catch (error: any) {
      const message = error.response?.data?.msg;

      toast.error(message);

    throw message;
  }
};


// LOGOUT
export const logout = () => {
  localStorage.removeItem("token");
};

