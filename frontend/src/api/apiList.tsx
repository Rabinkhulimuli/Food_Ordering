import { formData } from "../pages/login";
import axios from "axios";

export interface loginResponse {
  id: string;
  email: string;
}
export interface profileResponse {
  email: string;
  id: string;
  name?: string;
  contact?: number;
  address?: string;
  city?: string;
}
export interface profileUpdateResponse {
  name?: string;
  contact?: number;
  address?: string;
  city?: string;
}
export interface postResponse {
  email: string;
  password: string;
}
export const postUser = async (data1: formData): Promise<postResponse> => {
  try {
    const { data } = await axios.post("/user/my-user", data1);
    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred"
    );
  }
};

export const loginUser = async (data1: formData): Promise<loginResponse> => {
  try {
    const { data } = await axios.post("/user/user-loggin", data1);

    localStorage.setItem("token", data.token);

    return { id: data.id, email: data.email };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const customError = error?.response?.data?.msg || "Unexpected Error";
      throw new Error(customError);
    } else {
      throw new Error("Something went Wrong");
    }
  }
};

export const getProfile = async (): Promise<profileResponse> => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.get("/user/profile", {
      headers: {
        Authorization: token ? `Bearer ${token}` : " ",
      },
    });
    return data;
  } catch (err) {
    throw new Error("Error getting profile");
  }
};
export const updateProfile = async (
  data: profileUpdateResponse
): Promise<profileUpdateResponse> => {
  const token = localStorage.getItem("token");
  if(!token){
    throw new Error("you must login first")
  }
  try {
    await axios.post("/user/profile", data, {
      headers: {
        Authorization: token ? `Bearer ${token}` : " ",
      },
    });
    return data;
  } catch (err) {
    throw new Error("Error updating profile ");
  }
};
export const logOut = async () => {
  try {
    await axios.post("/user/logout");
    localStorage.removeItem("token");
  } catch (err) {
    console.log("error logging out");
  }
};
