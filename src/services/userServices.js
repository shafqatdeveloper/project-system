import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://203.161.49.205:8080/",
  timeout: 10000, // Request timeout (10 seconds)
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to include token (if applicable)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // Retrieve token from local storage or a secure location
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle responses globally
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Handle known error types, such as 401 Unauthorized, globally
      if (error.response.status === 401) {
        // Optionally logout or redirect to login page
        console.log("Unauthorized - Redirecting to login");
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
