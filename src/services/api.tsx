import axios from "axios";
import { LoginSchema } from "../utils/definitions";

const BASE_URL = "https://reqres.in/api";

export async function loginUser(body: LoginSchema) {
  try {
    const response = await axios.post(`${BASE_URL}/login`, body);
    return response.data; // Returns token
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

export async function registerUser(body: LoginSchema) {
  try {
    const response = await axios.post(`${BASE_URL}/register`, body);
    return response.data; // Returns user id and token
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
}

export async function logout() {
  const response = await axios.post(`${BASE_URL}/logout`);
  return response.data;
}

export async function getAllUsers() {
  try {
    const response = await axios.get(`${BASE_URL}/users`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
