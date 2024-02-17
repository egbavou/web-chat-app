//import and use simplied axios;
import axios from "axios";
import API_BASE_URL from "@/views/Services/config.js";
const apiService = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60 * 1000, // Timeout
  headers: {
    common: {
      "Content-Type": "application/json",
      //"Content-Type": "application/json,multipart/form-data",
    },
  },
});

export default apiService;
