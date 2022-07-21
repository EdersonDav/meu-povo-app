import axios from "axios";

export const api = axios.create({
  baseURL: 'http://',
  headers: {
    "Content-Type": "application/json",
  }
})