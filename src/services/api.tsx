import axios from "axios";
import { LoginSchema, User, UserList } from "../utils/definitions";

const BASE_URL = "https://reqres.in/api"; //process.env.REACT_APP_BASE_URL;

export async function loginUser(body: LoginSchema) {
  try {
    const response = await axios.post(`${BASE_URL}/login`, body);
    return response.data; // Returns token
  } catch (error) {
    if (axios.isAxiosError(error))
      if (error.response && error.response.status === 400) {
        alert(error.response.data.error);
      } else {
        console.error("Login error:", error.message || error);
      }
    throw new Error("Failed to login");
  }
}

export async function updateUser(id: string) {
  try {
    await axios.put(`${BASE_URL}/users/${id}`);
    console.log(`Successfully updated user with id:${id}`);
  } catch (error) {
    console.error("Update error:", error);
    throw error;
  }
}

export async function deleteUser(id: string) {
  try {
    await axios.delete(`${BASE_URL}/users/${id}`);
    console.log(`Successfully deleted user with id:${id}`);
  } catch (error) {
    console.error("Deletion error:", error);
    throw error;
  }
}

export async function registerUser(body: LoginSchema | User) {
  try {
    const response = await axios.post(`${BASE_URL}/register`, body);
    if (response.status == 400) alert(response.data.error);
    return response.data; // Returns user id and token
  } catch (error) {
    if (axios.isAxiosError(error))
      if (error.response && error.response.status === 400) {
        alert(error.response.data.error);
      } else {
        console.error("Signup error:", error.message || error);
      }
    throw new Error("Failed to register user");
  }
}

export async function logout() {
  const response = await axios.post(`${BASE_URL}/logout`);
  return response.data;
}

export async function getAllUsers(
  page?: number,
  perPage?: number
): Promise<UserList> {
  try {
    const response = await axios.get(`${BASE_URL}/users`, {
      params: { page: page, per_page: perPage },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
