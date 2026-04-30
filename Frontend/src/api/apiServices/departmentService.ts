import axiosInstance from "../axiosInstance";

// 🔹 UPSERT
export const upsertDepartment = async (data: any) => {
  const res = await axiosInstance.post("/departments/upsert", data);
  return res.data;
};

// 🔹 LIST
export const listDepartments = async () => {
  const res = await axiosInstance.post("/departments/list");
  return res.data;
};

// 🔹 GET SINGLE
export const getDepartment = async (id: string) => {
  const res = await axiosInstance.post("/departments/get", { id });
  return res.data;
};

export const toggleDepartmentStatus = async (id: string) => {
  const res = await axiosInstance.post("/departments/toggle-status", { id });
  return res.data;
};