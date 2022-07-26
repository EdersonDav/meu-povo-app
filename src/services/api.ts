import axios from "axios";
import Envirioments from '../../config.env.json';

export const api = axios.create({
  baseURL: Envirioments.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  }
})