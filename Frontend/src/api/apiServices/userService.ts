import axiosInstance from '../axiosInstance';
import { API } from '../endPoints';


export const getUser = async () => {
  try {
    const response = await axiosInstance.get(API.USERS.GET_USER);
    return response.data;
  } 
  catch (error) {
    console.log(error);

  }
};
export const getList = async () => {
  try {
    const response = await axiosInstance.get(API.POSTS.GET_POSTS)
    return response.data;
  }
  catch (error) {
    console.log(error);
  }
}
export const postForm = async (newApplication: {name:string; email: string; phone: string; linkedin: string; portfolio: string; experience: string; reactExperience: string; resume: string; coverLetter: string; startDate: string;} ) => {
  try {
    const response = await axiosInstance.post(API.POSTS.CREATE_POST,newApplication)
    return response.data;
  }
  catch (error) {
console.log(error);
  }
}

export const updateForm = async (updateApplication: {id: string,name:string; email: string; phone: string; linkedin: string; portfolio: string; experience: string; reactExperience: string; resume: string; coverLetter: string; startDate: string;}) => {
  const { id, ...payload } = updateApplication;
  console.log('PUT to:', `${API.POSTS.UPDATE_POSTS}/${id}`, payload);
  return axiosInstance.put(`${API.POSTS.UPDATE_POSTS}/${id}`, payload);
};
export const deleteApplication = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete(`${API.POSTS.DELETE_POST}/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getApplicationById = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`${API.POSTS.GET_POSTS}/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const updateHiredStatus = async ({
  id,
  updateStatus,
}: {
  id: string;
  updateStatus: {
    name: string;
    email: string;
    phone: string;
    linkedin: string;
    portfolio: string;
    experience: string;
    reactExperience: string;
    resume: string;
    coverLetter: string;
    startDate: string;
    hired: boolean; // ✅ Include hired flag
  };
}) => {
  try {
    const response = await axiosInstance.put(`${API.POSTS.UPDATE_POSTS}/${id}`, updateStatus);
    return response.data;
  } catch (error) {
    console.error("Failed to update hired status", error);
    throw error;
  }
};



