import axios from "axios";

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        try {
          const response = await new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          });
          originalRequest.headers['Authorization'] = 'Bearer ' + response.data.access;
          return axios(originalRequest);
        } catch (err) {
          return Promise.reject(err);
        }
      }
      originalRequest._retry = true;
      isRefreshing = true;

      const refresh_token = localStorage.getItem("refresh_token");

      return new Promise((resolve, reject) => {
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/token/refresh/`, { refresh: refresh_token })
          .then(response => {
            localStorage.setItem("access_token", response.data.access);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access;
            processQueue(null, response);
            resolve(axios(originalRequest));
          })
          .catch((error) => {
            processQueue(error, null);
            reject(error);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }
    return Promise.reject(error);
  }
);
export default axios;
