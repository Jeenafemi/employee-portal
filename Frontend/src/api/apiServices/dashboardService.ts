import axiosInstance from "../axiosInstance";

export const getDashboard = async () => {
  const res = await axiosInstance.get("/dashboard");
  return res.data;
};