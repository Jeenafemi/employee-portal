import axiosInstance from "../axiosInstance";

// UPSERT
export const upsertEmployee = async (data: any) => {
  const res = await axiosInstance.post("/employees/upsert", data);
  return res.data;
  
};

// LIST
export const listEmployees = async () => {
  const res = await axiosInstance.post("/employees/list");
  return res.data;
};

// GET SINGLE
export const getEmployee = async (id: string) => {
  const res = await axiosInstance.post("/employees/get", { id });
  return res.data;
};

export const toggleEmployeeStatus = async (id: string) => {
  const res = await axiosInstance.post("/employees/toggle-status", { id });
  return res.data;
};

export const deleteEmployee = async (id: string) => {
  const res = await axiosInstance.post("/employees/delete", { id });
  return res.data;
};