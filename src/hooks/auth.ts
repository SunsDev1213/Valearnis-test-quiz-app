import axios from "axios";
import { BACKEND_API } from "../config/config";

export async function login(data: any) {
  try {
    const response = await axios.post(`${BACKEND_API}/account/login`, data);

    return response?.data;
  } catch (err) {
    console.log("register error ", err);
  }
}
